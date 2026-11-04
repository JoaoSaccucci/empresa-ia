# João Saccucci Labs

**Sou estudante de TI, e este repositório é o meu laboratório de projetos.**

Ele simula uma empresa em que trabalho com uma equipe de agentes de IA para transformar ideias em projetos, do primeiro requisito ao código explicado. Cada agente cuida de uma parte do trabalho: levantar os requisitos, desenhar o visual, programar, testar e me explicar o código. Eu decido o que construir, aprovo cada etapa e estudo o que foi feito.

### 🌐 Veja o site: **https://joaosaccucci.github.io/empresa-ia/**

O primeiro projeto da empresa é o próprio site, que mostra os projetos, o que cada agente fez em cada um, a linha do tempo do trabalho e as aulas do professor.

---

## A equipe

| | Agente | Papel |
|---|---|---|
| <img src="trabalhos/joao-saccucci-labs/img/agentes/product-owner.svg" width="40" alt=""> | **Product Owner** | Me entrevista com perguntas curtas e escreve as user stories com critérios de aceite. |
| <img src="trabalhos/joao-saccucci-labs/img/agentes/artista.svg" width="40" alt=""> | **Artista** | Define cores, tipografia e layout, e escreve o CSS e os ícones em SVG. |
| <img src="trabalhos/joao-saccucci-labs/img/agentes/dev.svg" width="40" alt=""> | **Dev** | Implementa o que foi definido e testa no computador e no celular. |
| <img src="trabalhos/joao-saccucci-labs/img/agentes/testador.svg" width="40" alt=""> | **Testador** | Garante a qualidade (QA): testa celular, teclado, acessibilidade e contraste e escreve um relatório de teste. |
| <img src="trabalhos/joao-saccucci-labs/img/agentes/professor.svg" width="40" alt=""> | **Professor** | Explica o código de cada entrega em aulas curtas, com exercícios e frases para entrevista. As aulas ficam na aba **Aulas** do site. |
| <img src="trabalhos/joao-saccucci-labs/img/agentes/mentor-carreira.svg" width="40" alt=""> | **Mentor de carreira** | Agente de apoio, fora do fluxo dos projetos: me ajuda a planejar os estudos e a carreira. |

Os agentes rodam no [Claude Code](https://claude.com/claude-code). As regras da empresa estão em [`CLAUDE.md`](CLAUDE.md) e a descrição de cada agente em [`.claude/agents/`](.claude/agents/).

## Como o trabalho acontece

```text
Ideia do chefe → Product Owner → Artista → Dev → Testador → Professor
                 (requisitos)    (visual)   (código)  (relatório)  (aula + exercício)
```

1. O **product-owner** levanta os requisitos comigo, uma pergunta por vez, e escreve as user stories.
2. O **artista** define o visual a partir dos requisitos.
3. O **dev** implementa e testa.
4. O **testador** confere a entrega contra os critérios de aceite e escreve um relatório. Se algo falhar, volta para o dev.
5. O **professor** escreve uma aula sobre o código entregue, e eu faço o exercício.

O **mentor de carreira** trabalha fora desse fluxo. O trabalho dele (LinkedIn, currículo, entrevistas simuladas) fica fora deste repositório.

Cada entrega vira um commit, e o site no GitHub Pages se atualiza sozinho.

## Projetos

| Projeto | O que tem | Pasta |
|---|---|---|
| **Site João Saccucci Labs** | Início, Projetos (com linha do tempo), Equipe, Aulas (15 aulas curtas em módulos, com exemplos que rodam na própria página, quiz, sumário, glossário e código colorido) e Sobre | [`trabalhos/joao-saccucci-labs`](trabalhos/joao-saccucci-labs/) |

## Tecnologias

- **HTML, CSS e JavaScript puros**, sem framework e sem etapa de build
- Dados em **JSON**, lidos com `fetch`
- Na tela de aulas: **marked** (Markdown → HTML) e **highlight.js** (cores do código), por CDN com versão fixa e `integrity`
- **Git e GitHub**, com publicação no **GitHub Pages**

## Estrutura

```text
empresa-ia/
├── CLAUDE.md              Regras da empresa
├── .claude/agents/        Os 6 agentes (product-owner, artista, dev, testador, professor, mentor-carreira)
├── index.html             Atalho que leva ao site
└── trabalhos/
    └── joao-saccucci-labs/
        ├── README.md      Detalhes do site e como rodar
        ├── docs/          Requisitos (PO) e design (artista)
        ├── aulas/         Aulas do professor, em Markdown
        ├── data/          Projetos, agentes, aulas e glossário (JSON)
        ├── css/ · js/ · img/
        └── *.html         As páginas do site
```

## Como rodar no seu computador

1. Clone o repositório: `git clone https://github.com/JoaoSaccucci/empresa-ia.git`
2. Abra a pasta `trabalhos/joao-saccucci-labs` no VS Code.
3. Clique com o botão direito no `index.html` e escolha **Open with Live Server**.

O site precisa de um servidor local porque lê os arquivos JSON com `fetch`, e o navegador bloqueia isso quando a página é aberta direto do disco (`file://`).

## Sobre mim

Sou o **João Saccucci**, estudante de Análise e Desenvolvimento de Sistemas na USCS (4º semestre), em São Caetano do Sul, SP. Estou buscando estágio em desenvolvimento de software.

[LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-lucas-lemes-saccucci/) · [E-mail](mailto:jllsaccucci@gmail.com) · [Página Sobre no site](https://joaosaccucci.github.io/empresa-ia/trabalhos/joao-saccucci-labs/sobre.html)

---

## In English

I'm an IT student, and **João Saccucci Labs** is my project lab. It simulates a company where I work with a team of AI agents to turn ideas into projects, from the first requirement to the explained code. A Product Owner agent gathers requirements by interviewing me, an Artist agent designs the UI, a Dev agent implements it, a Tester agent checks it (QA), and a Teacher agent writes lessons explaining the code so I learn from every delivery. The lessons are in the site's **Aulas** (Lessons) tab.

Its first project is its own website, built with **plain HTML, CSS and JavaScript** (no framework, no build step) and data in JSON. It shows each project, what each agent did, a project timeline, and an interactive lesson reader with table of contents, glossary tooltips, syntax highlighting and saved exercise checklists.

**Live site:** https://joaosaccucci.github.io/empresa-ia/

I'm a Systems Analysis and Development (ADS) student at USCS, Brazil, looking for a software development internship. [LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-lucas-lemes-saccucci/) · [E-mail](mailto:jllsaccucci@gmail.com)
