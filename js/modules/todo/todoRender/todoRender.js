import CreateTask from '../todoLogic/changesTask/createTask.js'
import GetFinishedTask from "../todoLogic/getTasks/getFinishedTask";
import GetUnfinishedTask from "../todoLogic/getTasks/getUnfinishedTask";
import getAllTask from "../todoLogic/getTasks/getAllTasks";

export default class TodoRender {
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