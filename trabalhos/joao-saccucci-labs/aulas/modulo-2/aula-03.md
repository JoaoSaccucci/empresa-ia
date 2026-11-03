# Agrupar itens parecidos

> [!TIP]
> **Em resumo:** para separar uma lista em grupos, comece com listas vazias e passe por cada item com `forEach`.
> Um `if`/`else` decide em qual grupo o item entra, e o `push` coloca o item lá.

## O conceito

Na linha do tempo do site, vários eventos acontecem no mesmo dia. Em vez de repetir a data em cada evento, o site mostra a data uma vez só, com todos os eventos daquele dia embaixo. Para isso, ele precisa **agrupar** os eventos.

A receita usa três peças que você já viu ou vai reconhecer fácil:

1. **Listas vazias** `[ ]`, que vão receber os grupos.
2. O [[forEach]] ("para cada"), que passa por cada item da lista e roda uma função para ele. É parecido com o `map` da aula 1.5, mas não cria uma lista nova: ele só **faz alguma coisa** com cada item.
3. Um [[if]] ("se") com [[else]] ("senão"), que decide para onde o item vai, e o [[push]] ("empurrar"), que coloca o item no fim de uma lista.

Pense em separar roupas para lavar: você pega uma peça por vez e olha. Se é branca, vai para um cesto; senão, vai para o outro. No fim, cada cesto é um grupo.

## Exemplo

Primeiro, a ideia no caso mais simples: separar notas em dois grupos. Clique em **Rodar**.

```js rodar
const notas = [8, 4, 10, 6, 3];
const aprovadas = [];
const reprovadas = [];

notas.forEach(function (nota) {
  if (nota >= 6) {
    aprovadas.push(nota);
  } else {
    reprovadas.push(nota);
  }
});

console.log(aprovadas);
console.log(reprovadas);
```
- **L1:** a lista de notas, ainda misturadas.
- **L2–3:** os dois "cestos", começando vazios. Usamos `const` porque a variável continua apontando para a mesma lista; o `push` só acrescenta itens dentro dela.
- **L5:** para cada item de `notas`, o `forEach` chama a função e entrega o item no parâmetro `nota`. Ele vai fazer isso 5 vezes, uma por nota, na ordem da lista.
- **L6:** a condição: a nota é maior ou igual a 6?
- **L7:** se sim, a nota vai para o fim de `aprovadas`.
- **L8–9:** senão, vai para `reprovadas`. Toda nota cai em um dos dois caminhos, nunca nos dois.
- **L11:** fecha a função e o `forEach`. Repare no `});`: a `}` fecha a função e o `)` fecha os parênteses do `forEach`.
- **L13–14:** mostra os grupos: `[8, 10, 6]` e `[4, 3]`. A ordem dentro de cada grupo é a mesma da lista original.

### Agrupar por data

Agora, do jeito que a linha do tempo faz. Os eventos já estão **em ordem de data** (aula 2.2), então os eventos do mesmo dia estão juntos. A regra fica assim: se o evento tem a mesma data do último grupo, entra nele; senão, começa um grupo novo.

```js rodar
const eventos = [
  { data: "01/11", texto: "Ideia do site" },
  { data: "02/11", texto: "Requisitos" },
  { data: "02/11", texto: "Visual" }
];
const dias = [];
eventos.forEach(function (evento) {
  const ultimo = dias[dias.length - 1];
  if (ultimo && ultimo.data === evento.data) {
    ultimo.textos.push(evento.texto);
  } else {
    dias.push({ data: evento.data, textos: [evento.texto] });
  }
});
console.log(dias);
```
- **L1–5:** três eventos, dois deles no mesmo dia.
- **L6:** `dias` vai guardar os grupos. Cada grupo será um objeto com uma data e uma lista de textos.
- **L8:** pega o último grupo criado, com o truque `lista[lista.length - 1]` da aula 1.2. Na primeira volta, `dias` está vazia e `ultimo` fica `undefined`.
- **L9:** o `&&` quer dizer "e": as duas partes precisam ser verdadeiras. Primeiro, "existe um último grupo?" e, depois, "a data dele é igual à deste evento?". O `===` compara se os dois valores são iguais.
- **L10:** mesma data: o texto entra na lista de textos do grupo que já existe.
- **L11–12:** data nova: cria um grupo novo e coloca no fim de `dias`. Repare que `textos` já nasce com o primeiro texto dentro: `[evento.texto]`.
- **L15:** mostra o resultado: dois grupos, `01/11` com 1 texto e `02/11` com 2 textos.

Acompanhe as três voltas: na 1ª, `dias` está vazia, então cria o grupo `01/11`. Na 2ª, a data `02/11` é diferente de `01/11`, então cria o grupo `02/11`. Na 3ª, a data é igual à do último grupo, então "Visual" entra no grupo `02/11`.

> [!CAUTION]
> Apagar o `ultimo &&` da linha 9 para "simplificar". Na primeira volta, `ultimo` é `undefined`, e ler `undefined.data` quebra o código com um erro parecido com `Cannot read properties of undefined` ("não dá para ler propriedades de undefined"). Teste isso no exemplo e depois clique em **Restaurar**.

## Onde aparece no site

No `js/timeline.js`, o "passo 2" da função `htmlLinhaDoTempo` fica nas linhas 53 a 63. É a mesma receita do segundo exemplo: `dias` começa vazia (linha 55), o `forEach` passa por cada evento já ordenado (linha 56), o `if` confere a data do último dia (linha 58) e o `push` coloca o evento no grupo certo (linhas 59 e 61). Depois, no passo 3, um `map` transforma cada grupo em HTML.

> [!IMPORTANT]
> Pergunta comum: "Qual a diferença entre `forEach` e `map`?" O `map` devolve uma lista **nova**, do mesmo tamanho, com um resultado para cada item. O `forEach` não devolve nada: ele serve para **fazer algo** com cada item, como dar `push` em outra lista. Se você precisa de uma lista transformada, use `map`; se precisa separar ou juntar, `forEach` com `push` resolve.

> [!TIP]
> **Para ir além (opcional):** esse jeito de agrupar só funciona porque a lista está ordenada, e os itens iguais estão lado a lado. Se a lista estivesse misturada, seria preciso procurar o grupo certo entre **todos** os grupos, por exemplo com o `find` ("encontrar"), e não só olhar o último.

## Para praticar

- [ ] No primeiro exemplo, clique em **Editar** e troque o 6 da linha 6 por 7. Quais notas mudam de grupo?
- [ ] No segundo exemplo, acrescente o evento `{ data: "02/11", texto: "Código" }` no fim da lista (não esqueça a vírgula na linha 4) e rode. Em qual grupo ele entra?
- [ ] Agora coloque um evento de `01/11` **no fim** da lista e rode. Por que ele não entrou no grupo `01/11` do começo?
