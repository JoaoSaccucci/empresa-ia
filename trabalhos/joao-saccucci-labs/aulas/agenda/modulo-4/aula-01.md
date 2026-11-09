# Um atributo no `<html>` troca o tema inteiro

> [!TIP]
> **Em resumo:** as regras do CSS da Agenda nunca escrevem uma cor direto: elas leem variáveis, como `var(--cor-fundo)`.
> O tema claro só dá outros valores a essas variáveis quando o `<html>` tem `data-tema="claro"`. Um atributo muda a página toda.

## O conceito

Na Entrega 3b, o botão **"Tema claro"** troca a Agenda inteira de cor: cabeçalho, cards, faixa da semana, formulário, janelas e avisos. São centenas de regras CSS. Mesmo assim, o JavaScript faz uma coisa só: põe ou tira o atributo `data-tema="claro"` na tag `<html>`.

Isso funciona juntando duas ideias que você já viu na Labs:

1. **[[variável CSS]]** (aula 1.3 da Labs): um nome que começa com `--` e guarda um valor. Na Agenda, todas as cores ficam no bloco `:root` (*root* = "raiz", a tag `<html>`), como `--cor-fundo: #0F0B14`. As regras usam `var(--cor-fundo)` e nunca a cor direto.
2. **Atributo `data-*` como estado** (aula 3.3 da Labs): o CSS reage a `[data-tema="claro"]`.

Juntando as duas: o CSS tem um segundo bloco, `:root[data-tema="claro"] { --cor-fundo: #F7F1E8; ... }`, que **dá valores novos às mesmas variáveis**. Quando o atributo aparece, esse bloco também passa a valer e, por ser mais específico, vence. As regras continuam as mesmas; o que muda é o valor que cada `var()` lê. Sem o atributo, vale o tema escuro, que é o padrão.

Três detalhes da Agenda:

- **Uma variável, vários usos.** `--cor-ambar` é cor de texto (as horas) e também cor de fundo (botão "Novo compromisso"). No escuro, o âmbar é claro e o texto em cima dele é escuro (`--cor-sobre-cor: #1A1205`). No papel creme, um âmbar claro quase não aparece. Por isso, no tema claro, ele vira caramelo (`#8A4A00`) e o `--cor-sobre-cor` vira creme (`#FFF8EE`). Basta trocar as duas variáveis para todos os botões cheios ficarem certos.
- **[[color-scheme]]** ("esquema de cores"): diz ao navegador se a página é clara (`light`) ou escura (`dark`). Assim os campos nativos de data e hora e a barra de rolagem acompanham o tema.
- **O que não é variável precisa de regra própria:** os brilhos do fundo, o fundo atrás das janelas e o check da caixa marcada ganham regras `:root[data-tema="claro"] ...` só para eles.

## Exemplo

Aqui o JavaScript imita o navegador: as "regras" só guardam o **nome** da variável, e a tabela de valores muda com o tema. Clique em **Rodar** e confira o Console.

```js rodar
const escuro = { "--cor-fundo": "#0F0B14", "--cor-texto": "#F5EEE6", "--cor-ambar": "#FFB547", "--cor-sobre-cor": "#1A1205" };
const claro = { "--cor-fundo": "#F7F1E8", "--cor-texto": "#23182B", "--cor-ambar": "#8A4A00", "--cor-sobre-cor": "#FFF8EE" };
const regras = [
  { parte: "Página", fundo: "--cor-fundo", texto: "--cor-texto" },
  { parte: "Botão Novo", fundo: "--cor-ambar", texto: "--cor-sobre-cor" }
];
function pintar(dataTema) {
  console.log("data-tema =", dataTema);
  const variaveis = dataTema === "claro" ? Object.assign({}, escuro, claro) : escuro;
  regras.forEach(function (r) {
    console.log(r.parte + ": fundo " + variaveis[r.fundo] + ", texto " + variaveis[r.texto]);
  });
}
pintar(null);
pintar("claro");
```
- **L1–2:** os valores de quatro variáveis em cada tema, os mesmos do `style.css` da Agenda.
- **L3–6:** duas "regras". Elas guardam só o nome da variável, nunca uma cor, como um `background: var(--cor-ambar)`.
- **L7:** `dataTema` faz o papel do atributo `data-tema` do `<html>`.
- **L9:** só `"claro"` escolhe o tema claro; qualquer outra coisa, inclusive `null` (sem atributo), fica no escuro ([[operador ternário]]). Como no CSS, o claro vale **por cima** do escuro: [[Object.assign]] (aula 3.2 da Agenda) começa com tudo do escuro e coloca por cima o que o claro redefine.
- **L10–12:** para cada regra, busca o valor da variável. `variaveis[r.fundo]` é o mesmo que `variaveis["--cor-fundo"]`.
- **L14:** sem atributo, o Console mostra `Página: fundo #0F0B14, texto #F5EEE6` e `Botão Novo: fundo #FFB547, texto #1A1205`.
- **L15:** com `"claro"`, aparecem `Página: fundo #F7F1E8, texto #23182B` e `Botão Novo: fundo #8A4A00, texto #FFF8EE`. As regras das linhas 3 a 6 não mudaram nada.

> [!CAUTION]
> Escrever uma cor direto numa regra nova, como `color: #FFB547;`. No tema escuro fica perfeito. No claro, essa parte continua âmbar claro sobre o papel creme e fica quase ilegível. Toda cor vai por `var(--...)`. Se uma parte precisa mesmo de um valor fixo, ela ganha também a sua regra `:root[data-tema="claro"]`.

## Onde aparece na Agenda

No `css/style.css`, as variáveis do tema escuro ficam no `:root` ([style.css, linhas 11 a 74](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/css/style.css#L11-L74)), e o bloco do tema claro redefine todas as de cor ([style.css, linhas 84 a 114](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/css/style.css#L84-L114)). O que não é variável ganha regras próprias ([style.css, linhas 2269 a 2302](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/css/style.css#L2269-L2302)). No `js/app.js`, a `aplicarPreferencias` é a **única** função que muda a aparência: ela põe ou tira o atributo (`setAttribute` / `removeAttribute`) e acerta o [[aria-pressed]] do botão no mesmo momento, para os dois nunca ficarem diferentes ([app.js, linhas 2190 a 2209](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/js/app.js#L2190-L2209)).

> [!TIP]
> **Para ir além (opcional):** muitos elementos da Agenda têm `transition` de cor (180ms). Na troca de tema, cada parte mudaria no seu ritmo, "em ondas". Por isso a `trocarPreferencia` põe a classe `trocando-tema` no `<html>`, troca o tema e tira a classe dois quadros depois, com um [[requestAnimationFrame]] dentro do outro ([app.js, linhas 2219 a 2230](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/js/app.js#L2219-L2230)). Enquanto a classe está lá, o CSS desliga as transições com `transition: none !important` ([style.css, linhas 2304 a 2310](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/css/style.css#L2304-L2310)). O `!important` ("importante") faz essa declaração vencer as outras.

> [!IMPORTANT]
> Pergunta comum: "Como você faria um tema claro e escuro?" Resposta: coloco todas as cores em variáveis CSS na raiz e uso `var()` em todas as regras. O tema alternativo é um bloco `:root[data-tema="claro"]` que redefine as mesmas variáveis. O JavaScript só põe ou tira o atributo no `<html>`, e o `color-scheme` faz os campos nativos acompanharem. Também confiro o contraste dos dois temas.

## Teste rápido

```quiz
? No tema claro, por que o botão "Novo compromisso" fica caramelo com texto creme sem ganhar uma regra nova?
[ ] Porque o JavaScript pinta cada botão de novo quando o tema muda.
    -> Errada: o JavaScript só troca o atributo do <html>. Ele não mexe em nenhuma cor.
[x] Porque a regra dele usa var(--cor-ambar) e var(--cor-sobre-cor), e o bloco do tema claro deu outros valores a essas variáveis.
    -> Certa: a regra é a mesma; muda o valor que o var() lê.
[ ] Porque o navegador inverte as cores sozinho com o color-scheme.
    -> Errada: o color-scheme só cuida dos campos nativos e da barra de rolagem. As cores da página vêm das variáveis.
```

```quiz
? Se o <html> estivesse com data-tema="azul", qual tema apareceria?
[ ] O claro, porque existe um data-tema.
    -> Errada: o bloco do claro só vale para o valor exato "claro".
[x] O escuro, porque nenhum bloco combina com "azul" e valem as variáveis do :root.
    -> Certa: sem um bloco que combine, ficam os valores padrão, que são os do escuro.
[ ] Nenhum: a página fica sem cores.
    -> Errada: as variáveis do :root valem sempre. O bloco do claro só muda alguns valores por cima delas.
```

## Para praticar

- [ ] No exemplo, clique em **Editar**. No fim da linha 1, antes do `}`, acrescente `, "--cor-perigo": "#FF7B7B"`. Depois da linha 4, acrescente `{ parte: "Erro", fundo: "--cor-fundo", texto: "--cor-perigo" },`. Rode: que cor o erro tem no tema claro? Por que o bloco claro da Agenda redefine **todas** as variáveis de cor?
- [ ] Clique em **Restaurar** e troque `pintar("claro")` por `pintar("Claro")` na linha 15. Rode: qual tema apareceu? Por quê?
