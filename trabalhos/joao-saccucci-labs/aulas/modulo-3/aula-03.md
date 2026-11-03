# Guardar um estado no HTML: atributos data-*

> [!TIP]
> **Em resumo:** atributos que começam com `data-`, como `data-tema="papel"`, guardam informações suas dentro de uma tag.
> O JavaScript lê e muda esses valores com `dataset`, e o CSS reage a eles com seletores como `[data-tema="papel"]`.

## O conceito

Às vezes um elemento precisa "lembrar" de um estado: o tema escolhido, o tamanho da letra, qual ação um botão faz. Você poderia inventar um atributo qualquer, como `tema="papel"`, mas o HTML não conhece esse nome. Para dados seus, o HTML reservou um formato oficial: **qualquer atributo que começa com `data-`**.

```html
<div class="cartao" data-tema="escuro">...</div>
```

Esse valor serve de ponte entre o JavaScript e o CSS:

- **No JavaScript**, todo elemento tem o [[dataset]], um objeto com os atributos `data-*` dele, sem o `data-` no nome. Para ler, `cartao.dataset.tema` devolve `"escuro"`. Para mudar, `cartao.dataset.tema = "papel"`, e o atributo muda no HTML na hora.
- **No CSS**, os colchetes no seletor escolhem elementos pelo atributo: `.cartao[data-tema="papel"]` vale só para o cartão cujo `data-tema` é `papel`.

Juntando as duas coisas: o JavaScript só troca **um valor**, e o CSS cuida de toda a aparência.

## Exemplo

Clique em **Rodar** e depois clique algumas vezes no botão "Trocar tema".

```html rodar
<style>
  .cartao { padding: 16px; background: #14141F; color: #EDEDF5; }
  .cartao[data-tema="papel"] { background: #F7F1E3; color: #4A3A20; }
</style>
<div class="cartao" data-tema="escuro">
  <button type="button">Trocar tema</button>
</div>
<script>
  const cartao = document.querySelector(".cartao");
  cartao.querySelector("button").addEventListener("click", function () {
    if (cartao.dataset.tema === "papel") cartao.dataset.tema = "escuro";
    else cartao.dataset.tema = "papel";
    console.log("Tema: " + cartao.dataset.tema);
  });
</script>
```
- **L2:** o visual padrão do cartão: fundo escuro e texto claro.
- **L3:** a mesma classe, mas com o seletor de atributo `[data-tema="papel"]`. Essa regra só vale quando o atributo tem exatamente esse valor, e ela vence a da linha 2 porque é mais específica (classe + atributo).
- **L5:** o cartão começa com `data-tema="escuro"`, então só a regra da linha 2 vale.
- **L9:** acha o cartão com o [[querySelector]] (aula 1.4).
- **L10:** procura o botão **dentro** do cartão e escuta o clique com o [[addEventListener]] (aula 1.8).
- **L11–12:** lê o valor atual com `cartao.dataset.tema`. Se for `papel`, troca para `escuro`; senão, troca para `papel`. Repare que o JavaScript não mexe em nenhuma cor: ele só troca o valor do atributo, e o CSS faz o resto.
- **L13:** mostra o tema novo no Console a cada clique.

> [!CAUTION]
> Esquecer que o valor do `dataset` é sempre **texto**. Com `data-fonte="3"`, o `dataset.fonte` devolve `"3"`, entre aspas, e não o número 3. Se fizer `dataset.fonte + 1`, o resultado é `"31"`, porque o `+` junta textos. Para fazer conta, converta antes: `Number(elemento.dataset.fonte) + 1`.

## Onde aparece no site

A tela de leitura guarda o tema e o tamanho da letra na própria tag `<html>`: no `aula.html`, linha 4, ela começa com `data-tema="escuro"` e `data-fonte="3"`. No `js/aula.js`, a constante `raiz` (linha 30) é esse `<html>`, e a função `aplicarTema` (linhas 96 a 100) faz `raiz.dataset.tema = tema` na linha 97. No `css/style.css`, a seção 24 começa com o seletor `html[data-tema="papel"]` (linha 1654), que troca as cores da página inteira, e as linhas 1641 a 1645 usam `html[data-fonte="1"]` até `"5"` para os 5 tamanhos de letra. Como o atributo fica no `<html>`, um único valor muda a página toda.

> [!IMPORTANT]
> Pergunta comum: "Por que usar `data-` em vez de inventar um atributo?" Resposta: os atributos `data-*` são o jeito oficial do HTML para guardar dados próprios. O HTML continua válido, o JavaScript ganha o `dataset` pronto e não há risco de o seu nome bater com um atributo que o HTML venha a criar no futuro.

> [!TIP]
> **Para ir além (opcional):** nomes com mais de uma palavra mudam de formato no JavaScript. `data-tema-escolhido` no HTML vira `dataset.temaEscolhido`: o hífen sai e a letra seguinte fica maiúscula. O `data-*` também serve para marcar botões: os dois botões de concluir da aula têm `data-acao="concluir"` (`aula.html`, linhas 116 e 131), e o `js/aula.js` pega os dois de uma vez com `querySelectorAll('[data-acao="concluir"]')` (linha 43).

## Teste rápido

```quiz
? Com <div class="cartao" data-tema="papel">, como o JavaScript lê o valor papel?
[ ] cartao.data-tema
    -> Errada: no JavaScript, o hífen é o sinal de menos. O código tentaria fazer uma conta: cartao.data menos tema.
[x] cartao.dataset.tema
    -> Certa: o dataset junta todos os atributos data-* do elemento, sem o data- no nome.
[ ] cartao.tema
    -> Errada: o atributo se chama data-tema, e ele só aparece pelo dataset.
```

```quiz
? Qual seletor CSS vale só para o cartão com data-tema="papel"?
[ ] .cartao.papel
    -> Errada: esse seletor procura um elemento com as classes cartao e papel.
[ ] #papel
    -> Errada: o # procura um elemento com id="papel".
[x] .cartao[data-tema="papel"]
    -> Certa: os colchetes escolhem pelo atributo e pelo valor exato dele.
[ ] .cartao[papel]
    -> Errada: esse seletor procura um atributo chamado papel, que não existe no cartão.
```

```quiz
? No exemplo, o que o JavaScript muda quando o botão é clicado?
[ ] As cores de fundo e do texto, uma por uma.
    -> Errada: nenhuma cor aparece no JavaScript. As cores estão todas no CSS.
[x] Só o valor do atributo data-tema.
    -> Certa: o JavaScript troca um valor, e o CSS reage a ele mudando as cores.
[ ] A classe do cartão.
    -> Errada: a classe continua sendo cartao o tempo todo. O que muda é o data-tema.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e troque `data-tema="escuro"` por `data-tema="papel"` na linha 5. Rode: com que cor o cartão começa?
- [ ] Acrescente depois da linha 3 uma regra para `.cartao[data-tema="neon"]` com a cor que quiser. Depois mude a linha 5 para começar com `neon`.
- [ ] Abra uma aula do site, aperte F12, vá na aba Elements (Elementos) e olhe a tag `<html>` enquanto clica em **Tema papel**. O que muda?
