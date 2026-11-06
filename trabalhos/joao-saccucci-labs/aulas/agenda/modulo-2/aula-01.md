# Mudar o formato dos dados sem perder nada

> [!TIP]
> **Em resumo:** quando o formato dos dados salvos muda, a Agenda faz uma [[migração]].
> Primeiro guarda o original sem mexer nele, depois grava o formato novo.

## O conceito

Na Entrega 2b, cada compromisso ganhou campos novos: `status` (situação), `cobrar`, `antecedenciaMin` (tempo para sair) e `concluidoEm`. Só que quem já usava a Agenda tinha compromissos salvos no formato antigo, a **versão 1**. Apagar e começar do zero não é opção. A Agenda precisa **atualizar** esses dados sozinha, para a **versão 2**.

É para isso que o objeto salvo tem um número de versão: `{ versao: 1, compromissos: [...] }`. Ao abrir, a Agenda lê esse número e decide o que fazer:

1. **Versão 2** (a atual): usa os dados normalmente.
2. **Versão 1**: faz a migração, nesta ordem:
   - guarda o texto original, sem nenhuma mudança, numa chave separada do [[localStorage]], `agenda:compromissos-v1` (e só se ela ainda não existir);
   - só depois grava os mesmos compromissos no formato da versão 2, com os campos novos preenchidos com o valor padrão (`status: "aberto"`, `cobrar: false`...).
3. **Versão maior que 2** (por exemplo, de uma Agenda mais nova aberta em outro lugar): mostra o que conseguir ler, mas **não grava nada** por cima. Ela não entende esse formato, então não pode mexer nele.

A ordem é o que protege os dados. Se a segunda gravação falhar, por exemplo com o localStorage cheio, o original continua guardado e a Agenda para de gravar até a página ser aberta de novo.

## Exemplo

O `localStorage` não funciona aqui no Rodar, então o objeto `salvo` faz o papel dele. Clique em **Rodar** e confira o Console.

```js rodar
const salvo = { compromissos: '{"versao":1,"compromissos":[{"titulo":"Dentista","data":"2026-11-14"}]}' };
function migrar(texto) {
  const dados = JSON.parse(texto);
  if (dados.versao === 2) return dados;
  if (salvo.v1 === undefined) salvo.v1 = texto;
  const novos = dados.compromissos.map(function (c) {
    return { titulo: c.titulo, data: c.data, status: "aberto", cobrar: false };
  });
  return { versao: 2, compromissos: novos };
}
const v2 = migrar(salvo.compromissos);
salvo.compromissos = JSON.stringify(v2);
console.log("Original guardado:", salvo.v1);
console.log("Versão nova:", salvo.compromissos);
```
- **L1:** o que estava "salvo": um texto em JSON na versão 1, com um compromisso só.
- **L3:** [[JSON.parse]] transforma o texto em objeto.
- **L4:** se já está na versão 2, não há nada para migrar e a função devolve os dados como estão.
- **L5:** guarda o texto **original**, mas só se ainda não houver uma cópia. [[undefined]] quer dizer "essa chave ainda não existe". Assim, uma segunda migração nunca apaga a primeira cópia.
- **L6–8:** [[map]] cria uma lista nova, com cada compromisso ganhando os campos novos com o valor padrão.
- **L9:** devolve o objeto inteiro, agora com `versao: 2`.
- **L11–12:** só **depois** de guardar o original é que a versão 2 é gravada, com [[JSON.stringify]].
- **L13–14:** o Console mostra as duas: o original intacto e a versão nova com `status` e `cobrar`.

> [!CAUTION]
> Gravar a versão nova **antes** de guardar o original. Se algo der errado no meio do caminho, o formato antigo já foi apagado e não tem como voltar. A regra é: cópia de segurança primeiro, mudança depois.

## Onde aparece na Agenda

A função `migrarDaVersao1`, no `js/armazenamento.js`, guarda o original em `agenda:compromissos-v1` e só depois grava a versão 2. Se falhar, ela bloqueia as gravações ([armazenamento.js, linhas 194 a 207](https://github.com/JoaoSaccucci/agenda/blob/f91ecc6c5719438a4949736c977fca73886ca18b/js/armazenamento.js#L194-L207)). Logo antes disso, a `carregarCompromissos` trata a versão mais nova sem gravar nada por cima ([armazenamento.js, linhas 149 a 155](https://github.com/JoaoSaccucci/agenda/blob/f91ecc6c5719438a4949736c977fca73886ca18b/js/armazenamento.js#L149-L155)), e a página mostra uma faixa de aviso para cada caso ([app.js, linhas 1699 a 1706](https://github.com/JoaoSaccucci/agenda/blob/f91ecc6c5719438a4949736c977fca73886ca18b/js/app.js#L1699-L1706)).

> [!TIP]
> **Para ir além (opcional):** na Agenda, quem preenche os campos novos é a `normalizarCompromisso`, a mesma função que confere cada item. Ela sempre devolve um item no formato da versão 2. Assim, um item que vem da versão 1, do localStorage ou de um arquivo de cópia passa pelo mesmo caminho.

> [!IMPORTANT]
> Pergunta comum: "Como você muda o formato de dados que já estão salvos?" Resposta: com um número de versão nos dados, uma cópia do original guardada antes de qualquer gravação e um plano para a falha. E nunca sobrescrevo dados de uma versão que o meu código não conhece.

## Teste rápido

```quiz
? Por que a Agenda guarda o texto original em agenda:compromissos-v1 ANTES de gravar a versão 2?
[ ] Para a página carregar mais rápido.
    -> Errada: guardar uma cópia a mais não deixa nada mais rápido.
[x] Para que, se a gravação nova der problema, os dados antigos continuem guardados, sem nenhuma mudança.
    -> Certa: cópia de segurança primeiro, mudança depois.
[ ] Porque o localStorage só deixa gravar uma chave por vez.
    -> Errada: dá para gravar várias chaves. A ordem é escolhida para proteger os dados.
```

```quiz
? Ao abrir, a Agenda encontra dados salvos com "versao": 3. O que ela faz?
[ ] Converte para a versão 2 e grava por cima.
    -> Errada: ela não conhece a versão 3, então converter poderia jogar informação fora.
[x] Mostra o que conseguir ler, avisa numa faixa e não grava nada por cima.
    -> Certa: os dados da versão mais nova ficam intactos.
[ ] Apaga os dados, porque não entende o formato.
    -> Errada: a Agenda nunca apaga dados que não entende.
```

## Para praticar

- [ ] No exemplo, clique em **Editar** e acrescente no fim a linha `console.log(migrar(salvo.compromissos).versao);`. Rode: por que aparece `2` e o original guardado continua o mesmo?
- [ ] Na linha 1, troque `{"titulo":"Dentista","data":"2026-11-14"}` por `{"titulo":"Dentista","data":"2026-11-14"},{"titulo":"Mercado","data":"2026-11-15"}` (os dois compromissos, separados por vírgula) e rode. Os dois ganharam `status` e `cobrar`?
