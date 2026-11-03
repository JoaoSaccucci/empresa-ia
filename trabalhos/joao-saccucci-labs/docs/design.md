# Design: João Saccucci Labs

Conceito: **"centro de comando de IA"**. Fundo espacial escuro, grade e partículas sutis, painéis de vidro e brilhos neon. Cada agente é uma "unidade de IA" com cor e avatar geométrico próprios. O neon fica em detalhes (bordas, rótulos, botões); o texto é sempre claro sobre escuro, para continuar legível e profissional.

Arquivos: `css/style.css` (tudo pronto, com variáveis em `:root`), `img/agentes/*.svg` e `img/icones/*.svg` (Etapa 2). A Etapa 2 está na seção 10.

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
