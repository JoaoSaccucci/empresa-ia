# Aula 01 - Como o site da João Saccucci Labs funciona

Tenha o VS Code aberto ao lado e vá conferindo os arquivos e as linhas citadas. Cada trecho de código desta aula foi copiado do projeto de verdade.

## 1. Visão geral: como as peças se conectam

O site tem **3 tipos de arquivo**, cada um com uma função:

| Arquivo | Função | Analogia |
|---|---|---|
| `.html` | A estrutura da página (o "esqueleto") | As paredes da casa |
| `.css` | A aparência (cores, tamanhos, layout) | A pintura e a decoração |
| `.js` | O comportamento (buscar dados, montar cards, abrir menu) | A parte elétrica |

E ainda tem os **dados**, separados em `data/projetos.json` e `data/agentes.json`.

O caminho de uma página, por exemplo `lista-projetos.html`, é este:

```text
 lista-projetos.html
     |  (1) o navegador lê o HTML e mostra "Carregando..."
     |  (2) no fim do <body> encontra os <script>
     v
 js/comum.js  +  js/lista-projetos.js
     |  (3) fetch("data/projetos.json")  -- pede o arquivo
     v
 data/projetos.json
     |  (4) volta como texto -> vira objetos JavaScript
     v
 JS monta o HTML dos cards (template strings)
     |  (5) innerHTML coloca esse HTML dentro de <div id="lista-projetos">
     v
 DOM (a página "viva" na memória do navegador)
     |  (6) o CSS pinta tudo: cores, grade, animação, cor do agente
     v
 O que você vê na tela
```

A ideia central é esta: **o HTML não tem os projetos escritos nele.** O HTML tem só uma "caixa vazia", e o JavaScript enche essa caixa com o que está no [[JSON]]. Por isso o `README.md` diz que, para adicionar um projeto, basta editar o `data/projetos.json`.

> [!NOTE]
> **[[DOM]]** (Document Object Model) é a página transformada em objetos que o JavaScript consegue ler e alterar. Quando o JS "mexe na página", ele está mexendo no DOM.

## 2. Os 5 conceitos mais importantes

### Conceito 1 - fetch + async/await (buscar dados)

`js/comum.js`, linhas 38-48:

```js
async function carregarJSON(caminho) {
  const resposta = await fetch(caminho);

  // fetch só falha sozinho se não houver conexão. Um 404
  // (arquivo não existe) precisa ser conferido à mão:
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar " + caminho + " (status " + resposta.status + ")");
  }

  return resposta.json(); // converte o texto do arquivo em objetos JavaScript
}
```

**Palavras em inglês** (passe o mouse ou toque nelas para ver a tradução):

- [[function]]: um bloco de código com nome que você pode chamar várias vezes.
- [[const]]: uma variável que não vai ser trocada por outro valor.
- [[fetch]]: pede um arquivo ou endereço para o servidor.
- [[async]] / [[await]]: buscar um arquivo demora, então `await` diz "espere a resposta chegar antes de seguir para a próxima linha". O `fetch` devolve uma [[Promise]], um valor que chega no futuro.
- [[if]]: o `!` significa "não". Então `if (!resposta.ok)` é "se a resposta NÃO está ok".
- [[throw]] `new Error`: interrompe a função e avisa que algo deu errado.
- [[return]]: é o resultado que a função entrega para quem a chamou.

**Por que foi escrito assim:** o `fetch` só dá erro sozinho quando não há conexão. Se o arquivo não existir (erro 404), ele "funciona" mesmo assim. Por isso o dev conferiu `resposta.ok` à mão (o comentário das linhas 41-42 explica isso).

> [!IMPORTANT]
> "O `fetch` trata um 404 como erro?" Não! Ele só rejeita a Promise quando a rede falha. Um 404 ou 500 chega como resposta normal, com `response.ok === false`. Por isso é preciso conferir `response.ok` à mão.

Quem chama essa função se protege com [[try]] e [[catch]] (`js/lista-projetos.js`, linhas 25-39, resumido):

```js
try {
  const projetos = await carregarJSON("data/projetos.json");
  // ... monta os cards ...
} catch (erro) {
  console.error(erro); // detalhe técnico fica no console (F12)
  listaProjetos.innerHTML = htmlErroCarregamento();
}
```

Se qualquer coisa dentro do `try` falhar, o código pula para o `catch`, e o usuário vê uma mensagem amigável em vez de uma tela em branco.

**Bônus:** em `js/detalhe-projeto.js`, linhas 65-68, o `Promise.all` carrega **os dois** JSON ao mesmo tempo, em vez de um depois do outro. Assim a página fica mais rápida.

### Conceito 2 - JSON (os dados)

`data/agentes.json`, linhas 2-8:

```json
{
  "id": "product-owner",
  "nome": "Product Owner",
  "papel": "Levanta requisitos, escreve user stories e prioriza o MVP.",
  "cor": "#00E5FF",
  "avatar": "img/agentes/product-owner.svg"
}
```

**JSON** (JavaScript Object Notation) é um formato de texto para guardar dados. As regras principais:

- `[ ]` é uma **lista** ([[array]]). `{ }` é um **objeto** (pares de "chave": valor).
- As chaves **sempre** levam aspas duplas.
- Os itens são separados por vírgula, mas **não** pode haver vírgula depois do último item.
- Não aceita comentários.

**Por que foi escrito assim:** os projetos ligam-se aos agentes pelo `id`. Em `data/projetos.json`, cada trabalho diz `"agente": "dev"`, e o JS procura o agente com esse id (`js/detalhe-projeto.js`, linha 87):

```js
const agente = agentes.find(function (a) { return a.id === trabalho.agente; });
```

- [[find]]: devolve o primeiro item da lista que cumpre a condição.
- `===`: "é exatamente igual" (mesmo valor **e** mesmo tipo).

Assim, a cor e o avatar do Dev ficam escritos **uma vez só**, no `agentes.json`. Isso se chama **não repetir dados**. Se a cor mudar, você muda em um lugar só.

> [!CAUTION]
> Esquecer uma vírgula, ou deixar uma vírgula sobrando, quebra o JSON inteiro. O `resposta.json()` falha, o `catch` é acionado e a página mostra "Ops! Não conseguimos carregar os dados." Se isso acontecer, abra o console (F12) e leia o erro: ele costuma dizer a posição do problema.

### Conceito 3 - Montar a página: template strings + innerHTML + map

`js/lista-projetos.js`, linhas 10-22 (resumido) e 34-35:

```js
function htmlCardProjeto(projeto, posicao) {
  return `
    <a class="card projeto-card surgir" style="--atraso: ${posicao * 100}ms"
       href="detalhe-projeto.html?id=${encodeURIComponent(projeto.id)}">
      <div class="projeto-card-topo">
        <h3>${escapar(projeto.nome)}</h3>
        ...
    </a>`;
}

const cards = projetos.map(htmlCardProjeto).join("");
listaProjetos.innerHTML = `<div class="grade-cards">${cards}</div>`;
```

**Palavras em inglês:**

- Textos entre crases são [[template string]]: aceitam `${...}` para encaixar valores dentro deles.
- [[map]]: transforma cada item de uma lista em outra coisa. Aqui, cada projeto vira um pedaço de HTML.
- [[join]]: com `join("")`, cola todos os pedaços em um texto só.
- [[innerHTML]]: troca o conteúdo de um elemento da página.
- [[querySelector]]: `document.querySelector("#lista-projetos")` (linha 6) quer dizer "procure no documento o elemento com id `lista-projetos`".

**Por que existe a função `escapar`** (`js/comum.js`, linhas 80-87)? O `innerHTML` interpreta o texto como HTML. Se um nome no JSON tivesse `<script>`, ele viraria código de verdade. A função `escapar` troca `<` por `&lt;` e outros caracteres perigosos, para que o texto apareça como texto. Isso protege contra um ataque chamado [[XSS]] (Cross-Site Scripting).

> [!IMPORTANT]
> Saber explicar XSS impressiona: "Antes de colocar dados no `innerHTML`, eu escapo `<`, `>`, `&` e aspas, para que um texto vindo de fora nunca vire HTML ou script na página."

Este projeto não usa `createElement` nem `<template>` para os cards. Tudo é feito com template strings + `innerHTML`, que é o jeito mais curto de ler. O cuidado obrigatório desse jeito é sempre passar os dados pelo `escapar`.

### Conceito 4 - URLSearchParams: uma página só para todos os projetos

`js/detalhe-projeto.js`, linha 10:

```js
const idDaUrl = new URLSearchParams(window.location.search).get("id");
```

Quando você clica em um card, vai para `detalhe-projeto.html?id=joao-saccucci-labs`. Tudo que vem depois do `?` é a [[query string]] (parâmetros da URL).

- `window.location.search` = o pedaço `?id=joao-saccucci-labs` da URL.
- [[URLSearchParams]] = um objeto que sabe ler esses parâmetros.
- `.get("id")` = "pegue o valor de `id`", que aqui é `"joao-saccucci-labs"`.

Depois, nas linhas 71-76, o código procura o projeto com esse id. Se não achar (por exemplo, `?id=abc`), mostra "Projeto não encontrado" em vez de quebrar:

```js
const projeto = projetos.find(function (p) { return p.id === idDaUrl; });

if (!projeto) {
  areaProjeto.innerHTML = htmlNaoEncontrado();
  return;
}
```

**Por que foi escrito assim:** em vez de criar `projeto1.html`, `projeto2.html` e assim por diante, existe **um modelo só** que muda conforme a URL. É a mesma ideia que sites grandes usam (e a própria tela desta aula usa: `aula.html?id=...`).

Do outro lado, na hora de **montar** o link (`js/lista-projetos.js`, linha 13), o dev usou [[encodeURIComponent]], que deixa o id seguro dentro de uma URL (troca espaços e acentos por códigos).

### Conceito 5 - CSS: variáveis (--agente-cor) e o menu hambúrguer

**Variáveis CSS.** Em `css/style.css`, linha 36, existe um valor padrão:

```css
--agente-cor: var(--cor-ciano);
```

E o JS sobrescreve esse valor em cada card (`js/equipe.js`, linha 33):

```js
<article class="card agente-card surgir" style="--agente-cor: ${escapar(agente.cor)}; --atraso: ${posicao * 100}ms">
```

O CSS usa essa variável em vários lugares (`css/style.css`, linhas 739 e 767):

```css
border-top: 3px solid var(--agente-cor);
/* ... */
color: var(--agente-cor);
```

**Por que foi escrito assim:** existe **uma regra CSS só** para todos os cards, e cada card recebe a sua cor vinda do JSON. Sem variável, seria preciso uma classe para cada agente (`.card-dev`, `.card-artista`...). Isso é ótimo de mostrar: o JSON controla até a cor.

**Menu hambúrguer.** O CSS esconde o menu no celular (`css/style.css`, linhas 363-376, resumido):

```css
.nav { display: none; /* ... */ }
.nav.is-open { display: block; }
```

E a partir de 768px de largura o menu fica sempre visível, sem botão (linhas 407-427, resumido):

```css
@media (min-width: 768px) {
  .nav-toggle { display: none; }
  .nav { display: block; position: static; /* ... */ }
}
```

`@media` é uma [[media query]], uma regra que só vale em certas condições. `min-width: 768px` quer dizer "telas com 768px ou mais". Começar pelo celular e ir acrescentando regras para telas maiores se chama [[mobile first]].

O JS só liga e desliga uma classe (`js/comum.js`, linhas 22-26):

```js
botao.addEventListener("click", function () {
  // toggle() devolve true se a classe foi adicionada (menu abriu)
  const aberto = menu.classList.toggle("is-open");
  botao.setAttribute("aria-expanded", String(aberto));
});
```

- [[addEventListener]]: com `"click"`, quer dizer "fique escutando o clique e, quando acontecer, rode esta função".
- [[toggle]]: se a classe existe, tira; se não existe, coloca. Devolve `true` se colocou.
- [[aria-expanded]]: avisa leitores de tela (usados por pessoas cegas) se o menu está aberto. O CSS também usa esse atributo para virar o ícone em X (linhas 358-360).

**Boa prática:** o JS mexe só no **estado** e o CSS cuida da **aparência**.

## 3. Por que precisa do Live Server (file:// vs http://)

Quando você dá dois cliques no `index.html`, a barra de endereço mostra algo como:

```text
file:///C:/Projetos/.../index.html
```

Isso é o navegador lendo **direto do disco**. Por segurança, nesse modo os navegadores bloqueiam o `fetch` de arquivos locais. Senão, qualquer página HTML baixada da internet poderia ler arquivos do seu computador.

Com o **Live Server** (extensão do VS Code), o endereço fica assim:

```text
http://127.0.0.1:5500/index.html
```

Agora existe um **servidor** de verdade entregando os arquivos, igual a um site na internet, e o `fetch` funciona.

O dev até previu isso. Em `js/comum.js`, linhas 60-63, se o protocolo for `file:` a mensagem de erro já sugere o Live Server:

```js
if (window.location.protocol === "file:") {
  dica = "Parece que o site foi aberto direto do arquivo (file://), e o navegador bloqueia a leitura dos dados assim. " +
         "Abra a pasta no VS Code e use a extensão Live Server.";
}
```

> [!TIP]
> Clique com o botão direito no `index.html` e escolha **Open with Live Server** (o passo a passo está no `README.md`). No GitHub Pages funciona sem nada disso, porque lá já existe um servidor.

## 4. Exercício prático

### Parte A - só JSON (5 min)

Adicione a tecnologia `"JSON"` na lista de tecnologias do projeto.

**Onde:** `data/projetos.json`, linha 9 (`"tecnologias"`). É uma lista de textos entre aspas, separados por vírgula.

- [ ] Acrescentei `"JSON"` no fim da lista da linha 9.
- [ ] Em `detalhe-projeto.html?id=joao-saccucci-labs` (pelo Live Server) aparece uma quarta "tag" escrita **JSON**, ao lado de HTML, CSS e JavaScript.
- [ ] Não precisei mexer em nenhum arquivo `.js`.

### Parte B - JSON + JS (15 min)

Dê um **lema** para cada agente e mostre-o na página Equipe.

1. Em `data/agentes.json`, acrescente em cada agente um campo novo, por exemplo `"lema": "Primeiro a pergunta, depois o código."`. Lembre da vírgula no fim da linha anterior (`"avatar": "..."`).
2. Em `js/equipe.js`, dentro da função `htmlCardAgente`, logo depois da linha 37 (`<p class="agente-papel">...`), crie um novo parágrafo que mostre `agente.lema`. Copie o padrão da linha 37 e **não esqueça de usar `escapar(...)`**.

- [ ] Os 4 agentes ganharam o campo `"lema"` no `agentes.json`.
- [ ] Em `equipe.html`, cada card mostra o seu lema embaixo do papel.
- [ ] O console (F12) não mostra erros em vermelho.

**Desafio extra:** apague o lema de **um** agente só. O que aparece no card dele? (Pense no que acontece quando `agente.lema` não existe e vira [[undefined]]. Olhe a primeira linha da função `escapar`.) Como você evitaria isso? Dica: veja como `js/detalhe-projeto.js`, linha 98, trata o `dataFim` vazio.

Quando terminar, me diga **em quais arquivos e linhas você mexeu** e o que viu no desafio extra.

## 5. Como falar disso numa entrevista de estágio

1. "Fiz um site em HTML, CSS e JavaScript puros em que o conteúdo vem de arquivos JSON: uso `fetch` com `async/await`, confiro `response.ok` porque o `fetch` não trata 404 como erro, e mostro uma mensagem amigável no `catch`."
2. "A página de detalhe é um modelo só: leio o `id` da URL com `URLSearchParams` e procuro o projeto com `find`. Antes de colocar os dados no `innerHTML`, escapo os textos para evitar XSS."
3. "No CSS usei variáveis: cada card recebe a cor do agente pelo JSON via `--agente-cor`. O layout é mobile first, com media query em 768px e um menu hambúrguer acessível com `aria-expanded`."

### Resumo de boas práticas desta aula

- Separar dados (JSON), estrutura (HTML), aparência (CSS) e comportamento (JS).
- Sempre tratar erros (`try/catch`, `resposta.ok`, "Projeto não encontrado").
- Escapar textos antes de usar `innerHTML`.
- Guardar cada dado em um lugar só (o agente é referenciado pelo `id`).
- `<script>` no fim do `<body>`: assim o HTML já existe quando o JS procura `#lista-projetos` com `querySelector`.
- Acessibilidade: `aria-expanded`, `alt` nas imagens e o texto do status sempre visível (não só a cor).
