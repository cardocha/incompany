import { WebActions } from "./WebActions";

export class Auth {
    static save(resultado) {
        localStorage.setItem('auth', JSON.stringify(resultado.data.obj))
    }

    static get() {
        const auth = JSON.parse(localStorage.getItem('auth'))
        return auth
    }

    static clear() {
        localStorage.clear()
        window.location.href = WebActions.getAppUrl()
    }

    static isPerfilAdm() {
        if (this.get() === null)
            this.clear()

        return this.get().tipo === "A"
    }

}
