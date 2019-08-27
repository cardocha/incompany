import questoes from './questoes-data.json'

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
        window.location.href = '/login'
    }

}
