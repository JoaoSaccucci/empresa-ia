/* =========================================================
   aulas.js - monta a lista de aulas (aulas.html)
   a partir de data/aulas.json.
   Etapa 4: as aulas aparecem agrupadas por projeto e, dentro
   dele, por módulo (docs/design.md, seção 12.2).
   O nome de cada projeto vem de data/projetos.json, e o "✓
   Concluída" vem do progresso salvo no navegador (comum.js).
   ========================================================= */

const areaAulas = document.querySelector("#area-aulas");

// Ícone de relógio (img/icones/relogio.svg) colado aqui dentro
// para herdar a cor do CSS (currentColor). É só decorativo.
const ICONE_RELOGIO = `<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

// Conta quantos cards já foram criados, para o efeito .surgir
// aparecer um depois do outro (cada card espera um pouco mais).
let posicaoDoCard = 0;

// HTML de um card de aula (design.md, seção 12.2).
// modulo pode ser undefined (aulas do grupo "Outras aulas").
// nivelDoTitulo: "h4" dentro de um módulo, "h3" em "Outras aulas".
function htmlCardAula(aula, modulo, concluida, nivelDoTitulo) {
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
  const atraso = Math.min(posicaoDoCard, 5) * 100;
  posicaoDoCard++;

  return `
    <li class="surgir" style="--atraso: ${atraso}ms">
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
function htmlModulo(item, concluidas) {
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
    return htmlCardAula(aula, modulo, concluidas.includes(aula.id), "h4");
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

async function mostrarAulas() {
  try {
    const dados = await carregarJSON("data/aulas.json");

    // Os nomes dos projetos são um "extra": se projetos.json falhar,
    // a lista aparece mesmo assim, com o id do projeto no lugar do nome.
    // .catch() aqui transforma o erro em uma lista vazia.
    const projetos = await carregarJSON("data/projetos.json").catch(function () { return []; });

    // Módulos em ordem (já sem os vazios) + aulas de módulo inexistente
    const organizadas = organizarAulas(dados);

    if (organizadas.modulos.length === 0 && organizadas.outras.length === 0) {
      areaAulas.innerHTML = `<p class="mensagem">Nenhuma aula publicada ainda.</p>`;
      return;
    }

    // Procura o nome do projeto pelo id (ou devolve o próprio id)
    function nomeDoProjeto(idProjeto) {
      const projeto = projetos.find(function (p) { return p.id === idProjeto; });
      return projeto ? projeto.nome : idProjeto;
    }

    // Agrupa os módulos por projeto. A ordem dos módulos dentro de
    // cada projeto continua a de organizarAulas (por número).
    const grupos = [];
    organizadas.modulos.forEach(function (item) {
      let grupo = grupos.find(function (g) { return g.idProjeto === item.modulo.projeto; });
      if (!grupo) {
        grupo = { idProjeto: item.modulo.projeto, modulos: [] };
        grupos.push(grupo);
      }
      grupo.modulos.push(item);
    });

    // Projetos em ordem alfabética pelo nome
    grupos.sort(function (a, b) {
      return nomeDoProjeto(a.idProjeto).localeCompare(nomeDoProjeto(b.idProjeto), "pt-BR");
    });

    const concluidas = lerAulasConcluidas(); // ex.: ["joao-saccucci-labs-m1-aula-02"]
    posicaoDoCard = 0;

    let html = grupos.map(function (grupo) {
      const idTitulo = "projeto-" + escapar(grupo.idProjeto);
      const modulos = grupo.modulos.map(function (item) { return htmlModulo(item, concluidas); }).join("");
      return `
        <section class="aulas-projeto" aria-labelledby="${idTitulo}">
          <h2 class="aulas-projeto-titulo" id="${idTitulo}">${escapar(nomeDoProjeto(grupo.idProjeto))}</h2>
          ${modulos}
        </section>`;
    }).join("");

    // "Outras aulas": só aparece se alguma aula apontar para um módulo
    // que não existe. Fica no fim, sem número de módulo e sem barra.
    if (organizadas.outras.length > 0) {
      const cards = organizadas.outras.map(function (aula) {
        return htmlCardAula(aula, undefined, concluidas.includes(aula.id), "h3");
      }).join("");
      html += `
        <section class="aulas-projeto aulas-projeto--outras" id="outras-aulas" aria-labelledby="titulo-outras-aulas">
          <h2 class="aulas-projeto-titulo" id="titulo-outras-aulas">Outras aulas</h2>
          <ol class="lista-aulas">${cards}</ol>
        </section>`;
    }

    areaAulas.innerHTML = `<div class="aulas" id="lista-aulas">${html}</div>`;
  } catch (erro) {
    console.error(erro);
    areaAulas.innerHTML = htmlErroCarregamento();
  }
}

// Endereço com # (ex.: aulas.html#joao-saccucci-labs-m1): quando a
// página abriu, os módulos ainda não existiam (o JS cria depois do
// fetch). Então o navegador não conseguiu pular até lá sozinho, e
// fazemos isso à mão depois de montar a lista.
function irParaModuloDoEndereco() {
  if (!window.location.hash) return;
  const alvo = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  if (alvo) alvo.scrollIntoView({ behavior: "auto" });
}

mostrarAulas().then(irParaModuloDoEndereco);

// Quando a pessoa volta para esta página pelo botão "Voltar" do
// navegador, ele pode mostrar a versão guardada na memória (sem rodar
// o JS de novo). "pageshow" com persisted = true avisa esse caso, e
// remontamos a lista para o "✓ Concluída" ficar atualizado.
window.addEventListener("pageshow", function (evento) {
  if (evento.persisted) mostrarAulas();
});
