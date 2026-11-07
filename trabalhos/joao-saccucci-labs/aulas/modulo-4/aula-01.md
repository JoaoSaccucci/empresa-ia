# Ler o # do endereço e reagir quando ele muda

> [!TIP]
> **Em resumo:** a parte do endereço que começa com `#` é o [[hash]]. O JavaScript lê esse pedaço com `location.hash`
> e fica sabendo quando ele muda pelo evento [[hashchange]], sem a página recarregar.

## O conceito

Na aula 1.7 você viu a [[query string]], a parte do endereço depois do `?`. O `#` é outra parte, que vem no fim (endereço inventado, só para ver as partes):

```text
aulas.html?ordem=nova#agenda-m1
```

- `?ordem=nova` é a query string. Ela vai junto para o servidor, e mudar esse pedaço **recarrega** a página.
- `#agenda-m1` é o hash. Ele **não** vai para o servidor: fica só no navegador. Mudar o hash **não** recarrega a página.

Originalmente, o hash serve para pular para um lugar da página: se existe um elemento com `id="agenda-m1"`, o navegador rola até ele. Na Etapa 7, a aba Aulas passou a usar o hash também para dizer **qual projeto abrir**: `aulas.html#agenda` abre a Agenda.

Para ler o hash, há três cuidados:

1. `location.hash` vem **com** o `#` na frente: `"#agenda"`. O `slice(1)` (o mesmo [[slice]] das listas, aqui usado num texto) corta o primeiro caractere e deixa `"agenda"`.
2. Acentos e espaços chegam codificados (`ã` vira `%C3%A3`), como você viu com o [[encodeURIComponent]]. O [[decodeURIComponent]] faz o caminho de volta.
3. Quem escreve o endereço pode digitar qualquer coisa. Um `%` quebrado, como `#%E0`, faz o `decodeURIComponent` lançar um erro (`URIError`). Por isso ele fica dentro de um [[try]]: se der erro, o [[catch]] trata o hash como inválido.

E se o hash mudar com a página já aberta (a pessoa edita o endereço e aperta Enter, ou clica num link `#...` da própria página)? Como nada recarrega, o código não roda de novo sozinho. Para isso existe o evento [[hashchange]] ("mudança do hash"): o navegador avisa, e o código abre o projeto certo.

## Exemplo

No Rodar não existe um endereço de verdade, então a função recebe o hash como texto, do jeito que `location.hash` entregaria. Clique em **Rodar** e confira o Console.

```js rodar
function lerHash(hash) {
  let texto;
  try {
    texto = decodeURIComponent(hash.slice(1));
  } catch (erro) {
    console.log("Hash quebrado:", erro.name);
    return null;
  }
  return texto || null;
}
console.log(lerHash("#agenda"));
console.log(lerHash("#Jo%C3%A3o"));
console.log(lerHash(""));
console.log(lerHash("#%E0"));
```
- **L1:** a função recebe o hash, por exemplo `"#agenda"`.
- **L2:** a variável `texto` é criada fora do `try`, para poder ser usada depois dele.
- **L3–4:** tenta cortar o `#` e desfazer os códigos com `%`.
- **L5–8:** se o `decodeURIComponent` lançar um erro, o `catch` mostra o nome do erro e devolve [[null]], que aqui quer dizer "esse hash não serve".
- **L9:** `texto || null`: se o texto ficou vazio (endereço sem `#`), devolve `null`; senão, devolve o texto.
- **L11:** mostra `agenda`, já sem o `#`.
- **L12:** `%C3%A3` é o código do `ã`, então aparece `João`.
- **L13:** sem hash, aparece `null`.
- **L14:** `%E0` é um código quebrado: aparece `Hash quebrado: URIError` e, depois, `null`. A função não quebrou.

Numa página de verdade, ouvir a mudança do hash fica assim (este trecho não roda no Rodar):

```js
window.addEventListener("hashchange", function () {
  console.log("O # mudou para", location.hash);
});
```

A cada troca do `#` no endereço, a mensagem apareceria, sem a página recarregar.

> [!CAUTION]
> Comparar o hash sem tirar o `#`: `location.hash === "agenda"` é sempre falso, porque o valor é `"#agenda"`. Outro erro comum é chamar `decodeURIComponent` sem `try`: um endereço com um `%` quebrado derruba o código inteiro.

## Onde aparece no site

A função `lerEndereco`, no `js/aulas.js`, lê o `#` com os três cuidados acima e depois procura um projeto, um módulo ou "outras-aulas" ([aulas.js, linhas 295 a 310](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L295-L310)). O ouvinte do `hashchange` reabre a lista quando o `#` muda com a página aberta ([aulas.js, linhas 412 a 416](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L412-L416)). Do outro lado, o "Voltar para as aulas" da tela de leitura monta o link `aulas.html#<projeto>` com `encodeURIComponent` ([aula.js, linhas 650 a 654](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aula.js#L650-L654)).

> [!TIP]
> **Para ir além (opcional):** como o navegador rola sozinho até o elemento cujo `id` é igual ao hash, a aba Aulas tomou cuidado com os ids. O título do projeto usa `projeto-agenda`, e não `agenda` ([aulas.js, linhas 156 a 158](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L156-L158)), e a seção "Outras aulas" não tem `id` ([linhas 142 a 144](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L142-L144)). Já o módulo **deve** ser alcançado, mas ele só existe depois que o JavaScript monta a lista. Por isso a rolagem até ele é feita à mão, com `scrollIntoView` ([linhas 335 a 340](https://github.com/JoaoSaccucci/empresa-ia/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/trabalhos/joao-saccucci-labs/js/aulas.js#L335-L340)).

> [!IMPORTANT]
> Pergunta comum: "Qual a diferença entre `?` e `#` num endereço?" Resposta: o `?` (query string) vai para o servidor, e mudar o `?` recarrega a página; o `#` (hash) fica só no navegador, mudar o `#` não recarrega, e eu fico sabendo da mudança pelo evento `hashchange`. Como o valor vem de fora, leio com `decodeURIComponent` dentro de um `try` e confiro se ele existe antes de usar.

## Teste rápido

```quiz
? No endereço aulas.html#agenda-m1, o que location.hash devolve?
[ ] "agenda-m1"
    -> Errada: o location.hash vem com o # na frente. Para tirar, usa-se slice(1).
[x] "#agenda-m1"
    -> Certa: o valor inclui o #. Por isso a aba Aulas faz location.hash.slice(1).
[ ] "aulas.html#agenda-m1"
    -> Errada: esse é o final do endereço. O hash é só a parte a partir do #.
```

```quiz
? Por que o decodeURIComponent fica dentro de um try na aba Aulas?
[ ] Porque ele é uma função async e precisa de await.
    -> Errada: decodeURIComponent é uma função comum, que responde na hora.
[x] Porque um % quebrado no endereço, como #%E0, faz ele lançar um URIError, e o try evita que a página quebre.
    -> Certa: quem digita o endereço pode escrever qualquer coisa. Com o catch, esse # vira "inválido" e a página abre normalmente.
[ ] Porque, sem o try, o navegador recarrega a página.
    -> Errada: o try não tem relação com recarregar. Ele só trata o erro.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e acrescente no fim `console.log(lerHash("#caf%C3%A9"));`. Rode: qual palavra aparece?
- [ ] Acrescente também `console.log(lerHash("#100%"));`. Antes de rodar, tente adivinhar: aparece `100%` ou o aviso de hash quebrado? Por quê?
- [ ] Na linha 9, troque `return texto || null;` por `return texto;` e rode. O que a linha 13 mostra agora? (Dica: aparece uma linha vazia, que é o texto vazio `""`.) Por que `null` é mais fácil de conferir depois? No fim, clique em **Restaurar**.
