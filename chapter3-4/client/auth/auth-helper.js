import { signout } from './api-auth'

const auth = {

    // En nuestros componentes frontend, necesitaremos recuperar las credenciales almacenadas para verificar si el usuario actual ha iniciado sesión
    isAuthenticated() {   
    if (typeof window == "undefined")  
    return false

    if (sessionStorage.getItem('jwt'))
    return JSON.parse(sessionStorage.getItem('jwt'))
    else
        return false
},
// iniciar sesion
authenticate(jwt, cb) {   
    if (typeof window !== "undefined")
    sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
},
// elimina credenciales de sessionStorage
clearJWT(cb) {    
    if (typeof window !== "undefined")
    sessionStorage.removeItem('jwt')
    cb()
    //optional
    signout().then((data) => {
        document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
},

// realiza la actualizacion de datos del usuario en sessionStorage, los parametros q se pasan son los datos del usuario act y un fn de devolucion de llamada que actualiza la vista
updateUser(user, cb) {
    if(typeof window !== "undefined"){
        if(sessionStorage.getItem('jwt')){
            let auth = JSON.parse(sessionStorage.getItem('jwt'))
            auth.user = user
            sessionStorage.setItem('jwt', JSON.stringify(auth))
            cb()
        }
    }
}
}

export default auth
