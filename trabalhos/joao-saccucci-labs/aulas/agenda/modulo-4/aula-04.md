# A faixa da semana: contar por dia e levar o foco até lá

> [!TIP]
> **Em resumo:** a faixa "Próximos 7 dias" conta os compromissos por data num objeto e monta os 7 dias com `new Date(ano, mês, dia + i)`.
> Um dia com compromisso é um botão que rola até o dia na lista e põe o foco no título dele, que tem `tabindex="-1"`.

## O conceito

A US21 pede uma faixa com hoje e os 6 dias seguintes, cada um com "Livre", "1 compromisso" ou "3 compromissos". A Agenda faz isso em três partes.

**1. Contar.** A `diasDaSemana` recebe a lista que já está em "Próximos compromissos" (com data, abertos, que ainda não passaram, inclusive os de dia todo). Ela conta quantos há em cada data num objeto:

```js
contagem[data] = (contagem[data] || 0) + 1;
```

Na primeira vez, `contagem[data]` é [[undefined]], e o `|| 0` ("ou zero") troca esse valor por 0. Depois, soma 1. Lembra da armadilha do `{}` como dicionário (aula 4.3 da Labs)? Aqui ela não aparece, porque quem procura as chaves é o próprio código, sempre com datas que ele mesmo gerou, como `"2026-11-09"`. Nenhum texto digitado por alguém vira chave.

**2. Montar os 7 dias.** Para `i` de 0 a 6, `new Date(ano, mês, dia + i)` cria cada dia. A [[Date]] "vira o mês" sozinha: 31 de outubro + 1 é 1º de novembro. O nome é "Hoje", "Amanhã" ou a abreviação mais o dia do mês, como "Sex 14".

**3. Botão só quando faz algo.** Um dia com compromisso é um `<button>`, com um [[aria-label]] (o nome que o leitor de tela anuncia) como "Hoje, 2 compromissos". Um dia livre é um `<div>`: não recebe foco e não faz nada ao ser tocado. Um botão que não faz nada só daria um Tab a mais para quem usa o teclado.

**Levar o foco até o dia.** Ao tocar num dia, a `irParaDia` acha o título (`h3`) daquele dia na lista e:

- rola até ele com [[scrollIntoView]] ("rolar até ficar à vista"), com `behavior: "smooth"` (comportamento "suave", animado). Se a pessoa pediu menos animação no aparelho ([[prefers-reduced-motion]]), usa `"auto"`, que pula direto.
- põe o foco nele com `titulo.`[[focus]]`({ preventScroll: true })`. O *preventScroll* ("impedir a rolagem") existe porque a rolagem já foi pedida: sem ele, o `focus` pularia direto até o título e cortaria a animação.

Só que um `h3` normalmente não recebe foco. Para isso existe o [[tabindex]]:

| Valor | O que faz |
|---|---|
| `tabindex="-1"` | recebe foco **pelo código**, mas o Tab passa direto |
| `tabindex="0"` | entra na ordem do Tab, no lugar em que está no HTML |
| número positivo | muda a ordem do Tab da página: evite |

Com o foco no título, o leitor de tela anuncia "Hoje, título nível 3", e o próximo Tab vai para o primeiro botão de um compromisso daquele dia.

## Exemplo

Hoje é 29/10/2026, uma quinta-feira. Clique em **Rodar** e confira o Console.

```js rodar
const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const proximos = [{ data: "2026-10-29" }, { data: "2026-10-29" }, { data: "2026-11-01" }, { data: "2026-11-20" }];
const contagem = {};
proximos.forEach(function (c) { contagem[c.data] = (contagem[c.data] || 0) + 1; });
const dois = function (n) { return String(n).padStart(2, "0"); };
const hoje = new Date(2026, 9, 29);
for (let i = 0; i < 7; i++) {
  const dia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + i);
  const data = dia.getFullYear() + "-" + dois(dia.getMonth() + 1) + "-" + dois(dia.getDate());
  let nome = DIAS[dia.getDay()] + " " + dia.getDate();
  if (i === 0) nome = "Hoje";
  if (i === 1) nome = "Amanhã";
  const qtd = contagem[data] || 0;
  console.log(nome + ": " + (qtd === 0 ? "Livre" : qtd + (qtd === 1 ? " compromisso" : " compromissos")));
}
```
- **L1:** as abreviações. O `getDay()` devolve 0 para domingo, 1 para segunda, e assim por diante.
- **L2:** quatro compromissos de "Próximos" (aqui só a data importa). O de 20/11 fica fora dos 7 dias.
- **L3–4:** a contagem. Depois desta linha, ela fica `{ "2026-10-29": 2, "2026-11-01": 1, "2026-11-20": 1 }`.
- **L5:** `padStart(2, "0")` ("preencher no começo") põe um zero na frente quando falta: `9` vira `"09"`.
- **L6:** os meses da `Date` começam em 0, então 9 é outubro.
- **L7:** o `for` clássico: começa com `i = 0`, repete enquanto `i < 7` e soma 1 a cada volta (`i++`).
- **L8:** `29 + 3` dá "32 de outubro", que a `Date` transforma em 1º de novembro.
- **L9:** o texto `"AAAA-MM-DD"`, no mesmo formato da data dos compromissos.
- **L10–12:** o nome do dia, trocado por "Hoje" e "Amanhã" nas duas primeiras voltas.
- **L13:** um dia que não está na contagem dá `undefined || 0`, ou seja, 0.
- **L14:** o Console mostra `Hoje: 2 compromissos`, `Amanhã: Livre`, `Sáb 31: Livre`, `Dom 1: 1 compromisso`, `Seg 2: Livre`, `Ter 3: Livre` e `Qua 4: Livre`.

> [!CAUTION]
> Dar `tabindex="0"` (ou um número positivo) a um título só para o código conseguir pôr o foco nele. Assim, todos os títulos entram na ordem do Tab, e quem usa o teclado precisa passar por cada um. Quando só o código leva o foco, use `tabindex="-1"`.

## Onde aparece na Agenda

No `js/app.js`, a `diasDaSemana` conta e monta os 7 dias ([app.js, linhas 748 a 765](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/js/app.js#L748-L765)), e a `criarDiaDaSemana` escolhe entre `<button>` com `aria-label` e `<div>` com "Livre" ([app.js, linhas 770 a 802](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/js/app.js#L770-L802)). A `irParaDia` faz a rolagem e o `focus` ([app.js, linhas 837 a 846](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/js/app.js#L837-L846)). O `h3` ganha `tabIndex = -1` na `criarDia`, só na lista "Próximos compromissos" ([app.js, linhas 693 a 696](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/js/app.js#L693-L696)).

> [!TIP]
> **Para ir além (opcional):** a faixa é redesenhada a cada minuto, junto com a lista, e por isso ela **não** tem [[aria-live]]. Se o foco estava num dia, a `desenharSemana` anota a data antes de redesenhar, e a `devolverFocoNaSemana` devolve o foco ao mesmo dia. Se o dia ficou "Livre", o foco vai para o próximo dia com botão, que ela acha com [[find]] e `botao.dataset.data >= data` ([app.js, linhas 807 a 833](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/js/app.js#L807-L833)). Dá para comparar as datas como texto porque `"AAAA-MM-DD"` em ordem alfabética já está em ordem de data (aula 2.2 da Labs).

> [!IMPORTANT]
> Pergunta comum: "Como você leva o foco para um elemento que não é botão nem campo?" Resposta: dou `tabindex="-1"` a ele, para que possa receber foco pelo código sem entrar na ordem do Tab, e chamo `elemento.focus()`. Assim, quem usa teclado ou leitor de tela continua dali. Se também rolo a página, respeito o `prefers-reduced-motion` e uso `preventScroll` para não brigar com a rolagem.

## Teste rápido

```quiz
? O que o tabindex="-1" faz no título de cada dia?
[ ] Tira o título da página para o leitor de tela.
    -> Errada: o título continua sendo lido normalmente. O tabindex só mexe no foco.
[x] Deixa o código pôr o foco no título, mas o Tab passa direto por ele.
    -> Certa: é o que a irParaDia precisa, sem encher a ordem do Tab de títulos.
[ ] Coloca o título como o primeiro do Tab.
    -> Errada: isso seria um número positivo, que a Agenda evita.
```

```quiz
? No exemplo (hoje é 29/10), um compromisso em 05/11 apareceria na faixa?
[ ] Sim, como "Qui 5: 1 compromisso".
    -> Errada: a faixa vai de 29/10 até 04/11. O dia 05/11 é o oitavo dia.
[x] Não: ele fica fora dos 7 dias e só é contado, mas nunca procurado.
    -> Certa: o laço só procura as 7 datas que ele mesmo gera, como acontece com o 20/11 do exemplo.
[ ] Sim, como "Livre".
    -> Errada: "Livre" é para um dia que está na faixa e não tem compromisso.
```

```quiz
? Por que um dia livre é um <div>, e não um <button>?
[ ] Porque um <div> é mais fácil de pintar com CSS.
    -> Errada: os dois aceitam o mesmo CSS. O motivo é o que o elemento faz.
[x] Porque ele não faz nada ao ser tocado, e um botão sem ação só daria um Tab a mais.
    -> Certa: a US21 pede que o dia livre não seja botão e não receba foco.
[ ] Porque o leitor de tela não lê o texto de um botão.
    -> Errada: lê, sim. O dia com compromisso é um botão e é anunciado.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e troque `new Date(2026, 9, 29)` por `new Date(2026, 9, 31)` na linha 6. Rode: quais dias aparecem agora? E o que aconteceu com os dois compromissos de 29/10?
- [ ] Clique em **Restaurar** e acrescente `{ data: "2026-10-30" }` à lista da linha 2. Rode: o "Amanhã" aparece no singular?
- [ ] Clique em **Restaurar** e troque `contagem[data] || 0` por `contagem[data]` na linha 13. Rode: o que aparece nos dias livres? Para que serve o `|| 0`?
