/* =========================================================
   aula.js - tela de leitura de UMA aula (aula.html?id=...).
   Mesmo padrão do detalhe-projeto.html: uma página só para
   todas as aulas; o id vem da URL.

   Caminho geral:
   1. lê o id da URL e acha a aula em data/aulas.json;
   2. busca o arquivo .md da aula com fetch;
   3. converte o Markdown em HTML com a biblioteca marked;
   4. "arruma" esse HTML: caixas de destaque (e "Em resumo"),
      glossário, checklist, quiz, blocos de código, tabelas
      e sumário;
   5. liga os botões (letra, tema, concluir, sumário).

   Dois arquivos ajudam este (carregados antes dele na aula.html):
   - js/aula-codigo.js: blocos de código, "Linha por linha",
     Rodar, Editar, Restaurar e Copiar (Etapa 4);
   - js/aula-quiz.js: o "Teste rápido" (Etapa 4).

   Estrutura e classes: docs/design.md, seções 11.4, 11.5 e 12.
   Visual: css/style.css, seções 23 a 38.
   ========================================================= */


/* ---------------------------------------------------------
   1. ELEMENTOS DA PÁGINA E CONFIGURAÇÕES
   --------------------------------------------------------- */
const idDaAula = new URLSearchParams(window.location.search).get("id");

const raiz = document.documentElement; // o <html> (guarda data-tema e data-fonte)
const artigo = document.querySelector("#aula");
const conteudo = document.querySelector("#aula-conteudo");
const sumario = document.querySelector("#aula-sumario");
const listaSumario = document.querySelector("#sumario-lista");
const fundoSumario = document.querySelector(".aula-sumario-fundo");
const botaoSumario = document.querySelector(".aula-sumario-botao");
const botaoFecharSumario = document.querySelector(".aula-sumario-fechar");
const ferramentas = document.querySelector(".aula-ferramentas");
const barraProgresso = document.querySelector(".leitura-progresso");
const botaoFonteMenos = document.querySelector("#fonte-menos");
const botaoFonteMais = document.querySelector("#fonte-mais");
const botaoTema = document.querySelector("#botao-tema");
const botoesConcluir = document.querySelectorAll('[data-acao="concluir"]');

// Pessoa pediu "menos animação" no sistema? (usado na rolagem até a seção)
const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");

// Altura aproximada do que fica grudado no topo (header 64px +
// barra de ferramentas 61px + respiro). Um título "está sendo lido"
// quando passa desta linha. Usado no sumário (item ativo).
const ALTURA_DO_TOPO = 160;

// Ícones (img/icones/*.svg) colados aqui para herdar a cor do CSS
const ICONE_CONCLUIDA = `<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16.5 9.5"/></svg>`;
const ICONE_RESUMO = `<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>`;

// As 4 caixas de destaque: marcador do GitHub -> classe, ícone e título
const TIPOS_DE_AVISO = {
  TIP:       { classe: "aviso--dica",       icone: "💡", titulo: "Dica" },
  CAUTION:   { classe: "aviso--erro",       icone: "⚠️", titulo: "Erro comum" },
  IMPORTANT: { classe: "aviso--entrevista", icone: "🎤", titulo: "Em entrevista" },
  NOTE:      { classe: "aviso--palavra",    icone: "📖", titulo: "Palavra nova" }
};


/* ---------------------------------------------------------
   2. TAMANHO DA LETRA (A- e A+) E TEMA PAPEL
   O script no <head> da aula.html já aplicou os valores
   salvos. Aqui só lemos o que está no <html> e ligamos os botões.
   --------------------------------------------------------- */
const FONTE_MINIMA = 1;
const FONTE_MAXIMA = 5;
let nivelFonte = Number(raiz.dataset.fonte) || 3;

function aplicarFonte(nivel) {
  nivelFonte = nivel;
  raiz.dataset.fonte = String(nivel); // o CSS troca --leitura-escala
  botaoFonteMenos.disabled = nivel <= FONTE_MINIMA;
  botaoFonteMais.disabled = nivel >= FONTE_MAXIMA;
}

function mudarFonte(passo, botaoClicado, outroBotao) {
  const novo = Math.min(FONTE_MAXIMA, Math.max(FONTE_MINIMA, nivelFonte + passo));
  aplicarFonte(novo);
  salvarProgresso("leitura-fonte", novo);

  // Um botão desativado perde o foco. Para quem usa teclado não
  // "cair" no começo da página, o foco passa para o outro botão.
  if (botaoClicado.disabled) outroBotao.focus();
}

botaoFonteMenos.addEventListener("click", function () { mudarFonte(-1, botaoFonteMenos, botaoFonteMais); });
botaoFonteMais.addEventListener("click", function () { mudarFonte(+1, botaoFonteMais, botaoFonteMenos); });
aplicarFonte(nivelFonte);

function aplicarTema(tema) {
  raiz.dataset.tema = tema; // o CSS troca as cores (seção 24)
  // O texto do botão é sempre "Tema papel"; aria-pressed diz se está ligado
  botaoTema.setAttribute("aria-pressed", String(tema === "papel"));
}

botaoTema.addEventListener("click", function () {
  const novo = raiz.dataset.tema === "papel" ? "escuro" : "papel";
  aplicarTema(novo);
  salvarProgresso("leitura-tema", novo);
});
aplicarTema(raiz.dataset.tema === "papel" ? "papel" : "escuro");


/* ---------------------------------------------------------
   3. AULA CONCLUÍDA
   Dois botões (o pequeno da barra e o grande do fim) mostram
   o mesmo estado. A lista de concluídas fica no localStorage
   e é lida também pela aulas.html.
   --------------------------------------------------------- */
let aulaConcluida = lerAulasConcluidas().includes(idDaAula);

function atualizarBotoesConcluir() {
  botoesConcluir.forEach(function (botao) {
    botao.setAttribute("aria-pressed", String(aulaConcluida));

    // Só o botão grande do fim troca o texto
    if (botao.classList.contains("aula-concluir")) {
      botao.innerHTML = aulaConcluida
        ? `${ICONE_CONCLUIDA}<span>Aula concluída <span aria-hidden="true">✓</span></span>
           <span class="aula-concluir-desfazer">Desmarcar</span>`
        : `${ICONE_CONCLUIDA}<span>Marcar aula como concluída</span>`;
    }
  });
}

function alternarConcluida() {
  aulaConcluida = !aulaConcluida;

  // Relê a lista salva (outra aba pode ter mudado) e atualiza só esta aula
  const lista = lerAulasConcluidas().filter(function (id) { return id !== idDaAula; });
  if (aulaConcluida) lista.push(idDaAula);
  salvarProgresso("aulas-concluidas", lista);

  atualizarBotoesConcluir();
}

botoesConcluir.forEach(function (botao) {
  botao.addEventListener("click", alternarConcluida);
});
atualizarBotoesConcluir();


/* ---------------------------------------------------------
   4. MENSAGENS (aula não encontrada, erro, marked fora do ar)
   Esconde sumário e ferramentas, esvazia o resto do <article>
   e mostra só a mensagem.
   --------------------------------------------------------- */
function mostrarMensagemDaAula(html) {
  sumario.hidden = true;
  ferramentas.hidden = true;
  fundoSumario.hidden = true;

  // Remove tudo do <article>, menos a barra de ferramentas (já escondida)
  Array.from(artigo.children).forEach(function (filho) {
    if (filho !== ferramentas) filho.remove();
  });

  artigo.insertAdjacentHTML("beforeend",
    `<div class="mensagem mensagem--erro aula-mensagem" role="alert">${html}</div>`);
}


/* ---------------------------------------------------------
   5. TRANSFORMAÇÕES NO HTML QUE O MARKED GEROU
   Cada função recebe a <div class="aula-conteudo"> já com o
   HTML dentro e troca alguns pedaços pelos componentes do
   design (seção 11.5). Trabalhamos com elementos de verdade
   (DOM) em vez de texto, para não mexer no que está dentro
   de blocos de código.
   --------------------------------------------------------- */

// 5.1 Links perigosos: um link "javascript:..." executaria código.
// O .md é nosso, mas por segurança tiramos o href desses links.
function protegerLinks(area) {
  area.querySelectorAll("a[href]").forEach(function (link) {
    const protocolo = link.protocol; // "https:", "http:", "javascript:"...
    if (protocolo !== "http:" && protocolo !== "https:" && protocolo !== "mailto:") {
      link.removeAttribute("href");
    }
  });
}

// 5.2 Caixas de destaque: "> [!TIP]" vira <blockquote><p>[!TIP] texto</p>.
// Trocamos esse blockquote pela <div class="aviso aviso--dica">.
// Blockquote sem [!...] fica como está (citação comum).
function criarAvisos(area) {
  area.querySelectorAll("blockquote").forEach(function (citacao) {
    const primeiro = citacao.firstElementChild;
    if (!primeiro || primeiro.tagName !== "P") return;

    // Procura o marcador no começo do primeiro parágrafo
    const marcador = /^\s*\[!(TIP|CAUTION|IMPORTANT|NOTE)\]\s*/i;
    const encontrado = primeiro.innerHTML.match(marcador);
    if (!encontrado) return;

    const marcadorDoGitHub = encontrado[1].toUpperCase();
    const tipo = TIPOS_DE_AVISO[marcadorDoGitHub];

    // Tira o "[!TIP]" do texto
    primeiro.innerHTML = primeiro.innerHTML.replace(marcador, "");

    // Etapa 4: um [!TIP] que começa com **Em resumo:** vira a caixa
    // "Em resumo". O "Em resumo:" em negrito sai do texto (vira o título).
    const emResumo = /^\s*<strong>\s*Em resumo:\s*<\/strong>\s*/i;
    const ehResumo = marcadorDoGitHub === "TIP" && emResumo.test(primeiro.innerHTML);
    if (ehResumo) primeiro.innerHTML = primeiro.innerHTML.replace(emResumo, "");

    // Se o parágrafo ficar vazio, some
    if (primeiro.textContent.trim() === "") primeiro.remove();

    const caixa = document.createElement("div");
    caixa.setAttribute("role", "note");
    // O título em texto diz o tipo da caixa; o ícone é só decoração
    if (ehResumo) {
      caixa.className = "aviso aviso--resumo";
      caixa.innerHTML = `<p class="aviso-titulo">${ICONE_RESUMO}Em resumo</p>`;
    } else {
      caixa.className = "aviso " + tipo.classe;
      caixa.innerHTML = `<p class="aviso-titulo"><span class="aviso-icone" aria-hidden="true">${tipo.icone}</span>${tipo.titulo}</p>`;
    }

    // Move o conteúdo da citação para dentro da caixa
    while (citacao.firstChild) caixa.appendChild(citacao.firstChild);
    citacao.replaceWith(caixa);
  });
}

// 5.3 Glossário: [[fetch]] vira a palavra marcada com balão.
let contadorGlossario = 0;

function aplicarGlossario(area, glossario) {
  // Map: busca rápida pelo termo em minúsculas ("fetch" -> {termo, traducao, ...})
  const termos = new Map();
  glossario.forEach(function (item) {
    termos.set(String(item.termo).toLowerCase(), item);
  });

  // Um TreeWalker percorre todos os pedaços de TEXTO da aula.
  // Primeiro só anotamos os que têm "[[" (mexer no DOM durante a
  // caminhada atrapalharia o próprio TreeWalker).
  const caminhante = document.createTreeWalker(area, NodeFilter.SHOW_TEXT);
  const textos = [];
  while (caminhante.nextNode()) {
    const texto = caminhante.currentNode;
    // Dentro de código (`assim` ou em bloco) NÃO convertemos
    if (texto.nodeValue.includes("[[") && !texto.parentElement.closest("pre, code, kbd")) {
      textos.push(texto);
    }
  }

  const padrao = /\[\[([^\[\]]+)\]\]/g; // [[qualquer coisa sem colchetes]]

  textos.forEach(function (texto) {
    const original = texto.nodeValue;
    const pedacos = document.createDocumentFragment(); // "caixa" temporária de nós
    let inicio = 0;

    for (const achado of original.matchAll(padrao)) {
      // Texto normal antes do [[...]]
      pedacos.appendChild(document.createTextNode(original.slice(inicio, achado.index)));

      const palavra = achado[1].trim();
      const item = termos.get(palavra.toLowerCase()); // ignora maiúsculas/minúsculas

      // Termo fora do glossário (ou glossário não carregou): só o texto
      pedacos.appendChild(item ? criarTermo(palavra, item) : document.createTextNode(palavra));
      inicio = achado.index + achado[0].length;
    }

    pedacos.appendChild(document.createTextNode(original.slice(inicio)));
    texto.replaceWith(pedacos);
  });
}

// Cria o <span class="glossario"> com o botão e o balão
function criarTermo(palavra, item) {
  contadorGlossario++;
  const idBalao = "glossario-" + contadorGlossario;

  const explicacao = item.explicacao
    ? `<span class="glossario-explicacao">${escapar(item.explicacao)}</span>`
    : "";

  // Atenção: tudo colado, sem espaços nem quebras de linha entre as tags.
  // A palavra fica no meio de uma frase, e um espaço sobrando aqui
  // apareceria na tela (ex.: "fetch ," em vez de "fetch,").
  const caixa = document.createElement("span");
  caixa.className = "glossario";
  caixa.innerHTML =
    `<button class="glossario-termo" type="button" aria-expanded="false" aria-describedby="${idBalao}">${escapar(palavra)}</button>` +
    `<span class="glossario-balao" id="${idBalao}" role="tooltip">` +
      `<span class="glossario-traducao">${escapar(item.traducao)}</span>${explicacao}` +
    `</span>`;

  ligarTermo(caixa);
  return caixa;
}

// Abrir/fechar os balões. Só um aberto por vez.
let termoAberto = null;
let abertoEm = 0; // momento em que o balão abriu (ver o clique abaixo)

function abrirTermo(caixa) {
  if (termoAberto === caixa) return;
  fecharTermo();
  caixa.classList.add("is-aberto");
  caixa.querySelector(".glossario-termo").setAttribute("aria-expanded", "true");
  termoAberto = caixa;
  abertoEm = Date.now();
}

function fecharTermo() {
  if (!termoAberto) return;
  termoAberto.classList.remove("is-aberto");
  termoAberto.querySelector(".glossario-termo").setAttribute("aria-expanded", "false");
  termoAberto = null;
}

function ligarTermo(caixa) {
  const botao = caixa.querySelector(".glossario-termo");

  // Mouse e teclado (Tab)
  caixa.addEventListener("mouseenter", function () { abrirTermo(caixa); });
  caixa.addEventListener("mouseleave", function () { if (termoAberto === caixa) fecharTermo(); });
  caixa.addEventListener("focusin", function () { abrirTermo(caixa); });
  caixa.addEventListener("focusout", function (evento) {
    // Só fecha se o foco saiu de verdade (não foi para dentro do próprio balão)
    if (!caixa.contains(evento.relatedTarget) && termoAberto === caixa) fecharTermo();
  });

  // Clique ou toque: alterna. Detalhe: num toque/clique, o navegador
  // dispara antes o "mouseenter" e o "focusin", que já abrem o balão.
  // Se o clique fechasse logo em seguida, o balão piscaria e sumiria.
  // Por isso, um clique até 400ms depois de abrir não fecha.
  botao.addEventListener("click", function () {
    if (termoAberto === caixa && Date.now() - abertoEm > 400) {
      fecharTermo();
    } else {
      abrirTermo(caixa);
    }
  });
}

// Tocar/clicar fora de qualquer termo fecha o balão
document.addEventListener("click", function (evento) {
  if (termoAberto && !termoAberto.contains(evento.target)) fecharTermo();
});

// 5.4 Checklist do exercício: "- [ ] item" vira <li><input disabled> item</li>.
// Montamos o <label> clicável e salvamos o estado por aula.
const chaveChecklist = "checklist:" + idDaAula;

function criarChecklist(area) {
  const listas = [];

  area.querySelectorAll("ul").forEach(function (lista) {
    const itens = Array.from(lista.children);
    // Só vira checklist a lista em que TODOS os itens têm caixinha
    const ehChecklist = itens.length > 0 && itens.every(function (li) {
      return li.querySelector(":scope > input[type=checkbox], :scope > p > input[type=checkbox]");
    });
    if (!ehChecklist) return;

    lista.classList.add("checklist");
    itens.forEach(montarItemDoChecklist);
    listas.push(lista);
  });

  if (listas.length === 0) return;

  const caixas = area.querySelectorAll(".checklist-caixa");

  // Estado salvo (lista de true/false na ordem dos itens).
  // Se nunca foi salvo, vale o que está no .md (- [x] começa marcado).
  const salvo = lerProgresso(chaveChecklist, null);
  if (Array.isArray(salvo)) {
    caixas.forEach(function (caixa, posicao) { caixa.checked = salvo[posicao] === true; });
  }

  function salvarChecklist() {
    const estados = Array.from(caixas).map(function (caixa) { return caixa.checked; });
    salvarProgresso(chaveChecklist, estados);
  }

  caixas.forEach(function (caixa) { caixa.addEventListener("change", salvarChecklist); });

  // Um único "Limpar exercício", logo depois do ÚLTIMO checklist
  const botaoLimpar = document.createElement("button");
  botaoLimpar.className = "btn btn-secundario checklist-limpar";
  botaoLimpar.type = "button";
  botaoLimpar.textContent = "Limpar exercício";
  botaoLimpar.addEventListener("click", function () {
    caixas.forEach(function (caixa) { caixa.checked = false; });
    salvarChecklist();
  });
  listas[listas.length - 1].after(botaoLimpar);
}

function montarItemDoChecklist(li) {
  const caixa = li.querySelector("input[type=checkbox]");
  caixa.remove();
  caixa.removeAttribute("disabled"); // o marked deixa desativada; queremos marcável
  caixa.className = "checklist-caixa";

  // Todo o texto do item vai para o <span>. Se o marked colocou o
  // texto dentro de um <p> (lista "espaçada"), tiramos o <p>.
  // Sublistas (ul/ol) ficam fora do rótulo.
  const texto = document.createElement("span");
  texto.className = "checklist-texto";
  Array.from(li.childNodes).forEach(function (no) {
    if (no.nodeName === "UL" || no.nodeName === "OL") return;
    if (no.nodeName === "P") {
      while (no.firstChild) texto.appendChild(no.firstChild);
      no.remove();
    } else {
      texto.appendChild(no);
    }
  });

  // O <label> em volta dá o nome acessível e deixa a linha toda clicável
  const rotulo = document.createElement("label");
  rotulo.className = "checklist-rotulo";
  rotulo.append(caixa, texto);

  li.className = "checklist-item";
  li.prepend(rotulo);
}

// 5.5 Blocos de código e quiz: ficam em js/aula-codigo.js e js/aula-quiz.js

// 5.6 Tabelas largas rolam dentro de uma "moldura" (a página não)
function embrulharTabelas(area) {
  area.querySelectorAll("table").forEach(function (tabela) {
    const moldura = document.createElement("div");
    moldura.className = "tabela-rolagem";
    moldura.setAttribute("tabindex", "0");
    moldura.setAttribute("role", "region");
    moldura.setAttribute("aria-label", "Tabela");
    tabela.replaceWith(moldura);
    moldura.appendChild(tabela);
  });
}

// 5.7 Títulos (## e ###): cada um ganha um id, e montamos o sumário.
// Ex.: "2. Os 5 conceitos" -> id "2-os-5-conceitos"
function criarIdDoTitulo(texto) {
  const base = texto
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "") // tira acentos: "visão" -> "visao"
    .replace(/[^a-z0-9\s-]/g, "")                     // tira pontuação
    .trim()
    .replace(/[\s-]+/g, "-")                          // espaços viram um hífen só
    || "secao";

  // Se o id já existe na página, acrescenta -1, -2...
  let id = base;
  let numero = 1;
  while (document.getElementById(id)) {
    id = base + "-" + numero;
    numero++;
  }
  return id;
}

// Texto do título sem o balão do glossário (que fica dentro dele)
function textoDoTitulo(titulo) {
  const copia = titulo.cloneNode(true);
  copia.querySelectorAll(".glossario-balao").forEach(function (balao) { balao.remove(); });
  return copia.textContent.trim();
}

function montarSumario(area) {
  const titulos = Array.from(area.querySelectorAll("h2, h3"));

  titulos.forEach(function (titulo) {
    const texto = textoDoTitulo(titulo);
    titulo.id = criarIdDoTitulo(texto);
    titulo.setAttribute("tabindex", "-1"); // permite levar o foco até a seção

    const classeSub = titulo.tagName === "H3" ? " sumario-item--sub" : "";
    listaSumario.insertAdjacentHTML("beforeend",
      `<li class="sumario-item${classeSub}"><a class="sumario-link" href="#${titulo.id}">${escapar(texto)}</a></li>`);
  });

  // Aula sem títulos: não há o que mostrar no sumário
  if (titulos.length === 0) {
    sumario.hidden = true;
    botaoSumario.hidden = true;
  }

  return titulos;
}


/* ---------------------------------------------------------
   6. SUMÁRIO: GAVETA (celular/tablet), CLIQUE E ITEM ATIVO
   --------------------------------------------------------- */
function abrirSumario() {
  document.body.classList.add("sumario-aberto");
  botaoSumario.setAttribute("aria-expanded", "true");
  botaoFecharSumario.focus();
}

// devolverFoco = false quando o usuário clicou num item (o foco vai para a seção)
function fecharSumario(devolverFoco) {
  if (!document.body.classList.contains("sumario-aberto")) return;
  document.body.classList.remove("sumario-aberto");
  botaoSumario.setAttribute("aria-expanded", "false");
  if (devolverFoco) botaoSumario.focus();
}

botaoSumario.addEventListener("click", abrirSumario);
botaoFecharSumario.addEventListener("click", function () { fecharSumario(true); });
fundoSumario.addEventListener("click", function () { fecharSumario(true); });

// Esc fecha a gaveta e o balão do glossário
document.addEventListener("keydown", function (evento) {
  if (evento.key !== "Escape") return;
  // O foco continua onde está (na palavra, se a pessoa veio pelo Tab)
  fecharTermo();
  fecharSumario(true);
});

// Rola até um título (sem animação se a pessoa pediu menos movimento)
function irParaTitulo(titulo) {
  titulo.scrollIntoView({ behavior: movimentoReduzido.matches ? "auto" : "smooth" });
}

// Clique num item do sumário: fecha a gaveta, rola, atualiza o # da URL
listaSumario.addEventListener("click", function (evento) {
  const link = evento.target.closest(".sumario-link");
  if (!link) return;
  evento.preventDefault();

  const titulo = document.getElementById(link.hash.slice(1));
  if (!titulo) return;

  fecharSumario(false);
  history.pushState(null, "", link.hash); // muda o # sem pular de uma vez
  irParaTitulo(titulo);
  titulo.focus({ preventScroll: true }); // leitor de tela continua a partir da seção
});

// Barra de progresso + item ativo do sumário (atualizados ao rolar)
let titulosDaAula = [];
let atualizacaoPendente = false;

function atualizarLeitura() {
  atualizacaoPendente = false;

  // Progresso: 0 = topo do texto no topo da tela; 1 = fim do texto visível
  const caixa = conteudo.getBoundingClientRect();
  const percurso = caixa.height - window.innerHeight;
  const progresso = percurso <= 0 ? 1 : Math.min(1, Math.max(0, -caixa.top / percurso));
  barraProgresso.style.setProperty("--progresso", progresso.toFixed(3));

  if (titulosDaAula.length === 0) return;

  // Item ativo: o último título que já passou da linha do topo
  let ativo = titulosDaAula[0];
  titulosDaAula.forEach(function (titulo) {
    if (titulo.getBoundingClientRect().top <= ALTURA_DO_TOPO) ativo = titulo;
  });

  // No fim da página, as últimas seções curtas não chegam ao topo:
  // nesse caso marcamos a última.
  const chegouAoFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (chegouAoFim) ativo = titulosDaAula[titulosDaAula.length - 1];

  listaSumario.querySelectorAll(".sumario-link").forEach(function (link) {
    if (link.hash === "#" + ativo.id) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

// requestAnimationFrame: atualiza no máximo uma vez por quadro da tela,
// em vez de dezenas de vezes por segundo durante a rolagem.
function agendarAtualizacao() {
  if (atualizacaoPendente) return;
  atualizacaoPendente = true;
  requestAnimationFrame(atualizarLeitura);
}


/* ---------------------------------------------------------
   7. CARREGAR E MONTAR A AULA
   --------------------------------------------------------- */

// Converte o Markdown em HTML. HTML cru escrito no .md (ex.: <script>,
// <b onclick=...>) NÃO vira HTML: aparece como texto. Assim nenhum
// código entra na página pelo .md.
function converterMarkdown(texto) {
  marked.use({
    gfm: true, // "GitHub Flavored Markdown": tabelas, - [ ] etc., igual ao GitHub
    renderer: {
      html: function (html) { return escapar(html); },

      // Bloco de código. O padrão do marked guarda só a 1ª palavra
      // depois do ``` (a linguagem) e joga fora o resto. Na Etapa 4
      // precisamos do resto: em "```html rodar", o "rodar" vai para
      // data-extra="rodar" (lido pelo js/aula-codigo.js).
      code: function (codigo, info) {
        const partes = String(info || "").trim().split(/\s+/);
        const linguagem = partes[0];
        const extra = partes.slice(1).join(" ");

        const classe = linguagem ? ` class="language-${escapar(linguagem)}"` : "";
        const dataExtra = extra ? ` data-extra="${escapar(extra)}"` : "";
        // escapar(): o código aparece como texto, nunca vira HTML.
        // replace: tira a quebra de linha do fim (não é uma linha de verdade)
        return `<pre><code${classe}${dataExtra}>${escapar(codigo.replace(/\n$/, ""))}</code></pre>\n`;
      }
    }
  });
  return marked.parse(texto);
}

async function mostrarAula() {
  // 7.1 Acha a aula no JSON (Etapa 4: { modulos: [...], aulas: [...] })
  let dados;
  try {
    dados = await carregarJSON("data/aulas.json");
  } catch (erro) {
    console.error(erro);
    mostrarMensagemDaAula(`<p>Não foi possível carregar a aula.</p><a href="aulas.html">&larr; Ver todas as aulas</a>`);
    return;
  }

  const aulas = Array.isArray(dados.aulas) ? dados.aulas : [];
  const modulos = Array.isArray(dados.modulos) ? dados.modulos : [];

  const aula = aulas.find(function (a) { return a.id === idDaAula; });
  if (!aula) {
    mostrarMensagemDaAula(`<p>Aula não encontrada.</p><a href="aulas.html">&larr; Ver todas as aulas</a>`);
    return;
  }

  // O módulo da aula (undefined se o "modulo" dela não existir)
  const modulo = modulos.find(function (m) { return m.id === aula.modulo; });

  // 7.2 O glossário é um "extra": se falhar, vira lista vazia e os
  // termos [[...]] aparecem como texto simples.
  const glossario = await carregarJSON("data/glossario.json").catch(function () { return []; });

  // 7.3 Biblioteca marked fora do ar: oferece o .md original
  if (typeof window.marked === "undefined") {
    mostrarMensagemDaAula(`
      <p>Não foi possível preparar a aula para leitura agora.</p>
      <a href="${escapar(aula.arquivo)}">Abrir o arquivo original da aula (.md)</a>`);
    return;
  }

  // 7.4 Busca o texto do .md
  let markdown;
  try {
    const resposta = await fetch(aula.arquivo);
    if (!resposta.ok) throw new Error("Status " + resposta.status + " ao buscar " + aula.arquivo);
    markdown = await resposta.text();
  } catch (erro) {
    console.error(erro);
    mostrarMensagemDaAula(`<p>Não foi possível carregar a aula.</p><a href="aulas.html">&larr; Ver todas as aulas</a>`);
    return;
  }

  // 7.5 Cabeçalho: [AULA 1.2]  Módulo 1 · Etapa 1: o básico do site
  const numero = "Aula " + numeroDaAula(aula, modulo);
  document.title = numero + " · " + aula.titulo + " | João Saccucci Labs";
  artigo.querySelector(".aula-numero").textContent = numero;
  if (modulo) {
    // Link para o módulo na lista de aulas (aulas.html#<id do módulo>)
    artigo.querySelector(".aula-sobretitulo").insertAdjacentHTML("beforeend",
      `<a class="aula-modulo" href="aulas.html#${encodeURIComponent(modulo.id)}">Módulo ${escapar(modulo.numero)} · ${escapar(modulo.titulo)}</a>`);
  }
  artigo.querySelector(".aula-titulo").textContent = aula.titulo;
  artigo.querySelector(".aula-tempo").textContent = aula.tempoLeitura + " min de leitura";
  artigo.querySelector(".aula-cabecalho").hidden = false;

  // 7.6 Conteúdo: Markdown -> HTML -> componentes do design.
  // A ordem importa:
  // - as caixas antes do glossário (o glossário funciona dentro delas);
  // - o quiz antes dos blocos de código (o quiz também é um ```bloco;
  //   se estiver malformado, continua <pre> e vira código comum);
  // - o glossário antes do sumário.
  conteudo.innerHTML = converterMarkdown(markdown);
  protegerLinks(conteudo);
  criarAvisos(conteudo);
  aplicarGlossario(conteudo, glossario);
  criarChecklist(conteudo);
  criarQuizzes(conteudo, idDaAula);   // js/aula-quiz.js
  prepararCodigos(conteudo);          // js/aula-codigo.js
  embrulharTabelas(conteudo);
  titulosDaAula = montarSumario(conteudo);

  // 7.7 Fim da aula e navegação anterior/próxima
  artigo.querySelector(".aula-fim").hidden = false;
  montarNavegacao(dados, aula);

  // 7.8 Leitura: progresso e item ativo
  window.addEventListener("scroll", agendarAtualizacao, { passive: true });
  window.addEventListener("resize", agendarAtualizacao);
  atualizarLeitura();

  // 7.9 URL com # (ex.: aula.html?id=...#2-os-5-conceitos): a seção só
  // existe agora, então pulamos até ela à mão.
  if (window.location.hash) {
    const titulo = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (titulo) titulo.scrollIntoView({ behavior: "auto" });
  }
}

// Links para a aula anterior e a próxima.
// Ordem: módulo 1 (aulas 1, 2, 3...), depois módulo 2, e assim por
// diante. A última aula de um módulo leva à primeira do seguinte.
// Só andamos entre aulas do MESMO projeto. Uma aula de "Outras aulas"
// (módulo inexistente) anda só entre as outras aulas desse grupo.
function montarNavegacao(dados, aula) {
  const navegacao = artigo.querySelector(".aula-navegacao");
  const organizadas = organizarAulas(dados); // comum.js

  // Acha o módulo desta aula (se houver) para saber o projeto
  const doModulo = organizadas.modulos.find(function (item) { return item.modulo.id === aula.modulo; });

  // Monta a "fila" de aulas, em ordem, guardando o módulo de cada uma
  // (o módulo é usado no número "Aula 1.2" dos links)
  let fila = [];
  if (doModulo) {
    organizadas.modulos
      .filter(function (item) { return item.modulo.projeto === doModulo.modulo.projeto; })
      .forEach(function (item) {
        item.aulas.forEach(function (a) { fila.push({ aula: a, modulo: item.modulo }); });
      });
  } else {
    fila = organizadas.outras.map(function (a) { return { aula: a, modulo: undefined }; });
  }

  const posicao = fila.findIndex(function (item) { return item.aula.id === aula.id; });
  const anterior = fila[posicao - 1]; // undefined se não existir
  const proxima = fila[posicao + 1];

  // Sem nenhuma das duas: o <nav> some
  if (!anterior && !proxima) {
    navegacao.remove();
    return;
  }

  function htmlLink(item, classe, rotulo) {
    const numero = "Aula " + numeroDaAula(item.aula, item.modulo);
    return `
      <a class="aula-nav ${classe}" href="aula.html?id=${encodeURIComponent(item.aula.id)}">
        <span class="aula-nav-rotulo">${rotulo}</span>
        <span class="aula-nav-titulo">${escapar(numero)} · ${escapar(item.aula.titulo)}</span>
      </a>`;
  }

  navegacao.innerHTML =
    (anterior ? htmlLink(anterior, "aula-nav--anterior", "&larr; Aula anterior") : "") +
    (proxima ? htmlLink(proxima, "aula-nav--proxima", "Próxima aula &rarr;") : "");
  navegacao.hidden = false;
}

mostrarAula();
