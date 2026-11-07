# Design: João Saccucci Labs

Conceito: **"centro de comando de IA"**. Fundo espacial escuro, grade e partículas sutis, painéis de vidro e brilhos neon. Cada agente é uma "unidade de IA" com cor e avatar geométrico próprios. O neon fica em detalhes (bordas, rótulos, botões); o texto é sempre claro sobre escuro, para continuar legível e profissional.

Arquivos: `css/style.css` (tudo pronto, com variáveis em `:root`), `img/agentes/*.svg` e `img/icones/*.svg` (Etapa 2). A Etapa 2 está na seção 10, a Etapa 3 (aulas) na seção 11, a Etapa 4 (Aulas 2.0) na seção 12 e a Etapa 5 (equipe nova) na seção 13.

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
- `testador.svg` (Etapa 5): escudo com lupa e check (ver 13.2).
- `mentor-carreira.svg` (Etapa 5): mostrador de bússola com agulha (ver 13.2).

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

---

## 12. Etapa 4: Aulas 2.0 (US18 a US24)

O CSS desta etapa é escrito pelo dev, **a partir da seção 38** do `css/style.css` (depois da seção 37, "Ajustes do dev"). Tudo aqui reaproveita os tokens da seção 11: só entram **3 tokens novos**. Ícones novos em `img/icones/`: `resumo.svg`, `rodar.svg`, `editar.svg`, `restaurar.svg`, `errada.svg` (mesmo padrão: colar o `<svg>` inline, `aria-hidden="true"`). O "Certa" do quiz reaproveita o `concluida.svg`.

### 12.0 Conceito e decisões

- **"Laboratório dentro da aula".** O exemplo vira uma bancada: o código, os botões, o resultado e a explicação linha por linha ficam **dentro da mesma caixa** (`div.codigo`), separados por divisórias. Assim fica claro que tudo fala do mesmo exemplo.
- **Verde continua sendo a cor da aula.** "▶ Rodar" é o único botão preenchido de verde no bloco (é a ação principal). Editar, Restaurar e Copiar são contornados, como o Copiar da Etapa 3.
- **Âmbar para o "Em resumo".** Verde é Dica, vermelho é Erro comum, roxo é Em entrevista e ciano é Palavra nova; faltava uma cor livre. O âmbar também lembra "marca-texto", que é o que um resumo faz. Além da cor, a caixa tem **formato próprio** (borda inteira, cantos mais redondos e título numa pílula preenchida), para não depender só da cor.
- **Números de linha numa coluna separada** (não dentro do código). Isso resolve três requisitos de uma vez: não são copiados (o Copiar lê só o `<code>`), não são selecionados (`user-select: none`) e não são lidos (`aria-hidden="true"`). Como a coluna fica fora da área que rola, os números ficam parados enquanto o código rola para o lado no celular.
- **"Resultado" é sempre branco**, nos dois temas: parece uma página em branco do navegador, que é o que ele é.
- **Console com texto e cor.** Cada linha de aviso começa com "Aviso:" e cada erro com "Erro:", além da cor e de uma barrinha à esquerda.
- **Quiz sem cara de prova:** botões grandes, uma letra (A, B, C) para referência, e depois de responder aparece a explicação de todas. Sem nota.
- **`aulas.html` continua sempre escura** (página normal do site). O tema papel continua só na `aula.html`.

### 12.1 Tokens novos e reaproveitados

Tokens **novos** (ficam no bloco `.modo-foco` da seção 23 e no `html[data-tema="papel"] .modo-foco` da seção 24):

| Token | Escuro | Papel | Uso |
|---|---|---|---|
| `--aviso-resumo` | `#FFC857` (âmbar) | `#8A5300` (âmbar tinta) | caixa "Em resumo": pílula do título, borda, fundo (8%) |
| `--console-aviso` | `#FFD580` | `#7A4F00` | linhas de `console.warn` (mesmos valores do `--hl-embutido`) |
| `--resultado-fundo` | `#FFFFFF` | `#FFFFFF` | fundo da área "Resultado" (igual nos dois temas, por isso não muda no papel) |

Tokens **reaproveitados** (não criar outros):

| Para quê | Token |
|---|---|
| Rodar, certa, rótulos "Linha 3", progresso do módulo na aula | `--leitura-destaque` (verde) |
| Texto em cima do verde, do âmbar e do vermelho preenchidos | `--leitura-sobre-destaque` (`#070A14` / `#FFFDF7`) |
| Erro do console, quiz errada | `--cor-erro` (já muda no papel) |
| Números de linha | `--hl-comentario` |
| Texto do console e da caixa editável | `--hl-texto` |
| Fundo do código, da caixa editável e do console | `--leitura-codigo-fundo` |
| Barras de título (topo do código, "Resultado", "Console", "Linha por linha"), fundo do quiz | `--leitura-superficie` |
| Alternativa do quiz (neutra) | `--leitura-fundo` |
| `aulas.html` | `--cor-verde`, `--cor-texto`, `--cor-texto-suave`, `--cor-borda-forte` |

Regra das misturas (tons de fundo): **8%** da cor sobre o fundo, com `color-mix(in srgb, <cor> 8%, <fundo>)`. É o mesmo 8% das caixas da Etapa 3. Não usar 10% ou 12% no tema papel: o verde-tinta perde contraste (ver nota no fim da 12.10).

### 12.2 Lista de aulas por módulo (`aulas.html`, US18)

**Decisões**
- Hierarquia: `h1` Aulas → `h2` nome do projeto → `h3` módulo → `h4` aula. O tamanho visual vem das classes, não do nível do título.
- O número do card vira **"1.2"** (módulo.aula) dentro do mesmo quadrado verde. O nome do projeto sai do card (agora ele é o `h2` acima). O `.aula-card-topo` só aparece quando a aula está concluída (para o "✓ Concluída").
- Progresso do módulo: **texto** ("2 de 5 concluídas") + uma **barrinha decorativa** (`aria-hidden`) logo ao lado. Com todas concluídas, o texto fica verde e ganha "✓".
- "Outras aulas" (aulas com `modulo` inexistente) vem **no fim da página**, com `h2` próprio, sem número de módulo e sem barra. Como o projeto vem do módulo, essas aulas não têm projeto: por isso ficam fora dos grupos de projeto. O quadrado mostra só o número da aula ("2").

**Desktop (a partir de 768px)**
```
[HEADER: logo ............ Início Projetos Equipe Aulas* Sobre]
// AULAS DO PROFESSOR
h1 Aulas
Aulas curtas, um conceito por vez. Leia no seu ritmo.        (.texto-suave)

h2 João Saccucci Labs                                         (.aulas-projeto-titulo)
--------------------------------------------------------------
[MÓDULO 1]                                                    (.modulo-numero, pílula verde)
h3 Etapa 1: o básico do site                                  (.modulo-nome)
HTML, CSS e como o JavaScript lê um JSON e monta a página.    (.modulo-resumo)
2 de 5 concluídas  [████████░░░░░░░░░░░░]                     (.modulo-progresso, barra 10rem)

+-----+----------------------------------------------------+
| 1.1 | [✓ CONCLUÍDA]                                       |  a.card.aula-card.aula-card--concluida
| ███ | h4 O que é uma tag HTML                             |
|     | Resumo de 1 frase...                                |
|     | (relógio) 5 min de leitura            Ler aula ->   |
+-----+----------------------------------------------------+
+-----+----------------------------------------------------+
| 1.2 | h4 Encontrar um elemento com querySelector          |  (não concluída: sem topo)
|     | Como o JavaScript acha um elemento...               |
|     | (relógio) 6 min de leitura            Ler aula ->   |
+-----+----------------------------------------------------+
                                                   48px
[MÓDULO 2]
h3 Etapa 2: ...
...
--------------------------------------------------------------
h2 Outras aulas                                     (só se existir)
+-----+-------------------+
|  2  | h4 ...            |
+-----+-------------------+
[FOOTER]
```

**Celular (360px)**
```
h2 João Saccucci Labs
[MÓDULO 1]
h3 Etapa 1: o básico
   do site                         (quebra normal)
Resumo...
2 de 5 concluídas
[██████████░░░░░░░░░░░░░░░]        (barra ocupa a linha inteira)

+----+------------------------+
|1.1 | [✓ CONCLUÍDA]          |    quadrado 48px
|███ | h4 O que é uma tag     |
|    | HTML                   |
|    | Resumo...              |
|    | (rel.) 5 min           |
|    |          Ler aula ->   |    (o rodapé já quebra linha)
+----+------------------------+
```

**HTML** (dentro de `<main class="secao container">`, depois do `.pagina-titulo`; o `id="lista-aulas"` passa do `<ol>` para este `<div>`):

```html
<div class="aulas" id="lista-aulas">
  <!-- um section.aulas-projeto por projeto -->
  <section class="aulas-projeto" aria-labelledby="projeto-joao-saccucci-labs">
    <h2 class="aulas-projeto-titulo" id="projeto-joao-saccucci-labs">João Saccucci Labs</h2>

    <!-- um section.modulo por módulo COM aulas, em ordem de numero -->
    <section class="modulo" id="joao-saccucci-labs-m1" aria-labelledby="joao-saccucci-labs-m1-titulo">
      <header class="modulo-cabecalho">
        <h3 class="modulo-titulo" id="joao-saccucci-labs-m1-titulo">
          <span class="modulo-numero">Módulo 1</span><span class="sr-only"> — </span>
          <span class="modulo-nome">Etapa 1: o básico do site</span>
        </h3>
        <p class="modulo-resumo">HTML, CSS e como o JavaScript lê um JSON e monta a página.</p>
        <div class="modulo-progresso">
          <span class="modulo-progresso-texto">2 de 5 concluídas</span>
          <span class="modulo-barra" aria-hidden="true" style="--progresso: 0.4">
            <span class="modulo-barra-preenchida"></span>
          </span>
        </div>
      </header>

      <ol class="lista-aulas">
        <li class="surgir" style="--atraso: 0ms">
          <a class="card aula-card aula-card--concluida" href="aula.html?id=joao-saccucci-labs-m1-aula-01">
            <span class="aula-card-numero" aria-hidden="true">1.1</span>
            <div class="aula-card-corpo">
              <!-- só nas concluídas: -->
              <div class="aula-card-topo">
                <span class="aula-card-status"><span aria-hidden="true">✓</span> Concluída</span>
              </div>
              <h4 class="aula-card-titulo"><span class="sr-only">Aula 1.1: </span>O que é uma tag HTML</h4>
              <p class="aula-card-resumo">...</p>
              <div class="aula-card-rodape">
                <span class="aula-card-tempo"><!-- svg relogio.svg -->5 min de leitura</span>
                <span class="aula-card-ler" aria-hidden="true">Ler aula &rarr;</span>
              </div>
            </div>
          </a>
        </li>
      </ol>
    </section>
  </section>

  <!-- só se existir alguma aula com modulo inexistente -->
  <section class="aulas-projeto aulas-projeto--outras" id="outras-aulas" aria-labelledby="titulo-outras-aulas">
    <h2 class="aulas-projeto-titulo" id="titulo-outras-aulas">Outras aulas</h2>
    <ol class="lista-aulas"> ...cards com o quadrado "2" e sr-only "Aula 2: "... </ol>
  </section>
</div>
```
- Módulo completo: `section.modulo.modulo--completo` e o texto vira `5 de 5 concluídas <span aria-hidden="true">✓</span>`.
- `--progresso` = concluídas ÷ total (0 a 1), igual à barra de leitura da Etapa 3.
- Módulo sem `resumo`: não criar o `p.modulo-resumo`.
- Texto do `.pagina-titulo` sugerido: "Aulas curtas, um conceito por vez. Leia no seu ritmo e marque cada aula como concluída no fim."

**Medidas e cores (escuro, fixo)**

| Classe | Valores |
|---|---|
| `.aulas-projeto` | `max-width: 880px`; entre projetos `--esp-8` (64px) |
| `.aulas-projeto-titulo` | `--fs-xl`, Space Grotesk 700, `--cor-texto`; `padding-bottom: --esp-3` + `border-bottom: 1px solid --cor-borda`; `margin-bottom: --esp-6` |
| `.modulo` | entre módulos `--esp-7` (48px); `scroll-margin-top: calc(var(--altura-header) + var(--esp-5))` (para o `aulas.html#<id>` não esconder o título atrás do header) |
| `.modulo-cabecalho` | `margin-bottom: --esp-4` |
| `.modulo-titulo` | flex em coluna, `gap: --esp-2`; `--fs-lg` (20px), 700 |
| `.modulo-numero` | `align-self: flex-start`; pílula igual à `.aula-card-status`: mono 12px, maiúsculo, `letter-spacing .1em`, cor `--cor-verde`, fundo verde 10%, borda 1px `currentColor`, `--raio-pill`, `padding: 2px --esp-3` |
| `.modulo-resumo` | `--cor-texto-suave`, `--fs-sm`, `margin-top: --esp-2` |
| `.modulo-progresso` | flex, `flex-wrap: wrap`, `align-items: center`, `gap: --esp-2 --esp-3`, `margin-top: --esp-3` |
| `.modulo-progresso-texto` | mono `--fs-sm`, `--cor-texto-suave`; em `.modulo--completo` vira `--cor-verde` |
| `.modulo-barra` | `width: 10rem`, `height: 6px`, `--raio-pill`, fundo `--cor-borda-forte`, `overflow: hidden`. **Abaixo de 640px:** `flex: 1 1 100%` (linha inteira) |
| `.modulo-barra-preenchida` | `display: block; height: 100%`, fundo `--cor-verde`, `transform-origin: left; transform: scaleX(var(--progresso, 0))` |
| `.aula-card-numero` | o texto muda de "01" para "1.2": `font-size` **1.125rem** (48px) e **1.5rem** (64px, a partir de 640px); `font-variant-numeric: tabular-nums`; cabe "1.10" |
| `.aula-card-projeto` | deixa de ser usada (pode ficar no CSS) |

### 12.3 Topo da `aula.html` (US18)

```
<- Voltar para as aulas
[AULA 1.2]  MÓDULO 1 · ETAPA 1: O BÁSICO DO SITE       (.aula-sobretitulo; o módulo é um link)
h1 Encontrar um elemento com querySelector
(relógio) 6 min de leitura
```
A 360px o `.aula-sobretitulo` já tem `flex-wrap`: a pílula fica na 1ª linha e o módulo quebra para a 2ª se não couber.

```html
<p class="aula-sobretitulo">
  <span class="aula-numero">Aula 1.2</span>
  <a class="aula-modulo" href="aulas.html#joao-saccucci-labs-m1">Módulo 1 · Etapa 1: o básico do site</a>
</p>
```
- `span.aula-projeto` sai (o projeto aparece na lista de aulas).
- `.aula-modulo`: herda mono 12px maiúsculo do `.aula-sobretitulo`; cor `--leitura-texto-suave`, sublinhado 1px com `text-underline-offset: 3px`; no hover, `--leitura-texto` e sublinhado 2px. `overflow-wrap: anywhere`.
- Aula sem módulo válido: só a pílula ("Aula 2"), sem o link.
- `title` da aba e anterior/próxima também usam o novo número: `.aula-nav-titulo` = "Aula 1.2 · Encontrar um elemento...". O `aria-label` do `<nav>` passa a ser "Outras aulas".

### 12.4 Caixa "Em resumo" (US19)

**Visual (diferente da Dica em 4 pontos):** borda **inteira** de 1px (a Dica tem a barra grossa de 4px à esquerda); cantos `--raio-lg` (20px, a Dica usa 12px); título dentro de uma **pílula preenchida** de âmbar; texto um pouco maior e mais forte.

```
Dica (Etapa 3)                      Em resumo (Etapa 4)
┃💡 DICA                            ╭──────────────────────────────────╮
┃ Use o Live Server...              │ [▤ EM RESUMO]  <- pílula âmbar    │
                                    │ querySelector encontra um         │
                                    │ elemento da página. Depois...     │
                                    ╰──────────────────────────────────╯
```

```html
<div class="aviso aviso--resumo" role="note">
  <p class="aviso-titulo"><!-- svg resumo.svg -->Em resumo</p>
  <p><code>querySelector</code> encontra um elemento da página. Depois você pode mudar o texto ou o estilo dele pelo JavaScript.</p>
</div>
```
- O JS tira o `<strong>Em resumo:</strong>` (e o espaço depois dele) do primeiro parágrafo; o resto fica igual.
- O ícone é SVG (as outras caixas usam emoji): ele herda a cor do texto da pílula pelo `currentColor`.

| Parte | Valores |
|---|---|
| `.aviso--resumo` | `--aviso-cor: var(--aviso-resumo)`; `border: 1px solid color-mix(in srgb, var(--aviso-cor) 55%, transparent)` (sobrescreve a `border-left` de 4px); `border-radius: --raio-lg`; `padding: 1.1em 1.3em`; fundo = regra geral do `.aviso` (8% da cor sobre o fundo) |
| `.aviso--resumo .aviso-titulo` | `display: inline-flex` (a pílula só tem a largura do texto); `padding: 0.3em 0.9em`; `border-radius: --raio-pill`; **fundo** `--aviso-cor`, **texto** `--leitura-sobre-destaque` |
| `.aviso--resumo .aviso-titulo .icone` | `width/height: 1.2em` |
| parágrafos | `font-size: 1.05em`; `font-weight: 500`; cor `--leitura-texto` |
| espaço | `margin-bottom: 2em` (separa do `## O conceito`) |

### 12.5 Bloco de código: linhas numeradas + barra de ferramentas (US20, US21, US22)

**Ordem dos botões:** `▶ Rodar` · `Editar` · `Restaurar` · `Copiar`. Rodar primeiro porque é a ação principal; Copiar por último, no canto direito, onde já estava na Etapa 3.

**Desktop (bloco `html rodar`)**
```
+-------------------------------------------------------------------+
| HTML                  [▶ Rodar] [✎ Editar] [↺ Restaurar] [⧉ Copiar] |  .codigo-topo
|-------------------------------------------------------------------|
|  1 | <p id="msg">Olá</p>                                           |  .codigo-corpo
|  2 | <script>                                                      |   = .codigo-numeros + pre
|  3 |   const p = document.querySelector('#msg');                   |
|  4 |   p.textContent = 'Olá, João!';                               |
|  5 |   console.log(p.textContent);                                 |
|  6 | </script>                                                     |
|-------------------------------------------------------------------|
| (área de resultado, 12.8; só depois de Rodar)                      |  .codigo-saida
|-------------------------------------------------------------------|
| LINHA POR LINHA                                                    |  .linhas (12.6)
| [Linha 1]      um parágrafo com o id "msg".                        |
+-------------------------------------------------------------------+
```

**Celular (360px):** os 4 botões viram uma grade 2 × 2 embaixo do nome da linguagem.
```
+------------------------------+
| HTML                         |
| [▶ Rodar     ] [✎ Editar    ] |   grade de 2 colunas,
| [↺ Restaurar ] [⧉ Copiar    ] |   botões de 44px de altura
|------------------------------|
| 1 | <p id="msg">Olá</p>       |
| 2 | <script>                  |
| 3 |   const p = document.quer→   (o código rola para o lado;
| 4 |   p.textContent = 'Olá, J→    os números ficam parados)
+------------------------------+
```

**Blocos sem `rodar`** (ex.: ` ```css `, ` ```json `, ` ```js ` sem rodar): só Copiar, como na Etapa 3, **com** números de linha. **Bloco sem linguagem:** sem números e sem nome da linguagem (igual à Etapa 3).

**HTML** (exemplo com `rodar`; o JS cria tudo de uma vez e só mostra/esconde com `hidden`):

```html
<div class="codigo codigo--executavel" data-linguagem="html">
  <div class="codigo-topo">
    <span class="codigo-linguagem">html</span>
    <div class="codigo-acoes">
      <button class="codigo-botao codigo-botao--rodar" type="button" aria-label="Rodar exemplo">
        <!-- svg rodar.svg --><span>Rodar</span>
      </button>
      <button class="codigo-botao" type="button" data-acao="editar" aria-pressed="false">
        <!-- svg editar.svg --><span>Editar</span>
      </button>
      <button class="codigo-botao" type="button" data-acao="restaurar" disabled>
        <!-- svg restaurar.svg --><span>Restaurar</span>
      </button>
      <button class="codigo-botao codigo-copiar" type="button">
        <!-- svg copiar.svg --><span>Copiar</span>
      </button>
    </div>
    <span class="sr-only" role="status"></span>  <!-- já existe: agora avisa Copiar E Rodar -->
  </div>

  <div class="codigo-corpo">
    <div class="codigo-numeros" aria-hidden="true">
      <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
    </div>
    <pre tabindex="0"><code class="hljs language-html">...</code></pre>
    <!-- no modo edição, o <pre> recebe hidden e aparece a textarea (12.7) -->
  </div>

  <p class="codigo-dica" id="codigo-dica-1" hidden>...</p>     <!-- 12.7 -->
  <div class="codigo-saida" hidden>...</div>                     <!-- 12.8 -->
  <div class="linhas">...</div>                                  <!-- 12.6, só se existir a lista -->
</div>
```
- Bloco sem `rodar`: sem `.codigo--executavel`, e `.codigo-acoes` só com o Copiar.
- A classe `.codigo-copiar` continua (o JS da Etapa 3 usa); ela ganha também `.codigo-botao`. O dev pode trocar o seletor `.codigo-copiar` do CSS por `.codigo-botao` nas regras visuais e deixar `.codigo-copiar[data-estado]` como está.
- Quantos números: `codigo.textContent.split("\n").length` (se o texto terminar em `\n`, descontar a última linha vazia).
- O "▶" é o `rodar.svg` (não o caractere ▶, que no celular pode virar emoji colorido). O `aria-label="Rodar exemplo"` contém a palavra visível "Rodar" (bom para quem usa comando de voz).

**Medidas**

| Classe | Valores |
|---|---|
| `.codigo-topo` | ganha `flex-wrap: wrap` |
| `.codigo-acoes` | `display: flex; flex-wrap: wrap; gap: var(--esp-1); margin-left: auto` |
| `.codigo-botao` | mesmo visual do `.codigo-copiar` da Etapa 3: mono 12px, `min-height: 36px` (44px com `pointer: coarse`), `padding: 0 --esp-3`, fundo transparente, borda 1px `--leitura-borda-forte`, `--raio-sm`, cor `--leitura-texto`; ícone 14px |
| `.codigo-corpo` | `display: grid; grid-template-columns: auto minmax(0, 1fr)` |
| `.codigo-numeros` | **mesma** `font-size` (0.84em), `line-height` (1.6) e `padding-block` (1em) do `pre`; `padding-inline: 1em 0.75em`; `text-align: right`; `font-variant-numeric: tabular-nums`; cor `--hl-comentario`; `border-right: 1px solid --leitura-borda`; `user-select: none` (e `-webkit-user-select`); cada `span` com `display: block` |
| `pre` dentro de `.codigo-corpo` | `min-width: 0` (deixa a coluna encolher e rolar) |

**Celular (abaixo de 640px), só em `.codigo--executavel`:** `.codigo-acoes` com `flex: 1 1 100%; display: grid; grid-template-columns: 1fr 1fr; margin-left: 0`; botões com `justify-content: center`. Conferido: em 360px o bloco tem 326px por dentro; cada botão fica com ~155px, e "Restaurar" com ícone precisa de ~90px. O `.codigo-topo` ganha `padding: var(--esp-2)` para a grade não encostar nas bordas.

**Estados dos botões**

| Estado | Rodar (preenchido) | Editar / Restaurar / Copiar (contorno) |
|---|---|---|
| Normal | fundo `--leitura-destaque`, texto `--leitura-sobre-destaque`, borda da mesma cor, `font-weight: 600` | como acima |
| Hover | brilho `box-shadow: 0 0 16px color-mix(in srgb, var(--leitura-destaque) 40%, transparent)` | `border-color: --leitura-destaque` |
| Pressionando (`:active`) | `filter: brightness(0.9)` | fundo `color-mix(in srgb, var(--leitura-texto) 10%, transparent)` |
| Pressionado (Editar com `aria-pressed="true"`) | - | cor `--leitura-destaque`, `border-color: currentColor`, fundo `color-mix(in srgb, var(--leitura-destaque) 8%, var(--leitura-superficie))` |
| Desativado (Restaurar sem alteração, `disabled`) | - | `opacity: 0.45; cursor: not-allowed`; sem efeito de hover |
| Copiado / erro | - | igual à Etapa 3 (`data-estado`) |
| Foco | contorno ciano global, mas com `outline-offset: 1px` dentro do `.codigo` (o `.codigo` tem `overflow: hidden`; com 3px o contorno seria cortado) | idem |

**Comportamento (o que o JS faz, para o visual bater):**
- **Editar** alterna: `aria-pressed="true"` = modo edição (12.7). Clicar de novo volta ao `<pre>` com o código editado (recolorido pelo `highlight.js`, se ele carregou; senão, texto puro) e números recalculados.
- **Restaurar**: volta o código original, sai do modo edição, esconde a `.codigo-saida`, fica `disabled` de novo e o status diz "Código original restaurado".
- **Rodar**: mostra `.codigo-saida` (sempre substituindo o conteúdo anterior) e o status diz "Exemplo executado. 2 linhas no console." O foco fica no botão Rodar.

### 12.6 Bloco "Linha por linha" (US20)

Fica **dentro do `.codigo`**, depois do código e da saída, com uma divisória tracejada. É a "legenda" do exemplo.

```
|  6 | </script>                                            |
|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|  border-top tracejada
| ≡ LINHA POR LINHA                                         |  .linhas-titulo
|  [Linha 1]       um parágrafo com o id "msg".             |
|  [Linha 3]       procura na página o elemento com         |
|                  id="msg" e guarda na constante p.        |
|  [Linhas 4 a 5]  troca o texto e mostra o novo texto      |
|                  no console.                              |
+-----------------------------------------------------------+
```
A 360px (abaixo de 480px) o rótulo fica **em cima** do texto:
```
| [Linha 3]                    |
| procura na página o elemento |
| com id="msg" e guarda...     |
```

```html
<div class="linhas">
  <p class="linhas-titulo">Linha por linha</p>
  <ol class="linhas-lista">
    <li class="linhas-item">
      <span class="linhas-rotulo">Linha 1</span>
      <span class="linhas-texto">um parágrafo com o <code>id</code> "msg".</span>
    </li>
    <li class="linhas-item">
      <span class="linhas-rotulo">Linhas 4 a 5</span>
      <span class="linhas-texto">troca o texto e mostra o novo texto no console.</span>
    </li>
  </ol>
</div>
```
- O JS tira o `<strong>L3:</strong>` do item e coloca o rótulo: `L3` → "Linha 3"; `L3–5` ou `L3-5` → "Linhas 3 a 5".
- O `.linhas` some junto com o `<ul>` original (o JS move o conteúdo para cá).

| Classe | Valores |
|---|---|
| `.linhas` | fundo `--leitura-superficie`; `border-top: 1px dashed --leitura-borda-forte`; `padding: 0.9em 1.1em`; `font-size: 0.95em` (cresce com A+) |
| `.linhas-titulo` | mono 12px (`--fs-xs`), maiúsculo, `letter-spacing .12em`, `--leitura-texto-suave`, `margin-bottom: 0.6em` |
| `.linhas-lista` | `display: flex; flex-direction: column; gap: 0.6em` (sem marcador) |
| `.linhas-item` | `display: grid; grid-template-columns: 7.5em minmax(0, 1fr); gap: 0.4em 0.9em; align-items: baseline`. **Abaixo de 480px:** `grid-template-columns: 1fr` |
| `.linhas-rotulo` | mono `0.8em`, 600, cor `--leitura-destaque`, `white-space: nowrap`, `justify-self: start`; pílula: `padding: 0.1em 0.6em`, borda 1px `currentColor` a 50% (`color-mix`), `--raio-pill` |
| `.linhas-texto` | `--leitura-texto`, `line-height: 1.6` |

### 12.7 Modo edição (US22)

```
+------------------------------------------------------------+  borda do bloco inteiro
| HTML          [▶ Rodar] [✎ Editar*] [↺ Restaurar] [⧉ Copiar]|  fica verde (.codigo--editando)
|------------------------------------------------------------|
|  1 | <p id="msg">Olá, mundo</p>|                            |  textarea mono, ≥16px,
|  2 | <script>                                               |  sem quebra de linha,
|  3 |   const p = ...                                        |  cursor verde
|------------------------------------------------------------|
| Use espaços para recuar o código. A tecla Tab vai para o    |  .codigo-dica
| próximo botão.                                              |
+------------------------------------------------------------+
```

```html
<div class="codigo codigo--executavel codigo--editando">
  ...topo com Editar em aria-pressed="true"...
  <div class="codigo-corpo">
    <div class="codigo-numeros" aria-hidden="true">...</div>
    <pre tabindex="0" hidden>...</pre>
    <textarea class="codigo-editor" aria-label="Código do exemplo, editável"
              aria-describedby="codigo-dica-1" rows="6" wrap="off"
              spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"></textarea>
  </div>
  <p class="codigo-dica" id="codigo-dica-1">Use espaços para recuar o código. A tecla Tab vai para o próximo botão.</p>
  ...
</div>
```
- `rows` = número de linhas do código. A cada `input`, o JS atualiza `rows` e os números (`.codigo-numeros`). Assim a caixa **não** rola na vertical e os números ficam alinhados.
- `spellcheck`/`autocorrect`/`autocapitalize` desligados: no celular o teclado não "corrige" `const` para "Const".
- O foco vai para a textarea ao entrar no modo edição (foi o João que pediu, clicando em Editar).

| Classe | Valores |
|---|---|
| `.codigo--editando` | `border-color: --leitura-destaque` (o bloco inteiro mostra que está editável) |
| `.codigo-editor` | `display: block; width: 100%; min-width: 0`; `font-family: --fonte-mono`; **`font-size: max(1rem, 0.84em)`** (nunca menos de 16px: o celular não dá zoom sozinho); `line-height: 1.6`; `padding: 1em 1.1em`; cor `--hl-texto`; fundo `--leitura-codigo-fundo`; `border: 0`; `resize: none`; `overflow-x: auto; overflow-y: hidden`; `white-space: pre`; `tab-size: 2`; `caret-color: --leitura-destaque` |
| `.codigo--editando .codigo-numeros` | **mesma** `font-size: max(1rem, 0.84em)` da textarea (para alinhar) |
| `.codigo-editor:focus-visible` | `outline: 2px solid var(--cor-ciano); outline-offset: -2px` (contorno por dentro, não é cortado) |
| `.codigo-dica` | mono 12px, `--leitura-texto-suave`, fundo `--leitura-superficie`, `border-top: 1px solid --leitura-borda`, `padding: --esp-2 --esp-4` |

### 12.8 Área de resultado: "Resultado" e "Console" (US21)

**`html rodar`** (Resultado sempre; Console só se algo foi exibido ou houve erro):
```
|-----------------------------------------------------------|
| RESULTADO                                                  |  .saida-titulo (barra)
| +-------------------------------------------------------+ |
| | Olá, João!                    (fundo BRANCO)           | |  iframe, 12rem de altura,
| |                                                       | |  rola por dentro
| +-------------------------------------------------------+ |
| CONSOLE                                                    |
| › Olá, João!                                               |  log
|▌Aviso: cuidado com...                                      |  warn (âmbar + barra)
|▌Erro: x is not defined (linha 4)                           |  erro (vermelho + barra)
|-----------------------------------------------------------|
```
**`js rodar`**: só o Console. Se nada foi exibido:
```
| CONSOLE                                                    |
| (nada foi exibido no console)                              |  itálico, cor suave
```

```html
<div class="codigo-saida">
  <div class="saida-bloco saida-bloco--resultado">
    <p class="saida-titulo">Resultado</p>
    <iframe class="saida-iframe" title="Resultado do exemplo" sandbox="allow-scripts" srcdoc="..."></iframe>
  </div>
  <div class="saida-bloco saida-bloco--console">
    <p class="saida-titulo" id="console-titulo-1">Console</p>
    <ol class="console-lista" tabindex="0" aria-labelledby="console-titulo-1">
      <li class="console-linha console-linha--log"><span class="console-prefixo" aria-hidden="true">›</span><span class="console-texto">Olá, João!</span></li>
      <li class="console-linha console-linha--aviso"><span class="console-prefixo">Aviso:</span><span class="console-texto">cuidado com...</span></li>
      <li class="console-linha console-linha--erro"><span class="console-prefixo">Erro:</span><span class="console-texto">x is not defined (linha 4)</span></li>
    </ol>
    <!-- no lugar do <ol>, quando não houver linhas: -->
    <p class="console-vazio">(nada foi exibido no console)</p>
  </div>
</div>
```
- `console.log` → `--log` (prefixo "›" decorativo); `console.warn` → `--aviso` com "Aviso:"; `console.error` **e** erros do código → `--erro` com "Erro:". O "(linha 4)" vai no fim do texto quando o navegador informar.
- **Início do `srcdoc`** (antes do código do João, para ele poder mudar o estilo se quiser): `<meta name="color-scheme" content="light">` e um estilo base `html{background:#fff;color:#1A1A1A;font:16px/1.5 system-ui,sans-serif} body{margin:12px}`. Sem isso, a página do exemplo pode herdar o modo escuro do sistema e ficar ilegível sobre o branco.

| Classe | Valores |
|---|---|
| `.codigo-saida` | `border-top: 1px solid --leitura-borda-forte`; aparece com `animation: saida-aparecer 200ms ease` (**só opacidade**, de 0 a 1; nada de `transform`, ver regra da 11.4) |
| `.saida-titulo` | barra igual ao `.codigo-topo`: fundo `--leitura-superficie`, mono 12px maiúsculo, `letter-spacing .12em`, `--leitura-texto-suave`, `padding: --esp-2 --esp-4`, `border-bottom: 1px solid --leitura-borda` |
| `.saida-bloco + .saida-bloco` | `border-top: 1px solid --leitura-borda` |
| `.saida-iframe` | `display: block; width: 100%; height: 12rem` (192px; altura fixa = "altura máxima": o conteúdo maior rola **dentro** do iframe); `border: 0`; fundo `--resultado-fundo` (`#FFFFFF`) |
| `.saida-bloco--resultado` | `padding: --esp-2` em volta do iframe, fundo `--leitura-codigo-fundo`; o iframe ganha `border-radius: --raio-sm` e `outline: 1px solid --leitura-borda` (moldura de "janela") |
| `.console-lista` | fundo `--leitura-codigo-fundo`; mono `0.8em`, `line-height: 1.5`; `max-height: 14rem; overflow-y: auto`; `padding-block: --esp-1` |
| `.console-linha` | `display: flex; gap: 0.6em`; `padding: 0.3em 1.1em`; `border-left: 3px solid transparent`; `+ .console-linha` com `border-top: 1px solid --leitura-borda` |
| `.console-texto` | `white-space: pre-wrap; overflow-wrap: anywhere; min-width: 0` (objetos em JSON aparecem com quebras e recuo, e nada vaza a 360px) |
| `.console-linha--log` | texto `--hl-texto`; prefixo `--leitura-texto-suave` |
| `.console-linha--aviso` | texto e prefixo `--console-aviso`; `border-left-color: --console-aviso` |
| `.console-linha--erro` | texto e prefixo `--cor-erro`; `border-left-color: --cor-erro` |
| `.console-prefixo` | `font-weight: 600; flex: 0 0 auto` |
| `.console-vazio` | mesma caixa da lista; `padding: 0.6em 1.1em`; itálico; `--leitura-texto-suave` |

Sem fundo colorido nas linhas de aviso/erro (só cor do texto + barrinha): com fundo, o vermelho-tinta do tema papel cairia para ~4.5:1.

### 12.9 Quiz (US23)

**Antes de responder**
```
+-----------------------------------------------------------+  .quiz (fundo superfície)
| PERGUNTA 1                                                 |  .quiz-rotulo
| O que document.querySelector('#msg') devolve?              |  .quiz-pergunta (600)
|                                                            |
| +-------------------------------------------------------+  |
| | (A)  Todos os elementos com a classe msg.             |  |  button.quiz-alternativa
| +-------------------------------------------------------+  |
| +-------------------------------------------------------+  |
| | (B)  O primeiro elemento com id="msg".                |  |
| +-------------------------------------------------------+  |
| +-------------------------------------------------------+  |
| | (C)  O texto "msg".                                   |  |
| +-------------------------------------------------------+  |
+-----------------------------------------------------------+
```
**Depois de responder (o João escolheu A)**
```
| +=======================================================+  |  borda vermelha 2px, fundo vermelho 8%
| | (A)  Todos os elementos com a classe msg.             |  |  letra preenchida de vermelho
| |      (x) ERRADA                                       |  |  .quiz-marca
| +=======================================================+  |
|      Errada: o # procura por id; classe seria .msg...      |  .quiz-explicacao
| +=======================================================+  |  borda verde 2px, fundo verde 8%
| | (B)  O primeiro elemento com id="msg".                |  |
| |      (✓) RESPOSTA CERTA                               |  |
| +=======================================================+  |
|      Certa: o # indica id, e querySelector devolve...      |
| +-------------------------------------------------------+  |  neutra (sem marca)
| | (C)  O texto "msg".                                   |  |
| +-------------------------------------------------------+  |
|      Errada: ele devolve o elemento, não um texto.         |
| ---------------------------------------------------------- |
| (x) Errada. A resposta certa é a B.    [Tentar de novo]    |  .quiz-rodape
+-----------------------------------------------------------+
```
Se o João acertar, a alternativa escolhida mostra "(✓) CERTA!" e o rodapé diz "(✓) Certa!".

```html
<section class="quiz" aria-labelledby="quiz-1-pergunta">
  <p class="quiz-rotulo">Pergunta 1</p>
  <p class="quiz-pergunta" id="quiz-1-pergunta">O que document.querySelector('#msg') devolve?</p>
  <ol class="quiz-alternativas">
    <li class="quiz-item">
      <button class="quiz-alternativa" type="button">
        <span class="quiz-letra" aria-hidden="true">A</span>
        <span class="quiz-texto">Todos os elementos com a classe msg.</span>
      </button>
      <p class="quiz-explicacao" hidden>Errada: o # procura por id; classe seria .msg, e para vários use querySelectorAll.</p>
    </li>
    <!-- ... -->
  </ol>
  <div class="quiz-rodape" hidden>
    <p class="quiz-resultado"><!-- svg --><span>Errada. A resposta certa é a B.</span></p>
    <button class="btn btn-secundario quiz-repetir" type="button">Tentar de novo</button>
  </div>
  <p class="sr-only" role="status"></p>  <!-- "Errada. A resposta certa é: O primeiro elemento com id msg." -->
</section>
```

**Depois de responder, o JS:**
1. Põe `.quiz--respondido` na `section`.
2. Em **todas** as alternativas: `aria-disabled="true"` (não usar `disabled`: o botão desativado some do Tab e fica apagado, e o João precisa conseguir reler tudo). Cliques nelas passam a ser ignorados.
3. Na alternativa **certa**: `data-resultado="certa"`. Na escolhida, se for errada: `data-resultado="errada"`.
4. Coloca a marca **dentro** do `.quiz-texto` (assim ela entra no nome do botão para o leitor de tela):
   - escolhida e certa: `<span class="quiz-marca"><!-- svg concluida.svg --> Certa!</span>`
   - escolhida e errada: `<span class="quiz-marca"><!-- svg errada.svg --> Errada</span>`
   - certa não escolhida: `<span class="quiz-marca"><!-- svg concluida.svg --> Resposta certa</span>`
5. Tira o `hidden` de todas as `.quiz-explicacao` e do `.quiz-rodape`. No `.quiz-resultado`: `.quiz-resultado--certa` com `concluida.svg` + "Certa!" ou `.quiz-resultado--errada` com `errada.svg` + "Errada. A resposta certa é a B."
6. "Tentar de novo": desfaz tudo (tira classes, marcas, `aria-disabled`, esconde explicações e rodapé) e leva o foco para a primeira alternativa.

| Classe | Valores |
|---|---|
| `.quiz` | fundo `--leitura-superficie`; borda 1px `--leitura-borda`; `--raio-lg`; `padding: 1.1em 1.2em`; entre quizzes `1em` |
| `.quiz-rotulo` | mono 12px maiúsculo, `letter-spacing .12em`, `--leitura-texto-suave` |
| `.quiz-pergunta` | `font-weight: 600`; `margin-block: 0.3em 0.9em` |
| `.quiz-alternativas` | `display: flex; flex-direction: column; gap: 0.6em` (sem marcador) |
| `.quiz-alternativa` | `display: flex; align-items: flex-start; gap: 0.75em; width: 100%; min-height: 44px`; `padding: 0.65em 0.9em`; `font: inherit` (cresce com A+); `text-align: left`; cor `--leitura-texto`; fundo `--leitura-fundo`; borda 1px `--leitura-borda-forte`; `--raio-md`; `cursor: pointer` |
| hover (sem `aria-disabled`) | `border-color: --leitura-destaque` |
| `[aria-disabled="true"]` | `cursor: default`; sem hover |
| `.quiz-letra` | círculo `1.7em`, `flex: 0 0 auto`, `display: grid; place-items: center`; mono `0.8em` 600; borda 1px `--leitura-borda-forte`; `border-radius: 50%` |
| `.quiz-texto` | `flex: 1; min-width: 0; padding-top: 0.15em` |
| `[data-resultado="certa"]` | borda **2px** `--leitura-destaque`; fundo `color-mix(in srgb, var(--leitura-destaque) 8%, var(--leitura-fundo))`; `.quiz-letra` preenchida: fundo `--leitura-destaque`, texto `--leitura-sobre-destaque`, sem borda |
| `[data-resultado="errada"]` | igual, com `--cor-erro` |
| `.quiz-marca` | `display: flex; align-items: center; gap: 0.35em; margin-top: 0.3em`; mono `0.75em` 600, maiúsculo, `letter-spacing .08em`; cor da alternativa (verde ou vermelho); ícone `1.25em` |
| `.quiz-explicacao` | `margin: 0.4em 0 0 2.7em` (alinha com o texto, depois da letra); `font-size: 0.92em`; cor `--leitura-texto` |
| `.quiz-rodape` | `display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.6em 1em`; `margin-top: 1em; padding-top: 1em`; `border-top: 1px solid --leitura-borda` |
| `.quiz-resultado` | `display: flex; align-items: center; gap: 0.4em`; 700; `--certa` = `--leitura-destaque`, `--errada` = `--cor-erro`; ícone `1.2em` |
| `.quiz-repetir` | `font-size: var(--fs-sm)` (como o "Limpar exercício") |

A 360px: alternativas ocupam a largura toda, o texto quebra normalmente e a marca fica sempre embaixo do texto (está dentro dele). No rodapé, o "Tentar de novo" desce para a linha de baixo se não couber.

### 12.10 Contraste AA (todas as cores novas)

Calculado com a fórmula do WCAG. Fundos das misturas de 8% (aproximados): caixa Em resumo `#1B1919` / `#EEE4D1`; alternativa certa `#101E21` / `#E4E6D6`; alternativa errada `#1B121D` / `#F2E1D3`; Editar pressionado `#17262F` / `#DDDCC6`.

| Elemento | Escuro: cor / fundo | Razão | Papel: cor / fundo | Razão |
|---|---|---|---|---|
| Pílula "Em resumo" (texto) | `#070A14` / `#FFC857` | 12.9:1 | `#FFFDF7` / `#8A5300` | 6.2:1 |
| Texto da caixa Em resumo | `#E8ECF8` / `#1B1919` | 14.8:1 | `#1F1A14` / `#EEE4D1` | 13.7:1 |
| Âmbar (borda/pílula) sobre a caixa (não-texto, mín. 3:1) | `#FFC857` / `#1B1919` | 11.4:1 | `#8A5300` / `#EEE4D1` | 5.0:1 |
| Números de linha | `#8B93AD` / `#0A0E1C` | 6.3:1 | `#6A6152` / `#EFE6D2` | 4.9:1 |
| Botão Rodar | `#070A14` / `#7CFFB2` | 15.8:1 | `#FFFDF7` / `#0A6B3C` | 6.5:1 |
| Editar / Restaurar / Copiar | `#E8ECF8` / `#0E1324` | 15.6:1 | `#1F1A14` / `#EFE6D2` | 13.9:1 |
| Editar pressionado (verde) | `#7CFFB2` / `#17262F` | 12.4:1 | `#0A6B3C` / `#DDDCC6` | 4.8:1 |
| Rótulo "Linha 3" | `#7CFFB2` / `#0E1324` | 14.8:1 | `#0A6B3C` / `#EFE6D2` | 5.3:1 |
| Texto "Linha por linha" | `#E8ECF8` / `#0E1324` | 15.6:1 | `#1F1A14` / `#EFE6D2` | 13.9:1 |
| Títulos "LINHA POR LINHA", "RESULTADO", "CONSOLE", "PERGUNTA 1", dica da edição | `#9AA3BF` / `#0E1324` | 7.4:1 | `#5C5346` / `#EFE6D2` | 6.1:1 |
| Caixa editável (texto) | `#E8ECF8` / `#0A0E1C` | 16.3:1 | `#1F1A14` / `#EFE6D2` | 13.9:1 |
| Console: log | `#E8ECF8` / `#0A0E1C` | 16.3:1 | `#1F1A14` / `#EFE6D2` | 13.9:1 |
| Console: aviso | `#FFD580` / `#0A0E1C` | 13.8:1 | `#7A4F00` / `#EFE6D2` | 5.7:1 |
| Console: erro | `#FF6B81` / `#0A0E1C` | 7.0:1 | `#B3261E` / `#EFE6D2` | 5.3:1 |
| "(nada foi exibido no console)" | `#9AA3BF` / `#0A0E1C` | 7.7:1 | `#5C5346` / `#EFE6D2` | 6.1:1 |
| Alternativa neutra | `#E8ECF8` / `#070A14` | 16:1 | `#1F1A14` / `#F7F1E3` | 15.3:1 |
| Alternativa certa: texto / marca verde | `#E8ECF8` e `#7CFFB2` / `#101E21` | 14.5:1 e 13.7:1 | `#1F1A14` e `#0A6B3C` / `#E4E6D6` | 13.6:1 e 5.2:1 |
| Alternativa errada: texto / marca vermelha | `#E8ECF8` e `#FF6B81` / `#1B121D` | 15.5:1 e 6.7:1 | `#1F1A14` e `#B3261E` / `#F2E1D3` | 13.6:1 e 5.1:1 |
| Letra preenchida certa | `#070A14` / `#7CFFB2` | 15.8:1 | `#FFFDF7` / `#0A6B3C` | 6.5:1 |
| Letra preenchida errada | `#070A14` / `#FF6B81` | 7.2:1 | `#FFFDF7` / `#B3261E` | 6.4:1 |
| Explicação do quiz | `#E8ECF8` / `#0E1324` | 15.6:1 | `#1F1A14` / `#EFE6D2` | 13.9:1 |
| "Certa!" no rodapé | `#7CFFB2` / `#0E1324` | 14.8:1 | `#0A6B3C` / `#EFE6D2` | 5.3:1 |
| "Errada" no rodapé | `#FF6B81` / `#0E1324` | 6.8:1 | `#B3261E` / `#EFE6D2` | 5.3:1 |
| Link do módulo no topo da aula | `#9AA3BF` / `#070A14` | 7.9:1 | `#5C5346` / `#F7F1E3` | 6.7:1 |
| Contorno de foco (não-texto, mín. 3:1) | `#00E5FF` / `#0E1324` | 12:1 | `#005F8F` / `#EFE6D2` | 5.6:1 |

**`aulas.html` (só tema escuro, fundo `#05060F`):** pílula "MÓDULO 1" `#7CFFB2` sobre verde 10% (`#111F1F`) ~13.6:1; título do módulo `#E8ECF8` ~17:1; resumo e "2 de 5 concluídas" `#9AA3BF` ~7.8:1; "5 de 5 concluídas ✓" `#7CFFB2` ~16:1. A barrinha é decorativa (`aria-hidden`), a informação está no texto.

**Nota para o dev (ajuste pequeno na Etapa 3):** o `.ferramenta[aria-pressed="true"]` da seção 27 mistura **12%** de verde. No tema papel isso dá `#0A6B3C` sobre `#D3D7C0` ≈ **4.48:1**, um tiquinho abaixo de 4.5. Trocar 12% por **8%** resolve (≈ 4.75:1), igual ao Editar pressionado.

### 12.11 Foco, movimento reduzido e 360px

**Foco visível (teclado)**
- Rodar, Editar, Restaurar, Copiar: contorno ciano global, com `outline-offset: 1px` dentro do `.codigo` (regra `.codigo :focus-visible { outline-offset: 1px }`).
- `pre` e `.console-lista` (rolam, por isso têm `tabindex="0"`) e a textarea: contorno **por dentro** (`outline-offset: -2px`).
- Alternativas do quiz: contorno ciano global (offset 3px; o `.quiz` não corta). Continuam focáveis depois de respondidas (`aria-disabled`, não `disabled`).
- Link do módulo no topo da aula e cards de aula: o foco global de sempre.
- Nada rouba o foco: Rodar e responder o quiz não movem o foco; os avisos vão pelo `role="status"`. Exceções combinadas: Editar leva o foco para a textarea; "Tentar de novo" leva para a primeira alternativa (o botão some).

**Movimento reduzido (`prefers-reduced-motion: reduce`)**
- `.codigo-saida` aparece sem a animação `saida-aparecer` (regra própria na seção nova de movimento reduzido, além da regra geral da seção 21).
- Sem transições em botões, alternativas e barra do módulo.
- A barrinha do módulo não "enche" animada: já aparece no valor final (o `scaleX` vai direto).
- `.surgir` continua só na `aulas.html` (nunca na `aula.html`), e a seção 21 já o desliga.

**360px (sem rolagem horizontal)**
- `aulas.html`: barra do módulo na linha inteira; quadrado do número com 48px e "1.2" em 18px; títulos quebram.
- Topo da aula: pílula + link do módulo quebram em 2 linhas.
- Bloco de código: botões em grade 2 × 2 (44px de altura em tela de toque); o código e a textarea rolam **dentro** do bloco; os números ficam parados e alinhados (mesma fonte, entrelinha e padding).
- Textarea com 16px ou mais: o celular não dá zoom ao tocar.
- Resultado: o iframe tem `width: 100%` (nunca passa do bloco); conteúdo largo rola dentro dele.
- Console: textos longos e JSON quebram (`pre-wrap` + `overflow-wrap: anywhere`).
- "Linha por linha": rótulo em cima do texto abaixo de 480px.
- Quiz: alternativas na largura toda; "Tentar de novo" desce de linha se precisar.
- Alto contraste do Windows (`forced-colors`): as marcas "Certa!/Errada" e os prefixos "Aviso:/Erro:" são texto, então a informação continua lá mesmo sem as cores.

---

## 13. Etapa 5: equipe nova (US25 a US29)

O CSS desta etapa é escrito pelo dev. **Mudanças em regras que já existem** (fluxo, grade da equipe, mini avatares) são feitas **no próprio lugar** (seções 8, 12 e 16 do `css/style.css`), para não criar regras que brigam entre si. **Classes novas** ficam numa seção nova no fim do arquivo ("ETAPA 5 - EQUIPE NOVA"). Os 2 avatares já estão prontos em `img/agentes/`.

### 13.0 Conceito e decisões

- **Duas cores fora do gradiente da marca.** Ciano, roxo e magenta formam o gradiente; o verde é a cor da aula. As cores novas ocupam os dois "buracos" que sobravam no círculo de cores: **laranja** (entre o vermelho do erro e o verde) e **azul** (entre o ciano e o roxo).
- **Testador = laranja `#FF9E4A`.** Laranja é a cor de "atenção, inspeção" (cone, fita de obra) sem ser o vermelho de erro. Avatar: **escudo** (protege a qualidade) com uma **lupa com check** (conferido).
- **Mentor de carreira = azul `#5B9BFF`.** Azul é "norte, direção, confiança". Avatar: **mostrador de bússola** com a agulha apontando para a frente e as marcas norte/leste/sul/oeste para fora do corpo.
- **"Apoio" é uma ideia visual só:** o mentor nunca está ligado a nada (sem seta, sem linha), usa **borda tracejada** no bloco do Início e o selo **"Apoio"** em texto, com uma bolinha **vazada** (os selos de status usam bolinha cheia).
- **Fluxo com 5 etapas:** abaixo de 768px continua a lista vertical; a partir de 768px viram 5 colunas, e cada etapa passa a ser "em pé" (número, avatar e nome empilhados), porque "Product Owner" deitado não cabe em 128px.
- **Equipe com 6 cards:** 1, 2 ou **3** colunas (nunca 4 + 2). Com 3 colunas, o fluxo fica PO, Artista, Dev em cima e Testador, Professor, Mentor embaixo.

### 13.1 Cores novas e contraste

| id | Cor | Token (opcional, `:root`) | Matiz | Contraste sobre `#05060F` (fundo) | sobre `#0C1021` (vidro do card) | sobre `#0B1020` (fundo-2) |
|---|---|---|---|---|---|---|
| testador | **`#FF9E4A`** | `--cor-laranja` | 28° | **9.9:1** | **9.2:1** | 9.2:1 |
| mentor-carreira | **`#5B9BFF`** | `--cor-azul` | 217° | **7.3:1** | **6.8:1** | 6.8:1 |

Os dois passam AA como **texto** (mín. 4.5:1, inclusive o texto pequeno de 12px dos rótulos `UNIDADE://`) e como **borda/ícone** (mín. 3:1) em todos os fundos do site.

**Como foi calculado (fórmula do WCAG).** Luminância relativa L = 0.2126·R + 0.7152·G + 0.0722·B, com cada canal convertido para linear (`c ≤ 0.04045 ? c/12.92 : ((c+0.055)/1.055)^2.4`). Razão = (L mais clara + 0.05) / (L mais escura + 0.05).
- Fundo `#05060F`: L ≈ 0.0020. Vidro do card (`rgba(18,24,48,.55)` sobre o fundo ≈ `#0C1021`): L ≈ 0.0056.
- `#FF9E4A`: R = 1.000, G = 0.342, B = 0.068 → L ≈ 0.462 → (0.512) / (0.052) ≈ **9.9:1**; sobre o vidro (0.512) / (0.0556) ≈ **9.2:1**.
- `#5B9BFF`: R = 0.105, G = 0.328, B = 1.000 → L ≈ 0.329 → (0.379) / (0.052) ≈ **7.3:1**; sobre o vidro (0.379) / (0.0556) ≈ **6.8:1**.

**Diferença entre as 6 cores (matiz no círculo de cores, 0° a 360°):**

| Agente | Cor | Matiz | Vizinho mais próximo |
|---|---|---|---|
| Product Owner | `#00E5FF` | 186° | Mentor, 31° (mas o ciano é bem mais claro: L 0.63 contra 0.33) |
| Artista | `#B45CFF` | 272° | Magenta, 40° |
| Dev | `#FF2BD6` | 312° | Artista, 40° |
| **Testador** | **`#FF9E4A`** | **28°** | Magenta, 76° (o vermelho de erro `#FF6B81`, que não é agente, fica a 37° e é rosado) |
| Professor | `#7CFFB2` | 145° | Ciano, 41° |
| **Mentor** | **`#5B9BFF`** | **217°** | Ciano, 31° (diferença grande de brilho) e roxo, 55° |

Daltonismo: azul do mentor e roxo do artista podem ficar parecidos para quem não distingue vermelho/verde. Isso é aceito porque **o nome do agente sempre aparece escrito** ao lado da cor (regra do site desde a Etapa 1) e os dois nunca ficam lado a lado (artista é o 2º, mentor o 6º).

**Valores finais para `data/agentes.json` (campo `cor`):** `testador` = `#FF9E4A`, `mentor-carreira` = `#5B9BFF`. As mesmas cores vão escritas à mão no `index.html` e no `sobre.html` (`style="--agente-cor: ..."`).

### 13.2 Avatares (`img/agentes/testador.svg` e `mentor-carreira.svg`)

Prontos. Mesmo padrão dos 4 atuais: `viewBox="0 0 120 120"`, brilho radial (`id="g"`, 35% → 0%), corpo vazado `#0B1020` com traço de 3px na cor do agente, visor de 56×16 com dois "olhos" de 3.5px, símbolo com traço de 2.5px, `<title id="t">Unidade de IA ...</title>`.

| Arquivo | Corpo | Símbolo | Detalhe que diferencia |
|---|---|---|---|
| `testador.svg` | escudo (topo reto, ponta embaixo) | lupa com um check dentro | é o único corpo com ponta para baixo |
| `mentor-carreira.svg` | círculo (mostrador) | agulha de bússola inclinada 35° (metade cheia, metade vazada) sobre um anel tracejado | triângulo "norte" no topo e 3 marcas (leste, sul, oeste) para fora do corpo; o professor também é círculo, mas tem o capelo no topo |

**Sobre a cor dentro do SVG:** os 4 avatares atuais usam a cor **escrita direto no arquivo** (hex), e os novos seguem o mesmo jeito. `currentColor` e `var(--agente-cor)` **não funcionam** dentro de um SVG aberto por `<img>` (a imagem não herda o CSS da página), e os avatares são sempre usados por `<img>` (seção 9). Se um dia a cor do agente mudar no JSON, o SVG precisa ser editado junto.

Texto `alt` em cada página:

| Onde | Testador | Mentor |
|---|---|---|
| Fluxo do Início, card da Equipe | `Avatar do Testador` | `Avatar do Mentor de carreira` |
| Mini avatares do Sobre | `Testador` | `Mentor de carreira` |
| Timeline e trabalho no detalhe | `alt=""` (o nome já está escrito ao lado; regra da 10.1) | não aparece (apoio não tem trabalhos) |

### 13.3 Início: fluxo com 5 etapas e bloco do mentor (US26, US29)

**Desktop (1024px ou mais; colunas de ~180 a 198px)**
```
// COMO TRABALHAMOS
h2 Fluxo de trabalho
+---------+   +---------+   +---------+   +---------+   +---------+
|   01    |---|   02    |---|   03    |---|   04    |---|   05    |   borda de cima 3px
|  (PO)   |   |  (ART)  |   |  (DEV)  |   | (TEST)  |   | (PROF)  |   na cor do agente;
| Product |   | Artista |   |   Dev   |   |Testador |   |Professor|   avatar 48px
|  Owner  |   |         |   |         |   |         |   |         |
+---------+   +---------+   +---------+   +---------+   +---------+
                         (48px de espaço, SEM linha nem seta)
+ - - - - - - - - - - - - - - - - - - - - - - - - - +   .fluxo-apoio
' FORA DO FLUXO: APOIO AO CHEFE                     '   h3, mono 12px, cor suave
' (MENTOR)  Mentor de carreira  [o APOIO]            '   nome na cor do mentor + selo
'  48px     Ajuda o João a planejar os estudos e a  '   papel em cor suave
'           carreira.                                '
+ - - - - - - - - - - - - - - - - - - - - - - - - - +   borda tracejada azul, até 36rem
```

**Tablet (768 a 1023px):** o mesmo desenho do desktop. Conferido a 768px: 704px úteis − 4 vãos de 16px = **128px por etapa**; tirando o padding (2 × 12px) e as bordas, sobram ~102px de texto. Nomes em 14px: "Professor" ~69px e "Testador" ~62px cabem numa linha; "Product Owner" quebra em 2 linhas ("Product" ~55px). Os cards da mesma linha ficam com a mesma altura (`align-items: stretch`, padrão do grid), então a quebra não desalinha nada.

**Celular (abaixo de 768px, testado a 360px = 328px úteis)**
```
// COMO TRABALHAMOS
h2 Fluxo de
   trabalho
+------------------------------+
|01 (PO)  Product Owner         |   lista vertical, como hoje
+-|----------------------------+
  |                                 traço vertical de 2px no vão (16px),
+-|----------------------------+    embaixo do número: liga as etapas
|02 (ART) Artista               |
+------------------------------+
  ...                               03 Dev, 04 Testador, 05 Professor
+------------------------------+    (o último não tem traço)

+ - - - - - - - - - - - - - - -+   .fluxo-apoio: 48px abaixo, sem traço
' FORA DO FLUXO: APOIO AO      '
' CHEFE                        '   (o título quebra, sem problema)
' (MEN)  Mentor de carreira    '
'  48px  [o APOIO]             '   o selo desce de linha se não couber
'        Ajuda o João a...     '
+ - - - - - - - - - - - - - - -+
```
Conferido a 360px: etapa com 328px (16 + "05" ~17 + 12 + avatar 40 + 12 + nome); bloco do mentor com 328 − 2 × 16 de padding = 296px; avatar 48 + vão 12 deixa **236px** para o texto. "Mentor de carreira" (~150px) + selo (~70px) quase cabem: o `flex-wrap` deixa o selo descer sem vazar.

**HTML** (`index.html`; o `<ol class="fluxo">` ganha o testador e o bloco do mentor entra logo depois dele, **dentro** da mesma `section`):

```html
<ol class="fluxo">
  <li class="fluxo-etapa surgir" style="--agente-cor: #00E5FF; --atraso: 0ms">...Product Owner...</li>
  <li class="fluxo-etapa surgir" style="--agente-cor: #B45CFF; --atraso: 100ms">...Artista...</li>
  <li class="fluxo-etapa surgir" style="--agente-cor: #FF2BD6; --atraso: 200ms">...Dev...</li>
  <li class="fluxo-etapa surgir" style="--agente-cor: #FF9E4A; --atraso: 300ms">
    <img src="img/agentes/testador.svg" alt="Avatar do Testador">
    <span>Testador</span>
  </li>
  <li class="fluxo-etapa surgir" style="--agente-cor: #7CFFB2; --atraso: 400ms">...Professor...</li>
</ol>

<div class="fluxo-apoio surgir" style="--agente-cor: #5B9BFF; --atraso: 500ms">
  <h3 class="fluxo-apoio-titulo">Fora do fluxo: apoio ao chefe</h3>
  <div class="fluxo-apoio-corpo">
    <img src="img/agentes/mentor-carreira.svg" alt="Avatar do Mentor de carreira" width="48" height="48">
    <div>
      <p class="fluxo-apoio-nome">
        <span>Mentor de carreira</span>
        <span class="badge badge--apoio">Apoio</span>
      </p>
      <p class="fluxo-apoio-papel">Ajuda o João a planejar os estudos e a carreira.</p>
    </div>
  </div>
</div>
```
- O mentor fica **fora** do `<ol>`: para o leitor de tela, o fluxo continua sendo uma lista de 5 itens, e o mentor não é o "item 6".
- `h3` porque fica abaixo do `h2` "Fluxo de trabalho". O "Fora do fluxo" aparece em maiúsculas só pelo CSS.
- O comentário do HTML e o título da seção 8 do CSS mudam para "PO -> artista -> dev -> testador -> professor".

**Medidas: fluxo (mudanças na seção 8 do CSS)**

| Regra | Valores |
|---|---|
| `.fluxo` (≥768px) | `grid-template-columns: repeat(5, minmax(0, 1fr))` (era 4). O `minmax(0, …)` deixa a coluna encolher sem vazar |
| `.fluxo-etapa` (≥768px) | `flex-direction: column; justify-content: flex-start; text-align: center`; `gap: var(--esp-2)`; `padding: var(--esp-4) var(--esp-3)`; a cor sai da esquerda e vai para cima: `border-left: 1px solid var(--cor-borda); border-top: 3px solid var(--agente-cor)` |
| `.fluxo-etapa img` (≥768px) | `width/height: 48px` (no celular continua 40px) |
| `.fluxo-etapa span` (≥768px) | `font-size: var(--fs-sm)` até 1023px e `var(--fs-base)` a partir de 1024px; `overflow-wrap: break-word` (quebra entre palavras, nunca no meio de "Professor") |
| `.fluxo-etapa:not(:last-child)::after` (≥768px) | igual a hoje: traço horizontal de 2px com o gradiente, `top: 50%`, no vão de 16px. O número "05" já sai sozinho do `counter` |
| `.fluxo-etapa:not(:last-child)::after` (**<768px, novo**) | traço vertical: `content: ""; position: absolute; top: 100%; left: calc(var(--esp-4) + 6px); width: 2px; height: var(--esp-4)`; `background: linear-gradient(180deg, var(--cor-ciano), var(--cor-magenta))`; `opacity: 0.6`. Decorativo (pseudo-elemento, o leitor de tela não lê) |

**Medidas: bloco do mentor (classes novas)**

| Classe | Valores |
|---|---|
| `.fluxo-apoio` | `margin-top: var(--esp-7)` (48px: o espaço vazio é o que separa); `max-width: 36rem`; `padding: var(--esp-4)` (a partir de 768px: `var(--esp-4) var(--esp-5)`); fundo `var(--cor-vidro)`; `border: 1px dashed color-mix(in srgb, var(--agente-cor) 70%, transparent)`; `border-radius: var(--raio-md)`. **Sem** `::before`/`::after` (nenhuma linha ligando ao fluxo) |
| `.fluxo-apoio-titulo` | `margin-bottom: var(--esp-3)`; mono `var(--fs-xs)`, 400, `text-transform: uppercase`, `letter-spacing: 0.12em`, cor `var(--cor-texto-suave)` |
| `.fluxo-apoio-corpo` | `display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: var(--esp-3); align-items: start` |
| `.fluxo-apoio-corpo img` | `width/height: 48px` |
| `.fluxo-apoio-nome` | `display: flex; flex-wrap: wrap; align-items: center; gap: var(--esp-1) var(--esp-2)`; 600; cor `var(--agente-cor)` |
| `.fluxo-apoio-papel` | `margin-top: var(--esp-1)`; `var(--fs-sm)`; cor `var(--cor-texto-suave)` |

**Selo "Apoio" (classe nova, usada no Início e na Equipe)**

| Classe | Valores |
|---|---|
| `.badge--apoio` | herda tudo do `.badge` (mono 12px, maiúsculo, pílula, borda 1px `currentColor`); `color: var(--agente-cor)`; `background: color-mix(in srgb, var(--agente-cor) 10%, transparent)` |
| `.badge--apoio::before` | bolinha **vazada**: `background: transparent; box-shadow: inset 0 0 0 1.5px currentColor`. Sem animação (não é "em andamento") |

O texto "Apoio" é o que informa; cor e bolinha são complemento.

### 13.4 Equipe: 6 cards e o card de apoio (US26, US28)

**Desktop (1024px ou mais): 3 colunas**
```
// UNIDADES DE IA
h1 Equipe
+-----------------+ +-----------------+ +-----------------+
| (PO)            | | (ART)           | | (DEV)           |
| UNIDADE://PRO.. | | UNIDADE://ART.. | | UNIDADE://DEV   |
| Product Owner   | | Artista         | | Dev             |
| papel...        | | papel...        | | papel...        |
|-----------------| |-----------------| |-----------------|   <- mesma altura (subgrid)
| PROJETOS        | | PROJETOS        | | PROJETOS        |
| João Saccucci.. | | João Saccucci.. | | João Saccucci.. |
+-----------------+ +-----------------+ +-----------------+
+-----------------+ +-----------------+ +-----------------+
| (TEST)          | | (PROF)          | | (MEN)  [o APOIO]|   <- selo no canto de cima
| UNIDADE://TEST..| | UNIDADE://PROF..| | UNIDADE://MENT..|
| Testador        | | Professor       | | Mentor de       |
| Garante a       | | papel...        | |   carreira      |
| qualidade (QA)..| |                 | | papel...        |
|-----------------| |-----------------| |-----------------|   <- mesma altura (subgrid)
| PROJETOS        | | PROJETOS        | | ATUAÇÃO         |
| João Saccucci.. | | João Saccucci.. | | Agente de apoio:|
|                 | |                 | | trabalha direto |
|                 | |                 | | com o João...   |
+-----------------+ +-----------------+ +-----------------+
```
**Tablet (640 a 1023px):** 2 colunas, 3 linhas (PO + Artista, Dev + Testador, Professor + Mentor). **Celular (abaixo de 640px):** 1 coluna, na ordem do JSON, mentor por último.

Conferido: a 1024px, 960px úteis − 2 vãos de 24px = **304px por card** (256px por dentro). A 640px, (608 − 24) / 2 = **292px** (244px por dentro). A 360px, **328px** (280px por dentro). Em todos, o avatar (88px) e o selo (~70px) cabem lado a lado na primeira linha do card, e `UNIDADE://MENTOR-CARREIRA` (~210px em mono 12px) cabe numa linha.

**HTML do card de apoio** (gerado pelo `equipe.js` quando `agente.apoio === true`; os cards do fluxo não mudam):

```html
<article class="card agente-card agente-card--apoio surgir" style="--agente-cor: #5B9BFF; --atraso: 500ms">
  <img class="agente-avatar" src="img/agentes/mentor-carreira.svg" alt="Avatar do Mentor de carreira">
  <span class="agente-id">UNIDADE://mentor-carreira</span>
  <h3>Mentor de carreira</h3>
  <span class="badge badge--apoio">Apoio</span>
  <p class="agente-papel">Ajuda o João a planejar os estudos e a carreira.</p>
  <div class="agente-projetos agente-atuacao">
    <h4>Atuação</h4>
    <p>Agente de apoio: trabalha direto com o João, fora dos projetos.</p>
  </div>
</article>
```

**Por que o selo fica com `position: absolute` (e não como mais uma linha do card):** o subgrid da seção 22 conta **5 linhas** por card (avatar, id, nome, papel, projetos). Se o selo virasse uma 6ª linha, o card do mentor ficaria com uma linha a mais que os vizinhos e as divisórias "Projetos/Atuação" sairiam da mesma altura. Um elemento com `position: absolute` sai da grade e não ocupa linha. Ele vem **depois do `h3`** no HTML, então o leitor de tela lê "Mentor de carreira, Apoio" na ordem certa; na tela, ele aparece no canto de cima, ao lado do avatar.

O bloco "Atuação" reaproveita a classe `.agente-projetos` (mesma divisória, mesmo título em mono e mesma 5ª linha do subgrid). Por isso fica alinhado com o "Projetos" dos outros cards sem nenhum ajuste.

**Medidas**

| Regra | Valores |
|---|---|
| `.grade-equipe` (≥1024px, **mudança na seção 12**) | `grid-template-columns: repeat(3, 1fr)` (era 4). Atualizar o comentário: "6 agentes = 1, 2 ou 3 colunas (nunca 4 + 2)" |
| `.agente-card--apoio .badge--apoio` (novo) | `position: absolute; top: var(--esp-5); right: var(--esp-5)` (alinhado com o topo do avatar, dentro do padding do card) |
| `.agente-atuacao p` (novo) | `font-size: var(--fs-sm)`; cor `var(--cor-texto)`; **sem** itálico (não é estado vazio como o `.vazio`) |
| `.agente-card--apoio` | só serve de "gancho" para o selo; o resto do card (borda de cima 3px na cor, hover com brilho, avatar flutuando) é igual aos outros |

**Regras para o `equipe.js` (para o visual bater com a US28):**
- `apoio === true` → classe `agente-card--apoio`, selo depois do `h3` e bloco "Atuação". **Não** chamar `projetosDoAgente` para esse card (assim ele nunca mostra "Nenhum projeto ainda", mesmo com trabalho por engano no `projetos.json`).
- Sem `apoio` ou `apoio === false` → card igual a hoje.
- `--atraso` continua `posicao × 100ms` (o 6º card entra em 500ms).

### 13.5 Sobre: "Estudando agora" e 6 unidades (US25)

**Cartão (`dl.id-dados`):** só troca o primeiro par. Nenhum CSS novo.
```html
<dl class="id-dados">
  <div><dt>Estudando agora</dt><dd>JavaScript e Java</dd></div>
  <div><dt>Base</dt><dd>São Caetano do Sul, SP</dd></div>
  <div><dt>Foco</dt><dd>Desenvolvimento de Software</dd></div>
</dl>
```
Conferido: a grade é `auto-fit` com mínimo de 150px. "ESTUDANDO AGORA" em mono 12px com `letter-spacing .1em` tem ~126px, cabe no mínimo. No desktop (~690px de `.id-info`) ficam 3 colunas de ~215px; a 360px (280px úteis) fica 1 coluna, e "JavaScript e Java" (~120px) cabe numa linha. Se quebrar em telas menores, quebra entre palavras sem desalinhar (cada par é um `div` próprio).

**Bloco "Unidades sob comando":**
```
+-- Minha equipe ---------------------------+
| // UNIDADES SOB COMANDO                   |
| h2 Chefe de 6 unidades de IA              |
| (PO)(ART)(DEV)(TEST)(PROF)(MEN)           |   6 mini avatares de 48px, sobrepostos 8px
| Eu decido o que construir. A equipe...    |
| [Conhecer a equipe ->]                    |
+-------------------------------------------+
```
```html
<h2 id="titulo-minha-equipe">Chefe de 6 unidades de IA</h2>
<ul class="mini-avatares" aria-label="Unidades de IA">
  <li style="--agente-cor: #00E5FF"><img src="img/agentes/product-owner.svg" alt="Product Owner" width="48" height="48"></li>
  <li style="--agente-cor: #B45CFF"><img src="img/agentes/artista.svg" alt="Artista" width="48" height="48"></li>
  <li style="--agente-cor: #FF2BD6"><img src="img/agentes/dev.svg" alt="Dev" width="48" height="48"></li>
  <li style="--agente-cor: #FF9E4A"><img src="img/agentes/testador.svg" alt="Testador" width="48" height="48"></li>
  <li style="--agente-cor: #7CFFB2"><img src="img/agentes/professor.svg" alt="Professor" width="48" height="48"></li>
  <li style="--agente-cor: #5B9BFF"><img src="img/agentes/mentor-carreira.svg" alt="Mentor de carreira" width="48" height="48"></li>
</ul>
<p class="texto-suave">Eu decido o que construir. A equipe levanta os requisitos, desenha, programa, testa e me explica cada linha. O mentor me ajuda a planejar os estudos e a carreira.</p>
```
(O texto do parágrafo é sugestão: o João pode trocar.)

**Os 6 cabem?** Largura da fileira = 6 × 48 − 5 × 8 (sobreposição) + 4 (recuo do primeiro) + 4 (anel do último) = **256px**.

| Tela | Largura útil do bloco | Cabe? |
|---|---|---|
| 360px (1 coluna) | 328 − 2 × 24 = **280px** | sim, sobram 24px |
| 768px (2 colunas) | (704 − 24) / 2 − 48 = **292px** | sim |
| desktop (máx. 880px) | (880 − 24) / 2 − 48 = **380px** | sim |

Por segurança (telas abaixo de 360px, fora do requisito), `.mini-avatares` ganha `flex-wrap: wrap` e `row-gap: var(--esp-3)` (**mudança na seção 16**). A 360px ou mais, nada muda na tela. Atualizar também o comentário do HTML ("são só 4") para "são 6".

### 13.6 Classes e tokens (resumo para o dev)

**Tokens novos** (opcionais, no `:root` da seção 1; servem para documentar as cores, já que os componentes usam `--agente-cor`):

| Token | Valor | Uso |
|---|---|---|
| `--cor-laranja` | `#FF9E4A` | Testador |
| `--cor-azul` | `#5B9BFF` | Mentor de carreira |

O `--gradiente` da marca **não muda** (continua ciano → roxo → magenta).

**Classes novas**

| Classe | Onde | Seção |
|---|---|---|
| `.fluxo-apoio`, `.fluxo-apoio-titulo`, `.fluxo-apoio-corpo`, `.fluxo-apoio-nome`, `.fluxo-apoio-papel` | `index.html` | 13.3 |
| `.badge--apoio` | `index.html` e cards da Equipe | 13.3 |
| `.agente-card--apoio` | card com `"apoio": true` | 13.4 |
| `.agente-atuacao` (junto com `.agente-projetos`) | card com `"apoio": true` | 13.4 |

**Regras modificadas**

| Regra | Mudança | Seção do CSS |
|---|---|---|
| `.fluxo` (≥768px) | 4 → 5 colunas, `minmax(0, 1fr)` | 8 |
| `.fluxo-etapa`, `img`, `span` (≥768px) | etapa "em pé", borda colorida em cima, avatar 48px | 8 |
| `.fluxo-etapa::after` (<768px) | traço vertical novo entre as etapas | 8 |
| `.grade-equipe` (≥1024px) | 4 → 3 colunas | 12 |
| `.mini-avatares` | `flex-wrap: wrap; row-gap` | 16 |

**Tabela de contraste AA (tudo novo desta etapa)**

| Elemento | Cor / fundo | Razão | Mínimo |
|---|---|---|---|
| Número "04", nome na timeline, `UNIDADE://testador` | `#FF9E4A` / `#0C1021` (vidro) | 9.2:1 | 4.5:1 |
| Mesmo texto sobre o fundo da página | `#FF9E4A` / `#05060F` | 9.9:1 | 4.5:1 |
| `UNIDADE://mentor-carreira`, nome no bloco do Início | `#5B9BFF` / `#0C1021` | 6.8:1 | 4.5:1 |
| Mesmo texto sobre o fundo da página | `#5B9BFF` / `#05060F` | 7.3:1 | 4.5:1 |
| Selo "APOIO" (12px) | `#5B9BFF` / azul 10% sobre o vidro (≈ `#141E37`) | 6.0:1 | 4.5:1 |
| Testador sobre laranja 10% (caso apareça em algum selo) | `#FF9E4A` / ≈ `#241E25` | 8.0:1 | 4.5:1 |
| "FORA DO FLUXO: APOIO AO CHEFE", papel do mentor | `#9AA3BF` / `#0C1021` | ~7.4:1 | 4.5:1 |
| Texto de "Atuação" | `#E8ECF8` / `#0C1021` | ~15.6:1 | 4.5:1 |
| Borda tracejada do `.fluxo-apoio` (não-texto) | azul 70% (≈ `#4371BC`) / `#0C1021` | 3.9:1 | 3:1 |
| Borda de cima dos cards, anel dos mini avatares, traço dos avatares (não-texto) | `#FF9E4A` e `#5B9BFF` / `#0B1020` | 9.2:1 e 6.8:1 | 3:1 |

Atenção: a borda tracejada **com 55%** de mistura daria só ~2.9:1. Usar **70%** (ou mais).

### 13.7 Teclado, movimento reduzido e 360px

- **Teclado:** nada novo é clicável. O selo e o bloco do mentor são só texto; os links continuam os de sempre ("Conhecer a equipe", projetos nos cards), com o foco ciano global.
- **Movimento reduzido:** o bloco do mentor usa `.surgir` e os avatares novos usam `flutuar` (Equipe) e o hover dos mini avatares (Sobre). Tudo isso já é desligado pela regra geral da seção 21. Nenhuma regra nova.
- **360px (sem rolagem horizontal):** fluxo em lista vertical de 328px; bloco do mentor com 296px por dentro e selo que desce de linha; cards da Equipe com 280px por dentro (avatar + selo cabem); 6 mini avatares com 256px dentro de 280px; "Estudando agora" em 1 coluna.
- **Alto contraste do Windows (`forced-colors`):** as cores somem, mas "Apoio", "Atuação", "Fora do fluxo" e os nomes são texto, então nada se perde.

---

## 14. Etapa 6: projetos independentes (US33 e US37)

CSS pronto em `css/style.css`, **seção 40** (no fim do arquivo). Ícone novo: `img/icones/site.svg` (mesmo padrão dos outros: colar o `<svg>` inline, `aria-hidden="true"`). O visual da Agenda é próprio e fica em [`docs/projetos/agenda/design.md`](projetos/agenda/design.md).

### 14.1 Botões "Ver site" e "Ver código" no detalhe (US33)

**Decisões**
- **Posição:** no fim do cabeçalho do projeto (`.projeto-cabecalho`), **depois das tags**. É a "saída" do cabeçalho: primeiro o visitante lê o que é o projeto (nome, descrição, status, tecnologias) e logo em seguida tem as duas portas para fora. Ficam antes de "Trabalho dos agentes", então aparecem sem rolar no computador e logo depois do cabeçalho no celular.
- **Ordem e estilo:** "Ver site" primeiro, com `.btn.btn-primario` (gradiente, texto escuro): é o produto funcionando, a ação mais importante para um recrutador. "Ver código" depois, com `.btn.btn-secundario` (vidro com borda). Os dois são os botões que já existem (seção 6 do CSS); a seção 40 só acrescenta o grupo, o ícone e a setinha.
- **"Ver código" sozinho continua secundário** (caso da Labs e de projetos sem site, como um futuro projeto em Java). O estilo de cada botão não muda conforme o outro existe ou não: assim o visitante aprende uma vez o que cada um significa.
- **Ícones:** "Ver site" usa o ícone novo `site.svg` (janela de navegador). "Ver código" reaproveita o `github.svg` (o mesmo desenho próprio do botão GitHub do Sobre), porque o código abre no GitHub.
- **Nova aba, para a vista:** depois do texto vem a setinha `↗`, o mesmo sinal que os entregáveis já usam para "abre um arquivo". Ela fica `aria-hidden`.
- **Nova aba, para o leitor de tela:** `<span class="sr-only">(abre em nova aba)</span>`, igual aos contatos do Sobre (seção 10.2). O leitor lê "Ver site (abre em nova aba), link".
- **Sem nenhum dos dois campos** (ou com valor que não começa com `https://`): o `div.projeto-links` **não é criado**. Como o espaço entre os blocos vem do `gap` do `.projeto-cabecalho`, não sobra buraco.
- `target="_blank" rel="noopener noreferrer"`, como no Sobre (o `noreferrer` já inclui o `noopener` que a US33 pede).

**Wireframe (computador)**
```
<- Voltar para projetos
h1 Agenda
Agenda online para anotar compromissos...
[EM ANDAMENTO]  início 2026-11-04  ·  fim —
[HTML][CSS][JavaScript]

[(janela) Ver site ↗]  [(gato) Ver código ↗]      <- .projeto-links
--------------------------------------------------------------
h2 Trabalho dos agentes
```
**Labs (só código):**
```
[HTML][CSS][JavaScript]
[(gato) Ver código ↗]
```
**Celular (abaixo de 480px):** cada botão ocupa a linha inteira, um embaixo do outro (alvo grande para o polegar). Conferido a 360px: "Ver site" fica com ~150px de conteúdo (ícone 20 + 8 + texto ~60 + 8 + seta ~10 + padding 2 × 24) e "Ver código" com ~175px: os dois juntos (~337px + 12px de vão) **não** cabem nos 328px úteis, por isso empilham. De 480px para cima ficam lado a lado, com a largura do próprio texto.

**HTML exato** (gerado pelo `detalhe-projeto.js`, logo depois do `<div class="tags">`, ainda dentro do `<header class="projeto-cabecalho">`):

```html
<div class="projeto-links">
  <a class="btn btn-primario projeto-link" href="https://joaosaccucci.github.io/agenda/" target="_blank" rel="noopener noreferrer">
    <!-- colar aqui o <svg> de img/icones/site.svg -->
    <span>Ver site</span>
    <span class="projeto-link-seta" aria-hidden="true">&#8599;</span>
    <span class="sr-only">(abre em nova aba)</span>
  </a>
  <a class="btn btn-secundario projeto-link" href="https://github.com/JoaoSaccucci/agenda" target="_blank" rel="noopener noreferrer">
    <!-- colar aqui o <svg> de img/icones/github.svg -->
    <span>Ver código</span>
    <span class="projeto-link-seta" aria-hidden="true">&#8599;</span>
    <span class="sr-only">(abre em nova aba)</span>
  </a>
</div>
```
- Os SVGs podem ficar em duas constantes de texto no JS (copiadas dos arquivos), para o template ficar curto.
- O endereço passa pelo `escapar()`, como todo o resto, **depois** da conferência do `https://` (US33).

**Contraste e estados** (nada novo: são os botões da seção 6)

| Elemento | Cor / fundo | Razão | Mínimo |
|---|---|---|---|
| Texto de "Ver site" | `#05060F` / gradiente (pior ponto: roxo `#B45CFF`) | 5.7:1 | 4.5:1 |
| Texto de "Ver código" | `#E8ECF8` / vidro sobre o fundo | ~15:1 | 4.5:1 |
| Setinha e ícone | mesma cor do texto de cada botão | igual ao texto | 3:1 |
| Contorno de foco | `#00E5FF` / `#05060F` | ~13:1 | 3:1 |

- **Hover:** "Ver site" sobe 2px com brilho ciano + magenta; "Ver código" ganha borda ciano com brilho (os dois já vêm da seção 6). Nos dois, a setinha anda 2px na diagonal (para cima e para a direita), reforçando "sai daqui".
- **Foco:** contorno ciano global (seção 2 do CSS).
- **Movimento reduzido:** a regra geral (seção 21) já tira as transições; a seção 40 também tira o movimento da setinha.

### 14.2 Entregáveis com endereço completo (US33)

Nada muda no visual: o chip `.entregavel` já tem a setinha `↗` na cor do agente. Quando a `url` começa com `https://`, o JS acrescenta `target="_blank" rel="noopener noreferrer"` e, depois do título, `<span class="sr-only"> (abre em nova aba)</span>`. Caminho relativo continua igual a hoje (mesma aba, sem o texto escondido).

```html
<a class="entregavel" href="https://github.com/JoaoSaccucci/agenda/blob/main/js/agenda.js" target="_blank" rel="noopener noreferrer">Código (JS)<span class="sr-only"> (abre em nova aba)</span></a>
```

### 14.3 A Agenda na vitrine (US37)

**Nada muda na lista de projetos.** O card da Agenda é igual ao da Labs (linha de gradiente no topo, badge de status, descrição, data), sem cor nem ícone próprio. Motivos:
- A US37 pede que a Agenda apareça "sem mudar HTML ou JS além do que a US33 pede". Uma cor ou ícone por projeto precisaria de um campo novo no JSON e de mudança no `lista-projetos.js`.
- Os cards iguais deixam a vitrine organizada como um portfólio: o que diferencia os projetos é o nome, a descrição e o status, que são texto.
- A personalidade da Agenda aparece quando o visitante clica em "Ver site".

Se um dia houver muitos projetos, dá para criar um campo opcional `cor` em `projetos.json` (usado como `--agente-cor` na linha do topo do card). Fica como ideia para o futuro, sem nada no CSS agora.

### 14.4 Classes novas (resumo para o dev)

| Classe | Onde | Seção do CSS |
|---|---|---|
| `.projeto-links` | grupo dos botões, dentro do `.projeto-cabecalho` | 40 |
| `.projeto-link` (junto com `.btn .btn-primario` ou `.btn .btn-secundario`) | cada botão | 40 |
| `.projeto-link-seta` | a setinha `↗` | 40 |

---

## 15. Etapa 7: aulas por projeto (US39 a US41)

O CSS desta etapa é escrito pelo dev numa **seção 41 nova, no fim do `css/style.css`** (depois da seção 40, "Links do projeto"), com o cabeçalho "ETAPA 7 - AULAS POR PROJETO". Nenhuma regra antiga muda de lugar, nenhum token novo, nenhum ícone novo. A lista de módulos e cards (seção 12.2) continua exatamente igual.

### 15.0 Conceito e decisões

- **"Seletor de canal" do centro de comando.** No topo da aba Aulas fica uma fileira de botões, um por projeto, como os canais de um painel. Cada botão é um cartãozinho de vidro com duas linhas: o **nome** do projeto e, embaixo, em mono pequeno, o **progresso** ("3 de 8 concluídas"). Abaixo da fileira aparece só o projeto escolhido.
- **Ciano = "onde estou", verde = "concluído".** É a mesma regra do site: o link ativo do menu (`aria-current`) já é ciano, e o verde é a cor da aula e do "✓ Concluída". Por isso o botão **selecionado** é ciano e o progresso **completo** é verde. Os dois estados podem aparecer juntos sem se confundir.
- **Selecionado se diferencia por forma, não só por cor (US41):** borda de **2px** (os outros têm 1px) + uma **barra grossa de 4px embaixo**, como a "aba aberta" de um fichário, + fundo levemente ciano. A forma continua visível no alto contraste do Windows e para quem não distingue cores.
- **O peso da letra não muda** ao selecionar (fica 600 sempre). Trocar para 700 deixaria o nome mais largo e o botão "pularia" de tamanho a cada clique.
- **Tudo concluído:** o texto do progresso fica verde e ganha o `✓` no fim ("15 de 15 concluídas ✓"), igual ao progresso do módulo (seção 12.2). O `✓` é `aria-hidden`; o texto já diz tudo.
- **"Outras aulas"** (só existe se houver aula com módulo inexistente) usa o mesmo botão, com a borda **tracejada** quando não está selecionado: é o sinal visual de "grupo à parte", o mesmo usado no bloco de apoio do Início (seção 13.3).
- **Quebra de linha, não rolagem lateral.** Com rolagem dentro da faixa, um botão pode ficar escondido à direita sem ninguém perceber que existe. Com quebra, todos ficam sempre à vista. A 360px, cada botão ocupa a linha inteira (alvo grande para o polegar).
- **Troca de projeto com um "fade" curto da lista inteira** (240ms), e não com o "surgir" card a card. O "surgir" escalonado leva até 1,1s (5 × 100ms de atraso + 600ms) e, a cada clique, pareceria lento. Ele continua só na **primeira** montagem da página, como hoje.
- **Rótulo visível "Escolha o projeto"** acima dos botões, em mono pequeno (como os rótulos `// ...` do site, mas sem as barras, porque ele também é o nome do grupo para o leitor de tela e "barra barra" seria lido em voz alta).

### 15.1 Onde fica na página

O grupo fica **fora** do `#area-aulas`, entre o `.pagina-titulo` (rótulo, `h1` e texto de introdução) e a lista. Ele começa com `hidden` e o JS tira o `hidden` quando o `data/aulas.json` carrega. Se o JSON falhar, o grupo continua escondido e só aparece a mensagem de erro de hoje (requisitos gerais da Etapa 7).

**Por que fora do `#area-aulas`:** hoje o `#area-aulas` tem `aria-live="polite"`. Se os botões e a lista ficassem dentro dele, cada troca de projeto faria o leitor de tela ler a lista **inteira** em voz alta. Então:
- o grupo de botões fica fora da região viva;
- o `aria-live` **sai** do `#area-aulas`. A troca já é anunciada pelo próprio botão ("pressionado"), e a lista nova fica logo depois dele na ordem de leitura;
- a mensagem de erro de carregamento continua aparecendo no `#area-aulas`; para ela ser anunciada, ela leva `role="alert"` (como a `aula-mensagem` da seção 11.4).

**Desktop (a partir de 640px; coluna de até 880px, igual à lista)**
```
[HEADER: logo ............ Início Projetos Equipe Aulas* Sobre]
// AULAS DO PROFESSOR                                   (.rotulo)
h1 Aulas
Aulas curtas, um conceito por vez...                    (.texto-suave)

ESCOLHA O PROJETO                                       (.aulas-escolha-rotulo, mono 12px)
╔══════════════════╗  ┌──────────────────────────┐
║ Agenda           ║  │ João Saccucci Labs       │     <- .escolha-botao
║ 3 de 8 concluídas║  │ 15 de 15 concluídas ✓    │        (2ª linha em verde: tudo concluído)
╚▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀╝  └──────────────────────────┘
 ^ selecionado: borda 2px ciano + barra de 4px embaixo + fundo ciano 8%
                                                        48px
h2 Agenda                                               (.aulas-projeto-titulo, igual a hoje)
--------------------------------------------------------------
[MÓDULO 1]
h3 ...
(módulos e cards exatamente como na seção 12.2)
[FOOTER]
```

**Celular (abaixo de 640px; testado a 360px = 328px úteis)**
```
ESCOLHA O PROJETO
╔════════════════════════════╗
║ Agenda                     ║   cada botão ocupa a linha inteira
║ 3 de 8 concluídas          ║   (~62px de altura)
╚▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀╝
┌────────────────────────────┐   12px entre eles
│ João Saccucci Labs         │
│ 15 de 15 concluídas ✓      │
└────────────────────────────┘
                                 48px
h2 Agenda
...
```
**Conta a 360px:** "João Saccucci Labs" em 16px/600 tem ~158px; "15 de 15 concluídas ✓" em mono 12px tem ~151px (21 letras × ~7,2px). Com padding 2 × 16px e borda, o botão fica com ~192px. O da Agenda fica com ~156px. Juntos (192 + 12 + 156 = **360px**) não cabem nos 328px, então cada um vai para a sua linha e estica até 328px (`flex: 1 1 auto`). Entre 480 e 639px os dois cabem lado a lado e dividem a linha. Nome muito longo: quebra **dentro** do botão (`overflow-wrap: anywhere`), sem cortar e sem vazar.

**A partir de 640px:** cada botão tem a largura do próprio texto, com mínimo de 11rem (176px), alinhados à esquerda. Com muitos projetos no futuro, a fileira quebra em mais linhas.

**Título do projeto mostrado:** continua o `h2.aulas-projeto-titulo` de hoje, com o nome do projeto (ou o `id`, se o projeto não estiver em `projetos.json`, ou "Outras aulas"). Nada muda no estilo. Ordem dos títulos: `h1` Aulas → `h2` projeto → `h3` módulo → `h4` aula (o rótulo do grupo é um `<p>`, não um título, então não entra na sequência).

### 15.2 HTML de referência

**Fixo no `aulas.html`** (entre o `.pagina-titulo` e o `#area-aulas`):

```html
<div class="aulas-escolha" id="escolha-projeto" role="group" aria-labelledby="escolha-projeto-rotulo" hidden>
  <p class="aulas-escolha-rotulo" id="escolha-projeto-rotulo">Escolha o projeto</p>
  <div class="aulas-escolha-lista" id="escolha-projeto-lista">
    <!-- botões gerados pelo js/aulas.js, na ordem da regra "Ordem dos botões" -->
  </div>
</div>

<!-- sem aria-live agora (ver 15.1) -->
<div id="area-aulas">
  <p class="mensagem">Carregando aulas...</p>
</div>
```

**Botões gerados pelo JS** (exemplo de hoje: Agenda selecionada com parte feita; Labs com tudo concluído):

```html
<button class="escolha-botao" type="button" aria-pressed="true" aria-controls="area-aulas" data-projeto="agenda">
  <span class="escolha-botao-nome">Agenda</span><span class="sr-only">, </span>
  <span class="escolha-botao-progresso">3 de 8 concluídas</span>
</button>

<button class="escolha-botao escolha-botao--completo" type="button" aria-pressed="false" aria-controls="area-aulas" data-projeto="joao-saccucci-labs">
  <span class="escolha-botao-nome">João Saccucci Labs</span><span class="sr-only">, </span>
  <span class="escolha-botao-progresso">15 de 15 concluídas <span aria-hidden="true">✓</span></span>
</button>

<!-- só se existir aula com modulo inexistente; sempre o último -->
<button class="escolha-botao escolha-botao--outras" type="button" aria-pressed="false" aria-controls="area-aulas" data-projeto="outras-aulas">
  <span class="escolha-botao-nome">Outras aulas</span><span class="sr-only">, </span>
  <span class="escolha-botao-progresso">0 de 1 concluída</span>
</button>
```

- **Pausa no nome acessível:** o `<span class="sr-only">, </span>` entre nome e progresso faz o leitor de tela ler "Agenda, 3 de 8 concluídas, botão de alternância, pressionado" (sem ele, alguns leitores juntam "Agenda3 de 8"). Mesmo truque do `— ` escondido no título do módulo (seção 12.2).
- `escolha-botao--completo` entra quando X = Y. Singular e plural seguem o total (regra "Texto do progresso no botão" dos requisitos).
- `data-projeto` guarda o `id` (ou `outras-aulas`) para o JS saber qual projeto abrir. Todos os textos passam pelo `escapar()`.
- `aria-pressed` é sempre `"true"` ou `"false"` (nunca ausente), e só um botão fica `"true"`.

**Regras para o JS (para o visual e o foco baterem com a US41):**
1. **Ao clicar, não recriar os botões.** Só trocar o `aria-pressed` (o antigo vira `"false"`, o clicado vira `"true"`) e montar a lista nova no `#area-aulas`. Se os botões forem recriados com `innerHTML`, o foco do teclado se perde (US41 pede que ele continue no botão escolhido).
2. **Primeira montagem da página:** a lista usa o `.surgir` nos cards, como hoje.
3. **Troca de projeto (clique ou mudança do `#`):** a lista nova é montada **sem** `.surgir` nos cards, e a `section.aulas-projeto` recebe a classe `aulas-trocar` (o fade curto da seção 41). Clicar no botão que já está selecionado não remonta nada.
4. **"Voltar" do navegador (`pageshow` com `persisted`):** atualizar o texto do progresso de cada botão e a classe `--completo` **no lugar** (sem recriar os botões) e remontar a lista sem animação.
5. **Nenhum elemento da página pode ter `id` igual ao `id` de um projeto** (ex.: `id="agenda"`), senão o navegador rola sozinho até ele quando o endereço é `aulas.html#agenda`, e os botões somem do topo. Os `id` de hoje (`projeto-agenda`, `agenda-m1`...) estão certos. **Atenção:** a `section` de "Outras aulas" tem hoje `id="outras-aulas"`. Esse `id` deve **sair** da `section` (o `aria-labelledby="titulo-outras-aulas"` continua), para `aulas.html#outras-aulas` abrir com a página no topo, igual aos projetos. Só o `#` de **módulo** rola até o módulo (comportamento de hoje, com o `scroll-margin-top` da seção 38.1).

### 15.3 Estados do botão

| Estado | Borda | Fundo | Nome | Progresso | Outros |
|---|---|---|---|---|---|
| Normal | 1px `--cor-borda-forte` | `--cor-vidro` | `--cor-texto`, 600 | `--cor-texto-suave` | - |
| Hover (não selecionado) | 1px `--cor-texto-suave` | lilás 8% sobre `--cor-fundo-2` (≈ `#161B32`) | igual | igual | sem "pulo" (nada de `translateY`) |
| Foco (teclado) | igual ao estado em que está | igual | igual | igual | contorno ciano global (2px, 3px de distância, seção 2) por fora da borda |
| **Selecionado** (`aria-pressed="true"`) | **2px ciano + 4px embaixo** | ciano 8% sobre `--cor-fundo-2` (≈ `#0B2133`) | igual (600) | `--cor-texto-suave` | brilho ciano fraco; hover não muda nada |
| Tudo concluído (`--completo`) | (a do estado atual) | (o do estado atual) | igual | **`--cor-verde`** + `✓` | vale junto com qualquer estado acima |
| "Outras aulas" não selecionado | 1px **tracejada** | `--cor-vidro` | igual | igual | selecionado fica igual aos outros (sólido) |

- O padding do selecionado diminui na mesma medida que a borda engrossa: o botão **não muda de tamanho** ao ser escolhido.
- Selecionado + foco: o contorno de foco ciano fica 3px **para fora** da borda ciano, com uma faixa escura entre os dois. Dá para ver que são duas coisas diferentes.
- Botão selecionado continua clicável e com `cursor: pointer` (clicar de novo não faz nada, mas também não parece "quebrado").

### 15.4 CSS de referência (seção 41, no fim do `css/style.css`)

```css
/* =========================================================
   ETAPA 7 - AULAS POR PROJETO
   Seção 41: botões de projeto no topo da aba Aulas
   (US39 a US41). As decisões estão no docs/design.md, seção 15.
   A lista de módulos e cards continua a da seção 38.1.
   ========================================================= */

/* ---------------------------------------------------------
   41. ESCOLHA DO PROJETO (aulas.html)
   <div class="aulas-escolha" role="group" hidden> fica entre o
   .pagina-titulo e o #area-aulas. O display fica na lista de
   dentro (e não no .aulas-escolha) para o atributo hidden
   continuar escondendo o grupo até o JSON carregar.
   --------------------------------------------------------- */
.aulas-escolha {
  max-width: 880px;                 /* mesma largura da lista de aulas */
  margin-bottom: var(--esp-7);      /* 48px até o h2 do projeto */
}

/* "Escolha o projeto": mono pequeno, como os rótulos do site */
.aulas-escolha-rotulo {
  margin-bottom: var(--esp-3);
  font-family: var(--fonte-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cor-texto-suave);
}

/* Os botões quebram linha (nunca rolam para o lado) */
.aulas-escolha-lista {
  display: flex;
  flex-wrap: wrap;
  gap: var(--esp-3);
}

/* --- 41.1 Botão de projeto: nome + progresso --- */
.escolha-botao {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  min-width: 11rem;
  max-width: 100%;
  min-height: 44px;                 /* na prática ~62px (duas linhas) */
  padding: var(--esp-3) var(--esp-4);
  font-family: var(--fonte-texto);
  text-align: left;
  color: var(--cor-texto);
  background: var(--cor-vidro);
  border: 1px solid var(--cor-borda-forte);
  border-radius: var(--raio-md);
  cursor: pointer;
  transition: border-color var(--transicao), background var(--transicao), box-shadow var(--transicao);
}

.escolha-botao-nome {
  font-size: var(--fs-base);
  font-weight: 600;                 /* não muda ao selecionar: o botão não "pula" */
  line-height: 1.3;
  overflow-wrap: anywhere;          /* nome longo quebra dentro do botão */
}

.escolha-botao-progresso {
  font-family: var(--fonte-mono);
  font-size: var(--fs-xs);
  line-height: 1.4;
  color: var(--cor-texto-suave);
  overflow-wrap: anywhere;
}

/* Hover: borda e fundo mais claros, sem ciano (ciano = selecionado) */
.escolha-botao:not([aria-pressed="true"]):hover {
  border-color: var(--cor-texto-suave);
  background: color-mix(in srgb, #94A3FF 8%, var(--cor-fundo-2));
}

/* Selecionado: mais do que cor. Borda 2px + barra de 4px embaixo
   ("aba aberta") + fundo ciano. O padding diminui o mesmo tanto
   que a borda cresce, então o botão não muda de tamanho. */
.escolha-botao[aria-pressed="true"] {
  padding: calc(var(--esp-3) - 1px) calc(var(--esp-4) - 1px) calc(var(--esp-3) - 3px);
  background: color-mix(in srgb, var(--cor-ciano) 8%, var(--cor-fundo-2));
  border: 2px solid var(--cor-ciano);
  border-bottom-width: 4px;
  box-shadow: 0 0 16px rgba(0, 229, 255, 0.2);
}

/* Tudo concluído: progresso verde (o ✓ vem no HTML, aria-hidden) */
.escolha-botao--completo .escolha-botao-progresso {
  color: var(--cor-verde);
}

/* "Outras aulas": borda tracejada = grupo à parte */
.escolha-botao--outras:not([aria-pressed="true"]) {
  border-style: dashed;
}

/* Celular: o botão estica e ocupa a linha (ou divide com o vizinho
   quando os dois cabem). A 360px, cada um fica na sua linha. */
@media (max-width: 639.98px) {
  .escolha-botao {
    flex: 1 1 auto;
  }
}


/* --- 41.2 Troca de projeto ---
   O JS põe .aulas-trocar na section.aulas-projeto nova (só na troca;
   na primeira montagem os cards usam o .surgir, como antes). */
.aulas-trocar {
  animation: aulas-trocar 240ms ease-out both;
}

@keyframes aulas-trocar {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: none; }
}


/* --- 41.3 Movimento reduzido ---
   A seção 21 encurta as animações, mas NÃO tira o animation-delay:
   com o .surgir (fill "both"), os cards ficariam invisíveis por até
   500ms. Aqui a lista aparece direto, sem efeito nenhum. */
@media (prefers-reduced-motion: reduce) {
  .escolha-botao {
    transition: none;
  }

  .aulas-trocar,
  .aulas .surgir {
    animation: none;
  }
}


/* --- 41.4 Alto contraste do Windows ---
   As cores somem, mas a forma fica: borda 2px + barra de 4px no
   selecionado. Highlight é a cor de "selecionado" do sistema. */
@media (forced-colors: active) {
  .escolha-botao {
    border-color: ButtonText;
  }

  .escolha-botao[aria-pressed="true"] {
    border-color: Highlight;
  }
}
```

### 15.5 Contraste AA (conferido com números)

Fórmula do WCAG, como na seção 13.1. Fundos usados: página `#05060F` (L ≈ 0.0020); vidro do botão ≈ `#0C1021` (L ≈ 0.0056); hover ≈ `#161B32` (L ≈ 0.012); selecionado = ciano 8% ≈ `#0B2133` (L ≈ 0.014). Luminâncias das cores: `#E8ECF8` 0.84; `#9AA3BF` 0.37; `#7CFFB2` 0.79; `#00E5FF` 0.63.

| Elemento | Cor / fundo | Razão | Mínimo |
|---|---|---|---|
| Rótulo "ESCOLHA O PROJETO" (12px) | `#9AA3BF` / `#05060F` | 7.9:1 | 4.5:1 |
| Nome do projeto: normal | `#E8ECF8` / `#0C1021` | 15.6:1 | 4.5:1 |
| Nome do projeto: hover | `#E8ECF8` / `#161B32` | 14.3:1 | 4.5:1 |
| Nome do projeto: selecionado | `#E8ECF8` / `#0B2133` | 13.9:1 | 4.5:1 |
| **Progresso (mono 12px)**: normal | `#9AA3BF` / `#0C1021` | 7.4:1 | 4.5:1 |
| **Progresso (mono 12px)**: hover | `#9AA3BF` / `#161B32` | 6.7:1 | 4.5:1 |
| **Progresso (mono 12px)**: selecionado | `#9AA3BF` / `#0B2133` | 6.5:1 | 4.5:1 |
| **Progresso completo (verde, 12px)**: normal / selecionado | `#7CFFB2` / `#0C1021` e `#0B2133` | 15.1:1 e 13.1:1 | 4.5:1 |
| Indicador de selecionado (borda 2px + barra 4px, não-texto) | `#00E5FF` / `#0C1021` (vizinho) e `#05060F` (página) | 12.3:1 e 13.1:1 | 3:1 |
| Borda do hover (não-texto) | `#9AA3BF` / `#05060F` | 7.9:1 | 3:1 |
| Contorno de foco (não-texto) | `#00E5FF` / `#05060F` | 13.1:1 | 3:1 |

- O texto pequeno do progresso (12px) passa como **texto normal** (4.5:1) em todos os estados; o pior caso é 6.5:1.
- A borda do botão **normal** (`--cor-borda-forte`, ≈ 2:1) é decorativa: o botão é identificado pelo texto (nome + progresso), como os `.btn-secundario` do site. O que precisa de 3:1 é o **indicador de estado** (selecionado), e ele tem 12:1.
- O `✓` é complemento: a informação "tudo concluído" está no texto "15 de 15".

### 15.6 Teclado, movimento reduzido, alto contraste e 360px

- **Teclado:** Tab passa pelos botões na ordem da tela (depois do menu e antes dos cards de aula); Enter ou Espaço escolhem (comportamento nativo do `<button>`). O foco fica no botão escolhido e a página não rola sozinha.
- **Leitor de tela:** grupo "Escolha o projeto"; cada botão é lido como "Agenda, 3 de 8 concluídas, botão de alternância, pressionado/não pressionado". O `✓` não é lido.
- **Movimento reduzido:** sem transição nos botões, sem fade na troca e sem o "surgir" dos cards (nem na primeira montagem). A lista aparece direto.
- **Alto contraste (`forced-colors`):** borda com a cor de texto do sistema; selecionado com a cor `Highlight` **e** a borda mais grossa com a barra embaixo (a forma não depende da cor). Progresso e "concluídas" são texto.
- **360px:** botões de 328px, um por linha, ~62px de altura (acima dos 44px); nomes longos quebram dentro do botão; nenhuma rolagem horizontal (o grupo usa `flex-wrap` e `max-width: 100%`).

### 15.7 Conferência para o dev e o testador

**Dev**
- [ ] Grupo fixo no `aulas.html`, entre o `.pagina-titulo` e o `#area-aulas`, começando com `hidden`; `role="group"` + `aria-labelledby` apontando para o rótulo visível.
- [ ] `aria-live` retirado do `#area-aulas`; mensagem de erro de carregamento com `role="alert"`.
- [ ] Botões `<button type="button">` com `aria-pressed` sempre `"true"`/`"false"`, nome + `<span class="sr-only">, </span>` + progresso, `✓` com `aria-hidden` e classe `--completo` quando X = Y.
- [ ] Ao clicar, só `aria-pressed` muda nos botões (sem recriar); a lista nova entra com `.aulas-trocar` e sem `.surgir`.
- [ ] No `pageshow` (voltar do navegador), progresso e `--completo` atualizados no lugar.
- [ ] Nenhum elemento com `id` igual ao `id` de um projeto; `id="outras-aulas"` retirado da `section` de Outras aulas.
- [ ] CSS na seção 41 nova, no fim do `style.css`, sem mexer nas seções antigas.

**Testador** (além do que os requisitos da Etapa 7 já pedem)
- [ ] 360px: botões um por linha, sem rolagem horizontal, nada cortado; a 480–639px os dois dividem a linha; desktop com a largura do texto.
- [ ] Selecionado reconhecível em escala de cinza (DevTools → Rendering → "Emulate vision deficiencies: achromatopsia"): borda grossa + barra embaixo.
- [ ] O botão não muda de tamanho ao ser selecionado.
- [ ] Tab: foco visível em cada botão, inclusive no selecionado; depois de Enter/Espaço o foco continua no mesmo botão.
- [ ] Leitor de tela (NVDA ou Narrador): "Agenda, 3 de 8 concluídas, ... pressionado"; a troca **não** faz o leitor ler a lista inteira.
- [ ] `prefers-reduced-motion` (DevTools → Rendering): a lista aparece na hora, sem fade e sem os cards "subindo", também ao abrir a página.
- [ ] Alto contraste (DevTools → Rendering → "forced-colors: active", ou o tema de alto contraste do Windows): selecionado continua diferente dos outros.
- [ ] `aulas.html#agenda` e `aulas.html#outras-aulas` abrem com a página no topo (botões à vista); `aulas.html#agenda-m1` rola até o módulo.
- [ ] Contraste do texto pequeno do progresso conferido com o seletor de cor do DevTools nos três estados (normal, hover, selecionado).

### 15.8 Decisões aprovadas pelo João (2026-11-06)

As 3 decisões abaixo foram aprovadas pelo João em 2026-11-06, todas na opção recomendada: rótulo "Escolha o projeto" visível; fade curto da lista na troca de projeto (o "surgir" card a card só ao abrir a página); no celular, um botão por linha.

1. **Rótulo visível "Escolha o projeto"** acima dos botões (recomendado). A outra opção é deixar o rótulo só para o leitor de tela, com a fileira de botões direto abaixo do texto de introdução.
2. **Troca de projeto com um fade curto da lista inteira** (240ms), e o "surgir" card a card só ao abrir a página (recomendado). A outra opção é repetir o "surgir" card a card a cada troca (mais vistoso, mas leva até 1,1s).
3. **No celular, um botão por linha** (quebra, recomendado). A outra opção é uma faixa única que rola para o lado, que ocupa menos altura mas pode esconder projetos fora da tela.
