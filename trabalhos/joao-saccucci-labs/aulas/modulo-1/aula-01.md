# Tags e atributos: as etiquetas do HTML

> [!TIP]
> **Em resumo:** o HTML é texto com etiquetas, as tags, que dizem ao navegador o que cada pedaço é: título, parágrafo, lista, link.
> Os atributos ficam dentro da tag de abertura e dão informações extras, como o endereço de um link.

## O conceito

Quando você abre um site, o navegador recebe um arquivo de texto. Para saber que um pedaço é título e outro é parágrafo, ele procura as marcações do [[HTML]]. Cada marcação é uma [[tag]], uma etiqueta escrita entre `<` e `>`.

Quase toda tag vem em par: uma abre, outra fecha, e o conteúdo fica no meio. Veja um link:

```html
<a href="equipe.html">Conhecer a equipe</a>
```

Lendo da esquerda para a direita:

- `<a ...>` é a **tag de abertura**. O `a` vem de *anchor* (âncora) e quer dizer "link".
- `href="equipe.html"` é um **atributo**: um par `nome="valor"` que fica dentro da tag de abertura. O [[href]] diz para onde o link leva.
- `Conhecer a equipe` é o **conteúdo**, o texto que aparece na tela.
- `</a>` é a **tag de fechamento**: o mesmo nome, com uma barra `/` antes.

Tags também podem ficar umas dentro das outras, como caixas dentro de caixas. A regra é simples: a última que abriu é a primeira que fecha.

É basicamente isso. O resto do HTML é conhecer mais algumas tags e atributos, e isso vem com o uso, sem precisar decorar.

> [!NOTE]
> **Tag** é a etiqueta, como `<p>`. **Elemento** é o conjunto todo: abertura, conteúdo e fechamento. No dia a dia, muita gente fala "tag" para as duas coisas, e tudo bem.

## Exemplo

Clique em **Rodar** para ver como o navegador desenha este HTML.

```html rodar
<h1>João Saccucci Labs</h1>
<p>Uma empresa em que os <strong>funcionários</strong> são agentes de IA.</p>

<h2 id="equipe">Equipe</h2>
<ul>
  <li>Product Owner</li>
  <li>Artista</li>
  <li>Dev</li>
  <li>Professor</li>
</ul>

<a href="https://github.com/JoaoSaccucci" target="_blank">GitHub do João</a>
<button type="button">Ver projetos</button>
```
- **L1:** `<h1>` é o título principal da página (*heading 1*, "título 1"). Cada página costuma ter só um.
- **L2:** `<p>` é um parágrafo (*paragraph*). Dentro dele, `<strong>` (forte) marca uma palavra importante, que aparece em negrito. Repare na ordem: o `strong` abriu por último, então fecha primeiro.
- **L4:** `<h2>` é um subtítulo. O atributo [[id]] dá a ele um nome único na página, `equipe`. Ele não muda nada na tela, mas o CSS e o JavaScript podem usar esse nome para achar o elemento.
- **L5–10:** `<ul>` é uma lista com marcadores (*unordered list*, "lista não ordenada") e cada `<li>` é um item (*list item*). Os espaços no começo das linhas só ajudam a gente a ler; o navegador ignora.
- **L12:** um link com **dois** atributos. `href` é o endereço e `target="_blank"` (alvo: em branco) pede para abrir numa aba nova. Dentro do exemplo, o clique não abre nada: a área do Rodar é isolada e bloqueia abas novas, por segurança.
- **L13:** `<button>` é um botão. `type="button"` avisa que ele é um botão comum, que não envia formulário. Clicar nele ainda não faz nada, porque quem dá comportamento aos botões é o JavaScript (você vê isso na aula 1.8).

> [!CAUTION]
> Fechar fora de ordem, como `<p><strong>Olá</p></strong>`, ou esquecer a barra do fechamento. O navegador não mostra erro: ele tenta adivinhar o que você quis dizer, e o resultado pode ficar estranho em outra parte da página. Quando algo aparecer em negrito ou no lugar errado sem motivo, procure uma tag mal fechada.

## Onde aparece no site

Abra o `index.html`: o nome da empresa é um `<h1>` (linha 45), e os botões "Ver projetos" e "Conhecer a equipe" são links `<a>` com `href` (linhas 52 e 53). O botão do menu no celular é um `<button type="button">` (linha 24), e os links de GitHub e LinkedIn do `sobre.html` usam `target="_blank"` (linhas 85 e 92).

> [!IMPORTANT]
> Pergunta comum: "Qual a diferença entre `id` e `class`?" O `id` é um nome **único**: só um elemento da página pode ter aquele valor. A `class` é um **grupo**: vários elementos podem ter a mesma classe, e um elemento pode ter várias, separadas por espaço, como `class="btn btn-primario"` no `index.html`.

> [!TIP]
> **Para ir além (opcional):** algumas tags não têm fechamento, porque não têm conteúdo no meio. Exemplos: `<meta>` (informações sobre a página) e `<img>` (imagem). Você vê as duas no `index.html`, nas linhas 4 e 64.

## Teste rápido

```quiz
? No código <a href="https://github.com/JoaoSaccucci">GitHub</a>, o que é href?
[ ] A tag do link.
    -> Errada: a tag é o "a". O href fica dentro dela.
[x] Um atributo, que diz para onde o link leva.
    -> Certa: atributo é um par nome="valor" dentro da tag de abertura, e o href guarda o endereço.
[ ] O texto que aparece na tela.
    -> Errada: o texto visível é "GitHub", que fica entre a abertura e o fechamento.
```

```quiz
? Qual destas linhas fecha as tags na ordem certa?
[ ] <p><strong>Olá</p></strong>
    -> Errada: o strong abriu por último, então precisa fechar primeiro.
[x] <p><strong>Olá</strong></p>
    -> Certa: a última tag que abriu (strong) é a primeira que fecha.
[ ] <p><strong>Olá<strong><p>
    -> Errada: faltou a barra. Sem a barra, as tags abrem de novo em vez de fechar.
```

```quiz
? Dois títulos da mesma página podem ter id="equipe"?
[ ] Sim, o id serve para agrupar elementos parecidos.
    -> Errada: quem agrupa é a class. O id é um nome único.
[x] Não, o id precisa ser único na página.
    -> Certa: cada valor de id deve aparecer em um elemento só. Para vários elementos, use class.
[ ] Sim, desde que um seja h1 e o outro h2.
    -> Errada: o tipo da tag não importa. O id não pode se repetir em nenhum elemento.
```

## Para praticar

- [ ] No exemplo, clique em **Editar**, acrescente o item `<li>João (chefe)</li>` na lista e rode de novo.
- [ ] Apague o `</strong>` da linha 2 e rode. O que aconteceu com o texto que vem depois? Depois clique em **Restaurar**.
- [ ] Troque `<ul>` e `</ul>` por `<ol>` e `</ol>` e rode. O que mudou na lista?
