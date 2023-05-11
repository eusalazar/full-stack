// metodo de obtencion para hacer una solicitud a un metodo de obtencion
const create = async (params, credentials, shop) => {
    try {
        let response = await fetch('/api/shops/by/'+ params.userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: shop
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

const list = async (signal) => {
    try {
        let response = await fetch('/api/shops',{
            method: 'GET',
            signal: signal
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

// obtiene todas las tiendas propiedad de un usuario a la vista, agrega un metodo de obtecion q toma las credenciales del usuario q inicio sesion p hacer un GET con el ID de usuario esp pasado en la URL
const listByOwner = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/shops/by/'+params.userId,{
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

export { create,
        list,
        listByOwner
                }