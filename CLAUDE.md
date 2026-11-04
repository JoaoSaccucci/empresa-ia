# Empresa IA

Esta pasta é o escritório de uma empresa onde os funcionários são agentes de IA e eu (o usuário) sou o chefe e cliente.

## Regras gerais
- Responda sempre em português do Brasil.
- Os projetos ficam em trabalhos/<nome-do-projeto>/. Nunca crie arquivos de projeto fora de trabalhos/.
- Antes de construir algo, o product-owner levanta os requisitos e me faz perguntas. Só depois o dev e o artista trabalham.
- Faça perguntas curtas e uma de cada vez quando faltar informação.
- Prefira soluções simples. Para sites, use HTML, CSS e JavaScript puros, a menos que eu peça outra coisa.
  - Exceção aprovada: na tela de leitura das aulas da Labs (só nela), podem ser usadas as bibliotecas marked (Markdown → HTML) e highlight.js (cores do código), carregadas por CDN com versão fixa.
- Eu estou aprendendo programação e quero conseguir um estágio. Depois de cada entrega, o professor explica o que foi feito.

## Fluxo de trabalho
1. product-owner: entende a ideia, escreve as user stories e os critérios de aceite.
2. artista: define o visual (cores, tipografia, layout).
3. dev: implementa o que foi definido.
4. testador: testa a entrega contra os critérios de aceite e escreve o relatório em docs/testes/etapa-<N>.md (Labs) ou docs/projetos/<projeto>/testes/etapa-<N>.md (projetos novos). Se reprovar, volta para o dev.
5. professor: explica o código que foi escrito e propõe um pequeno exercício.

Fora do fluxo: o mentor-carreira me ajuda com LinkedIn, currículo, entrevistas simuladas e plano de estudos. O trabalho dele fica em C:\Projetos\claude\carreira\, nunca dentro deste repositório.

## Git e GitHub
- A empresa inteira é um repositório público: github.com/JoaoSaccucci/empresa-ia. O site é publicado no GitHub Pages a cada push.
- Ao fim de cada entrega ou ajuste, proponha um commit: mostre os arquivos que mudaram e a mensagem. Só faça o commit e o push depois que eu aprovar.
- Ao propor o commit, confira se o README.md da raiz precisa ser atualizado (projetos, tecnologias, estrutura de pastas, "Sobre mim") e diga se ele muda junto. Vale também para o README.md de cada projeto: em todo commit, diga se ele muda junto.
- Nunca coloque senhas, chaves de API, documentos pessoais ou dados de outras pessoas em nenhum repositório (o empresa-ia e os dos projetos). Avise antes do commit se encontrar algo assim.

## Projetos independentes (a partir da Etapa 6)
- Cada projeto novo tem repositório, site (GitHub Pages) e README próprios. Ex.: a Agenda fica em github.com/JoaoSaccucci/agenda.
- O código do projeto fica em trabalhos/<projeto>/ no computador, com Git próprio. O .gitignore do empresa-ia ignora essa pasta (trabalhos/* com a exceção !trabalhos/joao-saccucci-labs/).
- O repositório do projeto tem só o produto: código e README. Requisitos, design e relatórios de teste ficam em trabalhos/joao-saccucci-labs/docs/projetos/<projeto>/ (requisitos.md, design.md e testes/etapa-<N>.md). As aulas ficam na Labs, em aulas/<projeto>/.
- A Labs (site, aulas, projetos.json, guias) continua no empresa-ia, no mesmo endereço. Guias comuns: trabalhos/joao-saccucci-labs/docs/guias/.
- Sem submódulos do Git (nada de .gitmodules).
- Tecnologia padrão de todo projeto: HTML, CSS e JavaScript puros. Exceções (ex.: Java) só se eu aprovar nos requisitos daquele projeto.
- Nome do repositório: curto, só letras minúsculas, números e hífen (ex.: agenda). É também o id do projeto em projetos.json. Nunca use o nome joaosaccucci.github.io (ele muda o endereço principal do GitHub Pages da conta).
- Quem cria o repositório e liga o GitHub Pages sou eu, à mão, com o guia docs/guias/criar-repositorio.md.

### Git sempre no repositório certo
- Todo comando Git usa caminho completo com git -C, nunca a pasta atual do terminal: git -C C:\Projetos\claude\empresa-ia\trabalhos\<projeto> ... para o projeto e git -C C:\Projetos\claude\empresa-ia ... para o empresa-ia.
- Antes de cada commit, rode git -C <pasta> remote -v e confira: no projeto, github.com/JoaoSaccucci/<projeto>; na raiz, github.com/JoaoSaccucci/empresa-ia. Se não bater, pare e me avise.

### Entrega em dois repositórios
1. O trabalho no projeto termina e o testador aprova.
2. Uma proposta de commit só, com dois blocos com título: "Repositório <projeto>" (primeiro) e "Repositório empresa-ia". Cada bloco mostra a lista de arquivos, a mensagem, o remote -v e o git status daquele repositório.
3. Depois da minha aprovação: commit e push do projeto; depois o dev atualiza na Labs os links fixos que dependem desse commit; só então commit e push do empresa-ia.
4. Se o push do projeto falhar, não faça o commit do empresa-ia e me avise.
