/* =========================================================
   detalhe-projeto.js - página de detalhe (detalhe-projeto.html?id=...).
   Uma única página serve para qualquer projeto: o id vem
   da URL e buscamos o projeto certo dentro do JSON.
   ========================================================= */

const areaProjeto = document.querySelector("#detalhe-projeto");

// Lê o "?id=..." da URL. Ex.: detalhe-projeto.html?id=joao-saccucci-labs
const idDaUrl = new URLSearchParams(window.location.search).get("id");


// Bloco de entregáveis. Lista vazia = bloco escondido (devolve texto vazio).
function htmlEntregaveis(entregaveis) {
  if (!entregaveis || entregaveis.length === 0) return "";

  const links = entregaveis.map(function (item) {
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
