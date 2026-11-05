# Juntar duas listas pelo id

> [!TIP]
> **Em resumo:** para juntar duas listas sem duplicar nada, compare os itens pelo `id`.
> Se o id é novo, acrescente. Se já existe, uma regra clara decide qual versão fica.

## O conceito

No **Juntar** da Agenda, existem duas listas: a que já está no navegador e a que veio do arquivo de cópia. Cada compromisso tem um `id` único, que nunca muda, mesmo quando o compromisso é editado. É por ele que a Agenda reconhece "este é o mesmo compromisso".

Para cada item da cópia:

- se o `id` **não existe** na lista atual, o item é **acrescentado** (conta como "novo");
- se o `id` **já existe**, fica a versão com o `atualizadoEm` **mais recente** (conta como "atualizado");
- em caso de empate, fica a versão que já estava no navegador.

Nada é apagado. Para não estragar a lista original se algo der errado, o trabalho é feito numa **cópia** dela, criada com [[slice]].

Para achar a posição de um item pelo id, usamos [[findIndex]]. Ele devolve a posição do primeiro item que passa no teste, ou `-1` se nenhum passar.

## Exemplo

Clique em **Rodar** e confira o Console.

```js rodar
const atuais = [
  { id: "a1", titulo: "Dentista", atualizadoEm: "2026-11-01" },
  { id: "a2", titulo: "Academia", atualizadoEm: "2026-11-03" }
];
const daCopia = [
  { id: "a1", titulo: "Dentista às 10h", atualizadoEm: "2026-11-04" },
  { id: "a3", titulo: "Pagar boleto", atualizadoEm: "2026-11-02" }
];
const lista = atuais.slice();
daCopia.forEach(function (item) {
  const posicao = lista.findIndex(function (c) { return c.id === item.id; });
  if (posicao === -1) lista.push(item);
  else if (item.atualizadoEm > lista[posicao].atualizadoEm) lista[posicao] = item;
});
console.log(lista.map(function (c) { return c.id + ": " + c.titulo; }));
```
- **L1–4:** a lista que já está no navegador.
- **L5–8:** a lista que veio da cópia. O `a1` foi editado depois (dia 04), e o `a3` é novo.
- **L9:** `slice()` sem nada nos parênteses faz uma cópia da lista inteira. A lista `atuais` fica intacta.
- **L10:** [[forEach]] passa por cada item da cópia.
- **L11:** procura na lista a posição do item com o mesmo id.
- **L12:** não achou (`-1`), então [[push]] coloca o item no fim. É um item novo.
- **L13:** achou, e a versão da cópia é mais recente, então troca. Aqui as datas estão no formato `AAAA-MM-DD`, que dá para comparar como texto. A Agenda de verdade transforma as datas em números antes de comparar.
- **L15:** mostra o id e o título de cada item da lista final.

O Console mostra 3 itens: `a1: Dentista às 10h`, `a2: Academia` e `a3: Pagar boleto`. O `a1` foi atualizado, o `a2` ficou como estava e o `a3` entrou.

> [!CAUTION]
> Juntar as listas comparando pelo **título** em vez do id. Dois compromissos diferentes podem ter o mesmo título ("Academia" toda semana), e um compromisso editado muda de título. O id é o único jeito seguro de saber que é o mesmo item.

## Onde aparece na Agenda

A função `juntarCompromissos`, no `js/copia.js`, faz exatamente esse caminho, contando os novos e os atualizados para a mensagem final ([copia.js, linhas 141 a 158](https://github.com/JoaoSaccucci/agenda/blob/e413ad86d9f525fd94bfaa21e45153ff97cf0a06/js/copia.js#L141-L158)). Já a função `lerArquivoDeCopia` usa um [[Map]] para tirar os ids repetidos de dentro do próprio arquivo ([copia.js, linhas 114 a 126](https://github.com/JoaoSaccucci/agenda/blob/e413ad86d9f525fd94bfaa21e45153ff97cf0a06/js/copia.js#L114-L126)). A lista salva só é trocada se a gravação no `localStorage` der certo.

> [!TIP]
> **Para ir além (opcional):** o `findIndex` dentro do `forEach` percorre a lista inteira para cada item da cópia. Com 100 itens de cada lado, são cerca de 10 mil comparações, o que é tranquilo numa agenda pessoal. Com 100 mil itens ficaria lento. Um `Map` acha um item pelo id quase na hora. Em entrevista, isso aparece como "O(n × m) contra O(n + m)".

> [!IMPORTANT]
> Pergunta comum: "Como você sincroniza duas listas?" Resposta: por um identificador único, com uma regra clara para o conflito ("vence o mais recente; no empate, fica o local"). E trabalho numa cópia da lista, trocando a original só quando a gravação dá certo.

## Teste rápido

```quiz
? O que o findIndex devolve quando nenhum item passa no teste?
[ ] undefined
    -> Errada: quem devolve undefined nesse caso é o find. O findIndex devolve uma posição.
[x] -1
    -> Certa: como nenhuma posição de lista é negativa, o -1 quer dizer "não achei".
[ ] 0
    -> Errada: 0 é a posição do primeiro item. Se devolvesse 0, pareceria que achou.
```

```quiz
? Por que o exemplo usa atuais.slice() em vez de mexer direto em atuais?
[ ] Porque o slice deixa o código mais rápido.
    -> Errada: o slice até gasta um pouco mais, porque copia a lista.
[x] Para trabalhar numa cópia e manter a lista original intacta se algo der errado.
    -> Certa: na Agenda, a lista salva só é trocada se a gravação der certo.
[ ] Porque o forEach só funciona com listas copiadas.
    -> Errada: o forEach funciona em qualquer lista.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e mude a data do `a1` da cópia (linha 6) para `"2026-10-30"`. Rode: qual título do Dentista ficou? Por quê?
- [ ] Acrescente na cópia um item com `id: "a2"` e outro título, com uma data mais nova que a da linha 3. Rode e confira o resultado.
