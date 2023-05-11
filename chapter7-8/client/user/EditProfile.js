import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle
    },
    error: {
        verticalAlign: 'middle'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    subheading: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    }
}))


export default function EditProfile({ match }){
    const classes = useStyles()

    // cdo se envie el formulario p editar los detalles del perfil, el vendedor tambien se agrega a los detalles enviados en la actualiz del vendedor
    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
            seller: values.seller || undefined
        }
        update({
            userId: match.params.userId
        }, {
            t: jwt.token
        }, user).then((data) => {
            if (data && data.error) {
                setValues({...values, error: data.error})
            } else {
                auth.updateUser(data, () => {
                    setValues({...values, userId: data._id, redirectToProfile: true})
                })
            }
        })
    }

    // cualquier cambio en el estado de vendedor sera llamado por este metodo
    const handleCheck = (event, checked) => {
        setValues({...values, 'seller': checked})
    }

    return (
        <Card>
            <Typography variant="subtitle1" className={classes.subheading}>
                Seller Account
            </Typography>
            <FormControlLabel
                control={
                    <Switch classes={{
                                checked: classes.checked,
                                bar: classes.bar,
                            }}
                        checked={values.seller}
                        onChange={handleCheck}
                    />}
                label={values.seller? 'Active' : 'Inactive'}
            />
        </Card>
    )
}