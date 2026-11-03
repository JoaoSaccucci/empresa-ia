# João Saccucci Labs

Site da empresa de agentes de IA do João. HTML, CSS e JavaScript puros, sem framework e sem build.

## Como abrir

O site lê os dados de arquivos JSON com `fetch`. Se você abrir o `index.html` com dois cliques (endereço `file://`), o navegador bloqueia essa leitura e as páginas mostram uma mensagem de erro.

1. Abra esta pasta (`trabalhos/joao-saccucci-labs`) no VS Code.
2. Instale a extensão **Live Server** (de Ritwick Dey), se ainda não tiver.
3. Clique com o botão direito no `index.html` e escolha **Open with Live Server**.

No GitHub Pages funciona sem nada disso, porque todos os caminhos são relativos.

## Estrutura

```
index.html             Início: apresentação e fluxo de trabalho
lista-projetos.html    Lista de projetos (gerada a partir do JSON)
detalhe-projeto.html   Detalhe de um projeto (com linha do tempo): detalhe-projeto.html?id=<id-do-projeto>
equipe.html            Perfis dos agentes e projetos de cada um
sobre.html             Sobre mim: cartão do João (conteúdo fixo, sem JSON)
aulas.html             Lista de aulas (gerada a partir do JSON), com ✓ nas concluídas
aula.html              Tela de leitura de uma aula: aula.html?id=<id-da-aula>
css/style.css          Visual do site (feito pelo artista; ajustes do dev nas seções 22 e 37)
js/comum.js            Menu do celular, leitura dos JSON, funções auxiliares e progresso salvo (localStorage)
js/lista-projetos.js   Monta a lista de projetos
js/detalhe-projeto.js  Monta o detalhe do projeto
js/timeline.js         Monta a linha do tempo do projeto (usada pelo detalhe-projeto.js)
js/equipe.js           Monta a página Equipe
js/aulas.js            Monta a lista de aulas
js/aula.js             Tela de leitura: Markdown -> HTML, caixas, glossário, checklist, código, sumário, letra, tema
data/agentes.json      Os 4 agentes (nome, papel, cor, avatar)
data/projetos.json     Os projetos, os trabalhos de cada agente e a linha do tempo
data/aulas.json        As aulas (título, projeto, número, arquivo .md, tempo de leitura, resumo)
data/glossario.json    Palavras em inglês usadas nas aulas, com tradução e explicação
aulas/                 Os textos das aulas em Markdown (.md), escritos pelo professor
img/agentes/           Avatares SVG dos agentes
img/icones/            Ícones SVG, colados inline no HTML/JS (contato no sobre.html; sumário, tema, concluída, relógio e copiar nas aulas)
.nojekyll              Faz o GitHub Pages servir os arquivos .md como estão
docs/requisitos.md     Requisitos (product-owner)
docs/design.md         Decisões de visual (artista)
```

## Como adicionar um projeto

Edite só o `data/projetos.json`, seguindo o modelo descrito no `docs/requisitos.md`. Não é preciso mexer em HTML nem em JS: a lista, o detalhe e a página Equipe se atualizam sozinhos.

A linha do tempo do detalhe vem do campo `linhaDoTempo` de cada projeto. Os eventos são ordenados pela data (formato `AAAA-MM-DD`) e agrupados por dia. Projeto sem eventos não mostra a seção.

## Como preencher a página Sobre

O `sobre.html` é escrito direto no HTML. Troque tudo que está **[entre colchetes]**:

- frase, curso, cidade, área de interesse e a lista "O que estudo";
- link do GitHub: `https://github.com/[seu-usuario]`;
- link do LinkedIn: `https://www.linkedin.com/in/[seu-usuario]`;
- e-mail: troque `seu-email@exemplo.com` (no `href="mailto:..."`) pelo seu e-mail.

O selo "Buscando estágio" pode ter o texto trocado ou a linha apagada.

## Aulas (Etapa 3)

### Como adicionar uma aula

1. O professor escreve o arquivo em `aulas/aula-NN.md`.
2. Acrescente a aula em `data/aulas.json` (modelo no `docs/requisitos.md`). O `id` segue o formato `<id-do-projeto>-aula-NN`.
3. Pronto: ela aparece em `aulas.html` e abre em `aula.html?id=<id>`. Não precisa mexer em HTML nem em JS.

### O que dá para escrever no `.md`

| No `.md` | No site |
|---|---|
| `> [!TIP]` | caixa "Dica" |
| `> [!CAUTION]` | caixa "Erro comum" |
| `> [!IMPORTANT]` | caixa "Em entrevista" |
| `> [!NOTE]` | caixa "Palavra nova" |
| `[[fetch]]` | palavra com balão de tradução (o termo precisa existir em `data/glossario.json`; se não existir, aparece como texto normal) |
| `- [ ] passo` | checkbox do exercício, salvo no navegador |

HTML escrito direto no `.md` (como `<script>`) aparece como texto e não é executado.

### Bibliotecas externas (só na `aula.html`)

- `marked` 12.0.2 (jsDelivr): converte o Markdown em HTML.
- `highlight.js` 11.9.0 (cdnjs): pinta o código. O tema de cores está no `css/style.css` (seção 30), não vem do CDN.

As duas têm versão fixa na URL e `integrity` (se o arquivo do CDN mudar, o navegador não executa). Se a `marked` não carregar, a página mostra um link para o `.md` original; se a `highlight.js` não carregar, o código aparece sem cores.

### Progresso salvo

Fica no `localStorage` do navegador de quem lê (cada pessoa vê só o seu), com chaves que começam com `jsl:`:

- `jsl:aulas-concluidas`: lista de ids das aulas concluídas;
- `jsl:checklist:<id-da-aula>`: marcações do exercício;
- `jsl:leitura-fonte`: tamanho da letra (1 a 5);
- `jsl:leitura-tema`: `"escuro"` ou `"papel"`.

Para zerar tudo: F12 > Application > Local Storage > apagar as chaves `jsl:`. Se o navegador bloquear o `localStorage`, a tela funciona normalmente, só não lembra nada depois.
