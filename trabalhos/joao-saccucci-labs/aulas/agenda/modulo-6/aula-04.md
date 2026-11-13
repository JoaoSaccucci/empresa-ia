# Ordenar com sort e uma função de comparação

> [!TIP]
> **Em resumo:** a Agenda junta os pedaços usados (data, hora, local, levar) fora de ordem e precisa deixá-los na ordem em que aparecem na frase. Quem faz isso é `sort(function (a, b) { return a.inicio - b.inicio; })`.
> Sem a função, o `sort` compara como texto, e `[10, 9, 1].sort()` dá `[1, 10, 9]`.

## O conceito

O **[[sort]]** ("ordenar") arruma os itens de um array. Dois detalhes pegam muita gente:

1. **Sem função, ele compara como texto.** Os números viram texto e são comparados letra por letra, como "9:00" e "10:00" na aula 6.1. Por isso 10 fica antes de 9: "1" vem antes de "9".
2. **Ele muda o próprio array** (e também o devolve). Não sai uma cópia nova, como no `map` ou no `filter`.

Para ordenar do jeito certo, passe uma **[[função de comparação]]**. O `sort` chama essa função com dois itens, `a` e `b`, e olha o sinal do resultado:

- **negativo:** `a` vem antes de `b`;
- **positivo:** `b` vem antes de `a`;
- **zero:** tanto faz.

`a - b` faz exatamente isso para números em ordem crescente, e `b - a` para decrescente. Para objetos, compare uma propriedade: `a.inicio - b.inicio`.

Por que a Agenda precisa disso? A `entenderFrase` monta a lista `usadas` com a data, a hora, a duração e o "sair". Depois acrescenta o local e o "levar", que são procurados por último. O local pode estar no meio da frase e a data no fim, mas a lista fica na ordem em que os pedaços foram achados. A função que tira esses pedaços do título anda pela frase da esquerda para a direita e precisa receber os pedaços **na ordem da frase**.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
console.log(JSON.stringify([10, 9, 1].sort()));
console.log(JSON.stringify([10, 9, 1].sort(function (a, b) { return a - b; })));
console.log(JSON.stringify([10, 9, 1].sort(function (a, b) { return b - a; })));
console.log(JSON.stringify(["b", "B", "a", "á"].sort()));
```
- **L1:** `[1,10,9]`. Sem função, comparou "10", "9" e "1" como texto.
- **L2:** `[1,9,10]`. Com `a - b`: 9 − 10 é negativo, então o 9 vem antes do 10.
- **L3:** `[10,9,1]`. Com `b - a`, a ordem fica de trás para frente.
- **L4:** `["B","a","b","á"]`. Texto também tem armadilha: maiúsculas vêm antes das minúsculas, e a letra com acento vai para o fim.

Agora, o que a Agenda faz com os pedaços:

```js rodar
const frase = "dentista na clínica amanhã levar RG";
const usadas = [
  { nome: "data", inicio: 20, fim: 26 },
  { nome: "local", inicio: 9, fim: 19 },
  { nome: "levar", inicio: 27, fim: 35 }
];
usadas.sort(function (a, b) { return a.inicio - b.inicio; });
let titulo = "";
let posicao = 0;
usadas.forEach(function (p) {
  titulo += frase.slice(posicao, p.inicio);
  posicao = p.fim;
});
console.log(usadas.map(function (p) { return p.nome; }).join(", "));
console.log(JSON.stringify((titulo + frase.slice(posicao)).trim()));
```
- **L1:** a frase. "na clínica" ocupa as posições 9 a 18, "amanhã" 20 a 25 e "levar RG" 27 a 34. O `fim` é a primeira posição **depois** do pedaço.
- **L2–6:** os pedaços na ordem em que foram achados: a data primeiro.
- **L7:** ordena pelo começo de cada pedaço. A lista muda ali mesmo.
- **L8–13:** anda pela frase: guarda o texto que vem antes de cada pedaço e pula para o fim dele.
- **L14:** `local, data, levar`, a ordem da frase.
- **L15:** `"dentista"`. Sobrou só o título.

> [!CAUTION]
> Devolver `true`/`false` na função de comparação, como `sort(function (a, b) { return a > b; })`. O `sort` espera um número negativo, positivo ou zero. `true` vira 1 e `false` vira 0, nunca negativo, e o resultado pode sair fora de ordem, dependendo do navegador e do tamanho da lista. Use `a - b` para números e [[localeCompare]] para textos.

## Onde aparece na Agenda

O `sort` fica logo antes de montar o título, com o comentário "só sai do título o que virou campo" ([frase.js, linhas 760 e 761](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L760-L761)). Os pedaços entram na lista fora de ordem: primeiro a data, a hora, a duração e o "sair" ([linha 734](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L734)), depois o local e o "levar" ([linhas 736 a 758](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L736-L758)). A `tirarPecas` anda da esquerda para a direita como o segundo exemplo, com `frase.slice(posicao, peca.inicio)` ([linhas 592 a 606](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L592-L606)).

> [!TIP]
> **Para ir além (opcional):** às vezes você não precisa ordenar tudo, só achar o **maior**. Na `pecaEm`, várias funções tentam ler um pedaço na mesma posição, e vale o mais comprido. Em vez de ordenar as candidatas, o código passa por elas uma vez e guarda "o melhor até agora" ([linhas 519 a 521](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L519-L521)). É mais simples, mais rápido e não muda a lista. Nos navegadores mais novos também existe o `toSorted`, que ordena uma **cópia** e deixa o original como estava.

> [!IMPORTANT]
> Pergunta comum: "O que [10, 9, 1].sort() devolve?" Resposta: `[1, 10, 9]`. Sem função de comparação, o `sort` converte os itens em texto. Para números, uso `sort((a, b) => a - b)`. Também vale lembrar que o `sort` muda o array original.

## Teste rápido

```quiz
? O que [10, 9, 1].sort() devolve?
[ ] [1, 9, 10]
    -> Errada: isso precisaria da função (a, b) => a - b.
[x] [1, 10, 9]
    -> Certa: sem função, os números são comparados como texto, e "10" vem antes de "9".
[ ] [10, 9, 1]
    -> Errada: o sort muda a ordem; ele não deixa a lista como estava.
```

```quiz
? Na função de comparação, o que o sort faz quando ela devolve um número positivo?
[ ] Coloca a antes de b.
    -> Errada: isso é com um número negativo.
[x] Coloca b antes de a.
    -> Certa: positivo quer dizer "a é maior", então b vem primeiro.
[ ] Tira os dois itens da lista.
    -> Errada: o sort nunca tira itens. Ele só muda a ordem.
```

```quiz
? No segundo exemplo, o que acontece se a L7 (o sort) for apagada?
[ ] Nada muda: a ordem não importa.
    -> Errada: o laço anda da esquerda para a direita e depende da ordem.
[x] O título sai errado, com "na clínica" e "amanhã" de volta nele.
    -> Certa: a data vem primeiro e o laço pula para a posição 26. O local, que começa em 9, fica para trás, e o slice de 26 até 9 devolve texto vazio.
[ ] Dá um erro e o código para.
    -> Errada: o slice com o começo depois do fim não dá erro. Ele devolve "".
```

## Para praticar

- [ ] No segundo exemplo, clique em **Editar** e apague a L7. Rode e compare a L15 com a resposta do terceiro quiz.
- [ ] Clique em **Restaurar** e troque a L7 por `b.inicio - a.inicio`. Antes de rodar, diga a ordem que a L14 vai mostrar.
- [ ] No primeiro exemplo, acrescente `console.log(JSON.stringify(["10:00", "9:30", "08:15"].sort()))`. Rode: a ordem está certa? Depois use a ideia da aula 6.1 (minutos do dia) dentro de uma função de comparação para corrigir.
