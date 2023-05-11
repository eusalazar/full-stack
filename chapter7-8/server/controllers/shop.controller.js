import Shop from '../models/shop.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import defaultImage from './../../client/assets/images/default.png'

const create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(400).json({
                message: "Image could not be uploaded"
            })
        }
        let shop = new Shop(fields)
        shop.owner= req.profile
        if (files.image) {
            shop.image.data = fs.readFileSync(files.image.path)
            shop.image.contentType = files.image.type
        }
        try {
            let result = await shop.save()
            res.status(200).json(result)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}

// el parametro :shopId en la URL de la ruta invocara este metodo p recuperar la tienda de la bd y lo adjunta al objeto de solicitud
const shopById = async (req, res, next, id) => {
    try {
        let shop = await Shop.findById(id).populate('owner', '_id name').exec()
        if (!shop)
            return res.status('400').json({
                error: "Shop not found"
            })
        req.shop = shop
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve shop"
        })
    }
}

// si el metodo isOwnwer confirma q el usuario que inicio sesion es el propietario de la tienda, entonces el metodo de eliminacion elimina la tienda especificada
const remove = async (req, res) => {
    try {
        let shop = req.shop
        let deletedShop = shop.remove()
        res.json(deletedShop)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


// consultara la coleccion de tiendas en la bd para devolver todas las tiendas
const list = async (req, res) => {
    try {
        let shops = await Shop.find()
        res.json(shops)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// primero garantiza que el usuario solit haya iniciado sesion y este autorizado, luego invoca a este metodo p consultar la coleccion Shop en la bd
const listByOwner = async (req, res) => {
    try {
        let shops = await Shop.find({owner: req.profile._id}).populate('owner', '_id name')
        res.json(shops)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const read = (req, res) => {
    req.shop.image = undefined
    return res.json(req.shop)
}

// analiza los metodos del formulario y actuliza la tienda en la BD
const update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(400).json({
                message: "Photo could not be uploaded"
            })
        }
        let shop = req.shop
        shop = extend(shop, fields)
        shop.updated = Date.now()
        if(files.image){
            shop.image.data = fs.readFileSync(files.image.path)
            shop.image.contentType = files.image.type
        }
        try {
            let result = await shop.save()
            res.json(result)
        } catch(err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}

// una ruta PUT recibida en la ruta primera verifica el usuario q inicio sesion sea el propietario de la tienda asociada con el shopld proporcionada en la URL
const isOwner = (req, res, next) => {
    const isOwner = req.shop && req.auth && req.shop.owner._id == req.auth._id
    if (!isOwner) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}


export default { create,               
                list,
                listByOwner,
                shopById,
                read,
                isOwner,
                update}