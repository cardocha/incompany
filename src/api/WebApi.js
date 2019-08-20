import axios from 'axios'

export class WebApi {

    static create() {
        return axios.create({
            baseURL: this.getUrl(),
            timeout: 4000
        });
    }

    static getUrl() {
        let app = "incompany";
        let host = "http://localhost";
        let appType = "api"
        let versao = "v1";
        return host + "/" + app + "/" + appType + "/" + versao + "/"
    }

}
