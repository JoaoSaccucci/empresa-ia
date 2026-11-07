/* =========================================================
   aulas.js - monta a aba Aulas (aulas.html)
   a partir de data/aulas.json.
   Etapa 4: as aulas aparecem agrupadas por projeto e, dentro
   dele, por módulo (docs/design.md, seção 12.2).
   Etapa 7: no topo fica um botão por projeto, e a lista mostra
   só o projeto escolhido (docs/design.md, seção 15).
   O nome de cada projeto vem de data/projetos.json, e o "✓
   Concluída" vem do progresso salvo no navegador (comum.js).
   ========================================================= */

const areaAulas = document.querySelector("#area-aulas");
const grupoEscolha = document.querySelector("#escolha-projeto");
const listaEscolha = document.querySelector("#escolha-projeto-lista");

// Ícone de relógio (img/icones/relogio.svg) colado aqui dentro
// para herdar a cor do CSS (currentColor). É só decorativo.
const ICONE_RELOGIO = `<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

// Id do grupo "Outras aulas" (aulas com módulo inexistente).
// É reservado: nenhum projeto pode usar esse id (requisitos, US40).
const ID_OUTRAS = "outras-aulas";

// Chave do localStorage com o último projeto aberto.
// O comum.js acrescenta o prefixo: fica "jsl:aulas-projeto".
const CHAVE_PROJETO = "aulas-projeto";

// Conta quantos cards já foram criados, para o efeito .surgir
// aparecer um depois do outro (cada card espera um pouco mais).
let posicaoDoCard = 0;

// Estado da página, preenchido depois que os JSON carregam:
// - grupos: um item por botão, já na ordem da tela
//   ({ id, nome, modulos: [...], aulas: [...] })
// - modulosPorId: para achar o projeto de um módulo pelo # do endereço.
//   É um Map, e não um objeto {} comum: o texto do # vem de quem digita
//   o endereço, e num {} nomes como "constructor" ou "toString" já
//   existem (vêm herdados de todo objeto). Com {}, aulas.html#constructor
//   acharia uma função e quebraria a página. O Map só tem o que foi
//   colocado nele com set().
// - projetoAberto: id do grupo que está na tela agora
let grupos = [];
let modulosPorId = new Map();
let projetoAberto = null;


/* ---------------------------------------------------------
   1. HTML DA LISTA (cards e módulos, igual à Etapa 4)
   --------------------------------------------------------- */

// HTML de um card de aula (design.md, seção 12.2).
// modulo pode ser undefined (aulas do grupo "Outras aulas").
// nivelDoTitulo: "h4" dentro de um módulo, "h3" em "Outras aulas".
// comAnimacao: true só na primeira montagem da página (o "surgir").
function htmlCardAula(aula, modulo, concluida, nivelDoTitulo, comAnimacao) {
  const numero = numeroDaAula(aula, modulo); // "1.2" ou "2"

  // Só as aulas concluídas ganham a classe e o selo "✓ Concluída".
  // O selo tem texto, então não depende só da cor (leitor de tela lê).
  const classeConcluida = concluida ? " aula-card--concluida" : "";
  const topo = concluida
    ? `<div class="aula-card-topo">
         <span class="aula-card-status"><span aria-hidden="true">✓</span> Concluída</span>
       </div>`
    : "";

  // Até 5 cards o atraso cresce; depois disso, para de crescer
  // (senão os últimos cards demorariam demais para aparecer).
  let abertura = "<li>";
  if (comAnimacao) {
    const atraso = Math.min(posicaoDoCard, 5) * 100;
    posicaoDoCard++;
    abertura = `<li class="surgir" style="--atraso: ${atraso}ms">`;
  }

  return `
    ${abertura}
      <a class="card aula-card${classeConcluida}" href="aula.html?id=${encodeURIComponent(aula.id)}">
        <span class="aula-card-numero" aria-hidden="true">${escapar(numero)}</span>
        <div class="aula-card-corpo">
          ${topo}
          <${nivelDoTitulo} class="aula-card-titulo"><span class="sr-only">Aula ${escapar(numero)}: </span>${escapar(aula.titulo)}</${nivelDoTitulo}>
          <p class="aula-card-resumo">${escapar(aula.resumo)}</p>
          <div class="aula-card-rodape">
            <span class="aula-card-tempo">${ICONE_RELOGIO}${escapar(aula.tempoLeitura)} min de leitura</span>
            <span class="aula-card-ler" aria-hidden="true">Ler aula &rarr;</span>
          </div>
        </div>
      </a>
    </li>`;
}

// HTML de um módulo: cabeçalho (número, nome, resumo, progresso) + cards
function htmlModulo(item, concluidas, comAnimacao) {
  const modulo = item.modulo;
  const total = item.aulas.length;
  const feitas = item.aulas.filter(function (aula) { return concluidas.includes(aula.id); }).length;
  const completo = feitas === total;

  // O id do módulo vira o id da <section>: assim aulas.html#<id> leva até ele
  const id = escapar(modulo.id);

  const resumo = modulo.resumo
    ? `<p class="modulo-resumo">${escapar(modulo.resumo)}</p>`
    : "";

  // O texto é a informação; a barrinha é só decoração (aria-hidden)
  const marcaCompleto = completo ? ` <span aria-hidden="true">✓</span>` : "";

  const cards = item.aulas.map(function (aula) {
    return htmlCardAula(aula, modulo, concluidas.includes(aula.id), "h4", comAnimacao);
  }).join("");

  return `
    <section class="modulo${completo ? " modulo--completo" : ""}" id="${id}" aria-labelledby="${id}-titulo">
      <header class="modulo-cabecalho">
        <h3 class="modulo-titulo" id="${id}-titulo">
          <span class="modulo-numero">Módulo ${escapar(modulo.numero)}</span><span class="sr-only"> — </span>
          <span class="modulo-nome">${escapar(modulo.titulo)}</span>
        </h3>
        ${resumo}
        <div class="modulo-progresso">
          <span class="modulo-progresso-texto">${feitas} de ${total} concluídas${marcaCompleto}</span>
          <span class="modulo-barra" aria-hidden="true" style="--progresso: ${(feitas / total).toFixed(3)}">
            <span class="modulo-barra-preenchida"></span>
          </span>
        </div>
      </header>
      <ol class="lista-aulas">${cards}</ol>
    </section>`;
}

// HTML do projeto escolhido (o único que aparece abaixo dos botões).
// animacao: "surgir" (primeira montagem, card a card), "trocar"
// (troca de projeto, fade curto da lista inteira) ou "nenhuma".
function htmlGrupo(grupo, animacao) {
  const concluidas = lerAulasConcluidas(); // ex.: ["joao-saccucci-labs-m1-aula-02"]
  const comSurgir = animacao === "surgir";
  const classeTrocar = animacao === "trocar" ? " aulas-trocar" : "";
  posicaoDoCard = 0;

  // "Outras aulas": sem número de módulo e sem barra.
  // A section NÃO tem id="outras-aulas": se tivesse, o navegador
  // rolaria até ela com aulas.html#outras-aulas (design.md, 15.2).
  if (grupo.id === ID_OUTRAS) {
    const cards = grupo.aulas.map(function (aula) {
      return htmlCardAula(aula, undefined, concluidas.includes(aula.id), "h3", comSurgir);
    }).join("");
    return `
      <section class="aulas-projeto aulas-projeto--outras${classeTrocar}" aria-labelledby="titulo-outras-aulas">
        <h2 class="aulas-projeto-titulo" id="titulo-outras-aulas">Outras aulas</h2>
        <ol class="lista-aulas">${cards}</ol>
      </section>`;
  }

  // O título usa "projeto-<id>" e nunca o id puro do projeto
  // (pelo mesmo motivo: o # do endereço não pode achar um elemento).
  const idTitulo = "projeto-" + escapar(grupo.id);
  const modulos = grupo.modulos.map(function (item) {
    return htmlModulo(item, concluidas, comSurgir);
  }).join("");
  return `
    <section class="aulas-projeto${classeTrocar}" aria-labelledby="${idTitulo}">
      <h2 class="aulas-projeto-titulo" id="${idTitulo}">${escapar(grupo.nome)}</h2>
      ${modulos}
    </section>`;
}


/* ---------------------------------------------------------
   2. GRUPOS E ORDEM DOS BOTÕES
   Regra dos requisitos (Etapa 7, "Ordem dos botões"):
   1º projetos de projetos.json com dataInicio válida, da data
      maior para a menor (empate: o que está mais para o fim do
      arquivo vem primeiro);
   2º projetos de projetos.json sem dataInicio válida, do fim
      do arquivo para o começo;
   3º projetos com aulas que não estão em projetos.json, em
      ordem alfabética do id;
   por último, "Outras aulas" (se existir).
   --------------------------------------------------------- */
function montarGrupos(organizadas, projetos) {
  // Junta os módulos por projeto. Dentro de cada projeto, os módulos
  // continuam na ordem de organizarAulas (por número).
  const lista = [];
  modulosPorId = new Map();
  organizadas.modulos.forEach(function (item) {
    const idProjeto = item.modulo.projeto;
    let grupo = lista.find(function (g) { return g.id === idProjeto; });
    if (!grupo) {
      grupo = { id: idProjeto, nome: idProjeto, modulos: [], aulas: [] };
      lista.push(grupo);
    }
    grupo.modulos.push(item);
    grupo.aulas = grupo.aulas.concat(item.aulas); // todas as aulas, para o progresso do botão
    modulosPorId.set(item.modulo.id, idProjeto);
  });

  // Para cada grupo, descobre a posição em projetos.json, o nome e a data
  lista.forEach(function (grupo) {
    grupo.posicao = projetos.findIndex(function (p) { return p && p.id === grupo.id; });
    const projeto = projetos[grupo.posicao];
    if (projeto) {
      grupo.nome = projeto.nome || grupo.id;
      // "AAAA-MM-DD": nesse formato, comparar como texto já dá a ordem certa
      grupo.data = /^\d{4}-\d{2}-\d{2}$/.test(projeto.dataInicio) ? projeto.dataInicio : null;
    }
  });

  // Categoria: 0 = tem data, 1 = sem data, 2 = fora de projetos.json
  function categoria(grupo) {
    if (grupo.posicao === -1) return 2;
    return grupo.data ? 0 : 1;
  }

  lista.sort(function (a, b) {
    const ca = categoria(a);
    const cb = categoria(b);
    if (ca !== cb) return ca - cb;
    if (ca === 2) return a.id.localeCompare(b.id, "pt-BR");
    if (ca === 0 && a.data !== b.data) return a.data > b.data ? -1 : 1; // data maior primeiro
    return b.posicao - a.posicao; // mais para o fim do arquivo primeiro
  });

  if (organizadas.outras.length > 0) {
    lista.push({ id: ID_OUTRAS, nome: "Outras aulas", modulos: [], aulas: organizadas.outras });
  }
  return lista;
}

function acharGrupo(id) {
  return grupos.find(function (g) { return g.id === id; });
}


/* ---------------------------------------------------------
   3. BOTÕES DE PROJETO
   São criados uma vez só. Depois, ao trocar de projeto, só o
   aria-pressed muda: recriar os botões tiraria o foco do teclado
   do botão escolhido (US41).
   --------------------------------------------------------- */

// "X de Y concluídas": singular e plural seguem o total Y
function textoProgresso(feitas, total) {
  return feitas + " de " + total + (total === 1 ? " concluída" : " concluídas");
}

// Cria os botões: nome + pausa escondida + progresso.
// A ", " só para o leitor de tela faz ele ler "Agenda, 3 de 8
// concluídas" (sem ela, alguns juntam "Agenda3 de 8").
// O texto do progresso é preenchido logo depois, por
// atualizarProgressoDosBotoes() (a mesma função do "Voltar").
function criarBotoes() {
  listaEscolha.innerHTML = grupos.map(function (grupo) {
    const classeOutras = grupo.id === ID_OUTRAS ? " escolha-botao--outras" : "";
    return `<button class="escolha-botao${classeOutras}" type="button" aria-pressed="false" aria-controls="area-aulas" data-projeto="${escapar(grupo.id)}">
      <span class="escolha-botao-nome">${escapar(grupo.nome)}</span><span class="sr-only">, </span>
      <span class="escolha-botao-progresso"></span>
    </button>`;
  }).join("");
  atualizarProgressoDosBotoes();
  grupoEscolha.hidden = false;
}

// Atualiza o progresso de cada botão NO LUGAR (sem recriar o botão).
// Usado ao criar e quando a página volta pelo "Voltar" do navegador.
function atualizarProgressoDosBotoes() {
  const concluidas = lerAulasConcluidas();
  listaEscolha.querySelectorAll(".escolha-botao").forEach(function (botao) {
    const grupo = acharGrupo(botao.dataset.projeto);
    if (!grupo) return;
    const feitas = grupo.aulas.filter(function (aula) { return concluidas.includes(aula.id); }).length;
    const total = grupo.aulas.length;
    const progresso = botao.querySelector(".escolha-botao-progresso");
    progresso.innerHTML = textoProgresso(feitas, total) + (feitas === total ? ` <span aria-hidden="true">✓</span>` : "");
    botao.classList.toggle("escolha-botao--completo", feitas === total);
  });
}

// Só um botão fica com aria-pressed="true": o do projeto aberto
function marcarBotao(id) {
  listaEscolha.querySelectorAll(".escolha-botao").forEach(function (botao) {
    botao.setAttribute("aria-pressed", String(botao.dataset.projeto === id));
  });
}


/* ---------------------------------------------------------
   4. QUAL PROJETO ABRE
   Ordem (requisitos, "Qual projeto abre"): o # do endereço
   sempre vence; sem # (ou com um # que não serve), vale o
   último projeto salvo; sem nada disso, o primeiro botão.
   --------------------------------------------------------- */

// Lê o # e diz o que ele indica, procurando nesta ordem:
// projeto, módulo, "outras-aulas". Devolve null se não servir.
function lerEndereco() {
  let texto;
  try {
    texto = decodeURIComponent(window.location.hash.slice(1));
  } catch (erro) {
    return null; // # com "%" quebrado (ex.: #%E0): tratamos como inválido
  }
  if (!texto) return null;

  if (texto !== ID_OUTRAS && acharGrupo(texto)) return { projeto: texto, modulo: null };
  if (modulosPorId.has(texto)) return { projeto: modulosPorId.get(texto), modulo: texto };
  if (texto === ID_OUTRAS && acharGrupo(ID_OUTRAS)) return { projeto: ID_OUTRAS, modulo: null };
  return null;
}

// Projeto salvo na chave, ou o primeiro botão (o mais recente)
function projetoSemEndereco() {
  const salvo = lerProgresso(CHAVE_PROJETO, null);
  // typeof: protege contra valor estranho na chave (número, lista...)
  if (typeof salvo === "string" && acharGrupo(salvo)) return salvo;
  return grupos[0].id;
}

// Ajusta o endereço para aulas.html#<id> sem criar passo novo no
// "Voltar" do navegador (replaceState, e não pushState: decisão 5
// da seção 9 dos requisitos). replaceState não dispara "hashchange".
function trocarEndereco(id) {
  history.replaceState(null, "", "#" + encodeURIComponent(id));
}

// Mostra um grupo abaixo dos botões e salva a escolha
function abrirProjeto(id, animacao) {
  projetoAberto = id;
  marcarBotao(id);
  areaAulas.innerHTML = `<div class="aulas" id="lista-aulas">${htmlGrupo(acharGrupo(id), animacao)}</div>`;
  salvarProgresso(CHAVE_PROJETO, id); // se o localStorage falhar, só não lembra
}

// Rola até o módulo do endereço (aulas.html#agenda-m1). O módulo
// só existe depois que o JS monta a lista, por isso é feito à mão.
function irParaModulo(idModulo) {
  const alvo = document.getElementById(idModulo);
  if (alvo) alvo.scrollIntoView({ behavior: "auto" });
}

// Abre o projeto certo para o endereço atual.
// animacao: "surgir" ao abrir a página, "trocar" quando o # muda.
function abrirPeloEndereco(animacao) {
  const alvo = lerEndereco();

  if (!alvo) {
    // Sem # ou # que não serve: chave salva ou projeto mais recente,
    // e o endereço passa a mostrar o projeto aberto.
    // Com a página já aberta, o projeto da tela é o mesmo que foi
    // salvo na chave, então ele continua (isso também vale quando o
    // localStorage está bloqueado e a chave não existe).
    const id = projetoAberto || projetoSemEndereco();
    if (id !== projetoAberto) abrirProjeto(id, animacao);
    trocarEndereco(id);
    return;
  }

  if (alvo.projeto !== projetoAberto) {
    abrirProjeto(alvo.projeto, animacao);
  } else {
    salvarProgresso(CHAVE_PROJETO, alvo.projeto); // mesmo projeto: só salva
  }
  if (alvo.modulo) irParaModulo(alvo.modulo);
}


/* ---------------------------------------------------------
   5. COMEÇO: carrega os JSON e monta tudo
   --------------------------------------------------------- */
async function iniciar() {
  try {
    const dados = await carregarJSON("data/aulas.json");

    // Os nomes e as datas dos projetos são um "extra": se projetos.json
    // falhar, os botões aparecem mesmo assim, com o id no lugar do nome
    // e em ordem alfabética. .catch() transforma o erro em lista vazia.
    let projetos = await carregarJSON("data/projetos.json").catch(function () { return []; });
    if (!Array.isArray(projetos)) projetos = [];

    // Módulos em ordem (já sem os vazios) + aulas de módulo inexistente
    grupos = montarGrupos(organizarAulas(dados), projetos);

    if (grupos.length === 0) {
      areaAulas.innerHTML = `<p class="mensagem">Nenhuma aula publicada ainda.</p>`;
      return;
    }

    criarBotoes();
    abrirPeloEndereco("surgir");
  } catch (erro) {
    // aulas.json não carregou: só a mensagem de erro (ela tem
    // role="alert" para o leitor de tela anunciar), sem botões.
    console.error(erro);
    grupos = [];
    grupoEscolha.hidden = true;
    areaAulas.innerHTML = htmlErroCarregamento();
  }
}

// Clique (ou Enter/Espaço, que o <button> já transforma em clique).
// Um listener só, no grupo, serve para todos os botões.
listaEscolha.addEventListener("click", function (evento) {
  const botao = evento.target.closest(".escolha-botao");
  if (!botao) return;
  const id = botao.dataset.projeto;
  if (id === projetoAberto) return; // já está aberto: não remonta nada
  abrirProjeto(id, "trocar");
  trocarEndereco(id);
});

// O João mudou o # com a página aberta (editou o endereço e deu Enter,
// ou clicou num link aulas.html#... desta mesma página)
window.addEventListener("hashchange", function () {
  if (grupos.length > 0) abrirPeloEndereco("trocar");
});

// Quando a pessoa volta para esta página pelo botão "Voltar" do
// navegador, ele pode mostrar a versão guardada na memória (sem rodar
// o JS de novo). "pageshow" com persisted = true avisa esse caso:
// atualizamos o progresso dos botões no lugar e remontamos a lista
// sem animação, para o "✓ Concluída" ficar em dia.
window.addEventListener("pageshow", function (evento) {
  if (!evento.persisted) return;
  if (grupos.length === 0) {
    iniciar(); // da primeira vez deu erro: tenta de novo
    return;
  }
  atualizarProgressoDosBotoes();
  abrirProjeto(projetoAberto, "nenhuma");
});

iniciar();
