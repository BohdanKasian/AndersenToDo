import RenderTask from "../../todoRender/renderTasks.js";
import CounterTask from "../counterTask";
import DeleteTask from "../changesTask/deleteTask";
import EditTask from "../changesTask/editTask/editTask";


export default class GetAllTasks {
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

const getAllTask = new GetAllTasks(null, null);
 getAllTask