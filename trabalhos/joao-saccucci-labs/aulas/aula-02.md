# Aula 02 - Linha do tempo, página Sobre e alguns truques de CSS

Abra o VS Code ao lado e confira as linhas citadas. Se ainda não leu a Aula 01, leia antes: aqui eu não repito `fetch`, `find`, `map`, `escapar` nem variáveis CSS básicas.

## 1. O que mudou na Etapa 2 (visão rápida)

| Arquivo | O que aconteceu |
|---|---|
| `js/timeline.js` | **Novo.** Monta o HTML da linha do tempo de um projeto. |
| `js/detalhe-projeto.js` | No fim do HTML do detalhe, chama a função da linha do tempo (linha 109). |
| `detalhe-projeto.html` | Ganhou um `<script src="js/timeline.js">` **antes** do `detalhe-projeto.js` (linhas 56-59). |
| `sobre.html` | **Novo.** Página estática (sem JSON) com o "crachá" do chefe e os contatos. |
| Todas as páginas | O menu ganhou o item **Sobre** (e, na Etapa 3, o item **Aulas**). |
| `css/style.css` | Seção 15 (linha do tempo), seção 16 (Sobre), troca da fonte para **Exo 2** e um bloco `@supports` com **subgrid**. |
| `data/projetos.json` | O projeto ganhou o campo `"linhaDoTempo"` (hoje nas linhas 124-140). |

O caminho da linha do tempo é o mesmo da Aula 01, só com uma peça a mais:

```text
 data/projetos.json  ("linhaDoTempo": [ ... ])
     |
     v
 js/detalhe-projeto.js  -- carrega o JSON e chama htmlLinhaDoTempo(...)
     |
     v
 js/timeline.js -- ordena, agrupa por data e devolve o HTML (texto)
     |
     v
 detalhe-projeto.js coloca tudo no innerHTML de #detalhe-projeto
```

## 2. Os 5 conceitos novos

### Conceito 1 - Separar código em um arquivo novo (e a ordem dos scripts)

O dev poderia ter escrito a linha do tempo dentro do `detalhe-projeto.js`, mas criou um arquivo só para ela. O comentário do topo explica a divisão de tarefas (`js/timeline.js`, linhas 2-4):

```js
   timeline.js - linha do tempo do projeto (Etapa 2, US05).
   Só cria o HTML; quem coloca na página é o detalhe-projeto.js.
   Por isso este arquivo precisa ser carregado ANTES dele.
```

E o `detalhe-projeto.js` só chama a função (`js/detalhe-projeto.js`, linha 109):

```js
${htmlLinhaDoTempo(projeto.linhaDoTempo, agentes) /* Etapa 2: vem do js/timeline.js */}
```

**Por que a ordem importa?** Neste projeto, os arquivos `.js` não usam [[import]] nem [[export]]. Cada `<script>` comum coloca as suas funções num espaço **global** (compartilhado pela página inteira). O navegador roda os scripts **na ordem em que aparecem** (`detalhe-projeto.html`, linhas 56-59):

```html
<script src="js/comum.js"></script>
<!-- timeline.js antes do detalhe-projeto.js, porque o detalhe-projeto.js usa a função dele -->
<script src="js/timeline.js"></script>
<script src="js/detalhe-projeto.js"></script>
```

O `comum.js` vem primeiro porque os outros dois usam funções que moram nele (`carregarJSON`, `escapar`, `htmlErroCarregamento`). Se um script chamar uma função de um arquivo que ainda não rodou, o console mostra um [[ReferenceError]], por exemplo `carregarJSON is not defined` ("não está definido"). Você vai provocar esse erro de propósito no exercício.

**Curiosidade honesta:** se você inverter só o `timeline.js` e o `detalhe-projeto.js`, o erro pode **nem aparecer**. O `detalhe-projeto.js` só chama `htmlLinhaDoTempo` depois do `await` dos JSON, e nesse meio-tempo o navegador normalmente já rodou o `timeline.js`. Funcionar "por sorte de tempo" é o pior tipo de bug: um dia, numa internet diferente, quebra. Por isso a ordem certa é regra, e não sorte.

**Por que foi escrito assim:** cada arquivo tem **uma responsabilidade**. Arquivos pequenos são mais fáceis de ler, testar e trocar. A linha do tempo também poderia ser usada em outra página, bastando incluir o script.

> [!IMPORTANT]
> Se perguntarem como evitar esse problema de ordem, a resposta moderna é usar **módulos**: `<script type="module">` com `import`/`export`. Cada arquivo diz de quem depende, e a ordem deixa de ser um acordo "de cabeça".

### Conceito 2 - Ordenar com slice + sort + localeCompare

`js/timeline.js`, linhas 49-51:

```js
const ordenados = eventos.slice().sort(function (a, b) {
  return String(a.data).localeCompare(String(b.data));
});
```

**Palavras em inglês:**

- [[slice]]: sem argumentos, devolve uma **cópia** da lista.
- [[sort]]: recebe uma função que compara dois itens, `a` e `b`, e devolve um número **negativo** se `a` vem antes, **positivo** se `b` vem antes e **zero** se tanto faz.
- [[localeCompare]]: compara dois textos e já devolve esse número negativo, zero ou positivo. Por isso cabe direto no `sort`.
- `String(...)` transforma o valor em texto, por segurança.

**Três detalhes que caem em entrevista:**

1. **`sort` altera a lista original** (em inglês, ele "muta" o array). Por isso existe o `.slice()` antes: o dev ordena uma cópia e não estraga `projeto.linhaDoTempo` (comentário das linhas 44-45). Em JavaScript mais novo também existe o `toSorted()`, que já devolve uma cópia.
2. **Por que comparar datas como texto funciona?** As datas estão no formato **ISO**: `2026-11-02`, ou seja, ano-mês-dia, sempre com 2 dígitos no mês e no dia. Nesse formato, a ordem alfabética é igual à ordem cronológica. Com `02/11/2026` (formato brasileiro) isso **não** funcionaria: como texto, `"01/12/2026"` viria antes de `"02/01/2026"`, mesmo sendo 11 meses depois no calendário. Por isso se **guarda** a data em ISO e só se **mostra** em formato brasileiro.
3. **Estabilidade** (linhas 47-48): o `sort` do JavaScript é **estável**. Quando dois eventos têm a mesma data (o `localeCompare` devolve 0), eles continuam na ordem em que estavam no JSON. Hoje o projeto tem 15 eventos: 11 de `2026-11-02` e 4 de `2026-11-03`. É essa estabilidade que mantém a história de cada dia na ordem certa: primeiro o PO, depois o artista, depois o dev...

> [!CAUTION]
> Usar `lista.sort()` sem função para ordenar **números**. `[10, 9, 1].sort()` dá `[1, 10, 9]`, porque sem função o `sort` compara como texto. Para números, use `sort(function (a, b) { return a - b; })`.

### Conceito 3 - Agrupar eventos por data

Em vez de repetir "2026-11-02" onze vezes, a data aparece **uma vez** e os eventos daquele dia vêm embaixo. `js/timeline.js`, linhas 55-63:

```js
const dias = [];
ordenados.forEach(function (evento) {
  const ultimoDia = dias[dias.length - 1];
  if (ultimoDia && ultimoDia.data === evento.data) {
    ultimoDia.eventos.push(evento);   // mesma data: entra no grupo atual
  } else {
    dias.push({ data: evento.data, eventos: [evento] });  // data nova: novo grupo
  }
});
```

**Palavras em inglês:**

- [[forEach]]: roda a função uma vez para cada item. Diferente do `map`, **não devolve** uma lista nova.
- [[length]]: quantos itens a lista tem. `dias[dias.length - 1]` é o **último** item, porque a contagem começa em 0.
- [[push]]: coloca um item no fim da lista.
- [[else]]: é o caminho do `if` quando a condição é falsa.
- `&&` = "e". `ultimoDia && ...` primeiro confere se `ultimoDia` existe. Na primeira volta a lista `dias` está vazia e `ultimoDia` é [[undefined]].

**Vamos simular com 3 eventos** (datas A, A, B):

| Volta | Evento | `ultimoDia` | O que acontece | `dias` fica |
|---|---|---|---|---|
| 1 | A | não existe | `else`: cria grupo A | `[ {A: [1]} ]` |
| 2 | A | grupo A | mesma data: `push` | `[ {A: [1, 2]} ]` |
| 3 | B | grupo A | data diferente: novo grupo | `[ {A: [1, 2]}, {B: [3]} ]` |

**Por que foi escrito assim:** o código só olha o **último** grupo. Isso só funciona porque a lista **já foi ordenada** no passo anterior, e aí datas iguais ficam sempre vizinhas. Ordenar e depois agrupar vizinhos é uma técnica clássica.

**Bônus - o contador que atravessa os dias** (linhas 67-73): `posicao` é declarado com [[let]] **fora** dos dois `map`, então continua contando de um dia para o outro (0, 1, 2...). Ele vira o atraso da animação (`--atraso: ${posicao * 80}ms`, linha 29), e os eventos aparecem um depois do outro.

### Conceito 4 - Fallback: quando o agente não existe

[[fallback]] é o "plano B", o que fazer quando o dado esperado não está lá. Compare as duas decisões do dev.

`js/detalhe-projeto.js`, linha 88 (cards de trabalho), em que o trabalho **some**:

```js
return agente ? htmlTrabalho(trabalho, agente, posicao) : "";
```

`js/timeline.js`, linhas 14-26 (linha do tempo), em que o evento **fica**:

```js
// Agente que não existe no agentes.json: o evento NÃO some
// (é história do projeto). ...
let cor = "";
let avatar = `<span class="timeline-avatar timeline-avatar--vazio" aria-hidden="true"></span>`;
let nome = evento.agente;

if (agente) {
  cor = `--agente-cor: ${escapar(agente.cor)}; `;
  // alt="" porque o nome do agente já está escrito ao lado
  avatar = `<img class="timeline-avatar" src="${escapar(agente.avatar)}" alt="" width="32" height="32">`;
  nome = agente.nome;
}
```

> [!NOTE]
> **Operador ternário** (`? :`) é um `if/else` em uma linha só: `condição ? valorSeSim : valorSeNão`. Na linha 88, "se o agente existe, monta o card; senão, devolve texto vazio".

**Como funciona:** primeiro o código prepara os valores do plano B (sem cor, uma bolinha vazia no lugar da foto e o próprio id como nome). Depois, **se** o agente existir, troca tudo pelos valores de verdade. Esse padrão "começa com o padrão e sobrescreve se der" é muito comum.

**Por que foi escrito assim:** um card sem dono não faz sentido e pode sumir. Já um evento da história **aconteceu**, e apagar esse evento seria perder informação. Decidir o fallback é uma decisão de **produto**, não só de código.

Dois detalhes de acessibilidade aqui:

- `alt=""` (linha 24): a imagem é decorativa, porque o nome já está escrito ao lado. Com `alt` vazio, o leitor de tela pula a imagem em vez de ler o nome duas vezes. Note que é `alt=""`, e não "sem `alt`": sem o atributo, alguns leitores leem o nome do arquivo.
- `width="32" height="32"`: o navegador reserva o espaço antes de a imagem carregar, e a página não "pula".

### Conceito 5 - HTML semântico e acessível na página Sobre

O `sobre.html` não tem JSON nem JS próprio. O comentário das linhas 38-43 explica que o conteúdo é fixo e por isso fica direto no HTML. Mesmo sendo "só HTML", tem bastante coisa boa nele.

**a) dl / dt / dd - uma ficha de dados** (linhas 63-67):

```html
<dl class="id-dados">
  <div><dt>Acesso</dt><dd>Nível máximo</dd></div>
  <div><dt>Base</dt><dd>São Caetano do Sul, SP</dd></div>
  <div><dt>Foco</dt><dd>Desenvolvimento de Software</dd></div>
</dl>
```

- `dl` = *description list* (lista de descrições), `dt` = *term* (o "rótulo") e `dd` = *description* (o "valor").
- **Por quê:** o leitor de tela entende que "Base" é o rótulo de "São Caetano do Sul, SP". Com `<p>` ou `<span>` essa relação se perderia. Isso é **HTML semântico**: usar a tag que diz **o que** o conteúdo é, e não como ele aparece. (Envolver cada par num `<div>` é permitido, e foi usado para o CSS.)

**b) Links para outros sites** (linha 85):

```html
<a class="btn btn-secundario contato" href="https://github.com/JoaoSaccucci" target="_blank" rel="noopener noreferrer">
```

- `target="_blank"` = abre em uma **nova aba**.
- `rel="noopener noreferrer"`: [[noopener]] impede que a página nova controle a nossa pelo `window.opener` (um ataque chamado *tabnabbing*). `noreferrer` não conta ao outro site de onde a pessoa veio. **Pergunta clássica de entrevista.**

**c) Texto só para leitor de tela** (linha 90):

```html
<span>GitHub</span><span class="sr-only">(abre em nova aba)</span>
```

Quem enxerga percebe a nova aba abrindo. Quem usa leitor de tela é **avisado antes**. A classe [[sr-only]] está em `css/style.css`, linhas 264-271: o elemento fica com 1px e cortado, então some da tela mas continua sendo lido. Por isso **não** se usa `display: none` aqui, porque aí o leitor de tela também ignoraria o texto.

**d) mailto:** (linha 100): `href="mailto:..."` abre o programa de e-mail de quem clicou, com o destinatário preenchido. Ele não tem `target="_blank"` porque não abre uma página.

**e) aria-current="page"** (linha 32): marca no menu **qual é a página atual**. O leitor de tela diz "página atual", e o CSS usa o mesmo atributo para destacar o link. É a mesma ideia do `aria-expanded` da Aula 01: o HTML guarda o **estado** e o CSS cuida da **aparência**. Repare que no `detalhe-projeto.html` (linha 31) quem fica marcado é "Projetos", porque o detalhe faz parte daquela seção.

**f) SVG inline com currentColor** (linhas 86-89): o ícone foi **colado dentro do HTML** ([[inline]]) em vez de usar `<img src="...svg">`. Isso permite usar `stroke="currentColor"`:

- [[currentColor]]: o traço do ícone pega a mesma cor do texto do botão.
- Então o CSS muda a cor no hover (`css/style.css`, linhas 1283-1285) e o ícone acompanha. Com `<img>` isso **não** funcionaria, porque o CSS da página não entra dentro de uma imagem externa.
- `aria-hidden="true"` diz que o ícone é decorativo, porque o texto "GitHub" já explica o link. `focusable="false"` evita que navegadores antigos parem no ícone com a tecla Tab.

**Para pensar:** nas linhas 135-138, as cores dos mini avatares foram escritas à mão, repetindo o `agentes.json`. O comentário das linhas 129-130 justifica: "são só 4 e não mudam". É uma troca consciente: simplicidade (sem JS nesta página) contra o princípio "cada dado num lugar só" da Aula 01. Se um dia a cor do Dev mudar, lembre de mudar **nos dois lugares**. Saber explicar uma troca dessas é sinal de maturidade.

### Bônus rápido de CSS (2 ajustes antes da Etapa 2)

**Trocar a fonte num lugar só.** A fonte de títulos mora numa variável (`css/style.css`, linha 39):

```css
--fonte-display: "Exo 2", "Space Grotesk", system-ui, sans-serif;
```

Os títulos usam `font-family: var(--fonte-display);` (por exemplo, linhas 222, 301 e 1193). Para trocar Orbitron por Exo 2, o dev mudou **essa linha** e o link do Google Fonts nos HTML (`sobre.html`, linha 12). Os nomes depois da vírgula são o **plano B**: se a Exo 2 não carregar, o navegador tenta a próxima fonte da lista.

**Subgrid + @supports** (`css/style.css`, linhas 1539-1551):

```css
@supports (grid-template-rows: subgrid) {
  .agente-card {
    display: grid;
    grid-row: span 5;              /* o card ocupa 5 linhas da grade pai */
    grid-template-rows: subgrid;   /* ...e usa essas linhas por dentro */
```

- O problema: na página Equipe, um papel com 3 linhas de texto empurrava a divisória "Projetos" daquele card para baixo, e as divisórias ficavam desalinhadas.
- [[subgrid]] faz os cards da mesma fileira **compartilharem** as 5 linhas da grade pai (avatar, id, nome, papel e projetos, em `js/equipe.js`, linhas 34-41). Se o papel de um card for alto, todos reservam o mesmo espaço.
- `@supports` = "se o navegador suporta...". Só aplica a regra em navegadores que entendem `subgrid`. Nos outros, vale o `flex` antigo (linhas 735-741) e o site continua funcionando. Isso se chama **melhoria progressiva**: o básico funciona em todo lugar, e o extra entra onde dá.

> [!CAUTION]
> Se alguém acrescentar uma 6ª parte no card (por exemplo, o lema do exercício da Aula 01!), o `span 5` precisa virar `span 6`. Um número "mágico" no CSS depende da estrutura do JS. Bom exemplo de como as camadas se conectam.

## 3. Exercício prático

### Parte A - Provoque o erro da ordem dos scripts (HTML, 5 min)

Você vai quebrar a página de propósito para ver o Conceito 1 acontecendo, e depois consertar.

1. Em `detalhe-projeto.html`, recorte a linha 56 (`<script src="js/comum.js"></script>`) e cole-a **depois** da linha 59, para o `comum.js` ser o último.
2. Abra `detalhe-projeto.html?id=joao-saccucci-labs` pelo Live Server, com o console (F12) aberto.
3. Responda: o código tem `try/catch` (`js/detalhe-projeto.js`, linhas 63 e 110). Então por que a tela **não** mostra a mensagem amigável "Ops! Não conseguimos carregar os dados." e fica parada em "Carregando projeto..."? (Dica: qual função o `catch` chama na linha 112, e em qual arquivo ela mora?)
4. Desfaça a mudança.

- [ ] Mudei o `comum.js` para o fim e vi o `ReferenceError: carregarJSON is not defined` no console.
- [ ] Expliquei por que nem o `catch` conseguiu mostrar a mensagem de erro.
- [ ] Voltei a ordem original e a página do projeto apareceu de novo, sem erros no console.

> [!TIP]
> Mensagem amigável na tela, detalhe técnico no console: é por isso que todo `catch` do projeto tem um `console.error(erro)`. Ao depurar, olhe **sempre** o console primeiro.

### Parte B - Um evento novo na linha do tempo (JSON, 10 min)

Em `data/projetos.json`, dentro de `"linhaDoTempo"`, acrescente um evento **depois da linha 139**:

```json
{ "data": "2026-11-04", "agente": "chefe", "descricao": "João fez o exercício da Aula 02." }
```

A linha 139 hoje é o último item e **não tem vírgula no fim**. Coloque uma vírgula nela, e **não** coloque vírgula depois do seu evento novo (regra do JSON da Aula 01). De propósito, `"chefe"` **não existe** no `agentes.json`.

- [ ] Em `detalhe-projeto.html?id=joao-saccucci-labs` aparece um **novo losango de data** com `2026-11-04` no fim da linha do tempo.
- [ ] O evento mostra uma **bolinha** no lugar do avatar e o nome **chefe** (é o fallback do Conceito 4 funcionando).
- [ ] O console (F12) não mostra erros.
- [ ] Mudei a data do evento para `2026-11-01` e descobri onde ele aparece agora, e por quê (releia o Conceito 2).

### Desafio extra - Data em formato brasileiro (JS)

Faça a linha do tempo mostrar `02/11/2026` em vez de `2026-11-02`.

**Onde:** `js/timeline.js`, linha 77. Mude **só o texto visível**, entre `>` e `</time>`. O `datetime="..."` deve continuar em ISO, porque é ele que máquinas e leitores de tela entendem.

**Dica:** crie em `timeline.js` uma função `formatarData(iso)`. Pense no que `"2026-11-02".split("-")` devolve ([[split]]), e depois em [[reverse]] e `join("/")`, que você já conhece. Por que não guardar a data já em `dd/mm/aaaa` no JSON? Releia o item 2 do Conceito 2.

- [ ] A tela mostra `02/11/2026`.
- [ ] No F12 (aba Elements), a tag continua `<time datetime="2026-11-02">`.
- [ ] A ordem dos eventos não mudou.

Quando terminar, me diga **em quais arquivos e linhas você mexeu**, sua resposta da Parte A e onde o evento do teste de ordenação apareceu.

## 4. Como falar disso numa entrevista de estágio

1. "Fiz uma linha do tempo a partir de um JSON: copio a lista com `slice` porque o `sort` altera o array original, ordeno as datas ISO com `localeCompare` (no formato ano-mês-dia a ordem alfabética é a cronológica) e aproveito que o `sort` é estável para manter a ordem dos eventos do mesmo dia."
2. "Depois de ordenar, agrupo os eventos por data numa só passada, olhando só o último grupo. Se o agente de um evento não existir, uso um fallback com o id e um avatar genérico em vez de esconder o evento, porque ele faz parte da história do projeto."
3. "Na página Sobre usei HTML semântico e acessível: `dl/dt/dd` para a ficha, `aria-current` no menu, texto `sr-only` avisando 'abre em nova aba', `rel="noopener noreferrer"` nos links externos e SVG inline com `currentColor` para o ícone mudar de cor com o texto. No CSS usei `subgrid` dentro de `@supports`, como melhoria progressiva."

### Resumo de boas práticas desta aula

- Um arquivo, uma responsabilidade, e a ordem dos `<script>` respeitando quem depende de quem.
- Não alterar dados de entrada sem querer (`slice()` antes do `sort`).
- Guardar datas em ISO e formatar só na hora de mostrar.
- Pensar no plano B (fallback) e decidir se o dado faltante some ou aparece.
- HTML semântico (`dl`, `time`, `section` com `aria-labelledby`) e acessibilidade (`alt=""` em imagem decorativa, `sr-only`, `aria-hidden`, `aria-current`).
- Segurança em links externos: `rel="noopener noreferrer"`.
- CSS com variáveis para mudar algo em um lugar só, e `@supports` para usar recursos novos sem quebrar navegadores antigos.
