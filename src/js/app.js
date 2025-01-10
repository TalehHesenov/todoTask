const input_search = document.querySelector("#input_search");
const input_todo = document.querySelector("#input_todo");
const btn = document.querySelector("#btn");
const ul = document.querySelector("#todo_ul");

let todos = JSON.parse(sessionStorage.getItem("todos"));


if(todos == null){
   todos = []
    
}

renderTodos();

function addTodo() {

    if(!input_todo.value == ""){
        const newTodo = {
            id: Date.now().toString(),
            text: input_todo.value,
          };
        
          input_todo.value = "";
          todos.push(newTodo);
          sessionStorage.setItem("todos",JSON.stringify(todos));
        
        renderTodos();
    }else{
        alert("Xahis olunu inputu bos buraxmayin");
    }
  

}

function renderTodos() {
    ul.innerHTML = '';
    todos.forEach(item => {
        const li = document.createElement('li');
        li.id = item.id;

       
        li.innerHTML = `<h4 class="${item.isActive ? 'active' : ''}">${item.text}</h4>
        <button class="delete_btn">Delete</button>`;

        ul.appendChild(li);
    });
}


function deleteTodo(id){

   todos = todos.filter(item => item.id!==id);
   sessionStorage.setItem("todos",JSON.stringify(todos));
   renderTodos();
}


function searchTodo(){

    ul.innerHTML = '';

    todos.forEach(item=>{
        if(item.text.toLowerCase().includes(input_search.value.toLowerCase())){
            const li = document.createElement('li');
            li.id = item.id;
    
            li.innerHTML = `<h4 class="${item.isActive ? 'active' : ''}">${item.text}</h4>
        <button class="delete_btn">Delete</button>`;
    
            ul.appendChild(li);
        }
    })





}


input_search.addEventListener('input', searchTodo);


ul.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('delete_btn')) {
        const todoId = e.target.closest('li').id;
        deleteTodo(todoId);
        return;
    }

    const li = e.target.closest('li');
    if (li) {
        const todoId = li.id;
        const todo = todos.find(item => item.id === todoId);
        if (todo) {
            todo.isActive = !todo.isActive; 
            sessionStorage.setItem("todos", JSON.stringify(todos));
            renderTodos(); 
        }
    }
});






btn.addEventListener("click", addTodo);
