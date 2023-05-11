import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import request from 'request'
import config from './../../config/config'
import stripe from 'stripe'


// garantiza que el acutal usuario sea un vendedor
const isSeller = (req, res, next) => {
    const isSeller = req.profile && req.profile.seller
    if (!isSeller) {
        return res.status(403).json({
            error: "User is not a seller"
        })
    }
    next()
}