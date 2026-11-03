# Montar HTML a partir de uma lista

> [!TIP]
> **Em resumo:** o `map` passa por cada item de uma lista e devolve uma lista nova, transformada.
> Com uma template string, cada item vira um pedaço de HTML; o `join("")` junta os pedaços.
> O `innerHTML` coloca esse HTML dentro de um elemento da página.

## O conceito

Na aula 1.2 você viu que os dados do site são listas de objetos. Na 1.4, que o JavaScript acha um elemento da página. Falta a ponte: transformar **cada objeto** num pedaço de HTML. São três peças, uma depois da outra.

**1. Template string: um texto com espaços para preencher.** A [[template string]] é um texto escrito entre crases (`` ` ``), e não entre aspas. Dentro dela, `${...}` encaixa um valor no meio do texto:

```js
const nome = "Dev";
const html = `<li>${nome}</li>`;   // "<li>Dev</li>"
```

**2. map: fazer a mesma coisa com cada item.** O [[map]] (mapear) recebe uma [[function]] e chama essa função uma vez para cada item da lista. O que a função devolve com [[return]] vai para uma lista **nova**, na mesma ordem. A lista original não muda.

**3. innerHTML: colocar o HTML na página.** O [[innerHTML]] é o HTML que fica dentro de um elemento. Quando você dá um valor novo para ele, o navegador apaga o que estava lá e desenha o novo conteúdo.

## Exemplo

Clique em **Rodar**. A lista da tela é criada só pelo JavaScript: o `<ul>` começa vazio.

```html rodar
<ul id="lista"></ul>

<script>
  const projetos = [
    { nome: "Site da empresa", status: "em andamento" },
    { nome: "Portfólio", status: "planejado" }
  ];

  const itens = projetos.map(function (projeto) {
    return `<li><strong>${projeto.nome}</strong> (${projeto.status})</li>`;
  });
  console.log(itens);

  document.querySelector("#lista").innerHTML = itens.join("");
</script>
```
- **L1:** uma lista `<ul>` vazia, com o `id` "lista". É aqui que os itens vão aparecer.
- **L4–7:** uma lista com dois objetos, no mesmo formato do `data/projetos.json` (bem resumido).
- **L9:** o `map` vai chamar a função duas vezes, uma para cada projeto. Em cada vez, o item da vez chega no parâmetro `projeto`.
- **L10:** a template string monta um `<li>` com o nome em negrito e o status entre parênteses. O `return` entrega esse texto para o `map`.
- **L11:** fecha a função e o `map`. Agora `itens` é uma lista com dois textos de HTML.
- **L12:** mostra a lista nova no Console. Repare que ainda são só **textos**: nada apareceu na tela por causa desta linha.
- **L14:** o [[join]] (juntar) cola os textos num só, sem nada entre eles (`""`). Depois, o `innerHTML` coloca esse texto dentro do `<ul>`, e o navegador desenha os itens.

> [!CAUTION]
> Esquecer o `join("")` e escrever `innerHTML = itens`. Uma lista virando texto ganha **vírgulas** entre os itens, e elas aparecem na tela, soltas entre os cards. Outro erro comum é esquecer o `return` na linha 10: aí o `map` devolve uma lista de `undefined`.

## Onde aparece no site

No `js/lista-projetos.js`, a função `htmlCardProjeto` (linhas 10 a 22) faz o papel da função da linha 9 do exemplo: recebe um projeto e devolve, com uma template string, o HTML de um card inteiro. Na linha 34, `projetos.map(htmlCardProjeto).join("")` passa a função **pelo nome** para o `map`, e na linha 35 o resultado entra na página com `innerHTML`.

> [!IMPORTANT]
> Pergunta comum: "Qual a diferença entre `map` e `forEach`?" Os dois passam por todos os itens, mas só o `map` devolve uma lista nova com os resultados. Se você quer **transformar** uma lista em outra, use `map`. Se só quer **fazer algo** com cada item, como um `console.log`, use `forEach`.

> [!TIP]
> **Para ir além (opcional):** o `innerHTML` interpreta qualquer texto como HTML. Se um dado tiver algo como `<script>`, ele pode virar código de verdade na página, um problema de segurança chamado [[XSS]]. Por isso o site passa cada texto pela função `escapar` (`js/comum.js`, linha 80) antes de colocar no card. Num exemplo pequeno com dados que você mesmo escreveu, dá para deixar sem.

## Teste rápido

```quiz
? Se numeros = [1, 2, 3], o que numeros.map(function (n) { return n * 10; }) devolve?
[ ] 60
    -> Errada: somar tudo num valor só não é o trabalho do map. Ele devolve uma lista do mesmo tamanho.
[x] [10, 20, 30]
    -> Certa: a função roda para cada item, e cada resultado vai para a lista nova, na mesma ordem.
[ ] [1, 2, 3], porque o map não muda nada.
    -> Errada: a lista original continua [1, 2, 3], mas o map devolve uma lista nova, transformada.
```

```quiz
? Para que serve o join("") no código do exemplo?
[ ] Para colocar o HTML na página.
    -> Errada: quem coloca o HTML na página é o innerHTML. O join só prepara o texto.
[x] Para juntar os pedaços de HTML num texto só, sem nada entre eles.
    -> Certa: o join cola os itens da lista usando o que está entre parênteses como separador. Com aspas vazias, não sobra vírgula nenhuma.
[ ] Para juntar duas listas em uma.
    -> Errada: o join transforma uma lista em um texto. Ele não junta listas.
```

```quiz
? Em qual destes textos o ${nome} é trocado pelo valor da variável nome?
[ ] Num texto entre aspas duplas.
    -> Errada: entre aspas, o ${nome} aparece do jeito que foi escrito, como texto comum.
[ ] Num texto entre aspas simples.
    -> Errada: aspas simples e duplas funcionam igual: nenhuma das duas troca o ${...}.
[x] Num texto entre crases (template string).
    -> Certa: só a template string encaixa valores com ${...}.
```

## Para praticar

- [ ] Clique em **Editar** e acrescente um terceiro projeto na lista (lembre da vírgula no fim da linha 6).
- [ ] Na linha 14, troque `itens.join("")` por `itens` e rode. Onde apareceu a vírgula? Depois clique em **Restaurar**.
- [ ] Mude a linha 10 para mostrar o status antes do nome.
