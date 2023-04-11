import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction' 
import ListItemText from '@material-ui/core/ListItemText' 
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import FollowProfileButton from './../user/FollowProfileButton'
import ProfileTabs from '../user/ProfileTabs'
import {listByUser} from './../post/api-post.js'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    }),
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle
    }
    }))


// necesitamos acceder a los parametros pasado del comp Ruta (match.params.userId.)
export default function Profile({ match }) {  
    const classes = useStyles()
    const [values, setValues] = useState({
        user: {following:[], followers:[]},
        redirectToSignin: false,
        following: false
    })
    const [posts, setPosts] = useState([])
    const jwt = auth.isAuthenticated()

    // El componente Perfil debe obtener información del usuario y representar la vista con obteniendo con lectura en useEffect usando el parámetro userId
    // componente, es de match.params. Recopilará las credenciales de auth.isAuthenticated.
    useEffect(() => {
        const abortController = new AbortController() 
        const signal = abortController.signal        

        read({
            userId: match.params.userId
        }, {t: jwt.token}, signal).then((data) => {
            if (data && data.error) {
                setValues({...values, redirectToSignin: true})
            } else {
                let following = checkFollow(data)
                setValues({...values, user: data, following: following})
                loadPosts(data._id)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    },[match.params.userId])

    // verificara si el usuario q inicio sesion existe en la lista de seguidores del usuario obtenido,devuelve la coincidencia si encontro sino undefined
    const checkFollow = (user) => {
        const match = user.followers.some((follower) => {
            return follower._id == jwt.user._id
        })
        return match
    };

    //contolador de click para que el estado del perfil se pueda actualizar cdo se completa la accion de seguir o dejar de seguir
    const clickFollowButton = (callApi) => {
        callApi({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, values.user._id).then((data) => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, user: data, following: !values.following})
            }
        })
    };

    //metodo de busqueda,cargara las publicaciones req p/PostList/método loadPosts que llama al método de obtención listByUser
    const loadPosts = (user) => {
        listByUser({
            userId: user
        }, {
            t: jwt.token
        }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setPosts(data)
            }
        })
    };

    


    const photoUrl = values.user._id
        ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
        : '/api/users/defaultphoto'

    if (values.redirectToSignin) {
        return <Redirect to='/signin'/>
    }
    return(
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={photoUrl} className={classes.bigAvatar}>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={values.user.name} secondary={values.user.email}/> {
                        auth.isAuthenticated().user && auth.isAuthenticated().user._id == values.user._id 
                        ?(<ListItemSecondaryAction>
                            <Link to={"/user/edit/" + values.user._id}>
                                <IconButton aria-label="Edit" color="primary">
                                    <Edit/>
                                </IconButton>
                            </Link>
                            <DeleteUser userId={values.user._id}/>
                        </ListItemSecondaryAction>)
                        :(<FollowProfileButton following={values.following} onButtonClick={clickFollowButton}/>)
                        
                    }
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={values.user.about}/>
                </ListItem>
                <ListItem>
                <ListItemText primary={"Joined: " + (
                    new Date(values.user.created)).toDateString()}/>
                </ListItem>
            </List>
        </Paper>
    )
};