import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import auth from './../auth/auth-helper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import {create} from './api-shop.js'
import {Link, Redirect} from 'react-router-dom'
import { func } from 'prop-types'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle,
        fontSize: '1em'
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
    input: {
        display: 'none'
    },
    filename:{
        marginLeft:'10px'
    }
}))

export default function NewShop() {
    const classes = useStyles()
    const [values, setValues] = useState({
        name: '',
        description: '',
        image: '',
        redirect: false,
        error: ''
    })
    const jwt = auth.isAuthenticated()

    // los cambios en el formulario se rastrearan con este metodo
    const handleChange = name => event => {
        const value = name === 'image'
        ? event.target.files[0]
        : event.target.value
    setValues({...values, [name]: value })
    }
    // boton de envio del formulario cuando hacemos click, tomara los valores de entrada y completa shopData q es un objeto de formData, 
    // entonces la busqueda de creacion llama al metodo p/creaer una nueva tienda e el back, en creacion exitosa el usuario es <Redirect/>
    const clickSubmit = () => {
        let shopData = new FormData()
        values.name && shopData.append('name', values.name)
        values.description && shopData.append('description', values.description)
        values.image && shopData.append('image', values.image)
        create({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, shopData).then((data) => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, error: '', redirect: true})
            }
        })
    }

    if (values.redirect) {
        return (<Redirect to={'/seller/shops'}/>)
    }
    
    return (
        <div>
            <Card>
                <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file"/>
                <label htmlFor="icon-button-file">
                    <Button variant="contained" color="secondary" component="span">
                        Upload Logo
                        <FileUpload/>
                    </Button>
                </label> <span className={classes.filename}>{values.image ? values.image.name : ''}</span><br/>
                <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
                <TextField
                    id="multiline-flexible"
                    label="Description"
                    multiline
                    rows="2"
                    value={values.description}
                    onChange={handleChange('description')}
                    className={classes.textField}
                    margin="normal"
                /><br/>
            </Card>
        </div>
    )
}