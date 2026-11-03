# Buscar um arquivo com fetch e await

> [!TIP]
> **Em resumo:** o `fetch` busca um arquivo, como um JSON, e a resposta demora um pouco para chegar.
> O `await` espera essa resposta antes de seguir para a próxima linha, e só funciona dentro de uma função `async`.
> Para o `fetch` funcionar no seu computador, abra o site pelo Live Server.

## O conceito

Até agora os dados estavam escritos dentro do próprio código. No site, eles ficam em arquivos separados, como o `data/projetos.json`. Assim, para cadastrar um projeto novo, basta mexer no JSON, sem tocar no JavaScript.

Para ler esse arquivo, o JavaScript usa o [[fetch]] (buscar). O detalhe é que buscar um arquivo **leva tempo**: um pouquinho no seu computador, mais na internet. O JavaScript não fica parado esperando. O `fetch` devolve na hora uma [[Promise]] (promessa): um "vale" que vira a resposta de verdade quando ela chegar.

É aí que entra o [[await]] (aguardar). Escrito antes do `fetch`, ele diz: "espere a promessa se cumprir e me dê o resultado". O código fica na ordem em que a gente lê: busca, espera, usa.

Duas regras:

- O `await` só funciona dentro de uma função marcada com [[async]] (assíncrona).
- São **duas** esperas: uma para a resposta chegar, outra para o `.json()` transformar o texto do arquivo em objetos e listas.

## Exemplo

Este exemplo **não tem o botão Rodar**: ele precisa de um arquivo de verdade, e a área do Rodar é isolada e não acessa arquivos nem a rede. Imagine uma pasta com o arquivo `equipe.json`:

```json
[
  { "nome": "Product Owner" },
  { "nome": "Artista" },
  { "nome": "Dev" }
]
```

E, na mesma pasta, uma página com este script:

```js
async function mostrarEquipe() {
  const resposta = await fetch("equipe.json");
  const equipe = await resposta.json();

  console.log(equipe.length);
  console.log(equipe[0].nome);
}

mostrarEquipe();
```
- **L1:** cria a função `mostrarEquipe`. O `async` na frente libera o uso do `await` lá dentro.
- **L2:** o `fetch` pede o arquivo `equipe.json`. O `await` espera a resposta chegar e guarda na constante `resposta`. Essa resposta ainda não são os dados: é um "pacote" com o status e o texto do arquivo.
- **L3:** o `.json()` lê o texto do pacote e transforma em lista e objetos do JavaScript. Ele também demora, por isso tem outro `await`.
- **L5–6:** a partir daqui, `equipe` é uma lista comum, igual às da aula 1.2.
- **L9:** chama a função. Sem esta linha, nada acontece: criar uma função não a executa.

Abrindo a página pelo Live Server e olhando o Console (tecla F12), o resultado esperado é:

```text
3
Product Owner
```

### Por que precisa do Live Server

Se você abrir o HTML com dois cliques, o endereço começa com `file://` e o navegador **bloqueia** o `fetch`, por segurança: uma página aberta do disco não pode sair lendo outros arquivos do seu computador. No Console aparece um erro parecido com:

```text
Failed to fetch
```

O [[Live Server]], uma extensão do VS Code, resolve isso: ele abre a pasta como se fosse um site de verdade, num endereço como `http://127.0.0.1:5500`. No GitHub Pages, o site também é servido assim, então lá o `fetch` funciona normalmente.

> [!CAUTION]
> Esquecer o `await`. Sem ele na linha 2, `resposta` guarda a promessa, e não a resposta, e a linha 3 dá erro. Sem ele na linha 3, `equipe` também vira uma promessa: um `console.log(equipe)` mostraria algo como `Promise {<pending>}` (promessa pendente), em vez da lista. Quando vir "Promise" onde esperava dados, procure o `await` que faltou.

## Onde aparece no site

A função `carregarJSON`, no `js/comum.js` (linhas 38 a 48), faz exatamente as linhas 2 e 3 do exemplo: `await fetch(caminho)` na linha 39 e `resposta.json()` na linha 47. Como todas as páginas precisam carregar algum JSON, ela fica no arquivo comum. O `js/lista-projetos.js` usa na linha 26: `await carregarJSON("data/projetos.json")`. E, se o site for aberto direto do disco, a função `htmlErroCarregamento` (linha 60 do `comum.js`) percebe o `file:` no endereço e sugere usar o Live Server.

> [!IMPORTANT]
> Pergunta comum: "O que é código assíncrono?" É o código que começa algo demorado, como buscar um arquivo, e não trava a página enquanto espera. A resposta vem depois, e o `async`/`await` deixa esse código com cara de passo a passo.

> [!TIP]
> **Para ir além (opcional):** se o arquivo não existir, o `fetch` **não** dá erro sozinho: a resposta chega com o status 404 ("não encontrado"). Por isso o `carregarJSON` confere `resposta.ok` (linha 43) e cria um erro com `throw` quando algo deu errado. Tratar erros é assunto do Módulo 3.

## Para praticar

- [ ] Abra o `lista-projetos.html` do site com dois cliques (sem o Live Server) e veja a mensagem que aparece no lugar dos dados.
- [ ] Agora abra pelo Live Server e compare o endereço na barra do navegador.
- [ ] No VS Code, procure no projeto quantas vezes aparece `carregarJSON(`. Quais arquivos usam?
