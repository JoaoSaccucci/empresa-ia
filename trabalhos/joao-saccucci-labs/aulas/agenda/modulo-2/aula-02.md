# Decidir onde cada item aparece: perguntas em ordem

> [!TIP]
> **Em resumo:** uma função faz perguntas numa ordem fixa, e a primeira resposta "sim" decide a seção.
> Ela não mexe na tela: recebe o compromisso e devolve um texto.

## O conceito

Depois da Entrega 2b, a página da Agenda tem quatro seções: **Ficou pendente**, **Próximos compromissos**, **Sem data** e **Anteriores**. Cada compromisso aparece em **uma só**. Quem decide é uma função, e ela faz as perguntas sempre nesta ordem:

| Pergunta | Se a resposta for sim |
|---|---|
| 1. Não tem data? | Sem data |
| 2. Já foi resolvido ("feito" ou "nao-vou-fazer")? | Anteriores |
| 3. Já passou? | com `cobrar`: Ficou pendente; sem `cobrar`: Anteriores |
| 4. Nenhuma das anteriores | Próximos compromissos |

A ordem importa. Um compromisso marcado como **Feito** e que também já passou responde "sim" nas perguntas 2 e 3. Como a 2 vem antes, ele vai para "Anteriores", e nunca para "Ficou pendente". Afinal, ele já foi feito.

Cada pergunta usa um [[return]] logo no começo: se bater, a função devolve a resposta e para ali, sem olhar as outras. Isso se chama [[early return]] ("retorno antecipado") e evita um monte de `if` dentro de `if`.

Na pergunta 3 aparece um [[operador ternário]]: `item.cobrar ? "Ficou pendente" : "Anteriores"`. Leia assim: "cobrar é verdadeiro? Então Ficou pendente. Senão, Anteriores." É um `if/else` curto que devolve um valor.

## Exemplo

Para simplificar, aqui "passou" quer dizer "a data é antes de hoje" (como num compromisso de dia todo). Clique em **Rodar** e confira o Console.

```js rodar
const hoje = "2026-11-06";
function secao(item) {
  if (item.data === null) return "Sem data";
  if (item.status === "feito" || item.status === "nao-vou-fazer") return "Anteriores";
  if (item.data < hoje) return item.cobrar ? "Ficou pendente" : "Anteriores";
  return "Próximos";
}
const itens = [
  { titulo: "Comprar presente", data: null, status: "aberto", cobrar: false },
  { titulo: "Dentista", data: "2026-11-20", status: "feito", cobrar: false },
  { titulo: "Pagar boleto", data: "2026-11-01", status: "aberto", cobrar: true },
  { titulo: "Academia", data: "2026-11-01", status: "aberto", cobrar: false },
  { titulo: "Reunião", data: "2026-11-30", status: "aberto", cobrar: false }
];
itens.forEach(function (item) { console.log(item.titulo + " -> " + secao(item)); });
```
- **L1:** o "hoje" fixo do exemplo, no mesmo formato de texto que a Agenda usa.
- **L3:** pergunta 1. `null` quer dizer "sem data".
- **L4:** pergunta 2. `||` quer dizer "ou": basta uma das duas situações ser verdadeira.
- **L5:** pergunta 3. Datas no formato `AAAA-MM-DD` podem ser comparadas como texto, então `<` quer dizer "antes de". Se passou, o ternário escolhe entre as duas seções.
- **L6:** se nenhuma pergunta bateu, o item ainda vai acontecer.
- **L8–14:** um compromisso de cada tipo. Repare no Dentista: data futura, mas já marcado como feito.
- **L15:** [[forEach]] passa por cada item e mostra a seção dele.

O Console mostra: `Comprar presente -> Sem data`, `Dentista -> Anteriores`, `Pagar boleto -> Ficou pendente`, `Academia -> Anteriores` e `Reunião -> Próximos`.

> [!CAUTION]
> Trocar a ordem das perguntas. Se a pergunta "já passou?" viesse antes de "já foi resolvido?", um compromisso feito, com `cobrar: true` e data de ontem iria para "Ficou pendente", cobrando algo que você já fez.

## Onde aparece na Agenda

A função `secaoDoCompromisso`, no `js/datas.js`, faz exatamente essas quatro perguntas. A diferença é que, para saber se passou, ela usa a `compromissoPassou`, que olha também a hora ([datas.js, linhas 167 a 174](https://github.com/JoaoSaccucci/agenda/blob/f91ecc6c5719438a4949736c977fca73886ca18b/js/datas.js#L167-L174)). No `js/app.js`, a `separarPorSecao` usa essa função para dividir a lista em quatro ([app.js, linhas 527 a 533](https://github.com/JoaoSaccucci/agenda/blob/f91ecc6c5719438a4949736c977fca73886ca18b/js/app.js#L527-L533)), e a `acoesDoItem` escolhe os botões do card a partir da seção ([app.js, linhas 270 a 275](https://github.com/JoaoSaccucci/agenda/blob/f91ecc6c5719438a4949736c977fca73886ca18b/js/app.js#L270-L275)).

> [!IMPORTANT]
> Pergunta comum: "Por que separar a regra de negócio da tela?" Resposta: uma função pura, que só recebe valores e devolve uma resposta, é fácil de testar e pode ser usada em vários lugares. Na Agenda, a mesma `secaoDoCompromisso` desenha a lista, confere a cada minuto se algo mudou e escreve o aviso do formulário.

## Teste rápido

```quiz
? Um compromisso tem status "feito", cobrar: true e a data de ontem. Em qual seção ele aparece?
[ ] Ficou pendente
    -> Errada: a pergunta "já foi resolvido?" vem antes de "já passou?", e vale a primeira que bater.
[x] Anteriores
    -> Certa: ele responde "sim" na pergunta 2 e a função para ali.
[ ] Próximos compromissos
    -> Errada: ele já passou e já foi feito. Próximos é só para o que ainda vai acontecer.
```

```quiz
? Na linha 5 do exemplo, o que faz o trecho item.cobrar ? "Ficou pendente" : "Anteriores"?
[ ] Pergunta à pessoa se ela quer ser cobrada.
    -> Errada: nada é perguntado. O código só lê o valor que já está no item.
[x] Devolve "Ficou pendente" se cobrar for verdadeiro e "Anteriores" se for falso.
    -> Certa: é o operador ternário, um if/else curto que devolve um valor.
[ ] Dá erro, porque falta o if.
    -> Errada: o ternário é um jeito válido de escrever uma escolha sem o if.
```

## Para praticar

- [ ] No exemplo, clique em **Editar**, mude a data do Dentista (linha 10) para `"2026-11-01"` e o `cobrar` dele para `true`. Rode: em que seção ele ficou?
- [ ] Agora troque a ordem das linhas 4 e 5 e rode de novo. O que aconteceu com o Dentista? Compare com o Erro comum acima.
- [ ] Clique em **Restaurar** e mude o `status` da Academia para `"nao-vou-fazer"`. A seção mudou? Por quê?
