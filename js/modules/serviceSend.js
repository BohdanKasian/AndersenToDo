class Service {
    constructor(){
        this.headersAuth = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            }
        };
        this.headersPost = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

    }
    getAllTasks(filter){
        //All task
        fetch('https://todo-app-back.herokuapp.com/todos', {
            method: 'GET',
            headers: this.headersAuth.headers
        }).then(response => response.json())
            .then(response => {
                filter.receiveTask(response)
            })
    }
    sendLogin(login, password) {
        //login
        fetch('https://todo-app-back.herokuapp.com/login', {
            method: 'POST',
            headers: this.headersPost.headers,
            body:
                JSON.stringify({
                    email: `${login}`,
                    password: `${password}`,
                }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(response => {
                localStorage.setItem("token", `${response.token}`);
                new TodoRender()
                new GetAllTasks(null, null);
            })
    }
    sendRegistration(login, password, username){
        //registration
        fetch('https://todo-app-back.herokuapp.com/register', {
            method: 'POST',
            headers: this.headersPost.headers,
            body:
                JSON.stringify({
                    'email': `${login}`,
                    'password': `${password}`,
                    'username': `${username}`
                }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(response => {
                localStorage.setItem("token", `${response.token}`);
                new TodoRender()
                new GetAllTasks(null, null);
            })
    }
    sendNewTask(input){
        //new Post
        if (input.value.length >= 5) {

            fetch('https://todo-app-back.herokuapp.com/todos', {
                method: 'POST',
                body:
                    JSON.stringify({
                        text: `${input.value}`,
                    }),
                headers: this.headersAuth.headers
            }).then(response => {
                new GetAllTasks(null, null);
            });
            input.value = "";
        }else {alert("Введите задачу, или короткое название")}
    }
    sendDelete(id){
        //Delete Task
        fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
            method: 'DELETE',
            headers: this.headersAuth.headers
        }).then(result => new GetAllTasks(null, null), reason => console.log(reason))

    }
    sendEdit(id, value, completed){
        //send Edit
        fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
            method: 'PUT',
            body:
                JSON.stringify({
                    text: `${value}`,
                    completed: completed
                }),
            headers: this.headersAuth.headers
        }).then(result => new GetAllTasks(null, null))
    }

}
const service = new Service();
export default service