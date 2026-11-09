# Aplicar o tema antes de a página aparecer

> [!TIP]
> **Em resumo:** um script pequeno no `<head>` lê a preferência salva e põe o atributo no `<html>` antes de a tela ser pintada. Por isso a Agenda nunca abre piscando no tema errado.
> Tudo fica dentro de um `try`, e só `"claro"` e `"grande"` ligam alguma coisa.

## O conceito

O navegador lê o HTML de cima para baixo. Quando encontra um `<script>`, ele para, roda o script e só depois continua. O `app.js` da Agenda fica no **fim** do `<body>`. Se o tema fosse aplicado só lá, o navegador poderia já ter pintado a página no tema escuro, e quem escolheu o claro veria um "piscar" escuro toda vez que abrisse a Agenda.

Por isso a Entrega 3b colocou um script [[inline]] (escrito ali mesmo, sem `src`) no `<head>`, **antes** das fontes e do `style.css`. Nesse momento o `<body>` ainda nem existe, mas o `<html>` já existe: é o `document.`[[documentElement]]. O script só faz [[setAttribute]] nele. Quando o CSS chega, o atributo já está lá, e a primeira pintura sai no tema certo. O mesmo script também ajusta as duas `<meta>` de cor (o `color-scheme` e a cor da barra do navegador no celular).

Esse script tem três cuidados:

1. **Ser pequeno.** Enquanto ele roda, a página espera. São poucas linhas, sem `fetch`.
2. **Nunca quebrar.** O [[localStorage]] pode estar bloqueado, e só de tentar ler ele lança um erro. O texto salvo também pode estar estragado, e aí o [[JSON.parse]] lança outro. Por isso tudo fica num [[try]]. O [[catch]] fica vazio de propósito: vale o padrão (escuro e normal), sem `console.error`, porque a US22 pede "sem erro no console". Se a chave não existe, `getItem` devolve [[null]], `JSON.parse(null)` também devolve `null`, e o `preferencias && ...` protege o resto.
3. **Só aceitar o que está na lista.** O código nunca copia o valor salvo para o HTML. Ele pergunta: "é exatamente `"claro"`?". Qualquer outra coisa (`"azul"`, `"Claro"`, `true`, um número) fica no padrão **daquele campo**, e a chave não é apagada.

O script inteiro está escrito assim:

```js
(function () {
  // ...
})();
```

Isso se chama [[IIFE]] (*Immediately Invoked Function Expression*, "função chamada na hora"). Os parênteses em volta transformam a função num valor, e o `()` do fim chama esse valor na hora. Para que serve? O `const preferencias` criado lá dentro fica só lá dentro. Sem a IIFE, ele viraria uma variável da página inteira, e um outro script com `const preferencias` no topo daria erro.

## Exemplo

No Rodar não há `localStorage`, então o exemplo recebe "à mão" o texto que estaria salvo. Clique em **Rodar** e confira o Console.

```js rodar
function lerPreferencias(textoSalvo) {
  const padrao = { tema: "escuro", letra: "normal" };
  try {
    const p = JSON.parse(textoSalvo);
    return {
      tema: p && p.tema === "claro" ? "claro" : "escuro",
      letra: p && p.letra === "grande" ? "grande" : "normal"
    };
  } catch (erro) {
    return padrao;
  }
}
[null, '{"tema":"claro","letra":"x"}', "abc", "5", '{"tema":"Claro","letra":"grande"}'].forEach(function (texto) {
  console.log(texto, "->", JSON.stringify(lerPreferencias(texto)));
});
```
- **L1:** recebe o texto que estaria salvo em `agenda:preferencias`.
- **L2:** os padrões: escuro e normal.
- **L4:** o `JSON.parse` pode lançar um erro. Se lançar, o código pula direto para o `catch`.
- **L6:** `p && p.tema === "claro"`: se `p` for `null`, a conta para ali (dá um valor "falso") e o ternário escolhe `"escuro"`. Senão, compara com `"claro"` **exatamente**.
- **L7:** a mesma regra para a letra. Cada campo decide sozinho.
- **L9–10:** qualquer erro devolve o padrão, sem mensagem.
- **L13–15:** testa cinco textos. O Console mostra:
  - `null -> {"tema":"escuro","letra":"normal"}`: chave ausente.
  - `{"tema":"claro","letra":"x"} -> {"tema":"claro","letra":"normal"}`: o tema vale, a letra estranha cai no padrão.
  - `abc -> {"tema":"escuro","letra":"normal"}`: não é JSON, então caiu no `catch`.
  - `5 -> {"tema":"escuro","letra":"normal"}`: é um JSON válido, mas não é um objeto. `(5).tema` é `undefined`.
  - `{"tema":"Claro","letra":"grande"} -> {"tema":"escuro","letra":"grande"}`: `"Claro"`, com C maiúsculo, não é `"claro"`.

> [!CAUTION]
> Fazer `JSON.parse(localStorage.getItem(...))` sem `try`. Basta um texto estragado na chave (ou o `localStorage` bloqueado) para aparecer um erro vermelho no console e o script parar ali. No `<head>`, isso significa abrir sempre no tema padrão, com o console sujo. Ler dado salvo é ler dado "de fora" (aula 1.3 da Agenda): sempre com `try` e conferindo os valores.

## Onde aparece na Agenda

O script fica no `<head>` do `index.html`, depois das duas `<meta>` de cor e antes das fontes e do CSS, com um comentário que explica por quê ([index.html, linhas 8 a 29](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/index.html#L8-L29)). Depois, o `app.js` não lê o `localStorage` de novo: a `preferenciasAtuais` lê o próprio `<html>`, que é a [[fonte única da verdade]] ([app.js, linhas 2177 a 2183](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/js/app.js#L2177-L2183)). A gravação fica na `gravarPreferencias`, também com `try`: se falhar, ela devolve `false` sem aviso, e a troca vale até a página fechar ([armazenamento.js, linhas 388 a 398](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/js/armazenamento.js#L388-L398)).

> [!TIP]
> **Para ir além (opcional):** o script do `<head>` não mexe no `aria-pressed` dos botões, porque eles ainda nem existem quando ele roda. Quem acerta esse atributo é a `iniciar`, logo ao começar ([app.js, linhas 2480 a 2483](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/js/app.js#L2480-L2483)). E a chavinha desenhada? O CSS dela segue o atributo do `<html>`, e não o `aria-pressed` ([style.css, linhas 2135 a 2154](https://github.com/JoaoSaccucci/agenda/blob/4d7f4243c27f75a806930944c18a7aeb6db1bde4/css/style.css#L2135-L2154)). Assim ela já aparece ligada desde o primeiro instante.

> [!IMPORTANT]
> Pergunta comum: "Seu site com tema escuro pisca ao abrir no tema claro. Por quê, e como resolve?" Resposta: o tema estava sendo aplicado por um script que roda depois da primeira pintura. Eu coloco um script pequeno no `<head>`, antes do CSS, que lê a preferência e põe o atributo no `<html>`. Ele fica dentro de um `try` e só aceita valores conhecidos; qualquer outro valor vira o padrão.

## Teste rápido

```quiz
? Por que a leitura do tema fica num script no <head>, e não no app.js?
[ ] Porque o app.js não consegue ler o localStorage.
    -> Errada: o app.js consegue, e é ele que grava as preferências.
[x] Porque o app.js roda no fim do body, quando a página pode já ter sido pintada no tema errado.
    -> Certa: no head, o atributo já está no <html> antes da primeira pintura.
[ ] Porque o JavaScript roda mais rápido no head.
    -> Errada: a velocidade é a mesma. O que importa é o momento em que ele roda.
```

```quiz
? Com {"tema":"claro","letra":"enorme"} salvo, como a Agenda abre?
[ ] No escuro e normal, porque um dos valores está errado.
    -> Errada: cada campo é conferido sozinho, e o tema está certo.
[x] No claro e com letra normal.
    -> Certa: "claro" liga o tema, e "enorme" não é "grande", então a letra fica no padrão.
[ ] Com um erro no console e a chave apagada.
    -> Errada: não há erro nenhum, e a regra é nunca apagar a chave.
```

```quiz
? O localStorage está bloqueado e o getItem lança um erro. O que acontece?
[ ] A página fica em branco.
    -> Errada: o erro fica preso no try, e a página segue normal.
[x] O catch pega o erro, e a Agenda abre no escuro com letra normal, sem aviso.
    -> Certa: o padrão é o "plano B" (fallback), e a US22 pede console limpo.
[ ] Aparece uma faixa dizendo que as preferências não foram lidas.
    -> Errada: a US22 pede "sem aviso" para as preferências.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e acrescente `'{"tema":true}'` e `'[]'` à lista da linha 13. Rode: o que aparece para cada um? Por quê?
- [ ] Clique em **Restaurar** e troque a linha 10 por `console.error("Erro:", erro.message); return padrao;`. Rode: qual dos cinco textos foi parar no `catch`? Por que a Agenda **não** faz isso?
