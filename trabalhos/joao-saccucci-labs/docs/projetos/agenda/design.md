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

---

## 13. Etapa 2 — Entrega 2b (sair às, feito, pendências e sem data)

Cobre a **Agenda US11** (só as faixas de aviso), **US12** ("Sair às..."), **US13** (Feito e Desfazer), **US14** ("Me cobrar" e "Ficou pendente"), **US15** (resolver pendência), **US16** ("Sem data") e as mudanças da 2b nas US01 a US07. Tudo **se soma** às seções 1 a 12: mesmas cores, fontes, espaços, janelas, botões e faixas. Também traz a **correção de uma pendência baixa da 2a** (o `#erro-salvar` coberto a 320 × 568, ver 13.11.2).

### 13.1 Ideia visual

No "quadro de partidas", a 2b dá ao painel o que todo quadro de estação tem: **a hora de embarque, o status de cada partida e a plataforma dos atrasados**.
- **"Sair às 08:50"** é a hora de embarque: uma linha âmbar (a cor do tempo) logo abaixo do título. Quando faltam 15 minutos ela vira uma **pílula âmbar cheia**, "Sair em 12 min", e a borda do card acende em âmbar. É o único momento em que um card "chama" (sem piscar e sem se mexer).
- **Situação** ("Feito", "Não vou fazer", "Passou") é o **status da partida**: um selo pequeno em mono maiúsculo, como "EMBARCADO" ou "CANCELADO" no painel, sempre com ícone e texto.
- **"Ficou pendente"** é a **plataforma dos atrasados**: um painel âmbar próprio, com filete de 4px à esquerda, no topo da página. É o único bloco da página com fundo colorido, então o olho acha a pendência antes de tudo.
- **"Sem data"** é o **guarda-volumes de ideias**: recolhido como "Anteriores", com a placa tracejada em lilás (a cor do "sem hora"), porque ainda não tem horário no quadro.
- Os botões do card ganham uma **faixa própria embaixo**, separada por um tracejado (o "canhoto" do bilhete).

Nenhuma cor nova: âmbar, lilás, verde (`--cor-sucesso`), vermelho e cinza suave já existiam.

### 13.2 Reaproveitado x novo

| Parte | Reaproveita | Novo (e por quê) |
|---|---|---|
| Item do compromisso | `.compromisso`, placa, `.botao-item`, `.botao-item--perigo`, `.sr-only` | `.compromisso-meta` (linha de "Sair às" e "Cobrar"), `.compromisso-sair` com 3 estados, `.selo` e variações, `.botao-item--feito` e `.botao-item--agendar`. A faixa de botões muda de lugar (13.4.4) |
| "Ficou pendente" | `.compromissos`, `.compromisso`, placa | `.pendentes` (painel âmbar), `.pendentes-titulo`, `.pendentes-texto`, `.compromisso-era` ("Era para: ...") |
| "Sem data" | **toda** a estrutura de "Anteriores": `.anteriores-titulo`, `.anteriores-botao`, `.anteriores-contagem`, `.anteriores-seta`, `.anteriores-lista` | `.sem-data` (a seção) e `.compromisso-hora--sem-data` (placa tracejada) |
| "Anteriores" com situação | `.compromisso--anterior` | só os selos (`.selo--feito`, `.selo--nao-vou-fazer`, `.selo--passou`) |
| Formulário | `.janela`, `.campo`, `.campo-rotulo`, `.campo-controle`, `.campo-dica`, `.campo-erro`, `.campo-obrigatorio` | `.marcar` / `.marcar-caixa` (caixa de marcar com 44px de toque), `.grupo` (fieldset), `.escolhas` / `.escolha` (as "plaquinhas" do tempo para sair), `.campo-com-sufixo`, estilo de campo desativado, `.janela-subtitulo` (modo Remarcar) |
| Avisos | `#status`, `.faixa--erro`, `.faixa--alerta` | `.status[data-tipo="alerta"]` (barrinha âmbar, para "Compromisso continua pendente.") |
| Ícones | padrão da 8.2 | feito, desfazer, remarcar, nao-vou-fazer, agendar, sair, cobrar, pendente, passou (13.10) |

### 13.3 Ordem da página

Ordem dos requisitos (mudança da US01 na 2b): **faixas → "Ficou pendente" → "Próximos compromissos" → "Sem data" → "Anteriores"**.

```
360px
+--------------------------------------+
| [ic] Agenda▪          (≡)  [+ Novo]  |
+--------------------------------------+
| (faixas, só se houver)               |
|                                      |
| ┃ (despertador) FICOU PENDENTE (2)   |  painel âmbar 7%, filete âmbar 4px
| ┃ Passou da data e você pediu para   |  14px suave (sugestão)
| ┃ ser cobrado.                       |
| ┃ +--------------------------------+ |
| ┃ | +------+ Pagar boleto da luz   | |  card normal dentro do painel
| ┃ | | DIA  | Era para: Ontem ·     | |  "Ontem · Dia todo" em mono âmbar
| ┃ | | TODO | Dia todo              | |
| ┃ | +------+                       | |
| ┃ | - - - - - - - - - - - - - - -  | |  tracejado: o "canhoto"
| ┃ | [✓ Feito] [Remarcar]           | |
| ┃ | [Não vou fazer] [Excluir]      | |
| ┃ +--------------------------------+ |
|                                      |  48px
| PRÓXIMOS COMPROMISSOS                |
| ▪ Hoje                               |
| +----------------------------------+ |
| | +------+ Dentista                | |
| | |09:30 | (porta) Sair às 08:50    | |  hora em mono âmbar
| | +------+ (sino) COBRAR            | |  selo âmbar
| |          (pino) Clínica Sorriso   | |
| | - - - - - - - - - - - - - - - - - | |
| | [✓ Feito] [Editar] [Excluir]     | |
| +----------------------------------+ |
|                                      |
| - - - - - - - - - - - - - - - - - -  |
| [ Sem data (3)                   v ] |  igual ao botão "Anteriores"
|                                      |  24px (sem tracejado entre os dois)
| [ Anteriores (5)                 v ] |
+--------------------------------------+
```

### 13.4 Item do compromisso na 2b

#### 13.4.1 Linha de "meta" (Sair às e Cobrar)

Fica **logo abaixo do título**, antes do local. Só existe se o item tiver "Sair às" ou "Cobrar" (sem nenhum dos dois, não criar o `div`, nada de espaço vazio). Os dois ficam na mesma linha se couberem; senão, quebram.

```html
<li class="compromisso" data-id="c-1731590400000-k3f9" tabindex="-1">
  <div class="compromisso-hora"><time datetime="2026-11-14T09:30">09:30</time></div>
  <div class="compromisso-corpo">
    <p class="compromisso-titulo">Dentista</p>
    <div class="compromisso-meta">
      <p class="compromisso-sair" data-estado="normal">
        <!-- svg "sair" -->
        <span>Sair às <time class="compromisso-sair-hora" datetime="2026-11-14T08:50">08:50</time></span>
      </p>
      <p class="selo selo--cobrar"><!-- svg "cobrar" -->Cobrar<span class="sr-only"> se eu não fizer</span></p>
    </div>
    <p class="compromisso-local">...</p>
    <p class="compromisso-obs">...</p>
  </div>
  <div class="compromisso-acoes"><!-- 13.4.3 --></div>
</li>
```

#### 13.4.2 "Sair às": os três estados (US12)

O JS escreve o texto e troca o `data-estado`. **Sem `aria-live`** nessa linha (a mudança não é anunciada a cada minuto).

| `data-estado` | Texto | Visual |
|---|---|---|
| `normal` | "Sair às **08:50**" ou "Sair às **23:30** do dia anterior" | ícone "sair" âmbar 16px, "Sair às" 14px suave, hora em mono 600 âmbar |
| `logo` (de 15 min antes até a hora de sair) | "Sair em 12 min" / "Sair agora" | **pílula âmbar cheia**, texto escuro `#1A1205` 700, ícone escuro; a borda do card fica âmbar |
| `passou` (depois da hora de sair, até o compromisso passar) | "Hora de sair: **08:50** (já passou)" | tudo em cinza suave (ícone e hora também): o momento passou, não há mais o que fazer com ele |

```
normal   (porta) Sair às 08:50
logo     ( (porta) Sair em 12 min )      <- pílula âmbar cheia, texto escuro
passou   (porta) Hora de sair: 08:50 (já passou)    <- tudo cinza
```

- O destaque do estado `logo` **também é texto** ("Sair em 12 min" diz o que é); a cor é só reforço.
- Em "Anteriores", "Ficou pendente" e "Sem data" a linha não aparece.
- **Dica para o dev:** o texto "Sair em X min" muda a cada minuto. Em vez de redesenhar a lista inteira, o relógio de 1 minuto pode só trocar o texto e o `data-estado` dos `.compromisso-sair` que existem (assim o foco e o leitor de tela não são incomodados). Se preferir redesenhar, o estado do "Sair às" precisa entrar no "resumo" que decide se a tela mudou.

#### 13.4.3 Botões do card (US13, US15, US16)

A ação principal vem **primeiro**; "Excluir" fica **sempre por último** (longe do polegar que procura a ação boa).

| Onde | Botões, nesta ordem |
|---|---|
| Lista principal | **Feito** · Editar · Excluir |
| "Ficou pendente" | **Feito** · Remarcar · Não vou fazer · Excluir |
| "Sem data" | **Agendar** · Editar · Excluir |
| "Anteriores", situação "Passou" | **Feito** · Editar · Excluir |
| "Anteriores", "Feito" ou "Não vou fazer" | **Desfazer** · Editar · Excluir |

Todos são `.botao-item` (fantasma, 44px, ícone 18px + texto 14px). Destaques só no ícone:
- **Feito:** ícone de check **verde** (`--cor-sucesso`); no hover, texto verde e borda verde.
- **Agendar:** ícone de calendário **âmbar**; no hover, texto âmbar.
- **Excluir:** como na Etapa 1 (vermelho no hover).
- Desfazer, Remarcar, Não vou fazer: neutros (cinza suave, branco no hover).

Nome acessível sempre **começando pelo texto visível** (bom para comando de voz):
```html
<button class="botao-item botao-item--feito" type="button" data-acao="feito"><!-- svg "feito" -->Feito<span class="sr-only">: marcar Dentista como feito</span></button>
<button class="botao-item" type="button" data-acao="desfazer"><!-- svg "desfazer" -->Desfazer<span class="sr-only"> Dentista</span></button>
<button class="botao-item" type="button" data-acao="remarcar"><!-- svg "remarcar" -->Remarcar<span class="sr-only"> Dentista</span></button>
<button class="botao-item" type="button" data-acao="nao-vou-fazer"><!-- svg "nao-vou-fazer" -->Não vou fazer<span class="sr-only"> Dentista</span></button>
<button class="botao-item botao-item--agendar" type="button" data-acao="agendar"><!-- svg "agendar" -->Agendar<span class="sr-only"> Dentista</span></button>
```
Leitor de tela: "Feito: marcar Dentista como feito", "Desfazer Dentista", "Não vou fazer Dentista", "Agendar Dentista".

#### 13.4.4 Onde ficam os botões (muda a seção 8 do CSS)

Com 3 ou 4 botões, eles não cabem mais à direita do texto no computador (4 botões ≈ 480px). Por isso, a partir da 2b:
- **Celular (< 640px):** os botões ficam numa **faixa embaixo do card inteiro** (da borda da placa até a outra ponta), separada do texto por um tracejado decorativo. A faixa ganha 16px de largura a mais que a coluna do texto.
- **Computador (≥ 640px):** os botões ficam **embaixo do texto**, alinhados com o título, sem tracejado. O card passa a ter 2 colunas (placa | texto).
- Os botões quebram linha quando não cabem (`flex-wrap`), sempre com 44px de toque e 8px entre eles.

**Conta a 360px** (card de 328px, padding 12px, borda 1px → 302px por dentro; faixa de botões com 8px a mais de cada lado = **318px**). Larguras estimadas (12px de espaço interno + ícone 18 + 8 + texto 14px):

| Conjunto | Soma (com vãos de 8px) | Linhas a 360px |
|---|---|---|
| Feito 88 · Editar 96 · Excluir 102 | 302px | 1 |
| Agendar 103 · Editar 96 · Excluir 102 | 317px | 1 (pode virar 2 com fonte do sistema; aceito) |
| Desfazer 111 · Editar 96 · Excluir 102 | 325px | 2 |
| Feito 88 · Remarcar 111 · Não vou fazer 145 · Excluir 102 (dentro do painel, faixa de 291px) | 207 + 255 | 2 |

Nenhuma conta passa da largura: no pior caso o botão desce de linha. Sem rolagem horizontal.

```
≥ 640px
+--------------------------------------------------------------+
| +-------+  Dentista                                          |
| | 09:30 |  (porta) Sair às 08:50   (sino) COBRAR             |
| +-------+  (pino) Clínica Sorriso                            |
|            [✓ Feito] [Editar] [Excluir]                      |
+--------------------------------------------------------------+
```

#### 13.4.5 Selo "Cobrar" (US14)

Selo pequeno: mono 12px 600, maiúsculas, contorno de 1px na cor do texto (55%), cantos redondos, ícone de sino 14px. Âmbar. Só na lista principal. O leitor de tela ouve "Cobrar se eu não fizer" (o resto está em `sr-only`).

### 13.5 Seção "Ficou pendente" (US14 e US15)

Painel no topo do `main`, **depois** das faixas e **antes** de "Próximos compromissos". Sempre aberto. Some (`hidden`) sem pendências.

- Fundo: âmbar 7% sobre o fundo da página; borda de 1px âmbar a 45%; **filete de 4px âmbar à esquerda**; raio 16px; espaço interno 16/12px no celular, 24/16px a partir de 640px; 48px até "Próximos compromissos".
- Título (`h2`): ícone "pendente" (despertador) âmbar + "FICOU PENDENTE" em mono 12px maiúsculo **âmbar** (o mesmo jeito do "PRÓXIMOS COMPROMISSOS", mas na cor do tempo) + "(2)" em mono suave.
- Subtexto opcional (sugestão): "Passou da data e você pediu para ser cobrado." 14px suave.
- Lista **sem grupos por dia** (ordem da mais antiga para a mais recente): cada card é o card normal (fundo `--cor-superficie`, que se destaca sobre o painel) com a classe `compromisso--pendente`.
- No lugar da linha de meta, a linha **"Era para: Ontem · 09:30"**: "Era para:" em 14px suave e o valor em mono 600 âmbar. A placa continua mostrando a hora (ou "DIA TODO").

```html
<section class="pendentes" id="secao-pendentes" aria-labelledby="titulo-pendentes" hidden>
  <h2 class="pendentes-titulo" id="titulo-pendentes">
    <!-- svg "pendente" -->
    <span>Ficou pendente</span> <span class="pendentes-contagem" id="contagem-pendentes">(2)</span>
  </h2>
  <p class="pendentes-texto">Passou da data e você pediu para ser cobrado.</p>
  <ul class="compromissos" id="lista-pendentes">
    <li class="compromisso compromisso--pendente" data-id="..." tabindex="-1">
      <div class="compromisso-hora"><time datetime="2026-11-05T09:30">09:30</time></div>
      <div class="compromisso-corpo">
        <p class="compromisso-titulo">Pagar boleto da luz</p>
        <p class="compromisso-era">
          <span>Era para:</span>
          <span class="compromisso-era-valor">Ontem<span aria-hidden="true"> · </span><span class="sr-only">, </span>09:30</span>
        </p>
        <!-- local e observação, se houver -->
      </div>
      <div class="compromisso-acoes"><!-- Feito, Remarcar, Não vou fazer, Excluir --></div>
    </li>
  </ul>
</section>
```

- O "·" é decorativo; o leitor de tela ouve "Era para: Ontem, 09:30". Dia todo: "Era para: Ter, 11/11 · Dia todo". Os títulos de dia são os da seção 3 dos requisitos ("Ontem", "Ter, 11/11", com o ano se for de outro ano).
- "Não vou fazer" não tem cara de perigo (é neutro): dá para desfazer, e não pede confirmação.

### 13.6 Seção "Sem data" (US16)

**Mesma estrutura e mesmo visual de "Anteriores"** (botão largo de 52px, contagem em mono, seta que gira, começa recolhida, `aria-expanded`). Fica entre "Próximos compromissos" e "Anteriores".
- Ela tem o tracejado em cima (como "Anteriores" tinha). Quando as duas aparecem, "Anteriores" fica só 24px abaixo dela, **sem** outro tracejado: os dois botões formam um bloco só, "o que está guardado".
- Lista **sem grupos por dia** (ordem por `criadoEm`, do mais antigo para o mais novo).
- **Placa "SEM DATA":** a placa de sempre, mas **vazia e tracejada**: sem as duas metades, borda tracejada lilás, "SEM DATA" em mono 12px lilás, em duas linhas (como "DIA TODO"). É a plaquinha que ainda não recebeu horário.

```html
<section class="sem-data" id="secao-sem-data" aria-labelledby="titulo-sem-data" hidden>
  <h2 class="anteriores-titulo" id="titulo-sem-data">
    <button class="anteriores-botao" id="botao-sem-data" type="button" aria-expanded="false" aria-controls="lista-sem-data">
      <span><span>Sem data</span> <span class="anteriores-contagem" id="contagem-sem-data">(3)</span></span>
      <!-- svg "seta" com class="icone anteriores-seta" -->
    </button>
  </h2>
  <div class="anteriores-lista" id="lista-sem-data" hidden>
    <ul class="compromissos">
      <li class="compromisso compromisso--sem-data" data-id="..." tabindex="-1">
        <div class="compromisso-hora compromisso-hora--sem-data"><span>Sem data</span></div>
        <div class="compromisso-corpo">
          <p class="compromisso-titulo">Marcar oftalmologista</p>
          <!-- local e observação, se houver -->
        </div>
        <div class="compromisso-acoes"><!-- Agendar, Editar, Excluir --></div>
      </li>
    </ul>
  </div>
</section>
```

O HTML fixo da seção fica no `index.html` entre a `section.proximos` e a `section.anteriores` (ordem do HTML = ordem do Tab).

### 13.7 "Anteriores" com situação (US06 e US13)

Cada item de "Anteriores" ganha um **selo** na linha de meta, logo abaixo do título:

| Situação | Selo | Cor | Ícone |
|---|---|---|---|
| Feito | "FEITO" | verde `--cor-sucesso` | check |
| Não vou fazer | "NÃO VOU FAZER" | lilás | círculo cortado |
| Passou | "PASSOU" | cinza suave, contorno **tracejado** | relógio |

```html
<div class="compromisso-meta">
  <p class="selo selo--feito"><!-- svg "feito" --><span class="sr-only">Situação: </span>Feito</p>
</div>
```
- O leitor de tela ouve "Situação: Feito". A situação nunca é só cor: tem texto, ícone diferente e, no "Passou", contorno diferente.
- O card continua com o visual calmo de `compromisso--anterior` (tracejado, sem fundo). Item "Feito" com data futura fica no grupo do dia dele, sem "daqui a X dias" (como os outros de "Anteriores").

### 13.8 Formulário na 2b

#### 13.8.1 Ordem dos campos

Título · **Data** (com "Ainda sem data" logo abaixo) | **Hora** · **Tempo para sair** · **Me cobrar se eu não fizer** · Local · Observação · (erro de salvar) · barra de botões.

As opções que dependem de data e hora ficam juntas, logo depois delas. "Ainda sem data" fica **dentro** do campo Data: no celular aparece entre Data e Hora; a partir de 480px fica embaixo da Data, na mesma altura da dica da Hora.

```
360px
+-----------------------------------+  borda de cima âmbar
| Novo compromisso                  |
| Título (obrigatório)              |
| [                               ] |
| Data (obrigatório)                |
| [ 06/11/2026              (cal) ] |
| [ ] Ainda sem data                |  caixa 22px, linha de 44px
| Hora                              |
| [ 09:30                   (rel) ] |
| Deixe em branco para um...        |
| Tempo para sair                   |  legend (14px 600)
| [✓ Nenhum ][ 15 min ][ 30 min ]   |  "plaquinhas" de 44px, 3 por linha
| [ 45 min  ][ 60 min ][ Outro  ]   |  marcada = âmbar cheio + check
|   Minutos antes                   |  só com "Outro"
|   [ 40      ] min                 |
|   De 1 a 720 minutos (12 horas).  |
| [ ] Me cobrar se eu não fizer     |
|     Se a data passar sem você     |  dica alinhada com o texto
|     marcar Feito, ele fica em...  |
| Local                             |
| Observação                        |
|-----------------------------------|
| [  Cancelar  ]   [   Salvar    ]  |
+-----------------------------------+
```

Com **"Ainda sem data" marcada**:
```
| Data                              |  "(obrigatório)" some
| [ dd/mm/aaaa  - - - - - - - - - ] |  borda tracejada, texto suave, desativado
| [✓] Ainda sem data                |
| Hora                              |
| [ --:--  - - - - - - - - - - - -] |  desativado
| Tempo para sair                   |
| Escolha uma hora para usar o      |  dica aparece
| tempo para sair.                  |
| [ Nenhum ][ 15 min ]...           |  plaquinhas tracejadas, desativadas
| [ ] Me cobrar se eu não fizer     |  desativada (caixa tracejada)
```

#### 13.8.2 HTML dos campos novos

```html
<div class="campos-linha">
  <div class="campo">
    <label class="campo-rotulo" for="campo-data">Data <span class="campo-obrigatorio" id="data-obrigatorio">(obrigatório)</span></label>
    <input class="campo-controle" id="campo-data" name="data" type="date">
    <p class="campo-erro" id="erro-data" hidden><!-- svg "alerta" --><span>Escolha uma data.</span></p>
    <label class="marcar" for="campo-sem-data">
      <input class="marcar-caixa" type="checkbox" id="campo-sem-data" name="semData">
      <span>Ainda sem data</span>
    </label>
  </div>
  <div class="campo"><!-- Hora: igual --></div>
</div>

<fieldset class="grupo" id="grupo-sair" aria-describedby="dica-sair">
  <legend class="campo-rotulo">Tempo para sair</legend>
  <p class="campo-dica" id="dica-sair" hidden>Escolha uma hora para usar o tempo para sair.</p>
  <div class="escolhas">
    <label class="escolha"><input type="radio" name="antecedencia" value="" checked><span>Nenhum</span></label>
    <label class="escolha"><input type="radio" name="antecedencia" value="15"><span>15 min</span></label>
    <label class="escolha"><input type="radio" name="antecedencia" value="30"><span>30 min</span></label>
    <label class="escolha"><input type="radio" name="antecedencia" value="45"><span>45 min</span></label>
    <label class="escolha"><input type="radio" name="antecedencia" value="60"><span>60 min</span></label>
    <label class="escolha"><input type="radio" name="antecedencia" value="outro"><span>Outro</span></label>
  </div>
  <div class="campo campo-minutos" id="bloco-minutos" hidden>
    <label class="campo-rotulo" for="campo-minutos">Minutos antes</label>
    <div class="campo-com-sufixo">
      <input class="campo-controle" id="campo-minutos" name="minutos" type="number" inputmode="numeric" min="1" max="720" step="1" aria-describedby="dica-minutos">
      <span class="campo-sufixo" aria-hidden="true">min</span>
    </div>
    <p class="campo-dica" id="dica-minutos">De 1 a 720 minutos (12 horas).</p>
    <p class="campo-erro" id="erro-minutos" hidden><!-- svg "alerta" --><span>Digite um número de minutos entre 1 e 720.</span></p>
  </div>
</fieldset>

<div class="campo">
  <label class="marcar" for="campo-cobrar">
    <input class="marcar-caixa" type="checkbox" id="campo-cobrar" name="cobrar" aria-describedby="dica-cobrar">
    <span>Me cobrar se eu não fizer</span>
  </label>
  <p class="campo-dica campo-dica--marcar" id="dica-cobrar">Se a data passar sem você marcar Feito, ele fica em 'Ficou pendente'.</p>
</div>
```

Regras do visual (o comportamento está nos requisitos):
- **Grupo desativado** (sem hora ou sem data): `disabled` no `fieldset` (desativa as plaquinhas **e** o campo de minutos de uma vez) e `hidden` tirado do `#dica-sair`. As plaquinhas ficam tracejadas e cinza; a opção marcada continua com o check, em cinza.
- **"Outro":** marcar "Outro" tira o `hidden` do `#bloco-minutos`. Em erro, o campo de minutos segue as regras da US03: `aria-invalid="true"`, borda vermelha de 2px e `aria-describedby="dica-minutos erro-minutos"` enquanto o erro aparece.
- **"Ainda sem data" marcada:** `disabled` em Data e Hora (borda tracejada, texto suave), `hidden` no `#data-obrigatorio`, grupo "Tempo para sair" e "Me cobrar" desativados. O erro da data some (e o `aria-invalid` sai).
- **"Me cobrar" desativada:** a caixa fica tracejada e o texto cinza; a dica continua visível.
- As plaquinhas são `input type="radio"` de verdade (setas do teclado trocam a opção; o Tab entra e sai do grupo). O `input` fica invisível **por cima** da plaquinha (opacidade 0, ocupa a plaquinha toda), então toque, clique e leitor de tela funcionam normalmente. O foco aparece na plaquinha (contorno azul-céu).
- A marcada não depende só da cor: ganha um **check** antes do texto, fundo âmbar cheio e texto escuro.

#### 13.8.3 Modos "Remarcar compromisso" e "Agendar compromisso"

É **o mesmo formulário**; muda o `h2` e o foco inicial vai para o campo **Data** (requisitos).

- **Remarcar compromisso** (US15): debaixo do título, uma linha de contexto (sugestão) com a data antiga, no mesmo visual de "Era para":
  ```html
  <h2 class="janela-titulo" id="janela-titulo">Remarcar compromisso</h2>
  <p class="janela-subtitulo" id="janela-subtitulo">Era para: <span class="compromisso-era-valor">Ontem · 09:30</span></p>
  ```
  O `#janela-subtitulo` fica no HTML com `hidden` e só aparece nesse modo. Os campos vêm preenchidos.
- **Agendar compromisso** (US16): sem subtítulo; "Ainda sem data" vem desmarcada, a Data com hoje. Nada mais muda.
- Em "Novo" e "Editar", o subtítulo fica escondido.

### 13.9 Avisos novos

Todos no **aviso flutuante** (`#status`), com as janelas fechadas (requisitos gerais da Etapa 2).

| Situação | `data-tipo` | Texto |
|---|---|---|
| Marcou Feito | `sucesso` | "Marcado como feito." |
| Desfez | `sucesso` | "Desfeito." |
| Não vou fazer | `sucesso` | "Marcado como 'Não vou fazer'." |
| Remarcou para o futuro | `sucesso` | "Compromisso remarcado." |
| Remarcou, mas ainda no passado | **`alerta`** (barrinha âmbar, nova) | "Compromisso continua pendente." |
| Salvou sem data | `sucesso` | "Anotado em Sem data." |
| Agendou | `sucesso` | "Compromisso agendado." |
| Migração não pôde gravar (US11) | faixa `.faixa--erro` no `#faixas` | "Não foi possível atualizar seus dados neste navegador. As mudanças não serão salvas." |
| Dados de versão mais nova (US11) | faixa `.faixa--alerta` no `#faixas` | "Seus dados são de uma versão mais nova da Agenda. As mudanças não serão salvas." |
| Minutos fora da regra | `.campo-erro` no formulário | "Digite um número de minutos entre 1 e 720." |

As duas faixas da US11 seguem a ordem do `#faixas`: problemas primeiro, lembrete de cópia por último.

### 13.10 Ícones novos (mesmo padrão da 8.2: `viewBox="0 0 24 24"`, traço 2, `currentColor`, `aria-hidden="true" focusable="false"`)

| Nome | Onde | Miolo |
|---|---|---|
| feito | botão "Feito", selo "Feito" | `<path d="M5 12.5l4.5 4.5L19 7.5"/>` |
| desfazer | botão "Desfazer" | `<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>` |
| remarcar | botão "Remarcar" | `<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M9 15.5h6.5M13.5 13l2.5 2.5-2.5 2.5"/>` |
| nao-vou-fazer | botão "Não vou fazer", selo | `<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>` |
| agendar | botão "Agendar" | `<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M12 13v5M9.5 15.5h5"/>` |
| sair | linha "Sair às" | `<path d="M13 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7"/><path d="M15 8l4 4-4 4M19 12H10"/>` |
| cobrar | selo "Cobrar" | `<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>` |
| pendente | título "Ficou pendente" | `<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 1.5"/><path d="M5 3L2.5 5.5M19 3l2.5 2.5"/>` |
| passou | selo "Passou" | `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>` |

Nos selos o ícone tem 14px; na linha "Sair às", 16px; nos botões, 18px (como os outros).

### 13.11 CSS de referência da Entrega 2b

São quatro mudanças no `css/style.css`, nesta ordem no arquivo.

#### 13.11.1 Seção "8. COMPROMISSO": **substituir** as regras dos botões

Trocar a regra `.compromisso-acoes { ... }` e o `@media (min-width: 640px) { ... }` que vem logo depois dela (os dois, inteiros) por:

```css
/* Botões numa faixa própria (2b: até 4 botões não cabem mais à direita).
   Celular: embaixo do card todo, com um tracejado em cima (o "canhoto").
   As margens negativas dão 8px a mais de cada lado: o texto do botão
   fica alinhado com a borda da placa. */
.compromisso-acoes {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: var(--esp-2);
  margin-inline: calc(-1 * var(--esp-2));
  padding-top: var(--esp-1);
  border-top: 1px dashed var(--cor-borda);
}

/* Computador: placa | texto, e os botões embaixo do texto */
@media (min-width: 640px) {
  .compromisso {
    grid-template-columns: 4.75rem minmax(0, 1fr);
    gap: var(--esp-2) var(--esp-4);
    padding: var(--esp-4);
  }

  .compromisso-acoes {
    grid-column: 2;
    margin-inline: calc(-1 * var(--esp-3)) 0;   /* "Feito" alinhado com o título */
    padding-top: 0;
    border-top: 0;
  }
}
```

#### 13.11.2 Seção "11. JANELAS": correção da pendência da 2a (`#erro-salvar` coberto a 320 × 568)

**O problema:** a 320px a janela tem 288px; tirando a borda e o espaço interno da barra (24px de cada lado), sobram **238px** para os botões. Com `flex: 1 1 8rem`, "Cancelar" + "Salvar" pedem 128 + 12 + 128 = **268px**, então eles empilham. A barra empilhada mede 16 + 44 + 12 + 44 + 16 + 1 = **133px**, mais que os 6rem (96px) do `scroll-padding-bottom` que o dev colocou na `.janela`. Resultado: o `scrollIntoView` acha que o aviso está visível, mas ele está atrás da barra.

**A correção (duas partes):**

1. Na regra `.janela-acoes .btn`, trocar `8rem` por `6rem`. "Cancelar" (≈104px) + "Salvar" (≈90px) + 12 = **206px**, cabem nos 238px: os botões ficam lado a lado até 320px e a barra volta a ter ≈77px (menos que os 96px reservados). Acima de 360px nada muda (eles já dividiam a largura).
   ```css
   .janela-acoes .btn {
     flex: 1 1 6rem;               /* celular: dividem a largura (antes 8rem: empilhava a 320px) */
   }
   ```
2. Rede de segurança para as janelas que **ainda** empilham em telas muito estreitas (ex.: "Cancelar" + "Substituir" ≈ 262px a 320px). Logo **depois** da regra `.janela { ... }`:
   ```css
   /* Abaixo de 360px uma barra pode empilhar os botões (≈133px de altura):
      reservamos 9rem (144px) para o aviso nunca ficar atrás dela. */
   @media (max-width: 359.98px) {
     .janela {
       scroll-padding-bottom: 9rem;
     }
   }
   ```

Para o testador: a 320 × 568, com o `localStorage` cheio, "Salvar" mostra "Não foi possível salvar o compromisso." inteiro, **acima** da barra de botões. Repetir com o formulário da 2b aberto em "Outro" (formulário mais comprido).

#### 13.11.3 Nova seção "12c": acrescentar logo **depois** da "12b. ETAPA 2a" e **antes** da "13. MOVIMENTO REDUZIDO"

```css
/* ---------------------------------------------------------
   12c. ETAPA 2b: SAIR ÀS, FEITO, PENDÊNCIAS E SEM DATA
   Decisões em: design.md, seção 13.
   --------------------------------------------------------- */

/* --- Linha de meta: "Sair às", "Cobrar" e a situação --- */
.compromisso-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--esp-1) var(--esp-3);
  margin-block: 2px;
}

/* --- "Sair às 08:50" (3 estados, US12) --- */
.compromisso-sair {
  display: inline-flex;
  align-items: center;
  gap: var(--esp-1);
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);          /* 8.2:1 no card */
}

.compromisso-sair .icone {
  width: 16px;
  height: 16px;
  color: var(--cor-ambar);
}

.compromisso-sair-hora {
  font-family: var(--fonte-mono);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--cor-ambar);                /* 10.4:1 no card */
}

/* "Sair em 12 min": pílula âmbar cheia, texto escuro (10.5:1) */
.compromisso-sair[data-estado="logo"] {
  padding: 2px var(--esp-3) 2px var(--esp-2);
  font-weight: 700;
  color: var(--cor-sobre-cor);
  background: var(--cor-ambar);
  border-radius: var(--raio-pill);
}

.compromisso-sair[data-estado="logo"] .icone {
  color: currentColor;
}

/* "Hora de sair: 08:50 (já passou)": tudo cinza */
.compromisso-sair[data-estado="passou"] .icone,
.compromisso-sair[data-estado="passou"] .compromisso-sair-hora {
  color: var(--cor-texto-suave);
}

/* O card acende em âmbar enquanto está na hora de sair (enfeite) */
.compromisso:has(.compromisso-sair[data-estado="logo"]) {
  border-color: color-mix(in srgb, var(--cor-ambar) 70%, var(--cor-borda));
}

/* --- Selos: "Cobrar" e a situação em "Anteriores" --- */
.selo {
  display: inline-flex;
  align-items: center;
  gap: var(--esp-1);
  min-height: 1.5rem;
  padding: 1px var(--esp-2);
  font-family: var(--fonte-mono);
  font-size: var(--fs-xs);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid color-mix(in srgb, currentColor 55%, transparent);
  border-radius: var(--raio-pill);
}

.selo .icone {
  width: 14px;
  height: 14px;
}

.selo--cobrar        { color: var(--cor-ambar); }        /* 10.4:1 */
.selo--feito         { color: var(--cor-sucesso); }      /* 11.1:1 no pior ponto */
.selo--nao-vou-fazer { color: var(--cor-lilas); }        /* 8.2:1 no pior ponto */
.selo--passou {
  color: var(--cor-texto-suave);                         /* 7.5:1 no pior ponto */
  border-style: dashed;
}

/* --- Botões novos do card (só o ícone tem cor) --- */
.botao-item--feito .icone {
  color: var(--cor-sucesso);              /* 12.3:1 no card */
}

.botao-item--feito:hover {
  color: var(--cor-sucesso);              /* 11.2:1 no hover */
  border-color: color-mix(in srgb, var(--cor-sucesso) 50%, transparent);
}

.botao-item--agendar .icone {
  color: var(--cor-ambar);
}

.botao-item--agendar:hover {
  color: var(--cor-ambar);                /* 9.5:1 no hover */
  border-color: color-mix(in srgb, var(--cor-ambar) 50%, transparent);
}

/* --- "Ficou pendente": a plataforma dos atrasados --- */
.pendentes {
  display: flex;
  flex-direction: column;
  gap: var(--esp-3);
  margin-bottom: var(--esp-7);
  padding: var(--esp-4) var(--esp-3) var(--esp-3);
  background: color-mix(in srgb, var(--cor-ambar) 7%, var(--cor-fundo));
  border: 1px solid color-mix(in srgb, var(--cor-ambar) 45%, transparent);
  border-left: 4px solid var(--cor-ambar);
  border-radius: var(--raio-lg);
}

@media (min-width: 640px) {
  .pendentes {
    padding: var(--esp-5) var(--esp-4) var(--esp-4);
  }
}

.pendentes-titulo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--esp-2);
  font-family: var(--fonte-mono);
  font-size: var(--fs-xs);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--cor-ambar);                /* 9.9:1 no painel */
}

.pendentes-titulo .icone {
  width: 18px;
  height: 18px;
}

.pendentes-contagem {
  font-weight: 400;
  color: var(--cor-texto-suave);          /* 7.8:1 no painel */
}

.pendentes-texto {
  margin-top: calc(-1 * var(--esp-1));
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
}

/* "Era para: Ontem · 09:30" (pendência e subtítulo do Remarcar) */
.compromisso-era {
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
}

.compromisso-era-valor {
  font-family: var(--fonte-mono);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--cor-ambar);                /* 10.4:1 no card */
}

/* --- "Sem data": mesma cara de "Anteriores" --- */
.sem-data {
  margin-top: var(--esp-7);
  padding-top: var(--esp-5);
  border-top: 1px dashed var(--cor-borda);
}

/* Com "Sem data" na tela, "Anteriores" cola nela (um bloco só) */
.sem-data:not([hidden]) + .anteriores {
  margin-top: var(--esp-5);
  padding-top: 0;
  border-top: 0;
}

/* Placa vazia e tracejada: ainda não tem horário no quadro */
.compromisso-hora--sem-data {
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cor-lilas);                /* 9.0:1 no card */
  background: transparent;
  box-shadow: none;
  border: 1px dashed color-mix(in srgb, var(--cor-lilas) 55%, transparent);
}

.compromisso-hora--sem-data > span {
  width: min-content;                     /* "SEM / DATA" em duas linhas */
}

/* --- Formulário: caixa de marcar com 44px de toque --- */
.marcar {
  display: flex;
  align-items: center;
  gap: var(--esp-3);
  width: fit-content;
  max-width: 100%;
  min-height: 44px;
  font-size: var(--fs-base);
  font-weight: 500;
  cursor: pointer;
}

.marcar-caixa {
  appearance: none;
  -webkit-appearance: none;
  flex-shrink: 0;
  width: 1.375rem;                        /* 22px */
  height: 1.375rem;
  margin: 0;
  background: var(--cor-fundo) center / 1rem no-repeat;
  border: 2px solid var(--cor-borda-campo);   /* 4.6:1 na janela */
  border-radius: var(--raio-sm);
  cursor: pointer;
  transition: background-color var(--transicao), border-color var(--transicao);
}

.marcar:hover .marcar-caixa {
  border-color: var(--cor-texto-suave);
}

/* Marcada: âmbar cheio + check escuro (o check é a diferença, não só a cor) */
.marcar-caixa:checked {
  background-color: var(--cor-ambar);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231A1205' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E");
  border-color: var(--cor-ambar);
}

.marcar-caixa:focus-visible {
  outline: 3px solid var(--cor-foco);
  outline-offset: 2px;
}

.marcar:has(.marcar-caixa:disabled) {
  color: var(--cor-texto-suave);
  cursor: not-allowed;
}

.marcar-caixa:disabled,
.marcar:hover .marcar-caixa:disabled {
  border-style: dashed;
  border-color: var(--cor-borda-campo);
  cursor: not-allowed;
}

/* Dica alinhada com o texto da caixa (22px + 12px) */
.campo-dica--marcar {
  margin-top: calc(-1 * var(--esp-2));
  padding-left: calc(1.375rem + var(--esp-3));
}

/* --- Campo desativado (Data e Hora com "Ainda sem data") --- */
.campo-controle:disabled,
.campo-controle:disabled:hover {
  color: var(--cor-texto-suave);
  background: transparent;
  border-style: dashed;
  border-color: var(--cor-borda-campo);
  cursor: not-allowed;
}

/* --- "Tempo para sair": fieldset com as plaquinhas --- */
.grupo {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  gap: var(--esp-2);
}

.grupo > legend {
  padding: 0;
  margin-bottom: var(--esp-2);            /* o gap não vale para o legend */
}

.escolhas {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--esp-2);
}

.escolha {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  padding: 0 var(--esp-2);
  font-size: var(--fs-sm);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  text-align: center;
  color: var(--cor-texto);
  background: var(--cor-fundo);
  border: 1px solid var(--cor-borda-campo);
  border-radius: var(--raio-md);
  cursor: pointer;
  transition: background-color var(--transicao), border-color var(--transicao);
}

/* O radio de verdade fica invisível POR CIMA da plaquinha:
   toque, clique, teclado e leitor de tela funcionam normalmente. */
.escolha input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}

.escolha:hover {
  background: var(--cor-superficie-2);
  border-color: var(--cor-texto-suave);
}

.escolha:has(input:focus-visible) {
  outline: 3px solid var(--cor-foco);
  outline-offset: 2px;
}

.escolha:has(input:checked) {
  color: var(--cor-sobre-cor);            /* 10.5:1 */
  background: var(--cor-ambar);
  border-color: var(--cor-ambar);
}

/* Check antes do texto da marcada */
.escolha:has(input:checked)::before {
  content: "";
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  background: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E") center / contain no-repeat;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* Grupo desativado (sem hora ou sem data) */
.grupo:disabled .escolha,
.grupo:disabled .escolha:hover {
  color: var(--cor-texto-suave);
  background: transparent;
  border-style: dashed;
  border-color: var(--cor-borda-campo);
  cursor: not-allowed;
}

.grupo:disabled .escolha:has(input:checked) {
  color: var(--cor-texto);
  background: var(--cor-superficie-2);
}

/* Campo de minutos ("Outro") */
.campo-minutos {
  margin-top: var(--esp-1);
}

.campo-com-sufixo {
  display: flex;
  align-items: center;
  gap: var(--esp-2);
}

.campo-com-sufixo .campo-controle {
  width: 7rem;
  font-variant-numeric: tabular-nums;
}

.campo-sufixo {
  font-family: var(--fonte-mono);
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
}

/* --- Subtítulo da janela no modo "Remarcar compromisso" --- */
.janela-subtitulo {
  margin-top: calc(-1 * var(--esp-3));
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
}

/* --- Aviso flutuante de alerta ("Compromisso continua pendente.") --- */
.status[data-tipo="alerta"] {
  border-left-color: var(--cor-ambar);
}
```

#### 13.11.4 Seção "14. ALTO CONTRASTE DO WINDOWS": acrescentar dentro do `@media (forced-colors: active)`

```css
  /* Etapa 2b */
  .selo,
  .escolha,
  .pendentes,
  .compromisso-hora--sem-data,
  .compromisso-sair[data-estado="logo"] {
    border: 1px solid CanvasText;
  }

  .escolha:has(input:checked) {
    border: 3px solid Highlight;
  }

  .escolha:has(input:checked)::before {
    forced-color-adjust: none;
    background: CanvasText;
  }

  /* a caixa de marcar volta a ser a do sistema (o check desenhado sumiria) */
  .marcar-caixa {
    appearance: auto;
    -webkit-appearance: auto;
  }
```

**Movimento reduzido:** nada novo. As transições novas já são cortadas pela regra geral da seção 13, e nada da 2b tem animação (o estado "Sair em X min" não pisca).

### 13.12 Contraste conferido (WCAG 2.1 AA)

"Pior ponto" = card de "Anteriores" (sem fundo) sobre o brilho âmbar do canto da página, ≈`#271C19`. Painel de pendências = âmbar 7% sobre o fundo, ≈`#201718`.

| Elemento | Cor / fundo | Razão | Mínimo |
|---|---|---|---|
| "Sair às" (texto) | `#B8AAB9` / `#191321` | 8.2:1 | 4.5:1 |
| Hora de sair e ícone | `#FFB547` / `#191321` | 10.4:1 | 4.5:1 |
| "Sair em 12 min" (pílula) | `#1A1205` / `#FFB547` | 10.5:1 | 4.5:1 |
| Pílula contra o card (não-texto) | `#FFB547` / `#191321` | 10.4:1 | 3:1 |
| "Hora de sair: ... (já passou)" | `#B8AAB9` / `#191321` | 8.2:1 | 4.5:1 |
| Selo "COBRAR" | `#FFB547` / `#191321` | 10.4:1 | 4.5:1 |
| Selo "FEITO" | `#8EE6A8` / `#0F0B14` · pior ponto | 13.0 · 11.1:1 | 4.5:1 |
| Selo "NÃO VOU FAZER" | `#C4A8FF` / `#0F0B14` · pior ponto | 9.6 · 8.2:1 | 4.5:1 |
| Selo "PASSOU" | `#B8AAB9` / `#0F0B14` · pior ponto | 8.7 · 7.5:1 | 4.5:1 |
| Ícone do botão "Feito" | `#8EE6A8` / `#191321` | 12.3:1 | 3:1 |
| "Feito" no hover | `#8EE6A8` / `#231A2E` | 11.2:1 | 4.5:1 |
| "Agendar" no hover | `#FFB547` / `#231A2E` | 9.5:1 | 4.5:1 |
| Botões neutros (Desfazer, Remarcar...) | `#B8AAB9` / `#191321` · pior ponto | 8.2 · 7.5:1 | 4.5:1 |
| Título "FICOU PENDENTE" e ícone | `#FFB547` / ≈`#201718` | 9.9:1 | 4.5:1 |
| "(2)" e subtexto do painel | `#B8AAB9` / ≈`#201718` | 7.8:1 | 4.5:1 |
| Texto branco no painel | `#F5EEE6` / ≈`#201718` | 15.1:1 | 4.5:1 |
| "Era para:" / valor | `#B8AAB9` · `#FFB547` / `#191321` | 8.2 · 10.4:1 | 4.5:1 |
| Placa "SEM DATA" | `#C4A8FF` / `#191321` | 9.0:1 | 4.5:1 |
| Borda da caixa de marcar | `#8A7A9C` / `#191321` · `#0F0B14` | 4.6 · 4.9:1 | 3:1 |
| Caixa marcada / check | `#FFB547` / `#191321` · `#1A1205` / `#FFB547` | 10.4 · 10.5:1 | 3:1 |
| Borda das plaquinhas | `#8A7A9C` / `#191321` | 4.6:1 | 3:1 |
| Texto das plaquinhas | `#F5EEE6` / `#0F0B14` | 16.8:1 | 4.5:1 |
| Plaquinha no hover | `#F5EEE6` / `#231A2E` | 14.5:1 | 4.5:1 |
| Plaquinha marcada | `#1A1205` / `#FFB547` | 10.5:1 | 4.5:1 |
| Campo e plaquinha desativados | `#B8AAB9` / `#191321` | 8.2:1 | isento (WCAG 1.4.3), mas legível |
| Sufixo "min", dicas, subtítulo do Remarcar | `#B8AAB9` / `#191321` | 8.2:1 | 4.5:1 |
| Barrinha de alerta do aviso flutuante | `#FFB547` / `#231A2E` | 9.5:1 | 3:1 |
| Foco em tudo o que é novo (inclusive plaquinhas) | `#8FD3FF`, 3px | ≥ 11:1 | 3:1 |

Bordas âmbar do painel, do card na hora de sair, contorno dos selos e tracejado da faixa de botões são **enfeite**: a informação está sempre no texto.

### 13.13 Conferência da Entrega 2b (para o dev e o testador)

| Requisito | Como o visual atende |
|---|---|
| Botões do card quebram linha a 360px, sem rolagem horizontal, 44px | faixa de botões com `flex-wrap`, `.botao-item` de 44px; contas da 13.4.4 |
| "Sair em X min" com destaque que também é texto | pílula âmbar **e** o texto "Sair em 12 min" / "Sair agora" |
| "Sair às" sem anúncio a cada minuto | sem `aria-live` na linha; dica de atualizar só o texto (13.4.2) |
| Situação, "Cobrar", "Sem data" nunca só por cor | selos com texto + ícone; placa "SEM DATA" escrita; "Passou" com contorno tracejado |
| "Ficou pendente" com `h2` e quantidade, sempre aberta, acima da lista | `.pendentes` com `h2` "Ficou pendente (2)", sem botão de abrir |
| "Sem data" igual a "Anteriores" | mesmas classes, `aria-expanded`, começa recolhida, `hidden` sem itens |
| Seções com `h2`, dias com `h3` | pendências e sem data sem grupos por dia (lista simples); "Anteriores" mantém os `h3` |
| Grupo "Tempo para sair" acessível | `fieldset` + `legend` + radios de verdade; `disabled` no `fieldset` com a dica ligada por `aria-describedby` |
| Erro do campo de minutos | mesmo `.campo-erro` da US03 (texto + ícone + borda 2px) |
| Data obrigatória só sem "Ainda sem data" | `#data-obrigatorio` com `hidden`; Data e Hora desativadas com borda tracejada |
| Caixas de marcar com 44px de toque | `.marcar` com `min-height: 44px` (o rótulo inteiro é clicável) |
| Formulário cabe a 360px e rola por dentro | mesma `.janela`; plaquinhas 3 por linha (≈87px cada a 360px) |
| `#erro-salvar` visível a 320 × 568 | correção da 13.11.2 |
| Alto contraste e movimento reduzido | 13.11.4; nada novo anima |

### 13.14 Decisões aprovadas pelo João (2026-11-06)

As 5 decisões abaixo foram aprovadas pelo João em 2026-11-06, sem mudanças.

1. **Botões embaixo do texto também no computador:** com 3 ou 4 botões (Feito, Remarcar, Não vou fazer, Excluir) eles não cabem mais à direita. No celular ficam numa faixa com tracejado em cima.
2. **"Ficou pendente" em âmbar** (painel com filete à esquerda, no topo da página), sem criar cor nova.
3. **Cores das situações em "Anteriores":** Feito verde, Não vou fazer lilás, Passou cinza tracejado, sempre com texto e ícone.
4. **"Sair em X min" vira uma pílula âmbar cheia** e a borda do card fica âmbar nesse intervalo; depois da hora de sair, a linha fica cinza.
5. **Textos sugeridos (não estão nos requisitos):** o subtexto "Passou da data e você pediu para ser cobrado.", o rótulo "Minutos antes", a dica "De 1 a 720 minutos (12 horas).", a linha "Era para: ..." no topo do formulário "Remarcar compromisso" e a barrinha âmbar (alerta) no aviso "Compromisso continua pendente.".

---

## 14. Etapa 3 — Entrega 3a (o que levar, hora de fim, conflito e aperto)

Cobre a **Agenda US17** (checklist no formulário), **US18** (checklist no card), **US19** (hora de fim), **US20** (conflito e aperto) e as mudanças da 3a nas stories anteriores. Tudo **se soma** às seções 1 a 13: mesmas cores, fontes, espaços, janelas, botões, caixas de marcar (`.marcar`) e grupos (`.grupo`). O tema claro **não** é desenhado aqui (é da 3b), mas todo o CSS novo usa **só variáveis** (`var(--...)`): nenhum hex novo, para a 3b só trocar os valores.

### 14.1 Ideia visual

No "quadro de partidas", a 3a dá a cada partida **a hora de chegada, a bagagem e o aviso de atraso**.
- **Hora de fim** = a plaquinha que vira mostra **as duas horas**: a de início na metade de cima (âmbar, como sempre) e a de fim na metade de baixo, menor e em cinza suave. É exatamente o desenho de duas metades que a placa já tinha (seção 7.4): agora cada metade tem um papel.
- **"O que levar"** = a **bagagem de mão**: um botão com ícone de mala, que abre a lista para conferir na porta de casa. Lilás no ícone (a cor das coisas "sem hora"); quando tudo está marcado, vira verde, a mesma cor de "Feito", e diz "tudo pronto".
- **Conflito e aperto** = o **aviso do painel** ("plataforma alterada", "atraso"): uma tarja curta dentro do card, com filete colorido à esquerda, ícone e a palavra "Conflito:" ou "Aperto:" em negrito. Conflito em **vermelho** (os dois se atropelam), aperto em **âmbar** (dá, mas é corrido; âmbar é a cor do tempo).

Nenhuma cor nova: âmbar, lilás, verde, vermelho e cinza suave já existiam.

### 14.2 Reaproveitado x novo

| Parte | Reaproveita | Novo (e por quê) |
|---|---|---|
| Placa de hora | `.compromisso-hora` (duas metades) | `.compromisso-hora--intervalo` e `.compromisso-hora-fim` (início em cima, fim embaixo) |
| Aviso no card | `.icone`, cores `--cor-perigo` e `--cor-ambar` | `.compromisso-aviso`, `--conflito`, `--aperto`, `.compromisso-aviso-tipo` |
| Checklist no card | `.marcar` e `.marcar-caixa` da 2b (caixa de 22px, linha de 44px, check âmbar), seta que gira de "Anteriores" | `.checklist`, `.checklist-botao`, `.checklist-lista`, `.checklist-item`, `.checklist--pronto` |
| Hora de fim no formulário | `.grupo` (fieldset), `.campos-linha`, `.campo`, `.campo-erro`, `.campo-dica`, `.campo-minutos`, `.campo-com-sufixo` | `.grupo-filete` (os campos do grupo ganham um filete à esquerda), `.campo-selecao` (seta da lista de escolha), `.campo-controle.ajustado` (opcional, 14.3.2) |
| "O que levar" no formulário | `.grupo`, `.campo-controle`, `.btn btn-secundario`, `.botao-item--perigo`, `.sr-only` | `.itens-lista`, `.item-form`, `.item-form-texto`, `.item-form--marcado`, `.itens-novo`, `.botao-adicionar` |
| Ícones | padrão da 8.2 | mala, conflito, aperto, remover (14.8) |

### 14.3 Formulário na 3a

#### 14.3.1 Ordem dos campos

Título · Data (com "Ainda sem data") | Hora · **Hora de fim** ("Termina às" | "Duração", e "Minutos" com "Outro") · Tempo para sair · Me cobrar · Local · Observação · **O que levar** · (erro de salvar) · barra de botões.

"Hora de fim" fica logo depois da Hora (requisitos), **antes** de "Tempo para sair": as duas coisas que dependem da hora ficam juntas, e a de fim vem primeiro porque é sobre o próprio compromisso.

```
360px (280px por dentro da janela)
+-----------------------------------+  borda de cima âmbar
| Novo compromisso                  |
| Título (obrigatório)              |
| [                               ] |
| Data (obrigatório)                |
| [ 06/11/2026              (cal) ] |
| [ ] Ainda sem data                |
| Hora                              |
| [ 09:00                   (rel) ] |
| Deixe em branco para um...        |
| Hora de fim                       |  legend (14px 600)
| Preencha um dos dois: o outro se  |  dica suave
| ajusta sozinho.                   |
| ┃ Termina às                      |  filete de 2px à esquerda
| ┃ [ 10:30                 (rel) ] |  (um embaixo do outro até 479px)
| ┃ Duração                         |
| ┃ [ Outro                     v ] |  select com seta própria
| ┃ Minutos                         |  só com "Outro"
| ┃ [ 90      ] min                 |
| ┃ De 1 a 1439 minutos.            |
| Tempo para sair                   |
| [✓ Nenhum ][ 15 min ][ 30 min ]   |
| ...                               |
| Observação                        |
| [                               ] |
| O que levar                       |  legend
| +-------------------------------+ |
| | ▪ Cartão do convênio [x Remover]| |  linha 48px, fundo "afundado"
| +-------------------------------+ |
| | ▪ Documento com foto [x Remover]| |
| +-------------------------------+ |
| Novo item                         |  rótulo
| [ Ex.: chave         ][+ Adicionar] |  campo + botão na mesma linha
|-----------------------------------|
| [  Cancelar  ]   [   Salvar    ]  |
+-----------------------------------+
```

A partir de **480px**, "Termina às" e "Duração" ficam **lado a lado** (mesma regra de Data | Hora, `.campos-linha`). Abaixo disso ficam um embaixo do outro: a 360px cada metade teria 134px, e o `select` com "Sem hora de fim" precisa de ≈175px.

#### 14.3.2 Hora de fim (US19)

```html
<fieldset class="grupo" id="grupo-fim" aria-describedby="dica-fim dica-fim-sem-hora">
  <legend class="campo-rotulo">Hora de fim</legend>
  <p class="campo-dica" id="dica-fim">Preencha um dos dois: o outro se ajusta sozinho.</p>
  <p class="campo-dica" id="dica-fim-sem-hora" hidden>Escolha uma hora para usar a hora de fim.</p>

  <div class="grupo-filete">
    <div class="campos-linha">
      <div class="campo">
        <label class="campo-rotulo" for="campo-fim">Termina às</label>
        <input class="campo-controle" id="campo-fim" name="fim" type="time">
        <p class="campo-erro" id="erro-fim" hidden><!-- svg "alerta" --><span>A hora de fim precisa ser depois da hora de início.</span></p>
      </div>
      <div class="campo">
        <label class="campo-rotulo" for="campo-duracao">Duração</label>
        <div class="campo-selecao">
          <select class="campo-controle" id="campo-duracao" name="duracao">
            <option value="" selected>Sem hora de fim</option>
            <option value="30">30 min</option>
            <option value="60">1 h</option>
            <option value="120">2 h</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <p class="campo-erro" id="erro-duracao" hidden><!-- svg "alerta" --><span>Com essa duração, o compromisso passaria da meia-noite. Escolha uma duração menor.</span></p>
      </div>
    </div>

    <div class="campo campo-minutos" id="bloco-duracao-min" hidden>
      <label class="campo-rotulo" for="campo-duracao-min">Minutos</label>
      <div class="campo-com-sufixo">
        <input class="campo-controle" id="campo-duracao-min" name="duracaoMin" type="number" inputmode="numeric" min="1" max="1439" step="1" aria-describedby="dica-duracao-min" data-dica="dica-duracao-min">
        <span class="campo-sufixo" aria-hidden="true">min</span>
      </div>
      <p class="campo-dica" id="dica-duracao-min">De 1 a 1439 minutos.</p>
      <p class="campo-erro" id="erro-duracao-min" hidden><!-- svg "alerta" --><span>Digite um número de minutos entre 1 e 1439.</span></p>
    </div>
  </div>
</fieldset>
```

Regras do visual (o comportamento está na US19):
- **Ids novos não colidem com os da 2b:** o "Minutos antes" do "Tempo para sair" continua `campo-minutos` / `erro-minutos`; o desta parte é `campo-duracao-min` / `erro-duracao-min`.
- **Sem hora** (Hora vazia ou "Ainda sem data"): `disabled` no `fieldset` (desativa os três campos de uma vez, com a borda tracejada da 2b), `hidden` no `#dica-fim` e **sem** `hidden` no `#dica-fim-sem-hora`. Os campos aparecem vazios ("Sem hora de fim"). Com a Hora de volta, inverte.
- **"Outro"** tira o `hidden` do `#bloco-duracao-min` (mesmo jeito do "Tempo para sair").
- **Erros:** os três seguem a US03 (`aria-invalid="true"`, borda vermelha de 2px, mensagem com ícone embaixo do campo, `aria-describedby` com a mensagem; no campo de minutos, `"dica-duracao-min erro-duracao-min"`, como na 2b). O erro de "Termina às" fica embaixo dele; o da duração, embaixo do `select`.
- **Um preenche o outro (opcional, enfeite):** quando o JS muda sozinho o valor de "Termina às" ou da Duração, pode pôr a classe `ajustado` no campo que mudou por ~1 s (a borda acende em âmbar e apaga). Mostra para quem enxerga "isto mudou por causa do que você digitou". Não é anunciado pelo leitor de tela (a dica "Preencha um dos dois: o outro se ajusta sozinho." já explica). Com `prefers-reduced-motion`, a regra geral da seção 13 do CSS corta a animação.
- O `select` usa a aparência do próprio sistema por dentro (a lista que abre é a do celular), só com a caixa fechada redesenhada: mesma altura (48px), borda e fundo dos outros campos, e uma **seta própria** à direita, desenhada com `mask` em `currentColor` (assim a 3b muda a cor só pela variável).

#### 14.3.3 "O que levar" no formulário (US17)

```html
<fieldset class="grupo" id="grupo-itens">
  <legend class="campo-rotulo">O que levar</legend>

  <!-- O JS monta aqui os itens. Sem itens, a lista fica vazia (o CSS a esconde). -->
  <ul class="itens-lista" id="itens-lista" aria-label="Itens para levar">
    <li class="item-form">
      <span class="item-form-texto">Cartão do convênio</span>
      <button class="botao-item botao-item--perigo" type="button" data-acao="remover-item" data-indice="0"><!-- svg "remover" -->Remover<span class="sr-only"> Cartão do convênio</span></button>
    </li>
    <li class="item-form item-form--marcado">
      <span class="item-form-texto">Documento com foto<span class="sr-only"> (já marcado)</span></span>
      <button class="botao-item botao-item--perigo" type="button" data-acao="remover-item" data-indice="1"><!-- svg "remover" -->Remover<span class="sr-only"> Documento com foto</span></button>
    </li>
  </ul>

  <div class="campo">
    <label class="campo-rotulo" for="campo-novo-item">Novo item</label>
    <div class="itens-novo">
      <input class="campo-controle" id="campo-novo-item" type="text" maxlength="60" autocomplete="off" placeholder="Ex.: chave" enterkeyhint="done">
      <button class="btn btn-secundario botao-adicionar" type="button" id="botao-adicionar"><!-- svg "mais" -->Adicionar</button>
    </div>
    <p class="campo-dica" id="dica-itens-limite" hidden>Limite de 20 itens.</p>
  </div>

  <!-- Região de avisos do formulário (só para o leitor de tela). SEMPRE no HTML, vazia. -->
  <p class="sr-only" id="itens-aviso" aria-live="polite"></p>
</fieldset>
```

Regras do visual (o comportamento está na US17):
- **Lista em cima, campo embaixo:** o item novo entra no fim da lista, logo **acima** do campo onde a pessoa está digitando. O olho vê o item aparecer sem sair do lugar, e o foco continua no campo.
- **Cada item** é uma linha de no mínimo 48px, com o fundo "afundado" dos campos (`--cor-fundo`), borda decorativa, um quadradinho lilás antes do texto (o mesmo enfeite do "Agenda▪") e o botão "Remover" (o `.botao-item--perigo` do card, com ícone de "x": vermelho só no hover). Texto longo quebra linha (`overflow-wrap: anywhere`); o botão fica alinhado em cima.
- **Item já marcado no card** (ao editar): o texto aparece **riscado e em cinza suave**, e o leitor de tela ouve "(já marcado)". Assim a pessoa sabe que remover e adicionar de novo perde a marca. Ele não pode ser marcado aqui (marcar é no card, US18).
- **"Adicionar"** é o botão secundário (contorno), com ícone "+", 48px de altura e cantos de campo (10px), para formar uma peça só com o campo. A 360px: botão ≈128px, campo ≈144px. O `placeholder` é só exemplo (o rótulo "Novo item" é visível e é ele que dá o nome do campo).
- **Com 20 itens:** o campo e o botão ficam com a aparência de desativado (borda tracejada, texto suave) e aparece a dica "Limite de 20 itens.", ligada ao campo por `aria-describedby="dica-itens-limite"`. Ver a nota sobre o foco em 14.6.
- **Avisos** "Cartão do convênio adicionado." / "Cartão do convênio removido." vão no `#itens-aviso` (escondido da tela; para quem enxerga, o próprio item aparecendo ou sumindo já é o aviso). O texto do item entra com `textContent`. Limpar o `#itens-aviso` ao abrir o formulário.
- O grupo funciona igual com "Ainda sem data" marcada (não é desativado).

#### 14.3.4 Contas a 360px

| Parte | Conta | Cabe? |
|---|---|---|
| Janela | 328px − 2 × 24px de espaço interno = **280px** | — |
| Termina às / Duração | um embaixo do outro, 280px cada; filete 2px + 12px → campos com 266px | sim |
| Linha "Novo item" | campo ≈144 + 8 + "Adicionar" ≈128 = 280 | sim |
| Item da lista | 12 + quadradinho 6 + 8 + texto ≈136 + 8 + "Remover" ≈106 + 4 = 280 | sim (o texto quebra linha) |
| Minutos | campo de 7rem + "min" | sim |

### 14.4 Card na 3a

#### 14.4.1 Placa com hora de fim (US19)

```html
<div class="compromisso-hora compromisso-hora--intervalo">
  <span class="sr-only">Das </span>
  <time datetime="2026-11-14T09:30">09:30</time>
  <span class="compromisso-hora-fim"><span aria-hidden="true">–</span><span class="sr-only"> às </span><time datetime="2026-11-14T10:30">10:30</time></span>
</div>
```

```
sem fim     com fim (decisão 1)
+------+    +------+
|      |    |09:30 |   metade de cima: início, mono 600 17px âmbar
|09:30 |    |------|   (a linha do meio já é a da placa)
|      |    |–10:30|   metade de baixo: fim, mono 400 14px cinza suave
+------+    +------+
```

- A placa com intervalo tem 2 linhas iguais (`grid-template-rows: 1fr 1fr`), cada hora na sua metade, e cresce para 60px de altura.
- O leitor de tela ouve "Das 09:30 às 10:30" (o "–" é decorativo). Quem enxerga vê "09:30" em cima de "–10:30".
- **Conta:** "–10:30" em mono 14px ≈ 8.4 × 6 + 2px = **53px**, cabe nos 60px úteis da placa de 64px (celular). No computador a placa tem 76px.
- **Em "Anteriores":** as duas horas em cinza suave (regra da `.compromisso--anterior`). Em "Ficou pendente", igual à lista principal. Sem hora de fim: a placa de sempre.
- A hora de fim **não muda** o resto do card ("Sair às", ordem, "Era para: Ontem · 09:30" continua com a hora de início).

#### 14.4.2 Aviso de conflito e de aperto (US20)

Fica **dentro do `.compromisso-corpo`**, logo depois da linha de meta ("Sair às" e "Cobrar") e **antes** do local. Só na lista "Próximos compromissos". Sem aviso, não criar o elemento.

```html
<p class="compromisso-aviso compromisso-aviso--conflito">
  <!-- svg "conflito" -->
  <span><strong class="compromisso-aviso-tipo">Conflito:</strong> Dentista vai até 10:30.</span>
</p>

<p class="compromisso-aviso compromisso-aviso--aperto">
  <!-- svg "aperto" -->
  <span><strong class="compromisso-aviso-tipo">Aperto:</strong> sair às 10:15, mas Dentista vai até 10:30.</span>
</p>
```

| Tipo | Texto | Visual |
|---|---|---|
| Conflito | "**Conflito:** Dentista vai até 10:30." / "**Conflito:** mesmo horário de Dentista." | tarja com fundo vermelho 10% sobre o card, filete vermelho de 3px à esquerda, ícone de dois blocos sobrepostos, "Conflito:" em vermelho 700, resto em branco |
| Aperto | "**Aperto:** sair às 10:15, mas Dentista vai até 10:30." | a mesma tarja em âmbar, ícone de ampulheta, "Aperto:" em âmbar 700 |

```
360px
+----------------------------------+
| +------+ Reunião do TCC          |
| |10:00 | (porta) Sair às 09:45   |
| |------| ┃(▣▣) Conflito: Dentista |  tarja 14px, quebra linha
| |–11:00| ┃vai até 10:30.          |
| +------+ (pino) Biblioteca       |
| [ (mala) O que levar (2 de 5)  v ] |  botão do checklist (14.4.3)
| - - - - - - - - - - - - - - - - -  |
| [✓ Feito] [Editar] [Excluir]       |
+----------------------------------+
```

- **Nada só por cor:** a palavra "Conflito:" ou "Aperto:" vem sempre escrita e em negrito, e cada tipo tem um ícone diferente. A cor é reforço.
- O título do outro compromisso entra com `textContent` (o JS monta o `strong` e depois um nó de texto com o resto da frase).
- O card **não** muda de borda por causa do aviso: a única borda que acende continua sendo a do "Sair em X min" (13.4.2). Assim a tela não fica cheia de cards coloridos num dia lotado.
- **Sem `aria-live`** (requisitos): o aviso é lido quando o leitor de tela passa pelo card, como o resto do texto.
- A 360px a tarja tem a largura da coluna do texto (≈228px) e quebra linha.

#### 14.4.3 "O que levar" no card (US18)

Fica **depois do `.compromisso-corpo` e antes da faixa de botões**, como filho direto do `li`. Celular: ocupa a largura toda do card (como a faixa de botões, para o polegar e para textos longos). Computador (≥ 640px): fica na coluna do texto, alinhado com o título.

```html
<div class="checklist">
  <button class="checklist-botao" type="button" aria-expanded="false" aria-controls="checklist-c-1731590400000-k3f9">
    <!-- svg "mala" com class="icone checklist-icone" -->
    <span class="checklist-rotulo">O que levar <span class="checklist-contagem">(2 de 5)</span></span>
    <span class="sr-only">, Dentista</span>
    <!-- svg "seta" com class="icone checklist-seta" -->
  </button>
  <ul class="checklist-lista" id="checklist-c-1731590400000-k3f9" aria-label="O que levar: Dentista" hidden>
    <li>
      <label class="marcar checklist-item">
        <input class="marcar-caixa" type="checkbox" data-indice="0" checked>
        <span>Cartão do convênio</span>
      </label>
    </li>
    <li>
      <label class="marcar checklist-item">
        <input class="marcar-caixa" type="checkbox" data-indice="1">
        <span>Documento com foto</span>
      </label>
    </li>
  </ul>
</div>
```

**Tudo marcado:** a `div` ganha `checklist--pronto`, o ícone de mala vira o ícone "feito" (check) e o texto vira "O que levar: tudo pronto (5 de 5)":
```html
<div class="checklist checklist--pronto">
  <button class="checklist-botao" ...>
    <!-- svg "feito" com class="icone checklist-icone" -->
    <span class="checklist-rotulo">O que levar: tudo pronto <span class="checklist-contagem">(5 de 5)</span></span>
    ...
```

```
fechado            [ (mala) O que levar (2 de 5)              v ]
aberto             [ (mala) O que levar (2 de 5)              ^ ]
                     [✓] ~~Cartão do convênio~~     <- riscado e cinza
                     [ ] Documento com foto
                     [ ] Guarda-chuva
tudo pronto        [ (✓) O que levar: tudo pronto (5 de 5)    v ]   <- ícone e texto verdes
```

- **Botão:** 44px de altura, largura toda no celular (no computador, só a do conteúdo), contorno `--cor-borda-campo`, sem fundo, cantos de 10px, ícone de mala lilás, "O que levar" em 14px 600, "(2 de 5)" em mono suave, seta à direita que gira 180° quando abre (a mesma de "Anteriores"). Hover: fundo `--cor-superficie-2`.
- **Nome acessível:** "O que levar (2 de 5), Dentista" (começa pelo texto visível; o título vai em `sr-only` porque há vários botões iguais na página). O `aria-expanded` diz se está aberto.
- **Começa fechado** sempre que a página abre. O JS guarda numa lista (`Set`) os `id`s abertos para reabrir depois de cada redesenho (a cada minuto e depois de marcar). **Sem animação** ao abrir (a lista é redesenhada a cada minuto).
- **Cada item:** a caixa de marcar da 2b (22px, check âmbar), texto em 16px (é para ler rápido na porta de casa), linha de no mínimo 44px, a linha inteira é clicável (`label`), hover com fundo `--cor-superficie-2`. Texto longo quebra linha; a caixa fica alinhada com a primeira linha.
- **Marcado:** caixa âmbar **com check** + texto **riscado** (traço de 2px) e em cinza suave. Três sinais, nenhum depende só da cor.
- **Leitor de tela:** cada caixa é um `checkbox` de verdade com o texto como rótulo ("Cartão do convênio, caixa de seleção, marcada"). Ao marcar, o próprio leitor anuncia "marcado"/"desmarcado"; não usar o aviso flutuante.
- **Foco depois de marcar:** continua na mesma caixa. Se o dev redesenhar a lista inteira, precisa devolver o foco à caixa com o mesmo `data-id` + `data-indice` (dica: em vez de redesenhar, trocar só o texto do botão e a classe `--pronto`).
- **Igual em todas as seções** ("Próximos", "Ficou pendente", "Sem data" e "Anteriores"). No card tracejado de "Anteriores" o botão também fica sem fundo, então ele combina com o card "apagado" sem regra extra.

#### 14.4.4 Ordem dentro do card (e do Tab)

`li.compromisso` → placa · corpo (título, meta, **aviso**, local, observação) · **checklist** (botão, caixas) · faixa de botões (Feito, Editar, Excluir...).

O Tab passa: botão "O que levar" → caixas (se aberto) → Feito → Editar → Excluir. A ação do card continua por último, e "Excluir" continua sendo o último de todos.

```
≥ 640px
+--------------------------------------------------------------+
| +-------+  Reunião do TCC                                    |
| | 10:00 |  (porta) Sair às 09:45                             |
| |-------|  ┃(▣▣) Conflito: Dentista vai até 10:30.           |
| |–11:00 |  (pino) Biblioteca                                 |
| +-------+  [ (mala) O que levar (2 de 5)  v ]                |
|            [✓ Feito] [Editar] [Excluir]                      |
+--------------------------------------------------------------+
```

### 14.5 Mensagens (erros e avisos)

| Situação | Onde | Texto |
|---|---|---|
| "Termina às" igual ou antes da Hora | `#erro-fim`, embaixo de "Termina às" | "A hora de fim precisa ser depois da hora de início." |
| Duração passa de 23:59 ("Termina às" vazio) | `#erro-duracao`, embaixo da Duração | "Com essa duração, o compromisso passaria da meia-noite. Escolha uma duração menor." |
| "Outro" com minutos vazios ou fora de 1 a 1439 | `#erro-duracao-min` | "Digite um número de minutos entre 1 e 1439." |
| Adicionou / removeu item no formulário | `#itens-aviso` (só leitor de tela) | "Cartão do convênio adicionado." / "Cartão do convênio removido." |
| 20 itens | `#dica-itens-limite` (dica, não erro: cinza, sem ícone) | "Limite de 20 itens." |
| Marcar item no card falhou (`localStorage` cheio) | aviso flutuante `#status`, `data-tipo="erro"` (barrinha vermelha) | "Não foi possível salvar o compromisso." |
| Sem hora | `#dica-fim-sem-hora` | "Escolha uma hora para usar a hora de fim." |

Os três erros são iguais aos da US03 (texto + ícone + borda de 2px + fundo levemente vermelho). Marcar item com sucesso **não** tem aviso flutuante (US18).

### 14.6 Teclado e foco

| Ação | Para onde vai o foco |
|---|---|
| Tentar salvar com erro | primeiro campo com problema, **na ordem do formulário**: Título → Data → Termina às → Duração → Minutos (da duração) → Minutos antes (do "Tempo para sair") |
| Enter em "Novo item" | adiciona e o foco **fica** no campo (não salva o formulário) |
| "Adicionar" com o mouse/toque | adiciona e o foco vai para o campo "Novo item" |
| "Remover" | próximo item ("Remover" dele) ou, se era o último, o campo "Novo item" |
| Abrir/fechar "O que levar" no card | fica no botão |
| Marcar/desmarcar no card | fica na caixa |

- **Nota sobre o 20º item (para o dev e o testador):** se o campo "Novo item" recebesse `disabled` com o foco dentro dele (logo depois de adicionar o 20º com Enter), o foco se perderia para o topo da página. Por isso, com 20 itens, o campo recebe **`aria-disabled="true"` e `readonly`** (continua focável, o leitor de tela diz "indisponível" e o JS ignora o Enter) e o botão "Adicionar" recebe `disabled` de verdade. Visualmente os dois ficam iguais a um campo desativado (CSS em 14.9). Ao remover um item, os dois voltam.
- Foco visível: o mesmo contorno azul-céu de 3px em tudo o que é novo (botão do checklist, caixas, `select`, "Adicionar", "Remover").
- Setas do teclado no `select` trocam a opção (comportamento do navegador); cada troca já preenche "Termina às" (US19).

### 14.7 Leitor de tela

| Parte | O que é lido |
|---|---|
| Placa com intervalo | "Das 09:30 às 10:30" |
| Grupo "Hora de fim" | "Hora de fim, grupo, Preencha um dos dois: o outro se ajusta sozinho." e depois "Termina às", "Duração, caixa de combinação, Sem hora de fim" |
| Grupo desativado | "Hora de fim, grupo, indisponível, Escolha uma hora para usar a hora de fim." |
| Item no formulário | "Cartão do convênio" + botão "Remover Cartão do convênio"; item marcado: "Documento com foto (já marcado)" |
| Botão do checklist | "O que levar (2 de 5), Dentista, botão, recolhido" |
| Caixas do checklist | lista "O que levar: Dentista", 5 itens; "Cartão do convênio, caixa de seleção, marcada" |
| Aviso no card | "Conflito: Dentista vai até 10:30." (lido com o card, sem `aria-live`) |

### 14.8 Ícones novos (mesmo padrão da 8.2: `viewBox="0 0 24 24"`, traço 2, `currentColor`, `aria-hidden="true" focusable="false"`)

| Nome | Onde | Miolo |
|---|---|---|
| mala | botão "O que levar" | `<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 12.5h18"/>` |
| conflito | aviso "Conflito" | `<rect x="3" y="4" width="12" height="10" rx="2"/><rect x="9" y="10" width="12" height="10" rx="2"/>` |
| aperto | aviso "Aperto" | `<path d="M6 3h12M6 21h12"/><path d="M7 3v2a5 5 0 0 0 10 0V3M7 21v-2a5 5 0 0 1 10 0v2"/>` |
| remover | botão "Remover" (formulário) | `<path d="M6 6l12 12M18 6L6 18"/>` |

Reaproveitados: "mais" (Adicionar), "feito" (estado "tudo pronto"), "seta" (abrir/fechar o checklist), "alerta" (erros). Tamanhos: 16px no aviso do card, 18px nos botões, 20px no "Adicionar".

### 14.9 CSS de referência da Entrega 3a

Duas mudanças no `css/style.css`: uma seção nova e um acréscimo no alto contraste. **Nenhum hex novo**: só variáveis, para a 3b (tema claro) trocar os valores num lugar só.

#### 14.9.1 Nova seção "12d": acrescentar logo **depois** da "12c. ETAPA 2b" e **antes** da "13. MOVIMENTO REDUZIDO"

```css
/* ---------------------------------------------------------
   12d. ETAPA 3a: O QUE LEVAR, HORA DE FIM, CONFLITO E APERTO
   Decisões em: design.md, seção 14.
   Só variáveis (nada de hex): o tema claro da 3b troca os valores.
   --------------------------------------------------------- */

/* --- Placa com hora de fim: início em cima, fim embaixo --- */
.compromisso-hora--intervalo {
  grid-template-rows: 1fr 1fr;            /* uma hora em cada metade da placa */
  min-height: 3.75rem;                    /* 60px */
  padding: var(--esp-1) 2px;
}

.compromisso-hora-fim {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: var(--fs-sm);
  font-weight: 400;
  color: var(--cor-texto-suave);          /* 7.9:1 na metade de baixo */
}

/* --- Aviso de conflito e de aperto (só na lista principal) --- */
.compromisso-aviso {
  --aviso-cor: var(--cor-perigo);
  display: flex;
  align-items: flex-start;
  gap: var(--esp-2);
  margin-block: 2px;
  padding: 6px var(--esp-2);
  font-size: var(--fs-sm);
  line-height: 1.4;
  color: var(--cor-texto);
  background: color-mix(in srgb, var(--aviso-cor) 10%, var(--cor-superficie));
  border-left: 3px solid var(--aviso-cor);
  border-radius: var(--raio-sm);
  overflow-wrap: anywhere;
}

.compromisso-aviso--conflito { --aviso-cor: var(--cor-perigo); }   /* "Conflito:" 6.3:1 */
.compromisso-aviso--aperto   { --aviso-cor: var(--cor-ambar); }    /* "Aperto:" 8.6:1 */

.compromisso-aviso .icone {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  color: var(--aviso-cor);
}

.compromisso-aviso-tipo {
  font-weight: 700;
  color: var(--aviso-cor);
}

/* --- "O que levar" no card --- */
.checklist {
  grid-column: 1 / -1;                    /* celular: largura toda do card */
  display: flex;
  flex-direction: column;
  gap: var(--esp-1);
  min-width: 0;
}

@media (min-width: 640px) {
  .checklist {
    grid-column: 2;                       /* computador: coluna do texto */
  }
}

.checklist-botao {
  display: flex;
  align-items: center;
  gap: var(--esp-2);
  width: 100%;
  min-height: 44px;
  padding: var(--esp-2) var(--esp-3);
  font-size: var(--fs-sm);
  font-weight: 600;
  line-height: 1.3;
  text-align: left;
  color: var(--cor-texto);
  background: transparent;
  border: 1px solid var(--cor-borda-campo);
  border-radius: var(--raio-md);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color var(--transicao), border-color var(--transicao);
}

@media (min-width: 640px) {
  .checklist-botao {
    width: fit-content;
    max-width: 100%;
  }
}

.checklist-botao:hover {
  background: var(--cor-superficie-2);
  border-color: var(--cor-texto-suave);
}

.checklist-botao .icone {
  width: 18px;
  height: 18px;
}

.checklist-icone {
  color: var(--cor-lilas);                /* 9.0:1 no card */
}

.checklist-rotulo {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.checklist-contagem {
  font-family: var(--fonte-mono);
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  color: var(--cor-texto-suave);
}

.checklist-seta {
  color: var(--cor-texto-suave);
  transition: transform var(--transicao);
}

.checklist-botao[aria-expanded="true"] .checklist-seta {
  transform: rotate(180deg);
}

/* Tudo marcado: ícone (check) e texto verdes, e o texto diz "tudo pronto" */
.checklist--pronto .checklist-icone,
.checklist--pronto .checklist-rotulo {
  color: var(--cor-sucesso);              /* 12.3:1 no card */
}

.checklist-lista {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* Cada item: a caixa de marcar da 2b, na linha inteira */
.checklist-item {
  width: 100%;
  align-items: flex-start;
  padding: 11px var(--esp-3);             /* 11 + 22 + 11 = 44px de toque */
  font-size: var(--fs-base);
  font-weight: 400;
  line-height: 1.4;
  border-radius: var(--raio-md);
  transition: background-color var(--transicao);
}

.checklist-item > span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.checklist-item:hover {
  background: var(--cor-superficie-2);
}

/* Marcado: caixa com check + texto riscado e cinza (três sinais) */
.checklist-item:has(.marcar-caixa:checked) > span {
  color: var(--cor-texto-suave);
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}

/* --- Formulário: grupo "Hora de fim" --- */
.grupo-filete {
  display: flex;
  flex-direction: column;
  gap: var(--esp-3);
  padding-left: var(--esp-3);
  border-left: 2px solid var(--cor-borda);   /* enfeite: junta os campos do grupo */
}

/* Lista de escolha (Duração) com a seta da Agenda */
.campo-selecao {
  position: relative;
}

.campo-selecao select.campo-controle {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 2.75rem;
  cursor: pointer;
}

.campo-selecao select.campo-controle[aria-invalid="true"] {
  padding-right: calc(2.75rem - 1px);     /* a regra de erro troca o padding todo */
}

.campo-selecao select.campo-controle:disabled {
  cursor: not-allowed;
}

.campo-selecao select option {
  color: var(--cor-texto);
  background: var(--cor-superficie);
}

.campo-selecao::after {
  content: "";
  position: absolute;
  top: 50%;
  right: var(--esp-3);
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
  pointer-events: none;                   /* o toque "passa" para o select */
  background: var(--cor-texto-suave);     /* 8.7:1 no campo */
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") center / contain no-repeat;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* Opcional: o campo que o JS ajustou sozinho acende em âmbar e apaga */
.campo-controle.ajustado {
  animation: campo-ajustado 900ms ease-out;
}

@keyframes campo-ajustado {
  from {
    border-color: var(--cor-ambar);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cor-ambar) 35%, transparent);
  }
}

/* --- Formulário: grupo "O que levar" --- */
.itens-lista {
  display: flex;
  flex-direction: column;
  gap: var(--esp-2);
}

.itens-lista:empty {
  display: none;                          /* sem itens, sem espaço vazio */
}

.item-form {
  display: flex;
  align-items: flex-start;
  gap: var(--esp-2);
  min-height: 48px;
  padding: 1px 1px 1px var(--esp-3);
  background: var(--cor-fundo);
  border: 1px solid var(--cor-borda);     /* enfeite: o texto e o botão dizem o que é */
  border-radius: var(--raio-md);
}

.item-form-texto {
  flex: 1;
  min-width: 0;
  padding-block: var(--esp-3) var(--esp-2);
  overflow-wrap: anywhere;
}

/* Quadradinho lilás antes do texto (o mesmo enfeite do "Agenda▪") */
.item-form-texto::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 0 var(--esp-2) 2px 0;
  vertical-align: middle;
  background: var(--cor-lilas);
  border-radius: 1px;
}

.item-form--marcado .item-form-texto {
  color: var(--cor-texto-suave);          /* 8.7:1 */
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}

.item-form .botao-item {
  flex-shrink: 0;
}

.itens-novo {
  display: flex;
  align-items: stretch;
  gap: var(--esp-2);
}

.itens-novo .campo-controle {
  flex: 1;
}

.botao-adicionar {
  flex-shrink: 0;
  min-height: 48px;                       /* mesma altura do campo */
  padding-inline: var(--esp-3);
  border-radius: var(--raio-md);          /* cantos de campo: uma peça só */
}

/* 20 itens: campo e botão com cara de desativado.
   O campo usa aria-disabled + readonly (não perde o foco, ver 14.6). */
.itens-novo .campo-controle[aria-disabled="true"],
.itens-novo .campo-controle[aria-disabled="true"]:hover {
  color: var(--cor-texto-suave);
  background: transparent;
  border-style: dashed;
  border-color: var(--cor-borda-campo);
  cursor: not-allowed;
}

.botao-adicionar:disabled,
.botao-adicionar:disabled:hover {
  color: var(--cor-texto-suave);
  background: transparent;
  border-style: dashed;
  border-color: var(--cor-borda-campo);
  cursor: not-allowed;
  transform: none;
}
```

#### 14.9.2 Seção "14. ALTO CONTRASTE DO WINDOWS": acrescentar dentro do `@media (forced-colors: active)`

```css
  /* Etapa 3a */
  .checklist-botao,
  .compromisso-aviso,
  .item-form {
    border: 1px solid CanvasText;
  }

  .compromisso-aviso {
    border-left-width: 3px;
  }

  /* a seta do select é um fundo com máscara: sem isto ela sumiria */
  .campo-selecao::after {
    forced-color-adjust: none;
    background: CanvasText;
  }
```

**Movimento reduzido:** nada novo a acrescentar. O giro da seta e o "acender" opcional do campo ajustado já são cortados pela regra geral da seção 13 do CSS.

### 14.10 Contraste conferido (WCAG 2.1 AA, tema escuro)

"Pior ponto" = card de "Anteriores" (sem fundo) sobre o brilho âmbar, ≈`#271C19`. Tarja de conflito = vermelho 10% sobre o card, ≈`#301D2A`. Tarja de aperto = âmbar 10% sobre o card, ≈`#302325`.

| Elemento | Cor / fundo | Razão | Mínimo |
|---|---|---|---|
| Hora de início na placa | `#FFB547` / `#231A2E` | 9.5:1 | 4.5:1 |
| Hora de fim (metade de baixo) | `#B8AAB9` / `#1D1626` | 7.9:1 | 4.5:1 |
| "Conflito:" | `#FF7B7B` / ≈`#301D2A` | 6.3:1 | 4.5:1 |
| Texto da tarja de conflito | `#F5EEE6` / ≈`#301D2A` | 13.7:1 | 4.5:1 |
| "Aperto:" | `#FFB547` / ≈`#302325` | 8.6:1 | 4.5:1 |
| Texto da tarja de aperto | `#F5EEE6` / ≈`#302325` | 13.1:1 | 4.5:1 |
| Ícones das tarjas (não-texto) | vermelho / âmbar nas tarjas | 6.3 · 8.6:1 | 3:1 |
| Botão "O que levar" (texto) | `#F5EEE6` / `#191321` · pior ponto | 15.8 · ≈14:1 | 4.5:1 |
| "(2 de 5)" e seta | `#B8AAB9` / `#191321` · pior ponto | 8.2 · 7.5:1 | 4.5:1 |
| Ícone de mala | `#C4A8FF` / `#191321` | 9.0:1 | 3:1 |
| "tudo pronto" e check | `#8EE6A8` / `#191321` · pior ponto | 12.3 · 11.1:1 | 4.5:1 |
| Borda do botão "O que levar" | `#8A7A9C` / `#191321` · pior ponto | 4.6 · ≈4.2:1 | 3:1 |
| Botão "O que levar" e item no hover | `#F5EEE6` / `#231A2E` | 14.5:1 | 4.5:1 |
| Item do checklist (texto) | `#F5EEE6` / `#191321` | 15.8:1 | 4.5:1 |
| Item marcado (riscado) | `#B8AAB9` / `#191321` · `#231A2E` (hover) | 8.2 · 7.5:1 | 4.5:1 |
| Caixa de marcar (borda / marcada) | igual à 13.12 | 4.6 · 10.4:1 | 3:1 |
| Seta do `select` | `#B8AAB9` / `#0F0B14` | 8.7:1 | 3:1 |
| Texto do item no formulário | `#F5EEE6` / `#0F0B14` | 16.8:1 | 4.5:1 |
| Item marcado no formulário | `#B8AAB9` / `#0F0B14` | 8.7:1 | 4.5:1 |
| "Remover" (normal / hover) | `#B8AAB9` / `#0F0B14` · `#FF7B7B` / `#231A2E` | 8.7 · 6.7:1 | 4.5:1 |
| Dicas ("Preencha um dos dois...", "Limite de 20 itens.") | `#B8AAB9` / `#191321` | 8.2:1 | 4.5:1 |
| Erros novos | `#FF7B7B` / `#191321` | 7.2:1 | 4.5:1 |
| Campo e botão com cara de desativado | `#B8AAB9` / `#191321` | 8.2:1 | isento, mas legível |
| Foco em tudo o que é novo | `#8FD3FF`, 3px | ≥ 11:1 | 3:1 |

Filete do grupo "Hora de fim", borda dos itens do formulário, quadradinho lilás e o "acender" do campo ajustado são **enfeite**: a informação está sempre no texto.

### 14.11 Conferência da Entrega 3a (para o dev e o testador)

| Requisito | Como o visual atende |
|---|---|
| "Termina às" e "Duração" lado a lado, com rótulo, depois da Hora | `fieldset` "Hora de fim" logo depois de Data \| Hora; lado a lado a partir de 480px, um embaixo do outro antes (permitido pela US19) |
| "Outro" com "Minutos" | `#bloco-duracao-min`, mesmo jeito do "Tempo para sair" |
| Sem hora: desativado com dica | `disabled` no `fieldset` + `#dica-fim-sem-hora` |
| Três erros da US19 com as regras da US03 | `.campo-erro` + `aria-invalid` + `aria-describedby`; ordem do foco em 14.6 |
| Intervalo no card, lido como "das 09:30 às 10:30" | placa de duas metades + `sr-only` "Das" / "às" |
| Checklist no formulário: adicionar, remover, Enter não salva, 20 itens, 60 caracteres | 14.3.3; `maxlength="60"`; nota do 20º item em 14.6 |
| Avisos de adicionar e remover sem tirar o foco | `#itens-aviso` (`aria-live="polite"`, escondido da tela) |
| "O que levar (2 de 5)" / "tudo pronto (5 de 5)" | `.checklist-botao` com `aria-expanded`; `.checklist--pronto` |
| Caixas com 44px, marcado não só por cor | `.checklist-item` com 44px; check + riscado + cinza |
| Checklist igual em todas as seções | mesmo HTML; o botão sem fundo combina com o card tracejado de "Anteriores" |
| Conflito e aperto em texto, com ícone e cor que não são a única forma | "Conflito:" / "Aperto:" em negrito + ícones diferentes; tarja vermelha / âmbar |
| Aviso sem `aria-live` | `p` comum dentro do card |
| 360px sem rolagem horizontal | contas da 14.3.4 e 14.4.1; `overflow-wrap: anywhere` nos textos novos |
| Foco visível e teclado | contorno azul-céu em tudo; tabela 14.6 |
| Só variáveis CSS (preparo para a 3b) | 14.9 sem nenhum hex novo; tarja usa `--aviso-cor` local |
| Alto contraste e movimento reduzido | 14.9.2; nada novo anima sozinho |

### 14.12 Decisões aprovadas pelo João (2026-11-06)

O João aprovou as três recomendações: **1A** (horário empilhado na placa), **2A** (conflito vermelho, aperto âmbar) e **3** (todos os textos sugeridos, inclusive o "acender" âmbar). Abaixo, as opções que foram apresentadas:

1. **Como mostrar "09:30 – 10:30" no card.**
   - **A (recomendo):** na própria placa, empilhado: "09:30" em cima (âmbar) e "–10:30" embaixo (menor, cinza). Usa as duas metades que a placa já tinha, todas as placas continuam com a mesma largura e a coluna do texto não perde espaço a 360px.
   - B: placa mais larga, numa linha só ("09:30 – 10:30"). Fica igual ao texto dos requisitos, mas a placa passa de 64 para ≈112px no celular e o título perde quase 50px de largura.
   - C: placa só com "09:30" e uma linha "até 10:30" no texto do card, junto do "Sair às". Placa intacta, mas o fim fica longe do início.
2. **Cor do aviso de conflito.**
   - **A (recomendo):** conflito em **vermelho** e aperto em **âmbar**. Dá para diferenciar de longe "não dá" de "dá, mas é corrido".
   - B: os dois em âmbar, diferentes só pelo texto e pelo ícone. Mais calmo, e o vermelho fica só para erro e excluir.
   - C: os dois em vermelho. Mais alarmante; aperto não é erro.
3. **Textos sugeridos (não estão nos requisitos):** a dica "Preencha um dos dois: o outro se ajusta sozinho.", a dica "De 1 a 1439 minutos.", o exemplo "Ex.: guarda-chuva" no campo "Novo item" (trocado para "Ex.: chave" em 2026-11-06 por caber a 320/360px), o "(já marcado)" lido pelo leitor de tela nos itens marcados do formulário (que também aparecem riscados ali) e o "acender" em âmbar do campo que se ajustou sozinho (opcional). Recomendo aprovar todos; qualquer um pode sair sem mudar o resto.
