

export default class CompletedTasks {
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

                service.sendEdit(itemTask.value, this.targetElement.id, this.completed)
            })

        })
    }
}