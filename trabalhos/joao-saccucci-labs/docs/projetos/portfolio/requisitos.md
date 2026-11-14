# Requisitos: Portfólio

## 1. Visão do produto

O **Portfólio** é o site pessoal do João, feito para **conseguir um estágio em desenvolvimento** (full stack ou aberto). O público principal é o **recrutador**, que olha a página por 30 a 60 segundos: em pouco tempo ele precisa saber quem é o João, o que ele estuda, o que ele já construiu, quais certificados tem e como falar com ele.

A estrutura é **convencional** (fácil de achar tudo), e a personalidade vem de três coisas: as **animações**, as **cores próprias** (as mesmas da Agenda, criando uma "marca") e o **texto** que conta a história do João (a empresa em que os funcionários são agentes de IA). A inspiração é o ekizr.com (fundo escuro, manchas de cor animadas, cartões de vidro, animação ao rolar, cartões com inclinação), mas o layout e os textos **não** são copiados: o site não pode parecer "portfólio genérico".

É um projeto independente da João Saccucci Labs, como a Agenda.
- Repositório: `github.com/JoaoSaccucci/portfolio` (só o código e o README).
- Site: `https://joaosaccucci.github.io/portfolio/`.
- Código no computador: `trabalhos/portfolio/`, com Git próprio.
- Estes requisitos, o design e os relatórios de teste ficam na Labs, em `trabalhos/joao-saccucci-labs/docs/projetos/portfolio/` (`requisitos.md`, `design.md` e `testes/etapa-<N>.md`). As aulas ficam na Labs, em `aulas/portfolio/`.
- A numeração é própria deste projeto: "Portfólio US01", "Portfólio US02"... Neste arquivo, "US01" sempre quer dizer "Portfólio US01".

**Restrições técnicas**
- HTML, CSS e JavaScript puros, sem framework, sem bibliotecas (nem de animação), sem React, sem back-end e sem etapa de build.
- Uma página só (`index.html`), com rolagem (one-page).
- Funciona publicado no GitHub Pages, com caminhos relativos.
- A única coisa guardada no navegador é a escolha de idioma, no `localStorage`, com chave que começa com `portfolio:`. O código **nunca** usa `localStorage.clear()` e não lê nem altera chaves de outros sites do mesmo endereço base (`jsl:` da Labs, `agenda:` da Agenda).
- Nenhum dado é enviado para a internet: sem formulário, sem contador de visitas, sem serviço externo.

**Direção visual** (quem detalha é o artista, em `docs/projetos/portfolio/design.md`): fundo azul-noite `#0f0d1a`, âmbar `#f59e0b` e lilás `#c084fc`, as mesmas cores da Agenda. O artista define os detalhes, as variações e o contraste, a tipografia e o layout de cada seção.

**Decisões aprovadas pelo João em 2026-11-14**
1. Idiomas: português (padrão) e inglês, com botão de troca. A escolha pode ser lembrada no `localStorage`. O `lang` do `html` acompanha a troca.
2. Seções, nesta ordem: Topo, Sobre mim, Projetos, Certificados, Contato/rodapé. Menu de navegação para as seções.
3. Cores: `#0f0d1a`, `#f59e0b` e `#c084fc`, como na Agenda.
4. Topo com foto real, nome, frase, localização e botões LinkedIn e GitHub.
5. Texto do Sobre mim aprovado (seção 3.1). A versão em inglês é traduzida a partir dele e aprovada pelo João.
6. Quatro projetos em destaque e uma lista curta de "Outros projetos" (seção 3.2).
7. Certificados em 4 grupos, com botão "Verificar" (link oficial), sem PDF e sem imagem do certificado (seção 3.3).
8. Contato: só LinkedIn e GitHub, no topo e no rodapé.
9. Efeitos: manchas animadas no fundo, elementos que surgem ao rolar, print do projeto que "se abre", cartão que inclina com o mouse e luz que segue o mouse. Com movimento reduzido, tudo parado e visível. Sem JavaScript, tudo legível. Leve no celular.
10. Qualidade no padrão da empresa e README próprio.
11. Integração com a Labs: entra em `projetos.json` como a Agenda e tem aulas em `aulas/portfolio/`.

---

## 2. User stories

### Conteúdo

**Portfólio US01: Página única com menu de navegação**
Como recrutador, quero achar rápido cada parte do portfólio, para ver o que me interessa nos poucos segundos que tenho.
- [ ] A página tem as seções nesta ordem: Topo, Sobre mim, Projetos, Certificados, Contato/rodapé.
- [ ] Cada seção (menos o Topo) tem um título `h2` visível. Há um só `h1`, com o nome "João Saccucci".
- [ ] Há um menu de navegação (`nav`) com links para Sobre mim, Projetos, Certificados e Contato. Cada link leva até a seção pelo endereço com `#` (ex.: `#projetos`), e o endereço funciona se for aberto direto ou compartilhado.
- [ ] *(Aprovado pelo João em 2026-11-14)* Tudo fica visível rolando a página normalmente, sem abas que escondem conteúdo. O menu fica **fixo no topo** e sempre visível, funcionando como "abas" para ir direto a cada seção.
- [ ] Ao clicar num item do menu, a página desliza suavemente até a seção. Com `prefers-reduced-motion`, ela pula direto, sem deslizar.
- [ ] Enquanto o visitante rola, o item do menu da seção em que ele está fica destacado, com `aria-current` e um sinal que não depende só de cor.
- [ ] Ao seguir um link do menu, o título da seção não fica escondido atrás do menu fixo.
- [ ] No celular, o menu cabe sem rolagem horizontal. Se o artista escolher um menu que abre e fecha, o botão tem rótulo acessível, `aria-expanded`, funciona com clique, toque, Enter e Espaço, fecha com Esc e ao escolher um link.
- [ ] O menu tem também o botão de idioma (US08).
- [ ] Há um link "Pular para o conteúdo" que aparece ao receber o foco pelo teclado.
- [ ] A página usa as marcações certas: `header`, `nav`, `main`, `section` e `footer`.
- [ ] A página tem `title` e `meta name="description"` próprios, nos dois idiomas (acompanham a troca, US08).

**Portfólio US02: Topo (apresentação)**
Como recrutador, quero ver logo de cara quem é a pessoa, o que ela busca e onde ela está, para decidir em segundos se o perfil serve para a vaga.
- [ ] O Topo mostra, nesta ordem de leitura:
  - a foto real do João (arquivo fornecido por ele), com `alt` descritivo (ex.: "Foto de João Saccucci");
  - o nome "João Saccucci" (`h1`);
  - a frase "Estudante de Análise e Desenvolvimento de Sistemas, procurando estágio em desenvolvimento.";
  - a linha "Grande São Paulo (ABC) · presencial, híbrido ou remoto";
  - os botões "LinkedIn" e "GitHub".
- [ ] "GitHub" leva para `https://github.com/JoaoSaccucci`. "LinkedIn" leva para a URL que o João vai informar (ver seção 6).
- [ ] Os dois botões abrem em nova aba, com `rel="noopener noreferrer"`, e avisam isso ao leitor de tela (ex.: texto escondido "(abre em nova aba)").
- [ ] Num celular de 360 × 640px e num computador de 1366 × 768px, o nome, a frase e os dois botões aparecem sem rolar a página.
- [ ] A foto tem `width` e `height` no HTML (a página não "pula" quando ela carrega) e é otimizada para a web (ver US13).
- [ ] O Topo **não** tem efeito de digitação, números ("anos de experiência", "X projetos") nem botão de currículo.

**Portfólio US03: Sobre mim**
Como recrutador, quero ler em poucas linhas a história e o foco de estudo do candidato, para entender o que ele sabe e como ele aprende.
- [ ] A seção mostra o texto aprovado da seção 3.1, sem mudar nenhuma palavra (em português), em parágrafos separados.
- [ ] A linha "Estudando agora: JavaScript e Java." fica destacada visualmente do resto do texto (o artista decide como), mas continua sendo texto comum, legível sem cor.
- [ ] Em inglês, aparece a tradução aprovada pelo João (seção 3.1).
- [ ] As tecnologias citadas no texto não viram barras ou porcentagens de nível de habilidade.
- [ ] O texto tem largura confortável de leitura no computador (linhas não muito longas) e quebra sem rolagem horizontal no celular.

**Portfólio US04: Projetos em destaque**
Como recrutador, quero ver os principais projetos com imagem, descrição e links, para conferir o código e o resultado de verdade.
- [ ] A seção Projetos mostra os 4 projetos da seção 3.2, nesta ordem: Labs / empresa-ia, Agenda, Buscador-Cep, ScreenMatch.
- [ ] Cada projeto é um cartão grande com:
  - o nome do projeto (título `h3`);
  - uma imagem (print) do projeto, com `alt` que descreve o que a imagem mostra;
  - uma descrição curta (até cerca de 3 linhas no computador), nos dois idiomas;
  - as tecnologias, em texto (ex.: "JavaScript", "Java");
  - os botões indicados na seção 3.2 ("Ver site" e/ou "Ver código").
- [ ] Projetos sem site (Buscador-Cep e ScreenMatch) mostram **só** "Ver código". Não aparece botão desativado nem link quebrado.
- [ ] O nome acessível de cada botão inclui o projeto (ex.: "Ver site da Agenda", "Ver código do ScreenMatch"), porque há vários botões com o mesmo texto na página.
- [ ] Todos os links abrem em nova aba, com `rel="noopener noreferrer"` e aviso para o leitor de tela.
- [ ] O cartão da Labs / empresa-ia deixa claro, na descrição, que é a empresa em que os funcionários são agentes de IA (o diferencial do João).
- [ ] A descrição do ScreenMatch diz, com honestidade, que é um projeto feito durante um curso da Alura.
- [ ] Todos os links da seção 3.2 abrem a página certa (nenhum 404).
- [ ] Os efeitos dos cartões estão na US10 e na US11.

**Portfólio US05: Outros projetos**
Como recrutador, quero ver de relance os outros projetos, para ter uma ideia do caminho de estudo sem gastar tempo.
- [ ] Abaixo dos destaques, há uma lista curta com o título "Outros projetos", em HTML de lista (`ul`/`li`).
- [ ] Cada item mostra só o nome, a linguagem e o link para o repositório (seção 3.2): jogo_de_forca (C) e jogo-do-numero-secreto (HTML).
- [ ] Os itens não têm imagem nem descrição longa, e ocupam bem menos espaço que os cartões de destaque.
- [ ] Os links seguem as mesmas regras de nova aba e de nome acessível da US04.

**Portfólio US06: Certificados**
Como recrutador, quero ver os certificados organizados e conseguir conferir que são verdadeiros, para confiar na formação do candidato.
- [ ] A seção Certificados mostra os 4 grupos da seção 3.3, nesta ordem: Cloud, Java e Spring Boot, Banco de dados e Git, Base. Cada grupo tem um título `h3`.
- [ ] Cada certificado mostra: nome, instituição, carga horária (ex.: "20 h") e data (`DD/MM/AAAA` em português; em inglês, o formato aprovado, ver seção 6), e o botão "Verificar".
- [ ] "Verificar" abre o link oficial do certificado (seção 3.3) em nova aba, com `rel="noopener noreferrer"`. O nome acessível inclui o nome do certificado (ex.: "Verificar o certificado AWS Academy Graduate – Cloud Foundations").
- [ ] O certificado AWS Academy Graduate – Cloud Foundations aparece em **destaque** (o artista decide como), e o destaque também está no texto ou na posição, não só na cor.
- [ ] Dentro de cada grupo, os certificados ficam do mais recente para o mais antigo.
- [ ] O site **não** tem PDF, imagem ou print de nenhum certificado (eles têm nome completo e foto).
- [ ] Todos os links da seção 3.3 abrem a página certa (nenhum 404).
- [ ] No celular, a lista é fácil de rolar e não causa rolagem horizontal (nomes longos quebram linha).

**Portfólio US07: Contato e rodapé**
Como recrutador, quero saber como falar com o candidato no fim da página, para não precisar voltar ao topo.
- [ ] A seção Contato/rodapé tem um título (ex.: "Contato"), uma frase curta convidando a falar com o João (nos dois idiomas) e os botões "LinkedIn" e "GitHub", com os mesmos links e regras da US02.
- [ ] O rodapé **não** tem formulário, e-mail, telefone, endereço, CPF nem currículo em PDF.
- [ ] O rodapé pode ter uma linha discreta dizendo que o site foi feito com HTML, CSS e JavaScript puros, com link para o código no GitHub (texto final com o João).

### Idioma

**Portfólio US08: Trocar entre português e inglês**
Como recrutador, quero ler o portfólio em português ou em inglês, para entender tudo mesmo se eu não falar português (e ver que o candidato também se comunica em inglês).
- [ ] A página abre em **português** (`lang="pt-BR"`) na primeira visita.
- [ ] Há um botão de idioma sempre fácil de achar (no menu). O texto do botão mostra para qual idioma ele leva (ex.: "EN" em português e "PT" em inglês), e o nome acessível é completo (ex.: "Read in English" / "Ler em português"), com o `lang` certo nesse texto.
- [ ] Ao trocar, **todo** o texto da página muda de idioma: menu, títulos, Topo, Sobre mim, descrições dos projetos, nomes dos grupos de certificados, rótulos ("Ver site", "Ver código", "Verificar"), rodapé, `alt` das imagens, textos escondidos para leitor de tela, `title` e `meta description`.
- [ ] Ficam como estão nos dois idiomas: o nome "João Saccucci", os nomes dos projetos e das tecnologias e os nomes oficiais dos certificados (ver seção 6).
- [ ] O atributo `lang` do `html` muda junto: `pt-BR` ou `en`.
- [ ] A troca acontece sem recarregar a página, sem mudar a posição da rolagem e com o foco continuando no botão de idioma.
- [ ] A escolha é guardada no `localStorage`, na chave `portfolio:idioma` (`"pt-BR"` ou `"en"`). Na próxima visita, a página abre no idioma guardado, sem mostrar o outro idioma "piscando" antes.
- [ ] Se o `localStorage` estiver indisponível, a troca funciona normalmente na página, só não é lembrada. Nenhum erro aparece no console.
- [ ] Um valor guardado inválido é ignorado e a página abre em português.
- [ ] Sem JavaScript, a página aparece inteira em português e legível (o botão de idioma pode não funcionar).
- [ ] O texto em inglês do Sobre mim e das descrições dos projetos é aprovado pelo João antes da entrega.

### Efeitos

**Portfólio US09: Fundo com manchas de cor e luz que segue o mouse**
Como visitante, quero um fundo vivo e com a cara do João, para o portfólio ter personalidade sem atrapalhar a leitura.
- [ ] O fundo azul-noite tem manchas suaves de âmbar e lilás que se movem devagar, sem parar a página.
- [ ] As manchas ficam **atrás** do conteúdo, não recebem clique nem foco e não diminuem o contraste do texto abaixo de AA em nenhum momento da animação.
- [ ] No computador com mouse, uma luz âmbar suave segue o mouse pelo fundo. Ela não aparece em celular e tablet (sem mouse) nem cobre texto a ponto de reduzir o contraste.
- [ ] Os efeitos de fundo não causam rolagem horizontal nem aumentam a altura da página.
- [ ] As manchas e a luz são decorativas: não aparecem para leitores de tela.

**Portfólio US10: Elementos que surgem ao rolar e o print que "se abre"**
Como visitante, quero que as partes da página apareçam com movimento conforme eu rolo, para a navegação ficar agradável e guiar o olhar.
- [ ] Títulos, textos, cartões e certificados surgem com uma animação curta (ex.: sobem um pouco e aparecem) quando entram na tela.
- [ ] O efeito usa `IntersectionObserver` (sem biblioteca) e acontece **uma vez** por elemento: rolar para cima e para baixo de novo não esconde o que já apareceu.
- [ ] O print de cada projeto em destaque "se abre" quando entra na tela (o artista define o movimento).
- [ ] Nenhum conteúdo fica escondido para sempre: um elemento que já está na tela ao abrir a página aparece logo, e seguir um link do menu (`#projetos`, por ex.) mostra a seção inteira visível.
- [ ] O conteúdo ainda não animado continua no HTML e é lido normalmente por leitores de tela e pela busca do navegador (Ctrl+F).
- [ ] O foco do teclado num elemento que ainda não apareceu faz ele aparecer.

**Portfólio US11: Cartão de projeto que inclina com o mouse**
Como visitante no computador, quero que o cartão do projeto reaja ao mouse, para o portfólio parecer vivo e caprichado.
- [ ] Nos cartões de projeto em destaque, ao passar o mouse, o cartão inclina levemente seguindo a posição do mouse, com um brilho que acompanha.
- [ ] Ao tirar o mouse, o cartão volta suavemente à posição normal.
- [ ] O efeito só existe em aparelho com mouse (ex.: `(hover: hover) and (pointer: fine)`). No celular e no tablet, o cartão fica parado e o toque nos botões funciona na primeira vez.
- [ ] A inclinação não deixa texto ilegível, não corta o cartão e não cobre o cartão vizinho de um jeito que impeça o clique.
- [ ] Com o foco do teclado num botão do cartão, o cartão continua legível (sem inclinação estranha) e o foco aparece.

**Portfólio US12: Movimento reduzido e página sem JavaScript**
Como visitante sensível a movimento, ou com o JavaScript desligado, quero ver todo o conteúdo parado e legível, para usar o portfólio sem desconforto e sem perder nada.
- [ ] Com `prefers-reduced-motion: reduce`, **nenhum** efeito se move: manchas paradas (ou sem animação), sem luz seguindo o mouse, sem inclinação, sem surgir ao rolar e sem o print "se abrindo". Tudo aparece já visível na posição final.
- [ ] Com o JavaScript desligado, todo o conteúdo em português aparece visível e legível, os links funcionam e nada fica escondido esperando uma animação (ex.: os elementos só ficam escondidos para animar se o JavaScript tiver rodado).
- [ ] A rolagem suave até as seções (se existir) também é desligada com movimento reduzido.

**Portfólio US13: Página leve e fluida no celular**
Como recrutador que abre o link pelo celular, quero que a página carregue rápido e role sem travar, para não desistir antes de ver os projetos.
- [ ] As animações mexem só em `transform` e `opacity` (ou equivalentes baratos) e não travam a rolagem num celular comum.
- [ ] Os efeitos que gastam mais (ex.: `backdrop-filter` dos cartões de vidro, manchas grandes) são simplificados ou desligados no celular, se o teste mostrar travamento.
- [ ] As imagens (foto e prints) são otimizadas para a web, num formato leve (ex.: WebP ou JPG comprimido), no tamanho em que aparecem, com `width` e `height`. Os prints abaixo do Topo usam `loading="lazy"`.
- [ ] A página não carrega nenhuma fonte, script ou imagem de outro site que não seja necessário (sem biblioteca; fontes externas só se o artista justificar no design).
- [ ] *(Meta proposta pelo PO, ver seção 6)* No Lighthouse do Chrome, modo celular: Desempenho 90 ou mais e Acessibilidade 95 ou mais.

### Requisitos gerais

**Celular a desktop**
- [ ] Tudo funciona de 360px até telas de desktop, sem rolagem horizontal e sem nada cortado.
- [ ] Botões e links principais têm área de toque de pelo menos 44 × 44px.

**Teclado e acessibilidade**
- [ ] Tudo pode ser feito só com o teclado (menu, idioma, todos os links), com foco **sempre visível** e numa ordem lógica.
- [ ] Os títulos seguem a ordem (`h1` → `h2` das seções → `h3` dos cartões e grupos).
- [ ] Toda imagem de conteúdo tem `alt` descritivo. Imagens e ícones decorativos ficam escondidos dos leitores de tela (`alt=""` ou `aria-hidden="true"`).
- [ ] Ícones (LinkedIn, GitHub) sempre vêm com texto visível ou rótulo acessível.
- [ ] Nada depende só de cor (destaque do certificado, tecnologias, estado do menu).

**Contraste**
- [ ] Texto, botões, links, foco e ícones têm contraste WCAG AA sobre o fundo, inclusive por cima das manchas e da luz.

**Links externos**
- [ ] Todo link para outro site abre em nova aba com `rel="noopener noreferrer"` e avisa isso ao leitor de tela.

**Erros**
- [ ] Console sem erros e sem avisos do site, nenhum arquivo com 404, em português e em inglês.

**Privacidade**
- [ ] O site e o repositório **não** têm nenhum dado pessoal além do que está nesta página de requisitos (nome, foto, curso, faculdade, região, LinkedIn e GitHub): nada de CPF, endereço, e-mail, telefone, data de nascimento ou PDF de certificado ou currículo.
- [ ] A foto não tem dados escondidos de localização (metadados EXIF removidos antes de publicar).

**Geral**
- [ ] Nenhuma biblioteca. Só HTML, CSS e JavaScript puros.
- [ ] Funciona publicado no GitHub Pages, com caminhos relativos.
- [ ] Funciona no Chrome e no Edge do computador e no Chrome do Android.

### Repositório e Labs

**Portfólio US14: README do repositório**
Como recrutador que chega pelo GitHub, quero um README claro, para entender o projeto e abrir o site com um clique.
- [ ] O repositório `portfolio` tem só o código e o README (sem requisitos, design ou relatórios de teste), seguindo a US36 dos requisitos da Labs, como a Agenda.
- [ ] O README tem: o que é o projeto, o link do site (`https://joaosaccucci.github.io/portfolio/`), as tecnologias (HTML, CSS e JavaScript puros), as funções principais (idiomas, efeitos, acessibilidade, movimento reduzido), como rodar no computador e uma imagem do site.
- [ ] O README não tem nenhum dado pessoal proibido (mesma regra da Privacidade).

**Portfólio US15: Portfólio na Labs**
Como João, quero que o Portfólio apareça na Labs como os outros projetos, para mostrar tudo num lugar só e estudar o código pelas aulas.
- [ ] O Portfólio entra em `projetos.json` da Labs com o id `portfolio`, seguindo o mesmo padrão de campos da Agenda (links do site e do código, tecnologias, situação).
- [ ] A Labs mostra o Portfólio na lista de projetos, com os links funcionando.
- [ ] As aulas do Portfólio ficam em `aulas/portfolio/` na Labs. O plano das aulas é definido depois, com o professor.
- [ ] A entrega segue a regra "Entrega em dois repositórios" do `CLAUDE.md` da raiz (primeiro o `portfolio`, depois o `empresa-ia`).

---

## 3. Conteúdo aprovado

### 3.1 Sobre mim (português, texto final)

> Estou no 4º semestre de Análise e Desenvolvimento de Sistemas na USCS e estudo os dois lados do desenvolvimento: Java, Spring Boot e PostgreSQL no back-end, e HTML, CSS e JavaScript no front-end.
>
> Aprendo construindo. Montei uma empresa em que os funcionários são agentes de IA e eu coordeno a equipe: eles levantam requisitos, desenham, programam e testam. Eu decido, reviso, aprovo e estudo o código que foi escrito, até entender como funciona.
>
> O que me move é a mistura de três coisas: ver uma ideia virar algo útil, quebrar a cabeça com um problema até resolver e usar a IA como equipe sem abrir mão de entender o código.
>
> Estudando agora: JavaScript e Java.

**Inglês (aprovado pelo João em 2026-11-14):**

> I'm in the 4th semester of Systems Analysis and Development at USCS, and I study both sides of development: Java, Spring Boot and PostgreSQL on the back end, and HTML, CSS and JavaScript on the front end.
>
> I learn by building. I set up a company where the employees are AI agents and I coordinate the team: they gather requirements, design, code and test. I decide, review, approve and study the code that was written, until I understand how it works.
>
> What drives me is a mix of three things: seeing an idea turn into something useful, wrestling with a problem until I solve it, and using AI as a team without giving up on understanding the code.
>
> Studying now: JavaScript and Java.

### 3.2 Projetos

**Em destaque (nesta ordem)**

| Projeto | Tecnologia | Descrição (ideia) | Ver site | Ver código |
|---|---|---|---|---|
| Labs / empresa-ia | JavaScript | A empresa em que os funcionários são agentes de IA, coordenada pelo João; o diferencial dele. | https://joaosaccucci.github.io/empresa-ia/ | https://github.com/JoaoSaccucci/empresa-ia |
| Agenda | JavaScript | Agenda de compromissos que funciona no navegador. | https://joaosaccucci.github.io/agenda/ | https://github.com/JoaoSaccucci/agenda |
| Buscador-Cep | Java | Consulta de endereço na API ViaCEP, com JSON e Gson. | (não tem) | https://github.com/JoaoSaccucci/Buscador-Cep |
| ScreenMatch | Java | Consulta de filmes com POO e consumo de API. Projeto de curso da Alura (dizer isso na descrição). | (não tem) | https://github.com/JoaoSaccucci/ScreenMatch |

O texto final das descrições (PT e EN) é escrito na entrega e aprovado pelo João.

**Outros projetos**

| Projeto | Linguagem | Link |
|---|---|---|
| jogo_de_forca | C | https://github.com/JoaoSaccucci/jogo_de_forca |
| jogo-do-numero-secreto | HTML | https://github.com/JoaoSaccucci/jogo-do-numero-secreto |

### 3.3 Certificados

**Cloud**

| Certificado | Instituição | Carga | Data | Verificar |
|---|---|---|---|---|
| AWS Academy Graduate – Cloud Foundations **(destaque)** | AWS Academy | 20 h | 22/10/2026 | https://www.credly.com/go/3lVke6fb |

**Java e Spring Boot**

| Certificado | Instituição | Carga | Data | Verificar |
|---|---|---|---|---|
| Spring Boot 3: desenvolva uma API Rest em Java | Alura | 10 h | 18/08/2026 | https://cursos.alura.com.br/certificate/372f9c94-042c-4f98-bf40-19468887b067 |
| Spring Boot 3: aplique boas práticas e proteja uma API Rest | Alura | 12 h | 18/08/2026 | https://cursos.alura.com.br/certificate/50269504-4a39-47ac-8f3d-b4c70e2236eb |
| Spring Boot 3: documente, teste e prepare uma API para o deploy | Alura | 10 h | 18/08/2026 | https://cursos.alura.com.br/certificate/1babf745-c089-48e1-ae51-27fda06d38dc |
| Praticando Java: variáveis e tipos | Alura | 4 h | 12/03/2026 | https://cursos.alura.com.br/certificate/93d5356f-894f-47c7-a210-096fc97521c2 |
| Java: consumindo API, gravando arquivos e lidando com erros | Alura | 10 h | 11/03/2026 | https://cursos.alura.com.br/certificate/fd3b2837-0bf4-4426-b16f-23c0bf83892b |
| Java: aplicando a Orientação a Objetos | Alura | 10 h | 13/10/2025 | https://cursos.alura.com.br/certificate/1a73ee07-f923-447c-9c73-e2b785410187 |

**Banco de dados e Git**

| Certificado | Instituição | Carga | Data | Verificar |
|---|---|---|---|---|
| PostgreSQL: Views, Sub-Consultas e Funções | Alura | 6 h | 20/08/2026 | https://cursos.alura.com.br/certificate/dd2d5fca-96d5-4705-b985-94e12746535d |
| Git e GitHub: compartilhando e colaborando em projetos | Alura | 8 h | 22/04/2026 | https://cursos.alura.com.br/certificate/7233b9c2-1b63-42bf-a206-3526881dbb26 |

**Base**

| Certificado | Instituição | Carga | Data | Verificar |
|---|---|---|---|---|
| C: avançando na linguagem | Alura | 8 h | 17/09/2025 | https://cursos.alura.com.br/certificate/ac1dc11b-bc24-4cf3-8923-9a2b195d0242 |
| C: conhecendo a Linguagem das Linguagens | Alura | 8 h | 04/09/2025 | https://cursos.alura.com.br/certificate/b9637664-4994-46d4-a005-6fd88efdb29c |

*(As tabelas já estão na ordem do mais recente para o mais antigo, como pede a US06. Os três de Spring Boot têm a mesma data; entre eles vale a ordem da lista aprovada.)*

---

## 4. Prioridade e ordem sugerida

**MVP (Etapa 1): todas as stories US01 a US15.** O portfólio só serve para o estágio se estiver completo: conteúdo, idiomas e efeitos foram todos aprovados para a primeira versão.

Se for preciso dividir a entrega, a ordem de prioridade é:
1. Conteúdo e qualidade: US01 a US07, requisitos gerais e US12 (sem JavaScript e movimento reduzido).
2. Idioma: US08.
3. Efeitos: US10 → US09 → US11, com a US13 conferida a cada efeito novo.
4. US14 (README) e US15 (Labs).

Ordem sugerida: João fornece a foto e a URL do LinkedIn → artista escreve o `design.md` (cores, contraste por cima das manchas, tipografia, layout das seções, menu no celular, efeitos) → dev monta o HTML completo em português sem efeitos (já legível sem JavaScript) → CSS responsivo → US08 (idioma), com o texto em inglês aprovado pelo João → efeitos (US10, US09, US11), sempre com a US12 junto → US13 (otimizar imagens, Lighthouse) → testador escreve `docs/projetos/portfolio/testes/etapa-1.md` → README com imagem (US14) → commits (portfolio e depois empresa-ia, com a US15) → aulas.

---

## 5. Fora do escopo

- Caixa de comentários, formulário de contato, e-mail, telefone e currículo em PDF.
- Números como "anos de experiência" ou "X projetos", barras ou porcentagens de nível de habilidade e efeito de digitação.
- PDF ou imagem dos certificados.
- Outros idiomas além de português e inglês, e escolher o idioma sozinho pelo idioma do navegador.
- Tema claro (o site é só escuro).
- Blog, página por projeto, contador de visitas, analytics ou qualquer serviço externo.
- Bibliotecas, frameworks, React, back-end e etapa de build.
- Copiar o layout ou os textos do ekizr.com.

---

## 6. Pontos em aberto / sugestões do PO

> **2026-11-14:** o João aprovou todos os acréscimos do PO: foto sem EXIF, "Pular para o conteúdo", certificados do mais recente para o mais antigo, navegadores, o que ficou fora do escopo, a meta do Lighthouse (item 5), a prévia ao compartilhar com favicon (item 6, agora faz parte do MVP) e o vidro mais simples no celular (item 7). Também aprovou a ordem das seções, com menu fixo funcionando como abas (US01). Decididos também:
> - **Item 2:** Buscador-Cep e ScreenMatch mostram uma **janela de terminal desenhada** no estilo do site (HTML/CSS ou SVG). Nela aparece o programa rodando, com entrada e saída **fiéis ao que o programa realmente faz**. O dev confere isso no código dos repositórios.
> - **Item 3:** em inglês, o nome do curso fica o oficial, em português. Mudam só os títulos dos grupos, os rótulos e as datas (formato `Oct 22, 2026`).
> - **Item 4:** dados que envelhecem (semestre, "Estudando agora", projetos e certificados) ficam num lugar só do código, fácil de atualizar.
> - **Decisões de design (2026-11-14), registradas no design.md:**
>   - **Foto:** fica num **crachá de vidro pendurado por uma fita**. Dá para arrastar com mouse ou dedo e, ao soltar, ele balança até parar. É uma simulação de física 2D em JavaScript puro, sem biblioteca. No crachá vão a foto, o nome e o cargo "Desenvolvedor em formação" / "Developer in training". Arrastar o crachá não pode travar a rolagem da página no celular. Com movimento reduzido ou sem JavaScript, ele fica parado, pendurado. Para o leitor de tela é só a foto, com `alt`, e a física é decoração.
>   - **A palavra "chefe" não aparece em nenhum texto do site** (pedido do João). No Sobre mim ficou "eu coordeno a equipe".
>   - Fonte Space Grotesk + JetBrains Mono, organograma no Sobre mim, "tela que acende" nos prints, menu do celular em uma linha de abas, ponto final âmbar nos títulos, textos curtos do Contato, do rodapé e da legenda aprovados, e prévia Open Graph com a foto.
>
> - **URL do LinkedIn (fornecida em 2026-11-14):** https://www.linkedin.com/in/jo%C3%A3o-lucas-lemes-saccucci/
>
> - **Foto (fornecida em 2026-11-14):** a versão tratada fica em `C:\Projetos\claude\carreira\foto-portfolio.jpg` (fora do repositório): 480×600, recortada em 4:5, com um leve ajuste de contraste e nitidez, sem metadados e sem a marca ✦ do canto. A original está na mesma pasta. O dev copia e adapta a foto para o formato final do crachá (WebP/JPG otimizado).
>
> Nenhum ponto em aberto.

1. **URL do LinkedIn e arquivo da foto:** o João ainda vai fornecer. Sem eles a entrega não passa no teste (US02 e US07).
2. **Prints dos projetos Java:** Buscador-Cep e ScreenMatch não têm site. Sugestão: print do programa rodando no terminal ou de um trecho do código. Quem tira os prints (João ou dev) precisa ser combinado.
3. **Nomes dos certificados em inglês:** sugestão do PO, manter o nome oficial em português (é o que aparece no link "Verificar") e traduzir só os títulos dos grupos e os rótulos. Data em inglês: sugestão `Oct 22, 2026` ou manter `DD/MM/AAAA`.
4. **Texto que envelhece:** "3º semestre", "Estudando agora" e a lista de certificados vão mudar. Sugestão: guardar esses dados num lugar só do código (fácil de atualizar) e revisar a cada semestre.
5. **Meta do Lighthouse (US13):** foi proposta pelo PO para tornar "leve e fluida" testável. Precisa do aceite do João.
6. **Prévia ao compartilhar o link:** sugestão de incluir imagem e texto de prévia (Open Graph) e favicon, para o link ficar bonito no LinkedIn. Não foi pedido; entra só se o João aprovar.
7. **Cartões de vidro (`backdrop-filter`):** pesam no celular. O artista e o dev devem prever uma versão mais simples no celular (US13).
