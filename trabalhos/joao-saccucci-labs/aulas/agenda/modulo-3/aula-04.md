# Conflito ou aperto: procurar com prioridade

> [!TIP]
> **Em resumo:** para cada compromisso, a Agenda passa pelos que vêm antes no mesmo dia.
> Um conflito encerra a busca na hora. Um aperto fica guardado, caso não apareça um conflito depois.

## O conceito

A US20 chama de **B** o compromisso da lista "Próximos" que pode mostrar o aviso, e de **A** cada compromisso do mesmo dia, com hora e "aberto", que vem antes dele. As regras são:

- **Conflito:** A e B começam no mesmo minuto, ou B começa **antes** de A acabar.
- **Aperto:** não há conflito, mas a hora de sair para B (hora de B menos o "Tempo para sair", ou menos 15 minutos) cai **antes** do fim de A.
- **Um aviso só:** conflito vale mais que aperto; entre dois do mesmo tipo, vale o primeiro A da lista.

A função `avisoDeHorario` resolve tudo com um laço [[for...of]] ("para cada ... de"), passando pelos A em ordem:

1. Começam no mesmo minuto? `return` com o conflito.
2. A não tem hora de fim? [[continue]]: pula para o próximo A.
3. B começa antes do fim de A? `return` com o conflito.
4. A hora de sair de B cai antes do fim de A? Se ainda não há aperto guardado, guarda este. **Sem `return`**, porque um A mais à frente pode dar conflito, e conflito vale mais.

Quando a lista acaba, a função devolve o aperto guardado ou `null`.

A prioridade sai da forma do laço: o conflito sai com `return` assim que aparece, e o teste `aperto === null` faz só o **primeiro** aperto ficar guardado. Repare também no `<` (e não `<=`): B começar exatamente quando A acaba não é conflito, e sair exatamente no fim de A não é aperto.

## Exemplo

Para ficar mais fácil de ler, aqui cada A já traz o `fim` em texto. Na Agenda, o fim é calculado com hora + `duracaoMin` (aula anterior). Clique em **Rodar** e confira o Console.

```js rodar
const m = function (hora) { const [h, min] = hora.split(":").map(Number); return h * 60 + min; };
function aviso(b, antes) {
  const sairB = m(b.hora) - (b.sair !== null ? b.sair : 15);
  let aperto = null;
  for (const a of antes) {
    if (a.hora === b.hora) return "Conflito: mesmo horário de " + a.titulo + ".";
    if (a.fim === null) continue;
    if (m(b.hora) < m(a.fim)) return "Conflito: " + a.titulo + " vai até " + a.fim + ".";
    if (aperto === null && sairB < m(a.fim)) aperto = "Aperto: " + a.titulo + " vai até " + a.fim + ".";
  }
  return aperto;
}
const dentista = { titulo: "Dentista", hora: "10:30", fim: "11:30" };
["11:00", "11:40", "11:45"].forEach(function (h) { console.log(h, "->", aviso({ hora: h, sair: null }, [dentista])); });
```
- **L1:** a `minutosDoDia` da aula anterior, numa linha só.
- **L3:** a hora de sair de B, em minutos. Sem "Tempo para sair" (`null`), conta 15.
- **L4:** nenhum aperto guardado ainda. É `let` porque pode mudar dentro do laço.
- **L5:** `for (const a of antes)`: "para cada `a` da lista `antes`".
- **L6:** mesmo minuto: conflito. O `return` encerra o laço e a função.
- **L7:** A sem hora de fim não atrapalha: `continue` vai direto para o próximo A.
- **L8:** B começa antes de A acabar: conflito.
- **L9:** aperto: guarda só se for o primeiro, e o laço continua.
- **L11:** a lista acabou: devolve o aperto ou `null`.
- **L13–14:** o Dentista vai das 10:30 às 11:30. Às **11:00**, conflito. Às **11:40**, sair às 11:25 é antes de 11:30: aperto. Às **11:45**, sair às 11:30 é igual ao fim, então não há aviso (`null`).

Na Agenda, o aperto também diz a hora de sair: "Aperto: sair às 11:25, mas Dentista vai até 11:30.".

> [!CAUTION]
> Usar `forEach` nesta busca. Um `return` dentro da função do `forEach` encerra só aquela volta, e não a função de fora. O laço continuaria, e o primeiro conflito não pararia nada. Com `for...of`, `return`, `continue` e `break` funcionam como esperado.

## Onde aparece na Agenda

A `avisoDeHorario`, no `js/datas.js`, é este laço com o fim calculado pela duração ([datas.js, linhas 262 a 302](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/datas.js#L262-L302)). No `js/app.js`, a `calcularAvisosDeHorario` separa os A (com data, hora e "aberto"), ordena uma cópia e, para cada B de "Próximos", passa os que vêm antes no mesmo dia. O resultado vai num [[Map]] de id para aviso, calculado a cada desenho da lista ([app.js, linhas 461 a 479](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/app.js#L461-L479)). A `criarAvisoDeHorario` escreve a tarja com o título do outro compromisso como texto, nunca como HTML ([app.js, linhas 484 a 500](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/app.js#L484-L500)).

> [!TIP]
> **Para ir além (opcional):** num compromisso às 00:05 com 15 minutos para sair, `sairB` dá −10. Para mostrar a hora, a Agenda faz `(sairB + 1440) % 1440`, que dá 1430, ou seja, "23:50". A comparação continua usando o −10, e a conta fica certa. E a tarja não tem [[aria-live]], para o leitor de tela não repetir o aviso a cada minuto.

> [!IMPORTANT]
> Pergunta comum: "Qual a diferença entre `for...of` e `forEach`?" Resposta: os dois passam por cada item, mas só no `for...of` dá para parar no meio com `return` ou `break`, ou pular um item com `continue`. Quando a busca pode terminar cedo, como "achei um conflito, pode parar", eu uso `for...of`.

## Teste rápido

```quiz
? O Dentista vai das 10:30 às 11:30. O Café começa às 11:30, sem "Tempo para sair". Qual aviso aparece no Café?
[ ] Conflito: Dentista vai até 11:30.
    -> Errada: começar exatamente quando o outro acaba não é conflito (o teste usa <).
[x] Aperto, porque sair às 11:15 é antes de 11:30.
    -> Certa: sem conflito, mas a hora de sair (11:30 − 15) cai antes do fim do Dentista.
[ ] Nenhum aviso.
    -> Errada: sem "Tempo para sair", a Agenda conta 15 minutos, e 11:15 é antes de 11:30.
```

```quiz
? B tem aperto com o primeiro A da lista e conflito com o segundo A. Qual aviso aparece?
[ ] O aperto, porque veio primeiro na lista.
    -> Errada: o aperto fica só guardado, e a busca continua procurando um conflito.
[x] O conflito com o segundo A.
    -> Certa: conflito vale mais que aperto, e o return dele vence o aperto guardado.
[ ] Os dois avisos, um embaixo do outro.
    -> Errada: a US20 pede um aviso só por card.
```

```quiz
? Por que a avisoDeHorario usa for...of, e não forEach?
[ ] Porque o forEach não funciona com listas de objetos.
    -> Errada: o forEach funciona com qualquer lista.
[x] Porque o return precisa encerrar a função assim que aparece um conflito, e dentro do forEach ele encerraria só aquela volta.
    -> Certa: for...of deixa usar return, break e continue de verdade.
[ ] Porque o for...of é sempre mais rápido.
    -> Errada: a escolha aqui é pelo comportamento do return, não pela velocidade.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e, na linha 14, troque `[dentista]` por `[{ titulo: "Café", hora: "10:00", fim: "10:50" }, dentista]`. Rode: às 11:00, o aperto com o Café aparece? Por quê?
- [ ] Clique em **Restaurar**, troque o `<` da linha 8 por `<=` e acrescente `"11:30"` na lista de horários da linha 14. Rode: o que aparece às 11:30? E com o `<` de volta?
- [ ] Troque `sair: null` por `sair: 5` na linha 14. Rode: por que o aperto das 11:40 sumiu?
