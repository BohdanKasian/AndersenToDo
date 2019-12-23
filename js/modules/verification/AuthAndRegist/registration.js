import VerifyUser from '../verification.js';
import service from "../../serviceSend";

class Registration extends VerifyUser{
    constructor(){
        super();
        this.registElem = document.getElementById("form-login-registration");
        this.passwordElem = document.getElementById("form-password-registration");
        this.usernameElem = document.getElementById("form-username-registration");
        this.buttonRegistElem = document.getElementById("form-button-registration");
    }
    check(){
        this.buttonRegistElem.addEventListener("click", (event) =>{
            event.preventDefault();
            if (this.registElem.value == "" || this.passwordElem.value == "" || this.usernameElem.value == ""){
                alert("Пожалуйста, заполните все поля");
                return
            }else {
                this.login = this.registElem.value;
                this.password = this.passwordElem.value;
                this.username = this.usernameElem.value;
                service.sendRegistration(this.login, this.password, this.username)
            }

        });
    }
}
const registration = new Registration();
export default registration
