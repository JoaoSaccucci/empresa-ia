# Dois campos, um valor só: "Termina às" e "Duração"

> [!TIP]
> **Em resumo:** a Agenda guarda só a duração (`duracaoMin`). A hora de fim é sempre calculada.
> Para a conta ficar simples, cada hora vira um número: os minutos desde 00:00.

## O conceito

Pela US19, o formulário tem dois campos para a mesma informação: **"Termina às"** (10:30) e **"Duração"** ("30 min", "1 h", "2 h" ou "Outro"). A pessoa preenche o que for mais fácil, e o outro se ajusta sozinho.

**Um valor só nos dados.** Se a Agenda guardasse os dois, um dia eles poderiam discordar: fim às 10:30, mas duração de 2 h, e qual vale? Por isso ela salva só `duracaoMin`, e o fim é calculado: **fim = hora + duracaoMin**. Isso se chama [[fonte única da verdade]].

**Horas viram números.** No "Sair às" usamos [[Date]] porque a conta podia passar para o dia anterior. Aqui tudo fica no mesmo dia, então há um caminho mais simples: `"09:30"` vira 9 × 60 + 30 = **570**. Somar e comparar ficam contas com números comuns. Para voltar ao texto, `Math.floor(570 / 60)` dá 9 horas e `570 % 60` (o resto da divisão) dá 30 minutos. O último minuto do dia, 23:59, é **1439**. A hora de fim nunca pode passar dele.

**Um campo preenche o outro**, assim que o valor muda:

| A pessoa mudou | A Agenda faz |
|---|---|
| "Termina às" | Duração = fim − início, se o fim for depois do início. Senão, "Sem hora de fim". |
| "Duração" | "Termina às" = início + duração, se der até 1439. Senão, fica vazio. |
| "Hora" | mantém a duração e recalcula "Termina às". |

Para escolher a opção da Duração, a Agenda confere com [[includes]] se o número é um dos fixos: `["30", "60", "120"].includes("60")` é `true`, então fica "1 h". Um 90 não está na lista, então vai para "Outro" com 90.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
function minutosDoDia(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}
function horaDosMinutos(total) {
  const doisDig = function (n) { return String(n).padStart(2, "0"); };
  return doisDig(Math.floor(total / 60)) + ":" + doisDig(total % 60);
}
const inicio = minutosDoDia("09:00");
const fim = minutosDoDia("10:30");
console.log("Duração:", fim - inicio, "min");
const novoFim = inicio + 60;
console.log("Com 1 h, termina às", novoFim <= 1439 ? horaDosMinutos(novoFim) : "(vazio)");
const tarde = minutosDoDia("23:30") + 60;
console.log("23:30 + 1 h:", tarde <= 1439 ? horaDosMinutos(tarde) : "passa da meia-noite, fica vazio");
```
- **L1–4:** [[split]] quebra `"09:30"` em `["09", "30"]`, `map(Number)` transforma os pedaços em números, e a conta dá os minutos desde 00:00.
- **L5–8:** o caminho de volta: as horas inteiras com `Math.floor` e os minutos que sobram com `%`, cada um com dois dígitos.
- **L9–11:** 09:00 é 540 e 10:30 é 630. A diferença, 90, é o que a Agenda mostraria em "Outro".
- **L12–13:** o caminho contrário: escolher "1 h" com início às 09:00 dá 600, ou seja, "10:00".
- **L14–15:** 23:30 é 1410, e mais 60 dá 1470, que passa de 1439. A Agenda deixa "Termina às" vazio e, ao salvar, mostra "Com essa duração, o compromisso passaria da meia-noite. Escolha uma duração menor.".

> [!CAUTION]
> Tentar somar minutos direto no texto da hora. `"09:00" + 60` não dá erro: dá `"09:0060"`, porque o `+` com um texto junta textos. Transforme a hora em número antes de fazer contas, e de volta em texto só para mostrar.

## Onde aparece na Agenda

No `js/datas.js`, a `minutosDoDia` e a `horaDosMinutos` fazem as duas conversões ([datas.js, linhas 238 a 247](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/datas.js#L238-L247)), e a `horaDeFim` calcula o fim a partir da duração ([datas.js, linhas 254 a 259](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/datas.js#L254-L259)). No `js/app.js`, a `aoMudarFim`, a `aoMudarDuracao` e a `aoMudarHora` fazem um campo preencher o outro ([app.js, linhas 1437 a 1474](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/app.js#L1437-L1474)). Ao salvar, a `avaliarHoraDeFim` decide o `duracaoMin` ou qual erro mostrar ([app.js, linhas 1488 a 1506](https://github.com/JoaoSaccucci/agenda/blob/297ffa3cf92dc2ca0e41dfe17ac72858441826b2/js/app.js#L1488-L1506)).

> [!TIP]
> **Para ir além (opcional):** se mudar "Duração" escreve em "Termina às", e mudar "Termina às" escreve em "Duração", por que as funções não ficam chamando uma à outra para sempre? Porque escrever `campo.value = ...` pelo JavaScript **não** dispara os eventos `input` e `change`. Esses eventos só acontecem quando a pessoa mexe no campo. Assim, cada mudança da pessoa causa uma única atualização do outro campo.

> [!IMPORTANT]
> Pergunta comum: "Se a tela mostra a mesma informação de dois jeitos, o que você guarda?" Resposta: guardo um valor só, a fonte única da verdade, e calculo o resto na hora de mostrar. Na Agenda, só a duração é salva, e "Termina às" é sempre hora + duração. Assim os dois nunca discordam.

## Teste rápido

```quiz
? Hora 09:00. A pessoa escreve 10:30 em "Termina às". O que a Duração mostra?
[ ] "1 h", a opção mais próxima.
    -> Errada: a Agenda não arredonda. Ela usa a diferença exata.
[x] "Outro", com 90 minutos.
    -> Certa: 630 − 540 = 90, que não é 30, 60 nem 120, então vai para "Outro".
[ ] "Sem hora de fim", porque 90 não é uma das opções.
    -> Errada: "Sem hora de fim" é só quando o fim está vazio ou não é depois da Hora.
```

```quiz
? Por que a Agenda guarda só o duracaoMin, e não também a hora de fim?
[ ] Porque o localStorage não aceita guardar horas.
    -> Errada: o localStorage guarda qualquer texto, inclusive "10:30".
[x] Para que fim e duração nunca discordem: o fim é sempre calculado a partir da hora e da duração.
    -> Certa: é a fonte única da verdade.
[ ] Porque a duração ocupa menos espaço que a hora.
    -> Errada: a diferença de espaço não importa aqui. O motivo é não ter dois valores brigando.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e troque `"10:30"` da linha 10 por `"09:30"`. Rode: qual duração aparece? Qual opção a Agenda marcaria?
- [ ] Troque `"09:00"` da linha 9 por `"14:00"` e rode. Com "1 h", qual é o novo fim? A linha 11 deu um número negativo: o que a Agenda faria com esse "Termina às"? (Dica: a primeira linha da tabela.)
- [ ] Acrescente no fim `console.log(horaDosMinutos(1439));` e rode. Por que 1439 é o limite?
