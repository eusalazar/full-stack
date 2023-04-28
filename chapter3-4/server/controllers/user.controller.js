import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

// Esta función crea un nuevo usuario con el objeto JSON del usuario que se recibe en el post
// user.save intenta guardar el nuevo usuario en la base de datos después de que Mongoose haya realizado una verificación de validación en el
const create = async (req, res) => {  
    const user = new User(req.body)            
    try {                                       
        await user.save()
        return res.status(200).json({          
            message: "Successfully signed up!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
        }
};

// esta fn usa el vaor del parametro :userId para consultar en bd por id
const userByID = async (req, res, next, id) => {  
    try {
        let user = await User.findById(id)
        if (!user)
            return res.status(400).json({
            error: "User not found"
        })
        req.profile = user
        next()
        } catch (err) { 
            return res.status(400).json({
            error: "Could not retrieve user"
        })
    }
};

// recupera los detalles del usuario de req.profile y elimina la infor confidencial
const read = (req, res) => {  
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
};

// cdo express recibe una solicitud get en api/users ejecuta la lista de fn controlador
// devuelve una lista de todos los usuarios con formato json
const list = async (req, res) => {           
    try {                                      
        let users = await User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

// formidable le permitira al server leer el archivo en partes
// fn que acualiza al recibir ID como parametro
const update = async (req, res) => {
    try {
        let user = req.profile
        console.log(req.body)
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// cdo se recibe esta peticion lee y acutual, carga el usuario por ID y luego es ejecutada
const remove = async (req, res) => { 
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err){
        console.log(req.profile)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};


// se asegura de que el usuario actual sea realmente un educador
const isEducator = (req, res, next) => {
    const isEducator = req.profile && req.profile.educator
    if (!isEducator) {
        return res.status(403).json({
            error: "User is not an educator"
        })
    }
    next()
};

export default { create, 
                userByID, 
                read, 
                list, 
                remove, 
                update,
                isEducator}


{/** 
// busacaremos la foto en el metodo controlador,si la encuentra la envia la resp en la ruta de la foto,sino con next muestra una predet
const photo = (req, res, next) => {
    if(req.profile.photo.data){
        res.set("Content-Type", req.profile.photo.contentType)
        return res.send(req.profile.photo.data)
    }
    next()
};


// La foto predeterminada se recupera y se envía desde el sistema de archivos del servidor
const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd()+profileImage)
};

// seguidores
const addFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, {$push: {following: req.body.followId}})
        next()
    }catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

// seguidos
const addFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(req.body.followId,
                            {$push: {followers: req.body.userId}},
                            {new: true})
                            .populate('following', '_id name')
                            .populate('followers', '_id name')
                            .exec()
            result.hashed_password = undefined
            result.salt = undefined
            res.json(result)
    }catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

// dejar de seguir
const removeFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId,
            {$pull: {following: req.body.unfollowId}})
            next()
    }catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

// eliminar seguidor
const removeFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(req.body.unfollowId,
                            {$pull: {followers: req.body.userId}},
                            {new: true})
                            .populate('following', '_id name')
                            .populate('followers', '_id name')
                            .exec()
        result.hashed_password = undefined
        result.salt = undefined
        res.json(result)
    }catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

// consulta la coleccion de usuarios bd p/encontrar la lista de usuarios que no estan en la lista de seguidores del usuario actual
const findPeople = async (req, res) => {
    let following = req.profile.following
    following.push(req.profile._id)
    try {
        let users = await User.find({ _id:{ $nin : following }}).select('name')
        res.json(users)
    }catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
} */}

        
