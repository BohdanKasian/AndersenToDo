import CompletedTasks from "./completedTask";

export default class EditTask extends CompletedTasks{
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
                service.sendEdit(item.value, this.targetElement.id, this.completed)
            })
        })
    }
}