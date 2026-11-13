# Testes que protegem: regressão, esperado do requisito e o teste que precisa falhar

> [!TIP]
> **Em resumo:** os testes valem mais quando o código **muda**. Rodar os mesmos casos antes e depois de uma mudança mostra se algo que funcionava quebrou (teste de regressão).
> Para isso, o esperado vem do requisito, nunca do código, e o teste precisa ter mostrado que **consegue** falhar.

## O conceito

Três ideias fazem um teste ser confiável.

**1. Teste de regressão.** "Regressão" é quando algo que já funcionava volta a quebrar depois de uma mudança. Na Etapa 5, a US33 mudou a retirada do "e" de ligação: agora a pontuação fica ("reunião amanhã 10h, e conversar" vira "Reunião, conversar"). É uma mudança pequena numa regex que mexe em quase todo título. Como saber que as outras 79 frases continuam certas? Rodando a `testes.html` antes de publicar: 80 de 80. Um **[[teste de regressão]]** é isso: os mesmos casos de sempre, rodados de novo a cada mudança.

**2. O esperado vem do requisito, nunca do código.** Se você roda a função, copia o que ela devolveu e cola como esperado, o teste só confere que o código faz o que o código faz. Um bug vira "resposta certa" e fica protegido pelo teste. O esperado tem que vir de fora: da regra escrita, da tabela dos requisitos, da conta feita à mão.

**3. O teste precisa conseguir falhar.** Um teste que sempre diz "passou" não prova nada. Ele pode estar comparando o lugar errado ou pulando todos os campos. Para ter certeza, o testador fez uma cópia da página com esperados trocados **de propósito** e viu a página acusar as falhas. Só depois disso o "80 de 80" passou a valer alguma coisa.

E o "agora" fixo (aula 5.4) continua essencial: sem ele, a frase "dentista amanhã" daria outra data a cada dia, e a tabela inteira de esperados ficaria velha no dia seguinte.

## Exemplo

A regra escrita é "item vazio é ignorado", então "RG,, exames" tem 2 itens. Clique em **Rodar** e confira o Console.

```js rodar
function contarItens(texto) {
  return texto.split(",").length;
}
const frase = "RG,, exames";
const copiadoDoCodigo = contarItens(frase);
const tiradoDaRegra = 2;
console.log("copiado do código:", contarItens(frase) === copiadoDoCodigo ? "passou" : "falhou");
console.log("tirado da regra:", contarItens(frase) === tiradoDaRegra ? "passou" : "falhou");
console.log("obtido:", contarItens(frase));
```
- **L1–3:** a função tem um bug: ela conta o pedaço vazio.
- **L5:** o esperado copiado da saída da função. É exatamente o erro que o guia proíbe.
- **L6:** o esperado tirado da regra escrita.
- **L7:** `copiado do código: passou`. Esse teste nunca vai falhar, nem com o bug.
- **L8:** `tirado da regra: falhou`. Esse achou o bug.
- **L9:** `obtido: 3`.

Agora um teste de regressão: a mesma tabela rodada em três versões de uma função que tira o "e" de ligação.

```js rodar
const casos = [["pão e leite", "pão leite"], ["reunião, e conversar", "reunião, conversar"],
  ["vitamina E", "vitamina E"], ["ala E norte", "ala E norte"]];
function rodar(nome, limpar) {
  const falhas = casos.filter(function (c) { return limpar(c[0]) !== c[1]; });
  console.log(nome + ": " + (casos.length - falhas.length) + " de " + casos.length,
    falhas.map(function (c) { return "falhou '" + c[0] + "' -> '" + limpar(c[0]) + "'"; }).join("; "));
}
rodar("v1", function (t) { return t.replace(/[,;]? e /g, " "); });
rodar("v2", function (t) { return t.replace(/ e /g, " "); });
rodar("v3", function (t) { return t.replace(/ e /gi, " "); });
```
- **L1–2:** a tabela, com o esperado de cada frase tirado das regras: a pontuação fica (como na US33), e o "E" maiúsculo é texto.
- **L3–7:** roda todos os casos numa versão e mostra o resumo e as falhas.
- **L8:** `v1: 3 de 4 falhou 'reunião, e conversar' -> 'reunião conversar'`. A versão antiga engolia a vírgula, como a Agenda antes da US33.
- **L9:** `v2: 4 de 4`. A correção passou em tudo.
- **L10:** `v3: 3 de 4 falhou 'ala E norte' -> 'ala norte'`. Alguém acrescentou o `i` "para pegar o E maiúsculo também" e quebrou um caso que funcionava. É uma regressão, e a mesma tabela pegou o problema na hora.

> [!CAUTION]
> "Arrumar o teste" quando ele falha, copiando o obtido para o esperado sem pensar. Às vezes o esperado está mesmo errado (a regra mudou), mas então quem muda primeiro é o requisito. Na Agenda, o comentário do arquivo diz que, quando uma tabela dos requisitos muda, a lista de casos muda junto, no mesmo commit.

## Onde aparece na Agenda

O comentário do topo diz de onde vêm os esperados: "copiados das tabelas dos requisitos, nunca do que o código devolve" ([testes-frase.js, linhas 7 a 9](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/testes-frase.js#L7-L9)). O "agora" fixo fica logo abaixo ([linhas 20 a 22](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/testes-frase.js#L20-L22)). A mudança da US33, protegida pelos testes, está na `tirarENoComeco` e na `tirarENoFim` ([frase.js, linhas 583 a 598](https://github.com/JoaoSaccucci/agenda/blob/749b39d6fdfce6ae6bdd836e9e796f9ad065706b/js/frase.js#L583-L598)). O relatório registra que as 80 frases continuaram iguais depois dela ([etapa-5.md, linha 28](https://github.com/JoaoSaccucci/empresa-ia/blob/73e7f1767315a8f0a36d5467338d79cd4de64b3d/trabalhos/joao-saccucci-labs/docs/projetos/agenda/testes/etapa-5.md?plain=1#L28)). Registra também a cópia com esperados trocados, em que a página acusou "Esperado: Dentistx / Obtido: Dentista" ([etapa-5.md, linha 57](https://github.com/JoaoSaccucci/empresa-ia/blob/73e7f1767315a8f0a36d5467338d79cd4de64b3d/trabalhos/joao-saccucci-labs/docs/projetos/agenda/testes/etapa-5.md?plain=1#L57)).

> [!TIP]
> **Para ir além (opcional):** o testador foi além das 80 frases. Ele rodou o `frase.js` antigo e o novo em 40.000 frases sorteadas e comparou os dois resultados. Só 72 deram diferente, e em todas a diferença era a pontuação que a US33 manda manter ([etapa-5.md, linha 28](https://github.com/JoaoSaccucci/empresa-ia/blob/73e7f1767315a8f0a36d5467338d79cd4de64b3d/trabalhos/joao-saccucci-labs/docs/projetos/agenda/testes/etapa-5.md?plain=1#L28)). Esse jeito de comparar a versão velha com a nova em muitas entradas também é teste de regressão. Existe ainda um jeito de trabalhar chamado TDD: primeiro você escreve o teste e vê ele **falhar**, depois escreve o código até ele passar.

> [!IMPORTANT]
> Pergunta comum: "Como você sabe que o seu teste funciona?" Resposta: vejo ele falhar pelo menos uma vez, com um esperado trocado ou com um bug de propósito, e confiro que a mensagem aponta o lugar certo. E o esperado vem da especificação, não da saída do código. Senão, o teste só confirma o bug.

## Teste rápido

```quiz
? De onde deve vir o valor esperado de um caso de teste?
[ ] Da saída da função, copiada do console.
    -> Errada: assim o teste sempre passa, até com bug, como o "copiado do código" do exemplo.
[x] Da regra escrita (requisito, tabela ou conta feita à mão).
    -> Certa: é o que a Agenda faz com as tabelas da 4a e da 4b.
[ ] De qualquer lugar, desde que o teste passe.
    -> Errada: um teste que passa sem conferir nada é pior que nenhum, porque dá falsa segurança.
```

```quiz
? O que é um teste de regressão?
[ ] Um teste que roda o código de trás para frente.
    -> Errada: o nome fala de algo que "regride", que volta a quebrar.
[x] Rodar de novo os casos que já passavam, depois de uma mudança, para ver se algo voltou a quebrar.
    -> Certa: como as 80 frases rodadas depois da US33, ou a v3 do exemplo.
[ ] Um teste que só confere as funções novas.
    -> Errada: o foco é justamente o que já funcionava antes.
```

```quiz
? Por que o testador trocou o título esperado da frase 4a #1 para "Dentistx" numa cópia da página?
[ ] Para corrigir um bug da Agenda.
    -> Errada: a Agenda estava certa. A troca foi só na cópia dos testes.
[x] Para ver a página acusar a falha e provar que o teste consegue falhar.
    -> Certa: ela mostrou "Esperado: Dentistx / Obtido: Dentista", e aí o "80 de 80" passou a valer.
[ ] Porque a tabela dos requisitos tinha um erro de digitação.
    -> Errada: o esperado verdadeiro continua "Dentista".
```

## Para praticar

- [ ] No primeiro exemplo, clique em **Editar** e conserte a `contarItens` (dica: `.filter` dos pedaços vazios antes do `.length`). Rode: as duas linhas passam agora? Qual delas passou a valer alguma coisa?
- [ ] No segundo exemplo, acrescente à tabela o caso `["e-mail e senha", "e-mail senha"]`. Antes de rodar, diga quais versões passam.
- [ ] Ainda no segundo exemplo, troque o esperado do caso "pão e leite" por `"pão  leite"` (dois espaços). Rode: as três versões acusam a falha? É um jeito de ver o teste conseguir falhar.
