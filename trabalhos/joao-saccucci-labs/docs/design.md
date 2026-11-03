# Design: João Saccucci Labs

Conceito: **"centro de comando de IA"**. Fundo espacial escuro, grade e partículas sutis, painéis de vidro e brilhos neon. Cada agente é uma "unidade de IA" com cor e avatar geométrico próprios. O neon fica em detalhes (bordas, rótulos, botões); o texto é sempre claro sobre escuro, para continuar legível e profissional.

Arquivos: `css/style.css` (tudo pronto, com variáveis em `:root`), `img/agentes/*.svg` e `img/icones/*.svg` (Etapa 2). A Etapa 2 está na seção 10 e a Etapa 3 (aulas) na seção 11.

---

## 1. Paleta

| Token | Hex | Uso | Contraste sobre `#05060F` |
|---|---|---|---|
| `--cor-fundo` | `#05060F` | fundo da página | - |
| `--cor-fundo-2` | `#0B1020` | interior dos avatares, áreas sólidas | - |
| `--cor-vidro` | `rgba(18,24,48,.55)` | cards de vidro | - |
| `--cor-borda` | `rgba(148,163,255,.16)` | bordas finas | - |
| `--cor-texto` | `#E8ECF8` | texto principal | ~17:1 (AAA) |
| `--cor-texto-suave` | `#9AA3BF` | texto secundário, datas | ~7.8:1 (AAA) |
| `--cor-ciano` | `#00E5FF` | links, destaques, PO | ~13:1 |
| `--cor-roxo` | `#B45CFF` | Artista, status planejado | ~5.7:1 (AA) |
| `--cor-magenta` | `#FF2BD6` | Dev | ~6.3:1 (AA) |
| `--cor-verde` | `#7CFFB2` | Professor, status concluído | ~16:1 |
| `--cor-erro` | `#FF6B81` | mensagens de erro | ~7:1 |
| `--gradiente` | ciano → roxo → magenta | botão principal, linhas, logo | - |

**Cores dos agentes (valores finais para `data/agentes.json`, campo `cor`):**

| id | cor |
|---|---|
| product-owner | `#00E5FF` (mantida) |
| artista | **`#B45CFF`** (correção: era `#B026FF`) |
| dev | `#FF2BD6` (mantida) |
| professor | `#7CFFB2` (mantida) |

Motivo da correção: `#B026FF` dá ~4.4:1 sobre o fundo, abaixo do mínimo AA (4.5:1) para texto. `#B45CFF` é o mesmo roxo, um pouco mais claro, com ~5.7:1.

Regra: o botão principal usa gradiente com **texto escuro** (`#05060F`), nunca texto branco sobre o neon.

## 2. Tipografia (Google Fonts)

Colocar no `<head>` de todas as páginas, antes do `style.css`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Exo+2:wght@600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

| Fonte | Uso |
|---|---|
| **Exo 2** 700–800 (trocou a Orbitron, cujo "ã" parecia "à") | só logo e `h1` (é decorativa, não usar em texto corrido) |
| **Space Grotesk** 400-700 | corpo, `h2`, `h3`, botões |
| **JetBrains Mono** 400 | rótulos, datas, badges, menu, IDs de agente |

Escala: 12 / 14 / 16 / 20 / 24-32 (h2) / 32-56 (h1, fluido com `clamp`). Corpo 16px, `line-height: 1.6`, parágrafos com no máximo 65 caracteres por linha.

## 3. Espaçamento, raios, sombras

- Espaço (escala de 4px): `--esp-1` 4 · `--esp-2` 8 · `--esp-3` 12 · `--esp-4` 16 · `--esp-5` 24 · `--esp-6` 32 · `--esp-7` 48 · `--esp-8` 64.
- Raios: `--raio-sm` 6px (tags) · `--raio-md` 12px (chips, botão do menu) · `--raio-lg` 20px (cards) · `--raio-pill` (botões, badges).
- Sombra: `--sombra` (profundidade). Brilhos: `--brilho-ciano`, `--brilho-magenta`, e brilho na cor do agente no hover do card dele.
- Container: máximo 1120px, margem lateral 16px (celular) e 32px (a partir de 768px).

## 4. Cor do agente por variável

Todo componente de agente usa a variável `--agente-cor`. O dev define no elemento, com o valor do JSON:

```html
<article class="card agente-card" style="--agente-cor: #00E5FF">
```

Funciona igual em `.fluxo-etapa`, `.trabalho` e `.timeline-item`. Avatares devem ser usados com `<img src="img/agentes/<id>.svg" alt="Avatar do <nome>">`.

## 5. Componentes (classes no CSS)

| Componente | Classes | Notas |
|---|---|---|
| Header | `.site-header > .container > .logo + .nav-toggle + .nav > ul.nav-lista > a.nav-link` | Fixo no topo, vidro escuro. Logo: `<a class="logo">JOÃO SACCUCCI <span>LABS</span></a>`. Página atual: `aria-current="page"`. |
| Menu mobile | `.nav-toggle` (com `<span class="nav-toggle-icone"></span>` e `aria-expanded`), `.nav.is-open` | Abaixo de 768px o menu fica escondido. O JS alterna `.is-open` e `aria-expanded`. O ícone vira X sozinho. |
| Botões | `.btn.btn-primario`, `.btn.btn-secundario` | Altura mínima de 44px. |
| Hero | `.hero > .rotulo + h1 + p.hero-texto + .hero-acoes` | Centralizado. Usar `.texto-gradiente` em "Labs". |
| Fluxo | `ol.fluxo > li.fluxo-etapa` (avatar 40px + nome) | Numeração 01-04 automática. Vertical no celular, 4 colunas com conectores no desktop. |
| Card base | `.card`, grades `.grade-cards` e `.grade-equipe` | Vidro + borda fina + blur. `.grade-cards` (projetos) se ajusta sozinha, mínimo 300px por coluna. `.grade-equipe` usa 1/2/4 colunas. |
| Card de projeto | `a.card.projeto-card > .projeto-card-topo (h3 + .badge) + p.projeto-card-descricao + .data + .projeto-card-link` | O card inteiro é o link. Linha de gradiente no topo e hover que sobe 4px. |
| Badge de status | `.badge.badge--planejado / --andamento / --concluido` | Roxo / ciano com bolinha pulsando / verde. O texto do status sempre aparece (não depende só da cor). |
| Tags de tecnologia | `.tags > span.tag` | Mono, discretas. |
| Card de agente | `article.card.agente-card > img.agente-avatar + .agente-id + h3 + p.agente-papel + .agente-projetos (h4 + ul)` | Borda superior na cor do agente, avatar flutuando, brilho colorido no hover. `.agente-id` mostra `UNIDADE://<id>`. |
| Detalhe: cabeçalho | `.voltar`, `.projeto-cabecalho > h1 + p + .projeto-meta (.badge, .data) + .tags` | |
| Bloco de trabalho | `article.card.trabalho > .trabalho-cabecalho (img + h3) + p.trabalho-resumo + h4.trabalho-subtitulo + .entregaveis > a.entregavel + h4.trabalho-subtitulo + .galeria > img` | Borda esquerda na cor do agente. Lista vazia: esconder o bloco ou usar `<p class="vazio">Sem itens ainda</p>`. |
| Timeline (Etapa 2) | `section.timeline-secao > h2 + ol.timeline > li.timeline-dia > (h3.timeline-dia-data > time) + ol.timeline-eventos > li.timeline-item > img.timeline-avatar + div.timeline-conteudo > (span.timeline-agente + p.timeline-descricao)` | Agrupada por data. Mini avatar de 32px sobre a linha. Estrutura exata na seção 10.1. |
| Sobre: cartão (Etapa 2) | `article.card.id-cartao > .id-topo + .id-corpo (.id-monograma + .id-info) + p.id-frase + .contatos + .id-rodape` | "Cartão de identidade do chefe". Estrutura exata na seção 10.2. |
| Sobre: blocos (Etapa 2) | `.sobre-grade > section.card.sobre-bloco` (x2), `ul.estudos`, `ul.mini-avatares` | "O que estudo" e "Minha equipe". |
| Ícones | `svg.icone` (inline, `currentColor`) | Fontes em `img/icones/github.svg`, `linkedin.svg`, `email.svg`. |
| Mensagens | `.mensagem`, `.mensagem--erro` | Carregando, erro ao ler o JSON, "Projeto não encontrado" (com link de volta). |
| Footer | `.site-footer > .container` | Mono, pequeno: "© 2026 João Saccucci Labs" à esquerda e "Feito por agentes de IA" à direita. |
| Utilitários | `.container`, `.secao`, `.rotulo`, `.texto-gradiente`, `.texto-suave`, `.sr-only`, `.surgir` | |

## 6. Layout das páginas (wireframes)

**Início (`index.html`)**
```
[HEADER: logo .................... Início Projetos Equipe Sobre]
            // EMPRESA DE AGENTES DE IA        (.rotulo)
            João Saccucci [Labs]               (h1, Labs com gradiente)
            Texto de até 3 frases              (.hero-texto)
            [Ver projetos]  [Conhecer a equipe]
--------------------------------------------------------------
// COMO TRABALHAMOS
[01 PO] -> [02 Artista] -> [03 Dev] -> [04 Professor]   (.fluxo)
--------------------------------------------------------------
[FOOTER]
```

**Projetos (`lista-projetos.html`)**
```
[HEADER]
// PROJETOS
h1 Projetos
[card][card][card]      <- .grade-cards (1 coluna no celular)
(ou .mensagem--erro se o JSON falhar)
[FOOTER]
```

**Detalhe (`detalhe-projeto.html?id=...`)**
```
[HEADER]
<- Voltar para projetos
h1 Nome do projeto
descrição
[EM ANDAMENTO]  início 2026-11-02  ·  fim —
[HTML][CSS][JavaScript]
--------------------------------------------------------------
h2 Trabalho dos agentes
| [avatar] Product Owner                  (.trabalho, borda colorida)
| resumo
| ENTREGÁVEIS  [↗ Requisitos]
| IMAGENS      [print][print]  (ou escondido)
--------------------------------------------------------------
h2 Linha do tempo  (Etapa 2, detalhes na seção 10.1)
<> 2026-11-02                         (losango ciano = marco do dia)
|
(PO)  | PRODUCT OWNER                 (avatar 32px sobre a linha,
|     | Entrevista com o João...       caixa de vidro com borda
|                                      esquerda na cor do agente)
(PO)  | PRODUCT OWNER
|     | Requisitos documentados...
(ART) | ARTISTA
|     | ...
[FOOTER]
```

**Equipe (`equipe.html`)**
```
[HEADER]
// UNIDADES DE IA
h1 Equipe
[agente][agente][agente][agente]   <- .grade-equipe: 1 coluna no celular,
                                     2 a partir de 640px, 4 a partir de 1024px
[FOOTER]
```

**Sobre (`sobre.html`, Etapa 2, detalhes na seção 10.2)**
```
[HEADER]
// O CHEFE                                   (.rotulo, fora do cartão)
+-[ borda com gradiente ]------------------------------------+
| CHEFE://JOAO-SACCUCCI            (o) BUSCANDO ESTÁGIO      |  .id-topo
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  |
|  +------+   h1 João Saccucci                               |  .id-corpo
|  |  JS  |   Chefe da João Saccucci Labs · [curso]          |
|  +------+   ACESSO        BASE           FOCO              |  dl.id-dados
|  (anel      Nível máximo  [Sua cidade]   [Sua área]        |
|   girando)                                                 |
| | "[Sua frase aqui]"                                       |  .id-frase
| [GitHub] [LinkedIn] [E-mail]                               |  .contatos
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  |
| ID JSL-0001                          ||| |||| | |||        |  .id-rodape
+------------------------------------------------------------+
+-- O que estudo ---------------+ +-- Minha equipe ----------------+
| // FORMAÇÃO                   | | // UNIDADES SOB COMANDO        |
| h2 O que estudo               | | h2 Chefe de 4 unidades de IA   |
| [Curso / instituição]         | | (PO)(ART)(DEV)(PROF) sobrepostos|
| > [Tecnologia 1]              | | Texto curto                    |
| > [Tecnologia 2]              | | [Conhecer a equipe ->]         |
+-------------------------------+ +--------------------------------+
[FOOTER]
```
No celular (abaixo de 640px): monograma em cima do nome, ficha em 1 coluna, botões de contato esticam para preencher a linha. Os dois blocos de baixo ficam lado a lado a partir de 768px.

## 7. Mobile (a partir de 360px)

- Abaixo de 768px: menu hambúrguer, fluxo vertical, cards em 1 coluna, padding lateral de 16px.
- Todos os alvos de toque têm pelo menos 44px de altura.
- `body` tem `overflow-x: hidden`, imagens com `max-width: 100%` e badges/tags quebram linha com `flex-wrap`. Nada deve criar rolagem horizontal.
- A timeline é vertical em todas as telas.

## 8. Animações

| Animação | Onde | Duração |
|---|---|---|
| Partículas subindo | fundo (`body::after`) | 60s, contínua e bem sutil |
| `surgir` (fade + sobe 16px) | cards e seções ao carregar; escalonar com `style="--atraso: 100ms"` | 600ms |
| Hover (sobe 4px + brilho) | cards e botões | 200ms |
| `flutuar` | avatares da equipe | 5s |
| `pulso` | bolinha do badge "em andamento" | 1.6s |
| `girar` | anel de gradiente do monograma "JS" (Sobre) | 8s, contínua |

Com `prefers-reduced-motion: reduce`, tudo isso é desligado no próprio CSS (seção 21). O dev não precisa fazer nada a mais.

## 9. Avatares (`img/agentes/`)

Robôs geométricos de 120×120 com visor e "olhos", corpo vazado escuro e traço na cor do agente:
- `product-owner.svg`: hexágono com antena e alvo (prioridades).
- `artista.svg`: losango com três pontos de cor (paleta).
- `dev.svg`: quadrado chanfrado com conectores e `</>`.
- `professor.svg`: círculo com capelo de formatura e livro aberto.

Usar sempre via `<img>` (não colar o SVG no HTML, porque os quatro usam o mesmo id interno de gradiente).

---

## 10. Etapa 2

### 10.0 Menu com 4 itens

Em **todas** as páginas, a lista do menu passa a ser:

```html
<ul class="nav-lista">
  <li><a class="nav-link" href="index.html">Início</a></li>
  <li><a class="nav-link" href="lista-projetos.html">Projetos</a></li>
  <li><a class="nav-link" href="equipe.html">Equipe</a></li>
  <li><a class="nav-link" href="sobre.html">Sobre</a></li>
</ul>
```

`aria-current="page"` no link da página atual (em `sobre.html`, no "Sobre"). Conferido:
- **Desktop (a partir de 768px):** logo (~220px) + 4 links em mono 14px (~320px no total) = ~540px, cabe com folga nos 704px úteis da tela de 768px. Nenhum CSS novo.
- **Celular (hambúrguer):** 4 links empilhados de ~46px de altura cada (acima do mínimo de 44px). Em 360px, logo + botão (~280px) cabem nos 328px úteis.

### 10.1 Linha do tempo (US05)

**Decisões**
- **Agrupar por data.** Os 6 eventos reais têm a mesma data; repetir "2026-11-02" seis vezes é ruído. A data aparece uma vez, como um marco (losango ciano) na linha, e os eventos do dia ficam embaixo.
- **Mini avatar + nome colorido.** O avatar de 32px fica em cima da linha, no lugar da bolinha (é o que liga a timeline à identidade de "unidades de IA"). O nome do agente aparece em texto, em mono e na cor dele: a informação não depende só da cor nem só da imagem. Por isso o avatar usa `alt=""` (decorativo, o nome já está escrito ao lado).
- **Ordem:** o JS ordena por `data` (texto ISO, então `a.data.localeCompare(b.data)` funciona). O `sort` do JavaScript é estável: eventos da mesma data mantêm a ordem do JSON. Depois, junta os eventos consecutivos com a mesma data no mesmo `li.timeline-dia`.
- **Data** exibida como está no JSON (`2026-11-02`), igual ao "início 2026-11-02" do cabeçalho, dentro de `<time datetime="...">`.
- **Agente inexistente** no `agentes.json`: o evento NÃO some (é história do projeto). Mostra o `id` como nome, sem `style` (fica ciano, a cor padrão) e um `<span class="timeline-avatar timeline-avatar--vazio" aria-hidden="true"></span>` no lugar do `<img>`.
- **Lista vazia** ou sem `linhaDoTempo`: não mostrar a seção inteira.
- Fica **depois** da seção "Trabalho dos agentes", dentro de `#detalhe-projeto`.

**Estrutura HTML exata** (gerada pelo `detalhe-projeto.js`):

```html
<section class="timeline-secao" aria-labelledby="titulo-timeline">
  <h2 id="titulo-timeline">Linha do tempo</h2>
  <ol class="timeline">
    <!-- um li.timeline-dia por data diferente -->
    <li class="timeline-dia">
      <h3 class="timeline-dia-data"><time datetime="2026-11-02">2026-11-02</time></h3>
      <ol class="timeline-eventos">
        <!-- um li.timeline-item por evento daquele dia -->
        <li class="timeline-item surgir" style="--agente-cor: #00E5FF; --atraso: 0ms">
          <img class="timeline-avatar" src="img/agentes/product-owner.svg" alt="" width="32" height="32">
          <div class="timeline-conteudo">
            <span class="timeline-agente">Product Owner</span>
            <p class="timeline-descricao">Entrevista com o João (8 perguntas).</p>
          </div>
        </li>
        <!-- ... -->
      </ol>
    </li>
  </ol>
</section>
```

- `--agente-cor` e `src` vêm do `agentes.json` (`cor`, `avatar`); o nome vem de `nome` (o CSS deixa em maiúsculas).
- `--atraso` opcional: posição do evento × 80ms, para entrarem em sequência.
- Usar `escapar()` em todos os textos, como no resto do arquivo.

**Medidas (já no CSS, seção 15):** linha de 2px centralizada em 16px; avatar 32px com anel escuro de 3px (que "corta" a linha) + anel de 1px na cor do agente + brilho; caixa `.timeline-conteudo` de vidro com borda esquerda de 3px na cor do agente; 32px entre dias e 16px entre eventos. Em 360px o texto fica com ~230px de largura e nomes de arquivo longos quebram (`overflow-wrap: anywhere`).

**Contraste:** nomes nas cores dos agentes sobre a caixa de vidro: ciano ~12:1, roxo ~5.4:1, magenta ~6:1, verde ~15:1 (todos AA). Descrição em `--cor-texto` (~16:1).

### 10.2 Sobre mim (US06)

**Conceito:** um **cartão de identidade do chefe**, como o crachá de acesso do centro de comando. Sem foto: no lugar dela, um monograma "JS" em gradiente com um anel que gira devagar. Abaixo do cartão, dois blocos: "O que estudo" e "Minha equipe" (liga o João às 4 unidades de IA). Página estática: não precisa de JS além do `comum.js` (menu).

**Decisões**
- O `h1` ("João Saccucci") fica dentro do cartão; o rótulo `// O CHEFE` fica acima, fora dele.
- O status "Buscando estágio" usa o `.badge.badge--andamento` que já existe (bolinha pulsando). O João pode trocar o texto ou remover.
- Ícones de contato são desenhos próprios em traço (não são os logotipos oficiais), sempre com o nome escrito ao lado. São colados **inline** (copiar a tag `<svg>` dos arquivos em `img/icones/`) para usarem `currentColor` e mudarem de cor no hover. Têm `aria-hidden="true"`, porque o texto do botão já diz o que é.
- GitHub e LinkedIn abrem em nova aba (`target="_blank" rel="noopener noreferrer"`) e avisam o leitor de tela com `<span class="sr-only">(abre em nova aba)</span>`. E-mail usa `mailto:`.
- Os mini avatares são escritos direto no HTML (são só 4 e não mudam); cada `li` recebe a cor do agente.
- Tudo entre colchetes é placeholder para o João preencher.

**Estrutura HTML exata** (dentro do `<main class="secao container">`):

```html
<div class="sobre">
  <p class="rotulo">// O chefe</p>

  <article class="card id-cartao surgir" aria-labelledby="titulo-sobre">
    <div class="id-topo">
      <span class="id-rotulo">CHEFE://JOAO-SACCUCCI</span>
      <span class="badge badge--andamento">Buscando estágio</span>
    </div>

    <div class="id-corpo">
      <div class="id-monograma" aria-hidden="true"><span>JS</span></div>
      <div class="id-info">
        <h1 id="titulo-sobre">João Saccucci</h1>
        <p class="id-cargo">Chefe da João Saccucci Labs · [Seu curso ou formação]</p>
        <dl class="id-dados">
          <div><dt>Acesso</dt><dd>Nível máximo</dd></div>
          <div><dt>Base</dt><dd>[Sua cidade]</dd></div>
          <div><dt>Foco</dt><dd>[Sua área de interesse]</dd></div>
        </dl>
      </div>
    </div>

    <p class="id-frase">[Sua frase aqui]</p>

    <div class="contatos">
      <a class="btn btn-secundario contato" href="https://github.com/[seu-usuario]" target="_blank" rel="noopener noreferrer">
        <!-- colar aqui o <svg> de img/icones/github.svg -->
        <span>GitHub</span><span class="sr-only">(abre em nova aba)</span>
      </a>
      <a class="btn btn-secundario contato" href="https://www.linkedin.com/in/[seu-usuario]" target="_blank" rel="noopener noreferrer">
        <!-- colar aqui o <svg> de img/icones/linkedin.svg -->
        <span>LinkedIn</span><span class="sr-only">(abre em nova aba)</span>
      </a>
      <a class="btn btn-secundario contato" href="mailto:[seu-email]">
        <!-- colar aqui o <svg> de img/icones/email.svg -->
        <span>E-mail</span>
      </a>
    </div>

    <div class="id-rodape">
      <span>ID JSL-0001</span>
      <span class="id-barras" aria-hidden="true"></span>
    </div>
  </article>

  <div class="sobre-grade">
    <section class="card sobre-bloco surgir" style="--atraso: 100ms" aria-labelledby="titulo-estudos">
      <span class="rotulo">// Formação</span>
      <h2 id="titulo-estudos">O que estudo</h2>
      <p class="texto-suave">[Curso / instituição / como está estudando]</p>
      <ul class="estudos">
        <li>[Tecnologia ou assunto 1]</li>
        <li>[Tecnologia ou assunto 2]</li>
        <li>[Tecnologia ou assunto 3]</li>
      </ul>
    </section>

    <section class="card sobre-bloco surgir" style="--atraso: 200ms" aria-labelledby="titulo-minha-equipe">
      <span class="rotulo">// Unidades sob comando</span>
      <h2 id="titulo-minha-equipe">Chefe de 4 unidades de IA</h2>
      <ul class="mini-avatares" aria-label="Unidades de IA">
        <li style="--agente-cor: #00E5FF"><img src="img/agentes/product-owner.svg" alt="Product Owner" width="48" height="48"></li>
        <li style="--agente-cor: #B45CFF"><img src="img/agentes/artista.svg" alt="Artista" width="48" height="48"></li>
        <li style="--agente-cor: #FF2BD6"><img src="img/agentes/dev.svg" alt="Dev" width="48" height="48"></li>
        <li style="--agente-cor: #7CFFB2"><img src="img/agentes/professor.svg" alt="Professor" width="48" height="48"></li>
      </ul>
      <p class="texto-suave">Eu decido o que construir. A equipe levanta os requisitos, desenha, programa e me explica cada linha.</p>
      <a class="btn btn-secundario" href="equipe.html">Conhecer a equipe &rarr;</a>
    </section>
  </div>
</div>
```

Ícone inline (exemplo do GitHub, já com a classe certa):

```html
<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
  <path d="M5 9.5V4l4 2.5a9 9 0 0 1 6 0L19 4v5.5c1.3 1.3 1.8 3 1.4 4.8C19.7 17.7 16.5 20 12 20s-7.7-2.3-8.4-5.7C3.2 12.5 3.7 10.8 5 9.5z"/>
  <path d="M9 13.5v.5M15 13.5v.5"/>
</svg>
```

**Detalhes visuais (já no CSS, seção 16)**
- Cartão: borda de 1px com o gradiente da marca, fundo escuro `rgba(11,16,32,.88)`, brilho roxo leve e cantoneiras de "mira" (ciano em cima à esquerda, magenta embaixo à direita).
- Linhas tracejadas separam o topo e o rodapé, como num crachá. O "código de barras" é só gradiente (decorativo, `aria-hidden`).
- Monograma 112×112, raio 20px, "JS" em Exo 2 800 (44px) com gradiente; anel de 3px em gradiente cônico girando em 8s.
- Frase com barrinha vertical ciano→magenta à esquerda, 20px.
- "O que estudo": itens em mono com `>` ciano na frente (cara de terminal).
- Mini avatares 48px, sobrepostos 8px, com anel na cor do agente; sobem 4px no hover.

**Contraste:** todo o texto é `--cor-texto` ou `--cor-texto-suave` sobre fundo escuro (AAA). Rótulo ciano ~12:1. Botões já validados na Etapa 1.

**Celular (360px):** cartão com 280px úteis; monograma em cima, `h1` quebra entre as palavras se precisar; ficha `dl` em 1 coluna; botões de contato crescem para preencher cada linha (alvo de 44px); blocos de baixo em 1 coluna. Nada passa da largura (`overflow: hidden` no cartão + `overflow-wrap: anywhere` nos textos longos).

**Movimento reduzido:** o anel do monograma para (regra própria na seção 16 + a regra geral da seção 21); `surgir`, `pulso` e o hover dos avatares também ficam desligados pela regra geral.

---

## 11. Etapa 3: Aulas (US07 a US17)

CSS pronto em `css/style.css`, **seções 23 a 36** (no fim do arquivo, depois do bloco `@supports`). Ícones novos em `img/icones/`: `sumario.svg`, `tema.svg`, `concluida.svg`, `relogio.svg`, `copiar.svg` (mesmo padrão da Etapa 2: colar o `<svg>` inline, `aria-hidden="true"`).

### 11.0 Conceito e decisões

- **"Modo foco" = sala de estudo do centro de comando.** Mesma identidade (escuro, Exo 2 no `h1`, Space Grotesk no texto, JetBrains Mono nos rótulos), mas sem grade, sem partículas e sem vidro. O fundo é liso (`#070A14`) com um brilho verde fraquinho e parado no topo.
- **Verde do professor (`#7CFFB2`) é a cor de destaque da aula:** número da aula, tracinho dos `h2`, marcadores de lista, item ativo do sumário, barra de progresso, checkbox, botão de concluir. Links continuam ciano (cor de link do site todo).
- **Coluna de texto `64ch`** (cerca de 68 a 72 letras por linha, porque o `ch` mede o "0", mais largo que a letra média). Letra de 17px (celular) a 19px (desktop) no nível padrão, entrelinha 1.75.
- **Tudo dentro do texto usa `em`**: títulos, código e caixas crescem junto com A+. Já cabeçalho, barra de ferramentas, sumário e botões do fim usam `rem` e **não** mudam.
- **Tema papel troca as variáveis do `:root`** (`--cor-fundo`, `--cor-texto`, `--cor-ciano`...) quando o `<html>` tem `data-tema="papel"`. Assim o header, o footer, os botões `.btn` e o contorno de foco mudam sozinhos. Só a `aula.html` coloca esse atributo, então as outras páginas continuam sempre escuras.
- **`aulas.html` é uma página normal do site** (com grade e partículas, sempre escura). O modo foco e o tema papel são só da `aula.html`.

### 11.1 Atributos no `<html>` e no `<body>` da `aula.html`

```html
<html lang="pt-BR" data-tema="escuro" data-fonte="3">
...
<body class="modo-foco">
```

| Onde | Atributo / classe | Valores | Quem muda |
|---|---|---|---|
| `<html>` | `data-tema` | `"escuro"` (padrão) ou `"papel"` | botão de tema |
| `<html>` | `data-fonte` | `"1"` a `"5"` (padrão `"3"`) | botões A− e A+ |
| `<body>` | `modo-foco` | fixa | já vem no HTML |
| `<body>` | `sumario-aberto` | entra e sai | botão "Sumário", X, fundo escuro, Esc, clique em item |

**Sem "piscar" (US16):** os atributos ficam no `<html>` justamente para um `<script>` curto **no `<head>`, antes do `style.css`**, ler o `localStorage` (`jsl:leitura-tema`, `jsl:leitura-fonte`) e aplicá-los antes de a página aparecer. Esse script precisa de `try/catch` (o `localStorage` pode estar bloqueado).

**Tamanhos de letra (`--leitura-escala`):**

| `data-fonte` | escala | celular → desktop |
|---|---|---|
| 1 | 0.88 | ~15 → 17px |
| 2 | 0.94 | ~16 → 18px |
| **3 (padrão)** | **1** | **17 → 19px** |
| 4 | 1.12 | ~19 → 21px |
| 5 | 1.25 | ~21 → 24px |

No nível 1 o A− recebe `disabled`; no nível 5, o A+.

### 11.2 Tokens e contraste (tema escuro × papel)

| Token | Escuro | Papel | Contraste (escuro / papel) |
|---|---|---|---|
| `--leitura-fundo` | `#070A14` | `#F7F1E3` (creme) | - |
| `--leitura-superficie` | `#0E1324` | `#EFE6D2` | - |
| `--leitura-codigo-fundo` | `#0A0E1C` | `#EFE6D2` | - |
| `--leitura-texto` (`--cor-texto`) | `#E8ECF8` | `#1F1A14` | 16:1 / 15.3:1 |
| `--leitura-texto-suave` | `#9AA3BF` | `#5C5346` | 7.9:1 / 6.7:1 |
| `--leitura-destaque` (`--cor-verde`) | `#7CFFB2` | `#0A6B3C` | 15.8:1 / 5.9:1 |
| `--leitura-link` (`--cor-ciano`) | `#00E5FF` | `#005F8F` | 12.8:1 / 6.1:1 |
| `--cor-erro` | `#FF6B81` | `#B3261E` | 7:1 / 5.8:1 |
| `--cor-roxo` / `--cor-magenta` | (iguais ao site) | `#6B2FB3` / `#A3127A` | - / 7:1 e 6.4:1 |
| texto sobre o verde (`--leitura-sobre-destaque`) | `#070A14` | `#FFFDF7` | 15.8:1 / 5.9:1 |
| `--balao-fundo` / `--balao-texto` | `#141A30` / `#E8ECF8` | `#FFFDF7` / `#1F1A14` | 14.6:1 / 16.9:1 |

**Caixas de destaque** (título na cor, fundo = 8% da cor misturada ao fundo):

| Markdown | Classe | Ícone + título | Escuro | Papel |
|---|---|---|---|---|
| `[!TIP]` | `.aviso--dica` | 💡 Dica | `#7CFFB2` | `#0A6B3C` |
| `[!CAUTION]` | `.aviso--erro` | ⚠️ Erro comum | `#FF6B81` | `#B3261E` |
| `[!IMPORTANT]` | `.aviso--entrevista` | 🎤 Em entrevista | `#C792FF` | `#6B2FB3` |
| `[!NOTE]` | `.aviso--palavra` | 📖 Palavra nova | `#00E5FF` | `#005F8F` |

Todas acima de 5:1 sobre o fundo da própria caixa nos dois temas.

**Código (highlight.js, tema próprio: não importar CSS de tema do CDN)**

| Variável | O que pinta (classes `.hljs-*`) | Escuro | Papel |
|---|---|---|---|
| `--hl-texto` | texto normal | `#E8ECF8` | `#1F1A14` |
| `--hl-comentario` | `comment`, `quote` (+ itálico) | `#8B93AD` (6.2:1) | `#6A6152` (4.9:1) |
| `--hl-palavra` | `keyword`, `selector-tag`, `this` | `#FF7AD9` | `#A3127A` |
| `--hl-string` | `string`, `regexp` | `#7CFFB2` | `#0A6B3C` |
| `--hl-numero` | `number`, `literal` (true/false/null) | `#FFB86B` | `#9A4A00` |
| `--hl-funcao` | `title`, `title.function_`, `title.class_` | `#67E8F9` | `#1D4FA8` |
| `--hl-tag` | `name` (tag HTML), `selector-class/id/pseudo` | `#67E8F9` | `#005F8F` |
| `--hl-atributo` | `attr` (HTML e chaves JSON), `attribute`, `property`, `params` | `#C9A2FF` | `#6B2FB3` |
| `--hl-embutido` | `built_in` (console, document), `type`, `variable` | `#FFD580` | `#7A4F00` |
| `--hl-pontuacao` | `tag` (`< >`), `punctuation`, `operator`, `meta` | `#9AA3BF` | `#5C5346` |

Todas com 4.5:1 ou mais sobre o fundo do código nos dois temas (a menor é o comentário no papel, ~4.9:1). Bloco sem linguagem: sem `.hljs-*`, fica todo em `--hl-texto`, mesma fonte mono.

### 11.3 Wireframe: `aulas.html` (lista)

```
[HEADER: logo ............ Início Projetos Equipe Aulas* Sobre]
// AULAS DO PROFESSOR                         (.rotulo)
h1 Aulas
Texto curto: "Leia no seu ritmo..."           (.texto-suave)

+--+--------------------------------------------------------+
|01| JOÃO SACCUCCI LABS   [✓ CONCLUÍDA]                       |  a.card.aula-card.aula-card--concluida
|██| h2 Como HTML, JS, fetch e JSON se conectam               |  (quadrado "01" preenchido de verde)
|  | O caminho dos dados do JSON até a tela...                |
|  | (relógio) 15 min de leitura              Ler aula ->     |
+--+--------------------------------------------------------+
+--+--------------------------------------------------------+
|02| JOÃO SACCUCCI LABS                                       |  a.card.aula-card (não concluída:
|  | h2 Linha do tempo, página Sobre e truques de CSS         |   quadrado só com contorno verde)
|  | ...                                                      |
+--+--------------------------------------------------------+
(ou .mensagem.mensagem--erro se o JSON falhar)
[FOOTER]
```
Uma coluna em todas as telas (aulas são uma sequência; lista lê melhor que grade), largura máxima 880px. Quadrado do número: 48px no celular, 64px a partir de 640px.

**Menu com 5 itens (todas as páginas):** Início, Projetos, Equipe, **Aulas**, Sobre (nessa ordem). Conferido: a 768px, logo (~230px) + 5 links (~370px) = ~600px, cabe nos 704px úteis; no celular são 5 linhas de ~46px no hambúrguer. Em `aulas.html` e `aula.html`, `aria-current="page"` no link "Aulas".

**HTML exato** (dentro de `<main class="secao container">`):

```html
<div class="pagina-titulo">
  <p class="rotulo">// Aulas do professor</p>
  <h1>Aulas</h1>
  <p class="texto-suave">Leia no seu ritmo. Marque a aula como concluída no fim de cada uma.</p>
</div>

<ol class="lista-aulas" id="lista-aulas">
  <!-- gerado pelo JS, um <li> por aula, já ordenado -->
  <li class="surgir" style="--atraso: 0ms">
    <a class="card aula-card aula-card--concluida" href="aula.html?id=joao-saccucci-labs-aula-01">
      <span class="aula-card-numero" aria-hidden="true">01</span>
      <div class="aula-card-corpo">
        <div class="aula-card-topo">
          <span class="aula-card-projeto">João Saccucci Labs</span>
          <!-- só nas concluídas: -->
          <span class="aula-card-status"><span aria-hidden="true">✓</span> Concluída</span>
        </div>
        <h2 class="aula-card-titulo"><span class="sr-only">Aula 01: </span>Como HTML, JS, fetch e JSON se conectam</h2>
        <p class="aula-card-resumo">O caminho dos dados do JSON até a tela...</p>
        <div class="aula-card-rodape">
          <span class="aula-card-tempo"><!-- svg relogio.svg -->15 min de leitura</span>
          <span class="aula-card-ler" aria-hidden="true">Ler aula &rarr;</span>
        </div>
      </div>
    </a>
  </li>
</ol>
```
- Não concluída: sem a classe `aula-card--concluida` e sem o `span.aula-card-status`.
- Número com 2 dígitos: `String(numero).padStart(2, "0")`.
- O `h2` tem "Aula 01:" escondido para leitores de tela, porque o quadrado "01" é `aria-hidden`.
- Nome do projeto: vem do `projetos.json` (`nome`); se não achar, mostrar o `id` do projeto.

### 11.4 Wireframe: `aula.html` (leitura)

**Desktop (1024px ou mais)**
```
███████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  <- .leitura-progresso (3px, fixa no topo)
[HEADER: logo ............ Início Projetos Equipe Aulas* Sobre]
                 <- Voltar para as aulas
SUMÁRIO          [AULA 01] JOÃO SACCUCCI LABS
| 1. O caminho   h1 Como HTML, JS, fetch e JSON se conectam
|█2. Os 5 conc.  (relógio) 15 min de leitura
|   2.1 fetch    ------------------------------------------------
| 3. Live Ser.   [A− A+] [◐ Tema papel]  ........  [✓ Concluída]   <- .aula-ferramentas (gruda no topo)
| 4. Exercício
(sticky)         ▬ (tracinho verde)
                 h2 1. O caminho dos dados
                 Texto em 64ch, 19px, entrelinha 1.75...
                 +-[JS]-----------------------[Copiar]-+
                 | const r = await fetch(...)          |   <- .codigo
                 +-------------------------------------+
                 |💡 DICA                                 <- .aviso.aviso--dica
                 | Use o Live Server...
                 [ ] Criar o arquivo...                  <- .checklist
                 [✓] ~~Abrir no navegador~~
                 [Limpar exercício]
                 +-------------------------------------+
                 | Terminou? [✓ Marcar aula como concluída]   <- .aula-fim
                 +-------------------------------------+
                 [<- AULA ANTERIOR ...] [PRÓXIMA AULA -> ...]
[FOOTER]
```

**Celular (360px)**
```
████████░░░░░░░░░░░░░░░░  (progresso)
[HEADER: logo        [≡]]
<- Voltar para as aulas
[AULA 01] JOÃO SACCUCCI LABS
h1 Como HTML, JS...
(relógio) 15 min de leitura
---------------------------------
[≡ Sumário] [A−|A+] [◐] ..... [✓]   <- gruda abaixo do header; tema e
---------------------------------      concluir só com ícone (texto vira sr-only)
texto (17px, 1 coluna, 328px úteis)
blocos de código e tabelas rolam por dentro

Gaveta aberta (body.sumario-aberto):
+--------------------+░░░░░░
| SUMÁRIO        [X] |░░░░░░  <- fundo escuro (.aula-sumario-fundo)
|█2. Os 5 conceitos  |░░░░░░
|  2.1 fetch         |░░░░░░
+--------------------+░░░░░░
```

**HTML exato da página** (o que fica fixo no `aula.html`; o JS preenche os `id`):

```html
<body class="modo-foco">
  <div class="leitura-progresso" aria-hidden="true"><div class="leitura-progresso-barra"></div></div>

  <header class="site-header">...igual às outras páginas, com "Aulas" em aria-current="page"...</header>

  <main class="container aula-layout">
    <aside class="aula-sumario" id="aula-sumario" aria-labelledby="sumario-titulo">
      <div class="aula-sumario-topo">
        <p class="aula-sumario-titulo" id="sumario-titulo">Sumário</p>
        <button class="aula-sumario-fechar" type="button" aria-label="Fechar sumário">&times;</button>
      </div>
      <nav aria-labelledby="sumario-titulo">
        <ol class="sumario-lista" id="sumario-lista">
          <!-- gerado pelo JS a partir dos ## e ### -->
          <li class="sumario-item"><a class="sumario-link" href="#1-o-caminho">1. O caminho dos dados</a></li>
          <li class="sumario-item sumario-item--sub"><a class="sumario-link" href="#fetch">fetch</a></li>
        </ol>
      </nav>
    </aside>
    <div class="aula-sumario-fundo"></div>

    <article class="aula" id="aula">
      <a class="voltar" href="aulas.html">&larr; Voltar para as aulas</a>

      <header class="aula-cabecalho">
        <p class="aula-sobretitulo">
          <span class="aula-numero">Aula 01</span>
          <span class="aula-projeto">João Saccucci Labs</span>
        </p>
        <h1 class="aula-titulo">Como HTML, JS, fetch e JSON se conectam</h1>
        <p class="aula-meta"><!-- svg relogio.svg --><span>15 min de leitura</span></p>
      </header>

      <div class="aula-ferramentas" role="toolbar" aria-label="Ferramentas de leitura">
        <button class="ferramenta aula-sumario-botao" type="button" aria-controls="aula-sumario" aria-expanded="false">
          <!-- svg sumario.svg --><span>Sumário</span>
        </button>
        <div class="ferramenta-grupo" role="group" aria-label="Tamanho da letra">
          <button class="ferramenta ferramenta-letra" type="button" id="fonte-menos" aria-label="Diminuir letra">A&minus;</button>
          <button class="ferramenta ferramenta-letra" type="button" id="fonte-mais" aria-label="Aumentar letra">A+</button>
        </div>
        <button class="ferramenta" type="button" id="botao-tema" aria-pressed="false">
          <!-- svg tema.svg --><span class="ferramenta-texto">Tema papel</span>
        </button>
        <span class="ferramenta-espaco"></span>
        <button class="ferramenta" type="button" data-acao="concluir" aria-pressed="false">
          <!-- svg concluida.svg --><span class="ferramenta-texto">Concluída</span>
        </button>
      </div>

      <div class="aula-conteudo" id="aula-conteudo">
        <!-- HTML do marked, já tratado pelo JS (seção 11.5) -->
      </div>

      <section class="aula-fim" aria-labelledby="aula-fim-titulo">
        <p class="aula-fim-texto" id="aula-fim-titulo">Terminou de estudar esta aula?</p>
        <button class="btn aula-concluir" type="button" data-acao="concluir" aria-pressed="false">
          <!-- svg concluida.svg --><span>Marcar aula como concluída</span>
        </button>
      </section>

      <nav class="aula-navegacao" aria-label="Outras aulas do projeto">
        <a class="aula-nav aula-nav--anterior" href="aula.html?id=...">
          <span class="aula-nav-rotulo">&larr; Aula anterior</span>
          <span class="aula-nav-titulo">Aula 01 · Como HTML, JS...</span>
        </a>
        <a class="aula-nav aula-nav--proxima" href="aula.html?id=...">
          <span class="aula-nav-rotulo">Próxima aula &rarr;</span>
          <span class="aula-nav-titulo">Aula 02 · Linha do tempo...</span>
        </a>
      </nav>
    </article>
  </main>

  <footer class="site-footer">...</footer>
</body>
```

Regras para o dev:
- **Não usar `.surgir` dentro da `aula.html`.** Ele deixa um `transform` no elemento, e isso quebra o balão do glossário no celular (que usa `position: fixed`).
- **Os dois botões `data-acao="concluir"`** (o compacto na barra e o grande no fim) mostram o mesmo estado: o JS atualiza os dois juntos. Estado concluído do botão grande:
  ```html
  <button class="btn aula-concluir" type="button" data-acao="concluir" aria-pressed="true">
    <!-- svg concluida.svg --><span>Aula concluída <span aria-hidden="true">✓</span></span>
    <span class="aula-concluir-desfazer">Desmarcar</span>
  </button>
  ```
- **Botão de tema:** o texto fica sempre "Tema papel"; o que muda é `aria-pressed` (`true` = papel ligado).
- **Só um link de navegação:** mostrar só o que existir. Sem nenhum, remover o `<nav>`.
- **Primeiro `#` do `.md`** (`# Aula 01 ...`) é escondido pelo CSS (`.aula-conteudo > h1:first-child`), porque o título já está no cabeçalho.
- **Aula não encontrada / erro:** colocar `hidden` no `.aula-sumario`, na `.aula-ferramentas` e no `.aula-sumario-fundo`, esvaziar o resto do `article` e mostrar:
  ```html
  <div class="mensagem mensagem--erro aula-mensagem" role="alert">
    <p>Aula não encontrada.</p>
    <a href="aulas.html">&larr; Ver todas as aulas</a>
  </div>
  ```
  Mesma estrutura para "Não foi possível carregar a aula" e para o `marked` fora do ar (o link aponta para o `.md` original). "Carregando aula..." usa só `<div class="mensagem aula-mensagem">`.

### 11.5 Componentes gerados pelo JS dentro de `.aula-conteudo`

**Bloco de código** (embrulhar cada `<pre>`; a linguagem vem da classe `language-xxx` do `<code>`; sem linguagem, não mostrar o `span.codigo-linguagem`):
```html
<div class="codigo">
  <div class="codigo-topo">
    <span class="codigo-linguagem">js</span>
    <button class="codigo-copiar" type="button"><!-- svg copiar.svg --><span>Copiar</span></button>
    <span class="sr-only" role="status"></span>
  </div>
  <pre tabindex="0"><code class="hljs language-js">...</code></pre>
</div>
```
- Copiou: texto do botão vira "Copiado!", `data-estado="copiado"`, e o `span[role=status]` recebe "Código copiado". Depois de ~2s, volta tudo (remove `data-estado`, esvazia o status).
- Falhou: "Não foi possível copiar" e `data-estado="erro"`.
- Copiar o `textContent` do `<code>` (nunca do `div.codigo`).
- `tabindex="0"` no `<pre>`: quem usa teclado consegue rolar o código na horizontal.

**Caixa de destaque** (blockquote cujo primeiro parágrafo começa com `[!TIP]`, etc.; tirar o marcador do texto):
```html
<div class="aviso aviso--dica" role="note">
  <p class="aviso-titulo"><span class="aviso-icone" aria-hidden="true">💡</span>Dica</p>
  <p>Use o Live Server para testar o fetch no computador.</p>
</div>
```
Trocar a classe e o par ícone/título conforme a tabela da seção 11.2. Blockquote sem `[!...]` fica como está (vira citação comum, em itálico com barra cinza).

**Termo do glossário** (`[[fetch]]` fora de código e existente no glossário; `id` único por termo na página):
```html
<span class="glossario">
  <button class="glossario-termo" type="button" aria-expanded="false" aria-describedby="glossario-1">fetch</button>
  <span class="glossario-balao" id="glossario-1" role="tooltip">
    <span class="glossario-traducao">buscar</span>
    <span class="glossario-explicacao">Função do JavaScript que busca um arquivo ou endereço e devolve a resposta.</span>
  </span>
</span>
```
- Abrir = pôr `.is-aberto` no `span.glossario` e `aria-expanded="true"` no botão. Antes, fechar qualquer outro aberto (um por vez).
- Abre com: `mouseenter` e `focusin` no `.glossario`, e clique/toque no botão (alterna).
- Fecha com: `mouseleave`/`focusout` do `.glossario`, tecla Esc, clique/toque fora.
- O balão fica dentro do `.glossario`, então o mouse pode ir até ele sem fechar (a "ponte" de 10px é CSS).
- Sem `explicacao`: não criar o `span.glossario-explicacao`. Termo fora do glossário: só o texto, sem nada em volta.
- Desktop: balão logo abaixo da palavra (até 18rem). Celular (menos de 640px): faixa fixa no pé da tela.
- Limitação conhecida: dentro de uma tabela que rola, no desktop o balão pode ser cortado pela borda da tabela.

**Checklist** (cada `ul` com itens `- [ ]`/`- [x]`; o `marked` gera `<li><input disabled type="checkbox"> texto</li>`):
```html
<ul class="checklist">
  <li class="checklist-item">
    <label class="checklist-rotulo">
      <input class="checklist-caixa" type="checkbox">
      <span class="checklist-texto">Criar o arquivo <code>aulas.json</code></span>
    </label>
  </li>
</ul>
<button class="btn btn-secundario checklist-limpar" type="button">Limpar exercício</button>
```
- Tirar o `disabled` que o `marked` coloca. O `<label>` em volta dá o nome acessível e deixa a linha inteira clicável.
- Um único "Limpar exercício", logo depois do **último** `ul.checklist` da aula.
- Visual: caixa de ~24px com borda verde; marcada fica verde com "certo"; o texto fica riscado e na cor suave (continua AA). A linha marcada fica tracejada e sem fundo.

**Tabela:** embrulhar cada `<table>`:
```html
<div class="tabela-rolagem" tabindex="0" role="region" aria-label="Tabela"> <table>...</table> </div>
```
Se o JS não embrulhar, o CSS faz a própria tabela rolar (plano B).

**Títulos:** cada `h2`/`h3` ganha `id` (o mesmo que vai no `href` do sumário). O CSS já tem `scroll-margin-top` para o título não ficar atrás do header + barra.

**Item ativo do sumário:** `aria-current="true"` no `a.sumario-link` da seção lida (tirar dos outros).

**Barra de progresso:** o JS só muda `style="--progresso: 0.42"` (0 a 1) na `.leitura-progresso`. 0 = topo do `.aula-conteudo` no topo da tela; 1 = fim do `.aula-conteudo` visível.

**Gaveta do sumário (abaixo de 1024px):**
- Abrir: `body.classList.add("sumario-aberto")`, `aria-expanded="true"` no `.aula-sumario-botao`, foco no botão X.
- Fechar (X, clique no `.aula-sumario-fundo`, Esc, clique num item): tirar a classe, `aria-expanded="false"` e devolver o foco ao botão "Sumário" (menos quando foi clique num item: aí o foco segue para a seção).
- Fechada, a gaveta fica com `visibility: hidden`: o Tab não entra nela.

### 11.6 Tipografia da leitura

| Elemento | Tamanho | Detalhe |
|---|---|---|
| `h1.aula-titulo` | 28 → 40px (`clamp`) | Exo 2 700, fixo (não muda com A±) |
| texto | 17 → 19px × escala | Space Grotesk 400, entrelinha 1.75 |
| `h2` | 1.5em | Space Grotesk 700, tracinho verde de 2.5rem × 3px em cima, 2.2em de espaço antes |
| `h3` | 1.2em | 1.8em de espaço antes |
| código em bloco | 0.84em | JetBrains Mono, entrelinha 1.6 |
| código inline | 0.86em | mono, fundo de superfície e borda fina |
| tabela | 0.9em | cabeçalho com fundo, linhas zebradas |
| rótulos (AULA 01, SUMÁRIO, DICA) | 12px | mono maiúsculo, espaçado |

### 11.7 Celular, teclado e movimento

- **360px:** coluna de 328px. `pre` e `.tabela-rolagem` rolam por dentro; código inline, títulos e links longos quebram (`overflow-wrap`). A barra de ferramentas cabe em uma linha (~305px: Sumário com texto, A−/A+, tema e concluir só com ícone); se não couber, ela quebra linha em vez de vazar.
- **Toque:** botões da barra, X da gaveta, itens do sumário e linhas do checklist têm 44px de altura. "Copiar" tem 36px com mouse e 44px em tela de toque.
- **Foco visível:** o contorno ciano global (`:focus-visible`) vale para tudo; no papel ele vira `#005F8F` (6:1). No checklist, o contorno aparece em volta da linha inteira.
- **Movimento reduzido:** a regra geral (seção 21) já desliga transições; a seção 36 garante que a gaveta e a troca de tema sejam instantâneas. A rolagem até a seção deve usar `behavior: "auto"` no JS quando `prefers-reduced-motion` estiver ligado (o `scroll-behavior` do CSS já fica `auto`).
- **Alto contraste do Windows:** o checkbox volta a ser o nativo (`forced-colors`).
