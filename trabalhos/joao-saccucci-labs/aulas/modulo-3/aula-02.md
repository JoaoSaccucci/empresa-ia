# Lembrar coisas no navegador: localStorage

> [!TIP]
> **Em resumo:** o `localStorage` é uma gaveta do navegador que guarda textos, mesmo depois de fechar a aba.
> Para guardar objetos e listas, transforme em texto com `JSON.stringify` e, na volta, em objeto de novo com `JSON.parse`.

## O conceito

Quando você recarrega uma página, todas as variáveis do JavaScript somem. Então como a tela de aulas lembra quais aulas você já concluiu, ou que você prefere o tema papel?

A resposta é o [[localStorage]] (armazenamento local). Pense numa gaveta com etiquetas: cada site tem a sua, e cada coisa guardada tem um nome, a **chave**. Duas funções resolvem quase tudo:

- `localStorage.setItem(chave, texto)`: guarda o texto com aquela etiqueta (*set item*, "definir item").
- `localStorage.getItem(chave)`: devolve o texto guardado (*get item*, "pegar item"). Se a chave não existe, devolve [[null]], que quer dizer "vazio, nada aqui".

Tem um detalhe importante: a gaveta **só guarda textos**. Para guardar um objeto ou uma lista, a gente converte:

- [[JSON.stringify]]: objeto ou lista **vira texto** no formato [[JSON]]. Use antes de salvar.
- [[JSON.parse]]: texto JSON **vira objeto** de novo. Use depois de ler. Você já conheceu ele na aula 3.1.

## Exemplo

Este exemplo **não tem o botão Rodar**: a área do Rodar é isolada por segurança e não tem acesso ao `localStorage`. O resultado esperado está logo abaixo, e no fim da aula você testa de verdade no Console do site.

```js
const preferencias = { tema: "papel", fonte: 4 };

// Salvar: objeto -> texto
const texto = JSON.stringify(preferencias);
localStorage.setItem("minhas-preferencias", texto);
console.log(texto);

// Ler: texto -> objeto
const salvo = localStorage.getItem("minhas-preferencias");
const lido = JSON.parse(salvo);
console.log(lido.tema);

console.log(localStorage.getItem("chave-que-nao-existe"));
```
- **L1:** um objeto com duas preferências, como as da tela de leitura.
- **L3:** linhas que começam com `//` são comentários: o JavaScript ignora, servem só para quem lê.
- **L4:** o `JSON.stringify` transforma o objeto em texto: `{"tema":"papel","fonte":4}`. Parece igual, mas agora é um texto só, entre aspas.
- **L5:** guarda esse texto na gaveta, com a etiqueta `minhas-preferencias`. Se já existia algo com essa chave, é substituído.
- **L6:** mostra o texto guardado.
- **L9:** lê de volta. O que vem é **texto**, e não objeto: `salvo.tema` daria `undefined`.
- **L10:** o `JSON.parse` transforma o texto em objeto de novo.
- **L11:** agora dá para ler com o ponto: aparece `papel`.
- **L13:** uma chave que nunca foi salva. O `getItem` não dá erro: devolve `null`.

O Console mostraria:

```text
{"tema":"papel","fonte":4}
papel
null
```

E o melhor: se você fechar a aba, abrir de novo e rodar só as linhas 9 a 11, o `papel` continua lá.

> [!CAUTION]
> Esquecer o `JSON.stringify` e salvar o objeto direto: `localStorage.setItem("prefs", { tema: "papel" })`. O navegador transforma o objeto num texto inútil, `"[object Object]"`, e o `JSON.parse` dá erro na hora de ler. Se aparecer `[object Object]` no lugar dos seus dados, foi isso.

## Onde aparece no site

O `js/comum.js` tem uma seção só para isso (seção 5, a partir da linha 106). A função `salvarProgresso` (linhas 132 a 138) faz o `JSON.stringify` e o `setItem` na linha 134. A função `lerProgresso` (linhas 122 a 129) faz o `getItem` na linha 124 e, na linha 125, devolve um valor padrão se veio `null` ou faz o `JSON.parse`. As duas ficam dentro de um `try`, como você viu na aula 3.1, porque em alguns navegadores o armazenamento está bloqueado. Todas as chaves do site começam com `jsl:` (linha 119). É assim que o `js/aula.js` guarda o tema (linha 105) e a lista de aulas concluídas (linha 138).

> [!IMPORTANT]
> "Posso guardar uma senha ou um token de login no `localStorage`?" Resposta: não é uma boa ideia. Qualquer script que rode na página consegue ler tudo o que está lá, e os dados ficam em texto simples no computador. Use o `localStorage` para preferências e progresso, coisas que não fazem mal se alguém vir.

> [!TIP]
> **Para ir além (opcional):** `localStorage.removeItem(chave)` apaga uma chave e `localStorage.clear()` apaga a gaveta inteira do site. Existe também o `sessionStorage`, que funciona igual, mas é esvaziado quando a aba fecha. E o prefixo `jsl:` tem um motivo prático: no GitHub Pages, todos os projetos publicados em `joaosaccucci.github.io` dividem a mesma gaveta, então o prefixo evita que um projeto apague os dados do outro.

## Teste rápido

```quiz
? O que localStorage.getItem("chave-que-nao-existe") devolve?
[ ] Um erro, e o código para.
    -> Errada: ler uma chave que não existe não dá erro.
[ ] undefined
    -> Errada: parece lógico, mas o getItem devolve null quando não acha nada.
[x] null
    -> Certa: null quer dizer "vazio". É por isso que o lerProgresso confere se o texto é null antes do JSON.parse.
[ ] Um texto vazio.
    -> Errada: texto vazio só aparece se alguém salvou um texto vazio naquela chave.
```

```quiz
? Por que usar JSON.stringify antes do setItem?
[x] Porque o localStorage só guarda textos.
    -> Certa: o JSON.stringify transforma o objeto ou a lista num texto que dá para converter de volta depois.
[ ] Para deixar o dado secreto.
    -> Errada: o texto JSON é bem fácil de ler. Ele não esconde nada.
[ ] Porque o setItem só aceita números.
    -> Errada: o setItem guarda textos. Números também viram texto lá dentro.
```

```quiz
? Você marcou uma aula como concluída, fechou o navegador e abriu no dia seguinte. A marca continua lá?
[x] Sim, no mesmo navegador e no mesmo site.
    -> Certa: o localStorage fica guardado até alguém apagar.
[ ] Não, o localStorage é apagado quando a aba fecha.
    -> Errada: quem é apagado ao fechar a aba é o sessionStorage.
[ ] Sim, em qualquer computador em que você abrir o site.
    -> Errada: os dados ficam só naquele navegador, naquele computador. Não vão para a internet.
```

## Para praticar

- [ ] Abra qualquer página do site, aperte F12, vá na aba Console e digite `localStorage.getItem("jsl:aulas-concluidas")`. O que apareceu?
- [ ] Ainda no Console, digite `lerProgresso("aulas-concluidas", [])`. Qual a diferença para o resultado anterior?
- [ ] Na aba Application (Aplicativo) do F12, abra Local Storage e procure as chaves que começam com `jsl:`.
