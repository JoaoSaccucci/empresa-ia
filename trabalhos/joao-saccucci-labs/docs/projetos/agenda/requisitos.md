# Requisitos: Agenda

## 1. Visão do produto

A **Agenda** é um site simples para anotar compromissos. A pessoa abre o site, vê os próximos compromissos agrupados por dia e consegue criar, editar e excluir cada um. É o primeiro projeto independente da João Saccucci Labs: tem repositório, site e README próprios (ver US30 a US38 nos requisitos da Labs), e as aulas do professor ficam na aba Aulas da Labs.

**Plano de evolução (aprovado pelo João em 2026-11-05):** antes de partir para back-end e banco de dados, a Agenda cresce no próprio navegador, focada em problemas que uma agenda comum não resolve bem.
- **Etapa 1 (MVP, entregue):** lista por dia, criar, editar, excluir, "Anteriores" e salvar no navegador.
- **Etapa 2 "nada cai no esquecimento":** cópia e importação dos dados, "Sair às...", "Feito" e pendências, itens "Sem data". Dividida em **Entrega 2a** e **Entrega 2b**.
- **Etapa 3 "organizar o tempo":** checklist "O que levar", hora de fim com aviso de conflito e de aperto, faixa dos próximos 7 dias, tema claro e letra grande. Dividida em **Entrega 3a** e **Entrega 3b** (seção 2).
- **Etapa 4 "captura rápida":** criar um compromisso escrevendo uma frase ("dentista amanhã às 10h"), que vira um rascunho do formulário para conferir antes de salvar. Dividida em **Entrega 4a** e **Entrega 4b** (seção 2).

- Repositório: `github.com/JoaoSaccucci/agenda` (só o código e o README).
- Site: `https://joaosaccucci.github.io/agenda/`.
- Estes requisitos, o design e os relatórios de teste ficam na Labs, em `trabalhos/joao-saccucci-labs/docs/projetos/agenda/`.
- A numeração é própria deste projeto: "Agenda US01", "Agenda US02"... Neste arquivo, "US01" sempre quer dizer "Agenda US01".

**Restrições técnicas**
- HTML, CSS e JavaScript puros, sem framework, sem bibliotecas, sem back-end e sem etapa de build.
- Uma página só (`index.html`), com `lang="pt-BR"`.
- Os dados ficam no `localStorage` do navegador de quem usa. Cada pessoa vê só a própria agenda, sem login.
- **Limitações aceitas pelo João:** os compromissos não sincronizam entre aparelhos ou navegadores e somem se o navegador for limpo. *(A partir da Etapa 2, a cópia em arquivo, US08 e US09, é o jeito de levar os dados para outro lugar e de se proteger da limpeza.)*
- Todas as chaves do `localStorage` começam com `agenda:`. O código **nunca** usa `localStorage.clear()`, porque a Agenda divide o mesmo `localStorage` com o site da Labs (mesmo endereço base `joaosaccucci.github.io`).
- Datas e horas seguem o relógio e o fuso do aparelho de quem usa.
- Precisa funcionar bem no celular, a partir de 360px de largura.
- Precisa funcionar publicado no GitHub Pages, com caminhos relativos.
- Nenhum dado sai do navegador: sem envio para a internet, sem notificações do navegador (ver seção 5).

**Direção visual** (quem detalha é o artista): visual **próprio**, mas da mesma família da Labs, com a mesma qualidade e o mesmo "jeito de estúdio". O João quer que a Agenda tenha personalidade própria: o artista tem liberdade para ousar na cor e no clima. O design fica em `docs/projetos/agenda/design.md`. As partes novas da Etapa 2 (janela "Seus dados", faixa de cópia, "Sair às", "Ficou pendente", "Sem data", situação em "Anteriores") seguem o conceito "quadro de partidas ao anoitecer" e são detalhadas pelo artista no mesmo arquivo (Entrega 2a: seção 12 do design). As partes novas da Etapa 3 (checklist, hora de fim, avisos de conflito e de aperto, faixa da semana, tema claro, letra grande e o lugar dos botões de aparência) também são detalhadas pelo artista no design. O tema escuro continua sendo o padrão; o tema claro é uma variação do mesmo conceito, não um visual novo. As partes novas da Etapa 4 (campo "Criar por frase" e a linha "Entendi" no formulário) também são detalhadas pelo artista, nos dois temas e com a letra grande.

---

## 2. User stories

### Etapa 1 (MVP)

> As mudanças que a Etapa 2 faz nestas stories estão na seção "Mudanças em stories da Etapa 1", depois da Etapa 2. O texto abaixo é o da Etapa 1 e continua valendo no que não foi mudado.

**Agenda US01: Lista dos próximos compromissos por dia**
Como usuário, quero ver os meus próximos compromissos agrupados por dia, para saber logo o que tenho pela frente.
- [ ] A tela principal mostra só os compromissos que **ainda não passaram** (regra "quando um compromisso passou", na seção 3).
- [ ] Os compromissos aparecem agrupados por dia, e só aparecem os dias que têm compromisso (nada de dias vazios).
- [ ] O título de cada dia é "Hoje", "Amanhã" ou o dia da semana abreviado com a data, no formato "Sex, 14/11". Se o dia for de outro ano, o ano aparece junto: "Sex, 14/11/2027".
- [ ] Do terceiro dia em diante, o título do dia mostra também "daqui a X dias" (ex.: "Sex, 14/11 · daqui a 3 dias"). "Hoje" e "Amanhã" não mostram essa contagem.
- [ ] *(Aprovado pelo João)* Ordem: os dias vêm do mais próximo para o mais distante. Dentro do mesmo dia, primeiro os compromissos de dia todo, depois os que têm hora, da mais cedo para a mais tarde. Com o mesmo horário (ou dois de dia todo), vale a ordem alfabética do título.
- [ ] Cada compromisso mostra: a hora (formato 24h, ex.: "09:30") ou o texto "Dia todo", o título e, quando preenchidos, o local e a observação. Campo opcional vazio não aparece e não deixa espaço vazio.
- [ ] Textos longos (título, local, observação) quebram linha e nunca causam rolagem horizontal.
- [ ] Tudo o que a pessoa digitou aparece como **texto**, nunca como HTML. Ex.: um título `<b>oi</b>` aparece exatamente assim, com os sinais `<` e `>`.
- [ ] Com a lista vazia (nenhum compromisso por vir), aparece a mensagem "Nenhum compromisso por vir" e um botão para criar um compromisso, que abre o formulário (US02).
- [ ] Há sempre um botão visível para criar um compromisso novo (sugestão de texto: "Novo compromisso").
- [ ] A lista se atualiza sozinha com a página aberta: *(aprovado pelo João)* ela é recalculada a cada minuto. Assim um compromisso que acabou de passar vai para "Anteriores" e, depois da meia-noite, "Amanhã" vira "Hoje".
- [ ] A lista usa HTML de lista (`ul`/`li` ou equivalente), e o título de cada dia é um título de seção, para leitores de tela navegarem por dia.

**Agenda US02: Criar um compromisso**
Como usuário, quero anotar um compromisso com título e data, e se eu quiser com hora, local e observação, para não esquecer.
- [ ] O botão "Novo compromisso" abre o formulário com o título "Novo compromisso".
- [ ] O formulário tem os campos, cada um com rótulo visível:
  - **Título** (obrigatório), texto de até 100 caracteres;
  - **Data** (obrigatória), campo de data do próprio navegador (`input type="date"`);
  - **Hora** (opcional), campo de hora do próprio navegador (`input type="time"`);
  - **Local** (opcional), texto de até 100 caracteres;
  - **Observação** (opcional), texto de várias linhas, até 500 caracteres.
- [ ] Os campos obrigatórios aparecem como obrigatórios em texto (ex.: "(obrigatório)" no rótulo), não só com cor ou asterisco.
- [ ] *(Aprovado pelo João)* A data já vem preenchida com o dia de hoje. A hora vem vazia.
- [ ] Perto do campo Hora, um texto curto avisa: "Deixe em branco para um compromisso do dia todo."
- [ ] Sem hora, o compromisso é salvo como **dia todo**.
- [ ] O formulário tem os botões "Salvar" e "Cancelar". Enter num campo de uma linha também salva.
- [ ] Espaços no começo e no fim do título, do local e da observação são removidos antes de salvar.
- [ ] Ao salvar com sucesso, o formulário fecha, o compromisso aparece no lugar certo da lista e um aviso curto é lido por leitores de tela (`aria-live="polite"`), ex.: "Compromisso salvo."
- [ ] *(Aprovado pelo João)* Pode criar compromisso com data ou hora que já passou. Ele vai direto para "Anteriores" (US06), e o aviso diz "Compromisso salvo em Anteriores."
- [ ] "Cancelar" fecha o formulário sem salvar nada.
- [ ] O compromisso continua lá depois de recarregar a página (US07).

**Agenda US03: Avisos do formulário quando falta informação**
Como usuário, quero saber na hora o que faltou preencher, para conseguir salvar sem adivinhar o erro.
- [ ] Se o título estiver vazio (ou só com espaços), nada é salvo e aparece, perto do campo, a mensagem "Digite um título."
- [ ] Se a data estiver vazia ou inválida, nada é salvo e aparece, perto do campo, a mensagem "Escolha uma data."
- [ ] Se faltarem os dois, as duas mensagens aparecem juntas.
- [ ] Ao tentar salvar com erro, o foco do teclado vai para o primeiro campo com problema.
- [ ] O campo com erro fica marcado com `aria-invalid="true"`, e a mensagem é ligada a ele por `aria-describedby`, para o leitor de tela ler o erro junto com o rótulo.
- [ ] O erro aparece em texto, não só pela cor da borda, com contraste AA.
- [ ] A mensagem some quando o campo é corrigido (ao digitar ou ao tentar salvar de novo).
- [ ] O que já foi digitado nos outros campos **não** é apagado quando aparece um erro.
- [ ] Os limites de tamanho dos campos de texto são respeitados no próprio campo (`maxlength`), sem mensagem de erro.
- [ ] As mensagens são do próprio site, iguais em qualquer navegador (o formulário usa `novalidate` e a checagem é feita em JS).

**Agenda US04: Editar um compromisso**
Como usuário, quero corrigir um compromisso já anotado, para mudar a data, a hora ou qualquer detalhe sem precisar apagar e criar de novo.
- [ ] Cada compromisso, na lista principal e em "Anteriores", tem um botão "Editar". O rótulo acessível inclui o título (ex.: "Editar Dentista").
- [ ] "Editar" abre **o mesmo formulário** da US02, com o título "Editar compromisso" e todos os campos preenchidos com os dados atuais.
- [ ] As regras de aviso da US03 valem do mesmo jeito.
- [ ] Ao salvar, o compromisso é atualizado (não é criado um novo) e vai para o lugar certo da lista. Se a nova data ou hora já passou, ele vai para "Anteriores"; se uma data em "Anteriores" for trocada por uma futura, ele volta para a lista principal.
- [ ] Apagar a hora transforma o compromisso em dia todo.
- [ ] "Cancelar" fecha sem mudar nada.
- [ ] Ao salvar, um aviso curto é lido por leitores de tela, ex.: "Compromisso atualizado."

**Agenda US05: Excluir com confirmação**
Como usuário, quero excluir um compromisso, mas com uma confirmação antes, para não perder nada por um toque errado.
- [ ] Cada compromisso, na lista principal e em "Anteriores", tem um botão "Excluir". O rótulo acessível inclui o título (ex.: "Excluir Dentista").
- [ ] Ao clicar, aparece uma confirmação com o texto "Excluir '<título>'? Essa ação não pode ser desfeita." e os botões "Excluir" e "Cancelar".
- [ ] "Excluir" apaga o compromisso de vez e um aviso é lido por leitores de tela, ex.: "Compromisso excluído."
- [ ] "Cancelar", a tecla Esc ou fechar a confirmação não apagam nada.
- [ ] Quando a confirmação abre, o foco vai para o botão "Cancelar" (a opção mais segura).
- [ ] O botão "Excluir" da confirmação tem aparência de ação perigosa, mas também diz em texto o que faz (não só pela cor).
- [ ] Depois de excluir, o foco vai para um lugar que faz sentido (o próximo compromisso da lista ou, se não houver, o botão "Novo compromisso"). Ele nunca se perde no topo da página.
- [ ] Se esse era o último compromisso por vir, aparece a mensagem de lista vazia da US01.

**Agenda US06: Seção "Anteriores"**
Como usuário, quero que os compromissos que já passaram saiam da frente, sem sumir, para a lista principal mostrar só o que vem pela frente e eu ainda poder consultar o que já foi.
- [ ] Os compromissos que já passaram (seção 3) ficam numa seção "Anteriores", abaixo da lista principal.
- [ ] A seção começa **recolhida** sempre que a página abre e é aberta por um botão com o texto "Anteriores" e a quantidade (ex.: "Anteriores (5)").
- [ ] O botão informa se está aberto ou fechado para leitores de tela (`aria-expanded`) e abre e fecha com clique, toque, Enter ou Espaço.
- [ ] Sem nenhum compromisso anterior, a seção não aparece.
- [ ] Dentro de "Anteriores", os compromissos ficam agrupados por dia, com os mesmos títulos de dia da US01 ("Ontem", "Ter, 11/11"...), mas sem "daqui a X dias".
- [ ] *(Aprovado pelo João)* Em "Anteriores", a ordem é do mais recente para o mais antigo (dia mais recente primeiro; dentro do dia, a mesma ordem da US01).
- [ ] Nada é apagado sozinho. Um compromisso só some se a pessoa excluir.
- [ ] Os compromissos de "Anteriores" podem ser editados e excluídos, como os outros.
- [ ] Quando um compromisso passa com a página aberta, ele vai para "Anteriores" sem recarregar, e a quantidade no botão é atualizada.

**Agenda US07: Compromissos salvos no navegador, com aviso**
Como usuário, quero que meus compromissos continuem lá quando eu voltar, e saber onde eles ficam guardados, para confiar na agenda e entender as limitações dela.
- [ ] Todo compromisso criado, editado ou excluído é salvo na hora no `localStorage`, na chave `agenda:compromissos` (formato na seção 3).
- [ ] Depois de recarregar a página ou fechar e abrir o navegador, a agenda mostra os mesmos compromissos.
- [ ] O rodapé mostra, sempre e em todas as situações da tela, o aviso discreto "Seus compromissos ficam salvos só neste navegador." Ele tem contraste AA e nunca cobre um compromisso ou um botão (inclusive a 360px).
- [ ] Se o `localStorage` estiver indisponível (bloqueado ou modo anônimo restrito), a agenda funciona na página e mostra o aviso "Não foi possível salvar neste navegador. Seus compromissos vão sumir ao fechar a página." Nenhum erro quebra a página.
- [ ] Se o `localStorage` estiver cheio e um compromisso não puder ser salvo, aparece o aviso "Não foi possível salvar o compromisso." O que já estava salvo não é apagado.
- [ ] Se o dado salvo estiver corrompido (não for um JSON válido no formato da seção 3), a agenda **não** apaga esse dado: ela copia o conteúdo para a chave `agenda:compromissos-corrompido`, começa com a lista vazia e mostra um aviso curto. Itens soltos com problema (sem título ou com data inválida) são ignorados, e os outros aparecem normalmente.
- [ ] O código não usa `localStorage.clear()` e não lê nem altera chaves que não comecem com `agenda:` (como as `jsl:` da Labs).

### Requisitos gerais da Etapa 1

**Celular a 360px**
- [ ] Tudo funciona de 360px até telas de desktop, sem rolagem horizontal e sem nada cortado.
- [ ] Botões e campos têm área de toque de pelo menos 44 × 44px.
- [ ] Os campos de texto têm letra de pelo menos 16px no celular (para o celular não dar zoom sozinho).
- [ ] O formulário e a confirmação de exclusão cabem na tela a 360px e rolam por dentro se for preciso.

**Teclado**
- [ ] Tudo pode ser feito só com o teclado (criar, editar, excluir, abrir "Anteriores"), com foco sempre visível e numa ordem lógica.
- [ ] Ao abrir o formulário, o foco vai para o campo Título. Ao fechar (Salvar ou Cancelar), o foco volta para o botão que abriu.
- [ ] Se o formulário ou a confirmação abrirem por cima da página (como uma janela), a tecla Esc fecha sem salvar, e o Tab fica dentro da janela enquanto ela estiver aberta. *(Sugestão: usar o elemento `dialog` do HTML.)*

**Acessibilidade**
- [ ] Os títulos da página seguem a ordem (`h1` com o nome da Agenda, depois os títulos de dia e de seção).
- [ ] Todo botão tem texto visível ou rótulo acessível. Ícones são decorativos para leitores de tela.
- [ ] Os avisos de salvar, atualizar e excluir são lidos por leitores de tela (`aria-live="polite"`), e o foco não pula sozinho por causa deles.
- [ ] Nada depende só de cor: dia todo, erros, ação perigosa e estado aberto/fechado têm texto.
- [ ] Animações respeitam `prefers-reduced-motion`.

**Contraste**
- [ ] Texto, botões, bordas de campo, foco e mensagens de erro têm contraste AA.

**Erros**
- [ ] Console sem erros, nenhum arquivo com 404, e mensagens amigáveis nos casos da US07.

**Geral**
- [ ] Nenhuma biblioteca. Só HTML, CSS e JavaScript puros.
- [ ] Funciona publicado no GitHub Pages, com caminhos relativos.
- [ ] O repositório `agenda` tem só o código e o README, que segue a US36 dos requisitos da Labs.

---

### Etapa 2 "nada cai no esquecimento"

*(Aprovada pelo João em 2026-11-05.)* Duas entregas, nesta ordem: a **2a** cria a cópia em arquivo **antes** de qualquer mudança no formato dos dados; a **2b** faz a migração para a versão 2 e traz as funções novas. Cada entrega passa pelo fluxo completo (artista, dev, testador, professor) e tem o seu relatório de teste (`testes/etapa-2a.md` e `testes/etapa-2b.md`).

#### Entrega 2a: cópia dos dados

*(Visual e textos da Entrega 2a: seção 12 do design, com as 6 decisões da artista aprovadas pelo João em 2026-11-05.)*

**Regra dos avisos na Entrega 2a** *(aprovada pelo João)*: enquanto a janela "Seus dados" estiver aberta, os avisos de baixar e de importar aparecem **dentro dela**, numa região de avisos própria (`aria-live="polite"`), e **não** no aviso flutuante. O motivo: a janela aberta com `showModal()` deixa o resto da página inerte, e o aviso flutuante ficaria escondido atrás dela e poderia não ser lido. Com as janelas fechadas, vale o aviso flutuante de sempre. A tabela completa de "onde aparece cada aviso" está na seção 12.6 do design.

**Agenda US08: Baixar uma cópia dos compromissos**
Como usuário, quero baixar um arquivo com todos os meus compromissos, para não perder nada se o navegador for limpo e para levar a agenda para outro aparelho.
- [ ] O cabeçalho tem o botão "Seus dados", com ícone de cilindro, à direita e **antes** do "Novo compromisso". Ordem do Tab: "Seus dados" → "Novo compromisso".
- [ ] Abaixo de 640px o botão mostra só o ícone, num círculo de 44 × 44px; a partir de 640px mostra ícone + "Seus dados". Em todas as larguras o nome acessível é "Seus dados" (o texto continua no HTML, escondido só da tela).
- [ ] A 360px o cabeçalho (ícone, "Agenda", "Seus dados" e "+ Novo") cabe numa linha, sem quebrar e sem rolagem horizontal.
- [ ] "Seus dados" abre uma janela (`showModal()`, Esc e "Fechar" fecham, Tab fica dentro, o foco volta para "Seus dados" ao fechar) com:
  - o título "Seus dados";
  - o texto "Seus compromissos ficam guardados só neste navegador. Baixe uma cópia de vez em quando para não perder nada e para levar a agenda para outro aparelho.";
  - a última cópia: "Última cópia: 05/11/2026" (data `DD/MM/AAAA`) ou, sem nenhuma cópia, "Você ainda não fez nenhuma cópia.";
  - os botões "Baixar cópia" e "Importar cópia" (US09), com a dica "Escolha um arquivo .json baixado pela Agenda." ligada ao "Importar cópia";
  - o botão "Fechar".
- [ ] Ao abrir a janela, o foco vai para "Baixar cópia". A região de avisos da janela começa vazia toda vez que a janela abre.
- [ ] "Baixar cópia" baixa um arquivo chamado `agenda-AAAA-MM-DD.json`, com a data de hoje do aparelho (ex.: `agenda-2026-11-05.json`).
- [ ] O arquivo segue o formato "Arquivo de cópia" da seção 3: tem `"app": "agenda"`, a `versao`, a data da exportação e **todos** os compromissos (próximos e anteriores; na Entrega 2b, também os sem data, feitos e pendentes).
- [ ] O arquivo é JSON válido, com recuo (fácil de ler num editor de texto), e os textos com acento aparecem corretos.
- [ ] O arquivo **não** inclui outras chaves (`agenda:compromissos-corrompido`, cópias de segurança, chaves `jsl:` da Labs).
- [ ] Depois de baixar pela janela:
  - a data e a hora da cópia são salvas em `agenda:ultimo-backup`;
  - a "Última cópia" da janela mostra a data nova;
  - o aviso "Cópia baixada." aparece **dentro da janela** e é lido por leitores de tela;
  - o foco **fica** no botão "Baixar cópia";
  - a faixa de lembrete (US10), se estiver na página, some.
- [ ] Sem nenhum compromisso, "Baixar cópia" não gera arquivo e aparece, dentro da janela, o aviso "Não há compromissos para copiar."
- [ ] Um aviso por vez: um aviso novo na janela substitui o anterior.
- [ ] Funciona no Chrome e no Edge do computador e no Chrome do Android. *(No iPhone o Safari pergunta onde guardar; isso é do sistema e é aceito.)*

**Agenda US09: Importar uma cópia (Juntar ou Substituir tudo)**
Como usuário, quero abrir um arquivo de cópia na Agenda, para recuperar meus compromissos ou trazer os de outro aparelho.
- [ ] "Importar cópia" (na janela "Seus dados") abre o seletor de arquivos do sistema, filtrando arquivos `.json`. Se a pessoa cancelar o seletor, nada acontece e o foco fica em "Importar cópia".
- [ ] Escolher o **mesmo** arquivo duas vezes seguidas funciona nas duas vezes.
- [ ] **Erros do arquivo:** nada muda, o aviso aparece **dentro da janela "Seus dados"** (em vermelho, com ícone e texto) e o foco fica em "Importar cópia":
  - mais de 5 MB: "Arquivo grande demais para ser uma cópia da Agenda.";
  - não é JSON válido ou não tem a lista `compromissos`: "Este arquivo não é uma cópia da Agenda.";
  - `versao` maior que a que a Agenda conhece: "Esta cópia é de uma versão mais nova da Agenda.";
  - nenhum item válido: "Nenhum compromisso válido nesta cópia."
- [ ] Cada item do arquivo é conferido com as regras dos campos da seção 3. Item com problema (sem título, data inválida, hora fora do formato `HH:MM`) é **ignorado**. Textos maiores que o limite são cortados no limite. Item sem `id` ganha um `id` novo. Dois itens com o mesmo `id` no arquivo: fica o de `atualizadoEm` mais recente.
- [ ] Com o arquivo lido e pelo menos um item válido, abre a janela "Importar cópia" **por cima** de "Seus dados", com:
  - o resumo "Esta cópia tem 12 compromissos.", a linha "2 itens com problema foram ignorados." (só se houver ignorados) e "Neste navegador há 8 compromissos.";
  - a pergunta "O que fazer com eles?";
  - o botão "Juntar", com a explicação "Acrescenta os da cópia e mantém os que já estão aqui. Nada é apagado.";
  - o botão "Substituir tudo" (contorno vermelho, com ícone e texto), com a explicação "Troca os 8 compromissos daqui pelos 12 da cópia.";
  - o botão "Cancelar".
- [ ] Na janela "Importar cópia" o foco começa em "Juntar". Ordem do Tab: Juntar → Substituir tudo → Cancelar. "Cancelar" ou Esc fecham **só** essa janela, não mudam nada, e o foco volta para "Importar cópia".
- [ ] **Singular, plural e zero** nos textos com número (tabela da seção 12.5 do design): "1 compromisso", "1 item com problema foi ignorado.", "Neste navegador há 1 compromisso." e "Neste navegador não há compromissos."
- [ ] **Juntar:** os compromissos com `id` novo são acrescentados; com `id` que já existe, fica a versão de `atualizadoEm` mais recente (empate: fica a que já estava no navegador). Nada que já existia é apagado. Resultado: "Cópia importada: 5 novos e 2 atualizados.", sem a parte que for zero ("Cópia importada: 5 novos."), no singular quando for 1 ("1 novo e 1 atualizado") e, com 0 e 0, "Cópia importada: nada mudou, você já tinha esses compromissos."
- [ ] **Substituir tudo:** abre a confirmação **por cima**, com o título "Substituir tudo?", o texto "Os 8 compromissos atuais serão trocados pelos 12 da cópia. Essa ação não pode ser desfeita." (com 1 atual: "O compromisso atual será trocado pelos 12 da cópia. Essa ação não pode ser desfeita.") e os botões "Substituir" (vermelho cheio, com ícone e texto) e "Cancelar" (com o foco). Esc ou "Cancelar" fecham só a confirmação, sem mudar nada, e o foco volta para "Substituir tudo".
- [ ] Ao confirmar "Substituir", o conteúdo atual de `agenda:compromissos` é guardado antes em `agenda:compromissos-antes-da-importacao` e a lista passa a ser só a da cópia. Resultado: "Cópia importada: 12 compromissos."
- [ ] *(Aprovado pelo João)* **Fim da importação** ("Juntar" ou "Substituir"): **todas** as janelas fecham, a lista aparece já redesenhada (cada compromisso no lugar certo, sem recarregar), o resultado aparece no **aviso flutuante** e é lido pelo leitor de tela, e o foco volta para o botão "Seus dados".
- [ ] Se o `localStorage` estiver cheio ou indisponível ao gravar a importação, nada muda no que estava salvo: a janela "Importar cópia" e a confirmação fecham, a pessoa volta para "Seus dados", aparece **dentro dela** o aviso "Não foi possível importar a cópia neste navegador." e o foco vai para "Importar cópia".
- [ ] Tudo o que vem do arquivo aparece como texto, nunca como HTML (mesma regra da US01), inclusive no resumo e nos avisos.
- [ ] Importar não muda a data da "Última cópia" (importar não é fazer cópia).
- [ ] Importar um arquivo baixado pela US08 num navegador vazio reproduz exatamente os mesmos compromissos (teste de "ida e volta").

**Agenda US10: Lembrete de fazer cópia**
Como usuário, quero ser lembrado de vez em quando de baixar uma cópia, para não descobrir que perdi tudo só quando for tarde.
- [ ] Toda criação, edição, exclusão e importação grava a data e a hora em `agenda:ultima-mudanca`. *(Na Entrega 2b, marcar "Feito", "Não vou fazer" e desfazer também gravam.)*
- [ ] Ao abrir a página, aparece a faixa de lembrete quando **as duas** condições valem:
  - a última cópia (`agenda:ultimo-backup`) tem mais de 30 dias; se nunca houve cópia, conta a partir do compromisso mais antigo (`criadoEm`);
  - houve mudança depois da última cópia (`agenda:ultima-mudanca` mais nova que ela; sem cópia nenhuma, basta existir compromisso).
- [ ] A faixa fica no topo do conteúdo, **depois** das faixas de problema da US07 (se houver alguma), e no fluxo da página (não é fixa).
- [ ] Conteúdo da faixa:
  - o rótulo em texto "Lembrete de cópia" (diferencia a faixa das de problema, além da cor e do ícone);
  - o texto "Sua última cópia foi há 42 dias." ou, sem cópia, "Você ainda não fez uma cópia dos seus compromissos.";
  - o subtexto "Baixe uma cópia para não perder nada se o navegador for limpo.";
  - os botões "Baixar cópia agora" e "Depois". O nome acessível de "Depois" é "Depois, lembrar daqui a 7 dias".
- [ ] "Baixar cópia agora" faz o mesmo download da US08 (mesmo arquivo, grava `agenda:ultimo-backup`), a faixa some e o aviso flutuante diz "Cópia baixada."
- [ ] "Depois" esconde a faixa e só deixa ela voltar depois de 7 dias (data guardada em `agenda:lembrete-backup-adiado-ate`). O aviso flutuante diz "Lembrete adiado por 7 dias."
- [ ] Baixar a cópia pela janela "Seus dados" (US08) também tira a faixa.
- [ ] *(Aprovado pelo João)* Quando a faixa some e o foco estava dentro dela, o foco vai para o título "Próximos compromissos". Ele nunca se perde no topo da página.
- [ ] Sem compromissos, ou com o `localStorage` indisponível, a faixa não aparece.
- [ ] A faixa aparece ao abrir a página sem roubar o foco e sem animação. Quem usa teclado chega nela pelo Tab logo depois do cabeçalho.
- [ ] A faixa é texto com contraste AA, não cobre compromissos nem botões a 360px (os botões quebram linha se não couberem) e funciona com o teclado.

#### Entrega 2b: migração, "Sair às...", "Feito", pendências e "Sem data"

*(Visual e textos da Entrega 2b: seção 13 do design, com as 5 decisões da artista aprovadas pelo João em 2026-11-06. Também aprovados pelo João, a partir do teste: os avisos "Compromisso salvo em Ficou pendente." (novo com "Me cobrar" e data passada), "Anotado em Sem data." (ao remarcar ou editar para "Ainda sem data") e "Compromisso atualizado." (Remarcar sem "Me cobrar" com data ainda passada, que vai para "Anteriores").)*

**Agenda US11: Atualização automática dos dados para a versão 2**
Como usuário, quero que meus compromissos antigos continuem funcionando quando a Agenda ganhar funções novas, sem eu precisar fazer nada e sem risco de perder dados.
- [ ] Ao abrir a página, se `agenda:compromissos` estiver na `versao: 1`, a Agenda **antes** guarda o texto original, sem nenhuma mudança, em `agenda:compromissos-v1` e **depois** grava os dados na `versao: 2` (formato na seção 3).
- [ ] Se `agenda:compromissos-v1` já existir, ela **não** é sobrescrita.
- [ ] Na conversão, cada compromisso mantém todos os campos e ganha os novos com o valor padrão: `antecedenciaMin: null`, `cobrar: false`, `status: "aberto"`, `concluidoEm: null`, `duracaoMin: null`, `itens: []`. O `atualizadoEm` **não** muda.
- [ ] Depois da conversão, a tela mostra exatamente os mesmos compromissos, nos mesmos lugares de antes. Os que já tinham passado aparecem em "Anteriores" com a situação "Passou" (nenhum vira pendência, porque `cobrar` é `false`).
- [ ] Abrir a página de novo não converte outra vez (dados já na `versao: 2` ficam como estão).
- [ ] Se a cópia em `agenda:compromissos-v1` não puder ser gravada (`localStorage` cheio), a Agenda **não** grava a versão 2: mostra os compromissos convertidos só na tela e a faixa "Não foi possível atualizar seus dados neste navegador. As mudanças não serão salvas." Nada do que estava salvo é apagado.
- [ ] Se `agenda:compromissos` tiver uma `versao` maior que 2, a Agenda não altera esse dado e mostra a faixa "Seus dados são de uma versão mais nova da Agenda. As mudanças não serão salvas."
- [ ] A regra de dado corrompido da US07 continua valendo.
- [ ] A importação (US09) aceita arquivos `versao: 1` e `versao: 2`. Um arquivo `versao: 1` é convertido do mesmo jeito antes de "Juntar" ou "Substituir tudo". A cópia baixada (US08) passa a sair na `versao: 2`.

**Agenda US12: "Sair às..." (tempo para sair)**
Como usuário, quero dizer quanto tempo preciso antes de um compromisso, para a agenda me mostrar a hora de sair de casa, e não só a hora em que eu tenho que chegar.
- [ ] O formulário (criar e editar) tem o grupo "Tempo para sair", com rótulo visível e as opções "Nenhum" (padrão), "15 min", "30 min", "45 min", "60 min" e "Outro". É um grupo de escolha única, acessível pelo teclado (sugestão: `fieldset` + `legend` + botões de opção).
- [ ] "Outro" mostra um campo de minutos com rótulo. O valor precisa ser um número inteiro de 1 a 720; senão nada é salvo e aparece, perto do campo, "Digite um número de minutos entre 1 e 720.", com as mesmas regras de aviso da US03.
- [ ] O grupo só vale para compromisso **com hora**. Sem hora (dia todo ou sem data), ele fica desativado com a dica "Escolha uma hora para usar o tempo para sair." Se a pessoa apagar a hora, o tempo para sair é apagado ao salvar (`antecedenciaMin: null`).
- [ ] Na lista principal, um compromisso com tempo para sair mostra, em texto, "Sair às 08:50" (hora do compromisso menos a antecedência).
- [ ] Se a hora de sair cair no dia anterior, aparece "Sair às 23:30 do dia anterior".
- [ ] *(Aprovado pelo João)* Dos 15 minutos antes da hora de sair até a hora de sair, o texto vira "Sair em 12 min" (minutos inteiros que faltam; com menos de 1 minuto, "Sair agora"), com destaque visual que **também** é texto.
- [ ] Depois da hora de sair, e até o compromisso passar, o texto vira "Hora de sair: 08:50 (já passou)".
- [ ] Esses textos se atualizam sozinhos, no máximo 1 minuto depois da mudança, sem recarregar. A mudança **não** é anunciada pelo leitor de tela a cada minuto (sem `aria-live` nesse texto).
- [ ] Em "Anteriores", "Ficou pendente" e "Sem data", o "Sair às" não aparece.
- [ ] Ao editar, a opção salva aparece marcada (um valor diferente de 15/30/45/60 aparece em "Outro" com o número).

**Agenda US13: Marcar como feito (e desfazer)**
Como usuário, quero marcar um compromisso como feito, para separar o que eu realmente fiz do que só passou.
- [ ] Todo compromisso com data e com `status: "aberto"` tem um botão "Feito", na lista principal, em "Ficou pendente" e em "Anteriores" (situação "Passou"). O nome acessível inclui o título (ex.: "Feito Dentista"; sugestão de texto escondido: "Marcar Dentista como feito").
- [ ] Ao marcar: `status: "feito"`, `concluidoEm` e `atualizadoEm` com a data e a hora atuais, salvo na hora, e o aviso "Marcado como feito." é lido por leitores de tela.
- [ ] *(Aprovado pelo João)* Pode marcar antes da hora (ex.: pagou o boleto antes do dia): o compromisso sai da lista principal e vai para "Anteriores", no grupo do dia dele.
- [ ] Em "Anteriores", **cada** compromisso mostra a situação em texto: "Feito", "Não vou fazer" ou "Passou". Nunca só pela cor.
- [ ] Um compromisso "Feito" ou "Não vou fazer" tem o botão "Desfazer" (nome acessível com o título, ex.: "Desfazer Dentista"). Ao desfazer: `status: "aberto"`, `concluidoEm: null`, o aviso "Desfeito." e o compromisso volta para o lugar que a regra da seção 3 indica (lista principal, "Ficou pendente" ou "Anteriores" com "Passou").
- [ ] Depois de marcar ou desfazer, o foco segue a mesma regra da US05: vai para o próximo compromisso da lista de onde o item saiu ou, se não houver, para o botão "Novo compromisso".
- [ ] Os botões do card (Editar, Excluir, Feito, Desfazer e os da US15) quebram linha se não couberem, sem rolagem horizontal a 360px, com 44px de área de toque.

**Agenda US14: "Me cobrar se eu não fizer" e a seção "Ficou pendente"**
Como usuário, quero que as coisas que eu realmente preciso fazer não sumam quando a data passa, para eu não esquecer um boleto ou uma tarefa só porque o dia virou.
- [ ] O formulário tem a caixa de marcar "Me cobrar se eu não fizer", com a dica "Se a data passar sem você marcar Feito, ele fica em 'Ficou pendente'." Vem desmarcada. Em item sem data, fica desativada.
- [ ] Na lista principal, um compromisso com a cobrança ligada mostra a marca em texto "Cobrar".
- [ ] *(Aprovado pelo João)* Um compromisso vira **pendência** quando: tem data, `cobrar: true`, `status: "aberto"` e já passou (regra da seção 3). Pendências **não** aparecem em "Anteriores".
- [ ] As pendências ficam na seção "Ficou pendente", com título de seção (`h2`) e a quantidade (ex.: "Ficou pendente (2)"), **acima** da lista principal. Ela fica sempre aberta e só aparece se tiver pelo menos uma pendência.
- [ ] Ordem: da mais antiga para a mais recente (data e hora). Cada pendência mostra quando era, em texto, com os títulos de dia da seção 3: ex.: "Era para: Ontem · 09:30" ou "Era para: Ter, 11/11 · Dia todo".
- [ ] Quando um compromisso com cobrança passa com a página aberta, ele vai para "Ficou pendente" sem recarregar (no máximo 1 minuto depois).
- [ ] Uma pendência **nunca** sai sozinha da seção: só sai pelas ações da US15, por edição (US04) ou por exclusão (US05).
- [ ] Sem cobrança, nada muda em relação à Etapa 1: o compromisso que passa vai para "Anteriores" com a situação "Passou".

**Agenda US15: Resolver uma pendência (Feito, Remarcar, Não vou fazer)**
Como usuário, quero decidir o que fazer com cada pendência, para limpar a lista sem perder o histórico.
- [ ] Cada pendência tem os botões "Feito", "Remarcar", "Não vou fazer" e "Excluir", cada um com o título no nome acessível.
- [ ] **Feito:** igual à US13. O compromisso vai para "Anteriores" com a situação "Feito".
- [ ] **Remarcar:** abre o formulário com o título "Remarcar compromisso", todos os campos preenchidos e o foco no campo Data. Ao salvar com data ou hora futura, o compromisso volta para a lista principal e o aviso é "Compromisso remarcado." Se a nova data ainda estiver no passado, ele continua pendente e o aviso é "Compromisso continua pendente." Se a pessoa marcar "Ainda sem data" (US16), ele vai para "Sem data".
- [ ] **Não vou fazer:** sem confirmação (dá para desfazer). `status: "nao-vou-fazer"`, `concluidoEm` com a data e a hora atuais, o compromisso vai para "Anteriores" com a situação "Não vou fazer" e o aviso é "Marcado como 'Não vou fazer'."
- [ ] **Excluir:** igual à US05.
- [ ] Depois de cada ação, o foco segue a regra da US13. Quando a última pendência é resolvida, a seção "Ficou pendente" some e o foco vai para o botão "Novo compromisso".

**Agenda US16: Anotar sem data e a seção "Sem data"**
Como usuário, quero anotar algo que eu ainda não sei quando vou fazer, para não precisar inventar uma data e para não esquecer de agendar depois.
- [ ] O formulário tem a caixa de marcar "Ainda sem data", perto do campo Data. Ela vem desmarcada (a data continua vindo com hoje, como na US02).
- [ ] Marcada, ela desativa e limpa Data e Hora, e desativa "Tempo para sair" (US12) e "Me cobrar" (US14). Desmarcada de novo, a Data volta com o dia de hoje.
- [ ] Com "Ainda sem data", só o título é obrigatório ("Escolha uma data." não aparece). O item é salvo com `data: null`, `hora: null`, `antecedenciaMin: null` e `cobrar: false`. Aviso: "Anotado em Sem data."
- [ ] Os itens sem data ficam na seção "Sem data", **entre** a lista principal e "Anteriores", com o mesmo comportamento de "Anteriores" (US06): começa recolhida sempre que a página abre, botão com o texto e a quantidade ("Sem data (3)"), `aria-expanded`, e não aparece se não houver nenhum.
- [ ] Ordem: do mais antigo para o mais novo (`criadoEm`).
- [ ] Cada item mostra, em vez da hora, o texto "Sem data", além do título, do local e da observação (quando preenchidos).
- [ ] Cada item tem os botões "Agendar", "Editar" e "Excluir", com o título no nome acessível.
- [ ] **Agendar:** abre o formulário com o título "Agendar compromisso", "Ainda sem data" desmarcada, a Data com o dia de hoje e o foco no campo Data. Ao salvar, o item vai para o lugar certo (lista principal, ou "Anteriores" se a data já passou) e o aviso é "Compromisso agendado."
- [ ] **Editar:** abre o formulário com "Ainda sem data" marcada e permite mudar o texto sem agendar.
- [ ] Itens sem data nunca "passam", nunca viram pendência e não têm o botão "Feito".
- [ ] A lista principal vazia continua mostrando "Nenhum compromisso por vir", mesmo se existirem itens sem data.

### Mudanças em stories da Etapa 1 (valem a partir da entrega indicada)

| Story | Entrega | O que muda |
|---|---|---|
| US01 | 2a | O cabeçalho ganha o botão "Seus dados" antes do "Novo compromisso" (US08). O título "Próximos compromissos" pode receber o foco pelo código (`tabindex="-1"`), para quando a faixa de lembrete some (US10). |
| US01 | 2b | A lista principal mostra só compromissos **com data**, com `status: "aberto"` e que ainda não passaram. Cada item pode mostrar também "Sair às..." (US12) e a marca "Cobrar" (US14), e tem o botão "Feito" (US13). A atualização a cada minuto passa a mover itens também para "Ficou pendente" e a atualizar o "Sair às". Ordem da página: faixas, "Ficou pendente", "Próximos compromissos", "Sem data", "Anteriores". |
| US02 | 2b | A **data deixa de ser obrigatória** quando "Ainda sem data" está marcada (US16); sem ela, continua obrigatória e vem com hoje. Campos novos: "Tempo para sair" (US12), "Me cobrar se eu não fizer" (US14) e "Ainda sem data" (US16). O rótulo de Data diz "(obrigatório)" só enquanto "Ainda sem data" está desmarcada. Novo aviso de salvar: "Anotado em Sem data." Item novo salvo com `status: "aberto"`. |
| US03 | 2b | "Escolha uma data." só aparece com "Ainda sem data" desmarcada. Novo erro do campo de minutos de "Outro" (US12), com as mesmas regras. O foco vai para o primeiro campo com problema, na ordem do formulário. |
| US04 | 2b | O formulário de edição mostra e salva os campos novos. Editar não muda o `status` (um item "Feito" continua "Feito"). Editar a data de uma pendência para o futuro tira ela de "Ficou pendente". O formulário também abre como "Remarcar compromisso" (US15) e "Agendar compromisso" (US16). |
| US05 | 2b | Vale também para "Ficou pendente" e "Sem data". A regra do foco depois de excluir vale dentro de cada seção. |
| US06 | 2b | "Anteriores" passa a ter: compromissos que passaram sem cobrança, ou com cobrança mas já resolvidos, **e** os marcados como "Feito" ou "Não vou fazer", mesmo com data futura. Cada item mostra a situação em texto (US13). Pendências não ficam aqui. Um item feito com data futura aparece no grupo do dia dele, com o título de dia normal ("Amanhã", "Sex, 14/11"), sem "daqui a X dias". |
| US07 | 2a / 2b | 2a: chaves novas `agenda:ultimo-backup`, `agenda:ultima-mudanca`, `agenda:lembrete-backup-adiado-ate` e `agenda:compromissos-antes-da-importacao`; a faixa de lembrete (US10) entra em `#faixas`, sempre depois das faixas de problema. 2b: `agenda:compromissos` passa para a `versao: 2` (US11), chave `agenda:compromissos-v1`, e itens com `data: null` são válidos. As limitações aceitas continuam; o rodapé continua com o mesmo aviso. |

### Requisitos gerais da Etapa 2

Os requisitos gerais da Etapa 1 (celular a 360px, teclado, acessibilidade, contraste, erros e geral) valem para **tudo** o que é novo, e também:
- [ ] As janelas novas ("Seus dados", "Importar cópia", confirmação "Substituir tudo?") usam `dialog` com `showModal()`: Esc fecha sem mudar nada, o Tab fica dentro, o foco começa no lugar indicado em cada story e volta para o botão que abriu.
- [ ] Janelas empilhadas (Entrega 2a): "Importar cópia" abre por cima de "Seus dados" e a confirmação abre por cima de "Importar cópia". Esc fecha **só** a janela de cima e o foco volta para o botão que a abriu.
- [ ] **Onde os avisos aparecem** *(aprovado pelo João)*: todo aviso é lido por leitores de tela sem tirar o foco do lugar.
  - Com a janela "Seus dados" aberta: na região de avisos **dentro da janela** (`aria-live="polite"`), em vermelho para erro e verde para sucesso, sempre com ícone e texto, um aviso por vez.
  - Com as janelas fechadas: no aviso flutuante (`role="status"`), como na Etapa 1. Isso vale para o resultado da importação, para os avisos da faixa de lembrete e para todos os avisos da Entrega 2b ("Marcado como feito.", "Desfeito." etc.).
- [ ] As seções novas têm títulos `h2` e os grupos de dia continuam com `h3`.
- [ ] "Lembrete de cópia", os tipos de aviso (erro, sucesso), "Substituir tudo", situação ("Feito", "Não vou fazer", "Passou"), "Cobrar", "Sem data" e "Sair em X min" são **texto**, nunca só cor ou ícone.
- [ ] O `localStorage` continua só com chaves `agenda:` (tabela da seção 3) e nunca usa `localStorage.clear()`.
- [ ] Nada é enviado para a internet: a cópia é um arquivo baixado e a importação lê um arquivo escolhido pela pessoa.

---

### Etapa 3 "organizar o tempo"

*(Aprovada pelo João em 2026-11-06.)* Duas entregas, nesta ordem: a **3a** mexe **dentro do compromisso** (checklist "O que levar", hora de fim e avisos de conflito e de aperto); a **3b** mexe na **tela inteira** (faixa dos próximos 7 dias, tema claro e letra grande). O tema claro fica para o fim de propósito: ele precisa dar cor a todas as partes da tela, inclusive às criadas na 3a e na faixa da semana. Cada entrega passa pelo fluxo completo (artista, dev, testador, professor) e tem o seu relatório de teste (`testes/etapa-3a.md` e `testes/etapa-3b.md`).

**Decisões aprovadas pelo João em 2026-11-06**
1. Divisão: **3a** = checklist "O que levar" + hora de fim, conflito e aperto; **3b** = faixa da semana + tema e letra.
2. Hora de fim: o formulário tem os **dois** campos ao mesmo tempo, lado a lado: "Termina às" (uma hora) e "Duração" (lista de escolha com 30 min / 1 h / 2 h / Outro, no mesmo padrão do "Tempo para sair"). Um preenche o outro sozinho. Só a duração é guardada (`duracaoMin`).
3. Aperto: conta como problema a **sobreposição** (um começa antes de o outro acabar) **ou** quando a **hora de sair** para o segundo cai antes do fim do primeiro (usa o "Tempo para sair" do segundo; sem ele, conta 15 minutos).
4. Checklist: os itens são marcados **direto no card**, sem abrir o formulário.
5. Faixa da semana: tocar num dia com compromisso leva a lista até esse dia; dia livre não faz nada.
6. Tema: só **Escuro** (padrão) e **Claro**, por um botão. Letra: **Normal** (padrão) e **Grande**.

**Decisões do PO (informadas ao João)**
- Os dados continuam na **versão 2**: `itens` e `duracaoMin` já existem nela, com valor padrão em todos os compromissos. Não há migração nova.
- A hora de fim só existe em compromisso com hora e termina no mesmo dia (até 23:59). Compromisso que passa da meia-noite fica fora do escopo.
- Um compromisso continua "passando" pela **hora de início**, como antes. A hora de fim não muda a regra de "passou", "Ficou pendente" nem "Sair às".
- Conflito e aperto aparecem só como texto no card, na lista "Próximos compromissos", e **nunca** impedem de salvar. Compromissos de dia todo e sem data ficam de fora.
- O checklist tem no máximo 20 itens de até 60 caracteres e funciona em qualquer compromisso, inclusive "Sem data". Marcar todos os itens **não** marca o compromisso como "Feito".
- Tema e letra ficam em `agenda:preferencias`, são aplicados antes de a página aparecer e **não** vão no arquivo de cópia.
- O lugar dos botões de aparência fica com a artista, porque o cabeçalho já está cheio a 360px.

#### Entrega 3a: checklist "O que levar", hora de fim, conflito e aperto

**Agenda US17: Checklist "O que levar" no formulário**
Como usuário, quero anotar dentro do compromisso a lista do que preciso levar, para não sair de casa esquecendo um documento ou um objeto.
- [ ] O formulário (criar, editar, remarcar e agendar) tem o grupo "O que levar", com título visível (sugestão: `fieldset` + `legend`), depois da Observação.
- [ ] O grupo tem o campo de texto "Novo item" (rótulo visível, `maxlength="60"`) e o botão "Adicionar".
- [ ] "Adicionar" (clique, toque ou **Enter** dentro do campo "Novo item") acrescenta o item no fim da lista, com espaços das pontas removidos, limpa o campo e deixa o foco nele. Enter nesse campo **não** salva o formulário (exceção à regra do Enter da US02).
- [ ] Campo vazio ou só com espaços: "Adicionar" não faz nada, sem mensagem de erro.
- [ ] Itens com o mesmo texto são permitidos.
- [ ] Cada item da lista do formulário mostra o texto e o botão "Remover" (nome acessível com o texto do item, ex.: "Remover Cartão do convênio"). Ao remover, o foco vai para o próximo item da lista ou, se não houver, para o campo "Novo item".
- [ ] Com 20 itens, o campo "Novo item" e o botão "Adicionar" ficam desativados e aparece a dica "Limite de 20 itens." Removendo um item, eles voltam.
- [ ] Cada adição e remoção é anunciada pelo leitor de tela sem tirar o foco do lugar (ex.: "Cartão do convênio adicionado.", "Cartão do convênio removido."), na região de avisos do próprio formulário.
- [ ] Ao **Salvar**, se o campo "Novo item" ainda tiver texto, ele é adicionado como item antes de salvar (nada do que foi digitado se perde).
- [ ] Os itens só são gravados ao **Salvar**. "Cancelar" ou Esc descartam as adições e remoções.
- [ ] Item novo é salvo com `feito: false`. Editar o compromisso mantém o `feito` dos itens que já existiam.
- [ ] O checklist funciona com ou sem data e com ou sem hora (inclusive com "Ainda sem data" marcada).
- [ ] O texto dos itens aparece sempre como texto, nunca como HTML (regra da US01).
- [ ] A 360px o grupo cabe sem rolagem horizontal; textos longos quebram linha; "Adicionar" e "Remover" têm 44px de área de toque.

**Agenda US18: Marcar os itens do checklist no card**
Como usuário, quero ir marcando no próprio compromisso o que já separei, para conferir tudo rápido na hora de sair.
- [ ] Um compromisso com pelo menos um item mostra, no card, o botão "O que levar (2 de 5)" (marcados de total). Com todos marcados: "O que levar: tudo pronto (5 de 5)". Sem itens, nada aparece.
- [ ] O botão abre e fecha a lista do checklist, com `aria-expanded`, por clique, toque, Enter ou Espaço. A lista começa **fechada** sempre que a página abre e continua aberta quando a tela é redesenhada (a cada minuto ou depois de marcar um item).
- [ ] Cada item da lista aberta é uma caixa de marcar (`input type="checkbox"`) com o texto do item como rótulo. A área de toque é de pelo menos 44px de altura.
- [ ] Item marcado aparece riscado **e** com a caixa marcada (não só pela cor).
- [ ] Marcar ou desmarcar grava na hora: muda o `feito` do item, o `atualizadoEm` do compromisso e `agenda:ultima-mudanca` (US10), e o contador do botão se atualiza.
- [ ] Depois de marcar, o foco **continua** na mesma caixa. Não aparece aviso flutuante (o próprio leitor de tela anuncia "marcado" ou "desmarcado").
- [ ] Se a gravação falhar (`localStorage` cheio), a caixa volta ao estado anterior e aparece o aviso "Não foi possível salvar o compromisso." (mesmo texto da US07).
- [ ] O checklist aparece igual em todas as seções: "Próximos compromissos", "Ficou pendente", "Sem data" e "Anteriores".
- [ ] Marcar itens não muda o `status` do compromisso, e marcar "Feito" no compromisso não muda os itens.
- [ ] A 360px a lista não causa rolagem horizontal e textos longos quebram linha.

**Agenda US19: Hora de fim ("Termina às" e "Duração")**
Como usuário, quero dizer até que horas vai um compromisso, para enxergar quanto tempo ele ocupa no meu dia.
- [ ] O formulário tem, logo depois do campo Hora, o grupo "Hora de fim" com dois campos lado a lado, cada um com rótulo visível:
  - **"Termina às"**: campo de hora do próprio navegador (`input type="time"`), vazio por padrão;
  - **"Duração"**: lista de escolha (`select`) com as opções "Sem hora de fim" (padrão), "30 min", "1 h", "2 h" e "Outro".
- [ ] "Outro" mostra o campo "Minutos" (com rótulo), que aceita um número inteiro de 1 a 1439.
- [ ] A 360px os dois campos podem ficar um embaixo do outro (a artista decide), sem rolagem horizontal.
- [ ] **Um campo preenche o outro**, assim que o valor muda (sem precisar salvar):
  - mudar "Termina às" para uma hora **depois** da Hora: a Duração passa a ser a diferença. Se for 30, 60 ou 120 minutos, fica marcada a opção "30 min", "1 h" ou "2 h"; senão fica "Outro" com o número de minutos (ex.: 09:00 até 10:30 → "Outro", 90);
  - apagar "Termina às", ou colocar uma hora igual ou antes da Hora: a Duração volta para "Sem hora de fim";
  - escolher "30 min", "1 h" ou "2 h", ou digitar um número válido em "Outro": "Termina às" passa a ser Hora + duração (ex.: 09:00 + "1 h" → 10:00). Se o resultado passar de 23:59, "Termina às" fica vazio;
  - escolher "Sem hora de fim", ou "Outro" com o campo "Minutos" vazio ou inválido: "Termina às" fica vazio.
- [ ] **Mudar a Hora** (continuando com hora) **mantém a duração** e recalcula "Termina às" (ex.: 09:00 a 10:00, Hora muda para 14:00 → "Termina às" vira 15:00). Se o novo fim passar de 23:59, "Termina às" fica vazio.
- [ ] **Sem Hora** (campo Hora apagado ou "Ainda sem data" marcada): "Termina às", Duração e "Minutos" ficam vazios e desativados, com a dica "Escolha uma hora para usar a hora de fim." Ao salvar, `duracaoMin: null`. Se a Hora voltar a ser preenchida, os dois campos voltam vazios ("Sem hora de fim").
- [ ] **Ao salvar**, a duração é decidida assim (o que for guardado é só o `duracaoMin`):
  - "Termina às" preenchido e depois da Hora: `duracaoMin` = diferença em minutos;
  - "Termina às" preenchido e igual ou antes da Hora: nada é salvo e aparece, perto de "Termina às", "A hora de fim precisa ser depois da hora de início.";
  - "Termina às" vazio e Duração com valor que passa de 23:59: nada é salvo e aparece, perto da Duração, "Com essa duração, o compromisso passaria da meia-noite. Escolha uma duração menor.";
  - "Outro" com "Minutos" vazio, não inteiro ou fora de 1 a 1439: nada é salvo e aparece, perto do campo, "Digite um número de minutos entre 1 e 1439.";
  - "Sem hora de fim" e "Termina às" vazio: `duracaoMin: null`.
- [ ] Os três erros seguem as regras de aviso da US03 (`aria-invalid`, `aria-describedby`, foco no primeiro campo com problema, na ordem do formulário, e o que foi digitado não se perde).
- [ ] **Ao editar**, um compromisso com `duracaoMin` abre com "Termina às" calculado e a Duração na opção certa (30, 60 ou 120 na opção; outro valor em "Outro" com o número).
- [ ] **No card**, em todas as seções, um compromisso com hora de fim mostra o intervalo no lugar da hora: "09:30 – 10:30". Para leitores de tela, o intervalo é lido como "das 09:30 às 10:30" (sugestão: texto escondido). Sem hora de fim, continua só "09:30".
- [ ] A hora de fim **não** muda quando o compromisso "passou" (continua valendo a hora de início, seção 3), nem a ordem da lista, nem o "Sair às" (US12).

**Agenda US20: Aviso de conflito e de aperto**
Como usuário, quero ser avisado quando dois compromissos do mesmo dia se atropelam ou não me dão tempo de ir de um para o outro, para reorganizar antes de virar problema.
- [ ] A Agenda compara os compromissos **do mesmo dia** que têm hora e `status: "aberto"` (regras completas em "Conflito e aperto", na seção 3). Compromissos de dia todo, sem data, "Feito" e "Não vou fazer" ficam de fora.
- [ ] **Conflito:** o segundo compromisso começa antes de o primeiro acabar, ou os dois começam no mesmo minuto. O card do segundo mostra, em texto:
  - "Conflito: Dentista vai até 10:30." (quando o primeiro tem hora de fim);
  - "Conflito: mesmo horário de Dentista." (quando os dois começam no mesmo minuto).
- [ ] **Aperto:** não há conflito, mas a hora de sair para o segundo (hora dele menos o "Tempo para sair"; sem "Tempo para sair", menos 15 minutos) cai **antes** do fim do primeiro. O card do segundo mostra, em texto: "Aperto: sair às 10:15, mas Dentista vai até 10:30." Se a hora de sair for exatamente igual ao fim do primeiro, **não** é aperto.
- [ ] Um compromisso **sem hora de fim** só gera conflito com outro que comece no mesmo minuto; ele nunca gera aperto.
- [ ] O aviso aparece **só no card do segundo** (o que começa depois; no mesmo minuto, o que vem depois na ordem da US01), e só na lista "Próximos compromissos". O primeiro pode estar em qualquer seção (ex.: já passou, mas ainda não acabou).
- [ ] Se o segundo tiver problema com mais de um compromisso, aparece **um** aviso só: conflito vem antes de aperto; entre dois do mesmo tipo, vale o primeiro na ordem da US01.
- [ ] "Conflito" e "Aperto" são texto, com ícone e cor que **não** são a única forma de entender (contraste AA). O texto do título do outro compromisso aparece como texto, nunca como HTML.
- [ ] O aviso **não** impede de salvar e não abre janela: ele só aparece no card.
- [ ] Os avisos se atualizam depois de criar, editar, excluir, importar, marcar "Feito", desfazer e na atualização de cada minuto. Eles **não** são anunciados a cada minuto pelo leitor de tela (sem `aria-live` nesse texto).
- [ ] Mudar o horário ou a duração de um dos dois para resolver o problema faz o aviso sumir na hora.
- [ ] A 360px o aviso quebra linha sem rolagem horizontal.

#### Entrega 3b: faixa da semana, tema claro e letra grande

**Agenda US21: Faixa dos próximos 7 dias**
Como usuário, quero ver de relance como está a minha semana, para saber quais dias estão cheios e quais estão livres.
- [ ] A página tem a faixa "Próximos 7 dias", com título de seção (`h2`), **depois** de "Ficou pendente" e **antes** de "Próximos compromissos".
- [ ] A faixa mostra 7 dias: hoje e os 6 seguintes, em ordem, como uma lista (`ul`/`li`).
- [ ] Cada dia mostra, em texto:
  - o nome: "Hoje", "Amanhã" ou o dia da semana abreviado com o dia do mês (ex.: "Sex 14"; a artista pode ajustar o formato);
  - a quantidade: "1 compromisso", "3 compromissos" ou "Livre".
- [ ] A quantidade conta só o que aparece em "Próximos compromissos" naquele dia (com data, `status: "aberto"` e que ainda não passou), **incluindo** os de dia todo. Hoje não conta o que já passou.
- [ ] Dia livre é diferente do dia ocupado pelo **texto** "Livre", não só pela cor.
- [ ] **Dia com compromisso** é um botão. Ao tocar (clique, toque, Enter ou Espaço), a página rola até o grupo desse dia na lista "Próximos compromissos" e o foco vai para o título do dia (`h3` com `tabindex="-1"`). Com `prefers-reduced-motion`, a rolagem é sem animação.
- [ ] O nome acessível do botão diz o dia e a quantidade (ex.: "Hoje, 2 compromissos").
- [ ] **Dia livre** não é botão, não recebe foco e não faz nada ao ser tocado.
- [ ] A faixa aparece sempre, mesmo com a lista vazia (aí os 7 dias aparecem como "Livre").
- [ ] A faixa se atualiza sem recarregar: depois de criar, editar, excluir, importar, marcar "Feito" e desfazer, e a cada minuto (um compromisso que passou sai da contagem; depois da meia-noite, os dias andam um para a frente).
- [ ] A 360px os 7 dias cabem **sem rolagem horizontal** (podem quebrar em mais de uma linha; a artista decide) e os botões têm 44px de área de toque.

**Agenda US22: Tema claro e escuro**
Como usuário, quero trocar a Agenda para um tema claro, para ler melhor de dia ou em lugares bem iluminados.
- [ ] A página tem o botão "Tema claro", que liga e desliga o tema claro e informa o estado com `aria-pressed` ("true" = tema claro ligado). O tema padrão é o **Escuro** (o de hoje).
- [ ] O lugar do botão é definido pela artista (o cabeçalho já está cheio a 360px). Ele fica visível em todas as situações da tela (inclusive com a lista vazia), sem cobrir compromissos nem botões, e funciona com o teclado.
- [ ] Ao trocar, a página inteira muda de tema na hora, sem recarregar, e o foco continua no botão.
- [ ] O tema claro cobre **todas** as partes: cabeçalho, faixas, seções, cards, checklist, avisos de conflito e de aperto, faixa da semana, formulário, todas as janelas, avisos flutuantes, erros e foco.
- [ ] Nos dois temas, texto, botões, bordas de campo, foco, erros e marcas ("Cobrar", "Conflito", "Aperto", situações) têm contraste AA.
- [ ] Os campos nativos de data e hora e a barra de rolagem seguem o tema (sugestão: propriedade CSS `color-scheme`).
- [ ] A escolha é guardada em `agenda:preferencias` (formato na seção 3) e vale ao reabrir a página.
- [ ] O tema é aplicado **antes** de a página aparecer: ao abrir com o tema claro, a tela nunca pisca no escuro. *(Sugestão: um script pequeno no `head` que lê `agenda:preferencias`.)*
- [ ] Se `agenda:preferencias` não existir, estiver corrompida ou o `localStorage` estiver indisponível, vale o tema escuro, sem erro no console e sem aviso. Com o `localStorage` indisponível, a troca funciona enquanto a página estiver aberta.
- [ ] Trocar o tema **não** grava `agenda:ultima-mudanca` (não é mudança nos compromissos) e não aparece no arquivo de cópia (US08).

**Agenda US23: Letra grande**
Como usuário, quero aumentar o tamanho da letra da Agenda, para ler com conforto sem precisar dar zoom.
- [ ] A página tem o botão "Letra grande", no mesmo lugar do botão de tema, que liga e desliga a letra grande e informa o estado com `aria-pressed`. O padrão é a letra **Normal**.
- [ ] Ligada, **todo** o texto da Agenda (inclusive formulário, janelas, avisos e faixa da semana) fica cerca de 25% maior que na letra Normal.
- [ ] Com a letra grande, a 360px, não há rolagem horizontal e nada fica cortado. *(Exceção à US08: o cabeçalho pode quebrar em duas linhas com a letra grande.)*
- [ ] A letra grande funciona junto com qualquer um dos dois temas.
- [ ] A escolha é guardada em `agenda:preferencias`, é aplicada antes de a página aparecer e segue as mesmas regras de falha da US22 (padrão: letra Normal).
- [ ] O zoom do próprio navegador continua funcionando junto com a letra grande (tamanhos em `rem`, não em `px` fixos para o texto).
- [ ] Trocar a letra **não** grava `agenda:ultima-mudanca` e não aparece no arquivo de cópia.

### Mudanças em stories anteriores (Etapa 3)

| Story | Entrega | O que muda |
|---|---|---|
| US01 | 3a | O card pode mostrar o intervalo "09:30 – 10:30" (US19), o botão "O que levar (2 de 5)" com a lista (US18) e o aviso de conflito ou de aperto (US20). A atualização a cada minuto também atualiza os avisos de conflito e de aperto. |
| US01 | 3b | A faixa "Próximos 7 dias" (US21) entra entre "Ficou pendente" e "Próximos compromissos". Ordem da página: faixas, "Ficou pendente", "Próximos 7 dias", "Próximos compromissos", "Sem data", "Anteriores". Os títulos de dia da lista principal (`h3`) podem receber o foco pelo código (`tabindex="-1"`). |
| US02 | 3a | Campos novos: "Termina às" e "Duração" (US19), depois da Hora, e o grupo "O que levar" (US17), depois da Observação. Enter no campo "Novo item" adiciona o item e **não** salva. Item novo salvo com `duracaoMin` e `itens` conforme o formulário. |
| US03 | 3a | Erros novos da US19 ("A hora de fim precisa ser depois da hora de início.", "Com essa duração, o compromisso passaria da meia-noite. Escolha uma duração menor." e "Digite um número de minutos entre 1 e 1439."), com as mesmas regras. |
| US04 | 3a | O formulário de edição mostra e salva a hora de fim e o checklist. Os itens já marcados continuam marcados. |
| US06 | 3a | Os cards de "Anteriores" mostram o intervalo da hora de fim e o checklist, mas nunca o aviso de conflito ou de aperto. |
| US07 | 3b | Chave nova `agenda:preferencias` (seção 3). Os compromissos continuam na `versao: 2`. |
| US08 / US09 | 3a | O arquivo de cópia continua na `versao: 2` e passa a levar `duracaoMin` e `itens` preenchidos. Na importação, esses campos são conferidos pelas regras da seção 3; um valor fora da regra vira o padrão (`null` ou `[]`) sem descartar o compromisso. Arquivos da Etapa 2 continuam sendo importados. `agenda:preferencias` **não** vai no arquivo. |
| US12 | 3a | O "Tempo para sair" do segundo compromisso é usado no aviso de aperto (US20). |
| US16 | 3a | "Ainda sem data" também desativa e limpa "Termina às" e "Duração". O checklist continua disponível. |

### Requisitos gerais da Etapa 3

Os requisitos gerais das Etapas 1 e 2 valem para **tudo** o que é novo, e também:
- [ ] "O que levar", "tudo pronto", "Conflito", "Aperto", "Livre" e o estado dos botões "Tema claro" e "Letra grande" são **texto** (ou `aria-pressed` / `aria-expanded`), nunca só cor ou ícone.
- [ ] O formulário, mais comprido por causa da hora de fim e do checklist, cabe na tela a 360px e rola por dentro.
- [ ] Tudo o que é novo funciona só com o teclado, com foco visível nos dois temas.
- [ ] Os compromissos continuam na `versao: 2`: dados salvos pela Etapa 2 abrem sem migração e sem perder nada.
- [ ] O `localStorage` continua só com chaves `agenda:` (tabela da seção 3) e nunca usa `localStorage.clear()`.
- [ ] Nada é enviado para a internet.

---

### Etapa 4 "captura rápida"

*(Aprovada pelo João em 2026-11-09.)* A pessoa escreve uma frase como "dentista amanhã às 10h" num campo da página e a Agenda abre o formulário já preenchido, como um **rascunho**: nada é salvo sem a pessoa conferir e apertar "Salvar". A frase é entendida só com regras em JavaScript puro (expressões regulares), **sem** inteligência artificial, sem servidor, sem chave de API e sem biblioteca. Duas entregas, nesta ordem: a **4a** cria o campo e entende **título, data e hora**; a **4b** entende o resto do formulário (**hora de fim, tempo para sair, "O que levar" e local**). Cada entrega passa pelo fluxo completo (artista, dev, testador, professor) e tem o seu relatório de teste (`testes/etapa-4a.md` e `testes/etapa-4b.md`).

**Decisões aprovadas pelo João em 2026-11-09**
1. Lugar: um campo fixo na página, logo abaixo da barra "Aparência", com o botão "Criar". Enter no campo da frase também abre o formulário.
2. Divisão: **4a** = título, data e hora; **4b** = hora de fim (duração ou "das 10h às 11h"), tempo para sair, "levar RG" para o checklist e local com "no"/"na".
3. Datas da 4a: "hoje", "amanhã", "depois de amanhã", dias da semana (por extenso e abreviados, ex.: "sexta", "sex"), "dia 15" e "15/11".
4. Datas relativas: sempre a **próxima no futuro** ("sexta" numa sexta é hoje se a hora ainda não passou, senão a sexta seguinte; "dia 5" que já passou vira o dia 5 do mês seguinte). Regra completa na seção 3.
5. Horas: "10h", "10h30", "10:30", "às 10" (10:00), "meio-dia", "meia-noite" e "da manhã/da tarde/da noite" ("8 da noite" → 20:00). Formato 24h. A Agenda **não adivinha** a tarde: "às 3" é 03:00.
6. Sem data e sem hora → "Ainda sem data". Com hora e sem data → **hoje**, se a hora ainda não passou; se já passou, **amanhã** (ajustado pela D1).
7. No formulário aberto, uma linha no topo mostra o que foi entendido, ex.: "Entendi: Amanhã · 10:00 · título 'Dentista'".
8. Nada entendido → o formulário abre com a frase inteira no título e a dica "Não encontrei data nem hora. Confira os campos."

**Decisões do PO (informadas ao João)**
- Os dados continuam na **versão 2**, sem migração e sem chave nova no `localStorage`. A frase **não** é guardada em lugar nenhum (histórico de frases está fora do escopo).
- **Um número sozinho nunca vira dia nem hora.** Ele só conta junto de "dia", "/", "h", ":", "às" ou "da manhã/tarde/noite" (e, na 4b, dentro de "das ... às ...", "por ..." e "sair ... antes"). Assim "comprar 2 pães", "aula 3" e "Rua 15" continuam no título. Tabela completa na seção 3.
- **Só sai do título o que virou campo.** Um pedaço que não foi usado (uma segunda data, uma duração sem hora, uma data que não existe) fica no título como foi digitado, para nada sumir sem a pessoa ver.
- **Dois pedaços do mesmo tipo** (duas datas, duas horas): vale o **primeiro** da frase, da esquerda para a direita. O outro fica no título.
- **Título vazio** (frase só com data e hora, ex.: "amanhã 10h"): o formulário abre com o erro "Digite um título." da US03 **já visível** e o foco no campo Título.
- **Data que não existe** ("31/02"): o campo Data abre **vazio** e aparece o aviso "A data 31/02 não existe. Escolha uma data." A Agenda nunca troca sozinha por outra data.
- **Na 4b, nada fora dos limites é salvo:** hora de fim até 23:59 (US19), tempo para sair de 1 a 720 minutos (US12), checklist com até 20 itens de até 60 caracteres (US17). Valor fora do limite abre o formulário com o erro de sempre já visível; no checklist, que não tem mensagem de erro, o item é cortado em 60 caracteres e o que passar de 20 itens fica de fora, com aviso.
- **"levar" e "no"/"na" no começo da frase ficam no título** ("Levar o carro na oficina amanhã" → título "Levar o carro").
- **Riscos aceitos** (a linha "Entendi" mostra o resultado e a pessoa corrige antes de salvar): "1/2" vira a data 01/02 ("comprar 1/2 kg de carne"); " e " separa itens do checklist ("levar pão e manteiga" → dois itens).
- Para o testador conferir as tabelas com um "agora" fixo, a análise da frase fica numa função sem tela (US25).

**Decisões D1 a D4, aprovadas pelo João em 2026-11-09** (todas na opção recomendada pelo PO)
- **D1:** hora sem data que **já passou** hoje ("reunião 10h" escrita às 14:00) vai para **amanhã**. Se a hora ainda não passou (inclusive a hora exata de agora, pela regra "quando um compromisso passou"), fica hoje.
- **D2:** "ter" e "dom" também são palavras comuns ("ter aula", "dom"). Eles só contam como dia da semana com uma palavra de ligação antes ("na ter", "no dom") ou com uma hora logo depois ("ter 10h", "dom às 9").
- **D3:** "próxima sexta", "esta sexta" e "nesta sexta" valem o mesmo que "sexta" (a próxima no futuro).
- **D4:** risco aceito: "no"/"na" também aparecem em frases que não são lugar ("pensar na vida amanhã" → local "Vida"); a pessoa vê na linha "Entendi" e corrige antes de salvar.

#### Entrega 4a: campo da frase, título, data e hora

**Agenda US24: Campo "Criar por frase"**
Como usuário, quero escrever um compromisso numa frase só, do jeito que eu falaria, para anotar rápido sem preencher campo por campo.
- [ ] A página tem o campo "Criar por frase", logo **abaixo da barra "Aparência"** e antes das faixas (`#faixas`). Ele aparece sempre, em todas as situações da tela (lista vazia, `localStorage` indisponível, com ou sem faixas), e não é fixo (rola com a página).
- [ ] O campo tem o rótulo visível "Criar por frase", é de texto (`input type="text"`, `maxlength="200"`, `autocomplete="off"`) e mostra o exemplo "Ex.: dentista amanhã às 10h" dentro dele (o exemplo não substitui o rótulo).
- [ ] A dica "Escreva o que é, o dia e a hora. Você confere antes de salvar." fica perto do campo e ligada a ele por `aria-describedby`.
- [ ] Ao lado do campo fica o botão "Criar" (a 360px ele pode ir para baixo do campo; a artista decide).
- [ ] "Criar" (clique, toque, Enter ou Espaço no botão) ou **Enter dentro do campo** abre o formulário já preenchido com o que foi entendido (US25 a US28). **Nada é salvo** nesse momento.
- [ ] Campo vazio ou só com espaços: "Criar" e Enter não fazem nada, sem mensagem de erro, e o foco fica no campo (mesma regra do "Adicionar" da US17).
- [ ] O formulário abre no modo de criar, com o título "Novo compromisso". "Salvar" grava do mesmo jeito que o botão "Novo compromisso" (US02), com os mesmos avisos ("Compromisso salvo.", "Compromisso salvo em Anteriores.", "Anotado em Sem data.").
- [ ] Depois de **Salvar**, o campo da frase fica vazio e o foco volta para ele (pronto para a próxima frase).
- [ ] Depois de **Cancelar** ou Esc, nada é salvo, a frase **continua** no campo (para a pessoa ajustar e tentar de novo) e o foco volta para ele.
- [ ] Se a gravação falhar (`localStorage` cheio), vale a US07: o aviso "Não foi possível salvar o compromisso." aparece dentro do formulário, ele continua aberto e a frase continua no campo.
- [ ] A frase aparece sempre como texto, nunca como HTML (regra da US01), no formulário e na linha "Entendi".
- [ ] A frase não é guardada: abrir o formulário e cancelar não grava nada no `localStorage` e não muda `agenda:ultima-mudanca`.
- [ ] O botão "Novo compromisso" continua como antes: formulário vazio, sem a linha "Entendi".

**Agenda US25: Entender a data da frase**
Como usuário, quero escrever o dia do jeito que eu falo ("amanhã", "sexta", "dia 15"), para não precisar abrir o calendário.
- [ ] A Agenda reconhece, sem diferença entre maiúsculas e minúsculas e com ou sem acento (regras completas em "Captura rápida", na seção 3):
  - "hoje", "amanhã" e "depois de amanhã";
  - os dias da semana por extenso ("segunda", "segunda-feira", "terça", "quarta", "quinta", "sexta", "sábado", "domingo") e abreviados ("seg", "ter", "qua", "qui", "sex", "sáb", "dom", com ou sem ponto), com a regra de "ter" e "dom" da seção 3 (D2);
  - "dia 15" (dia do mês, de 1 a 31);
  - "15/11" (dia/mês) e "15/11/2027" (com o ano de 4 dígitos).
- [ ] As palavras de ligação logo antes da data saem junto com ela ("na sexta", "no dia 15", "para amanhã", "até sexta", "em 15/11", "próxima sexta"; lista na seção 3).
- [ ] **Sempre a próxima no futuro:** dia da semana, "dia 15" e "15/11" sem ano viram a próxima data que ainda não passou, usando a hora entendida e a regra "quando um compromisso passou" da seção 3. Ex.: numa quinta às 14:00, "quinta 15h" é hoje e "quinta 10h" é a quinta da semana seguinte.
- [ ] "hoje", "amanhã", "depois de amanhã" e datas com ano são usadas como estão, mesmo se já passaram (ao salvar, o compromisso vai para "Anteriores", como na US02).
- [ ] **Data que não existe** ("31/02", "31/04", "0/11", "15/13", "29/02/2027"): o campo Data abre vazio, "Ainda sem data" fica desmarcada, o texto fica no título e aparece o aviso "A data 31/02 não existe. Escolha uma data." (com a data como foi digitada). Ao tentar salvar sem escolher, vale o erro "Escolha uma data." da US03.
- [ ] "dia" com um número fora de 1 a 31 ("dia 32") não é data e fica no título, sem aviso.
- [ ] Um número sozinho nunca vira data ("aula 3 sexta" → data: sexta; título: "Aula 3").
- [ ] Com mais de uma data na frase, vale a primeira; as outras ficam no título.
- [ ] Sem nenhuma data, mas com hora: a Data é **hoje** se a hora ainda não passou e **amanhã** se já passou (decisão 6 e D1). Sem data e sem hora: "Ainda sem data" vem marcada (US16), com a dica da US28.
- [ ] A análise da frase fica numa função sem tela, que recebe a frase e o "agora" e devolve o resultado (sugestão: `entenderFrase(frase, agora)` num arquivo novo `js/frase.js`, carregado depois de `js/datas.js`). Assim o testador confere as tabelas de frases no console com o "agora" fixo, sem mudar o relógio do computador.

**Agenda US26: Entender a hora da frase**
Como usuário, quero escrever a hora do jeito que eu falo ("10h", "às 10", "8 da noite"), para não precisar mexer no campo de hora.
- [ ] A Agenda reconhece, sem diferença entre maiúsculas e minúsculas e com ou sem acento: "10h", "10h30", "10:30", "às 10" e "às 10h" (10:00), "às 10 horas", "meio-dia" (12:00), "meia-noite" (00:00), com ou sem hífen, e um horário com "da manhã", "da tarde" ou "da noite" ("8 da noite" → 20:00; "7h30 da manhã" → 07:30). Tabela de conversão na seção 3.
- [ ] As palavras de ligação logo antes da hora saem junto com ela ("às", "as", "à", "a", "ao": "às 10h", "ao meio-dia", "à meia-noite").
- [ ] A hora vai de 0 a 23 e os minutos, sempre com 2 algarismos, de 00 a 59. Fora disso ("25h", "10h75") não é hora e fica no título.
- [ ] **Sem adivinhar:** "às 3" é 03:00 e "10:30" é 10:30. Para a tarde, a pessoa escreve "15h" ou "3 da tarde". O resultado aparece sempre no formato 24h.
- [ ] **"as" comum não vira hora:** "as" sem número depois fica no título ("buscar as crianças"). "às N" sem "h", sem ":" e sem "horas" só é hora quando, logo depois do número, vem o fim da frase, uma pontuação, outro pedaço reconhecido (uma data, por exemplo) ou uma destas palavras: "e", "no", "na", "em", "com", "para", "pra", "até". Assim "buscar as 2 crianças" continua inteiro no título.
- [ ] Um número sozinho nunca vira hora ("comprar 2 pães amanhã" → título "Comprar 2 pães", dia todo).
- [ ] Com mais de uma hora na frase, vale a primeira; as outras ficam no título.
- [ ] Sem hora, o compromisso fica de dia todo (Hora vazia, como na US02).

**Agenda US27: O título é o que sobra da frase**
Como usuário, quero que o resto da frase vire o título, limpo e sem pedaços soltos, para não ter que apagar "amanhã às 10h" do título.
- [ ] O título é a frase **original** (com os acentos e as maiúsculas que a pessoa digitou) sem os pedaços que viraram campo e sem as palavras de ligação desses pedaços.
- [ ] Palavras como "às", "no", "na", "dia" e "para" só saem quando fazem parte de um pedaço reconhecido. Em "buscar as crianças" ou "aula para iniciantes" elas ficam.
- [ ] Pedaços que não foram usados (segunda data, segunda hora, data que não existe, número sozinho) ficam como foram digitados.
- [ ] Limpeza, nesta ordem (regras na seção 3): espaços repetidos viram um só; sai o espaço antes de vírgula, ponto, ponto e vírgula e dois-pontos; saem do começo e do fim os espaços, os sinais `, . ; : - –` e um "e" solto; o título é cortado em 100 caracteres (limite da US02), sem espaço no fim; a **primeira letra** vira maiúscula e o resto fica como foi digitado.
- [ ] Ex.: "dentista, amanhã, 10h." → "Dentista"; "DENTISTA amanhã" → "DENTISTA"; "  médico   segunda   9h " → "Médico".
- [ ] **Título vazio** depois da limpeza (ex.: "amanhã 10h"): o formulário abre com o Título vazio e o erro "Digite um título." **já visível**, com `aria-invalid="true"`, e o foco no campo Título (regras da US03). A data e a hora entendidas continuam preenchidas.

**Agenda US28: Rascunho no formulário com a linha "Entendi"**
Como usuário, quero ver o formulário preenchido e um resumo do que a Agenda entendeu, para conferir rápido e corrigir antes de salvar.
- [ ] O formulário abre com Título (US27), Data (US25), Hora (US26) e "Ainda sem data" conforme a decisão 6. Todos os outros campos vêm como no "Novo compromisso" (US02). As regras de sempre continuam: ao marcar ou desmarcar "Ainda sem data", ou ao apagar a Hora, o formulário reage como na US16, US12 e US19.
- [ ] No topo do formulário, logo abaixo do título "Novo compromisso", aparece a linha que começa com "Entendi:" e mostra, nesta ordem e separados por " · ":
  - a data, com os títulos de dia da seção 3 ("Hoje", "Amanhã", "Sex, 13/11", "Seg, 15/11/2027"), ou "Ainda sem data", ou "data a escolher" (quando a data não existe);
  - a hora ("10:00") ou, com data e sem hora, "Dia todo" (sem data, a hora só aparece se foi entendida);
  - o título, entre aspas simples ("título 'Dentista'"), ou "sem título".
- [ ] Exemplos: "Entendi: Amanhã · 10:00 · título 'Dentista'"; "Entendi: Ainda sem data · título 'Comprar pão'"; "Entendi: data a escolher · título 'Festa 31/02'".
- [ ] Sem data e sem hora reconhecidas, aparece também, logo abaixo da linha, a dica "Não encontrei data nem hora. Confira os campos." O título fica com a frase inteira, limpa pelas regras da US27.
- [ ] Com data que não existe, aparece no mesmo lugar o aviso da US25 ("A data 31/02 não existe. Escolha uma data.") e a dica de "nada entendido" não aparece.
- [ ] A linha, a dica e o aviso são **texto**, com contraste AA nos dois temas, e quebram linha a 360px sem rolagem horizontal. O que veio da frase aparece como texto, nunca como HTML.
- [ ] **Leitor de tela:** ao abrir, o leitor lê o título da janela e, logo depois, a linha "Entendi" e a dica ou o aviso (a janela fica ligada a eles por `aria-describedby`, **só** quando foi aberta pela frase). Os separadores " · " não são lidos como "ponto" (sugestão: o "·" com `aria-hidden="true"` e uma vírgula escondida só da tela). Sem `aria-live` nessa linha, para ela não ser lida duas vezes.
- [ ] O foco vai para o campo Título (regra de sempre) ou, se algum erro já estiver visível ao abrir, para o primeiro campo com erro, na ordem do formulário (US03).
- [ ] A linha mostra o que foi entendido **na hora de abrir** e não muda quando a pessoa corrige os campos.
- [ ] A linha só aparece quando o formulário foi aberto pela frase. Em "Novo compromisso", "Editar", "Remarcar" e "Agendar", ela não aparece e a janela não fica ligada a ela.

**Frases de teste da Entrega 4a**

"Agora" fixo: **quinta-feira, 12/11/2026, 14:00**. Datas no formato DD/MM/AAAA. "Hora vazia" = dia todo. "Sem data" = caixa "Ainda sem data" marcada. O testador confere cada linha no formulário aberto (e, se quiser, também no console com a função da US25). Na 4b, todas estas frases continuam com o mesmo resultado.

| # | Frase | Título | Data | Hora | Sem data | O que mais conferir |
|---|---|---|---|---|---|---|
| 1 | dentista amanhã às 10h | Dentista | 13/11/2026 | 10:00 | não | Linha: "Entendi: Amanhã · 10:00 · título 'Dentista'" |
| 2 | DENTISTA AMANHA AS 10 | DENTISTA | 13/11/2026 | 10:00 | não | Sem acento e em maiúsculas; "as 10" no fim da frase é hora |
| 3 | dentista sexta às 9h | Dentista | 13/11/2026 | 09:00 | não | Linha: "Entendi: Amanhã · 09:00 · título 'Dentista'" |
| 4 | prova depois de amanhã | Prova | 14/11/2026 | vazia | não | Linha: "Entendi: Sáb, 14/11 · Dia todo · título 'Prova'" |
| 5 | aula quinta 15h | Aula | 12/11/2026 | 15:00 | não | Quinta hoje, hora ainda não passou |
| 6 | aula quinta 10h | Aula | 19/11/2026 | 10:00 | não | 10:00 de hoje já passou: quinta seguinte |
| 7 | aula quinta às 14h | Aula | 12/11/2026 | 14:00 | não | Às 14:00 o compromisso das 14:00 ainda não passou (passa às 14:01) |
| 8 | aula qui | Aula | 12/11/2026 | vazia | não | Dia todo de hoje nunca "passou" antes da meia-noite |
| 9 | feira sáb. 8h | Feira | 14/11/2026 | 08:00 | não | Abreviado com ponto |
| 10 | jogo sabado 16h | Jogo | 14/11/2026 | 16:00 | não | "sabado" sem acento |
| 11 | missa dom às 9 | Missa | 15/11/2026 | 09:00 | não | "dom" com hora logo depois (D2) |
| 12 | ter aula de inglês | Ter aula de inglês | vazia | vazia | sim | "ter" sem ligação e sem hora não é dia (D2); dica "Não encontrei data nem hora. Confira os campos." |
| 13 | academia na ter | Academia | 17/11/2026 | vazia | não | "na ter" conta (D2); "na" sai junto |
| 14 | médico segunda-feira 9h | Médico | 16/11/2026 | 09:00 | não | Primeira letra maiúscula |
| 15 | reunião terca 10:30 | Reunião | 17/11/2026 | 10:30 | não | Sem adivinhar tarde |
| 16 | prova próxima sexta | Prova | 13/11/2026 | vazia | não | "próxima" = a próxima no futuro (D3); "próxima" sai junto |
| 17 | pagar aluguel dia 15 | Pagar aluguel | 15/11/2026 | vazia | não | |
| 18 | pagar aluguel dia 5 | Pagar aluguel | 05/12/2026 | vazia | não | Dia 5 já passou: mês seguinte |
| 19 | pagar luz dia 12 | Pagar luz | 12/11/2026 | vazia | não | Hoje, dia todo |
| 20 | pagar luz dia 12 às 9h | Pagar luz | 12/12/2026 | 09:00 | não | 09:00 de hoje já passou: mês seguinte |
| 21 | conta dia 31 | Conta | 31/12/2026 | vazia | não | Novembro não tem dia 31 |
| 22 | consulta 20/11 | Consulta | 20/11/2026 | vazia | não | |
| 23 | consulta 10/11 | Consulta | 10/11/2027 | vazia | não | 10/11 já passou: ano seguinte |
| 24 | formatura 15/11/2027 19h | Formatura | 15/11/2027 | 19:00 | não | Linha: "Entendi: Seg, 15/11/2027 · 19:00 · título 'Formatura'" |
| 25 | festa 31/02 | Festa 31/02 | vazia | vazia | não | Aviso "A data 31/02 não existe. Escolha uma data."; linha "Entendi: data a escolher · título 'Festa 31/02'"; Salvar mostra "Escolha uma data." |
| 26 | aniversário 29/02 | Aniversário | 29/02/2028 | vazia | não | Próximo ano em que 29/02 existe |
| 27 | comprar 2 pães amanhã | Comprar 2 pães | 13/11/2026 | vazia | não | Número sozinho fica no título |
| 28 | aula 3 sexta | Aula 3 | 13/11/2026 | vazia | não | |
| 29 | Rua 15 amanhã 10h | Rua 15 | 13/11/2026 | 10:00 | não | |
| 30 | buscar as crianças amanhã | Buscar as crianças | 13/11/2026 | vazia | não | "as" sem número fica |
| 31 | buscar as 2 crianças amanhã | Buscar as 2 crianças | 13/11/2026 | vazia | não | Depois do "2" vem "crianças": não é hora |
| 32 | aula às 3 com o João | Aula com o João | 13/11/2026 | 03:00 | não | Sem adivinhar tarde; com hora e sem data, 03:00 de hoje já passou: amanhã (D1). Linha: "Entendi: Amanhã · 03:00 · título 'Aula com o João'" |
| 33 | almoço ao meio-dia | Almoço | 13/11/2026 | 12:00 | não | "ao" sai junto; 12:00 de hoje já passou: amanhã (D1) |
| 34 | plantão amanhã à meia noite | Plantão | 13/11/2026 | 00:00 | não | Sem hífen |
| 35 | jantar sexta 8 da noite | Jantar | 13/11/2026 | 20:00 | não | |
| 36 | remédio amanhã 7h30 da manhã | Remédio | 13/11/2026 | 07:30 | não | |
| 37 | café às 3 da tarde amanhã | Café | 13/11/2026 | 15:00 | não | |
| 38 | festa sábado 2 da noite | Festa 2 da noite | 14/11/2026 | vazia | não | "2 da noite" não está na tabela de conversão |
| 39 | reunião 16h | Reunião | 12/11/2026 | 16:00 | não | Com hora e sem data: 16:00 ainda não passou, fica hoje (D1) |
| 40 | reunião amanhã 10h ou sexta 11h | Reunião ou sexta 11h | 13/11/2026 | 10:00 | não | Vale a primeira data e a primeira hora |
| 41 | comprar pão | Comprar pão | vazia | vazia | sim | Linha "Entendi: Ainda sem data · título 'Comprar pão'" e a dica "Não encontrei data nem hora. Confira os campos." |
| 42 | amanhã 10h | (vazio) | 13/11/2026 | 10:00 | não | Linha "... · sem título"; erro "Digite um título." já visível; foco no Título |
| 43 | reunião 25h amanhã | Reunião 25h | 13/11/2026 | vazia | não | 25h não é hora |
| 44 | prova dia 32 | Prova dia 32 | vazia | vazia | sim | Sem aviso de data; dica de "nada entendido" |
| 45 | Dentista, amanhã, 10h. | Dentista | 13/11/2026 | 10:00 | não | Pontuação das pontas sai |
| 46 | pagar boleto até sexta | Pagar boleto | 13/11/2026 | vazia | não | "até" sai junto com a data |
| 47 | entregar trabalho para o dia 20 | Entregar trabalho | 20/11/2026 | vazia | não | "para o dia" sai junto |
| 48 | dentista às 10 horas amanhã | Dentista | 13/11/2026 | 10:00 | não | "horas" sai junto |
| 49 | ver o amanhecer sábado | Ver o amanhecer | 14/11/2026 | vazia | não | "amanhecer" não é "amanhã" (palavra inteira) |
| 50 | `<b>oi</b>` amanhã | `<b>oi</b>` | 13/11/2026 | vazia | não | Aparece como texto, com os sinais `<` e `>`, no Título e na linha |
| 51 | reunião 14h | Reunião | 12/11/2026 | 14:00 | não | Hora sem data igual a agora: às 14:00 ainda não passou, fica hoje (D1) |
| 52 | plantão meia-noite | Plantão | 13/11/2026 | 00:00 | não | Hora sem data: 00:00 de hoje já passou, vai para amanhã (D1) |

#### Entrega 4b: hora de fim, tempo para sair, "O que levar" e local

**Agenda US29: Hora de fim pela frase**
Como usuário, quero escrever até que horas vai o compromisso ("das 10h às 11h" ou "por 1h"), para a hora de fim já vir preenchida.
- [ ] A Agenda reconhece dois jeitos:
  - **intervalo:** "das 10h às 11h", "das 10 às 11", "das 10h30 às 12h", "das 9h até 10h", "das 9 até as 10" e "das 2 às 4 da tarde". Dentro do "das ... às/até ...", os dois números são horas mesmo sem "h";
  - **duração:** "por" ou "durante" + tempo: "por 1h", "por 1h30", "por 1 hora", "por 2 horas", "por 45 min", "por 90 minutos", "por meia hora".
- [ ] **Intervalo:** o primeiro horário vira a **Hora** e o segundo vira "Termina às"; a Duração se ajusta sozinha (US19). O intervalo conta como o pedaço de hora da frase: se uma hora sozinha vier antes dele, vale ela e o intervalo fica no título. Sem data na frase, a regra da D1 usa o primeiro horário do intervalo.
- [ ] "da manhã", "da tarde" ou "da noite" depois do segundo horário vale para ele e também para o primeiro, se o primeiro não tiver o seu e for menor ou igual ao segundo ("das 2 às 4 da tarde" → 14:00 às 16:00; "das 11 às 1 da tarde" → 11:00 às 13:00).
- [ ] **Duração:** precisa de uma hora na frase. Com 30, 60 ou 120 minutos, fica marcada a opção "30 min", "1 h" ou "2 h"; com outro valor, "Outro" e o número em "Minutos". "Termina às" é calculado como na US19.
- [ ] Duração sem hora na frase ("estudar amanhã por 2 horas"): não é usada e fica no título. Os números dentro dela não são lidos de novo como hora.
- [ ] Intervalo e duração são do mesmo tipo (fim): vale o primeiro da frase.
- [ ] **Limites (nunca salva inválido):**
  - fim igual ou antes do início ("das 22h às 2h"): o formulário abre com Hora 22:00, "Termina às" 02:00, Duração "Sem hora de fim" e o erro "A hora de fim precisa ser depois da hora de início." já visível;
  - duração que passa de 23:59 ("22h por 3 horas"): abre com a Duração em "Outro" e o número (180), "Termina às" vazio e o erro "Com essa duração, o compromisso passaria da meia-noite. Escolha uma duração menor." já visível;
  - duração de 0 ou acima de 1439 minutos: abre com "Outro", o número e o erro "Digite um número de minutos entre 1 e 1439." já visível.
- [ ] A linha "Entendi" ganha, logo depois da hora, "até 11:00" (intervalo) ou "duração 90 min" (duração), mesmo quando o valor tem erro.

**Agenda US30: Tempo para sair pela frase**
Como usuário, quero escrever quanto tempo antes preciso sair ("sair 30 min antes"), para o "Sair às" já vir configurado.
- [ ] A Agenda reconhece "sair" + tempo + "antes": "sair 30 min antes", "sair 30 minutos antes", "sair 1h antes", "sair 1 hora antes", "sair 1h30 antes", "sair meia hora antes".
- [ ] 15, 30, 45 ou 60 minutos marcam a opção de mesmo nome no grupo "Tempo para sair"; outro valor marca "Outro" com o número em "Minutos antes" (US12).
- [ ] Precisa de uma hora na frase. Sem hora, o pedaço não é usado e fica no título (o grupo "Tempo para sair" continua desativado, como na US12). Os números dentro dele não são lidos de novo como hora.
- [ ] Fora de 1 a 720 minutos ("sair 13h antes" = 780, "sair 0 min antes"): o formulário abre com "Outro", o número e o erro "Digite um número de minutos entre 1 e 720." já visível.
- [ ] Com mais de um, vale o primeiro.
- [ ] A linha "Entendi" ganha "sair 30 min antes" (sempre em minutos: "sair 90 min antes").

**Agenda US31: "levar ..." vira o checklist "O que levar"**
Como usuário, quero escrever o que preciso levar ("levar RG e cartão"), para o checklist já vir montado.
- [ ] A palavra "levar" seguida de itens enche o checklist "O que levar" (US17): "levar RG", "levar RG e cartão", "levar RG, pedido médico e cartão do convênio".
- [ ] Os itens vão do "levar" até o começo do próximo pedaço reconhecido (data, hora, intervalo, duração, "sair ... antes" ou local) ou até o fim da frase. Eles são separados por vírgula, ponto e vírgula ou " e ".
- [ ] Cada item é limpo como o título (espaços e pontuação das pontas), fica com as letras como foram digitadas e é cortado em 60 caracteres. Item vazio é ignorado. Itens iguais são permitidos (US17).
- [ ] Até 20 itens. Do 21º em diante, eles não entram e aparece, junto da linha "Entendi", o aviso "A lista 'O que levar' aceita até 20 itens. Os outros ficaram de fora."
- [ ] "levar" no **começo** da frase é a ação do título e não vira checklist ("Levar o carro na oficina amanhã" → título "Levar o carro"). "levar" sem nada depois também fica no título.
- [ ] Só o primeiro "levar" conta. Funciona com ou sem data e com ou sem hora (US17).
- [ ] Os itens aparecem na lista do formulário com o botão "Remover", como se tivessem sido adicionados à mão, e ainda podem ser removidos ou complementados antes de salvar. Ao salvar, entram com `feito: false`. "Cancelar" descarta tudo.
- [ ] A linha "Entendi" ganha "levar 'RG', 'cartão'". Com até 4 itens, mostra todos; com 5 ou mais, mostra os 3 primeiros e "e mais N itens" (ex.: "levar 'toalha', 'garrafa', 'fone' e mais 2 itens"). A lista inteira fica no checklist do formulário. *(Decisão 1 da seção 17.11 do design, aprovada pelo João em 2026-11-11.)*

**Agenda US32: Local com "no" ou "na"**
Como usuário, quero escrever onde vai ser ("na clínica Sorriso"), para o local já vir preenchido.
- [ ] "no" ou "na" seguido de texto enche o campo Local: "na clínica Sorriso", "no centro", "na casa da vó".
- [ ] O local vai do "no"/"na" até o começo do próximo pedaço reconhecido ou até o fim da frase.
- [ ] "no"/"na" que fazem parte de uma data ("na sexta", "no dia 15", "na próxima segunda") são da data, não do local.
- [ ] "no"/"na" no **começo** da frase não contam (ficam no título). Só o primeiro "no"/"na" conta; outros dentro do local fazem parte dele ("na casa na praia" → "Casa na praia").
- [ ] O local é limpo como o título: pontuação das pontas sai, a primeira letra vira maiúscula e ele é cortado em 100 caracteres (limite da US02).
- [ ] "no"/"na" sem texto depois ("reunião na") ficam no título.
- [ ] *(Risco aceito pelo João, D4)* "no"/"na" também aparecem em frases que não são lugar ("pensar na vida amanhã" → local "Vida"). A linha "Entendi" mostra o local e a pessoa corrige antes de salvar.
- [ ] A linha "Entendi" ganha "local 'Clínica Sorriso'".

**Correções da Entrega 4a que entram na 4b** (pendências baixas do relatório `testes/etapa-4a.md`, aprovadas pelo João em 2026-11-09):
- [ ] "para ter aula" não vira terça: antes de "ter"/"dom", só contam como ligação "na", "no", "nesta", "neste", "próxima" e "próximo".
- [ ] "vitamina E" fica com o "E" no título: só é tirado um "e" colado a um pedaço reconhecido.
- [ ] Ano com 2 dígitos é entendido como 20AA: "15/11/27" vira 15/11/2027 (com a mesma conferência de data inexistente). Antes ficava tudo no título.
- [ ] Ano com menos de 4 algarismos válidos (< 1000, ex.: "15/11/0050") vira data inexistente, com o aviso de data, em vez de virar 1950.

**Decisões do João depois do teste da 4b (2026-11-11), todas na opção recomendada:**
- [ ] Só o "e" **minúsculo** é ligação: ele sai do título, do local e dos itens quando está colado a um pedaço reconhecido, e é o único separador de itens além de vírgula e ponto e vírgula. O "E" maiúsculo é sempre texto: "reunião e amanhã" → título "Reunião"; "levar vitamina E" → item "vitamina E"; "na ala E amanhã" → local "Ala E".
- [ ] Ano depois de "dia/mês/" com 1 ou 3 algarismos, ou com 4 e menor que 1000, vira data que não existe (aviso de data, campo Data vazio): "15/11/202" → "A data 15/11/202 não existe.". Ano com 2 algarismos = 20AA; com 4 e ≥ 1000 = como escrito.
- [ ] Intervalo com período fora da tabela (ex.: "2 da noite"): a mesma regra nas duas metades — o período é ignorado e fica no título, e o intervalo vale com as horas. "das 2 da noite às 4" → 02:00 às 04:00; "das 1 às 2 da noite" → 01:00 às 02:00.
- [ ] Intervalo junto com duração: vale o intervalo, e a duração fica no título.
- [ ] Se o primeiro horário do intervalo tem um período (mesmo fora da tabela), o período do segundo não passa para ele: "das 2 da noite às 4 da manhã" → 02:00 às 04:00. *(Decisão do dev, aceita pelo testador.)*

**Ordem da linha "Entendi" com tudo (4b):** data · hora · fim ("até 10:00" ou "duração 90 min") · "sair 30 min antes" · "local '...'" · "levar '...', '...'" · título. Ex.: "Entendi: Amanhã · 09:00 · até 10:00 · sair 30 min antes · local 'Centro' · levar 'RG' · título 'Dentista'".

**Frases de teste da Entrega 4b**

Mesmo "agora" fixo: **quinta-feira, 12/11/2026, 14:00**. O testador também confere de novo a tabela da 4a, que não muda.

| # | Frase | Título | Data | Hora | Fim / Duração | Tempo para sair | Local | O que levar | O que mais conferir |
|---|---|---|---|---|---|---|---|---|---|
| 1 | reunião amanhã das 10h às 11h | Reunião | 13/11/2026 | 10:00 | 11:00 / "1 h" | Nenhum | vazio | nenhum | Linha: "... · 10:00 · até 11:00 · ..." |
| 2 | aula sexta das 2 às 4 da tarde | Aula | 13/11/2026 | 14:00 | 16:00 / "2 h" | Nenhum | vazio | nenhum | "da tarde" vale para os dois |
| 3 | prova sábado das 11 às 1 da tarde | Prova | 14/11/2026 | 11:00 | 13:00 / "2 h" | Nenhum | vazio | nenhum | 11 é maior que 1: "da tarde" só no segundo |
| 4 | reunião amanhã das 9h30 até 10h | Reunião | 13/11/2026 | 09:30 | 10:00 / "30 min" | Nenhum | vazio | nenhum | |
| 5 | festa sábado das 22h às 2h | Festa | 14/11/2026 | 22:00 | 02:00 / "Sem hora de fim" | Nenhum | vazio | nenhum | Erro "A hora de fim precisa ser depois da hora de início." já visível; foco em "Termina às" |
| 6 | treino amanhã 7h por 1h30 | Treino | 13/11/2026 | 07:00 | 08:30 / "Outro" 90 | Nenhum | vazio | nenhum | Linha: "... · duração 90 min · ..." |
| 7 | call hoje 16h por meia hora | Call | 12/11/2026 | 16:00 | 16:30 / "30 min" | Nenhum | vazio | nenhum | |
| 8 | show sábado 22h durante 3 horas | Show | 14/11/2026 | 22:00 | vazio / "Outro" 180 | Nenhum | vazio | nenhum | Erro "Com essa duração, o compromisso passaria da meia-noite. Escolha uma duração menor." já visível |
| 9 | estudar amanhã por 2 horas | Estudar por 2 horas | 13/11/2026 | vazia | desativado | desativado | vazio | nenhum | Duração sem hora fica no título |
| 10 | dentista amanhã 10h sair 30 min antes | Dentista | 13/11/2026 | 10:00 | vazio | "30 min" | vazio | nenhum | |
| 11 | entrevista sexta 9h sair 1h30 antes | Entrevista | 13/11/2026 | 09:00 | vazio | "Outro" 90 | vazio | nenhum | "1h30" dentro de "sair ... antes" não vira hora |
| 12 | viagem sábado 8h sair 13h antes | Viagem | 14/11/2026 | 08:00 | vazio | "Outro" 780 | vazio | nenhum | Erro "Digite um número de minutos entre 1 e 720." já visível |
| 13 | dentista amanhã sair 30 min antes | Dentista sair 30 min antes | 13/11/2026 | vazia | desativado | desativado | vazio | nenhum | Sem hora: o pedaço fica no título |
| 14 | dentista amanhã 10h levar RG | Dentista | 13/11/2026 | 10:00 | vazio | Nenhum | vazio | RG | |
| 15 | exame sexta 7h levar RG, pedido médico e cartão do convênio | Exame | 13/11/2026 | 07:00 | vazio | Nenhum | vazio | RG; pedido médico; cartão do convênio | |
| 16 | dentista amanhã 10h na clínica Sorriso | Dentista | 13/11/2026 | 10:00 | vazio | Nenhum | Clínica Sorriso | nenhum | |
| 17 | almoço na casa da vó sábado meio-dia | Almoço | 14/11/2026 | 12:00 | vazio | Nenhum | Casa da vó | nenhum | O local termina onde começa a data |
| 18 | reunião na sexta 15h | Reunião | 13/11/2026 | 15:00 | vazio | Nenhum | vazio | nenhum | "na sexta" é da data |
| 19 | levar o carro na oficina amanhã | Levar o carro | 13/11/2026 | vazia | desativado | desativado | Oficina | nenhum | "levar" no começo fica no título |
| 20 | aula amanhã 10h levar caderno na escola | Aula | 13/11/2026 | 10:00 | vazio | Nenhum | Escola | caderno | A lista termina onde começa o local |
| 21 | consulta amanhã 9h na clínica levar RG e exames sair 40 min antes | Consulta | 13/11/2026 | 09:00 | vazio | "Outro" 40 | Clínica | RG; exames | |
| 22 | dentista sexta das 9h às 10h no centro levar RG sair 30 min antes | Dentista | 13/11/2026 | 09:00 | 10:00 / "1 h" | "30 min" | Centro | RG | Linha: "Entendi: Amanhã · 09:00 · até 10:00 · sair 30 min antes · local 'Centro' · levar 'RG' · título 'Dentista'" |
| 23 | comprar pão levar sacola | Comprar pão | vazia | vazia (sem data: sim) | desativado | desativado | vazio | sacola | Dica "Não encontrei data nem hora. Confira os campos." |
| 24 | mudança amanhã levar | Mudança levar | 13/11/2026 | vazia | desativado | desativado | vazio | nenhum | "levar" sem itens fica no título |
| 25 | reunião amanhã 10h no escritório no 3º andar | Reunião | 13/11/2026 | 10:00 | vazio | Nenhum | Escritório no 3º andar | nenhum | Só o primeiro "no" abre o local |
| 26 | pensar na vida amanhã | Pensar | 13/11/2026 | vazia | desativado | desativado | Vida | nenhum | Risco aceito pelo João (D4) |
| 27 | mudança sábado levar a, b, c, ... (22 itens de uma letra) | Mudança | 14/11/2026 | vazia | desativado | desativado | vazio | os 20 primeiros | Aviso "A lista 'O que levar' aceita até 20 itens. Os outros ficaram de fora." |
| 28 | treino das 9h às 10h | Treino | 13/11/2026 | 09:00 | 10:00 / "1 h" | Nenhum | vazio | nenhum | Intervalo sem data: 09:00 de hoje já passou, vai para amanhã (D1) |

### Mudanças em stories anteriores (Etapa 4)

| Story | Entrega | O que muda |
|---|---|---|
| US01 | 4a | O campo "Criar por frase" (US24) entra logo abaixo da barra "Aparência". Ordem da página: barra "Aparência", "Criar por frase", faixas, "Ficou pendente", "Próximos 7 dias", "Próximos compromissos", "Sem data", "Anteriores". |
| US02 | 4a | O formulário também abre pela frase (US24), já preenchido e com a linha "Entendi" (US28). Nesse caso o foco volta para o campo da frase ao fechar, e o campo só é limpo depois de salvar. |
| US03 | 4a / 4b | Quando o formulário abre pela frase, erros podem aparecer **já ao abrir** (4a: "Digite um título."; 4b: os erros da US12 e da US19), com as mesmas regras, e o foco vai para o primeiro campo com erro. "Escolha uma data." continua aparecendo só ao tentar salvar. |
| US12, US17, US19 | 4b | "Tempo para sair", "O que levar" e a hora de fim podem vir preenchidos pela frase, como se a pessoa tivesse preenchido à mão. Tudo continua editável antes de salvar. |
| US16 | 4a | "Ainda sem data" pode vir marcada pela frase (sem data e sem hora). |
| US22, US23 | 4a | O tema claro e a letra grande cobrem também o campo "Criar por frase" e a linha "Entendi" (com a dica e os avisos). |

### Requisitos gerais da Etapa 4

Os requisitos gerais das Etapas 1, 2 e 3 valem para **tudo** o que é novo, e também:
- [ ] A 360px, o campo "Criar por frase" e o botão "Criar" cabem sem rolagem horizontal (o botão pode ir para baixo do campo). O campo tem letra de pelo menos 16px, e o campo e o botão têm 44px de área de toque.
- [ ] Com a letra grande, a 360px, o campo, o botão e a linha "Entendi" continuam sem rolagem horizontal e sem nada cortado.
- [ ] Teclado: o Tab chega ao campo da frase logo depois dos botões "Tema claro" e "Letra grande", e ao botão "Criar" logo depois do campo. Foco visível nos dois temas.
- [ ] Leitor de tela: o campo tem o nome "Criar por frase" e a dica ligada a ele; ao abrir o formulário pela frase, a linha "Entendi" é lida (US28).
- [ ] Contraste AA nos dois temas para o campo, o botão, a linha "Entendi", a dica e os avisos.
- [ ] "Entendi", "Ainda sem data", "Dia todo", "data a escolher", a dica e os avisos são **texto**, nunca só cor ou ícone.
- [ ] A frase é entendida só com JavaScript puro (expressões regulares e funções próprias), sem biblioteca, sem inteligência artificial e sem servidor. Nada é enviado para a internet.
- [ ] Qualquer frase de até 200 caracteres abre o formulário sem demora perceptível e sem erro no console, inclusive frases só com pontuação, com emoji ou com `<script>`.
- [ ] Os compromissos continuam na `versao: 2`, sem chave nova. O `localStorage` continua só com chaves `agenda:` e nunca usa `localStorage.clear()`.

---

## 3. Regras e modelo de dados

### Quando um compromisso "passou"
- **Com hora:** passou quando o horário atual for **depois** do minuto marcado. Ex.: um compromisso de hoje às 10:00 continua na lista às 10:00 e vai para "Anteriores" às 10:01.
- **Sem hora (dia todo):** passou a partir da meia-noite do dia seguinte (00:00). Ex.: um compromisso de dia todo em 14/11 fica na lista até 23:59 de 14/11.
- **Sem data (Etapa 2b):** nunca passa.
- **Com hora de fim (Etapa 3a):** a regra continua a mesma, pela **hora de início**. A hora de fim não muda quando o compromisso passa.
- A regra usa o relógio e o fuso do aparelho de quem usa.

### Onde cada item aparece (Etapa 2b)
Conferido nesta ordem; vale a primeira linha que bater.

| Situação do item | Seção |
|---|---|
| `data: null` | "Sem data" |
| `status: "feito"` ou `"nao-vou-fazer"` | "Anteriores", com a situação "Feito" ou "Não vou fazer" |
| `status: "aberto"`, passou e `cobrar: true` | "Ficou pendente" |
| `status: "aberto"`, passou e `cobrar: false` | "Anteriores", com a situação "Passou" |
| `status: "aberto"` e não passou | "Próximos compromissos" |

### "Sair às" (Etapa 2b)
- Hora de sair = data e hora do compromisso menos `antecedenciaMin` minutos.
- Até 15 minutos antes da hora de sair: "Sair às HH:MM" (com " do dia anterior" quando for o caso).
- De 15 minutos antes até a hora de sair: "Sair em X min" (com menos de 1 minuto: "Sair agora").
- Depois da hora de sair, até o compromisso passar: "Hora de sair: HH:MM (já passou)".

### Hora de fim (Etapa 3a)
- Só a duração é guardada: `duracaoMin`. A hora de fim é calculada: **fim = hora + `duracaoMin`**.
- Só existe com hora. O fim precisa ficar no mesmo dia: hora (em minutos desde 00:00) + `duracaoMin` ≤ 1439 (23:59).
- No formulário, "Termina às" e "Duração" são duas formas de ver o mesmo valor (US19). Opções da Duração: "Sem hora de fim" (`null`), "30 min" (30), "1 h" (60), "2 h" (120) e "Outro" (qualquer outro valor de 1 a 1439).
- No card: "HH:MM – HH:MM" (início – fim).

### Conflito e aperto (Etapa 3a)
Para cada compromisso **B** da lista "Próximos compromissos" que tem hora, a Agenda compara com cada compromisso **A** do **mesmo dia** que:
- tem hora e `status: "aberto"` (pode estar em qualquer seção: "Próximos", "Ficou pendente" ou "Anteriores" com "Passou");
- começa antes de B, ou no mesmo minuto mas vem antes de B na ordem da US01.

| Situação | Resultado no card de B |
|---|---|
| A e B começam no mesmo minuto | Conflito: "Conflito: mesmo horário de A." |
| A tem hora de fim e B começa **antes** do fim de A | Conflito: "Conflito: A vai até HH:MM." |
| A tem hora de fim, não há conflito e a hora de sair de B (hora de B menos `antecedenciaMin` de B, ou menos 15 minutos se for `null`) é **antes** do fim de A | Aperto: "Aperto: sair às HH:MM, mas A vai até HH:MM." |
| A sem hora de fim (e horário diferente), ou hora de sair de B igual ou depois do fim de A | Nada |

- B começar **exatamente** na hora em que A acaba não é conflito (pode ser aperto, pela hora de sair).
- B mostra **um** aviso só: conflito antes de aperto; entre dois do mesmo tipo, vale o A que vem primeiro na ordem da US01.
- Compromissos de dia todo, sem data, "Feito" e "Não vou fazer" nunca entram na comparação.
- Os nomes "A" e "B" acima são só para explicar: na tela aparece o título do compromisso A.

### Captura rápida (Etapa 4)

A Etapa 4 **não muda o formato dos dados**: continua na versão 2, sem chave nova no `localStorage`. A frase não é guardada; ela só preenche o formulário.

**Como a frase é lida**
1. Para comparar, maiúsculas e acentos são ignorados: "AMANHA" = "amanhã", "sabado" = "sábado", "terca" = "terça", "as" = "às". O título, o local e os itens guardam o texto **como foi digitado**.
2. Cada pedaço é procurado como **palavra inteira**: "amanhã" não é achado dentro de "amanhecer", e "dia 1" não é achado dentro de "dia 10".
3. Na mesma posição, vale o pedaço **mais comprido** ("depois de amanhã" em vez de "amanhã"; "às 8 da noite" inteiro em vez de só "às 8"; "segunda-feira" inteiro).
4. **Ordem de busca (4b):** primeiro os pedaços compostos ("das ... às ...", "por ...", "sair ... antes"), depois as datas e as horas sozinhas, por último os pedaços de texto livre ("levar ..." e "no/na ..."). Um trecho que já faz parte de um pedaço não é lido de novo (o "1h30" de "sair 1h30 antes" não vira hora).
5. **Tipos:** data; hora (inclui o intervalo da 4b); fim (intervalo ou duração, 4b); tempo para sair (4b); levar (4b); local (4b). Com dois pedaços do mesmo tipo, vale o **primeiro** da frase; o outro fica no título.
6. Os pedaços de texto livre ("levar ..." e "no/na ...") vão até o começo do próximo pedaço reconhecido ou até o fim da frase.
7. **Só sai do título o que virou campo.** Pedaço não usado (segundo do mesmo tipo, duração ou "sair" sem hora, data que não existe) fica no título como foi digitado.

**Quando um número conta como dia ou hora**

| Escrito | Vira | Exemplo |
|---|---|---|
| "dia" + número de 1 a 31 | dia do mês | "dia 15", "dia 05" |
| número/número, com ou sem /ano de 4 dígitos | dia/mês (e ano) | "15/11", "15/11/2027" |
| número + "h", com ou sem minutos | hora | "10h", "10h30" |
| número + ":" + minutos | hora | "10:30" |
| "às"/"as" + número, com ou sem "h" ou "horas" | hora (sem "h", ":" ou "horas", só com a regra da palavra seguinte, abaixo) | "às 10", "às 10 horas" |
| número (com ou sem "h"/minutos) + "da manhã", "da tarde" ou "da noite" | hora (tabela de conversão abaixo) | "8 da noite", "7h30 da manhã" |
| *(4b)* "das" + número + "às"/"até"/"até as" + número | intervalo (hora e fim) | "das 10 às 11" |
| *(4b)* "por"/"durante" + número + "h", "hora(s)", "min" ou "minuto(s)", ou "meia hora" | duração | "por 1h30", "por 45 min" |
| *(4b)* "sair" + número + unidade (como na duração) + "antes" | tempo para sair | "sair 30 min antes" |
| qualquer outro número | continua no título | "2 pães", "aula 3", "Rua 15", "dia 32", "25h" |

- **Regra da palavra seguinte** ("às N" sem "h", sem ":" e sem "horas"): só é hora se, logo depois do número, vier o fim da frase, uma pontuação, outro pedaço reconhecido ou uma destas palavras: "e", "no", "na", "em", "com", "para", "pra", "até". "dentista às 10 amanhã" é hora; "buscar as 2 crianças" não é.

**Palavras de ligação que saem junto com o pedaço**
- Logo antes de uma **data** (no máximo uma destas, colada na data): "no", "na", "em", "para", "pra", "até", "para o", "pra o", "até o", "para a", "até a", "nesta", "neste", "esta", "este", "próxima", "próximo", "na próxima", "no próximo".
- A palavra "dia" de "dia 15" e de "dia 15/11".
- Logo antes de uma **hora**: "às", "as", "à", "a", "ao". Logo depois de "às N": "horas" ou "hora".
- Fora de um pedaço reconhecido, essas palavras ficam no título.

**Dias da semana**

| Dia | Por extenso | Abreviado |
|---|---|---|
| segunda | "segunda", "segunda-feira", "segunda feira" | "seg" |
| terça | "terça", "terça-feira", "terça feira" | "ter" (com a regra abaixo) |
| quarta | "quarta", "quarta-feira", "quarta feira" | "qua" |
| quinta | "quinta", "quinta-feira", "quinta feira" | "qui" |
| sexta | "sexta", "sexta-feira", "sexta feira" | "sex" |
| sábado | "sábado" | "sáb" |
| domingo | "domingo" | "dom" (com a regra abaixo) |

- Abreviados com ou sem ponto ("sex.").
- *(D2, aprovado pelo João em 2026-11-09)* "ter" e "dom" também são palavras comuns. Eles só contam como dia quando vêm logo depois de uma palavra de ligação de data ("na ter", "no dom") ou logo antes de uma hora reconhecida ("ter 10h", "dom às 9"). Os outros abreviados contam sempre.
- *(D3, aprovado pelo João em 2026-11-09)* "próxima sexta", "esta sexta" e "nesta sexta" valem o mesmo que "sexta".

**Sempre a próxima no futuro**
- "hoje", "amanhã" e "depois de amanhã": hoje, hoje + 1 e hoje + 2, mesmo se a hora já passou.
- **Dia da semana:** o primeiro dia com esse nome a partir de hoje. Se for hoje e o compromisso, com a hora entendida, já tiver passado (regra "quando um compromisso passou"), é o da semana seguinte (hoje + 7). Sem hora, o dia de hoje ainda não passou.
- **"dia N":** neste mês, se ainda não passou (mesma regra); senão, no mês seguinte. Se o mês escolhido não tem o dia N (dia 31 em novembro, dia 30 em fevereiro), vai para o próximo mês que tem.
- **"D/M" sem ano:** neste ano, se ainda não passou; senão, no ano seguinte. "29/02" vai para o próximo ano em que 29/02 existe e ainda não passou.
- **"D/M/AAAA":** usada como está, mesmo no passado.
- **Data que não existe:** dia 0 ou maior que o último dia do mês em qualquer ano ("31/02", "30/02", "31/04", "0/11"), mês 0 ou maior que 12 ("15/13"), ou data com ano que não existe nesse ano ("29/02/2027"). O campo Data abre vazio, o texto fica no título e aparece o aviso "A data D/M não existe. Escolha uma data." (com a data como foi digitada). Se a frase tiver outra data válida, vale ela e não há aviso.
- **Hora sem data** *(D1, aprovado pelo João em 2026-11-09)*: **hoje**, se o compromisso com essa hora ainda não passou (regra "quando um compromisso passou": às 14:00, "14h" ainda é hoje); senão, **amanhã**. Ex.: às 14:00, "reunião 16h" → hoje; "reunião 10h" → amanhã; "plantão meia-noite" → amanhã às 00:00. Vale também para o primeiro horário do intervalo da 4b.
- Data com data inexistente e hora (ex.: "festa 31/02 20h"): a regra acima **não** vale; o campo Data fica vazio, como em "Data que não existe".

**Horas: tabela de conversão**

| Escrito | Vira |
|---|---|
| "10h", "10H", "às 10h" | 10:00 |
| "10h30", "10:30", "às 10:30", "às 10h30" | 10:30 |
| "às 10", "as 10", "às 10 horas" | 10:00 (com a regra da palavra seguinte) |
| "meio-dia", "meio dia", "ao meio-dia" | 12:00 |
| "meia-noite", "meia noite", "à meia-noite" | 00:00 |
| N "da manhã", N de 1 a 11 | N ("7 da manhã" → 07:00) |
| 12 "da tarde" | 12:00 |
| N "da tarde", N de 1 a 11 | N + 12 ("3 da tarde" → 15:00) |
| N "da noite", N de 6 a 11 | N + 12 ("8 da noite" → 20:00) |
| N de 13 a 23 + "da tarde" ou "da noite" | N ("15h da tarde" → 15:00; o "da tarde" sai junto) |
| qualquer outra combinação ("2 da noite", "12 da manhã", "15h da manhã") | "da ..." não é entendido; vale só o que a tabela já reconhece sem ele |

- N pode ter minutos: "7h30 da manhã" → 07:30, "8:15 da noite" → 20:15.
- Minutos sempre com 2 algarismos (00 a 59). Hora de 0 a 23.

**Limpeza do título, do local e dos itens**
1. Tirar os pedaços que viraram campo (com as palavras de ligação deles).
2. Espaços repetidos viram um só.
3. Sai o espaço antes de `,` `.` `;` `:`.
4. Saem do começo e do fim: espaços, os sinais `, . ; : - –` e um "e" solto (repetindo até não sobrar nenhum).
5. Cortar no limite: título e local em 100 caracteres, item em 60 (sem espaço no fim).
6. Título e local: a primeira letra vira maiúscula; o resto fica como foi digitado. Itens ficam como foram digitados.

**Linha "Entendi"**
- Formato: "Entendi: " + as partes separadas por " · ", nesta ordem: data · hora · fim · tempo para sair · local · levar · título. Só aparecem as partes que existem.
- Data: título de dia (tabela "Títulos dos dias", abaixo), "Ainda sem data" ou "data a escolher".
- Hora: "HH:MM"; com data e sem hora, "Dia todo".
- Fim (4b): "até HH:MM" (intervalo) ou "duração N min" (duração). Tempo para sair (4b): "sair N min antes". Local (4b): "local '...'". Levar (4b): "levar '...', '...'".
- Título: "título '...'" ou "sem título".
- Abaixo da linha, quando for o caso: a dica "Não encontrei data nem hora. Confira os campos." (sem nenhum pedaço de data e de hora), o aviso de data que não existe e o aviso de mais de 20 itens.

### Títulos dos dias
| Situação | Título |
|---|---|
| Hoje | "Hoje" |
| Amanhã | "Amanhã" |
| Ontem (só em "Anteriores" e "Ficou pendente") | "Ontem" |
| Outro dia, mesmo ano | dia da semana abreviado + data, ex.: "Sex, 14/11" (e, na lista principal, " · daqui a 3 dias") |
| Outro dia, outro ano | com o ano, ex.: "Sex, 14/11/2027" |

Abreviações dos dias: Dom, Seg, Ter, Qua, Qui, Sex, Sáb. "daqui a X dias" conta dias de calendário, não horas.

### `localStorage`
| Chave | Valor | Desde |
|---|---|---|
| `agenda:compromissos` | objeto com a versão do formato e a lista de compromissos (abaixo) | Etapa 1 |
| `agenda:compromissos-corrompido` | cópia do conteúdo de `agenda:compromissos` quando ele estava corrompido (US07) | Etapa 1 |
| `agenda:ultimo-backup` | data e hora ISO da última cópia baixada (US08) | 2a |
| `agenda:ultima-mudanca` | data e hora ISO da última mudança nos compromissos (US10) | 2a |
| `agenda:lembrete-backup-adiado-ate` | data e hora ISO até quando a faixa de cópia fica escondida (US10) | 2a |
| `agenda:compromissos-antes-da-importacao` | conteúdo de `agenda:compromissos` logo antes de um "Substituir tudo" (US09) | 2a |
| `agenda:compromissos-v1` | texto original da versão 1, guardado antes da migração (US11) | 2b |
| `agenda:preferencias` | tema e tamanho de letra (US22 e US23), formato abaixo | 3b |

### Versão 1 (Etapa 1 e Entrega 2a)

```json
{
  "versao": 1,
  "compromissos": [
    {
      "id": "c-1731590400000-k3f9",
      "titulo": "Dentista",
      "data": "2026-11-14",
      "hora": "09:30",
      "local": "Clínica Sorriso",
      "observacao": "Levar o cartão do convênio.",
      "criadoEm": "2026-11-04T18:20:00.000Z",
      "atualizadoEm": "2026-11-04T18:20:00.000Z"
    },
    {
      "id": "c-1731590500000-a81x",
      "titulo": "Prova de Banco de Dados",
      "data": "2026-11-17",
      "hora": null,
      "local": null,
      "observacao": null,
      "criadoEm": "2026-11-04T18:22:00.000Z",
      "atualizadoEm": "2026-11-04T18:22:00.000Z"
    }
  ]
}
```
**Regras dos campos**
- `versao`: número do formato (começa em `1`). Serve para mudanças futuras, como exportar e importar.
- `id`: único, criado pelo código ao salvar pela primeira vez. Não muda ao editar.
- `titulo`: obrigatório, de 1 a 100 caracteres, sem espaços nas pontas.
- `data`: obrigatória, no formato `AAAA-MM-DD` (o mesmo do `input type="date"`).
- `hora`: `HH:MM` (24h) ou `null`. `null` = dia todo.
- `local` e `observacao`: texto ou `null` (campo vazio vira `null`).
- `criadoEm` e `atualizadoEm`: data e hora da criação e da última edição, no formato ISO.

### Versão 2 (a partir da Entrega 2b)

Já pensada para as Etapas 3 e 4: os campos `duracaoMin` e `itens` foram criados na Entrega 2b, vazios, para não precisar de outra migração. **A Etapa 3 continua na versão 2** e passa a preencher esses dois campos. A Etapa 4 também continua na versão 2, sem campo novo.

```json
{
  "versao": 2,
  "compromissos": [
    {
      "id": "c-1731590400000-k3f9",
      "titulo": "Dentista",
      "data": "2026-11-14",
      "hora": "09:30",
      "local": "Clínica Sorriso",
      "observacao": "Levar o cartão do convênio.",
      "antecedenciaMin": 40,
      "cobrar": false,
      "status": "aberto",
      "concluidoEm": null,
      "duracaoMin": 60,
      "itens": [
        { "texto": "Cartão do convênio", "feito": true },
        { "texto": "Documento com foto", "feito": false }
      ],
      "criadoEm": "2026-11-04T18:20:00.000Z",
      "atualizadoEm": "2026-11-06T08:10:00.000Z"
    },
    {
      "id": "c-1731590600000-p2zq",
      "titulo": "Marcar oftalmologista",
      "data": null,
      "hora": null,
      "local": null,
      "observacao": null,
      "antecedenciaMin": null,
      "cobrar": false,
      "status": "aberto",
      "concluidoEm": null,
      "duracaoMin": null,
      "itens": [],
      "criadoEm": "2026-11-05T10:00:00.000Z",
      "atualizadoEm": "2026-11-05T10:00:00.000Z"
    }
  ]
}
```
**Regras dos campos (além das da versão 1)**
- `data`: `AAAA-MM-DD` ou `null` (`null` = sem data, US16). Se `data` for `null`, `hora` também é `null`.
- `antecedenciaMin`: inteiro de 1 a 720 ou `null`. Só pode ter valor se `hora` tiver valor.
- `cobrar`: `true` ou `false`. Só pode ser `true` se `data` tiver valor.
- `status`: `"aberto"`, `"feito"` ou `"nao-vou-fazer"`. Item sem data é sempre `"aberto"`.
- `concluidoEm`: data e hora ISO de quando virou "feito" ou "nao-vou-fazer", ou `null`.
- `duracaoMin` *(usado a partir da Etapa 3a, US19)*: inteiro de 1 a 1439 ou `null` (`null` = sem hora de fim). Só pode ter valor se `hora` tiver valor, e hora + `duracaoMin` não pode passar de 23:59. Na Etapa 2 era sempre `null`.
- `itens` *(usado a partir da Etapa 3a, US17 e US18)*: lista de no máximo 20 objetos `{ "texto": ..., "feito": ... }`, na ordem em que foram adicionados. `texto`: de 1 a 60 caracteres, sem espaços nas pontas. `feito`: `true` ou `false`. Vale para qualquer compromisso, com ou sem data. Na Etapa 2 era sempre `[]`.
- Ao **ler** dados ou importar arquivos (US07, US09), um campo novo ausente ou com valor fora da regra recebe o valor padrão (`null`, `false`, `"aberto"` ou `[]`), sem descartar o item. O item só é descartado pelas regras de título, data e hora.
- Regras de leitura dos campos da Etapa 3: `duracaoMin` fora da regra (não inteiro, fora de 1 a 1439, sem hora ou passando de 23:59) vira `null`. `itens` que não seja lista vira `[]`. Dentro da lista, um item sem `texto` válido (vazio ou só espaços) é ignorado; um texto maior que 60 é cortado em 60; `feito` só é `true` se for exatamente `true`; do 21º item em diante, eles são ignorados.

### Preferências (Etapa 3b)

```json
{
  "tema": "escuro",
  "letra": "normal"
}
```
- Guardadas em `agenda:preferencias`, separadas dos compromissos (não mudam a `versao` dos compromissos).
- `tema`: `"escuro"` (padrão) ou `"claro"`.
- `letra`: `"normal"` (padrão) ou `"grande"`.
- Chave ausente, JSON inválido ou valor fora da regra: vale o padrão daquele campo, sem aviso e sem apagar a chave.
- Não vão no arquivo de cópia (são do aparelho, não dos compromissos) e não gravam `agenda:ultima-mudanca`.

### Arquivo de cópia (US08 e US09)

```json
{
  "app": "agenda",
  "versao": 2,
  "exportadoEm": "2026-11-05T21:10:00.000Z",
  "compromissos": [ "...mesmo formato da versão em uso..." ]
}
```
- Na Entrega 2a o arquivo sai com `"versao": 1`; a partir da 2b, com `"versao": 2`. Na Etapa 3 continua com `"versao": 2`, agora com `duracaoMin` e `itens` preenchidos.
- Na importação, `app` e `exportadoEm` são opcionais (assim também dá para importar o conteúdo puro de `agenda:compromissos`). O que define o formato é a `versao` e a lista `compromissos`.
- **Risco aceito (Etapa 3):** como a versão não muda, uma cópia feita na Etapa 3 e importada numa Agenda da Etapa 2 perderia o checklist e a hora de fim sem avisar. Isso só aconteceria com uma versão antiga do site, que não fica publicada.

---

## 4. Priorização

| Etapa | Itens |
|---|---|
| **Etapa 1 (MVP)** | US01 Lista por dia, US02 Criar, US03 Avisos do formulário, US04 Editar, US05 Excluir com confirmação, US06 Anteriores, US07 Salvo no navegador com aviso, além dos requisitos gerais da Etapa 1 |
| **Etapa 2, Entrega 2a** | US08 Baixar cópia, US09 Importar cópia, US10 Lembrete de cópia, mudanças da US01 e da US07 (cabeçalho, foco no título e chaves novas) e requisitos gerais da Etapa 2 |
| **Etapa 2, Entrega 2b** | US11 Migração para a versão 2, US12 "Sair às...", US13 Feito e desfazer, US14 "Me cobrar" e "Ficou pendente", US15 Resolver pendência, US16 "Sem data", mudanças nas US01 a US07 e requisitos gerais da Etapa 2 |
| **Etapa 3, Entrega 3a** | US17 Checklist no formulário, US18 Marcar o checklist no card, US19 Hora de fim, US20 Conflito e aperto, mudanças da Etapa 3a nas stories anteriores e requisitos gerais da Etapa 3 |
| **Etapa 3, Entrega 3b** | US21 Faixa dos próximos 7 dias, US22 Tema claro e escuro, US23 Letra grande, mudanças da Etapa 3b nas stories anteriores e requisitos gerais da Etapa 3 |
| **Etapa 4, Entrega 4a** | US24 Campo "Criar por frase", US25 Entender a data, US26 Entender a hora, US27 O título é o que sobra, US28 Rascunho com a linha "Entendi", mudanças da Etapa 4a nas stories anteriores e requisitos gerais da Etapa 4 |
| **Etapa 4, Entrega 4b** | US29 Hora de fim pela frase, US30 Tempo para sair pela frase, US31 "levar" vira o checklist, US32 Local com "no"/"na", mudanças da Etapa 4b nas stories anteriores e requisitos gerais da Etapa 4 |

Ordem sugerida dentro da Etapa 1: modelo de dados e US07 (salvar e carregar) → US02 e US03 (formulário) → US01 (lista) → US06 (Anteriores) → US04 (editar) → US05 (excluir) → requisitos gerais → testador escreve `docs/projetos/agenda/testes/etapa-1.md` → commit da agenda e depois da Labs (US31 da Labs) → professor escreve as aulas (US34 da Labs).

Ordem sugerida na Entrega 2a: artista desenha a janela "Seus dados" e a faixa de cópia (feito: seção 12 do design) → US08 (baixar) → US09 (importar, com o teste de "ida e volta") → US10 (lembrete) → testador escreve `docs/projetos/agenda/testes/etapa-2a.md` → commits (agenda e depois Labs) → aulas.

Ordem sugerida na Entrega 2b: artista desenha as partes novas → US11 (migração, testada com dados reais da versão 1 e com um arquivo da 2a) → US16 (sem data, porque mexe no formulário e na regra da data) → US13 (feito) → US14 e US15 (pendências) → US12 (sair às) → mudanças nas US01 a US07 → testador escreve `docs/projetos/agenda/testes/etapa-2b.md` → commits → aulas.

Ordem sugerida na Entrega 3a: artista desenha o formulário novo (hora de fim e "O que levar"), o checklist no card e os avisos de conflito e de aperto → regras de leitura de `duracaoMin` e `itens` (seção 3), testadas com dados e um arquivo da Etapa 2 → US19 (hora de fim, porque mexe no formulário e na Hora) → US20 (conflito e aperto, que depende da US19) → US17 (checklist no formulário) → US18 (checklist no card) → mudanças nas stories anteriores → testador escreve `docs/projetos/agenda/testes/etapa-3a.md` → commits → aulas.

Ordem sugerida na Entrega 3b: artista desenha a faixa da semana, a paleta do tema claro (para **todas** as partes, inclusive as da 3a) e o lugar dos botões de aparência → `agenda:preferencias` e o script do `head` → US22 (tema) → US23 (letra) → US21 (faixa da semana, já nos dois temas) → testador escreve `docs/projetos/agenda/testes/etapa-3b.md` (contraste nos dois temas e letra grande a 360px) → commits → aulas.

Ordem sugerida na Entrega 4a: artista desenha o campo "Criar por frase" e a linha "Entendi" (dois temas, letra grande, 360px) → função de análise sem tela (US25, US26 e US27), conferida no console com a tabela da 4a → US24 (campo e botão) → US28 (rascunho no formulário, foco e leitor de tela) → testador escreve `docs/projetos/agenda/testes/etapa-4a.md` (as 52 frases, uma por uma, e a acessibilidade) → commits → aulas (bom momento para o professor ensinar expressões regulares).

Ordem sugerida na Entrega 4b: artista ajusta a linha "Entendi" para as partes novas e o aviso de mais de 20 itens → pedaços compostos (US29 e US30), com a regra de "trecho já usado não é lido de novo" → pedaços de texto livre (US32 local, depois US31 levar) → testador escreve `docs/projetos/agenda/testes/etapa-4b.md` (tabela da 4b e de novo a tabela da 4a) → commits → aulas.

---

## 5. Fora do escopo / evoluções futuras

**Etapa 3 "organizar o tempo"**: detalhada na seção 2 (US17 a US23), aprovada pelo João em 2026-11-06.

**Etapa 4 "captura rápida"**
1. **I10 Criar um compromisso escrevendo uma frase**: detalhada na seção 2 (US24 a US32), aprovada pelo João em 2026-11-09. Entendida só com regras em JavaScript, **sem** inteligência artificial externa e sem chave de API. A frase vira um rascunho do formulário para a pessoa conferir antes de salvar.

**Depois (sem etapa definida, na ordem de prioridade atual)**
2. **Calendário do mês** (era a primeira evolução da lista antiga; o João decidiu fazer as Etapas 2 a 4 antes) e visões de dia e de semana. *(A faixa dos próximos 7 dias, US21, é o passo intermediário.)*
3. **I8 Repetição flexível:** "toda segunda", "todo mês no dia 10" e "a cada N dias depois de feito" (combina com o "Feito" da US13).
4. **I2 Enviar ao calendário do celular (.ics):** a saída realista para lembrete com o site fechado. Cópia de mão única.
5. **I4 Painel "Agora" e notificação do navegador.** **Limitação:** sem servidor, só avisa com a aba aberta; no Android precisa de service worker e no iPhone só funciona com o site instalado na tela inicial. Lembrete com o site fechado exige push com servidor.
6. **I13 Compartilhar um compromisso por link** (dados no próprio endereço, sem servidor; o link é uma cópia e os dados ficam visíveis nele).
7. Busca por texto.
8. Categorias com cores.
9. Arrastar e soltar um compromisso para outro dia ou horário.
10. Desfazer uma exclusão.
11. **Agenda 2.0** com back-end em Java (vai precisar de exceção de tecnologia aprovada nos requisitos dela e de outra hospedagem, porque o GitHub Pages só publica sites estáticos).

**Fora do escopo da Etapa 1**
- Login, contas, sincronizar entre aparelhos ou guardar os dados fora do navegador.
- Bibliotecas, frameworks ou etapa de build (inclusive bibliotecas de calendário ou de datas).
- Notificações do navegador, e-mail ou qualquer envio de dados para a internet.
- Versão em outros idiomas e formato de hora de 12h (AM/PM).
- Testes automatizados no repositório (o teste do testador é manual, como na Labs).

**Fora do escopo da Etapa 2**
- Sincronização automática entre aparelhos: a cópia (US08 e US09) é manual.
- Notificações do navegador e lembretes com o site fechado (ver I4 e I2).
- Repetição de compromissos (I8), checklist (I5), duração e conflito (I7), tema claro (I12): os campos de dados já ficam reservados, mas nada disso aparece na tela.
- Marcar "Feito" em item sem data.
- Apagar sozinho as cópias de segurança (`agenda:compromissos-v1`, `agenda:compromissos-antes-da-importacao`): elas ficam guardadas.
- Bibliotecas, frameworks, back-end e testes automatizados (as mesmas restrições da Etapa 1).

**Fora do escopo da Etapa 3**
- Compromisso que passa da meia-noite (a hora de fim vai no máximo até 23:59 do mesmo dia) e compromisso de vários dias.
- Hora de fim em compromisso de dia todo ou sem data.
- Conflito ou aperto com compromissos de dia todo, entre dias diferentes, ou mostrado em "Anteriores", "Ficou pendente" e "Sem data".
- Bloquear o salvamento por causa de um conflito, ou sugerir outro horário.
- Considerar o tempo de volta ou o deslocamento entre locais (o aperto usa só o "Tempo para sair" do segundo compromisso).
- Checklist modelo que se repete, reordenar itens, editar o texto de um item (é só remover e adicionar de novo) e botão de desmarcar todos.
- Marcar o compromisso como "Feito" sozinho quando todos os itens do checklist estão marcados.
- Faixa da semana com mais de 7 dias, navegação para outras semanas, ou criar compromisso tocando num dia livre.
- Tema "igual ao aparelho" (segue o sistema), outros temas ou cores escolhidas pela pessoa, e mais de dois tamanhos de letra.
- Levar as preferências no arquivo de cópia.
- Notificações do navegador, bibliotecas, frameworks, back-end e testes automatizados (as mesmas restrições das Etapas 1 e 2).

**Fora do escopo da Etapa 4**
- Histórico de frases, sugestões enquanto digita ou completar a frase sozinho. A frase não é guardada.
- Inteligência artificial, servidor, chave de API ou biblioteca de datas ou de linguagem.
- Salvar direto, sem passar pelo formulário (a frase sempre vira rascunho).
- Nomes de mês ("15 de novembro"), datas relativas longas ("semana que vem", "daqui a 3 dias", "mês que vem", "fim de semana") e partes do dia sem número ("hoje à noite", "amanhã de manhã").
- "da madrugada", "meio-dia e meia", "10 e meia", números por extenso ("dez horas") e o formato de 12h com AM/PM.
- Adivinhar a tarde ("às 3" continua 03:00) e corrigir erros de digitação ("amanh", "sextaa").
- Repetição pela frase ("toda segunda": ver I8), mais de um compromisso numa frase só e frases em outros idiomas.
- Na 4b: local com "em", "nos" ou "nas"; intervalo sem "das" ("10h-11h", "de 10 a 11"); compromisso que passa da meia-noite pela frase; "Me cobrar" e observação pela frase.
- Usar a frase para editar, remarcar ou agendar um compromisso que já existe.
- Ditado por voz como função da Agenda (o ditado do teclado do celular funciona, porque escreve no campo como texto).
- Testes automatizados no repositório (o testador confere as tabelas à mão ou no console).
