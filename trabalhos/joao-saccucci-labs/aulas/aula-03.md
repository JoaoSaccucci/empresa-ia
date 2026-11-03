# Aula 03 - Por dentro da tela de leitura das aulas

Esta aula é sobre a própria tela em que você está lendo. Tudo o que aparece aqui (as caixas coloridas, as palavras com tradução, o checklist que fica salvo, o sumário, o tema papel) foi feito pelo dev na Etapa 3, em `aula.html`, `js/aula.js`, `js/aulas.js`, `js/comum.js` e `css/style.css`. Abra esses arquivos ao lado.

## 1. Visão geral: o caminho de uma aula

```text
 aula.html?id=joao-saccucci-labs-aula-03
     |  (1) script no <head> aplica tema e letra salvos (antes de pintar)
     |  (2) no fim do <body>: marked + highlight.js (CDN), comum.js, aula.js
     v
 js/aula.js
     |  (3) acha a aula em data/aulas.json pelo ?id=
     |  (4) fetch do arquivo .md (texto puro)
     |  (5) marked converte Markdown -> HTML (sem deixar passar HTML cru)
     |  (6) "arruma" o HTML: caixas, glossário, checklist, código, sumário
     v
 A aula na tela  +  progresso salvo no localStorage (prefixo "jsl:")
```

O professor (eu) escreve só um arquivo [[Markdown]], que continua legível no GitHub. Quem transforma esse texto na tela que você vê é o `aula.js`. Repare que o padrão é o mesmo da Aula 01: **uma página só**, e o `id` vem da URL.

## 2. Os 5 conceitos da Etapa 3

### Conceito 1 - Biblioteca por CDN, com versão fixa e integrity

Esta é a única página do site que usa bibliotecas prontas. Elas vêm de uma [[CDN]] (`aula.html`, linhas 158-163):

```html
<script src="https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js"
        integrity="sha384-/TQbtLCAerC3jgaim+N78RZSDYV7ryeoBCVqTuzRrFec2akfBkHS7ACQ3PQhvMVi"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
        integrity="sha384-F/bZzf7p3Joyp5psL90p/p89AZJsndkSoGwRpXcZhleCWhd8SnRuoYo4d0yirjJp"
        crossorigin="anonymous"></script>
```

Três decisões importantes:

- **Versão fixa na URL** (`marked@12.0.2`, `11.9.0`). Se fosse "latest" (a mais nova), uma atualização da biblioteca poderia mudar o comportamento e quebrar o site sem ninguém ter mexido em nada.
- [[integrity]] é a "impressão digital" (um *hash*) do arquivo. O navegador baixa o arquivo, calcula a impressão digital e compara. Se a CDN for invadida e entregar outro código, ele **não executa**. Isso se chama **SRI** (Subresource Integrity). O `crossorigin="anonymous"` é exigido para essa conferência funcionar com arquivos de outro site.
- **Plano B.** Se a CDN estiver fora do ar, a variável `marked` simplesmente não existe. O `aula.js` confere isso com [[typeof]] antes de usar (linhas 685-690):

```js
if (typeof window.marked === "undefined") {
  mostrarMensagemDaAula(`
    <p>Não foi possível preparar a aula para leitura agora.</p>
    <a href="${escapar(aula.arquivo)}">Abrir o arquivo original da aula (.md)</a>`);
  return;
}
```

Com o `highlight.js` é parecido (linhas 418 e 430): sem a biblioteca, o código aparece sem cores, mas aparece.

> [!IMPORTANT]
> "Como você usa uma biblioteca de terceiros com segurança?" Versão fixa (nada de "latest"), `integrity` para o navegador recusar um arquivo alterado, e um [[fallback]] para o site continuar útil se a CDN cair.

### Conceito 2 - Markdown vira HTML, mas sem abrir a porta para código

Na Aula 01 você viu que `innerHTML` + texto de fora = risco de XSS, e que o `escapar` resolve. Aqui o problema é maior: o Markdown **aceita HTML cru** no meio do texto. Um `.md` com `<img src=x onerror=...>` viraria código rodando na página.

O dev configurou o `marked` para escapar todo HTML cru (`js/aula.js`, linhas 649-657):

```js
function converterMarkdown(texto) {
  marked.use({
    gfm: true, // "GitHub Flavored Markdown": tabelas, - [ ] etc., igual ao GitHub
    renderer: {
      html: function (html) { return escapar(html); }
    }
  });
  return marked.parse(texto);
}
```

E mais duas camadas de proteção:

- `protegerLinks` (linhas 174-181) tira o `href` de qualquer link que não seja `http:`, `https:` ou `mailto:`. Um link `javascript:...` executaria código ao ser clicado.
- No glossário, a palavra entra na página com `document.createTextNode(...)` (linhas 246 e 252), que **sempre** trata o conteúdo como texto. E a linha 232 pula tudo o que estiver dentro de `pre`, `code` ou `kbd`. É por isso que, dentro de um bloco de código, `[[fetch]]` continua escrito assim.

**Por que foi escrito assim:** o `.md` é nosso, então hoje ninguém mal-intencionado escreve nele. Mas segurança é feita em camadas: se um dia outra pessoa contribuir com uma aula, a página já está protegida.

> [!NOTE]
> **Sanitizar** o HTML é limpar o que veio de fora antes de colocar na página: escapar o que é perigoso ou remover o que não é permitido (como links `javascript:`). Em projetos maiores, é comum usar uma biblioteca só para isso, como a DOMPurify.

### Conceito 3 - localStorage com prefixo, JSON e try/catch

O checklist, a aula concluída, o tema e o tamanho da letra ficam salvos no [[localStorage]], um "caderninho" do navegador que continua lá depois de fechar a aba. As funções moram no `comum.js`, porque a lista de aulas também precisa delas (`js/comum.js`, linhas 119-138):

```js
const PREFIXO_PROGRESSO = "jsl:";

function lerProgresso(chave, padrao) {
  try {
    const texto = localStorage.getItem(PREFIXO_PROGRESSO + chave);
    return texto === null ? padrao : JSON.parse(texto);
  } catch (erro) {
    return padrao;
  }
}

function salvarProgresso(chave, valor) {
  try {
    localStorage.setItem(PREFIXO_PROGRESSO + chave, JSON.stringify(valor));
  } catch (erro) {
    // Sem armazenamento: a página funciona, só não lembra depois.
  }
}
```

Quatro detalhes que mostram cuidado:

1. **O localStorage só guarda texto.** Para salvar uma lista como `[true, false, true]`, o código transforma em texto com `JSON.stringify` e, ao ler, volta para lista com `JSON.parse`.
2. **Prefixo `jsl:`.** No GitHub Pages, todos os seus sites ficam no mesmo endereço (`seu-usuario.github.io`) e dividem o mesmo localStorage. O prefixo evita que outro projeto seu sobrescreva a chave `"aulas-concluidas"`.
3. **[[try]] e [[catch]].** Em modo anônimo restrito, com o armazenamento bloqueado ou cheio, o `localStorage` **lança erro**. Sem o `try`, a página inteira quebraria só porque não deu para salvar uma caixinha marcada.
4. **Valor padrão.** `lerProgresso("aulas-concluidas", [])` devolve `[]` quando não há nada salvo. E `lerAulasConcluidas` (linhas 141-144) ainda confere `Array.isArray(lista)`, caso o valor salvo esteja estranho.

> [!CAUTION]
> Achar que o `localStorage` é um banco de dados. Ele fica **só no navegador de quem lê**: se você abrir o site no celular, seu progresso do computador não está lá. E qualquer pessoa pode editar esses valores pelo F12, então nunca guarde ali algo que precise ser confiável (como uma senha ou uma nota de prova).

### Conceito 4 - Tema e letra: aplicar antes de pintar, com data-atributos e variáveis CSS

**O problema do "piscar".** O `aula.js` só roda no fim da página. Se fosse ele que aplicasse o tema papel, você veria a página escura por um instante e depois ela ficaria clara. Por isso há um script pequeno **dentro do `<head>`**, antes até do CSS (`aula.html`, linhas 18-27):

```html
<script>
  try {
    var temaSalvo = JSON.parse(localStorage.getItem("jsl:leitura-tema"));
    var fonteSalva = JSON.parse(localStorage.getItem("jsl:leitura-fonte"));
    if (temaSalvo === "papel") document.documentElement.setAttribute("data-tema", "papel");
    if (fonteSalva >= 1 && fonteSalva <= 5) document.documentElement.setAttribute("data-fonte", String(fonteSalva));
  } catch (erro) {
    // Sem localStorage: fica o padrão (escuro, letra 3)
  }
</script>
```

`document.documentElement` é a tag `<html>`. Repare que o script **confere** se a fonte está entre 1 e 5: um valor salvo inválido é ignorado.

**O JS só muda um atributo; o CSS faz o resto.** Os 5 tamanhos de letra estão em `css/style.css`, linhas 1636-1640:

```css
html[data-fonte="1"] { --leitura-escala: 0.88; } /* ~15 a 17px */
html[data-fonte="2"] { --leitura-escala: 0.94; } /* ~16 a 18px */
html[data-fonte="3"] { --leitura-escala: 1;    } /* ~17 a 19px (padrão) */
html[data-fonte="4"] { --leitura-escala: 1.12; } /* ~19 a 21px */
html[data-fonte="5"] { --leitura-escala: 1.25; } /* ~21 a 24px */
```

E o texto usa `calc(var(--leitura-base) * var(--leitura-escala, 1))` (linha 1623). Do lado do JS, o botão A+ só faz isto (`js/aula.js`, linhas 69-74):

```js
function aplicarFonte(nivel) {
  nivelFonte = nivel;
  raiz.dataset.fonte = String(nivel); // o CSS troca --leitura-escala
  botaoFonteMenos.disabled = nivel <= FONTE_MINIMA;
  botaoFonteMais.disabled = nivel >= FONTE_MAXIMA;
}
```

- [[dataset]] é o jeito do JS ler e escrever atributos `data-*`: `raiz.dataset.fonte = "4"` vira `data-fonte="4"` no HTML.

O tema papel usa a mesma ideia, só que maior: com `html[data-tema="papel"]`, o CSS **troca os valores das variáveis do `:root`** (`--cor-fundo`, `--cor-texto`, `--cor-ciano`...; linhas 1649-1672). Como o header, os botões e os links já usam essas variáveis, tudo muda junto, sem repetir regra por regra. É a mesma lição do `--agente-cor` da Aula 01, em escala maior.

> [!CAUTION]
> O atributo [[hidden]] esconde um elemento só porque o navegador aplica `display: none` nele. Se o CSS da classe disser `display: flex`, o CSS ganha e o elemento **aparece mesmo com `hidden`**. O dev resolveu com uma regra no fim do CSS (`css/style.css`, linhas 3102-3104): `.modo-foco [hidden] { display: none !important; }`.

### Conceito 5 - Sumário ativo e barra de progresso, sem pesar a rolagem

Ao rolar, duas coisas mudam: a barrinha verde no topo e o item destacado do sumário. O evento de [[scroll]] dispara **dezenas de vezes por segundo**, então o dev usou [[requestAnimationFrame]] para fazer o cálculo no máximo uma vez por quadro da tela (`js/aula.js`, linhas 635-639):

```js
function agendarAtualizacao() {
  if (atualizacaoPendente) return;
  atualizacaoPendente = true;
  requestAnimationFrame(atualizarLeitura);
}
```

O `requestAnimationFrame` recebe uma [[callback]] e a chama logo antes de o navegador desenhar o próximo quadro. A "bandeira" `atualizacaoPendente` impede de agendar duas vezes.

Dentro de `atualizarLeitura`, o item ativo é **o último título que já passou de uma linha imaginária no topo** (linhas 614-617):

```js
let ativo = titulosDaAula[0];
titulosDaAula.forEach(function (titulo) {
  if (titulo.getBoundingClientRect().top <= ALTURA_DO_TOPO) ativo = titulo;
});
```

- `getBoundingClientRect().top` diz a distância do elemento até o topo da **tela** (fica negativo quando ele já passou).
- `ALTURA_DO_TOPO` (linha 45) vale 160: a altura do header + barra de ferramentas grudados, mais um respiro.

Para a barra de progresso, o JS só escreve um número de 0 a 1 numa variável CSS (linha 609), e o CSS faz `transform: scaleX(var(--progresso, 0))` (`css/style.css`, linha 1766). De novo: JS cuida do **estado**, CSS da **aparência**.

> [!TIP]
> Existe uma ferramenta pronta para "avisar quando um elemento entra ou sai da tela": o [[IntersectionObserver]]. O dev preferiu o cálculo com `scroll` porque, com uma aula curta, as últimas seções nunca chegam ao topo, e o código precisa marcar a última seção no fim da página (linhas 621-622). As duas soluções são válidas: saber comparar as duas é um ótimo assunto de entrevista.

## 3. Exercício prático

### Parte A - Espiando o localStorage (DevTools, 5 min)

Abra esta aula pelo Live Server e aperte F12. Vá na aba **Application** (no Chrome; no Firefox é **Storage**), depois em **Local Storage** e clique no endereço do site.

- [ ] Marquei este item e encontrei a chave `jsl:checklist:joao-saccucci-labs-aula-03` com uma lista de `true`/`false`.
- [ ] Liguei o "Tema papel" e vi a chave `jsl:leitura-tema` com o valor `"papel"`, **com aspas** (explique por quê, pensando no `JSON.stringify`).
- [ ] Apaguei a chave `jsl:leitura-tema` pelo DevTools, recarreguei a página e ela voltou para o tema escuro.

### Parte B - Um 6º tamanho de letra (CSS + JS, 10 min)

Faça o botão A+ ir até um nível 6, com `--leitura-escala: 1.4`. São **três lugares**:

1. `css/style.css`: depois da linha 1640, crie a regra para `html[data-fonte="6"]`.
2. `js/aula.js`, linha 66: mude o `FONTE_MAXIMA`.
3. `aula.html`, linha 23: o script do `<head>` só aceita valores até 5.

- [ ] Clicando em A+ a letra chega a um 6º tamanho, maior que o 5.
- [ ] No nível 6, o botão A+ fica desativado (e o A− continua funcionando).
- [ ] Recarreguei a página no nível 6 e a letra continuou grande, sem "piscar" no tamanho padrão.
- [ ] Testei esquecer o passo 3 e expliquei o que acontece ao recarregar (e por quê).

### Desafio extra - Quebre o integrity de propósito

Em `aula.html`, linha 159, troque **uma letra** do valor do `integrity` do `marked`. Recarregue esta aula com o console aberto e depois desfaça a mudança.

- [ ] Vi no console o aviso de que o navegador recusou o arquivo por causa do integrity.
- [ ] A tela mostrou o plano B do Conceito 1, com o link para o arquivo `.md` original.
- [ ] Desfiz a mudança e a aula voltou ao normal.

Quando terminar, me diga **em quais arquivos e linhas você mexeu**, o que acontece quando o passo 3 da Parte B é esquecido e por que o valor do tema aparece com aspas.

## 4. Como falar disso numa entrevista de estágio

1. "Na tela de leitura uso duas bibliotecas por CDN, com versão fixa e `integrity` (SRI), para o navegador recusar um arquivo alterado. Se a CDN cair, a página detecta com `typeof` e oferece o arquivo original em vez de quebrar."
2. "O Markdown vira HTML com o `marked`, mas configurei o renderer para escapar HTML cru e removo links que não sejam http, https ou mailto, para evitar XSS mesmo vindo de um arquivo nosso."
3. "O progresso do aluno fica no `localStorage`, com prefixo nas chaves, `JSON.stringify`/`parse` e `try/catch`, porque o armazenamento pode estar bloqueado. O tema salvo é aplicado por um script no `<head>`, mudando só um atributo `data-tema`, e o CSS troca as variáveis: assim não há o 'piscar' do tema errado."

### Resumo de boas práticas desta aula

- Biblioteca externa: versão fixa, `integrity` e plano B.
- Conteúdo que vira HTML passa por escape ou sanitização, mesmo que venha de um arquivo seu.
- `localStorage` sempre com `try/catch`, prefixo nas chaves e valor padrão.
- O que precisa estar certo na primeira pintura (tema) roda no `<head>`; o resto pode esperar o fim do `<body>`.
- JS muda estado (atributos `data-*`, variáveis CSS), CSS cuida da aparência.
- Trabalho pesado durante a rolagem passa por `requestAnimationFrame`.
