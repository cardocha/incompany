import axios from 'axios'

export class WebActions {

    static createRequest() {
        const instance = axios.create({
            baseURL: this.getApiUrl(),
            timeout: 5000
        });

        return instance
    }

    static getApiUrl() {
        let app = "incompany";
        //let host = "http://incompany.epizy.com/";
        let host = "http://localhost";
        let appType = "api"
        let versao = "v1";
        return host + "/" + app + "/" + appType + "/" + versao + "/"
    }

    static getAppUrl() {
        //return "http://incompany.epizy.com/"
        return "/";
    }

}
