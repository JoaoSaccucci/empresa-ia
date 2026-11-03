/* =========================================================
   comum.js - código usado por TODAS as páginas.
   Precisa ser carregado antes do script da página
   (lista-projetos.js, detalhe-projeto.js, equipe.js, aulas.js ou aula.js).
   ========================================================= */


/* ---------------------------------------------------------
   1. MENU HAMBÚRGUER (celular)
   O CSS esconde o menu abaixo de 768px. Aqui só alternamos:
   - a classe .is-open no <nav> (mostra/esconde o menu);
   - o aria-expanded do botão (avisa leitores de tela se o
     menu está aberto, e o CSS usa isso para virar o ícone em X).
   --------------------------------------------------------- */
function iniciarMenu() {
  const botao = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav");

  // Se a página não tiver menu, não faz nada
  if (!botao || !menu) return;

  botao.addEventListener("click", function () {
    // toggle() devolve true se a classe foi adicionada (menu abriu)
    const aberto = menu.classList.toggle("is-open");
    botao.setAttribute("aria-expanded", String(aberto));
  });
}

iniciarMenu();


/* ---------------------------------------------------------
   2. CARREGAR UM ARQUIVO JSON
   fetch() busca o arquivo e devolve uma "Promise" (um valor
   que chega no futuro). Com async/await o código fica na
   ordem em que lemos: busca, confere, converte.
   --------------------------------------------------------- */
async function carregarJSON(caminho) {
  const resposta = await fetch(caminho);

  // fetch só falha sozinho se não houver conexão. Um 404
  // (arquivo não existe) precisa ser conferido à mão:
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar " + caminho + " (status " + resposta.status + ")");
  }

  return resposta.json(); // converte o texto do arquivo em objetos JavaScript
}


/* ---------------------------------------------------------
   3. MENSAGEM DE ERRO AMIGÁVEL
   Mostrada quando um JSON não carrega. Se o site foi aberto
   direto do disco (file://), o navegador bloqueia o fetch,
   então damos a dica de usar o Live Server.
   --------------------------------------------------------- */
function htmlErroCarregamento() {
  let dica = "Tente recarregar a página em alguns instantes.";

  if (window.location.protocol === "file:") {
    dica = "Parece que o site foi aberto direto do arquivo (file://), e o navegador bloqueia a leitura dos dados assim. " +
           "Abra a pasta no VS Code e use a extensão Live Server.";
  }

  return `
    <div class="mensagem mensagem--erro" role="alert">
      <p><strong>Ops! Não conseguimos carregar os dados.</strong></p>
      <p>${dica}</p>
    </div>`;
}


/* ---------------------------------------------------------
   4. FUNÇÕES AUXILIARES
   --------------------------------------------------------- */

// Protege o HTML: troca caracteres especiais (<, >, &, aspas)
// por códigos seguros. Assim um texto do JSON nunca vira
// código HTML por engano quando usamos innerHTML.
function escapar(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Converte o status do JSON na classe de cor do badge (ver style.css, seção 11)
function classeDoStatus(status) {
  const classes = {
    "planejado": "badge--planejado",
    "em andamento": "badge--andamento",
    "concluído": "badge--concluido"
  };
  return classes[status] || "badge--planejado"; // valor padrão se vier algo inesperado
}

// Monta o HTML do badge de status. O texto sempre aparece,
// para a informação não depender só da cor.
function htmlBadge(status) {
  return `<span class="badge ${classeDoStatus(status)}">${escapar(status)}</span>`;
}


/* ---------------------------------------------------------
   5. PROGRESSO SALVO NO NAVEGADOR (localStorage) - Etapa 3
   O localStorage guarda textos no navegador de quem lê, mesmo
   depois de fechar a aba. Guardamos tudo como JSON (para poder
   salvar listas e números, não só textos).

   Todas as chaves começam com "jsl:" (João Saccucci Labs) para
   não misturar com dados de outros sites no mesmo endereço.

   O try/catch é obrigatório: em modo anônimo restrito, com o
   armazenamento bloqueado ou cheio, o localStorage dá erro.
   Nesse caso o site continua funcionando, só não salva.
   --------------------------------------------------------- */
const PREFIXO_PROGRESSO = "jsl:";

// Lê um valor salvo. Se não existir (ou der erro), devolve o "padrao".
function lerProgresso(chave, padrao) {
  try {
    const texto = localStorage.getItem(PREFIXO_PROGRESSO + chave);
    return texto === null ? padrao : JSON.parse(texto);
  } catch (erro) {
    return padrao;
  }
}

// Salva um valor. Se o navegador não deixar, apenas ignora.
function salvarProgresso(chave, valor) {
  try {
    localStorage.setItem(PREFIXO_PROGRESSO + chave, JSON.stringify(valor));
  } catch (erro) {
    // Sem armazenamento: a página funciona, só não lembra depois.
  }
}

// Lista de ids das aulas concluídas (usada em aulas.js e aula.js)
function lerAulasConcluidas() {
  const lista = lerProgresso("aulas-concluidas", []);
  return Array.isArray(lista) ? lista : []; // proteção se o valor salvo vier estranho
}
