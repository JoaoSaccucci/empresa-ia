# Um erro não pode parar os outros testes: try/catch no executor

> [!TIP]
> **Em resumo:** se a função testada der erro numa frase, a página de testes não pode parar ali. As outras 79 frases precisam continuar.
> Um `try/catch` em volta de **cada caso** transforma o erro numa falha com a mensagem, e o laço segue para o próximo caso.

## O conceito

Quando o JavaScript encontra um erro que ninguém trata, ele **para** tudo o que estava fazendo. Numa página de testes, isso seria um desastre: a frase 8 dá erro, e as frases de 9 a 80 nem chegam a rodar. Você veria só "Rodando os testes..." e nenhuma resposta.

Para isso existe o par **[[try]]** ("tentar") e **[[catch]]** ("pegar"):

```text
try {
  código que pode dar erro
} catch (erro) {
  o que fazer se der erro
}
```

Se nada der errado dentro do `try`, o `catch` é pulado. Se der erro, o JavaScript pula direto para o `catch` e entrega o erro na variável `erro`. A mensagem fica em `erro.message`. Depois do `catch`, o código continua normalmente.

O ponto importante é **onde** fica o `try`. Para um erro não parar os outros casos, o `try` precisa ficar **dentro** do laço, em volta de um caso só. Um `try` em volta do laço inteiro pega o erro, mas o laço já parou.

Um erro também pode ser criado de propósito, com **[[throw]]** ("lançar"): `throw new Error("mensagem")`.

## Exemplo

A regra diz que dividir por 0 pessoas devolve `null`, mas a função lança um erro. Clique em **Rodar** e confira o Console.

```js rodar
function dividir(total, pessoas) {
  if (pessoas === 0) throw new Error("ninguém para dividir");
  return total / pessoas;
}
const casos = [[100, 4, 25], [90, 0, null], [60, 3, 21]];
let passaram = 0;
casos.forEach(function (c, i) {
  try {
    const obtido = dividir(c[0], c[1]);
    if (obtido === c[2]) passaram++;
    else console.log("caso " + (i + 1) + ": esperado " + c[2] + ", obtido " + obtido);
  } catch (erro) { console.log("caso " + (i + 1) + ": Erro: " + erro.message); }
});
console.log(passaram + " de " + casos.length + " passaram.");
```
- **L1–4:** a função testada. Com 0 pessoas, ela lança um erro com `throw`.
- **L5:** cada caso tem total, pessoas e o esperado. O caso 3 tem um esperado trocado de propósito (21 em vez de 20), para mostrar uma falha sem erro.
- **L8–11:** tenta rodar o caso. Se o obtido bate, conta mais um que passou. Se não bate, mostra esperado e obtido.
- **L12:** se a função deu erro, o caso vira uma falha com a mensagem.
- **L14:** o resumo. A saída completa é `caso 2: Erro: ninguém para dividir`, `caso 3: esperado 21, obtido 20` e `1 de 3 passaram.`. O caso 3 rodou mesmo depois do erro do caso 2.

Agora o `try` no lugar errado:

```js rodar
const frases = ["a", "b", "c"];
function testar(frase) {
  if (frase === "b") throw new Error("erro de propósito");
  return frase.toUpperCase();
}
try {
  frases.forEach(function (f) { console.log(testar(f)); });
} catch (erro) {
  console.log("parou em:", erro.message);
}
```
- **L2–5:** a função dá erro na frase "b".
- **L6–10:** o `try` está em volta do laço **inteiro**. A saída é `A` e `parou em: erro de propósito`. O "c" nunca foi testado: o erro pulou para o `catch`, e o laço não voltou.

> [!CAUTION]
> Deixar o `catch` vazio: `catch (erro) { }`. O erro some sem aviso, e o caso pode até ser contado como "passou". Num teste, todo erro precisa virar uma falha visível, com a mensagem, como a Agenda faz.

## Onde aparece na Agenda

A `rodarCaso` tenta montar o obtido dentro de um `try`. Se der erro, devolve uma diferença chamada "Erro", com a mensagem ([testes-frase.js, linhas 237 a 246](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/testes-frase.js#L237-L246)). Como ela é chamada uma vez por frase, cada caso tem o seu próprio `try`. A `rodarTodos` passa pelas 80 frases, conta as que passaram e escreve "X de 80 frases passaram." ([linhas 314 a 337](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/testes-frase.js#L314-L337)). Cada falha mostra a frase e, para cada campo, o esperado e o obtido lado a lado ([linhas 287 a 306](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/testes-frase.js#L287-L306)). O testador conferiu isso numa cópia com um erro forçado na frase 4a #8: ela apareceu como "Erro: erro de propósito", e as outras 79 continuaram ([etapa-5.md, linha 53](https://github.com/JoaoSaccucci/empresa-ia/blob/73e7f1767315a8f0a36d5467338d79cd4de64b3d/trabalhos/joao-saccucci-labs/docs/projetos/agenda/testes/etapa-5.md?plain=1#L53)).

> [!TIP]
> **Para ir além (opcional):** a lista de falhas é montada só com [[textContent]], nunca com `innerHTML` (comentário das [linhas 259 a 262](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/testes-frase.js#L259-L262)). Uma das frases é `<b>oi</b> amanhã`, e a página de testes também precisa estar protegida contra [[XSS]]. Outro detalhe: a `valorParaTexto` mostra `null`, `""` e a lista vazia como "(vazio)" ([linhas 264 a 271](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/testes-frase.js#L264-L271)). Assim, "Esperado: (vazio) / Obtido: Clínica" fica claro na tela.

> [!IMPORTANT]
> Pergunta comum: "O que acontece se um erro não for tratado?" Resposta: o JavaScript interrompe o que estava rodando e mostra o erro no console. Para seguir em frente, envolvo o trecho num `try/catch` e, no `catch`, mostro ou registro o erro. Nunca deixo o `catch` vazio. Existe também o `finally`, que roda nos dois casos, dando erro ou não.

## Teste rápido

```quiz
? No segundo exemplo, por que o "C" não aparece no Console?
[ ] Porque o toUpperCase não funciona com "c".
    -> Errada: o "c" nem chegou a ser testado.
[x] Porque o try está em volta do laço inteiro. O erro do "b" pulou para o catch, e o laço não continuou.
    -> Certa: para um erro não parar os outros, o try precisa ficar dentro do laço, um por caso.
[ ] Porque o catch apagou a última linha.
    -> Errada: o catch só mostra "parou em:". Ele não apaga nada.
```

```quiz
? Dentro de catch (erro), onde está o texto "ninguém para dividir"?
[ ] Em erro.texto
    -> Errada: essa propriedade não existe.
[x] Em erro.message
    -> Certa: o new Error("...") guarda o texto na propriedade message.
[ ] Na variável casos
    -> Errada: casos é a lista de testes. O erro chega ao catch pela variável erro.
```

```quiz
? Por que um catch vazio, catch (erro) { }, é perigoso num teste?
[ ] Porque o JavaScript não aceita catch vazio.
    -> Errada: aceita. O problema é o que ele esconde.
[x] Porque o erro some sem aviso, e um caso quebrado pode parecer que passou.
    -> Certa: na Agenda, o erro vira uma falha "Erro: ..." visível na lista.
[ ] Porque ele faz o laço parar.
    -> Errada: ele não para o laço. Ele só esconde o erro.
```

## Para praticar

- [ ] No primeiro exemplo, clique em **Editar** e conserte a L2 para seguir a regra: `if (pessoas === 0) return null;`. Rode: quantos passaram agora? E o caso 3?
- [ ] Clique em **Restaurar** e acrescente o caso `[50, 2, 25]` no **meio** da lista da L5, depois do `[90, 0, null]`. Confirme que ele roda mesmo vindo depois do erro.
- [ ] No segundo exemplo, mude o código para o `try/catch` ficar **dentro** do `forEach`, em volta do `console.log(testar(f))`. Antes de rodar, escreva as linhas que você espera ver.
