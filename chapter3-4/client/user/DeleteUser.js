import React, {useState} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from './../auth/auth-helper'
import {remove} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'

export default function DeleteUser(props) {  //en las props recibe el userId del comp PERFIL 
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false) //evita q se renderice primero

    const jwt = auth.isAuthenticated()
    //cartel de eliminar
    const clickButton = () => {  
        setOpen(true)
    }

//tiene acceso al id xq lo pasamos com props desde Profil, llamamos al metodo remove fetch junto con JWJ desp de confirmar la eliminacion
    const deleteAccount = () => { 
        remove({
            userId: props.userId
        }, {t: jwt.token}).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                auth.clearJWT(() => console.log('deleted'))
                setRedirect(true)
            }
        })
    };
    
    //para cancelar la elimin
    const handleRequestClose = () => { 
        setOpen(false)
    }
    //luego eliminar un usuario exitosamente este componente nos redirige al inicio
    if (redirect) {
        return <Redirect to='/'/>
    }

    return (<span>
        <IconButton aria-label="Delete"
        onClick={clickButton} color="secondary">
            <DeleteIcon/>
        </IconButton>

        <Dialog open={open} onClose={handleRequestClose}>
            <DialogTitle>{"Delete Account"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Confirm to delete your account.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleRequestClose} color="primary">
                    cancel
                </Button>
                <Button onClick={deleteAccount} color="secondary" autoFocus="autoFocus">
                    confirm
                </Button>
            </DialogActions>
        </Dialog>
    </span>)
};
DeleteUser.propTypes = {
    userId: PropTypes.string.isRequired
}