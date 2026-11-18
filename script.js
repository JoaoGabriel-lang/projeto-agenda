const botaoAdicionar = document.querySelector('.btn-adicionar-tarefa');
const modal = document.querySelector('.modal');
const botaoSalvar = document.querySelector('.btn-salvar');
const botaoCancelar = document.querySelector('.btn-cancelar');
const tituloTarefa = document.querySelector('#titulo-tarefa');
const horaInicio = document.querySelector('#hora-inicio');
const horaTermino = document.querySelector('#hora-termino');
const tarefas = document.querySelector('.tarefas');
const botaoDiaPosterior = document.querySelector('.btn-dia-posterior');
const botaoDiaAnterior = document.querySelector('.btn-dia-anterior');
const botaoMudarDia = document.querySelector('.btn-escolher-dia');
const menuDia = document.querySelector('.menu-dias');
const botoesDias = document.querySelectorAll('.btn-dia');
const acoesSelecao = document.querySelector('.acoes-selecao');
const quantidadeSelecionadas = document.querySelector('.quantidade-selecionadas');
const botaoExcluirSelecionadas = document.querySelector('.btn-excluir-selecionadas');
const modalEditar = document.querySelector('.modal-editar');
const tituloEditar = document.querySelector('#titulo-editar');
const horaInicioEditar = document.querySelector('#inicio-editar');
const horaTerminoEditar = document.querySelector('#termino-editar');
const botaoSalvarEditar = document.querySelector('.btn-salvar-edicao');
const botaoCancelarEditar = document.querySelector('.btn-cancelar-edicao');
let modoSelecaoAtivo = false;
let tarefasSelecionadas = 0;
let menuAberto = false;
let indiceTarefaEditada = null;

const diaSemana = [
        "Domingo",
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'
       ]
       
       let diaAtual = new Date().getDay();

       const diaSemanaNome = document.querySelector('.cabecalho h1');

       diaSemanaNome.textContent = diaSemana[diaAtual];


botaoDiaPosterior.addEventListener(
    'click',
    function(){
        modal.style.display = 'none';
        modoSelecaoAtivo = false;
        tarefasSelecionadas = 0;
        quantidadeSelecionadas.textContent = tarefasSelecionadas;
        acoesSelecao.style.display = 'none';

        modalEditar.style.display = 'none';
        indiceTarefaEditada = null;

         diaAtual = diaAtual + 1;

         if(diaAtual === 7){
            (diaAtual = 0);
         }

        diaSemanaNome.textContent = diaSemana[diaAtual];

        mostrarTarefasDoDia();

        console.log(diaAtual);
        console.log(diaSemana[diaAtual]);
        
    }
)

botaoDiaAnterior.addEventListener(
    'click',
    function(){
        modal.style.display = 'none';
        modoSelecaoAtivo = false;
        tarefasSelecionadas = 0;
        quantidadeSelecionadas.textContent = tarefasSelecionadas;
        acoesSelecao.style.display = 'none';


        modalEditar.style.display = 'none';
        indiceTarefaEditada = null;

        diaAtual = diaAtual - 1;


        if(diaAtual === -1){
            (diaAtual = 6);
        }

        diaSemanaNome.textContent = diaSemana[diaAtual];

        mostrarTarefasDoDia();
    }
)

botaoMudarDia.addEventListener(
    'click',
    function(){
        if(menuAberto){
            menuDia.style.display = 'none';
            menuAberto = false;
        }
        else{
            menuDia.style.display = 'grid';
            menuAberto = true;

        }
    }
)

botoesDias.forEach(function(botao) {
    botao.addEventListener('click', function() {

    modal.style.display = 'none';
    modoSelecaoAtivo = false;
    tarefasSelecionadas = 0;
    quantidadeSelecionadas.textContent = tarefasSelecionadas;
    acoesSelecao.style.display = 'none';

    modalEditar.style.display = 'none';
    indiceTarefaEditada = null;

        diaAtual = Number(botao.dataset.dia);
        diaSemanaNome.textContent = diaSemana[diaAtual];

        mostrarTarefasDoDia();

        menuDia.style.display = 'none';
        menuAberto = false;

    });
});



botaoAdicionar.addEventListener(
    'click', 
    function(){
        if (modalEditar.style.display === 'block'){
            modalEditar.style.display = 'none';
            indiceTarefaEditada = null;
        }

modal.style.display = 'block';
})

botaoCancelar.addEventListener(
    'click',
    function(){
        modal.style.display = 'none';

        tituloTarefa.value = '';
        horaInicio.value = '';
        horaTermino.value = '';
    }
)

botaoSalvar.addEventListener(
    'click',
    function(){
        
        if (tituloTarefa.value === '' ||
            horaInicio.value === ''){
                alert('Preencha o título e o horário de início para salvar!');
                return;
            }


       const novaTarefaDados = {
        titulo: tituloTarefa.value,
        horaInicio: horaInicio.value,
        horaTermino: horaTermino.value
       }

       if (horaTermino.value !== '' && horaInicio.value >= horaTermino.value) {
        alert('Horários incompatíveis!');
        return;
       }

       tarefasDosDias[diaAtual].push(novaTarefaDados);

       mostrarTarefasDoDia();

       localStorage.setItem('tarefas', JSON.stringify(tarefasDosDias));
       
       modal.style.display = 'none';

       tituloTarefa.value = '';
       horaInicio.value = '';
       horaTermino.value = '';

    }
)


const dadosSalvos = localStorage.getItem('tarefas');

let tarefasDosDias;

if (dadosSalvos !== null) {
tarefasDosDias = JSON.parse(dadosSalvos);
}
else {
tarefasDosDias = 
    [[], [], [], [], [], [], []]

}




function mostrarTarefasDoDia (){

    tarefas.textContent ='';

    tarefasDosDias[diaAtual].sort(function(a, b) {
        return a.horaInicio.localeCompare(b.horaInicio)
    });

    for (let i = 0; i<tarefasDosDias[diaAtual].length; i++){

        const novaTarefa = document.createElement('div');
        novaTarefa.dataset.indice = i;
        novaTarefa.classList.add('tarefa');

        const botaoEditar = document.createElement('button');
        botaoEditar.classList.add('btn-editar');
        botaoEditar.textContent = '✏️';
        novaTarefa.appendChild(botaoEditar);

        botaoEditar.addEventListener(
            'click',function(){
                if(modal.style.display === 'block'){
                    modal.style.display = 'none';
                    
                }


                const elementosSelecionados = document.querySelectorAll('.tarefa-selecionada');

                elementosSelecionados.forEach(function(elemento){
                    elemento.classList.remove('tarefa-selecionada');

                    elemento.querySelector('.btn-excluir').style.display = 'none';
                    elemento.querySelector('.btn-editar').style.display = 'block';
                })

                modoSelecaoAtivo = false;
                tarefasSelecionadas = 0;
                quantidadeSelecionadas.textContent = tarefasSelecionadas;
                acoesSelecao.style.display = 'none';



                if(modalEditar.style.display === 'block' && 
                    indiceTarefaEditada === Number(novaTarefa.dataset.indice)){

                        modalEditar.style.display = 'none';
                        indiceTarefaEditada = null;
                    }

                    else{
                        modalEditar.style.display = 'block';
                        indiceTarefaEditada = Number(novaTarefa.dataset.indice);

                        tituloEditar.value = tarefasDosDias[diaAtual][indiceTarefaEditada].titulo;
                        horaInicioEditar.value = tarefasDosDias[diaAtual][indiceTarefaEditada].horaInicio;
                        horaTerminoEditar.value = tarefasDosDias[diaAtual][indiceTarefaEditada].horaTermino
                        
                    }
                
            })

        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('btn-excluir');
        botaoExcluir.textContent = '🗑️';
        novaTarefa.appendChild(botaoExcluir);

        let temporizador; 

        let toqueLongo = false;

        novaTarefa.addEventListener(
            'pointerdown',
            function(){
                

                if (!modoSelecaoAtivo){
                temporizador = setTimeout(function(){
                    if (modalEditar.style.display === 'block'){
                        modalEditar.style.display = 'none';
                        indiceTarefaEditada = null;
                    }



                    toqueLongo = true;
                    novaTarefa.classList.add('tarefa-selecionada');
                    botaoEditar.style.display = 'none';
                    botaoExcluir.style.display = 'block';
                    modoSelecaoAtivo = true;
                    tarefasSelecionadas = tarefasSelecionadas + 1;
                    quantidadeSelecionadas.textContent = tarefasSelecionadas;
                    
                    if(tarefasSelecionadas >= 2){
                        acoesSelecao.style.display = 'flex';
                    }

                    botaoExcluir.addEventListener(
                        'click',
                        function(){

                            if(confirm('Realmente deseja excluir esta tarefa?')){

                            tarefasDosDias[diaAtual].splice(i, 1);

                            modoSelecaoAtivo = false;
                            tarefasSelecionadas = 0;
                            quantidadeSelecionadas.textContent = tarefasSelecionadas;
                            acoesSelecao.style.display = 'none';

                            mostrarTarefasDoDia();

                            localStorage.setItem('tarefas', JSON.stringify(tarefasDosDias));

                            }

                        });

                }, 1000)
            }
            
            }
        )

        novaTarefa.addEventListener(
            'pointerup',
            function(){
                clearTimeout(temporizador);
            }
        )

        novaTarefa.addEventListener('click', function(){
            if (toqueLongo) {
                toqueLongo = false;
                return;
            }
            if(modoSelecaoAtivo){
                if (novaTarefa.classList.contains('tarefa-selecionada')) {
                    novaTarefa.classList.remove('tarefa-selecionada');
                    tarefasSelecionadas = tarefasSelecionadas - 1;
                    quantidadeSelecionadas.textContent = tarefasSelecionadas;
                    botaoExcluir.style.display = 'none';
                    botaoEditar.style.display = 'block';
                    if (tarefasSelecionadas === 0) {
                        modoSelecaoAtivo = false;
                    }
                    if (tarefasSelecionadas < 2) {
                        acoesSelecao.style.display = 'none';
                    }
                    else {
                        acoesSelecao.style.display = 'flex';
                    }
                }
                else {
                    novaTarefa.classList.add('tarefa-selecionada');
                    botaoEditar.style.display = 'none';
                    botaoExcluir.style.display = 'block';
                    tarefasSelecionadas = tarefasSelecionadas + 1;
                    quantidadeSelecionadas.textContent = tarefasSelecionadas;
                    
                    if (tarefasSelecionadas >= 2) {
                        acoesSelecao.style.display = 'flex';
                    }
                    else {
                        acoesSelecao.style.display = 'none';
                    }
                }
            }
        })

        const nomeTarefa = document.createElement('span');
        nomeTarefa.classList.add('nome-tarefa');
        nomeTarefa.textContent =  tarefasDosDias[diaAtual][i].titulo;
        novaTarefa.appendChild(nomeTarefa);

        const horarioContainer = document.createElement('div');
        horarioContainer.classList.add('horario-container');
        novaTarefa.appendChild(horarioContainer);

        const hrContainer = document.createElement('hr');
        horarioContainer.appendChild(hrContainer);

        const horaTarefa = document.createElement('span');
        horaTarefa.classList.add('horario-tarefa');
        horaTarefa.textContent = tarefasDosDias[diaAtual][i].horaInicio;
        if(tarefasDosDias[diaAtual][i].horaTermino !== ''){
            horaTarefa.textContent = tarefasDosDias[diaAtual][i].horaInicio + ' - ' + tarefasDosDias[diaAtual][i].horaTermino;
        }
        horarioContainer.appendChild(horaTarefa);

        tarefas.appendChild(novaTarefa);
        console.log(tarefasDosDias[diaAtual][i].titulo);
    }
    }
mostrarTarefasDoDia();


botaoCancelarEditar.addEventListener(
    'click',
    function(){
        modalEditar.style.display = 'none';
        indiceTarefaEditada = null;
    }
)

botaoSalvarEditar.addEventListener(
    'click',
    function(){

        if(tituloEditar.value === '' ||
            horaInicioEditar.value === ''){
                alert('Preencha o título e o horário de início para salvar!');
                return;
            }

            if (horaTerminoEditar.value !== '' && horaInicioEditar.value >= horaTerminoEditar.value) {
                alert('Horários incompatíveis!');
                return; 
            }

        tarefasDosDias[diaAtual][indiceTarefaEditada].titulo = tituloEditar.value;
        tarefasDosDias[diaAtual][indiceTarefaEditada].horaInicio = horaInicioEditar.value;
        tarefasDosDias[diaAtual][indiceTarefaEditada].horaTermino = horaTerminoEditar.value;

        modalEditar.style.display = 'none';
        indiceTarefaEditada = null;

        mostrarTarefasDoDia();
        localStorage.setItem('tarefas', JSON.stringify(tarefasDosDias));
    }
)

botaoExcluirSelecionadas.addEventListener(
    'click',
    function(){

        if(confirm('Realmente deseja excluir estas tarefas?')) {
        const elementosSelecionados = document.querySelectorAll('.tarefa-selecionada');

        for (let i = elementosSelecionados.length - 1; i >= 0; i--) {
            const indiceTarefa = Number(elementosSelecionados[i].dataset.indice);

            tarefasDosDias[diaAtual].splice(indiceTarefa, 1);
        }
        mostrarTarefasDoDia();

        localStorage.setItem('tarefas', JSON.stringify(tarefasDosDias));

        modoSelecaoAtivo = false;
        tarefasSelecionadas = 0;
        quantidadeSelecionadas.textContent = tarefasSelecionadas;
        acoesSelecao.style.display = 'none';   
        }
    }
);
