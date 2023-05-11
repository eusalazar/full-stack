import Product from '../models/product.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import defaultImage from './../../client/assets/images/default.png'


// crea un nuevo producto, primero verifica q el usuario actual sea propietario de la tienda
const create = (req, res,next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                message: "Image could not be uploaded"
            })
        }
        let product = new Product(fields)
        product.shop= req.shop
        if(files.image){
            product.image.data = fs.readFileSync(files.image.path)
            product.image.contentType = files.image.type
        }
        try {
            let result = await product.save()
            res.json(result)
        } catch(err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}

// el parametro :productId en la ruta URL de la ruta llamara al controlador productId q recuperara el producto de la BD y lo adjuntara al objeto
const productByID = async (req, res, next, id) => {
    try {
        let product = await Product.findById(id).populate('shop', '_id name').exec()
        if (!product) 
            return res.status(400).json({
                error: 'Product not found'
            })
            req.product = product
            next()
    } catch(err) {
        return res.status(400).json({    
        })
    }
}

const read = (req, res) => {
    req.product.image = undefined
    return res.json(req.product)
}

const listByShop = async (req, res) => {
    try {
        let products = await Product.find({shop: req.shop._id}).populate('shop', '_id name').select('-image')
        res.json(products)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// encuentra los productos en la BD y ordenar la lista de productos con el campo de fecha creado desde el mas antiaguo al mas nuevo
const listLatest = async (req, res) => {
    try {
        let products = await Product.find({}).sort('-created').limit(5).populate('shop', '_id name').exec()
        res.json(products)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// una vez q se recupera el producto se invoca a este metodo consulta la coleccion Product en la BD p encontrar otros productos con la misma categoria q el producto dado
const listRelated = async (req, res) => {
    try{
        let products = await Product.find({ "_id": { "$ne": req.product }, "category": req.product.category}).limit(5).populate('shop', '_id name').exec()
        res.json(products)
    } catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// consulta la coleccion Products con una llamada distinta contra el campo de categoria
const listCategories = async (req, res) => {
    try{
        let products = await Product.distinct('category',{})
        res.json(products)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// procesara los parametros de consulta , luego busca los productos en la categoria
const list = async (req, res) => {
    const query = {}
    if(req.query.search)
        query.name = {'$regex': req.query.search, '$options': "i"}
    if(req.query.category && req.query.category != 'All')
        query.category =  req.query.category
    try {
        let products = await Product.find(query).populate('shop', '_id name').select('-image').exec()
        res.json(products)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default { create,
                listByShop,
                listLatest,
                productByID,
                listRelated,
                read,
                listCategories,
                list
                }