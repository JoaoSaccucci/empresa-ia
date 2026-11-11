# Comparar sem acento e sem maiúsculas, guardando o original

> [!TIP]
> **Em resumo:** antes de procurar, a Agenda faz uma cópia da frase em minúsculas e sem acento: "AMANHÃ" vira "amanha".
> Ela procura na cópia, mas monta o título com a frase original, para os acentos e as maiúsculas que você digitou continuarem lá.

## O conceito

A US25 pede que "amanhã", "AMANHA", "Amanhã" e "amanha" valham a mesma coisa, assim como "sábado" e "sabado" ou "às" e "as". Escrever todas as combinações na regex seria impossível. O jeito simples: **deixar a frase num formato único** e comparar só com esse formato. Isso se chama normalizar o texto.

São três passos, um depois do outro:

1. [[normalize]]`("NFD")` ("normalizar"): separa a letra do acento. O "ã" passa a ser duas coisas: um "a" e um til solto. O "ç" vira "c" mais a cedilha.
2. [[replace]]`(/[\u0300-\u036f]/g, "")` ("substituir"): troca por nada todos os acentos soltos. Eles ficam numa faixa de códigos do Unicode, de `\u0300` a `\u036f`, e os colchetes querem dizer "qualquer um desta faixa". Sem o `g`, só o primeiro acento sairia.
3. [[toLowerCase]]`()` ("para minúsculas"): "AMANHA" vira "amanha".

Agora vem o detalhe. Se o título viesse da cópia, "Médico AMANHÃ" daria o título "medico". Por isso a Agenda mantém **duas versões**: procura data e hora na cópia simplificada e anota as **posições** do que achou. Depois corta o título da frase **original**, nessas mesmas posições. Isso só funciona se as duas versões tiverem o mesmo tamanho, letra por letra.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
function simplificar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
console.log(simplificar("AMANHÃ"), simplificar("Sábado"), simplificar("Terça-feira"));
console.log(simplificar("às") === "as");
console.log("ã".length, "ã".normalize("NFD").length);

const frase = "Médico AMANHÃ";
const simples = simplificar(frase);
const posicao = simples.indexOf("amanha");
console.log(simples, "| posição", posicao);
console.log("Título:", frase.slice(0, posicao).trim());
```
- **L1–3:** os três passos numa linha só. Cada método devolve um texto novo, e o próximo trabalha em cima dele.
- **L4:** mostra `amanha sabado terca-feira`.
- **L5:** `true`: depois de simplificar, "às" e "as" são iguais.
- **L6:** mostra `1 2`. O "ã" tem 1 caractere; separado em "a" + til, passa a ter 2.
- **L8–9:** a frase original e a cópia simplificada, `"medico amanha"`.
- **L10:** `indexOf` ("posição de") procura "amanha" na cópia e devolve a posição: 7.
- **L11:** mostra `medico amanha | posição 7`.
- **L12:** corta a frase **original** da posição 0 até a 7 ([[slice]]) e tira o espaço do fim ([[trim]]). Resultado: `Título: Médico`, com acento e maiúscula.

> [!CAUTION]
> Comparar com o texto do jeito que veio, como `frase.includes("amanhã")`. Funciona no seu teste e falha com quem digita "AMANHA" no celular, sem acento. Outro erro: esquecer o `g` no `replace`. `"Sábado é ótimo"` perderia só o primeiro acento.

## Onde aparece na Agenda

A `prepararFrase` faz os três passos, mas **letra por letra**: se alguma letra virasse mais (ou menos) de um caractere, ela fica como estava, para a cópia ter sempre o mesmo tamanho da original ([frase.js, linhas 25 a 41](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L25-L41)). Isso protege, por exemplo, uma frase que já chega com o acento separado: o acento sozinho viraria "nada" e encurtaria a frase. A `entenderFrase` procura os pedaços na cópia, mas monta o título com o texto original, pela `tirarPecas` ([frase.js, linhas 435 a 437](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L435-L437) e [linhas 405 a 415](https://github.com/JoaoSaccucci/agenda/blob/48ba5def7ca4d5d6fad01f42271b787fbd74a611/js/frase.js#L405-L415)). É por isso que "DENTISTA amanhã" dá o título "DENTISTA", e não "Dentista".

> [!TIP]
> **Para ir além (opcional):** na linha 36 do `frase.js`, a faixa dos acentos está escrita com os próprios caracteres, que quase não aparecem na tela. Escrever `\u0300-\u036f`, como no exemplo, dá o mesmo resultado e é mais fácil de ler. Para só ordenar ou comparar dois textos sem ligar para acento, também existe `a.localeCompare(b, "pt-BR", { sensitivity: "base" })`.

> [!IMPORTANT]
> Pergunta comum: "Como você faria uma busca que ignora acentos e maiúsculas?" Resposta: normalizo os dois lados com `normalize("NFD")`, tiro os acentos com `replace(/[\u0300-\u036f]/g, "")` e uso `toLowerCase()`. Só que eu comparo pela versão simplificada e **mostro** a original, para não estragar o que a pessoa escreveu.

## Teste rápido

```quiz
? O que simplificar("AÇÃO") devolve, com a função do exemplo?
[ ] "AÇÃO"
    -> Errada: os três passos tiram os acentos e deixam tudo em minúsculas.
[ ] "ação"
    -> Errada: o toLowerCase deixa em minúsculas, mas os acentos já tinham saído no replace.
[x] "acao"
    -> Certa: o normalize separa a cedilha e o til, o replace tira os dois e o toLowerCase faz o resto.
```

```quiz
? Por que a Agenda procura na cópia simplificada, mas corta o título da frase original?
[x] Para achar "AMANHA" e "amanhã" do mesmo jeito sem perder os acentos e as maiúsculas do título.
    -> Certa: a cópia serve para comparar e a original serve para mostrar. As posições valem nas duas porque elas têm o mesmo tamanho.
[ ] Porque a cópia simplificada não pode ser usada com slice.
    -> Errada: o slice funciona em qualquer texto. O problema é que o título ficaria "medico".
[ ] Porque a frase original é mais rápida de ler.
    -> Errada: a velocidade é a mesma. O motivo é mostrar o texto como foi digitado.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e acrescente na linha 6 `console.log(simplificar("Próxima SEXTA"));`. Antes de rodar, escreva o que você espera ver.
- [ ] Clique em **Restaurar** e apague o `.normalize("NFD")` da linha 2. Rode: o que muda nas linhas 4, 5 e 11? Por que o título saiu errado?
