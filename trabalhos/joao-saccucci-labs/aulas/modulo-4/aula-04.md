# Botão que fica ligado: aria-pressed

> [!TIP]
> **Em resumo:** num `<button>`, o atributo [[aria-pressed]] diz se ele está ligado (`"true"`) ou desligado (`"false"`).
> O leitor de tela anuncia esse estado, e o CSS pode usar o mesmo atributo para o visual.

## O conceito

Na aba Aulas, o botão do projeto aberto aparece diferente, com borda ciano mais grossa e uma barra embaixo. Quem enxerga a tela percebe na hora qual está escolhido. Mas quem usa um **leitor de tela** (programa que lê a página em voz alta) não vê borda nenhuma. Se a única diferença fosse uma classe CSS, essa pessoa ouviria só "Agenda, botão" nos dois casos.

O `aria-pressed` resolve isso. Com ele, o `<button>` vira um **botão de alternância**: um botão que fica apertado ou solto, como o botão de negrito de um editor de texto. O leitor de tela passa a dizer algo como "Agenda, 3 de 8 concluídas, botão, pressionado".

Regras do jeito certo:

1. O valor é **texto**: `"true"` ou `"false"`. Por isso o código faz `String(condicao)` no `setAttribute`.
2. O botão começa com `aria-pressed="false"`, e não sem o atributo. Sem o atributo, ele é um botão comum, e o leitor de tela não sabe que dá para ligar e desligar.
3. Num grupo em que só um pode estar escolhido (como os projetos), cada clique atualiza todos os botões: o clicado fica `"true"` e os outros ficam `"false"`.
4. O CSS lê o mesmo atributo, com o [[seletor]] `[aria-pressed="true"]`. Assim existe **uma** fonte da verdade, sem uma classe `ativo` que poderia ficar diferente do atributo.

Ele tem parentes que você já encontrou: o [[aria-expanded]] do menu (aberto ou fechado) e o `aria-current="page"`, que marca no menu a página em que você está.

## Exemplo

Este exemplo usa HTML, então o resultado aparece na tela. Clique em **Rodar**, depois clique nos botões e confira o Console.

```html rodar
<style>button[aria-pressed="true"] { border: 3px solid teal; font-weight: bold; }</style>
<div role="group" aria-label="Escolha o projeto">
  <button type="button" aria-pressed="true">Agenda</button>
  <button type="button" aria-pressed="false">Labs</button>
</div>
<script>
  document.addEventListener("click", function (evento) {
    const clicado = evento.target.closest("button");
    if (!clicado) return;
    document.querySelectorAll("button").forEach(function (botao) {
      botao.setAttribute("aria-pressed", String(botao === clicado));
    });
    console.log(clicado.textContent, "agora está pressionado");
  });
</script>
```
- **L1:** o CSS deixa com borda e em negrito o botão que tem `aria-pressed="true"`. Não existe classe `ativo`: o visual segue o atributo.
- **L2:** `role="group"` com `aria-label` junta os botões e dá um nome ao grupo, que o leitor de tela anuncia ao chegar nele.
- **L3–4:** dois `<button>` de verdade. O primeiro começa ligado; o segundo começa desligado, com `"false"`, e não sem o atributo.
- **L7:** um ouvinte só, na página inteira, serve para todos os botões.
- **L8:** o [[closest]] sobe a partir do que foi clicado até achar um `button`. Se o clique foi fora de um botão, ele devolve `null`...
- **L9:** ...e a função para ali.
- **L10–12:** passa por todos os botões. Aqui `document.querySelectorAll("button")` serve porque o exemplo está sozinho na página; no site, a busca fica restrita ao grupo (`listaEscolha.querySelectorAll(".escolha-botao")`), para não pegar outros botões. `botao === clicado` só dá [[true]] para o botão clicado, e o `String(...)` transforma o resultado em `"true"` ou `"false"`.
- **L13:** mostra no Console qual botão foi ligado. Clique em Labs: a borda passa para ele e aparece `Labs agora está pressionado`.

> [!CAUTION]
> Mudar só a classe CSS (`classList.add("ativo")`) e esquecer o atributo: a tela fica certa, mas o leitor de tela não sabe qual botão está escolhido. Outro erro é usar `aria-pressed` num `<div>` ou `<span>`. Sem ser `<button>`, o elemento não recebe foco pelo Tab nem responde ao Enter e ao Espaço.

## Onde aparece no site

No `aulas.html`, os botões ficam num grupo com `role="group"` e o nome "Escolha o projeto" ([aulas.html, linhas 45 a 52](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/aulas.html#L45-L52)). A `criarBotoes` cria cada botão com `aria-pressed="false"` ([aulas.js, linhas 248 a 263](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L248-L263)). A `marcarBotao` deixa só o do projeto aberto com `"true"`, usando o mesmo `String(...)` do exemplo ([linhas 280 a 285](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L280-L285)). O visual do selecionado vem do CSS `[aria-pressed="true"]` ([style.css, linhas 4112 a 4121](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/css/style.css#L4112-L4121)).

> [!TIP]
> **Para ir além (opcional):** a Etapa 7 teve mais dois cuidados com quem usa leitor de tela. Os botões são criados **uma vez só**, e ao trocar de projeto só o `aria-pressed` muda ([aulas.js, linhas 236 a 241](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L236-L241)): se os botões fossem recriados, o foco do teclado se perderia. E a área da lista **não** tem [[aria-live]], o atributo que faz o leitor de tela anunciar sozinho tudo o que muda numa área. Com ele, a cada troca o leitor leria a lista inteira de aulas. O "pressionado" já avisa o que mudou.

> [!IMPORTANT]
> Pergunta comum: "Como você deixa acessível um botão de ligar e desligar?" Resposta: uso um `<button>` de verdade, que já vem com foco e teclado. Atualizo o `aria-pressed="true"` ou `"false"` pelo JavaScript e estilizo pelo próprio atributo no CSS, para o visual e o leitor de tela nunca discordarem. E o selecionado se diferencia por mais do que a cor (borda, peso da letra, uma marca).

## Teste rápido

```quiz
? Qual destes botões o leitor de tela anuncia como "pressionado"?
[ ] <button class="ativo">Agenda</button>
    -> Errada: a classe só muda o visual. O leitor de tela não lê classes CSS.
[x] <button aria-pressed="true">Agenda</button>
    -> Certa: o aria-pressed="true" diz que o botão de alternância está ligado.
[ ] <div aria-pressed="true">Agenda</div>
    -> Errada: o aria-pressed é para botões. Um div nem recebe foco pelo Tab.
```

```quiz
? O que acontece se um botão de alternância começar SEM o atributo aria-pressed?
[ ] O leitor de tela entende que ele está desligado.
    -> Errada: sem o atributo, ele é tratado como um botão comum, sem estado.
[x] O leitor de tela trata como um botão comum e não avisa que dá para ligar e desligar.
    -> Certa: por isso a Labs cria todos os botões já com aria-pressed="false".
[ ] O botão deixa de funcionar com o teclado.
    -> Errada: o teclado continua funcionando, porque é um button. O que se perde é o estado.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e acrescente depois da linha 4 um terceiro botão: `<button type="button" aria-pressed="false">Outras aulas</button>`. Rode e clique nele: só ele fica com a borda?
- [ ] Clique em **Restaurar**. Na linha 11, troque `String(botao === clicado)` por `botao === clicado ? "true" : "false"`. O resultado muda? (Dica: é o [[operador ternário]].)
- [ ] Clique em **Restaurar**. Na linha 1, troque `[aria-pressed="true"]` por `[aria-pressed]` e rode. Por que agora os dois botões ficam com borda?
