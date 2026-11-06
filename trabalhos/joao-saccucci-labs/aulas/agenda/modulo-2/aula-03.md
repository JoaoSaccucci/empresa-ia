# Fazer contas com datas: o "Sair às"

> [!TIP]
> **Em resumo:** para saber a hora de sair, a Agenda cria uma `Date` e tira os minutos do tempo para sair.
> Se a conta passar da meia-noite, a própria `Date` volta para o dia anterior.

## O conceito

Na Entrega 2b, um compromisso com hora pode ter um **tempo para sair**: quanto tempo antes você precisa sair de casa. A conta é:

> hora de sair = data e hora do compromisso − tempo para sair

A Agenda guarda a data como texto `"2026-11-14"` e a hora como `"09:30"`. Texto não faz conta, então o primeiro passo é transformar esses textos numa [[Date]], o objeto de data do JavaScript:

1. [[split]] quebra o texto nos pedaços (`"2026-11-14"` vira `["2026", "11", "14"]`) e [[map]] com `Number` transforma cada pedaço em número.
2. `new Date(ano, mes - 1, dia, horas, minutos)` cria a data no fuso do aparelho. O `- 1` existe porque, na `Date`, **os meses começam em 0**: janeiro é 0, novembro é 10.
3. [[setMinutes]] com `getMinutes() - 40` "volta o relógio" 40 minutos. Se o resultado ficar negativo, a `Date` ajusta sozinha a hora e até o dia.

Para saber quanto falta, basta subtrair: `dataA - dataB` dá a diferença em **milissegundos**. Dividindo por 60000 (60 segundos × 1000), temos os minutos. Com esse número, a Agenda escolhe o texto:

- mais de 15 minutos: "Sair às 08:50";
- de 15 a 1 minuto: "Sair em X min";
- 0 minuto: "Sair agora";
- negativo: "Hora de sair: 08:50 (já passou)".

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
function sairAs(data, hora, antecedencia) {
  const [ano, mes, dia] = data.split("-").map(Number);
  const [h, m] = hora.split(":").map(Number);
  const sair = new Date(ano, mes - 1, dia, h, m);
  sair.setMinutes(sair.getMinutes() - antecedencia);
  return sair;
}
const doisDig = function (n) { return String(n).padStart(2, "0"); };
const s1 = sairAs("2026-11-14", "09:30", 40);
console.log("Sair às", doisDig(s1.getHours()) + ":" + doisDig(s1.getMinutes()));
const s2 = sairAs("2026-11-14", "00:20", 30);
console.log("Sair às", doisDig(s2.getHours()) + ":" + doisDig(s2.getMinutes()), "do dia", s2.getDate());
const agora = new Date(2026, 10, 14, 8, 40);
const faltam = Math.round((s1 - agora) / 60000);
console.log("Faltam", faltam, "min");
```
- **L2–3:** quebra a data e a hora em números. `const [ano, mes, dia] = ...` dá um nome a cada item da lista, na ordem.
- **L4:** cria a data do compromisso. Repare no `mes - 1`.
- **L5:** tira os minutos do tempo para sair. A `Date` muda ali mesmo.
- **L8:** uma função pequena que põe zero à esquerda: `8` vira `"08"`.
- **L9–10:** compromisso às 09:30, 40 minutos para sair: `Sair às 08:50`.
- **L11–12:** compromisso às 00:20, 30 minutos para sair. Voltar 30 minutos passa da meia-noite, e a `Date` vai sozinha para 23:50 do dia **13**.
- **L13:** "agora" fixo para o exemplo: 14/11 às 08:40. O `10` é novembro.
- **L14–15:** a diferença em milissegundos, dividida por 60000, dá `10` minutos. Na Agenda, isso apareceria como "Sair em 10 min".

> [!CAUTION]
> Esquecer que os meses da `Date` começam em 0. `new Date(2026, 11, 14)` é **14 de dezembro**, não de novembro. Por isso a Agenda sempre faz `mes - 1` ao criar e `getMonth() + 1` ao mostrar.

## Onde aparece na Agenda

A função `calcularSairAs`, no `js/datas.js`, faz essa conta. Antes de calcular, ela tira os segundos do "agora" e devolve o estado ("normal", "logo" ou "passou") e se a hora de sair caiu no dia anterior ([datas.js, linhas 198 a 222](https://github.com/JoaoSaccucci/agenda/blob/f91ecc6c5719438a4949736c977fca73886ca18b/js/datas.js#L198-L222)). A `preencherSairAs`, no `js/app.js`, transforma esse resultado no texto do card ([app.js, linhas 333 a 349](https://github.com/JoaoSaccucci/agenda/blob/f91ecc6c5719438a4949736c977fca73886ca18b/js/app.js#L333-L349)).

> [!TIP]
> **Para ir além (opcional):** a Agenda faz `minutoAtual.setSeconds(0, 0)` antes de subtrair. Sem isso, às 08:49:40 a conta daria 0,33 minuto e o arredondamento mostraria "Sair agora" 20 segundos antes da hora. Contando só minutos inteiros, a regra é a mesma do "quando um compromisso passou".

> [!IMPORTANT]
> Pergunta comum: "Que cuidados você toma com datas em JavaScript?" Resposta: os meses começam em 0; contas com `setMinutes`/`setDate` ajustam o dia sozinhas; subtrair duas `Date` dá milissegundos; e `toISOString()` usa UTC (o horário universal, não o do Brasil), então para mostrar o dia local eu monto o texto com `getFullYear`, `getMonth` e `getDate`.

## Teste rápido

```quiz
? Qual dia é new Date(2026, 10, 14)?
[ ] 14 de outubro de 2026
    -> Errada: seria se os meses começassem em 1. Na Date, eles começam em 0.
[x] 14 de novembro de 2026
    -> Certa: janeiro é 0, então 10 é novembro.
[ ] 10 de novembro de 2026
    -> Errada: a ordem é ano, mês, dia. O 14 é o dia.
```

```quiz
? Compromisso dia 14 às 00:20, com 30 minutos para sair. O que a Agenda mostra?
[ ] "Sair às -00:10"
    -> Errada: a Date nunca fica com minutos negativos. Ela ajusta a hora e o dia sozinha.
[x] "Sair às 23:50 do dia anterior"
    -> Certa: voltar 30 minutos a partir de 00:20 dá 23:50 do dia 13.
[ ] Nada, porque a conta dá erro.
    -> Errada: setMinutes com número negativo funciona e volta o relógio.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e troque o `40` da linha 9 por `90`. Rode: qual é a nova hora de sair? E quantos minutos faltam agora?
- [ ] Mude o "agora" da linha 13 para 8h55 (`new Date(2026, 10, 14, 8, 55)`). O número de minutos ficou negativo? Qual texto a Agenda mostraria?
- [ ] Na linha 4, apague o `- 1` e rode. O dia 13 da linha 12 continua certo? Mostre também `s1.getMonth()` para ver o mês que ficou.
