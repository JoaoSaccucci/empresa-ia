# Procurar exatamente aqui: a flag y, o lastIndex e a palavra inteira

> [!TIP]
> **Em resumo:** a Agenda lê a frase da esquerda para a direita e, em cada posição, pergunta: "começa uma data ou uma hora exatamente aqui?".
> A flag `y` faz a regex procurar só na posição pedida, o `lastIndex` diz que posição é essa, e o `(?!...)` garante que o pedaço termina numa palavra inteira.

## O conceito

Na aula 5.1, o `exec` procurava na frase inteira e parava no primeiro pedaço que achasse. A Agenda precisa de outra coisa: andar pela frase posição por posição e, em cada uma, testar **só ali**. Assim ela sabe a ordem dos pedaços (vale a primeira data e a primeira hora) e onde cada um começa e termina.

Três ferramentas fazem isso:

1. **A flag `y`** (de *sticky*, "grudento"): a regex só tenta achar o molde na posição exata pedida. Se não começar ali, devolve `null`, sem continuar procurando mais adiante.
2. **[[lastIndex]]** ("último índice"): é a posição em que a regex vai tentar. A Agenda escreve `regex.lastIndex = posicao` logo antes de cada `exec`. Depois de um acerto, o `lastIndex` passa a ser a posição em que o pedaço terminou.
3. **[[lookahead]]** ("olhar à frente"): `(?!...)` quer dizer "aqui **não** pode vir isto". Ele só olha o que vem depois e não entra no pedaço achado. Com `(?![a-z0-9])`, "ter" não é achado dentro de "terminar", porque depois do "ter" vem uma letra.

Para a ponta esquerda da palavra, a Agenda usa uma função comum, sem regex: confere se a letra **anterior** não é letra nem número.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
const ter = /ter(?![a-z0-9])/y;
function acharEm(texto, posicao) {
  ter.lastIndex = posicao;
  const achado = ter.exec(texto);
  return achado ? "achou, termina em " + ter.lastIndex : "não achou";
}
const frase = "terminar na ter";
console.log(acharEm(frase, 0));
console.log(acharEm(frase, 1));
console.log(acharEm(frase, 12));
console.log(/ter/.exec(frase).index);
console.log(/ter(?![a-z0-9])/.exec(frase).index);
```
- **L1:** "ter" sem letra nem número depois, só na posição pedida (`y`).
- **L2–6:** põe a posição no `lastIndex` e tenta. Se achar, mostra onde o pedaço terminou.
- **L7:** "terminar" ocupa as posições 0 a 7, e o último "ter" começa na posição 12.
- **L8:** `não achou`. Na posição 0 há um "ter", mas o lookahead vê o "m" depois.
- **L9:** `não achou`. Na posição 1 começa "erminar"; com o `y`, a regex não procura mais adiante.
- **L10:** `achou, termina em 15`. Depois do "ter" vem o fim da frase.
- **L11:** `0`. Sem lookahead, o "ter" de dentro de "terminar" serve.
- **L12:** `12`. Sem o `y`, a regex anda sozinha até achar um "ter" inteiro.

Agora a armadilha que o `lastIndex` esconde:

```js rodar
const temHora = /\d{1,2}h/g;
console.log(temHora.test("dentista 10h"), temHora.lastIndex);
console.log(temHora.test("dentista 10h"), temHora.lastIndex);
```
- **L1:** uma regex com `g`, guardada numa constante.
- **L2:** `true 12`. Achou, e o `lastIndex` ficou no fim do pedaço.
- **L3:** `false 0`. **O mesmo texto** deu `false`, porque a busca começou na posição 12, onde não há mais nada. Depois de falhar, o `lastIndex` volta a 0.

> [!CAUTION]
> Reusar uma regex com `g` ou `y` sem acertar o `lastIndex`. O resultado muda a cada chamada, como no segundo exemplo, e o erro some e volta "do nada". Por isso a Agenda põe o `lastIndex` antes de **todo** `exec`. Em `test` e `exec` simples, use uma regex sem `g`.

## Onde aparece na Agenda

A `acharPecas` anda pela frase: se um pedaço começa na posição, ela guarda o pedaço e pula para o fim dele; senão, anda uma letra ([frase.js, linhas 349 a 365](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L349-L365)). Em cada posição, a `pecaEm` confere o começo da palavra com a `comecoDePalavra` ([linhas 46 a 56](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L46-L56)), testa a data e a hora e, se as duas servirem, fica com a mais comprida ([linhas 329 a 347](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L329-L347)). Já a ponta direita é o lookahead `FIM_DE_PALAVRA`: ele também barra um "/número" ou ":número" depois, para "15/11/27" não virar "15/11" ([linhas 64 a 66](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L64-L66)). A `dataEm` mostra o par `lastIndex` + `exec` ([linhas 121 a 124](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L121-L124)).

> [!TIP]
> **Para ir além (opcional):** algumas regras olham para a frente. "às 10" só é hora se depois vier o fim da frase, uma pontuação, uma palavra como "no" ou "com" ou outro pedaço reconhecido ([linhas 244 a 258](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L244-L258)), e "ter" só é terça se vier uma hora logo depois (regra D2, [linhas 134 a 138](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L134-L138)). Assim, a mesma posição pode ser testada várias vezes. A `pecaEm` guarda a resposta de cada posição num [[Map]] (`contexto.memoria`) e, na segunda vez, devolve a resposta guardada sem testar de novo.

> [!IMPORTANT]
> Pergunta comum: "Por que este código dá true e depois false com o mesmo texto?" (é o segundo exemplo). Resposta: a regex tem a flag `g`, e o `test` guarda no `lastIndex` onde parou. A segunda busca começa no fim do texto e falha. Resolvo tirando o `g`, criando a regex de novo ou zerando o `lastIndex` antes.

## Teste rápido

```quiz
? Com /ter(?![a-z0-9])/y, lastIndex = 1 e o texto "terminar na ter", o que o exec devolve?
[ ] O "ter" da posição 12.
    -> Errada: isso seria sem o y. Com o y, a regex tenta só na posição 1.
[x] null.
    -> Certa: na posição 1 começa "erminar", e a flag y não deixa procurar mais adiante.
[ ] O "ter" da posição 0.
    -> Errada: a busca começa no lastIndex, que é 1. E na posição 0 o lookahead barraria o "m".
```

```quiz
? No "ter" final da frase, o lookahead (?![a-z0-9]) entra no pedaço achado?
[ ] Sim: o pedaço inclui a letra seguinte.
    -> Errada: o lookahead só olha. Ele não "come" nenhuma letra.
[x] Não: o pedaço é só "ter", e o lastIndex fica logo depois dele.
    -> Certa: por isso a Agenda sabe exatamente onde o pedaço termina e o que sobra para o título.
```

```quiz
? Por que "ter aula de inglês" não vira terça na Agenda, se a regex aceita o "ter" seguido de espaço?
[ ] Porque o lookahead barra o espaço.
    -> Errada: o lookahead barra letra ou número; espaço é aceito.
[x] Porque, pela regra D2, "ter" e "dom" sem palavra de ligação antes só valem com uma hora logo depois.
    -> Certa: a dataEm aceita o "ter" pela regex, mas depois devolve null se não houver "na" antes ou hora depois.
[ ] Porque "ter" não está na regex de datas.
    -> Errada: ele está lá, junto com os outros abreviados.
```

## Para praticar

- [ ] No primeiro exemplo, clique em **Editar** e apague o `(?![a-z0-9])` da linha 1. Rode: qual linha mudou? Por que isso estragaria "terminar o trabalho"?
- [ ] Clique em **Restaurar** e troque a frase da linha 7 por `"academia na ter 10h"`. Antes de rodar, conte as posições: em que posição o `acharEm` precisa tentar para achar o "ter"? Acrescente uma linha com essa chamada e confira.
