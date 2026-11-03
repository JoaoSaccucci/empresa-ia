/* =========================================================
   aulas.js - monta a lista de aulas (aulas.html)
   a partir de data/aulas.json.
   O nome de cada projeto vem de data/projetos.json, e o "✓
   Concluída" vem do progresso salvo no navegador (comum.js).
   ========================================================= */

const areaAulas = document.querySelector("#area-aulas");

// Ícone de relógio (img/icones/relogio.svg) colado aqui dentro
// para herdar a cor do CSS (currentColor). É só decorativo.
const ICONE_RELOGIO = `<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

// 1 -> "01", 12 -> "12"
function numeroComDoisDigitos(numero) {
  return String(numero).padStart(2, "0");
}

// HTML de um item da lista (estrutura do docs/design.md, seção 11.3)
function htmlItemAula(aula, nomeDoProjeto, concluida, posicao) {
  const numero = numeroComDoisDigitos(aula.numero);

  // Só as aulas concluídas ganham a classe e o selo "✓ Concluída".
  // O selo tem texto, então não depende só da cor (leitor de tela lê).
  const classeConcluida = concluida ? " aula-card--concluida" : "";
  const selo = concluida
    ? `<span class="aula-card-status"><span aria-hidden="true">✓</span> Concluída</span>`
    : "";

  return `
    <li class="surgir" style="--atraso: ${posicao * 100}ms">
      <a class="card aula-card${classeConcluida}" href="aula.html?id=${encodeURIComponent(aula.id)}">
        <span class="aula-card-numero" aria-hidden="true">${numero}</span>
        <div class="aula-card-corpo">
          <div class="aula-card-topo">
            <span class="aula-card-projeto">${escapar(nomeDoProjeto)}</span>
            ${selo}
          </div>
          <h2 class="aula-card-titulo"><span class="sr-only">Aula ${numero}: </span>${escapar(aula.titulo)}</h2>
          <p class="aula-card-resumo">${escapar(aula.resumo)}</p>
          <div class="aula-card-rodape">
            <span class="aula-card-tempo">${ICONE_RELOGIO}${escapar(aula.tempoLeitura)} min de leitura</span>
            <span class="aula-card-ler" aria-hidden="true">Ler aula &rarr;</span>
          </div>
        </div>
      </a>
    </li>`;
}

async function mostrarAulas() {
  try {
    const aulas = await carregarJSON("data/aulas.json");

    // Os nomes dos projetos são um "extra": se projetos.json falhar,
    // a lista aparece mesmo assim, com o id do projeto no lugar do nome.
    // .catch() aqui transforma o erro em uma lista vazia.
    const projetos = await carregarJSON("data/projetos.json").catch(function () { return []; });

    if (aulas.length === 0) {
      areaAulas.innerHTML = `<p class="mensagem">Nenhuma aula publicada ainda.</p>`;
      return;
    }

    // Procura o nome do projeto pelo id (ou devolve o próprio id)
    function nomeDoProjeto(idProjeto) {
      const projeto = projetos.find(function (p) { return p.id === idProjeto; });
      return projeto ? projeto.nome : idProjeto;
    }

    // Ordena por nome do projeto e, dentro do mesmo projeto, pelo número.
    // slice() faz uma cópia antes, para o sort não mexer na lista original.
    const ordenadas = aulas.slice().sort(function (a, b) {
      const porProjeto = nomeDoProjeto(a.projeto).localeCompare(nomeDoProjeto(b.projeto), "pt-BR");
      if (porProjeto !== 0) return porProjeto;
      return a.numero - b.numero; // mesmo projeto: menor número primeiro
    });

    const concluidas = lerAulasConcluidas(); // ex.: ["joao-saccucci-labs-aula-01"]

    const itens = ordenadas.map(function (aula, posicao) {
      const concluida = concluidas.includes(aula.id);
      return htmlItemAula(aula, nomeDoProjeto(aula.projeto), concluida, posicao);
    }).join("");

    areaAulas.innerHTML = `<ol class="lista-aulas" id="lista-aulas">${itens}</ol>`;
  } catch (erro) {
    console.error(erro);
    areaAulas.innerHTML = htmlErroCarregamento();
  }
}

mostrarAulas();

// Quando a pessoa volta para esta página pelo botão "Voltar" do
// navegador, ele pode mostrar a versão guardada na memória (sem rodar
// o JS de novo). "pageshow" com persisted = true avisa esse caso, e
// remontamos a lista para o "✓ Concluída" ficar atualizado.
window.addEventListener("pageshow", function (evento) {
  if (evento.persisted) mostrarAulas();
});
