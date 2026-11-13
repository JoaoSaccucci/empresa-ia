# Quebrar um texto em lista: split, map e filter

> [!TIP]
> **Em resumo:** "levar RG, carteirinha e exames" vira o checklist `["RG", "carteirinha", "exames"]`. O `split` corta o texto, o `map` limpa cada pedaço e o `filter` tira os vazios.
> No fim, o `slice` corta a lista no limite e uma conta diz quantos itens ficaram de fora.

## O conceito

Na Entrega 4b, o que vem depois de "levar" vira itens do "O que levar". A pessoa pode separar os itens com vírgula, com ponto e vírgula ou com "e". Para virar lista, o texto passa por três passos, um depois do outro:

1. **[[split]]** ("dividir"): corta o texto onde aparecer o separador e devolve um [[array]] com os pedaços. O separador pode ser um texto (`","`) ou uma [[expressão regular]], quando há mais de um jeito de separar.
2. **map** ("mapear"): cria uma lista nova, com cada pedaço transformado. Aqui, cada item é limpo (perde os espaços das pontas).
3. **[[filter]]** ("filtrar"): cria uma lista nova só com os pedaços que passam num teste. Aqui, o teste tira os itens vazios.

Escrever `.split(...).map(...).filter(...)` em sequência se chama **encadear**. Cada passo recebe a lista do passo anterior. A ordem importa: primeiro limpa, depois filtra. Um pedaço como `" "` só fica vazio depois da limpeza.

Por fim, o "O que levar" tem um máximo de itens. O **[[slice]]** ("fatia") `lista.slice(0, N)` pega os N primeiros sem mudar a lista original. A diferença entre os tamanhos diz quantos ficaram de fora.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
function separarItens(texto) {
  return (" " + texto + " ").split(/[,;]|\se(?=\s)/)
    .map(function (item) { return item.trim(); })
    .filter(function (item) { return item !== ""; });
}
console.log(JSON.stringify(separarItens("RG, carteirinha e exames")));
console.log(JSON.stringify(separarItens("RG,, exames;")));
console.log(JSON.stringify(separarItens("vitamina E")));
console.log(JSON.stringify(separarItens("caderno e estojo e")));
```
- **L2:** o separador é `,` ou `;` **ou** um espaço seguido de "e" com outro espaço depois. O `(?=\s)` é o lookahead da aula 5.3: ele olha, mas não come o espaço. Os espaços colados nas pontas do texto deixam achar um "e" também no começo ou no fim.
- **L3:** o `map` passa o [[trim]] em cada pedaço.
- **L4:** o `filter` fica só com os pedaços que não são texto vazio.
- **L6:** `["RG","carteirinha","exames"]`. O "e" de "exames" não separa nada, porque depois dele vem "x", e não espaço.
- **L7:** `["RG","exames"]`. O `split` gera pedaços vazios entre ",," e depois do ";", e o `filter` tira todos.
- **L8:** `["vitamina E"]`. A regex só aceita "e" **minúsculo**: o "E" maiúsculo é texto, como decidido depois do teste da 4b.
- **L9:** `["caderno","estojo"]`. O "e" solto no fim gera um pedaço vazio, que o `filter` tira.

Agora o limite de itens:

```js rodar
const MAXIMO = 3;
const todos = ["RG", "exames", "carteirinha", "pedido", "óculos"];
const itens = todos.slice(0, MAXIMO);
const deFora = todos.length - itens.length;
console.log(JSON.stringify(itens), deFora);
console.log(JSON.stringify(["RG"].slice(0, MAXIMO)));
console.log(todos.length);
```
- **L3:** os 3 primeiros. O primeiro número é onde começa e o segundo é onde para (esse não entra).
- **L4:** quantos sobraram.
- **L5:** `["RG","exames","carteirinha"] 2`.
- **L6:** `["RG"]`. Se a lista é menor que o limite, o `slice` devolve tudo, sem erro.
- **L7:** `5`. O `slice` não mexe na lista original.

> [!CAUTION]
> Esquecer o `return` dentro do `map`. Com `.map(function (item) { item.trim(); })`, a lista nova sai cheia de `undefined`, porque a função não devolveu nada. Com chaves `{ }`, o `return` é obrigatório.

## Onde aparece na Agenda

A `separarItens` da Agenda é quase igual à do exemplo. A diferença é que, no lugar do `trim`, ela usa a `limparTexto`, que também corta cada item em 60 letras ([frase.js, linhas 658 a 667](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L658-L667)). Na `entenderFrase`, o `slice` guarda até `MAXIMO_DE_ITENS` (20), e `itensDeFora` conta o resto para o aviso ([linhas 749 a 758](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L749-L758)). A linha "Entendi" usa o `slice` de novo para mostrar só os 3 primeiros quando há 5 itens ou mais ([linhas 828 a 833](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L828-L833)).

> [!TIP]
> **Para ir além (opcional):** "levar e-mail impresso" vira um item só. Na regex, depois do "e" precisa vir um espaço, e o hífen não é espaço. O mesmo cuidado aparece nas regras do "e" de ligação do título ([linhas 576 a 584](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L576-L584)).

> [!IMPORTANT]
> Pergunta comum: "O map e o filter mudam o array original?" Resposta: não, os dois devolvem um array novo. O `slice` também não muda o original. Quem muda é o [[splice]], que tira ou põe itens no próprio array. Trocar `slice` por `splice` é um erro clássico.

## Teste rápido

```quiz
? O que "a,,b".split(",") devolve?
[ ] ["a", "b"]
    -> Errada: o split não tira os vazios sozinho. Para isso existe o filter.
[x] ["a", "", "b"]
    -> Certa: entre as duas vírgulas há um texto vazio, e ele vira um pedaço.
[ ] ["a,,b"]
    -> Errada: isso aconteceria se não houvesse vírgula no texto.
```

```quiz
? Por que a separarItens chama o map antes do filter?
[ ] Tanto faz a ordem.
    -> Errada: um pedaço " " (só espaço) passaria pelo filter e só ficaria vazio depois.
[x] Porque um pedaço só de espaços fica vazio depois da limpeza, e aí o filter consegue tirar.
    -> Certa: primeiro limpa, depois filtra.
[ ] Porque o filter só funciona depois de um map.
    -> Errada: o filter funciona em qualquer array.
```

```quiz
? Com MAXIMO = 20 e 23 itens depois do "levar", quanto vale itensDeFora?
[ ] 20
    -> Errada: 20 é quantos itens entram.
[ ] 0
    -> Errada: só seria 0 com 20 itens ou menos.
[x] 3
    -> Certa: 23 − 20 = 3, e a tela avisa que esses ficaram de fora.
```

## Para praticar

- [ ] No primeiro exemplo, clique em **Editar** e mude a regex da L2 para também separar por " ou " (dica: `|\sou(?=\s)`). Teste com `separarItens("RG ou CNH, exames")`.
- [ ] Clique em **Restaurar** e apague o `.filter(...)` da L4 (cuide do `;` no fim da L3). Rode: quais linhas do Console mudaram, e por quê?
- [ ] No segundo exemplo, troque `MAXIMO` para 10. Antes de rodar, diga o que a L5 vai mostrar.
