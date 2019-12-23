'use strict'
import authentication from "./modules/verification/AuthAndRegist/authentication";
import registration from "./modules/verification/AuthAndRegist/registration";

//17p41dcaik6

fetch('https://todo-app-back.herokuapp.com/me', {
    method: 'GET',
    headers: {
        'Authorization': `${localStorage.getItem("token")}`
    }
}).then(response => {
    if (response.status === 200) {
        new TodoRender();
        new GetAllTasks(null, null);
    } else {
        console.log("Неверный токен")
    }
}, reason => console.log("URL ИЛИ нет интернета", reason));

(function () {
    document.getElementById("form-button-sign-up").addEventListener("click", (event) => {
        event.preventDefault();
        authentication.check()
    });
    document.getElementById("registration-link").addEventListener("click", () => {
        registration.check()
    })
}());











class TodoRender {
    constructor(countAll, countFinish, countUnfinish){
        this.countAll = countAll;
        this.countFinish = countFinish;
        this.countUnfinish = countUnfinish;
        this.htmlElement = null;
        this.render()
    }
    createElement(){
        this.element = `
            <section class="todo">
            <button type="submit" id="log-out" class="button log-out">LogOut</button>
    <div class="wrapper">
        <div class="flex-column todo-box">
            <div class="flex-column bg-list todo-height bg-box__width__radius" >
                <div class="new-task todo-padding">
                    <form class="flex-row bg-form-and-input">
                        <input type="text" id="todo-new-task" placeholder="Add a new task...">
                        <button type="submit" id="todo-button-new-task" class="button">Go</button>
                    </form>
                </div>
                <div class="task-filter-box todo-padding">
                    <div class="position-counter">
                        <button type="submit" id="filter-task-all" class="button">all task</button>
                        <div class="counter">${this.countAll}</div>
                    </div>
                    <div class="position-counter">
                        <button type="submit" id="filter-finished" class="button">finished</button>
                        <div class="counter">${this.countFinish}</div>
                    </div>
                    <div class="position-counter">
                        <button type="submit" id="filter-unfinished" class="button">unfinished</button>
                        <div class="counter">${this.countUnfinish}</div>
                    </div>
                </div>
                <div class="black-line"></div>
                <div class="flex-column bg-box__width__radius" id="all-task"></div>
            </div>
        </div>
    </div>
</section>
        `
    }

    setupEventListeners(){
        let newTaskInput = document.getElementById("todo-new-task");
        let newTaskButton = document.getElementById("todo-button-new-task");
        let finishedButton = document.getElementById("filter-finished");
        let unfinishedButton = document.getElementById("filter-unfinished");
        let alltaskButton = document.getElementById("filter-task-all");
        let logOutButton = document.getElementById("log-out");

        logOutButton.addEventListener("click", () => {
            location.reload()
            console.log("пока что ЛОГаут так пусть работает");
            localStorage.removeItem("token")

        });
        newTaskButton.addEventListener("click", event =>{
            new CreateTask(event)
        } );
        newTaskInput.addEventListener("enter", event =>{
            new CreateTask(event)
        } );

        finishedButton.addEventListener("click", event => {
            new GetFinishedTask(event)
        });
        unfinishedButton.addEventListener("click", event => {
            new GetUnfinishedTask(event)
        });
        alltaskButton.addEventListener("click", event =>{
            getAllTask.getTasks(getAllTask);
        })

    }
    render(){
        this.createElement();
        document.body.innerHTML = "";
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
        service.sendNewTask(this.input);
    }
}

class GetAllTasks {
    constructor(finished, unfinished){
        this.allTasks = null;
        this.unfinished = unfinished;
        this.filterFinished = finished;

    }
    getTasks(filter){
        this.allTasks = service.getAllTasks(filter);
    }
    receiveTask(allTasks){
        this.allTasks = allTasks;
        new CounterTask(this.allTasks);
        document.getElementById("all-task").innerHTML = "";
        this.allTasks.reverse().forEach(item =>{
            if (this.filterFinished === item.completed){
                new RenderTask(item)
            } else if (this.unfinished === item.completed){
                new RenderTask(item)
            } else if (this.unfinished === null & this.filterFinished === null){
                new RenderTask(item)
            }
            });
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
                service.sendDelete(this.targetElement.id);
            })
        })
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
        this.targetElement = null;
        this.editListener()
    }
    editListener(){
        document.querySelectorAll(".task.title").forEach(item =>{
            item.addEventListener("change", ev => {
                this.targetElement = ev.target.parentNode.parentNode;
                item.value = `${item.value}`;
                new SendEdit(item.value, this.targetElement.id, this.completed)
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
        service.sendEdit(this.id, this.value, this.completed)
    }
}

class GetFinishedTask{
    constructor(event){
        this.event = event;
        this.event.preventDefault();
        this.takeTask();
    }
    takeTask(){
        filterFinishedTask.getTasks(filterFinishedTask);
        // new GetAllTasks(true, null )
    }

}

const filterFinishedTask = new GetAllTasks(true, null);
class GetUnfinishedTask{
    constructor(event){
        this.event = event;
        this.event.preventDefault();
        this.takeTask();
    }
    takeTask(){
        filterUninishedTask.getTasks(filterUninishedTask);
        // new GetAllTasks(null, false)
    }

}

const filterUninishedTask = new GetAllTasks(null, false);

class CounterTask {
    constructor(allTask){
        this.AllTask = allTask;
        this.countFinishTask = [];
        this.countUnfinishTask = [];

        this.counter();
    }
    counter(){
        this.AllTask.forEach(item => {
            if (item.completed) {
                this.countFinishTask.push(item.completed)
            } else {
                this.countUnfinishTask.push(item.completed)
            }
        });

        new TodoRender(this.AllTask.length, this.countFinishTask.length, this.countUnfinishTask.length)

    }
}






const getAllTask = new GetAllTasks(null, null);
