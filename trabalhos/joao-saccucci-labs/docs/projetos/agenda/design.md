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

---

## 15. Etapa 3 — Entrega 3b (faixa da semana, tema claro e letra grande)

Cobre a **Agenda US21** (faixa dos próximos 7 dias), a **US22** (tema claro e escuro), a **US23** (letra grande) e as mudanças da 3b nas stories anteriores (US01: ordem da página e `h3` com `tabindex="-1"`; US07: chave `agenda:preferencias`). Tudo **se soma** às seções 1 a 14. O tema **escuro continua exatamente como está**: nada do que já existe muda de cor nele.

### 15.1 Ideia visual

O mesmo **quadro de partidas**, agora também **de manhã**:
- **Tema claro = a estação com a luz do dia.** Papel creme no fundo, cards quase brancos, tinta ameixa no texto. O âmbar vira **caramelo escuro** (a cor da tinta das tabelas de horário impressas), o lilás vira **violeta**, o azul do foco fica mais escuro. O clima é o mesmo; só a luz muda. O próprio quadro da ilustração continua escuro (os painéis de horário são escuros também de dia), mas a lua vira **sol**.
- **Faixa da semana = o painel "próximas partidas" da semana.** Sete **plaquinhas** de duas metades (o mesmo desenho da placa de hora): o nome do dia em cima, a quantidade embaixo. Dia com compromisso é uma plaquinha "acesa" (fundo de duas metades, contorno, número em âmbar). Dia livre é uma plaquinha **vazia e tracejada**, escrito "Livre".
- **Botões de aparência = os interruptores da cabine.** "Tema claro" e "Letra grande" são botões com uma **chavinha** desenhada: desligada, a bolinha fica à esquerda; ligada, a bolinha vai para a direita e o trilho fica âmbar. A posição da bolinha mostra o estado sem depender da cor.

### 15.2 Reaproveitado x novo

| Parte | Reaproveita | Novo (e por quê) |
|---|---|---|
| Botões "Tema claro" e "Letra grande" | `.btn .btn-secundario` (pílula, 44px, contorno 3:1, foco) | `.aparencia` (a barra que segura os dois), `.botao-aparencia`, `--tema`, `--letra` e `.aparencia-chave` (a chavinha) |
| Faixa da semana | `.secao-titulo` (rótulo mono do `h2`), placa de duas metades (`--cor-superficie-2` / `--cor-placa-baixo`), quadradinho âmbar do "Hoje" (`.dia--hoje`), `.sr-only` | `.semana`, `.semana-lista`, `.semana-dia` (`--hoje`, `--livre`), `.semana-botao`, `.semana-placa`, `.semana-nome`, `.semana-quantidade`, `.semana-numero` |
| Tema claro | **todas** as variáveis da seção 2 (redefinidas em 15.6) | `:root[data-tema="claro"]` + 6 ajustes do que não é variável (fundo da página, linhas do fundo, cabeçalho, fundo das janelas, check da caixa marcada, ilustração) |
| Letra grande | todos os tamanhos já estão em `rem` (seção 9) | `:root[data-letra="grande"] { font-size: 125%; }` + 5 ajustes para caber a 360px (15.7) |
| Sem "piscar" | — | script pequeno no `<head>` (15.5) |
| Ícones | — | nenhum ícone novo (a chavinha é feita em CSS) |

### 15.3 Onde fica cada coisa

**Ordem da página (US01 da 3b):** cabeçalho · **barra "Aparência"** · faixas (`#faixas`) · "Ficou pendente" · **"Próximos 7 dias"** · "Próximos compromissos" · "Sem data" · "Anteriores" · rodapé.

**Lugar dos botões de aparência (decisão 1):** o cabeçalho não tem espaço (a 360px ele já usa ≈294px dos 328px; dois botões de 44px a mais dariam ≈398px, e no computador os textos também não cabem ao lado de "Seus dados" e "Novo compromisso"). Por isso os dois botões ficam numa **barra própria, logo abaixo do cabeçalho, no topo do `<main>`, antes das faixas**. Ela **não é fixa** (não gruda no topo): nunca cobre compromissos nem botões, aparece em todas as situações (lista vazia, com faixas, com janela fechada) e fica sempre no mesmo lugar, porque vem **antes** das faixas que aparecem e somem. É um controle, não uma seção de conteúdo: a ordem das seções da US01 não muda.

```
360px (328px úteis), letra normal
+--------------------------------------+
| [ic] Agenda▪          (≡)  [+ Novo]  |  cabeçalho fixo (igual)
+--------------------------------------+
| [(o ) Tema claro ] [(o ) Letra grande]|  barra "Aparência" (não fixa), 44px
|                                      |
| (faixas, se houver)                  |
| ┃ FICOU PENDENTE (1)  ...            |  (se houver)
|                                      |
| PRÓXIMOS 7 DIAS                      |  h2, rótulo mono 12px
| +----------------------------------+ |
| | ▪ Hoje                           | |  "Hoje" ocupa a linha toda (só < 640px)
| |----------------------------------| |  placa de duas metades = botão
| | 2 compromissos                   | |  "2" em mono âmbar
| +----------------------------------+ |
| +---------------+ +---------------+  |
| | Amanhã        | | Ter 11        |  |
| |---------------| ¦               ¦  |  Ter 11 = livre: tracejado, sem fundo,
| | 1 compromisso | ¦ Livre         ¦  |  tudo em cinza, não é botão
| +---------------+ +- - - - - - - -+  |
| +---------------+ +---------------+  |
| | Qua 12        | | Qui 13        |  |
| | 3 compromissos| | Livre         |  |
| +---------------+ +---------------+  |
| +---------------+ +---------------+  |
| | Sex 14        | | Sáb 15        |  |
| +---------------+ +---------------+  |
|                                      |
| PRÓXIMOS COMPROMISSOS                |
| ▪ Hoje                               |
| ...                                  |
```

```
≥ 640px (coluna de até 760px; 592 a 712px úteis)
+------------------------------------------------------------------+
| [ic] Agenda▪                 [(≡) Seus dados] [+ Novo compromisso]|
+------------------------------------------------------------------+
                              [(o ) Tema claro] [(o ) Letra grande]   <- à direita
  PRÓXIMOS 7 DIAS
  +--------------+ +--------------+ +- - - - - - -+ +--------------+
  | ▪ Hoje       | | Amanhã       | ¦ Ter 11       ¦ | Qua 12       |
  | 2 compromissos| | 1 compromisso| ¦ Livre        ¦ | 3 compromissos|
  +--------------+ +--------------+ +- - - - - - -+ +--------------+
  +--------------+ +- - - - - - -+ +--------------+
  | Qui 13 ...   | ¦ Sex 14 ...   ¦ | Sáb 15 ...   |                    <- 4 + 3
  PRÓXIMOS COMPROMISSOS
```

```
360px com LETRA GRANDE (o cabeçalho pode quebrar em 2 linhas: exceção da US23)
+--------------------------------------+
| [ic] Agenda▪                         |
|                      (≡)  [+ Novo]   |  2ª linha, à direita
+--------------------------------------+
| [(o ) Tema claro                   ] |  os dois botões não cabem lado a lado:
| [( o) Letra grande                 ] |  um embaixo do outro, largura toda
| PRÓXIMOS 7 DIAS                      |
| +----------------------------------+ |
| | ▪ Hoje / 2 compromissos          | |
| +----------------------------------+ |
| +----------------+ +---------------+ |  continua 2 por linha (cada uma ≈155px)
```

| Largura | Barra "Aparência" | Faixa da semana |
|---|---|---|
| 320px | normal: os dois botões **um embaixo do outro** (≈310px não cabem em 288px) | 2 por linha ("Hoje" na linha toda); letra grande: **1 por linha** |
| 360 a 639px | lado a lado, dividindo a largura (letra grande: um embaixo do outro) | 2 por linha, "Hoje" na linha toda (4 linhas) |
| ≥ 640px | lado a lado, à direita, cada um do tamanho do texto | grade automática de colunas de no mínimo 8.75rem: **4 por linha** (4 + 3) com letra normal; 3 por linha com letra grande |

### 15.4 Botões "Tema claro" e "Letra grande" (US22 e US23)

```html
<!-- no <main>, ANTES do #faixas -->
<div class="aparencia" role="group" aria-label="Aparência">
  <button class="btn btn-secundario botao-aparencia botao-aparencia--tema" type="button" id="botao-tema" aria-pressed="false">
    <span class="aparencia-chave" aria-hidden="true"></span>
    <span>Tema claro</span>
  </button>
  <button class="btn btn-secundario botao-aparencia botao-aparencia--letra" type="button" id="botao-letra" aria-pressed="false">
    <span class="aparencia-chave" aria-hidden="true"></span>
    <span>Letra grande</span>
  </button>
</div>
```

- **O texto não muda** ("Tema claro" e "Letra grande" nos dois estados). O estado é dito pelo `aria-pressed` ("true" = ligado). O leitor de tela ouve "Tema claro, botão de alternância, não pressionado" / "pressionado".
- **Visual:** botão secundário (contorno, pílula, 44px), texto 14px 600, e antes do texto a **chavinha**: trilho de 32 × 18px com borda de 2px `--cor-borda-campo` e bolinha de 10px `--cor-texto-suave` à esquerda.
  **Ligado:** trilho cheio de âmbar, bolinha `--cor-sobre-cor` **à direita**, e a borda do botão fica âmbar. Três sinais (posição, preenchimento, borda), nenhum depende só da cor.
- **A chavinha segue o atributo do `<html>`, não o `aria-pressed`.** O script do `<head>` (15.5) liga o tema antes de a página aparecer, mas o `app.js` só roda no fim do `<body>`. Se o desenho dependesse do `aria-pressed`, a chavinha apareceria "desligada" por um instante com o tema claro já ligado. Por isso o CSS usa `:root[data-tema="claro"] .botao-aparencia--tema` (e o mesmo para a letra), e o `app.js` só sincroniza o `aria-pressed` ao começar e a cada troca. **Regra para o dev:** uma única função muda o atributo do `<html>` e o `aria-pressed` juntos; os dois nunca podem ficar diferentes.
- **Ao tocar:** a página troca na hora, sem recarregar, e o **foco fica no botão** (o botão não é redesenhado, só muda o atributo).
- **Troca sem "fade" (opcional, recomendado):** vários elementos têm `transition` de cor (180ms) e mudariam "em ondas". O JS pode pôr a classe `trocando-tema` no `<html>`, trocar o atributo e tirar a classe dois quadros depois (`requestAnimationFrame` dentro de `requestAnimationFrame`). O CSS (15.12.2) desliga as transições só durante a troca.

**Contas a 360px** (328px úteis, letra normal): chavinha 32 + vão 8 + "Tema claro" ≈81 + espaço interno 2 × 12 + bordas 2 ≈ **147px**; "Letra grande" ≈97 → **163px**; 147 + 8 + 163 = **318px**. Cabem lado a lado. A 320px (288px úteis) e com a letra grande a 360px, cada botão ocupa uma linha (`flex-wrap`), sem rolagem horizontal.

### 15.5 Sem "piscar": o script do `<head>`

O `<html>` recebe `data-tema="claro"` e/ou `data-letra="grande"`. **Sem atributo = escuro e normal** (os padrões). O script abaixo vai no `<head>`, **logo depois das duas `<meta>` de cor e antes das fontes e do `style.css`**. Ele roda antes de qualquer pintura da tela, então a página já aparece no tema certo.

```html
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#0F0B14">
<!-- Etapa 3b: tema e letra ANTES de a página aparecer (a tela nunca pisca no tema errado).
     Qualquer problema (sem localStorage, JSON inválido, valor estranho) = padrão, sem aviso. -->
<script>
  (function () {
    try {
      const preferencias = JSON.parse(localStorage.getItem("agenda:preferencias"));
      if (preferencias && preferencias.letra === "grande") {
        document.documentElement.setAttribute("data-letra", "grande");
      }
      if (preferencias && preferencias.tema === "claro") {
        document.documentElement.setAttribute("data-tema", "claro");
        document.querySelector('meta[name="color-scheme"]').setAttribute("content", "light");
        document.querySelector('meta[name="theme-color"]').setAttribute("content", "#F7F1E8");
      }
    } catch (erro) {
      // Fica o padrão (escuro e normal). Sem console.error: a US22 pede "sem erro no console".
    }
  })();
</script>
```

- `JSON.parse(null)` devolve `null` (chave ausente): cai no padrão sem erro. Um número ou texto no lugar do objeto também cai no padrão (`preferencias.tema` fica `undefined`).
- Só `"claro"` e `"grande"` ligam alguma coisa: qualquer outro valor vale o padrão **daquele campo** (seção 3 dos requisitos). A chave **não** é apagada.
- O `app.js` usa a **mesma regra** ao trocar: muda o atributo do `<html>`, o `aria-pressed`, as duas `<meta>` (`color-scheme`: `"light"`/`"dark"`; `theme-color`: `#F7F1E8`/`#0F0B14`) e grava `{ "tema": ..., "letra": ... }` em `agenda:preferencias` (com `try/catch`: sem `localStorage`, a troca continua valendo até fechar a página). **Não** grava `agenda:ultima-mudanca`.
- `color-scheme` no CSS (15.12.1) faz os campos nativos de data e hora, o `select` aberto e a barra de rolagem seguirem o tema.

### 15.6 Tema claro: a paleta completa

Todas as variáveis da seção 2, redefinidas em `:root[data-tema="claro"]`. Fórmula de luminância relativa da WCAG 2.1, como na seção 2.1. "Pior ponto" = o brilho âmbar do canto de cima no tema claro (âmbar 16% sobre o fundo, ≈`#F8E7CE`), onde ficam a barra "Aparência" e os cards sem fundo de "Anteriores".

| Token | Escuro (seção 2) | **Claro** | Uso no claro | Contraste (claro) |
|---|---|---|---|---|
| `--cor-fundo` | `#0F0B14` | **`#F7F1E8`** | fundo da página e dos campos (papel creme) | — |
| `--cor-superficie` | `#191321` | **`#FFFCF7`** | cards, janelas, estado vazio | — |
| `--cor-superficie-2` | `#231A2E` | **`#EFE6DA`** | hover, metade de cima das placas, aviso flutuante | — |
| `--cor-placa-baixo` | `#1D1626` | **`#E8DDCF`** | metade de baixo das placas | — |
| `--cor-borda` | `#3A2F48` | **`#DDD1C3`** | só enfeite (como no escuro) | não precisa |
| `--cor-borda-campo` | `#8A7A9C` | **`#7D7088`** | campos, botões de contorno, caixas, chavinha | 4.5 · 4.1 · 3.7 · 3.8:1 (superfície · fundo · superfície-2 · pior ponto) |
| `--cor-texto` | `#F5EEE6` | **`#23182B`** | texto principal (tinta ameixa) | 16.6 · 15.1 · 13.7 · 12.7 · 14.0:1 |
| `--cor-texto-suave` | `#B8AAB9` | **`#5B4C63`** | texto secundário | 7.7 · 7.0 · 6.4 · 5.9 · 6.5:1 |
| `--cor-ambar` | `#FFB547` | **`#8A4A00`** | horas, "Hoje", "Aperto:", botão principal (caramelo) | 6.7 · 6.1 · 5.6 · 5.1 · 5.7:1 |
| `--cor-ambar-claro` | `#FFC970` | **`#6F3B00`** | hover do botão principal (no claro, o hover **escurece**) | texto creme sobre ele 8.7:1 |
| `--cor-lilas` | `#C4A8FF` | **`#6436B5`** | "Dia todo", "Sem data", local, links, "Não vou fazer" | 7.5 · 6.8 · 6.2 · 5.7 · 6.3:1 |
| `--cor-foco` | `#8FD3FF` | **`#0B5FC0`** | **só** o contorno de foco (continua a única coisa azul) | 6.0 · 5.5 · 5.0 · 5.1:1 |
| `--cor-perigo` | `#FF7B7B` | **`#B42318`** | erros, "Conflito:", excluir | 6.4 · 5.9 · 5.3 · 5.4:1 |
| `--cor-perigo-claro` | `#FF9A9A` | **`#8E1B12`** | hover do "Excluir" cheio (no claro, **escurece**) | texto creme sobre ele 8.6:1 |
| `--cor-sucesso` | `#8EE6A8` | **`#1D6B3B`** | "Feito", "tudo pronto", barrinha do aviso | 6.4 · 5.8 · 5.3 · 5.4:1 |
| `--cor-sobre-cor` | `#1A1205` | **`#FFF8EE`** | texto sobre âmbar e sobre perigo (botões cheios) | 6.5:1 no âmbar · 6.2:1 no perigo |
| `--sombra` | `0 12px 32px rgba(0,0,0,.5)` | **`0 12px 32px rgba(35, 24, 43, 0.18)`** | janelas, aviso flutuante | — |
| `--brilho-ambar` | `0 0 22px rgba(255,181,71,.35)` | **`0 4px 16px rgba(138, 74, 0, 0.28)`** | hover do botão principal | — |

**A regra do botão cheio muda de lado (decisão 3):** no escuro, o botão âmbar é claro e o texto é escuro. No claro, um âmbar claro **não** serve como cor de texto (o `#FFB547` dá só ≈1.8:1 no papel creme), e o âmbar é usado ao mesmo tempo como texto (horas) e como fundo (botão principal, "Sair em X min", opção marcada, caixa marcada). Por isso o âmbar do claro é **escuro** e o `--cor-sobre-cor` vira **creme**: o botão principal fica caramelo com texto creme (6.5:1). Uma variável só, e todos os usos continuam certos.

**O que não é variável e precisa de ajuste no claro** (CSS em 15.12.2):

| Onde | No escuro (fixo no CSS) | No claro |
|---|---|---|
| Brilhos do fundo (`body`) | âmbar 10% e lilás 7% | âmbar **16%** e lilás **12%** (no creme, 10% quase não aparece) |
| Linhas do fundo (`body::before`) | creme 2.5% (somem no claro) | ameixa **3.5%** |
| Cabeçalho | `rgba(15, 11, 20, 0.82)` | `rgba(247, 241, 232, 0.88)` (o fundo creme a 88%) |
| Fundo atrás das janelas (`::backdrop`) | `rgba(8, 5, 12, 0.72)` | `rgba(35, 24, 43, 0.45)` (escurece sem "apagar" a página). Valor escrito direto, **sem** `var()`: em navegadores antigos o `::backdrop` não herda variáveis |
| Check da caixa marcada | SVG com traço `#1A1205` | SVG com traço `#FFF8EE` (o escuro sobre o caramelo daria 2.7:1, abaixo de 3:1) |
| Ilustração da lista vazia | lua minguante (círculo da cor do card por cima) e duas estrelas | **sol**: o círculo de sombra e as estrelas somem (decisão 6). O quadro continua escuro (é um objeto, como os painéis de verdade) |
| `<meta name="theme-color">` | `#0F0B14` | `#F7F1E8` (pelo script e pelo `app.js`) |
| Ícone do cabeçalho e favicon | — | **não mudam**: são a marca, um "azulejo" escuro com o próprio fundo, legível nos dois temas |

Para a ilustração, o dev acrescenta duas classes na constante `ILUSTRACAO_VAZIO` do `app.js` (o resto do SVG não muda):

```html
<circle class="vazio-lua-sombra" cx="136" cy="15" r="10" fill="#191321"/>
<circle class="vazio-estrela" cx="108" cy="12" r="1.5" fill="#F5EEE6" opacity=".6"/>
<circle class="vazio-estrela" cx="150" cy="38" r="1.2" fill="#F5EEE6" opacity=".5"/>
```

### 15.7 Letra grande: a escala

**Como:** `:root[data-letra="grande"] { font-size: 125%; }`. Todo tamanho de letra da Agenda já está em `rem` (seção 9: variáveis `--fs-*`, e o aviso flutuante em `0.9375rem`), então **todo** o texto cresce 25% de uma vez: página, formulário, janelas, avisos, faixa da semana. Usar `125%` (e não `20px`) respeita o tamanho de letra que a pessoa escolheu no navegador, e o zoom do navegador continua funcionando por cima.

**Também crescem 25%** (decisão 4): os espaços (`--esp-*`), a largura da placa de hora (`4rem` → 80px), as caixas de marcar (`1.375rem` → 27.5px), a chavinha e as larguras mínimas em `rem`. Assim o desenho continua com as mesmas proporções, só maior. **Não crescem** (estão em `px`): ícones, bordas, raios, a altura mínima de toque (44px) e os pontos de quebra (`@media` em `px`).

| Token | Normal | **Grande** | Uso |
|---|---|---|---|
| `--fs-xs` | 12px | **15px** | rótulos mono, "DIA TODO", selos |
| `--fs-sm` | 14px | **17.5px** | local, observação, botões do card, dicas, erros, botões de aparência, quantidade da semana |
| aviso flutuante | 15px | **18.75px** | `.status` |
| `--fs-base` | 16px | **20px** | corpo, campos, nome do dia na semana |
| `--fs-md` | 17px | **21.25px** | título do compromisso, hora |
| `--fs-lg` | 20px | **25px** | título do dia, títulos das janelas |
| `--fs-xl` | 22 a 28px | **27.5 a 35px** | `h1` "Agenda" |
| `--esp-1` a `--esp-8` | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 | **5 · 10 · 15 · 20 · 30 · 40 · 60 · 80** | espaços |

**Ajustes para caber a 360px com a letra grande** (CSS em 15.12.2):

| Parte | Problema com 125% | Ajuste |
|---|---|---|
| Cabeçalho | marca ≈150 + "Seus dados" 44 + "+ Novo" ≈118 + vãos ≈ 337px > 320px úteis (e quebra até ≈650px de largura) | `flex-wrap: wrap` no `.cabecalho-conteudo` **só com a letra grande** (exceção da US23): marca na 1ª linha, botões na 2ª, à direita. `scroll-padding-top` passa de 80px para `8rem` (160px), para o título do dia e o foco não ficarem atrás do cabeçalho de 2 linhas |
| Todos os `.btn` | `white-space: nowrap` faria "Baixar cópia agora" e "Novo compromisso" passarem da largura | `white-space: normal` com a letra grande: o texto do botão quebra em 2 linhas se precisar |
| "Tempo para sair" | 3 colunas de ≈80px; "✓ 60 min" precisa de ≈98px | 2 colunas abaixo de 480px (3 linhas de opções) |
| "Novo item" + "Adicionar" | o campo ficaria com ≈90px e o exemplo "Ex.: chave" cortado | `flex-wrap`: no celular o "Adicionar" desce para baixo do campo, na largura toda; na janela larga continuam na mesma linha |
| Faixa da semana a 320px | 2 colunas de ≈135px; "compromissos" (17.5px) + espaço interno ≈148px | 1 por linha abaixo de 360px (só com a letra grande) |

Conferido o resto a 360px com a letra grande (container de 320px úteis, porque a margem lateral também cresce para 20px): card 320 − 2 × 15 = 290 → placa 80 + vão 15 → **195px** para o texto, que quebra linha; "09:30" mono 21px ≈ 64px + 10 cabe na placa de 80px; "–10:30" ≈ 69px cabe; botões do card quebram linha (`flex-wrap` já existe); janela `min(100% − 2.5rem, 32rem)` = 320px, 260px por dentro; "Cancelar" e "Salvar" (base `6rem` = 120px cada) cabem lado a lado; campo de minutos (`7rem` = 140px) + "min" cabe.

### 15.8 Faixa "Próximos 7 dias" (US21)

Fica entre `#secao-pendentes` e a seção `.proximos`, **sempre** visível (com a lista vazia, os 7 dias aparecem "Livre").

```html
<section class="semana" id="secao-semana" aria-labelledby="titulo-semana">
  <h2 class="secao-titulo" id="titulo-semana">Próximos 7 dias</h2>
  <!-- O JavaScript monta os 7 <li> (hoje e os 6 seguintes, em ordem). -->
  <ul class="semana-lista" id="lista-semana">

    <!-- Dia COM compromisso: botão -->
    <li class="semana-dia semana-dia--hoje">
      <button class="semana-botao" type="button" data-acao="ir-para-dia" data-data="2026-11-09" aria-label="Hoje, 2 compromissos">
        <span class="semana-nome">Hoje</span>
        <span class="semana-quantidade"><span class="semana-numero">2</span> compromissos</span>
      </button>
    </li>

    <li class="semana-dia">
      <button class="semana-botao" type="button" data-acao="ir-para-dia" data-data="2026-11-10" aria-label="Amanhã, 1 compromisso">
        <span class="semana-nome">Amanhã</span>
        <span class="semana-quantidade"><span class="semana-numero">1</span> compromisso</span>
      </button>
    </li>

    <!-- Dia LIVRE: não é botão, não recebe foco -->
    <li class="semana-dia semana-dia--livre">
      <div class="semana-placa">
        <span class="semana-nome">Ter 11</span><span class="sr-only">,</span>
        <span class="semana-quantidade">Livre</span>
      </div>
    </li>

    <!-- Hoje livre: as duas classes -->
    <!-- <li class="semana-dia semana-dia--hoje semana-dia--livre"> ... -->
  </ul>
</section>
```

**Textos**
| Situação | Nome (em cima) | Quantidade (embaixo) | Nome acessível do botão |
|---|---|---|---|
| hoje | "Hoje" | "2 compromissos" | "Hoje, 2 compromissos" |
| amanhã | "Amanhã" | "1 compromisso" | "Amanhã, 1 compromisso" |
| outro dia | dia da semana abreviado + dia do mês: "Qua 12" (abreviações da seção 3: Dom, Seg, Ter, Qua, Qui, Sex, Sáb) | "3 compromissos" | "Qua 12, 3 compromissos" |
| dia livre | igual | "Livre" | — (não é botão; o leitor de tela lê "Ter 11, Livre" como item de lista) |

- O nome acessível vem de `aria-label` e começa com o texto visível (bom para comando de voz), pelo mesmo motivo do botão "Feito" (13.4.3): um `sr-only` com vírgula ganharia um espaço antes dela.
- O formato "Qua 12" (sem vírgula e sem o mês) é o do exemplo dos requisitos: cabe na plaquinha. A lista principal continua com "Qua, 12/11 · daqui a 3 dias".

**Visual**
- **Dia com compromisso** (`.semana-botao`): plaquinha de duas metades (`--cor-superficie-2` em cima, `--cor-placa-baixo` embaixo), contorno `--cor-borda-campo` (é um botão: borda 3:1), cantos de 10px, no mínimo 56px de altura (acima dos 44px de toque), texto à esquerda. Nome em 16px 700 branco na metade de cima; quantidade em 14px cinza suave na de baixo, com o **número** em mono 600 âmbar. Hover: fundo `--cor-superficie-2` inteiro e borda `--cor-texto-suave`. Apertado: encolhe 2%.
- **Dia livre** (`.semana-placa`): sem fundo, borda **tracejada** decorativa (`--cor-borda`), nome e "Livre" em cinza suave. A diferença está no **texto** "Livre"; o tracejado e a falta de fundo são reforço. Não tem hover nem cursor de mão.
- **Hoje:** nome em âmbar com o quadradinho âmbar antes (o mesmo do título "Hoje" da lista). No celular, a plaquinha de "Hoje" ocupa a **linha toda** (assim 1 + 2 + 2 + 2 = 7, sem um dia sobrando sozinho no fim). Se hoje estiver livre, continua tracejada, só com o nome em âmbar.
- **Sem animação** (a faixa é redesenhada a cada minuto, como a lista).

**Ao tocar num dia com compromisso** (clique, toque, Enter ou Espaço: é um `<button>` de verdade):
1. O JS acha o título do dia na lista principal: `document.getElementById("proximos-dia-" + data)` (o id que o `criarDia` já cria).
2. Rola até ele: `titulo.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "start" })`, com `reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches`. O `scroll-padding-top` do `html` já deixa o título abaixo do cabeçalho fixo.
3. Põe o foco nele: `titulo.focus({ preventScroll: true })`. Para isso, **todo `h3` da lista "Próximos compromissos" ganha `tabindex="-1"`** no `criarDia` (só na seção `proximos`; em "Anteriores", não).
4. Foco visível: com o teclado, o título ganha o contorno azul de sempre; com o mouse ou o toque, não aparece contorno (`:focus:not(:focus-visible)`, igual ao `#titulo-proximos`). A rolagem já mostra onde a pessoa chegou.

**Atualização** (a cada minuto e depois de criar, editar, excluir, importar, Feito e Desfazer): a faixa é montada de novo junto com a lista. Para não incomodar o leitor de tela e o foco:
- **Sem `aria-live`** na faixa (ela muda a cada minuto).
- Se o foco estava num botão da faixa, ele volta para o botão com o mesmo `data-data`. Se esse dia virou "Livre" (sem botão), o foco vai para o próximo dia com botão; se não houver nenhum, para o título "Próximos compromissos" (`#titulo-proximos`, que já tem `tabindex="-1"`).

**Contas**
| Largura | Conta | Cabe? |
|---|---|---|
| 360px, normal | 2 colunas: (328 − 8) / 2 = **160px**; "3 compromissos" 14px ≈ 109 + 24 de espaço interno = 133 | sim, numa linha |
| 320px, normal | (288 − 8) / 2 = **140px**; 133 | sim |
| 360px, grande | (320 − 10) / 2 = **155px**; "compromissos" 17.5px ≈ 118 + 30 = 148 | sim (o "3 compromissos" quebra em 2 linhas) |
| 320px, grande | 1 coluna de 280px | sim |
| ≥ 640px, normal | colunas de no mínimo 8.75rem (140px): 592px → 4 colunas (4 × 140 + 3 × 8 = 584); 712px → 4 (5 colunas dariam 732) | 4 + 3 |
| ≥ 640px, grande | mínimo 175px: 580px e 700px → 3 colunas (≈186px e ≈227px) | 3 + 3 + 1 |

Segurança: `overflow-wrap: anywhere` na quantidade e `min-width: 0` nas colunas. Se uma fonte do sistema for mais larga que a Space Grotesk, a palavra quebra dentro da plaquinha, mas a página nunca rola para o lado.

### 15.9 Teclado e foco

| Ação | Foco |
|---|---|
| Tab desde o topo | "Seus dados" → "Novo compromisso" → **"Tema claro"** → **"Letra grande"** → faixas (se houver) → "Ficou pendente" → **dias com compromisso da faixa da semana** (os livres são pulados) → lista principal |
| Enter ou Espaço em "Tema claro" / "Letra grande" | troca na hora; o foco **fica** no botão |
| Enter ou Espaço num dia da semana | rola até o dia e o foco vai para o `h3` dele (contorno azul) |
| Tab depois de chegar ao `h3` | segue para o primeiro botão do primeiro compromisso daquele dia |
| A faixa é redesenhada | o foco volta para o mesmo dia (ou o próximo com botão, ou `#titulo-proximos`) |

Foco visível nos **dois temas**: contorno de 3px na cor `--cor-foco` (azul-céu no escuro, azul escuro no claro), em tudo o que é novo.

### 15.10 Leitor de tela

| Parte | O que é lido |
|---|---|
| Barra | "Aparência, grupo" |
| Botões | "Tema claro, botão de alternância, não pressionado" / "pressionado"; idem "Letra grande" |
| Faixa | "Próximos 7 dias, título nível 2", "lista, 7 itens" |
| Dia com compromisso | "Hoje, 2 compromissos, botão" |
| Dia livre | "Ter 11, Livre" |
| Depois de tocar num dia | "Hoje, título nível 3" (o foco chega no título) |

### 15.11 Ícones e ilustração

Nenhum ícone novo. A chavinha é CSS puro (um `span` e o `::after`), assim ela segue o tema pelas variáveis. A única mudança em SVG é a da ilustração da lista vazia (classes `vazio-lua-sombra` e `vazio-estrela`, em 15.6).

### 15.12 CSS de referência da Entrega 3b

Quatro mudanças no `css/style.css`: uma seção nova logo depois das variáveis, uma seção nova antes do movimento reduzido, e acréscimos no movimento reduzido e no alto contraste.

#### 15.12.1 Nova seção "1b": acrescentar logo **depois** da "1. VARIÁVEIS" e **antes** do "2. RESET"

```css
/* ---------------------------------------------------------
   1b. TEMA CLARO E LETRA GRANDE (Etapa 3b)
   Decisões em: design.md, seção 15.
   O <html> recebe data-tema="claro" e/ou data-letra="grande"
   (script do <head> e app.js). Sem atributo = escuro e normal.
   Contrastes conferidos em design.md, 15.6 e 15.13.
   --------------------------------------------------------- */
:root[data-tema="claro"] {
  color-scheme: light;           /* data, hora, select e barra de rolagem claros */

  /* Fundos ("a estação de manhã": papel creme) */
  --cor-fundo: #F7F1E8;
  --cor-superficie: #FFFCF7;
  --cor-superficie-2: #EFE6DA;
  --cor-placa-baixo: #E8DDCF;

  /* Bordas: a decorativa continua só enfeite; a de campo tem 3.7:1 ou mais */
  --cor-borda: #DDD1C3;
  --cor-borda-campo: #7D7088;

  /* Texto (tinta ameixa) */
  --cor-texto: #23182B;          /* 15.1:1 no fundo */
  --cor-texto-suave: #5B4C63;    /* 7.0:1 no fundo */

  /* Destaques: escuros, porque também são cor de texto */
  --cor-ambar: #8A4A00;          /* caramelo: 6.1:1 no fundo */
  --cor-ambar-claro: #6F3B00;    /* hover do botão principal: no claro, escurece */
  --cor-lilas: #6436B5;          /* 6.8:1 no fundo */
  --cor-foco: #0B5FC0;           /* SÓ o contorno de foco: 5.5:1 no fundo */
  --cor-perigo: #B42318;         /* 5.9:1 no fundo */
  --cor-perigo-claro: #8E1B12;   /* hover do Excluir cheio: no claro, escurece */
  --cor-sucesso: #1D6B3B;        /* 5.8:1 no fundo */
  --cor-sobre-cor: #FFF8EE;      /* texto creme sobre âmbar (6.5:1) e perigo (6.2:1) */

  /* Sombras mais leves (no claro, a sombra preta a 50% fica "suja") */
  --sombra: 0 12px 32px rgba(35, 24, 43, 0.18);
  --brilho-ambar: 0 4px 16px rgba(138, 74, 0, 0.28);
}

/* Letra grande: tudo em rem cresce 25%. Em % (e não em px) para
   respeitar a letra escolhida no navegador e o zoom. */
:root[data-letra="grande"] {
  font-size: 125%;
  scroll-padding-top: 8rem;      /* o cabeçalho pode ter 2 linhas */
}
```

#### 15.12.2 Nova seção "12e": acrescentar logo **depois** da "12d. ETAPA 3a" e **antes** da "13. MOVIMENTO REDUZIDO"

```css
/* ---------------------------------------------------------
   12e. ETAPA 3b: APARÊNCIA, FAIXA DA SEMANA, TEMA CLARO E LETRA GRANDE
   Decisões em: design.md, seção 15.
   --------------------------------------------------------- */

/* --- Barra "Aparência": logo abaixo do cabeçalho, não fixa --- */
.aparencia {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--esp-2);
  margin-bottom: var(--esp-5);
}

.botao-aparencia {
  flex: 1 1 auto;                         /* celular: dividem a largura */
  padding-inline: var(--esp-3);
  font-size: var(--fs-sm);
}

@media (min-width: 640px) {
  .botao-aparencia {
    flex: 0 0 auto;                       /* computador: à direita, do tamanho do texto */
  }
}

/* A chavinha: trilho de 32 x 18px e bolinha de 10px (em rem: cresce com a letra) */
.aparencia-chave {
  position: relative;
  flex-shrink: 0;
  width: 2rem;
  height: 1.125rem;
  border: 2px solid var(--cor-borda-campo);   /* 4.9:1 escuro · 4.1:1 claro */
  border-radius: var(--raio-pill);
  transition: background-color var(--transicao), border-color var(--transicao);
}

.aparencia-chave::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 2px;
  width: 0.625rem;
  height: 0.625rem;
  background: var(--cor-texto-suave);
  border-radius: 50%;
  transform: translateY(-50%);
  transition: transform var(--transicao);
}

/* Ligado. Segue o atributo do <html> (aplicado no <head>), e não o
   aria-pressed (sincronizado só quando o app.js roda): assim a chave
   nunca aparece no estado errado ao abrir a página. */
:root[data-tema="claro"] .botao-aparencia--tema,
:root[data-letra="grande"] .botao-aparencia--letra {
  border-color: var(--cor-ambar);
}

:root[data-tema="claro"] .botao-aparencia--tema .aparencia-chave,
:root[data-letra="grande"] .botao-aparencia--letra .aparencia-chave {
  background: var(--cor-ambar);
  border-color: var(--cor-ambar);
}

:root[data-tema="claro"] .botao-aparencia--tema .aparencia-chave::after,
:root[data-letra="grande"] .botao-aparencia--letra .aparencia-chave::after {
  background: var(--cor-sobre-cor);
  /* largura do trilho - 2 bordas - 2 folgas - bolinha */
  transform: translate(calc(1.375rem - 8px), -50%);
}

/* --- Faixa "Próximos 7 dias" --- */
.semana {
  margin-bottom: var(--esp-6);
}

.semana-lista {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--esp-2);
}

.semana-dia {
  display: flex;                          /* a plaquinha estica até a altura da linha */
  min-width: 0;
}

/* Celular: "Hoje" na linha toda (1 + 2 + 2 + 2 = 7) */
@media (max-width: 639.98px) {
  .semana-dia--hoje {
    grid-column: 1 / -1;
  }
}

@media (min-width: 640px) {
  .semana-lista {
    grid-template-columns: repeat(auto-fill, minmax(8.75rem, 1fr));   /* 4 por linha */
  }
}

.semana-botao,
.semana-placa {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  min-width: 0;
  min-height: 3.5rem;                     /* 56px: acima dos 44px de toque */
  padding: var(--esp-2) var(--esp-3);
  text-align: left;
  line-height: 1.25;
  border-radius: var(--raio-md);
}

/* Dia com compromisso: a placa de duas metades, com contorno de botão */
.semana-botao {
  color: var(--cor-texto);
  background: linear-gradient(to bottom, var(--cor-superficie-2) 50%, var(--cor-placa-baixo) 50%);
  border: 1px solid var(--cor-borda-campo);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color var(--transicao), border-color var(--transicao),
              transform var(--transicao);
}

.semana-botao:hover {
  background: var(--cor-superficie-2);
  border-color: var(--cor-texto-suave);
}

.semana-botao:active {
  transform: scale(0.98);
}

/* Dia livre: vazio e tracejado. O que diz "livre" é o texto. */
.semana-placa {
  color: var(--cor-texto-suave);
  border: 1px dashed var(--cor-borda);    /* enfeite */
}

.semana-nome {
  display: inline-flex;
  align-items: center;
  gap: var(--esp-2);
  font-size: var(--fs-base);
  font-weight: 700;
}

.semana-quantidade {
  max-width: 100%;
  font-size: var(--fs-sm);
  color: var(--cor-texto-suave);
  overflow-wrap: anywhere;                /* segurança: nunca rola para o lado */
}

.semana-numero {
  font-family: var(--fonte-mono);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--cor-ambar);
}

/* Hoje: nome âmbar com o quadradinho (o mesmo do título "Hoje") */
.semana-dia--hoje .semana-nome {
  color: var(--cor-ambar);
}

.semana-dia--hoje .semana-nome::before {
  content: "";
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  background: currentColor;
  border-radius: 2px;
}

/* Títulos dos dias recebem o foco pelo código (tabindex="-1"):
   contorno só para quem está no teclado. */
.proximos .dia-titulo:focus:not(:focus-visible) {
  outline: none;
}

/* --- Tema claro: o que não é variável --- */
:root[data-tema="claro"] body {
  background-image:
    radial-gradient(ellipse 70% 45% at 100% 0%, rgba(255, 181, 71, 0.16), transparent 70%),
    radial-gradient(ellipse 60% 40% at 0% 100%, rgba(196, 168, 255, 0.12), transparent 70%);
}

:root[data-tema="claro"] body::before {
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(35, 24, 43, 0.035) 0 1px,
    transparent 1px 56px
  );
}

:root[data-tema="claro"] .cabecalho {
  background: rgba(247, 241, 232, 0.88);
}

/* Sem var() de propósito: navegadores antigos não passam variáveis para o ::backdrop */
:root[data-tema="claro"] .janela::backdrop {
  background: rgba(35, 24, 43, 0.45);
}

/* Check creme sobre o caramelo (o escuro daria só 2.7:1) */
:root[data-tema="claro"] .marcar-caixa:checked {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FFF8EE' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E");
}

/* Ilustração da lista vazia: de dia, a lua vira sol e as estrelas somem */
:root[data-tema="claro"] .vazio-lua-sombra,
:root[data-tema="claro"] .vazio-estrela {
  display: none;
}

/* Opcional: durante a troca de tema, nada "desbota" aos poucos */
:root.trocando-tema *,
:root.trocando-tema *::before,
:root.trocando-tema *::after {
  transition: none !important;
}

/* --- Letra grande: ajustes para caber a 360px --- */
:root[data-letra="grande"] .cabecalho-conteudo {
  flex-wrap: wrap;                        /* exceção da US23: pode ter 2 linhas */
  row-gap: var(--esp-2);
  padding-block: var(--esp-2);
}

:root[data-letra="grande"] .cabecalho-acoes {
  margin-left: auto;                      /* na 2ª linha, os botões ficam à direita */
}

:root[data-letra="grande"] .btn {
  white-space: normal;                    /* texto longo quebra dentro do botão */
  text-align: center;
}

:root[data-letra="grande"] .itens-novo {
  flex-wrap: wrap;
}

:root[data-letra="grande"] .itens-novo .campo-controle {
  flex: 1 1 10rem;
}

:root[data-letra="grande"] .botao-adicionar {
  flex: 1 0 auto;                         /* no celular desce e ocupa a largura toda */
}

@media (max-width: 479.98px) {
  :root[data-letra="grande"] .escolhas {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 359.98px) {
  :root[data-letra="grande"] .semana-lista {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

#### 15.12.3 Seção "13. MOVIMENTO REDUZIDO": acrescentar dentro do `@media (prefers-reduced-motion: reduce)`

```css
  /* Etapa 3b (a chavinha já fica sem transição pela regra geral) */
  .semana-botao:active {
    transform: none;
  }
```

A rolagem até o dia é sem animação pelo próprio JS (`behavior: "auto"`, 15.8).

#### 15.12.4 Seção "14. ALTO CONTRASTE DO WINDOWS": acrescentar dentro do `@media (forced-colors: active)`

```css
  /* Etapa 3b */
  .semana-botao {
    border: 1px solid ButtonText;
  }

  .semana-placa {
    border: 1px dashed CanvasText;
  }

  .aparencia-chave {
    border-color: ButtonText;
  }

  /* a bolinha é um fundo: sem isto ela sumiria */
  .aparencia-chave::after {
    forced-color-adjust: none;
    background: ButtonText;
  }

  :root[data-tema="claro"] .botao-aparencia--tema .aparencia-chave,
  :root[data-letra="grande"] .botao-aparencia--letra .aparencia-chave {
    forced-color-adjust: none;
    background: Highlight;
    border-color: Highlight;
  }

  :root[data-tema="claro"] .botao-aparencia--tema .aparencia-chave::after,
  :root[data-letra="grande"] .botao-aparencia--letra .aparencia-chave::after {
    background: HighlightText;
  }
```

No alto contraste o estado continua claro também pela posição da bolinha e pelo `aria-pressed`.

### 15.13 Contraste conferido (WCAG 2.1 AA)

#### Partes novas no tema escuro

"Pior ponto" = brilho âmbar do canto de cima no escuro, ≈`#271C19` (seção 2.1).

| Elemento | Cor / fundo | Razão | Mínimo |
|---|---|---|---|
| Texto dos botões de aparência | `#F5EEE6` / `#0F0B14` · ≈`#271C19` | 16.8 · ≈14:1 | 4.5:1 |
| Borda dos botões e trilho desligado | `#8A7A9C` / `#0F0B14` · ≈`#271C19` | 4.9 · 4.2:1 | 3:1 |
| Bolinha desligada | `#B8AAB9` / `#0F0B14` | 8.7:1 | 3:1 |
| Trilho ligado e borda do botão ligado | `#FFB547` / `#0F0B14` | 11.0:1 | 3:1 |
| Bolinha ligada | `#1A1205` / `#FFB547` | 10.5:1 | 3:1 |
| Nome do dia (com compromisso) | `#F5EEE6` / `#231A2E` | 14.5:1 | 4.5:1 |
| "Hoje" (com compromisso) | `#FFB547` / `#231A2E` | 9.5:1 | 4.5:1 |
| Quantidade | `#B8AAB9` / `#1D1626` · `#231A2E` | 7.9 · 7.5:1 | 4.5:1 |
| Número da quantidade | `#FFB547` / `#1D1626` | 10.0:1 | 4.5:1 |
| Borda do botão do dia | `#8A7A9C` / `#0F0B14` · ≈`#271C19` | 4.9 · 4.2:1 | 3:1 |
| Dia livre: nome e "Livre" | `#B8AAB9` / `#0F0B14` · ≈`#271C19` | 8.7 · 7.5:1 | 4.5:1 |
| "Hoje" livre | `#FFB547` / `#0F0B14` · ≈`#271C19` | 11.0 · 9.4:1 | 4.5:1 |
| Foco | `#8FD3FF`, 3px | ≥ 11:1 | 3:1 |

#### Tema claro (todas as partes)

Fundos: fundo `#F7F1E8` · superfície `#FFFCF7` · superfície-2 / metade de cima da placa `#EFE6DA` · metade de baixo `#E8DDCF` · pior ponto ≈`#F8E7CE`. Misturas (`color-mix` em sRGB, como no CSS): faixa de alerta ≈`#F1E7D9`, faixa de erro ≈`#F6E2DC`, faixa de lembrete ≈`#F0E8F0`, faixa de sucesso ≈`#E4EBE0`, painel "Ficou pendente" ≈`#EFE5D8`, tarja de conflito ≈`#F8E6E1`, tarja de aperto ≈`#F3EADE`, campo com erro ≈`#F2E1D7`.

| Elemento | Cor / fundo | Razão | Mínimo |
|---|---|---|---|
| Texto principal | `#23182B` / superfície · fundo · superfície-2 · placa de baixo · pior ponto | 16.6 · 15.1 · 13.7 · 12.7 · 14.0:1 | 4.5:1 |
| Texto nas faixas e tarjas | `#23182B` / alerta · erro · tarja de conflito · campo com erro | 13.9 · 13.6 · 14.1 · 13.4:1 | 4.5:1 |
| Texto suave (local, dicas, quantidade, hora de fim) | `#5B4C63` / superfície · fundo · superfície-2 · placa de baixo · pior ponto | 7.7 · 7.0 · 6.4 · 5.9 · 6.5:1 | 4.5:1 |
| Texto suave nas faixas | `#5B4C63` / alerta · lembrete · painel pendente | 6.5 · 6.6 · 6.3:1 | 4.5:1 |
| Âmbar como texto (horas, "Hoje", "Sair às", números, "Cobrar") | `#8A4A00` / superfície · fundo · placa de cima · placa de baixo · pior ponto | 6.7 · 6.1 · 5.6 · 5.1 · 5.7:1 | 4.5:1 |
| "Aperto:" e título "Ficou pendente" | `#8A4A00` / tarja de aperto · painel pendente | 5.8 · 5.5:1 | 4.5:1 |
| Destaque âmbar na faixa ("42 dias") | `#8A4A00` / faixa de alerta | 5.6:1 | 4.5:1 |
| Lilás ("DIA TODO", "SEM DATA", links, "Não vou fazer") | `#6436B5` / superfície · fundo · placa de cima · faixa de lembrete · pior ponto | 7.5 · 6.8 · 6.2 · 6.4 · 6.3:1 | 4.5:1 |
| Perigo (erros, "Conflito:", Excluir no hover) | `#B42318` / superfície · superfície-2 · tarja de conflito | 6.4 · 5.3 · 5.5:1 | 4.5:1 |
| Sucesso ("Feito", "tudo pronto", ícone) | `#1D6B3B` / superfície · superfície-2 · pior ponto · faixa de sucesso | 6.4 · 5.3 · 5.4 · 5.4:1 | 4.5:1 |
| Botão principal, "Sair em X min", opção marcada | `#FFF8EE` / `#8A4A00` | 6.5:1 | 4.5:1 |
| Botão principal no hover | `#FFF8EE` / `#6F3B00` | 8.7:1 | 4.5:1 |
| Botão "Excluir" / "Substituir" cheio | `#FFF8EE` / `#B42318` · hover `#8E1B12` | 6.2 · 8.6:1 | 4.5:1 |
| **Não-texto:** borda de campo, botão de contorno, caixa, "O que levar", botão do dia, trilho | `#7D7088` / superfície · fundo · superfície-2 · pior ponto | 4.5 · 4.1 · 3.7 · 3.8:1 | 3:1 |
| **Não-texto:** borda do campo com erro (2px) | `#B42318` / campo com erro · superfície | 5.2 · 6.4:1 | 3:1 |
| **Não-texto:** foco (3px) | `#0B5FC0` / fundo · superfície · superfície-2 · pior ponto | 5.5 · 6.0 · 5.0 · 5.1:1 | 3:1 |
| **Não-texto:** botão principal contra o fundo | `#8A4A00` / `#F7F1E8` | 6.1:1 | 3:1 |
| **Não-texto:** caixa marcada e check | `#8A4A00` / fundo · check `#FFF8EE` / `#8A4A00` | 6.1 · 6.5:1 | 3:1 |
| **Não-texto:** chavinha ligada (trilho / bolinha) | `#8A4A00` / fundo · `#FFF8EE` / `#8A4A00` | 6.1 · 6.5:1 | 3:1 |
| **Não-texto:** bolinha desligada | `#5B4C63` / fundo | 7.0:1 | 3:1 |
| **Não-texto:** ícones das tarjas e das faixas | perigo / âmbar / lilás / sucesso nas suas faixas | ≥ 5.2:1 | 3:1 |
| **Não-texto:** seta do `select` | `#5B4C63` / `#F7F1E8` | 7.0:1 | 3:1 |
| Campo e botão com cara de desativado | `#5B4C63` / superfície | 7.7:1 | isento, mas legível |

`--cor-borda` (`#DDD1C3`) continua **só** para enfeite (cards, divisórias, dia livre), como no escuro. Selos ("Cobrar", "Feito"...) têm borda de enfeite (`currentColor` a 55%): o que informa é o texto, que tem os contrastes acima.

### 15.14 Conferência da Entrega 3b (para o dev e o testador)

| Requisito | Como o visual atende |
|---|---|
| Faixa "Próximos 7 dias" com `h2`, entre "Ficou pendente" e "Próximos compromissos" | `section.semana` com `h2.secao-titulo` (15.8); ordem em 15.3 |
| 7 dias em `ul`/`li`, hoje e os 6 seguintes | `ul.semana-lista` com 7 `li.semana-dia` |
| Nome e quantidade em texto; "Livre" não só pela cor | "Hoje" / "Amanhã" / "Qua 12" + "3 compromissos" / "1 compromisso" / "Livre"; livre tracejado e sem fundo como reforço |
| Dia com compromisso é botão; rola e foca o `h3` (`tabindex="-1"`); sem animação com movimento reduzido | `button.semana-botao` + passos em 15.8; `h3` da lista principal com `tabindex="-1"` |
| Nome acessível "Hoje, 2 compromissos" | `aria-label` que começa pelo texto visível |
| Dia livre não é botão nem recebe foco | `div.semana-placa`, sem `tabindex` |
| Faixa sempre visível, também com a lista vazia | fora do `#lista-proximos`; 7 × "Livre" |
| Atualiza sem recarregar e sem perder o foco | montada junto com a lista; regra do foco em 15.8; sem `aria-live` |
| 360px sem rolagem horizontal; botões com 44px | 2 colunas de 160px (contas em 15.8); plaquinhas de 56px |
| Botão "Tema claro" com `aria-pressed`; padrão escuro | 15.4; sem atributo no `<html>` = escuro |
| Lugar do botão: visível sempre, sem cobrir nada, com teclado | barra "Aparência" no topo do `<main>`, não fixa (15.3) |
| Troca na hora, foco fica no botão | só muda o atributo do `<html>`; o botão não é redesenhado |
| Tema claro em **todas** as partes | todas as variáveis redefinidas (15.6) + os 6 ajustes do que não é variável; o CSS das seções 12 a 14 já usa só variáveis |
| Contraste AA nos dois temas (texto, botões, bordas, foco, erros, marcas) | 2.1, 12, 13, 14.10 (escuro) e 15.13 (claro e partes novas) |
| Campos nativos e barra de rolagem seguem o tema | `color-scheme: light` em `:root[data-tema="claro"]` + `<meta name="color-scheme">` |
| Tema aplicado antes de a página aparecer | script do `<head>`, antes do CSS (15.5) |
| Preferência ausente, corrompida ou sem `localStorage` = escuro e normal, sem erro | `try/catch` sem `console.error`; só "claro" e "grande" ligam algo |
| Botão "Letra grande" no mesmo lugar, com `aria-pressed`; padrão normal | 15.4 |
| Todo o texto ≈25% maior | `font-size: 125%` no `<html>`; todos os tamanhos em `rem` (escala em 15.7) |
| Letra grande a 360px sem rolagem e sem nada cortado; cabeçalho pode ter 2 linhas | ajustes da tabela de 15.7 |
| Letra grande nos dois temas | atributos independentes no `<html>` |
| Zoom do navegador junto com a letra grande | `125%` (relativo) e tamanhos em `rem` |
| Foco visível nos dois temas | `--cor-foco` redefinida (5.0:1 ou mais no claro) |
| Nada só por cor ("Livre", estado dos botões) | texto "Livre"; `aria-pressed` + posição da bolinha |
| Alto contraste e movimento reduzido | 15.12.3 e 15.12.4 |

**Roteiro rápido para o testador (além dos critérios):** abrir com `agenda:preferencias` = `{"tema":"claro","letra":"grande"}` e recarregar várias vezes (nunca pode aparecer escuro por um instante, nem a chavinha desligada); repetir com o `localStorage` bloqueado e com `agenda:preferencias` = `abc` (abre escuro e normal, console limpo, e a troca funciona até fechar a página); conferir a 360px com a letra grande o formulário inteiro ("Tempo para sair" em 2 colunas, "Adicionar" embaixo do campo), a janela "Seus dados" e a faixa de lembrete; com o tema claro, abrir os campos de data e hora (calendário e relógio claros), a lista vazia (sol, sem lua) e a confirmação de exclusão (fundo atrás da janela escurecido, não preto).

### 15.15 Decisões aprovadas pelo João em 2026-11-09

As 6 decisões abaixo foram aprovadas pelo João em 2026-11-09, nas opções recomendadas (na decisão 1, a opção A).

1. **Lugar dos botões "Tema claro" e "Letra grande".**
   - **A (recomendo):** uma barra "Aparência" logo abaixo do cabeçalho, no topo do conteúdo, antes dos avisos. Não fica grudada no topo (não ocupa espaço o tempo todo no celular) e está sempre no mesmo lugar.
   - B: no rodapé. Não ocupa espaço no topo, mas com uma lista comprida fica longe, e quem precisa da letra grande teria que rolar a página toda para achar.
   - C: uma segunda linha dentro do cabeçalho fixo. Sempre à mão, mas ocupa ≈52px da tela do celular o tempo todo.
2. **Cara dos botões:** texto fixo ("Tema claro", "Letra grande") com uma **chavinha** que liga (a bolinha vai para a direita e o trilho fica âmbar), sem ícone de sol ou de letra, para os dois caberem lado a lado a 360px.
3. **Paleta do tema claro "de manhã":** papel creme, tinta ameixa, e o âmbar vira **caramelo escuro**. Consequência: no tema claro o botão principal ("Novo compromisso", "Salvar") fica **caramelo com texto creme**, e não âmbar claro com texto escuro. O âmbar claro não tem contraste para ser cor de texto num fundo claro, e a Agenda usa a mesma cor para as horas e para o botão.
4. **A letra grande aumenta também os espaços** (tudo cresce 25%, como um "zoom" só da Agenda), não só as letras. Com ela, no celular: o cabeçalho fica em 2 linhas (de até ≈650px de largura), os botões de aparência ficam um embaixo do outro, "Tempo para sair" passa a ter 2 colunas e o "Adicionar" desce para baixo do campo "Novo item".
5. **Faixa da semana em grade de plaquinhas:** 2 por linha no celular, com "Hoje" ocupando a linha toda; 4 por linha no computador (4 + 3). Nome no formato "Qua 12"; dia livre tracejado, sem fundo e escrito "Livre". (Sete numa linha só não cabe: "3 compromissos" não entra numa coluna de 1/7 da tela nem no computador.)
6. **Ilustração no tema claro:** na lista vazia, a lua vira **sol** e as estrelas somem. O quadro continua escuro. O ícone do cabeçalho e o favicon **não mudam** nos dois temas (são a marca).

---

## 16. Etapa 4 — Entrega 4a (criar por frase)

Cobre a **Agenda US24** (campo "Criar por frase"), a **US28** (rascunho no formulário com a linha "Entendi") e a parte visual das **US25 a US27** (o que elas mostram na tela: a data, a hora e o título já preenchidos, o aviso de data que não existe e o erro "Digite um título." já visível). Também as mudanças da 4a nas stories anteriores (US01: ordem da página; US02: foco volta para o campo da frase; US03: erro já visível ao abrir; US16: "Ainda sem data" pode vir marcada; US22 e US23: tema claro e letra grande cobrem as partes novas). Tudo **se soma** às seções 1 a 15. Nada do que já existe muda de cor, de tamanho ou de lugar. A 4b (hora de fim, sair, levar e local na linha "Entendi") fica para depois.

### 16.1 Ideia visual

**O guichê de informações da estação.** A pessoa chega no balcão e diz, do jeito dela, aonde quer ir ("dentista amanhã às 10h"). O atendente repete o que entendeu antes de imprimir o bilhete: "Entendi: Amanhã · 10:00 · título 'Dentista'". Só depois de conferir a pessoa embarca (aperta "Salvar").

- **Painel "Criar por frase" = o guichê.** Um card baixo, logo abaixo da barra "Aparência", com um balãozinho de fala âmbar ao lado do rótulo. O campo é o mesmo campo "afundado" do formulário (fundo mais escuro que o card), e o botão "Criar" é de contorno, colado no campo, como o "Adicionar" do "O que levar" (uma peça só).
- **Linha "Entendi" = o canhoto do bilhete.** Uma tira no topo do formulário, com fundo levemente âmbar e uma **faixa âmbar de 4px à esquerda** (o canhoto). "Entendi:" em âmbar e negrito; a hora em mono âmbar, como na placa de hora; "Ainda sem data" e "data a escolher" em lilás, a cor do "sem hora/sem data" da Agenda inteira. Quando há algo para conferir (nada entendido ou data que não existe), uma segunda linha aparece **dentro da mesma tira**, separada por um tracejado, com o ícone de alerta.
- Nada se mexe sozinho: o painel não anima, a tira aparece junto com a janela (que já tem a entrada curta de 180ms).

### 16.2 Reaproveitado x novo

| Parte | Reaproveita | Novo (e por quê) |
|---|---|---|
| Campo da frase | `.campo-controle` (48px, 16px, fundo `--cor-fundo`, borda 3:1, foco, `::placeholder` AA), `.campo-dica` | `.frase` (o painel), `.frase-rotulo`, `.frase-linha` (campo + botão), exemplo em 14px (decisão 3) |
| Botão "Criar" | `.btn .btn-secundario` (contorno, hover, apertado, foco) | `.botao-criar` (cantos de campo e 48px, como o `.botao-adicionar`) |
| Linha "Entendi" | lugar do `.janela-subtitulo` (logo abaixo do título da janela), `.sr-only`, ícone "alerta" | `.entendi`, `.entendi-linha`, `.entendi-rotulo`, `.entendi-valor` (`--hora`, `--sem-data`), `.entendi-sep`, `.entendi-nota` |
| Erro "Digite um título." já visível | `.campo-erro` + `aria-invalid` da US03 (seção 6.5), sem mudança nenhuma | — |
| Data vazia, "Ainda sem data" marcada | estados de sempre (seções 13 e 14) | — |
| Tema claro e letra grande | todas as variáveis (15.6) e a escala em `rem` (15.7) | **nenhuma** regra extra de tema; a letra grande é resolvida pela quebra abaixo de 480px (16.3) |
| Ícones | "alerta" (8.2) | "frase" (balão de fala) e "criar" (seta para a direita), 16.8 |

### 16.3 Onde fica cada coisa

**Ordem da página (US01 da 4a):** cabeçalho · barra "Aparência" · **"Criar por frase"** · faixas (`#faixas`) · "Ficou pendente" · "Próximos 7 dias" · "Próximos compromissos" · "Sem data" · "Anteriores" · rodapé.

O painel fica **dentro do `<main>`, entre a `.aparencia` e o `#faixas`**. Não é fixo (rola com a página), aparece **sempre** (lista vazia, `localStorage` indisponível, com ou sem faixas), e, como vem antes das faixas que aparecem e somem, fica sempre no mesmo lugar. É um controle, não uma seção: **não tem título `h2`** (a ordem dos títulos da página não muda).

**Dentro do painel, de cima para baixo:** rótulo (com o balãozinho) → dica → linha com o campo e o botão. A dica fica **entre o rótulo e o campo**, e não embaixo do botão: no celular o botão desce para baixo do campo, e a dica ficaria longe do campo que ela explica.

```
320 a 479px, letra normal (360px = 328px úteis; painel com 302px por dentro)
+--------------------------------------+
| [ic] Agenda▪          (≡)  [+ Novo]  |  cabeçalho (igual)
+--------------------------------------+
| [(o ) Tema claro ] [(o ) Letra grande]|  barra "Aparência" (igual)
|                                      |
| +----------------------------------+ |  painel: card, raio 16px
| | (balão) Criar por frase          | |  rótulo 16px 600, balão âmbar
| | Escreva o que é, o dia e a hora. | |  dica 14px suave (2 linhas)
| | Você confere antes de salvar.    | |
| | +------------------------------+ | |
| | | Ex.: dentista amanhã às 10h  | | |  campo 48px, largura toda
| | +------------------------------+ | |
| | +------------------------------+ | |
| | |           Criar  ->          | | |  botão de contorno, largura toda, 48px
| | +------------------------------+ | |
| +----------------------------------+ |
|                                      |
| (faixas, se houver)                  |
| PRÓXIMOS 7 DIAS ...                  |
```

```
>= 480px (letra normal e grande): campo e botão na mesma linha
+------------------------------------------------------------------+
| [ic] Agenda▪                 [(≡) Seus dados] [+ Novo compromisso]|
+------------------------------------------------------------------+
                              [(o ) Tema claro] [(o ) Letra grande]
  +--------------------------------------------------------------+
  | (balão) Criar por frase                                      |
  | Escreva o que é, o dia e a hora. Você confere antes de salvar.|
  | +----------------------------------------------+ +---------+ |
  | | Ex.: dentista amanhã às 10h                  | | Criar ->| |
  | +----------------------------------------------+ +---------+ |
  +--------------------------------------------------------------+
  (faixas, se houver)
  PRÓXIMOS 7 DIAS
```

```
360px com LETRA GRANDE (320px úteis; painel com 288px por dentro)
+--------------------------------------+
| [ic] Agenda▪                         |
|                      (≡)  [+ Novo]   |  cabeçalho em 2 linhas (15.7)
+--------------------------------------+
| [(o ) Tema claro                   ] |
| [(o ) Letra grande                 ] |
| +----------------------------------+ |
| | (balão) Criar por frase          | |  20px
| | Escreva o que é, o dia e a       | |  17.5px, 3 linhas
| | hora. Você confere antes de      | |
| | salvar.                          | |
| | [ Ex.: dentista amanhã às 10h  ] | |  exemplo em 17.5px: cabe (contas abaixo)
| | [          Criar  ->           ] | |
| +----------------------------------+ |
```

| Largura | Campo e botão | Exemplo dentro do campo |
|---|---|---|
| 320 a 479px (normal e grande) | um embaixo do outro, os dois na largura toda (`flex-direction: column`) | cabe inteiro |
| ≥ 480px (normal e grande) | lado a lado: o campo estica, o botão fica do tamanho do texto, à direita | cabe inteiro |
| ≥ 640px | igual, com o painel com 16px de espaço interno (como o card do compromisso) | cabe inteiro |

**Contas** (exemplo "Ex.: dentista amanhã às 10h" ≈ 12.7em na Space Grotesk; com a decisão 3 ele usa `--fs-sm`: ≈178px na letra normal e ≈223px na grande):

| Situação | Largura do campo | Espaço para o texto (− 24px ou 30px de espaço interno e 2px de borda) | Exemplo | Cabe? |
|---|---|---|---|---|
| 320px, normal | 288 − 2 − 24 = **262px** | 236px | 178px | sim |
| 360px, normal | 328 − 2 − 24 = **302px** | 276px | 178px | sim |
| 360px, grande | 320 − 2 − 30 = **288px** | 256px | 223px | sim |
| 480px, normal | 422 − 8 − botão 102 = **312px** | 286px | 178px | sim |
| 480px, grande | 408 − 10 − botão 122 = **276px** | 244px | 223px | sim |
| 320px, grande (fora dos requisitos, que pedem 360px) | 248px | 216px | 223px | o "h" final pode ficar escondido até a pessoa digitar; sem rolagem da página |

O botão "Criar" (ícone 20 + vão 8 + "Criar" ≈ 40 + espaço interno 2 × 16 + bordas 2) tem ≈102px na letra normal e ≈122px na grande. Abaixo de 480px ele ocupa a largura toda; nada causa rolagem horizontal.

### 16.4 HTML de referência: o painel (US24)

```html
<!-- Etapa 4a (US24): "Criar por frase". Logo DEPOIS da barra "Aparência"
     e ANTES do #faixas. Não é fixo e aparece sempre.
     É um <form> de propósito: Enter dentro do campo "envia" o formulário
     sozinho (sem código de tecla), e o botão "Criar" é o type="submit".
     O JavaScript cancela o envio (preventDefault) e abre o rascunho. -->
<form class="frase" id="form-frase" novalidate>
  <label class="frase-rotulo" for="campo-frase">
    <svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 5h16v11H10l-6 4z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/></svg>
    Criar por frase
  </label>
  <p class="campo-dica" id="frase-dica">Escreva o que é, o dia e a hora. Você confere antes de salvar.</p>
  <div class="frase-linha">
    <input class="campo-controle" id="campo-frase" name="frase" type="text"
           maxlength="200" autocomplete="off" enterkeyhint="go"
           placeholder="Ex.: dentista amanhã às 10h" aria-describedby="frase-dica">
    <button class="btn btn-secundario botao-criar" type="submit" id="botao-criar">
      Criar
      <svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </button>
  </div>
</form>
```

- **Rótulo visível** "Criar por frase" ligado pelo `for`; o ícone é decorativo (`aria-hidden`), então o nome do campo é exatamente "Criar por frase".
- **Exemplo** no `placeholder`; ele **não** substitui o rótulo nem a dica (os dois continuam visíveis com o campo preenchido).
- **Dica** ligada por `aria-describedby="frase-dica"`: o leitor de tela lê "Criar por frase, editar texto, Escreva o que é, o dia e a hora. Você confere antes de salvar."
- `enterkeyhint="go"`: no teclado do celular, a tecla Enter aparece como "Ir". É só o rótulo da tecla; o comportamento é o do Enter.
- **O botão "Criar" nunca fica desativado** (US24: com o campo vazio ele "não faz nada", e um botão desativado não recebe foco nem explica por quê). Com o campo vazio ou só com espaços, o JS não abre nada e põe o foco no campo (`campoFrase.focus()`): assim, mesmo quem clicou no botão volta para o campo, como pede a US24.
- O texto do botão vem **antes** da seta (a seta aponta para "seguir"). O nome acessível é "Criar".

### 16.5 HTML de referência: a linha "Entendi" no formulário (US28)

Fica no `#form-compromisso`, **logo depois** do `#janela-subtitulo` (os dois nunca aparecem juntos: o subtítulo é só do "Remarcar", a linha é só da frase).

```html
<h2 class="janela-titulo" id="janela-titulo">Novo compromisso</h2>
<p class="janela-subtitulo" id="janela-subtitulo" hidden>...</p>

<!-- Etapa 4a (US28): só aparece quando o formulário foi aberto pela frase.
     SEM aria-live: quem lê é o aria-describedby da janela, uma vez, ao abrir.
     O JavaScript monta a linha com textContent (nunca innerHTML). -->
<div class="entendi" id="entendi" hidden>
  <p class="entendi-linha" id="entendi-linha"><!-- partes (abaixo) --></p>
  <p class="entendi-nota" id="entendi-nota" hidden>
    <svg class="icone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/></svg>
    <span id="entendi-nota-texto"></span>
  </p>
</div>
```

**A linha montada** (exemplo da frase 1, "dentista amanhã às 10h"):

```html
<p class="entendi-linha" id="entendi-linha"><span class="entendi-rotulo">Entendi:</span> <span class="entendi-valor">Amanhã</span><span class="sr-only">,</span><span class="entendi-sep" aria-hidden="true">&nbsp;· </span><span class="entendi-valor entendi-valor--hora">10:00</span><span class="sr-only">,</span><span class="entendi-sep" aria-hidden="true">&nbsp;· </span>título '<span class="entendi-valor">Dentista</span>'<span class="sr-only">.</span></p>
```

Na tela: **Entendi:** Amanhã · `10:00` · título '**Dentista**'. O leitor de tela lê: "Entendi: Amanhã, 10:00, título 'Dentista'."

| Parte (US28) | Texto | Classe |
|---|---|---|
| rótulo | "Entendi:" | `.entendi-rotulo` (âmbar, 700) |
| data com dia | "Hoje", "Amanhã", "Sex, 13/11", "Seg, 15/11/2027" (títulos de dia da seção 3 dos requisitos, **sem** "daqui a X dias") | `.entendi-valor` |
| sem data | "Ainda sem data" | `.entendi-valor .entendi-valor--sem-data` (lilás) |
| data que não existe | "data a escolher" | `.entendi-valor .entendi-valor--sem-data` (lilás) |
| hora | "10:00" | `.entendi-valor .entendi-valor--hora` (mono âmbar) |
| com data e sem hora | "Dia todo" | `.entendi-valor` (texto, sem cor própria) |
| sem data e sem hora | (a hora não aparece) | — |
| título | `título '` + valor + `'` | o valor em `.entendi-valor`; "título" e as aspas em texto comum |
| sem título | "sem título" | `.entendi-valor` |

- **Separador:** `<span class="entendi-sep" aria-hidden="true">&nbsp;· </span>` (espaço **inseparável** antes do "·" e espaço comum depois). Assim, quando a linha quebra, o "·" fica no fim da linha de cima e nunca começa uma linha. Antes de cada separador, uma vírgula só para o leitor de tela (`<span class="sr-only">,</span>`), para ele não ler "ponto". No fim da linha, um ponto escondido (`<span class="sr-only">.</span>`) dá a pausa antes da nota.
- **A nota** (`#entendi-nota`) usa o **mesmo** elemento para as duas mensagens (decisão 2). O JS troca só o texto do `#entendi-nota-texto` e o `hidden`:
  - sem nenhum pedaço de data e de hora: "Não encontrei data nem hora. Confira os campos.";
  - data que não existe: "A data 31/02 não existe. Escolha uma data." (com a data como foi digitada). Nesse caso a dica de "nada entendido" **não** aparece (uma nota por vez).
- A linha mostra o que foi entendido **na hora de abrir** e não muda depois.

**Sugestão para montar a linha** (só `textContent` e `createTextNode`; nenhum `innerHTML`):

```js
// partes: lista de { texto, classe, antes, depois } na ordem da US28.
// Ex.: [{ texto: "Amanhã" }, { texto: "10:00", classe: "entendi-valor--hora" },
//       { antes: "título '", texto: "Dentista", depois: "'" }]
function montarLinhaEntendi(linha, partes) {
  linha.replaceChildren();
  const rotulo = document.createElement("span");
  rotulo.className = "entendi-rotulo";
  rotulo.textContent = "Entendi:";
  linha.append(rotulo, " ");

  partes.forEach(function (parte, posicao) {
    if (posicao > 0) {
      const virgula = document.createElement("span");
      virgula.className = "sr-only";
      virgula.textContent = ",";
      const sep = document.createElement("span");
      sep.className = "entendi-sep";
      sep.setAttribute("aria-hidden", "true");
      sep.textContent = " · ";          // espaço inseparável + · + espaço
      linha.append(virgula, sep);
    }
    if (parte.antes) linha.append(document.createTextNode(parte.antes));
    const valor = document.createElement("span");
    valor.className = "entendi-valor" + (parte.classe ? " " + parte.classe : "");
    valor.textContent = parte.texto;          // o título vem da frase: SEMPRE textContent
    linha.append(valor);
    if (parte.depois) linha.append(document.createTextNode(parte.depois));
  });

  const ponto = document.createElement("span");
  ponto.className = "sr-only";
  ponto.textContent = ".";
  linha.append(ponto);
}
```

**Abrir e fechar** (o que o `app.js` faz com a janela; resumo para o dev):

| Como o formulário abriu | `#entendi` | `aria-describedby` da janela | Foco ao abrir | Foco ao fechar |
|---|---|---|---|---|
| pela frase | `hidden` tirado; linha e nota montadas | `janelaCompromisso.setAttribute("aria-describedby", "entendi")` | campo Título; com o erro "Digite um título." visível, também o Título (é o primeiro campo com erro, US03) | **sempre** o `#campo-frase` (Salvar: campo limpo antes; Cancelar/Esc: a frase continua) |
| "Novo compromisso", "Editar", "Remarcar", "Agendar" | `hidden`; linha esvaziada | `removeAttribute("aria-describedby")` | como antes | como antes |

Fazer as duas coisas **toda vez** que o formulário abre (e não só ao fechar): assim a linha de uma frase antiga nunca aparece num "Editar" aberto depois.

### 16.6 Estados

**Campo da frase**

| Estado | Visual |
|---|---|
| Vazio | exemplo "Ex.: dentista amanhã às 10h" em cinza suave (14px, decisão 3); borda `--cor-borda-campo` |
| Hover | borda `--cor-texto-suave` (regra de sempre do `.campo-controle`) |
| Foco | contorno de 3px `--cor-foco` afastado 2px + borda `--cor-foco` (azul-céu no escuro, azul escuro no claro) |
| Com texto | texto 16px (20px na letra grande) na cor do texto; o exemplo some |
| Depois de Cancelar/Esc | a frase continua lá, com o foco |
| Depois de Salvar | vazio, com o foco |
| `localStorage` indisponível | igual (o painel aparece sempre; a faixa de problema vem logo abaixo dele) |
| Erro | **não existe**: campo vazio não mostra mensagem (US24) |

**Botão "Criar"**

| Estado | Visual |
|---|---|
| Normal | contorno `--cor-borda-campo`, texto na cor do texto, seta de 20px, 48px de altura, cantos de 10px (como o campo) |
| Hover | fundo `--cor-superficie-2`, borda `--cor-texto-suave` (regra do `.btn-secundario`) |
| Apertado | desce 1px e encolhe 2% (regra do `.btn:active`) |
| Foco | contorno de 3px `--cor-foco` |
| Campo vazio | **igual ao normal** (nunca desativado): ao apertar, nada abre e o foco vai para o campo |

**Formulário aberto pela frase**

| Situação (exemplo da tabela dos requisitos) | Linha "Entendi" | Nota | Campos |
|---|---|---|---|
| tudo entendido (#1) | "Entendi: Amanhã · 10:00 · título 'Dentista'" | — | Título, Data, Hora preenchidos; foco no Título |
| data sem hora (#4) | "Entendi: Sáb, 14/11 · Dia todo · título 'Prova'" | — | Hora vazia (dica "Deixe em branco..." de sempre) |
| nada entendido (#41) | "Entendi: Ainda sem data · título 'Comprar pão'" | "Não encontrei data nem hora. Confira os campos." | "Ainda sem data" marcada; Data, Hora, "Hora de fim", "Tempo para sair" e "Me cobrar" desativados, como na US16 |
| data que não existe (#25) | "Entendi: data a escolher · título 'Festa 31/02'" | "A data 31/02 não existe. Escolha uma data." | Data **vazia**, "Ainda sem data" desmarcada; "Escolha uma data." só aparece ao tentar salvar |
| sem título (#42) | "Entendi: Amanhã · 10:00 · sem título" | — | Título vazio **com o erro "Digite um título." já visível** (borda vermelha de 2px, fundo avermelhado, ícone e texto: seção 6.5), `aria-invalid="true"`; foco no Título |
| `<b>oi</b>` (#50) | `Entendi: Amanhã · Dia todo · título '<b>oi</b>'`, com os sinais `<` e `>` visíveis | — | Título com o texto como foi digitado |

### 16.7 Teclado

| Ação | Resultado e foco |
|---|---|
| Tab desde o topo | "Seus dados" → "Novo compromisso" → "Tema claro" → "Letra grande" → **campo da frase** → **"Criar"** → faixas (se houver) → "Ficou pendente" → faixa da semana → lista |
| **Enter dentro do campo**, com texto | abre o formulário pela frase (envio do `<form>`; o JS chama `preventDefault()`); foco no Título |
| Enter, Espaço, clique ou toque em "Criar", com texto | o mesmo |
| Enter ou "Criar" com o campo vazio ou só com espaços | nada abre, sem mensagem; o foco fica no campo (ou volta para ele, se estava no botão) |
| "Salvar" no formulário | grava como na US02 (avisos de sempre no aviso flutuante); o campo da frase é **limpo** e recebe o foco |
| "Cancelar" ou Esc | nada é salvo; a **frase continua** no campo, que recebe o foco |
| Falha ao gravar (`localStorage` cheio) | o formulário continua aberto com o aviso "Não foi possível salvar o compromisso." dentro dele (US07); a frase continua no campo |

Enter **dentro do formulário** continua com a regra de sempre (Enter num campo de uma linha salva; no "Novo item", adiciona). Nada muda nisso.

### 16.8 Ícones novos

Mesma receita da seção 8.2 (`class="icone"`, `viewBox="0 0 24 24"`, traço `currentColor` de 2px, `aria-hidden="true" focusable="false"`):

| Nome | Onde | Miolo |
|---|---|---|
| frase (balão de fala com três pontinhos) | rótulo "Criar por frase" (âmbar) | `<path d="M4 5h16v11H10l-6 4z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/>` |
| criar (seta para a direita) | botão "Criar" (depois do texto) | `<path d="M5 12h14M13 6l6 6-6 6"/>` |

A nota da linha "Entendi" usa o ícone "alerta" que já existe.

### 16.9 Leitor de tela

| Momento | O que é lido |
|---|---|
| Tab chega ao campo | "Criar por frase, editar texto, Escreva o que é, o dia e a hora. Você confere antes de salvar." (o exemplo pode ser lido também, como dica do campo) |
| Tab chega ao botão | "Criar, botão" |
| O formulário abre pela frase | "Novo compromisso, caixa de diálogo, Entendi: Amanhã, 10:00, título 'Dentista'." e depois o campo com o foco: "Título (obrigatório), editar texto, Dentista" |
| … nada entendido | "… Entendi: Ainda sem data, título 'Comprar pão'. Não encontrei data nem hora. Confira os campos." |
| … data que não existe | "… Entendi: data a escolher, título 'Festa 31/02'. A data 31/02 não existe. Escolha uma data." |
| … sem título | "… Entendi: Amanhã, 10:00, sem título." e "Título (obrigatório), editar texto, inválido, Digite um título." |
| Depois de Salvar | o aviso flutuante de sempre ("Compromisso salvo.") e "Criar por frase, editar texto" (o foco voltou) |
| Depois de Cancelar | "Criar por frase, editar texto, dentista amanhã às 10h" |

- **Sem `aria-live`** no painel, na linha e na nota. A linha é lida **uma vez**, como descrição da janela (`aria-describedby="entendi"`), no momento em que ela abre. Uma região viva aqui faria o leitor repetir a linha logo depois da descrição.
- `#entendi` aponta para a tira inteira: com a nota escondida (`hidden`), ela fica fora da leitura; com a nota visível, ela é lida logo depois da linha.
- Os "·" são `aria-hidden` e as vírgulas escondidas dão as pausas.

### 16.10 CSS de referência da Entrega 4a

Duas mudanças no `css/style.css`: uma seção nova antes do movimento reduzido e um acréscimo no alto contraste. **Só variáveis** (nenhuma cor solta): o tema claro e a letra grande já valem sozinhos.

#### 16.10.1 Nova seção "12f": acrescentar logo **depois** da "12e. ETAPA 3b" e **antes** da "13. MOVIMENTO REDUZIDO"

```css
/* ---------------------------------------------------------
   12f. ETAPA 4a: CRIAR POR FRASE E A LINHA "ENTENDI"
   Decisões em: design.md, seção 16.
   Só variáveis: vale nos dois temas e com a letra grande.
   Contrastes conferidos em design.md, 16.11.
   --------------------------------------------------------- */

/* --- Painel "Criar por frase" (o "guichê"): logo abaixo da
       barra "Aparência", antes das faixas. Não é fixo. --- */
.frase {
  display: flex;
  flex-direction: column;
  gap: var(--esp-2);
  margin-bottom: var(--esp-5);
  padding: var(--esp-3);
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda);       /* enfeite: o rótulo diz o que é */
  border-radius: var(--raio-lg);
}

@media (min-width: 640px) {
  .frase {
    padding: var(--esp-4);                  /* como o card do compromisso */
  }
}

.frase-rotulo {
  display: inline-flex;
  align-items: center;
  gap: var(--esp-2);
  width: fit-content;
  font-size: var(--fs-base);
  font-weight: 600;
}

.frase-rotulo .icone {
  color: var(--cor-ambar);                  /* balão: 10.4:1 escuro · 6.7:1 claro */
}

/* A dica fica colada no rótulo (o gap do painel já separa do campo) */
.frase .campo-dica {
  margin-top: calc(-1 * var(--esp-1));
}

/* Campo + botão. Celular: um embaixo do outro, os dois na largura toda. */
.frase-linha {
  display: flex;
  flex-direction: column;
  gap: var(--esp-2);
}

/* Exemplo em 14px (17.5px na letra grande): cabe inteiro a 360px
   também com a letra grande (contas em design.md, 16.3). */
.frase-linha .campo-controle::placeholder {
  font-size: var(--fs-sm);
}

.botao-criar {
  min-height: 48px;                         /* mesma altura do campo */
  border-radius: var(--raio-md);            /* cantos de campo: uma peça só */
}

/* A partir de 480px: lado a lado, o campo estica e o botão fica à direita */
@media (min-width: 480px) {
  .frase-linha {
    flex-direction: row;
    align-items: stretch;
  }

  .frase-linha .campo-controle {
    flex: 1 1 0;
  }

  .botao-criar {
    flex: 0 0 auto;
  }
}

/* --- Linha "Entendi" no formulário (o "canhoto do bilhete") ---
   Só aparece quando o formulário abriu pela frase. Sem aria-live. */
.entendi {
  display: flex;
  flex-direction: column;
  gap: var(--esp-2);
  margin-top: calc(-1 * var(--esp-1));      /* encosta no título da janela */
  padding: var(--esp-3) var(--esp-4) var(--esp-3) var(--esp-3);
  background: color-mix(in srgb, var(--cor-ambar) 8%, var(--cor-superficie));
  border-left: 4px solid var(--cor-ambar);  /* enfeite: o texto diz tudo */
  border-radius: var(--raio-md);
  overflow-wrap: anywhere;                  /* título longo ou sem espaço quebra */
}

.entendi-linha {
  font-size: var(--fs-base);
  line-height: 1.5;
}

.entendi-rotulo {
  font-weight: 700;
  color: var(--cor-ambar);                  /* 9.0:1 escuro · 6.0:1 claro */
}

.entendi-valor {
  font-weight: 600;
}

/* A hora com a cara da placa: mono, âmbar, números de largura fixa */
.entendi-valor--hora {
  font-family: var(--fonte-mono);
  font-variant-numeric: tabular-nums;
  color: var(--cor-ambar);
}

/* "Ainda sem data" e "data a escolher": o lilás do "sem data" da Agenda */
.entendi-valor--sem-data {
  color: var(--cor-lilas);                  /* 7.8:1 escuro · 6.7:1 claro */
}

.entendi-sep {
  color: var(--cor-texto-suave);
}

/* Nota: "Não encontrei data nem hora..." ou "A data 31/02 não existe..." */
.entendi-nota {
  display: flex;
  align-items: flex-start;
  gap: var(--esp-2);
  padding-top: var(--esp-2);
  font-size: var(--fs-sm);
  border-top: 1px dashed color-mix(in srgb, var(--cor-ambar) 40%, transparent);   /* enfeite */
}

.entendi-nota .icone {
  width: 18px;
  height: 18px;
  margin-top: 1px;
  color: var(--cor-ambar);
}
```

#### 16.10.2 Seção "14. ALTO CONTRASTE DO WINDOWS": acrescentar dentro do `@media (forced-colors: active)`

```css
  /* Etapa 4a */
  .frase,
  .entendi {
    border: 1px solid CanvasText;
  }

  .entendi {
    border-left-width: 4px;
  }
```

**Movimento reduzido:** nada novo. O painel não anima, e a tira "Entendi" aparece junto com a janela (a entrada da janela já é cortada pela regra geral da seção 13 do CSS).

**Tema claro e letra grande:** nenhuma regra extra. O painel e a tira usam só variáveis (redefinidas em 15.6) e tamanhos em `rem` (crescem com o `125%` de 15.7). A quebra do campo e do botão abaixo de 480px vale para os dois tamanhos de letra.

### 16.11 Contraste conferido (WCAG 2.1 AA)

Fórmula de luminância relativa da WCAG 2.1, como na seção 2.1. O painel tem fundo próprio (`--cor-superficie`), então o brilho âmbar do fundo da página **não** chega no texto dele. Fundo da tira "Entendi" = âmbar 8% sobre a superfície (`color-mix` em sRGB): **≈`#2B2024`** no escuro e **≈`#F6EEE3`** no claro.

| Elemento | Escuro: cor / fundo | Razão | Claro: cor / fundo | Razão | Mínimo |
|---|---|---|---|---|---|
| Rótulo "Criar por frase" | `#F5EEE6` / `#191321` | 15.8:1 | `#23182B` / `#FFFCF7` | 16.6:1 | 4.5:1 |
| Dica do campo | `#B8AAB9` / `#191321` | 8.2:1 | `#5B4C63` / `#FFFCF7` | 7.7:1 | 4.5:1 |
| Texto digitado | `#F5EEE6` / `#0F0B14` | 16.8:1 | `#23182B` / `#F7F1E8` | 15.1:1 | 4.5:1 |
| Exemplo (`placeholder`) | `#B8AAB9` / `#0F0B14` | 8.7:1 | `#5B4C63` / `#F7F1E8` | 7.0:1 | 4.5:1 |
| Texto do botão "Criar" | `#F5EEE6` / `#191321` | 15.8:1 | `#23182B` / `#FFFCF7` | 16.6:1 | 4.5:1 |
| "Criar" no hover | `#F5EEE6` / `#231A2E` | 14.5:1 | `#23182B` / `#EFE6DA` | 13.7:1 | 4.5:1 |
| "Entendi:" e a hora | `#FFB547` / ≈`#2B2024` | 9.0:1 | `#8A4A00` / ≈`#F6EEE3` | 6.0:1 | 4.5:1 |
| Data, "Dia todo", título, "sem título", texto da nota | `#F5EEE6` / ≈`#2B2024` | 13.7:1 | `#23182B` / ≈`#F6EEE3` | 14.8:1 | 4.5:1 |
| "Ainda sem data" / "data a escolher" | `#C4A8FF` / ≈`#2B2024` | 7.8:1 | `#6436B5` / ≈`#F6EEE3` | 6.7:1 | 4.5:1 |
| Separador "·" | `#B8AAB9` / ≈`#2B2024` | 7.1:1 | `#5B4C63` / ≈`#F6EEE3` | 6.9:1 | (enfeite) |
| **Não-texto:** borda do campo e do botão | `#8A7A9C` / `#191321` · `#0F0B14` | 4.6 · 4.9:1 | `#7D7088` / `#FFFCF7` · `#F7F1E8` | 4.5 · 4.1:1 | 3:1 |
| **Não-texto:** balão do rótulo | `#FFB547` / `#191321` | 10.4:1 | `#8A4A00` / `#FFFCF7` | 6.7:1 | 3:1 |
| **Não-texto:** ícone de alerta da nota | `#FFB547` / ≈`#2B2024` | 9.0:1 | `#8A4A00` / ≈`#F6EEE3` | 6.0:1 | 3:1 |
| **Não-texto:** foco (3px) | `#8FD3FF` / `#191321` · `#0F0B14` | 11.2 · 11.9:1 | `#0B5FC0` / `#FFFCF7` · `#F7F1E8` | 6.0 · 5.5:1 | 3:1 |
| Erro "Digite um título." já visível | igual à 2.1 (7.2:1) | — | igual à 15.13 (6.4:1) | — | 4.5:1 |

A borda do painel (`--cor-borda`), a faixa âmbar de 4px da tira e o tracejado acima da nota são **enfeite**: a informação está sempre no texto. A **letra grande** não muda nenhuma cor; só aumenta o texto (e texto maior só melhora a leitura).

### 16.12 Conferência da Entrega 4a (para o dev e o testador)

| Requisito | Como o visual atende |
|---|---|
| Campo abaixo da barra "Aparência", antes de `#faixas`, sempre visível, não fixo | `form.frase` entre `.aparencia` e `#faixas` (16.3); sem `position: sticky` |
| Rótulo visível "Criar por frase"; `type="text"`, `maxlength="200"`, `autocomplete="off"` | `label.frase-rotulo` com `for`; atributos em 16.4 |
| Exemplo "Ex.: dentista amanhã às 10h" dentro do campo, sem substituir o rótulo | `placeholder`; rótulo e dica continuam visíveis |
| Dica perto do campo, ligada por `aria-describedby` | `#frase-dica` entre o rótulo e o campo |
| Botão "Criar" ao lado (pode descer a 360px) | lado a lado a partir de 480px; abaixo disso, embaixo do campo, na largura toda |
| Enter no campo e "Criar" abrem o formulário; nada é salvo | `<form>` com `type="submit"`; o JS cancela o envio e abre o rascunho |
| Campo vazio: nada acontece, sem mensagem, foco no campo | botão nunca desativado; o JS foca o campo (16.4) |
| Formulário "Novo compromisso"; Salvar como na US02 | mesma janela; a única diferença visual é a tira "Entendi" |
| Depois de Salvar: campo vazio e foco nele; Cancelar/Esc: frase fica e foco nele | tabela de 16.5 e 16.7 |
| Linha "Entendi" logo abaixo do título, na ordem data · hora · título, com " · " | `.entendi` depois do `#janela-subtitulo`; partes na tabela de 16.5 |
| Dica de "nada entendido" e aviso de data que não existe logo abaixo da linha (um por vez) | `#entendi-nota` dentro da tira, um texto por vez |
| Linha, dica e aviso em texto, AA nos dois temas, quebram a 360px | 16.11; `overflow-wrap: anywhere`; separador com espaço inseparável |
| Texto da frase nunca vira HTML | montagem só com `textContent` (sugestão em 16.5); testar a frase #50 |
| Leitor lê o título da janela e depois a linha; `aria-describedby` só pela frase; "·" não lido; sem `aria-live` | 16.5 (abrir e fechar) e 16.9 |
| Foco no Título ou no primeiro campo com erro | "Digite um título." já visível na frase #42 → foco no Título |
| A linha não muda quando a pessoa corrige os campos | a linha é montada só ao abrir |
| A linha só aparece pela frase | `hidden` + `removeAttribute("aria-describedby")` em toda abertura que não é pela frase |
| 360px: campo e botão sem rolagem; campo com 16px; 44px de toque | 16.3; campo e botão com 48px; campo com `--fs-base` |
| Letra grande a 360px: campo, botão e linha sem rolagem e sem nada cortado | contas de 16.3 (exemplo em 17.5px cabe em 256px); a tira quebra linha |
| Tab: "Tema claro" → "Letra grande" → campo → "Criar"; foco visível nos dois temas | ordem do HTML (16.7); `--cor-foco` nos dois temas (16.11) |
| "Entendi", "Ainda sem data", "Dia todo", "data a escolher", dica e avisos são texto | cor e faixa âmbar são só reforço |
| Alto contraste e movimento reduzido | 16.10.2; nada novo anima |

**Roteiro rápido para o testador (além das 52 frases):** a 360px e a 320px, com a letra normal e a grande, nos dois temas, conferir o painel (exemplo inteiro, botão embaixo do campo, nada cortado) e abrir o formulário com as frases #1, #25, #41 e #42 (a tira quebra linha sem rolagem; a nota aparece dentro da tira). Com o leitor de tela (NVDA ou Narrador), abrir pela frase e ouvir a linha **uma vez só**; depois abrir "Novo compromisso" e "Editar" e confirmar que a linha não aparece e não é lida. Conferir que "Criar" com o campo só com espaços não abre nada e deixa o foco no campo.

### 16.13 Decisões aprovadas pelo João em 2026-11-09

As 4 decisões abaixo foram aprovadas pelo João em 2026-11-09, todas na opção A (a recomendada): botão "Criar" de contorno; a dica e o aviso de data que não existe com a mesma cara âmbar; o exemplo do campo um pouco menor; o campo dentro de um card.

1. **Cara do botão "Criar".**
   - **A (recomendo):** botão de **contorno**, colado no campo, como o "Adicionar" do "O que levar". O botão âmbar cheio continua sendo só o "Novo compromisso" lá em cima, e o topo da página não fica com dois botões âmbar grandes um embaixo do outro no celular.
   - B: âmbar cheio (botão principal). Chama mais atenção, mas compete com o "+ Novo" do cabeçalho.
2. **Cor da nota dentro da linha "Entendi".**
   - **A (recomendo):** a dica "Não encontrei data nem hora. Confira os campos." e o aviso "A data 31/02 não existe. Escolha uma data." com a **mesma cara**: ícone de alerta âmbar e texto normal, dentro da tira. Os dois querem dizer "confira", e ainda não é um erro (o erro vermelho "Escolha uma data." só aparece se a pessoa tentar salvar).
   - B: o aviso de data que não existe em vermelho (ícone e texto), e só a dica em âmbar. Mais forte, mas o vermelho na Agenda é reservado para erro de verdade e para excluir.
3. **Exemplo dentro do campo um pouco menor que o texto digitado** (14px no lugar de 16px; 17.5px no lugar de 20px na letra grande).
   - **A (recomendo):** menor. É o que garante que "Ex.: dentista amanhã às 10h" aparece inteiro a 360px com a letra grande (os requisitos pedem "nada cortado"). O texto que a pessoa digita continua com 16px (sem zoom no celular).
   - B: mesmo tamanho do texto digitado. Fica mais uniforme, mas com a letra grande a 360px o fim do exemplo ("10h") pode ficar escondido.
4. **O campo dentro de um painel (card) ou solto na página.**
   - **A (recomendo):** dentro de um card baixo, com fundo próprio: separa a "captura" da lista e deixa o texto longe do brilho âmbar do fundo (contraste igual em qualquer ponto da tela).
   - B: solto, como um campo comum logo abaixo da barra "Aparência". Ocupa ≈24px a menos de altura no celular, mas se mistura com as faixas e com a faixa da semana logo abaixo.

---

## 17. Etapa 4 — Entrega 4b (fim, sair, levar e local pela frase)

Cobre a parte visual das **Agenda US29** (hora de fim pela frase), **US30** (tempo para sair), **US31** ("levar ..." vira o checklist) e **US32** (local com "no"/"na"), e as mudanças da 4b nas US03, US12, US17 e US19 (campos que já vêm preenchidos e erros já visíveis ao abrir). Tudo **se soma** às seções 1 a 16. A 4b é quase toda lógica (`js/frase.js`): no visual, só **três** coisas mudam:

1. a tira "Entendi" ganha as partes novas (17.3), com uma regra para a lista do "levar" não ficar enorme;
2. a tira ganha uma segunda nota, o aviso de mais de 20 itens (17.4);
3. o painel "Criar por frase" ganha um "Ver exemplos" recolhido (17.7), para a pessoa descobrir o que a frase entende.

Nenhuma cor nova, nenhum ícone novo, nenhum campo novo no formulário. Os campos preenchidos pela frase aparecem **exatamente** como se a pessoa tivesse preenchido à mão (17.6).

### 17.1 Ideia visual

O guichê da 4a agora **repete o bilhete inteiro**: "Entendi: Amanhã · 09:00 · até 10:00 · sair 30 min antes · local 'Centro' · levar 'RG' · título 'Dentista'". O canhoto fica mais comprido, mas continua sendo **uma linha de texto corrido** que quebra sozinha, com a mesma cara: os tempos (horas e minutos) em mono âmbar, como na placa de hora; o resto em texto normal. Quem olha a tira acha rápido "quando" (os números âmbar no começo) e "o quê" (os textos entre aspas no fim).

### 17.2 Reaproveitado x novo

| Parte | Reaproveita | Novo (e por quê) |
|---|---|---|
| Partes de tempo na tira ("até 10:00", "duração 90 min", "sair 30 min antes") | `.entendi-valor` + `.entendi-valor--hora` (mono âmbar) | — |
| Partes de texto ("local '...'", "levar '...'") | `.entendi-valor` (600), aspas em texto comum, como o título da 4a | `.entendi-mais` ("e mais 17 itens", texto suave) |
| Separador e leitura | `.entendi-sep` + vírgula `sr-only` (16.5) | — |
| Aviso de mais de 20 itens | `.entendi-nota` + ícone "alerta" (16.5) | um segundo elemento `#entendi-nota-itens` (pode aparecer junto com a nota da 4a) |
| Campos preenchidos | todos os estados das seções 13, 14 e 15 (opção marcada, "Outro" com minutos, itens com "Remover", campo com erro) | **nada** (17.6) |
| Exemplos no painel | `.frase` (16.10), seta da "Anteriores" (`.anteriores-seta`) | `.frase-exemplos`, `.frase-exemplos-botao`, `.frase-exemplos-lista` (17.7) |

### 17.3 A tira "Entendi" com tudo

#### 17.3.1 Ordem e texto de cada parte

Ordem fixa dos requisitos: **data · hora · fim · sair · local · levar · título**. Parte que não foi entendida **não aparece** (nem o separador dela). Separador entre todas as partes: o mesmo da 4a (`&nbsp;· ` com `aria-hidden`, e uma vírgula `sr-only` antes).

| Parte (US) | Texto na tira | Como montar (`antes` / `texto` / `depois`, ver 17.3.4) | Visual |
|---|---|---|---|
| data, hora (4a) | iguais à 16.5 | iguais | iguais |
| fim por intervalo (US29) | "até 11:00" | `antes: "até "` · `texto: "11:00"` · classe `entendi-valor--hora` | "até" normal, "11:00" mono âmbar |
| fim por duração (US29) | "duração 90 min" | `antes: "duração "` · `texto: "90 min"` · classe `entendi-valor--hora` | "duração" normal, "90 min" mono âmbar |
| tempo para sair (US30) | "sair 30 min antes" (sempre em minutos: "sair 90 min antes") | `antes: "sair "` · `texto: "30 min"` · `depois: " antes"` · classe `entendi-valor--hora` | "30 min" mono âmbar |
| local (US32) | "local 'Clínica Sorriso'" | `antes: "local '"` · `texto` · `depois: "'"` | valor 600 na cor do texto (igual ao título) |
| levar (US31) | "levar 'RG', 'cartão'" | lista de itens (17.3.3) | cada item 600 na cor do texto, entre aspas, separados por ", " |
| título (4a) | "título 'Dentista'" ou "sem título" | igual à 16.5 | igual |

Os espaços marcados como " " na tabela são **espaços inseparáveis** (` ` no JS). Assim "até 11:00", "duração 90 min", "sair 30 min antes", "local '" e "levar '" nunca se partem no meio: a tira quebra só **entre** as partes (depois do "·") ou dentro de um texto longo (local, item, título). Se mesmo assim uma parte não couber numa linha (só acontece abaixo de 360px com a letra grande), o `overflow-wrap: anywhere` que a `.entendi` já tem quebra onde precisar: nunca há rolagem para o lado.

**Valor com erro** ("das 22h às 2h", "22h por 3 horas", "sair 13h antes"): a tira mostra o valor **como entendido** ("até 02:00", "duração 180 min", "sair 780 min antes"), com a **mesma** cara das outras partes. O erro vermelho aparece no campo, como em qualquer erro do formulário (17.6). A tira diz "o que eu entendi"; o campo diz "o que precisa corrigir" (decisão 4).

**Local e título** usam a cor do texto, e não o lilás: na tira, o lilás quer dizer "falta data" ("Ainda sem data", "data a escolher"), e não pode ganhar um segundo sentido.

#### 17.3.2 Exemplos montados

| Frase (tabela da 4b) | Tira |
|---|---|
| #1 reunião amanhã das 10h às 11h | **Entendi:** Amanhã · `10:00` · até `11:00` · título '**Reunião**' |
| #6 treino amanhã 7h por 1h30 | **Entendi:** Amanhã · `07:00` · duração `90 min` · título '**Treino**' |
| #12 viagem sábado 8h sair 13h antes | **Entendi:** Sáb, 14/11 · `08:00` · sair `780 min` antes · título '**Viagem**' |
| #15 exame sexta 7h levar RG, pedido médico e cartão do convênio | **Entendi:** Amanhã · `07:00` · levar '**RG**', '**pedido médico**', '**cartão do convênio**' · título '**Exame**' |
| #22 dentista sexta das 9h às 10h no centro levar RG sair 30 min antes | **Entendi:** Amanhã · `09:00` · até `10:00` · sair `30 min` antes · local '**Centro**' · levar '**RG**' · título '**Dentista**' |
| #23 comprar pão levar sacola | **Entendi:** Ainda sem data · levar '**sacola**' · título '**Comprar pão**' + nota "Não encontrei data nem hora. Confira os campos." |
| #26 pensar na vida amanhã | **Entendi:** Amanhã · Dia todo · local '**Vida**' · título '**Pensar**' |
| #27 mudança sábado levar a, b, ... (22 itens) | **Entendi:** Sáb, 14/11 · Dia todo · levar '**a**', '**b**', '**c**' e mais 17 itens · título '**Mudança**' + nota "A lista 'O que levar' aceita até 20 itens. Os outros ficaram de fora." |

(`código` = mono âmbar; **negrito** = `.entendi-valor`.)

#### 17.3.3 A lista do "levar" na tira (decisão 1)

O checklist aceita até 20 itens de até 60 caracteres: listar tudo na tira daria até ≈1.200 caracteres, uma tela inteira de texto antes do primeiro campo. Como os itens **já aparecem todos** no grupo "O que levar" do formulário (com "Remover"), a tira mostra só o começo:

| Itens que entraram no checklist | Na tira |
|---|---|
| 1 a 4 | todos: "levar 'RG', 'exames', 'cartão', 'pedido'" |
| 5 ou mais | os 3 primeiros + "e mais N itens": "levar 'a', 'b', 'c' e mais 17 itens" |

- Com 4 itens mostra os 4 (trocar o 4º por "e mais 1 item" não economiza nada). Assim "e mais" é sempre plural (N ≥ 2).
- A contagem usa os itens que **entraram** (no máximo 20). Os que ficaram de fora são ditos pela nota (17.4).
- "e mais 17 itens" fica em `.entendi-mais` (texto suave): é uma contagem, não um item. O espaço antes do "e" é comum (pode quebrar ali) e os outros são inseparáveis: " e mais 17 itens".
- Itens longos (até 60 caracteres) quebram linha normalmente.

#### 17.3.4 Montar a linha: extensão da função da 16.5

A função `montarLinhaEntendi` da 16.5 já aceita `antes`, `texto`, `classe` e `depois`: fim, sair e local entram sem mudar nada nela. Só o "levar" precisa de um caso novo (uma parte com **vários** valores). Sugestão, dentro do `partes.forEach`, logo depois do separador:

```js
// 4b: parte com vários valores (só o "levar"). parte.itens = textos que
// entraram no checklist (até 20). Mostra todos se forem até 4; senão,
// os 3 primeiros e "e mais N itens" (design, 17.3.3). Sempre textContent.
if (parte.itens) {
  const mostrar = parte.itens.length <= 4 ? parte.itens : parte.itens.slice(0, 3);
  linha.append(document.createTextNode("levar "));
  mostrar.forEach(function (item, i) {
    if (i > 0) linha.append(document.createTextNode(", "));
    const valor = document.createElement("span");
    valor.className = "entendi-valor";
    valor.textContent = item;
    linha.append("'", valor, "'");
  });
  const resto = parte.itens.length - mostrar.length;
  if (resto > 0) {
    const mais = document.createElement("span");
    mais.className = "entendi-mais";
    mais.textContent = "e mais " + resto + " itens";
    linha.append(" ", mais);   // o espaço comum antes do "e" é onde a linha pode quebrar
  }
  return;   // dentro do forEach: pula para a próxima parte
}
```

Partes de exemplo para a frase #22:

```js
[
  { texto: "Amanhã" },
  { texto: "09:00", classe: "entendi-valor--hora" },
  { antes: "até ", texto: "10:00", classe: "entendi-valor--hora" },
  { antes: "sair ", texto: "30 min", classe: "entendi-valor--hora", depois: " antes" },
  { antes: "local '", texto: "Centro", depois: "'" },
  { itens: ["RG"] },
  { antes: "título '", texto: "Dentista", depois: "'" }
]
```

#### 17.3.5 Tamanho da tira (contas)

Janela a 360px: 320px; por dentro, ≈272px (letra normal) e ≈260px (grande, 15.7). Texto da tira = isso menos 12 + 4 + 16px (normal) ou 15 + 4 + 20px (grande): **≈240px** e **≈221px**. Space Grotesk a 16px ≈ 8,3px por caractere (≈29 por linha); a 20px ≈ 10,4px (≈21 por linha).

| Frase | Caracteres | 360px normal | 360px grande |
|---|---|---|---|
| #1 (4a, 1 parte de tempo) | ≈45 | 2 linhas · ≈72px de tira | 3 linhas · ≈120px |
| #22 (tudo, 1 item) | ≈103 | 4 a 5 linhas · ≈144px | 5 a 6 linhas · ≈210px |
| #21 (local + 2 itens + sair) | ≈100 | 4 a 5 linhas | 5 a 6 linhas |
| #27 (20 itens, com a regra 17.3.3) | ≈75 + nota de 2 a 3 linhas | ≈190px | ≈280px |
| #27 **sem** a regra (todos os 20) | ≈170 + nota | ≈280px | ≈400px |

Com a regra do "levar", o pior caso da 4b com a letra grande a 360px (≈280px) ainda deixa o campo Título visível logo abaixo numa tela de 640px de altura. A janela já rola por dentro (seção 11): nada é cortado em nenhum caso. O tamanho da letra da tira **não** diminui (continua `--fs-base`): ela é o resumo que a pessoa precisa ler, inclusive com a letra grande.

### 17.4 A segunda nota: mais de 20 itens (US31)

O aviso "A lista 'O que levar' aceita até 20 itens. Os outros ficaram de fora." pode aparecer **junto** com uma nota da 4a (ex.: "comprar pão levar a, b, ... (22)" = nada de data e hora **e** itens demais). Por isso ele ganha um elemento próprio, logo depois do `#entendi-nota`, com a mesma cara (ícone de alerta âmbar e texto normal, como decidido na 16.13, decisão 2):

```html
<div class="entendi" id="entendi" hidden>
  <p class="entendi-linha" id="entendi-linha"></p>
  <p class="entendi-nota" id="entendi-nota" hidden>
    <!-- svg "alerta" (igual) -->
    <span id="entendi-nota-texto"></span>
  </p>
  <!-- Etapa 4b (US31): só aparece quando a frase tinha mais de 20 itens no "levar". -->
  <p class="entendi-nota" id="entendi-nota-itens" hidden>
    <!-- svg "alerta" (o mesmo da nota de cima) -->
    <span>A lista 'O que levar' aceita até 20 itens. Os outros ficaram de fora.</span>
  </p>
</div>
```

- Ordem: primeiro a nota da 4a (data), depois a dos itens. Cada nota tem o seu tracejado em cima (já vem da `.entendi-nota`): com as duas, a tira fica linha · nota · nota, cada bloco separado.
- O texto é fixo no HTML (não vem da frase). O JS só tira e põe o `hidden`, **toda vez** que o formulário abre (como a 16.5 manda fazer com o resto da tira).
- O aviso não é erro: nada impede de salvar. Os 20 itens que entraram estão no formulário; a pessoa pode remover algum e acrescentar à mão o que ficou de fora.

### 17.5 Leitor de tela

Nada muda na regra da 4a (16.9): a janela continua ligada à tira inteira por `aria-describedby="entendi"`, **sem** `aria-live`, lida uma vez ao abrir. As notas escondidas ficam fora da leitura sozinhas.

| Frase | O que é lido ao abrir |
|---|---|
| #22 | "Novo compromisso, caixa de diálogo, Entendi: Amanhã, 09:00, até 10:00, sair 30 min antes, local 'Centro', levar 'RG', título 'Dentista'." |
| #15 | "… levar 'RG', 'pedido médico', 'cartão do convênio', título 'Exame'." (as vírgulas visíveis entre os itens já dão a pausa) |
| #27 | "… levar 'a', 'b', 'c' e mais 17 itens, título 'Mudança'. A lista 'O que levar' aceita até 20 itens. Os outros ficaram de fora." |
| #5 (fim antes do início) | "… Entendi: Sáb, 14/11, 22:00, até 02:00, título 'Festa'." e depois o campo com o foco: "Termina às, 02:00, inválido, A hora de fim precisa ser depois da hora de início." |

- **O checklist preenchido pela frase não é anunciado item por item.** O `#itens-aviso` (região viva do grupo "O que levar", 14.6) só fala quando a pessoa aperta "Adicionar" ou "Remover". Ao abrir pela frase, o JS monta a lista **sem** escrever no `#itens-aviso`; senão o leitor leria "RG adicionado. Exames adicionado..." por cima da descrição da janela (com 20 itens, vinte avisos).
- "min" é lido como está ("30 min"), igual ao card ("Sair às") e às opções "30 min" do grupo.

### 17.6 Campos preenchidos no formulário

**Sem destaque novo** (decisão 3). Os campos que vieram da frase têm a **mesma** cara dos preenchidos à mão. A tira no topo já é o resumo do que foi preenchido, e uma marca em cada campo ("veio da frase") não diria nada que a tira não diga. Além disso, a marca precisaria sumir quando a pessoa mexe no campo, mais estado para o JS cuidar.

O que a pessoa vê em cada caso (tudo já existe; nenhum CSS novo):

| Veio da frase | Como aparece |
|---|---|
| Intervalo "das 10h às 11h" | Hora 10:00; "Termina às" 11:00; Duração "1 h" (o JS preenche como na US19) |
| Duração "por 1h30" | Hora 07:00; Duração "Outro" com o bloco "Minutos" aberto e 90; "Termina às" 08:30 |
| "sair 30 min antes" | plaquinha "30 min" marcada (âmbar cheio + check) no "Tempo para sair" |
| "sair 40 min antes" | plaquinha "Outro" marcada, bloco "Minutos antes" aberto com 40 |
| "levar RG e exames" | dois itens na lista do "O que levar", cada um com "Remover"; campo "Novo item" vazio |
| 20 itens | lista com 20; "Novo item" e "Adicionar" desativados e a dica "Limite de 20 itens." (14.6) |
| "na clínica Sorriso" | campo Local com "Clínica Sorriso" |
| duração ou "sair" **sem hora** (#9, #13) | o pedaço fica no título; "Hora de fim" e "Tempo para sair" desativados com as dicas de sempre ("Escolha uma hora para usar...") |

#### 17.6.1 Erros já visíveis ao abrir (US29 e US30)

Os três casos usam o erro de sempre (seção 6.5 e 14: borda vermelha de 2px, fundo avermelhado, ícone e texto, `aria-invalid="true"`, `aria-describedby` com a dica e o erro), **já visível** quando a janela aparece, como o "Digite um título." da 4a:

| Frase | Campo com erro | Estado dos outros |
|---|---|---|
| fim antes do início (#5, "das 22h às 2h") | "Termina às" (02:00): "A hora de fim precisa ser depois da hora de início." | Duração "Sem hora de fim" |
| duração passa da meia-noite (#8, "22h por 3 horas") | Duração ("Outro"): "Com essa duração, o compromisso passaria da meia-noite. Escolha uma duração menor." | bloco "Minutos" aberto com 180; "Termina às" vazio |
| duração 0 ou mais de 1439 | "Minutos" da duração: "Digite um número de minutos entre 1 e 1439." | Duração "Outro" |
| sair fora de 1 a 720 (#12, "sair 13h antes") | "Minutos antes": "Digite um número de minutos entre 1 e 720." | plaquinha "Outro" marcada |

- **Foco ao abrir:** no **primeiro** campo com erro, na ordem do formulário: Título → Termina às → Duração → Minutos (duração) → Minutos antes. Sem erro, no Título (4a).
- **Rolagem:** o `focus()` rola a janela até o campo; a tira pode sair de vista lá em cima, e está tudo bem: o leitor de tela já leu a tira (descrição da janela) e quem enxerga vê o campo vermelho com a mensagem. Usar `campo.focus()` simples (o `scroll-padding` da `.janela`, 13.11.2, já deixa o campo longe da barra de botões).
- Os erros somem com as regras de sempre (ao corrigir o campo ou ao tentar salvar de novo).

### 17.7 Painel "Criar por frase": "Ver exemplos" (decisão 2)

O exemplo dentro do campo ("Ex.: dentista amanhã às 10h") e a dica **não mudam**: são textos fixos da US24, e um exemplo maior não caberia a 360px com a letra grande (contas da 16.3). Para a pessoa descobrir o que a 4b entende, o painel ganha, **depois** do campo e do botão, um "Ver exemplos" recolhido (`<details>` do próprio HTML: abre e fecha sem JavaScript, com Enter, Espaço, clique ou toque, e o leitor de tela diz "recolhido"/"expandido").

```
360px, recolhido (só +44px no painel)
+----------------------------------+
| (balão) Criar por frase          |
| Escreva o que é, o dia e a hora. |
| Você confere antes de salvar.    |
| [ Ex.: dentista amanhã às 10h  ] |
| [          Criar  ->           ] |
| Ver exemplos  v                  |  lilás 14px 600, linha de 44px
+----------------------------------+

aberto
| Ver exemplos  ^                  |
|  • dentista amanhã às 10h na     |  14px, cor do texto
|    clínica Sorriso               |
|  • reunião sexta das 14h às      |
|    15h30                         |
|  • treino sábado 7h por 1h       |
|  • consulta dia 20 9h sair 40    |
|    min antes                     |
|  • exame sexta 7h levar RG e     |
|    pedido médico                 |
+----------------------------------+
```

```html
<!-- Etapa 4b: exemplos do que a frase entende. Logo DEPOIS da .frase-linha,
     ainda dentro do form.frase. <details> abre e fecha sem JavaScript.
     Começa fechado sempre que a página abre. -->
<details class="frase-exemplos">
  <summary class="frase-exemplos-botao">
    Ver exemplos
    <svg class="icone frase-exemplos-seta" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6"/></svg>
  </summary>
  <ul class="frase-exemplos-lista">
    <li>dentista amanhã às 10h na clínica Sorriso</li>
    <li>reunião sexta das 14h às 15h30</li>
    <li>treino sábado 7h por 1h</li>
    <li>consulta dia 20 9h sair 40 min antes</li>
    <li>exame sexta 7h levar RG e pedido médico</li>
  </ul>
</details>
```

- Cada exemplo mostra **uma** novidade (local, intervalo, duração, sair, levar), todos com data e hora (o fim e o "sair" precisam de hora). O testador confere que cada um, copiado para o campo, preenche o que promete.
- Os exemplos são só texto (não são botões e não preenchem o campo): mais simples, e o "Criar" continua sendo o único jeito de abrir o formulário.
- **Tab:** campo → "Criar" → **"Ver exemplos"** → faixas... O requisito "o Tab chega ao botão Criar logo depois do campo" continua valendo.
- O `summary` não é botão de envio: Enter nele só abre e fecha, nunca abre o formulário.
- A seta é a mesma da "Anteriores" e gira 180° quando aberto.
- A ≥ 480px a lista fica do mesmo jeito (um exemplo por linha; os mais longos cabem numa linha só a partir de ≈520px).

### 17.8 CSS de referência da Entrega 4b

#### 17.8.1 Nova seção "12g": acrescentar logo **depois** da "12f. ETAPA 4a" e **antes** da "13. MOVIMENTO REDUZIDO"

```css
/* ---------------------------------------------------------
   12g. ETAPA 4b: TIRA "ENTENDI" COMPLETA E "VER EXEMPLOS"
   Decisões em: design.md, seção 17.
   Só variáveis: vale nos dois temas e com a letra grande.
   --------------------------------------------------------- */

/* "e mais 17 itens" na tira: é contagem, não item */
.entendi-mais {
  color: var(--cor-texto-suave);            /* 7.1:1 escuro · 6.9:1 claro (fundo da tira) */
}

/* --- "Ver exemplos" no painel "Criar por frase" --- */
.frase-exemplos-botao {
  display: inline-flex;
  align-items: center;
  gap: var(--esp-1);
  width: fit-content;
  min-height: 44px;                         /* área de toque */
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--cor-lilas);                  /* a cor dos links: ≈8.6:1 escuro · 7.5:1 claro */
  cursor: pointer;
  list-style: none;                         /* tira o triângulo do navegador */
  border-radius: var(--raio-md);
}

.frase-exemplos-botao::-webkit-details-marker {
  display: none;                            /* Safari antigo */
}

.frase-exemplos-botao:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.frase-exemplos-seta {
  width: 18px;
  height: 18px;
  transition: transform var(--transicao);
}

.frase-exemplos[open] .frase-exemplos-seta {
  transform: rotate(180deg);
}

.frase-exemplos-lista {
  display: flex;
  flex-direction: column;
  gap: var(--esp-1);
  margin: 0 0 var(--esp-1);
  padding-left: var(--esp-5);
  font-size: var(--fs-sm);
  line-height: 1.45;
  color: var(--cor-texto);
  list-style: disc;
}

.frase-exemplos-lista li::marker {
  color: var(--cor-lilas);
}

/* O gap da .frase já dá 8px entre a linha do campo e o "Ver exemplos".
   A linha do summary tem 44px; puxamos 4px para o painel não crescer à toa. */
.frase-exemplos {
  margin-top: calc(-1 * var(--esp-1));
}
```

- O contorno de foco do `summary` vem da regra geral de `:focus-visible` (3px `--cor-foco`), como em todo o resto.
- **Movimento reduzido:** a seta usa `var(--transicao)`, que a seção 13 do CSS já zera. Nada a acrescentar.
- **Alto contraste:** nada a acrescentar (texto e `summary` usam as cores do sistema sozinhos; a seta é `currentColor`).
- **Tema claro e letra grande:** nenhuma regra extra (só variáveis e `rem`).

#### 17.8.2 HTML e JS (resumo para o dev)

| Onde | O que muda |
|---|---|
| `index.html`, dentro do `#entendi` | acrescentar o `p#entendi-nota-itens` (17.4) depois do `#entendi-nota` |
| `index.html`, dentro do `form.frase` | acrescentar o `details.frase-exemplos` (17.7) depois da `.frase-linha` |
| `app.js`, `montarLinhaEntendi` | caso `parte.itens` (17.3.4); fim, sair e local usam `antes`/`depois` com ` ` |
| `app.js`, ao abrir o formulário | tirar/pôr o `hidden` do `#entendi-nota-itens` **toda vez** (pela frase e nos outros modos); montar o checklist **sem** escrever no `#itens-aviso`; focar o primeiro campo com erro na ordem de 17.6.1 |

### 17.9 Contraste conferido (WCAG 2.1 AA)

Nada de cor nova: as partes novas da tira usam as combinações já conferidas na 16.11 (fundo da tira ≈`#2B2024` escuro e ≈`#F6EEE3` claro).

| Elemento | Escuro | Razão | Claro | Razão | Mínimo |
|---|---|---|---|---|---|
| "até", "duração", "sair", "antes", "local", "levar", aspas, valores de local e itens | `#F5EEE6` / ≈`#2B2024` | 13.7:1 | `#23182B` / ≈`#F6EEE3` | 14.8:1 | 4.5:1 |
| "11:00", "90 min", "30 min" (mono âmbar) | `#FFB547` / ≈`#2B2024` | 9.0:1 | `#8A4A00` / ≈`#F6EEE3` | 6.0:1 | 4.5:1 |
| "e mais 17 itens" | `#B8AAB9` / ≈`#2B2024` | 7.1:1 | `#5B4C63` / ≈`#F6EEE3` | 6.9:1 | 4.5:1 |
| Nota dos 20 itens (texto e ícone) | igual à nota da 4a | 13.7 · 9.0:1 | igual | 14.8 · 6.0:1 | 4.5 · 3:1 |
| "Ver exemplos" e a seta | `#C4A8FF` / `#191321` | ≈8.6:1 | `#6436B5` / `#FFFCF7` | 7.5:1 | 4.5:1 |
| Exemplos da lista | `#F5EEE6` / `#191321` | 15.8:1 | `#23182B` / `#FFFCF7` | 16.6:1 | 4.5:1 |
| Erros já visíveis ao abrir | iguais à 2.1 e à 15.13 | — | — | — | 4.5:1 |

### 17.10 Conferência da Entrega 4b (para o dev e o testador)

| Requisito | Como o visual atende |
|---|---|
| Tira ganha "até 11:00" / "duração 90 min" logo depois da hora, mesmo com erro (US29) | 17.3.1; valor com erro mostrado como entendido |
| Tira ganha "sair 30 min antes", sempre em minutos (US30) | 17.3.1 |
| Tira ganha "levar 'RG', 'cartão'" (US31) | 17.3.1 e 17.3.3 (até 4 itens: todos; 5 ou mais: 3 + "e mais N itens", decisão 1) |
| Tira ganha "local 'Clínica Sorriso'" (US32) | 17.3.1 |
| Ordem data · hora · fim · sair · local · levar · título, com " · " | 17.3.1; separador da 16.5 |
| Aviso dos 20 itens junto da linha "Entendi" | `#entendi-nota-itens` (17.4), pode aparecer com a nota da 4a |
| Campos preenchidos como se fossem à mão, editáveis | nenhum destaque, estados de sempre (17.6) |
| Erros da US12 e da US19 já visíveis ao abrir; foco no primeiro | 17.6.1 |
| Texto da frase nunca vira HTML (local e itens também) | só `textContent` (17.3.4) |
| Leitor de tela: tira lida uma vez, "·" não lido, checklist não anunciado item por item | 17.5 |
| 360px, letra normal e grande, dois temas: tira sem rolagem para o lado | espaços inseparáveis só dentro das partes curtas + `overflow-wrap: anywhere` (17.3.1); contas em 17.3.5 |

**Roteiro rápido para o testador (além das 28 frases da 4b e das 52 da 4a):** a 360px e a 320px, com a letra normal e a grande, nos dois temas, abrir pelas frases #15, #21, #22, #23 e #27 (a tira quebra só entre as partes ou dentro de textos longos; "até 10:00" e "sair 30 min antes" nunca se partem; com #27, "e mais 17 itens" e as duas notas quando for o caso). Com #5, #8 e #12, conferir o erro já visível e o foco no campo certo. Com o leitor de tela, abrir #15 e #27 e confirmar que a tira é lida uma vez e que **não** há "adicionado" para cada item. Abrir "Ver exemplos" com o teclado (Enter e Espaço), copiar cada exemplo para o campo e conferir que ele preenche o que promete. Abrir "Novo compromisso" depois de #27 e confirmar que nenhuma nota aparece.

### 17.11 Decisões para o João confirmar

1. **A lista do "levar" na tira "Entendi".**
   - **A (recomendo):** até 4 itens, mostra todos; com 5 ou mais, os 3 primeiros e "e mais N itens". A lista inteira já está no formulário, logo abaixo, e a tira não vira um parágrafo enorme (com 20 itens e a letra grande, ela teria ≈400px de altura no celular).
   - B: todos os itens, como está escrito na US31. Mais completo, mas com muitos itens a tira empurra o formulário para fora da tela.
2. **Mostrar o que a frase entende no painel.**
   - **A (recomendo):** um "Ver exemplos" recolhido, logo abaixo do campo, com 5 frases de exemplo. Fechado, ocupa uma linha só; o exemplo e a dica da US24 não mudam.
   - B: uma segunda dica sempre visível ("Também entendo 'das 10h às 11h', 'por 1h', 'sair 30 min antes', 'levar RG' e 'na clínica'."). Mais fácil de ver, mas deixa o painel 3 a 5 linhas mais alto no topo da página do celular.
   - C: não mudar nada no painel (a pessoa descobre só pelas aulas ou testando).
3. **Destaque nos campos preenchidos pela frase.**
   - **A (recomendo):** nenhum. Os campos ficam iguais aos preenchidos à mão; a tira "Entendi" é o resumo.
   - B: uma etiqueta pequena "da frase" no rótulo de cada campo preenchido, que some quando a pessoa mexe nele. Ajuda a achar o que veio da frase num formulário comprido, mas é mais código e mais coisa na tela.
4. **Valor com erro na tira** (ex.: "até 02:00" numa festa que começa às 22:00).
   - **A (recomendo):** a tira mostra o valor normal, e o erro vermelho fica só no campo (com o foco nele). O vermelho continua reservado para erro de verdade, num lugar só.
   - B: a parte com erro fica vermelha também na tira. Avisa mais cedo, mas o mesmo erro aparece em dois lugares e a tira deixa de ser só "o que eu entendi".

**Decididas pelo João em 2026-11-11:** opção A nas quatro (1. "levar" com até 4 itens, senão 3 + "e mais N itens"; 2. "Ver exemplos" recolhido; 3. nenhum destaque nos campos; 4. erro só no campo, a tira mostra o valor normal). A US31 foi ajustada no requisitos.md.
