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
        return await response.json(user)
    } catch(err) {
        console.log(err)
    }
};

const list = async (signal) => {   //recupera todos los usuarios de la BD
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

const read = async (params, credentials, signal) => {  //usuario por ID.Es una ruta protegida, además de pasar el ID de
    try {                                              //usuario como parámetro, el componente solicitante también debe proporcionar credenciales validas JWT valido
        let response = await fetch ('/api/users/' + params.userId, {
            method: 'GET',
            signal: signal,
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

const update = async (params, credentials, user) => {  //toma datos del usuario modificados del componente de vista p un usuario en especif,
    try {                                              //usa fetch para un PUT y actializa, en el back requ JSON ruta protegida
        let response = await fetch ('/api/users/' + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(user)
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

export { create, list, read, update, remove }