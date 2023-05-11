import queryString from 'query-string'

// este metodo construye la URL con parametros de consulta y llama a una busqueda para realizar una solicitud al producto d la busqued API
const list = async (params, signal) => {
    const query = queryString.stringify(params)
    try {
        let response = await fetch('/api/products?'+query, {
            method: 'GET',
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}


export { list
            }
