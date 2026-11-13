# Tudo vira minutos: uma unidade só para fazer conta e comparar

> [!TIP]
> **Em resumo:** "1h30", "45 min" e "meia hora" são jeitos diferentes de escrever um tempo. A Agenda transforma todos eles num número só, em minutos.
> Com tudo na mesma unidade, dá para somar, subtrair e comparar sem erro.

## O conceito

Na Entrega 4b, a frase passou a entender tempos: "por 1h30" (duração) e "sair 30 min antes" (tempo para sair). Cada pessoa escreve de um jeito: "1h", "1h30", "2 horas", "45 minutos", "meia hora".

Fazer conta com textos assim é difícil. Quanto é "1h30" mais "meia hora"? A saída é **escolher uma unidade comum** e converter tudo para ela logo na entrada. A Agenda escolheu **minutos**:

- "1h30" = 1 × 60 + 30 = 90
- "2 horas" = 2 × 60 = 120
- "meia hora" = 30

Depois disso, o resto do código só trabalha com números: guarda `duracaoMin: 90` e compara um número com outro.

Horários do dia funcionam do mesmo jeito: "10:30" vira 10 × 60 + 30 = 630 minutos desde a meia-noite. Assim, saber se um horário vem antes de outro vira uma comparação de números. O maior horário do dia, 23:59, é 1439 minutos. É por isso que o limite 1439 aparece nos comentários do `frase.js`.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
function emMinutos(texto) {
  const comH = /^(\d{1,2})h(\d{2})?$/.exec(texto);
  if (comH) return Number(comH[1]) * 60 + Number(comH[2] || 0);
  const comMin = /^(\d{1,3}) ?min$/.exec(texto);
  if (comMin) return Number(comMin[1]);
  if (texto === "meia hora") return 30;
  return null;
}
console.log(emMinutos("1h30"));
console.log(emMinutos("2h"));
console.log(emMinutos("45 min"));
console.log(emMinutos("meia hora"));
console.log(emMinutos("1h30") + emMinutos("meia hora"));
console.log(emMinutos("um tempão"));
```
- **L1:** a função recebe um texto e devolve os minutos (um número) ou `null`.
- **L2:** a regex (aula 5.1) procura "horas + h + minutos opcionais". O `^` e o `$` exigem que o texto inteiro siga o molde.
- **L3:** horas × 60 + minutos. Em "2h" não há minutos e o grupo 2 é `undefined`. O `|| 0` troca esse `undefined` por 0.
- **L4–5:** a outra forma: um número, um espaço opcional (` ?`) e "min".
- **L6:** "meia hora" é um caso fixo.
- **L7:** nenhuma forma serviu: `null` quer dizer "não é um tempo".
- **L9–12:** `90`, `120`, `45` e `30`.
- **L13:** `120`. Como os dois já são números, somar é fácil.
- **L14:** `null`.

Agora os horários do dia:

```js rodar
function minutosDoDia(hora) {
  const partes = hora.split(":");
  return Number(partes[0]) * 60 + Number(partes[1]);
}
console.log("9:00" < "10:00");
console.log(minutosDoDia("9:00") < minutosDoDia("10:00"));
console.log(minutosDoDia("10:00"), minutosDoDia("11:30"));
console.log(minutosDoDia("11:30") - minutosDoDia("10:00"));
console.log(minutosDoDia("23:59"));
```
- **L1–4:** separa "HH:MM" pelo ":" e calcula os minutos desde a meia-noite.
- **L5:** `false`. Comparando como **texto**, o JavaScript olha letra por letra: "9" vem depois de "1", então "9:00" parece maior que "10:00".
- **L6:** `true`. Em minutos, 540 é menor que 600.
- **L7:** `600 690`.
- **L8:** `90`. A diferença entre dois horários é uma subtração.
- **L9:** `1439`, o último minuto do dia.

> [!CAUTION]
> Esquecer o `Number`. Se a L3 do primeiro exemplo fosse `comH[1] * 60 + comH[2]`, "1h30" daria `"6030"`, e não 90. O `*` transforma o "1" em número, mas o `+` com um texto **junta** os textos. Sempre converta o que veio de uma regex ou de um `split` com `Number` antes de fazer conta.

## Onde aparece na Agenda

A `lerTempo` lê "meia hora", "1h", "1h30", "2 horas" e "45 min" e devolve sempre `{ minutos, fim }` ([frase.js, linhas 439 a 463](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L439-L463)). A `duracaoEm` ("por 1h30") e a `sairEm` ("sair 30 min antes") usam essa mesma função, então as duas aceitam os mesmos jeitos de escrever ([linhas 465 a 488](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L465-L488)). No intervalo "das 11 às 1 da tarde", a pergunta "o primeiro horário vem antes do segundo?" é feita em minutos: `horas * 60 + minutos` ([linhas 414 a 427](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L414-L427)).

> [!TIP]
> **Para ir além (opcional):** a `lerTempo` não confere se o tempo é grande demais. "por 13h" vira 780 minutos, mesmo passando do fim do dia. O comentário da própria `lerTempo` explica que quem mostra o erro é o formulário, com a mensagem de sempre ([linhas 439 a 442](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L439-L442)), e o da `entenderFrase` avisa que a duração pode estar fora do limite ([linhas 684 e 685](https://github.com/JoaoSaccucci/agenda/blob/82a924620f02ffdf84c28af3ecfb5a9103c676d2/js/frase.js#L684-L685)). Cada parte faz uma coisa: a frase **lê**, o formulário **valida**.

> [!IMPORTANT]
> Pergunta comum: "Como você calcula quanto tempo há entre 10:00 e 11:30?" Resposta: converto os dois para uma unidade comum (minutos desde a meia-noite, ou milissegundos com `Date`) e subtraio: 690 − 600 = 90 minutos. Comparar horários como texto é arriscado, porque "9:00" fica depois de "10:00".

## Teste rápido

```quiz
? Quantos minutos a Agenda guarda para "por 2h15"?
[ ] 215
    -> Errada: isso é juntar os algarismos. 2 horas são 120 minutos.
[x] 135
    -> Certa: 2 × 60 + 15 = 135.
[ ] 2.15
    -> Errada: a Agenda guarda minutos inteiros, não horas com vírgula.
```

```quiz
? Por que "9:00" < "10:00" dá false?
[ ] Porque o JavaScript não consegue comparar horários.
    -> Errada: ele compara, mas aqui compara como texto.
[x] Porque textos são comparados letra por letra, e "9" vem depois de "1".
    -> Certa: em minutos (540 e 600), a comparação dá o resultado certo.
[ ] Porque falta o new Date().
    -> Errada: não precisa de Date. Basta converter para minutos.
```

```quiz
? No primeiro exemplo, o que emMinutos("2h") devolveria se a L3 fosse Number(comH[1]) * 60 + Number(comH[2]), sem o || 0?
[ ] 120
    -> Errada: o grupo 2 é undefined, e Number(undefined) não é 0.
[x] NaN
    -> Certa: Number(undefined) é NaN ("não é um número"), e qualquer conta com NaN dá NaN.
[ ] null
    -> Errada: a função chegaria ao return da L3 antes do return null.
```

## Para praticar

- [ ] No primeiro exemplo, clique em **Editar** e acrescente, antes da L7, uma linha para "1 hora e meia" devolver 90. Rode com `console.log(emMinutos("1 hora e meia"))`.
- [ ] Ainda no primeiro exemplo, faça a função aceitar "2 horas" (dica: copie a ideia da L4 com a palavra "horas" e multiplique por 60).
- [ ] Clique em **Restaurar**. No segundo exemplo, escreva uma linha que mostre quantos minutos faltam de 08:45 até 12:00. Calcule de cabeça **antes** de rodar.
