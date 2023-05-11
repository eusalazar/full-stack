import express from 'express'
//import userCtrl from '../controllers/user.controller'
//import authCtrl from '../controllers/auth.controller'
//import shopCtrl from '../controllers/shop.controller'

const router = express.Router()
// invocara el metodo de controlador de lista
router.route('/api/shops')
    .get(shopCtrl.list)

// consultara la coleccion shop con un ID
router.route('/api/shop/:shopId')
    .get(shopCtrl.read)

// creacion de nuevas tiendas
router.route('/api/shops/by/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isSeller, shopCtrl.create)

router.route('/api/shops/by/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isSeller, shopCtrl.create)
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, shopCtrl.listByOwner)

router.route('/api/shops/:shopId')
    .put(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.update)
    .delete(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.remove)

    router.param('shopId', shopCtrl.shopByID)
    router.param('userId', userCtrl.userByID)

    export default router