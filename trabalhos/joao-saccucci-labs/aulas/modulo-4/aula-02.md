# Mudar o endereço sem criar passo no Voltar

> [!TIP]
> **Em resumo:** `history.pushState` e `history.replaceState` mudam o endereço sem recarregar a página.
> O `pushState` cria um passo novo no botão Voltar; o `replaceState` troca o passo atual.
> A aba Aulas usa o `replaceState`, para o Voltar levar à página de onde você veio.

## O conceito

Cada aba do navegador guarda uma lista dos endereços por onde você passou: é ela que o botão **Voltar** percorre. O JavaScript mexe nessa lista pelo objeto [[history]] (histórico).

Na Etapa 7, quando você clica num botão de projeto, o endereço muda para `aulas.html#agenda` (ou `#joao-saccucci-labs`). Assim, se você recarregar ou guardar o link, volta para o mesmo projeto. Há três jeitos de mudar o endereço, e eles se comportam diferente:

| Jeito | Recarrega a página? | Passo novo no Voltar? | Dispara o `hashchange`? |
|---|---|---|---|
| `location.hash = "agenda"` | não | sim | sim |
| `history.pushState(null, "", "#agenda")` | não | sim | não |
| `history.replaceState(null, "", "#agenda")` | não | **não** | não |

- O [[pushState]] ("empurrar estado") **acrescenta** um passo, como pôr mais um prato no alto da pilha.
- O [[replaceState]] ("substituir estado") **troca** o passo atual por outro. A lista continua do mesmo tamanho.

Os dois recebem três valores. O primeiro é um "estado", dados guardados junto com o passo (a Labs não usa, então passa `null`). O segundo é um título que hoje os navegadores ignoram (`""`). O terceiro é o endereço novo.

Por que a Labs escolheu o `replaceState`? Imagine que você veio do Início, abriu as Aulas e trocou de projeto cinco vezes. Com `pushState`, você teria que apertar Voltar cinco vezes para sair da aba Aulas. Com `replaceState`, um Voltar só já leva ao Início. Essa foi a decisão 5 do product-owner nos requisitos.

## Exemplo

O Rodar não tem um histórico de verdade, então uma lista faz o papel dele. Clique em **Rodar** e confira o Console.

```js rodar
const historico = ["index.html"];
function simularPush(endereco) {
  historico.push(endereco);
}
function simularReplace(endereco) {
  historico[historico.length - 1] = endereco;
}
simularPush("aulas.html#agenda");
simularReplace("aulas.html#joao-saccucci-labs");
simularReplace("aulas.html#agenda");
console.log("Com replace:", historico.join(" > "));
console.log("Voltar leva para:", historico[historico.length - 2]);
simularPush("aulas.html#joao-saccucci-labs");
console.log("Com push:", historico.join(" > "));
console.log("Voltar leva para:", historico[historico.length - 2]);
```
- **L1:** o "histórico" começa no Início.
- **L2–4:** faz o papel do `pushState`: acrescenta o endereço no fim da lista com [[push]].
- **L5–7:** faz o papel do `replaceState`: troca o **último** item, que é a página atual. `historico.length - 1` é a posição do último.
- **L8:** você clica em Aulas no menu. Abrir outra página cria um passo, como um push.
- **L9–10:** você troca de projeto duas vezes pelos botões. Com replace, a lista não cresce.
- **L11:** o [[join]] junta a lista num texto só: `index.html > aulas.html#agenda`. São só 2 passos.
- **L12:** o passo anterior ao atual é `index.html`: o Voltar leva ao Início.
- **L13:** e se a troca de projeto usasse push?
- **L14–15:** a lista ganha mais um passo, e o Voltar agora leva para `aulas.html#agenda`. Você continuaria preso na aba Aulas.

> [!CAUTION]
> Achar que o `pushState` ou o `replaceState` disparam o `hashchange`. Eles **não** disparam: só mudam o endereço. Por isso, ao clicar num botão, a aba Aulas primeiro troca a lista (`abrirProjeto`) e só depois ajusta o endereço (`trocarEndereco`). Se o código esperasse o `hashchange` para trocar a lista, nada aconteceria.

## Onde aparece no site

A função `trocarEndereco`, no `js/aulas.js`, tem uma linha só, com `history.replaceState`, e um comentário explicando a escolha ([aulas.js, linhas 320 a 325](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L320-L325)). Ela é chamada no clique dos botões, logo depois de abrir o projeto ([linhas 401 a 410](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L401-L410)). Também é chamada quando a página abre sem `#` (ou com um `#` que não serve), para o endereço passar a mostrar o projeto aberto ([linhas 347 a 357](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L347-L357)). A decisão está nos requisitos ([requisitos.md, linha 1013](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/docs/requisitos.md?plain=1#L1013)).

> [!TIP]
> **Para ir além (opcional):** quando a pessoa aperta Voltar entre passos criados com `pushState`, o navegador avisa com o evento `popstate`. É assim que sites de "página única" (como os feitos com React Router) trocam de tela sem recarregar. E um detalhe que o exemplo simplificou: se você volta e depois faz um `pushState`, os passos que estavam "à frente" (os do botão Avançar) são apagados.

> [!IMPORTANT]
> Pergunta comum: "Qual a diferença entre `pushState` e `replaceState`?" Resposta: os dois mudam o endereço sem recarregar a página e sem disparar o `hashchange`. O `pushState` cria um passo novo no Voltar, e eu uso quando a pessoa sente que foi para outra "tela". O `replaceState` troca o passo atual, e eu uso para ajustes no mesmo lugar, como um filtro, uma aba ou a escolha de projeto da Labs.

## Teste rápido

```quiz
? Você veio do Início, abriu a aba Aulas e trocou de projeto três vezes pelos botões. O que acontece ao apertar Voltar?
[ ] Volta para o projeto anterior.
    -> Errada: seria assim com pushState. A Labs usa replaceState, que não cria passos novos.
[x] Volta para o Início.
    -> Certa: as trocas só substituíram o passo atual, então o passo anterior continua sendo o Início.
[ ] Nada, porque a aba Aulas bloqueia o Voltar.
    -> Errada: o replaceState não bloqueia nada. Ele só não cria passo novo.
```

```quiz
? Qual destes jeitos de mudar o endereço dispara o evento hashchange?
[x] location.hash = "agenda"
    -> Certa: trocar o location.hash dispara o hashchange e ainda cria um passo no Voltar.
[ ] history.replaceState(null, "", "#agenda")
    -> Errada: o replaceState só troca o endereço, sem avisar ninguém.
[ ] history.pushState(null, "", "#agenda")
    -> Errada: o pushState também muda o endereço em silêncio. Ele só cria o passo no Voltar.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e troque `simularReplace` por `simularPush` nas linhas 9 e 10. Rode: quantos passos o histórico tem agora? Para onde o Voltar da linha 12 leva?
- [ ] Clique em **Restaurar** e acrescente no fim `simularReplace("sobre.html");` e `console.log(historico.join(" > "));`. Rode: qual endereço sumiu da lista?
