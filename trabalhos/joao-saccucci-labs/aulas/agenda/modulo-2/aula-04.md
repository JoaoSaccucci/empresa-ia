# Atualizar a tela a cada minuto sem redesenhar tudo

> [!TIP]
> **Em resumo:** a cada virada de minuto, a Agenda confere se algum compromisso mudou de seção.
> Se mudou, redesenha a lista. Se não, troca só o texto do "Sair às".

## O conceito

A tela da Agenda muda com o tempo, mesmo sem ninguém clicar: um compromisso das 10:00 passa às 10:01, e o "Sair em 12 min" vira "Sair em 11 min". Por isso a página precisa se conferir a cada minuto.

**1. Quando conferir.** A Agenda usa [[setTimeout]] ("definir tempo de espera"), que roda uma função **uma vez**, depois de um certo número de milissegundos. O truque é esperar até a **virada do minuto**, e não 60 segundos fixos:

```js
function agendarProximoMinuto() {
  const falta = 60000 - (Date.now() % 60000);   // ms até o próximo :00
  setTimeout(function () {
    atualizarSeMudou();
    agendarProximoMinuto();                      // marca a próxima
  }, falta + 200);
}
```

`Date.now()` dá os milissegundos desde 1970, e o `%` dá o resto da divisão: quantos milissegundos já se passaram neste minuto. Se a página abriu às 10:00:40, a primeira conferência acontece às 10:01:00, e não às 10:01:40. Os `+ 200` dão uma folguinha para não conferir um instante antes da virada.

**2. O que conferir.** Redesenhar a lista inteira a cada minuto tem um custo: o foco do teclado sai do lugar e o leitor de tela pode reler tudo. Então a Agenda monta um **resumo** em texto, com o dia de hoje e a seção de cada compromisso (por exemplo, `"2026-11-14|a1:proximos,a2:proximos"`), e compara com o resumo de quando a tela foi desenhada:

- o resumo mudou (alguém mudou de seção ou o dia virou): redesenha tudo;
- o resumo é igual: troca só o [[textContent]] das linhas "Sair às".

**3. Aba escondida.** O navegador do celular "adormece" os relógios das abas que não estão na tela. Por isso a Agenda também escuta o evento [[visibilitychange]]: quando a aba volta a aparecer, ela confere na hora.

## Exemplo

O `setTimeout` de verdade faria você esperar até um minuto, então aqui as horas são fixas. Clique em **Rodar** e confira o Console.

```js rodar
const agora = new Date(2026, 10, 14, 8, 41, 37);
const falta = 60000 - (agora.getTime() % 60000);
console.log("Próxima conferência em", falta / 1000, "segundos");

function resumo(itens) {
  return itens.map(function (c) { return c.id + ":" + c.secao; }).join(",");
}
const naTela = resumo([{ id: "a1", secao: "proximos" }, { id: "a2", secao: "proximos" }]);
function conferir(itens) {
  if (resumo(itens) !== naTela) console.log("Algo mudou de seção: redesenha tudo.");
  else console.log("Nada mudou de seção: troca só o texto do Sair às.");
}
conferir([{ id: "a1", secao: "proximos" }, { id: "a2", secao: "proximos" }]);
conferir([{ id: "a1", secao: "anteriores" }, { id: "a2", secao: "proximos" }]);
```
- **L1:** um "agora" fixo: 08:41 e 37 segundos.
- **L2:** `getTime()` dá os milissegundos desta data (o mesmo número que `Date.now()` daria nesse instante). Já passaram 37000 ms do minuto, então faltam 23000.
- **L3:** mostra `23` segundos, até 08:42:00.
- **L5–7:** o resumo junta id e seção de cada item num texto só, com [[map]] e [[join]].
- **L8:** o resumo de quando a tela foi desenhada.
- **L9–12:** comparar dois textos é rápido e simples. Se forem diferentes, algo mudou de lugar.
- **L13:** mesma situação de antes: só o "Sair às" é atualizado.
- **L14:** o `a1` passou para "anteriores": hora de redesenhar.

> [!CAUTION]
> Usar `setInterval(atualizar, 60000)` e pronto. Ele conta 60 segundos a partir de quando a página abriu, então um compromisso das 10:00 poderia sair da lista quase um minuto atrasado. E, numa aba escondida, o navegador pode atrasar ainda mais. Por isso a Agenda usa a virada do minuto e o `visibilitychange`.

## Onde aparece na Agenda

A `agendarProximoMinuto`, no `js/app.js`, marca a conferência para a virada do minuto ([app.js, linhas 632 a 638](https://github.com/JoaoSaccucci/agenda/blob/f91ecc6c5719438a4949736c977fca73886ca18b/js/app.js#L632-L638)). A `atualizarSeMudou` compara o resumo e, se nada mudou de seção, troca só as linhas "Sair às" ([app.js, linhas 615 a 627](https://github.com/JoaoSaccucci/agenda/blob/f91ecc6c5719438a4949736c977fca73886ca18b/js/app.js#L615-L627)). O resumo é montado pela `calcularResumo` ([app.js, linhas 539 a 544](https://github.com/JoaoSaccucci/agenda/blob/f91ecc6c5719438a4949736c977fca73886ca18b/js/app.js#L539-L544)), e o `visibilitychange` está nas [linhas 1624 a 1626](https://github.com/JoaoSaccucci/agenda/blob/f91ecc6c5719438a4949736c977fca73886ca18b/js/app.js#L1624-L1626).

> [!TIP]
> **Para ir além (opcional):** a linha "Sair às" de propósito **não** tem `aria-live`. Se tivesse, o leitor de tela anunciaria "Sair em 11 min", "Sair em 10 min"... a cada minuto, atrapalhando quem usa.

> [!IMPORTANT]
> Pergunta comum: "Qual a diferença entre setTimeout e setInterval?" Resposta: o `setTimeout` roda uma vez, e o `setInterval` repete sempre no mesmo intervalo. Um `setTimeout` que se agenda de novo permite recalcular a espera a cada vez, por exemplo para cair sempre na virada do minuto. E atualizar só o que mudou, em vez de redesenhar tudo, preserva o foco e a acessibilidade.

## Teste rápido

```quiz
? Por que a Agenda não redesenha a lista inteira a cada minuto?
[ ] Porque o navegador proíbe redesenhar a página mais de uma vez por minuto.
    -> Errada: não existe esse limite. A escolha é da Agenda.
[x] Porque redesenhar tiraria o foco do lugar e incomodaria o leitor de tela; quando nada mudou de seção, trocar o texto do "Sair às" basta.
    -> Certa: ela só redesenha quando o resumo muda.
[ ] Porque o setTimeout não consegue chamar funções que mexem na tela.
    -> Errada: o setTimeout pode chamar qualquer função.
```

```quiz
? A página abriu às 10:00:40. Quando acontece a primeira conferência?
[ ] Às 10:01:40, 60 segundos depois de abrir.
    -> Errada: isso seria com uma espera fixa de 60000 ms.
[x] Logo depois de 10:01:00, na virada do minuto.
    -> Certa: 60000 - (Date.now() % 60000) calcula quanto falta para o próximo minuto redondo.
[ ] Só quando a pessoa clicar em algum botão.
    -> Errada: a conferência é automática.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e troque os `37` segundos da linha 1 por `5`. Rode: quantos segundos faltam agora?
- [ ] Na linha 13, troque a ordem dos dois itens (primeiro o `a2`, depois o `a1`). Rode: o código acha que algo mudou? Na Agenda, a `calcularResumo` usa `sort()` antes do `join`. Por que isso ajuda?
