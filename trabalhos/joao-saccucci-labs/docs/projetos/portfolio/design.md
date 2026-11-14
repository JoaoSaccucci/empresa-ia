# Design: Portfólio

Projeto independente da João Saccucci Labs. Requisitos em [`requisitos.md`](requisitos.md) (Portfólio US01 a US15, com as decisões de 2026-11-14). O código fica no repositório `portfolio` (quem cria a pasta e os arquivos é o dev). Este arquivo traz tudo o que o dev precisa: conceito, paleta com contraste conferido, tipografia, layout de cada seção (celular e computador), componentes e estados, efeitos com tempos e curvas, ícones em SVG, prévia Open Graph e um **CSS de referência** (seção 12), pronto para virar o `css/style.css`.

**As 8 decisões de design foram tomadas pelo João em 2026-11-14** (seção 15). Este arquivo já está escrito com as escolhas dele. A maior mudança em relação à primeira versão: a foto agora fica num **crachá pendurado por uma fita**, que dá para arrastar e que balança como pêndulo (seções 6.1, 8.5 e 13).

**Regra de texto (pedido do João):** a palavra "chefe" (e "boss", em inglês) **não aparece em nenhum texto visível do site**, nem em `alt`, nem em texto escondido para leitor de tela. Quando for preciso falar do papel do João, use "decide e aprova" / "decides and approves" ou "coordeno a equipe".

---

## 1. Conceito

**"O escritório, à noite."** O fundo azul-noite é a janela do escritório depois do expediente. As manchas âmbar e lilás são as luzes da cidade vistas através de um vidro embaçado. A luz âmbar que segue o mouse é a **luminária da mesa do João**. Os cartões são divisórias de vidro, e cada projeto aparece numa **janela de tela** (navegador para os sites, terminal para os programas Java), como as telas da equipe trabalhando. Logo na entrada, pendurado na fita, está o **crachá** do João.

A sensação vem do ekizr.com (escuro, manchas, vidro, movimento), mas a personalidade vem de quatro detalhes que só o João tem:
1. **O crachá pendurado** no Topo: a foto do João num crachá de vidro, preso por uma fita que sai de trás do menu. Dá para puxar com o mouse ou o dedo e, ao soltar, ele balança até parar.
2. **O organograma da empresa** no Sobre mim: o João no topo, em âmbar, e a equipe de agentes de IA embaixo, em lilás, desenhada como a saída do comando `tree`. Em 3 segundos o recrutador entende a história.
3. **As telas que acendem**: o print de cada projeto "liga" como um monitor (uma linha de luz que se abre na tela inteira), e os projetos Java mostram um terminal de verdade, com o programa rodando.
4. **O ponto final âmbar** nos títulos ("Projetos.", "Contato."): a assinatura de quem decide e aprova. É o mesmo ponto do favicon "J." e da marca "J." estampada na fita do crachá.

Regras do clima:
- **Âmbar é o João e a ação:** botão principal (LinkedIn, Ver site), item ativo do menu, a caixa do João no organograma, o cargo no crachá, a marca "J." da fita, o ponto final dos títulos, a luz do mouse.
- **Lilás é a equipe e a tecnologia:** contornos dos botões secundários, links, os agentes do organograma, as janelas.
- **Azul-céu só no foco do teclado**, como na Agenda (nunca se confunde com nada da tela).
- Estrutura **convencional**: nada de layout "experimental". Tudo o que mexe é enfeite; com movimento reduzido ou sem JavaScript, a página é a mesma, só parada.

**Família visual:** é parente da Agenda (mesmas cores de marca, Space Grotesk, JetBrains Mono, foco azul-céu, escala de espaçamento de 4px), mas troca o "quadro de horários" calmo por vidro, luz e movimento.

---

## 2. Paleta (variáveis CSS)

| Token | Valor | Uso |
|---|---|---|
| `--cor-fundo` | `#0F0D1A` | fundo da página (azul-noite) |
| `--cor-superficie` | `#14111F` | equivalente sólido do vidro sobre o fundo (usado para conferir contraste) |
| `--cor-vidro` | `rgba(23, 19, 38, 0.62)` | cartões de vidro no computador (com `backdrop-filter`) |
| `--cor-vidro-solido` | `rgba(20, 17, 33, 0.90)` | cartões no celular e onde não há `backdrop-filter` |
| `--cor-vidro-menu` | `rgba(15, 13, 26, 0.72)` | barra do menu fixo |
| `--cor-janela` | `#0B0A12` | corpo das janelas (print e terminal) |
| `--cor-janela-barra` | `#17142A` | barra de título das janelas |
| `--cor-borda-vidro` | `rgba(244, 241, 250, 0.10)` | borda **decorativa** dos cartões de vidro |
| `--cor-borda-vidro-forte` | `rgba(244, 241, 250, 0.18)` | borda do cartão no hover |
| `--cor-borda-controle` | `#8A84A3` | borda do botão de idioma (precisa de 3:1) |
| `--cor-texto` | `#F4F1FA` | texto principal (branco levemente lilás) |
| `--cor-texto-suave` | `#B9B3CC` | texto secundário, descrições, metadados, menu |
| `--cor-texto-apagado` | `#8A84A3` | **só** dentro do terminal (comentários); nunca sobre vidro ou manchas |
| `--cor-ambar` | `#F59E0B` | marca; botão principal; ativo do menu; ponto final dos títulos |
| `--cor-ambar-claro` | `#FBBF24` | hover do botão principal |
| `--cor-lilas` | `#C084FC` | marca; bordas de botão secundário; agentes; **texto só grande (24px+)** |
| `--cor-lilas-texto` | `#D8B4FE` | lilás para **texto pequeno**: links, "Verificar", nomes dos agentes |
| `--cor-verde-terminal` | `#86EFAC` | só no terminal ("sucesso", valores) |
| `--cor-foco` | `#7DD3FC` | contorno de foco (só ele usa essa cor) |
| `--cor-sobre-ambar` | `#1A1205` | texto sobre âmbar (botão cheio) |
| `--cor-cracha` | `rgba(23, 19, 38, 0.92)` | corpo do crachá (quase sólido: ele se mexe, então **não** usa `backdrop-filter`) |
| `--cor-fita` | `#4C3580` | fita do crachá (lilás escuro) |
| `--cor-fita-borda` | `rgba(192, 132, 252, 0.55)` | bordinha de 1px dos dois lados da fita |
| `--cor-metal` | `#8A84A3` → `#E4E0EE` → `#8A84A3` | gradiente da presilha (decorativo) |

Também em RGB, para usar com transparência: `--rgb-ambar: 245 158 11` e `--rgb-lilas: 192 132 252`.

**Regra igual à da Labs e da Agenda:** botão cheio âmbar usa **texto escuro** `#1A1205`, nunca branco.

**Regra nova deste projeto:** o lilás da marca (`#C084FC`) só aparece como **texto** em tamanho grande (24px ou mais). Para texto pequeno em lilás, use sempre `--cor-lilas-texto` (`#D8B4FE`). O motivo está na tabela abaixo (pior ponto das manchas).

### 2.1 Como as manchas e a luz entram na conta

As manchas e a luz do mouse clareiam o fundo, então o contraste tem que ser conferido no **pior ponto possível**: o lugar em que as três manchas passam ao mesmo tempo, no centro (opacidade máxima), com a luz do mouse por cima. Para isso, a opacidade máxima de cada uma é **fixa** e faz parte do design (não aumentar sem refazer a conta):

| Camada | Cor | Opacidade no centro |
|---|---|---|
| Mancha 1 | âmbar | 0.12 |
| Mancha 2 | lilás | 0.14 |
| Mancha 3 | lilás | 0.08 |
| Luz do mouse | âmbar | 0.07 |
| Brilho do cartão inclinado | branco | 0.08 |

Somando tudo sobre `#0F0D1A`, o **pior ponto do fundo** fica ≈ `#563B44`. Em cima dele, o vidro (`--cor-vidro`) fica ≈ `#2F2231`, e com o brilho do cartão inclinado ≈ `#403442`.

### 2.2 Contraste conferido (WCAG 2.1, fórmula de luminância relativa)

| Elemento | Cor / fundo | Razão | Mínimo |
|---|---|---|---|
| Texto principal | `#F4F1FA` / `#0F0D1A` | 17.2:1 | 4.5:1 |
| Texto suave | `#B9B3CC` / `#0F0D1A` | 9.5:1 | 4.5:1 |
| Âmbar (texto) | `#F59E0B` / `#0F0D1A` | 9.0:1 | 4.5:1 |
| Lilás-texto | `#D8B4FE` / `#0F0D1A` | 10.9:1 | 4.5:1 |
| Lilás da marca | `#C084FC` / `#0F0D1A` | 7.3:1 | 4.5:1 |
| **Pior ponto do fundo** (`#563B44`): texto principal | `#F4F1FA` | 8.9:1 | 4.5:1 |
| Pior ponto: texto suave | `#B9B3CC` | 4.9:1 | 4.5:1 |
| Pior ponto: âmbar | `#F59E0B` | 4.7:1 | 4.5:1 |
| Pior ponto: lilás-texto | `#D8B4FE` | 5.7:1 | 4.5:1 |
| Pior ponto: lilás da marca | `#C084FC` | 3.8:1 | só texto grande (3:1) e não-texto |
| Vidro sobre fundo limpo (`#14111F`): texto / suave / âmbar / lilás-texto | | 16.8 / 9.3 / 8.7 / 10.6:1 | 4.5:1 |
| Vidro no pior ponto (`#2F2231`): texto / suave / âmbar / lilás-texto | | 13.5 / 7.4 / 7.0 / 8.5:1 | 4.5:1 |
| Vidro no pior ponto + brilho do tilt (`#403442`): texto / suave / âmbar / lilás-texto | | 10.6 / 5.8 / 5.5 / 6.7:1 | 4.5:1 |
| Menu fixo no pior ponto (`#231A26`): suave / âmbar | | 8.3 / 7.9:1 | 4.5:1 |
| Botão principal (texto) | `#1A1205` / `#F59E0B` | 8.7:1 | 4.5:1 |
| Botão principal no hover | `#1A1205` / `#FBBF24` | 11.2:1 | 4.5:1 |
| Terminal (`#0B0A12`): texto / suave / âmbar / lilás-texto / verde / apagado | | 17.7 / 9.7 / 9.2 / 11.2 / 14.0 / 5.5:1 | 4.5:1 |
| Barra da janela (`#17142A`): texto suave | `#B9B3CC` | 9.0:1 | 4.5:1 |
| **Não-texto:** borda do botão de idioma | `#8A84A3` / `#0F0D1A` · menu no pior ponto | 5.4 · 4.7:1 | 3:1 |
| **Não-texto:** borda lilás dos botões secundários | `#C084FC` / vidro no pior ponto | 5.7:1 | 3:1 |
| **Não-texto:** botão âmbar contra o pior ponto | `#F59E0B` / `#563B44` | 4.7:1 | 3:1 |
| **Não-texto:** contorno de foco (3px) | `#7DD3FC` / `#0F0D1A` · pior ponto | 11.5 · 6.0:1 | 3:1 |
| **Não-texto:** barrinha do item ativo do menu | `#F59E0B` / menu no pior ponto | 7.9:1 | 3:1 |
| **Crachá** no pior caso (corpo sobre o pior ponto + reflexo do vidro ≈ `#342E3F`): nome / cargo âmbar | `#F4F1FA` · `#F59E0B` | 11.7 · 5.6:1 | 4.5:1 |

Observações:
- `--cor-borda-vidro` dá menos de 2:1 e por isso **só** é usada em borda decorativa (cartões de vidro, que não são controles). Nunca em botão, campo ou foco.
- `--cor-texto-apagado` (`#8A84A3`) só passa sobre fundo sólido; por isso fica **preso ao terminal**.
- A fita (`#4C3580`) e a presilha são **decorativas** (não são controle nem texto), então não precisam de 3:1. A marca "J." da fita é um desenho, não texto.
- Com o vidro sólido do celular (`--cor-vidro-solido`), todos os números ficam **melhores** que os do computador.
- O Lighthouse não consegue medir texto sobre gradiente e pode marcar "precisa de revisão manual". A conta acima é a revisão manual; o testador confere com o conta-gotas do DevTools em 2 ou 3 pontos claros das manchas.

---

## 3. Tipografia

**Decidido (opção A, decisão 1):** as fontes da família Labs, **hospedadas no próprio repositório** (sem Google Fonts).

Por que hospedar no repositório: os requisitos dizem que nenhum dado vai para a internet e que fontes externas só entram se forem justificadas (US13). Com os arquivos `.woff2` dentro do projeto, a página não fala com nenhum outro site, carrega mais rápido (sem conexão extra) e continua igual se o Google Fonts mudar.

| Fonte | Arquivo (subconjunto latin, inclui á, ã, ç, é...) | Uso | Fallback |
|---|---|---|---|
| **Space Grotesk** variável (pesos 300 a 700) | `fonts/space-grotesk-latin-wght.woff2` (~40 KB) | todo o texto, títulos, botões, menu | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| **JetBrains Mono** variável (pesos 400 a 700) | `fonts/jetbrains-mono-latin-wght.woff2` (~45 KB) | terminal, rótulos, números das seções, tecnologias, metadados dos certificados, botão PT/EN, organograma | `ui-monospace, Consolas, "Courier New", monospace` |

- Onde pegar: os arquivos variáveis "latin" do Fontsource (pacotes `@fontsource-variable/space-grotesk` e `@fontsource-variable/jetbrains-mono`), baixados **uma vez** à mão. As duas fontes têm licença OFL: o dev coloca o arquivo `fonts/OFL.txt` junto.
- Só a Space Grotesk ganha `<link rel="preload" as="font" type="font/woff2" crossorigin>` (é a do nome e do texto). A mono carrega normal.
- `font-display: swap`: o texto aparece na hora com a fonte do sistema e troca quando a fonte chega.

As opções B (com Instrument Serif) e C (só fontes do sistema) foram descartadas.

**Escala** (16px = 1rem):

| Papel | Tamanho | Peso / detalhes |
|---|---|---|
| `h1` (nome) | `clamp(2.5rem, 1.6rem + 4vw, 4.5rem)` → 40px no celular, 72px no computador | 700, `letter-spacing: -0.03em`, entrelinha 1.02 |
| `h2` (títulos das seções) | `clamp(2rem, 1.4rem + 2.6vw, 3.25rem)` → 32 a 52px | 700, `-0.025em`, ponto final âmbar |
| `h3` do projeto | `clamp(1.5rem, 1.2rem + 1vw, 2rem)` | 600, `-0.015em` |
| `h3` dos grupos de certificado | 1.25rem (20px) | 600 |
| Frase do Topo | `clamp(1.125rem, 1rem + 0.6vw, 1.375rem)` | 400, cor do texto principal |
| Corpo (Sobre mim) | 1.0625rem (17px), entrelinha 1.65 | 400, largura máxima 62ch |
| Descrição do projeto | 1rem, entrelinha 1.6 | 400, texto suave |
| Botões | 0.9375rem (15px) | 600 |
| Menu | 0.9375rem no computador; 13px no celular | 500 |
| Rótulos mono (números das seções, "Destaque", tecnologias, datas) | 0.8125rem (13px) | 500; rótulos em maiúsculas com `letter-spacing: 0.12em` |
| Terminal | 13px no computador, 12px no celular, entrelinha 1.65 | 400 |
| Nome no crachá | 15px no celular, 16px a partir de 768px, 20px a partir de 960px | 700, `-0.01em` |
| Cargo no crachá | JetBrains Mono 11px (12px a partir de 960px), maiúsculas, `letter-spacing: 0.06em`, âmbar | 500; pode quebrar em 2 linhas |

Datas e cargas horárias com `font-variant-numeric: tabular-nums`.

---

## 4. Espaçamento, raios, sombras e camadas

- Escala de 4px (igual à Labs e à Agenda): `--esp-1` 4 · `--esp-2` 8 · `--esp-3` 12 · `--esp-4` 16 · `--esp-5` 24 · `--esp-6` 32 · `--esp-7` 48 · `--esp-8` 64 · `--esp-9` 96.
- Container: **máximo 1120px**; margem lateral 20px no celular e 32px a partir de 768px.
- Espaço entre seções: `padding-block: clamp(64px, 10vw, 128px)`.
- Raios: `--raio-sm` 8px (abas, chips) · `--raio-md` 12px (janelas, botão de idioma, linhas) · `--raio-lg` 20px (cartões de vidro) · `--raio-xl` 28px (reservado) · `--raio-pill` 999px (botões). O crachá tem raio próprio: 14px no corpo e 8px na foto.
- Sombras: `--sombra-janela: 0 24px 60px -24px rgb(0 0 0 / 0.7)`; `--brilho-ambar: 0 10px 30px -8px rgb(245 158 11 / 0.45)` (hover do botão principal).
- Altura do menu: `--altura-menu` 56px no celular, 64px a partir de 768px. Toda seção tem `scroll-margin-top: calc(var(--altura-menu) + 24px)`, para o título não ficar embaixo do menu (US01).
- Alvos de toque: **44px** no mínimo em tudo (botões principais com 48px).

**Camadas (z-index):**

| Camada | z-index | Observação |
|---|---|---|
| `.fundo` (manchas) | 0 | `position: fixed`, `pointer-events: none`, `aria-hidden` |
| `.luz` (luz do mouse) | 0 (depois do `.fundo` no HTML) | idem |
| `main`, `footer` | 1 | `position: relative` |
| dentro do Topo: `canvas` da fita | 0 (local) | `pointer-events: none`, `aria-hidden` |
| dentro do Topo: texto | 1 (local) | |
| dentro do Topo: `.cracha` | 2 (local) | fica por cima do texto quando é arrastado até ele; o menu (50) continua por cima de tudo, então a fita parece sair **de trás** do menu |
| `.cabecalho` (menu fixo) | 50 | |
| `.pular` ("Pular para o conteúdo") | 100 | |

---

## 5. Estrutura da página e menu

### 5.1 Ordem

`Pular para o conteúdo` → `.fundo` e `.luz` (decorativos) → `header.cabecalho` (menu fixo + idioma) → `main#conteudo` (Topo, Sobre mim, Projetos, Certificados) → `footer#contato` (Contato e rodapé).

### 5.2 Menu no computador (a partir de 768px)

```
+----------------------------------------------------------------------------------+
| [J.] João Saccucci           Sobre mim   Projetos   Certificados   Contato  [🌐 EN]|  64px, vidro, fixo
|                                         ‾‾‾‾‾‾‾‾                                  |  barrinha âmbar = seção atual
+----------------------------------------------------------------------------------+
```

- Esquerda: a marca (favicon "J." em 28px + "João Saccucci" em 15px, peso 600), link para `#topo` com nome acessível "João Saccucci, início". No celular ela some (falta espaço).
- Direita: as quatro abas e o botão de idioma.
- **Aba normal:** texto suave. **Hover:** texto principal + fundo `rgb(244 241 250 / 0.06)`. **Ativa** (`aria-current="true"`): texto âmbar + **barrinha âmbar de 2px embaixo** (o sinal que não depende de cor é a barrinha). O peso da fonte **não** muda (para o menu não "pular" de largura).
- A barrinha entra com `transform: scaleX(0 → 1)` em 300ms, curva de saída.
- Barra com vidro (`backdrop-filter: blur(14px) saturate(140%)`) e borda de baixo decorativa.

### 5.3 Menu no celular (360 a 767px) (decisão 5: opção A, decidida)

Uma linha só, sempre visível, funcionando como abas:

```
+--------------------------------------+
| Sobre  Projetos  Certificados Contato [EN] |  56px
|        ‾‾‾‾‾‾‾‾                      |
+--------------------------------------+
```

- Sem a marca. As 4 abas dividem o espaço (`flex: 1 1 auto`), com texto de 13px e `padding` de 0 6px; o botão de idioma fica com 44 × 44px.
- No celular, "Sobre mim" mostra só **"Sobre"** e "About me" mostra só **"About"**: o " mim" / " me" fica num `<span class="menu__extra">` escondido abaixo de 768px.
- **Conta de espaço a 360px:** 360 − 2 × 8 (margem da barra) − 44 (idioma) − 8 (vão) = **292px** para as abas. Textos a 13px: ~37 + ~55 + ~75 + ~50 = ~217px + 4 × 12px de padding = **~265px**. Sobra ~27px. O dev **mede** a 360px nos dois idiomas; se não couber com alguma fonte de fallback, o plano B é o `padding` cair para 0 4px abaixo de 380px.
- Área de toque: cada aba tem 44px de altura e mais de 44px de largura.
- Não há menu que abre e fecha, então não precisa de `aria-expanded`.

A opção B (botão "Menu" que abre um painel) foi descartada.

### 5.4 "Pular para o conteúdo"

Fica fora da tela até receber foco. Com foco: aparece no canto superior esquerdo (16px, 16px), por cima do menu, botão âmbar cheio (mesmo estilo do botão principal). Leva para `#conteudo` (o `main` tem `tabindex="-1"` para receber o foco).

### 5.5 Botão de idioma

- Texto visível "EN" (em português) ou "PT" (em inglês), JetBrains Mono 14px, peso 600, `letter-spacing: 0.06em`. A partir de 768px, um ícone de globo de 16px antes do texto.
- 44 × 44px no mínimo, raio 12px, borda 1px `--cor-borda-controle`, fundo transparente.
- Hover: borda e texto âmbar. Ativo (pressionado): `transform: scale(0.96)`.
- Nota de acessibilidade para o dev: como o texto visível é "EN", o nome acessível deve **conter** esse texto (critério 2.5.3), por exemplo `aria-label="EN, Read in English"` com `lang="en"` no botão. O testador confere com o leitor de tela.

---

## 6. Layout das seções

### 6.1 Topo

A foto fica num **crachá de vidro pendurado por uma fita** (decisão 2). A fita sai do **alto do Topo, logo abaixo do menu fixo**: como o menu fica por cima (z-index 50), ela parece sair **de trás** do menu, e ao rolar a página ela desliza para baixo dele. Escolhi isso em vez de prender no alto da tela porque assim a fita é parte do Topo (rola junto com ele) e não fica pendurada por cima das outras seções.

**Celular (360 × 640): crachá horizontal, acima do texto**

```
+--------------------------------------+
| (menu 56px)                          |
|  ‖                                   |  fita 12px, 44px de comprimento
|  ‖                                   |  ("J." âmbar estampado)
| ╔╩╗ presilha                         |
| +--------------[ ▬ ]-----------+     |  furinho no meio do alto
| | +------+  João Saccucci      |     |  crachá 248 × ~142
| | | foto |  DESENVOLVEDOR      |     |  foto 88 × 110
| | | 4:5  |  EM FORMAÇÃO        |     |  cargo âmbar, mono 11px
| | +------+                     |     |
| +==============================+     |  faixa âmbar → lilás 4px
|                                      |
|  João Saccucci                       |  h1 40px
|  Estudante de Análise e              |  frase 18px, texto principal
|  Desenvolvimento de Sistemas,        |
|  procurando estágio em               |
|  desenvolvimento.                    |
|  (pino) Grande São Paulo (ABC) ·     |  região 15px, texto suave, pino lilás
|  presencial, híbrido ou remoto       |
|                                      |
|  [in LinkedIn ↗]  [GH GitHub ↗]      |  botões 48px, lado a lado
+--------------------------------------+
```

Conta a 360 × 640: menu 56 + fita 44 + presilha 14 + crachá 142 + 20 + nome 42 + 12 + frase (4 linhas) 108 + 12 + região (2 linhas) 46 + 24 + botões 48 = **568px**: o nome, a frase e os dois botões aparecem sem rolar (US02), com ~70px de folga. Os botões: LinkedIn ~140px + 12 + GitHub ~130px = 282px, cabem nos 320px úteis. No celular o crachá é **horizontal** (foto à esquerda, nome e cargo à direita) justamente para caber nessa conta: um crachá em pé, com a foto num tamanho reconhecível, passaria dos 640px.

**Computador (a partir de 960px; 1366 × 768 cabe sem rolar): crachá em pé, ao lado do texto**

```
+----------------------------------------------------------------------------+
| (menu 64px)                                                                |
|              ‖                                                             |  fita 16px, comprimento
|              ‖ J.                                                          |  clamp(120px, 22vh, 200px)
|              ‖                                                             |  (~169px a 768 de altura)
|              ‖ J.                                                          |
|             ╔╩╗                                                            |  presilha 24 × 30
|     +-------[ ▬ ]-------+          João Saccucci                           |  h1 72px
|     |  +-------------+  |                                                  |
|     |  |             |  |          Estudante de Análise e Desenvolvimento  |  frase 22px
|     |  |    foto     |  |          de Sistemas, procurando estágio em      |
|     |  |  228 × 285  |  |          desenvolvimento.                        |
|     |  |             |  |                                                  |
|     |  +-------------+  |          (pino) Grande São Paulo (ABC) ·         |  região 16px
|     |  João Saccucci    |          presencial, híbrido ou remoto           |  crachá 260 × ~400
|     |  DESENVOLVEDOR    |                                                  |
|     |  EM FORMAÇÃO      |          [in LinkedIn ↗]   [GH GitHub ↗]         |
|     +===================+                                                  |
|        (brilho âmbar atrás)                                                |
+----------------------------------------------------------------------------+
```

(No computador o cargo cabe numa linha só: "DESENVOLVEDOR EM FORMAÇÃO" tem ~198px a 12px, e a área de texto tem 228px. O desenho acima quebra só por falta de espaço no esquema.)

- Grade `5fr 7fr`: o **palco do crachá** (`.cracha-palco`) na coluna da esquerda, o texto na da direita. O palco ocupa a **altura toda** do Topo (`align-self: stretch`), para a fita começar colada no menu; o texto fica centralizado na vertical. **O crachá vem antes no HTML e aparece antes (à esquerda)**: a ordem visual é a mesma da ordem de leitura da US02.
- O crachá fica centralizado na coluna, preso pela fita no alto do palco.
- Altura do Topo: `min-height: calc(100svh - var(--altura-menu))`, com teto de 820px. Conta a 1366 × 768: fita 169 + presilha 14 + crachá ~400 = **~583px** dentro dos 704px do Topo.
- **Entre 768 e 959px:** uma coluna, como no celular, mas com o crachá **em pé** de 180px de largura (foto 156 × 195), alinhado à esquerda com o texto; fita de 56px.
- Sem efeito de digitação, sem números, sem botão de currículo (US02).

**O crachá (decisão 2):**

| Parte | Celular (até 767px) | 768 a 959px | A partir de 960px |
|---|---|---|---|
| Formato | horizontal | em pé | em pé |
| Largura do crachá (`--cracha-w`) | 248px | 180px | 260px |
| Margem interna | 10px | 12px | 16px |
| Foto (4:5) | 88 × 110 | 156 × 195 | 228 × 285 |
| Faixa do furinho (altura) | 18px | 26px | 36px |
| Furinho | 36 × 6px | 40 × 7px | 44 × 8px |
| Nome | 15px | 16px | 20px |
| Cargo (mono, maiúsculas) | 11px, 2 linhas | 11px, 2 linhas | 12px, 1 linha |
| Altura aproximada | ~142px | ~305px | ~400px |
| Fita: largura / comprimento | 12px / 44px | 14px / 56px | 16px / `clamp(120px, 22vh, 200px)` |

Peças, de cima para baixo:
1. **Fita (cordão):** faixa lilás escura `--cor-fita` (`#4C3580`) com 1px de borda `--cor-fita-borda` dos dois lados. Estampa discreta: a marca **"J."** em âmbar (o mesmo "J." do favicon, desenhado como caminho SVG, não como texto), em pé, a cada **44px** ao longo da fita. Ela é desenhada no `canvas` quando a física está ligada, e em CSS (fundo com SVG repetido) quando está parada.
2. **Presilha:** um clipe de metal em SVG (24 × 30px), com gradiente `--cor-metal` (cinza-lilás → quase branco → cinza-lilás): em cima, a argola onde a fita entra; embaixo, um gancho que termina **no meio do furinho**. Ela invade 16px do corpo do crachá (fica por cima dele).
3. **Corpo de vidro:** raio 14px; fundo `--cor-cracha` com um gradiente branco de 0.12 → 0.03 (160°) por cima; borda 1px `rgb(244 241 250 / 0.22)`; reflexo de 1px na borda de cima (`inset 0 1px 0 rgb(255 255 255 / 0.22)`); sombra `0 24px 50px -20px rgb(0 0 0 / 0.7)` e o brilho âmbar `0 30px 80px -30px rgb(245 158 11 / 0.45)`. Um **reflexo diagonal** de vidro (`linear-gradient(115deg, transparente 30%, branco 0.08 em 42%, transparente 54%)`) passa por cima de tudo, inclusive da foto. **Sem `backdrop-filter`** (é caro num elemento que se mexe; o fundo quase sólido dá o mesmo efeito).
4. **Furinho:** uma fenda arredondada (pill) no meio da faixa de cima, cor `--cor-fundo`, com sombra interna `inset 0 1px 2px rgb(0 0 0 / 0.6)`.
5. **Foto:** a foto real, 4:5, raio 8px, contorno interno de 1px `rgb(244 241 250 / 0.10)`. **Sem filtro.**
6. **Nome** "João Saccucci" (texto principal, 700) e **cargo** "Desenvolvedor em formação" / "Developer in training" (JetBrains Mono, maiúsculas, âmbar). No celular ficam à direita da foto, alinhados à esquerda e centralizados na vertical; a partir de 768px, embaixo da foto, centralizados.
7. **Faixa de baixo:** 4px de gradiente âmbar → lilás (90°), colada na borda de baixo (é a antiga moldura da foto, que virou o "rodapé" do crachá).

**A foto (arquivos):**
- Retrato **4:5**, cortado do peito para cima, rosto no terço de cima, fundo neutro.
- Arquivos: `img/joao-480.webp` (480 × 600) e `img/joao-280.webp` (280 × 350), com `srcset="img/joao-280.webp 280w, img/joao-480.webp 480w"` e `sizes="(min-width: 960px) 228px, (min-width: 768px) 156px, 88px"`, `width="480" height="600"`, `fetchpriority="high"`, `draggable="false"`, **sem** `loading="lazy"`. Qualidade WebP ~78; meta: até 50 KB a maior. EXIF removido antes de publicar.
- `alt`: "Foto de João Saccucci" / "Photo of João Saccucci" (traduzido junto com o resto).

**HTML de referência do crachá:**

```html
<div class="cracha-palco">
  <canvas class="cracha__canvas" aria-hidden="true"></canvas>
  <div class="cracha">
    <svg class="cracha__presilha" viewBox="0 0 24 30" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="cracha-metal" x1="0" x2="1">
          <stop offset="0" stop-color="#8A84A3"/>
          <stop offset=".5" stop-color="#E4E0EE"/>
          <stop offset="1" stop-color="#8A84A3"/>
        </linearGradient>
      </defs>
      <rect x="3" y="0" width="18" height="11" rx="3" fill="url(#cracha-metal)"/>
      <rect x="7" y="3.5" width="10" height="3" rx="1.5" fill="#0F0D1A" opacity=".55"/>
      <path d="M12 11v5" stroke="url(#cracha-metal)" stroke-width="3"/>
      <path d="M8 30v-7a4 4 0 0 1 8 0v7" fill="none" stroke="url(#cracha-metal)" stroke-width="2.4" stroke-linecap="round"/>
    </svg>
    <div class="cracha__corpo">
      <span class="cracha__furo" aria-hidden="true"></span>
      <img class="cracha__foto" src="img/joao-480.webp" srcset="..." sizes="..."
           width="480" height="600" alt="Foto de João Saccucci"
           fetchpriority="high" draggable="false">
      <p class="cracha__texto" aria-hidden="true">
        <span class="cracha__nome">João Saccucci</span>
        <span class="cracha__cargo">Desenvolvedor em formação</span>
      </p>
    </div>
  </div>
</div>
```

- O nome e o cargo do crachá ficam com `aria-hidden="true"`: para o leitor de tela o crachá é **só a foto, com `alt`** (decisão de 2026-11-14). O nome já é o `h1` logo abaixo, e o cargo resume a frase do Topo. Mesmo escondidos do leitor de tela, eles **são traduzidos** na troca de idioma (US08), porque aparecem na tela.
- O nome do crachá **não** é título (`h1`/`h2`): é um `span`, para não bagunçar a ordem dos títulos.
- Ajuste fino da presilha (o dev confere no navegador): a ponta do gancho tem que terminar no meio do furinho.

### 6.2 Sobre mim

**Computador (a partir de 960px):**

```
  01 ———
  Sobre mim.                                                   (h2, ponto âmbar)

  Estou no 3º semestre de Análise e            +--------------------------------+
  Desenvolvimento de Sistemas na USCS e        |  +--------------------------+  |
  estudo os dois lados...                      |  | João Saccucci            |  |  João: borda âmbar
                                               |  | DECIDE E APROVA          |  |
  Aprendo construindo. Montei uma empresa      |  +--------------------------+  |
  em que os funcionários são agentes de IA...  |    │                           |
                                               |    ├─ product-owner  requisitos|  agentes: lilás
  O que me move é a mistura de três coisas...  |    ├─ artista        design    |
                                               |    ├─ dev            código    |
  ( ● Estudando agora: JavaScript e Java. )    |    ├─ testador       testes    |
                                               |    └─ professor      aulas     |
                                               |  legenda (13px, suave)         |
                                               +--------------------------------+
```

- Grade 7/5: texto à esquerda (máximo 62ch), organograma à direita num cartão de vidro, alinhado ao topo do texto.
- Celular: o texto inteiro e, depois, o organograma, na largura toda.
- O texto aprovado (seção 3.1 dos requisitos) entra **sem mudar nenhuma palavra**, em quatro parágrafos.

**"Estudando agora" (US03):**
- É o quarto parágrafo, com o rótulo em `<strong>`: `<p class="estudando"><strong>Estudando agora:</strong> JavaScript e Java.</p>`.
- Visual: cápsula de vidro (`display: inline-flex`, raio pill, padding 10px 16px), borda 1px `rgb(245 158 11 / 0.5)`, rótulo em âmbar e peso 600, um pontinho âmbar de 8px antes (decorativo, `::before`).
- Sem cor, continua destacado: é um parágrafo separado, com rótulo em negrito e uma moldura.
- Com movimento: o pontinho faz um "respiro" (anel que cresce e some) **3 vezes** depois de aparecer, e para.

**Organograma (decisão 3: opção A, decidida):**
- HTML: `<figure class="org">` com a caixa do João (`.org__joao`), uma lista `ul` dos agentes e uma `figcaption`. É conteúdo de verdade (lido pelo leitor de tela como lista).
- Caixa do João (`.org__joao`): borda 1.5px âmbar e fundo `rgb(245 158 11 / 0.08)`, raio 12px; nome 17px peso 700; papel em mono 12px maiúsculas âmbar: **"DECIDE E APROVA" / "DECIDES AND APPROVES"** (sem "chefe"/"boss", pedido do João).
- Agentes: lista com a linha da árvore feita em CSS (borda esquerda de 1.5px lilás 0.6 e um "galho" de 16px para cada item; nada de caracteres `├─` no texto). Cada linha: nome do agente em mono 14px `--cor-lilas-texto` (fica igual nos dois idiomas, é o nome do agente) + função em 14px texto suave (traduzida: requisitos/requirements, design/design, código/code, testes/testing, aulas/lessons). Altura mínima 40px por linha.
- O mentor de carreira **não** entra (o trabalho dele é privado e fica fora do repositório).
- Legenda **aprovada** pelo João (decisão 7): "A equipe: agentes de IA que levantam requisitos, desenham, programam, testam e explicam. Eu decido, reviso e aprovo." / "The team: AI agents that gather requirements, design, code, test and explain. I decide, review and approve."
- Hover numa linha (só com mouse): `translateX(4px)` e o galho fica âmbar, 160ms.

### 6.3 Projetos

**Computador (a partir de 960px):** os 4 cartões um embaixo do outro, em ziguezague (janela à esquerda nos ímpares, à direita nos pares), com 48px entre eles.

```
  02 ———
  Projetos.

  +--------------------------------------------------------------------------+
  | +--------------------------------------+   Labs / empresa-ia              |  h3
  | | ● ● ●   joaosaccucci.github.io/...   |                                  |
  | |--------------------------------------|   A empresa em que os            |  descrição (até 3 linhas)
  | |                                      |   funcionários são agentes de    |
  | |          print 16:10                 |   IA, e eu coordeno a equipe...  |
  | |      (a tela "acende")               |                                  |
  | |                                      |   [JavaScript] [HTML] [CSS]      |  tecnologias (chips mono)
  | +--------------------------------------+                                  |
  |                                            [Ver site ↗]  [Ver código ↗]  |
  +--------------------------------------------------------------------------+

  +--------------------------------------------------------------------------+
  |   Agenda                                  +----------------------------+ |
  |   ...                                     |  janela à direita          | |
  +--------------------------------------------------------------------------+
```

- Cartão de vidro, raio 20px, padding 24px (32px a partir de 1200px), grade `7fr 5fr` (janela / texto), vão 32px, texto centralizado na vertical.
- **No HTML**, o texto (`h3`, descrição, tecnologias, botões) vem **antes** da janela, para o leitor de tela ouvir o nome primeiro. A posição da janela é só visual (`order`), e a janela não tem nada focável, então a ordem do Tab não muda.
- Cartão da Labs (o primeiro): a borda decorativa é âmbar `rgb(245 158 11 / 0.35)` em vez da borda de vidro comum. É só enfeite; o diferencial está escrito na descrição (US04).
- Tecnologias: `<ul class="tags" aria-label="Tecnologias">`, cada uma num chip mono 13px, texto suave, borda decorativa, raio 8px, altura 28px (não é botão).
- Botões: "Ver site" (principal âmbar) e "Ver código" (secundário lilás). Os Java mostram **só** "Ver código" (secundário). O nome acessível inclui o projeto: `Ver site<span class="sr-only"> da Agenda (abre em nova aba)</span>`.

**Celular:** um embaixo do outro, janela **em cima** (largura toda), depois `h3`, descrição, tecnologias e botões (lado a lado; se não couberem, quebram linha com vão de 12px). Padding do cartão 16px, vão 32px entre cartões.

### 6.4 Janelas: print dos sites e terminal dos projetos Java

Os 4 projetos aparecem dentro de uma **janela** do mesmo tamanho (16:10), para os cartões ficarem alinhados.

**Janela de navegador (Labs, Agenda):**
- Moldura: raio 12px, borda 1px `rgb(192 132 252 / 0.22)`, sombra `--sombra-janela`, `overflow: hidden`.
- Barra de 32px (`--cor-janela-barra`): três pontos de 10px (âmbar, lilás, `#4B4565`, nessa ordem; de propósito **não** são vermelho/amarelo/verde) e, no meio, o endereço em mono 12px texto suave (ex.: `joaosaccucci.github.io/agenda`), com reticências se faltar espaço. A barra inteira é `aria-hidden="true"` (os links reais estão nos botões).
- Tela: `<img>` com `alt` descritivo traduzido (ex.: "Tela da Agenda mostrando a lista de próximos compromissos"), `aspect-ratio: 16/10`, `object-fit: cover`, `object-position: top`, `loading="lazy"`, `width` e `height` no HTML.
- Prints: tirados do site publicado numa janela de 1280 × 800, salvos em `img/projeto-labs-1200.webp` (1200 × 750) e `img/projeto-labs-640.webp` (640 × 400), com `srcset` e `sizes="(min-width: 960px) 600px, 100vw"`. Meta: até 120 KB a maior. Mesmo padrão para a Agenda.

**Janela de terminal (Buscador-Cep, ScreenMatch):**
- Mesma moldura e mesma barra. No lugar do endereço, o título em mono 12px: `Buscador-Cep — java` e `ScreenMatch — java`.
- Corpo: `<pre class="terminal">` com fundo `--cor-janela`, JetBrains Mono 13px (12px no celular), entrelinha 1.65, padding 16px 20px, `white-space: pre-wrap` e `overflow-wrap: anywhere` (linha longa quebra, nunca cria rolagem horizontal).
- No computador, o corpo mantém 16:10 (cabem ~15 linhas). No celular, a altura é a do conteúdo (`aspect-ratio: auto`, mínimo 200px), então **nenhuma linha some**. Meta: até 14 linhas.
- Um brilho lilás estático no canto superior direito (`radial-gradient` 0.10) dá profundidade; sem linhas de "TV antiga" (atrapalham a leitura).
- Cores dentro do terminal:

| Classe | Cor | Uso |
|---|---|---|
| `.t-prompt` | âmbar | o `$` ou `>` do prompt |
| `.t-cmd` | texto principal | o comando digitado (`java ...`) |
| (sem classe) | texto suave | o que o programa escreve |
| `.t-entrada` | lilás-texto | o que a pessoa digita no programa (ex.: o CEP) |
| `.t-chave` | lilás-texto | chaves de JSON ou nomes de campo |
| `.t-ok` | verde-terminal | valores e resultado de sucesso |
| `.t-coment` | apagado | comentários (só aqui pode usar essa cor) |
| `.t-cursor` | bloco âmbar | cursor no fim (pisca 3 vezes e fica aceso) |

- **Conteúdo:** o dev copia do código real dos repositórios o que o programa pede e o que ele imprime (decisão de 2026-11-14, item 2). O esqueleto abaixo **é só um exemplo de formato**, não é o texto final:

```html
<pre class="terminal" aria-hidden="true"><span class="t-prompt">$</span> <span class="t-cmd">java Principal</span>
(mensagem que o programa mostra, copiada do código)
<span class="t-prompt">&gt;</span> <span class="t-entrada">(o que a pessoa digita)</span>
(saída real do programa, com <span class="t-chave">chave</span>: <span class="t-ok">valor</span>)
<span class="t-prompt">$</span> <span class="t-cursor"></span></pre>
```

- **Acessibilidade:** o `pre` é `aria-hidden="true"` (ouvir um terminal letra por letra cansa) e a `figure` tem uma `figcaption` escondida visualmente (`.sr-only`), traduzida, descrevendo o que aparece. Ex.: "Exemplo do Buscador-Cep rodando no terminal: a pessoa digita um CEP e o programa mostra o endereço." O texto do terminal **não** é traduzido (é a saída real do programa, em português).

### 6.5 Outros projetos

Logo abaixo dos destaques, com 48px de distância. Visual de "listagem de pasta":

```
  Outros projetos                                              (h3, 20px)
  +--------------------------------+  +--------------------------------+
  | › jogo_de_forca   [C]  Ver código ↗ |  | › jogo-do-numero-secreto [HTML] Ver código ↗ |
  +--------------------------------+  +--------------------------------+
```

- `ul` em grade de 2 colunas a partir de 768px (1 coluna no celular), vão 12px.
- Cada `li`: linha de vidro, raio 12px, altura mínima 56px, padding 8px 8px 8px 16px, `display: flex`, `align-items: center`, `flex-wrap: wrap`.
- `›` âmbar decorativo (`aria-hidden`), nome em mono 15px texto principal (quebra linha se precisar), chip da linguagem igual aos chips de tecnologia, e o link "Ver código ↗" no fim (`margin-left: auto`), lilás-texto 14px, peso 600, área de toque de 44px de altura. Nome acessível: "Ver código do jogo_de_forca (abre em nova aba)".
- Sem imagem e sem descrição (US05).

### 6.6 Certificados

**Computador (a partir de 960px):**

```
  03 ———
  Certificados.

  +--------------------------------------------------------------------------+
  | ▌ (nuvem)  DESTAQUE · CLOUD                                              |  grupo Cloud (h3 "Cloud")
  | ▌          AWS Academy Graduate – Cloud Foundations          [Verificar ↗]|  nome 22px
  | ▌          AWS Academy · 20 h · 22/10/2026                               |
  +--------------------------------------------------------------------------+

  +------------------------------------+  +------------------------------------+
  | Java e Spring Boot                 |  | Banco de dados e Git               |
  |------------------------------------|  |------------------------------------|
  | Spring Boot 3: desenvolva uma API  |  | PostgreSQL: Views, Sub-Consultas...|
  | Rest em Java          [Verificar ↗]|  | Alura · 6 h · 20/08/2026  [Verif.] |
  | Alura · 10 h · 18/08/2026          |  | ...                                |
  | ... (6 itens)                      |  +------------------------------------+
  |                                    |  +------------------------------------+
  |                                    |  | Base                               |
  |                                    |  | ... (2 itens)                      |
  +------------------------------------+  +------------------------------------+
```

- Grade de 2 colunas com áreas: `"cloud cloud" "java banco" "java base"`, vão 24px, `align-items: start`. A ordem no HTML continua Cloud, Java e Spring Boot, Banco de dados e Git, Base (US06).
- Cada grupo é um cartão de vidro com `h3` (20px, 600) e uma lista `ul`.
- **Item:** grade com o nome (16px, peso 500, quebra linha) e, embaixo, a linha de metadados em mono 13px texto suave: "Alura · 10 h · 18/08/2026" (em inglês: "Alura · 10 h · Aug 18, 2026"). O botão "Verificar" fica à direita, centralizado na vertical. Itens separados por borda decorativa de 1px. Padding 14px 0.
- **Destaque da AWS (US06):** o grupo Cloud ocupa a largura toda e é diferente dos outros:
  - borda 1.5px `rgb(245 158 11 / 0.55)` e uma faixa âmbar de 4px na esquerda;
  - ícone de nuvem (SVG, 48px, traço âmbar) à esquerda;
  - rótulo **"DESTAQUE"** / **"FEATURED"** em mono 13px âmbar, antes do nome do grupo (o destaque está no **texto** e na **posição**: primeiro e maior, não só na cor);
  - nome do certificado em 22px, peso 600;
  - "Verificar" no estilo **principal** (âmbar cheio), só aqui.
  - Estrutura sugerida: o `h3` do grupo é "Cloud" e o rótulo "Destaque ·" vem dentro dele num `span`, para o leitor de tela ouvir "Destaque, Cloud".
- **Celular:** uma coluna, um grupo embaixo do outro. No item, o "Verificar" vai para **baixo** dos metadados (alinhado à esquerda), para o nome ter a largura toda. No destaque, o ícone fica em cima do texto (48px).
- Nenhuma imagem de certificado (US06).

### 6.7 Contato e rodapé

**Computador:**

```
  +----------------------------------------------------------------+
  |                         04 ———                                 |
  |                        Contato.                                |  h2
  |                                                                |
  |        (frase curta convidando a falar com o João)             |  20px, suave
  |                                                                |
  |              [in LinkedIn ↗]    [GH GitHub ↗]                  |
  +----------------------------------------------------------------+
     brilho âmbar suave atrás do painel

  ------------------------------------------------------------------
  © 2026 João Saccucci          Feito com HTML, CSS e JavaScript puros · Ver o código ↗
```

- Painel de vidro centralizado, largura máxima 880px, padding 48px (32px 20px no celular), texto centralizado. Atrás dele, um `radial-gradient` âmbar 0.10 estático (dentro da conta do pior ponto, porque fica embaixo do vidro).
- Os botões são os mesmos do Topo (LinkedIn principal, GitHub secundário), mesmas regras (US07).
- Frase **aprovada** (decisão 7): "Procurando alguém que aprende construindo? Vamos conversar." / "Looking for someone who learns by building? Let's talk."
- Linha de baixo: borda de cima decorativa, padding 24px 0 32px, mono 13px texto suave. Esquerda: "© 2026 João Saccucci". Direita: "Feito com HTML, CSS e JavaScript puros · " + link "Ver o código ↗" (lilás-texto, sublinhado) para `https://github.com/JoaoSaccucci/portfolio`. No celular, as duas partes ficam uma embaixo da outra, centralizadas. Texto em português **aprovado** pelo João (US07, decisão 7). Tradução sugerida (o João aprova junto com o resto do inglês, US08): "Made with plain HTML, CSS and JavaScript · " + "View the code ↗".
- Sem formulário, e-mail, telefone ou PDF.

### 6.8 Pontos de quebra

| Largura | O que muda |
|---|---|
| 360 a 767px | menu de uma linha sem marca, "Sobre"/"About" curtos; tudo em uma coluna; crachá **horizontal** de 248px com fita de 44px; vidro sólido; 2 manchas; terminal com altura livre; botões de certificado embaixo |
| ≥ 768px | margem 32px; marca no menu; ícone de globo no idioma; "Outros projetos" em 2 colunas; crachá em pé de 180px, fita de 56px |
| ≥ 960px | Topo, Sobre mim e Projetos em 2 colunas; certificados em grade de áreas; crachá em pé de 260px ao lado do texto, fita `clamp(120px, 22vh, 200px)` |
| ≥ 1200px | padding dos cartões de projeto 32px |

---

## 7. Componentes e estados

### 7.1 Botões

Todos os botões de link externo têm: ícone à esquerda (quando houver), texto, seta "↗" de 14px à direita (`aria-hidden`), `target="_blank"`, `rel="noopener noreferrer"` e `<span class="sr-only"> (abre em nova aba)</span>` (traduzido: " (opens in a new tab)").

| Botão | Estilo | Normal | Hover (só mouse) | Ativo (clicando) | Foco |
|---|---|---|---|---|---|
| **LinkedIn** (Topo e Contato) | principal | fundo âmbar, texto `#1A1205`, ícone "in", 48px de altura, padding 0 22px, raio pill | fundo `#FBBF24`, `translateY(-2px)`, `--brilho-ambar` | `translateY(0) scale(0.98)` | contorno azul-céu 3px, afastado 3px |
| **GitHub** (Topo e Contato) | secundário | fundo transparente, borda 1.5px lilás, texto principal, ícone do GitHub, 48px | fundo `rgb(192 132 252 / 0.14)`, borda `#D8B4FE`, `translateY(-2px)` | `scale(0.98)` | idem |
| **Ver site** | principal (menor) | igual ao LinkedIn, 44px de altura, padding 0 18px | igual | igual | idem |
| **Ver código** | secundário (menor) | igual ao GitHub, 44px | igual | igual | idem |
| **Verificar** | terciário | 44px, padding 0 14px, raio 12px, borda 1px lilás, texto lilás-texto 14px peso 600, ícone de selo 16px | fundo `rgb(192 132 252 / 0.16)` | `scale(0.98)` | idem |
| **Verificar (AWS)** | principal (menor) | âmbar cheio, 44px | igual ao principal | igual | idem |
| **Ver código** (Outros projetos) | link | texto lilás-texto peso 600, sublinhado aparece no hover, 44px de altura de toque | sublinhado 2px, afastado 4px | — | idem |
| **PT/EN** | controle | ver 5.5 | borda e texto âmbar | `scale(0.96)` | idem |
| **Abas do menu** | aba | ver 5.2 | texto principal + fundo 0.06 | — | idem |

- Transições: cor e fundo em 160ms `ease`; `transform` e sombra em 300ms curva de saída.
- Os ícones LinkedIn e GitHub sempre vêm **com texto visível** ao lado.
- Nada de botão desativado: projeto sem site não tem o botão (US04).

### 7.2 Foco

- `:focus-visible { outline: 3px solid var(--cor-foco); outline-offset: 3px; }` em tudo. O contorno acompanha o raio do elemento.
- O foco nunca é escondido. Quando um botão dentro de um cartão de projeto recebe foco, o cartão **volta reto** (sem inclinação), para o contorno ficar limpo (US11).
- Ao seguir um link do menu, o foco vai para a seção (o dev decide se põe `tabindex="-1"` no `h2`); o `scroll-margin-top` garante que o título aparece inteiro.

### 7.3 Cartões de vidro

- Fundo `--cor-vidro`, `backdrop-filter: blur(16px) saturate(130%)`, borda 1px `--cor-borda-vidro`, raio 20px, e um reflexo de 1px na borda de cima (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.06)`).
- No celular e onde o navegador não tem `backdrop-filter`: fundo `--cor-vidro-solido` e **sem** blur (US13).

### 7.4 Títulos das seções

- Acima do `h2`: o número da seção em mono 13px âmbar ("01", "02", "03", "04") e um traço de 32 × 1.5px âmbar, num `span` com `aria-hidden="true"`.
- O `h2` termina com um ponto âmbar feito em CSS (`.secao__titulo::after { content: "."; color: var(--cor-ambar); }`). O texto do título continua "Sobre mim", sem ponto (o leitor de tela não lê o `::after` como parte da palavra de um jeito estranho; se o testador achar que lê, troque por um `span aria-hidden`).

---

## 8. Efeitos

Todos os efeitos mexem só em `transform` e `opacity` (a exceção é a luz do mouse, que também é só `transform`). Nenhum usa `filter: blur()` em elemento grande, nem `mix-blend-mode`: as manchas são `radial-gradient`, que já nascem desfocadas.

### 8.1 Tabela de efeitos

| Efeito | Onde | Duração | Curva | Distâncias e valores | Quando |
|---|---|---|---|---|---|
| **Manchas** | `.fundo`, fixo atrás de tudo | 32s, 38s e 44s (uma para cada), vai e volta (`alternate`), infinito | `cubic-bezier(0.45, 0, 0.55, 1)` | mancha 1 âmbar, 62vmax, sobe pelo canto superior esquerdo: até `translate(12vw, 18vh) scale(1.12)`; mancha 2 lilás, 70vmax, à direita: até `translate(-14vw, 24vh) scale(1.10)`; mancha 3 lilás, 46vmax, embaixo: até `translate(10vw, -12vh) scale(1.08)` | sempre |
| **Luz do mouse** | `.luz`, fixa | segue o mouse com suavização (cada quadro anda 18% do caminho que falta); aparece e some em 400ms | `ease` no aparecer | círculo de 520px, âmbar 0.07 no centro | só com mouse, depois do primeiro movimento; some quando o mouse sai da janela |
| **Surgir ao rolar** | cabeça das seções, parágrafos do Sobre mim, organograma, cada cartão de projeto, "Outros projetos", cada grupo de certificado, painel do Contato | 650ms | `cubic-bezier(0.22, 1, 0.36, 1)` | `opacity 0 → 1` e `translateY(24px → 0)` (16px no celular); itens do mesmo grupo entram com 80ms de diferença, no máximo 4 degraus (320ms) | uma vez, quando 15% do elemento entra na tela (`rootMargin: 0px 0px -8% 0px`) |
| **Entrada do Topo** | nome, frase, região, botões | 700ms | curva de saída | **só `transform`, sem opacidade** (para não atrasar o LCP): textos (nome, frase, região, botões) `translateY(12px → 0)` com 0, 60, 120 e 180ms de atraso. O crachá **não** usa esta animação: ele entra com o balanço (linha abaixo) | uma vez, ao carregar |
| **Crachá: física** | `.cracha` + `canvas` da fita | enquanto se mexe; dorme sozinho ao parar | física (seção 8.5) | arrastar com mouse ou dedo; ao soltar, balança como pêndulo; gira até **18°** | sempre que a pessoa puxa |
| **Crachá: balanço de entrada** | idem | começa 250ms depois de ligar a física; ~4 a 5s até parar | física | empurrão horizontal de 220px/s na ponta (120px/s no celular), sem sair da posição de repouso (não há "pulo") | uma vez, ao carregar |
| **Crachá: reação à rolagem** (opcional) | idem | — | física | empurrão leve proporcional ao quanto a página rolou, limitado a 3px por passo | ao rolar, só com o Topo na tela |
| **Tela que acende** | a tela de cada janela (print ou terminal) | 900ms, começa 150ms depois do cartão surgir | curva de saída | 0%: `scale(0.3, 0.012)`, opacidade 0 → 30%: `scale(1, 0.012)`, opacidade 1 (uma linha de luz) → 100%: `scale(1, 1)`. Junto, uma linha âmbar de 2px no meio da tela aparece e some (0% → 30% → 55%) | uma vez, junto com o cartão. **Sem piscar** |
| **Cursor do terminal** | `.t-cursor` | 1.1s por piscada, 3 vezes | `steps(1)` | aceso/apagado | depois da tela acender; termina aceso |
| **Tilt do cartão** | `.projeto` (cartões de destaque) | segue o mouse com transição de 120ms `linear`; volta ao normal em 600ms | curva de saída na volta | `perspective(1400px)`, até **3°** em `rotateX` e **4°** em `rotateY` (cartões são largos; mais que isso fica estranho) | só com mouse; desliga quando algo dentro do cartão tem foco do teclado |
| **Brilho do cartão** | `.projeto::after` | aparece em 300ms | `ease` | `radial-gradient` branco 0.08, 600px, centrado no mouse | junto com o tilt |
| **Hover dos botões** | botões | 160ms (cor) / 300ms (movimento) | `ease` / curva de saída | `translateY(-2px)` | só com mouse |
| **Aba ativa** | barrinha do menu | 300ms | curva de saída | `scaleX(0 → 1)` | quando a seção muda |
| **"Estudando agora"** | pontinho âmbar | 2s, 3 vezes | `ease-out` | anel `scale(1 → 2.4)`, opacidade 0.6 → 0 | depois de surgir |
| **Organograma** | linha da árvore e agentes | 600ms (linha) + 80ms por agente | curva de saída | linha `scaleY(0 → 1)` a partir da caixa do João; agentes `translateX(-8px → 0)` + opacidade | junto com o surgir |
| **Rolagem suave** | `html` | do navegador | — | `scroll-behavior: smooth` | ao clicar no menu |

Detalhes para o dev:
- As manchas usam `will-change: transform`. Elas ficam num `div` fixo com `inset: 0` e `overflow: hidden`, então não criam rolagem horizontal nem aumentam a página (US09).
- A luz começa no lugar do primeiro movimento do mouse (não vem "voando" do canto). Ela só existe se `matchMedia('(hover: hover) and (pointer: fine)')` for verdadeiro; o evento ignora `pointerType` diferente de `"mouse"`.
- No tilt, o lado em que está o mouse "afunda". Se ficar invertido no teste, troque o sinal.
- "Surgir ao rolar": seguir um link do menu (`#projetos`) marca como visível **tudo** dentro da seção de destino na hora; foco do teclado num elemento ainda escondido também o mostra (US10).

### 8.2 Movimento reduzido (`prefers-reduced-motion: reduce`)

Tudo parado e visível, na posição final (US12):
- Manchas **paradas** na posição inicial (continuam lá, dando a cor; só não se mexem).
- Sem luz do mouse, sem tilt, sem brilho do cartão.
- **Crachá parado**, pendurado reto, com a fita estática em CSS; sem física, sem balanço de entrada, não dá para arrastar (cursor normal, rolagem normal por cima dele). Se a pessoa ligar o movimento reduzido com a página aberta, o JS desliga a física na hora e devolve o crachá ao repouso.
- Nada começa escondido: sem "surgir ao rolar", sem entrada do Topo, tela já acesa, cursor aceso sem piscar, organograma completo.
- Sem rolagem suave (pula direto) e sem `translateY` no hover dos botões (a mudança de cor continua).

### 8.3 Versão leve no celular (até 767px ou sem mouse)

| O que | Computador com mouse | Celular / sem mouse |
|---|---|---|
| Vidro | `backdrop-filter` com blur 16px | **sem blur**, fundo `--cor-vidro-solido` (também no menu: `rgba(15, 13, 26, 0.94)`) |
| Manchas | 3 | **2** (a mancha 3 some) e 1.5× mais lentas |
| Luz do mouse | sim | **não** |
| Tilt e brilho | sim | **não** (o primeiro toque no botão já funciona) |
| Surgir ao rolar | 24px | 16px, 500ms |
| Tela que acende | sim | sim (é só `transform` e `opacity`, é barato) |
| Crachá com física | 10 segmentos, 12 iterações | **continua ativo, mas leve:** 5 segmentos, 8 iterações, fita curta (44px), balanço de entrada mais fraco |

Regra: "sem mouse" é `(hover: none), (pointer: coarse)`; "celular" é `max-width: 767px`. Tablet sem mouse fica com o vidro, mas sem luz e sem tilt.

### 8.4 Sem JavaScript

- Os estados "escondido para animar" **só** existem com a classe `anima` no `<html>`, que um script pequeno no `<head>` coloca **antes da página aparecer**, e só se houver `IntersectionObserver` e o movimento não for reduzido.
- Rede de segurança: se o script principal não confirmar que rodou (classe `anima-ok`) em 3 segundos, o script do `<head>` tira a classe `anima` e tudo aparece. Assim, um erro ou um 404 do `main.js` nunca deixa a página em branco.
- Sem JavaScript: página inteira em português, manchas animadas (são CSS puro), sem luz, sem tilt, menu funcionando pelos `#` (sem destaque da aba atual). O crachá aparece **parado, pendurado reto**, com a fita desenhada em CSS; a foto e todo o texto continuam 100% legíveis.
- A física do crachá **não** depende da classe `anima`: ela só existe com a classe `cracha-vivo` no `.topo`, que o `main.js` coloca quando a física liga. Sem essa classe, o CSS mostra a versão parada.

### 8.5 Crachá pendurado: física, acessibilidade e desempenho

**A solução: fita em `canvas`, crachá em HTML movido por `transform`.**
- A **fita** é uma corrente de pontos simulada com **integração de Verlet** e **restrições de distância** (cada ponto tenta ficar a uma distância fixa do vizinho). Ela é desenhada num `canvas` do tamanho do palco, porque uma linha que dobra em vários pontos é muito mais simples de desenhar no canvas do que com elementos HTML.
- O **crachá** continua sendo HTML de verdade (imagem real com `alt`, texto que se traduz). Ele **fica no lugar dele na grade** e só recebe `transform: translate3d(dx, dy, 0) rotate(a)`, onde `dx`/`dy` é quanto a ponta da fita saiu da posição de repouso. Assim:
  - a página nunca "pula" (o layout é o mesmo com ou sem física, nada de CLS);
  - mover o crachá não recalcula o layout nem repinta a página: só o compositor trabalha;
  - sem JS ou com movimento reduzido, é só não aplicar o `transform`.
- O crachá gira em volta do ponto onde a fita se prende: `transform-origin: 50% 4px` (4px abaixo do topo da presilha; a fita entra 4px por baixo dela, para não aparecer uma fresta).

**Parâmetros de referência** (passo fixo de 1/60 s; os números valem para qualquer taxa de quadros):

| Parâmetro | Computador | Celular (até 767px) | Para que serve |
|---|---|---|---|
| Segmentos da fita | 10 | 5 | mais segmentos = curva mais suave |
| Comprimento da fita (`L`) | vem do CSS (`--fita`, 120 a 200px); o JS mede com `offsetTop` do crachá + 4px | 44px (56px de 768 a 959) | distância da âncora até a presilha |
| Gravidade | 2400 px/s² | 2400 px/s² | período do balanço ~2,5s no computador e ~1,5s no celular (pêndulo "pesado", calmo) |
| Amortecimento | 0.988 da velocidade por passo | 0.985 | parada em ~5s (computador) e ~4s (celular) |
| Iterações das restrições | 12 por passo | 8 | fita firme, sem esticar |
| Peso da ponta (crachá) | 4 × um ponto da fita | igual | a ponta "manda" e a fita vai junto |
| Limite de puxar | raio de `max(1,5 × L, 90px)` em volta da âncora | idem (90px) | não dá para arrastar o crachá para longe |
| Limite vertical | a ponta não sobe acima de 8px da âncora | idem | o crachá nunca entra embaixo do menu |
| Limite horizontal | a borda do crachá fica a 4px da borda da tela **e** a presilha fica a 8px das bordas do palco | idem | sem rolagem horizontal e sem a fita ser cortada pelo canvas |
| Ângulo máximo do crachá | **18°** | 18° | "gira um pouco" |
| Seguimento do ângulo | 20% do caminho por passo | igual | o crachá gira um pouco atrasado em relação à fita (dá o "peso") |
| Velocidade máxima ao soltar | 40px por passo | 30px | ninguém "arremessa" o crachá para fora da tela |
| Balanço de entrada | 220 px/s na ponta, 250ms depois de ligar | 120 px/s | |
| Dormir | movimento < 0,03px por passo durante 30 passos seguidos (0,5s) | igual | para o `requestAnimationFrame` |
| `devicePixelRatio` do canvas | no máximo 2 | no máximo 2 | canvas nítido sem ficar enorme |

A fita **só puxa, não empurra**: se a pessoa empurrar o crachá para cima, a fita fica frouxa e cai de volta, como uma fita de verdade. Puxando para baixo, ela **estica até o limite de puxar como um elástico** (a ponta presa no dedo ganha da restrição) e volta ao tamanho normal ao soltar; esse "estilingue" é o que dá o balanço gostoso, e a velocidade máxima ao soltar segura o exagero.

**Mouse e toque:**
- Cursor: `grab` em cima do crachá e `grabbing` enquanto arrasta (classe `cracha--arrastando`). Os dois só existem com `cracha-vivo`.
- **Pointer Events** (um código só para mouse, caneta e dedo): `pointerdown` no crachá → `setPointerCapture(e.pointerId)` (o arrasto continua mesmo se o dedo/mouse sair de cima do crachá) → `pointermove` → `pointerup`, `pointercancel` e `lostpointercapture` soltam. Só o botão principal (`e.button === 0`).
- No `pointerdown`, `preventDefault()` para o navegador não começar a "arrastar a imagem". Também `draggable="false"` na foto e `user-select: none` no crachá.
- **`touch-action: none` só no `.cracha`** (e só com `cracha-vivo`). O resto do Topo, a fita e a página inteira continuam com rolagem normal: quem encosta o dedo fora do crachá rola a página como sempre.
- Ao arrastar, o ponto que a pessoa pegou acompanha o dedo (o JS guarda a distância entre o dedo e a presilha no `pointerdown`).
- No computador, um hover leve: a borda do corpo vai para `rgb(244 241 250 / 0.32)`. Nada de "dica" escrita ("arraste-me"): a descoberta faz parte da graça, e o balanço de entrada já mostra que ele se mexe.

**Acessibilidade:**
- Para o leitor de tela, o crachá é **só a foto com `alt`**. Canvas, presilha, furinho e o texto do crachá ficam com `aria-hidden="true"`.
- **O crachá não recebe foco** (sem `tabindex`, não é botão nem link). Motivo: ele não faz nada além de enfeitar. Um elemento focável que não tem função vira uma parada inútil no Tab e confunde quem usa teclado ou leitor de tela ("o que esse elemento faz?"). Como o arrasto é só decoração, não existe função a ser oferecida pelo teclado (o critério 2.5.7, de alternativa ao arrasto, vale para **funções**). E, como não recebe foco, não há nenhuma chance de armadilha de foco.
- O balanço de entrada dura menos de 5s e para sozinho, e com movimento reduzido nem acontece (critério 2.2.2).

**Desempenho:**
- `requestAnimationFrame` **só enquanto o crachá se mexe**: quando ele "dorme" (tabela acima), o laço para. Ele acorda com um `pointerdown`, com a rolagem (se a reação à rolagem for usada) e no balanço de entrada.
- **Para quando sai da tela:** um `IntersectionObserver` no palco desliga o laço quando o Topo sai da tela, e `visibilitychange` desliga quando a aba fica escondida. Ao voltar, o relógio é zerado (nada de "pular" vários segundos de física de uma vez).
- **Sem layout thrash:** o JS lê as medidas (`offsetLeft`, `offsetTop`, `offsetWidth`, `clientWidth`, `getBoundingClientRect`) **só** ao ligar, num `ResizeObserver` do palco e uma vez em cada `pointerdown`. Durante o laço ele só **escreve**: desenha no canvas e muda o `transform` do crachá. Durante o arrasto, a posição do dedo é convertida com `window.scrollY` (que não força layout).
- O crachá tem `will-change: transform` (só com `cracha-vivo`), e **não usa `backdrop-filter`**.
- Passo de física fixo com acumulador, e no máximo 50ms de tempo por quadro (se o celular engasgar, a física fica mais lenta por um instante, mas nunca "explode").
- No celular continua ativo, com menos segmentos e iterações (seção 8.3).

---

## 9. Ícones e favicon (SVG)

Todos com `aria-hidden="true"` e `focusable="false"` (decorativos; o texto está do lado). Traço `currentColor` para herdar a cor do botão.

### 9.1 Favicon `favicon.svg` (também é a marca do menu)

"J." — o J em branco e o ponto final âmbar (a mesma assinatura dos títulos), num quadrado azul-noite com uma luz lilás no canto.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <radialGradient id="luz" cx="80%" cy="15%" r="75%">
      <stop offset="0" stop-color="#C084FC" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#C084FC" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#0F0D1A"/>
  <rect width="64" height="64" rx="14" fill="url(#luz)"/>
  <path d="M34 14v24a9 9 0 0 1-18 0" fill="none" stroke="#F4F1FA" stroke-width="7" stroke-linecap="round"/>
  <rect x="41" y="41" width="9" height="9" rx="2" fill="#F59E0B"/>
</svg>
```

No `<head>`: `<link rel="icon" href="favicon.svg" type="image/svg+xml">` e `<meta name="theme-color" content="#0F0D1A">`. Na marca do menu, o mesmo SVG em 28px (sem o `id` repetido se aparecer duas vezes: troque para `id="luz-marca"`).

### 9.2 Ícones de interface (viewBox 24 × 24, traço 2, pontas redondas, 18–20px nos botões)

```svg
<!-- seta "abre em nova aba" (14px) -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>

<!-- globo (botão de idioma, 16px) -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>

<!-- pino de local (região do Topo, lilás) -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>

<!-- selo "Verificar" (16px) -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6z"/><path d="m8.8 12.2 2.3 2.3 4.3-4.6"/></svg>

<!-- nuvem (destaque AWS, 48px, âmbar) -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18h10.5a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.6 9.1 4.5 4.5 0 0 0 7 18z"/></svg>
```

### 9.3 Logotipos (preenchidos, `fill="currentColor"`)

```svg
<!-- LinkedIn ("in" simplificado) -->
<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.6h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75v5.6h-4v-4.96c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.96 1.28-1.96 2.6v5.06h-4z"/></svg>

<!-- GitHub (marca oficial, viewBox 16) -->
<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
```

---

## 10. Prévia ao compartilhar (Open Graph, 1200 × 630)

**Arquivo:** `img/og.png` (PNG, porque o LinkedIn não aceita SVG nem sempre aceita WebP), até 300 KB.

Decisão 8: opção A, **com a foto**, no crachá, com o cargo.

```
+--------------------------------------------------------------------------------+
|  (mancha âmbar no canto superior esquerdo)                     ‖  fita 22px    |
|                                                                ‖  desde a borda|
|   PORTFÓLIO · joaosaccucci.github.io/portfolio                ╔╩╗ de cima     |  mono 24px, lilás-texto
|                                                        +------[▬]------+       |
|   João Saccucci.                                       | +-----------+ |       |  104px, 700, ponto âmbar
|                                                        | |   foto    | |       |
|   Estudante de ADS · procurando estágio                | | 248 × 310 | |       |  36px, texto principal
|   em desenvolvimento                                   | +-----------+ |       |
|                                                        | João Saccucci |       |  crachá 280 × ~434,
|   [Java] [Spring Boot] [JavaScript]                    | DESENVOLVEDOR |       |  girado -4°
|                                                        | EM FORMAÇÃO   |       |  chips mono 22px
|                                                        +===============+       |
|                                         (mancha lilás no canto inferior direito)|
+--------------------------------------------------------------------------------+
```

- O crachá é o mesmo do site (vidro, presilha, furinho, foto, nome, cargo em âmbar, faixa âmbar → lilás), em pé, com 280px de largura (foto 248 × 310, nome 26px, cargo mono 15px), **girado -4°** para parecer que está balançando. A fita (22px, com o "J." estampado) sai da **borda de cima** da imagem e tem ~70px até a presilha. O crachá termina a ~520px do topo, dentro da margem de segurança.
- O cargo **"Desenvolvedor em formação"** aparece no crachá (é o texto que o recrutador lê junto com o nome).
- Fundo `#0F0D1A`, mancha âmbar (`radial-gradient` 0.30, aqui pode ser mais forte porque não tem texto pequeno em cima) no canto superior esquerdo e lilás 0.30 no inferior direito. Margem de segurança de 64px (o LinkedIn corta as bordas em alguns lugares).
- Como fazer sem etapa de build: o dev monta um `og.html` **temporário fora do repositório** (na pasta de rascunho), abre no Chrome, usa o DevTools → "Capture node screenshot" no elemento de 1200 × 630 e salva como `img/og.png`. Só o PNG entra no repositório.
- Uma imagem só, em português (quem compartilha não roda JavaScript).
- Metatags (a URL da imagem **precisa** ser absoluta, é a única exceção aos caminhos relativos):

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://joaosaccucci.github.io/portfolio/">
<meta property="og:title" content="João Saccucci · Portfólio">
<meta property="og:description" content="(a mesma do meta description em português)">
<meta property="og:image" content="https://joaosaccucci.github.io/portfolio/img/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Crachá com a foto de João Saccucci, desenvolvedor em formação, estudante de ADS procurando estágio em desenvolvimento">
<meta property="og:locale" content="pt_BR">
<meta name="twitter:card" content="summary_large_image">
```

Para montar a imagem, o dev usa a mesma `img/joao-480.webp` (já sem EXIF); a captura é feita com zoom 100% para a imagem sair com 1200 × 630 exatos. A opção B (sem foto, com o "J." grande) foi descartada.

---

## 11. Imagens: resumo

| Imagem | Arquivos | Tamanho mostrado | Carregamento | Meta de peso |
|---|---|---|---|---|
| Foto (no crachá) | `img/joao-480.webp`, `img/joao-280.webp` | 88 a 228px de largura | imediato, `fetchpriority="high"` | 50 KB |
| Prints (Labs, Agenda) | `img/projeto-<id>-1200.webp`, `-640.webp` | até ~600px | `loading="lazy"` | 120 KB |
| Terminais (Java) | nenhum (HTML/CSS) | — | — | 0 |
| Prévia | `img/og.png` | só no compartilhamento | — | 300 KB |
| Favicon | `favicon.svg` | — | — | 1 KB |
| Fita, presilha, marca "J." | nenhum arquivo (SVG no HTML, CSS e canvas) | — | — | 0 |

Todas com `width` e `height` no HTML. EXIF removido da foto.

---

## 12. CSS de referência

O dev pode usar como base do `css/style.css`. Os nomes de classe são sugestões; se mudar, mude nos dois lugares.

```css
/* =========================================================
   Portfólio · João Saccucci
   1. Fontes  2. Variáveis  3. Base  4. Fundo e luz
   5. Menu  6. Seções  7. Botões  8. Topo e crachá  9. Sobre mim
   10. Projetos e janelas  11. Outros projetos
   12. Certificados  13. Contato e rodapé
   14. Surgir ao rolar e telas  15. Celular  16. Movimento reduzido
   ========================================================= */

/* ---------- 1. Fontes (arquivos no próprio repositório) ---------- */
@font-face {
  font-family: "Space Grotesk";
  src: url("../fonts/space-grotesk-latin-wght.woff2") format("woff2");
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "JetBrains Mono";
  src: url("../fonts/jetbrains-mono-latin-wght.woff2") format("woff2");
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}

/* ---------- 2. Variáveis ---------- */
:root {
  --cor-fundo: #0f0d1a;
  --cor-superficie: #14111f;
  --cor-vidro: rgba(23, 19, 38, 0.62);
  --cor-vidro-solido: rgba(20, 17, 33, 0.9);
  --cor-vidro-menu: rgba(15, 13, 26, 0.72);
  --cor-janela: #0b0a12;
  --cor-janela-barra: #17142a;
  --cor-borda-vidro: rgba(244, 241, 250, 0.1);
  --cor-borda-vidro-forte: rgba(244, 241, 250, 0.18);
  --cor-borda-controle: #8a84a3;
  --cor-texto: #f4f1fa;
  --cor-texto-suave: #b9b3cc;
  --cor-texto-apagado: #8a84a3;
  --cor-ambar: #f59e0b;
  --cor-ambar-claro: #fbbf24;
  --cor-lilas: #c084fc;
  --cor-lilas-texto: #d8b4fe;
  --cor-verde-terminal: #86efac;
  --cor-foco: #7dd3fc;
  --cor-sobre-ambar: #1a1205;
  --cor-cracha: rgba(23, 19, 38, 0.92);
  --cor-fita: #4c3580;
  --cor-fita-borda: rgba(192, 132, 252, 0.55);
  --rgb-ambar: 245 158 11;
  --rgb-lilas: 192 132 252;

  --fonte-texto: "Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --fonte-mono: "JetBrains Mono", ui-monospace, Consolas, "Courier New", monospace;

  --esp-1: 4px; --esp-2: 8px; --esp-3: 12px; --esp-4: 16px; --esp-5: 24px;
  --esp-6: 32px; --esp-7: 48px; --esp-8: 64px; --esp-9: 96px;

  --raio-sm: 8px; --raio-md: 12px; --raio-lg: 20px; --raio-xl: 28px; --raio-pill: 999px;

  --sombra-janela: 0 24px 60px -24px rgb(0 0 0 / 0.7);
  --brilho-ambar: 0 10px 30px -8px rgb(var(--rgb-ambar) / 0.45);

  --curva-saida: cubic-bezier(0.22, 1, 0.36, 1);
  --curva-suave: cubic-bezier(0.45, 0, 0.55, 1);
  --dur-rapida: 160ms;
  --dur-media: 300ms;
  --dur-revelar: 650ms;
  --dist-revelar: 24px;

  --largura-max: 1120px;
  --margem: 20px;
  --altura-menu: 56px;
}
@media (min-width: 768px) {
  :root { --margem: 32px; --altura-menu: 64px; }
}

/* ---------- 3. Base ---------- */
*, *::before, *::after { box-sizing: border-box; }
html { color-scheme: dark; -webkit-text-size-adjust: 100%; }
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
body {
  margin: 0;
  padding-top: var(--altura-menu);
  background: var(--cor-fundo);
  color: var(--cor-texto);
  font-family: var(--fonte-texto);
  font-size: 1.0625rem;
  line-height: 1.65;
  overflow-x: clip;
}
img { display: block; max-width: 100%; height: auto; }
a { color: var(--cor-lilas-texto); }
h1, h2, h3 { margin: 0; line-height: 1.1; }
p { margin: 0; }

.container {
  width: 100%;
  max-width: calc(var(--largura-max) + 2 * var(--margem));
  margin-inline: auto;
  padding-inline: var(--margem);
}
main, footer { position: relative; z-index: 1; }
main:focus { outline: none; }

:focus-visible {
  outline: 3px solid var(--cor-foco);
  outline-offset: 3px;
}

.sr-only {
  position: absolute !important;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0);
  white-space: nowrap; border: 0;
}

.pular {
  position: fixed;
  top: var(--esp-4); left: var(--esp-4);
  z-index: 100;
  padding: var(--esp-3) var(--esp-4);
  border-radius: var(--raio-pill);
  background: var(--cor-ambar);
  color: var(--cor-sobre-ambar);
  font-weight: 600;
  text-decoration: none;
  transform: translateY(-200%);
}
.pular:focus { transform: none; }

.vidro {
  background: var(--cor-vidro);
  -webkit-backdrop-filter: blur(16px) saturate(130%);
  backdrop-filter: blur(16px) saturate(130%);
  border: 1px solid var(--cor-borda-vidro);
  border-radius: var(--raio-lg);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.06);
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .vidro { background: var(--cor-vidro-solido); }
}

/* ---------- 4. Fundo (manchas) e luz do mouse ---------- */
.fundo {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.mancha {
  position: absolute;
  width: var(--tamanho);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(closest-side,
    rgb(var(--rgb) / var(--alfa)) 0%,
    rgb(var(--rgb) / calc(var(--alfa) * 0.5)) 45%,
    rgb(var(--rgb) / 0) 100%);
  will-change: transform;
  animation: var(--anim) var(--duracao) var(--curva-suave) infinite alternate;
}
.mancha--1 { --rgb: var(--rgb-ambar); --alfa: 0.12; --tamanho: 62vmax; top: -18vmax; left: -14vmax; --anim: deriva-1; --duracao: 32s; }
.mancha--2 { --rgb: var(--rgb-lilas); --alfa: 0.14; --tamanho: 70vmax; top: 10vh; right: -24vmax; --anim: deriva-2; --duracao: 38s; }
.mancha--3 { --rgb: var(--rgb-lilas); --alfa: 0.08; --tamanho: 46vmax; bottom: -20vmax; left: 20vw; --anim: deriva-3; --duracao: 44s; }

@keyframes deriva-1 {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(12vw, 8vh, 0) scale(1.12); }
  100% { transform: translate3d(4vw, 18vh, 0) scale(0.94); }
}
@keyframes deriva-2 {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(-14vw, 10vh, 0) scale(0.92); }
  100% { transform: translate3d(-6vw, 24vh, 0) scale(1.1); }
}
@keyframes deriva-3 {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(10vw, -12vh, 0) scale(1.08); }
  100% { transform: translate3d(-8vw, -6vh, 0) scale(0.96); }
}

.luz {
  display: none;
  position: fixed;
  left: 0; top: 0;
  z-index: 0;
  width: 520px; height: 520px;
  margin: -260px 0 0 -260px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgb(var(--rgb-ambar) / 0.07), rgb(var(--rgb-ambar) / 0));
  opacity: 0;
  pointer-events: none;
  will-change: transform;
  transition: opacity 400ms ease;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .anima .luz { display: block; }
}
.luz.acesa { opacity: 1; }

/* ---------- 5. Menu fixo ---------- */
.cabecalho {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  height: var(--altura-menu);
  background: var(--cor-vidro-menu);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid var(--cor-borda-vidro);
}
.cabecalho__dentro {
  display: flex;
  align-items: center;
  gap: var(--esp-2);
  height: 100%;
  max-width: calc(var(--largura-max) + 2 * var(--margem));
  margin-inline: auto;
  padding-inline: var(--esp-2);
}
.marca { display: none; }
.menu { flex: 1; min-width: 0; }
.menu__lista {
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0; padding: 0;
}
.menu__link {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 0 6px;
  border-radius: var(--raio-sm);
  color: var(--cor-texto-suave);
  font-size: 0.8125rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: color var(--dur-rapida) ease, background-color var(--dur-rapida) ease;
}
.menu__link::after {
  content: "";
  position: absolute;
  left: 6px; right: 6px; bottom: 6px;
  height: 2px;
  border-radius: 2px;
  background: var(--cor-ambar);
  transform: scaleX(0);
  transition: transform var(--dur-media) var(--curva-saida);
}
.menu__link[aria-current="true"] { color: var(--cor-ambar); }
.menu__link[aria-current="true"]::after { transform: scaleX(1); }
.menu__extra { display: none; }

.idioma {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: none;
  min-width: 44px;
  min-height: 44px;
  padding: 0 10px;
  border: 1px solid var(--cor-borda-controle);
  border-radius: var(--raio-md);
  background: transparent;
  color: var(--cor-texto);
  font: 600 0.875rem/1 var(--fonte-mono);
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: color var(--dur-rapida) ease, border-color var(--dur-rapida) ease, transform var(--dur-rapida) ease;
}
.idioma:active { transform: scale(0.96); }
.idioma__icone { display: none; width: 16px; height: 16px; }

@media (hover: hover) {
  .menu__link:hover { color: var(--cor-texto); background: rgb(244 241 250 / 0.06); }
  .menu__link[aria-current="true"]:hover { color: var(--cor-ambar); }
  .idioma:hover { color: var(--cor-ambar); border-color: var(--cor-ambar); }
}
@media (max-width: 379px) {
  .menu__link { padding: 0 4px; }
  .menu__link::after { left: 4px; right: 4px; }
}
@media (min-width: 768px) {
  .cabecalho__dentro { padding-inline: var(--margem); gap: var(--esp-4); }
  .marca {
    display: inline-flex; align-items: center; gap: var(--esp-2);
    min-height: 44px;
    color: var(--cor-texto); font-weight: 600; font-size: 0.9375rem;
    text-decoration: none; margin-right: auto;
  }
  .marca svg { width: 28px; height: 28px; }
  .menu { flex: none; }
  .menu__lista { gap: 2px; }
  .menu__link { padding: 0 var(--esp-3); font-size: 0.9375rem; }
  .menu__link::after { left: var(--esp-3); right: var(--esp-3); }
  .menu__extra { display: inline; }
  .idioma__icone { display: block; }
}

/* ---------- 6. Seções ---------- */
.secao {
  padding-block: clamp(64px, 10vw, 128px);
  scroll-margin-top: calc(var(--altura-menu) + 24px);
}
.secao__cabeca { margin-bottom: clamp(32px, 5vw, 56px); }
.secao__num {
  display: flex; align-items: center; gap: var(--esp-3);
  margin-bottom: var(--esp-3);
  color: var(--cor-ambar);
  font: 500 0.8125rem/1 var(--fonte-mono);
  letter-spacing: 0.12em;
}
.secao__num::after { content: ""; width: 32px; height: 1.5px; background: currentColor; }
.secao__titulo {
  font-size: clamp(2rem, 1.4rem + 2.6vw, 3.25rem);
  font-weight: 700;
  letter-spacing: -0.025em;
}
.secao__titulo::after { content: "."; color: var(--cor-ambar); }

/* ---------- 7. Botões ---------- */
.botoes { display: flex; flex-wrap: wrap; gap: var(--esp-3); }
.botao {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--esp-2);
  min-height: 48px;
  padding: 0 22px;
  border-radius: var(--raio-pill);
  border: 1.5px solid transparent;
  font: 600 0.9375rem/1 var(--fonte-texto);
  text-decoration: none;
  transition:
    background-color var(--dur-rapida) ease,
    border-color var(--dur-rapida) ease,
    color var(--dur-rapida) ease,
    transform var(--dur-media) var(--curva-saida),
    box-shadow var(--dur-media) var(--curva-saida);
}
.botao svg { width: 20px; height: 20px; flex: none; }
.botao .seta { width: 14px; height: 14px; }
.botao--pequeno { min-height: 44px; padding: 0 18px; }

.botao--principal { background: var(--cor-ambar); color: var(--cor-sobre-ambar); }
.botao--secundario { background: transparent; border-color: var(--cor-lilas); color: var(--cor-texto); }
.botao--terciario {
  min-height: 44px; padding: 0 14px;
  border-radius: var(--raio-md);
  border-width: 1px; border-color: var(--cor-lilas);
  background: transparent; color: var(--cor-lilas-texto);
  font-size: 0.875rem;
}
.botao--terciario svg { width: 16px; height: 16px; }
.botao:active { transform: scale(0.98); }

@media (hover: hover) {
  .botao--principal:hover { background: var(--cor-ambar-claro); transform: translateY(-2px); box-shadow: var(--brilho-ambar); }
  .botao--secundario:hover { background: rgb(var(--rgb-lilas) / 0.14); border-color: var(--cor-lilas-texto); transform: translateY(-2px); }
  .botao--terciario:hover { background: rgb(var(--rgb-lilas) / 0.16); }
}

.link-codigo {
  display: inline-flex; align-items: center; gap: 6px;
  min-height: 44px;
  color: var(--cor-lilas-texto);
  font-size: 0.875rem; font-weight: 600;
  text-decoration: none;
  text-underline-offset: 4px;
}
.link-codigo:hover { text-decoration: underline; text-decoration-thickness: 2px; }
.link-codigo svg { width: 14px; height: 14px; }

/* ---------- 8. Topo e crachá ---------- */
.topo { padding-block: 0 var(--esp-8); }   /* sem espaço em cima: a fita sai colada no menu */
.topo__grade { display: grid; gap: var(--esp-5); align-items: center; }
.topo__texto { position: relative; z-index: 1; }

/* Palco: a área onde a fita e o crachá vivem */
.cracha-palco {
  --fita: 44px;
  --fita-largura: 12px;
  position: relative;            /* offsetParent do crachá e base do canvas */
  padding-top: var(--fita);
}
.cracha__canvas {
  display: none;
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  pointer-events: none;
}

.cracha {
  --cracha-w: 248px;
  position: relative;
  z-index: 2;
  width: var(--cracha-w);
  max-width: 100%;
}
.cracha::before {                /* fita parada (sem JS ou com movimento reduzido) */
  content: "";
  position: absolute;
  left: 50%; bottom: calc(100% - 4px);
  width: var(--fita-largura);
  height: calc(var(--fita) + 4px);
  transform: translateX(-50%);
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='44' viewBox='0 0 16 44'%3E%3Cpath d='M9 16v7a3 3 0 0 1-6 0' fill='none' stroke='%23F59E0B' stroke-width='1.8' stroke-linecap='round'/%3E%3Crect x='10.6' y='24' width='2.2' height='2.2' rx='.5' fill='%23F59E0B'/%3E%3C/svg%3E")
      center top / 100% auto repeat-y,
    var(--cor-fita);
  border-inline: 1px solid var(--cor-fita-borda);
}
.cracha__presilha {
  position: relative;
  z-index: 3;                    /* por cima do corpo e da ponta da fita */
  display: block;
  width: 24px; height: 30px;
  margin: 0 auto -16px;          /* invade 16px do corpo */
}
.cracha__corpo {
  position: relative;
  display: grid;
  grid-template-columns: 88px 1fr;
  grid-template-areas: "furo furo" "foto texto";
  column-gap: var(--esp-3);
  padding: 0 10px 14px;          /* 14px = respiro + faixa de 4px */
  border: 1px solid rgb(244 241 250 / 0.22);
  border-radius: 14px;
  background:
    linear-gradient(160deg, rgb(244 241 250 / 0.12), rgb(244 241 250 / 0.03) 55%),
    var(--cor-cracha);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.22),
    0 24px 50px -20px rgb(0 0 0 / 0.7),
    0 30px 80px -30px rgb(var(--rgb-ambar) / 0.45);
  overflow: hidden;
  transition: border-color var(--dur-rapida) ease;
}
.cracha__corpo::before {         /* reflexo diagonal do vidro */
  content: "";
  position: absolute; inset: 0;
  z-index: 1;
  background: linear-gradient(115deg, transparent 30%, rgb(255 255 255 / 0.08) 42%, transparent 54%);
  pointer-events: none;
}
.cracha__corpo::after {          /* faixa de baixo */
  content: "";
  position: absolute; left: 0; right: 0; bottom: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--cor-ambar), var(--cor-lilas));
}
.cracha__furo {
  grid-area: furo;
  position: relative;
  height: 18px;
}
.cracha__furo::before {
  content: "";
  position: absolute; left: 50%; top: 6px;
  width: 36px; height: 6px;
  transform: translateX(-50%);
  border-radius: var(--raio-pill);
  background: var(--cor-fundo);
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.6);
}
.cracha__foto {
  grid-area: foto;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: var(--raio-sm);
  outline: 1px solid rgb(244 241 250 / 0.1);
  outline-offset: -1px;
  -webkit-user-drag: none;
}
.cracha__texto {
  grid-area: texto;
  align-self: center;
  display: grid;
  gap: var(--esp-1);
}
.cracha__nome { font-size: 0.9375rem; font-weight: 700; letter-spacing: -0.01em; line-height: 1.2; }
.cracha__cargo {
  color: var(--cor-ambar);
  font: 500 0.6875rem/1.35 var(--fonte-mono);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* Física ligada (classe posta pelo main.js no .topo) */
.cracha-vivo .cracha__canvas { display: block; }
.cracha-vivo .cracha::before { display: none; }       /* a fita passa a ser o canvas */
.cracha-vivo .cracha {
  cursor: grab;
  touch-action: none;            /* SÓ no crachá: o resto da página rola normal */
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  transform-origin: 50% 4px;
  will-change: transform;
}
.cracha-vivo .cracha--arrastando { cursor: grabbing; }
@media (hover: hover) and (pointer: fine) {
  .cracha-vivo .cracha:hover .cracha__corpo { border-color: rgb(244 241 250 / 0.32); }
}

.topo__nome {
  font-size: clamp(2.5rem, 1.6rem + 4vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.02;
}
.topo__frase {
  margin-top: var(--esp-3);
  max-width: 34ch;
  font-size: clamp(1.125rem, 1rem + 0.6vw, 1.375rem);
  line-height: 1.5;
}
.topo__regiao {
  display: flex; gap: var(--esp-2); align-items: flex-start;
  margin-top: var(--esp-3);
  color: var(--cor-texto-suave);
  font-size: 0.9375rem;
}
.topo__regiao svg { width: 18px; height: 18px; flex: none; margin-top: 3px; color: var(--cor-lilas-texto); }
.topo .botoes { margin-top: var(--esp-5); }

@media (min-width: 768px) {
  .topo__regiao { font-size: 1rem; }
  .cracha-palco { --fita: 56px; --fita-largura: 14px; }
  .cracha { --cracha-w: 180px; }
  .cracha__corpo {                 /* crachá em pé */
    grid-template-columns: 1fr;
    grid-template-areas: "furo" "foto" "texto";
    padding: 0 12px 18px;
    text-align: center;
  }
  .cracha__furo { height: 26px; }
  .cracha__furo::before { top: 9px; width: 40px; height: 7px; }
  .cracha__texto { margin-top: 10px; }
  .cracha__nome { font-size: 1rem; }
}
@media (min-width: 960px) {
  .topo { padding-block: 0; }
  .topo__grade {
    grid-template-columns: 5fr 7fr;
    gap: var(--esp-8);
    align-items: stretch;
    min-height: min(calc(100vh - var(--altura-menu)), 820px);
    min-height: min(calc(100svh - var(--altura-menu)), 820px);
  }
  .topo__texto { align-self: center; padding-block: var(--esp-7); }
  .cracha-palco {
    --fita: clamp(120px, 22vh, 200px);   /* no computador, vh = svh; variável não tem "fallback" por repetição */
    --fita-largura: 16px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-bottom: var(--esp-7);
  }
  .cracha { --cracha-w: 260px; }
  .cracha__corpo { padding: 0 16px 20px; }
  .cracha__furo { height: 36px; }
  .cracha__furo::before { top: 14px; width: 44px; height: 8px; }
  .cracha__texto { margin-top: 14px; }
  .cracha__nome { font-size: 1.25rem; }
  .cracha__cargo { font-size: 0.75rem; }
}

/* ---------- 9. Sobre mim ---------- */
.sobre__grade { display: grid; gap: var(--esp-7); }
.sobre__texto { max-width: 62ch; display: grid; gap: var(--esp-5); }
.estudando {
  justify-self: start;
  display: inline-flex; align-items: center; gap: var(--esp-3);
  padding: 10px var(--esp-4);
  border: 1px solid rgb(var(--rgb-ambar) / 0.5);
  border-radius: var(--raio-pill);
  background: var(--cor-vidro);
}
.estudando strong { color: var(--cor-ambar); font-weight: 600; }
.estudando::before {
  content: "";
  flex: none;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--cor-ambar);
  box-shadow: 0 0 0 0 rgb(var(--rgb-ambar) / 0.6);
}
.anima .estudando.visivel::before { animation: respiro 2s ease-out 650ms 3; }
@keyframes respiro {
  from { box-shadow: 0 0 0 0 rgb(var(--rgb-ambar) / 0.6); }
  to   { box-shadow: 0 0 0 10px rgb(var(--rgb-ambar) / 0); }
}

.org { margin: 0; padding: var(--esp-5); align-self: start; }
.org__joao {
  padding: var(--esp-3) var(--esp-4);
  border: 1.5px solid var(--cor-ambar);
  border-radius: var(--raio-md);
  background: rgb(var(--rgb-ambar) / 0.08);
}
.org__nome { display: block; font-weight: 700; }
.org__papel {
  display: block;
  color: var(--cor-ambar);
  font: 500 0.75rem/1.4 var(--fonte-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.org__equipe {
  position: relative;
  list-style: none;
  margin: 0 0 0 var(--esp-5);
  padding: var(--esp-3) 0 0;
}
.org__equipe::before {            /* tronco da árvore */
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 20px;
  width: 1.5px;
  background: rgb(var(--rgb-lilas) / 0.6);
  transform-origin: top;
}
.org__agente {
  position: relative;
  display: flex; flex-wrap: wrap; align-items: baseline; gap: 0 var(--esp-3);
  min-height: 40px;
  padding: var(--esp-2) 0 var(--esp-2) 28px;
  transition: transform var(--dur-rapida) ease;
}
.org__agente::before {            /* galho */
  content: "";
  position: absolute;
  left: 0; top: 20px;
  width: 16px; height: 1.5px;
  background: rgb(var(--rgb-lilas) / 0.6);
  transition: background-color var(--dur-rapida) ease;
}
.org__agente-nome { font: 500 0.875rem/1.4 var(--fonte-mono); color: var(--cor-lilas-texto); }
.org__agente-funcao { font-size: 0.875rem; color: var(--cor-texto-suave); }
.org__legenda { margin-top: var(--esp-4); font-size: 0.8125rem; color: var(--cor-texto-suave); }
@media (hover: hover) and (pointer: fine) {
  .org__agente:hover { transform: translateX(4px); }
  .org__agente:hover::before { background: var(--cor-ambar); }
}
@media (min-width: 960px) {
  .sobre__grade { grid-template-columns: 7fr 5fr; gap: var(--esp-8); }
}

/* ---------- 10. Projetos e janelas ---------- */
.projetos { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--esp-6); }
.projeto {
  position: relative;
  display: grid;
  gap: var(--esp-5);
  padding: var(--esp-4);
  --rx: 0deg; --ry: 0deg; --mx: 50%; --my: 50%;
  transform: perspective(1400px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 600ms var(--curva-saida), border-color var(--dur-media) ease;
}
.projeto--labs { border-color: rgb(var(--rgb-ambar) / 0.35); }
.projeto.inclinando { transition: transform 120ms linear, border-color var(--dur-media) ease; border-color: var(--cor-borda-vidro-forte); }
.projeto:has(:focus-visible) { transform: none; }
.projeto::after {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  background: radial-gradient(600px circle at var(--mx) var(--my), rgb(255 255 255 / 0.08), transparent 45%);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur-media) ease;
}
.projeto.inclinando::after { opacity: 1; }

.projeto__midia { order: -1; margin: 0; }
.projeto__info { display: grid; gap: var(--esp-4); align-content: center; }
.projeto__titulo { font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem); font-weight: 600; letter-spacing: -0.015em; }
.projeto__descricao { color: var(--cor-texto-suave); font-size: 1rem; line-height: 1.6; }

.tags { display: flex; flex-wrap: wrap; gap: var(--esp-2); list-style: none; margin: 0; padding: 0; }
.tag {
  display: inline-flex; align-items: center;
  min-height: 28px; padding: 0 10px;
  border: 1px solid var(--cor-borda-vidro-forte);
  border-radius: var(--raio-sm);
  color: var(--cor-texto-suave);
  font: 500 0.8125rem/1 var(--fonte-mono);
}

.janela {
  overflow: hidden;
  border: 1px solid rgb(var(--rgb-lilas) / 0.22);
  border-radius: var(--raio-md);
  background: var(--cor-janela);
  box-shadow: var(--sombra-janela);
}
.janela__barra {
  display: flex; align-items: center; gap: var(--esp-2);
  height: 32px; padding: 0 var(--esp-3);
  background: var(--cor-janela-barra);
  border-bottom: 1px solid rgb(244 241 250 / 0.06);
}
.janela__ponto { width: 10px; height: 10px; border-radius: 50%; flex: none; }
.janela__ponto:nth-child(1) { background: var(--cor-ambar); }
.janela__ponto:nth-child(2) { background: var(--cor-lilas); }
.janela__ponto:nth-child(3) { background: #4b4565; }
.janela__titulo {
  flex: 1; min-width: 0;
  margin-right: 46px;            /* equilibra os pontos para o título ficar no meio */
  text-align: center;
  color: var(--cor-texto-suave);
  font: 500 0.75rem/1 var(--fonte-mono);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.janela__corpo { position: relative; }
.janela__corpo::before {          /* linha de luz da "tela que acende" */
  content: "";
  position: absolute; left: 0; right: 0; top: 50%;
  height: 2px; margin-top: -1px;
  background: var(--cor-ambar);
  box-shadow: 0 0 16px 2px rgb(var(--rgb-ambar) / 0.6);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}
.janela__tela { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; }

.terminal {
  margin: 0;
  min-height: 200px;
  padding: var(--esp-4) var(--esp-5);
  background:
    radial-gradient(60% 50% at 100% 0%, rgb(var(--rgb-lilas) / 0.1), transparent 70%),
    var(--cor-janela);
  color: var(--cor-texto-suave);
  font: 400 0.75rem/1.65 var(--fonte-mono);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.t-prompt { color: var(--cor-ambar); }
.t-cmd { color: var(--cor-texto); }
.t-entrada, .t-chave { color: var(--cor-lilas-texto); }
.t-ok { color: var(--cor-verde-terminal); }
.t-coment { color: var(--cor-texto-apagado); }
.t-cursor {
  display: inline-block;
  width: 0.6em; height: 1.15em;
  vertical-align: text-bottom;
  background: var(--cor-ambar);
}

@media (min-width: 960px) {
  .projetos { gap: var(--esp-7); }
  .projeto { grid-template-columns: 7fr 5fr; gap: var(--esp-6); padding: var(--esp-5); }
  .projeto__midia { order: 0; grid-column: 1; grid-row: 1; }
  .projeto__info { grid-column: 2; grid-row: 1; }
  .projetos > li:nth-child(even) .projeto { grid-template-columns: 5fr 7fr; }
  .projetos > li:nth-child(even) .projeto__midia { grid-column: 2; }
  .projetos > li:nth-child(even) .projeto__info { grid-column: 1; }
  .terminal { aspect-ratio: 16 / 10; min-height: 0; overflow: hidden; font-size: 0.8125rem; }
}
@media (min-width: 1200px) {
  .projeto { padding: var(--esp-6); }
}

/* ---------- 11. Outros projetos ---------- */
.outros { margin-top: var(--esp-7); }
.outros__titulo { font-size: 1.25rem; font-weight: 600; margin-bottom: var(--esp-4); }
.outros__lista { display: grid; gap: var(--esp-3); list-style: none; margin: 0; padding: 0; }
.outro {
  display: flex; flex-wrap: wrap; align-items: center; gap: var(--esp-2) var(--esp-3);
  min-height: 56px;
  padding: var(--esp-2) var(--esp-2) var(--esp-2) var(--esp-4);
  border-radius: var(--raio-md);
}
.outro__marca { color: var(--cor-ambar); font-family: var(--fonte-mono); }
.outro__nome { font: 500 0.9375rem/1.3 var(--fonte-mono); overflow-wrap: anywhere; }
.outro .link-codigo { margin-left: auto; padding-inline: var(--esp-2); }
@media (min-width: 768px) {
  .outros__lista { grid-template-columns: 1fr 1fr; }
}

/* ---------- 12. Certificados ---------- */
.cert-grupos { display: grid; gap: var(--esp-5); }
.cert-grupo { padding: var(--esp-5); }
.cert-grupo__titulo { font-size: 1.25rem; font-weight: 600; margin-bottom: var(--esp-2); }
.cert-lista { list-style: none; margin: 0; padding: 0; }
.cert {
  display: grid;
  gap: var(--esp-1) var(--esp-4);
  padding: 14px 0;
  border-top: 1px solid var(--cor-borda-vidro);
}
.cert:first-child { border-top: 0; }
.cert__nome { font-weight: 500; overflow-wrap: anywhere; }
.cert__meta {
  color: var(--cor-texto-suave);
  font: 400 0.8125rem/1.5 var(--fonte-mono);
  font-variant-numeric: tabular-nums;
}
.cert .botao { justify-self: start; margin-top: var(--esp-2); }

.cert-grupo--destaque {
  position: relative;
  border: 1.5px solid rgb(var(--rgb-ambar) / 0.55);
  overflow: hidden;
}
.cert-grupo--destaque::before {
  content: "";
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 4px;
  background: var(--cor-ambar);
}
.cert-grupo--destaque .cert-grupo__icone { width: 48px; height: 48px; color: var(--cor-ambar); margin-bottom: var(--esp-3); }
.cert-grupo__rotulo {
  color: var(--cor-ambar);
  font: 500 0.8125rem/1 var(--fonte-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.cert-grupo--destaque .cert__nome { font-size: 1.375rem; font-weight: 600; line-height: 1.3; }

@media (min-width: 560px) {
  .cert { grid-template-columns: 1fr auto; align-items: center; }
  .cert__nome { grid-column: 1; }
  .cert__meta { grid-column: 1; }
  .cert .botao { grid-column: 2; grid-row: 1 / span 2; margin-top: 0; }
  .cert-grupo--destaque .cert-grupo__corpo { display: grid; grid-template-columns: 48px 1fr; gap: var(--esp-5); align-items: start; }
  .cert-grupo--destaque .cert-grupo__icone { margin-bottom: 0; }
}
@media (min-width: 960px) {
  .cert-grupos {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "cloud cloud" "java banco" "java base";
    align-items: start;
  }
  .cert-grupo--cloud { grid-area: cloud; padding: var(--esp-6); }
  .cert-grupo--java  { grid-area: java; }
  .cert-grupo--banco { grid-area: banco; }
  .cert-grupo--base  { grid-area: base; }
}

/* ---------- 13. Contato e rodapé ---------- */
.contato { padding-block: clamp(64px, 10vw, 128px) var(--esp-6); scroll-margin-top: calc(var(--altura-menu) + 24px); }
.contato__painel {
  position: relative;
  max-width: 880px;
  margin-inline: auto;
  padding: var(--esp-6) var(--esp-5);
  text-align: center;
}
.contato__painel .secao__num { justify-content: center; }
.contato__frase { margin: var(--esp-4) auto 0; max-width: 40ch; color: var(--cor-texto-suave); font-size: 1.125rem; }
.contato .botoes { justify-content: center; margin-top: var(--esp-6); }
.contato__brilho {               /* fica atrás do painel, decorativo */
  position: absolute; inset: -20% -10%;
  z-index: -1;
  background: radial-gradient(closest-side, rgb(var(--rgb-ambar) / 0.1), transparent);
  pointer-events: none;
}
.rodape__linha {
  display: flex; flex-direction: column; align-items: center; gap: var(--esp-2);
  margin-top: var(--esp-8);
  padding: var(--esp-5) 0 var(--esp-6);
  border-top: 1px solid var(--cor-borda-vidro);
  color: var(--cor-texto-suave);
  font: 400 0.8125rem/1.6 var(--fonte-mono);
  text-align: center;
}
.rodape__linha a { color: var(--cor-lilas-texto); text-underline-offset: 3px; }
@media (min-width: 768px) {
  .contato__painel { padding: var(--esp-7); }
  .contato__frase { font-size: 1.25rem; }
  .rodape__linha { flex-direction: row; justify-content: space-between; text-align: left; }
}

/* ---------- 14. Surgir ao rolar, entrada do Topo e telas ---------- */
/* Só existe com a classe .anima no <html> (posta pelo script do <head>). */
.anima .revelar {
  opacity: 0;
  transform: translate3d(0, var(--dist-revelar), 0);
  transition:
    opacity var(--dur-revelar) var(--curva-saida) var(--atraso, 0ms),
    transform var(--dur-revelar) var(--curva-saida) var(--atraso, 0ms);
}
.anima .revelar.visivel,
.anima .revelar:focus-within,
.anima .revelar:focus { opacity: 1; transform: none; }

/* Topo: só transform (não atrasa o LCP). O crachá entra com o balanço da física. */
.anima .topo__texto > * { animation: entra-texto 700ms var(--curva-saida) both; }
.anima .topo__texto > :nth-child(2) { animation-delay: 60ms; }
.anima .topo__texto > :nth-child(3) { animation-delay: 120ms; }
.anima .topo__texto > :nth-child(4) { animation-delay: 180ms; }
@keyframes entra-texto { from { transform: translate3d(0, 12px, 0); } to { transform: none; } }

/* Tela que acende */
.anima .janela__tela { opacity: 0; transform: scale3d(0.3, 0.012, 1); }
.anima .visivel .janela__tela { animation: tela-acende 900ms var(--curva-saida) 150ms both; }
.anima .visivel .janela__corpo::before { animation: linha-de-luz 900ms ease-out 150ms both; }
@keyframes tela-acende {
  0%   { opacity: 0; transform: scale3d(0.3, 0.012, 1); }
  30%  { opacity: 1; transform: scale3d(1, 0.012, 1); }
  100% { opacity: 1; transform: scale3d(1, 1, 1); }
}
@keyframes linha-de-luz {
  0%   { opacity: 0; transform: scaleX(0.3); }
  30%  { opacity: 1; transform: scaleX(1); }
  55%, 100% { opacity: 0; transform: scaleX(1); }
}
.anima .visivel .t-cursor { animation: piscar 1.1s steps(1) 1.1s 3; }
@keyframes piscar { 50% { opacity: 0; } }

/* Organograma */
.anima .org .org__equipe::before { transform: scaleY(0); transition: transform 600ms var(--curva-saida) 200ms; }
.anima .org.visivel .org__equipe::before { transform: none; }
.anima .org .org__agente { opacity: 0; transform: translate3d(-8px, 0, 0); transition: opacity 400ms var(--curva-saida), transform 400ms var(--curva-saida); }
.anima .org.visivel .org__agente { opacity: 1; transform: none; }
.anima .org.visivel .org__agente:nth-child(1) { transition-delay: 300ms; }
.anima .org.visivel .org__agente:nth-child(2) { transition-delay: 380ms; }
.anima .org.visivel .org__agente:nth-child(3) { transition-delay: 460ms; }
.anima .org.visivel .org__agente:nth-child(4) { transition-delay: 540ms; }
.anima .org.visivel .org__agente:nth-child(5) { transition-delay: 620ms; }

/* ---------- 15. Celular e aparelhos sem mouse ---------- */
@media (max-width: 767px) {
  :root { --dist-revelar: 16px; --dur-revelar: 500ms; }
  .vidro {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    background: var(--cor-vidro-solido);
  }
  .cabecalho {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    background: rgba(15, 13, 26, 0.94);
  }
  .mancha--3 { display: none; }
  .mancha--1 { --duracao: 48s; }
  .mancha--2 { --duracao: 57s; }
  .projeto { padding: var(--esp-4); }
}
@media (hover: none), (pointer: coarse) {
  .projeto { transform: none; }
  .projeto::after { display: none; }
}

/* ---------- 16. Movimento reduzido: tudo parado e visível ---------- */
@media (prefers-reduced-motion: reduce) {
  .mancha { animation: none; }
  .luz { display: none !important; }
  .projeto { transform: none !important; }
  .projeto::after { display: none; }
  .revelar, .janela__tela, .org__agente, .cracha, .topo__texto > * {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }
  /* Crachá parado e pendurado reto, mesmo se a classe de física ainda estiver lá */
  .cracha__canvas { display: none !important; }
  .cracha-vivo .cracha::before { display: block; }
  .cracha-vivo .cracha { cursor: auto; touch-action: auto; }
  .org__equipe::before { transform: none !important; }
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

---

## 13. JavaScript de referência (pequeno)

O dev escreve o código; estes trechos fixam os **números** do design.

**No `<head>`, antes do CSS** (junto com a parte do idioma, que o dev escreve):

```html
<script>
  (function () {
    var raiz = document.documentElement;
    var reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('IntersectionObserver' in window && !reduzido) {
      raiz.classList.add('anima');
      // Rede de segurança: se o main.js não rodar em 3s, mostra tudo.
      setTimeout(function () {
        if (!raiz.classList.contains('anima-ok')) raiz.classList.remove('anima');
      }, 3000);
    }
  })();
</script>
```

O `main.js` coloca `anima-ok` no `<html>` assim que o `IntersectionObserver` estiver ligado.

**Surgir ao rolar:** `new IntersectionObserver(callback, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' })`; ao ver o elemento, adiciona `visivel` e para de observar (`unobserve`). Atrasos em grupo: `style="--atraso: 80ms"`, `160ms`, `240ms`, `320ms` (no máximo).

**Tilt:**

```js
const MAX_X = 3; // graus
const MAX_Y = 4; // graus
const temMouse = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (temMouse && !reduzido) {
  document.querySelectorAll('.projeto').forEach((cartao) => {
    let quadro = 0;
    let px = 0;
    let py = 0;

    cartao.addEventListener('pointermove', (evento) => {
      px = evento.clientX;
      py = evento.clientY;
      if (quadro) return;
      quadro = requestAnimationFrame(() => {
        quadro = 0;
        const r = cartao.getBoundingClientRect();
        const x = (px - r.left) / r.width;   // 0 a 1
        const y = (py - r.top) / r.height;   // 0 a 1
        cartao.style.setProperty('--ry', ((x - 0.5) * 2 * MAX_Y).toFixed(2) + 'deg');
        cartao.style.setProperty('--rx', ((0.5 - y) * 2 * MAX_X).toFixed(2) + 'deg');
        cartao.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        cartao.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        cartao.classList.add('inclinando');
      });
    });

    cartao.addEventListener('pointerleave', () => {
      cancelAnimationFrame(quadro);
      quadro = 0;
      cartao.classList.remove('inclinando');
      cartao.style.setProperty('--rx', '0deg');
      cartao.style.setProperty('--ry', '0deg');
    });
  });
}
```

**Luz do mouse:** guarda o alvo no `pointermove` (só `pointerType === 'mouse'`), e num `requestAnimationFrame` anda 18% do caminho por quadro (`x += (alvoX - x) * 0.18`), aplicando `luz.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)'`. O laço para quando a distância fica menor que 0.5px. No primeiro movimento, `x` e `y` começam já no mouse. `pointerleave` no `document.documentElement` tira a classe `acesa`.

**Crachá pendurado** (seção 8.5). É o trecho mais comprido porque é o efeito mais delicado; o dev pode reorganizar, mas os números e as regras (só puxa, ponta pesada, limites, dormir, só `transform`) ficam.

```js
// Crachá pendurado: fita em Verlet (canvas) + crachá em HTML (transform).
const topo = document.querySelector('.topo');
const palco = document.querySelector('.cracha-palco');
const cracha = palco.querySelector('.cracha');
const canvas = palco.querySelector('.cracha__canvas');
const ctx = canvas.getContext('2d');
const reduzido = matchMedia('(prefers-reduced-motion: reduce)');

const PASSO = 1 / 60;                     // s, passo fixo da física
const G = 2400;                           // gravidade, px/s²
const PESO = 4;                           // a ponta (crachá) pesa 4 pontos da fita
const ANG_MAX = 18 * Math.PI / 180;       // giro máximo do crachá
const ESPACO_MARCA = 44;                  // px entre os "J." da fita
const MARCA = new Path2D('M9 16v7a3 3 0 0 1-6 0');   // o "J." (mesmo desenho do CSS)

let cfg, pts = [], N, seg, ancora, repouso, raio, minX, maxX;
let largura = 0, altura = 0, fitaLargura = 16, palcoEsq = 0, palcoTopoPagina = 0;
let ang = 0, arrastando = false, pronto = false;
const alvo = { x: 0, y: 0 }, pega = { x: 0, y: 0 };
let quadro = 0, ultimo = 0, sobra = 0, quieto = 0, visivel = true;

const vivo = () => topo.classList.contains('cracha-vivo');
const limitar = (v, min, max) => Math.max(min, Math.min(max, v));

function medir() {                         // só aqui (e no pointerdown) o JS lê layout
  const celular = matchMedia('(max-width: 767px)').matches;
  cfg = celular
    ? { segmentos: 5, iteracoes: 8, amortecimento: 0.985, velMax: 30, impulso: 120 }
    : { segmentos: 10, iteracoes: 12, amortecimento: 0.988, velMax: 40, impulso: 220 };
  cracha.style.transform = '';
  largura = palco.clientWidth;
  altura = palco.clientHeight;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = largura * dpr;
  canvas.height = altura * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  fitaLargura = parseFloat(getComputedStyle(palco).getPropertyValue('--fita-largura')) || 16;

  const w = cracha.offsetWidth;
  repouso = { x: cracha.offsetLeft + w / 2, y: cracha.offsetTop + 4 };  // presilha
  ancora = { x: repouso.x, y: 0 };                                     // colada no menu
  N = cfg.segmentos;
  seg = repouso.y / N;
  raio = Math.max(repouso.y * 1.5, 90);                                // limite de puxar
  const r = palco.getBoundingClientRect();
  const tela = document.documentElement.clientWidth;
  minX = Math.max(w / 2 + 4 - r.left, 8);                  // crachá a 4px da tela
  maxX = Math.min(tela - r.left - w / 2 - 4, largura - 8); // presilha a 8px do palco
  pts = [];
  for (let i = 0; i <= N; i++) pts.push({ x: ancora.x, y: seg * i, px: ancora.x, py: seg * i });
  ang = 0;
}

function passo() {
  const g = G * PASSO * PASSO;
  let mov = 0;
  for (let i = 1; i <= N; i++) {
    const p = pts[i];
    if (i === N && arrastando) {           // a ponta segue o dedo
      p.px = p.x; p.py = p.y; p.x = alvo.x; p.y = alvo.y;
      continue;
    }
    const vx = (p.x - p.px) * cfg.amortecimento;
    const vy = (p.y - p.py) * cfg.amortecimento;
    p.px = p.x; p.py = p.y;
    p.x += vx; p.y += vy + g;
    mov = Math.max(mov, Math.abs(vx) + Math.abs(vy));
  }
  for (let k = 0; k < cfg.iteracoes; k++) {
    for (let i = 0; i < N; i++) {
      const a = pts[i], b = pts[i + 1];
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
      if (d <= seg) continue;              // a fita só puxa, não empurra
      const wa = i === 0 ? 0 : 1;          // a âncora não se mexe
      const wb = i + 1 === N ? (arrastando ? 0 : 1 / PESO) : 1;
      const c = (d - seg) / (d * (wa + wb));
      a.x += dx * c * wa; a.y += dy * c * wa;
      b.x -= dx * c * wb; b.y -= dy * c * wb;
    }
  }
  // o crachá segue a direção do último pedaço da fita, um pouco atrasado
  const a = pts[N - 1], b = pts[N];
  const alvoAng = limitar(-Math.atan2(b.x - a.x, b.y - a.y), -ANG_MAX, ANG_MAX); // invertido? troque o sinal
  const dAng = (alvoAng - ang) * 0.2;
  ang += dAng;
  quieto = !arrastando && mov < 0.03 && Math.abs(dAng) < 0.0005 ? quieto + 1 : 0;
}

function desenhar() {
  ctx.clearRect(0, 0, largura, altura);
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y - 2);
  for (let i = 1; i <= N; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'butt';
  ctx.lineWidth = fitaLargura;     ctx.strokeStyle = 'rgba(192, 132, 252, 0.55)'; ctx.stroke();
  ctx.lineWidth = fitaLargura - 2; ctx.strokeStyle = '#4C3580';                  ctx.stroke();

  // marca "J." a cada 44px, em pé ao longo da fita
  const escala = fitaLargura / 16;
  let falta = ESPACO_MARCA / 2;
  ctx.strokeStyle = ctx.fillStyle = '#F59E0B';
  for (let i = 0; i < N; i++) {
    const a = pts[i], b = pts[i + 1];
    const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
    while (falta <= d) {
      const t = falta / d;
      ctx.save();
      ctx.translate(a.x + dx * t, a.y + dy * t);
      ctx.rotate(Math.atan2(dy, dx) - Math.PI / 2);
      ctx.scale(escala, escala);
      ctx.translate(-8, -21);
      ctx.lineWidth = 1.8; ctx.lineCap = 'round';
      ctx.stroke(MARCA);
      ctx.fillRect(10.6, 24, 2.2, 2.2);
      ctx.restore();
      falta += ESPACO_MARCA;
    }
    falta -= d;
  }

  const p = pts[N];                         // só transform: nada de layout
  cracha.style.transform =
    `translate3d(${(p.x - repouso.x).toFixed(2)}px, ${(p.y - repouso.y).toFixed(2)}px, 0) rotate(${ang.toFixed(4)}rad)`;
}

function laco(t) {
  sobra += Math.min((t - ultimo) / 1000, 0.05);   // no máximo 50ms por quadro
  ultimo = t;
  while (sobra >= PASSO) { passo(); sobra -= PASSO; }
  desenhar();
  quadro = quieto > 30 ? 0 : requestAnimationFrame(laco);   // parado há 0,5s: dorme
}
function acordar() {
  if (quadro || !pronto || !visivel || document.hidden || !vivo()) return;
  quieto = 0; sobra = 0; ultimo = performance.now();
  quadro = requestAnimationFrame(laco);
}
function parar() { cancelAnimationFrame(quadro); quadro = 0; }

// Arrastar (Pointer Events: mouse, caneta e dedo)
function posDedo(e) {                      // sem ler layout durante o arrasto
  return { x: e.clientX - palcoEsq, y: e.clientY + scrollY - palcoTopoPagina };
}
function moverAlvo(e) {
  const d = posDedo(e);
  let x = d.x - pega.x, y = d.y - pega.y;
  const dx = x - ancora.x, dy = y - ancora.y, dist = Math.hypot(dx, dy);
  if (dist > raio) { x = ancora.x + dx * raio / dist; y = ancora.y + dy * raio / dist; }
  alvo.x = limitar(x, minX, maxX);
  alvo.y = Math.max(8, y);                 // nunca sobe até o menu
}
function soltar() {
  if (!arrastando) return;
  arrastando = false;
  cracha.classList.remove('cracha--arrastando');
  const p = pts[N], v = cfg.velMax;        // segura o "arremesso"
  p.px = p.x - limitar(p.x - p.px, -v, v);
  p.py = p.y - limitar(p.y - p.py, -v, v);
  acordar();
}
cracha.addEventListener('pointerdown', (e) => {
  if (e.button !== 0 || !vivo()) return;
  e.preventDefault();                      // não "arrasta a imagem"
  cracha.setPointerCapture(e.pointerId);
  const r = palco.getBoundingClientRect(); // 1 leitura por arrasto
  palcoEsq = r.left;
  palcoTopoPagina = r.top + scrollY;
  const d = posDedo(e), p = pts[N];
  pega.x = d.x - p.x; pega.y = d.y - p.y;
  arrastando = true;
  pronto = true;                           // pegou antes dos 250ms? já vale
  cracha.classList.add('cracha--arrastando');
  moverAlvo(e);
  acordar();
});
cracha.addEventListener('pointermove', (e) => { if (arrastando) moverAlvo(e); });
for (const tipo of ['pointerup', 'pointercancel', 'lostpointercapture']) {
  cracha.addEventListener(tipo, soltar);
}

// Ligar, desligar e economizar
function ligar() {
  if (reduzido.matches) return;            // movimento reduzido: fica parado
  medir();
  topo.classList.add('cracha-vivo');
  desenhar();                               // troca a fita do CSS pela do canvas no mesmo quadro
  // balanço de entrada: velocidade que cresce até a ponta, sem tirar do lugar
  pts.forEach((p, i) => { p.px = p.x - cfg.impulso * PASSO * (i / N); });
  setTimeout(() => { pronto = true; acordar(); }, 250);
}
function desligar() {
  topo.classList.remove('cracha-vivo');
  arrastando = false;
  cracha.classList.remove('cracha--arrastando');
  parar();
  cracha.style.transform = '';
}
reduzido.addEventListener('change', () => (reduzido.matches ? desligar() : ligar()));
new IntersectionObserver(([en]) => {
  visivel = en.isIntersecting;
  if (visivel) acordar(); else parar();
}).observe(palco);
document.addEventListener('visibilitychange', () => (document.hidden ? parar() : acordar()));
new ResizeObserver(() => {
  if (!vivo() || (palco.clientWidth === largura && palco.clientHeight === altura)) return;
  parar(); medir(); desenhar();            // volta ao repouso no tamanho novo
}).observe(palco);

// (Opcional) reação leve à rolagem
let scrollAnterior = scrollY;
addEventListener('scroll', () => {
  const d = scrollY - scrollAnterior;
  scrollAnterior = scrollY;
  if (!vivo() || !visivel || arrastando) return;
  const k = limitar(d * 0.08, -3, 3);      // px por passo, no máximo 3
  for (let i = 1; i <= N; i++) {
    pts[i].py -= k * (i / N);              // a ponta "fica para trás" na rolagem
    pts[i].px -= k * 0.3 * (i / N);        // e balança um pouco de lado
  }
  acordar();
}, { passive: true });

ligar();
```

Observações para o dev:
- O `main.js` só roda esse trecho se existir `.cracha-palco` na página.
- Se a fita parecer "quebrada" em ângulos fortes no computador, troque os `lineTo` por curvas (`quadraticCurveTo` passando pelos pontos médios). Com 10 segmentos normalmente não precisa.
- Se o crachá girar para o lado errado (a parte de baixo indo contra o balanço), troque o sinal do `-Math.atan2(...)`.
- Com a ponta pesada, a fita pode "ceder" 1 ou 2px em repouso (a física não é perfeitamente rígida). É normal: acontece durante o balanço de entrada e ninguém percebe. Se passar de 3px, suba as iterações (14 no computador) antes de mexer no peso.

---

## 14. Checklist de design (para o dev e o testador)

- [ ] A 360px, nos dois idiomas: menu em uma linha, nada cortado, sem rolagem horizontal.
- [ ] A 360 × 640 e a 1366 × 768: nome, frase e os dois botões do Topo visíveis sem rolar.
- [ ] Conta-gotas do DevTools em 2 ou 3 pontos claros das manchas: texto suave com 4.5:1 ou mais.
- [ ] Nenhum texto pequeno usa `#C084FC` (só `#D8B4FE`); `#8A84A3` como texto só no terminal.
- [ ] Foco azul-céu visível em todos os botões, abas, links e no "Pular para o conteúdo"; cartão fica reto com foco dentro.
- [ ] Movimento reduzido ligado: nada se mexe, tudo visível, manchas paradas.
- [ ] JavaScript desligado: tudo visível em português. `main.js` renomeado de propósito: em até 3s tudo aparece.
- [ ] Celular: sem `backdrop-filter`, 2 manchas, sem luz, sem tilt, primeiro toque nos botões funciona.
- [ ] Terminal com o texto real do programa, sem rolagem horizontal, legível a 360px.
- [ ] Destaque da AWS com a palavra "Destaque"/"Featured" e em primeiro lugar.
- [ ] `favicon.svg` aparece na aba; `og.png` (com o crachá, a foto e o cargo "Desenvolvedor em formação") aparece no inspetor de publicação do LinkedIn (Post Inspector) depois de publicado.
- [ ] **Nenhum texto do site tem "chefe" nem "boss"** (Ctrl+F nos dois idiomas, mais `alt`, `aria-label`, `title`, `meta` e textos `.sr-only` no código). O organograma diz "DECIDE E APROVA" / "DECIDES AND APPROVES".
- [ ] **Crachá, computador:** a fita sai de trás do menu; o crachá balança sozinho ao carregar e para em até ~5s; dá para arrastar com o mouse (cursor `grab` → `grabbing`); ao soltar, balança e para; gira no máximo 18°; não sobe até o menu, não sai da tela e não cria rolagem horizontal.
- [ ] **Crachá, celular (Chrome do Android):** crachá horizontal; arrastar com o dedo funciona; encostar o dedo **fora** do crachá (inclusive na fita) rola a página normalmente; a 360 × 640 o nome, a frase e os botões continuam visíveis sem rolar.
- [ ] **Crachá, desempenho:** na aba Performance do DevTools, depois que ele para, não há mais quadros sendo pedidos (`requestAnimationFrame` parado); rolando até os Projetos, também não. Nada de "Layout" roxo durante o arrasto (só "Paint" do canvas e "Composite").
- [ ] **Crachá, movimento reduzido e sem JS:** parado, pendurado reto, fita em CSS com o "J.", sem cursor de arrastar e com rolagem normal por cima dele. Ligar o movimento reduzido com a página aberta para a física na hora.
- [ ] **Crachá, acessibilidade:** o Tab **não** para no crachá; o leitor de tela anuncia só "Foto de João Saccucci" (sem ler o nome e o cargo do crachá de novo); em inglês, o cargo vira "Developer in training" e o `alt`, "Photo of João Saccucci".

---

## 15. Decisões do João (decididas em 2026-11-14)

Todas as 8 questões foram decididas. Este design já está escrito com as escolhas abaixo.

| # | Questão | Escolha do João | Onde está no design |
|---|---|---|---|
| 1 | Fonte | **A:** Space Grotesk + JetBrains Mono, guardadas no próprio projeto | seção 3 |
| 2 | Como a foto aparece | **Crachá pendurado por uma fita**, que dá para arrastar com mouse ou dedo e que balança como pêndulo ao soltar (2D, JavaScript puro, sem biblioteca). Cargo "Desenvolvedor em formação" / "Developer in training". Substitui o retrato com moldura (A) e o crachá parado (C) da primeira versão | seções 6.1, 8.1, 8.5, 12 e 13 |
| 3 | Organograma no Sobre mim | **A:** sim, com a legenda aprovada; o papel do João é "DECIDE E APROVA" / "DECIDES AND APPROVES" | seção 6.2 |
| 4 | Como o print "se abre" | **A:** "tela que acende" | seções 6.4 e 8.1 |
| 5 | Menu no celular | **A:** uma linha de abas sempre visível | seção 5.3 |
| 6 | Ponto final âmbar nos títulos | **A:** sim | seção 7.4 |
| 7 | Textos pequenos | **Aprovados:** frase do Contato, rodapé e legenda do organograma. **A palavra "chefe" (e "boss") não aparece em nenhum texto do site**; no Sobre mim ficou "eu coordeno a equipe" | seções 6.2 e 6.7 |
| 8 | Prévia Open Graph | **A:** com a foto, no crachá, com o cargo "Desenvolvedor em formação" | seção 10 |

Nomes internos renomeados junto (não aparecem no site, mas ficam neutros no código): o conceito virou **"O escritório, à noite"** e a classe da caixa do João no organograma virou **`.org__joao`** (antes `.org__chefe`).

Continua pendente só o que depende do João fornecer (requisitos, seção 6, item 1): o arquivo da foto e a URL do LinkedIn. A tradução para o inglês do Sobre mim, das descrições e do rodapé é aprovada por ele na entrega (US08).
