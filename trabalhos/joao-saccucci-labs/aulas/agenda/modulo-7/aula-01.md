# Caso, esperado e obtido: um teste conferido campo a campo

> [!TIP]
> **Em resumo:** um teste automático é uma lista de casos. Cada caso tem uma entrada e o resultado esperado. Um programa roda a função, pega o resultado obtido e compara os dois, campo por campo.
> A página `testes.html` da Agenda faz isso com as 80 frases dos requisitos e mostra quantas passaram.

## O conceito

Até a Etapa 4, para saber se a frase "dentista amanhã às 10h" funcionava, alguém digitava a frase no site e olhava o formulário. Com 80 frases, isso leva quase uma hora, e é fácil deixar passar um detalhe. Um **[[teste automático]]** faz a mesma conferência sozinho, em menos de um segundo, quantas vezes você quiser.

Ele tem três partes:

1. **[[caso de teste]]:** a entrada (a frase) e o **esperado** (o que deveria sair). Na Agenda, cada caso é um objeto, por exemplo `{ frase: "dentista amanhã às 10h", titulo: "Dentista", hora: "10:00" }`.
2. **Obtido:** o que a função devolveu de verdade para aquela entrada.
3. **Comparação:** esperado e obtido batem? Se não batem, o teste diz **qual campo** falhou e mostra os dois valores.

Dois detalhes da comparação:

- **Só confere o que o caso preenche.** Se a tabela dos requisitos não diz nada sobre o local numa frase, o caso não tem o campo `local`, e o teste não confere esse campo.
- **Lista não se compara com `===`.** `["RG"] === ["RG"]` dá `false`, porque o `===` com listas e objetos pergunta "é a **mesma** lista?", e não "tem o mesmo conteúdo?" (é a [[referência]]). Por isso a Agenda transforma os dois lados em texto com [[JSON.stringify]] e compara os textos.

## Exemplo

A função tem um bug de propósito. Clique em **Rodar** e confira o Console.

```js rodar
function lerItens(texto) {
  const itens = texto.split(",").map(function (i) { return i.trim(); });
  return { quantidade: itens.length, itens: itens };
}
const casos = [
  { frase: "RG, exames", quantidade: 2, itens: ["RG", "exames"] },
  { frase: "RG", itens: ["RG"] },
  { frase: "RG,, exames", quantidade: 2 }];
casos.forEach(function (caso, i) {
  const obtido = lerItens(caso.frase);
  ["quantidade", "itens"].forEach(function (campo) {
    if (!(campo in caso)) return;
    const ok = JSON.stringify(caso[campo]) === JSON.stringify(obtido[campo]);
    console.log("caso " + (i + 1), campo, ok ? "ok" : "FALHOU, obtido " + obtido[campo]);
  }); });
```
- **L1–4:** a função testada. Ela separa por vírgula, mas esquece a regra "item vazio é ignorado".
- **L5–8:** três casos. Cada um tem a entrada (`frase`) e só os campos que quer conferir. O caso 2 não fala de `quantidade`, e o caso 3 não fala de `itens`.
- **L10:** roda a função e guarda o obtido.
- **L11–12:** passa pelos campos. O `in` pergunta "o caso tem este campo?". Se não tem, o `return` pula só esse campo.
- **L13:** compara os dois lados como texto, e assim uma lista com o mesmo conteúdo bate.
- **L14:** a saída é `caso 1 quantidade ok`, `caso 1 itens ok`, `caso 2 itens ok` e `caso 3 quantidade FALHOU, obtido 3`.
- **L15:** fecha os dois `forEach`.

O teste achou o bug: em "RG,, exames", o pedaço vazio entre as vírgulas foi contado como item.

Agora o porquê do `JSON.stringify`:

```js rodar
console.log(["RG"] === ["RG"]);
const lista = ["RG"];
console.log(lista === lista);
console.log(JSON.stringify(["RG", "exames"]));
console.log(JSON.stringify(["RG"]) === JSON.stringify(["RG"]));
console.log(JSON.stringify({ a: 1, b: 2 }) === JSON.stringify({ b: 2, a: 1 }));
```
- **L1:** `false`. São duas listas diferentes, mesmo com o mesmo conteúdo.
- **L2–3:** `true`. É a mesma lista comparada com ela mesma.
- **L4:** `["RG","exames"]`. A lista virou um texto.
- **L5:** `true`. Agora são dois textos iguais.
- **L6:** `false`. Cuidado: num objeto, a ordem das chaves muda o texto. A Agenda só compara assim textos e listas de textos, em que a ordem importa mesmo.

> [!CAUTION]
> Comparar listas ou objetos com `===` num teste. O teste falha mesmo quando o resultado está certo, e a pessoa acaba "consertando" o código, que não tinha problema. Compare o conteúdo: item por item, ou com `JSON.stringify` quando a ordem é sempre a mesma.

## Onde aparece na Agenda

O comentário explica o formato de cada caso ([testes-frase.js, linhas 32 a 49](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/testes-frase.js#L32-L49)). Logo abaixo vêm as 52 frases da 4a ([linhas 51 a 104](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/testes-frase.js#L51-L104)) e as 28 da 4b ([linhas 109 a 138](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/testes-frase.js#L109-L138)). A `bate` compara com `JSON.stringify` ([linhas 230 a 235](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/testes-frase.js#L230-L235)). A `rodarCaso` passa pelos campos e pula os que a tabela não preenche, com o mesmo `in` do exemplo ([linhas 237 a 256](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/testes-frase.js#L237-L256)).

> [!TIP]
> **Para ir além (opcional):** a `entenderFrase` devolve a data como "2026-11-13", e a tabela dos requisitos escreve "13/11/2026". Em vez de mudar a tabela, a `valoresObtidos` converte o obtido para o formato da tabela antes de comparar ([linhas 196 a 215](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/testes-frase.js#L196-L215)). Assim os esperados ficam iguaizinhos aos dos requisitos. Para a linha "Entendi" que a tabela mostra com "...", o teste só confere se o trecho está **dentro** da linha, com [[includes]] (linha 233).

> [!IMPORTANT]
> Pergunta comum: "Como você compara dois arrays em JavaScript?" Resposta: o `===` só diz se é o mesmo array na memória. Para comparar o conteúdo, confiro o tamanho e depois item por item, ou uso `JSON.stringify` nos dois lados quando são valores simples, na mesma ordem. Em testes, as bibliotecas fazem isso com um "deep equal" (igualdade profunda).

## Teste rápido

```quiz
? O que console.log(["RG"] === ["RG"]) mostra?
[ ] true, porque as duas listas têm "RG".
    -> Errada: com listas, o === pergunta se é a mesma lista, não se o conteúdo é igual.
[x] false, porque são duas listas diferentes na memória.
    -> Certa: por isso o teste compara JSON.stringify de um lado e do outro.
[ ] Dá erro, porque não se compara lista com ===.
    -> Errada: compara, só não faz o que parece.
```

```quiz
? No exemplo, por que o caso 2 não mostra nenhuma linha sobre "quantidade"?
[ ] Porque a quantidade dele está errada.
    -> Errada: se estivesse errada, apareceria FALHOU.
[x] Porque o caso não tem o campo quantidade, e o if da L12 pula esse campo.
    -> Certa: é a regra da Agenda: só confere as colunas que a tabela preenche.
[ ] Porque o forEach para no primeiro campo.
    -> Errada: o return dentro do forEach pula só aquele campo; o próximo é conferido.
```

```quiz
? Num teste automático, o que é o "obtido"?
[ ] O valor escrito no caso, que veio da tabela dos requisitos.
    -> Errada: esse é o esperado.
[x] O que a função devolveu de verdade quando o teste a rodou.
    -> Certa: o teste passa quando o obtido bate com o esperado.
[ ] A mensagem de erro do console.
    -> Errada: o obtido é o resultado da função, dê certo ou não.
```

## Para praticar

- [ ] No primeiro exemplo, clique em **Editar** e acrescente o caso `{ frase: " RG ", itens: ["RG"] }`. Antes de rodar, diga se ele vai passar.
- [ ] Ainda no primeiro exemplo, conserte a função: depois do `map` da L2, acrescente `.filter(function (i) { return i !== ""; })`. Rode: o caso 3 passou?
- [ ] No segundo exemplo, acrescente `console.log(JSON.stringify(["RG", "exames"]) === JSON.stringify(["exames", "RG"]))`. Antes de rodar, responda: o resultado faz sentido para um checklist?
