import VerifyUser from '../verification.js';

class Authentication extends VerifyUser{
    constructor(){
        super();
        this.loginElem = document.getElementById("form-login");
        this.passwordElem = document.getElementById("form-password");
        this.buttonLoginElem = document.getElementById("form-button-sign-up");
    }
    check(){
        if (this.loginElem.value == "" || this.passwordElem.value == ""){
            alert("Пожалуйста, заполните все поля")
        }else {
            this.login = this.loginElem.value;
            this.password = this.passwordElem.value;
            this.verifications();
        }
    }
    verifications(){
        let check = new VerifyUser(this.login, this.password);
        check.verification()
    }
}

const authentication = new Authentication();
export default authentication