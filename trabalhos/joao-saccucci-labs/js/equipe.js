/* =========================================================
   equipe.js - monta os perfis dos agentes (equipe.html).
   Os projetos de cada agente NÃO são digitados à mão:
   são calculados olhando os "trabalhos" de cada projeto.
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

function htmlCardAgente(agente, projetos, posicao) {
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
    <article class="card agente-card surgir" style="--agente-cor: ${escapar(agente.cor)}; --atraso: ${posicao * 100}ms">
      <img class="agente-avatar" src="${escapar(agente.avatar)}" alt="Avatar do ${escapar(agente.nome)}">
      <span class="agente-id">UNIDADE://${escapar(agente.id)}</span>
      <h3>${escapar(agente.nome)}</h3>
      <p class="agente-papel">${escapar(agente.papel)}</p>
      <div class="agente-projetos">
        <h4>Projetos</h4>
        ${listaHtml}
      </div>
    </article>`;
}

async function mostrarEquipe() {
  try {
    const [agentes, projetos] = await Promise.all([
      carregarJSON("data/agentes.json"),
      carregarJSON("data/projetos.json")
    ]);

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
