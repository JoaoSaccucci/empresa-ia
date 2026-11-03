# Dar cor e forma com CSS

> [!TIP]
> **Em resumo:** o CSS é uma lista de regras no formato `seletor { propriedade: valor; }`.
> O seletor escolhe **quem** muda; a propriedade e o valor dizem **o que** muda.
> Uma variável CSS, como `--agente-cor`, guarda um valor com nome para usar em vários lugares.

## O conceito

O HTML diz o que cada pedaço da página é (aula 1.1). Quem decide a aparência é o [[CSS]]: cor, tamanho, espaço, borda. Ele é escrito como uma lista de **regras**, e toda regra tem o mesmo formato:

```css
p {
  color: purple;
}
```

- `p` é o [[seletor]]: ele escolhe quais elementos a regra vai pintar. Aqui, todos os parágrafos.
- Entre as chaves `{ }` ficam as **declarações**. Cada uma é um par `propriedade: valor`, com dois-pontos no meio e ponto e vírgula no fim.
- `color` (cor) é a propriedade. `purple` (roxo) é o valor.

Os três seletores que você mais vai usar:

- **Nome da tag**, como `p` ou `h3`: pega todos os elementos daquela tag.
- **Ponto + classe**, como `.card`: pega os elementos com `class="card"`.
- **Cerquilha + id**, como `#titulo`: pega o único elemento com `id="titulo"`.

Guarde esses três: na próxima aula, o JavaScript usa exatamente os mesmos seletores para encontrar elementos.

## Exemplo

Clique em **Rodar** para ver as regras aplicadas.

```html rodar
<style>
  p {
    color: purple;
    font-size: 20px;
  }
  .destaque {
    background: yellow;
  }
</style>

<p>Um parágrafo roxo.</p>
<p class="destaque">Roxo e com fundo amarelo.</p>
```
- **L1:** a tag `<style>` (estilo) permite escrever CSS dentro do próprio HTML. No site, o CSS fica num arquivo separado, o `css/style.css`, mas as regras são escritas do mesmo jeito.
- **L2–5:** uma regra para todos os `<p>`. Ela tem duas declarações: `color` muda a cor do texto e `font-size` (tamanho da fonte) muda o tamanho da letra para 20 pixels.
- **L6–8:** uma regra para quem tem a classe `destaque`. O ponto antes do nome avisa "isto é uma classe". `background` (fundo) pinta o fundo de amarelo.
- **L11:** um parágrafo comum: só a regra do `p` vale para ele.
- **L12:** este parágrafo tem a classe `destaque`, então **as duas** regras valem para ele. Ele fica roxo, grande e com fundo amarelo.

### Uma variável para a cor de cada agente

Às vezes o mesmo valor aparece em vários lugares, como a cor de um agente, que pinta a borda e o título do card. Em vez de repetir a cor, você cria uma **variável CSS**: um nome que começa com dois hífens, como `--agente-cor`. Para usar o valor, escreva `var(--agente-cor)`.

```html rodar
<style>
  .card {
    --agente-cor: gray;
    border-left: 6px solid var(--agente-cor);
    padding: 8px 12px;
    margin-bottom: 8px;
  }
  h3 {
    color: var(--agente-cor);
  }
</style>

<div class="card" style="--agente-cor: #0097A7"><h3>Product Owner</h3></div>
<div class="card" style="--agente-cor: #C2189B"><h3>Dev</h3></div>
<div class="card"><h3>Sem cor definida</h3></div>
```
- **L3:** cria a variável `--agente-cor` com o valor `gray` (cinza). Ele é o valor padrão, usado quando ninguém escolher outro.
- **L4:** `border-left` (borda da esquerda) recebe três valores separados por espaço: espessura, estilo (`solid`, contínua) e cor. A cor vem de `var(--agente-cor)`, que lê o valor da variável.
- **L5–6:** `padding` é o espaço **dentro** do card, entre a borda e o texto. `margin-bottom` é o espaço **fora**, embaixo, separando um card do próximo.
- **L8–10:** o título `<h3>` também usa a variável. Ele fica dentro do card, e variáveis CSS passam de pai para filho: o `h3` enxerga o valor do card em que está.
- **L13–14:** o atributo `style` escreve CSS direto no elemento. Aqui ele troca o valor da variável só naquele card. Uma única regra `.card` gera dois cards de cores diferentes.
- **L15:** este card não tem `style`, então vale o padrão da linha 3: cinza.

> [!CAUTION]
> Esquecer o ponto e vírgula ou os dois-pontos. Em `color purple;` (sem os dois-pontos), o navegador não mostra erro: ele só ignora a declaração quebrada, e a cor não muda. Quando um estilo "não pega", confira primeiro a pontuação e depois se o seletor tem o ponto da classe (`.destaque`, não `destaque`).

## Onde aparece no site

A seção 1 do `css/style.css` (linhas 8 a 78) é só de variáveis, como `--cor-fundo` e `--cor-ciano`, todas dentro de `:root` (linha 12), que quer dizer "a página inteira". A `--agente-cor` ganha um valor padrão na linha 36. Os cards da Equipe usam essa variável na borda de cima (linha 739) e no texto do id da unidade (linha 767), e o `js/equipe.js` escreve `style="--agente-cor: ..."` em cada card (linha 33) com a cor que vem do `agentes.json`, igual às linhas 13 e 14 do exemplo.

> [!IMPORTANT]
> Pergunta comum: "Se duas regras mudam a mesma propriedade, qual vence?" Resumindo: o `style` escrito no elemento vence a classe, a classe vence o nome da tag e, entre regras do mesmo tipo, vale a que vem por último. Por isso, no exemplo, o `style` do card venceu o `gray` da classe `.card`.

> [!TIP]
> **Para ir além (opcional):** o `var()` aceita um segundo valor, usado se a variável não existir: `var(--agente-cor, gray)`. A regra de "quem vence" do quadro acima tem um nome, **especificidade**, e vale pesquisar quando você estiver mais à vontade com o CSS.

## Para praticar

- [ ] No primeiro exemplo, clique em **Editar**, troque `purple` por `green` na linha 3 e rode de novo.
- [ ] No segundo exemplo, acrescente um card do Professor com `style="--agente-cor: #2E7D32"`.
- [ ] Apague o `--agente-cor: gray;` da linha 3 do segundo exemplo e rode. O que aconteceu com o último card? Depois clique em **Restaurar**.
