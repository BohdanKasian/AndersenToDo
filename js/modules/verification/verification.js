import service from "../serviceSend";

export default class VerifyUser {
    constructor(login, password, username){
        this.login = login;
        this.password = password;
        this.username = username;
    }
    verification() {
        service.sendLogin(this.login, this.password)
    }
}