import GetAllTasks from "./getAllTasks";

export default class GetUnfinishedTask{
    constructor(event){
        this.event = event;
        this.event.preventDefault();
        this.takeTask();
    }
    takeTask(){
        filterUninishedTask.getTasks(filterUninishedTask);
    }

}

const filterUninishedTask = new GetAllTasks(null, false);
