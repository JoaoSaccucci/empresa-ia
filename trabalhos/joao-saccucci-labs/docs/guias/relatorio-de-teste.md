# Guia do relatório de teste

Guia comum do testador, para a Labs e para qualquer projeto novo. Veio da Etapa 5 (US27) e passou a ficar aqui na Etapa 6 (US32).

## Quando escrever

Antes de cada entrega, o testador confere as 5 áreas (celular a 360px, teclado, acessibilidade, contraste e erros) e os critérios de aceite da etapa, e escreve o relatório.

- Com problema de gravidade "alta", o resultado é "Reprovado" e o trabalho volta para o dev. O testador confere de novo depois da correção.
- O professor só começa depois de o relatório estar "Aprovado" ou "Aprovado com pendências".
- Problemas pequenos (que não quebram critério de aceite) podem ficar como pendências anotadas no relatório.

## Onde fica o relatório

Tudo fica dentro da pasta do site da Labs (`trabalhos/joao-saccucci-labs/`), no repositório `empresa-ia`. Assim o relatório fica acessível no site publicado.

| Projeto | Onde ler os requisitos e o design | Onde salvar o relatório | Prints |
|---|---|---|---|
| Labs | `docs/requisitos.md` e `docs/design.md` | `docs/testes/etapa-<N>.md` | `docs/testes/img/` |
| Projeto novo (ex.: Agenda) | `docs/projetos/<projeto>/requisitos.md` e `docs/projetos/<projeto>/design.md` | `docs/projetos/<projeto>/testes/etapa-<N>.md` | `docs/projetos/<projeto>/testes/img/` |

- Um arquivo por etapa. Nos projetos novos, a etapa é contada dentro do projeto (a primeira entrega da Agenda é `etapa-1.md`).
- O relatório **nunca** vai para o repositório do projeto (ele tem só código e README).
- Se a etapa for testada de novo depois de uma correção, o mesmo arquivo ganha uma nova rodada ("Rodada 2"), sem apagar a anterior.
- Prints são opcionais e têm texto `alt`.

## Estrutura do arquivo

1. `# Relatório de teste — Etapa N` (em projeto novo, pode incluir o nome: `# Relatório de teste — Agenda, Etapa N`).
2. Data, o que foi testado (páginas e user stories) e onde (navegadores, Live Server e/ou GitHub Pages).
3. `## Resultado`: "Aprovado", "Aprovado com pendências" ou "Reprovado", com 1 ou 2 frases.
4. `## Verificações`: tabela com as 5 áreas, o resultado em texto ("Passou" ou "Falhou") e uma observação curta:
   - Celular a 360px (sem rolagem horizontal, nada cortado, menu usável).
   - Teclado (tudo alcançável com Tab, foco visível, Esc fecha o que abre, ordem lógica).
   - Acessibilidade (textos `alt`, rótulos de botões, títulos em ordem, estados anunciados, `prefers-reduced-motion`).
   - Contraste (AA para texto e controles, nos dois temas onde houver tema papel).
   - Erros (console sem erros, links e arquivos sem 404, mensagens amigáveis quando um JSON falha).
5. `## Critérios de aceite`: checklist com os critérios das user stories da etapa, marcados `[x]` quando conferidos e aprovados.
6. `## Problemas encontrados`: para cada problema, página, passos para reproduzir, resultado esperado, resultado obtido, gravidade ("alta" quando quebra critério de aceite, "baixa" nos outros casos) e status ("corrigido" ou "pendente"). Se não houver, escrever "Nenhum problema encontrado."

## Cuidados

- O relatório é legível abrindo o `.md` no GitHub.
- Sem senhas, chaves, dados pessoais nem nada da pasta de carreira (o repositório é público).
- Exemplo real: [`docs/testes/etapa-5.md`](../testes/etapa-5.md).
