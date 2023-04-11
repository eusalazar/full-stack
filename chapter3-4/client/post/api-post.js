const create = async (params, credentials, post) => {
    try {
        let response = await fetch('/api/posts/new/'+ params.userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: post
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
};

// usaremos list-posts-by-user  p/obtener las publicaciones relacionadas y mostrar estas publicaciones en la vista del perfil
const  listByUser = async (params, credentials) => {
    try {
        let response = await fetch('/api/posts/by/'+ params.userId, {
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

// obtiene las publicaciones relacionadas 
const listNewsFeed = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/posts/feed/'+ params.userId, {
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

const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/posts/' + params.postId, {
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

// metodo de  busqueda que se usara cdo el usuario haga click en ell boton MG
const like = async (params, credentials, postId) => {
    try {
        let response = await fetch('/api/posts/like/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify({userId:params.userId, postId: postId})
    })
    return await response.json()
    } catch(err) {
        console.log(err)
    }
};

const unlike = async (params, credentials, postId) => {
    try {
        let response = await fetch('/api/posts/unlike/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({userId:params.userId, postId: postId})
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
};

// toma l id del usuario actual,el id de la publicacion y el objeto del comentario y lo envia en una solicitud de anadir comentario
const comment = async (params, credentials, postId, comment) => {
    try {
        let response = await fetch('/api/posts/uncomment/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({userId:params.userId, postId: postId, comment: comment})
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
};

const uncomment = async (params, credentials, postId, comment) => {
    try {
        let response = await fetch('/api/posts/uncomment/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({userId:params.userId, postId: postId, comment: comment})
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
};

export {create,
        listByUser,
        listNewsFeed,
        like,
        unlike,
        remove,
        comment, 
        uncomment}