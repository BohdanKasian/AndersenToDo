'use strict'
//17p41dcaik6

fetch('https://todo-app-back.herokuapp.com/me', {
    method: 'GET',
    headers: {
        'Authorization': `${localStorage.getItem("token")}`
    }
}).then(response => {
    if (response.status === 200) {
        new TodoRender();
        new GetAllTasks();
    } else {
        console.log("Неверный токен")
    }
}, reason => console.log("URL ИЛИ нет интернета", reason));
class VerifyUser {
    constructor(login, password){
        this.login = login;
        this.password = password;
    }
    verification() {
        fetch('https://todo-app-back.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({
                    email: `${this.login}`,
                    password: `${this.password}`,
                }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(response => {
                localStorage.setItem("token", `${response.token}`);
                new TodoRender()
            })
    }

}


class Authentication extends VerifyUser{
    constructor(){
        super();
        this.loginElem = document.getElementById("form-login");
        this.passwordElem = document.getElementById("form-password");
        this.buttonLoginElem = document.getElementById("form-button-sign-up");
        this.check();
    }
    check(){
        this.buttonLoginElem.addEventListener("click", (event) =>{
            event.preventDefault();
            if (this.loginElem.value == "" || this.passwordElem.value == ""){
                alert("Пожалуйста, заполните все поля")
            }else {
                this.login = this.loginElem.value;
                this.password = this.passwordElem.value;
                this.verifications();
            }

        });
    }
    verifications(){
       let check =  new VerifyUser(this.login, this.password)
        check.verification()
    }
}
new Authentication();

class TodoRender {
    constructor(){
        this.htmlElement=null;
        this.render()
    }
    createElement(){
        this.element = `
            <section class="todo">
    <div class="wrapper">
        <div class="flex-column todo-box">
            <div class="flex-column bg-list todo-radius todos_width" >
                <div class="new-task todo-padding">
                    <form class="flex-row bg-form-and-input">
                        <input type="text" id="todo-new-task" placeholder="Add a new task...">
                        <button type="submit" id="todo-button-new-task" class="button">Go</button>
                    </form>
                </div>
                <div class="task-filter-box todo-padding">
                    <div class="position-counter">
                        <button type="submit" id="filter-task-all" class="button">all task</button>
                        <div class="counter">9</div>
                    </div>
                    <div class="position-counter">
                        <button type="submit" id="filter-finished" class="button">finished</button>
                        <div class="counter">1</div>
                    </div>
                    <div class="position-counter">
                        <button type="submit" id="filter-unfinished" class="button">unfinished</button>
                        <div class="counter">15</div>
                    </div>
                </div>
                <div class="black-line"></div>
                <div class="flex-column todos_width" id="all-task"></div>
            </div>
        </div>
    </div>
</section>
        `
    }

    setupEventListeners(){
        let newTaskInput = document.getElementById("todo-new-task");
        let newTaskButton = document.getElementById("todo-button-new-task");
        newTaskButton.addEventListener("click", event =>{
            new CreateTask(event)
        } );
        newTaskInput.addEventListener("enter", event =>{
            new CreateTask(event)
        } );

    }
    render(){
        this.createElement();
        document.body.innerHTML = ""
        document.body.innerHTML = this.element;
        this.setupEventListeners();

    }
}


class CreateTask {
    constructor(event) {
        this.event = event;
        this.input = document.getElementById("todo-new-task");
        this.newTask();
    }
    newTask(){
        this.event.preventDefault();
        if (this.input.value.length >= 5) {

            fetch('https://todo-app-back.herokuapp.com/todos', {
                method: 'POST',
                body:
                    JSON.stringify({
                        text: `${this.input.value}`,
                    }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem("token")}`
                }
            }).then(response => {
                new GetAllTasks();
            });
            this.input.value = "";
        }else {alert("Введите задачу, или короткое название")}
    }
}

class GetAllTasks {
    constructor(){
        this.allTasks = null;
        this._getTasks()
    }
    _getTasks(){
        fetch('https://todo-app-back.herokuapp.com/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            }
        }).then(response => response.json())
          .then(response => {this.allTasks = response;
                console.log(response)
              this.receiveTask();
          })
    }
    receiveTask(){
        document.getElementById("all-task").innerHTML = "";
        this.allTasks.reverse().forEach(item => new RenderTask(item));
        this.changesTask();
    }
    changesTask(){
        new DeleteTask();
        new EditTask();
    }
}
class RenderTask {
    constructor(item){
        this.item = item;
        this.render()
    }
    render(){
        let taskBox = document.createElement("div");
        if (this.item.completed){
            taskBox.className = "task-box flex-row todo-padding checked-task";
        } else {
            taskBox.className = "task-box flex-row todo-padding";
        }

        taskBox.id = `${this.item._id}`;

        let labelCheck = document.createElement("label");
        labelCheck.className = "checkbox";

        let checkboxInput = document.createElement("input");
        checkboxInput.type = "checkbox";
        checkboxInput.className = "c1";
        checkboxInput.checked = this.item.completed;
        labelCheck.appendChild(checkboxInput);

        let checkboxSpan = document.createElement("span");
        checkboxSpan.className = "checkbox-span";
        labelCheck.appendChild(checkboxSpan);

        taskBox.appendChild(labelCheck);

        let taskDetailBox = document.createElement("div");
        taskDetailBox.className = "flex-column task-detail-box";
        taskDetailBox.innerHTML = `
                                    <div class="delete-task"></div>
                                    <input type="text" class="task title" value="${this.item.text}" />`;
        taskBox.appendChild(taskDetailBox);

        let taskDate = document.createElement("p");
        taskDate.className = "date";
        taskDate.innerText = this.item.createDate;
        taskBox.appendChild(taskDate)


        document.getElementById("all-task").appendChild(taskBox)
    }
}

class DeleteTask {
    constructor(){
        this.targetElement = null;
        this.deleteListener()
    }
    deleteListener(){
        document.querySelectorAll(".delete-task").forEach(item =>{
            item.addEventListener("click", ev => {
                this.targetElement = ev.target.parentNode.parentNode;
                new RemoveTask(this.targetElement.id);
            })
        })
    }
}
class RemoveTask {
    constructor(id){
        this.id = id;
        this.sendDelete();
    }
    sendDelete(){
        fetch(`https://todo-app-back.herokuapp.com/todos/${this.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            }
        }).then(result => new GetAllTasks(), reason => console.log(reason))
    }
}



class CompletedTasks {
    constructor(){
        this.completed =  null;
        this.targetElement = null;
        this.analysis()
    }
    analysis(){
        document.querySelectorAll("input[type='checkbox']").forEach(item =>{
            item.addEventListener("click", ev => {
                this.completed = item.checked;
                this.targetElement = ev.target.parentNode.parentNode;

                let boxTask = document.getElementById(`${this.targetElement.id}`);
                let itemTask = boxTask.querySelector(".task");

                new SendEdit(itemTask.value, this.targetElement.id, this.completed)
            })

        })
    }
}
class EditTask extends CompletedTasks{
    constructor(){
        super();
        this.targetElement = null
        this.editListener()
    }
    editListener(){
        document.querySelectorAll(".task.title").forEach(item =>{
            item.addEventListener("change", ev => {
                this.targetElement = ev.target.parentNode.parentNode;
                item.value = `${item.value}`;
                new SendEdit(item.value, this.targetElement.id, this.completed)
                console.log(item.value)
            })
        })
    }
}

class SendEdit {
    constructor(value, id, completed){
        this.value = value;
        this.id = id;
        this.completed = completed;
        this.send();
    }
    send(){
        console.log(this.id)
        fetch(`https://todo-app-back.herokuapp.com/todos/${this.id}`, {
            method: 'PUT',
            body:
                JSON.stringify({
                    text: `${this.value}`,
                    completed: this.completed
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            }
        }).then(result => new GetAllTasks())
    }
}