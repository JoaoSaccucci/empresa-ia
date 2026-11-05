# Nunca confie em dados que vêm de fora

> [!TIP]
> **Em resumo:** um arquivo escolhido pela pessoa pode ser qualquer coisa.
> Antes de usar, confira em camadas: se é JSON, se tem o formato certo e se cada item está certo.

## O conceito

Quando a Agenda importa uma cópia, ela não sabe o que vem dentro do arquivo. Pode ser:

- uma foto com o nome trocado para `.json`;
- um JSON de outro programa;
- uma cópia feita por uma versão mais nova da Agenda;
- uma cópia editada à mão, com um compromisso sem título.

A regra é **conferir tudo antes de mudar qualquer coisa**. A conferência é feita em camadas, da mais grossa para a mais fina:

1. **É JSON?** O [[JSON.parse]] dá erro se não for, então ele fica dentro de um [[try]].
2. **Tem o formato certo?** É um objeto, com a versão certa e com uma lista de compromissos? Para conferir se algo é lista, usamos [[Array.isArray]].
3. **Cada item está certo?** Um item com problema é deixado de fora e contado. Os outros entram normalmente.

A função que confere **só confere**. Ela devolve um resultado (`{ erro }` ou `{ compromissos, ignorados }`) e não mexe nos dados salvos. A agenda só muda depois, quando a pessoa escolhe Juntar ou Substituir.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
function conferir(texto) {
  let dados;
  try {
    dados = JSON.parse(texto);
  } catch (erro) { return "Erro: não é JSON."; }
  if (dados.versao !== 1 || !Array.isArray(dados.compromissos)) {
    return "Erro: não é uma cópia da Agenda.";
  }
  const bons = dados.compromissos.filter(function (c) { return typeof c.titulo === "string"; });
  return "OK: " + bons.length + " certo(s), " + (dados.compromissos.length - bons.length) + " ignorado(s).";
}
console.log(conferir("foto.png"));
console.log(conferir('{"versao": 1, "compromissos": "nada"}'));
console.log(conferir('{"versao": 1, "compromissos": [{"titulo": "Dentista"}, {"hora": "09:00"}]}'));
```
- **L3–5:** primeira camada. Se o `JSON.parse` der erro, o `catch` devolve a mensagem e a função para ali.
- **L6–8:** segunda camada. `!==` quer dizer "diferente de", e `||` quer dizer "ou". Se a versão não for 1 **ou** `compromissos` não for uma lista, não é uma cópia.
- **L9:** terceira camada. O `filter` ("filtrar") fica só com os itens que passam no teste: o título precisa ser um texto. O [[typeof]] diz o tipo do valor.
- **L10:** monta a resposta com quantos itens passaram e quantos foram ignorados.
- **L12–14:** três testes: um texto que não é JSON, um JSON com o formato errado e uma cópia com um item bom e um ruim.

O Console mostra `Erro: não é JSON.`, depois `Erro: não é uma cópia da Agenda.` e por fim `OK: 1 certo(s), 1 ignorado(s).`

> [!CAUTION]
> Checar só se o texto "é JSON". O texto `'{"versao": 1, "compromissos": "nada"}'` é um JSON perfeito, mas não é uma cópia que dá para usar. Sem a segunda camada, o código quebraria mais à frente, ao tentar percorrer `"nada"` como se fosse uma lista.

Tem ainda uma última defesa, na hora de mostrar na tela: tudo o que veio do arquivo entra com [[textContent]], nunca com [[innerHTML]]. Assim, um título escrito como código HTML aparece como texto e não roda. Isso evita [[XSS]].

## Onde aparece na Agenda

A função `lerArquivoDeCopia`, no `js/copia.js`, faz as três camadas: o `JSON.parse` dentro de um `try`, a conferência do `app`, da versão e da lista ([copia.js, linhas 86 a 109](https://github.com/JoaoSaccucci/agenda/blob/e413ad86d9f525fd94bfaa21e45153ff97cf0a06/js/copia.js#L86-L109)) e depois a conferência item por item. Ela confere a versão **antes** da lista: assim, uma cópia de uma versão futura recebe a mensagem certa, "versão mais nova", em vez de "não é uma cópia".

> [!IMPORTANT]
> Pergunta comum: "Como você valida dados de entrada?" Resposta: em camadas (tamanho, depois se é JSON, depois formato e versão, depois item por item), sem mudar nada antes de terminar de conferir. E nunca coloco dado de fora no `innerHTML`, por causa de XSS.

## Teste rápido

```quiz
? Por que o JSON.parse fica dentro de um try?
[ ] Para deixar a leitura mais rápida.
    -> Errada: o try não muda a velocidade.
[x] Porque ele dá erro quando o texto não é JSON, e o catch transforma esse erro numa mensagem.
    -> Certa: sem o try, um arquivo errado quebraria a página.
[ ] Porque todo JSON tem erro.
    -> Errada: um JSON correto passa sem erro nenhum. O try é para o caso de o arquivo não ser JSON.
```

```quiz
? Uma cópia tem 10 compromissos, e 1 deles está sem título. O que a Agenda faz?
[ ] Recusa o arquivo inteiro.
    -> Errada: um item ruim não derruba a cópia toda.
[x] Importa os 9 certos e avisa que 1 foi ignorado.
    -> Certa: é a terceira camada, a conferência item por item.
[ ] Importa os 10 e deixa o título vazio.
    -> Errada: um item com problema nunca entra na agenda.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e crie uma quarta linha de teste com `"versao": 2`. Qual mensagem aparece?
- [ ] Na linha 14, acrescente mais um compromisso sem título e rode. O número de ignorados mudou?
