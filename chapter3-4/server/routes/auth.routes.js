import express from "express";
import authCtrl from "../controllers/auth.controller"

const router = express.Router()

router.route('/auth/signin')  //The API endpoint to sign-in a user is declared in the following route.
    .post(authCtrl.signin)
router.route('/auth/signout')  //The API endpoint to sign-out a user is declared in the following route.
    .get(authCtrl.signout)

export default router