// declarando as variáveis de interface
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// carregando todos os Events Listeners
loadEventListeners();

// funcão que roda todos os eventos
function loadEventListeners(){

    // evento para carregar a DOM
    document.addEventListener('DOMContentLoaded', getTasks);

    // evento para adicionar tarefa
    form.addEventListener('submit', addTask);

    // evento para remover tarefas
    taskList.addEventListener('click', removeTask);

    // evento para limpar todas as tarefas
    clearBtn.addEventListener('click', clearTasks);

    // evento para filtrar as tarefas
    filter.addEventListener('keyup', filterTasks);

}

// função para adicionar tarefas na lista
function addTask(e){
    if(taskInput.value === '') {

        alert('Digite uma tarefa!');

    } else {
        
        // criando o elemmento li
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));

        //criando o link de exclusão dentro do li
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class= "fa fa-remove"></i>';
        li.appendChild(link);

        // armazenando no Local Storage do navegados
        storeTaskInLocalStorage(taskInput.value);

        // inserindo o li dentro do ul
        taskList.appendChild(li);

        //limpando o texto do input
        taskInput.value = '';

    }

    e.preventDefault();
}

// função para pegar as tarefas do LS
function getTasks() {

    // verificando o conteudo do LS
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {

        // criando o elemmento li
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        //criando o link de exclusão dentro do li
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class= "fa fa-remove"></i>';
        li.appendChild(link);

        // inserindo o li dentro do ul
        taskList.appendChild(li);

        });

    
}

// função para armezar tarefa no LS
function storeTaskInLocalStorage(task) {
    
    // verificando o conteudo do LS
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// função para remover tarefas da lista
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Tem certeza que deseja remover o item?')) {
            e.target.parentElement.parentElement.remove();  
            
            // remover tarefa do LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }        
    }
}

// função para remover tarefa do LS
function removeTaskFromLocalStorage(taskItem) {
    
    // verificando o conteudo do LS
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        // verificando texto do item com o texto do array
        if(taskItem.textContent === task) {
            tasks.splice(index, 1); // removendo elemento do array
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
    });


}

// função para limpar todas as tarefas
function clearTasks(){
    if(confirm("Tem certeza que deseja remover todas as tarefas?")){
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        // limpando tarefas do LS
        localStorage.clear();
    }    
}

// função para filtrar as tarefas enquanto digita
function filterTasks(e) {
    
    const text = e.target.value.toLocaleLowerCase(); // pegando texto do input filter

    // exibindo o conteudo na lista caso seja encontrado
    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const taskText = task.firstChild.textContent;
            if(taskText.toLocaleLowerCase().indexOf(text) !== -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );    
}
