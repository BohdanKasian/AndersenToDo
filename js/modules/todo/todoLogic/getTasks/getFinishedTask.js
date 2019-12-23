import GetAllTasks from "./getAllTasks";

export default class GetFinishedTask{
    constructor(event){
        this.event = event;
        this.event.preventDefault();
        this.takeTask();
    }
    takeTask(){
        filterFinishedTask.getTasks(filterFinishedTask);
    }

}

const filterFinishedTask = new GetAllTasks(true, null);
