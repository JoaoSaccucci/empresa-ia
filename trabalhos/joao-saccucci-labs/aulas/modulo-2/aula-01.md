# A ordem dos scripts importa

> [!TIP]
> **Em resumo:** dá para separar o JavaScript em vários arquivos, cada um com uma tarefa.
> O navegador lê os `<script>` de cima para baixo, na ordem em que aparecem no HTML.
> Por isso, quem **cria** uma função precisa vir antes de quem **usa** essa função.

## O conceito

Um site pequeno poderia ter todo o JavaScript num arquivo só. Mas, conforme o código cresce, fica mais fácil se cada arquivo cuidar de uma coisa. É como uma cozinha: uma gaveta para talheres, outra para panelas. Você acha tudo mais rápido.

Para ligar um arquivo de JavaScript à página, usamos a tag `<script>` com o atributo `src` (de *source*, "origem"), que diz onde está o arquivo:

```html
<script src="js/timeline.js"></script>
```

Agora, o ponto principal da aula. O navegador lê o HTML **de cima para baixo**. Quando encontra um `<script>`, ele para, roda aquele código inteiro e só depois segue para o próximo. Todos os scripts da página dividem o mesmo espaço: uma [[function]] criada no primeiro arquivo pode ser usada no segundo.

Mas só **depois** de criada. Se um script tenta chamar uma função que ainda não foi lida, o navegador não sabe do que se trata e mostra um [[ReferenceError]], o erro de "isso não existe".

Pense numa receita de bolo: se o passo 1 diz "use a massa do passo 5", você ainda não tem a massa. A ordem dos passos importa.

## Exemplo

Dentro da área do **Rodar** não existem arquivos, então o exemplo usa dois `<script>` escritos direto no HTML, sem `src` (o nome disso é [[inline]]). A regra é a mesma. Este exemplo está **errado de propósito**: clique em **Rodar** e olhe o Console.

```html rodar
<!-- Script 1: USA a função saudar -->
<script>
  console.log("Script 1 começou");
  saudar("João");
  console.log("Script 1 terminou");
</script>

<!-- Script 2: CRIA a função saudar -->
<script>
  function saudar(nome) {
    console.log("Olá, " + nome + "!");
  }
  console.log("Script 2 terminou");
</script>
```
- **L1:** um comentário de HTML, escrito entre `<!--` e `-->`. O navegador ignora; ele serve só para a gente se orientar.
- **L2–6:** o primeiro script. Ele faz o papel de um arquivo que **usa** uma função pronta.
- **L3:** essa linha roda normalmente: aparece `Script 1 começou`.
- **L4:** aqui o script chama `saudar`, mas o navegador ainda não leu o script 2. Resultado: um erro parecido com `ReferenceError: saudar is not defined` ("saudar não está definida").
- **L5:** essa linha **nunca roda**. Quando acontece um erro, o resto daquele script é abandonado.
- **L9–14:** o segundo script, que faz o papel de um arquivo que **cria** a função.
- **L10–12:** cria a função `saudar`, que recebe um nome e mostra uma saudação. Criar não é rodar: nada aparece por causa dessas linhas.
- **L13:** essa linha roda e mostra `Script 2 terminou`. O erro do script 1 não impediu o script 2 de rodar, porque cada `<script>` roda separado.

A área "Resultado" fica em branco porque o exemplo não desenha nada na página. A história toda está no Console: `Script 1 começou`, depois o erro, depois `Script 2 terminou`. O "Olá, João!" nunca aparece.

Para consertar, basta trocar a ordem: o script que cria a função vem primeiro. Faça isso no primeiro item do "Para praticar", no fim da aula.

> [!CAUTION]
> Abrir uma página, ver um pedaço em branco e achar que "o JavaScript não funciona". Muitas vezes é só a ordem dos `<script>`. Abra o Console do navegador (tecla F12): se aparecer `ReferenceError: ... is not defined`, confira se o arquivo que cria aquela função está carregando antes, e se o nome está escrito igual nos dois lugares.

## Onde aparece no site

No fim do `detalhe-projeto.html` (linhas 56 a 59) há três scripts nesta ordem: `js/comum.js`, `js/timeline.js` e `js/detalhe-projeto.js`. O `timeline.js` **cria** a função `htmlLinhaDoTempo` (linha 41), e o `detalhe-projeto.js` **usa** essa função (linha 109). Por isso o `timeline.js` vem antes, e tem até um comentário avisando isso na linha 57 do HTML. O `comum.js` vem primeiro de todos porque cria funções que os outros dois usam, como `escapar`.

> [!IMPORTANT]
> Pergunta comum: "Por que colocar os `<script>` no fim do `<body>`?" Porque assim, quando o JavaScript roda, o HTML da página já foi lido, e o código consegue encontrar os elementos (com o `querySelector` da aula 1.4). Se o script viesse no começo, ele procuraria elementos que ainda não existem.

> [!TIP]
> **Para ir além (opcional):** dentro de **um mesmo** script, uma `function` pode ser chamada numa linha acima de onde foi escrita, porque o navegador lê todas as funções daquele script antes de rodar. Isso tem nome: *hoisting* ("içamento"). Mas entre scripts diferentes isso não vale, como você viu no exemplo. Existe também o atributo `defer` ("adiar"), que permite colocar os scripts no `<head>` e mesmo assim rodar só depois de a página ser lida, mantendo a ordem entre eles.

## Teste rápido

```quiz
? O arquivo b.js usa uma função criada no arquivo a.js. Qual ordem está certa no HTML?
[x] Primeiro o script do a.js, depois o do b.js.
    -> Certa: quem cria a função precisa ser lido antes de quem usa.
[ ] Primeiro o script do b.js, depois o do a.js.
    -> Errada: quando o b.js rodar, a função ainda não existe, e aparece um ReferenceError.
[ ] Tanto faz, o navegador acha a função sozinho.
    -> Errada: o navegador lê os scripts de cima para baixo e não volta atrás para procurar.
```

```quiz
? No exemplo, por que a mensagem "Script 1 terminou" não aparece no Console?
[ ] Porque o console.log só funciona uma vez por script.
    -> Errada: dá para usar console.log quantas vezes quiser. A linha 3 do mesmo script funcionou.
[x] Porque o erro na linha 4 interrompe o resto do script 1.
    -> Certa: quando um erro acontece, as linhas seguintes daquele script não rodam.
[ ] Porque o script 2 apagou a mensagem.
    -> Errada: um script não apaga o que outro mostrou. A linha 5 simplesmente nunca rodou.
```

## Para praticar

- [ ] Clique em **Editar**, recorte as linhas 8 a 14 (o script 2 com seu comentário) e cole no topo, antes do script 1. Rode de novo: agora aparece "Olá, João!"?
- [ ] Restaure o exemplo e troque `saudar("João")` por `saudar("Ana")`. O erro muda? Por quê?
- [ ] Abra o `detalhe-projeto.html` e encontre as linhas dos três `<script>`. Qual arquivo é carregado por último?
