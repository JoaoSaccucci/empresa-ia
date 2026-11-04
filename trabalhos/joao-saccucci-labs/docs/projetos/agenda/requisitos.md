# Requisitos: Agenda

## 1. Visão do produto

A **Agenda** é um site simples para anotar compromissos. A pessoa abre o site, vê os próximos compromissos agrupados por dia e consegue criar, editar e excluir cada um. É o primeiro projeto independente da João Saccucci Labs: tem repositório, site e README próprios (ver US30 a US38 nos requisitos da Labs), e as aulas do professor ficam na aba Aulas da Labs.

- Repositório: `github.com/JoaoSaccucci/agenda` (só o código e o README).
- Site: `https://joaosaccucci.github.io/agenda/`.
- Estes requisitos, o design e os relatórios de teste ficam na Labs, em `trabalhos/joao-saccucci-labs/docs/projetos/agenda/`.
- A numeração é própria deste projeto: "Agenda US01", "Agenda US02"... Neste arquivo, "US01" sempre quer dizer "Agenda US01".

**Restrições técnicas**
- HTML, CSS e JavaScript puros, sem framework, sem bibliotecas, sem back-end e sem etapa de build.
- Uma página só (`index.html`), com `lang="pt-BR"`.
- Os dados ficam no `localStorage` do navegador de quem usa. Cada pessoa vê só a própria agenda, sem login.
- **Limitações aceitas pelo João:** os compromissos não sincronizam entre aparelhos ou navegadores e somem se o navegador for limpo.
- Todas as chaves do `localStorage` começam com `agenda:`. O código **nunca** usa `localStorage.clear()`, porque a Agenda divide o mesmo `localStorage` com o site da Labs (mesmo endereço base `joaosaccucci.github.io`).
- Datas e horas seguem o relógio e o fuso do aparelho de quem usa.
- Precisa funcionar bem no celular, a partir de 360px de largura.
- Precisa funcionar publicado no GitHub Pages, com caminhos relativos.

**Direção visual** (quem detalha é o artista): visual **próprio**, mas da mesma família da Labs, com a mesma qualidade e o mesmo "jeito de estúdio". O João quer que a Agenda tenha personalidade própria: o artista tem liberdade para ousar na cor e no clima. O design fica em `docs/projetos/agenda/design.md`.

---

## 2. User stories

### Etapa 1 (MVP)

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

## 3. Regras e modelo de dados

### Quando um compromisso "passou"
- **Com hora:** passou quando o horário atual for **depois** do minuto marcado. Ex.: um compromisso de hoje às 10:00 continua na lista às 10:00 e vai para "Anteriores" às 10:01.
- **Sem hora (dia todo):** passou a partir da meia-noite do dia seguinte (00:00). Ex.: um compromisso de dia todo em 14/11 fica na lista até 23:59 de 14/11.
- O compromisso guarda só a hora de início (não tem hora de fim).
- A regra usa o relógio e o fuso do aparelho de quem usa.

### Títulos dos dias
| Situação | Título |
|---|---|
| Hoje | "Hoje" |
| Amanhã | "Amanhã" |
| Ontem (só em "Anteriores") | "Ontem" |
| Outro dia, mesmo ano | dia da semana abreviado + data, ex.: "Sex, 14/11" (e, na lista principal, " · daqui a 3 dias") |
| Outro dia, outro ano | com o ano, ex.: "Sex, 14/11/2027" |

Abreviações dos dias: Dom, Seg, Ter, Qua, Qui, Sex, Sáb. "daqui a X dias" conta dias de calendário, não horas.

### `localStorage`
| Chave | Valor |
|---|---|
| `agenda:compromissos` | objeto com a versão do formato e a lista de compromissos (abaixo) |
| `agenda:compromissos-corrompido` | cópia do conteúdo de `agenda:compromissos` quando ele estava corrompido (US07) |

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

---

## 4. Priorização

| Etapa | Itens |
|---|---|
| **Etapa 1 (MVP)** | US01 Lista por dia, US02 Criar, US03 Avisos do formulário, US04 Editar, US05 Excluir com confirmação, US06 Anteriores, US07 Salvo no navegador com aviso, além dos requisitos gerais da Etapa 1 |

Ordem sugerida dentro da Etapa 1: modelo de dados e US07 (salvar e carregar) → US02 e US03 (formulário) → US01 (lista) → US06 (Anteriores) → US04 (editar) → US05 (excluir) → requisitos gerais → testador escreve `docs/projetos/agenda/testes/etapa-1.md` → commit da agenda e depois da Labs (US31 da Labs) → professor escreve as aulas (US34 da Labs).

---

## 5. Fora do escopo / evoluções futuras

**Evoluções futuras (na ordem de prioridade que o João indicou até agora)**
1. **Calendário do mês:** a primeira evolução.
2. Visões de dia e de semana.
3. Compromissos que se repetem (ex.: toda segunda).
4. Lembretes e avisos perto da hora. **Limitação:** sem servidor, um lembrete só funciona com a aba da Agenda aberta.
5. Busca por texto.
6. Categorias com cores.
7. Aviso de conflito (dois compromissos no mesmo horário).
8. Arrastar e soltar um compromisso para outro dia ou horário.
9. Criar um compromisso escrevendo uma frase (ex.: "dentista sexta às 9h"), entendida só com regras em JavaScript, **sem** inteligência artificial externa e sem chave de API.
10. Tarefas ou checklist dentro do compromisso.
11. Marcar um compromisso como feito.
12. Desfazer uma exclusão.
13. Exportar e importar os compromissos em arquivo.
14. **Agenda 2.0** com back-end em Java (vai precisar de exceção de tecnologia aprovada nos requisitos dela e de outra hospedagem, porque o GitHub Pages só publica sites estáticos).

**Fora do escopo da Etapa 1**
- Login, contas, sincronizar entre aparelhos ou guardar os dados fora do navegador.
- Hora de fim ou duração do compromisso.
- Bibliotecas, frameworks ou etapa de build (inclusive bibliotecas de calendário ou de datas).
- Notificações do navegador, e-mail ou qualquer envio de dados para a internet.
- Versão em outros idiomas e formato de hora de 12h (AM/PM).
- Testes automatizados no repositório (o teste do testador é manual, como na Labs).
