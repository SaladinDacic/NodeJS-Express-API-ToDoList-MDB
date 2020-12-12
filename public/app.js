

$(document).ready(function () {
    $.getJSON("/api/todos")
    .then(addTodos)

    $('#todoInput').keypress(function (keyPressed) { 
        if(keyPressed.keyCode == 13){
            createTodo();
        }
    });

    $(".list").on("click", "span", function(event){
        event.stopPropagation();
        removeTodo($(this).parent());
    });

    $(".list").on("click", "li", function(){
        updateTodo($(this));
    });
    
});

function addTodos(todos){
    //add todos in page
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

function addTodo(todo){
    var newTodo = $('<li class="task" >' + todo.name +'<span>x</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data("complited", todo.complited);
    if(todo.complited){
        newTodo.addClass('done');
    }
    $('.list').append(newTodo); 
}

function createTodo(){
    var usrInput = $('#todoInput').val();
    $.post("/api/todos", {name: usrInput})
    .then((newTodo)=>{
        $('#todoInput').val("");
        addTodo(newTodo);
    })
    .catch((err)=>{
        console.log(err);
    })
}

function removeTodo(todoData) {
    var todoId = todoData.data("id");
    
    $.ajax({
        type: "delete",
        url: "/api/todos/" + todoId,
    })
    .then((data)=>{
        console.log(data);
        todoData.remove();
    })
    .catch((err)=>{
        console.log(err);
    });
}

function updateTodo(todo){
    var isDone = !todo.data("complited");
    var updateData = {complited: isDone};
    $.ajax({
        type: "put",
        url: "/api/todos/" + todo.data("id"),
        data: updateData
    })
    .then((updatedTodo)=>{
        todo.toggleClass("done");
        todo.data("complited", isDone) 
    })
}



/* function findTodo (data){
    var foundOne;
    data.forEach((todo)=>{
        if(todo._id == todoId){
            foundOne = todo;
        }
    })
    updateLine(foundOne)
} */

/* function updateLine(foundOne){
    var comp;
    if(foundOne.complited)
    {comp = {complited: false}}
    else
    {comp = {complited: true}}
    $.ajax({
        type: "put",
        url: "/api/todos/" + todoId,
        data: comp
    })
    .then((data)=>{
        if(data.complited)
            {li.addClass("done")}
        else
            {li.removeClass("done")}
    }); 
} */

