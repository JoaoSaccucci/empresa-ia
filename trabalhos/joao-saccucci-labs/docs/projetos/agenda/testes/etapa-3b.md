# Relatório de teste — Agenda, Etapa 3 (Entrega 3b)

- **Data:** 2026-11-09
- **O que foi testado:** a página `index.html` da Agenda (com `css/style.css`, `js/app.js`, `js/armazenamento.js`, `js/datas.js` e `js/copia.js`) e o `README.md`, ainda sem commit, comparados com o último commit da Entrega 3a. Testei contra a Agenda **US21** (faixa "Próximos 7 dias"), **US22** (tema claro e escuro), **US23** (letra grande), as mudanças da 3b nas stories anteriores (US01 e US07), os requisitos gerais da Etapa 3 e as regras "Preferências (Etapa 3b)" e "Arquivo de cópia" da seção 3 dos [requisitos](../requisitos.md). O visual foi comparado com a seção 15 do [design](../design.md): a paleta da 15.6, a escala da 15.7, os contrastes da 15.13, a conferência da 15.14 e as decisões aprovadas da 15.15. Também avaliei os 3 desvios anotados pelo dev e conferi se as Entregas 2a, 2b e 3a continuam funcionando, principalmente no tema claro e com a letra grande.
- **Onde:** Microsoft Edge (Chromium) **headless**, controlado por script, num servidor local que imita o endereço do GitHub Pages (`/agenda/`). Fuso `America/Sao_Paulo`, com o relógio parado em segunda-feira, 09/11/2026, às 10:00 (e em 31/10/2026 para a virada do mês), e um relógio que anda nos testes de atualização de cada minuto e da meia-noite. Larguras: 320, 360, 400, 640, 760 e 1280px, nos dois temas e nas duas letras. Também testei com movimento reduzido, alto contraste (cores forçadas), modo celular (tela de toque) e `localStorage` bloqueado e cheio. **Não testei:** celular de verdade, leitor de tela de verdade, as listas nativas de data e hora abertas e o GitHub Pages (a 3b ainda não foi publicada).

## Resultado

**Aprovado com pendências.** Fiz cerca de 380 conferências novas no navegador para a 3b e rodei de novo os 7 roteiros das Entregas 2a, 2b e 3a (cerca de 530 conferências cada vez) no tema escuro com letra normal e no tema claro com letra grande. Encontrei **um problema de gravidade alta**, pequeno, e **corrigi**: com a letra grande, no celular, o aviso "Não foi possível salvar o compromisso." ficava meio escondido atrás da barra Cancelar/Salvar (problema 1). Depois da correção, nenhum critério de aceite falhou. Os contrastes do tema claro foram medidos na tela e estão todos em AA. Os 3 desvios do dev são aceitáveis. Ficam só pendências de gravidade baixa e a conferência manual (celular e leitor de tela).

## Verificações

| Área | Resultado | Observação |
|---|---|---|
| Celular a 360px | Passou | Sem rolagem horizontal e sem nada passando da tela nem cortado a 320, 360 e 1280px, nos 2 temas × 2 letras, em 13 situações: página com tudo aberto, aviso flutuante, formulário com erros (4 posições de rolagem), confirmação de excluir, "Seus dados", importar, "Substituir tudo", erro de importação, `localStorage` bloqueado com a lista vazia e dados corrompidos. A faixa da semana fica com 1 + 2 + 2 + 2 dias abaixo de 640px, 4 + 3 com letra normal e 3 + 3 + 1 com letra grande a partir de 640px, e 1 por linha a 320px com letra grande. Os dias têm 58px de altura (71px com letra grande). Com a letra grande, o cabeçalho vai para 2 linhas (até cerca de 650px, como previsto) e os botões de aparência ficam um embaixo do outro. |
| Teclado | Passou | Ordem do Tab: "Seus dados" → "Novo compromisso" → "Tema claro" → "Letra grande" → faixas → "Ficou pendente" → dias com compromisso da faixa (os livres são pulados) → lista principal. Os dois botões de aparência funcionam com Enter e Espaço, e o foco fica neles. Enter e Espaço num dia levam o foco ao `h3` do dia (contorno de 3px). O próximo Tab vai para o primeiro botão do compromisso daquele dia. O contorno de foco aparece nos dois temas (azul `#0B5FC0` no claro). |
| Acessibilidade | Passou | Pela árvore de acessibilidade do navegador: grupo "Aparência"; botões "Tema claro" e "Letra grande" com estado `pressed` "false"/"true" (o nome não muda); `h2` "Próximos 7 dias" com lista de 7 itens; botão "Hoje, 3 compromissos"; dia livre como item de lista (sem botão, sem `tabindex`, com a vírgula escondida: "Qua 11, Livre"); depois do toque, o foco está no título de nível 3 "Sex, 13/11 daqui a 4 dias". A faixa não tem `aria-live` e não está dentro de nenhum. Movimento reduzido: rolagem até o dia com `behavior: "auto"` (e `"smooth"` sem a preferência), chavinha e botão do dia sem transição e sem encolher. Alto contraste: dia com borda sólida, dia livre tracejado, bolinha da chavinha visível nos dois estados e à direita só quando ligada, foco visível. |
| Contraste | Passou | Medi **todo texto visível** em 13 situações, nos 2 temas, nas 2 letras e em 3 larguras (1.806 medições por combinação, cada uma contra o pior fundo possível, inclusive o brilho âmbar do canto e as duas metades das placas): nenhuma ficou abaixo de AA. Menores valores no claro: horas e "Hoje" em âmbar 5.1, "Conflito:" 5.5, "Aperto:" 5.8. Não-texto no claro (mínimo 3): bordas de botões e campos 3.8 a 4.5, foco 5.1 a 6.0, borda do campo com erro 6.4, check creme no caramelo 6.5, chavinha ligada 6.1 e bolinha 6.5. Tabela completa abaixo. |
| Erros | Passou | Console sem erros da Agenda em todos os cenários, inclusive com `agenda:preferencias` estranha (11 valores), com o `localStorage` bloqueado e com a gravação das preferências falhando. Nenhum arquivo deu 404. |

### Contrastes medidos no tema claro (pior fundo)

| Elemento | Razão | Mínimo | Design (15.13) |
|---|---|---|---|
| Título do card / texto principal | 16.6 | 4.5 | 16.6 |
| Hora, "Hoje", número da semana (âmbar) | 5.1 | 4.5 | 5.1 (placa de baixo) |
| Hora de fim, quantidade da semana | 5.9 | 4.5 | 5.9 |
| Local (lilás) | 7.7 | 4.5 | 7.5 |
| "Conflito:" e ícone · texto da tarja | 5.5 · 14.1 | 4.5 · 3 | 5.5 · 14.1 |
| "Aperto:" e ícone · texto da tarja | 5.8 · 14.3 | 4.5 · 3 | 5.8 |
| "Sair em 15 min" (creme no caramelo) · "Novo compromisso" · opção marcada | 6.5 | 4.5 | 6.5 |
| Botão principal no hover | 8.7 | 4.5 | 8.7 |
| Selo "Cobrar" · título "Ficou pendente" | 6.7 · 5.5 | 4.5 | 6.7 · 5.5 |
| "O que levar" · contagem · "tudo pronto" · item marcado | 16.6 · 7.7 · 6.4 · 7.7 | 4.5 | — |
| Dia livre (nome e "Livre") | 6.5 | 4.5 | 6.5 |
| Erro do campo · rótulo · dica | 6.4 · 16.6 · 7.7 | 4.5 | 6.4 |
| Faixa de lembrete (texto) | 14.2 | 4.5 | 13.9 |
| Borda do botão do dia, dos botões de contorno e do trilho desligado | 3.8 | 3 | 3.8 (pior ponto) |
| Borda do campo, da caixa e do "O que levar" | 4.5 | 3 | 4.5 |
| Borda do campo com erro | 6.4 | 3 | 6.4 |
| Foco (botões, dia, `h3`, campos, faixa) | 5.1 a 6.0 | 3 | 5.0 a 6.0 |
| Caixa marcada · check creme | 6.7 · 6.5 | 3 | 6.1 · 6.5 |
| Chavinha ligada (trilho · bolinha) · bolinha desligada | 6.1 · 6.5 · 7.0 | 3 | 6.1 · 6.5 · 7.0 |
| Botão principal contra o fundo | 6.1 | 3 | 6.1 |

No tema escuro, a mesma varredura deu o menor valor em "Conflito:" (6.3), e o fundo continua `#0F0B14`: nada mudou de cor.

## Critérios de aceite

**Agenda US21: Faixa dos próximos 7 dias**
- [x] A faixa "Próximos 7 dias" é uma `section` com `h2`, depois de "Ficou pendente" e antes de "Próximos compromissos" (ordem do `main`: Aparência, faixas, Ficou pendente, Próximos 7 dias, Próximos compromissos, Sem data, Anteriores).
- [x] São 7 `li` dentro de um `ul`: hoje e os 6 seguintes, em ordem.
- [x] Nomes "Hoje", "Amanhã", "Qua 11" … e quantidades "1 compromisso", "3 compromissos" ou "Livre". Na virada do mês (sábado, 31/10): "Hoje, Amanhã, Seg 2, Ter 3, Qua 4, Qui 5, Sex 6".
- [x] A contagem segue "Próximos compromissos": o de hoje que já passou, "Feito", "Não vou fazer", "Sem data" e o que está fora dos 7 dias não contam; o de dia todo conta (semente com 14 compromissos: "Hoje 3, Amanhã 1, Qua 11 Livre, Qui 12 Livre, Sex 13 3, Sáb 14 Livre, Dom 15 1").
- [x] O dia livre diz "Livre" em texto, além do tracejado.
- [x] Dia com compromisso é `button`. Clique, Enter e Espaço rolam até o grupo do dia (o título fica logo abaixo do cabeçalho) e põem o foco no `h3` (`tabindex="-1"`). Com o mouse não aparece contorno; com o teclado, aparece. Com movimento reduzido, a rolagem é sem animação.
- [x] Nomes acessíveis "Hoje, 3 compromissos", "Amanhã, 1 compromisso", "Sex 13, 3 compromissos", "Dom 15, 1 compromisso" e "Qui 5, 1 compromisso".
- [x] O dia livre é `div`, sem `tabindex`; clicar nele não rola nem muda o foco.
- [x] Com a lista vazia, a faixa aparece com os 7 dias "Livre" (e "Hoje" com as classes `--hoje` e `--livre`).
- [x] Atualiza sem recarregar: criar (Qua 11 vira "1 compromisso"), editar a data (passa para Qui 12), Feito (Sex 13 vai para 2), Desfazer (volta para 3), excluir (Dom 15 vira "Livre"), importar com Juntar (Sáb 14 vira "1 compromisso"), a cada minuto (o Dentista das 10:30 sai da contagem às 10:31) e depois da meia-noite (Hoje passa a ser 10/11 e entra o "Seg 16").
- [x] A 360px (e a 320px) os 7 dias cabem sem rolagem horizontal, e os botões têm 44px ou mais.
- [x] Foco depois do redesenho: continua no mesmo dia; se o dia virou "Livre", vai para o próximo dia com botão; se não houver nenhum, vai para "Próximos compromissos".

**Agenda US22: Tema claro e escuro**
- [x] O botão "Tema claro" tem `aria-pressed` ("false" no começo, "true" ligado). Sem preferência, o tema é o escuro.
- [x] O botão fica na barra "Aparência", logo abaixo do cabeçalho, não fixa (decisão 1A): aparece com a lista vazia, com faixas e sem nada, não cobre nada e funciona com o teclado.
- [x] A troca é na hora, sem recarregar, e o foco fica no botão. A classe `trocando-tema` sai logo depois (sem a troca "em ondas").
- [x] O tema claro cobre todas as partes: as 13 situações da varredura (cabeçalho, faixas de lembrete, de alerta e de erro, "Ficou pendente", faixa da semana, cards com checklist, conflito e aperto, "Sem data", "Anteriores", formulário com erros, as quatro janelas, aviso flutuante e erro de importação) têm fundo creme e texto escuro. A lista vazia mostra o sol (sem a sombra da lua e sem estrelas), e o fundo atrás das janelas é ameixa a 45%.
- [x] Contraste AA nos dois temas em texto, botões, bordas de campo, foco, erros e marcas (tabela acima).
- [x] `color-scheme` fica `light` no `<html>` e nos campos de data e hora; as duas `<meta>` mudam para `light` e `#F7F1E8` (e voltam para `dark` e `#0F0B14`).
- [x] A escolha vai para `agenda:preferencias` (`{"tema":"claro","letra":"normal"}`) e vale ao recarregar.
- [x] **Sem piscar:** com o `app.js` atrasado 1,5 s pelo servidor, a página já aparecia creme, com a chavinha ligada, antes de o `app.js` chegar. Um observador gravou o estado a cada mudança da página durante o carregamento: em nenhum momento o `body` esteve no tema errado (nem no claro, nem no escuro). O script fica no `<head>`, depois das duas `<meta>` de cor e antes das fontes e do CSS.
- [x] Preferência ausente, `abc`, `5`, `null`, `[]`, `"claro"`, `{"tema":"azul","letra":"enorme"}`, `{}` e `{"tema":true}` abrem no escuro e normal; `{"tema":"claro","letra":"x"}` abre claro e normal; `{"tema":"Claro","letra":"grande"}` abre escuro e grande. A chave nunca é apagada, e o console fica limpo. Com o `localStorage` bloqueado, abre no escuro, aparece só a faixa que já existia ("Não foi possível salvar neste navegador…"), e a troca funciona. Com a gravação das preferências falhando, a troca vale, sem aviso e sem erro.
- [x] Trocar o tema não muda `agenda:ultima-mudanca`. O arquivo de cópia continua com `versao: 2` e sem preferências, e importar com "Substituir tudo" não mexe nelas.

**Agenda US23: Letra grande**
- [x] O botão "Letra grande" fica ao lado do "Tema claro", com `aria-pressed`, e o padrão é a letra normal.
- [x] Ligada, a raiz vai de 16px para 20px, e **todos** os textos ficam 1,25 vez maiores. Comparei cada texto em 4 situações (página, formulário com erros, "Seus dados" e aviso flutuante), de 142 a 146 textos em cada uma, e nenhum ficou fora de 1,25.
- [x] A 360px e a 320px, com a letra grande, não há rolagem horizontal nem texto cortado nas 13 situações (depois da correção do problema 1). O cabeçalho vai para 2 linhas, "Tempo para sair" fica com 2 colunas e "Adicionar" desce para baixo do campo, como no design.
- [x] Funciona com os dois temas (as 4 combinações foram testadas).
- [x] Guardada em `agenda:preferencias`, aplicada antes de a página aparecer e com as mesmas regras de falha da US22.
- [x] Zoom do navegador: o tamanho é `125%` na raiz e não há nenhum `font-size` em `px` no CSS (conferido por leitura; o zoom em si não dá para testar no modo headless).
- [x] Trocar a letra não muda `agenda:ultima-mudanca` e não vai para a cópia.

**Mudanças da 3b nas stories anteriores**
- [x] US01: ordem da página certa; os `h3` de "Próximos compromissos" têm `tabindex="-1"`, e os de "Ficou pendente" e "Anteriores" não têm.
- [x] US07: chave nova `agenda:preferencias`; os compromissos continuam na `versao: 2`.

**Requisitos gerais da Etapa 3 (parte da 3b) e regressões das Entregas 2a, 2b e 3a**
- [x] "Livre" e o estado de "Tema claro" e "Letra grande" estão em texto ou em `aria-pressed`, nunca só na cor (a chavinha também muda de lugar).
- [x] O formulário cabe a 360px e a 320px e rola por dentro, inclusive com a letra grande.
- [x] Tudo o que é novo funciona só com o teclado e tem foco visível nos dois temas.
- [x] Dados da Etapa 2 e da 3a abrem sem migração.
- [x] O `localStorage` só tem chaves `agenda:`, sem `localStorage.clear()`; nada é enviado para a internet.
- [x] **Regressões:** os roteiros da 2a/2b (migração v1 → v2, cópia e importação, Juntar e Substituir tudo, lembrete de cópia, "Sair às", Feito/Desfazer, "Ficou pendente", Remarcar, "Sem data", Agendar, teclado, `localStorage` cheio e bloqueado) e da 3a (checklist no formulário e no card, hora de fim com os três erros, conflito e aperto em 24 situações, contraste, alto contraste e `file://`) passaram igual no escuro com letra normal e no claro com letra grande, e o card do roteiro da 3a também no claro com letra normal. A única diferença foi o problema 1, corrigido. As falhas que sobraram nos dois modos são as mesmas e são dos roteiros antigos, não da Agenda (veja "Como foi testado").
- [x] O README descreve a faixa da semana, o tema e a letra, e diz que as preferências não vão na cópia. Não tem dados pessoais.

## Avaliação dos desvios do dev

| # | Desvio | Avaliação |
|---|---|---|
| 1 | O dia do mês aparece sem zero à esquerda ("Qui 5", e não "Qui 05"). | **Aceitável.** Segue o exemplo dos requisitos ("Sex 14") e o do design ("dia da semana abreviado + dia do mês"), e é o jeito que se fala. Conferido na virada do mês: "Seg 2", "Ter 3" … "Sex 6", com o nome acessível "Qui 5, 1 compromisso". |
| 2 | Depois do redesenho (a cada minuto ou depois de uma mudança), o foco volta para o `h3` do dia, se estava nele. | **Aceitável e bom.** O design só falava do foco nos botões da faixa, mas deixar o foco "cair" no topo da página seria pior. Conferido: com o foco no `h3` de "Sex 13", o redesenho das 10:31 devolve o foco a ele; se o dia some da lista (o último compromisso de hoje passou), o foco vai para "Próximos compromissos". |
| 3 | A 360px com letra grande, "1 compromisso" quebra em 2 linhas. | **Aceitável, com pendência baixa** (problema 2). O design previa a quebra só para "3 compromissos". Nada fica cortado e o texto é lido inteiro, só fica um número sozinho na linha de cima. |

## Problemas encontrados

**1. Com a letra grande, no celular, o aviso "Não foi possível salvar o compromisso." ficava meio atrás da barra Cancelar/Salvar** (status: **corrigido por mim**)
- **Página:** `index.html`, formulário (`#erro-salvar`), com `localStorage` cheio.
- **Passos:** abrir com a letra grande a 360 × 640 (com ou sem tema claro), simular o `localStorage` cheio, clicar em "Novo compromisso", escrever um título e Salvar.
- **Esperado:** o aviso aparece inteiro, acima da barra (critério da 2a, que estava resolvido, e "nada fica cortado" da US23).
- **Obtido:** com a letra grande, "Cancelar" e "Salvar" não cabem lado a lado (o design 15.7 contou 120px por botão, mas o espaço interno do botão não entrou na conta) e a barra fica com 148px de altura. O `scroll-padding-bottom` da janela é 6rem (120px), então a rolagem parava antes: o aviso ficava de 386 a 499px na tela e a barra começava em 471px. A última linha ("compromisso.") ficava escondida. Dava para ler rolando a janela, e o leitor de tela anuncia o aviso (`role="alert"`), mas na tela ele aparecia cortado. A 320px e com a letra normal o problema não acontecia.
- **Gravidade:** alta (quebra um critério que já tinha sido aprovado na 2a), mas a correção é pequena.
- **Correção** (`css/style.css`, junto dos ajustes da letra grande, com comentário):
  ```css
  :root[data-letra="grande"] .janela {
    scroll-padding-bottom: 9rem;
  }
  ```
  Com a letra grande, 9rem dá 180px. Depois disso, o aviso fica de 328 a 441px e a barra começa em 471px, a 320 e a 360px, no modo computador e no modo celular. O roteiro da 2b voltou a passar nesse ponto. **Dev:** confira se prefere esse valor ou outro jeito.

**2. A 360px com letra grande, "1 compromisso" e "3 compromissos" quebram em 2 linhas** (status: pendente)
- **Passos:** abrir com a letra grande a 360px e olhar a faixa da semana (print abaixo).
- **Esperado (design 15.8):** só "3 compromissos" quebra.
- **Obtido:** a coluna tem 155px, e o espaço para o texto fica com cerca de 123px (sem os 15px de cada lado e a borda). "compromisso" com letra de 17,5px não cabe junto do número, que fica sozinho na linha de cima ("1" / "compromisso"). Nada fica cortado.
- **Gravidade:** baixa (só aparência). Sugestão para a artista: menos espaço interno na plaquinha com a letra grande no celular, ou aceitar a quebra.

**3. O exemplo "Ex.: chave" do campo "Novo item" tem contraste 4.1 no tema claro** (status: corrigido pelo dev)
- **Onde:** `#campo-novo-item`, texto de exemplo (`placeholder`).
- **Obtido:** o CSS não define a cor do `::placeholder`, e fica o cinza padrão do navegador (`#757575`): 4.1 no creme e 4.2 no escuro (no escuro já era assim na 3a). O rótulo visível "Novo item" é que dá o nome do campo, então nenhuma informação se perde.
- **Gravidade:** baixa. Sugestão: `.campo-controle::placeholder { color: var(--cor-texto-suave); }` (7.0 no creme e 8.7 no escuro).
- **Correção:** o dev acrescentou em `css/style.css` a regra `.campo-controle::placeholder { color: var(--cor-texto-suave); opacity: 1; }` (7.0 no creme e 8.7 no escuro).

### Observações (não são problemas)

- **A. "Cancelar" e "Salvar" um embaixo do outro com a letra grande no celular.** O design 15.7 dizia que cabiam lado a lado, mas a conta não incluiu o espaço interno dos botões. Empilhados, eles continuam com 46px e sem rolagem para o lado. Fica só a nota para a artista corrigir a conta.
- **B. Nome da seção em maiúsculas na árvore de acessibilidade.** A região "Próximos 7 dias" aparece como "PRÓXIMOS 7 DIAS", porque o Chrome aplica o `text-transform: uppercase` do rótulo. É igual em todas as seções da Agenda desde a Etapa 1, e os leitores de tela leem normalmente.
- **C. `aria-pressed` antes do `app.js`.** Enquanto o `app.js` não roda, o HTML diz `aria-pressed="false"` mesmo com o tema claro ligado pelo script do `<head>`. A chavinha já aparece certa (ela segue o atributo do `<html>`, decisão da 15.4), e o `app.js` acerta o `aria-pressed` logo ao começar. Só daria para notar com a página travada no meio do carregamento.
- **D. O dia livre não tem nome na árvore de acessibilidade** (é um item de lista comum). O leitor de tela lê o conteúdo: "Qua 11, Livre", com a vírgula escondida.
- **E.** A barra "Aparência" ocupa 44px no topo do celular (99px com a letra grande, com os botões empilhados), mais o espaço abaixo dela, como foi aprovado na decisão 1A.

## Prints

![Agenda no tema claro, no celular a 360px: cabeçalho creme com "Novo" caramelo, barra "Aparência" com "Tema claro" ligado (chavinha caramelo com a bolinha à direita) e "Letra grande" desligado, o painel "Ficou pendente" e o começo da faixa "Próximos 7 dias"](img/etapa-3b-celular-360-claro.png)

![Cards no tema claro a 360px: Dentista com a placa "10:30 / –11:30", o selo caramelo "Sair em 15 min" e o checklist aberto com "Cartão do convênio" marcado e riscado; Reunião do TCC com a tarja vermelha "Conflito: Dentista vai até 11:30." e o botão verde "O que levar: tudo pronto (2 de 2)"; Almoço com a tarja âmbar "Aperto: sair às 11:25, mas Dentista vai até 11:30."](img/etapa-3b-celular-360-claro-cards.png)

![Tema claro com letra grande a 360px: o cabeçalho em 2 linhas (marca em cima, botões à direita embaixo), os botões "Tema claro" e "Letra grande" um embaixo do outro, ambos ligados, e o painel "Ficou pendente" com a letra maior](img/etapa-3b-celular-360-claro-letra-grande.png)

![Tema escuro com letra grande a 360px: a faixa "Próximos 7 dias" com "Hoje" na linha toda e os outros dias 2 por linha; em "Amanhã" e "Dom 15", o "1" fica numa linha e "compromisso" na de baixo (problema 2); dias livres tracejados com "Livre"](img/etapa-3b-celular-360-escuro-letra-grande.png)

![Agenda no tema claro no computador a 1280px: barra "Aparência" à direita, faixa "Próximos 7 dias" com 4 + 3 plaquinhas (Hoje 3 compromissos, Amanhã 1, Qua 11 Livre, Qui 12 Livre, Sex 13 3, Sáb 14 Livre, Dom 15 1) e o começo da lista](img/etapa-3b-desktop-claro.png)

![A mesma tela no tema escuro a 1280px, para comparar: as cores de antes continuam iguais](img/etapa-3b-desktop-escuro.png)

## Como foi testado (o que foi de verdade e o que foi por leitura)

- **No navegador (Edge headless, por script):** três roteiros novos: faixa da semana (134 conferências, nas duas combinações de tema e letra e em 6 larguras), aparência e preferências (45) e contraste, larguras, alto contraste e movimento reduzido (203). O contraste foi medido nas cores calculadas pelo navegador, compondo os fundos transparentes e as misturas `color-mix`, e contra o pior fundo possível (as duas metades das placas e o brilho âmbar do canto). Os nomes, os papéis e os estados vieram da árvore de acessibilidade do navegador. O "sem piscar" foi testado atrasando o `app.js` no servidor e gravando o estado da página a cada mudança durante o carregamento.
- **Regressão:** rodei de novo os 7 roteiros da 2a/2b e da 3a, primeiro no tema escuro com letra normal e depois no claro com letra grande (a preferência foi gravada antes de a página abrir). Os dois modos deram o mesmo resultado, a não ser pelo problema 1. As poucas falhas que aparecem nos dois modos são dos roteiros antigos, não da Agenda:
  - a ordem do Tab do roteiro da 2b começa onde o último clique deixou o foco (em "Anteriores") e dá a volta; a ordem real está certa;
  - "Plaquinha marcada" e "opção marcada" foram medidas no meio da transição de cor (180ms); medidas depois, dão 6.5;
  - o roteiro da 2b é anterior aos campos `duracaoMin` e `itens` da 3a e à placa com intervalo (as mesmas falhas da rodada da 3a).
- **Falhas do meu próprio roteiro novo:** o nome da seção em maiúsculas (observação B); um observador da página instalado antes de o `<html>` existir; uma função que perdia uma variável ao ser enviada para a página. Corrigi e rodei de novo.
- **Só por leitura de código:** o zoom do navegador junto com a letra grande (não há `font-size` em `px`), o `requestAnimationFrame` duplo da troca de tema e a ilustração da lista vazia no tema escuro (sem mudança).
- **Não deu para ver no modo headless:** as listas nativas de data, hora e `select` abertas (o `color-scheme: light` foi conferido nos campos) e a cor da barra do navegador no celular (`theme-color`).
- Os scripts e os arquivos de teste ficaram fora do projeto. Nenhum navegador nem servidor de teste ficou aberto no fim. No código da Agenda, mudei só a regra do problema 1 em `css/style.css`.

## Conferência manual (para o João)

1. **Celular de verdade (Chrome do Android):** toque em "Tema claro" e em "Letra grande", feche a aba e abra de novo: a Agenda já deve abrir clara e grande, sem piscar no escuro. Veja se a barra do navegador fica creme.
2. **Campos nativos no tema claro:** abra "Novo compromisso" e toque em Data e em Hora: o calendário e o relógio devem aparecer claros. Abra também a lista "Duração".
3. **Faixa da semana:** toque num dia com compromisso e veja a lista rolar até ele. Toque num dia "Livre": nada acontece.
4. **Leitor de tela** (NVDA ou TalkBack): ouvir "Tema claro, botão de alternância, não pressionado" e, depois de tocar, "pressionado"; "Hoje, 3 compromissos, botão"; e, depois de tocar num dia, o título dele ("Sex, 13/11 daqui a 4 dias, título nível 3").
5. **Zoom:** com a letra grande ligada, use Ctrl + e Ctrl − no computador e veja tudo crescer junto, sem rolagem para o lado.
6. **Depois do push:** abrir `https://joaosaccucci.github.io/agenda/` e conferir que não há erro no console.
