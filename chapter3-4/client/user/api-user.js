const getRequest = (signal, credentials) => {
    return {
        method: 'GET',
        signal,
        headers: setHeaders(credentials)
    }
}

const request = (method, body, credentials = {}) => {
    const options = {
        method,
        headers: setHeaders(credentials),
    }
    if(body) {
        options.body = JSON.stringify(body)
    }
    return options
}

const setHeaders = (credentials = {}) => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
    }
}

const create = async (user) => {
    try {
        let response = await fetch('/api/users/', request("POST", user))
        return await response.json()
    } catch(err) {
        console.log(err)
    }
};



// recupera todos los usuarios de la BD
const list = async (signal) => {   
    try {
        let response = await fetch('/api/users/', getRequest(signal, credentials))
        return await response.json()
    } catch(err) {
        console.log(err)
    }
};


// usuario por ID.Es una ruta protegida, además de pasar el ID de
// usuario como parámetro, el componente solicitante también debe proporcionar credenciales validas JWT valido
const read = async (params, credentials, signal) => {  
    try {                                              
        let response = await fetch('/api/users/' + params.userId, getRequest(signal, credentials))
        return await response.json()
    } catch(err) {
        console.log(err)
    }
};

// toma datos del usuario modificados del componente de vista p un usuario en especif, usa fetch para un PUT y actializa, en el back requ JSON ruta protegida
const update = async (params, credentials, body) => {  
    try {                                              
        let response = await fetch('/api/users/' + params.userId, request("PUT", body, credentials))
        return await response.json()
    } catch (err) {
        console.log(err)
    }
};

const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/users/' + params.userId, request("DELETE", null, credentials))
        return await response.json()
    } catch(err) {
        console.log(err)
    }
};

const follow = async(params, credentials, followId) => {
    try {
        const body = {userId:params.userId, followId: followId};
        let response = await fetch('/api/users/follow/', request("PUT", body, credentials))
        return await response.json()
    }catch(err) {
        console.log(err)
    }
};

const unfollow = async (params, credentials, unfollowId) => {
    try {
        const body = {userId:params.userId, unfollowId:unfollowId}
        let response = await fetch('/api/users/unfollow/', request("PUT", body, credentials))
        return await response.json()
    }catch(err) {
        console.log(err)
    }
};

// devuelve una serie de usuarios que no son seguidos x el usuario actual
const findPeople = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/users/findpeople/' +
        params.userId, getRequest(signal, credentials))
        return await response.json()
    }catch(err) {
        console.log(err)
    }
};



export { create, 
        list, 
        read, 
        update, 
        remove, 
        follow, 
        unfollow, 
        findPeople }
