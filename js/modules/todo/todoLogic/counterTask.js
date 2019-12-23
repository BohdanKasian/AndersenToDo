import TodoRender from "../todoRender/todoRender";

export default class CounterTask {
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