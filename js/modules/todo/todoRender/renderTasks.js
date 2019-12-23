
export default class RenderTask {
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
        taskDetailBox.innerHTML = `<div class="delete-task"></div>
                                    <input type="text" class="task title" value="${this.item.text}" />`;
        taskBox.appendChild(taskDetailBox);

        let taskDate = document.createElement("p");
        taskDate.className = "date";
        taskDate.innerText = this.item.createDate;
        taskBox.appendChild(taskDate)


        document.getElementById("all-task").appendChild(taskBox)
    }
}
