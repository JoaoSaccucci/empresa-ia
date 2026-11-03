/* =========================================================
   aula-quiz.js - o "Teste rápido" das aulas (US23).
   Carregado pela aula.html ANTES do aula.js, que chama
   criarQuizzes(area, idDaAula) depois de converter o .md.

   No .md, cada pergunta é um bloco ```quiz:
     ? Pergunta
     [ ] Alternativa errada
         -> Explicação
     [x] Alternativa certa
         -> Explicação
   Regras e visual: docs/requisitos.md (Etapa 4) e
   docs/design.md, seção 12.9.

   O quiz não tem nota e não conta para "Aula concluída".
   ========================================================= */

// Ícones: "certa" (img/icones/concluida.svg) e "errada" (errada.svg)
const ICONE_QUIZ_CERTA = `<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16.5 9.5"/></svg>`;
const ICONE_QUIZ_ERRADA = `<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>`;

const LETRAS = ["A", "B", "C", "D", "E"];


/* ---------------------------------------------------------
   1. LER O TEXTO DO BLOCO
   Devolve { pergunta, alternativas: [{ texto, certa, explicacao }] }
   ou { erro: "motivo" } se o bloco estiver fora das regras.
   --------------------------------------------------------- */
function lerQuiz(texto) {
  let pergunta = null;
  const alternativas = [];

  const linhas = texto.split("\n");
  for (const linhaOriginal of linhas) {
    const linha = linhaOriginal.trim();
    if (linha === "") continue; // linhas em branco são ignoradas

    if (linha.startsWith("?")) {
      // Pergunta: exatamente uma, e antes das alternativas
      if (pergunta !== null) return { erro: "tem mais de uma linha de pergunta (?)" };
      if (alternativas.length > 0) return { erro: "a pergunta (?) precisa vir antes das alternativas" };
      pergunta = linha.slice(1).trim();
      if (pergunta === "") return { erro: "a pergunta (?) está vazia" };

    } else if (/^\[( |x|X)\]/.test(linha)) {
      // Alternativa: "[ ] texto" ou "[x] texto"
      if (pergunta === null) return { erro: "a pergunta (?) precisa vir primeiro" };
      const textoDaAlternativa = linha.slice(3).trim();
      if (textoDaAlternativa === "") return { erro: "há uma alternativa sem texto" };
      alternativas.push({
        texto: textoDaAlternativa,
        certa: linha[1] !== " ",
        explicacao: null
      });

    } else if (linha.startsWith("->")) {
      // Explicação da alternativa logo acima
      const ultima = alternativas[alternativas.length - 1];
      if (!ultima) return { erro: "há uma explicação (->) antes de qualquer alternativa" };
      if (ultima.explicacao !== null) return { erro: `a alternativa "${ultima.texto}" tem mais de uma explicação (->)` };
      ultima.explicacao = linha.slice(2).trim();

    } else {
      return { erro: `linha não reconhecida: "${linha}"` };
    }
  }

  // Conferências finais
  if (pergunta === null) return { erro: "falta a pergunta (linha com ?)" };
  if (alternativas.length < 2 || alternativas.length > 5) {
    return { erro: `precisa ter de 2 a 5 alternativas (tem ${alternativas.length})` };
  }
  const quantasCertas = alternativas.filter(function (a) { return a.certa; }).length;
  if (quantasCertas !== 1) return { erro: `precisa ter exatamente uma alternativa [x] (tem ${quantasCertas})` };
  const semExplicacao = alternativas.find(function (a) { return !a.explicacao; });
  if (semExplicacao) return { erro: `a alternativa "${semExplicacao.texto}" está sem explicação (->)` };

  return { pergunta: pergunta, alternativas: alternativas };
}


/* ---------------------------------------------------------
   2. CRIAR OS QUIZZES DA AULA
   As respostas ficam salvas em "jsl:quiz:<id da aula>": uma lista
   com a alternativa escolhida em cada quiz, na ordem da aula
   (null = não respondido). Ex.: [1, null]
   --------------------------------------------------------- */
function criarQuizzes(area, idDaAula) {
  const chave = "quiz:" + idDaAula;
  const blocos = area.querySelectorAll("pre > code.language-quiz");

  // Respostas salvas antes (se o localStorage não funcionar, vem [])
  const salvas = lerProgresso(chave, []);
  const respostas = []; // a lista que vamos salvar de novo
  let numeroDoQuiz = 0;

  blocos.forEach(function (codigo) {
    const quiz = lerQuiz(codigo.textContent);

    // Fora das regras: o bloco continua como código comum (o
    // aula-codigo.js cuida dele) e avisamos o motivo no console
    if (quiz.erro) {
      console.warn("Bloco quiz malformado: " + quiz.erro + ". Ele aparece como código comum.");
      return;
    }

    const posicao = numeroDoQuiz; // posição deste quiz na lista salva
    numeroDoQuiz++;
    respostas.push(null);

    const secao = montarQuiz(quiz, numeroDoQuiz);
    codigo.parentElement.replaceWith(secao); // troca o <pre> pela <section>

    const mostrarResposta = ligarQuiz(secao, quiz, function (indiceEscolhido) {
      // Chamada quando a pessoa responde (ou clica em Tentar de novo)
      respostas[posicao] = indiceEscolhido;
      salvarProgresso(chave, respostas);
    });

    // Resposta salva: mostra de novo, sem anunciar (a pessoa só voltou à aula).
    // Um índice que não existe mais (o professor mudou o quiz) é ignorado.
    const salva = Array.isArray(salvas) ? salvas[posicao] : null;
    if (Number.isInteger(salva) && salva >= 0 && salva < quiz.alternativas.length) {
      respostas[posicao] = salva;
      mostrarResposta(salva, false);
    }
  });
}

// HTML do quiz (design.md, seção 12.9). Todo texto passa por escapar().
function montarQuiz(quiz, numero) {
  const idPergunta = "quiz-" + numero + "-pergunta";

  const itens = quiz.alternativas.map(function (alternativa, indice) {
    return `
      <li class="quiz-item">
        <button class="quiz-alternativa" type="button">
          <span class="quiz-letra" aria-hidden="true">${LETRAS[indice]}</span>
          <span class="quiz-texto">${escapar(alternativa.texto)}</span>
        </button>
        <p class="quiz-explicacao" hidden>${escapar(alternativa.explicacao)}</p>
      </li>`;
  }).join("");

  const secao = document.createElement("section");
  secao.className = "quiz";
  secao.setAttribute("aria-labelledby", idPergunta);
  secao.innerHTML = `
    <p class="quiz-rotulo">Pergunta ${numero}</p>
    <p class="quiz-pergunta" id="${idPergunta}">${escapar(quiz.pergunta)}</p>
    <ol class="quiz-alternativas">${itens}</ol>
    <div class="quiz-rodape" hidden>
      <p class="quiz-resultado"></p>
      <button class="btn btn-secundario quiz-repetir" type="button">Tentar de novo</button>
    </div>
    <p class="sr-only" role="status"></p>`;
  return secao;
}


/* ---------------------------------------------------------
   3. RESPONDER E TENTAR DE NOVO
   --------------------------------------------------------- */
function ligarQuiz(secao, quiz, aoMudar) {
  const botoes = Array.from(secao.querySelectorAll(".quiz-alternativa"));
  const explicacoes = secao.querySelectorAll(".quiz-explicacao");
  const rodape = secao.querySelector(".quiz-rodape");
  const resultado = secao.querySelector(".quiz-resultado");
  const status = secao.querySelector('[role="status"]');
  const botaoRepetir = secao.querySelector(".quiz-repetir");

  const indiceCerto = quiz.alternativas.findIndex(function (a) { return a.certa; });
  let respondido = false;

  // Marca (ícone + texto) que entra DENTRO do texto da alternativa:
  // assim o leitor de tela lê junto com o nome do botão.
  function colocarMarca(botao, icone, texto) {
    botao.querySelector(".quiz-texto").insertAdjacentHTML("beforeend",
      `<span class="quiz-marca">${icone} ${texto}</span>`);
  }

  // anunciar = false quando a resposta vem do localStorage
  function mostrarResposta(indice, anunciar) {
    respondido = true;
    secao.classList.add("quiz--respondido");
    const acertou = indice === indiceCerto;

    botoes.forEach(function (botao, i) {
      // aria-disabled (e não disabled): o botão continua no Tab e legível
      botao.setAttribute("aria-disabled", "true");

      if (i === indiceCerto) {
        botao.dataset.resultado = "certa";
        colocarMarca(botao, ICONE_QUIZ_CERTA, i === indice ? "Certa!" : "Resposta certa");
      } else if (i === indice) {
        botao.dataset.resultado = "errada";
        colocarMarca(botao, ICONE_QUIZ_ERRADA, "Errada");
      }
    });

    // Explicação de TODAS as alternativas
    explicacoes.forEach(function (p) { p.hidden = false; });

    const letraCerta = LETRAS[indiceCerto];
    resultado.className = "quiz-resultado " + (acertou ? "quiz-resultado--certa" : "quiz-resultado--errada");
    resultado.innerHTML = acertou
      ? `${ICONE_QUIZ_CERTA}<span>Certa!</span>`
      : `${ICONE_QUIZ_ERRADA}<span>Errada. A resposta certa é a ${letraCerta}.</span>`;
    rodape.hidden = false;

    if (anunciar) {
      status.textContent = acertou
        ? "Certa!"
        : "Errada. A resposta certa é: " + quiz.alternativas[indiceCerto].texto;
    }
  }

  function limparResposta() {
    respondido = false;
    secao.classList.remove("quiz--respondido");
    botoes.forEach(function (botao) {
      botao.removeAttribute("aria-disabled");
      delete botao.dataset.resultado;
      const marca = botao.querySelector(".quiz-marca");
      if (marca) marca.remove();
    });
    explicacoes.forEach(function (p) { p.hidden = true; });
    rodape.hidden = true;
    status.textContent = "";
  }

  botoes.forEach(function (botao, indice) {
    // Enter e Espaço num <button> já disparam o "click"
    botao.addEventListener("click", function () {
      if (respondido) return; // travado depois de responder
      mostrarResposta(indice, true);
      aoMudar(indice);
    });
  });

  botaoRepetir.addEventListener("click", function () {
    limparResposta();
    aoMudar(null);
    // O botão "Tentar de novo" some; o foco vai para a primeira alternativa
    botoes[0].focus();
  });

  // Devolve a função, para o criarQuizzes mostrar uma resposta salva
  return mostrarResposta;
}
