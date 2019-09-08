import axios from 'axios'

export class WebApi {

    static create() {
        const instance = axios.create({
            baseURL: this.getUrl(),
            timeout: 4000
        });

        return instance
    }

    static getUrl() {
        let app = "incompany";
        let host = "http://incompany.epizy.com/";
        let appType = "api"
        let versao = "v1";
        return host + "/" + app + "/" + appType + "/" + versao + "/"
    }

}