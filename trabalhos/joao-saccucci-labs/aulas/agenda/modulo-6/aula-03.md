# null, 0 e "": quando o if (x) engana

> [!TIP]
> **Em resumo:** dentro de um `if`, os valores `0`, `""`, `null`, `undefined`, `NaN` e `false` contam como "falso". Por isso `if (duracao)` esconde uma duração 0.
> A Agenda escreve `!== null` quando o 0 é uma resposta que precisa aparecer, e usa `filter(Boolean)` para tirar os `null` de uma lista.

## O conceito

Quando o `if` recebe um valor que não é `true` nem `false`, o JavaScript converte esse valor. Os valores que viram falso são chamados de **[[falsy]]**:

- `false`, `0`, `""` (texto vazio), `null`, `undefined` e `NaN`.

Todo o resto vira verdadeiro: `"0"` (texto com zero), `" "` (texto com espaço), `[]` (lista vazia) e qualquer objeto.

Na Agenda, a `entenderFrase` devolve `duracaoMin: null` quando a frase não tem duração e `duracaoMin: 90` para "por 1h30". E se a pessoa escrever "dentista às 10h por 0 min"? A resposta é `0`. (A duração só vale quando a frase tem hora; sem hora, ela fica `null`.) Esse 0 é um valor errado, mas foi o que a pessoa escreveu. A decisão da 4b foi **mostrar o valor como foi entendido, mesmo com erro**, para o formulário avisar. Se a linha "Entendi" usasse `if (resultado.duracaoMin)`, o 0 contaria como falso e a duração sumiria sem aviso nenhum.

O jeito seguro é perguntar exatamente o que você quer saber: "tem valor?" vira `!== null`.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
function textoDaDuracao(duracaoMin) {
  if (duracaoMin) return "duração " + duracaoMin + " min";
  return "sem duração";
}
function textoDaDuracaoCerto(duracaoMin) {
  if (duracaoMin !== null) return "duração " + duracaoMin + " min";
  return "sem duração";
}
console.log(textoDaDuracao(90), "|", textoDaDuracaoCerto(90));
console.log(textoDaDuracao(0), "|", textoDaDuracaoCerto(0));
console.log(textoDaDuracao(null), "|", textoDaDuracaoCerto(null));
```
- **L1–4:** a versão com `if (duracaoMin)`.
- **L5–8:** a versão com `!== null` ("é diferente de null?").
- **L9:** `duração 90 min | duração 90 min`. Com 90 as duas acertam.
- **L10:** `sem duração | duração 0 min`. A primeira **escondeu** o 0.
- **L11:** `sem duração | sem duração`. Sem duração, as duas acertam.

Agora uma tabela de valores e o atalho `filter(Boolean)`:

```js rodar
const casos = [["0", 0], ["texto vazio", ""], ["null", null], ["undefined", undefined],
  ["NaN", NaN], ["texto \"0\"", "0"], ["espaço", " "], ["lista vazia []", []]];
casos.forEach(function (c) {
  console.log(c[0], "->", Boolean(c[1]));
});
const usadas = [{ tipo: "data" }, null, null, { tipo: "local" }].filter(Boolean);
console.log(usadas.length);
console.log(JSON.stringify([3, 0, 5].filter(Boolean)));
```
- **L1–2:** cada caso tem um nome e um valor.
- **L3–5:** [[Boolean]] converte o valor do mesmo jeito que o `if`. Saída: `0 -> false`, `texto vazio -> false`, `null -> false`, `undefined -> false`, `NaN -> false`, `texto "0" -> true`, `espaço -> true` e `lista vazia [] -> true`.
- **L6:** o `filter` chama `Boolean` em cada item e fica só com os verdadeiros. Os `null` saem.
- **L7:** `2`.
- **L8:** `[3,5]`. Cuidado: o 0 também saiu. O `filter(Boolean)` só é seguro quando a lista não pode ter 0 nem `""` válidos.

> [!CAUTION]
> Usar `if (x)` ou `x || valorPadrao` quando 0 ou `""` são respostas válidas. `const minutos = escolhido || 30` troca o 0 escolhido pela pessoa por 30. Pergunte o que você quer saber de verdade: `!== null`, `!== undefined` ou `!== ""`.

## Onde aparece na Agenda

Na linha "Entendi", a duração e o "sair ... antes" usam `!== null`, com o comentário da decisão 4: o valor aparece como foi entendido, mesmo com erro ([frase.js, linhas 813 a 822](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L813-L822)). O comentário da `entenderFrase` avisa que esses números podem estar fora do limite, até 0 ([linhas 682 a 687](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L682-L687)). A lista dos pedaços usados começa com `filter(Boolean)`. Ali é seguro, porque cada posição é um objeto ou `null` ([linha 734](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L734)). Logo abaixo, o local usa `limpo !== ""`: ali o texto vazio é justamente o caso "não tem local", e a comparação diz isso com todas as letras ([linhas 736 a 745](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L736-L745)).

> [!TIP]
> **Para ir além (opcional):** o código também usa `hora && ...` ([linhas 713 a 715](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L713-L715)). Ali está certo: a hora é sempre um texto "HH:MM" ou `null`, nunca `""` nem 0. A regra não é "nunca use `if (x)`". É "saiba quais valores o `x` pode ter". Existe ainda o operador `??`, que só troca `null` e `undefined`: `0 ?? 30` dá 0, e `0 || 30` dá 30.

> [!IMPORTANT]
> Pergunta comum: "Quais são os valores falsy em JavaScript?" Resposta: `false`, `0` (e `-0`), `""`, `null`, `undefined` e `NaN` (e o `0n`, do tipo BigInt). Uma lista vazia `[]` e um objeto vazio `{}` são verdadeiros. Por isso, para saber se uma lista está vazia, uso `lista.length === 0`.

## Teste rápido

```quiz
? Qual destes valores faz o if (x) entrar no bloco?
[ ] 0
    -> Errada: 0 é falsy.
[ ] ""
    -> Errada: texto vazio é falsy.
[x] "0"
    -> Certa: é um texto com um caractere, e todo texto não vazio é verdadeiro.
[ ] null
    -> Errada: null é falsy.
```

```quiz
? Por que a linha "Entendi" usa resultado.duracaoMin !== null em vez de if (resultado.duracaoMin)?
[ ] Porque !== null é mais rápido.
    -> Errada: a diferença não é de velocidade, é de resultado.
[x] Porque "às 10h por 0 min" dá duracaoMin 0, e com if (x) o valor sumiria sem aviso.
    -> Certa: pela decisão 4, o valor aparece como foi entendido, mesmo com erro.
[ ] Porque duracaoMin pode ser um texto.
    -> Errada: ele é sempre um número ou null.
```

```quiz
? O que [3, 0, 5].filter(Boolean) devolve?
[ ] [3, 0, 5]
    -> Errada: Boolean(0) é false, então o 0 sai.
[x] [3, 5]
    -> Certa: por isso o filter(Boolean) só serve quando 0 não é um valor válido na lista.
[ ] [true, false, true]
    -> Errada: isso seria um map(Boolean). O filter devolve os próprios itens, não o teste.
```

## Para praticar

- [ ] No segundo exemplo, clique em **Editar** e acrescente à lista da L2 os casos `["objeto vazio {}", {}]` e `["false", false]`. Antes de rodar, escreva o que cada um vai mostrar.
- [ ] Ainda no segundo exemplo, troque a L8 para ficar com o 0 e tirar só `null` (dica: `filter(function (n) { return n !== null; })` e acrescente um `null` à lista).
- [ ] No primeiro exemplo, acrescente uma linha com `textoDaDuracaoCerto(undefined)`. O que aparece? Como você mudaria a L6 para tratar `undefined` como "sem duração"?
