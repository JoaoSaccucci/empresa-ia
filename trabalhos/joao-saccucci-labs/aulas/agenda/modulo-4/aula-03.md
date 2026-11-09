# Letra grande: tudo em rem e 125% na raiz

> [!TIP]
> **Em resumo:** os tamanhos de letra e de espaço da Agenda estão em [[rem]], que se mede pelo tamanho da letra do `<html>`.
> Com `data-letra="grande"`, a raiz vai para 125%, e tudo o que está em rem cresce 25% de uma vez.

## O conceito

`rem` quer dizer *root em*, "o tamanho da letra da raiz". `1rem` é o tamanho da letra do `<html>`. Os navegadores começam com 16px, mas a pessoa pode mudar isso nas configurações. Com 16px, as variáveis da Agenda valem:

| Variável | Valor | Com a raiz em 16px |
|---|---|---|
| `--fs-sm` | `0.875rem` | 14px |
| `--fs-base` | `1rem` | 16px |
| `--fs-lg` | `1.25rem` | 20px |

A letra grande é uma regra só:

```css
:root[data-letra="grande"] { font-size: 125%; }
```

Uma porcentagem no `<html>` é medida a partir da letra que o **navegador** usa. 125% de 16px dá 20px. Agora cada `rem` vale 20px: 14 vira 17,5, 16 vira 20 e 20 vira 25. Todo o texto cresce junto: página, formulário, janelas, avisos e faixa da semana. É como um zoom só da Agenda.

**Por que 125%, e não 20px?** Imagine alguém que enxerga mal e deixou o navegador com letra de 20px. Com `125%`, a Agenda vai para 25px. Com `20px` fixo, ela ficaria em 20px, e a letra grande não aumentaria nada para essa pessoa: a escolha dela teria sido ignorada. O zoom do navegador (Ctrl +) continua funcionando por cima dos dois.

**O que cresce e o que não cresce.** Os espaços (`--esp-*`) e a chavinha dos botões também estão em rem, então o desenho cresce com as mesmas proporções. Ficam em px de propósito: ícones, bordas finas, a área de toque mínima de 44px e os pontos de quebra das [[media query]].

**Maior também quer dizer "cabe menos".** Com 125%, a 360px, algumas partes precisaram de ajuste só com a letra grande: o cabeçalho pode quebrar em duas linhas, o texto dos botões pode quebrar, "Tempo para sair" passa a ter 2 colunas e a faixa da semana fica com 1 dia por linha abaixo de 360px.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
const tamanhos = [
  { nome: "--fs-sm", rem: 0.875 },
  { nome: "--fs-base", rem: 1 },
  { nome: "--fs-lg", rem: 1.25 }
];
function mostrar(rotulo, raiz) {
  const textos = tamanhos.map(function (t) { return t.nome + " = " + t.rem * raiz + "px"; });
  console.log(rotulo + " (raiz " + raiz + "px): " + textos.join(" | "));
}
let navegador = 16;
mostrar("Normal", navegador);
mostrar("Grande, 125%", navegador * 125 / 100);
navegador = 20;
mostrar("Grande, 125%, navegador em 20px", navegador * 125 / 100);
mostrar("Grande, 20px fixo, navegador em 20px", 20);
```
- **L1–5:** três tamanhos da Agenda, em rem.
- **L6–9:** para cada tamanho, rem × raiz dá os pixels. O `map` (aula 3.1 da Agenda) monta os textos, e [[join]] junta todos numa linha.
- **L10–11:** navegador no padrão, letra normal: `Normal (raiz 16px): --fs-sm = 14px | --fs-base = 16px | --fs-lg = 20px`.
- **L12:** 125% de 16 = 20: `Grande, 125% (raiz 20px): --fs-sm = 17.5px | --fs-base = 20px | --fs-lg = 25px`.
- **L13–14:** a pessoa deixou o navegador em 20px. 125% de 20 = 25: `... (raiz 25px): --fs-sm = 21.875px | --fs-base = 25px | --fs-lg = 31.25px`.
- **L15:** com `20px` fixo, o resultado é igual ao da linha 12: `(raiz 20px): --fs-sm = 17.5px | ...`. Os 20px escolhidos no navegador sumiram.

> [!CAUTION]
> Escrever tamanho de texto em px, como `font-size: 14px;`. Esse texto não cresce com a letra grande nem com a letra escolhida no navegador, e fica pequeno no meio de uma página grande. O testador da 3b conferiu que **nenhum** `font-size` do CSS da Agenda está em px.

## Onde aparece na Agenda

No `css/style.css`, os tamanhos de letra ficam em variáveis em rem ([style.css, linhas 44 a 49](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/css/style.css#L44-L49)), assim como os espaços ([linhas 52 a 59](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/css/style.css#L52-L59)). A letra grande é o `font-size: 125%` do `:root[data-letra="grande"]`, que também aumenta a folga do topo na rolagem (`scroll-padding-top: 8rem`), porque o cabeçalho pode ter duas linhas ([style.css, linhas 116 a 121](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/css/style.css#L116-L121)). Os ajustes para caber a 360px vêm no fim do arquivo ([style.css, linhas 2312 a 2358](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/css/style.css#L2312-L2358)).

> [!TIP]
> **Para ir além (opcional):** o testador achou um problema de gravidade alta na letra grande. No celular, "Cancelar" e "Salvar" não cabiam lado a lado, ficaram um embaixo do outro, e a barra passou a ter 148px de altura. O espaço reservado no fim da janela (`scroll-padding-bottom: 6rem`, ou seja, 120px) já não bastava, e o aviso "Não foi possível salvar o compromisso." ficava meio escondido atrás da barra. A correção foi dar `9rem` com a letra grande ([style.css, linhas 2328 a 2334](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/css/style.css#L2328-L2334)). A lição: com rem, as coisas crescem juntas, mas um botão que muda de linha cresce muito mais que 25%. Teste de verdade com a letra grande.

> [!IMPORTANT]
> Pergunta comum: "Qual a diferença entre px, em e rem?" Resposta: px é fixo. `em` se mede pela letra do próprio elemento (ou do pai) e vai se multiplicando: `1.2em` dentro de `1.2em` dá 1,44. `rem` sempre se mede pela raiz, então é previsível. Uso rem para texto e espaços, para respeitar a letra do navegador, e px para detalhes como bordas finas.

## Teste rápido

```quiz
? Navegador com letra de 16px e Letra grande ligada. Quanto vale --fs-lg: 1.25rem?
[ ] 20px
    -> Errada: 20px é o --fs-lg com a letra normal (1.25 × 16).
[x] 25px
    -> Certa: a raiz vai para 125% de 16 = 20px, e 1.25 × 20 = 25px.
[ ] 31.25px
    -> Errada: esse valor só aparece se o navegador estiver em 20px.
```

```quiz
? Por que a Agenda usa font-size: 125% na raiz, e não 20px?
[ ] Porque o CSS não aceita px no <html>.
    -> Errada: aceita, mas aí a escolha de letra do navegador seria ignorada.
[x] Para respeitar a letra que a pessoa escolheu no navegador: 125% é sempre 25% a mais do que ela já usa.
    -> Certa: com 20px fixo, quem já usava 20px não ganharia nada.
[ ] Porque porcentagem deixa a página mais rápida.
    -> Errada: a escolha não tem nada a ver com velocidade.
```

```quiz
? Com a letra grande, o que NÃO cresce na Agenda?
[ ] O espaço entre os cards (--esp-*).
    -> Errada: os espaços estão em rem e crescem 25%.
[ ] A chavinha dos botões de aparência.
    -> Errada: ela tem 2rem de largura e cresce junto.
[x] Os ícones e as bordas, que estão em px.
    -> Certa: px não depende da raiz. A área de toque de 44px também não cresce.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e troque `16` por `24` na linha 10. Rode: quanto vale `--fs-base` na primeira e na segunda linha do Console?
- [ ] Clique em **Restaurar** e acrescente, logo depois da linha 1, a linha `{ nome: "--fs-xs", rem: 0.75 },`. Rode: quanto vale `--fs-xs` em cada linha? (Confira com a tabela do design: 12px no normal e 15px no grande.)
