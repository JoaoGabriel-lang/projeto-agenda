# AGENTS.md — Agenda Namorada

> Memória de contexto do projeto. Leia antes de qualquer alteração.

## 1. Visão geral
Agenda semanal de tarefas, mobile-first, 100% front-end, em página única.
Cada tarefa pertence a um DIA DA SEMANA (não a uma data). Funciona como
template semanal recorrente.
Pasta: "Agenda Namorada" — projeto pessoal, provavelmente de uso individual.

## 2. Stack
- HTML5 + CSS3 + JavaScript vanilla (ES6)
- Persistência: localStorage, chave "tarefas"
- SEM backend, SEM build, SEM npm/package.json, SEM testes
- NÃO é repositório git
- Rodar: abrir index.html no navegador ou `python3 -m http.server`

## 3. Arquivos (3 no total, ~737 linhas)
- index.html (113 l.): estrutura estática + os 2 modais
- style.css (159 l.): estilo único, sem variáveis CSS nem breakpoints
- script.js (465 l.): TODA a lógica (DOM, estado, regras, persistência, render)

## 4. Modelo de dados
localStorage["tarefas"] = array de 7 arrays (índice = Date.getDay():
0=Domingo ... 6=Sábado). Cada tarefa:
{ titulo: string, horaInicio: "HH:MM", horaTermino: "HH:MM" }

- Horários são STRINGS comparadas lexicograficamente ("09:00" < "10:00")
- Não existe id; a identidade é a POSIÇÃO no array do dia
- Dia inicial é definido por `let diaAtual = new Date().getDay()`

## 5. Mapa do script.js
1-22    seletores DOM
23-26   estado: modoSelecaoAtivo, tarefasSelecionadas, menuAberto,
        indiceTarefaEditada
28-42   nomes dos dias, diaAtual, atualização do h1
45-95   navegação próximo/anterior (wrap 7->0 e -1->6)
97-132  toggle do menu de dias / seleção direta
136-194 criar tarefa (valida, push, render, persiste)
197-208 carregar localStorage (fallback: [[],[],[],[],[],[],[]])
213-403 mostrarTarefasDoDia(): ordena por horaInicio, limpa .tarefas,
        recria DOM e reata TODOS os listeners (editar, long press,
        selecionar, excluir)
404     render inicial
407-441 salvar/cancelar edição
443-465 excluir tarefas selecionadas em lote

## 6. Padrão arquitetural obrigatório
Render destrutivo + rebind: toda mutação termina com
  mostrarTarefasDoDia();
  localStorage.setItem('tarefas', JSON.stringify(tarefasDosDias));
Não há framework, store nem reatividade.

## 7. Regras de negócio
- título, horaInicio e horaTermino são obrigatórios (alert)
- horaInicio >= horaTermino é inválido (alert "Horários incompatíveis!")
  -> NÃO suporta tarefa que passa da meia-noite
- lista sempre ordenada por horaInicio (sort in-place no render)
- toda exclusão pede confirm()
- trocar de dia reseta seleção e fecha modal de edição

## 8. Funcionalidades
- Navegar dias (setas + menu com os 7 dias)
- Criar, editar e excluir tarefa
- Seleção múltipla por long press de 1000ms (+ toque para marcar/desmarcar)
- Barra de ações só aparece com >= 2 selecionadas
- Exclusão em lote itera índices em ordem decrescente (splice seguro)

## 9. Bugs conhecidos (NÃO reintroduzir; corrigir se pedido)
1. script.js:310 — listener de .btn-excluir só é registrado DENTRO do
   setTimeout do long press; excluir uma tarefa individual exige long press.
2. Listener duplicado em .btn-excluir se o usuário cancelar o confirm e
   repetir o long press -> exclusão roda 2x.
3. Long press não trata pointercancel/pointermove -> seleção dispara
   durante scroll.
4. indiceTarefaEditada é posicional e pode ficar obsoleto.
5. JSON.parse sem try/catch -> storage corrompido quebra o app.

## 10. Dívida técnica / oportunidades
- Centralizar persistência em um salvar()
- Extrair resetSelecao() (bloco repetido ~6x)
- Separar render de lógica; usar delegação de eventos em .tarefas
- Adicionar id às tarefas
- Usar nomes de chave mais específicos (ex.: agenda-namorada:tarefas)
- Forms sem submit -> Enter não salva; sem required
- Sem overlay nos modais, sem ESC, sem focus trap, sem aria-label
- alert/confirm bloqueantes
- Modais com altura fixa (50vh/45%) podem estourar com teclado mobile
- Sem favicon/meta description/manifest (não é PWA)

## 11. Convenções de código
- TUDO em português: variáveis, classes CSS, textos, comentários
- Sem build/frameworks: se sugerir um, PERGUNTAR antes
- Indentação 4 espaços, funções function(){} clássicas
- Manter o estilo do arquivo ao editar; não reformatar o arquivo todo
- Mobile-first; não introduzir layout desktop sem pedido

## 12. Checklist ao alterar
- [ ] A mudança funciona nos 7 dias (incluindo wrap domingo/segunda)?
- [ ] Persistiu no localStorage e sobreviveu a um reload?
- [ ] Ordenação por horário continua correta após editar?
- [ ] Seleção múltipla e exclusão em lote ainda funcionam?
- [ ] Testou em viewport estreita (~360px)?
