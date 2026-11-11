# Uma função pura que recebe o "agora"

> [!TIP]
> **Em resumo:** a `entenderFrase(frase, agora)` só recebe a frase e o momento atual e devolve um objeto. Ela não mexe na tela, não grava nada e não lê o relógio sozinha.
> Por isso, com um "agora" fixo, o mesmo teste dá sempre o mesmo resultado, e uma tabela de frases confere tudo de uma vez.

## O conceito

Uma [[função pura]] tem duas regras:

1. **Mesmas entradas, mesma saída.** Chamar duas vezes com os mesmos valores dá sempre o mesmo resultado.
2. **Nada de efeito fora dela.** Ela não muda a tela, não grava no [[localStorage]] e não altera variáveis de fora. Só devolve um valor.

A `entenderFrase` segue essas regras. Recebe a frase e devolve `{ titulo, data, hora, semData, dataInexistente, nadaEntendido }`. Quem pega esse objeto e preenche o formulário é o `app.js`.

E o "agora"? "Amanhã" depende do dia de hoje. Se a função fizesse `new Date()` lá dentro, ela deixaria de ser pura: a mesma frase daria um resultado na quinta e outro na sexta. Para testar "aula quinta 10h", o testador precisaria mudar o relógio do computador. Por isso o momento atual entra **como parâmetro**. Na tela, o `app.js` passa `new Date()`. No teste, passa sempre a mesma data: quinta-feira, 12/11/2026, 14:00. Com esse "agora" fixo, o testador conferiu as 52 frases da tabela dos requisitos, uma por uma.

**A próxima sexta.** A regra "sempre a próxima no futuro" para dia da semana é um laço: a partir de hoje (`somar = 0`), cria cada dia com `new Date(ano, mês, dia + somar)` (aula 4.4 da Agenda) e para no primeiro com o dia da semana pedido que ainda não passou. Quem diz o dia da semana é o [[getDay]] ("pegar o dia"), que vai de 0 (domingo) a 6 (sábado). O laço vai até 7, e não até 6, por causa de um caso: hoje é quinta, a pessoa pediu "quinta 10h" e já são 14:00. Aí a resposta é hoje + 7.

## Exemplo

O exemplo usa o mesmo "agora" do testador e uma tabela de casos. Clique em **Rodar** e confira o Console.

```js rodar
function proximoDia(diaDaSemana, jaPassouHoje, agora) {
  for (let somar = 0; somar <= 7; somar++) {
    const data = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + somar);
    if (data.getDay() !== diaDaSemana) continue;
    if (somar === 0 && jaPassouHoje) continue;
    return data.getDate() + "/" + (data.getMonth() + 1);
  }
}
const agora = new Date(2026, 10, 12, 14, 0); // quinta, 12/11/2026, 14:00
const tabela = [[5, false, "13/11"], [4, false, "12/11"], [4, true, "19/11"], [0, false, "15/11"]];
tabela.forEach(function (linha) {
  const obtido = proximoDia(linha[0], linha[1], agora);
  console.log(linha[0], linha[1], "->", obtido, obtido === linha[2] ? "ok" : "FALHOU, esperado " + linha[2]);
});
console.log(proximoDia(4, true, new Date(2026, 11, 31)));
```
- **L1:** função pura: tudo o que ela usa chega pelos parâmetros, inclusive o `agora`.
- **L2–3:** de hoje até hoje + 7, cria cada dia. A [[Date]] vira o mês sozinha (dia 35 vira o começo do mês seguinte).
- **L4:** não é o dia da semana pedido? [[continue]] pula para o próximo.
- **L5:** é hoje, mas o compromisso já passou? Também pula. (Na Agenda, quem decide se passou é a regra "quando um compromisso passou", com a hora da frase.)
- **L6:** achou: devolve dia/mês. O `+ 1` está ali porque os meses da `Date` começam em 0.
- **L9:** o "agora" fixo. O `10` é **novembro**, pelo mesmo motivo.
- **L10:** a tabela: dia da semana, se já passou hoje e o resultado esperado. 5 = sexta, 4 = quinta, 0 = domingo.
- **L11–14:** roda cada linha e compara. O Console mostra `5 false -> 13/11 ok`, `4 false -> 12/11 ok`, `4 true -> 19/11 ok` e `0 false -> 15/11 ok`.
- **L15:** 31/12/2026 também é quinta. Já passou, então vai para a quinta seguinte: `7/1`. Virou o mês e o ano sem nenhum `if` a mais.

> [!CAUTION]
> Chamar `new Date()` dentro da função que você quer testar. O teste passa hoje e falha amanhã, sem ninguém mexer no código (um teste "instável"). Deixe o relógio do lado de fora: quem chama a função lê a hora e passa como parâmetro.

## Onde aparece na Agenda

A `entenderFrase` e o comentário dela, que lista tudo o que ela devolve, estão em [frase.js, linhas 425 a 470](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L425-L470). O laço da próxima sexta fica na `resolverData` ([frase.js, linhas 181 a 190](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L181-L190)), que pergunta à `compromissoPassou` se o dia de hoje já passou ([datas.js, linhas 80 a 96](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/datas.js#L80-L96)). A parte que não é pura fica na borda: a `criarPelaFrase`, no `app.js`, lê `new Date()` **uma vez** e entrega o mesmo `agora` para a `entenderFrase` e para a linha "Entendi" ([app.js, linhas 1851 a 1862](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/app.js#L1851-L1862)).

> [!TIP]
> **Para ir além (opcional):** por que guardar o mesmo `agora` para a linha "Entendi"? Imagine a frase "dentista amanhã" escrita às 23:59:59. Se a linha lesse o relógio de novo um segundo depois, já seria outro dia, e ela poderia mostrar "Hoje" para a data calculada como "amanhã". Com um "agora" só, as duas partes sempre concordam. O comentário do topo do `frase.js` mostra como chamar a função no console com um "agora" fixo ([frase.js, linhas 1 a 18](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L1-L18)).

> [!IMPORTANT]
> Pergunta comum: "Como você testa um código que depende da data de hoje?" Resposta: separo a lógica numa função pura e passo o "agora" como parâmetro, em vez de chamar `new Date()` dentro dela. No teste, uso uma data fixa e uma tabela de casos com as bordas: hoje que ainda não passou, hoje que já passou, virada de mês e de ano, 29/02. Esse jeito de receber de fora aquilo de que a função depende se chama injeção de dependência.

## Teste rápido

```quiz
? Por que a entenderFrase recebe o "agora" em vez de chamar new Date() lá dentro?
[ ] Porque o new Date() não funciona dentro de funções.
    -> Errada: funciona em qualquer lugar. O problema é o resultado mudar com o relógio.
[x] Para o mesmo teste dar sempre o mesmo resultado, com um "agora" fixo, sem mudar o relógio do computador.
    -> Certa: assim ela é pura, e o testador conferiu as 52 frases com quinta, 12/11/2026, 14:00.
[ ] Para a frase ser salva junto com a data.
    -> Errada: a frase nunca é salva. Ela só preenche o formulário.
```

```quiz
? Com o "agora" de quinta, 12/11/2026, 14:00, que data a frase "aula quinta 10h" recebe?
[ ] 12/11/2026, porque hoje é quinta.
    -> Errada: o compromisso das 10:00 de hoje já passou às 14:00.
[x] 19/11/2026, a quinta seguinte.
    -> Certa: é o caso que obriga o laço a ir até hoje + 7.
[ ] Nenhuma: a data fica vazia.
    -> Errada: dia da semana sempre vira a próxima data no futuro.
```

```quiz
? Qual destas funções NÃO é pura?
[ ] function dobro(n) { return n * 2; }
    -> Errada: com o mesmo n, ela sempre devolve o mesmo valor e não mexe em nada fora.
[x] function salvar(lista) { localStorage.setItem("x", JSON.stringify(lista)); }
    -> Certa: ela grava no localStorage, que é um efeito fora da função.
[ ] function proximoDia(dia, passou, agora) { ... } (a do exemplo)
    -> Errada: tudo o que ela usa chega pelos parâmetros, e ela só devolve um texto.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e acrescente à tabela da linha 10 a linha `[6, false, "14/11"]`. Rode: deu "ok"? Depois acrescente um caso que você ache difícil e escreva o resultado esperado **antes** de rodar.
- [ ] Clique em **Restaurar** e troque o "agora" da linha 9 por `new Date(2026, 10, 13, 9, 0)` (sexta). Rode: qual linha deu "FALHOU"? O erro está na função ou na tabela?
