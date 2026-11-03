# Usar uma biblioteca pronta: marked pelo CDN

> [!TIP]
> **Em resumo:** uma biblioteca é um código pronto, escrito por outras pessoas, que você carrega com uma tag `<script>`.
> Pelo CDN, basta colar o endereço com a **versão fixa** e usar a biblioteca nos scripts que vêm depois.

## O conceito

Transformar um texto [[Markdown]] em HTML dá muito trabalho: títulos, listas, negrito, links, tabelas. Em vez de escrever tudo do zero, o site usa uma **biblioteca**: um arquivo JavaScript que outras pessoas já escreveram e testaram. A que faz esse trabalho se chama **marked**.

Você não precisa baixar nada. A biblioteca fica num [[CDN]], uma rede de servidores que entrega arquivos prontos, e você aponta para o endereço com a tag `<script src="...">`. O navegador baixa o arquivo, roda, e a biblioteca deixa uma variável pronta para usar: no caso, `marked`.

Duas regras fazem tudo funcionar:

1. **A ordem.** O `<script>` da biblioteca vem **antes** do seu script, porque o navegador roda os scripts de cima para baixo (você viu isso na aula 2.1).
2. **A versão fixa.** O endereço diz exatamente qual versão usar, como `marked@12.0.2`. Assim, se a biblioteca lançar uma versão nova que funciona de outro jeito, o seu site continua igual.

## Exemplo

Este exemplo **não tem o botão Rodar**: a área do Rodar é isolada e não acessa a internet, então não consegue baixar o marked. O resultado esperado está logo abaixo. Para testar de verdade, salve o código num arquivo `.html` e abra com o Live Server.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"></head>
<body>
  <div id="saida"></div>

  <script src="https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js"></script>
  <script>
    const texto = "# Olá!\n\nEste texto é **Markdown**.";
    const html = marked.parse(texto);
    document.querySelector("#saida").innerHTML = html;
    console.log(html);
  </script>
</body>
</html>
```
- **L3:** o `<meta charset="UTF-8">` garante que os acentos apareçam certinho.
- **L5:** uma `<div>` vazia, onde o resultado vai aparecer.
- **L7:** carrega a biblioteca. Leia o endereço por partes: `cdn.jsdelivr.net` é o CDN, `npm/marked` é o nome da biblioteca, `@12.0.2` é a versão fixa e `marked.min.js` é o arquivo. O `.min` quer dizer "minificado": sem espaços nem comentários, para baixar mais rápido.
- **L8:** o nosso script vem **depois**. Quando ele roda, o `marked` já existe.
- **L9:** um texto em Markdown. O `#` marca um título, os `**` marcam negrito e o `\n` é uma quebra de linha dentro do texto.
- **L10:** o `marked.parse` (analisar) recebe o Markdown e devolve um texto com o HTML pronto.
- **L11:** coloca esse HTML dentro da `<div>` com o [[innerHTML]] (aula 1.5).
- **L12:** mostra no Console o HTML que o marked gerou.

Na página aparece um título grande "Olá!" e, embaixo, o parágrafo com "Markdown" em negrito. O Console mostra:

```text
<h1>Olá!</h1>
<p>Este texto é <strong>Markdown</strong>.</p>
```

> [!CAUTION]
> Usar a biblioteca **antes** de carregar. Se a linha 7 for para baixo do seu script, o navegador chega no `marked.parse` sem conhecer o `marked` e mostra `ReferenceError: marked is not defined` (um [[ReferenceError]]: "marked não está definido"). Quando aparecer "is not defined" com o nome de uma biblioteca, confira a ordem das tags `<script>` e se o endereço está certo.

## Onde aparece no site

No `aula.html`, as linhas 158 a 160 carregam o marked 12.0.2 pelo CDN, e logo abaixo vem o highlight.js, que pinta o código. Só depois, nas linhas 168 a 171, vêm os scripts do próprio site. No `js/aula.js`, a função `converterMarkdown` (linhas 601 a 625) configura o marked com `marked.use` e converte o texto da aula com `marked.parse` (linha 624). E se o CDN estiver fora do ar? A linha 655 confere com [[typeof]] se o `marked` existe. Se não existir, a aula mostra um [[fallback]]: um link para abrir o arquivo `.md` original.

> [!IMPORTANT]
> Pergunta comum: "Por que fixar a versão da biblioteca?" Resposta: versões novas podem mudar o jeito de usar a biblioteca e quebrar o seu código sem você ter mexido em nada. Com a versão fixa, o site só muda quando você decidir atualizar, e de preferência depois de testar.

> [!TIP]
> **Para ir além (opcional):** no `aula.html`, a tag do marked tem mais dois atributos (linhas 159 e 160). O [[integrity]] guarda a "impressão digital" (um *hash*) do arquivo esperado: se o CDN entregar um arquivo diferente, mesmo que só uma letra, o navegador não roda. Esse recurso se chama SRI (*Subresource Integrity*) e protege o site caso alguém invada o CDN. O `crossorigin="anonymous"` é necessário para essa conferência funcionar.

## Teste rápido

```quiz
? Por que o script do marked precisa vir antes do script que usa marked.parse?
[x] Porque o navegador roda os scripts de cima para baixo.
    -> Certa: quando o seu script roda, a biblioteca já precisa ter sido carregada e criado a variável marked.
[ ] Porque scripts de CDN sempre rodam por último.
    -> Errada: eles rodam na ordem em que aparecem, como qualquer outro script.
[ ] Não precisa: a ordem dos scripts não faz diferença.
    -> Errada: com a ordem invertida, aparece o erro marked is not defined.
```

```quiz
? O que o @12.0.2 no endereço do marked garante?
[ ] Que o site sempre usa a versão mais nova.
    -> Errada: é o contrário. Sem a versão no endereço, o CDN entregaria a mais nova.
[x] Que o site usa sempre a mesma versão, mesmo que saia uma nova.
    -> Certa: assim uma atualização da biblioteca não muda o site sem você saber.
[ ] Que o arquivo baixa mais rápido.
    -> Errada: quem deixa o arquivo menor e mais rápido é o .min no nome do arquivo.
```

```quiz
? Se o CDN do marked estiver fora do ar, o que a tela de leitura do site faz?
[ ] Mostra a página em branco.
    -> Errada: o aula.js confere se o marked existe antes de usar.
[x] Mostra uma mensagem com um link para o arquivo .md original da aula.
    -> Certa: esse é o plano B (fallback) da linha 655 do aula.js.
[ ] Baixa o marked de outro CDN sozinha.
    -> Errada: o site não tem um segundo endereço. Ele só oferece o arquivo original.
```

## Para praticar

- [ ] Abra uma aula do site, aperte F12, vá na aba Console e digite `marked.parse("**João** aprendendo")`. Que HTML apareceu?
- [ ] Copie o exemplo para um arquivo `teste-marked.html`, abra com o Live Server e acrescente uma lista ao texto da linha 9, como `\n\n- item 1\n- item 2`.
- [ ] No mesmo arquivo, mova a linha 7 para depois da linha 13 (o seu script fica antes do marked) e veja o erro no Console. Depois desfaça.
