'use strict'
import authentication from "./modules/verification/AuthAndRegist/authentication";
import registration from "./modules/verification/AuthAndRegist/registration";

//17p41dcaik6

fetch('https://todo-app-back.herokuapp.com/me', {
    method: 'GET',
    headers: {
        'Authorization': `${localStorage.getItem("token")}`
    }
}).then(response => {
    if (response.status === 200) {
        new TodoRender();
        new GetAllTasks(null, null);
    } else {
        console.log("Неверный токен")
    }
}, reason => console.log("URL ИЛИ нет интернета", reason));

(function () {
    document.getElementById("form-button-sign-up").addEventListener("click", (event) => {
        event.preventDefault();
        authentication.check()
    });
    document.getElementById("registration-link").addEventListener("click", () => {
        registration.check()
    })
}());























