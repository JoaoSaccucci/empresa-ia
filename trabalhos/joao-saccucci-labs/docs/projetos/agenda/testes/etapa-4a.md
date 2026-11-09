# Relatório de teste — Agenda, Etapa 4 (Entrega 4a)

- **Data:** 2026-11-09
- **O que foi testado:** a página `index.html` da Agenda com o arquivo novo `js/frase.js` (`entenderFrase(frase, agora)`, `partesDoEntendi` e `linhaDoEntendi`) e as mudanças em `js/app.js`, `css/style.css` e `README.md`, ainda sem commit, comparados com o último commit da Entrega 3b. Testei contra a Agenda **US24** (campo "Criar por frase"), **US25** (data), **US26** (hora), **US27** (título) e **US28** (rascunho com a linha "Entendi"), as decisões D1 a D4, a tabela das 52 frases da 4a, as mudanças da Etapa 4 nas stories anteriores (US01, US02, US03, US16, US22 e US23), os requisitos gerais da Etapa 4 e a regra "Captura rápida (Etapa 4)" da seção 3 dos [requisitos](../requisitos.md). O visual foi comparado com a seção 16 do [design](../design.md) (decisões da 16.13, contrastes da 16.11 e conferência da 16.12). A 4b (US29 a US32) não faz parte desta entrega.
- **Onde:** Microsoft Edge 157 (Chromium) **headless**, com perfil próprio numa pasta temporária, controlado por script, numa cópia do site servida por um servidor local no endereço `/agenda/`. Fuso `America/Sao_Paulo` e relógio **parado** em quinta-feira, 12/11/2026, às 14:00 (o "agora" da tabela). Para a virada do ano, o relógio foi parado em 31/12/2026 às 23:30. Larguras: 320, 360, 400, 480, 640 e 1280px, nos dois temas e nas duas letras. Também testei alto contraste (cores forçadas), movimento reduzido e `localStorage` bloqueado e cheio. A lógica da frase foi conferida também em Node, com um script meu, sem usar os testes do dev. **Não testei:** celular de verdade, leitor de tela de verdade (NVDA ou Narrador) e o GitHub Pages (a 4a ainda não foi publicada).

## Resultado

**Aprovado com pendências.** Conferi as 52 frases da tabela e mais **91 frases minhas**, com o resultado esperado escrito a partir das regras da seção 3 (e não a partir do código): as 143 deram o resultado das regras, em Node e no formulário aberto no navegador. No navegador foram **1.355 conferências**, e nenhuma falhou: campo, teclado, foco, leitor de tela (árvore de acessibilidade), larguras, contraste, `localStorage` e uma regressão rápida das Entregas 2a a 3b. Nenhum critério de aceite falhou. Ficam só pendências de gravidade baixa: os 3 casos levantados pelo dev (são o que as regras mandam, e a decisão de mudar é do PO) e um ano de 4 dígitos estranho ("0050") que mostra o ano errado na linha "Entendi". Não corrigi nada no código.

## Verificações

| Área | Resultado | Observação |
|---|---|---|
| Celular a 360px | Passou | Sem rolagem horizontal e sem nada passando da tela a 320, 360, 400, 480, 640 e 1280px, nos 2 temas × 2 letras, com a página e com o formulário aberto pelas frases #1, #25, #41, #42 e uma frase longa com `<b>`. Abaixo de 480px o botão "Criar" fica embaixo do campo, na largura toda; a partir de 480px, ao lado. Campo com 48px de altura (60px com a letra grande) e botão com 48px ou mais; letra do campo 16px (20px com a letra grande). O exemplo "Ex.: dentista amanhã às 10h" cabe inteiro em todas as larguras pedidas; só a 320px com a letra grande o "h" final fica escondido, como o design (16.3) já previa (fora dos requisitos). A tira "Entendi" quebra linha dentro da janela, sem nada cortado. |
| Teclado | Passou | Ordem do Tab: "Seus dados" → "Novo compromisso" → "Tema claro" → "Letra grande" → **campo da frase** → **"Criar"**. Enter no campo, clique, Enter e Espaço no botão abrem o formulário com o foco no Título. Campo vazio ou só com espaços: nada abre e o foco fica (ou volta) no campo. Esc e "Cancelar" fecham sem salvar, a frase continua no campo e o foco volta para ele. "Salvar" (botão ou Enter no Título) limpa o campo e devolve o foco a ele. Contorno de foco de 3px no campo e no botão, nos dois temas e nas duas letras (`:focus-visible`). |
| Acessibilidade | Passou | Pela árvore de acessibilidade do navegador: o campo se chama "Criar por frase", com a descrição "Escreva o que é, o dia e a hora. Você confere antes de salvar."; o botão se chama "Criar". Aberta pela frase, a janela é "Novo compromisso" com a descrição "Entendi: Amanhã, 10:00, título 'Dentista'." (o "·" não entra; entram as vírgulas escondidas), seguida da dica ou do aviso quando aparecem. Aberta por "Novo compromisso", "Editar", "Remarcar" ou "Agendar", a janela não tem descrição e a tira fica escondida. Nenhum `aria-live` na tira. "Sem título": o Título tem `aria-invalid="true"` e a descrição "Digite um título.". Alto contraste: painel e tira com borda sólida, como a 16.10.2. Movimento reduzido: nada novo anima. |
| Contraste | Passou | Medi as cores calculadas pelo navegador, com os fundos compostos (inclusive o âmbar 8% da tira), nos dois temas. Menor valor de texto: 5.97 ("Entendi:" e a hora, no claro). Não-texto: borda do campo 4.14 no claro (mínimo 3). Tabela abaixo. |
| Erros | Passou | Console sem erros e sem avisos em todos os cenários, inclusive com `<script>alert(1)</script>`, `<img src=x onerror=alert(1)>`, emoji, só pontuação e 200 caracteres (nenhum `alert` rodou). Nenhum arquivo deu 404. Frases "venenosas" de 200 caracteres ("às às às…", "ter as 1 ter as 1…", "1/1 1/1…") são entendidas em menos de 1 ms. `localStorage` bloqueado e cheio: comportamento certo (abaixo). |

### Contrastes medidos

| Elemento | Escuro | Claro | Mínimo | Design (16.11) |
|---|---|---|---|---|
| Rótulo "Criar por frase" | 15.8 | 16.6 | 4.5 | 15.8 · 16.6 |
| Dica do campo | 8.2 | 7.7 | 4.5 | 8.2 · 7.7 |
| Texto digitado | 16.9 | 15.1 | 4.5 | 16.8 · 15.1 |
| Exemplo (`placeholder`) | 8.8 | 7.0 | 4.5 | 8.7 · 7.0 |
| Texto do botão "Criar" · no hover | 15.8 · 14.5 | 16.6 · 13.7 | 4.5 | 15.8 · 14.5 / 16.6 · 13.7 |
| "Entendi:" e a hora | 8.95 | 5.97 | 4.5 | 9.0 · 6.0 |
| Data, "Dia todo", título, "sem título", texto da nota | 13.7 | 14.8 | 4.5 | 13.7 · 14.8 |
| "Ainda sem data" / "data a escolher" | 7.8 | 6.7 | 4.5 | 7.8 · 6.7 |
| Separador "·" (enfeite) | 7.1 | 6.9 | — | 7.1 · 6.9 |
| Erro "Digite um título." já visível | 7.2 | 6.4 | 4.5 | 7.2 · 6.4 |
| Não-texto: borda do campo (contra o painel · contra o fundo do campo) | 4.7 · 5.1 | 4.5 · 4.1 | 3 | 4.6 · 4.9 / 4.5 · 4.1 |
| Não-texto: borda do botão | 4.6 | 4.5 | 3 | 4.6 · 4.5 |
| Não-texto: balão do rótulo · ícone de alerta da nota | 10.3 · 8.95 | 6.7 · 5.97 | 3 | 10.4 · 9.0 / 6.7 · 6.0 |

## Critérios de aceite

**Agenda US24: Campo "Criar por frase"**
- [x] O campo fica logo abaixo da barra "Aparência" e antes de `#faixas` (conferido no HTML e na posição na tela, nas 24 combinações de largura, tema e letra). Aparece com a lista vazia, com dados, com faixas e com o `localStorage` bloqueado (a faixa do problema vem logo abaixo dele). Não é fixo.
- [x] Rótulo visível "Criar por frase"; `type="text"`, `maxlength="200"` (digitar 250 caracteres deixa 200), `autocomplete="off"`; exemplo "Ex.: dentista amanhã às 10h" dentro do campo, e o rótulo continua visível.
- [x] A dica "Escreva o que é, o dia e a hora. Você confere antes de salvar." fica entre o rótulo e o campo, ligada por `aria-describedby="frase-dica"`.
- [x] O botão "Criar" fica ao lado do campo a partir de 480px e embaixo dele abaixo disso.
- [x] Clique, Enter e Espaço em "Criar" e Enter no campo abrem o formulário preenchido. Nada é salvo nesse momento.
- [x] Campo vazio ou só com espaços: Enter, clique, Enter e Espaço no botão não abrem nada, sem mensagem, e o foco fica no campo.
- [x] O formulário abre com o título "Novo compromisso". Salvar dá "Compromisso salvo." (amanhã), "Compromisso salvo em Anteriores." ("festa 10/11/2025") e "Anotado em Sem data." ("comprar pão").
- [x] Depois de Salvar (botão ou Enter no Título), o campo fica vazio e o foco volta para ele.
- [x] Depois de Cancelar ou Esc, nada é salvo, a frase continua no campo e o foco volta para ele.
- [x] `localStorage` cheio: "Não foi possível salvar o compromisso." aparece dentro do formulário, ele continua aberto e a frase continua no campo (também depois de Esc).
- [x] A frase aparece como texto: `<b>oi</b>`, `<script>alert(1)</script>` e `<img src=x onerror=alert(1)>` ficam com os sinais `<` e `>` no Título e na linha, sem criar elemento nenhum e sem rodar nada.
- [x] Abrir e cancelar não muda nenhuma chave do `localStorage` (comparei todas as chaves antes e depois das 64 frases abertas e fechadas com Esc, e do "Cancelar"), nem `agenda:ultima-mudanca`.
- [x] "Novo compromisso" continua igual: formulário vazio, data de hoje, sem a linha "Entendi", sem descrição na janela, e o foco volta para ele ao fechar.

**Agenda US25: Entender a data da frase**
- [x] "hoje", "amanhã", "depois de amanhã", dias da semana por extenso e abreviados (com e sem ponto, com e sem acento, em maiúsculas), "dia 15", "15/11" e "15/11/2027" (frases 1 a 24, 26 e minhas 91).
- [x] As palavras de ligação saem junto ("na sexta", "para o dia 20", "até sexta", "próxima sexta", "pra amanhã:").
- [x] Sempre a próxima no futuro, com a regra "passou": "aula quinta 15h" → hoje; "aula quinta 10h" → 19/11; "aula quinta 14h" → hoje às 14:00:59 e 19/11 às 14:01; "pagar luz dia 12 às 9h" → 12/12; "consulta 10/11" → 2027; "29/02" → 2028 (e 2032 com o "agora" em 01/03/2028).
- [x] "hoje", "amanhã", "depois de amanhã" e datas com ano usadas como estão ("plantão hoje meia-noite" → hoje às 00:00; "festa 10/11/2025" → 2025).
- [x] Data que não existe ("31/02", "15/13", "0/11", "29/02/2027"): Data vazia, "Ainda sem data" desmarcada, o texto fica no título e aparece "A data 31/02 não existe. Escolha uma data.". Salvar mostra "Escolha uma data." e põe o foco na Data.
- [x] "dia 32" e "dia 0" ficam no título, sem aviso.
- [x] Número sozinho não vira data ("aula 3 sexta" → "Aula 3").
- [x] Duas datas: vale a primeira ("amanhã hoje" → amanhã, título "Hoje"). Data inexistente seguida de uma válida: vale a válida, sem aviso ("festa 31/04 ou 10/12").
- [x] Hora sem data: hoje se não passou, amanhã se passou (D1: "reunião 16h" → hoje; "reunião 14h" → hoje; "plantão meia-noite" → amanhã). Sem data e sem hora: "Ainda sem data" marcada, com Data e Hora desativadas (US16) e a dica.
- [x] A análise fica numa função sem tela, `entenderFrase(frase, agora)` em `js/frase.js`, carregada depois de `js/datas.js`. Usei essa função no meu script de Node.

**Agenda US26: Entender a hora da frase**
- [x] "10h", "10H", "10h30", "10:30", "às 10", "as 10", "às 10h", "às 10 horas", "meio-dia", "meia-noite", "meia noite", "8 da noite", "7h30 da manhã", "8:15 da noite", "3 da tarde", "12 da tarde", "15h da tarde", "0h", "00:00".
- [x] As ligações "às", "as", "à", "a" e "ao" saem junto ("ao meio-dia", "à meia noite", "pagar a 10h").
- [x] Fora dos limites fica no título: "25h", "24:00", "10h75", "10:5".
- [x] Sem adivinhar: "aula às 3 com o João" → 03:00 (amanhã, pela D1).
- [x] "as" comum fica: "buscar as crianças", "buscar as 2 crianças", "jogo as 10 crianças". "às N" com palavra de ligação ou pedaço depois é hora ("às 10 amanhã", "às 10 no centro").
- [x] Número sozinho não vira hora ("comprar 2 pães amanhã", "reunião 10 horas amanhã").
- [x] Duas horas: vale a primeira ("reunião 9h 10h" → 09:00, título "Reunião 10h").
- [x] Sem hora: dia todo (Hora vazia).

**Agenda US27: O título é o que sobra da frase**
- [x] O título guarda acentos e maiúsculas como foram digitados ("DENTISTA", "Médico", "Rua 15").
- [x] "às", "no", "na", "dia" e "para" só saem quando são de um pedaço.
- [x] Pedaços não usados ficam como foram digitados ("Reunião ou sexta 11h", "Festa 31/02", "Reunião 25h").
- [x] Limpeza: espaços repetidos, espaço antes de pontuação, sinais e "e" solto das pontas ("reunião e amanhã e" → "Reunião"; "reunião – amanhã – 10h" → "Reunião"), corte em 100 caracteres sem espaço no fim, primeira letra maiúscula (emoji no começo fica como está).
- [x] "Dentista, amanhã, 10h." → "Dentista"; "DENTISTA amanhã" → "DENTISTA".
- [x] Título vazio ("amanhã 10h", "às 3", ",,, ;;"): erro "Digite um título." já visível, `aria-invalid="true"`, foco no Título; data e hora continuam preenchidas. Escrever um título e salvar funciona.

**Agenda US28: Rascunho no formulário com a linha "Entendi"**
- [x] Título, Data, Hora e "Ainda sem data" preenchidos; o resto como no "Novo compromisso". Desmarcar "Ainda sem data" reativa a Data (US16).
- [x] Linha logo abaixo do título da janela, na ordem data · hora · título, com "Hoje", "Amanhã", "Sáb, 14/11", "Seg, 15/11/2027", "Ainda sem data", "data a escolher", "Dia todo", "título '…'" e "sem título". Conferi a linha das 64 frases no navegador contra um montador meu, escrito pelas regras.
- [x] Exemplos dos requisitos idênticos, inclusive "Entendi: data a escolher · título 'Festa 31/02'".
- [x] Dica "Não encontrei data nem hora. Confira os campos." só quando não há nenhum pedaço de data e de hora ("comprar pão", "ter aula de inglês", "prova dia 32").
- [x] Aviso de data que não existe no mesmo lugar, sem a dica ("festa 31/02 20h" mostra "data a escolher · 20:00").
- [x] Linha, dica e aviso em texto, AA nos dois temas, quebrando linha a 320 e 360px sem rolagem.
- [x] Leitor de tela: a janela fica ligada à tira por `aria-describedby="entendi"` só quando aberta pela frase; o "·" tem `aria-hidden` e há vírgulas escondidas; sem `aria-live`.
- [x] Foco no Título (com ou sem o erro já visível, que é o primeiro campo com erro).
- [x] A linha não muda quando a pessoa corrige o Título e a Hora, nem depois de tentar salvar.
- [x] Em "Novo compromisso", "Editar", "Remarcar" e "Agendar" a linha não aparece e a janela não tem `aria-describedby`.

**Mudanças nas stories anteriores e requisitos gerais da Etapa 4**
- [x] US01: ordem da página Aparência, Criar por frase, faixas, Ficou pendente, Próximos 7 dias, Próximos compromissos, Sem data, Anteriores.
- [x] US02, US03, US16: conferidos acima.
- [x] US22 e US23: tema claro e letra grande cobrem o painel e a tira (prints abaixo).
- [x] 360px: campo e botão sem rolagem, letra de 16px, 44px de toque. Letra grande a 360px: sem rolagem e sem nada cortado.
- [x] Teclado: Tab chega ao campo logo depois de "Letra grande" e ao "Criar" logo depois.
- [x] "Entendi", "Ainda sem data", "Dia todo", "data a escolher", a dica e os avisos são texto.
- [x] Só JavaScript puro: `frase.js` não tem biblioteca nem `fetch`; nada vai para a internet.
- [x] Qualquer frase de até 200 caracteres abre sem demora e sem erro (pontuação, emoji, `<script>`).
- [x] Continua `versao: 2`, sem chave nova; só chaves `agenda:`; nenhum `localStorage.clear()`.

**Regressão rápida (Entregas 2a, 2b, 3a e 3b)**
- [x] "Novo compromisso" à mão com checklist ("RG") e duração de 1 h: salva, o card mostra "09:00 – 10:00" e a faixa da semana conta "Sáb 14: 1 compromisso".
- [x] "Editar" abre com os dados (sem a linha "Entendi"), salva com "Compromisso atualizado." e devolve o foco ao "Editar".
- [x] "Remarcar" de um item pendente (com "Era para:") e "Agendar" de um item sem data abrem sem a linha "Entendi".
- [x] "Tema claro" e "Letra grande" ligam, gravam em `agenda:preferencias` e continuam depois de recarregar.
- [x] "Seus dados": a cópia baixada tem o compromisso; importar a cópia com "Juntar" deixa os 2 compromissos, na `versao: 2`.
- [x] `localStorage` bloqueado: a página abre com a faixa do problema, a frase abre o formulário e salvar fecha e limpa o campo (só na memória).

Esta regressão é um roteiro curto. Não rodei de novo os roteiros completos das entregas anteriores (cerca de 530 conferências), porque a 4a só acrescenta código e não muda nenhuma função antiga, a não ser `abrirFormulario` e `salvarFormulario`, que estão cobertas acima.

## Os 3 casos levantados pelo dev

| Caso | O que acontece | Pelas regras | Gravidade |
|---|---|---|---|
| 1. "para ter aula" | Vira terça, 17/11, com o título "Aula". | **Conforme.** A D2 diz que "ter" conta como dia "logo depois de uma palavra de ligação de data", e "para" está na lista de ligações. O código faz exatamente o que a regra manda. Fica pior em "para ter aula amanhã": vale a primeira data (terça) e "amanhã" fica no título ("Aula amanhã"). A pessoa vê "Ter, 17/11" na linha "Entendi" antes de salvar. | Baixa. **Pendência para o PO**, não para o dev: aceitar só "na", "no", "nesta", "neste", "próxima" e "próximo" antes de "ter" e "dom", ou deixar como risco aceito, como a D4. |
| 2. "comprar vitamina E amanhã" | O título fica "Comprar vitamina", sem o "E". | **Conforme.** A limpeza tira "um 'e' solto" das pontas, e a regra 1 manda comparar sem diferença de maiúsculas. "plano E sexta" também vira "Plano". O título é visível na linha "Entendi" e no campo. | Baixa. Sugestão ao PO: só tirar o "e" que estava colado num pedaço que saiu ("reunião amanhã e" → "Reunião"), ou só o "e" minúsculo. |
| 3. "15/11/27" (ano com 2 dígitos) | Nada é entendido: o título fica "Festa 15/11/27", "Ainda sem data" marcada e a dica aparece. | **Conforme.** A tabela da seção 3 só aceita "/ano de 4 dígitos", e a regra 2 ("palavra inteira") impede ler só o "15/11" e deixar o "/27" sobrando. É o resultado mais seguro: nada some do título e a dica avisa. Um cuidado: "festa 15/11/27 20h" entende só a hora e vai para **hoje** às 20:00 (D1), sem a dica, porque uma hora foi entendida. A linha mostra "Hoje · 20:00 · título 'Festa 15/11/27'", então a pessoa vê. | Baixa. Pode virar evolução (aceitar "/AA" como 20AA). |

## Problemas encontrados

Nenhum problema de gravidade alta. Pendências:

**1. Ano de 4 dígitos começando com "00" mostra outro ano na linha "Entendi"** (status: pendente)
- **Página:** `index.html`, formulário aberto pela frase.
- **Passos:** escrever "festa 15/11/0050" no campo da frase e apertar Enter.
- **Esperado:** pela regra, "D/M/AAAA" é usada como está. A linha deveria mostrar a mesma data que o campo Data (ou a frase poderia ser tratada como data que não existe, a decidir).
- **Obtido:** o campo Data recebe `0050-11-15`, mas a linha mostra "Entendi: Qua, 15/11/1950 · Dia todo · título 'Festa'", porque o `textoParaData` de `datas.js` usa `new Date(ano, …)`, que troca os anos 0 a 99 por 1900 a 1999. Ao salvar, `dataValida` recusa a data e aparece "Escolha uma data.", então nada errado é gravado. Conferido no Node; o comportamento ao salvar foi conferido por leitura do código.
- **Gravidade:** baixa (ninguém escreve o ano 0050, e a data não é salva). Sugestão para o dev: no `dataEm` do `frase.js`, tratar ano menor que 1000 (ou fora de uma faixa, como 1900 a 2100) como data que não existe, com o aviso de sempre. Não corrigi porque é uma decisão de regra (qual faixa de anos aceitar), não um erro óbvio.

**2. Os 3 casos do dev** (status: pendente, decisão do PO): ver a tabela acima. Nenhum quebra critério de aceite.

### Observações (não são problemas)

- **A. Vírgulas com espaço antes na árvore de acessibilidade.** O Chrome monta a descrição da janela como "Entendi: Amanhã , 10:00 , título 'Dentista' ." (com espaço antes da vírgula e do ponto), porque as vírgulas escondidas (`.sr-only`, com `position: absolute`) contam como blocos separados. Na fala não muda nada: a vírgula continua dando a pausa e nenhum "ponto" do "·" é lido. Conferir com o NVDA ou o Narrador (abaixo).
- **B. Outros resultados que seguem as regras mas podem surpreender** (todos aparecem na linha "Entendi" antes de salvar): "pagar até a próxima sexta" → título "Pagar até a" (só uma palavra de ligação sai junto com a data); "show sábado às 9 e meia" → 09:00, título "Show e meia" ("e meia" não está na tabela de horas); "buscar as 2, depois mercado" → 02:00 (a vírgula depois de "as 2" confirma a hora); "comprar 1/2 kg de carne" → 01/02/2027 (risco aceito nos requisitos). Sugestões para o PO na 4b ou depois.
- **C. Exemplo a 320px com a letra grande.** O "h" final de "Ex.: dentista amanhã às 10h" fica escondido até a pessoa digitar, como o design 16.3 já tinha previsto. Os requisitos pedem 360px, e a 360px ele cabe inteiro.
- **D. O dev não mudou nenhuma regra antiga.** As funções de `datas.js` são só usadas pelo `frase.js`; as mudanças no `app.js` são o painel, `preencherRascunho`, `prepararEntendi`, `montarLinhaEntendi`, `criarPelaFrase` e três linhas em `abrirFormulario`, `salvarFormulario` e no `close` da janela.
- **E. README.md** do projeto: a nova funcionalidade, o uso de expressões regulares e o `frase.js` na estrutura de pastas estão descritos certos.

## Prints

![Painel "Criar por frase" no tema escuro a 360px: rótulo com o balãozinho âmbar, a dica em duas linhas, o campo com o exemplo "Ex.: dentista amanhã às 10h" inteiro e o botão de contorno "Criar" com a seta, embaixo do campo, na largura toda](img/etapa-4a-celular-360-escuro-painel.png)

![Formulário aberto por "dentista amanhã às 10h" a 360px no tema escuro: a tira "Entendi: Amanhã · 10:00 · título 'Dentista'" com a faixa âmbar à esquerda, logo abaixo de "Novo compromisso", e os campos Título "Dentista", Data 13/11/2026 e Hora 10:00 preenchidos, com o foco no Título](img/etapa-4a-celular-360-escuro-entendi.png)

![Tema claro com letra grande a 360px, frase "festa 31/02": a tira quebra em várias linhas com "Entendi: data a escolher · título 'Festa 31/02'" e, abaixo do tracejado, o ícone de alerta e "A data 31/02 não existe. Escolha uma data."; o Título "Festa 31/02" e a Data vazia (dd/mm/aaaa)](img/etapa-4a-celular-360-claro-grande-data-inexistente.png)

![Computador a 1280px no tema escuro, frase "comprar pão": "Entendi: Ainda sem data · título 'Comprar pão'" com "Ainda sem data" em lilás, a dica "Não encontrei data nem hora. Confira os campos.", a caixa "Ainda sem data" marcada e Data, Hora, Hora de fim e Tempo para sair desativados (tracejados)](img/etapa-4a-desktop-escuro-nada-entendido.png)

![Computador a 1280px no tema claro, frase "amanhã 10h": "Entendi: Amanhã · 10:00 · sem título" e o Título vazio com a borda vermelha e o erro "Digite um título." já visível, com o foco nele](img/etapa-4a-desktop-claro-sem-titulo.png)

## Como foi testado (o que foi de verdade e o que foi por leitura)

- **Lógica da frase (Node, script meu):** carreguei `js/datas.js` e `js/frase.js` num contexto isolado, com o fuso `America/Sao_Paulo`, e comparei `entenderFrase` e `linhaDoEntendi` com uma lista de resultados que escrevi a partir das regras da seção 3: as 52 frases da tabela e 91 frases minhas (acentos e maiúsculas, "as" comum, números no título, "Rua 15", "2 pães", "ter aula", "dom", "próxima/esta/nesta", "dia 31" em mês de 30 dias, "dia 30" depois de janeiro, 29/02 em vários anos, "15/11" já passado, virada de mês e de ano com o "agora" em 31/12 23:30, 15/04 e 31/01, a fronteira 14:00:59 / 14:01, "25h", "10h75", "10:5", "24:00", "meia-noite" com e sem data, "da manhã/tarde/noite" fora da tabela, frases longas, emoji, HTML, só pontuação e os 3 casos do dev). Resultado: 143 de 143 iguais às regras, todas em menos de 50 ms, e 10 frases "venenosas" de 200 caracteres em menos de 1 ms.
- **No navegador (Edge headless, por script):** as 52 frases da tabela e 12 minhas abertas pelo campo, conferindo os campos, a linha (texto visto e texto lido), a nota, o erro, o foco, o `aria-describedby`, Esc e o `localStorage`; a árvore de acessibilidade do campo, do botão e da janela; o campo vazio; Salvar, Cancelar e Esc; `localStorage` cheio e bloqueado; o Tab; o foco visível; 24 combinações de largura, tema e letra; o contraste; alto contraste e movimento reduzido; a regressão rápida; e 4 frases com o "agora" em 31/12/2026 23:30. Total: 1.355 conferências, nenhuma falha.
- **Por leitura do código:** o `diff` de `index.html`, `js/app.js`, `css/style.css` e `README.md`, e o `js/frase.js` inteiro. O caso do ano "0050" ao salvar.
- Os scripts ficaram na pasta temporária, fora do projeto. O Edge foi aberto com perfil próprio e fechado no fim (nenhum processo sobrou).

## Conferência manual (para o João)

1. No celular, escrever "dentista amanhã às 10h" e tocar em "Ir" no teclado: o formulário abre preenchido.
2. Com o NVDA ou o Narrador, abrir pela frase e ouvir "Novo compromisso, caixa de diálogo, Entendi: Amanhã, 10:00, título Dentista" **uma vez só**, sem "ponto". Depois abrir "Novo compromisso" e "Editar" e confirmar que a linha não é lida.
3. Escrever "festa 31/02", tocar em "Criar" e conferir o aviso dentro da tira.
