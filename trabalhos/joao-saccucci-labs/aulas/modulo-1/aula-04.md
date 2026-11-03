# Encontrar um elemento com querySelector

> [!TIP]
> **Em resumo:** `document.querySelector("seletor")` procura na página o **primeiro** elemento que combina com o seletor.
> Com o elemento guardado numa constante, você muda o texto dele com `textContent`.
> Se nada for encontrado, o resultado é `null`.

## O conceito

Quando o navegador lê o HTML, ele monta na memória uma árvore com todos os elementos da página, o [[DOM]]. O JavaScript não mexe no arquivo `.html`: ele mexe nessa árvore, e a tela muda junto.

Para mudar um elemento, primeiro é preciso **achá-lo**. Quem faz isso é o [[querySelector]] (seletor de busca):

```js
const titulo = document.querySelector("#titulo");
```

- `document` (documento) é a página inteira.
- `querySelector(...)` recebe um seletor, escrito entre aspas, e devolve o primeiro elemento que combina.
- O seletor é o mesmo do CSS, que você viu na aula 1.3: `"#titulo"` para id, `".aviso"` para classe, `"h1"` para tag.

Depois de achar, você pode mudar o texto com [[textContent]] (conteúdo de texto). Ler `titulo.textContent` devolve o texto atual; escrever `titulo.textContent = "Novo"` troca o texto na tela.

Se nenhum elemento combinar, o `querySelector` devolve [[null]], que quer dizer "nada encontrado".

## Exemplo

Clique em **Rodar**. O título e o primeiro aviso mudam antes mesmo de você ver o texto original.

```html rodar
<h1 id="titulo">Carregando...</h1>
<p class="aviso">Primeiro aviso</p>
<p class="aviso">Segundo aviso</p>

<script>
  const titulo = document.querySelector("#titulo");
  titulo.textContent = "João Saccucci Labs";

  const aviso = document.querySelector(".aviso");
  aviso.textContent = "Só o primeiro mudou";

  const nada = document.querySelector("#nao-existe");
  console.log(nada);
</script>
```
- **L1–3:** um título com o `id` "titulo" e dois parágrafos com a **mesma** classe, `aviso`.
- **L5:** a tag `<script>` coloca JavaScript dentro do HTML. Ela vem **depois** dos elementos de propósito: quando o código roda, o título e os avisos já existem na página.
- **L6:** procura o elemento com `id="titulo"` (o `#` indica id) e guarda na constante `titulo`.
- **L7:** troca o texto do título. O "Carregando..." some e aparece "João Saccucci Labs".
- **L9:** procura pela classe `aviso` (o `.` indica classe). Existem dois, mas o `querySelector` devolve só o **primeiro**.
- **L10:** troca o texto do primeiro aviso. O segundo continua igual.
- **L12–13:** procura um id que não existe na página. O resultado é `null`, e é isso que aparece no Console.

> [!CAUTION]
> Usar o elemento sem conferir se ele foi encontrado. Se o seletor estiver errado (por exemplo, `"titulo"` sem o `#`), a constante fica `null`, e a linha seguinte dá o erro **Cannot set properties of null** ("não dá para mudar propriedades de null"). Quando aparecer esse erro, confira o seletor e se o `<script>` está depois do elemento.

## Onde aparece no site

O `js/lista-projetos.js` começa achando a área em que os cards vão entrar: `document.querySelector("#lista-projetos")`, na linha 6. No `js/comum.js`, a função `iniciarMenu` acha o botão do menu e o próprio menu pela classe (linhas 16 e 17) e, na linha 20, para tudo se algum deles for `null`, porque nem toda página tem menu. E a tela de leitura usa `textContent` para escrever o título da aula (`js/aula.js`, linha 683).

> [!IMPORTANT]
> Pergunta comum: "Qual a diferença entre `textContent` e `innerHTML`?" O `textContent` trata tudo como texto: se você escrever `<b>Oi</b>`, aparecem as letras com os sinais `<` e `>`. O `innerHTML` interpreta o texto como HTML e cria os elementos. Você vê o `innerHTML` na próxima aula.

> [!TIP]
> **Para ir além (opcional):** para pegar **todos** os elementos com um seletor, existe o `document.querySelectorAll(".aviso")`. Ele devolve uma lista, que você percorre item por item.

## Teste rápido

```quiz
? O que document.querySelector(".aviso") devolve quando a página tem dois elementos com essa classe?
[ ] Os dois elementos.
    -> Errada: o querySelector para no primeiro que encontrar. Para pegar todos, existe o querySelectorAll.
[x] Só o primeiro elemento com a classe aviso.
    -> Certa: ele procura de cima para baixo e devolve o primeiro que combina.
[ ] O texto "aviso".
    -> Errada: ele devolve o elemento da página, não um texto.
```

```quiz
? O que document.querySelector("#nao-existe") devolve, se nenhum elemento tem esse id?
[ ] undefined
    -> Errada: undefined aparece ao ler uma chave que não existe num objeto. O querySelector usa outro valor para "nada encontrado".
[ ] Um texto vazio.
    -> Errada: ele não devolve texto, nem quando encontra o elemento.
[x] null
    -> Certa: null quer dizer que nenhum elemento combinou com o seletor.
```

```quiz
? O seletor está certo, mas o código dá o erro Cannot set properties of null. Qual é a causa mais provável?
[x] O script rodou antes de o elemento existir na página.
    -> Certa: se o script vem antes do elemento no HTML, a busca acontece cedo demais e devolve null.
[ ] O textContent só funciona em títulos.
    -> Errada: o textContent funciona em qualquer elemento que tenha texto.
[ ] Faltou o ponto e vírgula no fim da linha.
    -> Errada: no JavaScript, o ponto e vírgula costuma ser opcional, e a falta dele não causa esse erro.
```

## Para praticar

- [ ] Clique em **Editar** e acrescente, antes do `</script>`, a linha `console.log(titulo.textContent);`. O que aparece no Console?
- [ ] Mude a linha 9 para procurar `"h1"` e rode. Que texto ficou no título, e por quê?
- [ ] Tire o `#` da linha 6 e rode. Leia o erro no Console e depois clique em **Restaurar**.
