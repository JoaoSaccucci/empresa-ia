# Gravar na hora e voltar atrás se der errado

> [!TIP]
> **Em resumo:** marcar uma caixa do "O que levar" no card grava na hora.
> A Agenda monta uma versão nova da lista sem tocar na antiga. Se a gravação falhar, ela volta para a antiga.

## O conceito

No card, o botão **"O que levar (2 de 5)"** abre uma lista de caixas de marcar. Aqui não há botão Salvar: **marcou, gravou** (US18). Só que gravar no [[localStorage]] pode falhar, por exemplo quando ele está cheio. Nesse caso, a tela não pode mentir: a caixa precisa voltar a ficar como estava, e aparece "Não foi possível salvar o compromisso.".

A Agenda resolve isso em três passos:

1. **Guardar a lista de antes:** `const listaAntes = compromissos;`.
2. **Montar a lista nova sem mexer na antiga.** [[map]] cria uma lista nova de compromissos. Para o compromisso marcado, [[Object.assign]] cria um objeto novo: copia todos os campos do antigo e troca só `itens` e `atualizadoEm`.
3. **Tentar gravar.** Se der certo, segue. Se falhar, `compromissos = listaAntes`, e a caixa volta ao que era com `caixa.checked = !caixa.checked`.

O passo 2 é o segredo. Como nada da lista antiga foi alterado, "voltar atrás" é só fazer a variável apontar de novo para ela. Se o código tivesse mudado o item direto (`item.feito = true`), a "lista de antes" também teria mudado, porque as duas apontariam para o mesmo objeto. É a [[referência]] da aula anterior. Esse jeito de criar uma versão nova em vez de alterar a antiga se chama [[imutabilidade]].

O contador do botão sai da mesma lista: [[filter]] separa os itens com `feito: true`, e o [[length]] dessa lista diz quantos são. Se forem todos, o texto vira "O que levar: tudo pronto (5 de 5)".

## Exemplo

A função `salvar` finge que o localStorage está cheio. Clique em **Rodar** e confira o Console.

```js rodar
let compromissos = [{ id: "a1", titulo: "Dentista", itens: [{ texto: "RG", feito: false }] }];
function salvar(lista) { return false; }
function marcar(id, indice, marcado) {
  const antes = compromissos;
  compromissos = compromissos.map(function (c) {
    if (c.id !== id) return c;
    const itens = c.itens.map(function (it, i) { return i === indice ? { texto: it.texto, feito: marcado } : it; });
    return Object.assign({}, c, { itens: itens });
  });
  if (salvar(compromissos)) return "Salvo.";
  compromissos = antes;
  return "Não foi possível salvar o compromisso.";
}
console.log(marcar("a1", 0, true));
console.log("RG marcado?", compromissos[0].itens[0].feito);
```
- **L1:** `let`, porque a variável vai apontar para outra lista depois.
- **L2:** a gravação falsa: devolver `false` é o que a Agenda recebe quando o localStorage recusa.
- **L4:** guarda a referência da lista atual, antes de qualquer mudança.
- **L5–9:** `map` monta a lista nova. Os outros compromissos voltam iguais (L6).
- **L7:** só o item da posição `indice` vira um objeto novo. Os outros itens são reaproveitados, já que não mudaram.
- **L8:** `Object.assign({}, c, { itens: itens })` quer dizer: "comece com um objeto vazio, copie tudo de `c` e, por cima, coloque os `itens` novos".
- **L10:** se gravou, a função para ali.
- **L11–12:** se falhou, volta para a lista de antes e devolve a mensagem de erro.
- **L14–15:** o Console mostra o erro e `RG marcado? false`: tudo voltou ao que era.

> [!CAUTION]
> Mudar o dado direto e depois tentar desfazer com uma "cópia" feita por `=`. Como a cópia é só outra referência para o mesmo objeto, ela já mudou junto, e não sobra nada para restaurar. Primeiro monte a versão nova, depois troque.

## Onde aparece na Agenda

A `marcarItemDoChecklist`, no `js/app.js`, faz exatamente esses três passos. No fim, ela reescreve só o botão, sem redesenhar a lista, para o foco continuar na caixa ([app.js, linhas 1613 a 1638](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/app.js#L1613-L1638)). O texto e o nome acessível do botão saem da `textosDoChecklist` e da `preencherBotaoDoChecklist` ([app.js, linhas 505 a 533](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/app.js#L505-L533)).

> [!TIP]
> **Para ir além (opcional):** a Agenda não coloca um `addEventListener` em cada caixa. Ela escuta o evento `change` ("mudança") uma vez só, na área principal da página, e confere se quem mudou foi uma caixa do checklist ([app.js, linhas 2077 a 2083](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/app.js#L2077-L2083)). Isso se chama [[delegação de eventos]]. Como os cards são redesenhados de vez em quando, um ouvinte no pai continua funcionando até para as caixas criadas depois.

> [!IMPORTANT]
> Pergunta comum: "O que é imutabilidade e para que serve?" Resposta: em vez de alterar um objeto, eu crio uma versão nova com as mudanças. A versão antiga continua intacta, então dá para desfazer só trocando de volta, por exemplo quando uma gravação falha. Também fica fácil comparar o antes e o depois. Bibliotecas como o React usam essa mesma ideia.

## Teste rápido

```quiz
? Por que compromissos = antes; consegue desfazer a marcação no exemplo?
[ ] Porque o JavaScript guarda sozinho um histórico de cada variável.
    -> Errada: não existe histórico automático. Quem guardou o "antes" foi o próprio código.
[x] Porque a lista nova foi montada com map e Object.assign, sem alterar a lista antiga, que continua intacta.
    -> Certa: voltar atrás é só apontar a variável de novo para a lista antiga.
[ ] Porque o localStorage devolve a lista antiga quando a gravação falha.
    -> Errada: o localStorage só diz que não conseguiu gravar. Ele não devolve nada.
```

```quiz
? O que Object.assign({}, c, { itens: novos }) devolve?
[ ] O próprio objeto c, com os itens trocados.
    -> Errada: o primeiro argumento é {}, um objeto novo. O c não é alterado.
[x] Um objeto novo, com todos os campos de c e os itens trocados por novos.
    -> Certa: ele copia da esquerda para a direita, e o último argumento vence.
[ ] Uma lista com três objetos.
    -> Errada: ele junta os campos num objeto só.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e troque `return false` por `return true` na linha 2. Rode: o que muda nas duas linhas do Console?
- [ ] Clique em **Restaurar** e troque as linhas 5 a 9 por `compromissos[0].itens[indice].feito = marcado;`. Rode: a gravação falhou, mas o RG ficou marcado? Explique com a palavra "referência".
