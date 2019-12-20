'use strict'
//17p41dcaik6
fetch('https://todo-app-back.herokuapp.com/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body:
        JSON.stringify({
            email: 'psaiker12@gmail.com',
            password: '17p41dcaik6',
        }),

})
.then(response => response.json())
.then(response => console.log(response))
class VerifiUser {
    constructor(login, password){
        this.login = login;
        this.password = password;
        this.verification();
    }
    verification(){
        fetch('https://todo-app-back.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({
                    email: `${this.login}`,
                    password: `${this.password}`,
                }),

        })
        .then(response => response.json())
        .then(response => {
            localStorage.setItem("token", `${response.token}`
            Todo
            )},
            reason => {console.log("неавторизован", reason)})
    }
}


class Authentication extends VerifiUser{
    constructor(){
        super();
        this.loginElem = document.getElementById("form-login");
        this.passwordElem = document.getElementById("form-password");
        this.buttonLoginElem = document.getElementById("form-button-sign-up");
        this.check();
    }
    check(){
        this.buttonLoginElem.addEventListener("click", (event) =>{
            event.preventDefault();
            this.login = this.loginElem.value;
            this.password = this.passwordElem.value;
            this.verifications();
        });
    }
    verifications(){
        new VerifiUser(this.login, this.password)
    }
}
new Authentication();