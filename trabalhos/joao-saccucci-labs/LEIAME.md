# João Saccucci Labs

Site da empresa de agentes de IA do João. HTML, CSS e JavaScript puros, sem framework e sem build.

## Como abrir

O site lê os dados de arquivos JSON com `fetch`. Se você abrir o `index.html` com dois cliques (endereço `file://`), o navegador bloqueia essa leitura e as páginas mostram uma mensagem de erro.

1. Abra esta pasta (`trabalhos/joao-saccucci-labs`) no VS Code.
2. Instale a extensão **Live Server** (de Ritwick Dey), se ainda não tiver.
3. Clique com o botão direito no `index.html` e escolha **Open with Live Server**.

No GitHub Pages funciona sem nada disso, porque todos os caminhos são relativos.

## Estrutura

```
index.html             Início: apresentação e fluxo de trabalho
lista-projetos.html    Lista de projetos (gerada a partir do JSON)
detalhe-projeto.html   Detalhe de um projeto (com linha do tempo): detalhe-projeto.html?id=<id-do-projeto>
equipe.html            Perfis dos agentes e projetos de cada um
sobre.html             Sobre mim: cartão do João (conteúdo fixo, sem JSON)
css/style.css          Visual do site (feito pelo artista; ajustes do dev na seção 22)
js/comum.js            Menu do celular, leitura dos JSON e funções auxiliares
js/lista-projetos.js   Monta a lista de projetos
js/detalhe-projeto.js  Monta o detalhe do projeto
js/timeline.js         Monta a linha do tempo do projeto (usada pelo detalhe-projeto.js)
js/equipe.js           Monta a página Equipe
data/agentes.json      Os 4 agentes (nome, papel, cor, avatar)
data/projetos.json     Os projetos, os trabalhos de cada agente e a linha do tempo
img/agentes/           Avatares SVG dos agentes
img/icones/            Ícones de contato (GitHub, LinkedIn, E-mail), colados inline no sobre.html
.nojekyll              Faz o GitHub Pages servir os arquivos .md como estão
docs/requisitos.md     Requisitos (product-owner)
docs/design.md         Decisões de visual (artista)
```

## Como adicionar um projeto

Edite só o `data/projetos.json`, seguindo o modelo descrito no `docs/requisitos.md`. Não é preciso mexer em HTML nem em JS: a lista, o detalhe e a página Equipe se atualizam sozinhos.

A linha do tempo do detalhe vem do campo `linhaDoTempo` de cada projeto. Os eventos são ordenados pela data (formato `AAAA-MM-DD`) e agrupados por dia. Projeto sem eventos não mostra a seção.

## Como preencher a página Sobre

O `sobre.html` é escrito direto no HTML. Troque tudo que está **[entre colchetes]**:

- frase, curso, cidade, área de interesse e a lista "O que estudo";
- link do GitHub: `https://github.com/[seu-usuario]`;
- link do LinkedIn: `https://www.linkedin.com/in/[seu-usuario]`;
- e-mail: troque `seu-email@exemplo.com` (no `href="mailto:..."`) pelo seu e-mail.

O selo "Buscando estágio" pode ter o texto trocado ou a linha apagada.
