# Uma página só para vários projetos

> [!TIP]
> **Em resumo:** um endereço pode levar informações depois do `?`, como `?id=joao-saccucci-labs`.
> O `URLSearchParams` lê essa parte, e o `.get("id")` devolve o valor.
> Assim, uma única página de detalhe serve para qualquer projeto.

## O conceito

Imagine o site com 20 projetos. Criar 20 páginas de detalhe, uma para cada, seria muito trabalho, e qualquer mudança no layout teria que ser feita 20 vezes. A saída é ter **uma** página só, que descobre pelo endereço qual projeto deve mostrar.

Repare num endereço do site:

```text
detalhe-projeto.html?id=joao-saccucci-labs&aba=equipe
```

- Tudo até o `?` é a página: `detalhe-projeto.html`.
- Depois do `?` vem a [[query string]] (texto de consulta): pares no formato `nome=valor`.
- O `&` separa um par do outro. Aqui há dois: `id` vale `joao-saccucci-labs` e `aba` vale `equipe`.

Para ler esses pares, o JavaScript tem o [[URLSearchParams]] (parâmetros de busca da URL). Você entrega a query string para ele e depois pede cada valor pelo nome, com `.get("nome")`. Se o nome não existir no endereço, o `.get` devolve `null`, o mesmo "nada encontrado" da aula 1.4.

No site, a query string vem de `window.location.search`, que guarda a parte do endereço a partir do `?`. Na área do Rodar não existe endereço de verdade, então o exemplo usa um texto fixo, escrito à mão. O funcionamento é o mesmo.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
const busca = "?id=joao-saccucci-labs&aba=equipe";
const parametros = new URLSearchParams(busca);

console.log(parametros.get("id"));
console.log(parametros.get("aba"));
console.log(parametros.get("cor"));

const id = parametros.get("id");
if (id === null) {
  console.log("Nenhum projeto escolhido.");
} else {
  console.log("Abrindo o projeto: " + id);
}
```
- **L1:** a query string, como ela apareceria no endereço. No site, este texto viria de `window.location.search`.
- **L2:** cria o leitor de parâmetros. O `new` (novo) cria um objeto a partir de uma "fôrma" pronta do JavaScript, o `URLSearchParams`.
- **L4:** pede o valor de `id`. Aparece `joao-saccucci-labs`, sem o `id=` e sem o `?`.
- **L5:** pede o valor de `aba`. Aparece `equipe`.
- **L6:** `cor` não existe no endereço, então o resultado é `null`.
- **L8:** guarda o id numa constante, para usar mais de uma vez.
- **L9–13:** o [[if]] confere se veio um id. Se não veio, mostra um aviso; se veio, o [[else]] (senão) segue com o projeto. É assim que a página se protege de um endereço sem `?id=`.

> [!CAUTION]
> Pedir o nome errado ou com diferença de maiúscula. `parametros.get("ID")` devolve `null` quando o endereço tem `id=`, porque para o `URLSearchParams` são nomes diferentes. Outro erro é procurar o valor com o `?` ou o `=` junto: o `.get` já entrega só o valor.

## Onde aparece no site

A outra metade dessa história você já viu na aula 1.5: o `js/lista-projetos.js` monta o link de cada card com `href="detalhe-projeto.html?id=..."` (linha 13). Do outro lado, o `js/detalhe-projeto.js` lê esse id na linha 10, com `new URLSearchParams(window.location.search).get("id")`. Depois, na linha 71, usa o [[find]] para achar na lista o projeto com aquele id e, se não achar (linhas 73 a 76), mostra a mensagem "Projeto não encontrado".

> [!IMPORTANT]
> Pergunta comum: "Como passar uma informação de uma página para outra sem servidor?" A resposta mais simples é pela query string: a primeira página monta o link com `?nome=valor`, e a segunda lê com `URLSearchParams`. Para guardar algo por mais tempo, existe o `localStorage`, que você vê no Módulo 3.

> [!TIP]
> **Para ir além (opcional):** endereços não aceitam qualquer caractere. Espaços e acentos viram códigos, como `%20` no lugar do espaço. Quem monta o link usa o [[encodeURIComponent]] para fazer essa troca (é o que o `lista-projetos.js` faz na linha 13), e o `.get` desfaz sozinho na hora de ler.

## Teste rápido

```quiz
? No endereço pagina.html?id=dev&cor=magenta, qual é a query string?
[ ] pagina.html
    -> Errada: essa é a página. A query string vem depois dela.
[x] ?id=dev&cor=magenta
    -> Certa: a query string é a parte do endereço a partir do ponto de interrogação.
[ ] dev
    -> Errada: dev é só o valor do parâmetro id, uma parte da query string.
```

```quiz
? Com parametros = new URLSearchParams("?id=dev"), o que parametros.get("aba") devolve?
[ ] Um erro, porque aba não existe.
    -> Errada: pedir um nome que não está no endereço não quebra o código.
[ ] undefined
    -> Errada: o URLSearchParams usa outro valor para dizer que não encontrou o nome.
[x] null
    -> Certa: quando o nome não está na query string, o get devolve null.
```

```quiz
? Por que o site usa uma só página de detalhe com ?id= em vez de uma página por projeto?
[x] Porque uma página só, que lê o id, serve para qualquer projeto, inclusive os que forem cadastrados depois.
    -> Certa: basta acrescentar o projeto no JSON. A página de detalhe é a mesma para todos.
[ ] Porque o GitHub Pages não aceita mais de uma página HTML.
    -> Errada: o GitHub Pages aceita quantas páginas você quiser. O motivo é evitar repetir o mesmo HTML.
[ ] Porque o navegador abre páginas com ?id= mais rápido.
    -> Errada: a query string não muda a velocidade. Ela só leva uma informação para a página.
```

## Para praticar

- [ ] Clique em **Editar** e troque a linha 1 por `"?aba=equipe"`. Qual mensagem aparece no fim? Depois clique em **Restaurar**.
- [ ] Acrescente `&status=planejado` no fim do texto da linha 1 e mostre esse valor com `console.log`.
- [ ] Com o site aberto no Live Server, entre no detalhe de um projeto e troque, na barra de endereço, o id por `teste`. O que a página mostra?
