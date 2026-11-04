/* =========================================================
   detalhe-projeto.js - página de detalhe (detalhe-projeto.html?id=...).
   Uma única página serve para qualquer projeto: o id vem
   da URL e buscamos o projeto certo dentro do JSON.
   ========================================================= */

const areaProjeto = document.querySelector("#detalhe-projeto");

// Lê o "?id=..." da URL. Ex.: detalhe-projeto.html?id=joao-saccucci-labs
const idDaUrl = new URLSearchParams(window.location.search).get("id");


// Ícones dos botões "Ver site" e "Ver código" (Etapa 6), copiados de
// img/icones/site.svg e img/icones/github.svg. Ficam inline (e não
// num <img>) para herdar a cor do texto do botão via currentColor.
const ICONE_SITE = `<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M6.5 6.5h.01M9.5 6.5h.01"/></svg>`;
const ICONE_GITHUB = `<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 9.5V4l4 2.5a9 9 0 0 1 6 0L19 4v5.5c1.3 1.3 1.8 3 1.4 4.8C19.7 17.7 16.5 20 12 20s-7.7-2.3-8.4-5.7C3.2 12.5 3.7 10.8 5 9.5z"/><path d="M9 13.5v.5M15 13.5v.5"/></svg>`;

// Atributos de todo link que abre em outra aba. O "noreferrer" já
// inclui o "noopener" (a página nova não consegue mexer nesta).
const NOVA_ABA = `target="_blank" rel="noopener noreferrer"`;

// Endereço completo? (ex.: https://github.com/...). Só https é aceito.
function eEnderecoCompleto(url) {
  return typeof url === "string" && url.startsWith("https://");
}

// Confere os campos "site" e "repositorio" do projeto (Etapa 6, US33).
// Vazio ou null = campo não usado (sem aviso). Qualquer outro valor que
// não comece com https:// é ignorado e o motivo vai para o console.
function enderecoValido(projeto, campo) {
  const valor = projeto[campo];
  if (valor === undefined || valor === null || valor === "") return null;

  if (!eEnderecoCompleto(valor)) {
    console.warn(`Projeto "${projeto.id}": o campo "${campo}" foi ignorado porque não começa com https:// (valor: ${valor}).`);
    return null;
  }
  return valor;
}

// Um botão do grupo "Ver site" / "Ver código"
function htmlBotaoProjeto(url, texto, classe, icone) {
  return `
    <a class="btn ${classe} projeto-link" href="${escapar(url)}" ${NOVA_ABA}>
      ${icone}
      <span>${texto}</span>
      <span class="projeto-link-seta" aria-hidden="true">&#8599;</span>
      <span class="sr-only">(abre em nova aba)</span>
    </a>`;
}

// Grupo de botões no fim do cabeçalho. Sem nenhum endereço válido,
// devolve texto vazio e o <div> nem é criado (não sobra espaço).
function htmlLinksDoProjeto(projeto) {
  const site = enderecoValido(projeto, "site");
  const repositorio = enderecoValido(projeto, "repositorio");
  if (!site && !repositorio) return "";

  // "Ver site" sempre primeiro e sempre primário; "Ver código" sempre secundário
  const botoes =
    (site ? htmlBotaoProjeto(site, "Ver site", "btn-primario", ICONE_SITE) : "") +
    (repositorio ? htmlBotaoProjeto(repositorio, "Ver código", "btn-secundario", ICONE_GITHUB) : "");

  return `<div class="projeto-links">${botoes}</div>`;
}

// Bloco de entregáveis. Lista vazia = bloco escondido (devolve texto vazio).
function htmlEntregaveis(entregaveis) {
  if (!entregaveis || entregaveis.length === 0) return "";

  const links = entregaveis.map(function (item) {
    // Etapa 6: endereço completo (https://...) abre em nova aba e avisa o
    // leitor de tela. Caminho relativo continua como antes (mesma aba).
    if (eEnderecoCompleto(item.url)) {
      return `<a class="entregavel" href="${escapar(item.url)}" ${NOVA_ABA}>${escapar(item.titulo)}<span class="sr-only"> (abre em nova aba)</span></a>`;
    }
    return `<a class="entregavel" href="${escapar(item.url)}">${escapar(item.titulo)}</a>`;
  }).join("");

  return `
    <h4 class="trabalho-subtitulo">Entregáveis</h4>
    <div class="entregaveis">${links}</div>`;
}

// Galeria de imagens (prints). Lista vazia = bloco escondido.
function htmlImagens(imagens) {
  if (!imagens || imagens.length === 0) return "";

  const fotos = imagens.map(function (imagem) {
    return `<img src="${escapar(imagem.src)}" alt="${escapar(imagem.alt)}" loading="lazy">`;
  }).join("");

  return `
    <h4 class="trabalho-subtitulo">Imagens</h4>
    <div class="galeria">${fotos}</div>`;
}

// Card com o trabalho de UM agente no projeto
function htmlTrabalho(trabalho, agente, posicao) {
  return `
    <article class="card trabalho surgir" style="--agente-cor: ${escapar(agente.cor)}; --atraso: ${posicao * 100}ms">
      <div class="trabalho-cabecalho">
        <img src="${escapar(agente.avatar)}" alt="Avatar do ${escapar(agente.nome)}">
        <h3>${escapar(agente.nome)}</h3>
      </div>
      <p class="trabalho-resumo">${escapar(trabalho.resumo)}</p>
      ${htmlEntregaveis(trabalho.entregaveis)}
      ${htmlImagens(trabalho.imagens)}
    </article>`;
}

// Mensagem para id inexistente (ou URL sem id)
function htmlNaoEncontrado() {
  return `
    <div class="mensagem mensagem--erro" role="alert">
      <p><strong>Projeto não encontrado.</strong></p>
      <a href="lista-projetos.html">&larr; Voltar para a lista de projetos</a>
    </div>`;
}

async function mostrarProjeto() {
  try {
    // Promise.all carrega os dois arquivos ao mesmo tempo e espera ambos
    const [projetos, agentes] = await Promise.all([
      carregarJSON("data/projetos.json"),
      carregarJSON("data/agentes.json")
    ]);

    // find() devolve o primeiro projeto com o id da URL (ou undefined)
    const projeto = projetos.find(function (p) { return p.id === idDaUrl; });

    if (!projeto) {
      areaProjeto.innerHTML = htmlNaoEncontrado();
      return;
    }

    document.title = projeto.nome + " | João Saccucci Labs";

    const tags = (projeto.tecnologias || []).map(function (tec) {
      return `<span class="tag">${escapar(tec)}</span>`;
    }).join("");

    // Para cada trabalho, achamos os dados do agente (nome, cor, avatar)
    // pelo id. Se o id não existir em agentes.json, o trabalho é ignorado.
    const trabalhos = (projeto.trabalhos || []).map(function (trabalho, posicao) {
      const agente = agentes.find(function (a) { return a.id === trabalho.agente; });
      return agente ? htmlTrabalho(trabalho, agente, posicao) : "";
    }).join("");

    areaProjeto.innerHTML = `
      <header class="projeto-cabecalho surgir">
        <h1>${escapar(projeto.nome)}</h1>
        <p class="texto-suave">${escapar(projeto.descricao)}</p>
        <div class="projeto-meta">
          ${htmlBadge(projeto.status)}
          <span class="data">início ${escapar(projeto.dataInicio)}</span>
          <span class="data">fim ${escapar(projeto.dataFim || "—")}</span>
        </div>
        <div class="tags">${tags}</div>
        ${htmlLinksDoProjeto(projeto) /* Etapa 6: Ver site / Ver código */}
      </header>

      <section aria-labelledby="titulo-trabalhos">
        <h2 id="titulo-trabalhos">Trabalho dos agentes</h2>
        <div class="trabalhos">
          ${trabalhos || `<p class="vazio">Sem itens ainda</p>`}
        </div>
      </section>
      ${htmlLinhaDoTempo(projeto.linhaDoTempo, agentes) /* Etapa 2: vem do js/timeline.js */}`;
  } catch (erro) {
    console.error(erro);
    areaProjeto.innerHTML = htmlErroCarregamento();
  }
}

mostrarProjeto();
