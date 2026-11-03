/* =========================================================
   equipe.js - monta os perfis dos agentes (equipe.html).
   Os projetos de cada agente NÃO são digitados à mão:
   são calculados olhando os "trabalhos" de cada projeto.
   Agentes de apoio ("apoio": true no agentes.json) não têm
   projetos: o card deles mostra o selo "Apoio" e o bloco "Atuação".
   ========================================================= */

const listaEquipe = document.querySelector("#lista-equipe");

// Devolve só os projetos em que o agente tem um trabalho registrado.
// some() responde true se PELO MENOS UM trabalho é desse agente.
function projetosDoAgente(idAgente, projetos) {
  return projetos.filter(function (projeto) {
    return (projeto.trabalhos || []).some(function (trabalho) {
      return trabalho.agente === idAgente;
    });
  });
}

// Bloco "Projetos" de um agente do fluxo (igual ao da Etapa 1).
// Se ele ainda não tem trabalho registrado, mostra "Nenhum projeto ainda".
function htmlBlocoProjetos(agente, projetos) {
  const projetosDele = projetosDoAgente(agente.id, projetos);

  let listaHtml;
  if (projetosDele.length === 0) {
    listaHtml = `<p class="vazio">Nenhum projeto ainda</p>`;
  } else {
    const itens = projetosDele.map(function (projeto) {
      return `<li><a href="detalhe-projeto.html?id=${encodeURIComponent(projeto.id)}">${escapar(projeto.nome)}</a></li>`;
    }).join("");
    listaHtml = `<ul>${itens}</ul>`;
  }

  return `
      <div class="agente-projetos">
        <h4>Projetos</h4>
        ${listaHtml}
      </div>`;
}

// Bloco "Atuação" de um agente de apoio. Usa também a classe
// .agente-projetos para ocupar a mesma linha do subgrid que o
// "Projetos" dos vizinhos (assim as divisórias ficam na mesma altura).
function htmlBlocoAtuacao() {
  return `
      <div class="agente-projetos agente-atuacao">
        <h4>Atuação</h4>
        <p>Agente de apoio: trabalha direto com o João, fora dos projetos.</p>
      </div>`;
}

function htmlCardAgente(agente, projetos, posicao) {
  // Só "apoio: true" conta como apoio. Sem o campo, ou com false,
  // o agente é do fluxo e o card fica igual ao de antes.
  const ehApoio = agente.apoio === true;

  // Para o agente de apoio NÃO procuramos projetos: mesmo que exista
  // um trabalho dele no projetos.json por engano, o card mostra
  // "Atuação". Quem manda é o campo "apoio".
  const blocoFinal = ehApoio ? htmlBlocoAtuacao() : htmlBlocoProjetos(agente, projetos);

  // O selo vem logo depois do h3: o leitor de tela lê "Mentor de carreira, Apoio".
  // Na tela, o CSS tira o selo da grade (position: absolute) e o põe no canto.
  const classeApoio = ehApoio ? " agente-card--apoio" : "";
  const selo = ehApoio ? `<span class="badge badge--apoio">Apoio</span>` : "";

  return `
    <article class="card agente-card${classeApoio} surgir" style="--agente-cor: ${escapar(agente.cor)}; --atraso: ${posicao * 100}ms">
      <img class="agente-avatar" src="${escapar(agente.avatar)}" alt="Avatar do ${escapar(agente.nome)}">
      <span class="agente-id">UNIDADE://${escapar(agente.id)}</span>
      <h3>${escapar(agente.nome)}</h3>
      ${selo}
      <p class="agente-papel">${escapar(agente.papel)}</p>
      ${blocoFinal}
    </article>`;
}

async function mostrarEquipe() {
  try {
    const [agentes, projetos] = await Promise.all([
      carregarJSON("data/agentes.json"),
      carregarJSON("data/projetos.json")
    ]);

    // A ordem dos cards é a ordem do agentes.json (apoio no fim).
    const cards = agentes.map(function (agente, posicao) {
      return htmlCardAgente(agente, projetos, posicao);
    }).join("");

    listaEquipe.innerHTML = `<div class="grade-equipe">${cards}</div>`;
  } catch (erro) {
    console.error(erro);
    listaEquipe.innerHTML = htmlErroCarregamento();
  }
}

mostrarEquipe();
