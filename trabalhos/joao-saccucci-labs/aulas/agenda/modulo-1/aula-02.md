# Ler um arquivo escolhido pela pessoa

> [!TIP]
> **Em resumo:** o JavaScript só lê um arquivo que a pessoa escolheu num `<input type="file">`.
> A leitura demora um pouco, então usamos `await arquivo.text()` dentro de um `try`.

## O conceito

Por segurança, uma página **não** pode abrir arquivos do seu computador sozinha. Quem escolhe é a pessoa, num campo especial:

```html
<input type="file" accept=".json" hidden>
```

- `type="file"` abre o seletor de arquivos do sistema.
- `accept=".json"` faz o seletor mostrar só arquivos `.json`.
- `hidden` esconde o campo. Na Agenda, o botão bonito "Importar cópia" só chama `campo.click()`, e o seletor abre.

Quando a pessoa escolhe, o campo dispara o evento `change` ("mudança"), e o arquivo fica em `campo.files[0]`. Esse arquivo é um `File`, que é um [[Blob]] com nome. Para pegar o conteúdo como texto, usamos `arquivo.text()`.

Só que ler um arquivo leva um tempinho. Por isso `arquivo.text()` não devolve o texto na hora: devolve uma [[Promise]], uma "promessa" de que o texto vai chegar. Para esperar, usamos [[await]], que só funciona dentro de uma função marcada com [[async]]. E como a leitura pode falhar, tudo fica dentro de um [[try]].

## Exemplo

Aqui não dá para abrir o seletor de arquivos, então criamos um arquivo de mentira com `new Blob`. Para o JavaScript, ele se comporta igual a um arquivo escolhido. Clique em **Rodar**.

```js rodar
const arquivo = new Blob(['{"versao": 1, "compromissos": []}']);

async function importar(arquivo) {
  console.log("1. Começou a ler...");
  let texto;
  try {
    texto = await arquivo.text();
  } catch (erro) {
    console.log("Não consegui ler o arquivo.");
    return;
  }
  console.log("3. Texto lido:", texto);
}
importar(arquivo);
console.log("2. A página continua livre enquanto o arquivo é lido.");
```
- **L1:** o "arquivo" de mentira, com um texto em JSON dentro.
- **L3:** a função é `async` porque vai esperar a leitura.
- **L5:** `let` cria a variável **fora** do `try`, para ela continuar existindo depois dele.
- **L7:** `await` espera o texto chegar. Enquanto isso, o resto da página continua funcionando.
- **L8–11:** se a leitura falhar, o erro cai no `catch`, mostramos uma mensagem e o `return` encerra a função.
- **L12:** só chega aqui se a leitura deu certo.
- **L14–15:** chamamos a função e logo depois mostramos outra mensagem.

Repare na ordem do Console: **1, 2, 3**. A mensagem 2 aparece antes da 3 porque o `await` pausa só a função `importar`, não o resto do código.

> [!CAUTION]
> Esquecer de limpar o campo depois de pegar o arquivo. O `change` só dispara quando o valor do campo **muda**. Se a pessoa escolher o mesmo arquivo duas vezes, nada acontece na segunda. A solução é `campo.value = ""` logo depois de pegar `campo.files[0]`.

## Onde aparece na Agenda

O campo escondido está no `index.html` ([linha 216](https://github.com/JoaoSaccucci/agenda/blob/e413ad86d9f525fd94bfaa21e45153ff97cf0a06/index.html#L216)), e o evento `change`, com o `campoArquivo.value = ""`, está no `js/app.js` ([linhas 1101 a 1107](https://github.com/JoaoSaccucci/agenda/blob/e413ad86d9f525fd94bfaa21e45153ff97cf0a06/js/app.js#L1101-L1107)). A função `importarArquivo` confere o tamanho antes de ler e depois faz o `await arquivo.text()` dentro de um `try` ([app.js, linhas 784 a 799](https://github.com/JoaoSaccucci/agenda/blob/e413ad86d9f525fd94bfaa21e45153ff97cf0a06/js/app.js#L784-L799)). Depois do `await`, ela ainda confere se a janela continua aberta, porque a pessoa pode ter fechado durante a espera.

> [!IMPORTANT]
> Pergunta comum: "O `await` trava a página?" Resposta: não. Ele pausa só a função `async` em que está, e o resto da página continua respondendo. E todo `await` que pode falhar precisa de `try/catch`.

## Teste rápido

```quiz
? Por que o JavaScript da Agenda não abre o arquivo de cópia sozinho, sem perguntar?
[ ] Porque a Agenda não tem servidor.
    -> Errada: mesmo com servidor, uma página não pode abrir arquivos do seu computador por conta própria.
[x] Por segurança: só a pessoa pode escolher um arquivo, pelo input type="file".
    -> Certa: se qualquer site pudesse ler seus arquivos, ele leria seus documentos sem você saber.
[ ] Porque o JSON não pode ser lido pelo JavaScript.
    -> Errada: o JavaScript lê JSON muito bem, com o JSON.parse.
```

```quiz
? No exemplo, por que a mensagem "2." aparece antes da "3."?
[ ] Porque o console.log mostra as mensagens em ordem aleatória.
    -> Errada: o Console sempre mostra na ordem em que as linhas rodaram.
[x] Porque o await pausa só a função importar, e o código de fora continua.
    -> Certa: enquanto o texto é lido, a linha 15 roda. Quando a leitura termina, a função continua na linha 12.
[ ] Porque o try atrasa o código.
    -> Errada: o try não atrasa nada. Quem espera é o await.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e troque o texto da linha 1 por `'Olá, Agenda'`. Rode: a leitura dá erro? Por quê?
- [ ] Apague a palavra `await` da linha 7 e rode. No lugar do texto aparece `{}`: é a Promise, que ainda não virou texto. Repare também que a ordem das mensagens mudou. Por quê?
