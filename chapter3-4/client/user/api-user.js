const create = async (user) => {
    try {
        let response = await fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
};

// recupera todos los usuarios de la BD
const list = async (signal) => {   
    try {
        let response = await fetch('/api/users/', {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
};

// usuario por ID.Es una ruta protegida, además de pasar el ID de
// usuario como parámetro, el componente solicitante también debe proporcionar credenciales validas JWT valido
const read = async (params, credentials, signal) => {  
    try {                                              
        let response = await fetch('/api/users/' + params.userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
};

// toma datos del usuario modificados del componente de vista p un usuario en especif, usa fetch para un PUT y actializa, en el back requ JSON ruta protegida
const update = async (params, credentials, user) => {  
    try {                                              
        let response = await fetch('/api/users/' + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: user
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
};

const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
};

const follow = async(params, credentials, followId) => {
    try {
        let response = await fetch('/api/users/follow/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({userId:params.userId, followId: followId})
        })
        return await response.json()
    }catch(err) {
        console.log(err)
    }
};

const unfollow = async (params, credentials, unfollowId) => {
    try {
        let response = await fetch('/api/users/unfollow/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({userId:params.userId, unfollowId:unfollowId})
        })
        return await response.json()
    }catch(err) {
        console.log(err)
    }
};

// devuelve una serie de usuarios que no son seguidos x el usuario actual
const findPeople = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/users/findpeople/' +
        params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
                }
        })
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