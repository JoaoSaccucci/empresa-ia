# Colocar uma lista em ordem

> [!TIP]
> **Em resumo:** `sort` coloca os itens de uma lista em ordem, usando uma função que compara dois itens por vez.
> Para comparar textos, use `localeCompare`. E use `slice()` antes, para ordenar uma cópia e não estragar a lista original.

## O conceito

Na linha do tempo do site, os eventos precisam aparecer do mais antigo para o mais novo. Mas no arquivo JSON eles podem estar em qualquer ordem. Quem resolve isso é o [[sort]] ("ordenar").

O `sort` não sabe sozinho o que é "vir antes" para os seus dados. Então você entrega a ele uma função que compara **dois itens**, chamados de `a` e `b`, e devolve um número:

- **negativo**: `a` vem antes de `b`;
- **positivo**: `b` vem antes de `a`;
- **zero**: tanto faz, os dois empatam.

O `sort` chama essa função várias vezes, com pares diferentes, até a lista inteira ficar em ordem. Uma função entregue para outra função chamar depois tem nome: [[callback]]. É a mesma ideia do `map` da aula 1.5.

Para comparar textos, existe o [[localeCompare]] ("comparar conforme o idioma"). Ele já devolve exatamente o número que o `sort` quer: negativo se o primeiro texto vem antes no alfabeto, positivo se vem depois, zero se são iguais.

Falta um detalhe: o `sort` **muda a própria lista**. Para não bagunçar a original, fazemos uma cópia antes com o [[slice]] ("fatiar"). Sem nada dentro dos parênteses, `slice()` copia a lista inteira.

## Exemplo

Clique em **Rodar** e veja o resultado no Console.

```js rodar
const eventos = [
  { data: "2026-11-03", texto: "Etapa 3 entregue" },
  { data: "2026-11-01", texto: "Ideia do site" },
  { data: "2026-11-02", texto: "Etapa 1 entregue" }
];

const ordenados = eventos.slice().sort(function (a, b) {
  return a.data.localeCompare(b.data);
});

console.log(ordenados[0].texto);
console.log(ordenados[2].texto);
console.log(eventos[0].texto);
```
- **L1–5:** uma lista de três eventos fora de ordem. A data mais antiga, `2026-11-01`, está no meio.
- **L7:** leia da esquerda para a direita. `eventos.slice()` cria uma cópia da lista, e `.sort(...)` ordena essa cópia. O resultado vai para a constante `ordenados`.
- **L7–9:** a [[function]] com `a` e `b` é a regra de comparação. O `sort` decide quais pares mandar para ela; você só diz quem vem antes.
- **L8:** compara a data de `a` com a data de `b` e devolve o número com o [[return]]. Se a data de `a` vem antes no "alfabeto", o número é negativo e `a` fica na frente.
- **L11:** o primeiro da lista ordenada: `Ideia do site`.
- **L12:** o último (índice 2): `Etapa 3 entregue`.
- **L13:** a lista **original** continua como era: o primeiro dela ainda é `Etapa 3 entregue`. Foi para isso que serviu o `slice()`.

### O que o localeCompare devolve

```js rodar
console.log("a".localeCompare("b"));
console.log("b".localeCompare("a"));
console.log("a".localeCompare("a"));
console.log("2026-11-01".localeCompare("2026-11-02"));
```
- **L1:** `a` vem antes de `b`: um número negativo (no Chrome, `-1`).
- **L2:** `b` vem depois de `a`: um número positivo (`1`).
- **L3:** textos iguais: `0`.
- **L4:** as datas são comparadas como texto, caractere por caractere. As duas só mudam no último, e `1` vem antes de `2`: negativo.

Por que comparar datas como texto funciona? Porque no formato `ano-mês-dia`, chamado de formato ISO, a parte que mais importa (o ano) vem primeiro, e o mês e o dia sempre têm dois dígitos (`03`, e não `3`). Assim, a ordem do "alfabeto" é a mesma ordem do calendário. Com datas como `03/11/2026` isso **não** funcionaria, porque o dia viria antes do ano.

> [!CAUTION]
> Esquecer o `slice()` e escrever só `eventos.sort(...)`. Funciona, mas a lista `eventos` também fica ordenada, e outra parte do código que dependia da ordem original pode mudar sem você perceber. Se não tem certeza, copie antes de ordenar.

## Onde aparece no site

No `js/timeline.js`, a função `htmlLinhaDoTempo` (linha 41) começa pelo "passo 1": nas linhas 49 a 51, ela faz `eventos.slice().sort(...)` com `localeCompare`, igual ao exemplo. A única diferença é o `String(a.data)`, que garante que a data é texto, para o código não quebrar se alguém escrever uma data sem aspas no JSON. Os comentários das linhas 44 a 48 explicam essa escolha.

> [!IMPORTANT]
> Pegadinha clássica de entrevista: `[10, 9, 1].sort()` dá `[1, 10, 9]`. Sem a função de comparação, o `sort` trata tudo como **texto**, e o texto "10" vem antes de "9" (porque "1" vem antes de "9"). Para números, use `sort(function (a, b) { return a - b; })`.

> [!TIP]
> **Para ir além (opcional):** para a ordem contrária (do mais novo para o mais antigo), basta inverter a comparação: `b.data.localeCompare(a.data)`. E o `localeCompare` conhece o idioma: ele coloca "água" perto de "agua", coisa que uma comparação simples de letras não faz.

## Teste rápido

```quiz
? Para que serve o slice() em eventos.slice().sort(...)?
[ ] Para cortar a lista e ficar só com metade dos itens.
    -> Errada: sem nada dentro dos parênteses, o slice copia a lista inteira.
[x] Para ordenar uma cópia e deixar a lista original como estava.
    -> Certa: o sort muda a lista em que é usado, então ordenamos a cópia feita pelo slice.
[ ] Para o sort conseguir comparar textos.
    -> Errada: quem compara os textos é o localeCompare. O slice só faz a cópia.
```

```quiz
? Na função do sort, o que um número negativo devolvido quer dizer?
[x] Que a vem antes de b.
    -> Certa: negativo coloca a na frente; positivo coloca b na frente; zero é empate.
[ ] Que deu erro na comparação.
    -> Errada: número negativo não é erro. É só a resposta "a vem primeiro".
[ ] Que o item a deve ser apagado da lista.
    -> Errada: o sort nunca apaga itens. Ele só muda a posição deles.
```

```quiz
? Por que as datas no formato 2026-11-02 podem ser ordenadas como texto?
[ ] Porque o localeCompare entende datas de qualquer formato.
    -> Errada: o localeCompare compara texto. Com 03/11/2026 a ordem sairia errada.
[ ] Porque o JavaScript transforma o texto em número antes.
    -> Errada: nenhuma conversão acontece. As datas são comparadas como texto mesmo.
[x] Porque o ano vem primeiro e o mês e o dia sempre têm dois dígitos.
    -> Certa: assim a ordem alfabética é igual à ordem do calendário.
```

## Para praticar

- [ ] No primeiro exemplo, clique em **Editar** e troque `a.data.localeCompare(b.data)` por `b.data.localeCompare(a.data)`. O que aparece agora na linha 11?
- [ ] Apague o `.slice()` da linha 7 e rode. O que mudou no resultado da linha 13?
- [ ] Ordene os eventos pelo `texto` em vez da `data`. Qual fica em primeiro?
