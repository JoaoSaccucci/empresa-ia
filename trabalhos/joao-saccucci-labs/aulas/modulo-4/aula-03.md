# A armadilha do {} como dicionário: use Map

> [!TIP]
> **Em resumo:** todo objeto `{}` já nasce com nomes herdados, como `constructor` e `toString`.
> Se a chave vem de fora (do endereço, de um arquivo), use um [[Map]]: ele só tem o que você colocou.

## O conceito

Um **dicionário** guarda um valor para cada chave: "o módulo `agenda-m1` é do projeto `agenda`". Em JavaScript, o jeito mais rápido de escrever isso é um objeto:

```js
const modulos = { "agenda-m1": "agenda", "agenda-m2": "agenda" };
modulos["agenda-m1"]; // "agenda"
modulos["nada"];      // undefined
```

Parece perfeito: se a chave não existe, vem [[undefined]]. Só que não é sempre assim. Todo objeto comum herda coisas de um objeto "pai", o [[protótipo]] (`Object.prototype`). É de lá que vêm `toString`, `hasOwnProperty`, `constructor` e outros nomes. Você nunca os escreveu, mas eles estão lá:

```js
modulos["constructor"]; // uma função herdada, e não undefined
```

Foi exatamente isso que aconteceu na Rodada 1 da Etapa 7. A aba Aulas guardava "módulo → projeto" num `{}`. O testador abriu `aulas.html#constructor`: o código procurou `"constructor"` no objeto, achou uma função e pensou que era um módulo. A página quebrou com um `TypeError` e mostrou "Ops! Não conseguimos carregar os dados.". O texto do `#` vem de quem digita o endereço, então qualquer nome herdado vira uma armadilha.

Há três saídas:

1. **Map:** guarda só o que você colocou com `set`. O `has` diz se a chave existe, e o `get` devolve o valor ou `undefined`. Foi a correção escolhida.
2. **[[Object.hasOwn]]:** `Object.hasOwn(objeto, chave)` confere só as chaves próprias do objeto, sem contar as herdadas.
3. **Object.create(null):** cria um objeto sem protótipo, que não herda nada.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
const modulos = { "agenda-m1": "agenda", "agenda-m2": "agenda" };
function acharNoObjeto(texto) {
  if (modulos[texto]) return "achei: " + typeof modulos[texto];
  return "não achei";
}
console.log(acharNoObjeto("agenda-m1"));
console.log(acharNoObjeto("nada"));
console.log(acharNoObjeto("constructor"));
console.log(Object.hasOwn(modulos, "constructor"));

const mapa = new Map();
mapa.set("agenda-m1", "agenda");
console.log(mapa.get("agenda-m1"));
console.log(mapa.has("constructor"), mapa.get("constructor"));
```
- **L1:** o dicionário feito com um objeto comum.
- **L2–5:** a busca "ingênua": se `modulos[texto]` tiver algum valor, considera que achou. O [[typeof]] mostra o tipo do que foi achado.
- **L6:** `achei: string`. Certo.
- **L7:** `não achei`. Certo.
- **L8:** `achei: function`. Errado! Ninguém colocou `constructor` no objeto: ele veio herdado do protótipo.
- **L9:** `Object.hasOwn` olha só as chaves próprias e mostra `false`. Com ele na linha 3, a busca ficaria segura.
- **L11–12:** o mesmo dicionário com `Map`: `new Map()` cria um mapa vazio, e o `set` coloca a chave e o valor.
- **L13:** o `get` devolve `agenda`.
- **L14:** o `has` diz `false` e o `get` devolve `undefined`. O `Map` não herda nomes: só tem o que entrou com `set`.

> [!CAUTION]
> Usar `if (objeto[chave])` ou `chave in objeto` para saber se existe uma chave **que veio de fora**. Os dois enxergam o que é herdado: `"toString" in {}` é `true`. Quando a chave vem do usuário, use `Map` (com `has`) ou `Object.hasOwn`.

## Onde aparece no site

No `js/aulas.js`, um comentário conta a história da correção, e o `modulosPorId` nasce como `new Map()` ([aulas.js, linhas 32 a 44](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L32-L44)). Ele é preenchido com `set` na `montarGrupos` ([linhas 186 a 196](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L186-L196)) e consultado com `has` e `get` na `lerEndereco` ([linha 307](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L307)). O glossário destas aulas também usa um `Map` para achar cada termo ([aula.js, linhas 237 a 242](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aula.js#L237-L242)). O botão Rodar também usa um, com a janela do exemplo como chave ([aula-codigo.js, linhas 461 e 462](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aula-codigo.js#L461-L462)).

> [!TIP]
> **Para ir além (opcional):** o dev achou a mesma armadilha em outro lugar, e o testador confirmou: a `classeDoStatus` do `js/comum.js` ([linhas 101 a 109](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/comum.js#L101-L109)). Um status `"constructor"` no `projetos.json` faria a classe do badge virar o texto de uma função. Lá o risco é baixo, porque quem escreve o `projetos.json` é a própria equipe, e o caso ficou anotado como pendência. Em sistemas com servidor, a versão perigosa desse problema tem nome: *prototype pollution* (poluição do protótipo), quando alguém consegue gravar em `__proto__` e muda todos os objetos de uma vez.

> [!IMPORTANT]
> Pergunta comum: "Quando usar `Map` em vez de objeto?" Resposta: quando as chaves vêm de fora (endereço, formulário, arquivo), porque o `Map` não herda nomes como `constructor`; quando as chaves não são texto (um elemento, uma janela, um número); e quando o dicionário muda muito, com `set`, `delete` e `size`. Para um registro com campos fixos, como um compromisso `{ titulo, data }`, o objeto comum é o certo.

## Teste rápido

```quiz
? Com const cores = { azul: "#00f" }, o que cores["toString"] devolve?
[ ] undefined, porque ninguém colocou toString no objeto.
    -> Errada: todo objeto comum herda toString do protótipo, mesmo sem você escrever.
[x] Uma função, herdada do protótipo.
    -> Certa: por isso if (cores[chave]) não serve para conferir uma chave que veio de fora.
[ ] Um erro, porque a chave não existe.
    -> Errada: ler uma chave de um objeto nunca dá erro, mesmo quando ela não existe.
```

```quiz
? O texto do # vem de quem digita o endereço. Qual destas conferências dá false para "constructor"?
[ ] "constructor" in {}
    -> Errada: o in também enxerga o que é herdado e dá true.
[x] new Map().has("constructor")
    -> Certa: o Map só tem o que foi colocado com set. Vazio, ele não tem nada.
[ ] ({})["constructor"] !== undefined
    -> Errada: o valor é uma função herdada, então é diferente de undefined e o resultado é true.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e troque `"constructor"` na linha 8 por `"toString"`, e depois por `"hasOwnProperty"`. Rode as duas vezes: o objeto "acha" esses nomes também?
- [ ] Clique em **Restaurar**. Na linha 3, troque `if (modulos[texto])` por `if (Object.hasOwn(modulos, texto))` e rode. O que a linha 8 mostra agora?
- [ ] Clique em **Restaurar** e acrescente no fim `mapa.set("constructor", "teste");` e `console.log(mapa.get("constructor"));`. Por que agora aparece `teste`?
