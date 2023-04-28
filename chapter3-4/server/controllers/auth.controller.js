import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import config from './../../config/config'
import expressJwt from 'express-jwt'



    const signin = async (req, res) => {
        try {
            let user = await User.findOne({
                "email": req.body.email
            })
            if(!user)
                return res.status(401).json({
                    error: "User not found"
                })
        
            if(!user.authenticate(req.body.password)) {
                return res.status(401).send({
                    error: "Email and password don't match."
                })
            }
        
    const token = jwt.sign({
        _id: user._id
            }, config.jwtSecret)
        
        res.cookie("t", token, {
            expire: new Date() + 9999
        })
            return res.json({
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    educator: user.educator
                    }
                })
        
            } catch (err) {
                return res.status(401).json({
                    error: "Could not sign in"
            })
        
            }
        }


    const signout = (req, res) =>  {
        res.clearCookie("t")
        return res.status(200).json({
            message: "signed out"
        })
    }

    //uses express-jwt to verify that the incoming request has a valid JWT in 
    //the Authorization header. If the token is valid, it appends the verified user's ID in an auth' key to the request object;
    const requireSignin = expressJwt({
        secret: config.jwtSecret,
        userProperty: 'auth'
    })

    const hasAuthorization = (req, res, next) => {  //we also want to make sure the requesting user is only updating or
        const authorized = req.profile && req.auth && req.profile._id == req.auth._id  //deleting their own user information.
        if (!(authorized)) {
            return res.status(403).json({  //We will add the function to
                error: "User is not authorized" //routes that require both authentication and authorization.
            })
        }
        next()
    }

    export default { signin,
                    signout, 
                    requireSignin, 
                    hasAuthorization }