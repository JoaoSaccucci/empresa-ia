/* =========================================================
   aula-codigo.js - os blocos de código da tela de aula.
   Carregado pela aula.html ANTES do aula.js, que chama a
   função prepararCodigos(area) depois de converter o .md.

   O que este arquivo faz (docs/design.md, seções 12.5 a 12.8):
   1. Todo bloco com linguagem ganha números de linha e Copiar.
   2. Lista "- **L3:** texto" logo depois do bloco vira o
      quadro "Linha por linha".
   3. Blocos "```html rodar" e "```js rodar" ganham os botões
      Rodar, Editar e Restaurar.
   4. Rodar: o código roda dentro de um <iframe> isolado
      (sandbox) e a saída do console aparece na aula.

   Regra de ouro: um bloco escrito errado NUNCA quebra a aula.
   Ele aparece como código comum e deixamos um console.warn
   explicando o motivo (para o professor achar o erro).
   ========================================================= */


/* ---------------------------------------------------------
   1. ÍCONES E CONTADOR
   --------------------------------------------------------- */
// Ícones de img/icones/ colados aqui para herdar a cor do CSS
const ICONE_COPIAR = `<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`;
const ICONE_RODAR = `<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/></svg>`;
const ICONE_EDITAR = `<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>`;
const ICONE_RESTAURAR = `<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>`;

// Cada bloco executável ganha um número, usado para criar ids
// únicos na página (ex.: "codigo-dica-1", "console-titulo-1").
let contadorDeBlocos = 0;


/* ---------------------------------------------------------
   2. FUNÇÕES PEQUENAS DE APOIO
   --------------------------------------------------------- */

// Quantas linhas tem um código. Se o texto termina com "\n",
// a última "linha" está vazia e não conta.
function contarLinhas(texto) {
  const linhas = texto.split("\n");
  if (linhas.length > 1 && linhas[linhas.length - 1] === "") linhas.pop();
  return linhas.length;
}

// Coloca os números 1, 2, 3... na coluna da esquerda do bloco
function preencherNumeros(coluna, quantidade) {
  let html = "";
  for (let numero = 1; numero <= quantidade; numero++) {
    html += `<span>${numero}</span>`;
  }
  coluna.innerHTML = html;
}

// Pinta o código com o highlight.js, se a biblioteca carregou e
// conhece a linguagem. Sem ela, o código fica sem cor (mas funciona).
function colorir(codigo, linguagem) {
  if (!linguagem || typeof window.hljs === "undefined" || !hljs.getLanguage(linguagem)) return;
  // O highlight.js marca o elemento com data-highlighted="yes" e se
  // recusa a pintar de novo. Ao recolorir um código editado, tiramos a marca.
  delete codigo.dataset.highlighted;
  hljs.highlightElement(codigo);
}

// Escreve um aviso no elemento role="status" do bloco
// (lido pelos leitores de tela, sem mover o foco).
function anunciar(aviso, texto) {
  aviso.textContent = texto;
}


/* ---------------------------------------------------------
   3. PREPARAR TODOS OS BLOCOS DA AULA
   O marked gera <pre><code class="language-html" data-extra="rodar">.
   (O data-extra vem do renderer que o aula.js configura: guarda
   o que vem depois da linguagem na linha do ```.)
   --------------------------------------------------------- */
function prepararCodigos(area) {
  area.querySelectorAll("pre").forEach(function (pre) {
    const codigo = pre.querySelector("code");
    if (!codigo) return;

    // "language-html" -> "html"
    const classeLinguagem = Array.from(codigo.classList).find(function (c) { return c.startsWith("language-"); });
    const linguagem = classeLinguagem ? classeLinguagem.replace("language-", "") : "";
    const extra = codigo.dataset.extra || "";
    const textoOriginal = codigo.textContent;

    // Só "html rodar" e "js rodar" viram exemplo executável
    let executavel = false;
    if (extra === "rodar") {
      if (linguagem === "html" || linguagem === "js") {
        executavel = true;
      } else {
        console.warn(`Bloco "${linguagem || "(sem linguagem)"} rodar": só html e js podem ter o botão Rodar. O bloco aparece como código comum.`);
      }
    }

    // Guardamos quem vem logo depois do <pre> ANTES de mexer nele
    // (pode ser a lista "Linha por linha")
    const proximo = pre.nextElementSibling;

    colorir(codigo, linguagem);

    // Monta a caixa .codigo com a barra de cima
    const bloco = document.createElement("div");
    bloco.className = "codigo" + (executavel ? " codigo--executavel" : "");
    if (linguagem) bloco.dataset.linguagem = linguagem;

    const rotuloLinguagem = linguagem
      ? `<span class="codigo-linguagem">${escapar(linguagem)}</span>`
      : "";

    // Ordem dos botões: Rodar, Editar, Restaurar, Copiar (design 12.5)
    const botoesDoExemplo = executavel
      ? `<button class="codigo-botao codigo-botao--rodar" type="button" aria-label="Rodar exemplo">${ICONE_RODAR}<span>Rodar</span></button>
         <button class="codigo-botao" type="button" data-acao="editar" aria-pressed="false">${ICONE_EDITAR}<span>Editar</span></button>
         <button class="codigo-botao" type="button" data-acao="restaurar" disabled>${ICONE_RESTAURAR}<span>Restaurar</span></button>`
      : "";

    bloco.innerHTML = `
      <div class="codigo-topo">
        ${rotuloLinguagem}
        <div class="codigo-acoes">
          ${botoesDoExemplo}
          <button class="codigo-botao codigo-copiar" type="button">${ICONE_COPIAR}<span>Copiar</span></button>
        </div>
        <span class="sr-only" role="status"></span>
      </div>`;

    pre.setAttribute("tabindex", "0"); // teclado consegue rolar o código na horizontal
    pre.replaceWith(bloco);

    // Bloco SEM linguagem: igual à Etapa 3 (sem números de linha)
    if (!linguagem) {
      bloco.appendChild(pre);
    } else {
      // Com linguagem: coluna de números + código lado a lado.
      // Os números ficam numa coluna separada, com aria-hidden e
      // user-select: none: não são copiados, nem selecionados, nem lidos.
      const corpo = document.createElement("div");
      corpo.className = "codigo-corpo";
      corpo.innerHTML = `<div class="codigo-numeros" aria-hidden="true"></div>`;
      corpo.appendChild(pre);
      bloco.appendChild(corpo);
      preencherNumeros(corpo.querySelector(".codigo-numeros"), contarLinhas(textoOriginal));
    }

    const aviso = bloco.querySelector('[role="status"]');

    // Copiar copia o texto do <code> (no modo edição, o da caixa de texto).
    // Por isso passamos uma FUNÇÃO que devolve o texto da hora do clique.
    let pegarTexto = function () { return codigo.textContent; };

    if (executavel) {
      pegarTexto = ligarExemplo(bloco, codigo, linguagem, textoOriginal, aviso);
    }

    ligarBotaoCopiar(bloco.querySelector(".codigo-copiar"), pegarTexto, aviso);

    // "Linha por linha": a lista precisa vir logo depois do bloco
    if (proximo && proximo.tagName === "UL" && pareceListaDeLinhas(proximo)) {
      const quadro = criarLinhaPorLinha(proximo, contarLinhas(textoOriginal));
      if (quadro) {
        bloco.appendChild(quadro);
        proximo.remove(); // o conteúdo da lista foi movido para o quadro
      }
    }
  });

  avisarListasDeLinhasSoltas(area);
}


/* ---------------------------------------------------------
   4. BOTÃO COPIAR (Etapa 3, agora recebe uma função)
   --------------------------------------------------------- */
function ligarBotaoCopiar(botao, pegarTexto, aviso) {
  const textoDoBotao = botao.querySelector("span");
  let temporizador = null;

  function mostrarEstado(estado, texto, textoDoAviso) {
    botao.dataset.estado = estado;
    textoDoBotao.textContent = texto;
    anunciar(aviso, textoDoAviso);

    // Depois de ~2 segundos, tudo volta ao normal
    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
      delete botao.dataset.estado;
      textoDoBotao.textContent = "Copiar";
      // Só apaga o aviso se ainda for o nosso (o Rodar usa o mesmo lugar)
      if (aviso.textContent === textoDoAviso) aviso.textContent = "";
    }, 2000);
  }

  botao.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(pegarTexto());
      mostrarEstado("copiado", "Copiado!", "Código copiado");
    } catch (erro) {
      // Sem permissão ou navegador sem clipboard: não finge que copiou
      mostrarEstado("erro", "Não foi possível copiar", "Não foi possível copiar o código");
    }
  });
}


/* ---------------------------------------------------------
   5. "LINHA POR LINHA"
   No .md:   - **L3:** texto     ou   - **L3–5:** texto  (L3-5 também)
   O marked gera <li><strong>L3:</strong> texto</li> (ou, numa lista
   com linhas em branco entre os itens, <li><p><strong>...).
   --------------------------------------------------------- */
// L + número, e opcionalmente "–" ou "-" + outro número, e ":" no fim
const PADRAO_LINHA = /^L(\d+)(?:\s*[–-]\s*(\d+))?:$/;

// Onde está o texto do item: no próprio <li> ou no <p> dentro dele
function textoDoItem(li) {
  return li.querySelector(":scope > p") || li;
}

// Lê "L3:" ou "L3–5:" do começo do item. Devolve { inicio, fim, forte }
// ou null se o item não começar assim.
function lerRotuloDoItem(li) {
  const alvo = textoDoItem(li);
  const forte = alvo.firstElementChild;
  // O <strong> precisa ser a PRIMEIRA coisa do item (só espaços antes)
  if (!forte || forte.tagName !== "STRONG" || !alvo.innerHTML.trimStart().startsWith("<strong>")) return null;

  const achado = forte.textContent.trim().match(PADRAO_LINHA);
  if (!achado) return null;

  const inicio = Number(achado[1]);
  const fim = achado[2] ? Number(achado[2]) : inicio;
  return { inicio: inicio, fim: fim, forte: forte };
}

// Todos os itens começam com **Lnn:**?
function pareceListaDeLinhas(lista) {
  const itens = Array.from(lista.children);
  return itens.length > 0 && itens.every(function (li) { return lerRotuloDoItem(li) !== null; });
}

// Cria o <div class="linhas">. Se algum item citar uma linha que
// não existe, devolve null (a lista fica normal) e avisa no console.
function criarLinhaPorLinha(lista, totalDeLinhas) {
  const itens = Array.from(lista.children);

  // 1º: confere TODOS os itens antes de mexer em qualquer coisa
  for (const li of itens) {
    const rotulo = lerRotuloDoItem(li);
    if (rotulo.inicio < 1 || rotulo.fim < rotulo.inicio || rotulo.fim > totalDeLinhas) {
      console.warn(`Lista "Linha por linha": o item "${rotulo.forte.textContent.trim()}" cita uma linha que não existe (o código tem ${totalDeLinhas} ${totalDeLinhas === 1 ? "linha" : "linhas"}). A lista aparece como lista normal.`);
      return null;
    }
  }

  // 2º: monta o quadro
  const quadro = document.createElement("div");
  quadro.className = "linhas";
  quadro.innerHTML = `<p class="linhas-titulo">Linha por linha</p><ol class="linhas-lista"></ol>`;
  const listaNova = quadro.querySelector(".linhas-lista");

  itens.forEach(function (li) {
    const rotulo = lerRotuloDoItem(li);
    const alvo = textoDoItem(li);

    // "Linha 3" ou "Linhas 3 a 5"
    const textoDoRotulo = rotulo.inicio === rotulo.fim
      ? "Linha " + rotulo.inicio
      : "Linhas " + rotulo.inicio + " a " + rotulo.fim;

    // Tira o <strong>L3:</strong> e o espaço que vinha depois dele
    rotulo.forte.remove();
    if (alvo.firstChild && alvo.firstChild.nodeType === Node.TEXT_NODE) {
      alvo.firstChild.nodeValue = alvo.firstChild.nodeValue.replace(/^\s+/, "");
    }

    const item = document.createElement("li");
    item.className = "linhas-item";
    item.innerHTML = `<span class="linhas-rotulo">${textoDoRotulo}</span><span class="linhas-texto"></span>`;
    // Move o resto do texto (com negrito, `código`, glossário...) para o item novo
    const destino = item.querySelector(".linhas-texto");
    while (alvo.firstChild) destino.appendChild(alvo.firstChild);
    listaNova.appendChild(item);
  });

  return quadro;
}

// Lista no formato **Lnn:** que NÃO vem logo depois de um bloco de
// código: fica como lista normal, só avisamos no console.
function avisarListasDeLinhasSoltas(area) {
  area.querySelectorAll("ul").forEach(function (lista) {
    if (!pareceListaDeLinhas(lista)) return;
    const anterior = lista.previousElementSibling;
    // Logo depois de um bloco: já foi conferida (e avisada) no passo 3
    if (anterior && anterior.classList.contains("codigo")) return;
    console.warn(`Lista "Linha por linha" sem um bloco de código logo antes (começa com "${lista.textContent.trim().slice(0, 40)}..."). Ela aparece como lista normal.`);
  });
}


/* ---------------------------------------------------------
   6. EXEMPLO EXECUTÁVEL: EDITAR, RESTAURAR E RODAR
   Cada bloco guarda dois textos:
   - textoOriginal: o que está no .md (nunca muda);
   - textoAtual: o que está na tela agora (pode ter sido editado).
   O código editado NÃO é salvo: ao recarregar, volta o original.
   Devolve a função que o Copiar usa para pegar o texto atual.
   --------------------------------------------------------- */
function ligarExemplo(bloco, codigo, linguagem, textoOriginal, aviso) {
  contadorDeBlocos++;
  const numeroDoBloco = contadorDeBlocos;

  const pre = codigo.parentElement;
  const corpo = bloco.querySelector(".codigo-corpo");
  const numeros = bloco.querySelector(".codigo-numeros");
  const botaoRodar = bloco.querySelector(".codigo-botao--rodar");
  const botaoEditar = bloco.querySelector('[data-acao="editar"]');
  const botaoRestaurar = bloco.querySelector('[data-acao="restaurar"]');

  let textoAtual = textoOriginal;
  let editando = false;

  // Caixa de texto do modo edição (criada já, mas escondida).
  // spellcheck/autocorrect/autocapitalize desligados: no celular o
  // teclado não "corrige" const para Const.
  const editor = document.createElement("textarea");
  editor.className = "codigo-editor";
  editor.hidden = true;
  editor.setAttribute("aria-label", "Código do exemplo, editável");
  editor.setAttribute("aria-describedby", "codigo-dica-" + numeroDoBloco);
  editor.setAttribute("wrap", "off");
  editor.setAttribute("spellcheck", "false");
  editor.setAttribute("autocapitalize", "off");
  editor.setAttribute("autocomplete", "off");
  editor.setAttribute("autocorrect", "off");
  corpo.appendChild(editor);

  // Dica abaixo da caixa + área de resultado (as duas escondidas)
  bloco.insertAdjacentHTML("beforeend", `
    <p class="codigo-dica" id="codigo-dica-${numeroDoBloco}" hidden>Use espaços para recuar o código. A tecla Tab vai para o próximo botão.</p>
    <div class="codigo-saida" hidden></div>`);
  const dica = bloco.querySelector(".codigo-dica");
  const saida = bloco.querySelector(".codigo-saida");

  // O Restaurar só fica ativo se o código mudou
  function atualizarRestaurar() {
    botaoRestaurar.disabled = textoAtual === textoOriginal;
  }

  // Mostra um texto no <pre> (colorido, com os números certos)
  function mostrarNoPre(texto) {
    codigo.textContent = texto;
    colorir(codigo, linguagem);
    preencherNumeros(numeros, contarLinhas(texto));
  }

  // A caixa cresce com o código (rows = nº de linhas), assim ela não
  // rola na vertical e os números ficam alinhados com cada linha.
  function ajustarEditor() {
    const linhas = editor.value.split("\n").length;
    editor.rows = linhas;
    preencherNumeros(numeros, linhas);
  }

  function entrarNaEdicao() {
    editando = true;
    editor.value = textoAtual;
    ajustarEditor();
    pre.hidden = true;
    editor.hidden = false;
    dica.hidden = false;
    bloco.classList.add("codigo--editando");
    botaoEditar.setAttribute("aria-pressed", "true");
    editor.focus(); // o João pediu para editar: o foco vai para a caixa
  }

  function sairDaEdicao() {
    editando = false;
    mostrarNoPre(textoAtual);
    pre.hidden = false;
    editor.hidden = true;
    dica.hidden = true;
    bloco.classList.remove("codigo--editando");
    botaoEditar.setAttribute("aria-pressed", "false");
  }

  editor.addEventListener("input", function () {
    textoAtual = editor.value;
    ajustarEditor();
    atualizarRestaurar();
  });

  botaoEditar.addEventListener("click", function () {
    if (editando) {
      sairDaEdicao();
    } else {
      entrarNaEdicao();
    }
  });

  botaoRestaurar.addEventListener("click", function () {
    textoAtual = textoOriginal;
    if (editando) {
      sairDaEdicao();
    } else {
      mostrarNoPre(textoOriginal);
    }
    limparSaida();
    atualizarRestaurar(); // fica desativado de novo

    // Um botão desativado perde o foco. Para quem usa teclado não
    // "cair" no começo da página, o foco vai para o Editar.
    botaoEditar.focus();
    anunciar(aviso, "Código original restaurado");
  });

  // --- Rodar ---
  // A "janela" (contentWindow) do iframe que está rodando agora.
  // Só aceitamos mensagens vindas dela (ver seção 7).
  let janelaAtual = null;

  function limparSaida() {
    if (janelaAtual) exemplosRodando.delete(janelaAtual);
    janelaAtual = null;
    saida.innerHTML = ""; // remove o iframe antigo: o código para de rodar
    saida.hidden = true;
  }

  botaoRodar.addEventListener("click", function () {
    // Recomeça do zero: apaga o resultado e o console anteriores
    limparSaida();
    janelaAtual = rodarExemplo(saida, linguagem, textoAtual, numeroDoBloco, aviso);
    // O foco continua no botão Rodar (não pulamos para o resultado)
  });

  // O Copiar pega sempre o texto atual (editado ou não)
  return function () { return textoAtual; };
}


/* ---------------------------------------------------------
   7. RODAR O EXEMPLO NUM IFRAME ISOLADO
   Segurança (US21):
   - sandbox="allow-scripts" SEM allow-same-origin: o código roda
     como se fosse de outro site. Ele não consegue ler nem mudar a
     página da aula, nem o localStorage do site.
   - O código entra pelo atributo srcdoc (uma página inteira
     escrita num texto), não por um arquivo.
   - Uma regra de CSP dentro dessa página proíbe acessar a rede
     (fetch, imagens externas, scripts externos...).
   - O console do iframe é "capturado" e cada mensagem vem para
     cá por postMessage. Só aceitamos mensagens cuja origem
     (event.source) é a janela do iframe daquele exemplo.
   --------------------------------------------------------- */

// Janela do iframe -> função que recebe as mensagens dele
const exemplosRodando = new Map();

window.addEventListener("message", function (evento) {
  // Mensagem de qualquer outro lugar (outra aba, outro iframe): ignorada
  const receber = exemplosRodando.get(evento.source);
  if (!receber) return;

  const dados = evento.data;
  if (!dados || typeof dados.tipo !== "string") return;
  receber(dados);
});

// CSP: só deixa rodar o que está escrito dentro da própria página
// (scripts e estilos "inline") e imagens em data:. Nada de rede.
const CSP_DO_EXEMPLO = "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; media-src data:";

// ATENÇÃO: esta função NÃO roda na página da aula. O texto dela
// (capturarConsole.toString()) é copiado para dentro do iframe,
// e ela roda LÁ, antes do código do exemplo.
// Ela troca console.log/warn/error por versões que, além de
// escrever no console de verdade, mandam o texto para a aula.
function capturarConsole() {
  // Transforma qualquer valor em texto legível
  function paraTexto(valor) {
    if (typeof valor === "string") return valor;
    if (valor instanceof Error) return valor.name + ": " + valor.message;
    if (valor instanceof Node) return valor.outerHTML || valor.textContent; // elemento da página
    if (typeof valor === "object" && valor !== null) {
      // Objetos e listas viram JSON com recuo de 2 espaços
      try {
        return JSON.stringify(valor, null, 2);
      } catch (erro) {
        return String(valor);
      }
    }
    return String(valor); // números, true/false, undefined, funções...
  }

  function enviar(tipo, valores, linha) {
    const texto = Array.prototype.map.call(valores, paraTexto).join(" ");
    // "*": o iframe isolado não sabe o endereço da aula; tudo bem,
    // porque a mensagem só leva o texto do console.
    parent.postMessage({ tipo: tipo, texto: texto, linha: linha || 0 }, "*");
  }

  ["log", "warn", "error"].forEach(function (tipo) {
    const original = console[tipo];
    console[tipo] = function () {
      enviar(tipo, arguments);
      original.apply(console, arguments);
    };
  });

  // Erro no código (ex.: variável que não existe)
  window.addEventListener("error", function (evento) {
    enviar("erro-codigo", [evento.message], evento.lineno);
  });

  // Erro numa Promise sem .catch (ex.: fetch bloqueado)
  window.addEventListener("unhandledrejection", function (evento) {
    enviar("erro-codigo", [evento.reason]);
  });

  // A página terminou de carregar: o código principal já rodou
  window.addEventListener("load", function () {
    parent.postMessage({ tipo: "fim" }, "*");
  });
}

// Monta a página completa que vai no srcdoc.
// Devolve { html, linhasAntes }: linhasAntes é quantas linhas vêm
// ANTES do código do João. O navegador conta as linhas do erro a
// partir do começo da página; descontando linhasAntes, chegamos à
// linha certa do exemplo.
function montarPaginaDoExemplo(linguagem, texto) {
  // color-scheme light + fundo branco: sem isso, a página do exemplo
  // poderia herdar o modo escuro do sistema e ficar ilegível.
  let html =
    `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8">` +
    `<meta http-equiv="Content-Security-Policy" content="${CSP_DO_EXEMPLO}">` +
    `<meta name="color-scheme" content="light">` +
    `<style>html{background:#fff;color:#1A1A1A;font:16px/1.5 system-ui,sans-serif} body{margin:12px}</style>` +
    `<script>(${capturarConsole.toString()})();</script>` +
    `</head><body>\n`;

  if (linguagem === "js") {
    html += `<script>\n`;
    const linhasAntes = html.split("\n").length - 1;
    // Um "</script>" escrito dentro do código fecharia a tag antes da
    // hora. "<\/script>" funciona igual no JavaScript e não fecha a tag.
    html += texto.replace(/<\/script/gi, "<\\/script") + `\n</script></body></html>`;
    return { html: html, linhasAntes: linhasAntes };
  }

  // html: o código do João entra direto no <body>
  const linhasAntes = html.split("\n").length - 1;
  html += texto + `\n</body></html>`;
  return { html: html, linhasAntes: linhasAntes };
}

// Cria a área de saída e o iframe. Devolve a janela do iframe.
function rodarExemplo(saida, linguagem, texto, numeroDoBloco, aviso) {
  const pagina = montarPaginaDoExemplo(linguagem, texto);
  const idTitulo = "console-titulo-" + numeroDoBloco;

  // html: "Resultado" (sempre) + "Console" (só se algo aparecer).
  // js: só o "Console", e o iframe fica invisível (só roda o código).
  const blocoResultado = linguagem === "html"
    ? `<div class="saida-bloco saida-bloco--resultado"><p class="saida-titulo">Resultado</p></div>`
    : "";

  saida.innerHTML = `
    ${blocoResultado}
    <div class="saida-bloco saida-bloco--console"${linguagem === "html" ? " hidden" : ""}>
      <p class="saida-titulo" id="${idTitulo}">Console</p>
      <ol class="console-lista" tabindex="0" aria-labelledby="${idTitulo}" hidden></ol>
      <p class="console-vazio">(nada foi exibido no console)</p>
    </div>`;

  const blocoConsole = saida.querySelector(".saida-bloco--console");
  const lista = saida.querySelector(".console-lista");
  const vazio = saida.querySelector(".console-vazio");
  let quantidade = 0;

  const iframe = document.createElement("iframe");
  iframe.className = "saida-iframe";
  iframe.title = "Resultado do exemplo";
  iframe.setAttribute("sandbox", "allow-scripts");
  iframe.srcdoc = pagina.html;

  if (linguagem === "html") {
    saida.querySelector(".saida-bloco--resultado").appendChild(iframe);
  } else {
    iframe.hidden = true;
    saida.appendChild(iframe);
  }
  saida.hidden = false;

  // Uma linha nova no Console. O texto entra com textContent,
  // então nada que o exemplo mande vira HTML na aula.
  function adicionarLinha(classe, prefixo, prefixoEscondido, texto) {
    const linha = document.createElement("li");
    linha.className = "console-linha " + classe;
    linha.innerHTML = `<span class="console-prefixo"${prefixoEscondido ? ' aria-hidden="true"' : ""}>${prefixo}</span><span class="console-texto"></span>`;
    linha.querySelector(".console-texto").textContent = texto;
    lista.appendChild(linha);

    quantidade++;
    lista.hidden = false;
    vazio.hidden = true;
    blocoConsole.hidden = false; // no html, o Console aparece agora
  }

  function receberMensagem(dados) {
    const texto = String(dados.texto);
    if (dados.tipo === "log") {
      adicionarLinha("console-linha--log", "›", true, texto);
    } else if (dados.tipo === "warn") {
      adicionarLinha("console-linha--aviso", "Aviso:", false, texto);
    } else if (dados.tipo === "error") {
      adicionarLinha("console-linha--erro", "Erro:", false, texto);
    } else if (dados.tipo === "erro-codigo") {
      // O Chrome escreve "Uncaught ReferenceError: ..."; o "Uncaught" sai
      let mensagem = texto.replace(/^Uncaught\s+/, "");
      const linha = Number(dados.linha) - pagina.linhasAntes;
      if (linha >= 1) mensagem += " (linha " + linha + ")";
      adicionarLinha("console-linha--erro", "Erro:", false, mensagem);
    } else if (dados.tipo === "fim") {
      anunciar(aviso, "Exemplo executado. " + textoDaQuantidade(quantidade));
    }
  }

  // O iframe só tem "janela" depois de entrar na página (acima)
  const janela = iframe.contentWindow;
  exemplosRodando.set(janela, receberMensagem);
  return janela;
}

function textoDaQuantidade(quantidade) {
  if (quantidade === 0) return "Nada foi exibido no console.";
  if (quantidade === 1) return "1 linha no console.";
  return quantidade + " linhas no console.";
}
