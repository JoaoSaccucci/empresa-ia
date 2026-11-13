# Relatório de teste — Agenda, Etapa 5 (Entrega 5, acabamento)

- **Data:** 2026-11-13
- **O que foi testado:** as mudanças da Entrega 5 da Agenda, ainda sem commit, comparadas com o último commit do repositório `agenda`. Os arquivos são `testes.html` e `js/testes-frase.js` (novos), `js/frase.js` (US33), `css/style.css` (seção "12h", US35) e `README.md` (linha "Testes" e o print), além de `readme/agenda-computador.png` (US37). Testei contra a Agenda **US33 a US37** e os **requisitos gerais da Etapa 5**, na seção "Etapa 5" dos [requisitos](../requisitos.md). O print da US37 foi conferido depois do primeiro teste, com a versão final. O visual foi comparado com a seção 18 do [design](../design.md).
- **Onde:** Microsoft Edge (Chromium) **headless**, com perfil próprio numa pasta temporária, controlado por script (playwright-core). O site foi servido por um servidor local que só lê a pasta `trabalhos/agenda` e foi aberto também direto do disco (`file://`). O fuso foi `America/Sao_Paulo`. Na página principal, o relógio ficou **parado** em quinta-feira, 12/11/2026, às 14:00 (o "agora" das tabelas). Usei a emulação de celular (tela de toque, escala 2) a 320 e 360px e o modo de computador a 1280px, nos 2 temas × 2 letras. A lógica foi conferida também em Node. **Não testei:** celular de verdade, leitor de tela de verdade e o GitHub Pages (a Entrega 5 ainda não foi publicada).

## Resultado

**Aprovado.** A `testes.html` dá **80 de 80** no servidor local e no `file://`. Os 80 esperados dela são iguais às tabelas da 4a e da 4b, conferidos um por um por um script meu que lê o `requisitos.md`. Numa cópia fora de `trabalhos/`, a página acusou as falhas que eu provoquei. As 80 frases e mais 4 da US33 deram o resultado das tabelas no formulário aberto, em 4 combinações de largura, tema e letra (336 aberturas, 0 falhas). "1 compromisso" ficou numa linha a 360px e "Sem hora de fim" ficou inteiro a 320px com a letra grande. O `#erro-salvar` apareceu inteiro, acima da barra, nos 16 casos. Nenhum critério de aceite falhou. Ficam só observações de gravidade baixa. O print da US37, feito depois, também passou em todos os critérios.

## Verificações

| Área | Resultado | Observação |
|---|---|---|
| Celular a 360px | Passou | Sem rolagem horizontal a 320, 360 e 1280px, nos 2 temas × 2 letras, com a página, com o formulário aberto pelas 84 frases e com a `testes.html` (com e sem falhas, com a lista "Passaram" aberta). Todos os controles têm 44px ou mais. A exceção é o link de texto "João Saccucci Labs" no rodapé, que não mudou nesta entrega. Medidas da US35 abaixo. |
| Teclado | Passou | Na `testes.html`, o Tab chega ao "Passaram (80)". Ele tem contorno azul de 3px e 44px de altura, e o Enter abre a lista. Na Agenda, o Esc logo depois de abrir pela frase devolveu o foco ao campo nas 336 aberturas, com a frase no campo. O Esc de "Novo compromisso", "Editar", "Remarcar" e "Agendar" devolve o foco ao botão que abriu. |
| Acessibilidade | Passou | A `testes.html` tem `lang="pt-BR"`, um `h1` "Testes da frase", um `h2` "Falhas" e um `h3` "Falhou: …" por falha. "Passou" e "Falhou" são texto, não só cor. A lista "Passaram" é um `details`/`summary`, que já anuncia o estado. Na Agenda, os nomes e a estrutura não mudaram nesta entrega. |
| Contraste | Passou | Na `testes.html`: texto 17.40, texto dentro do `code` 15.27, "Falhou" em vermelho 6.57 e contorno do foco 6.15 (calculado pelas cores do CSS). Na Agenda não entrou cor nova: a seção "12h" só muda medidas. O `#erro-salvar` usa as cores de sempre nos dois temas. |
| Erros | Passou | Console sem erros e sem avisos na `testes.html` (servidor e `file://`) e na Agenda, nos 12 cenários de medida, nas 336 aberturas e nos 16 testes de `localStorage` cheio. Nenhum 404. A `testes.html` pede só os 4 arquivos dela, nada da internet: no `index.html`, as fontes do Google continuam como antes. |

## Critérios de aceite

**Agenda US33: A pontuação fica quando o "e" de ligação sai**
- [x] Sai só a palavra "e". A vírgula, o ponto e vírgula e o traço ficam ("reunião amanhã 10h; e conversar" → "Reunião; conversar"; "… 10h – e conversar" → "Reunião – conversar").
- [x] "reunião amanhã 10h, e conversar" → "Reunião, conversar", em Node e no formulário (fecha a observação G do `etapa-4b.md`).
- [x] Continuam iguais: "reunião amanhã e, depois" → "Reunião, depois"; "reunião, e amanhã", "reunião e amanhã", "reunião amanhã e" e "reunião – e – amanhã" → "Reunião"; "comprar vitamina E amanhã" → "Comprar vitamina E"; "responder amanhã e-mail do chefe" → "Responder e-mail do chefe"; "festa na casa do João e amanhã 20h" → local "Casa do João" e título "Festa". Aceito a correção do texto do requisito feita pelo dev. A frase antiga, "na casa do João e amanhã 20h", começa com "na", e "no"/"na" no começo da frase não abrem local (US32). O exemplo certo é o da tabela de decisões do `etapa-4b.md`, que é a frase com "festa".
- [x] A mesma regra vale para o local e para os itens: "festa na casa do João, e amanhã 20h" → local "Casa do João"; "dentista levar RG; e amanhã 10h" → item "RG"; "dentista levar RG e cartão, e amanhã 10h" → itens "RG" e "cartão".
- [x] As 80 frases continuam iguais: 80 de 80 na `testes.html` e no formulário. Comparei também o `frase.js` antigo com o novo em 40.000 frases sorteadas (com "e", "E", pontuação, datas, horas, local e "levar"). Só 72 deram resultado diferente, e em todas a diferença é só a pontuação que agora fica. Nenhuma deu erro.

**Agenda US34: Esc logo depois de abrir pela frase**
- [x] **Conferência manual do João** em 2026-11-13, no site publicado. Ele recarregou a página antes de cada vez, abriu o formulário pela frase, fechou com Esc, abriu de novo e apertou Esc o mais rápido possível. Nas **5 vezes** o foco voltou para o campo "Criar por frase".
- [x] Esperado em todas: o foco volta, a frase fica e nada é salvo. Repeti o roteiro por script, 5 vezes com recarga: foco no campo, frase no campo, nenhum compromisso novo.
- [x] Não houve falha, então não entra problema para o dev.
- [x] **Observação F do `etapa-4b.md`: fechada como "corrida do teste automático", sem mudança no código.** Também não apareceu nas 336 aberturas desta rodada (Esc cerca de 70 ms depois de abrir).
- [x] O Esc de "Novo compromisso", "Editar", "Remarcar" e "Agendar" continua igual: o foco volta ao botão que abriu.

**Agenda US35: Letra grande e telas pequenas**
- [x] A 360px com a letra grande, nos dois temas, "1 compromisso" fica numa linha só (print abaixo). O espaço dos lados da plaquinha é 8px, também nos dias "Livre". "3 compromissos" quebra, como o design 15.8 permite. A 1280px e com a letra normal, o espaço continua 15px e 12px.
- [x] A 320px com a letra grande, a "Duração" mostra **"Sem hora de fim" inteiro**, sem "…", com a emulação de celular nos dois temas (print abaixo). A pedido do dev, medi o espaço: o `select` tem 208px, o espaço do texto tem **158px** e "Sem hora de fim" a 20px mede **155,2px**, então sobram ≈2,8px. Com o erro (`aria-invalid`, borda de 2px), o espaço continua 158px (9px e 37px de espaço interno). "30 min" (64px) e "Outro" (54px) cabem com folga. A seta fica a 8px da borda e o filete a 8px. A 360px nada mudou: 15px/55px, 169px de espaço para o texto. A folga é pequena, mas o critério é sobre o celular e lá passa. A janela estreita de computador com barra de rolagem (o caso do corte que o dev citou) não dá para reproduzir no Edge headless, porque nele a barra não ocupa espaço. Fica como observação A.
- [x] **`#erro-salvar`:** com o `localStorage` cheio, "Não foi possível salvar o compromisso." aparece inteiro e acima da barra Cancelar/Salvar. Conferi 16 casos: 320 × 568 e 360 × 640, letra normal e grande, os dois temas, formulário aberto por "Novo compromisso" e pela frase #22 da 4b. O ponto do meio do aviso é do próprio aviso (nada por cima). A base do aviso fica de 19 a 30px acima do topo da barra. Nenhuma correção foi necessária.
- [x] Sem rolagem horizontal, nada cortado e 44px de toque a 320, 360 e 1280px, nos 2 temas × 2 letras (a exceção é o link de texto do rodapé, que já existia).

**Agenda US36: Página de testes da frase (`testes.html`)**
- [x] `testes.html` na raiz e `js/testes-frase.js`, em HTML, CSS e JavaScript puros. Não tem biblioteca, `fetch`, Node nem build.
- [x] Carrega os mesmos `js/datas.js`, `js/armazenamento.js` (só pelas constantes do checklist) e `js/frase.js` do site, por caminho relativo. Não carrega o `app.js`. Funciona no servidor local e no `file://` (80 de 80 nos dois). No GitHub Pages ainda não foi publicada.
- [x] O "agora" fixo é `new Date(2026, 10, 12, 14, 0)`, passado para a `entenderFrase`.
- [x] Roda as 80 frases (52 + 28). A #27 da 4b é escrita por inteiro, de "a" a "v".
- [x] Confere cada coluna que tem valor na tabela, a linha "Entendi" (inteira, ou o trecho quando a tabela usa "…"), a dica e os avisos. A comparação é do texto exato. **Os esperados batem com as tabelas nos 80 casos:** um script meu lê as duas tabelas do `requisitos.md` e compara frase, título, data, hora, "Sem data", fim/duração, tempo para sair, local, o que levar, linha e avisos. Deu zero diferenças.
- [x] O que é só da tela fica de fora. "vazio", "vazia" e "desativado" contam como sem valor.
- [x] Os esperados estão escritos na própria página (`CASOS_4A` e `CASOS_4B`).
- [x] Resumo logo abaixo do `h1`: "80 de 80 frases passaram.". Na cópia com falhas: "77 de 80 frases passaram. 3 falharam.".
- [x] A lista das falhas vem logo abaixo. Sem falhas, aparece "Nenhuma falha.". As que passaram ficam recolhidas em "Passaram (80)".
- [x] Se a `entenderFrase` dá erro numa frase, a página não para. Na cópia, forcei um erro na 4a #8, que apareceu como "Erro: erro de propósito", e as outras 79 continuaram.
- [x] Não lê nem grava o `localStorage`. Contei as chamadas a `getItem`, `setItem`, `removeItem`, `clear` e `key` ao abrir a página: foram **zero**. As 4 chaves que eu tinha gravado antes (3 da `agenda:` e 1 de fora) ficaram iguais, com os mesmos valores. Nada é enviado para a internet: só 5 pedidos, todos ao servidor local.
- [x] Não aparece para quem usa o site: o `index.html` não cita `testes`, e a página tem `<meta name="robots" content="noindex">`.
- [x] `lang="pt-BR"`, `h1` "Testes da frase", sem rolagem horizontal a 360px (as frases quebram), contraste AA, console sem erros e nenhum 404. O CSS é o da 18.4, igual, num `<style>` próprio, e tem o favicon.
- [x] Com o `frase.js` da Etapa 5 dá 80 de 80. **A página acusa falha:** numa cópia fora de `trabalhos/`, troquei o título esperado da 4a #1 para "Dentistx" e o fim e o tempo para sair da 4b #22. A página mostrou "Falhou: 4a #1" com "Título / Esperado: Dentistx / Obtido: Dentista". Mostrou também "Falhou: 4b #22" com "Fim / Duração / Esperado: 10:00 / 2 h / Obtido: 10:00 / 1 h" e "Tempo para sair / Esperado: 45 min / Obtido: 30 min" (print abaixo).

**Agenda US37: Imagem da Agenda no README** (conferida depois do print, 2026-11-13)
- [x] O README mostra o print logo depois da descrição curta e do link do site, antes da linha "Testes".
- [x] O arquivo é `readme/agenda-computador.png`, numa pasta só dele, com caminho relativo (`readme/agenda-computador.png`), então aparece no GitHub. O `index.html`, o `style.css` e os `js/` não citam `readme` nem a imagem.
- [x] Só dados fictícios: "Reunião do TCC" (Biblioteca, sala 3), "Aula de Estrutura de Dados" (Bloco B), "Pagar a mensalidade da faculdade", "Dentista" (Clínica Sorriso) e a frase "almoço com a turma sábado 12h na cantina". Não aparece nome de pessoa, telefone nem endereço real. Só a página, sem abas, favoritos, barra de endereço ou cursor. O PNG não tem metadados de texto (só os blocos IHDR, IDAT e IEND).
- [x] Mostra o campo "Criar por frase", a faixa "Próximos 7 dias" (dias com compromisso e dias "Livre") e a lista com compromissos de mais de um dia ("Hoje" e "Amanhã"). Também aparecem o tema escuro, a letra normal, nenhum aviso flutuante, nenhuma faixa de lembrete e o "Ver exemplos" fechado, como pede a 18.6.
- [x] O texto alternativo em português descreve a tela: "Agenda no tema escuro: campo Criar por frase com uma frase digitada, faixa dos próximos 7 dias e compromissos agrupados por dia, …".
- [x] Tamanho: PNG de 1280 × 1424 e **195 KB** (199.799 bytes), abaixo dos 500 KB.
- [x] Feita com a versão final: aparecem a faixa com 8px dos lados e o resto igual ao site testado.
- [x] O README continua legível e com a linha "Testes", curta e com o endereço. A árvore de pastas ganhou `testes.html` e `readme/agenda-computador.png`.

**Requisitos gerais da Etapa 5**
- [x] Regressão: 80 de 80 no formulário aberto e na `testes.html`.
- [x] Os dados continuam na `versao: 2`, sem chave nova. Depois das 336 aberturas, o `localStorage` só tinha as chaves `agenda:` que eu mesmo gravei. O código novo não usa `localStorage.clear()`.
- [x] Só HTML, CSS e JavaScript puros. Nada é enviado para a internet.
- [x] Nenhum dado pessoal nos casos de teste, no README nem na imagem (só dados fictícios e sem metadados).

## Problemas encontrados

Nenhum problema encontrado.

### Observações (gravidade baixa, não impedem a aprovação)

- **A. Folga pequena da "Duração" a 320px com a letra grande.** Na emulação de celular, "Sem hora de fim" cabe com ≈2,8px de folga (155,2px de texto para 158px de espaço). Uma fonte de sistema um pouco mais larga, ou uma janela estreita de computador com barra de rolagem que ocupa espaço (caso citado pelo dev), ainda pode mostrar "…". A US35 fala do celular, e lá passa. Se o João vir "…" num celular de verdade, a artista pode tirar mais 2 ou 3px do espaço da direita.
- **B. Pontuação repetida que a US33 deixa ficar.** A regra manda manter a pontuação dos dois lados do "e". Por isso "reunião e, amanhã 10h, e conversar" vira "Reunião,, conversar", e "no centro 15/11 - - - e levar -" vira "No centro - - - levar". Está certo pela regra, porque a limpeza de sempre não junta sinais repetidos. A pessoa vê isso na linha "Entendi" antes de salvar. Se o PO quiser, numa etapa futura a limpeza pode juntar sinais repetidos.
- **C. A `testes.html` só confere a dica e os avisos quando a tabela os cita.** Numa frase em que a tabela não fala de aviso, um aviso a mais não seria acusado. A US36 pede exatamente isso ("quando 'O que mais conferir' traz…"), então está certo. Fica só como sugestão para o futuro.
- **D. Altura do print.** O design 18.6 pedia uma área de 1280 × 1100. O print tem 1280 × 1424 e mostra também os dois cards de "Amanhã" por inteiro. Fica abaixo de 500 KB e mostra tudo o que a US37 pede, então só fica registrado.

## Prints

![Página testes.html a 360px: título "Testes da frase", resumo "80 de 80 frases passaram.", a linha do agora fixo, "Falhas" com "Nenhuma falha." e o botão "Passaram (80)" com o contorno azul de foco, aberto, com as frases 4a #1 a #13 em fonte mono](img/etapa-5-celular-360-testes.png)

![Cópia da testes.html fora de trabalhos/, com esperados trocados de propósito: "77 de 80 frases passaram. 3 falharam." e as falhas "4a #1" (Título: esperado Dentistx, obtido Dentista), "4a #8" (Erro: erro de propósito) e "4b #22" (Fim / Duração e Tempo para sair, com esperado e obtido)](img/etapa-5-celular-360-testes-falhas-copia.png)

![Faixa "Próximos 7 dias" a 360px no tema escuro com letra grande: Hoje com "2 compromissos" na linha toda, Amanhã e Ter 17 com "1 compromisso" numa linha só, Dom 15 com "3" em cima de "compromissos" (quebra permitida) e os dias Livre](img/etapa-5-celular-360-escuro-grande-semana.png)

![Lista Duração a 320px no tema claro com letra grande: "Sem hora de fim" inteiro, sem reticências, e a seta perto da borda direita](img/etapa-5-celular-320-claro-grande-duracao.png)

## Como foi testado

- **Esperados × tabelas (Node, script meu):** li as tabelas "Frases de teste da Entrega 4a" e "da 4b" direto do `requisitos.md` e comparei com `CASOS_4A` e `CASOS_4B` do `testes-frase.js`, campo por campo. Resultado: 52 + 28 linhas, 0 diferenças.
- **`testes.html` no navegador:** abri pelo servidor local (com emulação de celular a 360px) e pelo `file://`. Conferi resumo, listas, título, `lang`, `noindex`, scripts carregados, pedidos de rede, 404, console, rolagem, Tab e Enter no "Passaram". Gravei 4 chaves no `localStorage` antes de abrir e contei as chamadas ao `localStorage` durante a abertura.
- **Falha provocada:** fiz uma cópia de `testes.html`, `favicon.svg` e `js/` na pasta temporária. Troquei 3 esperados (4a #1 e 4b #22) e pus um erro forçado na 4a #8.
- **US33 (Node):** testei as frases do critério, mais 12 com local, itens e pontuação, e comparei o `frase.js` antigo com o novo em 40.000 frases sorteadas.
- **Regressão no formulário:** abri as 80 frases e mais 4 da US33 pelo campo, a 360 escuro/normal, 320 claro/grande, 1280 claro/normal e 360 escuro/grande. Conferi título, data, hora, "Ainda sem data", "Termina às" e Duração, tempo para sair, local, itens, linha "Entendi", dica e avisos. Fechei com Esc, conferindo o foco e a frase. Também conferi a rolagem, o console, o 404 e as chaves do `localStorage`.
- **US35:** fiz 12 combinações (320/360/1280 × 2 temas × 2 letras) com emulação de celular, e de novo em modo computador. Medi a faixa da semana (espaço interno, linhas e altura), o `select` da Duração (largura, espaço interno, seta, filete e a largura de cada opção, com e sem erro) e os controles abaixo de 44px. Para o `#erro-salvar`, foram 16 casos com o `localStorage` cheio.
- **US34:** registrei a conferência manual do João. Repeti o roteiro por script e testei o Esc dos outros 4 jeitos de abrir o formulário.
- Os scripts e as cópias ficaram na pasta temporária, fora do projeto. O Edge rodou com perfil próprio e foi fechado no fim, junto com os servidores (nenhum processo sobrou). Não mexi no código da Agenda e não fiz commit.

## Aulas do Módulo 7 — 2026-11-13

- **O que foi testado:** as 3 aulas novas da Agenda na Labs (`aulas/agenda/modulo-7/aula-01.md` a `aula-03.md`) e as mudanças nestes arquivos:
  - `data/aulas.json`: módulo `agenda-m7` e 3 aulas;
  - `data/glossario.json`: 3 termos novos (teste automático, caso de teste e teste de regressão);
  - `data/projetos.json`: trabalho do professor do Módulo 7 e linha do tempo da Agenda;
  - `README.md` da raiz: 46 aulas.

  O teste foi feito antes do commit da Labs, do mesmo jeito que o das aulas dos Módulos 5 e 6 (relatórios `etapa-4a.md` e `etapa-4b.md`). Segui o guia `docs/guias/aulas.md` e a regra do João de que nenhum exercício manda mexer no código de um projeto. **Não corrigi nada nas aulas**: só descrevo os problemas e a correção sugerida.
- **Onde:** no Edge headless, com perfil temporário, controlado por script. O site da Labs foi servido por um servidor local, com marked e highlight.js carregados pelo CDN. Testei a 1280px, 360px e 320px, nos temas escuro e claro ("papel"). Comparei os links fixos com o repositório local da Agenda no commit `749b39d6fdfce6ae6bdd836e9e796f9ad065706b` (sem nenhuma mudança) e com o `etapa-5.md` do commit `73e7f17` do empresa-ia (`73e7f1767315a8f0a36d5467338d79cd4de64b3d`). Os dois commits estão em `origin/main`.

### Resultado

**Reprovado.** Volta para o professor por **dois** problemas de gravidade média, com correções pequenas:
- na aula 7.2, os dois exemplos ficam sem o quadro "Linha por linha", porque cada lista tem um item `**Saída:**`, que não é um `**Ln:**` (problema 1);
- os 4 links para o `etapa-5.md` abrem o relatório renderizado, sem destacar a linha citada, e usam o hash curto (problema 2).

Todo o resto passou:
- os 6 exemplos rodam e o Console mostra o que o texto diz, linha por linha, com o anúncio certo;
- os 9 quizzes funcionam, e a resposta marcada como certa está certa;
- os 18 links fixos apontam para trechos que mostram o que o texto diz;
- o glossário abre o balão certo em todos os termos;
- os exercícios só mexem no exemplo da aba Aulas.

### Verificações

| Área | Resultado | Observação |
|---|---|---|
| Celular a 360px e 320px | Passou | Sem rolagem horizontal nas 3 aulas (antes e depois de Rodar os 6 exemplos), em `aulas.html#agenda-m7` e em `detalhe-projeto.html?id=agenda`. Os blocos de código, inclusive o bloco `text` da aula 7.2, terminam dentro da tela e rolam por dentro. |
| Teclado | Passou | O Tab passa por Rodar, Editar, os termos do glossário, os links fixos, as alternativas do quiz e o checklist, com foco visível em todos. Cada balão abre com Enter e fecha com Esc, e o foco fica no termo. O quiz responde com Enter, e o "Tentar de novo" funciona com Espaço. (O roteiro acusou de novo o "foco sem contorno" no `body` no fim do Tab, que é a observação A antiga.) |
| Acessibilidade | Passou | Os componentes são os mesmos da Labs. O aviso do Rodar conta certo ("4", "5", "3", "2", "3" e "3 linhas no console"). Depois de responder, as alternativas ficam com `aria-disabled="true"`, e todas as explicações aparecem. O título da aba segue o padrão (`Aula 7.1 · Caso, esperado e obtido: um teste conferido campo a campo \| João Saccucci Labs`). O sumário tem as 5 seções de cada aula. |
| Contraste | Passou | Medido nas cores calculadas, nos dois temas (escuro / claro): termo do glossário 16,7 / 15,3; código no texto 15,6 / 13,9; texto 7,9 / 6,7; rótulo do Linha por linha 14,8 / 5,3 (aulas 7.1 e 7.3). Tudo acima de 4,5. |
| Erros | Passou | Sem erro no console nas 3 aulas, em `aulas.html`, no detalhe da Agenda, em 3 aulas de amostra (a primeira e a última da Labs e a 6.1 da Agenda) e com um id que não existe (`agenda-m7-aula-09` mostra "Aula não encontrada." e "Ver todas as aulas"). O único 404 foi o `/favicon.ico`, que o navegador pede na raiz do servidor de teste. Os 4 JSON de `data/` são válidos. |
| Caracteres invisíveis | Passou | Conferi os 3 `.md` caractere por caractere: nenhum de U+0300 a U+036F, U+200B a U+200F, U+202A a U+202E, U+2060, U+FEFF nem espaço sem quebra (U+00A0). Nenhum `\r`. |

### Conferências

**1. `aulas.html`, progresso e vitrine**
- [x] No botão "Agenda" aparece o "Módulo 7 — Etapa 5: testes automáticos", logo depois do Módulo 6. Ele tem as 3 aulas (7.1 a 7.3, `tempoLeitura` 6, 6 e 7) e os links `aula.html?id=agenda-m7-aula-01` a `-03`. São 27 cards da Agenda e 19 da Labs.
- [x] Progresso: no começo, aparecem "Agenda, 0 de 27 concluídas", "0 de 4 concluídas" nos Módulos 1 a 6 e "0 de 3 concluídas" no Módulo 7. Depois de marcar a 7.1 e a 7.3 como concluídas, aparecem "Agenda, 2 de 27 concluídas" e, no Módulo 7, "2 de 3 concluídas". Os outros módulos continuam em 0, e a Labs em 0 de 19.
- [x] O `aulas.html#agenda-m7` mostra o módulo na tela a 1280px, 360px e 320px.
- [x] O `detalhe-projeto.html?id=agenda` (a 1280px e a 360px) mostra o trabalho do professor ("Etapa 5: 3 aulas curtas sobre testes automáticos…", com "Aulas — Agenda, Módulo 7" → `aulas.html#agenda-m7` e o Glossário), a linha nova da linha do tempo ("3 aulas sobre testes automáticos, com exemplo Rodar e quiz, no Módulo 7 da Agenda.") e os links dos Módulos 1 a 6. Clicando no link do Módulo 7 e depois no card 7.3, a aula 7.3 abre.
- [x] README da raiz: 46 aulas está certo (19 da Labs e 27 da Agenda).

**2. Cada aula em `aula.html`**
- [x] Têm Em resumo (2 linhas), Erro comum, Dica "Para ir além (opcional)" e Em entrevista.
- [x] O glossário funciona com todos os termos, e nenhum `[[` ou `]]` sobra no texto. Os únicos `[[` das páginas 7.2 e 7.3 estão dentro do código (`[[100, 4, 25], …` e `[["pão e leite", …`), que é JavaScript de verdade. Termos de cada aula:
  - aula 1: teste automático, caso de teste, referência, JSON.stringify, includes;
  - aula 2: try, catch, throw, textContent, XSS;
  - aula 3: teste de regressão.
  - Os 3 termos novos mostram a explicação certa e não repetem nenhum termo antigo, nem ignorando maiúsculas. `try`, `catch`, `throw`, `referência`, `includes` e `XSS` já existiam, cada um uma vez só, e mostram a explicação certa. O único par repetido continua sendo `map`/`Map`, que estas aulas não usam.
- [x] O código aparece colorido. Há 6 exemplos com Rodar (2 em cada aula), com 15, 6, 14, 10, 9 e 10 linhas. Todos têm até 15 linhas e não dependem do código da Agenda.
- [ ] **Linha por linha ligado a cada exemplo**: passou nas aulas 7.1 e 7.3 e falhou nos 2 exemplos da 7.2 (problema 1). Os números citados estão certos nas 3 aulas:
  - 7.1: L1–4, 5–8, 10, 11–12, 13, 14, 15 e L1, 2–3, 4, 5, 6;
  - 7.2: L1–4, 5, 8–11, 12, 14 e L2–5, 6–10;
  - 7.3: L1–3, 5, 6, 7, 8, 9 e L1–2, 3–7, 8, 9, 10.
- [x] O Rodar mostra o que o texto diz, linha por linha (igual no Node):
  - 7.1 (exemplo 1): `caso 1 quantidade ok`, `caso 1 itens ok`, `caso 2 itens ok` e `caso 3 quantidade FALHOU, obtido 3`;
  - 7.1 (exemplo 2): `false`, `true`, `["RG","exames"]`, `true` e `false`;
  - 7.2 (exemplo 1): `caso 2: Erro: ninguém para dividir`, `caso 3: esperado 21, obtido 20` e `1 de 3 passaram.`;
  - 7.2 (exemplo 2): `A` e `parou em: erro de propósito`;
  - 7.3 (exemplo 1): `copiado do código: passou`, `tirado da regra: falhou` e `obtido: 3`;
  - 7.3 (exemplo 2): `v1: 3 de 4 falhou 'reunião, e conversar' -> 'reunião conversar'`, `v2: 4 de 4` e `v3: 3 de 4 falhou 'ala E norte' -> 'ala norte'`. A linha do v2 sai com um espaço invisível no fim (`"v2: 4 de 4 "`), porque o segundo argumento do `console.log` é um texto vazio (observação C).
- [x] Editar abre o código num campo de texto, o código editado roda, e Restaurar volta ao original (nos 6 exemplos).
- [x] Quizzes: 3 em cada aula, todos com 3 alternativas. Cada um tem **exatamente uma certa**, a B em todos.
  - Testei cada quiz duas vezes, em páginas limpas: clique na certa ("Certa!") e Enter numa errada ("Errada. A resposta certa é a B."). Nos dois casos, todas as explicações aparecem e o quiz trava. O "Tentar de novo" limpa a resposta.
  - Conferi as respostas certas:
    - `["RG"] === ["RG"]` dá `false`; o caso 2 não tem `quantidade`, e o `if` da L12 pula esse campo; o "obtido" é o que a função devolveu;
    - o try em volta do laço inteiro para no "b" e o "C" não aparece; a mensagem fica em `erro.message`; o catch vazio esconde o erro;
    - o esperado vem da regra; regressão é rodar de novo o que já passava; a troca para "Dentistx" foi para ver a página acusar a falha (`etapa-5.md`, linha 57).

**3. Navegação**
- [x] A 6.4 agora leva à 7.1, a 7.1 volta para a 6.4, e a 7.3 não tem "próxima".

**4. Links fixos** (18 links: 14 para a Agenda com o hash completo `749b39d6fdfce6ae6bdd836e9e796f9ad065706b` e 4 para o `etapa-5.md` com o hash curto `73e7f17`. Nenhum usa `/blob/main/`.)
- [x] Aula 1:
  - `testes-frase.js#L32-L49`: o comentário com o formato de cada caso ("Cada caso só tem as colunas que a tabela preenche");
  - `#L51-L104`: a `CASOS_4A`, com as 52 frases;
  - `#L109-L138`: a `CASOS_4B`, com as 28 frases;
  - `#L230-L235`: a `bate`, com `JSON.stringify` dos dois lados e o `includes` da `linhaContem` (linha 233);
  - `#L237-L256`: a `rodarCaso`, com `if (!(chave in caso)) return;` (linha 250);
  - `#L196-L215`: a `valoresObtidos`, com `data: dataDaTabela(r.data)` (linha 204).
- [x] Aula 2:
  - `testes-frase.js#L237-L246`: o comentário do `try/catch` e o `return [{ nome: "Erro", erro: "Erro: " + erro.message }]`;
  - `#L314-L337`: a `rodarTodos`, com `passaram + " de " + todos.length + " frases passaram."`;
  - `#L287-L306`: a `mostrarFalha`, com "Esperado" e "Obtido" lado a lado;
  - `#L259-L262`: o comentário "sempre com textContent, nunca HTML: a frase #50 da 4a tem "<b>"";
  - `#L264-L271`: a `valorParaTexto`, que mostra `null`, `""` e `[]` como "(vazio)";
  - `etapa-5.md#L53`: o texto está certo ("forcei um erro na 4a #8, que apareceu como "Erro: erro de propósito", e as outras 79 continuaram"), mas o link não mostra a linha (problema 2).
  - O "Rodando os testes..." citado no conceito é mesmo o texto inicial da `testes.html` (linha 46).
- [x] Aula 3:
  - `testes-frase.js#L7-L9`: "Os ESPERADOS abaixo foram copiados das tabelas dos requisitos, nunca do que o código devolve. Quando uma tabela mudar, esta lista muda junto, no mesmo commit.";
  - `#L20-L22`: a `AGORA_FIXO` (quinta, 12/11/2026, 14:00);
  - `frase.js#L583-L598`: o comentário da US33 (com "reunião amanhã 10h, e conversar" → "Reunião, conversar"), as regex `E_NO_COMECO` e `E_NO_FIM` e as funções `tirarENoComeco` e `tirarENoFim`. Conferi no Node com a `entenderFrase` desse commit: a frase dá mesmo o título "Reunião, conversar";
  - `etapa-5.md#L28` (2 vezes): "80 de 80", as 40.000 frases sorteadas e as 72 diferentes, só na pontuação. O texto está certo, mas o link não mostra a linha (problema 2);
  - `etapa-5.md#L57`: "Esperado: Dentistx / Obtido: Dentista". O texto está certo, mas o link não mostra a linha (problema 2).

**5. Conteúdo**
- [x] As afirmações batem com o código da Agenda no commit `749b39d` e com o relatório da Etapa 5. Por exemplo: 52 + 28 = 80 casos; a data obtida é convertida de "AAAA-MM-DD" para "DD/MM/AAAA" antes de comparar; cada caso tem o seu próprio `try`, porque a `rodarCaso` é chamada uma vez por frase.
- [x] **Nenhum exercício manda mexer no código da Agenda ou da Labs.** Todos os itens de "Para praticar" (3 por aula) mexem no exemplo da aba Aulas. "Conserte a função" (7.1) e "conserte a `contarItens`" (7.3) falam da função do próprio exemplo. Rodei cada um no editor do próprio exemplo:
  - 7.1: o caso `" RG "` passa (`caso 4 itens ok`); com o `.filter`, o caso 3 passa (`caso 3 quantidade ok`); `["RG","exames"]` contra `["exames","RG"]` dá `false`;
  - 7.2: com `return null`, sai `2 de 3 passaram.` e o caso 3 continua falhando; com `[50, 2, 25]` no meio, ele roda depois do erro (`2 de 4 passaram.`); com o `try` dentro do `forEach`, aparecem `A`, a mensagem do erro e `C`;
  - 7.3: com o `filter`, as duas linhas passam e o obtido vira `2`; com `"e-mail e senha"`, as 3 versões passam esse caso (v1 4 de 5, v2 5 de 5 e v3 4 de 5); com `"pão  leite"`, as 3 versões acusam a falha.
- [x] Tamanho: de cerca de 800 a 950 palavras fora do código; `tempoLeitura` de 6 ou 7; 3 itens em "Para praticar" em cada aula; quiz nas 3 aulas.

### Problemas encontrados

**1. Aula 7.2: os dois exemplos ficam sem o quadro "Linha por linha"** (gravidade: **média**; status: pendente, volta para o professor)
- **Onde:** `aula-02.md`, linha 52 (`- **Saída:** …`, na lista do exemplo 1) e linha 70 (`- **Saída:** …`, na lista do exemplo 2).
- **Passos:** abrir `aula.html?id=agenda-m7-aula-02` e olhar logo abaixo dos dois blocos "Rodar".
- **Esperado:** cada exemplo com o quadro "Linha por linha" ligado ao código, como nas aulas 7.1 e 7.3 e em todas as aulas dos Módulos 3 a 6. O guia (`docs/guias/aulas.md`, linha 78) pede uma lista só com itens `- **L3:**` ou `- **L3–5:**`.
- **Obtido:** as duas listas aparecem como listas comuns, soltas abaixo do código. O `js/aula-codigo.js` (`pareceListaDeLinhas`) só monta o quadro quando **todos** os itens começam com `**Ln:**`, e o item `**Saída:**` não segue esse padrão. O texto continua legível, mas o leitor perde o "Linha por linha" ligado ao exemplo.
- **Correção sugerida:** levar a saída para dentro de um item `**Ln:**` ou para um parágrafo logo depois da lista. Por exemplo:
  - exemplo 1: "- **L14:** o resumo. A saída é `caso 2: Erro: …`, `caso 3: esperado 21, obtido 20` e `1 de 3 passaram.`. O caso 3 rodou mesmo depois do erro do caso 2.";
  - exemplo 2: "- **L6–10:** o `try` está em volta do laço **inteiro**. A saída é `A` e `parou em: erro de propósito`. O "c" nunca foi testado…".

**2. Os 4 links para o `etapa-5.md` não mostram a linha citada e usam o hash curto** (gravidade: **média**; status: pendente)
- **Onde:** `aula-02.md`, o link "etapa-5.md, linha 53"; `aula-03.md`, os 2 links "etapa-5.md, linha 28" e o link "etapa-5.md, linha 57".
- **Passos:** abrir um desses links (por exemplo, `…/empresa-ia/blob/73e7f17/…/etapa-5.md#L53`).
- **Esperado:** o GitHub abre o arquivo com a linha citada destacada, como nos links de código.
- **Obtido:** para um `.md`, o GitHub mostra o relatório **renderizado**, onde as âncoras `#L53`, `#L28` e `#L57` não existem. A página abre no topo, sem destaque, e o João precisa procurar a frase. Além disso, os 4 links usam o hash curto `73e7f17`, e não o hash completo que o guia pede para link fixo (`docs/guias/aulas.md`, linha 41). A única aula anterior que cita um `.md` já usa o formato certo: `…/blob/5d279156ab0888640bb9e9c0a2ac8111fd84a9ab/…/requisitos.md?plain=1#L1013`.
- **Correção sugerida:** usar o hash completo e o `?plain=1` antes da âncora nos 4 links: `https://github.com/JoaoSaccucci/empresa-ia/blob/73e7f1767315a8f0a36d5467338d79cd4de64b3d/trabalhos/joao-saccucci-labs/docs/projetos/agenda/testes/etapa-5.md?plain=1#L53` (e o mesmo com `#L28` e `#L57`). As linhas 28, 53 e 57 desse commit mostram o que o texto diz.

### Observações (gravidade baixa, nenhuma impede a aprovação depois da correção dos problemas 1 e 2)

- **A. Foco no `body` no fim do Tab.** É o mesmo comportamento antigo das aulas dos Módulos 3 a 6, e não é destas aulas.
- **B. Glossário `map`/`Map` no `js/aula.js`.** Continua pendente para uma etapa da Labs. Estas aulas não usam `[[map]]`.
- **C. Espaço no fim da linha do v2 (aula 7.3, exemplo 2).** O `console.log(nome + …, falhas…join("; "))` recebe um texto vazio como segundo argumento quando não há falhas, e a linha sai `"v2: 4 de 4 "`. Na tela não se vê a diferença, e o texto da aula (`v2: 4 de 4`) está certo para o leitor. Se quiser evitar, dá para juntar os dois pedaços num texto só. Fica só como registro.
- **Conferir à mão (João):** depois do commit da Labs, abrir a aula 7.1 no GitHub Pages e clicar num link fixo (por exemplo, `testes-frase.js#L230-L235`), para ver se o GitHub abre com as linhas destacadas.

### Como foi testado

- **No navegador (Edge headless, por script):** 171 conferências automáticas, um roteiro curto de progresso e uma sonda das 3 páginas. As 8 falhas do roteiro foram conferidas uma por uma:
  - 3 vezes "foco sem contorno" em `modo-foco`: é o `body` depois que o Tab passa do fim da página (observação A);
  - "console de `aulas.html` com 404": era o `/favicon.ico`;
  - "4 aulas do Módulo 7": o roteiro veio do Módulo 6 e esperava 4 cards; o módulo tem 3, com os links certos;
  - "sobrou `[[`" nas aulas 7.2 e 7.3: eram os `[[` dentro do código. Fora dos blocos de código, não sobra nenhum;
  - "Linha por linha ligado a cada exemplo" na 7.2: é o **problema 1**.

  Rodei os exercícios de "Para praticar" no editor do próprio exemplo e respondi cada quiz em páginas limpas, uma vez com clique na certa e outra com Enter numa errada.
- **Em Node:** rodei os 6 exemplos fora do site, e a saída foi igual à do Rodar. Rodei a `entenderFrase` do commit `749b39d` com a frase da US33. Contei as palavras, procurei os `[[termos]]` de cada aula no `glossario.json` e conferi os caracteres dos 3 `.md`.
- **Só por leitura:** a conferência do conteúdo com o `testes-frase.js`, o `frase.js` e a `testes.html` do commit `749b39d` e com o `etapa-5.md` do commit `73e7f17`.
- Os scripts ficaram na pasta temporária, fora do projeto. Nenhum navegador headless nem servidor de teste ficou aberto no fim. Não mexi nas aulas, nos JSON nem no código da Agenda, e não fiz commit.

### Rodada 2 — 2026-11-13

- **O que foi testado de novo:** as correções do professor para os 2 problemas da rodada 1. Rodei de novo o roteiro inteiro das 3 aulas, com as mesmas 171 conferências. Ele está igual ao da rodada 1, só com os 4 links novos do `etapa-5.md`.

**Resultado: Aprovado com pendências.** Os 2 problemas foram corrigidos, e nada mais quebrou. Ficam só as observações A, B e C da rodada 1, todas de gravidade baixa. A C (o espaço no fim da linha do v2) ficou como está, por decisão do professor.

- [x] **Problema 1 (média): corrigido.**
  - Na `aula-02.md`, a saída do exemplo 1 agora está dentro do item **L14** (linha 51), e a do exemplo 2 dentro do item **L6–10** (linha 68).
  - Na página, os dois exemplos da 7.2 têm o quadro "Linha por linha", com 5 e 2 itens: "Linhas 1 a 4", "Linha 5", "Linhas 8 a 11", "Linha 12" e "Linha 14", e "Linhas 2 a 5" e "Linhas 6 a 10".
  - As saídas citadas no texto continuam iguais às do Rodar.
- [x] **Problema 2 (média): corrigido.**
  - Os 4 links agora são `https://github.com/JoaoSaccucci/empresa-ia/blob/73e7f1767315a8f0a36d5467338d79cd4de64b3d/trabalhos/joao-saccucci-labs/docs/projetos/agenda/testes/etapa-5.md?plain=1#L…`: `#L53` na aula 7.2 e `#L28` (2 vezes) e `#L57` na aula 7.3.
  - Têm o hash completo do commit `73e7f17`, que está em `origin/main`. O `?plain=1` faz o GitHub abrir o texto cru, com a linha destacada.
  - As linhas 28, 53 e 57 desse commit continuam mostrando o que o texto diz.
  - O roteiro conferiu os 18 links das 3 aulas.
- **O que não mudou:** os 6 exemplos dão a mesma saída e o mesmo anúncio da rodada 1, no navegador e no Node. Os 9 quizzes, os balões do glossário, os exercícios de "Para praticar", a rolagem a 360px e 320px, o teclado, o contraste nos dois temas, o console, o progresso ("2 de 27") e a vitrine continuam passando. Os 3 `.md` continuam sem caracteres invisíveis.
- **As 7 falhas do roteiro** são do próprio roteiro, já explicadas na rodada 1:
  - 3 vezes o `body` no fim do Tab;
  - o `/favicon.ico`;
  - os "4 cards" esperados por um roteiro que veio do Módulo 6 (o módulo tem 3);
  - os `[[` dentro do código das aulas 7.2 e 7.3.

  A falha "Linha por linha" da 7.2 sumiu.
- **Conferir à mão (João):** depois do commit da Labs, clicar num dos links do `etapa-5.md` e ver se a linha aparece destacada.
- **Como foi testado:** no Edge headless, por script, e em Node para os exemplos e os caracteres. Os scripts ficaram na pasta temporária, nenhum navegador headless nem servidor ficou aberto, não mexi nas aulas e não fiz commit.
