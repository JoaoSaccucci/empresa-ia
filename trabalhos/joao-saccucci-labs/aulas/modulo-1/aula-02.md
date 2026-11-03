# Objetos e listas: como o site guarda dados

> [!TIP]
> **Em resumo:** um objeto `{ }` guarda as informações de uma coisa, cada uma com um nome, a chave.
> Uma lista `[ ]` guarda várias coisas em ordem, numeradas a partir de 0.
> Os arquivos JSON do site são feitos só dessas duas peças.

## O conceito

Antes de mostrar qualquer coisa na tela, o site precisa dos dados: o nome de cada agente, a cor, o papel. No JavaScript, duas estruturas resolvem quase tudo.

**Objeto: uma ficha.** Pense numa ficha de cadastro, com campos como "nome" e "cor". O objeto é escrito entre chaves `{ }`, e cada campo é um par `chave: valor`, separado do próximo por vírgula. Para ler um campo, use um ponto: `agente.nome` (leia "agente ponto nome").

**Lista: uma fila.** A lista, chamada de [[array]], guarda vários itens em ordem, entre colchetes `[ ]`. Cada item tem uma posição, o **índice**, e a contagem começa em **0**. Para ler um item, use colchetes com a posição: `equipe[0]` é o primeiro. Para saber quantos itens existem, use [[length]].

As duas peças se encaixam: uma lista pode guardar objetos. Uma lista de fichas é exatamente o formato dos dados do site.

## Exemplo

Clique em **Rodar**. Como este exemplo é só JavaScript, o resultado aparece no Console.

```js rodar
const agente = {
  nome: "Dev",
  cor: "#FF2BD6",
  ativo: true
};

console.log(agente.nome);
console.log(agente.cor);
console.log(agente.idade);

const equipe = ["Product Owner", "Artista", "Dev", "Professor"];

console.log(equipe[0]);
console.log(equipe[3]);
console.log(equipe.length);
```
- **L1–5:** cria um objeto com três chaves e guarda numa [[const]] chamada `agente`. Textos vão entre aspas; `true` ([[true]], verdadeiro) vai sem aspas, porque não é texto, é um valor de sim ou não.
- **L7–8:** lê dois campos com o ponto. O [[console.log]] mostra o valor no Console: aparecem `Dev` e `#FF2BD6`.
- **L9:** a chave `idade` não existe. O JavaScript não quebra: ele devolve [[undefined]], que quer dizer "não tem nada aqui".
- **L11:** uma lista com quatro textos, separados por vírgula.
- **L13–14:** o índice 0 é o primeiro item (`Product Owner`) e o índice 3 é o quarto e último (`Professor`).
- **L15:** `length` conta os itens: mostra `4`.

### Uma lista de objetos

Agora juntando as duas peças, do jeito que o site faz:

```js rodar
const agentes = [
  { id: "dev", cor: "#FF2BD6" },
  { id: "artista", cor: "#B45CFF" }
];

console.log(agentes.length);
console.log(agentes[1].id);
console.log(agentes[0]);
```
- **L1–4:** uma lista com dois objetos. Cada objeto fica entre `{ }`, e a vírgula no fim da linha 2 separa um objeto do outro.
- **L6:** a lista tem 2 itens.
- **L7:** leia da esquerda para a direita: `agentes[1]` pega o segundo objeto, e `.id` pega o campo dele. Resultado: `artista`.
- **L8:** mostra o objeto inteiro. O Console da aula exibe no formato JSON, com aspas nas chaves.

> [!CAUTION]
> Achar que a contagem começa em 1. Na lista de 4 itens, o último é `equipe[3]`, e `equipe[4]` devolve `undefined`. Se aparecer `undefined` onde você esperava um valor, confira o índice ou o nome da chave (maiúsculas contam: `agente.Nome` não é `agente.nome`).

## Onde aparece no site

O arquivo `data/agentes.json` é uma lista com quatro objetos, um por agente, cada um com as chaves `id`, `nome`, `papel`, `cor` e `avatar`. O [[JSON]] é este mesmo formato salvo como texto num arquivo, com regras mais rígidas: chaves sempre com aspas duplas, nada de vírgula depois do último item e nada de comentários. Depois de carregar esse arquivo, o `js/equipe.js` lê `agente.nome` e `agente.papel` (linhas 36 e 37), com o mesmo ponto da linha 7 do exemplo.

> [!IMPORTANT]
> "Como pegar o último item de uma lista sem saber o tamanho dela?" Resposta: `lista[lista.length - 1]`. Se a lista tem 4 itens, `length` é 4 e o último índice é 3.

> [!TIP]
> **Para ir além (opcional):** também dá para ler um campo com colchetes e o nome entre aspas: `agente["nome"]` é igual a `agente.nome`. Esse jeito é útil quando o nome da chave está guardado numa variável, como em `agente[campo]`.

## Teste rápido

```quiz
? Se equipe = ["Product Owner", "Artista", "Dev"], o que equipe[1] devolve?
[ ] "Product Owner"
    -> Errada: a contagem começa em 0, então "Product Owner" é equipe[0].
[x] "Artista"
    -> Certa: o índice 1 é o segundo item, porque a contagem começa em 0.
[ ] "Dev"
    -> Errada: "Dev" é o terceiro item, equipe[2].
```

```quiz
? O que console.log(agente.idade) mostra, se o objeto agente não tem a chave idade?
[ ] Um erro, e o código para.
    -> Errada: ler uma chave que não existe não quebra o código. Ele só não encontra nada.
[x] undefined
    -> Certa: undefined quer dizer que aquela chave não tem valor nenhum.
[ ] 0
    -> Errada: o JavaScript não inventa um número. Sem a chave, o resultado é undefined.
```

```quiz
? Qual frase descreve bem a diferença entre { } e [ ]?
[x] { } guarda campos com nome (chave: valor); [ ] guarda itens em ordem, lidos pela posição.
    -> Certa: no objeto você lê pelo nome (agente.cor); na lista, pela posição (equipe[0]).
[ ] { } é para textos e [ ] é para números.
    -> Errada: os dois guardam qualquer tipo de valor: textos, números, true, até outros objetos e listas.
[ ] São a mesma coisa, só muda o símbolo.
    -> Errada: o objeto não tem posição numerada e a lista não tem nomes para os itens.
```

## Para praticar

- [ ] No primeiro exemplo, clique em **Editar**, troque `"Dev"` por `"Professor"` na linha 2 e rode de novo.
- [ ] Acrescente a chave `papel: "Implementa o que foi definido."` depois da linha 4 e mostre com `console.log(agente.papel)`. Atenção: a linha 4 vai precisar de uma vírgula no fim.
- [ ] Abra o `data/agentes.json`: qual é o índice do Professor na lista?
