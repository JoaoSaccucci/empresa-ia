# Responder a um clique

> [!TIP]
> **Em resumo:** o `addEventListener("click", função)` manda o navegador executar uma função toda vez que o elemento for clicado.
> O `classList.toggle("classe")` coloca a classe se ela não estiver lá e tira se estiver.
> Juntos, eles fazem um botão abrir e fechar um menu.

## O conceito

Na aula 1.1, o botão do exemplo não fazia nada ao ser clicado. Para dar comportamento a ele, o JavaScript precisa ficar **escutando**: "quando clicarem aqui, faça isto". Cada coisa que acontece na página (um clique, uma tecla, a rolagem) é um **evento**.

Quem escuta é o [[addEventListener]] (adicionar ouvinte de evento). Ele recebe duas coisas:

```js
botao.addEventListener("click", function () {
  // o que fazer a cada clique
});
```

- `"click"` é o nome do evento.
- A `function () { ... }` é o que deve acontecer. Repare que ela **não roda agora**: o navegador guarda a função e a chama a cada clique, quantas vezes for.

E o que fazer no clique? Muitas vezes, só trocar uma classe. Todo elemento tem o [[classList]] (lista de classes), com métodos para mexer nas classes dele. O mais útil aqui é o [[toggle]] (alternar), que funciona como um interruptor: se a classe não está no elemento, ele coloca; se está, ele tira. E ainda devolve [[true]] quando colocou e `false` (falso) quando tirou.

A ideia é dividir o trabalho: o CSS diz **como** o elemento fica com a classe, e o JavaScript só decide **quando** ela entra ou sai.

## Exemplo

Clique em **Rodar** e depois clique algumas vezes no botão **Menu**.

```html rodar
<style>
  .menu { display: none; }
  .menu.aberto { display: block; }
</style>
<button type="button" id="botao">Menu</button>
<ul class="menu"><li>Início</li><li>Projetos</li></ul>

<script>
  const botao = document.querySelector("#botao");
  const menu = document.querySelector(".menu");
  botao.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    console.log("Menu aberto? " + aberto);
  });
</script>
```
- **L2:** `display: none` (exibição: nenhuma) esconde o menu. É o estado inicial.
- **L3:** o seletor `.menu.aberto`, com as duas classes coladas, vale só para quem tem **as duas** ao mesmo tempo. Nesse caso, `display: block` mostra o menu.
- **L5–6:** o botão e o menu, que começa só com a classe `menu`, então escondido.
- **L9–10:** acha o botão e o menu, como na aula 1.4.
- **L11:** começa a escutar os cliques no botão. Esta linha roda uma vez só, ao carregar a página; a função dentro dela roda a cada clique.
- **L12:** alterna a classe `aberto` no menu e guarda o resultado: `true` se ela acabou de entrar, `false` se acabou de sair.
- **L13:** mostra no Console se o menu ficou aberto. Clique várias vezes: as mensagens vão alternando entre `true` e `false`.
- **L14:** a chave `}` fecha a função e o parêntese `)` fecha o `addEventListener`, na ordem inversa em que abriram.

> [!CAUTION]
> Colocar parênteses na função passada: `botao.addEventListener("click", abrirMenu())`. Com os parênteses, a função roda **na hora**, uma vez só, e o que vai para o `addEventListener` é o resultado dela, não a função. O certo é passar só o nome, `abrirMenu`, ou escrever a função ali mesmo, como no exemplo.

## Onde aparece no site

O menu do celular funciona exatamente assim. No `js/comum.js`, a função `iniciarMenu` (linhas 15 a 27) acha o botão `.nav-toggle` e o `.nav`, escuta o clique na linha 22 e alterna a classe `is-open` na linha 24, guardando o resultado em `aberto`. O CSS mostra o menu quando ele tem essa classe (`css/style.css`, linha 374).

> [!IMPORTANT]
> Um botão que abre e fecha algo deve avisar o estado para quem usa leitor de tela. Por isso, na linha 25 do `comum.js`, o site atualiza o atributo [[aria-expanded]] ("expandido") do botão com o mesmo `aberto` do `toggle`. Saber explicar isso numa entrevista mostra cuidado com acessibilidade.

> [!TIP]
> **Para ir além (opcional):** além do `toggle`, o `classList` tem o `add` (sempre coloca), o `remove` (sempre tira) e o `contains` (só pergunta se a classe está lá e devolve `true` ou `false`). Use o `toggle` quando a mesma ação abre e fecha.

## Para praticar

- [ ] Clique em **Editar** e, dentro da função, acrescente `botao.textContent = "Clicado!";`. O que acontece com o botão no primeiro clique?
- [ ] Na linha 3, dentro das chaves, acrescente `background: lightyellow;` e rode. Quando o fundo aparece?
- [ ] No site, abra a página no Live Server, reduza a janela até aparecer o botão do menu e clique nele com o F12 aberto, na aba **Elements**. O que muda no `<nav>` a cada clique?
