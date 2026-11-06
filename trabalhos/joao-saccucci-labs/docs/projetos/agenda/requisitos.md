# Requisitos: Agenda

## 1. Visão do produto

A **Agenda** é um site simples para anotar compromissos. A pessoa abre o site, vê os próximos compromissos agrupados por dia e consegue criar, editar e excluir cada um. É o primeiro projeto independente da João Saccucci Labs: tem repositório, site e README próprios (ver US30 a US38 nos requisitos da Labs), e as aulas do professor ficam na aba Aulas da Labs.

**Plano de evolução (aprovado pelo João em 2026-11-05):** antes de partir para back-end e banco de dados, a Agenda cresce no próprio navegador, focada em problemas que uma agenda comum não resolve bem.
- **Etapa 1 (MVP, entregue):** lista por dia, criar, editar, excluir, "Anteriores" e salvar no navegador.
- **Etapa 2 "nada cai no esquecimento":** cópia e importação dos dados, "Sair às...", "Feito" e pendências, itens "Sem data". Dividida em **Entrega 2a** e **Entrega 2b**.
- **Etapa 3 "organizar o tempo"** e **Etapa 4 "captura rápida":** ver seção 5.

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

**Direção visual** (quem detalha é o artista): visual **próprio**, mas da mesma família da Labs, com a mesma qualidade e o mesmo "jeito de estúdio". O João quer que a Agenda tenha personalidade própria: o artista tem liberdade para ousar na cor e no clima. O design fica em `docs/projetos/agenda/design.md`. As partes novas da Etapa 2 (janela "Seus dados", faixa de cópia, "Sair às", "Ficou pendente", "Sem data", situação em "Anteriores") seguem o conceito "quadro de partidas ao anoitecer" e são detalhadas pelo artista no mesmo arquivo (Entrega 2a: seção 12 do design).

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

## 3. Regras e modelo de dados

### Quando um compromisso "passou"
- **Com hora:** passou quando o horário atual for **depois** do minuto marcado. Ex.: um compromisso de hoje às 10:00 continua na lista às 10:00 e vai para "Anteriores" às 10:01.
- **Sem hora (dia todo):** passou a partir da meia-noite do dia seguinte (00:00). Ex.: um compromisso de dia todo em 14/11 fica na lista até 23:59 de 14/11.
- **Sem data (Etapa 2b):** nunca passa.
- O compromisso guarda só a hora de início (não tem hora de fim; ela está planejada para a Etapa 3).
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
| `agenda:preferencias` | **reservada** para tema e tamanho de letra (Etapa 3, I12). Não é usada na Etapa 2. | Etapa 3 |

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

Já pensada para as Etapas 3 e 4: os campos `duracaoMin` e `itens` são criados agora, vazios, para não precisar de outra migração.

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
      "duracaoMin": null,
      "itens": [],
      "criadoEm": "2026-11-04T18:20:00.000Z",
      "atualizadoEm": "2026-11-04T18:20:00.000Z"
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
- `duracaoMin`: **reservado para a Etapa 3** (I7). Sempre `null` na Etapa 2.
- `itens`: **reservado para a Etapa 3** (I5, checklist). Sempre `[]` na Etapa 2.
- Ao **ler** dados ou importar arquivos (US07, US09), um campo novo ausente ou com valor fora da regra recebe o valor padrão (`null`, `false`, `"aberto"` ou `[]`), sem descartar o item. O item só é descartado pelas regras de título, data e hora.

### Arquivo de cópia (US08 e US09)

```json
{
  "app": "agenda",
  "versao": 2,
  "exportadoEm": "2026-11-05T21:10:00.000Z",
  "compromissos": [ "...mesmo formato da versão em uso..." ]
}
```
- Na Entrega 2a o arquivo sai com `"versao": 1`; a partir da 2b, com `"versao": 2`.
- Na importação, `app` e `exportadoEm` são opcionais (assim também dá para importar o conteúdo puro de `agenda:compromissos`). O que define o formato é a `versao` e a lista `compromissos`.

---

## 4. Priorização

| Etapa | Itens |
|---|---|
| **Etapa 1 (MVP)** | US01 Lista por dia, US02 Criar, US03 Avisos do formulário, US04 Editar, US05 Excluir com confirmação, US06 Anteriores, US07 Salvo no navegador com aviso, além dos requisitos gerais da Etapa 1 |
| **Etapa 2, Entrega 2a** | US08 Baixar cópia, US09 Importar cópia, US10 Lembrete de cópia, mudanças da US01 e da US07 (cabeçalho, foco no título e chaves novas) e requisitos gerais da Etapa 2 |
| **Etapa 2, Entrega 2b** | US11 Migração para a versão 2, US12 "Sair às...", US13 Feito e desfazer, US14 "Me cobrar" e "Ficou pendente", US15 Resolver pendência, US16 "Sem data", mudanças nas US01 a US07 e requisitos gerais da Etapa 2 |

Ordem sugerida dentro da Etapa 1: modelo de dados e US07 (salvar e carregar) → US02 e US03 (formulário) → US01 (lista) → US06 (Anteriores) → US04 (editar) → US05 (excluir) → requisitos gerais → testador escreve `docs/projetos/agenda/testes/etapa-1.md` → commit da agenda e depois da Labs (US31 da Labs) → professor escreve as aulas (US34 da Labs).

Ordem sugerida na Entrega 2a: artista desenha a janela "Seus dados" e a faixa de cópia (feito: seção 12 do design) → US08 (baixar) → US09 (importar, com o teste de "ida e volta") → US10 (lembrete) → testador escreve `docs/projetos/agenda/testes/etapa-2a.md` → commits (agenda e depois Labs) → aulas.

Ordem sugerida na Entrega 2b: artista desenha as partes novas → US11 (migração, testada com dados reais da versão 1 e com um arquivo da 2a) → US16 (sem data, porque mexe no formulário e na regra da data) → US13 (feito) → US14 e US15 (pendências) → US12 (sair às) → mudanças nas US01 a US07 → testador escreve `docs/projetos/agenda/testes/etapa-2b.md` → commits → aulas.

---

## 5. Fora do escopo / evoluções futuras

**Etapa 3 "organizar o tempo"** *(aprovada como direção pelo João em 2026-11-05; requisitos detalhados depois)*
1. **I5 Checklist "O que levar"** dentro do compromisso (usa o campo `itens`, já reservado).
2. **I6 Faixa da semana:** os próximos 7 dias com a quantidade de compromissos e os dias livres. É o passo intermediário até o calendário do mês.
3. **I7 Hora de fim (duração) e aviso de conflito e de "aperto"** entre dois compromissos (usa o campo `duracaoMin`, já reservado). *A "hora de fim", que estava fora do escopo da Etapa 1, foi aprovada como direção para esta etapa.*
4. **I12 Tema claro e letra maior**, guardados em `agenda:preferencias`.

**Etapa 4 "captura rápida"**
5. **I10 Criar um compromisso escrevendo uma frase** (ex.: "dentista sexta às 9h"), entendida só com regras em JavaScript, **sem** inteligência artificial externa e sem chave de API. A frase vira um rascunho do formulário para a pessoa conferir antes de salvar.

**Depois (sem etapa definida, na ordem de prioridade atual)**
6. **Calendário do mês** (era a primeira evolução da lista antiga; o João decidiu fazer as Etapas 2 a 4 antes) e visões de dia e de semana.
7. **I8 Repetição flexível:** "toda segunda", "todo mês no dia 10" e "a cada N dias depois de feito" (combina com o "Feito" da US13).
8. **I2 Enviar ao calendário do celular (.ics):** a saída realista para lembrete com o site fechado. Cópia de mão única.
9. **I4 Painel "Agora" e notificação do navegador.** **Limitação:** sem servidor, só avisa com a aba aberta; no Android precisa de service worker e no iPhone só funciona com o site instalado na tela inicial. Lembrete com o site fechado exige push com servidor.
10. **I13 Compartilhar um compromisso por link** (dados no próprio endereço, sem servidor; o link é uma cópia e os dados ficam visíveis nele).
11. Busca por texto.
12. Categorias com cores.
13. Arrastar e soltar um compromisso para outro dia ou horário.
14. Desfazer uma exclusão.
15. **Agenda 2.0** com back-end em Java (vai precisar de exceção de tecnologia aprovada nos requisitos dela e de outra hospedagem, porque o GitHub Pages só publica sites estáticos).

**Fora do escopo da Etapa 1**
- Login, contas, sincronizar entre aparelhos ou guardar os dados fora do navegador.
- Hora de fim ou duração do compromisso. *(Planejada para a Etapa 3, I7.)*
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
