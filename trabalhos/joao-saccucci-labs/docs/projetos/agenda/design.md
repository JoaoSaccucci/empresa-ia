# Design: Agenda

Projeto independente da João Saccucci Labs. Requisitos em [`requisitos.md`](requisitos.md) (Agenda US01 a US07). O código fica no repositório `agenda` (quem cria a pasta e os arquivos é o dev). Este arquivo traz tudo o que o dev precisa: conceito, paleta, tipografia, layout, HTML de cada parte e um **CSS de referência completo** (seção 9), pronto para virar o `css/style.css` da Agenda.

---

## 1. Conceito

**"Quadro de partidas ao anoitecer."** A Agenda é o painel de horários de uma estação à noite: fundo ameixa-escuro e quente, horários em "placas" de fonte mono âmbar (como as plaquinhas que viram nos aeroportos) e cada dia como uma plataforma com o seu título. É da mesma família da Labs (fundo escuro, Space Grotesk, JetBrains Mono, Exo 2 no título, brilho suave, rótulos em mono), mas troca o neon frio do "centro de comando" por uma luz quente de fim de tarde, mais calma, como convém a uma ferramenta de uso diário.

Regras do clima:
- **Âmbar é a cor da ação e do tempo:** horários, "Hoje", botão principal.
- **Lilás é a cor do "sem hora"**: placa "Dia todo", ícone de local, links.
- **Azul-céu só no foco do teclado**, para nunca se confundir com nada da tela.
- Nada pisca e nada se mexe sozinho. A lista é recalculada a cada minuto (US01), então ela **não tem animação de entrada**: só o formulário e os avisos aparecem com um movimento curto.

## 2. Paleta (variáveis CSS)

| Token | Hex | Uso |
|---|---|---|
| `--cor-fundo` | `#0F0B14` | fundo da página, fundo dos campos |
| `--cor-superficie` | `#191321` | cards dos compromissos, janelas (dialog), estado vazio |
| `--cor-superficie-2` | `#231A2E` | hover de botões, metade de cima da placa de hora, avisos |
| `--cor-placa-baixo` | `#1D1626` | metade de baixo da placa de hora |
| `--cor-borda` | `#3A2F48` | bordas **decorativas** (cards, divisórias) |
| `--cor-borda-campo` | `#8A7A9C` | bordas de campos e de botões secundários (precisam de 3:1) |
| `--cor-texto` | `#F5EEE6` | texto principal (branco quente) |
| `--cor-texto-suave` | `#B8AAB9` | texto secundário, local, observação, rodapé |
| `--cor-ambar` | `#FFB547` | horários, "Hoje", botão principal |
| `--cor-ambar-claro` | `#FFC970` | hover do botão principal |
| `--cor-lilas` | `#C4A8FF` | "Dia todo", ícone de local, links |
| `--cor-foco` | `#8FD3FF` | contorno de foco (só ele usa essa cor) |
| `--cor-perigo` | `#FF7B7B` | erros e ação de excluir |
| `--cor-perigo-claro` | `#FF9A9A` | hover do botão "Excluir" da confirmação |
| `--cor-sucesso` | `#8EE6A8` | barrinha do aviso "Compromisso salvo." |
| `--cor-sobre-cor` | `#1A1205` | texto sobre âmbar e sobre perigo (botões cheios) |

**Regra igual à da Labs:** botão cheio (âmbar ou perigo) usa **texto escuro** `#1A1205`, nunca branco.

### 2.1 Contraste conferido (WCAG 2.1, fórmula de luminância relativa)

| Elemento | Cor / fundo | Razão | Mínimo |
|---|---|---|---|
| Texto principal | `#F5EEE6` / `#0F0B14` | 16.8:1 | 4.5:1 |
| Texto principal no card | `#F5EEE6` / `#191321` | 15.8:1 | 4.5:1 |
| Texto principal no hover / aviso | `#F5EEE6` / `#231A2E` | 14.5:1 | 4.5:1 |
| Texto suave | `#B8AAB9` / `#0F0B14` | 8.7:1 | 4.5:1 |
| Texto suave no card | `#B8AAB9` / `#191321` | 8.2:1 | 4.5:1 |
| Texto suave sobre o brilho âmbar do fundo (pior ponto, 10% âmbar) | `#B8AAB9` / ≈`#271C19` | 7.5:1 | 4.5:1 |
| Hora na placa | `#FFB547` / `#231A2E` e `#1D1626` | 9.5:1 e 10.0:1 | 4.5:1 |
| Título "Hoje" | `#FFB547` / `#0F0B14` | 11.0:1 | 3:1 (grande) |
| "DIA TODO" (12px) na placa | `#C4A8FF` / `#231A2E` | 8.3:1 | 4.5:1 |
| Links e ícone de local | `#C4A8FF` / `#0F0B14` | 9.6:1 | 4.5:1 |
| Botão principal (texto) | `#1A1205` / `#FFB547` | 10.5:1 | 4.5:1 |
| Botão principal no hover | `#1A1205` / `#FFC970` | 12.2:1 | 4.5:1 |
| Botão "Excluir" da confirmação | `#1A1205` / `#FF7B7B` | 7.4:1 | 4.5:1 |
| Mesmo botão no hover | `#1A1205` / `#FF9A9A` | 9.1:1 | 4.5:1 |
| Mensagem de erro do campo | `#FF7B7B` / `#191321` | 7.2:1 | 4.5:1 |
| "Excluir" do item no hover | `#FF7B7B` / `#231A2E` | 6.7:1 | 4.5:1 |
| Texto do campo com erro | `#F5EEE6` / perigo 8% sobre o fundo (≈`#251418`) | ~14:1 | 4.5:1 |
| Texto da faixa de alerta | `#F5EEE6` / âmbar 12% sobre o card (≈`#352626`) | 12.5:1 | 4.5:1 |
| Ícone âmbar da faixa de alerta | `#FFB547` / ≈`#352626` | 8.2:1 | 3:1 |
| **Não-texto:** borda de campo e de botão secundário | `#8A7A9C` / `#191321` · `#0F0B14` · `#231A2E` | 4.6 · 4.9 · 4.3:1 | 3:1 |
| **Não-texto:** borda do campo com erro (2px) | `#FF7B7B` / `#191321` | 7.2:1 | 3:1 |
| **Não-texto:** contorno de foco (3px) | `#8FD3FF` / `#0F0B14` · `#191321` | 11.9 · 11.2:1 | 3:1 |
| **Não-texto:** borda do botão principal contra o fundo | `#FFB547` / `#0F0B14` | 11.0:1 | 3:1 |

`--cor-borda` (`#3A2F48`) dá só ~1.6:1 e por isso **só** é usada onde a borda é enfeite (o card do compromisso já se destaca pela cor de fundo e pelo conteúdo). Nunca usar `--cor-borda` em campo, botão ou foco.

## 3. Tipografia

Mesmas fontes da Labs (família), com menos pesos (página mais leve). No `<head>`, antes do `style.css`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@700&family=JetBrains+Mono:wght@400;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

| Fonte | Uso | Fallback (se o Google Fonts não carregar) |
|---|---|---|
| **Exo 2** 700 | só o `h1` "Agenda" | Space Grotesk, system-ui, sans-serif |
| **Space Grotesk** 400–700 | todo o texto, títulos dos dias, botões, campos | system-ui, -apple-system, "Segoe UI", Roboto, sans-serif |
| **JetBrains Mono** 400/600 | horas, "DIA TODO", "daqui a X dias", rótulos de seção, rodapé | ui-monospace, Consolas, "Courier New", monospace |

Fontes não são biblioteca: sem elas a página continua funcionando com as fontes do sistema (`display=swap`).

**Escala:** 12 (rótulos) · 14 (local, observação, botões do item, rodapé) · 16 (corpo, campos) · 17 (título do compromisso, hora) · 20 (título do dia) · 22 a 28 (`h1`, fluido). Entrelinha 1.55. Horas com `font-variant-numeric: tabular-nums` (os números têm a mesma largura e as placas ficam alinhadas).

**Campos sempre com 16px** ou mais (o celular não dá zoom sozinho).

## 4. Espaçamento, raios, sombras

- Escala de 4px igual à da Labs: `--esp-1` 4 · `--esp-2` 8 · `--esp-3` 12 · `--esp-4` 16 · `--esp-5` 24 · `--esp-6` 32 · `--esp-7` 48 · `--esp-8` 64.
- Raios: `--raio-sm` 6px (placa de hora) · `--raio-md` 10px (campos, botões do item, avisos) · `--raio-lg` 16px (cards, janelas) · `--raio-pill` (botões principais).
- Sombra `--sombra` (janelas e aviso flutuante) e `--brilho-ambar` (hover do botão principal).
- Container: **máximo 760px** (a agenda é uma coluna; linhas curtas leem melhor), margem lateral 16px no celular e 24px a partir de 640px.
- Alvos de toque: **44px** no mínimo em tudo; campos com 48px.

## 5. Layout

### 5.1 Celular (360px = 328px úteis)

```
+--------------------------------------+
| [ícone] Agenda▪          [+ Novo]    |  cabeçalho fixo no topo (sticky), 64px
+--------------------------------------+
| (faixa de alerta, só se houver)      |
|                                      |
| PRÓXIMOS COMPROMISSOS                |  rótulo mono 12px (h2)
|                                      |
| ▪ Hoje                               |  h3 âmbar, linha embaixo
| +----------------------------------+ |
| | +------+ Dentista                | |  placa 64px | conteúdo
| | |09:30 | (pino) Clínica Sorriso  | |
| | +------+ | Levar o cartão do...  | |
| |          [✎ Editar] [🗑 Excluir]  | |  botões embaixo do conteúdo
| +----------------------------------+ |
|                                      |
| Sex, 14/11 · daqui a 3 dias          |  h3 branco + contagem mono suave
| +----------------------------------+ |
| | +------+ Prova de Banco de Dados | |
| | | DIA  |                         | |  placa lilás "DIA TODO"
| | | TODO | [✎ Editar] [🗑 Excluir]  | |
| | +------+                         | |
| +----------------------------------+ |
|                                      |
| - - - - - - - - - - - - - - - - - -  |
| [ Anteriores (5)                 v ] |  botão largo, recolhido
|                                      |
+--------------------------------------+
| (navegador) Seus compromissos ficam  |  rodapé no fim da página (não fixo)
| salvos só neste navegador.           |
+--------------------------------------+
         [ Compromisso salvo.  ]          aviso flutuante (some em ~5s)
```

Conferido a 360px: card com 328px; padding 12px → 304px por dentro; placa 64px + vão 12px → **228px** para o texto. Os botões "Editar" (~94px) e "Excluir" (~100px) + vão de 8px = 202px cabem na linha de 228px.

### 5.2 Computador (a partir de 640px; coluna de até 760px)

```
+------------------------------------------------------------------+
| [ícone] Agenda▪                           [+ Novo compromisso]    |
+------------------------------------------------------------------+
  PRÓXIMOS COMPROMISSOS

  ▪ Hoje
  +--------------------------------------------------------------+
  | +-------+  Dentista                      [✎ Editar][🗑 Excluir]|
  | | 09:30 |  (pino) Clínica Sorriso                             |
  | +-------+  | Levar o cartão do convênio.                      |
  +--------------------------------------------------------------+

  Amanhã
  ...
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  [ Anteriores (5)                                             v ]
+------------------------------------------------------------------+
  (navegador) Seus compromissos ficam salvos só neste navegador.
```

Placa de 76px, conteúdo no meio, botões à direita (3 colunas).

### 5.3 Pontos de quebra

| Largura | O que muda |
|---|---|
| < 480px | botão do topo mostra só "+ Novo" (o resto do texto fica para o leitor de tela); Data e Hora um embaixo do outro; botões da janela dividem a largura |
| ≥ 480px | botão "+ Novo compromisso" completo; Data e Hora lado a lado |
| ≥ 640px | item em 3 colunas (placa, texto, botões); margem lateral 24px |

## 6. HTML de referência (estrutura e classes)

O JS monta a lista; o resto fica fixo no `index.html`. Todo texto digitado pela pessoa entra com `textContent` (nunca `innerHTML`), como pede a US01.

### 6.1 Página

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#0F0B14">
  <title>Agenda</title>
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <!-- fontes da seção 3 -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="cabecalho">
    <div class="container cabecalho-conteudo">
      <div class="marca">
        <!-- svg do favicon (seção 8.1), com class="marca-icone" aria-hidden="true" -->
        <h1>Agenda</h1>
      </div>
      <button class="btn btn-primario botao-novo" type="button" id="botao-novo">
        <!-- svg "mais" (8.2) -->
        <span>Novo</span><span class="botao-novo-resto"> compromisso</span>
      </button>
    </div>
  </header>

  <main class="container principal">
    <!-- avisos que ficam na tela (US07). Vazio quando está tudo bem. -->
    <div class="faixas" id="faixas" aria-live="polite"></div>

    <section class="proximos" aria-labelledby="titulo-proximos">
      <h2 class="secao-titulo" id="titulo-proximos">Próximos compromissos</h2>
      <div id="lista-proximos"><!-- dias (6.2) ou estado vazio (6.4) --></div>
    </section>

    <!-- sem nenhum anterior: hidden na section inteira (US06) -->
    <section class="anteriores" aria-labelledby="titulo-anteriores" hidden>
      <h2 class="anteriores-titulo" id="titulo-anteriores">
        <button class="anteriores-botao" type="button" aria-expanded="false" aria-controls="lista-anteriores">
          <span><span>Anteriores</span> <span class="anteriores-contagem">(5)</span></span>
          <!-- svg "seta" (8.2) com class="icone anteriores-seta" -->
        </button>
      </h2>
      <div class="anteriores-lista" id="lista-anteriores" hidden><!-- dias (6.2) --></div>
    </section>
  </main>

  <footer class="rodape">
    <div class="container rodape-conteudo">
      <p class="rodape-aviso"><!-- svg "navegador" (8.2) -->Seus compromissos ficam salvos só neste navegador.</p>
      <p>Um projeto da <a href="https://joaosaccucci.github.io/empresa-ia/trabalhos/joao-saccucci-labs/">João Saccucci Labs</a></p>
    </div>
  </footer>

  <!-- aviso flutuante: SEMPRE no HTML (região viva), o JS só troca o texto -->
  <div class="status" id="status" role="status" aria-live="polite"></div>

  <!-- janelas: 6.5 e 6.6 -->
</body>
</html>
```

- O segundo `<p>` do rodapé (link para a Labs) é **opcional**: o dev confere o endereço real da Labs publicada antes de usar. O aviso do primeiro `<p>` é obrigatório (US07).
- `aria-expanded` muda junto com o `hidden` da `.anteriores-lista`. A seção começa sempre recolhida.

### 6.2 Um dia com compromissos

```html
<section class="dia dia--hoje" aria-labelledby="dia-2026-11-04">
  <h3 class="dia-titulo" id="dia-2026-11-04">Hoje</h3>
  <ul class="compromissos">
    <!-- 6.3 -->
  </ul>
</section>

<section class="dia" aria-labelledby="dia-2026-11-14">
  <h3 class="dia-titulo" id="dia-2026-11-14">
    Sex, 14/11<span class="dia-contagem"><span aria-hidden="true"> · </span>daqui a 3 dias</span>
  </h3>
  <ul class="compromissos">...</ul>
</section>
```

- `dia--hoje` só no grupo de hoje (título âmbar com marcador). "Amanhã" e os outros dias ficam em branco.
- O "·" é decorativo (`aria-hidden`): o leitor de tela lê "Sex, 14/11, daqui a 3 dias".
- Os grupos ficam dentro de `<div class="dias">`. Em "Anteriores", a mesma estrutura, sem `dia-contagem` e sem `dia--hoje`.

### 6.3 Um compromisso

```html
<li class="compromisso" data-id="c-1731590400000-k3f9">
  <div class="compromisso-hora"><time datetime="2026-11-14T09:30">09:30</time></div>
  <div class="compromisso-corpo">
    <p class="compromisso-titulo">Dentista</p>
    <p class="compromisso-local"><!-- svg "local" (8.2) --><span class="sr-only">Local: </span><span>Clínica Sorriso</span></p>
    <p class="compromisso-obs"><span class="sr-only">Observação: </span>Levar o cartão do convênio.</p>
  </div>
  <div class="compromisso-acoes">
    <button class="botao-item" type="button" data-acao="editar"><!-- svg "editar" -->Editar<span class="sr-only"> Dentista</span></button>
    <button class="botao-item botao-item--perigo" type="button" data-acao="excluir"><!-- svg "excluir" -->Excluir<span class="sr-only"> Dentista</span></button>
  </div>
</li>
```

- **Dia todo:** `<div class="compromisso-hora compromisso-hora--dia-todo">Dia todo</div>` (o CSS escreve em maiúsculas e quebra em "DIA / TODO").
- **Local ou observação vazios:** não criar o `<p>` (nada de espaço vazio).
- **Rótulo dos botões:** o texto visível é "Editar"; o título vai em `sr-only`. O nome acessível fica "Editar Dentista" e começa com o texto visível (bom para quem usa comando de voz).
- **Observação com várias linhas:** o CSS usa `white-space: pre-line`, então as quebras de linha digitadas aparecem.
- **Em "Anteriores":** a classe `compromisso compromisso--anterior` (placa e fundo mais apagados, ver 7.6).

### 6.4 Lista vazia

```html
<div class="vazio">
  <!-- svg da ilustração (8.3) -->
  <p class="vazio-titulo">Nenhum compromisso por vir</p>
  <p class="vazio-texto">Anote o próximo e ele aparece aqui, no dia certo.</p>
  <button class="btn btn-primario" type="button" data-acao="novo"><!-- svg "mais" -->Novo compromisso</button>
</div>
```
(O `vazio-texto` é sugestão; pode sair.)

### 6.5 Formulário (dialog)

```html
<dialog class="janela" id="janela-compromisso" aria-labelledby="janela-titulo">
  <form class="janela-conteudo" id="form-compromisso" novalidate>
    <h2 class="janela-titulo" id="janela-titulo">Novo compromisso</h2>

    <div class="campo">
      <label class="campo-rotulo" for="campo-titulo">Título <span class="campo-obrigatorio">(obrigatório)</span></label>
      <input class="campo-controle" id="campo-titulo" name="titulo" type="text" maxlength="100" autocomplete="off" aria-describedby="erro-titulo">
      <p class="campo-erro" id="erro-titulo" hidden><!-- svg "alerta" -->Digite um título.</p>
    </div>

    <div class="campos-linha">
      <div class="campo">
        <label class="campo-rotulo" for="campo-data">Data <span class="campo-obrigatorio">(obrigatório)</span></label>
        <input class="campo-controle" id="campo-data" name="data" type="date" aria-describedby="erro-data">
        <p class="campo-erro" id="erro-data" hidden><!-- svg "alerta" -->Escolha uma data.</p>
      </div>
      <div class="campo">
        <label class="campo-rotulo" for="campo-hora">Hora</label>
        <input class="campo-controle" id="campo-hora" name="hora" type="time" aria-describedby="dica-hora">
        <p class="campo-dica" id="dica-hora">Deixe em branco para um compromisso do dia todo.</p>
      </div>
    </div>

    <div class="campo">
      <label class="campo-rotulo" for="campo-local">Local</label>
      <input class="campo-controle" id="campo-local" name="local" type="text" maxlength="100" autocomplete="off">
    </div>

    <div class="campo">
      <label class="campo-rotulo" for="campo-obs">Observação</label>
      <textarea class="campo-controle" id="campo-obs" name="observacao" rows="3" maxlength="500"></textarea>
    </div>

    <div class="janela-acoes">
      <button class="btn btn-secundario" type="button" data-acao="cancelar">Cancelar</button>
      <button class="btn btn-primario" type="submit">Salvar</button>
    </div>
  </form>
</dialog>
```

- Abrir com `showModal()` (Esc fecha e o Tab fica dentro, como pede a seção "Teclado"). Editar troca só o texto do `h2` para "Editar compromisso".
- **Estado de erro:** o JS tira o `hidden` do `.campo-erro` e põe `aria-invalid="true"` no campo. O `aria-describedby` já liga a mensagem ao campo (com o `hidden`, ela não é lida). Ao corrigir: `hidden` de volta e `aria-invalid` removido.
- Erro em texto + ícone + borda de 2px + fundo levemente vermelho: nunca só a cor.

```
+-----------------------------------+  borda de cima âmbar (3px)
| Novo compromisso                  |
|                                   |
| Título (obrigatório)              |
| +-------------------------------+ |  borda vermelha 2px
| |                               | |
| +-------------------------------+ |
| (!) Digite um título.             |  vermelho, 14px, 600
|                                   |
| Data (obrigatório)                |
| [ 04/11/2026            (cal) ]   |
| Hora                              |  (lado a lado a partir de 480px)
| [ --:--                 (rel) ]   |
| Deixe em branco para um...        |  dica, suave
| Local                             |
| [                             ]   |
| Observação                        |
| [                             ]   |
| [                             ]   |
|-----------------------------------|  barra de botões grudada embaixo
| [  Cancelar  ]   [   Salvar    ]  |  (fica visível mesmo rolando)
+-----------------------------------+
```

### 6.6 Confirmação de exclusão (dialog)

```html
<dialog class="janela janela--confirmar" id="janela-excluir" aria-labelledby="excluir-titulo" aria-describedby="excluir-texto">
  <div class="janela-conteudo">
    <span class="confirmar-icone" aria-hidden="true"><!-- svg "excluir" --></span>
    <h2 class="confirmar-titulo" id="excluir-titulo">Excluir 'Dentista'?</h2>
    <p class="confirmar-texto" id="excluir-texto">Essa ação não pode ser desfeita.</p>
    <div class="janela-acoes">
      <button class="btn btn-secundario" type="button" data-acao="cancelar" autofocus>Cancelar</button>
      <button class="btn btn-perigo" type="button" data-acao="confirmar-exclusao"><!-- svg "excluir" -->Excluir</button>
    </div>
  </div>
</dialog>
```

- Juntos, título e texto formam a frase da US05: "Excluir 'Dentista'? Essa ação não pode ser desfeita." O título digitado entra com `textContent`.
- Foco inicial no "Cancelar" (`autofocus` dentro do dialog funciona com `showModal()`; se preferir, o JS chama `.focus()`).
- O "Excluir" é vermelho **e** diz "Excluir" com o ícone de lixeira: não depende só da cor.

### 6.7 Avisos

| Situação | Onde | Texto (requisitos) |
|---|---|---|
| Salvou, atualizou, excluiu | `.status` (flutua embaixo, some em ~5s) | "Compromisso salvo." / "Compromisso salvo em Anteriores." / "Compromisso atualizado." / "Compromisso excluído." |
| `localStorage` indisponível | `.faixa.faixa--alerta` no topo, fica até recarregar | "Não foi possível salvar neste navegador. Seus compromissos vão sumir ao fechar a página." |
| Dado corrompido | `.faixa.faixa--alerta` | aviso curto (sugestão: "Não deu para ler os compromissos salvos. Uma cópia foi guardada e a agenda começou vazia.") |
| `localStorage` cheio | `.faixa.faixa--erro` | "Não foi possível salvar o compromisso." |

```html
<!-- dentro de #faixas -->
<p class="faixa faixa--alerta"><!-- svg "alerta" --><span>Não foi possível salvar neste navegador. Seus compromissos vão sumir ao fechar a página.</span></p>
```

- **Aviso flutuante:** para mostrar, `status.textContent = "Compromisso salvo."` e, opcional, `status.dataset.tipo = "sucesso"`. Para esconder, `status.textContent = ""` (o CSS usa `:empty`, então não pode sobrar espaço nem quebra de linha dentro do `div`). Ele não recebe foco, não tem botão e tem `pointer-events: none`: um toque "passa" por ele, então ele nunca bloqueia um botão. Enquanto ele aparece, o `body` ganha espaço extra embaixo (regra com `:has`), então o fim da página e o rodapé nunca ficam escondidos atrás dele.

## 7. Visual de cada parte

### 7.1 Cabeçalho
Fixo no topo (`sticky`), 64px, fundo `#0F0B14` a 82% com desfoque, linha de baixo `--cor-borda`. À esquerda o ícone (32px) e o `h1` "Agenda" em Exo 2 700 (22px no celular até 28px) com um quadradinho âmbar depois da palavra (enfeite, feito com `::after`). À direita o botão principal. Como o cabeçalho gruda no topo, o `html` tem `scroll-padding-top` de 80px: quando o foco vai para um compromisso (ex.: depois de excluir), ele não fica escondido atrás do cabeçalho.

### 7.2 Botão "Novo compromisso"
Pílula âmbar cheia, texto escuro 600, ícone "+" de 20px, 44px de altura. Hover: âmbar mais claro, sobe 1px e ganha brilho âmbar. Ativo (apertado): desce 1px e encolhe 2%. Abaixo de 480px mostra só "+ Novo"; o " compromisso" continua no HTML, escondido só da tela, então o nome acessível é sempre "Novo compromisso" (**ver decisão 1 no fim**).

### 7.3 Lista agrupada por dia
- Rótulo da seção "PRÓXIMOS COMPROMISSOS" em mono 12px, maiúsculas, espaçado, suave (mesmo jeito do `.rotulo` da Labs).
- Dias com 32px entre um e outro.
- **Título do dia** (`h3`): Space Grotesk 700, 20px, branco, com linha fina embaixo. "daqui a 3 dias" em mono 14px suave na mesma linha (desce de linha se não couber).
- **Hoje:** título âmbar, quadradinho âmbar antes da palavra e linha de baixo âmbar a 45%. É o único dia com cor: o olho acha "Hoje" de primeira.

### 7.4 Item do compromisso
- Card `--cor-superficie`, borda decorativa, raio 16px, padding 12px (16px a partir de 640px), 12px entre itens.
- **Placa de hora:** 64px de largura (76px no computador), mínimo 52px de altura, fundo em duas metades (`#231A2E` em cima, `#1D1626` embaixo, como a plaquinha que vira), hora em JetBrains Mono 600, 17px, âmbar, números de largura fixa.
- **Dia todo:** a mesma placa, com "DIA TODO" em mono 12px, maiúsculas, lilás, em duas linhas. O texto diz o que é; a cor diferente é só complemento.
- **Título:** 17px, 600, branco. **Local:** 14px suave com ícone de pino lilás. **Observação:** 14px suave, com filete de 2px à esquerda, respeitando as quebras de linha.
- Textos longos quebram em qualquer ponto (`overflow-wrap: anywhere`): nada causa rolagem horizontal.
- **Botões Editar/Excluir:** "fantasmas" (sem fundo), 44px de altura, ícone 18px + texto 14px em cor suave. Hover: fundo `#231A2E` e texto branco; no Excluir, o hover fica vermelho. Ativo: encolhe 3%.
- Hover/foco dentro do card: a borda do card fica levemente âmbar (enfeite).

### 7.5 Lista vazia
Card com borda tracejada lilás-acinzentada, centralizado, ilustração de um "quadro de partidas" vazio com uma lua (seção 8.3), "Nenhum compromisso por vir" em 20px 700, texto curto suave e o botão principal "Novo compromisso" com o texto completo (aqui sempre cabe).

### 7.6 Seção "Anteriores"
- Separada da lista por 48px e uma linha tracejada.
- O botão ocupa a largura toda: 52px de altura, fundo `--cor-superficie`, borda `--cor-borda-campo` (3:1), "Anteriores" em 600 e "(5)" em mono suave; seta à direita que gira 180° quando abre. O estado aberto/fechado também é dito pelo `aria-expanded`.
- Dentro: títulos dos dias em suave e 16px (sem âmbar, nem para "Ontem"); itens com `compromisso--anterior`: fundo transparente, borda tracejada, placa com a hora em cor suave. O texto continua com contraste AA (o "apagado" vem da cor, nunca de `opacity`).

### 7.7 Formulário (janela)
- Janela `--cor-superficie`, raio 16px, **borda de cima âmbar de 3px**, largura `min(100% - 32px, 512px)`, altura máxima da tela menos 32px, rola por dentro. Fundo da página escurecido (`::backdrop` ameixa a 72% com desfoque leve).
- Título 20px 700. Rótulos 14px 600 em cima de cada campo; "(obrigatório)" em suave e peso normal.
- Campos 48px, fundo `--cor-fundo` (mais escuro que a janela, parece "afundado"), borda `--cor-borda-campo`, letra 16px. Hover: borda suave mais clara. Foco: contorno azul-céu de 3px + borda azul.
- **Erro:** borda vermelha de 2px, fundo com 8% de vermelho, e embaixo a mensagem vermelha 14px 600 com ícone de alerta.
- Barra de botões grudada no fim da janela (fica visível ao rolar no celular): "Cancelar" (secundário, contorno) e "Salvar" (principal). No celular os dois dividem a largura; a partir de 480px ficam à direita.
- Abre com um movimento curto (180ms: aparece e sobe 8px). Sem movimento com `prefers-reduced-motion`.

### 7.8 Confirmação de exclusão
Janela menor (até 416px), **borda de cima vermelha**, ícone de lixeira num círculo vermelho claro, título "Excluir 'Dentista'?" em 20px 700 (o título longo quebra), texto suave, e os botões "Cancelar" (secundário, com o foco) e "Excluir" (vermelho cheio, texto escuro, ícone de lixeira).

### 7.9 Avisos
- **Flutuante (`.status`):** embaixo e no centro, até 480px de largura, fundo `#231A2E`, borda `--cor-borda-campo`, **barrinha de 4px à esquerda** verde (sucesso) ou vermelha (erro), texto branco 15px. Entra subindo 8px em 200ms.
- **Faixas (`.faixa`):** no topo do conteúdo, com ícone de alerta; alerta = fundo âmbar 12% e borda âmbar; erro = fundo vermelho 12% e borda vermelha. O texto é sempre branco (12:1).

### 7.10 Rodapé
No fim da página, **não fixo** (assim nunca cobre um compromisso ou um botão, em nenhuma largura). Linha fina em cima, 48px de espaço antes, mono 14px suave, ícone de navegador de 16px antes do aviso. A 360px o texto quebra em 2 linhas sem problema.

### 7.11 Foco visível
Contorno **azul-céu `#8FD3FF` de 3px**, afastado 3px (2px nos campos), em todo elemento focável: botões, campos, link do rodapé, botão "Anteriores". É a única coisa azul da tela, então nunca se confunde com hover (âmbar) ou erro (vermelho). Só aparece com `:focus-visible` (teclado), como na Labs.

### 7.12 Movimento reduzido
Com `prefers-reduced-motion: reduce`: sem a entrada da janela, sem a entrada do aviso, sem o giro da seta, sem o "sobe/desce" dos botões e sem transições. O resto funciona igual.

### 7.13 Alto contraste do Windows (`forced-colors`)
As cores somem, mas tudo é texto ("DIA TODO", "Excluir", "(obrigatório)", mensagens). O CSS só garante uma borda na placa de hora, nos botões e nos campos.

## 8. Ícones e ilustração (SVG)

### 8.1 Favicon e ícone do cabeçalho (`favicon.svg` na raiz do repositório `agenda`)

Uma folha de calendário com a faixa de cima âmbar, as duas argolas e um relógio lilás no meio (o "quando" da agenda).

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <title>Agenda</title>
  <rect width="64" height="64" rx="14" fill="#191321"/>
  <rect x="11" y="14" width="42" height="40" rx="7" fill="#231A2E" stroke="#FFB547" stroke-width="3"/>
  <path d="M11 25h42" stroke="#FFB547" stroke-width="3"/>
  <path d="M22 9v9M42 9v9" stroke="#F5EEE6" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="32" cy="39.5" r="8.5" fill="none" stroke="#C4A8FF" stroke-width="2.5"/>
  <path d="M32 35v4.5l3 2" fill="none" stroke="#C4A8FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```
No cabeçalho: colar o mesmo SVG inline, **sem** o `<title>`, com `class="marca-icone" aria-hidden="true" focusable="false"` (o `h1` já diz "Agenda").

### 8.2 Ícones da interface (inline, `currentColor`)

Todos: `class="icone"`, `viewBox="0 0 24 24"`, `width="20" height="20"`, `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"`. Abaixo só o miolo de cada um:

| Nome | Onde | Miolo |
|---|---|---|
| mais | botão "Novo" | `<path d="M12 5v14M5 12h14"/>` |
| editar | botão "Editar" | `<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/>` |
| excluir | botão "Excluir", confirmação | `<path d="M4 7h16M10 11v6M14 11v6"/><path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"/><path d="M9 7V4h6v3"/>` |
| local | linha do local | `<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>` |
| seta | botão "Anteriores" | `<path d="M6 9l6 6 6-6"/>` |
| alerta | erros e faixas | `<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/>` |
| navegador | rodapé | `<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M6.5 6.5h.01M9.5 6.5h.01"/>` |

Exemplo completo:
```html
<svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14"/></svg>
```

### 8.3 Ilustração da lista vazia

Um quadro de partidas sem nenhuma partida, com a lua de fim de tarde. Decorativa (`aria-hidden`). As cores estão escritas no SVG; a lua "minguante" é feita com um segundo círculo da cor do card (`#191321`), por isso a ilustração só deve ser usada dentro do `.vazio`.

```html
<svg class="vazio-ilustracao" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 112" width="160" height="112" fill="none" aria-hidden="true" focusable="false">
  <circle cx="130" cy="20" r="11" fill="#FFB547"/>
  <circle cx="136" cy="15" r="10" fill="#191321"/>
  <circle cx="108" cy="12" r="1.5" fill="#F5EEE6" opacity=".6"/>
  <circle cx="150" cy="38" r="1.2" fill="#F5EEE6" opacity=".5"/>
  <rect x="12" y="34" width="136" height="68" rx="10" fill="#0F0B14" stroke="#3A2F48" stroke-width="2"/>
  <rect x="24" y="46" width="36" height="18" rx="3" fill="#231A2E"/>
  <path d="M24 55h36" stroke="#0F0B14"/>
  <path d="M33 55h18" stroke="#FFB547" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 5"/>
  <rect x="68" y="51" width="66" height="8" rx="4" fill="#3A2F48"/>
  <rect x="24" y="72" width="36" height="18" rx="3" fill="#231A2E"/>
  <path d="M24 81h36" stroke="#0F0B14"/>
  <path d="M33 81h18" stroke="#C4A8FF" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 5"/>
  <rect x="68" y="77" width="44" height="8" rx="4" fill="#3A2F48"/>
</svg>
```

## 9. CSS de referência (copiar para `css/style.css` da Agenda)

```css
/* =========================================================
   Agenda - folha de estilo
   Decisões em: docs/projetos/agenda/design.md (na Labs).
   Conceito: "quadro de partidas ao anoitecer".
   ========================================================= */


/* ---------------------------------------------------------
   1. VARIÁVEIS
   --------------------------------------------------------- */
:root {
  color-scheme: dark;            /* data, hora e barra de rolagem escuras */

  /* Fundos */
  --cor-fundo: #0F0B14;
  --cor-superficie: #191321;
  --cor-superficie-2: #231A2E;
  --cor-placa-baixo: #1D1626;

  /* Bordas: a "decorativa" é só enfeite (1.6:1).
     Campo e botão usam a "campo" (4.6:1, acima de 3:1). */
  --cor-borda: #3A2F48;
  --cor-borda-campo: #8A7A9C;

  /* Texto */
  --cor-texto: #F5EEE6;          /* 16.8:1 no fundo */
  --cor-texto-suave: #B8AAB9;    /* 8.7:1 no fundo */

  /* Cores de destaque */
  --cor-ambar: #FFB547;          /* horas, Hoje, botão principal */
  --cor-ambar-claro: #FFC970;
  --cor-lilas: #C4A8FF;          /* Dia todo, local, links */
  --cor-foco: #8FD3FF;           /* SÓ o contorno de foco */
  --cor-perigo: #FF7B7B;         /* erro e excluir */
  --cor-perigo-claro: #FF9A9A;
  --cor-sucesso: #8EE6A8;
  --cor-sobre-cor: #1A1205;      /* texto sobre âmbar e perigo */

  /* Tipografia */
  --fonte-display: "Exo 2", "Space Grotesk", system-ui, sans-serif;
  --fonte-texto: "Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --fonte-mono: "JetBrains Mono", ui-monospace, Consolas, "Courier New", monospace;

  --fs-xs: 0.75rem;     /* 12px */
  --fs-sm: 0.875rem;    /* 14px */
  --fs-base: 1rem;      /* 16px */
  --fs-md: 1.0625rem;   /* 17px */
  --fs-lg: 1.25rem;     /* 20px */
  --fs-xl: clamp(1.375rem, 1.1rem + 1.2vw, 1.75rem); /* 22 a 28px */

  /* Espaços (escala de 4px, igual à da Labs) */
  --esp-1: 0.25rem;
  --esp-2: 0.5rem;
  --esp-3: 0.75rem;
  --esp-4: 1rem;
  --esp-5: 1.5rem;
  --esp-6: 2rem;
  --esp-7: 3rem;
  --esp-8: 4rem;

  /* Raios */
  --raio-sm: 6px;
  --raio-md: 10px;
  --raio-lg: 16px;
  --raio-pill: 999px;

  /* Sombras */
  --sombra: 0 12px 32px rgba(0, 0, 0, 0.5);
  --brilho-ambar: 0 0 22px rgba(255, 181, 71, 0.35);

  /* Layout e animação */
  --largura-max: 760px;
  --transicao: 180ms ease;
}


/* ---------------------------------------------------------
   2. RESET
   --------------------------------------------------------- */
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

html {
  /* o cabeçalho gruda no topo: o foco e a rolagem param 80px abaixo */
  scroll-padding-top: 80px;
}

img,
svg {
  display: block;
  max-width: 100%;
}

button,
input,
textarea {
  font: inherit;
  color: inherit;
}

ul[class] {
  list-style: none;
  padding: 0;
}

a {
  color: var(--cor-lilas);
  text-underline-offset: 3px;
}

a:hover {
  color: var(--cor-texto);
}

[hidden] {
  display: none !important;   /* nenhuma regra de display "vence" o hidden */
}

/* Foco visível (teclado): azul-céu, a única coisa azul da tela */
:focus-visible {
  outline: 3px solid var(--cor-foco);
  outline-offset: 3px;
}

/* Texto só para leitor de tela */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}


/* ---------------------------------------------------------
   3. BASE E FUNDO ("anoitecer")
   Brilho âmbar no canto de cima (o "pôr do sol"), brilho lilás
   embaixo e linhas horizontais bem fracas (as fileiras do quadro).
   --------------------------------------------------------- */
body {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  font-family: var(--fonte-texto);
  font-size: var(--fs-base);
  line-height: 1.55;
  color: var(--cor-texto);
  background-color: var(--cor-fundo);
  background-image:
    radial-gradient(ellipse 70% 45% at 100% 0%, rgba(255, 181, 71, 0.10), transparent 70%),
    radial-gradient(ellipse 60% 40% at 0% 100%, rgba(196, 168, 255, 0.07), transparent 70%);
  background-attachment: fixed;
  overflow-x: hidden;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(245, 238, 230, 0.025) 0 1px,
    transparent 1px 56px
  );
  mask-image: linear-gradient(to bottom, #000, transparent 70%);
  -webkit-mask-image: linear-gradient(to bottom, #000, transparent 70%);
}

.container {
  width: 100%;
  max-width: var(--largura-max);
  margin-inline: auto;
  padding-inline: var(--esp-4);
}

@media (min-width: 640px) {
  .container {
    padding-inline: var(--esp-5);
  }
}

.principal {
  flex: 1;
  padding-block: var(--esp-5) var(--esp-7);
}

.icone {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Rótulo de seção: "PRÓXIMOS COMPROMISSOS" */
.secao-titulo {
  margin-bottom: var(--esp-4);
  font-family: var(--fonte-mono);
  font-size: var(--fs-xs);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--cor-texto-suave);
}


/* ---------------------------------------------------------
   4. CABEÇALHO
   --------------------------------------------------------- */
.cabecalho {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(15, 11, 20, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--cor-borda);
}

.cabecalho-conteudo {
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--esp-3);
}

.marca {
  display: flex;
  align-items: center;
  gap: var(--esp-2);
  min-width: 0;
}

.marca-icone {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.marca h1 {
  font-family: var(--fonte-display);
  font-size: var(--fs-xl);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0.02em;
}

/* Quadradinho âmbar depois de "Agenda" (enfeite) */
.marca h1::after {
  content: "";
  display: inline-block;
  width: 0.28em;
  height: 0.28em;
  margin-left: 0.12em;
  background: var(--cor-ambar);
  border-radius: 2px;
}

/* Abaixo de 480px o botão mostra só "Novo"; " compromisso"
   continua lá para o leitor de tela (mesma receita do .sr-only) */
@media (max-width: 479.98px) {
  .botao-novo-resto {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
}


/* ---------------------------------------------------------
   5. BOTÕES
   --------------------------------------------------------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--esp-2);
  min-height: 44px;
  padding: var(--esp-2) var(--esp-4);
  font-family: var(--fonte-texto);
  font-size: var(--fs-base);
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: var(--raio-pill);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color var(--transicao), border-color var(--transicao),
              box-shadow var(--transicao), transform var(--transicao);
}

/* Principal: âmbar com texto escuro (10.5:1) */
.btn-primario {
  color: var(--cor-sobre-cor);
  background: var(--cor-ambar);
}

.btn-primario:hover {
  color: var(--cor-sobre-cor);
  background: var(--cor-ambar-claro);
  box-shadow: var(--brilho-ambar);
  transform: translateY(-1px);
}

/* Secundário: só contorno (borda 4.6:1) */
.btn-secundario {
  color: var(--cor-texto);
  background: transparent;
  border-color: var(--cor-borda-campo);
}

.btn-secundario:hover {
  background: var(--cor-superficie-2);
  border-color: var(--cor-texto-suave);
}

/* Perigo: só no "Excluir" da confirmação */
.btn-perigo {
  color: var(--cor-sobre-cor);
  background: var(--cor-perigo);
}

.btn-perigo:hover {
  background: var(--cor-perigo-claro);
}

/* Apertado (vem depois do hover para vencer) */
.btn:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: none;
}

/* Botões pequenos do item: Editar e Excluir */
.botao-item {
  display: inline-flex;
  align-items: center;
  gap: var(--esp-2);
  min-height: 44px;
  min-width: 44px;
  padding: 0 var(--esp-3);
  font-size: var(--fs-sm);
  font-weight: 500;
  line-height: 1;
  color: var(--cor-texto-suave);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--raio-md);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color var(--transicao), background-color var(--transicao),
              border-color var(--transicao), transform var(--transicao);
}

.botao-item .icone {
  width: 18px;
  height: 18px;
}

.botao-item:hover {
  color: var(--cor-texto);
  background: var(--cor-superficie-2);
  border-color: var(--cor-borda);
}

.botao-item--perigo:hover {
  color: var(--cor-perigo);                 /* 6.7:1 */
  border-color: color-mix(in srgb, var(--cor-perigo) 50%, transparent);
}

.botao-item:active {
  transform: scale(0.97);
}


/* ---------------------------------------------------------
   6. AVISOS
   --------------------------------------------------------- */

/* 6.1 Faixas no topo (ficam até recarregar a página) */
.faixa {
  display: flex;
  align-items: flex-start;
  gap: var(--esp-3);
  margin-bottom: var(--esp-5);
  padding: var(--esp-3) var(--esp-4);
  font-size: var(--fs-sm);
  color: var(--cor-texto);
  border: 1px solid;
  border-radius: var(--raio-md);
}

.faixa .icone {
  margin-top: 1px;
}

.faixa--alerta {
  background: color-mix(in srgb, var(--cor-ambar) 12%, var(--cor-superficie));
  border-color: color-mix(in srgb, var(--cor-ambar) 60%, transparent);
}

.faixa--alerta .icone {
  color: var(--cor-ambar);
}

.faixa--erro {
  background: color-mix(in srgb, var(--cor-perigo) 12%, var(--cor-superficie));
  border-color: color-mix(in srgb, var(--cor-perigo) 60%, transparent);
}

.faixa--erro .icone {
  color: var(--cor-perigo);
}

/* 6.2 Aviso flutuante (região viva, role="status").
   Vazio = escondido. pointer-events: none = um toque "passa"
   por ele, então ele nunca bloqueia um botão. */
.status {
  position: fixed;
  left: 50%;
  bottom: max(var(--esp-4), env(safe-area-inset-bottom));
  z-index: 20;
  width: min(100% - 2rem, 30rem);
  padding: var(--esp-3) var(--esp-4);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--cor-texto);
  background: var(--cor-superficie-2);
  border: 1px solid var(--cor-borda-campo);
  border-left: 4px solid var(--cor-sucesso);
  border-radius: var(--raio-md);
  box-shadow: var(--sombra);
  transform: translateX(-50%);
  pointer-events: none;
  animation: status-entrar 200ms ease-out;
}

.status:empty {
  display: none;
}

.status[data-tipo="erro"] {
  border-left-color: var(--cor-perigo);
}

@keyframes status-entrar {
  from { opacity: 0; transform: translate(-50%, 8px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
}

/* Enquanto o aviso aparece, sobra espaço no fim da página:
   o rodapé e o último compromisso nunca ficam escondidos. */
body:has(.status:not(:empty)) {
  padding-bottom: 5.5rem;
}


/* ---------------------------------------------------------
   7. LISTA POR DIA
   --------------------------------------------------------- */
.dias {
  display: flex;
  flex-direction: column;
  gap: var(--esp-6);
}

.dia-titulo {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--esp-1) var(--esp-2);
  margin-bottom: var(--esp-3);
  padding-bottom: var(--esp-2);
  font-size: var(--fs-lg);
  font-weight: 700;
  line-height: 1.25;
  border-bottom: 1px solid var(--cor-borda);
}

/* "· daqui a 3 dias" */
.dia-contagem {
  font-family: var(--fonte-mono);
  font-size: var(--fs-sm);
  font-weight: 400;
  color: var(--cor-texto-suave);
}

/* Hoje: o único dia com cor */
.dia--hoje .dia-titulo {
  color: var(--cor-ambar);
  border-bottom-color: color-mix(in srgb, var(--cor-ambar) 45%, transparent);
}

.dia--hoje .dia-titulo::before {
  content: "";
  align-self: center;
  width: 8px;
  height: 8px;
  background: currentColor;
  border-radius: 2px;
}


/* ---------------------------------------------------------
   8. COMPROMISSO
   Celular: placa | texto, botões embaixo do texto.
   A partir de 640px: placa | texto | botões.
   --------------------------------------------------------- */
.compromissos {
  display: flex;
  flex-direction: column;
  gap: var(--esp-3);
}

.compromisso {
  display: grid;
  grid-template-columns: 4rem minmax(0, 1fr);
  gap: var(--esp-2) var(--esp-3);
  align-items: start;
  padding: var(--esp-3);
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio-lg);
  transition: border-color var(--transicao);
}

.compromisso:hover,
.compromisso:focus-within {
  border-color: color-mix(in srgb, var(--cor-ambar) 40%, var(--cor-borda));
}

/* Placa de hora: duas metades, como a plaquinha que vira */
.compromisso-hora {
  display: grid;
  place-items: center;
  min-height: 3.25rem;
  padding: var(--esp-1);
  font-family: var(--fonte-mono);
  font-size: var(--fs-md);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
  text-align: center;
  color: var(--cor-ambar);
  background: linear-gradient(to bottom, var(--cor-superficie-2) 50%, var(--cor-placa-baixo) 50%);
  border-radius: var(--raio-sm);
  box-shadow: inset 0 0 0 1px var(--cor-borda);
}

/* "DIA TODO" em duas linhas, lilás */
.compromisso-hora--dia-todo {
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cor-lilas);
}

.compromisso-corpo {
  display: flex;
  flex-direction: column;
  gap: var(--esp-1);
  min-width: 0;
  padding-top: 2px;
}

.compromisso-titulo {
  font-size: var(--fs-md);
  font-weight: 600;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.compromisso-local {
  display: flex;
  align-items: flex-start;
  gap: var(--esp-1);
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
  overflow-wrap: anywhere;
}

.compromisso-local .icone {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  color: var(--cor-lilas);
}

/* Observação: respeita as quebras de linha digitadas */
.compromisso-obs {
  margin-top: var(--esp-1);
  padding-left: var(--esp-2);
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
  white-space: pre-line;
  overflow-wrap: anywhere;
  border-left: 2px solid var(--cor-borda);
}

/* Botões: embaixo do texto. A margem negativa alinha o texto
   "Editar" com o título (o botão tem 12px de espaço interno). */
.compromisso-acoes {
  grid-column: 2;
  display: flex;
  flex-wrap: wrap;
  gap: var(--esp-2);
  margin-left: calc(-1 * var(--esp-3));
}

@media (min-width: 640px) {
  .compromisso {
    grid-template-columns: 4.75rem minmax(0, 1fr) auto;
    gap: var(--esp-4);
    padding: var(--esp-4);
  }

  .compromisso-acoes {
    grid-column: 3;
    grid-row: 1;
    flex-wrap: nowrap;
    margin-left: 0;
  }
}


/* ---------------------------------------------------------
   9. LISTA VAZIA
   --------------------------------------------------------- */
.vazio {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--esp-3);
  padding: var(--esp-7) var(--esp-5);
  text-align: center;
  background: var(--cor-superficie);
  border: 1px dashed var(--cor-borda-campo);
  border-radius: var(--raio-lg);
}

.vazio-ilustracao {
  width: 160px;
  height: auto;
  margin-bottom: var(--esp-2);
}

.vazio-titulo {
  font-size: var(--fs-lg);
  font-weight: 700;
}

.vazio-texto {
  max-width: 32ch;
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
}

.vazio .btn {
  margin-top: var(--esp-2);
}


/* ---------------------------------------------------------
   10. ANTERIORES
   --------------------------------------------------------- */
.anteriores {
  margin-top: var(--esp-7);
  padding-top: var(--esp-5);
  border-top: 1px dashed var(--cor-borda);
}

.anteriores-titulo {
  font-size: inherit;           /* o h2 é só o "envelope" do botão */
}

.anteriores-botao {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--esp-3);
  width: 100%;
  min-height: 52px;
  padding: var(--esp-3) var(--esp-4);
  font-size: var(--fs-base);
  font-weight: 600;
  text-align: left;
  color: var(--cor-texto);
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda-campo);
  border-radius: var(--raio-lg);
  cursor: pointer;
  transition: background-color var(--transicao);
}

.anteriores-botao:hover {
  background: var(--cor-superficie-2);
}

.anteriores-contagem {
  font-family: var(--fonte-mono);
  font-weight: 400;
  color: var(--cor-texto-suave);
}

.anteriores-seta {
  transition: transform var(--transicao);
}

.anteriores-botao[aria-expanded="true"] .anteriores-seta {
  transform: rotate(180deg);
}

.anteriores-lista {
  margin-top: var(--esp-5);
}

/* Dentro de Anteriores: tudo mais calmo (por cor, nunca por opacity) */
.anteriores .dia-titulo {
  font-size: var(--fs-base);
  color: var(--cor-texto-suave);
}

.compromisso--anterior {
  background: transparent;
  border-style: dashed;
}

.compromisso--anterior .compromisso-hora {
  color: var(--cor-texto-suave);
  background: var(--cor-superficie-2);
}


/* ---------------------------------------------------------
   11. JANELAS (dialog): formulário e confirmação
   --------------------------------------------------------- */
.janela {
  width: min(100% - 2rem, 32rem);
  max-width: none;
  max-height: calc(100vh - 2rem);
  max-height: calc(100dvh - 2rem);
  margin: auto;
  padding: 0;
  color: var(--cor-texto);
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda);
  border-top: 3px solid var(--cor-ambar);
  border-radius: var(--raio-lg);
  box-shadow: var(--sombra);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.janela::backdrop {
  background: rgba(8, 5, 12, 0.72);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.janela[open] {
  animation: janela-abrir 180ms ease-out;
}

@keyframes janela-abrir {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to   { opacity: 1; transform: none; }
}

.janela-conteudo {
  display: flex;
  flex-direction: column;
  gap: var(--esp-4);
  padding: var(--esp-5);
}

.janela-titulo {
  font-size: var(--fs-lg);
  font-weight: 700;
  line-height: 1.25;
}

/* Barra de botões grudada no fim da janela (a janela é quem rola).
   As margens negativas "anulam" o padding do .janela-conteudo,
   então a barra encosta nas bordas e no fim da janela. */
.janela-acoes {
  position: sticky;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--esp-3);
  margin: var(--esp-2) calc(-1 * var(--esp-5)) calc(-1 * var(--esp-5));
  padding: var(--esp-4) var(--esp-5);
  background: var(--cor-superficie);
  border-top: 1px solid var(--cor-borda);
}

.janela-acoes .btn {
  flex: 1 1 8rem;               /* celular: dividem a largura */
}

@media (min-width: 480px) {
  .janela-acoes .btn {
    flex: 0 0 auto;
    min-width: 7.5rem;
  }
}

/* --- Campos --- */
.campo {
  display: flex;
  flex-direction: column;
  gap: var(--esp-1);
  min-width: 0;
}

.campo-rotulo {
  font-size: var(--fs-sm);
  font-weight: 600;
}

.campo-obrigatorio {
  font-weight: 400;
  color: var(--cor-texto-suave);
}

.campo-controle {
  display: block;
  width: 100%;
  min-width: 0;
  min-height: 48px;
  padding: var(--esp-3);
  font-family: var(--fonte-texto);
  font-size: var(--fs-base);     /* 16px: sem zoom no celular */
  line-height: 1.4;
  color: var(--cor-texto);
  background: var(--cor-fundo);
  border: 1px solid var(--cor-borda-campo);
  border-radius: var(--raio-md);
  transition: border-color var(--transicao);
}

.campo-controle:hover {
  border-color: var(--cor-texto-suave);
}

.campo-controle:focus-visible {
  outline: 3px solid var(--cor-foco);
  outline-offset: 2px;
  border-color: var(--cor-foco);
}

textarea.campo-controle {
  min-height: 6.5rem;
  resize: vertical;
}

/* Data e hora com números alinhados */
.campo-controle[type="date"],
.campo-controle[type="time"] {
  font-variant-numeric: tabular-nums;
}

.campo-dica {
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
}

/* Erro: texto + ícone + borda 2px + fundo (nunca só a cor) */
.campo-erro {
  display: flex;
  align-items: flex-start;
  gap: var(--esp-1);
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--cor-perigo);       /* 7.2:1 na janela */
}

.campo-erro .icone {
  width: 18px;
  height: 18px;
  margin-top: 1px;
}

.campo-controle[aria-invalid="true"] {
  padding: calc(var(--esp-3) - 1px);   /* compensa a borda mais grossa */
  background: color-mix(in srgb, var(--cor-perigo) 8%, var(--cor-fundo));
  border: 2px solid var(--cor-perigo);
}

/* Data e Hora lado a lado a partir de 480px */
.campos-linha {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--esp-4);
}

@media (min-width: 480px) {
  .campos-linha {
    grid-template-columns: 1fr 1fr;
  }
}

/* --- Confirmação de exclusão --- */
.janela--confirmar {
  width: min(100% - 2rem, 26rem);
  border-top-color: var(--cor-perigo);
}

.confirmar-icone {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  color: var(--cor-perigo);
  background: color-mix(in srgb, var(--cor-perigo) 14%, transparent);
  border-radius: 50%;
}

.confirmar-icone .icone {
  width: 24px;
  height: 24px;
}

.confirmar-titulo {
  font-size: var(--fs-lg);
  font-weight: 700;
  line-height: 1.3;
  overflow-wrap: anywhere;      /* título longo quebra */
}

.confirmar-texto {
  color: var(--cor-texto-suave);
}


/* ---------------------------------------------------------
   12. RODAPÉ (no fim da página, nunca fixo)
   --------------------------------------------------------- */
.rodape {
  margin-top: var(--esp-7);
  padding-block: var(--esp-5);
  font-family: var(--fonte-mono);
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
  border-top: 1px solid var(--cor-borda);
}

.rodape-conteudo {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--esp-2) var(--esp-5);
}

.rodape-aviso {
  display: flex;
  align-items: flex-start;
  gap: var(--esp-2);
}

.rodape-aviso .icone {
  width: 16px;
  height: 16px;
  margin-top: 2px;
}


/* ---------------------------------------------------------
   13. MOVIMENTO REDUZIDO
   --------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .btn:hover,
  .btn:active,
  .botao-item:active {
    transform: none;
  }
}


/* ---------------------------------------------------------
   14. ALTO CONTRASTE DO WINDOWS
   As cores somem; garantimos as bordas que separam as coisas.
   --------------------------------------------------------- */
@media (forced-colors: active) {
  .btn,
  .botao-item,
  .compromisso-hora,
  .campo-controle,
  .anteriores-botao {
    border: 1px solid ButtonText;
  }

  .campo-controle[aria-invalid="true"] {
    border-width: 2px;
  }
}
```

## 10. Conferência final (para o dev e o testador)

| Requisito | Como o visual atende |
|---|---|
| 360px sem rolagem horizontal | `minmax(0, 1fr)`, `overflow-wrap: anywhere` em título, local, observação e confirmação; `overflow-x: hidden` no `body`; janelas com `width: min(100% - 2rem, ...)` |
| Toque de 44 × 44px | `.btn`, `.botao-item` (44px), `.anteriores-botao` (52px), campos (48px) |
| Campos com 16px | `.campo-controle` com `--fs-base` |
| Janelas cabem a 360px e rolam por dentro | `max-height` da tela − 32px e `overflow-y: auto`; botões grudados no fim |
| Foco visível | contorno azul-céu de 3px em tudo (11:1) |
| Nada só por cor | "DIA TODO", "(obrigatório)", mensagens de erro, "Excluir", `aria-expanded` + seta |
| Rodapé nunca cobre nada | rodapé estático no fim; aviso flutuante sem clique e com espaço reservado |
| `prefers-reduced-motion` | seção 13 do CSS |

## 11. Decisões aprovadas pelo João (2026-11-04)

1. **Botão do topo no celular:** abaixo de 480px ele mostra só "+ Novo" (o leitor de tela continua ouvindo "Novo compromisso"). Com o texto inteiro, o botão não cabe ao lado do nome "Agenda" a 360px. **Aprovado.**
2. **Clima "quadro de partidas ao anoitecer"**, com âmbar e lilás no lugar do ciano, roxo e magenta da Labs. **Aprovado.**
3. **Link no rodapé:** "Um projeto da João Saccucci Labs", apontando para a Labs publicada. **Aprovado.** O dev confere o endereço real da Labs antes de usar.

---

## 12. Etapa 2 — Entrega 2a (cópia dos dados)

Cobre a **Agenda US08** (baixar cópia), a **US09** (importar), a **US10** (lembrete de cópia) e a mudança da US07 da Entrega 2a. Nada da Entrega 2b está aqui. Tudo o que vem abaixo **se soma** às seções 1 a 11: as cores, as fontes, os espaços, as janelas, os botões e as faixas continuam os mesmos.

### 12.1 Ideia visual

No "quadro de partidas", a cópia dos dados é o **guarda-volumes da estação**: um lugar calmo, fora da lista, para guardar e trazer de volta a bagagem (os compromissos). Por isso:
- A janela "Seus dados" usa a **mesma janela** do formulário (borda de cima âmbar) e mostra a "Última cópia" numa **placa** de duas metades, igual à placa de hora dos compromissos.
- O lembrete de cópia é uma faixa **lilás** (a cor calma, do "sem hora"), diferente da faixa âmbar de problema. Ele é um lembrete, não um erro, e também diz isso em texto ("LEMBRETE DE CÓPIA").
- Só a ação que apaga ("Substituir") usa vermelho cheio, como o "Excluir" da Etapa 1.

### 12.2 Reaproveitado x novo

| Parte | Reaproveita | Novo (e por quê) |
|---|---|---|
| Botão "Seus dados" | `.btn .btn-secundario`, ícone 20px, receita "esconde só da tela" do `.botao-novo-resto` | `.cabecalho-acoes` (agrupa os dois botões do topo) e `.botao-dados` (versão redonda só com ícone abaixo de 640px). Sem isso o botão não cabe a 360px. |
| Janela "Seus dados" | `.janela`, `.janela-conteudo`, `.janela-titulo`, `.janela-acoes`, `.confirmar-icone`, `.confirmar-texto`, `.campo-dica`, `.btn-primario`, `.btn-secundario` | `.confirmar-icone--ambar` (o círculo da confirmação, em âmbar: não é perigo); `.dados-placa` (a "Última cópia" no visual de placa); `.dados-acoes` (os dois botões grandes); `.janela-aviso` (região de avisos **dentro** da janela, ver 12.6) |
| Avisos dentro da janela | `.faixa`, `.faixa--erro`, `.faixa--alerta`, ícone "alerta" | `.faixa--sucesso` (verde, para "Cópia baixada." dentro da janela; o verde já existia na barrinha do aviso flutuante) |
| Janela de escolha da importação | `.janela`, `.janela-acoes`, `.btn-primario`, `.confirmar-icone--ambar` | `.importar-resumo`, `.opcoes`/`.opcao` (botão + explicação embaixo) e `.btn-perigo-contorno` ("Substituir tudo" leva a uma ação perigosa, mas ainda não apaga nada: contorno vermelho, não cheio) |
| Confirmação de "Substituir tudo" | `.janela--confirmar`, `.confirmar-icone`, `.confirmar-titulo`, `.confirmar-texto`, `.btn-perigo` (tudo igual à exclusão) | só o ícone "substituir" |
| Faixa de lembrete | `.faixa`, `#faixas`, `.btn-primario`, `.btn-secundario` | `.faixa--lembrete` e as partes internas (`.faixa-corpo`, `.faixa-rotulo`, `.faixa-texto`, `.faixa-destaque`, `.faixa-acoes`): é a primeira faixa com botões |
| Ícones | estilo da seção 8.2 | dados, baixar, importar, histórico, juntar, substituir (12.8) |

Nenhuma cor nova: tudo sai das variáveis da seção 2 (as cores de fundo novas são misturas com `color-mix`, como as faixas que já existem).

### 12.3 Botão "Seus dados" no cabeçalho (US08)

**Posição:** à direita, **antes** do "+ Novo". O "+ Novo" continua na ponta (é a ação principal, o polegar acha no mesmo lugar). Ordem do Tab: "Seus dados" → "Novo compromisso".

**Visual:** botão secundário (só contorno, pílula), com o ícone "dados" (um cilindro, o símbolo mais conhecido de "dados guardados").
- **Abaixo de 640px:** só o ícone, num círculo de **44 × 44px**. O texto "Seus dados" continua no HTML, escondido só da tela: o nome acessível é sempre "Seus dados".
- **A partir de 640px:** ícone + "Seus dados".

**Conta a 360px** (328px úteis): marca (ícone 32 + 8 + "Agenda▪" ≈ 90) ≈ 130px · vão 12px · "Seus dados" 44px · vão 8px · "+ Novo" ≈ 100px = **≈ 294px**. Sobram ~34px; não quebra.
**Conta a 480px** (448px úteis), com "+ Novo compromisso" inteiro (≈ 205px): 130 + 12 + 44 + 8 + 205 = **399px**. Cabe. Com o texto "Seus dados" (≈ 145px) **não** caberia, por isso o texto só aparece a partir de 640px (592px úteis: 130 + 12 + 145 + 8 + 205 = 500px).

```
360px                                    ≥ 640px
+--------------------------------------+ +-------------------------------------------------------------+
| [ic] Agenda▪          (≡)  [+ Novo]  | | [ic] Agenda▪          [(≡) Seus dados] [+ Novo compromisso] |
+--------------------------------------+ +-------------------------------------------------------------+
   (≡) = círculo 44px com o ícone "dados"
```

```html
<header class="cabecalho">
  <div class="container cabecalho-conteudo">
    <div class="marca"><!-- igual --></div>

    <div class="cabecalho-acoes">
      <button class="btn btn-secundario botao-dados" type="button" id="botao-dados">
        <!-- svg "dados" (12.8) -->
        <span class="botao-dados-texto">Seus dados</span>
      </button>
      <button class="btn btn-primario botao-novo" type="button" id="botao-novo"><!-- igual --></button>
    </div>
  </div>
</header>
```

- Sem `aria-label` e sem `title`: o nome vem do `<span>` (escondido só da tela no celular), do mesmo jeito do "Novo compromisso".
- Contraste: borda `#8A7A9C` sobre o cabeçalho no canto do brilho âmbar (≈`#271C19`) = **4.2:1** (mínimo 3:1); ícone `#F5EEE6` sobre o mesmo fundo = **14.5:1**. Hover: fundo `#231A2E`, borda `#B8AAB9`.
- Não tem bolinha de "atenção" quando a cópia está atrasada: quem avisa é a faixa (12.7), em texto.

### 12.4 Janela "Seus dados" (US08 e começo da US09)

`dialog` com `showModal()`, largura padrão da `.janela` (até 512px), borda de cima âmbar. Esc e "Fechar" fecham; o foco volta para o botão "Seus dados".

```
360px
+------------------------------------+  borda de cima âmbar 3px
|  (≡)                               |  círculo âmbar 48px (enfeite)
|  Seus dados                        |  h2 20px 700
|                                    |
|  Seus compromissos ficam guardados |  texto suave 16px
|  só neste navegador. Baixe uma     |
|  cópia de vez em quando para não   |
|  perder nada e para levar a agenda |
|  para outro aparelho.              |
|                                    |
| +--------------------------------+ |  placa (duas metades)
| | ÚLTIMA CÓPIA        05/11/2026 | |  rótulo mono 12px | data mono âmbar 17px
| +--------------------------------+ |
|                                    |
| [ (↓) Baixar cópia               ] |  principal âmbar, largura toda
| [ (↑) Importar cópia             ] |  secundário, largura toda
|  Escolha um arquivo .json baixado  |  dica 14px suave
|  pela Agenda.                      |
|                                    |
| (✓) Cópia baixada.                 |  aviso dentro da janela (só quando há)
|------------------------------------|
| [            Fechar              ] |  barra grudada no fim
+------------------------------------+
```

Sem nenhuma cópia, a placa vira uma linha de texto com o ícone "alerta" em âmbar:
```
| +--------------------------------+ |
| | (!) Você ainda não fez nenhuma | |
| |     cópia.                     | |
| +--------------------------------+ |
```

A partir de 480px, "Baixar cópia" e "Importar cópia" ficam **lado a lado** (duas colunas iguais) e "Fechar" vai para a direita da barra, como nas outras janelas.

```html
<dialog class="janela" id="janela-dados" aria-labelledby="dados-titulo" aria-describedby="dados-texto">
  <div class="janela-conteudo">
    <span class="confirmar-icone confirmar-icone--ambar" aria-hidden="true"><!-- svg "dados" --></span>
    <h2 class="janela-titulo" id="dados-titulo">Seus dados</h2>
    <p class="confirmar-texto" id="dados-texto">Seus compromissos ficam guardados só neste navegador. Baixe uma cópia de vez em quando para não perder nada e para levar a agenda para outro aparelho.</p>

    <!-- Com cópia: mostra .dados-placa-data. Sem cópia: mostra .dados-placa-nunca. -->
    <div class="dados-placa" id="dados-ultima">
      <p class="dados-placa-data">
        <span class="dados-placa-rotulo">Última cópia<span class="sr-only">:</span></span>
        <time class="dados-placa-valor" id="dados-ultima-valor" datetime="2026-11-05T21:10">05/11/2026</time>
      </p>
      <p class="dados-placa-nunca" hidden>
        <!-- svg "alerta" -->
        <span>Você ainda não fez nenhuma cópia.</span>
      </p>
    </div>

    <div class="dados-acoes">
      <button class="btn btn-primario" type="button" id="botao-baixar" autofocus><!-- svg "baixar" -->Baixar cópia</button>
      <button class="btn btn-secundario" type="button" id="botao-importar" aria-describedby="dica-importar"><!-- svg "importar" -->Importar cópia</button>
    </div>
    <p class="campo-dica" id="dica-importar">Escolha um arquivo .json baixado pela Agenda.</p>

    <!-- seletor de arquivo: nunca aparece; o botão "Importar cópia" chama .click() nele -->
    <input type="file" id="arquivo-importar" accept=".json,application/json" hidden>

    <!-- Avisos da janela. SEMPRE no HTML (região viva), vazio quando não há aviso.
         O JS coloca dentro um <p class="faixa faixa--..."> (12.6). -->
    <div class="janela-aviso" id="dados-aviso" aria-live="polite"></div>

    <div class="janela-acoes">
      <button class="btn btn-secundario" type="button" data-acao="fechar">Fechar</button>
    </div>
  </div>
</dialog>
```

**Foco e teclado**
- Ao abrir: o foco vai para **"Baixar cópia"** (a ação mais comum; nada aqui apaga dados). O leitor de tela lê o título e o texto (`aria-labelledby` + `aria-describedby`).
- Ordem do Tab: Baixar cópia → Importar cópia → Fechar (e volta, preso na janela).
- Depois de "Baixar cópia": o foco **fica** no botão. A placa troca para a nova data e a região `#dados-aviso` recebe "Cópia baixada.".
- Depois do seletor de arquivos (escolheu, cancelou ou deu erro): o foco fica em "Importar cópia".
- Ao abrir a janela de novo, a região `#dados-aviso` começa vazia.
- Dica para o dev: depois de ler o arquivo, limpar `input.value = ""`, senão escolher o mesmo arquivo de novo não dispara o evento.

**A placa "Última cópia"**: a data é escrita `DD/MM/AAAA`. O leitor de tela ouve "Última cópia: 05/11/2026" (o ":" está em `sr-only`, porque na tela o rótulo em maiúsculas fica melhor sem ele). Sem cópia, ouve "Você ainda não fez nenhuma cópia.", exatamente o texto da US08.

### 12.5 Fluxo da importação (US09)

```
"Seus dados"  --Importar cópia-->  seletor do sistema (.json)
                                      |
             cancelou: nada acontece  |  escolheu
                                      v
                    lê o arquivo e confere tudo (sem mudar nada)
                     |                                  |
            erro (12.6): aviso vermelho          ok: abre a janela
            dentro de "Seus dados",              "Importar cópia" POR CIMA
            foco em "Importar cópia"             de "Seus dados", foco em "Juntar"
                                                   |               |
                                                Juntar      Substituir tudo
                                                   |               |
                                                   |        confirmação POR CIMA,
                                                   |        foco em "Cancelar"
                                                   |               | Substituir
                                                   v               v
                                  fecha TODAS as janelas, redesenha a lista,
                                  aviso flutuante "Cópia importada: ..."
                                  e o foco volta para o botão "Seus dados"
```

- As janelas ficam **empilhadas** (`showModal()` numa janela com outra já aberta funciona: a de cima fica na frente). Esc fecha só a de cima e o foco volta para o botão que a abriu ("Substituir tudo" ou "Importar cópia").
- Por que fechar tudo no fim: a pessoa quer **ver** os compromissos que chegaram. Com as janelas fechadas, o aviso flutuante volta a ser lido pelo leitor de tela (ver 12.6). Dica para o dev: fechar as janelas **antes** de escrever o texto no `#status`.

#### Janela de escolha "Importar cópia"

```
360px
+------------------------------------+  borda de cima âmbar
|  (↑)                               |  círculo âmbar 48px
|  Importar cópia                    |  h2
|                                    |
|  Esta cópia tem 12 compromissos.   |  16px; "12" em mono âmbar 600
|  (!) 2 itens com problema foram    |  14px suave, ícone âmbar
|      ignorados.                    |  (só se houver ignorados)
|  Neste navegador há 8 compromissos.|  14px suave
|                                    |
|  O que fazer com eles?             |  16px 600
|                                    |
| [ (Y) Juntar                     ] |  principal âmbar, largura toda
|  Acrescenta os da cópia e mantém   |  14px suave
|  os que já estão aqui. Nada é      |
|  apagado.                          |
|                                    |
| [ (⇄) Substituir tudo            ] |  contorno VERMELHO, texto branco
|  Troca os 8 compromissos daqui     |  14px suave
|  pelos 12 da cópia.                |
|------------------------------------|
| [            Cancelar            ] |  barra grudada no fim
+------------------------------------+
```

Igual em todas as larguras (a janela tem no máximo 512px; os botões continuam um embaixo do outro, cada um com a sua explicação logo abaixo). Ordem do Tab: Juntar → Substituir tudo → Cancelar.

```html
<dialog class="janela" id="janela-importar" aria-labelledby="importar-titulo" aria-describedby="importar-resumo">
  <div class="janela-conteudo">
    <span class="confirmar-icone confirmar-icone--ambar" aria-hidden="true"><!-- svg "importar" --></span>
    <h2 class="janela-titulo" id="importar-titulo">Importar cópia</h2>

    <div class="importar-resumo" id="importar-resumo">
      <p>Esta cópia tem <span class="importar-numero">12</span> compromissos.</p>
      <p class="importar-ignorados"><!-- svg "alerta" --><span>2 itens com problema foram ignorados.</span></p>
      <p class="importar-atual">Neste navegador há 8 compromissos.</p>
    </div>

    <p class="importar-pergunta">O que fazer com eles?</p>

    <div class="opcoes">
      <div class="opcao">
        <button class="btn btn-primario" type="button" data-acao="juntar" aria-describedby="opcao-juntar-texto" autofocus><!-- svg "juntar" -->Juntar</button>
        <p class="opcao-texto" id="opcao-juntar-texto">Acrescenta os da cópia e mantém os que já estão aqui. Nada é apagado.</p>
      </div>
      <div class="opcao">
        <button class="btn btn-perigo-contorno" type="button" data-acao="substituir" aria-describedby="opcao-substituir-texto"><!-- svg "substituir" -->Substituir tudo</button>
        <p class="opcao-texto" id="opcao-substituir-texto">Troca os 8 compromissos daqui pelos 12 da cópia.</p>
      </div>
    </div>

    <div class="janela-acoes">
      <button class="btn btn-secundario" type="button" data-acao="cancelar">Cancelar</button>
    </div>
  </div>
</dialog>
```

- O resumo junta as frases da US09 ("Esta cópia tem 12 compromissos. 2 itens com problema foram ignorados.") e acrescenta "Neste navegador há 8 compromissos." para a pessoa comparar antes de escolher. A linha de ignorados só existe se houver ignorados.
- "Juntar" e "Substituir tudo" se diferenciam por **texto** (nome e explicação), por ícone e por cor; nunca só pela cor.

#### Confirmação "Substituir tudo?"

A mesma janela da exclusão (seção 6.6 e 7.8), só com outro texto e outro ícone:

```
+--------------------------------+  borda de cima VERMELHA
|  (⇄)                           |  círculo vermelho claro
|  Substituir tudo?              |  h2 20px 700
|  Os 8 compromissos atuais serão|  suave
|  trocados pelos 12 da cópia.   |
|  Essa ação não pode ser        |
|  desfeita.                     |
|--------------------------------|
| [ Cancelar ]  [ (⇄) Substituir]|  Cancelar com o foco; Substituir vermelho cheio
+--------------------------------+
```

```html
<dialog class="janela janela--confirmar" id="janela-substituir" aria-labelledby="substituir-titulo" aria-describedby="substituir-texto">
  <div class="janela-conteudo">
    <span class="confirmar-icone" aria-hidden="true"><!-- svg "substituir" --></span>
    <h2 class="confirmar-titulo" id="substituir-titulo">Substituir tudo?</h2>
    <p class="confirmar-texto" id="substituir-texto">Os 8 compromissos atuais serão trocados pelos 12 da cópia. Essa ação não pode ser desfeita.</p>
    <div class="janela-acoes">
      <button class="btn btn-secundario" type="button" data-acao="cancelar" autofocus>Cancelar</button>
      <button class="btn btn-perigo" type="button" data-acao="confirmar-substituir"><!-- svg "substituir" -->Substituir</button>
    </div>
  </div>
</dialog>
```

#### Singular e plural (para os textos com número)

| Quantidade | Texto |
|---|---|
| 1 na cópia | "Esta cópia tem 1 compromisso." |
| 1 ignorado | "1 item com problema foi ignorado." |
| 1 neste navegador | "Neste navegador há 1 compromisso." |
| 0 neste navegador | "Neste navegador não há compromissos." (sugestão) |
| Confirmação com 1 atual | "O compromisso atual será trocado pelos 12 da cópia. Essa ação não pode ser desfeita." (sugestão) |
| Resultado do Juntar | "Cópia importada: 1 novo e 1 atualizado." / "Cópia importada: 5 novos." (sem a parte do zero) / com 0 e 0: "Cópia importada: nada mudou, você já tinha esses compromissos." (sugestão) |

As linhas marcadas "sugestão" não estão nos requisitos: o João (ou o PO) confirma.

### 12.6 Mensagens: onde cada uma aparece

**Por que existe a `.janela-aviso`:** com uma janela aberta por `showModal()`, o resto da página fica "inerte" e coberto pelo fundo escurecido. O aviso flutuante (`#status`) fica atrás da janela, e o leitor de tela pode **não** ler uma região viva que está na parte inerte. Então, **enquanto a janela "Seus dados" estiver aberta**, os avisos aparecem **dentro dela**, na região `#dados-aviso` (o mesmo jeito do `#faixas`: um `div` vivo, sempre no HTML, onde o JS coloca uma `.faixa`). Com as janelas fechadas, vale o aviso flutuante de sempre.

| Situação | Onde | Estilo | Texto |
|---|---|---|---|
| Baixou pela janela | `#dados-aviso` | `.faixa--sucesso` + ícone "check" | "Cópia baixada." |
| Baixou pela faixa de lembrete | `#status` (flutuante) | sucesso | "Cópia baixada." |
| Nenhum compromisso para copiar | `#dados-aviso` (ou `#status`, se veio da faixa; mas a faixa nem aparece sem compromissos) | `.faixa--alerta` + "alerta" | "Não há compromissos para copiar." |
| Arquivo maior que 5 MB | `#dados-aviso` | `.faixa--erro` + "alerta" | "Arquivo grande demais para ser uma cópia da Agenda." |
| Não é JSON ou não tem `compromissos` | `#dados-aviso` | `.faixa--erro` | "Este arquivo não é uma cópia da Agenda." |
| Versão mais nova | `#dados-aviso` | `.faixa--erro` | "Esta cópia é de uma versão mais nova da Agenda." |
| Nenhum item válido | `#dados-aviso` | `.faixa--erro` | "Nenhum compromisso válido nesta cópia." |
| Itens ignorados (mas há válidos) | resumo da janela "Importar cópia" | linha com ícone "alerta" âmbar | "2 itens com problema foram ignorados." |
| `localStorage` cheio/indisponível ao importar | fecha "Importar cópia" e a confirmação, volta para "Seus dados": `#dados-aviso`, foco em "Importar cópia" | `.faixa--erro` | "Não foi possível importar a cópia neste navegador." |
| Importou (Juntar) | `#status`, depois de fechar as janelas | sucesso | "Cópia importada: 5 novos e 2 atualizados." |
| Importou (Substituir) | `#status`, depois de fechar as janelas | sucesso | "Cópia importada: 12 compromissos." |
| "Depois" na faixa | `#status` | sucesso | "Lembrete adiado por 7 dias." (**sugestão**, não está na US10) |

Exemplo do que o JS coloca na região (o texto sempre com `textContent`):
```html
<div class="janela-aviso" id="dados-aviso" aria-live="polite">
  <p class="faixa faixa--erro"><!-- svg "alerta" --><span>Este arquivo não é uma cópia da Agenda.</span></p>
</div>
```
- Um aviso por vez: o novo **substitui** o anterior (`replaceChildren`).
- Erro = fundo vermelho + borda vermelha + ícone + texto; sucesso = fundo verde + ícone de check + texto. O tipo nunca depende só da cor.
- A região não usa `display: none` quando vazia (um leitor de tela pode ignorar uma região viva que estava escondida); o CSS só tira o espaço dela (12.9).

### 12.7 Faixa de lembrete de cópia (US10)

Fica no `#faixas`, no topo do conteúdo, **sempre depois** das faixas de problema da US07 (se houver alguma). Na prática elas quase nunca aparecem juntas (sem `localStorage` ou com dado corrompido não há compromissos salvos, então a faixa de lembrete nem aparece), mas a ordem fica definida: **problema primeiro, lembrete por último**, com o espaço normal entre faixas (24px).

```
360px
+--------------------------------------+
| [ic] Agenda▪          (≡)  [+ Novo]  |
+--------------------------------------+
| ┃ (⟲) LEMBRETE DE CÓPIA              |  faixa lilás, filete de 4px à esquerda
| ┃     Sua última cópia foi há        |  16px 600 branco
| ┃     42 dias.                       |  "42 dias" em mono âmbar
| ┃     Baixe uma cópia para não       |  14px suave (sugestão)
| ┃     perder nada se o navegador     |
| ┃     for limpo.                     |
| ┃ [ (↓) Baixar cópia agora ]         |  principal âmbar
| ┃ [ Depois ]                         |  secundário
|                                      |      (os dois dividem a linha se couberem;
| PRÓXIMOS COMPROMISSOS                |       senão, um embaixo do outro, largura toda)
| ▪ Hoje                               |
| ...                                  |

≥ 640px
| ┃ (⟲) LEMBRETE DE CÓPIA                     [(↓) Baixar cópia agora] [Depois] |
| ┃     Sua última cópia foi há 42 dias.                                         |
| ┃     Baixe uma cópia para não perder nada se o navegador for limpo.           |
```

Sem nenhuma cópia, a linha principal é "Você ainda não fez uma cópia dos seus compromissos." (sem destaque âmbar).

```html
<!-- dentro de #faixas, sempre depois das faixas de problema -->
<div class="faixa faixa--lembrete" id="faixa-lembrete">
  <!-- svg "historico" -->
  <div class="faixa-corpo">
    <p class="faixa-rotulo">Lembrete de cópia</p>
    <p class="faixa-texto">Sua última cópia foi há <span class="faixa-destaque">42 dias</span>.</p>
    <p class="faixa-subtexto">Baixe uma cópia para não perder nada se o navegador for limpo.</p>
  </div>
  <div class="faixa-acoes">
    <button class="btn btn-primario" type="button" data-acao="lembrete-baixar"><!-- svg "baixar" -->Baixar cópia agora</button>
    <button class="btn btn-secundario" type="button" data-acao="lembrete-depois">Depois<span class="sr-only">, lembrar daqui a 7 dias</span></button>
  </div>
</div>
```

- **Não rouba o foco:** aparece ao abrir a página, sem `autofocus` e sem `.focus()`. Quem usa teclado chega nela pelo Tab logo depois do cabeçalho (ela é a primeira coisa do `main`).
- O nome acessível de "Depois" fica "Depois, lembrar daqui a 7 dias" (começa com o texto visível, bom para comando de voz).
- **Quando a faixa some** ("Baixar cópia agora" ou "Depois"), o foco iria para o nada. Regra: se o foco estava dentro da faixa, ele vai para o título "Próximos compromissos" (`<h2 id="titulo-proximos" tabindex="-1">`), que é o que vem logo depois. Assim ele nunca se perde no topo da página (mesma ideia da US05).
- **Sugestão:** baixar a cópia pela janela "Seus dados" também tira a faixa (a condição dela deixou de valer).
- Sem animação de entrada (ela aparece com a página; nada se mexe sozinho).
- O "LEMBRETE DE CÓPIA" em texto separa esta faixa das faixas de problema, além da cor lilás e do ícone diferente.

### 12.8 Ícones novos (mesmo padrão da 8.2: `viewBox="0 0 24 24"`, traço 2, `currentColor`, `aria-hidden="true" focusable="false"`)

| Nome | Onde | Miolo |
|---|---|---|
| dados | botão "Seus dados", círculo da janela | `<ellipse cx="12" cy="5.5" rx="7.5" ry="2.5"/><path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13"/><path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5"/>` |
| baixar | "Baixar cópia", "Baixar cópia agora" | `<path d="M12 4v11M7 10l5 5 5-5"/><path d="M5 20h14"/>` |
| importar | "Importar cópia", círculo da janela de escolha | `<path d="M12 15V4M7 9l5-5 5 5"/><path d="M5 20h14"/>` |
| historico | faixa de lembrete | `<path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>` |
| juntar | botão "Juntar" | `<path d="M6 3v2a7 7 0 0 0 6 7 7 7 0 0 0 6-7V3"/><path d="M12 12v8"/><path d="M8.5 17l3.5 3.5 3.5-3.5"/>` |
| substituir | "Substituir tudo", confirmação | `<path d="M4 8h14l-3-3"/><path d="M20 16H6l3 3"/>` |
| check | aviso de sucesso dentro da janela | `<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>` |

### 12.9 CSS de referência da Entrega 2a (acrescentar no `css/style.css` logo depois da seção "12. RODAPÉ" e **antes** da "13. MOVIMENTO REDUZIDO")

Atenção: o `<div id="dados-aviso">` vazio não pode ter espaço nem quebra de linha dentro (o CSS usa `:empty`, igual ao `#status`).

```css
/* ---------------------------------------------------------
   12b. ETAPA 2a: SEUS DADOS, IMPORTAÇÃO E LEMBRETE DE CÓPIA
   Decisões em: design.md, seção 12.
   --------------------------------------------------------- */

/* --- Cabeçalho: os dois botões do topo juntos --- */
.cabecalho-acoes {
  display: flex;
  align-items: center;
  gap: var(--esp-2);
  flex-shrink: 0;
}

/* Abaixo de 640px: só o ícone, num círculo de 44px.
   "Seus dados" continua no HTML para o leitor de tela. */
@media (max-width: 639.98px) {
  .botao-dados {
    width: 44px;
    padding: 0;
  }

  .botao-dados-texto {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
}

/* --- Círculo do topo da janela, em âmbar (não é perigo) --- */
.confirmar-icone--ambar {
  color: var(--cor-ambar);
  background: color-mix(in srgb, var(--cor-ambar) 14%, transparent);
}

/* --- Placa "Última cópia" (mesmas duas metades da placa de hora) --- */
.dados-placa {
  padding: var(--esp-3) var(--esp-4);
  background: linear-gradient(to bottom, var(--cor-superficie-2) 50%, var(--cor-placa-baixo) 50%);
  border-radius: var(--raio-md);
  box-shadow: inset 0 0 0 1px var(--cor-borda);
}

.dados-placa-data {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--esp-1) var(--esp-3);
}

.dados-placa-rotulo {
  font-family: var(--fonte-mono);
  font-size: var(--fs-xs);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--cor-texto-suave);        /* 7.5:1 na placa */
}

.dados-placa-valor {
  font-family: var(--fonte-mono);
  font-size: var(--fs-md);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--cor-ambar);              /* 9.5:1 na placa */
}

.dados-placa-nunca {
  display: flex;
  align-items: flex-start;
  gap: var(--esp-2);
}

.dados-placa-nunca .icone {
  margin-top: 2px;
  color: var(--cor-ambar);
}

/* --- Botões grandes da janela "Seus dados" --- */
.dados-acoes {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--esp-3);
}

.dados-acoes .btn {
  width: 100%;
}

@media (min-width: 480px) {
  .dados-acoes {
    grid-template-columns: 1fr 1fr;
  }
}

/* A dica fica colada nos botões (o gap da janela é 16px) */
.dados-acoes + .campo-dica {
  margin-top: calc(-1 * var(--esp-2));
}

/* --- Região de avisos dentro da janela ---
   Fica sempre no HTML (região viva). Vazia, ela não pode usar
   display: none; então só "devolve" o espaço do gap da janela. */
.janela-aviso:empty {
  margin-top: calc(-1 * var(--esp-4));
}

.janela-aviso .faixa {
  margin-bottom: 0;
}

/* Sucesso: verde 12% sobre o card (texto 12.3:1, ícone 9.4:1) */
.faixa--sucesso {
  background: color-mix(in srgb, var(--cor-sucesso) 12%, var(--cor-superficie));
  border-color: color-mix(in srgb, var(--cor-sucesso) 60%, transparent);
}

.faixa--sucesso .icone {
  color: var(--cor-sucesso);
}

/* --- Janela de escolha da importação --- */
.importar-resumo {
  display: flex;
  flex-direction: column;
  gap: var(--esp-1);
}

.importar-numero {
  font-family: var(--fonte-mono);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--cor-ambar);              /* 10.4:1 na janela */
}

.importar-ignorados {
  display: flex;
  align-items: flex-start;
  gap: var(--esp-2);
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
}

.importar-ignorados .icone {
  width: 18px;
  height: 18px;
  margin-top: 1px;
  color: var(--cor-ambar);
}

.importar-atual {
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
}

.importar-pergunta {
  font-weight: 600;
}

.opcoes {
  display: flex;
  flex-direction: column;
  gap: var(--esp-4);
}

.opcao {
  display: flex;
  flex-direction: column;
  gap: var(--esp-1);
}

.opcao .btn {
  width: 100%;
}

.opcao-texto {
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
}

/* Leva a uma ação perigosa, mas ainda não apaga nada:
   contorno vermelho (7.2:1), texto branco (15.8:1). */
.btn-perigo-contorno {
  color: var(--cor-texto);
  background: transparent;
  border-color: var(--cor-perigo);
}

.btn-perigo-contorno .icone {
  color: var(--cor-perigo);
}

.btn-perigo-contorno:hover {
  background: color-mix(in srgb, var(--cor-perigo) 12%, var(--cor-superficie));
}

/* --- Faixa de lembrete de cópia (lilás: lembrete, não problema) --- */
.faixa--lembrete {
  flex-wrap: wrap;
  font-size: var(--fs-base);
  background: color-mix(in srgb, var(--cor-lilas) 10%, var(--cor-superficie));
  border-color: color-mix(in srgb, var(--cor-lilas) 55%, transparent);
  border-left: 4px solid var(--cor-lilas);
}

.faixa--lembrete > .icone {
  color: var(--cor-lilas);              /* 7.6:1 na faixa */
}

.faixa-corpo {
  flex: 1 1 12rem;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.faixa-rotulo {
  font-family: var(--fonte-mono);
  font-size: var(--fs-xs);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--cor-texto-suave);        /* 6.9:1 na faixa */
}

.faixa-texto {
  font-weight: 600;                     /* branco: 13.2:1 na faixa */
}

.faixa-destaque {
  font-family: var(--fonte-mono);
  font-variant-numeric: tabular-nums;
  color: var(--cor-ambar);              /* 8.7:1 na faixa */
}

.faixa-subtexto {
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
}

/* Celular: botões numa linha nova, dividindo a largura;
   se não couberem lado a lado, cada um ocupa a linha toda. */
.faixa-acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--esp-2);
  width: 100%;
}

.faixa-acoes .btn {
  flex: 1 1 auto;
}

@media (min-width: 640px) {
  .faixa--lembrete {
    align-items: center;
  }

  .faixa-acoes {
    width: auto;
  }

  .faixa-acoes .btn {
    flex: 0 0 auto;
  }
}

/* O título recebe o foco quando a faixa some (tabindex="-1").
   Só aparece o contorno se a pessoa estiver no teclado. */
#titulo-proximos:focus:not(:focus-visible) {
  outline: none;
}
```

**Acréscimo na seção "14. ALTO CONTRASTE DO WINDOWS"** (a lista de seletores ganha a placa e a faixa de lembrete):
```css
@media (forced-colors: active) {
  .dados-placa {
    border: 1px solid CanvasText;
  }

  .faixa--lembrete {
    border-left-color: CanvasText;
  }
}
```
(Os botões novos já usam `.btn`, que já ganha borda nessa seção.)

**Movimento reduzido:** nada novo para tratar. As janelas novas usam a mesma entrada da `.janela`, e a faixa não tem animação.

### 12.10 Contraste conferido (WCAG 2.1)

| Elemento | Cor / fundo | Razão | Mínimo |
|---|---|---|---|
| Ícone do botão "Seus dados" | `#F5EEE6` / ≈`#271C19` (cabeçalho no brilho âmbar) | 14.5:1 | 3:1 |
| Borda do botão "Seus dados" | `#8A7A9C` / ≈`#271C19` | 4.2:1 | 3:1 |
| Rótulo "ÚLTIMA CÓPIA" | `#B8AAB9` / `#231A2E` | 7.5:1 | 4.5:1 |
| Data da última cópia | `#FFB547` / `#231A2E` | 9.5:1 | 4.5:1 |
| Número no resumo ("12") | `#FFB547` / `#191321` | 10.4:1 | 4.5:1 |
| Explicação das opções, resumo suave | `#B8AAB9` / `#191321` | 8.2:1 | 4.5:1 |
| "Substituir tudo": texto | `#F5EEE6` / `#191321` | 15.8:1 | 4.5:1 |
| "Substituir tudo": borda | `#FF7B7B` / `#191321` | 7.2:1 | 3:1 |
| "Substituir tudo" no hover | `#F5EEE6` / ≈`#35202C` | 13.2:1 | 4.5:1 |
| "Substituir" (confirmação) | `#1A1205` / `#FF7B7B` | 7.4:1 | 4.5:1 |
| Aviso de sucesso na janela | `#F5EEE6` / ≈`#272C31` (verde 12%) | 12.3:1 | 4.5:1 |
| Ícone de check | `#8EE6A8` / ≈`#272C31` | 9.4:1 | 3:1 |
| Aviso de erro na janela | `#F5EEE6` / ≈`#35202C` (vermelho 12%) | 13.2:1 | 4.5:1 |
| Texto da faixa de lembrete | `#F5EEE6` / ≈`#2A2237` (lilás 10%) | 13.2:1 | 4.5:1 |
| Rótulo e subtexto da faixa | `#B8AAB9` / ≈`#2A2237` | 6.9:1 | 4.5:1 |
| "42 dias" na faixa | `#FFB547` / ≈`#2A2237` | 8.7:1 | 4.5:1 |
| Ícone da faixa | `#C4A8FF` / ≈`#2A2237` | 7.6:1 | 3:1 |
| Borda de "Depois" na faixa | `#8A7A9C` / ≈`#2A2237` | 3.9:1 | 3:1 |
| "Baixar cópia agora" | `#1A1205` / `#FFB547` | 10.5:1 | 4.5:1 |
| Foco em tudo o que é novo | `#8FD3FF`, 3px | ≥ 11:1 | 3:1 |

### 12.11 Conferência da Entrega 2a (para o dev e o testador)

| Requisito | Como o visual atende |
|---|---|
| Botão "Seus dados" 44 × 44px e cabe a 360px | círculo de 44px abaixo de 640px; conta da 12.3 (≈ 294 de 328px) |
| Nome acessível "Seus dados" | texto no `<span>`, escondido só da tela no celular |
| Janelas novas com `showModal()`, Esc, Tab preso, foco certo | 12.4 e 12.5: foco inicial em "Baixar cópia", "Juntar" e "Cancelar"; janelas empilhadas; Esc fecha só a de cima |
| Avisos lidos sem tirar o foco | `#dados-aviso` (dentro da janela) e `#status` (com as janelas fechadas), ambos `aria-live="polite"` |
| Perigo com texto | "Substituir tudo" (contorno) e "Substituir" (cheio) dizem o que fazem e têm ícone |
| Faixa de lembrete sem roubar o foco e sem cobrir nada | fica no fluxo da página (não é fixa), sem `focus()`; a 360px os botões quebram linha |
| Nada só por cor | "LEMBRETE DE CÓPIA", textos de erro e sucesso, ícones diferentes, explicação de cada opção |
| Textos do arquivo como texto | resumo e avisos com `textContent` (nada do arquivo vira HTML) |

### 12.12 Decisões para o João confirmar

1. **Ícone e texto do botão:** cilindro de "dados"; no celular só o ícone (o texto "Seus dados" aparece a partir de 640px, porque antes disso não cabe junto do "+ Novo compromisso").
2. **Avisos dentro da janela:** com a janela "Seus dados" aberta, "Cópia baixada." e os erros da importação aparecem dentro dela, não no aviso flutuante (que ficaria escondido atrás da janela e talvez não fosse lido). Os requisitos gerais da Etapa 2 falam do aviso flutuante; isto é um ajuste que o PO e o testador precisam aceitar.
3. **Fim da importação:** depois de "Juntar" ou "Substituir", todas as janelas fecham, a lista aparece já atualizada, o aviso flutuante diz o resultado e o foco volta para o botão "Seus dados".
4. **Textos sugeridos que não estão nos requisitos:** a explicação da janela "Seus dados", "Neste navegador há 8 compromissos.", a explicação de cada opção, o subtexto da faixa, "Lembrete adiado por 7 dias." e as variantes de singular/zero da tabela da 12.5.
5. **Baixar pela janela também esconde a faixa de lembrete** (mesmo efeito de "Baixar cópia agora").
6. **Foco quando a faixa some:** vai para o título "Próximos compromissos".
