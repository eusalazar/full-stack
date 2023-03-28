import { signout } from './api-auth'

const auth = {
    isAuthenticated() {   //En nuestros componentes frontend, necesitaremos recuperar las credenciales almacenadas para verificar si
    if (typeof window == "undefined")  //el usuario actual ha iniciado sesión
    return false

    if (sessionStorage.getItem('jwt'))
    return JSON.parse(sessionStorage.getItem('jwt'))
    else
        return false
},
authenticate(jwt, cb) {   //iniciar sesion
    if (typeof window !== "undefined")
    sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
},
clearJWT(cb) {    //elimina credenciales de sessionStorage
    if (typeof window !== "undefined")
    sessionStorage.removeItem('jwt')
    cb()
    //optional
    signout().then((data) => {
        document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
}
}

export default auth
