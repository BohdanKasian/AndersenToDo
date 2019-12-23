import service from "../../../serviceSend";



export default class DeleteTask {
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