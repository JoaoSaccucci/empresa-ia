# Expressões regulares: um molde para achar pedaços do texto

> [!TIP]
> **Em resumo:** uma expressão regular é um molde que diz "que forma de texto eu procuro", como "1 ou 2 algarismos, uma barra, mais 1 ou 2 algarismos".
> A Agenda usa esses moldes para achar a data e a hora dentro da frase. O molde confere só a forma: se a data existe é outra conta.

## O conceito

Na Entrega 4a, você escreve "dentista amanhã às 10h" e a Agenda abre o formulário já com a data e a hora. Para isso, ela precisa achar no meio da frase pedaços com uma certa **forma**: "amanhã", "sexta", "15/11", "10h". Fazer isso com vários `if`, letra por letra, daria dezenas de linhas. A ferramenta feita para esse trabalho é a [[expressão regular]] (em inglês, *regular expression*, ou só *regex*).

Uma regex é escrita entre barras, como `/10h/`. Letras comuns valem elas mesmas. Alguns sinais têm significado especial:

| Sinal | Quer dizer | Exemplo | Acha |
|---|---|---|---|
| `\d` | um algarismo (*digit*) | `\d\d` | "15" |
| `{1,2}` | de 1 a 2 vezes o que vem antes | `\d{1,2}` | "5" ou "15" |
| `?` | o que vem antes é opcional | `sex\.?` | "sex" ou "sex." |
| `( )` | grupo: guarda o pedaço achado | `(\d{1,2})h` | "10h", guardando "10" |
| `(?: )` | grupo que só junta, sem guardar | `(?:-feira)?` | "-feira", se tiver |
| `^` e `$` | começo e fim do texto | `^sexta$` | só o texto "sexta" inteiro |
| `\` | "o sinal seguinte vale ele mesmo" | `\/` e `\.` | uma barra, um ponto |

Mais um sinal importante: a barra em pé, `|`, quer dizer "ou". Com `hoje|amanha`, a regex acha "hoje" ou "amanha". Ela tenta as opções da esquerda para a direita.

Depois da barra final podem vir **flags** ("bandeirinhas", opções): `i` não diferencia maiúsculas de minúsculas, `g` serve para achar todas as vezes e `y` é assunto da aula 5.3.

> [!NOTE]
> **Palavra nova:** `test` ("testar") responde só sim ou não: `/\d+h/.test("dentista 10h")` dá `true`. Já o [[exec]] ("executar") devolve **o que** achou: [[null]] quando não acha nada; quando acha, uma lista em que `[0]` é o pedaço inteiro, `[1]`, `[2]`... são os grupos, e `.index` é a posição.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
const frases = ["consulta 15/11", "festa 31/02 às 20h", "comprar 2 pães"];
const dataCurta = /(\d{1,2})\/(\d{1,2})/;
frases.forEach(function (frase) {
  const achado = dataCurta.exec(frase);
  if (achado === null) {
    console.log(frase, "-> nenhuma data");
    return;
  }
  console.log(frase, "-> achou", achado[0], "| dia", achado[1], "| mês", achado[2], "| posição", achado.index);
});
```
- **L1:** três frases para testar.
- **L2:** o molde: 1 ou 2 algarismos (grupo 1), uma barra (`\/`, com a contrabarra para a barra não fechar a regex) e 1 ou 2 algarismos (grupo 2).
- **L3–4:** para cada frase ([[forEach]]), o `exec` procura o molde na frase inteira, da esquerda para a direita.
- **L5–8:** não achou: mostra o aviso e o `return` passa para a próxima frase ([[early return]]).
- **L9:** o Console mostra:
  - `consulta 15/11 -> achou 15/11 | dia 15 | mês 11 | posição 9` ("consulta" mais o espaço ocupa as posições 0 a 8).
  - `festa 31/02 às 20h -> achou 31/02 | dia 31 | mês 02 | posição 6`. A regex aceitou 31 de fevereiro! Ela só confere a forma.
  - `comprar 2 pães -> nenhuma data`. O "2" sozinho não tem barra depois, então não serve.

Um segundo exemplo, com `^`, `$`, `|` e a flag `i`:

```js rodar
const diaUtil = /^(segunda|terca|quarta|quinta|sexta)(?:-feira)?$/i;
["sexta", "Sexta-feira", "SEXTA-FEIRA", "sextas", "sexta-"].forEach(function (palavra) {
  console.log(palavra, diaUtil.test(palavra));
});
```
- **L1:** um dos cinco nomes, com "-feira" opcional, ocupando o texto **inteiro** (`^` ... `$`). O `i` ignora maiúsculas.
- **L2–3:** o Console mostra `true` para as três primeiras e `false` para "sextas" (sobra um "s" antes do fim) e para "sexta-" (o "-feira" precisa vir inteiro ou não vir).

> [!CAUTION]
> Esquecer que os grupos são **texto**. No exemplo, `achado[1] + 1` daria `"151"`, e não 16, porque o `+` junta textos. Para fazer conta, converta antes com `Number(achado[1])`. A Agenda faz isso em todas as datas e horas.

## Onde aparece na Agenda

No `js/frase.js`, uma regex só acha todas as formas de data, e o comentário de cada linha diz o número do grupo ([frase.js, linhas 81 a 94](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L81-L94)). A `dataEm` olha qual grupo veio preenchido para saber se foi "amanhã", um dia da semana, "dia 15" ou "15/11", e só depois confere com a `diasNoMes` se a data existe: é assim que "31/02" vira o aviso "A data 31/02 não existe." ([frase.js, linhas 129 a 162](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L129-L162)). A Agenda não usa a flag `i`: ela deixa a frase toda em minúsculas antes (aula 5.2).

> [!TIP]
> **Para ir além (opcional):** a parte das palavras de ligação ("na", "para o", "até"...) vem de uma lista, juntada com [[join]]`("|")` e transformada em regex com `new RegExp(texto)` ([frase.js, linhas 73 a 84](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L73-L84)). Dentro de um texto entre aspas, a contrabarra precisa ser escrita duas vezes: `"\\s+"` vira a regex `\s+` (um ou mais espaços). E, como a regex tenta as opções da esquerda para a direita, as mais compridas ("na proxima") vêm antes das curtas ("na").

> [!IMPORTANT]
> Pergunta comum: "Dá para validar uma data só com regex?" Resposta: a regex confere a **forma** (`\d{1,2}/\d{1,2}`), mas aceita 31/02 e 15/13. Eu uso a regex para achar e separar os números e depois confiro no calendário se o dia existe naquele mês. Também deixo comentários dizendo o que cada grupo é e testo com uma tabela de exemplos, porque uma regex comprida fica difícil de ler.

## Teste rápido

```quiz
? Com a regex /(\d{1,2})\/(\d{1,2})/ e a frase "festa 31/02", o que é achado[2]?
[ ] O número 2.
    -> Errada: os grupos são sempre texto. Para virar número, precisa de Number().
[x] O texto "02".
    -> Certa: o grupo 2 guarda exatamente os algarismos depois da barra, como foram escritos.
[ ] O texto "31/02".
    -> Errada: esse é o achado[0], o pedaço inteiro.
```

```quiz
? Em "comprar 2 pães amanhã", por que o 2 não vira data?
[ ] Porque a regex de data ignora números menores que 10.
    -> Errada: "5/1" seria aceito. O que falta é a forma.
[x] Porque um número sozinho não tem a forma de nenhuma data: falta "dia" antes ou uma barra depois.
    -> Certa: o molde exige "dia 2" ou "2/..."; o "2" sozinho fica no título.
[ ] Porque a regex procura só no fim da frase.
    -> Errada: sem ^ ou $, ela pode achar o pedaço em qualquer lugar.
```

## Para praticar

- [ ] No primeiro exemplo, clique em **Editar** e acrescente `"reunião 5/1/2027"` à lista da linha 1. Rode: o que aparece em `achado[0]`? Para onde foi o ano? O que falta no molde para pegar o ano?
- [ ] Clique em **Restaurar** e troque os dois `\d{1,2}` da linha 2 por `\d`. Rode: o que a regex achou em "consulta 15/11"? Por que isso seria um erro?
