# Relatório de teste — Agenda, Etapa 2 (Entrega 2a)

- **Data:** 2026-11-05
- **O que foi testado:** a página `index.html` da Agenda (com `css/style.css`, `js/datas.js`, `js/armazenamento.js`, `js/copia.js`, `js/app.js`), o `README.md` e o `.gitattributes`, contra a Agenda **US08** (baixar cópia), **US09** (importar cópia), **US10** (lembrete de cópia), as mudanças da Entrega 2a na US01 e na US07 e os requisitos gerais da Etapa 2 que valem para a 2a ([requisitos](../requisitos.md)), com o visual da seção 12 do [design](../design.md). Também conferi a decisão aprovada fora dos requisitos ("Substituir tudo" com 0 compromissos no navegador importa direto, sem confirmação) e se a Etapa 1 continua funcionando.
- **Onde:** Microsoft Edge 156 (Chromium) **headless**, controlado por script, num servidor local que imita o endereço do GitHub Pages (`/agenda/`), e também abrindo o `index.html` direto do disco (`file://`). Fuso `America/Sao_Paulo`, com o relógio fixado em quinta-feira, 05/11/2026, 10:00 (e 23:30, para o nome do arquivo). Larguras: 320, 360, 412, 479, 480, 639, 640 e 1280px; alturas de 568 a 915px. **Não** testado: celular de verdade, leitor de tela de verdade, GitHub Pages (a Entrega 2a ainda não foi publicada).

## Resultado

**Rodada 2 (reteste, 2026-11-05): Aprovado com pendências.** A falha da rodada 1 foi corrigida e a bateria inteira passou de novo. Detalhes na seção "Rodada 2", no fim do arquivo.

**Rodada 1: Reprovado.** 318 conferências automáticas no navegador passaram, mas um problema de gravidade alta volta para o dev: no celular com tela baixa (360 × 640px, e também 320 × 568px), o aviso da janela "Seus dados" fica **escondido atrás da barra do botão "Fechar"**. Quem enxerga não vê "Cópia baixada." (fica cortado) nem nenhum erro da importação (fica totalmente coberto): escolhe um arquivo errado e parece que nada aconteceu. O resto da entrega está correto. A correção deve ser pequena (ver Problemas encontrados, item 1).

## Verificações

| Área | Resultado | Observação |
|---|---|---|
| Celular a 360px | Falhou | Sem rolagem horizontal de 320 a 1280px. O cabeçalho cabe numa linha (65px de altura em todas as larguras). "Seus dados" tem 44 × 44px abaixo de 640px. A faixa de lembrete e as três janelas cabem, e os botões da faixa ficam um embaixo do outro, com 44px. **Falha:** a 360 × 640 e a 320 × 568, o aviso de dentro da janela "Seus dados" fica coberto pela barra do "Fechar" (item 1). A 360 × 740, a 412 × 915 e no computador ele aparece. |
| Teclado | Passou | A ordem do Tab é: Seus dados → Novo → faixa (Baixar cópia agora → Depois) → lista. Nas janelas, o Tab fica preso: Baixar → Importar → Fechar; Juntar → Substituir tudo → Cancelar; Cancelar → Substituir. O foco começa em Baixar cópia / Juntar / Cancelar. Com as janelas empilhadas, o Esc fecha só a de cima, e o foco volta para Importar cópia / Substituir tudo / Seus dados. O foco tem 3px azul em tudo o que é novo. Quando a faixa some, o foco vai para "Próximos compromissos". |
| Acessibilidade | Passou | As três janelas são `dialog` com `aria-labelledby`/`aria-describedby` e `h2`. O nome acessível do botão é "Seus dados" em todas as larguras. A dica do Importar está ligada por `aria-describedby`. `#dados-aviso` tem `aria-live="polite"`, sempre no HTML, e o resultado da importação vai para o `#status` depois que as janelas fecham. Os ícones têm `aria-hidden`. "Lembrete de cópia", erro, sucesso e "Substituir" estão escritos em texto. Com `prefers-reduced-motion`, as partes novas não têm animação. Pequeno detalhe no nome de "Depois" (observação 1). |
| Contraste | Passou | Medido nas cores reais da tela. Texto da faixa: 13.2:1; rótulo e subtexto: 6.9; "42 dias": 8.6; ícone: 7.5; borda do "Depois": 3.9. Borda do botão "Seus dados": 5.0; ícone: 16.9. Placa da data: 10.3; aviso de sucesso: 12.2 (ícone 9.4); aviso de erro: 13.2 (ícone 6.0). Resumo da importação: 8.2 a 10.3. "Substituir tudo": texto 15.8 e borda 7.2; "Substituir" cheio: 7.4. Tudo bate com a tabela 12.10 do design. |
| Erros | Passou | Console sem erros nem avisos em todos os cenários, inclusive com `file://`. Nenhum 404. Mensagens amigáveis para os arquivos ruins e para o `localStorage` cheio ou bloqueado. |

## Critérios de aceite

**Agenda US08: Baixar uma cópia**
- [x] O botão "Seus dados", com ícone de cilindro, fica à direita e antes do "Novo compromisso". A ordem do Tab é Seus dados → Novo compromisso.
- [x] Abaixo de 640px, o botão mostra só o ícone, num círculo de 44 × 44px (medido a 320, 360, 479 e 639px). De 640px em diante, mostra o ícone e o texto. O nome acessível é "Seus dados" em todas as larguras.
- [x] A 360px (e a 320px), o cabeçalho cabe numa linha, sem rolagem horizontal.
- [x] A janela abre com `showModal()`. Esc e "Fechar" fecham, o Tab fica dentro e o foco volta para "Seus dados". Título, texto, "Última cópia: 05/11/2026" ou "Você ainda não fez nenhuma cópia.", os dois botões, a dica ligada ao Importar e o "Fechar" estão lá.
- [x] O foco vai para "Baixar cópia". A região de avisos começa vazia toda vez que a janela abre.
- [x] O arquivo se chama `agenda-2026-11-05.json`, com a data do aparelho. Às 23:30 (que já é 06/11 em UTC), continua `2026-11-05`.
- [x] O arquivo tem `app: "agenda"`, `versao: 1`, `exportadoEm` e todos os compromissos, inclusive os anteriores. Tem só essas 4 chaves.
- [x] O arquivo é JSON válido, com recuo de 2 espaços e sem BOM. "Reunião às 9h, café e pão", "Escritório São João" e "Ação: levar coração" aparecem corretos.
- [x] O arquivo não leva `agenda:compromissos-corrompido`, `agenda:compromissos-antes-da-importacao` nem a chave `jsl:` da Labs.
- [x] Depois de baixar, `agenda:ultimo-backup` é gravado, a placa mostra a data nova, o aviso fica em `#dados-aviso` (o flutuante não é usado), o foco fica em "Baixar cópia" e a faixa de lembrete some. *(O aviso existe e é anunciado, mas a 360 × 640 ele fica coberto: problema 1.)*
- [x] Sem compromissos, nenhum arquivo é gerado e aparece "Não há compromissos para copiar."
- [x] Um aviso por vez: o novo substitui o anterior.
- [ ] Funciona no Chrome e no Edge do computador e no Chrome do Android. *(Conferido só no Edge headless. Falta o João conferir no Chrome do computador e no Android: veja "Conferência manual".)*

**Agenda US09: Importar uma cópia**
- [x] "Importar cópia" abre o seletor do sistema com `accept=".json,application/json"`, e o foco fica em "Importar cópia". Cancelar o seletor não dispara nada (o `change` só acontece quando um arquivo é escolhido; conferido no código, porque o headless não deixa cancelar).
- [x] Escolher o mesmo arquivo duas vezes seguidas funciona, porque o `input.value` é limpo depois de cada leitura.
- [ ] **Erros do arquivo:** os 4 textos estão certos e aparecem em `#dados-aviso`, em vermelho e com ícone. Nada muda no `localStorage` e o foco fica em "Importar cópia". Arquivos testados: mais de 5 MB, texto que não é JSON, sem `compromissos`, uma lista solta, `versao: 2`, `versao: 7` sem lista, `app: "outro"`, sem `versao`, lista vazia e só itens inválidos. **Falha a 360 × 640 e a 320 × 568:** o aviso fica totalmente escondido atrás da barra do "Fechar" (problema 1).
- [x] Cada item é conferido: sem título, data inexistente, hora "25:00", "7:30" ou "" são ignorados. Textos longos são cortados em 100/100/500. Item sem `id` ganha `c-<número>-<4 letras>`. Com `id` repetido, fica o de `atualizadoEm` mais recente.
- [x] A janela "Importar cópia" abre por cima de "Seus dados", com o resumo ("Esta cópia tem 5 compromissos.", "5 itens com problema foram ignorados.", "Neste navegador há 4 compromissos."), a pergunta, "Juntar" com a explicação, "Substituir tudo" (contorno vermelho, ícone e texto) com "Troca os 4 compromissos daqui pelos 5 da cópia." e "Cancelar". A linha de ignorados some quando não há ignorados.
- [x] O foco começa em "Juntar" e a ordem é Juntar → Substituir tudo → Cancelar. "Cancelar" e Esc fecham só essa janela, não mudam nada e devolvem o foco para "Importar cópia".
- [x] Singular, plural e zero: "Esta cópia tem 1 compromisso.", "1 item com problema foi ignorado.", "Neste navegador há 1 compromisso.", "Neste navegador não há compromissos.".
- [x] **Juntar:** os novos são acrescentados. Quando o `atualizadoEm` é mais recente, vale o da cópia; quando empata ou é mais antigo, fica o daqui. Nada é apagado. Textos conferidos: "Cópia importada: 5 novos.", "Cópia importada: 1 novo e 1 atualizado.", "Cópia importada: 4 novos." e "Cópia importada: nada mudou, você já tinha esses compromissos."
- [x] **Substituir tudo:** a confirmação abre por cima, com "Substituir tudo?" e "Os 4 compromissos atuais serão trocados pelos 12 da cópia. Essa ação não pode ser desfeita." (com 1 atual: "O compromisso atual será trocado pelos 2 da cópia. …"). "Substituir" é vermelho cheio, com ícone e texto, e o foco fica em "Cancelar". Esc e "Cancelar" fecham só a confirmação e devolvem o foco para "Substituir tudo".
- [x] Ao confirmar, o conteúdo antigo vai para `agenda:compromissos-antes-da-importacao` (igual ao original) e a lista fica só com os 12 da cópia. Aparece "Cópia importada: 12 compromissos."
- [x] Fim da importação: as 3 janelas fecham, a lista aparece redesenhada sem recarregar, o resultado vai para o `#status` e o foco vai para "Seus dados".
- [x] Com o `localStorage` cheio (ao Juntar, ao Substituir e quando nem a cópia de segurança cabe) ou bloqueado, `agenda:compromissos` não muda e a tela também não. A pessoa volta para "Seus dados", aparece "Não foi possível importar a cópia neste navegador." e o foco vai para "Importar cópia". *(A 360 × 640, o aviso tem o mesmo problema 1.)*
- [x] Tudo do arquivo aparece como texto: um título `<img src=x onerror=…>` aparece escrito, sem criar `<img>` e sem rodar nada.
- [x] Importar não muda `agenda:ultimo-backup`.
- [x] Ida e volta: o arquivo baixado na US08, importado num navegador vazio com "Substituir" (sem confirmação, como foi aprovado) e também com "Juntar", reproduz exatamente os mesmos compromissos (mesmos campos e mesma ordem).

**Agenda US10: Lembrete de cópia**
- [x] Criar, editar, excluir e importar gravam `agenda:ultima-mudanca` com a hora certa. Cancelar não grava.
- [x] As duas condições são conferidas. Com cópia de 42 dias e mudança depois, a faixa aparece com "Sua última cópia foi há 42 dias.". Sem mudança depois, ou sem `ultima-mudanca`, ela não aparece. Com 30 dias não aparece; com 31 aparece. Sem cópia: compromisso criado há 31 dias faz a faixa aparecer com "Você ainda não fez uma cópia dos seus compromissos."; criado há 30 dias, não.
- [x] A faixa fica em `#faixas`, no topo do `main`, com `position: static`. Quando a exclusão falha com o `localStorage` cheio, a faixa de problema entra antes do lembrete.
- [x] Rótulo "Lembrete de cópia", texto, subtexto e os botões "Baixar cópia agora" e "Depois". O nome acessível de "Depois" é "Depois, lembrar daqui a 7 dias" (ver observação 1).
- [x] "Baixar cópia agora" baixa o mesmo arquivo, grava `ultimo-backup`, tira a faixa e mostra "Cópia baixada." no aviso flutuante.
- [x] "Depois" esconde a faixa, grava `agenda:lembrete-backup-adiado-ate` (agora + 7 dias exatos) e mostra "Lembrete adiado por 7 dias.". Ao recarregar, a faixa não volta. Com o relógio 7 dias depois, ela volta.
- [x] Baixar pela janela "Seus dados" também tira a faixa.
- [x] Quando a faixa some (Enter em "Baixar cópia agora" ou Espaço em "Depois"), o foco vai para o título "Próximos compromissos".
- [x] Sem compromissos, ou com o `localStorage` bloqueado, a faixa não aparece.
- [x] Ao abrir, a faixa não rouba o foco (fica no `body`) e não tem animação. Depois do cabeçalho, o Tab vai para "Baixar cópia agora".
- [x] Contraste AA. A 360px, os botões (44px) ficam um embaixo do outro, dentro da faixa, que não cobre a lista. Funciona com o teclado.

**Mudanças da Entrega 2a na US01 e na US07**
- [x] US01: "Seus dados" fica antes do "Novo compromisso", e "Próximos compromissos" tem `tabindex="-1"` (recebe o foco pelo código e fica fora do Tab).
- [x] US07: as chaves novas (`ultimo-backup`, `ultima-mudanca`, `lembrete-backup-adiado-ate`, `compromissos-antes-da-importacao`) seguem a tabela da seção 3. A faixa de lembrete fica depois das faixas de problema. A chave `jsl:` da Labs continuou intacta.
- [x] Regressão da Etapa 1: criar, editar e excluir continuam com os mesmos avisos e o mesmo foco. Com o `localStorage` bloqueado, a faixa de problema da Etapa 1 continua aparecendo, e baixar a cópia ainda funciona (a placa mostra a cópia, que ficou guardada na memória).

**Requisitos gerais da Etapa 2 (parte da 2a)**
- [x] As três janelas novas usam `dialog` com `showModal()` (`:modal` conferido). O Esc fecha sem mudar nada, o Tab fica dentro e o foco começa e volta no lugar certo.
- [x] Janelas empilhadas: o Esc fecha só a de cima e o foco volta para o botão que a abriu.
- [ ] **Onde os avisos aparecem:** a regra está certa (dentro da janela com "Seus dados" aberta, flutuante com as janelas fechadas, um por vez, com ícone e texto, sem mover o foco). Mas, a 360 × 640, o aviso de dentro da janela não fica visível (problema 1).
- [x] Os títulos das janelas são `h2` e os grupos de dia continuam com `h3`.
- [x] "Lembrete de cópia", erro, sucesso e "Substituir tudo" estão escritos em texto, não só em cor.
- [x] O `localStorage` só tem chaves `agenda:`, e o código não usa `localStorage.clear()` (procurei no código).
- [x] Nada é enviado para a internet: não há `fetch`, `XMLHttpRequest` nem `sendBeacon`. A cópia é um `Blob` baixado, e a importação lê só o arquivo escolhido.
- [x] Só HTML, CSS e JS puros, com caminhos relativos. Funciona em `/agenda/` e em `file://`. O `innerHTML` só é usado com os SVGs fixos do código.
- [x] O README fala da cópia, da importação, do lembrete e do `copia.js`. Sem dados pessoais. O `.gitattributes` fixa LF.

## Avaliação das interpretações do dev

| # | Interpretação | Avaliação |
|---|---|---|
| 1 | Hora ausente ou `null` vira dia todo; qualquer outro valor fora de `HH:MM` (inclusive `""`) faz o item ser ignorado. | **Aceito.** Segue a regra da versão 1 (`hora`: `HH:MM` ou `null`) e a US09 ("hora fora do formato é ignorado"). A Agenda nunca grava `""`. |
| 2 | "Esta cópia tem N" conta os itens válidos, sem repetir `id`; o `id` repetido não entra nos "ignorados". | **Aceito.** A US09 trata o `id` repetido como regra de escolha (fica o mais recente), não como item com problema. |
| 3 | Sem `versao`, ou com `versao` diferente de 1 e não maior, e `app` diferente de "agenda" → "Este arquivo não é uma cópia da Agenda.". | **Aceito.** A seção 3 diz que o formato é definido pela `versao` e pela lista. A `versao` maior é conferida antes da lista, o que dá a mensagem certa para um arquivo do futuro. |
| 4 | Textos novos: "Neste navegador ficam só os N compromissos da cópia." (0 atuais) e "pelo compromisso da cópia" (1 na cópia). | **Aceito como texto provisório.** Os textos estão corretos e no padrão dos outros, mas não estão nos requisitos nem na tabela 12.5: o João ou o PO precisa confirmar (observação 3). |
| 5 | Nunca houve cópia e nenhum compromisso tem `criadoEm` válido → a faixa não aparece. | **Aceito.** Sem `criadoEm` não dá para contar os dias. Todo compromisso criado na própria Agenda tem `criadoEm`. Só um arquivo importado sem esse campo cairia aqui. |
| 6 | "Mais de 30 dias" contado em dias de calendário. | **Aceito.** É a mesma regra do "daqui a X dias" e bate com o "há 42 dias" mostrado. Conferido: 30 dias não mostra, 31 mostra. |
| 7 | "Juntar" sem mudanças também grava a lista e a `ultima-mudanca`. | **Aceito pela letra da US10** ("toda … importação grava"). Efeito colateral: quem importa de novo um arquivo que já tinha passa a ter `ultima-mudanca` mais nova que a cópia e pode receber o lembrete sem ter mudado nada (observação 4). |

## Problemas encontrados

**1. No celular com tela baixa, o aviso da janela "Seus dados" fica escondido atrás da barra do "Fechar"**
- **Página:** `index.html`, janela "Seus dados", com tela de 360 × 640px (também acontece a 320 × 568px). Esse é o tamanho de um celular comum com a barra do navegador aberta.
- **Passos:**
  1. Abrir a Agenda com tela de 360 × 640px e pelo menos um compromisso.
  2. Tocar em "Seus dados" e em "Importar cópia".
  3. Escolher um arquivo que não é cópia (ex.: um `.json` qualquer).
  4. Repetir com "Baixar cópia".
- **Esperado:** o aviso vermelho "Este arquivo não é uma cópia da Agenda." (e, depois, o verde "Cópia baixada.") aparece visível acima da barra do "Fechar", como no desenho da seção 12.4 do design.
- **Obtido:** a janela é mais alta que a tela e rola por dentro, e a barra do "Fechar" fica grudada embaixo (`position: sticky`). O aviso entra no fim do conteúdo, exatamente **embaixo** dessa barra. Medidas a 360 × 640: o aviso de erro vai de 545 a 614px e a barra começa em 546px, então ele fica coberto inteiro. O de sucesso vai de 522 a 569px, então só a metade de cima de "Cópia baixada." aparece. O `scrollIntoView({ block: "nearest" })` do `mostrarAvisoNaJanela()` não rola, porque para o navegador o aviso já está "dentro" da janela (ele não leva em conta a barra grudada). Quem enxerga escolhe um arquivo errado e parece que nada aconteceu. O leitor de tela lê o aviso normalmente (`aria-live`), e o aviso aparece se a pessoa rolar a janela. A 360 × 740, a 412 × 915 e no computador está tudo certo.
- **Gravidade:** alta. Quebra a parte visível dos critérios "o aviso aparece dentro da janela" (US08, depois de baixar; US09, erros do arquivo e `localStorage` cheio) e a regra "nada cortado a 360px".
- **Onde corrigir (sugestão):** fazer a rolagem levar em conta a barra. Um jeito simples é, no CSS, dar ao aviso uma margem de rolagem do tamanho da barra (por exemplo, `.janela-aviso .faixa { scroll-margin-bottom: 6rem; }`), porque o `scrollIntoView` respeita o `scroll-margin`. Outro jeito é usar `scroll-padding-bottom` na `.janela`. O dev decide. Depois, conferir de novo a 360 × 640 e a 320 × 568, com erro e com sucesso.
- **Status:** corrigido pelo dev em 2026-11-05 (`css/style.css`: `scroll-padding-bottom: 6rem` na `.janela`). Conferido na Rodada 2: a 360 × 640 e a 320 × 568, o erro de importação, "Cópia baixada." (com o mouse e com o teclado) e o aviso de `localStorage` cheio aparecem inteiros, acima da barra do "Fechar".

### Observações (não são problemas)

1. **Nome acessível de "Depois":** o Chrome/Edge calcula "Depois **,** lembrar daqui a 7 dias" (com um espaço antes da vírgula), porque o `.sr-only` usa `position: absolute` e o navegador separa o pedaço escondido com um espaço. O leitor de tela fala igual, e o comando de voz "Depois" funciona. Se quiser o texto exato, dá para pôr o texto escondido com `aria-label="Depois, lembrar daqui a 7 dias"` no botão (o texto visível continua no começo). Gravidade baixa, opcional. **Rodada 2:** corrigido. O botão agora tem `aria-label="Depois, lembrar daqui a 7 dias"`, e o nome calculado é exatamente esse.
2. **`agenda:compromissos-antes-da-importacao` muda quando o "Substituir" falha:** com o `localStorage` cheio, a cópia de segurança é gravada (com o conteúdo atual, que não mudou) e só depois a gravação da lista falha. `agenda:compromissos` fica intacto, como pede a US09, mas a cópia de um "Substituir" anterior é trocada. Não se perde nenhum compromisso atual. Gravidade baixa.
3. **Textos que não estão nos requisitos** (para o João ou o PO confirmar): "Neste navegador ficam só os N compromissos da cópia." e "Neste navegador fica só o compromisso da cópia." (0 atuais); "Troca os 4 compromissos daqui pelo compromisso da cópia." (1 na cópia); o aviso de "Não há compromissos para copiar." em âmbar (alerta), como diz a tabela 12.6.
4. **Lembrete depois de um "Juntar" que não mudou nada** (ponto 7 do dev): a `ultima-mudanca` é gravada mesmo com "nada mudou", e isso pode fazer o lembrete aparecer depois de 30 dias sem nenhuma mudança real. É o que a US10 pede, mas o PO pode preferir não gravar quando nada muda.
5. **O mesmo problema 1 já existia na Etapa 1:** a 360 × 640, com o `localStorage` cheio ao salvar, o aviso "Não foi possível salvar o compromisso." do formulário (`#erro-salvar`) também fica coberto pela barra Cancelar/Salvar (de 553 a 623px, com a barra em 546px). A mesma correção serve para os dois. **Rodada 2:** corrigido a 360 × 640 (o aviso vai de 457 a 527px e a barra começa em 546px), a 360 × 740, a 412 × 915 e no computador. **Ainda acontece a 320 × 568:** lá a barra Cancelar/Salvar fica com os dois botões empilhados e passa a ter uns 134px, mais que os 6rem (96px) do `scroll-padding-bottom`. O aviso fica de 385 a 455px e a barra começa em 418px. É da Etapa 1 e fica numa largura abaixo dos 360px do critério. Pendência de gravidade baixa (sugestão: um `scroll-padding-bottom` maior só nessa janela, ou medido pela altura real da barra).
6. **Rolagem ao recarregar:** se a página estava aberta sem a faixa e é recarregada num momento em que a faixa passa a aparecer, o Edge pode manter "Próximos compromissos" no mesmo lugar da tela (recurso do navegador que guarda a posição ao recarregar). Aí a faixa fica acima, fora da vista. Aconteceu só ao recarregar; ao abrir a página de novo (aba nova ou primeira visita), a faixa aparece no topo. Não precisa de correção agora.
7. No `dialog` modal do Edge, o Tab depois do último botão passa pela interface do navegador e volta para o primeiro (aparece como `body` no teste), como já estava anotado na Etapa 1. A página atrás nunca recebe o foco.
8. Os botões das janelas medem 43,4px **durante** a animação de abertura (0,18s) e 44px depois dela. Está certo.

## Como foi testado (o que foi de verdade e o que foi por leitura)

- **No navegador (Edge headless, por script):** tudo o que está marcado acima, ou seja, 318 conferências, todas passando, mais as medidas do problema 1. O download foi de verdade: o arquivo foi salvo em disco e lido de novo (nome, JSON, recuo, acentos, BOM). A importação usou arquivos de verdade, colocados no `<input type="file">`. O `localStorage` cheio foi simulado fazendo o `setItem` dar erro de cota, e o bloqueado fazendo o próprio `localStorage` dar erro. O contraste foi medido nas cores calculadas da página.
- **Só por leitura de código:** cancelar o seletor de arquivos (o headless não abre a janela do sistema); a leitura dos avisos pelo leitor de tela (conferi as regiões `aria-live` e se o texto muda, mas não ouvi); o comportamento no Android e no iPhone.
- Os scripts de teste ficaram fora do projeto. Nenhum navegador nem servidor ficou aberto no fim.

## Conferência manual (para o João)

1. **Download no Chrome do computador e no Chrome do Android:** o arquivo `agenda-AAAA-MM-DD.json` aparece em Downloads. Abrir o arquivo num editor e ver se os acentos estão certos.
2. **Ida e volta entre aparelhos:** baixar no computador, mandar o arquivo para o celular, "Importar cópia" → "Juntar", e ver se os compromissos aparecem.
3. **Problema 1 no celular de verdade** (depois da correção): no celular, escolher um arquivo que não é da Agenda e ver se o aviso vermelho aparece sem precisar rolar.
4. **Cancelar o seletor de arquivos** (no computador e no celular): nada deve acontecer, e o foco fica em "Importar cópia".
5. **Leitor de tela** (NVDA no Windows ou TalkBack no Android): ao baixar, ouvir "Cópia baixada."; com um arquivo errado, ouvir a mensagem de erro; no fim da importação, ouvir "Cópia importada: …"; e conferir o nome dos botões "Seus dados" e "Depois, lembrar daqui a 7 dias".
6. **iPhone (se tiver):** o Safari pergunta onde guardar o arquivo. Isso é do sistema e é aceito.
7. **Depois do push:** abrir `https://joaosaccucci.github.io/agenda/` e conferir "Seus dados" (sem 404 e sem erro no console).

## Rodada 2 (reteste) — 2026-11-05

- **O que mudou (segundo o dev):** `css/style.css` ganhou `scroll-padding-bottom: 6rem` na `.janela`, e isso vale para todas as janelas. Em `js/app.js`, o "Depois" da faixa passou a usar `aria-label="Depois, lembrar daqui a 7 dias"` no lugar do `span.sr-only`. Conferi no código que as duas mudanças estão lá.
- **Onde:** o mesmo Edge 156 headless, o mesmo servidor `/agenda/` e o mesmo relógio fixo da rodada 1.

### Resultado

**Aprovado com pendências.** O problema 1 (gravidade alta) está corrigido, e a bateria completa da rodada 1 rodou de novo com **318 conferências e nenhuma falha** (sem regressões). Na área "Celular a 360px", a verificação passou. As pendências são só de gravidade baixa: as observações 2, 3, 4, 6 e 7, mais o resto da observação 5 a 320 × 568, que é da Etapa 1.

### Conferências do reteste

| Tamanho da tela | Erro de importação | "Cópia baixada." (mouse e teclado) | `localStorage` cheio ao importar | `#erro-salvar` do formulário |
|---|---|---|---|---|
| 360 × 640 | visível (458–527, barra em 546) | visível (480–527) | visível | visível (457–527) |
| 320 × 568 | visível (386–455, barra em 474) | visível (402–450) | visível | **coberto** (385–455, barra em 418): observação 5 |
| 360 × 740 | visível | visível | visível | visível |
| 412 × 915 | visível | visível | visível | visível |
| 1280 × 720 | visível | visível | visível | visível |

- Nos tamanhos testados, o foco continua no lugar certo: em "Importar cópia" depois de um erro e de `localStorage` cheio, e em "Baixar cópia" depois de baixar. O console ficou sem erros.
- O `scroll-padding-bottom` não estragou a correção da Etapa 1: com o formulário rolado até o fim e o Título vazio, o rótulo "Título (obrigatório)" continua visível em todos os tamanhos.
- O nome acessível de "Depois" agora é exatamente "Depois, lembrar daqui a 7 dias" (`getByRole` com o nome exato). O texto visível "Depois" continua no começo, o que é bom para o comando de voz.
- Com isso, os critérios que estavam desmarcados por causa do problema 1 (erros do arquivo na US09 e "onde os avisos aparecem" nos requisitos gerais) passam. Continua só a conferência manual do critério "Chrome e Edge do computador e Chrome do Android" (US08), que está em "Conferência manual".

## Aulas da Entrega 2a — 2026-11-05

- **O que foi testado:** as 4 aulas novas da Agenda na Labs (`aulas/agenda/modulo-1/aula-01.md` a `aula-04.md`) e as mudanças em `data/aulas.json` (módulo `agenda-m1`), `data/glossario.json` (Blob, Array.isArray, findIndex, Map) e `data/projetos.json` (trabalho do professor e linha do tempo da Agenda). O teste foi feito antes do commit da Labs e seguiu o guia `docs/guias/aulas.md` e a regra do João de que nenhum exercício manda mexer no código de um projeto.
- **Onde:** Edge 156 headless, com o site da Labs servido por um servidor local (marked e highlight.js carregados pelo CDN, nas versões fixas), a 1280px e a 360px. Os links fixos foram comparados com os arquivos locais da Agenda, que estão no commit `e413ad86d9f525fd94bfaa21e45153ff97cf0a06` (`git status` limpo). Esse commit já está publicado: a página dele no GitHub respondeu 200.

### Resultado

**Aprovado.** Foram 113 conferências automáticas. As poucas que falharam eram problemas do próprio script de teste, e eu conferi uma por uma (detalhes em "Erros" na tabela abaixo). Também conferi o conteúdo lendo as aulas. Não encontrei nenhum problema que quebre as regras das aulas, e ficaram só observações de gravidade baixa.

### Verificações

| Área | Resultado | Observação |
|---|---|---|
| Celular a 360px | Passou | Sem rolagem horizontal nas 4 aulas, em `aulas.html#agenda-m1` e em `detalhe-projeto.html?id=agenda`. |
| Teclado | Passou | O Tab chega no Rodar, no Editar, no Restaurar, nas alternativas do quiz, no glossário (abre com Enter e fecha com Esc) e no checklist. O foco aparece em tudo. No checklist, o contorno fica no rótulo inteiro (`:has(:focus-visible)`), não na caixinha. |
| Acessibilidade | Passou | Os componentes são os mesmos da Labs (caixas com `role="note"`, Linha por linha, quiz, glossário). Ver a observação A, sobre o aviso do Rodar na aula 2. |
| Contraste | Passou | Nada de visual novo: as aulas usam os componentes que já existiam. |
| Erros | Passou | A página da aula ficou sem erros no console nas 4 aulas, nas 3 aulas da Labs da amostra e no detalhe da Agenda. O Console do exemplo também ficou sem erro. O único 404 foi o `/favicon.ico` que o navegador pede sozinho na raiz do servidor de teste, e ele não tem relação com as aulas. |

### Conferências

**1. `aulas.html`**
- [x] Há o grupo "Agenda" (`h2`) antes de "João Saccucci Labs", com "Módulo 1 — Entrega 2a: cópia e importação" e as 4 aulas (Aula 1.1 a 1.4), com links para `aula.html?id=agenda-m1-aula-01` a `-04`.
- [x] A página tem 19 cards no total: 15 da Labs e 4 da Agenda.
- [x] `aulas.html#agenda-m1` (o link usado em `projetos.json`) leva até o módulo.

**2. Cada aula em `aula.html`** (as 4 passaram em tudo)
- [x] Têm a caixa Em resumo, Erro comum e Em entrevista (a aula 4 também tem a Dica "Para ir além", marcada como opcional).
- [x] O glossário funciona com todos os termos: JSON.stringify, Blob, Promise, await, async, try, JSON.parse, Array.isArray, typeof, textContent, innerHTML, XSS, slice, findIndex, forEach e push. Nenhum `[[...]]` sobra na página.
- [x] O código aparece colorido, e há 1 exemplo com Rodar por aula, com até 15 linhas.
- [x] O Linha por linha está ligado ao exemplo e cita as linhas certas. Conferi cada item com o código: aula 1 (L1–5, 7, 8, 9–10, 12, 13–14); aula 2 (L1, 3, 5, 7, 8–11, 12, 14–15); aula 3 (L3–5, 6–8, 9, 10, 12–14); aula 4 (L1–4, 5–8, 9, 10, 11, 12, 13, 15).
- [x] O Rodar mostra exatamente o que o texto diz:
  - Aula 1: o JSON numa linha, o JSON com recuo, "Tamanho do arquivo: 118 bytes" e "Tipo: application/json".
  - Aula 2: **1, 2, 3** nessa ordem ("1. Começou a ler...", "2. A página continua livre...", "3. Texto lido: {"versao": 1, "compromissos": []}").
  - Aula 3: "Erro: não é JSON.", "Erro: não é uma cópia da Agenda." e "OK: 1 certo(s), 1 ignorado(s).".
  - Aula 4: a lista com "a1: Dentista às 10h", "a2: Academia" e "a3: Pagar boleto".
- [x] Editar abre o código num campo de texto, o código editado roda, e Restaurar volta ao original.
- [x] Cada aula tem 2 quizzes clicáveis, todos bem formados, com explicação. O checklist "Para praticar" é marcável.

**3. Navegação e o resto do site**
- [x] Anterior e próxima andam só entre as 4 aulas da Agenda: a 1.1 não tem "anterior" e a 1.4 não tem "próxima".
- [x] Amostra da Labs (m1-aula-01, m1-aula-06, m3-aula-04): as aulas abrem sem erro, e nenhum link de navegação leva para a Agenda.
- [x] `detalhe-projeto.html?id=agenda` mostra o trabalho do professor (com o link `aulas.html#agenda-m1` e o Glossário) e a nova linha da linha do tempo.

**4. Links fixos** (todos com o hash completo, nenhum com `/blob/main/`)
- [x] Aula 1: `copia.js#L47-L55` (é a `textoDoArquivoDeCopia` inteira) e `app.js#L735-L745` (a `baixarArquivo` inteira).
- [x] Aula 2: `index.html#L216` (o `<input type="file">`), `app.js#L1101-L1107` (o `change` com `campoArquivo.value = ""`) e `app.js#L784-L799` (do tamanho até o `if (!janelaDados.open) return;`).
- [x] Aula 3: `copia.js#L86-L109` (da `lerArquivoDeCopia` até a conferência da versão e da lista).
- [x] Aula 4: `copia.js#L141-L158` (a `juntarCompromissos` inteira) e `copia.js#L114-L126` (o `Map` e o `forEach`).

**5. Conteúdo**
- [x] As explicações estão certas e batem com o código da Agenda:
  - a versão é conferida antes da lista;
  - no empate, fica o compromisso do navegador;
  - a lista só é trocada se a gravação der certo;
  - o `Map` é usado para os `id` repetidos;
  - o `File` é um `Blob` com nome;
  - o `change` não dispara quando a pessoa escolhe o mesmo arquivo de novo;
  - o `findIndex` devolve -1 (e o `find` devolve `undefined`).
- [x] **Nenhum exercício manda mexer no código da Agenda ou da Labs.** Todos os itens de "Para praticar" são "No exemplo, clique em **Editar**…", e as linhas citadas (aula 1: 8 e 12; aula 3: 14; aula 4: 3 e 6) são as certas.
- [x] Tamanho das aulas: de 485 a 604 palavras fora do código, `tempoLeitura` 6, até 3 itens em "Para praticar" e quiz nas 4 aulas.

### Observações (gravidade baixa, nenhuma impede a aprovação)

- **A. O aviso do Rodar na aula 2 conta errado.** O leitor de tela ouve "Exemplo executado. 2 linhas no console.", mas o Console mostra 3 linhas. O aviso sai quando a página do exemplo termina de carregar, e a linha "3." chega depois, por causa do `await`. Isso é uma limitação do componente Rodar da Labs (`js/aula-codigo.js`), não da aula, e esta é a primeira aula que usa `await` no exemplo. Se quiserem, dá para corrigir depois no componente.
- **B. Aula 2, "Para praticar", item 2 (apagar o `await`).** O Console da aula mostra `3. Texto lido: {}`, porque o Console da Labs transforma objetos em JSON e uma Promise vira `{}`. No console do navegador, apareceria `Promise {<pending>}`. A ordem também muda para 1, 3, 2. É um bom exercício, mas o `{}` pode confundir. Sugestão: uma dica curta, como "aparece `{}`: é a Promise, que o Console da aula mostra assim".
- **C. Aula 1, primeiro quiz.** A explicação diz "compare as linhas 9 e 10 do Console". As linhas 9 e 10 são do **código**; no Console, são as duas primeiras saídas. Sugestão: "compare as duas primeiras saídas do Console (linhas 9 e 10 do exemplo)".
- **D. Glossário.** "Blob" está traduzido como "bolha de dados (binary large object)". Funciona, mas "objeto binário grande" seria mais fiel. É questão de gosto.
- **Conferir à mão (João):** depois do commit da Labs, abrir uma aula no GitHub Pages e clicar num link fixo, para ver se ele abre o GitHub com as linhas destacadas.
