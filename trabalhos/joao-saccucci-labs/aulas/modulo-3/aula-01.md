# Quando algo pode dar errado: try e catch

> [!TIP]
> **Em resumo:** quando um trecho de código pode dar erro, coloque ele dentro de um `try`.
> Se o erro acontecer, o JavaScript pula para o `catch`, e o resto da página continua funcionando.

## O conceito

Quando uma linha de JavaScript dá erro, tudo o que vem depois dela para de rodar. Num site, isso vira uma lista que nunca aparece ou um botão que não responde.

Algumas linhas podem falhar por motivos fora do seu controle: o arquivo não carregou, um dado salvo veio estragado. Para esses casos existe o par [[try]] e [[catch]]:

```js
try {
  // código que pode dar erro
} catch (erro) {
  // o que fazer se der erro
}
```

- O JavaScript **tenta** rodar o bloco do `try`.
- Se tudo der certo, o bloco do `catch` é pulado.
- Se uma linha do `try` der erro, as linhas seguintes do `try` não rodam: o JavaScript pula direto para o `catch`. O erro fica guardado na variável entre parênteses, aqui chamada `erro` (o nome é você que escolhe).
- Depois do `catch`, o código segue normalmente.

Para treinar, vamos usar o [[JSON.parse]], que transforma um texto no formato [[JSON]] em objeto. Se o texto não seguir as regras do JSON, ele dá erro. É um ótimo jeito de provocar um erro de propósito.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
const textoBom = '{"nome": "Dev"}';
const textoRuim = "isto não é JSON";

const agente = JSON.parse(textoBom);
console.log(agente.nome);

try {
  const outro = JSON.parse(textoRuim);
  console.log("Esta linha não roda.");
} catch (erro) {
  console.log("Deu erro, mas a página continua.");
  console.log(erro.name);
}

console.log("Fim do código.");
```
- **L1:** um texto no formato JSON. Repare nas aspas: as simples, de fora, marcam o texto do JavaScript; as duplas, de dentro, fazem parte do JSON.
- **L2:** um texto qualquer, que não é JSON.
- **L4–5:** o `JSON.parse` transforma o texto bom em objeto, e o Console mostra `Dev`. Aqui não tem `try`, porque sabemos que o texto está certo.
- **L7–8:** dentro do `try`, tentamos converter o texto ruim. O `JSON.parse` dá erro nesta linha.
- **L9:** esta linha **não roda**. O erro da linha 8 fez o JavaScript pular direto para o `catch`.
- **L10–12:** o `catch` recebe o erro na variável `erro`. Mostramos uma mensagem nossa e o tipo do erro, `erro.name`, que aqui é `SyntaxError` (erro de sintaxe: o texto não segue as regras do JSON).
- **L15:** esta linha roda normalmente. O erro foi tratado, e o código seguiu em frente.

O Console mostra 4 linhas: `Dev`, `Deu erro, mas a página continua.`, `SyntaxError` e `Fim do código.`

> [!CAUTION]
> Deixar o `catch` vazio sem pensar. A página não quebra, mas você também não fica sabendo que algo deu errado, e o bug fica escondido. Quando o erro é inesperado, mostre pelo menos um `console.error(erro)` para conseguir investigar depois. Só deixe o `catch` "quieto" quando o erro é esperado e você já sabe o que fazer, como na função `lerProgresso`, logo abaixo.

## Onde aparece no site

No `js/lista-projetos.js`, a função `mostrarProjetos` carrega o `data/projetos.json` dentro de um `try` (linha 25). Se o arquivo não carregar, o `catch` (linhas 36 a 39) mostra o erro técnico no Console com `console.error` e coloca na tela uma mensagem amigável, em vez de deixar a página vazia. No `js/comum.js`, a função `lerProgresso` (linhas 122 a 129) usa o `JSON.parse` dentro de um `try`: se o valor salvo estiver estragado, o `catch` devolve um valor padrão e a página segue. Você vê essa função de perto na próxima aula.

> [!IMPORTANT]
> Pergunta comum: "O que acontece com as linhas do `try` que vêm depois do erro?" Resposta: elas não rodam. O JavaScript pula direto para o `catch` e, depois dele, continua normalmente. Por isso, coloque no `try` só o que depende da parte que pode falhar.

> [!TIP]
> **Para ir além (opcional):** você também pode criar o seu próprio erro com [[throw]]: `throw new Error("mensagem")`. É o que a função `carregarJSON` faz no `js/comum.js` (linha 44) quando o arquivo não existe (erro 404). Esse erro "sobe" até o `catch` de quem chamou a função, que é o `catch` do `mostrarProjetos`. Existe ainda o bloco `finally` (finalmente), que vem depois do `catch` e roda sempre, com erro ou sem.

## Teste rápido

```quiz
? Uma linha dentro do try deu erro. O que acontece com as linhas do try que vêm depois dela?
[ ] Elas rodam normalmente.
    -> Errada: depois do erro, o JavaScript abandona o resto do try.
[x] Elas não rodam: o JavaScript pula direto para o catch.
    -> Certa: no exemplo, a linha 9 nunca aparece no Console por causa disso.
[ ] O navegador recarrega a página.
    -> Errada: nada é recarregado. O erro só muda o caminho do código, que vai para o catch.
```

```quiz
? Se nenhuma linha do try der erro, o que acontece com o catch?
[ ] Ele roda mesmo assim, no final.
    -> Errada: o catch só roda quando alguma linha do try dá erro.
[x] Ele é pulado.
    -> Certa: o catch existe só para o caso de erro. Sem erro, o código segue depois dele.
```

```quiz
? Por que o mostrarProjetos do site usa try e catch?
[ ] Para deixar o carregamento mais rápido.
    -> Errada: o try não muda a velocidade. Ele só define o que fazer se der erro.
[ ] Porque todo código com await é obrigado a ter try.
    -> Errada: não é obrigatório. Sem try, o erro só ficaria sem tratamento e a página ficaria vazia.
[x] Para mostrar uma mensagem amigável se o arquivo de projetos não carregar.
    -> Certa: o catch mostra o erro no Console e coloca na tela uma mensagem explicando o problema.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e troque `textoRuim` por `textoBom` na linha 8. Rode: quais mensagens mudaram?
- [ ] Depois da linha 12, acrescente `console.log(erro.message);` e rode. A mensagem muda um pouco de um navegador para outro.
- [ ] Clique em **Restaurar**, apague as linhas 7, 10, 11, 12 e 13 e rode. O que acontece com o `Fim do código.`?
