import service from "../../../serviceSend";

export default class CreateTask {
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