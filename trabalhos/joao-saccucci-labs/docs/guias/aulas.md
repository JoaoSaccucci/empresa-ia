# Guia das aulas

Guia comum do professor, para as aulas da Labs e de qualquer projeto novo. Junta o que foi definido nas Etapas 3 e 4 (sintaxe, estrutura padrão, quiz e US24) e o que muda na Etapa 6 (US34). Passou a ficar aqui na Etapa 6 (US32).

## Onde ficam as aulas

Todas as aulas ficam no site da Labs (`trabalhos/joao-saccucci-labs/`), no repositório `empresa-ia`, e são cadastradas em `data/aulas.json` (modelo na seção 3 do [`requisitos.md`](../requisitos.md)).

| Projeto | Arquivo da aula | Módulo em `aulas.json` |
|---|---|---|
| Labs | `aulas/modulo-<N>/aula-<NN>.md` | `joao-saccucci-labs-m<N>` |
| Projeto novo (ex.: Agenda) | `aulas/<projeto>/modulo-<N>/aula-<NN>.md` | `<projeto>-m<N>` (ex.: `agenda-m1`), com `"projeto": "<projeto>"` |

Os entregáveis do professor em `data/projetos.json` são um link por módulo: `aulas.html#<id do módulo>` (ex.: `aulas.html#agenda-m1`).

## Estrutura padrão de uma aula

1. `# Título` (o conceito, em linguagem simples).
2. Caixa **Em resumo** (até 3 linhas).
3. `## O conceito`: explicação curta e tranquila.
4. `## Exemplo`: um código pequeno (até 15 linhas), independente do código do projeto, seguido da explicação linha por linha. Pode haver um segundo exemplo, se ajudar.
5. `## Onde aparece no site` (opcional): 1 a 3 frases citando o arquivo do site em que o conceito é usado. Sem colar o código inteiro do site. Nas aulas da Agenda, a seção se chama `## Onde aparece na Agenda`, com a mesma regra de 1 a 3 frases e com o link fixo (ver abaixo).
6. `## Teste rápido` (opcional): 1 a 3 perguntas de quiz.
7. `## Para praticar` (opcional): checklist com no máximo 3 itens.

## Regras de escrita (US24)

- Cada aula trata de **um** conceito, com `tempoLeitura` de 5 a 7 minutos (até cerca de 1.000 palavras, contando o texto).
- Cada exemplo tem no máximo 15 linhas, é independente do código do projeto e roda sozinho.
- Os exemplos em que ver o resultado ajuda usam `rodar`. Exemplos que dependem de `fetch`, `localStorage` ou arquivos do site **não** usam `rodar` (no sandbox eles não funcionam); nesses casos o resultado esperado aparece em texto.
- Pelo menos metade das aulas tem um Teste rápido (quiz) com 1 a 3 perguntas.
- Conteúdo mais complexo aparece pouco e sempre marcado como opcional (ex.: numa caixa Dica "Para ir além").
- Todo termo marcado com `[[...]]` existe em `data/glossario.json`.
- Todas as aulas continuam legíveis abrindo o `.md` no GitHub.

## Citar o código de um projeto novo: link fixo (US34)

O código de um projeto novo fica em outro repositório e muda com o tempo. Por isso, toda citação desse código numa aula usa **link fixo**, preso a um commit:

```text
https://github.com/JoaoSaccucci/<projeto>/blob/<hash completo do commit>/<arquivo>#L<início>-L<fim>
```

- Nenhum link de aula usa `/blob/main/` (esse link muda quando o código muda).
- O commit citado já precisa estar publicado no GitHub quando a aula é publicada. Por isso o projeto é commitado antes da Labs (ver "Entrega em dois repositórios" no `CLAUDE.md` da raiz).
- Os links fixos funcionam dos dois lados: no site e abrindo o `.md` no GitHub.

## Sintaxe do Markdown (compatível com o GitHub)

### Caixas, glossário e checklist (Etapa 3)

| Recurso | Como o professor escreve | No GitHub aparece como | No site aparece como |
|---|---|---|---|
| Caixa Dica | `> [!TIP]` | caixa "Tip" | caixa "Dica" |
| Caixa Erro comum | `> [!CAUTION]` | caixa "Caution" | caixa "Erro comum" |
| Caixa Em entrevista | `> [!IMPORTANT]` | caixa "Important" | caixa "Em entrevista" |
| Caixa Palavra nova | `> [!NOTE]` | caixa "Note" | caixa "Palavra nova" |
| Termo do glossário | `[[fetch]]` | o texto `[[fetch]]` (legível) | palavra marcada com tradução |
| Item do exercício | `- [ ] Criar o arquivo...` | checkbox (lista de tarefas) | checkbox marcável e salvo |

Exemplo de caixa:

```markdown
> [!TIP]
> Use o Live Server para testar o fetch no computador.
```

- Um blockquote comum (sem `[!...]`) aparece como citação normal.
- `[[...]]` dentro de código (`` `assim` `` ou em bloco) **não** é convertido.

### Resumo, exemplos executáveis, linha por linha e quiz (Etapa 4)

| Recurso | Como o professor escreve | No GitHub aparece como | No site aparece como |
|---|---|---|---|
| Em resumo | `> [!TIP]` e, na linha seguinte, `> **Em resumo:** texto...` | caixa "Tip" com "Em resumo:" em negrito | caixa própria "Em resumo" (diferente da Dica) |
| Exemplo executável (HTML/CSS/JS) | bloco ` ```html rodar ` (CSS vai dentro de `<style>`, JS dentro de `<script>`) | código HTML colorido | código com linhas numeradas + botões Rodar, Editar, Restaurar, Copiar |
| Exemplo executável (só JS) | bloco ` ```js rodar ` | código JS colorido | igual ao anterior; o resultado é a saída do console |
| Explicação linha por linha | lista logo depois do bloco: `- **L3:** texto` ou `- **L3–5:** texto` | lista normal | bloco "Linha por linha" ligado ao exemplo |
| Quiz | bloco ` ```quiz ` (regras abaixo) | bloco de texto simples, legível | pergunta com alternativas clicáveis e explicação |

Exemplo completo:

````markdown
> [!TIP]
> **Em resumo:** `querySelector` encontra um elemento da página.
> Depois você pode mudar o texto ou o estilo dele pelo JavaScript.

```html rodar
<p id="msg">Olá</p>
<script>
  const p = document.querySelector('#msg');
  p.textContent = 'Olá, João!';
  console.log(p.textContent);
</script>
```
- **L1:** um parágrafo com o `id` "msg".
- **L3:** procura na página o elemento com `id="msg"` e guarda na constante `p`.
- **L4–5:** troca o texto e mostra o novo texto no console.

```quiz
? O que document.querySelector('#msg') devolve?
[ ] Todos os elementos com a classe msg.
    -> Errada: o # procura por id; classe seria .msg, e para vários use querySelectorAll.
[x] O primeiro elemento com id="msg".
    -> Certa: o # indica id, e querySelector devolve só o primeiro que encontrar.
[ ] O texto "msg".
    -> Errada: ele devolve o elemento, não um texto.
```
````

### Regras do bloco `quiz`

- Um bloco = uma pergunta. Várias perguntas = vários blocos.
- Linha que começa com `?` = pergunta (exatamente uma, e ela vem primeiro).
- Linhas que começam com `[ ]` ou `[x]` = alternativas, de 2 a 5, com **exatamente uma** `[x]`.
- Linha que começa com `->` (pode ter espaços antes) = explicação da alternativa logo acima. Toda alternativa precisa de explicação.
- Linhas em branco são ignoradas. As alternativas aparecem na ordem escrita (sem embaralhar).

### Bloco malformado (o que o site faz)

- Quiz fora das regras acima: aparece como bloco de código comum, com o texto original, e a aula continua normal. O site registra o motivo com `console.warn`.
- ` ```css rodar ` ou qualquer linguagem diferente de `html`/`js` com `rodar`: aparece como bloco de código comum, sem botão Rodar.
- Lista `**Lnn:**` que não vem logo depois de um bloco de código, ou que cita uma linha que não existe: aparece como lista normal.
- "Em resumo" com mais de 3 linhas aparece do mesmo jeito (o limite é regra de escrita, não validação do site).
