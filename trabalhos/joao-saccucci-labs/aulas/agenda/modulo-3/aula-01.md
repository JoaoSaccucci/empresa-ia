# Uma lista de rascunho que só vale ao Salvar

> [!TIP]
> **Em resumo:** o formulário mexe numa cópia dos itens do "O que levar", e não no compromisso.
> Salvar passa o rascunho para o compromisso; Cancelar só joga o rascunho fora.

## O conceito

Na Entrega 3a, o formulário ganhou o grupo **"O que levar"**: você digita em "Novo item", clica em "Adicionar" (ou aperta Enter) e o item entra na lista. Cada item tem um botão "Remover". A regra da US17 é: **os itens só são gravados ao Salvar**. Cancelar ou apertar Esc descarta tudo o que foi adicionado ou removido.

Para isso funcionar, a Agenda trabalha num **rascunho**, a variável `itensDoFormulario`:

1. **Abrir o formulário:** o rascunho recebe uma *cópia* dos itens do compromisso (ou uma lista vazia, num compromisso novo).
2. **Adicionar:** [[trim]] tira os espaços das pontas. Se sobrar texto, [[push]] põe o item no fim, com `feito: false`.
3. **Remover:** [[splice]] tira o item da posição escolhida.
4. **Salvar:** só aqui o rascunho vira os `itens` do compromisso.
5. **Cancelar:** não há nada a desfazer. O compromisso nunca foi tocado.

A palavra mais importante é **cópia**. No JavaScript, uma variável com uma lista ou um objeto guarda uma [[referência]]: um "endereço" para o dado, e não o dado em si. Se o código fizesse `rascunho = compromisso.itens`, as duas variáveis apontariam para **a mesma lista**. Remover um item do rascunho removeria do compromisso também, mesmo sem Salvar.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
const compromisso = { titulo: "Dentista", itens: [{ texto: "RG", feito: true }] };
const rascunho = compromisso.itens.map(function (item) {
  return { texto: item.texto, feito: item.feito };
});
function adicionar(texto) {
  const limpo = texto.trim();
  if (limpo === "") return;
  rascunho.push({ texto: limpo, feito: false });
}
adicionar("  Cartão do convênio  ");
adicionar("   ");
rascunho.splice(0, 1);
console.log("Rascunho:", JSON.stringify(rascunho));
console.log("Compromisso, sem Salvar:", JSON.stringify(compromisso.itens));
```
- **L1:** o compromisso salvo, com um item já marcado.
- **L2–4:** [[map]] cria uma lista nova e, para cada item, um objeto novo `{ texto, feito }`. Nada dela é compartilhado com o original.
- **L6:** `trim()` transforma `"  Cartão do convênio  "` em `"Cartão do convênio"`, e `"   "` em `""`.
- **L7:** se o texto ficou vazio, a função para ali ([[early return]]), sem mensagem de erro, como pede a US17.
- **L8:** o item novo entra no fim, ainda não marcado.
- **L10–11:** o primeiro entra; o segundo, só de espaços, é ignorado.
- **L12:** `splice(0, 1)` quer dizer "a partir da posição 0, tire 1 item". Sai o "RG".
- **L13–14:** o rascunho tem só o Cartão do convênio, e o compromisso continua com o RG marcado. É exatamente o que sobraria se a pessoa clicasse em Cancelar.

> [!CAUTION]
> Escrever `const rascunho = compromisso.itens;` achando que isso faz uma cópia. Isso copia só a referência: as duas variáveis mexem na mesma lista. Tudo parece funcionar até alguém clicar em Cancelar e descobrir que as mudanças ficaram.

## Onde aparece na Agenda

Ao abrir o formulário, a `abrirFormulario` copia os itens para `itensDoFormulario` com `map` ([app.js, linhas 1132 a 1137](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/app.js#L1132-L1137)). A `adicionarItem` e a `removerItem` usam `trim`, `push` e `splice` e anunciam a mudança para o leitor de tela ([app.js, linhas 1575 a 1595](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/app.js#L1575-L1595)). Antes de gravar, a `salvarFormulario` aproveita o texto que ficou esquecido em "Novo item" ([app.js, linhas 1281 a 1288](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/app.js#L1281-L1288)).

> [!TIP]
> **Para ir além (opcional):** num formulário, Enter num campo de uma linha envia o formulário. No campo "Novo item", a Agenda escuta o `keydown` ("tecla para baixo") e chama `evento.`[[preventDefault]]`()`, que cancela o envio. Depois, ela adiciona o item. Ela também ignora o Enter que só confirma uma palavra do teclado do celular (`isComposing`) ([app.js, linhas 2146 a 2155](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/app.js#L2146-L2155)).

> [!IMPORTANT]
> Pergunta comum: "Qual a diferença entre copiar uma variável e copiar um objeto?" Resposta: com objetos e listas, `b = a` copia só a referência, e os dois apontam para o mesmo dado. Para ter uma cópia de verdade, é preciso criar uma lista nova e objetos novos, por exemplo com `map` devolvendo objetos novos, como `{ texto: item.texto, feito: item.feito }`. É assim que um formulário consegue ter um botão Cancelar.

## Teste rápido

```quiz
? A pessoa abre o formulário, adiciona dois itens e clica em Cancelar. O que acontece com os itens do compromisso?
[ ] Os dois itens novos ficam salvos, porque já entraram na lista.
    -> Errada: eles entraram só no rascunho (itensDoFormulario), não no compromisso.
[x] Nada muda: o compromisso continua com os itens de antes.
    -> Certa: o rascunho é uma cópia e só vira os itens do compromisso ao Salvar.
[ ] A Agenda pergunta se a pessoa quer salvar os itens.
    -> Errada: a US17 diz que Cancelar e Esc descartam as mudanças, sem perguntar.
```

```quiz
? Se o exemplo usasse const rascunho = compromisso.itens; e depois rascunho.splice(0, 1), o que aconteceria com compromisso.itens?
[ ] Continuaria com o RG.
    -> Errada: rascunho e compromisso.itens seriam a mesma lista, com dois nomes.
[x] Perderia o RG também.
    -> Certa: = copia só a referência, então o splice mexe na única lista que existe.
[ ] Daria erro, porque não pode mexer numa lista criada com const.
    -> Errada: const impede trocar a variável por outra lista, mas deixa mudar o conteúdo dela.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e troque as linhas 2 a 4 por `const rascunho = compromisso.itens;`. Rode: o que apareceu em "Compromisso, sem Salvar"?
- [ ] Clique em **Restaurar** e acrescente `adicionar("RG");` logo depois da linha 11. Rode: o item repetido entrou? (A US17 permite itens repetidos.)
