/* =========================================================
   lista-projetos.js - monta a lista de projetos (lista-projetos.html)
   a partir de data/projetos.json.
   ========================================================= */

const listaProjetos = document.querySelector("#lista-projetos");

// Cria o HTML de um card. O card inteiro é um link para o detalhe.
// encodeURIComponent deixa o id seguro para usar dentro de uma URL.
function htmlCardProjeto(projeto, posicao) {
  return `
    <a class="card projeto-card surgir" style="--atraso: ${posicao * 100}ms"
       href="detalhe-projeto.html?id=${encodeURIComponent(projeto.id)}">
      <div class="projeto-card-topo">
        <h3>${escapar(projeto.nome)}</h3>
        ${htmlBadge(projeto.status)}
      </div>
      <p class="projeto-card-descricao">${escapar(projeto.descricao)}</p>
      <span class="data">início ${escapar(projeto.dataInicio)}</span>
      <span class="projeto-card-link">Ver detalhes &rarr;</span>
    </a>`;
}

async function mostrarProjetos() {
  try {
    const projetos = await carregarJSON("data/projetos.json");

    if (projetos.length === 0) {
      listaProjetos.innerHTML = `<p class="mensagem">Nenhum projeto cadastrado ainda.</p>`;
      return;
    }

    // map() transforma cada projeto em um pedaço de HTML; join("") junta tudo
    const cards = projetos.map(htmlCardProjeto).join("");
    listaProjetos.innerHTML = `<div class="grade-cards">${cards}</div>`;
  } catch (erro) {
    console.error(erro); // detalhe técnico fica no console (F12)
    listaProjetos.innerHTML = htmlErroCarregamento();
  }
}

mostrarProjetos();
