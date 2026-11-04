# Como criar o repositório de um projeto novo e ligar o GitHub Pages

Passo a passo para criar o repositório de um projeto novo no GitHub, ligar a pasta do computador a ele e publicar o site. O exemplo é a **Agenda**. Para outro projeto, troque `agenda` pelo nome do repositório dele em todos os passos.

| No exemplo | O que é |
|---|---|
| `agenda` | nome do repositório (é também o `id` do projeto em `projetos.json`) |
| `C:\Projetos\claude\empresa-ia\trabalhos\agenda` | pasta do projeto no computador |
| `https://github.com/JoaoSaccucci/agenda` | endereço do repositório |
| `https://joaosaccucci.github.io/agenda/` | endereço do site publicado |

> [!CAUTION]
> **Nunca** crie um repositório chamado `joaosaccucci.github.io`. Esse nome é especial: ele muda o endereço principal do GitHub Pages da sua conta e pode atrapalhar os outros sites.

## Antes de começar

- O nome do repositório é curto e descritivo, só com letras minúsculas, números e hífen. Ex.: `agenda`, `lista-de-compras`.
- O passo 1 (criar o repositório) pode ser feito a qualquer momento.
- Os passos 2 a 5 só funcionam quando a pasta `trabalhos\agenda\` já tem o código do projeto, aprovado pelo testador. O GitHub Pages precisa de pelo menos um commit para publicar alguma coisa.
- Os comandos são digitados no terminal do VS Code (PowerShell ou Git Bash). Eles usam sempre `git -C "<pasta>"`, que diz ao Git em qual pasta trabalhar. Assim não importa em que pasta o terminal está.
- Nunca cole senha, token ou qualquer credencial em arquivo nenhum. Se o GitHub ou o Git pedirem, apenas faça login na janela que eles abrirem.

## 1. Criar o repositório público e vazio no github.com

1. Abra [github.com](https://github.com) no navegador. Se não estiver logado, faça login.
2. No canto de cima, à direita, clique no botão **+** e depois em **New repository**.
3. Preencha a tela "Create a new repository":
   - **Owner:** `JoaoSaccucci` (já vem escolhido).
   - **Repository name:** `agenda`.
   - **Description:** opcional. Ex.: "Agenda online para anotar compromissos."
   - Marque **Public**.
   - **Deixe tudo vazio:** não marque "Add a README file", deixe ".gitignore" como **None** (ou "No .gitignore") e "License" como **None** (ou "No license").
4. Clique no botão verde **Create repository**.

> [!IMPORTANT]
> Por que vazio? O README, o `.gitignore` e a licença criados pelo site viram um commit lá no GitHub que não existe no seu computador. Aí o primeiro `git push` é recusado. O README do projeto é feito pelo dev, dentro da pasta.

**Deu certo se:** aparece a página do repositório com o título "Quick setup" e o endereço `https://github.com/JoaoSaccucci/agenda.git`.

**Se der errado:**
- "The repository agenda already exists on this account": o repositório já existe. Abra `https://github.com/JoaoSaccucci/agenda` para conferir se é ele mesmo e se está vazio.
- O botão **Create repository** fica cinza: o nome tem caractere inválido ou está vazio. Use só letras minúsculas, números e hífen.

## 2. Ligar a pasta do computador ao repositório

Digite um comando de cada vez no terminal e confira o resultado antes de passar ao próximo.

**2.1. Criar o Git da pasta** (com a branch principal chamada `main`):

```text
git -C "C:\Projetos\claude\empresa-ia\trabalhos\agenda" init -b main
```

Deu certo se aparece: `Initialized empty Git repository in C:/Projetos/claude/empresa-ia/trabalhos/agenda/.git/`.

- "cannot change to ...": a pasta não existe ou o caminho está errado. Confira o nome da pasta.
- "Reinitialized existing Git repository": a pasta já tinha Git. Não tem problema, siga em frente.

**2.2. Dizer ao Git qual é o repositório do GitHub** (o nome `origin` é o apelido do endereço):

```text
git -C "C:\Projetos\claude\empresa-ia\trabalhos\agenda" remote add origin https://github.com/JoaoSaccucci/agenda.git
```

Deu certo se não aparece nenhuma mensagem.

- "remote origin already exists": o apelido já existe. Para corrigir o endereço, use:
  `git -C "C:\Projetos\claude\empresa-ia\trabalhos\agenda" remote set-url origin https://github.com/JoaoSaccucci/agenda.git`

**2.3. Conferir o endereço antes do commit:**

```text
git -C "C:\Projetos\claude\empresa-ia\trabalhos\agenda" remote -v
```

Deu certo se aparecem duas linhas com `https://github.com/JoaoSaccucci/agenda.git`, uma terminada em `(fetch)` e outra em `(push)`. Se o endereço for outro, **pare** e corrija com o `remote set-url` do item 2.2.

**2.4. Escolher os arquivos e conferir a lista:**

```text
git -C "C:\Projetos\claude\empresa-ia\trabalhos\agenda" add .
git -C "C:\Projetos\claude\empresa-ia\trabalhos\agenda" status
```

Deu certo se o `status` mostra "Changes to be committed" com os arquivos do projeto (código e README). Confira se não há nada que não deveria ir para um repositório público (senhas, documentos pessoais, dados de outras pessoas). Requisitos, design e relatórios de teste **não** ficam aqui: eles ficam na Labs.

**2.5. Fazer o primeiro commit:**

```text
git -C "C:\Projetos\claude\empresa-ia\trabalhos\agenda" commit -m "Primeira versão da Agenda"
```

Deu certo se aparece uma linha como `[main (root-commit) 1a2b3c4] Primeira versão da Agenda` e a quantidade de arquivos.

- "Please tell me who you are": o Git do computador ainda não sabe seu nome de autor. Configure com `git config --global user.name` e `git config --global user.email` (no terminal, nunca dentro de um arquivo do projeto) e repita o commit.
- "nothing to commit": a pasta está vazia ou o `add` não foi feito. Volte ao item 2.4.

**2.6. Enviar para o GitHub:**

```text
git -C "C:\Projetos\claude\empresa-ia\trabalhos\agenda" push -u origin main
```

Na primeira vez, pode abrir uma janela pedindo para entrar no GitHub: faça login nela. Deu certo se a última linha é parecida com `branch 'main' set up to track 'origin/main'.`

**Se der errado:**
- Push recusado com "rejected" e "fetch first" (ou "non-fast-forward"): o repositório do GitHub não estava vazio (por exemplo, foi criado com README). Como ele é novo, o jeito mais simples é apagar e criar de novo: no GitHub, abra o repositório, clique em **Settings**, role até "Danger Zone", clique em **Delete this repository** e confirme. Depois refaça o passo 1, agora sem README, `.gitignore` e licença, e rode o `push` de novo.
- "src refspec main does not match any": ainda não existe commit, ou a branch tem outro nome. Faça o item 2.5 e confira o nome da branch com `git -C "C:\Projetos\claude\empresa-ia\trabalhos\agenda" branch`.
- "Repository not found" ou "Permission denied" (erro 403): o endereço está errado ou você entrou com outra conta. Confira o `remote -v` (item 2.3) e faça login com a conta `JoaoSaccucci`.

## 3. Conferir que tudo está no lugar certo

1. Rode de novo o `remote -v` do item 2.3: o endereço continua `https://github.com/JoaoSaccucci/agenda.git`.
2. Abra `https://github.com/JoaoSaccucci/agenda` no navegador e recarregue a página. Deu certo se aparecem os arquivos do projeto e o README embaixo da lista.
3. Confira que o repositório da Labs **não** enxerga a pasta da Agenda:

   ```text
   git -C "C:\Projetos\claude\empresa-ia" status
   ```

   Deu certo se nada de `trabalhos/agenda` aparece na lista. Se aparecer, **pare** e avise a equipe: o `.gitignore` do `empresa-ia` precisa ser conferido.

## 4. Ligar o GitHub Pages

1. Na página do repositório (`https://github.com/JoaoSaccucci/agenda`), clique na aba **Settings** (ícone de engrenagem, no alto).
2. No menu da esquerda, na parte "Code and automation", clique em **Pages**.
3. Em "Build and deployment":
   - **Source:** escolha **Deploy from a branch**.
   - **Branch:** escolha **main** e, na caixa ao lado, a pasta **/ (root)**.
4. Clique em **Save**.

**Deu certo se:** a página mostra uma mensagem dizendo que o site está sendo publicado a partir da branch `main` (ou, depois de alguns minutos, "Your site is live at https://joaosaccucci.github.io/agenda/").

**Se der errado:**
- A caixa "Branch" só mostra "None": o repositório ainda não tem commit. Faça o passo 2 primeiro.
- Não aparece a opção Pages ou ela está bloqueada: confira se o repositório é **Public** (em Settings → General, no fim da página, "Danger Zone" → "Change repository visibility").

## 5. Esperar a publicação e abrir o site

1. Clique na aba **Actions** do repositório. Vai aparecer uma tarefa chamada "pages build and deployment". Espere até ela ganhar um ✓ verde (costuma levar de 1 a 5 minutos).
2. Abra `https://joaosaccucci.github.io/agenda/`.

**Deu certo se:** a Agenda abre, com o visual certo, e o console do navegador (F12 → Console) não mostra erros.

**Se der errado:**
- Página "404 — There isn't a GitHub Pages site here." logo depois de ligar o Pages: é normal nos primeiros minutos. Espere a tarefa da aba Actions terminar e recarregue com Ctrl+F5.
- O 404 continua depois do ✓ verde: confira se existe um arquivo `index.html` (tudo minúsculo) na raiz do repositório e se o Pages está com a branch `main` e a pasta `/ (root)`.
- A tarefa da aba Actions ficou com ✗ vermelho: clique nela para ver o erro e avise a equipe.
- O site abre sem cores ou sem imagens: algum caminho no código começa com `/` (ex.: `/css/style.css`). No GitHub Pages os caminhos precisam ser relativos (ex.: `css/style.css`). Avise o dev.

## Depois

Os próximos envios seguem a regra "Entrega em dois repositórios" do `CLAUDE.md` da raiz: uma proposta de commit só, primeiro o repositório do projeto e depois o `empresa-ia`, sempre com `git -C` e conferindo o `remote -v` antes de cada commit.
