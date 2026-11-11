# Relatório de teste — Agenda, Etapa 4 (Entrega 4b)

- **Data:** 2026-11-11
- **O que foi testado:** a página `index.html` da Agenda com as mudanças da Entrega 4b, ainda sem commit, comparadas com o commit da Entrega 4a (`48ba5de`): `js/frase.js` (intervalo, duração, "sair ... antes", "levar ...", local com "no"/"na" e as correções da 4a), `js/app.js` (preenchimento do formulário, erros já visíveis ao abrir, tira "Entendi" com as partes novas e a nota dos 20 itens), `index.html` ("Ver exemplos" e `#entendi-nota-itens`), `css/style.css` (seção 12g) e `README.md`. Testei contra a Agenda **US29** (hora de fim), **US30** (tempo para sair), **US31** ("levar" vira o checklist, com o ajuste "3 itens + e mais N itens"), **US32** (local), a tabela das **28 frases da 4b**, a tabela das **52 frases da 4a** de novo, o bloco "Correções da Entrega 4a que entram na 4b", as mudanças da Etapa 4 nas stories anteriores (US03, US12, US17 e US19), os requisitos gerais da Etapa 4 e a "Captura rápida (Etapa 4)" da seção 3 dos [requisitos](../requisitos.md). O visual foi comparado com a seção 17 do [design](../design.md), com a opção A nas 4 decisões da 17.11 e o roteiro da 17.10.
- **Onde:** Microsoft Edge 157 (Chromium) **headless**, com perfil próprio numa pasta temporária, controlado por script, numa **cópia** do site servida por um servidor local fora de `trabalhos/`. Fuso `America/Sao_Paulo` e relógio **parado** em quinta-feira, 12/11/2026, às 14:00 (o "agora" das tabelas). Larguras 320, 360 e 1280px, nos dois temas e nas duas letras. Também testei alto contraste (cores forçadas), movimento reduzido e `localStorage` bloqueado e cheio. A lógica da frase foi conferida também em Node, com um script meu, com os resultados esperados escritos a partir das regras (o script do dev só foi rodado como apoio: 120 de 120). **Não testei:** celular de verdade, leitor de tela de verdade (NVDA ou Narrador) e o GitHub Pages (a 4b ainda não foi publicada).

## Resultado

**Aprovado com pendências.** As 28 frases da 4b, as 52 da 4a e **146 frases minhas** (226 no total) deram o resultado das regras, em Node e no formulário aberto no navegador. No navegador foram **3.295 conferências**: campos preenchidos, erros já visíveis, foco, tira "Entendi" (texto visto e texto lido), notas, "Ver exemplos", teclado, árvore de acessibilidade, larguras, contraste, `localStorage`, Salvar/Cancelar e uma regressão rápida. As 4 que falharam são do meu roteiro, não da Agenda (explico em "Como foi testado"). Nenhum critério de aceite falhou. Ficam pendências de gravidade **baixa**: os marcadores da lista "Ver exemplos" não aparecem (problema 1) e quatro casos de regra em que a decisão é do PO (problemas 2 a 5, ligados às decisões 1, 2, 5 e 6 do dev). Não corrigi nada no código.

## Verificações

| Área | Resultado | Observação |
|---|---|---|
| Celular a 360px | Passou | Sem rolagem horizontal e nada saindo da janela a 320, 360 e 1280px, nos 2 temas × 2 letras, com a página (com "Ver exemplos" aberto) e com o formulário aberto pelas frases #5, #8, #12, #15, #21, #22, #23 e #27, por "levar" com 5 itens e por um local e um item compridos. "até 10:00", "duração 90 min", "sair 30 min antes" e "e mais 17 itens" nunca se partem a 360px. A 320px com a letra grande, "sair 780 min antes" (183px) não cabe na linha da tira (179px) e quebra: é o caso que o design 17.3.1 já previa (abaixo de 360px), sem rolagem. Altura da tira a 360px com a letra grande: 178px (#15), 208px (#22), 277px (#27), dentro das contas da 17.3.5. "Ver exemplos" com 44px de altura. |
| Teclado | Passou | Ordem do Tab: "Seus dados" → "Novo compromisso" → "Tema claro" → "Letra grande" → campo da frase → "Criar" → **"Ver exemplos"**. Enter e Espaço no "Ver exemplos" abrem e fecham a lista e **não** abrem o formulário; a seta gira. Contorno de foco de 3px no "Ver exemplos". Aberto pela frase, o foco vai para o primeiro campo com erro, na ordem Título → Termina às → Duração → Minutos (duração) → Minutos antes (#5 → "Termina às", #8 → Duração, #12 → "Minutos antes", "por 0 min" → Minutos da duração, "amanhã 23h por 2h sair 800 min antes" → Título). Esc e "Cancelar" fecham sem salvar, a frase fica e o foco volta ao campo. Salvar limpa o campo e devolve o foco a ele. |
| Acessibilidade | Passou | Pela árvore de acessibilidade: aberta pela #22, a janela é "Novo compromisso" com a descrição "Entendi: Amanhã, 09:00, até 10:00, sair 30 min antes, local 'Centro', levar 'RG', título 'Dentista'." (sem "ponto"). A #27 lê "… levar 'a', 'b', 'c' e mais 17 itens, título 'Mudança'. A lista 'O que levar' aceita até 20 itens. Os outros ficaram de fora." A #5 lê a tira e o "Termina às" tem `aria-invalid="true"` e a descrição "A hora de fim precisa ser depois da hora de início.". O `#itens-aviso` continua **vazio** ao abrir pela frase (também 500 ms depois, com #15 e #27): nada de "RG adicionado." por item; ao usar "Adicionar" à mão, o aviso continua funcionando. Sem `aria-live` na tira. "Ver exemplos" é um `summary` com o estado "recolhido"/"expandido" (`expanded=false/true`). Movimento reduzido: a transição da seta cai para 0,01 ms. Alto contraste: a tira e a nota dos 20 itens aparecem. |
| Contraste | Passou | Medi as cores calculadas pelo navegador, com os fundos compostos, nos dois temas. Menor valor de texto: 5.97 (valores de tempo em âmbar no tema claro). Tabela abaixo. |
| Erros | Passou | Console sem erros e sem avisos em todos os cenários, inclusive com `<script>`, `<img onerror>` e `<svg onload>` no título, no local e nos itens (nenhum `alert` rodou e nenhum elemento foi criado), emoji e 9 frases "venenosas" de 200 caracteres ("das 1 às das 1 às…", "levar a, levar a, …", "na na na…", "no levar na levar…"). Em Node, as venenosas levam menos de 0,4 ms. Nenhum arquivo deu 404. `localStorage` bloqueado e cheio: comportamento certo (abaixo). |

### Contrastes medidos

| Elemento | Escuro | Claro | Mínimo | Design (17.9) |
|---|---|---|---|---|
| "até", "duração", "sair", "antes", "local", "levar", aspas, local e itens | 13.68 | 14.76 | 4.5 | 13.7 · 14.8 |
| Tempos em mono âmbar ("10:00", "90 min", "30 min", "780 min") | 8.95 | 5.97 | 4.5 | 9.0 · 6.0 |
| "e mais 17 itens" | 7.11 | 6.87 | 4.5 | 7.1 · 6.9 |
| Nota dos 20 itens (texto · ícone) | 13.68 · 8.95 | 14.76 · 5.97 | 4.5 · 3 | 13.7 · 9.0 / 14.8 · 6.0 |
| "Ver exemplos" e a seta | 8.99 | 7.50 | 4.5 | ≈8.6 · 7.5 |
| Exemplos da lista | 15.79 | 16.59 | 4.5 | 15.8 · 16.6 |
| Erros já visíveis (Termina às, Duração, Minutos, Minutos antes) | 7.24 | 6.42 | 4.5 | iguais à 2.1 e à 15.13 |

## Critérios de aceite

**Agenda US29: Hora de fim pela frase**
- [x] Intervalo: "das 10h às 11h", "das 10 às 11", "das 10h30 às 12h", "das 9h até 10h", "das 9 até as 10" (também "até às 10" e em maiúsculas sem acento) e "das 2 às 4 da tarde". Os números dentro do intervalo são horas mesmo sem "h".
- [x] Duração: "por 1h", "por 1h30", "por 1 hora", "por 2 horas", "por 45 min", "por 90 minutos", "por meia hora" e "durante 3 horas".
- [x] Intervalo: Hora com o primeiro horário, "Termina às" com o segundo e a Duração ajustada ("1 h", "2 h", "30 min" ou "Outro" com os minutos: "das 10 às 11h30" → "Outro" 90). Hora sozinha antes do intervalo: vale ela e o intervalo fica no título ("reunião amanhã 9h das 10h às 11h" → título "Reunião das 10h às 11h"). Sem data, a D1 usa o primeiro horário ("treino das 9h às 10h" → amanhã; "reunião das 14h às 15h" → hoje; "das 22h às 23h" às 22:01 de 31/12 → 01/01/2027).
- [x] "da tarde" depois do segundo horário vale para o primeiro quando ele é menor ou igual ("das 2 às 4 da tarde" → 14:00–16:00; "das 1 às 3 da tarde" → 13:00–15:00) e não vale quando é maior ("das 11 às 1 da tarde" → 11:00–13:00; "das 12 às 2 da tarde" → 12:00–14:00).
- [x] Duração com hora: 30, 60 e 120 marcam a opção; outro valor marca "Outro" com o número; "Termina às" calculado ("7h por 1h30" → 08:30).
- [x] Duração sem hora fica no título e os números dela não viram hora ("estudar amanhã por 2 horas" → "Estudar por 2 horas"; "reunião por 10h" → "Reunião por 10h", sem hora).
- [x] Intervalo e duração: vale o primeiro ("reunião amanhã 10h por 1h das 14h às 15h" → duração 60 e o intervalo no título; "reunião amanhã das 10h às 11h por 2 horas" → intervalo e "Por 2 horas" no título).
- [x] Limites: "das 22h às 2h" → Hora 22:00, "Termina às" 02:00, Duração "Sem hora de fim" e o erro de fim já visível; "22h por 3 horas" → "Outro" 180, "Termina às" vazio e o erro da meia-noite já visível; "por 0 min" e "por 24 horas" (1440) → "Outro", o número e "Digite um número de minutos entre 1 e 1439." já visível. "23h por 59 min" entra (23:59) e "23h por 1h" dá o erro da meia-noite.
- [x] A tira ganha "até 11:00" ou "duração 90 min" logo depois da hora, também com erro ("até 02:00", "duração 180 min", "duração 0 min").

**Agenda US30: Tempo para sair pela frase**
- [x] "sair 30 min antes", "sair 30 minutos antes", "sair 1h antes", "sair 1 hora antes", "sair 1h30 antes", "sair meia hora antes" (e "sair 45 minutos antes", "sair 2 horas antes").
- [x] 15, 30, 45 e 60 marcam a plaquinha; outro valor marca "Outro" com o número em "Minutos antes" (40, 90, 120, 720).
- [x] Sem hora, o pedaço fica no título e o grupo continua desativado ("dentista amanhã sair 30 min antes"). O "1h30" de "sair 1h30 antes" não vira hora.
- [x] Fora de 1 a 720 ("sair 13h antes" = 780, "sair 0 min antes", "sair 721 minutos antes"): "Outro", o número e "Digite um número de minutos entre 1 e 720." já visível, com o foco em "Minutos antes".
- [x] Com dois, vale o primeiro ("… sair 30 min antes sair 15 min antes" → 30, o outro no título).
- [x] A tira mostra sempre em minutos ("sair 90 min antes", "sair 780 min antes").

**Agenda US31: "levar ..." vira o checklist**
- [x] "levar RG", "levar RG e cartão", "levar RG, pedido médico e cartão do convênio" (e com ponto e vírgula).
- [x] Os itens vão até o próximo pedaço reconhecido (data, hora, intervalo, duração, "sair", local) ou até o fim ("levar RG amanhã 10h" → "RG"; "levar caderno na escola" → "caderno"; "levar refri e salgado às 20h" → 2 itens). Um pedaço reconhecido mas não usado também fecha a lista ("dentista amanhã levar RG sair 30 min antes", sem hora → item "RG" e "sair…" no título).
- [x] Item limpo, com as letras como foram digitadas, cortado em 60 caracteres; item vazio ignorado ("RG, , cartão" → 2 itens; "levar ,, ; ," → "levar" fica no título); itens iguais permitidos ("RG, RG").
- [x] Até 20 itens; com 21 ou 22, entram 20 e aparece a nota "A lista 'O que levar' aceita até 20 itens. Os outros ficaram de fora.". Com exatamente 20, sem nota. A nota aparece junto com a dica "Não encontrei data nem hora…" ("comprar pão levar a, …, v"), nesta ordem.
- [x] "levar" no começo fica no título ("Levar o carro na oficina amanhã", "LEVAR documentos sábado", "  levar RG amanhã" com espaços antes). "levar" sem nada depois fica no título ("Mudança levar").
- [x] Só o primeiro "levar" conta ("levar RG levar cartão" → um item "RG levar cartão"). Funciona sem data e sem hora ("comprar pão levar sacola").
- [x] Os itens aparecem na lista com "Remover", dá para remover e acrescentar; com 20, "Novo item" e "Adicionar" ficam desativados com a dica "Limite de 20 itens.". Salvos com `feito: false`. "Cancelar" descarta tudo.
- [x] Tira: até 4 itens, todos; com 5 ou mais, os 3 primeiros e "e mais N itens" ("levar 'RG', 'cartão', 'exames' e mais 2 itens"; #27 "… e mais 17 itens"). A contagem usa os itens que entraram (20).

**Agenda US32: Local com "no" ou "na"**
- [x] "na clínica Sorriso", "no centro", "na casa da vó".
- [x] O local vai até o próximo pedaço ("almoço na casa da vó sábado meio-dia" → "Casa da vó"; "consulta no hospital às 9 amanhã" → "Hospital").
- [x] "no"/"na" de uma data são da data ("reunião na sexta 15h"; "show no estádio no dia 15" → local "Estádio"; "na próxima segunda na sala 2" → "Sala 2").
- [x] "no"/"na" no começo ficam no título ("Na casa da vó"); só o primeiro conta ("Casa na praia", "Escritório no 3º andar").
- [x] Local limpo, com a primeira letra maiúscula, cortado em 100 caracteres ("NA CLÍNICA" → "CLÍNICA"; "Escritório, sala 3").
- [x] "reunião na" fica no título; "nossa" não é "no" (palavra inteira).
- [x] Risco aceito (D4): "pensar na vida amanhã" → local "Vida".
- [x] A tira ganha "local 'Clínica Sorriso'".

**Correções da Entrega 4a que entram na 4b**
- [x] "para ter aula" não vira terça (título "Para ter aula", com a dica); "pra dom" e "até dom" também não. "na/no/nesta/neste/próxima/próximo" + "ter"/"dom" continuam valendo, e "ter"/"dom" com hora logo depois também ("para dom 10h missa", "academia ter das 9 às 10").
- [x] "comprar vitamina E amanhã" → "Comprar vitamina E"; "plano E sexta" → "Plano E". (Mas veja os problemas 2 e 3: o critério tem um efeito colateral.)
- [x] "15/11/27" → 15/11/2027 (também "dia 15/11/27" e "festa 15/11/27 20h"); "31/02/27" e "29/02/27" dão o aviso de data que não existe; "29/02/28" existe.
- [x] "15/11/0050" e "15/11/0999" viram data que não existe, com o aviso "A data 15/11/0050 não existe. Escolha uma data." e a tira "data a escolher" (antes mostrava 1950).

**Mudanças nas stories anteriores e requisitos gerais da Etapa 4**
- [x] US03: erros da US12 e da US19 já visíveis ao abrir, com `aria-invalid`, e o foco no primeiro campo com erro. "Escolha uma data." continua só ao salvar ("festa 31/02 das 20h às 22h"). Salvar com valor inválido não grava e põe o foco no campo do erro; corrigir o campo esconde o erro.
- [x] US12, US17, US19: os campos vêm preenchidos como se fosse à mão e continuam editáveis (mudar "Termina às" para 11:00 na #22 ajusta a Duração para "2 h"; "Remover" funciona).
- [x] A linha não muda quando a pessoa corrige os campos.
- [x] 360px, letra grande, dois temas: sem rolagem horizontal e sem nada cortado no painel e na tira.
- [x] Teclado: Tab chega ao campo da frase depois de "Letra grande" e ao "Criar" logo depois; "Ver exemplos" vem depois do "Criar".
- [x] Leitor de tela: a tira é lida uma vez, sem "·"; o checklist não é anunciado item por item.
- [x] Contraste AA nos dois temas.
- [x] Tudo é texto ("até", "duração", "sair", "local", "levar", "e mais N itens", a nota).
- [x] Só JavaScript puro: nada de biblioteca, `fetch` ou rede no `frase.js`.
- [x] Frases de até 200 caracteres abrem sem demora e sem erro no console.
- [x] Continua `versao: 2`, sem chave nova, só chaves `agenda:`. Abrir e cancelar as 106 frases não muda nenhuma chave.

**Design, seção 17 (roteiro 17.10)**
- [x] Tira com as partes na ordem data · hora · fim · sair · local · levar · título; tempos em mono âmbar; local e itens em 600 na cor do texto; "e mais N itens" em texto suave.
- [x] Nota dos 20 itens em `#entendi-nota-itens`, depois da nota da 4a, ligada e desligada em toda abertura: "Novo compromisso" e "Editar" depois da #27 não mostram nenhuma nota.
- [x] Campos sem destaque novo (decisão 3) e erro só no campo (decisão 4): a tira mostra "até 02:00" normal.
- [x] "Ver exemplos" recolhido, começa fechado, abre e fecha com Enter, Espaço e clique, sem abrir o formulário. **Os 5 exemplos, copiados para o campo, preenchem o que prometem** (local; intervalo 14:00–15:30 com "Outro" 90; duração "1 h" com fim 08:00; "dia 20 9h" com "Outro" 40; 2 itens).
- [ ] Lista dos exemplos com marcadores lilás e recuo (17.7 e 17.8): não aparecem (problema 1, baixa).

**Regressão rápida (Entregas 2a a 4a)**
- [x] Tabela da 4a: as 52 frases dão o mesmo resultado, com as mesmas linhas.
- [x] "Novo compromisso" à mão com Duração "1 h", "Sair" 30 min e item "RG": "RG adicionado." é anunciado; salva e o card mostra "09:00 – 10:00", "Sair às 08:30" e "O que levar (0 de 1)"; a faixa da semana conta sábado.
- [x] Salvar a #22 grava `duracaoMin: 60`, `antecedenciaMin: 30`, `local: "Centro"` e `itens: [{ texto: "RG", feito: false }]`; o card mostra "Sair às 08:30" e o checklist.
- [x] "Editar" e "Agendar" abrem sem a tira e sem descrição; "Agendar" põe o foco na Data.
- [x] "Tema claro" e "Letra grande" continuam depois de recarregar.
- [x] `localStorage` bloqueado: a frase abre preenchida e salvar fecha e limpa o campo (só na memória). `localStorage` cheio: "Não foi possível salvar o compromisso." dentro do formulário, que continua aberto com os 3 itens, e a frase continua no campo.

## As 8 decisões do dev

| # | Decisão | Avaliação | Precisa do PO? |
|---|---|---|---|
| 1 | "e" solto só sai quando é a única coisa entre dois pedaços ou entre um pedaço e a ponta ("reunião e amanhã" → "Reunião e") | **Aceitável como solução provisória.** O critério da correção ("só é tirado um 'e' colado a um pedaço reconhecido") se contradiz com o próprio exemplo: em "vitamina E amanhã" o "E" também está colado em "amanhã". A regra do dev é a única que cumpre o exemplo, mas muda um resultado da 4a: "reunião e amanhã e" dava "Reunião" e agora dá "Reunião e" (problema 2). A US27 e a "Limpeza" da seção 3 continuam dizendo "saem do começo e do fim … um 'e' solto". | **Sim.** O PO escolhe a regra e atualiza a US27 e a seção 3. |
| 2 | Separador de itens só "e"/"E", nunca "é"; "levar vitamina E" vira "vitamina" | "é" nunca separar: **aceitável** (ninguém separa itens com "é"; "levar o que é meu" fica um item só). "E" maiúsculo separar: o "E" **some** de tudo (não fica no item nem no título), o contrário do que a correção da 4a quis para o título (problema 3). | **Sim**, junto com a 1. |
| 3 | "levar"/"no"/"na" no começo contam só no começo literal da frase | **Aceitável.** É a leitura literal da US31/US32. "amanhã levar RG" e "10h levar RG" viram item com "sem título", mas o erro "Digite um título." já aparece e a pessoa vê. Espaços antes contam como começo ("  levar RG amanhã" → título). | Não (só registrar). |
| 4 | Intervalo + duração: se a hora veio do intervalo, a duração fica no título | **Aceitável.** Quando o intervalo vem primeiro, é o que a US29 manda ("vale o primeiro"). Quando a duração vem antes ("por 2h das 10h às 11h"), a regra ao pé da letra daria a duração, mas o intervalo é um pedaço só (hora e fim); usar a hora dele e jogar fora o "às 11h" faria algo sumir sem a pessoa ver. A escolha do dev deixa "Por 2h" no título, visível. | Só registrar no requisito. |
| 5 | "das 2 da noite às 4" não é intervalo; "das 1 às 2 da noite" = 01:00–02:00 com "da noite" no título | A segunda parte é **aceitável** e segue a tabela ("da …" fora da tabela não é entendido; vale o que a tabela reconhece sem ele). A primeira é **inconsistente** com a segunda: o resultado é Hora **04:00** (pelo "às 4" no fim) e o título "Festa das 2 da noite" (problema 5). Pela mesma regra, o esperado seria 02:00–04:00 com "da noite" no título. | **Sim** (baixa). |
| 6 | Local terminando em "e" colado a pedaço: o "e" sai | **Aceitável** em "festa na casa do João e amanhã 20h" → "Casa do João". Mas é a mesma família da 1 e da 2: "consulta na ala E amanhã 9h" → local "Ala", e o "E" some (problema 3). | **Sim**, junto com a 1. |
| 7 | "às 10 levar RG": "levar" confirma a hora | **Aceitável.** A regra da palavra seguinte aceita "outro pedaço reconhecido", e a seção 3 (regra 5) lista o "levar" como um tipo de pedaço. Também dá o resultado que a pessoa espera. | Não (só registrar). |
| 8 | Dica "Não encontrei data nem hora": intervalo conta como hora; duração e "sair" sozinhos não | **Aceitável.** Bate com a US29 ("o intervalo conta como o pedaço de hora"), com a regra "sem nenhum pedaço de data e de hora" e com as frases #9, #13 e #23 da tabela. | Não. |

## Problemas encontrados

Nenhum problema de gravidade alta. Pendências:

**1. "Ver exemplos": a lista aparece sem os marcadores e sem o recuo do design** (gravidade: baixa; status: pendente)
- **Página:** `index.html`, painel "Criar por frase".
- **Passos:** abrir a página a 360px e apertar "Ver exemplos".
- **Esperado:** pela 17.7 e pela 17.8, cada exemplo com um marcador (bolinha lilás, `li::marker`) e a lista recuada (`padding-left: var(--esp-5)`, `list-style: disc`).
- **Obtido:** os 5 exemplos ficam colados à esquerda, sem marcador (`list-style-type: none` e `padding-left: 0px` calculados). O reset antigo `ul[class] { list-style: none; padding: 0; }` (linha 155 do CSS) é mais específico (0,1,1) do que `.frase-exemplos-lista` (0,1,0) e ganha. Com os exemplos compridos quebrando em 2 linhas a 320px com a letra grande, fica mais difícil ver onde um termina e o outro começa. O texto continua legível, e a lista continua sendo uma lista para o leitor de tela no Chrome e no Edge (no Safari, uma lista com `list-style: none` pode perder o papel de lista).
- **Correção sugerida:** trocar o seletor por `ul.frase-exemplos-lista` (ou `.frase .frase-exemplos-lista`). O erro já vem do CSS de referência do design (17.8.1), então vale a artista corrigir lá também.

**2. "e" antes de um pedaço agora fica no título** (gravidade: baixa; status: pendente, decisão do PO)
- **Página:** formulário aberto pela frase.
- **Passos:** escrever "reunião e amanhã" (ou "reunião e amanhã e") e apertar Enter.
- **Esperado:** pela correção da 4a ("só é tirado um 'e' colado a um pedaço reconhecido"), o "e" colado em "amanhã" sairia: "Reunião". Pela mesma frase do critério, o "E" de "vitamina E amanhã" também sairia, o que o próprio critério proíbe.
- **Obtido:** "Reunião e" nas duas frases (na 4a, "reunião e amanhã e" dava "Reunião"). A tira mostra "título 'Reunião e'" antes de salvar.
- **Correção sugerida (para o PO):** escolher a regra e escrever na US27 e na "Limpeza" da seção 3. Opções: (a) manter a regra do dev; (b) tirar o "e" colado num pedaço só quando ele é **minúsculo** ("reunião e amanhã" → "Reunião"; "vitamina E amanhã" → "Vitamina E"), o que cumpre os dois exemplos.

**3. "E" maiúsculo some do item e do local** (gravidade: baixa; status: pendente, decisão do PO)
- **Página:** formulário aberto pela frase.
- **Passos:** escrever "dentista amanhã 10h levar vitamina E" e, depois, "consulta na ala E amanhã 9h".
- **Esperado:** nada some sem a pessoa ver ("Só sai do título o que virou campo"); na 4b o João aprovou manter o "E" de "vitamina E" no título.
- **Obtido:** item "vitamina" (o "E" vira separador e o item vazio depois dele é ignorado) e local "Ala" (decisão 6). O "E" não fica nem no item/local nem no título. A tira mostra "levar 'vitamina'" e "local 'Ala'", então a pessoa vê antes de salvar.
- **Correção sugerida (para o PO, junto com o problema 2):** só o "e" minúsculo separa itens e sai do fim do local; ou, no mínimo, um "e" que sobraria sozinho no fim fica no texto.

**4. Ano com 1 ou 3 algarismos não é lido como data, e com hora vai para hoje sem aviso** (gravidade: baixa; status: pendente, decisão do PO)
- **Página:** formulário aberto pela frase.
- **Passos:** escrever "festa 15/11/202 20h" (um erro de digitação de "2027").
- **Esperado:** a correção diz que "ano com menos de 4 algarismos válidos (< 1000)" vira data que não existe, com o aviso. "202" tem 3 algarismos e é menor que 1000.
- **Obtido:** a data inteira não é reconhecida (só anos de 2 e de 4 algarismos são lidos). Com a hora, a D1 manda para **hoje** às 20:00, sem aviso; a tira mostra "Hoje · 20:00 · título 'Festa 15/11/202'". Sem hora ("festa 15/11/202"), aparece a dica "Não encontrei data nem hora". O exemplo do critério ("15/11/0050") funciona; por isso não marquei como critério que falhou. A tabela "Quando um número conta como dia ou hora" da seção 3 também ainda fala só em "ano de 4 dígitos".
- **Correção sugerida:** o PO decide se "/A" e "/AAA" viram data que não existe (com o aviso) e atualiza a tabela da seção 3 com o ano de 2 algarismos.

**5. "das 2 da noite às 4" vira 04:00** (gravidade: baixa; status: pendente, decisão do PO)
- **Página:** formulário aberto pela frase.
- **Passos:** escrever "festa das 2 da noite às 4".
- **Esperado:** pela tabela de conversão, "2 da noite" não é entendido e "vale só o que a tabela já reconhece sem ele", como o dev fez em "das 1 às 2 da noite" (01:00–02:00, "da noite" no título).
- **Obtido:** não é intervalo; o "às 4" no fim vira a Hora 04:00 (amanhã, pela D1) e o título fica "Festa das 2 da noite". A pessoa vê na tira, mas o horário é diferente do que ela quis dizer, e o resultado não segue o mesmo raciocínio da outra metade da decisão 5.
- **Correção sugerida:** o PO escolhe entre manter (é raro) ou tratar como "das 2 às 4" com "da noite" no título (02:00–04:00).

### Observações (não são problemas)

- **A. A 320px com a letra grande**, "sair 780 min antes" quebra em duas linhas porque é mais larga (183px) que a linha da tira (179px). O design 17.3.1 já previa isso abaixo de 360px; a 360px nada se parte. Também a 320px com a letra grande a lista "Duração" mostra "Sem hora de f…" cortado; isso vem da Entrega 3a, não da 4b, e a 360px aparece inteiro.
- **B. Vírgulas com espaço antes na árvore de acessibilidade** ("Entendi: Amanhã , 09:00 , …"): é a mesma observação A da 4a; na fala não muda nada.
- **C. Resultados que seguem as regras mas podem surpreender** (todos aparecem na tira antes de salvar): "aula de 10h às 11h amanhã" → 10:00, título "Aula de às 11h" (só "das … às" é intervalo); "dentista por volta das 10h amanhã" → título "Dentista por volta das"; "às 10 levar RG dentista" → item "RG dentista" e "sem título"; "no centro levar RG dentista amanhã 9h" → título "No centro" e item "RG dentista". Sugestões para uma etapa futura.
- **D. O dev aceita um pouco mais do que as regras:** "por 1h30min" e "sair 1h30min antes" (90). Não atrapalha nada.
- **E.** O CSS da 12g é igual ao da 17.8.1, letra por letra. O `README.md` descreve certo as novidades ("das 10h às 11h", "por 1h30", "sair 30 min antes", local, "levar", "Ver exemplos" e "15/11/27").

## Prints

![Painel "Criar por frase" a 360px no tema escuro com "Ver exemplos" aberto: a seta virada para cima e os 5 exemplos (clínica Sorriso, das 14h às 15h30, por 1h, sair 40 min antes, levar RG e pedido médico), um por linha, colados à esquerda e sem marcadores (problema 1)](img/etapa-4b-celular-360-escuro-exemplos.png)

![Formulário aberto pela frase #22 a 360px no tema escuro: a tira "Entendi: Amanhã · 09:00 · até 10:00 · sair 30 min antes · local 'Centro' · levar 'RG' · título 'Dentista'" em 4 linhas, com os tempos em âmbar e "até 10:00" e "sair 30 min antes" inteiros, e os campos Título, Data e Hora preenchidos](img/etapa-4b-celular-360-escuro-tudo.png)

![Tema claro com letra grande a 360px, frase #27: a tira "Entendi: Sáb, 14/11 · Dia todo · levar 'a', 'b', 'c' e mais 17 itens · título 'Mudança'", com "e mais 17 itens" em cinza, e, abaixo do tracejado, o ícone de alerta e "A lista 'O que levar' aceita até 20 itens. Os outros ficaram de fora."](img/etapa-4b-celular-360-claro-grande-20-itens.png)

![Tema claro com letra grande a 320px, frase #5 "festa sábado das 22h às 2h": o campo Termina às com 02:00, borda vermelha, foco e o erro "A hora de fim precisa ser depois da hora de início." já visível; a Duração em "Sem hora de fim"](img/etapa-4b-celular-320-claro-grande-erro-fim.png)

![Computador a 1280px no tema escuro, frase #8 "show sábado 22h durante 3 horas": tira com "duração 180 min" em âmbar, sem vermelho; a Duração "Outro" com o erro "Com essa duração, o compromisso passaria da meia-noite. Escolha uma duração menor." e o foco, Minutos 180 e Termina às vazio](img/etapa-4b-desktop-escuro-erro-duracao.png)

## Como foi testado (o que foi de verdade e o que foi por leitura)

- **Lógica da frase (Node, script meu):** carreguei `js/datas.js`, `js/frase.js` e `js/armazenamento.js` num contexto isolado, com o fuso `America/Sao_Paulo`, e comparei `entenderFrase` e `linhaDoEntendi` (título, data, hora, fim, duração, sair, local, itens, itens de fora, "Ainda sem data", dica, aviso e a linha) com resultados que escrevi a partir das regras: as 52 frases da 4a, as 28 da 4b, 22 das correções e 124 minhas (intervalos com e sem "h", "até as", "da manhã/tarde/noite" nos dois horários, fim igual ao início, intervalo depois de uma hora, duas durações, durações nos limites 0, 59, 1439 e 1440, "por 3 km", "por 2 dias", "sair" nos limites 0, 720 e 721, "sair cedo", "sair … depois", "levar" no começo e no meio, 4, 5, 20, 21 e 22 itens, item de 65 letras, itens vazios e repetidos, "levaram", local com número, com vírgula, cortado em 100, "nossa", "em casa", HTML e emoji, a virada do ano). Resultado: 226 de 226 iguais às regras, cada uma em menos de 50 ms. Rodei mais 24 "sondas" para avaliar as decisões do dev (as saídas estão na tabela das decisões e nos problemas 2 a 5).
- **No navegador (Edge headless, por script):** as 52 frases da 4a, as 28 da 4b e 26 minhas abertas pelo campo (Enter ou clique), conferindo cada campo do formulário, os erros, o `aria-invalid`, o foco, a tira, as notas, o `aria-describedby`, o `#itens-aviso`, Esc e o `localStorage`; os textos dos erros; a árvore de acessibilidade; o Tab e o "Ver exemplos"; os 5 exemplos; 12 combinações de largura, tema e letra com 10 frases cada; o contraste; Salvar, corrigir e salvar, salvar inválido; `localStorage` bloqueado e cheio; frases venenosas; alto contraste e movimento reduzido; a regressão rápida. Total: 3.295 conferências. As 4 falhas são do roteiro:
  - "movimento reduzido: seta sem transição": a transição é `0.01ms` (o padrão da seção 13 do CSS), não `0s`;
  - "partes curtas inteiras" a 320px com a letra grande (escuro e claro): o "sair 780 min antes" que não cabe (observação A);
  - "card 09:00 – 10:00": o meu teste lia o `textContent` do card, que inclui o texto só para o leitor de tela ("Das 09:00 às 10:00"); o print e a 4a mostram "09:00 – 10:00".
- **Por leitura do código:** o `diff` de `index.html`, `js/app.js`, `css/style.css` e `README.md`, e o `js/frase.js` inteiro. A causa do problema 1 (especificidade do `ul[class]`).
- O script do dev (`teste-frase-4b.js`) deu 120 de 120, mas não usei os esperados dele.
- Os scripts ficaram na pasta temporária, fora do projeto. O site foi testado numa cópia, servida de fora de `trabalhos/`. O Edge foi aberto com perfil próprio e fechado no fim (nenhum processo sobrou). Não mexi no código da Agenda e não fiz commit.

## Conferência manual (para o João)

1. No celular, escrever "dentista sexta das 9h às 10h no centro levar RG sair 30 min antes" e tocar em "Ir": conferir a tira e, no formulário, "Termina às" 10:00, Duração "1 h", "30 min" marcado, Local "Centro" e o item "RG".
2. Com o NVDA ou o Narrador, abrir pela frase "exame sexta 7h levar RG, pedido médico e cartão do convênio" e ouvir a tira **uma vez**, sem "RG adicionado" para cada item.
3. Abrir "Ver exemplos" com Enter e com Espaço e confirmar que o formulário **não** abre.

## Rodada 2 — 2026-11-11

- **O que foi testado de novo:** as correções do dev para os problemas 1 a 5 da rodada 1, conforme as "Decisões do João depois do teste da 4b" no [requisitos](../requisitos.md). Nesta rodada só mudaram `js/frase.js` e `css/style.css`. Conferi isso comparando os arquivos com a cópia da rodada 1. Os outros arquivos (`index.html`, `js/app.js`, `datas.js`, `armazenamento.js`) estão iguais.
- **Onde:** como na rodada 1. Edge headless com perfil temporário, numa cópia nova do site fora de `trabalhos/`. O relógio ficou parado em qui 12/11/2026 14:00. A lógica foi testada em Node com o meu script.

### Resultado

**Reprovado.** Volta para o dev por **um** problema de gravidade alta, que tem uma correção pequena e apareceu nesta rodada: um "e" no começo de uma palavra com hífen, logo depois de um pedaço, é cortado do título. "responder amanhã e-mail do chefe" vira "Responder -mail do chefe", e "amanhã e-mail" vira "Mail" (problema 6). Todo o resto passou:
- os problemas 1 a 5 da rodada 1 foram corrigidos conforme as decisões do João;
- as 226 frases da rodada 1 e mais 32 novas dão o resultado das regras (258 de 258);
- a regressão de tela repetida passou.

### Verificações

| Área | Resultado | Observação |
|---|---|---|
| Celular a 360px | Passou | "Ver exemplos" aberto, nos 2 temas × 2 letras, a 320, 360 e 1280px: sem rolagem horizontal, com a lista dentro do painel. O roteiro de larguras da rodada 1 deu o mesmo resultado. |
| Teclado | Passou | "Ver exemplos" abre e fecha com Enter nas 12 combinações. A ordem do Tab e o foco no primeiro campo com erro estão iguais aos da rodada 1. O "ano 202" ao salvar põe o foco na Data, com "Escolha uma data.". |
| Acessibilidade | Passou | A árvore de acessibilidade está igual à da rodada 1. A lista dos exemplos agora tem `list-style: disc`, então continua sendo uma lista também no Safari. |
| Contraste | Passou | O marcador lilás dá 8.99 no tema escuro e 7.50 no claro (mínimo de 3). O texto dos exemplos dá 15.79 no escuro e 16.59 no claro. O resto está igual à rodada 1. |
| Erros | Passou | Console sem erros e sem 404. As frases "venenosas" levam menos de 0,5 ms. |

### Conferência das correções

- [x] **Problema 1 (marcadores): corrigido.** O seletor agora é `ul.frase-exemplos-lista`. Com isso, a lista tem marcador (bolinha lilás) e recuo de 24px (30px com a letra grande), nos dois temas e a 320, 360 e 1280px. Quando um exemplo quebra em duas linhas, a segunda linha fica alinhada com o texto, depois do marcador.
- [x] **Problemas 2 e 3 ("e" minúsculo): corrigidos** conforme a decisão:
  - "reunião e amanhã" e "reunião e amanhã e" → "Reunião";
  - "reunião E amanhã" → "Reunião E";
  - "comprar vitamina E amanhã" → "Comprar vitamina E", e "comprar vitamina e amanhã" → "Comprar vitamina";
  - "pão e leite amanhã" → "Pão e leite" (o "e" do meio não está colado a um pedaço);
  - "reunião e", sem nenhum pedaço → "Reunião e";
  - "reunião amanhã e sexta" → "Reunião sexta" (atualizei a minha expectativa, que agora segue a regra aprovada);
  - "levar vitamina E" → item "vitamina E"; "levar vitamina E e cartão" → "vitamina E" e "cartão"; "levar arroz E feijão" e "LEVAR RG E CARTÃO" → um item só;
  - "na ala E amanhã 9h" → local "Ala E", e "na ala e amanhã 9h" → local "Ala".
- [x] **Problema 4 (ano): corrigido.**
  - "15/11/202", "15/11/2", "dia 15/11/202", "31/02/202", "15/11/0050" e "15/11/0999" viram data que não existe, com o aviso ("A data 15/11/202 não existe. Escolha uma data."), a tira "data a escolher" e o campo Data vazio.
  - "festa 15/11/202 20h" agora dá "Entendi: data a escolher · 20:00 · título 'Festa 15/11/202'", com o aviso, e não vai mais para hoje. Salvar mostra "Escolha uma data." e não grava nada.
  - "15/11/27" continua 2027, e "15/11/1000" fica como foi escrito. Em "15/11/202 ou 20/11" vale a data válida, sem aviso.
- [x] **Problema 5 (período fora da tabela): corrigido.**
  - "das 2 da noite às 4" → 02:00 às 04:00, com Duração "2 h" e o título "Festa da noite".
  - "das 1 às 2 da noite" → 01:00 às 02:00.
  - "das 2 da noite às 4 da manhã" → 02:00 às 04:00 (decisão do dev, abaixo).
  - "das 2 da noite às 4 da tarde" → 02:00 às 16:00.
  - "das 8 da noite às 2 da noite" → 20:00 às 02:00, com o erro do fim e "da noite" no título.
  - "das 12 da manhã às 3 da tarde" → 12:00 às 15:00, com "da manhã" no título.
- [x] **Intervalo junto com duração** (decisão registrada): "reunião amanhã por 2h das 10h às 11h" → vale o intervalo, e o título fica "Reunião por 2h".
- [x] **Regressão:** rodei de novo o roteiro de tela inteiro da rodada 1 (3.295 conferências), com o mesmo resultado. Ele tem 5 falhas, e nenhuma é da Agenda:
  - as 4 da rodada 1 (transição de 0,01 ms, "sair 780 min antes" a 320px com a letra grande, `textContent` do card);
  - uma vez, o foco foi para "Novo compromisso" num Esc dado 60 ms depois de abrir. Explico na observação F.

  O roteiro novo da rodada 2 teve 62 conferências, e só falhou o caso do problema 6.

**Decisão nova do dev** ("se o primeiro horário tem período fora da tabela, o período do segundo não passa para ele"): **aceitável.** A regra da US29 diz que o período do segundo horário vale para o primeiro "se o primeiro não tiver o seu", e aqui o primeiro tem o seu (só que ele é ignorado). Por isso, "das 2 da noite às 4 da manhã" → 02:00 às 04:00 e "das 2 da noite às 4 da tarde" → 02:00 às 16:00. Vale anotar no requisito, mas não precisa do PO.

### Problemas encontrados

**6. Um "e" no começo de palavra com hífen é cortado logo depois de um pedaço** (gravidade: **alta**; status: pendente, volta para o dev)
- **Página:** formulário aberto pela frase.
- **Passos:** escrever "responder amanhã e-mail do chefe" e apertar Enter. Também "amanhã e-mail".
- **Esperado:** pela US27 e pela decisão do João, só sai o "e" que é uma **palavra** de ligação colada a um pedaço. O "e" de "e-mail" é parte de uma palavra, e o título deveria ser "Responder e-mail do chefe" (ou "E-mail").
- **Obtido:** "Responder -mail do chefe" e "Mail". Parte do que a pessoa digitou some do título, e isso quebra o critério "o título é a frase original sem os pedaços que viraram campo". A tira mostra o título errado antes de salvar, mas não diz que algo foi cortado. Antes desta rodada, o resultado era "Responder e-mail do chefe". "mandar e-mail amanhã" não é afetado (o "e-mail" vem antes do pedaço), e um "e-" dentro de item ou de local também não ("levar RG e-título", "na casa e-ventos").
- **Causa:** em `js/frase.js`, a `E_NO_COMECO` (`/^[\s,.;:\-–]*e(?=[\s,.;:\-–]|$)/`) aceita o hífen **depois** do "e" como fim de palavra. Por isso o "e" de "e-mail" conta como um "e" solto.
- **Correção sugerida:** no lookahead da `E_NO_COMECO`, aceitar só espaço, vírgula, ponto, ponto e vírgula, dois-pontos ou o fim (sem `-` e `–`), por exemplo `(?=[\s,.;:]|$)`. Vale conferir também a `E_NO_FIM` com o mesmo cuidado. Depois, testar de novo "responder amanhã e-mail do chefe", "reunião amanhã e" e "reunião amanhã e, depois".

### Observações (não são problemas)

- **F. Esc muito rápido no teste automático.** No roteiro completo, e numa sonda com 60 aberturas, o foco foi para "Novo compromisso" em vez do campo da frase, sempre na **segunda** abertura depois de carregar a página. O Esc foi dado cerca de 60 ms depois de abrir. Com qualquer espera a mais (ou só lendo o estado antes do Esc), isso não acontece em nenhuma abertura. O `app.js` não mudou nesta rodada e passou no mesmo roteiro na rodada 1, então parece uma corrida do teste automático. Fica para o João conferir à mão: abrir pela frase e apertar Esc; o foco deve voltar para o campo.
- **G.** Quando o "e" sai do começo do trecho, a pontuação colada nele sai junto: "reunião amanhã 10h, e conversar" → "Reunião conversar" (a vírgula some). Segue a regra e é só estética.

### Prints

![Tema claro com letra grande a 320px: "Ver exemplos" aberto, com os exemplos recuados e uma bolinha lilás antes de cada um; os exemplos compridos quebram em duas linhas, alinhadas com o texto](img/etapa-4b-r2-celular-320-claro-grande-exemplos.png)

![Computador no tema escuro, frase "festa 15/11/202 20h": tira "Entendi: data a escolher · 20:00 · título 'Festa 15/11/202'", o aviso "A data 15/11/202 não existe. Escolha uma data.", a Data vazia e a Hora 20:00](img/etapa-4b-r2-desktop-escuro-aviso-ano.png)

![Computador no tema escuro, frase "responder amanhã e-mail do chefe": tira e campo Título com "Responder -mail do chefe", sem o "e" de "e-mail" (problema 6)](img/etapa-4b-r2-desktop-escuro-e-mail.png)

### Como foi testado

- **Em Node:** rodei o mesmo script da rodada 1, com as 226 frases (uma expectativa atualizada: "reunião amanhã e sexta" → "Reunião sexta"). Acrescentei 32 frases novas, escritas pelas regras aprovadas. Resultado: 258 de 258. O problema 6 apareceu numa sonda de casos com hífen e foi confirmado no navegador.
- **No navegador:** o roteiro completo da rodada 1 (3.295 conferências) e um roteiro novo de 62 conferências. O roteiro novo cobre: "Ver exemplos" com marcadores em 12 combinações, contraste do marcador, aviso do ano no formulário e ao salvar, intervalos, "e" e "E" no formulário, console e 404.
- Os scripts ficaram na pasta temporária, fora do projeto. Nenhum navegador nem servidor ficou aberto. Não mexi no código e não fiz commit.

## Rodada 3 — 2026-11-11

- **O que foi testado de novo:** a correção do problema 6. Comparei os arquivos com a cópia da rodada 2, e só o `js/frase.js` mudou: as expressões `E_NO_COMECO` e `E_NO_FIM` não aceitam mais o hífen nem o travessão colados no "e".
- **Onde:** como nas rodadas anteriores. Usei Node para a lógica e o Edge headless, com perfil temporário, numa cópia do site fora de `trabalhos/`, com o relógio parado em qui 12/11/2026 14:00.

### Resultado

**Aprovado com pendências.** O problema 6 foi corrigido, e nada que já passava quebrou. Nenhum critério de aceite falha. Ficam só as observações de gravidade baixa das rodadas anteriores:
- "sair 780 min antes" quebra em duas linhas a 320px com a letra grande (previsto pelo design);
- "Sem hora de f…" cortado na Duração a 320px com a letra grande (vem da 3a);
- espaços antes das vírgulas na árvore de acessibilidade;
- o Esc muito rápido do teste automático (observação F), que desta vez não apareceu em nenhuma abertura;
- a vírgula que sai junto com o "e" (observação G).

### Conferência

- [x] **Problema 6: corrigido.** "responder amanhã e-mail do chefe" agora dá o título "Responder e-mail do chefe", no Node e no formulário, na tira e no campo Título (print abaixo).
- [x] **Lógica (Node):** 281 de 281 iguais às regras. São as 258 das rodadas 1 e 2 e mais 23 frases minhas com hífen e com o "e", escritas pela regra "só o 'e' minúsculo que é uma palavra inteira, colado a um pedaço, é ligação":
  - "amanhã e-mail" e "e-mail amanhã" → "E-mail";
  - "amanhã E-mail" → "E-mail", e "amanhã e–mail" (com travessão) → "E–mail";
  - "reunião amanhã 10h e-mail" → "Reunião e-mail"; "pegar e-ticket sexta 9h" → "Pegar e-ticket"; "festa amanhã e-vento" → "Festa e-vento";
  - "enviar e-mail e amanhã" → "Enviar e-mail"; "reunião pré-e amanhã" → "Reunião pré-e";
  - "levar e-mail impresso" → item "e-mail impresso"; "levar RG e e-mail impresso" → "RG" e "e-mail impresso"; "levar RG e-título" → um item só;
  - "na sala e-learning", antes e depois da data → local "Sala e-learning";
  - a regra do "e" solto continua valendo: "reunião amanhã e", "reunião e amanhã", "reunião – e – amanhã" e "reunião, e amanhã" → "Reunião"; "reunião amanhã e, depois" → "Reunião, depois"; "comprar vitamina E amanhã" → "Comprar vitamina E"; "na casa do João e amanhã 20h" → local "Casa do João".
- [x] **Tela:** o roteiro da rodada 2 (62 conferências) passou inteiro, inclusive a frase do e-mail, o aviso do ano, os intervalos e os marcadores do "Ver exemplos" nas 12 combinações de tema, letra e largura.
- [x] **Regressão:** o roteiro completo da rodada 1 (3.295 conferências) também passou. Ele tem as mesmas 4 falhas, que são do próprio roteiro e não da Agenda (explicadas na rodada 1). Console sem erros e sem 404.

![Computador no tema escuro, frase "responder amanhã e-mail do chefe": tira "Entendi: Amanhã · Dia todo · título 'Responder e-mail do chefe'" e o campo Título "Responder e-mail do chefe", com o "e" de volta](img/etapa-4b-r3-desktop-escuro-e-mail.png)

- **Como foi testado:** usei os mesmos scripts das rodadas 1 e 2, na pasta temporária, mais as frases da rodada 3. Nenhum navegador nem servidor ficou aberto. Não mexi no código e não fiz commit.
