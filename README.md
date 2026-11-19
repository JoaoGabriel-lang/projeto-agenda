# Projeto Agenda

Agenda semanal mobile-first para organizar tarefas recorrentes por dia da semana.

Cada tarefa pertence a um dia de uma semana-padrão, e não a uma data específica. Por exemplo, uma tarefa criada na segunda-feira aparecerá toda vez que a segunda-feira estiver selecionada.

## Funcionalidades

- Navegação pelos sete dias da semana
- Seleção direta do dia por meio do menu
- Criação de tarefas com título e horários
- Edição de tarefas já cadastradas
- Exclusão individual por seleção
- Seleção de várias tarefas por toque longo
- Exclusão em lote de tarefas selecionadas
- Ordenação automática das tarefas pelo horário de início
- Salvamento automático no navegador

## Tecnologias

- HTML5
- CSS3
- JavaScript vanilla (ES6)
- `localStorage` para persistência dos dados

Não utiliza backend, framework, dependências, npm ou processo de build.

## Estrutura do projeto

```text
.
├── index.html  # Estrutura da página e dos modais
├── style.css   # Layout e estilos da interface
├── script.js   # Estado, regras de negócio e persistência
└── README.md
```

## Como executar

Abra o arquivo `index.html` diretamente no navegador.

Alternativamente, execute um servidor local na pasta do projeto:

```bash
python3 -m http.server
```

Depois, acesse `http://localhost:8000`.

## Como usar

### Navegar pelos dias

- Use as setas para avançar ou voltar um dia.
- Use o botão `...` para abrir o menu e escolher diretamente um dos sete dias.
- Ao abrir a agenda, é exibido o dia da semana atual.

### Criar uma tarefa

1. Toque no botão `+`.
2. Informe o título.
3. Informe o horário de início.
4. Informe opcionalmente o horário de término.
5. Toque em `Salvar`.

O título e o horário de início são obrigatórios. Quando o horário de término é informado, ele deve ser posterior ao horário de início.

### Editar uma tarefa

Toque no botão de lápis da tarefa para abrir o modal de edição. Após alterar os campos, toque em `Salvar`.

### Selecionar e excluir tarefas

- Pressione uma tarefa por aproximadamente um segundo para ativar o modo de seleção.
- Toque em outras tarefas para selecioná-las ou removê-las da seleção.
- Com pelo menos duas tarefas selecionadas, use o botão da barra de ações para excluí-las em lote.
- Para excluir uma única tarefa, use o botão de lixeira exibido depois da seleção.

Todas as exclusões pedem confirmação antes de alterar os dados.

## Persistência dos dados

Os dados são armazenados no `localStorage` do navegador, na chave:

```text
tarefas
```

O valor salvo é um array com sete posições, correspondentes aos dias da semana:

```text
0 = Domingo
1 = Segunda-feira
2 = Terça-feira
3 = Quarta-feira
4 = Quinta-feira
5 = Sexta-feira
6 = Sábado
```

Cada posição contém um array de tarefas. Uma tarefa possui o seguinte formato:

```json
{
  "titulo": "Comprar flores",
  "horaInicio": "09:00",
  "horaTermino": "10:30"
}
```

Os horários são strings no formato `HH:MM`. Como são comparados lexicograficamente, tarefas como `09:00` e `10:00` são classificadas corretamente.

Ao limpar os dados do navegador ou trocar de perfil/dispositivo, as tarefas armazenadas podem ser perdidas ou deixar de estar disponíveis.

## Comportamento importante

- A agenda começa no dia atual do sistema.
- A navegação circular volta de domingo para sábado e vice-versa.
- As tarefas são ordenadas pelo horário de início após cada renderização.
- Trocar de dia encerra o modo de seleção e fecha os modais.
- Não há suporte a tarefas que atravessam a meia-noite.
- Os dados permanecem no mesmo navegador e não são sincronizados entre dispositivos.

## Limitações conhecidas

- Não há proteção contra dados inválidos ou JSON corrompido no `localStorage`.
- A interação de longo pressionamento ainda não cancela explicitamente o temporizador durante scroll ou cancelamento do ponteiro.
- O listener do botão de exclusão individual é criado durante o fluxo de longo pressionamento.
- Os modais não possuem overlay, Escape nem gerenciamento de foco.
- Não há PWA: não funciona como aplicativo instalado e não possui manifest ou service worker.