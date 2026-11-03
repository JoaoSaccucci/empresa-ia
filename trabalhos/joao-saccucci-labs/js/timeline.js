/* =========================================================
   timeline.js - linha do tempo do projeto (Etapa 2, US05).
   Só cria o HTML; quem coloca na página é o detalhe-projeto.js.
   Por isso este arquivo precisa ser carregado ANTES dele.
   Visual: css/style.css, seção 15. Estrutura: docs/design.md, 10.1.
   ========================================================= */


// Um evento da linha do tempo (um <li class="timeline-item">).
// "posicao" é a ordem do evento, usada para entrarem em sequência.
function htmlEventoTimeline(evento, agentes, posicao) {
  const agente = agentes.find(function (a) { return a.id === evento.agente; });

  // Agente que não existe no agentes.json: o evento NÃO some
  // (é história do projeto). Mostramos o id como nome, uma bolinha
  // no lugar do avatar e deixamos a cor padrão do CSS (ciano).
  let cor = "";
  let avatar = `<span class="timeline-avatar timeline-avatar--vazio" aria-hidden="true"></span>`;
  let nome = evento.agente;

  if (agente) {
    cor = `--agente-cor: ${escapar(agente.cor)}; `;
    // alt="" porque o nome do agente já está escrito ao lado
    avatar = `<img class="timeline-avatar" src="${escapar(agente.avatar)}" alt="" width="32" height="32">`;
    nome = agente.nome;
  }

  return `
    <li class="timeline-item surgir" style="${cor}--atraso: ${posicao * 80}ms">
      ${avatar}
      <div class="timeline-conteudo">
        <span class="timeline-agente">${escapar(nome)}</span>
        <p class="timeline-descricao">${escapar(evento.descricao)}</p>
      </div>
    </li>`;
}


// Seção inteira. Se não houver eventos, devolve texto vazio
// e a seção não aparece na página.
function htmlLinhaDoTempo(eventos, agentes) {
  if (!eventos || eventos.length === 0) return "";

  // 1. Ordenar por data. slice() faz uma cópia para não mexer
  //    na lista original. As datas são texto no formato ISO
  //    (2026-11-02), então comparar como texto já dá a ordem certa.
  //    O sort é "estável": eventos com a mesma data continuam
  //    na ordem em que estão no JSON.
  const ordenados = eventos.slice().sort(function (a, b) {
    return String(a.data).localeCompare(String(b.data));
  });

  // 2. Agrupar eventos seguidos que têm a mesma data.
  //    Resultado: [ { data: "2026-11-02", eventos: [...] }, ... ]
  const dias = [];
  ordenados.forEach(function (evento) {
    const ultimoDia = dias[dias.length - 1];
    if (ultimoDia && ultimoDia.data === evento.data) {
      ultimoDia.eventos.push(evento);   // mesma data: entra no grupo atual
    } else {
      dias.push({ data: evento.data, eventos: [evento] });  // data nova: novo grupo
    }
  });

  // 3. Montar o HTML. O contador "posicao" segue crescendo entre
  //    os dias, para a animação continuar em sequência.
  let posicao = 0;
  const diasHtml = dias.map(function (dia) {
    const itens = dia.eventos.map(function (evento) {
      const html = htmlEventoTimeline(evento, agentes, posicao);
      posicao = posicao + 1;
      return html;
    }).join("");

    return `
      <li class="timeline-dia">
        <h3 class="timeline-dia-data"><time datetime="${escapar(dia.data)}">${escapar(dia.data)}</time></h3>
        <ol class="timeline-eventos">${itens}</ol>
      </li>`;
  }).join("");

  return `
    <section class="timeline-secao" aria-labelledby="titulo-timeline">
      <h2 id="titulo-timeline">Linha do tempo</h2>
      <ol class="timeline">${diasHtml}</ol>
    </section>`;
}
