# Criar um arquivo no navegador: JSON.stringify e Blob

> [!TIP]
> **Em resumo:** o navegador consegue montar um arquivo na memória, sem servidor.
> Primeiro os dados viram texto com `JSON.stringify`, depois o texto vira um "arquivo" com `Blob`.

## O conceito

Na Entrega 2a, a Agenda ganhou o botão **Baixar cópia**. Não existe servidor nenhum: quem cria o arquivo é o próprio navegador. O caminho tem quatro passos:

1. Transformar os dados (uma lista de objetos) em **texto**, com [[JSON.stringify]].
2. Embrulhar esse texto num "arquivo" que existe só na memória, com um [[Blob]].
3. Dar um endereço provisório para esse arquivo, com `URL.createObjectURL`.
4. Criar um link `<a download>` pelo código e clicar nele com `link.click()`.

Nesta aula vamos ver de perto os passos 1 e 2, que dá para testar aqui mesmo. Os passos 3 e 4 só funcionam numa página de verdade, por isso aparecem em texto no fim.

O `JSON.stringify` aceita mais dois valores depois dos dados: `JSON.stringify(dados, null, 2)`. O `null` diz "não filtre nada" e o `2` diz "use 2 espaços de recuo". Com o recuo, o arquivo fica fácil de ler num editor.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
const copia = {
  app: "agenda",
  versao: 1,
  compromissos: [{ id: "a1", titulo: "Dentista" }]
};

const numaLinha = JSON.stringify(copia);
const bonito = JSON.stringify(copia, null, 2);
console.log(numaLinha);
console.log(bonito);

const arquivo = new Blob([bonito], { type: "application/json" });
console.log("Tamanho do arquivo:", arquivo.size, "bytes");
console.log("Tipo:", arquivo.type);
```
- **L1–5:** um objeto parecido com o arquivo de cópia da Agenda: o nome do app, a versão do formato e a lista de compromissos.
- **L7:** transforma o objeto em texto numa linha só, sem espaços.
- **L8:** o mesmo texto, mas com recuo de 2 espaços e uma informação por linha.
- **L9–10:** mostra as duas versões. Repare que o conteúdo é igual, só muda a arrumação.
- **L12:** cria o arquivo na memória. O `Blob` recebe uma **lista** de pedaços (aqui só um, o texto) e o tipo do conteúdo.
- **L13–14:** o `size` diz quantos bytes o arquivo tem, e o `type` mostra o tipo que escolhemos.

Até aqui nada foi baixado. Numa página de verdade, a Agenda continua assim:

```js
const endereco = URL.createObjectURL(arquivo);   // endereço "blob:..."
const link = document.createElement("a");
link.href = endereco;
link.download = "agenda-2026-11-05.json";        // baixar com este nome
link.click();                                    // clica pelo código
setTimeout(function () { URL.revokeObjectURL(endereco); }, 1000);
```

O `download` faz o navegador **baixar** em vez de abrir. O `revokeObjectURL` ("revogar") libera a memória do endereço depois que o download começou.

> [!CAUTION]
> Esquecer o `JSON.stringify` e colocar o objeto direto no `Blob`. O arquivo sai com o texto `[object Object]` em vez dos dados.

## Onde aparece na Agenda

A função `textoDoArquivoDeCopia`, no `js/copia.js`, monta o objeto da cópia e chama `JSON.stringify(arquivo, null, 2)` ([copia.js, linhas 47 a 55](https://github.com/JoaoSaccucci/agenda/blob/e413ad86d9f525fd94bfaa21e45153ff97cf0a06/js/copia.js#L47-L55)). A função `baixarArquivo`, no `js/app.js`, faz os passos 2 a 4 com `Blob`, `createObjectURL` e o link clicado pelo código ([app.js, linhas 735 a 745](https://github.com/JoaoSaccucci/agenda/blob/e413ad86d9f525fd94bfaa21e45153ff97cf0a06/js/app.js#L735-L745)).

> [!IMPORTANT]
> Pergunta comum: "Como exportar dados sem back-end?" Resposta: `JSON.stringify`, depois `Blob`, depois `URL.createObjectURL` e um `<a download>` clicado pelo código. Citar o `revokeObjectURL`, para liberar a memória, mostra cuidado.

## Teste rápido

```quiz
? O que o 2 faz em JSON.stringify(dados, null, 2)?
[ ] Salva só os 2 primeiros itens da lista.
    -> Errada: nenhum item é cortado. O 2 só muda a arrumação do texto.
[x] Deixa o texto com recuo de 2 espaços, uma informação por linha.
    -> Certa: no exemplo, compare as duas primeiras saídas do Console.
[ ] Cria 2 arquivos.
    -> Errada: o JSON.stringify não cria arquivo nenhum, ele só devolve um texto.
```

```quiz
? Para que serve o Blob na Agenda?
[ ] Para mandar a cópia para um servidor.
    -> Errada: a Agenda não tem servidor. Tudo acontece no navegador.
[ ] Para transformar o objeto em texto.
    -> Errada: quem faz isso é o JSON.stringify, antes do Blob.
[x] Para transformar o texto num arquivo que existe na memória e pode ser baixado.
    -> Certa: depois o createObjectURL dá um endereço para ele, e o link baixa.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e acrescente mais um compromisso na lista. Rode: o tamanho do arquivo aumentou quanto?
- [ ] Troque o `2` da linha 8 por `4` e rode. O que mudou no Console?
- [ ] Coloque `copia` no lugar de `bonito` na linha 12 e rode. Qual é o tamanho agora? (Dica: veja o Erro comum acima.)
