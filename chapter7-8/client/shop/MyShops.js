import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import auth from './../auth/auth-helper'
import {listByOwner} from './api-shop.js'
import {Redirect, Link} from 'react-router-dom'
import DeleteShop from './DeleteShop'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    }),
    title: {
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px` ,
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
    },
    addButton:{
        float:'right'
    },
    leftIcon: {
        marginRight: "8px"
    }
}))

export default function MyShops() {

    const removeShop = (shop) => {
        const updatedShops = [...shops]
        const index = updatedShops.indexOf(shop)
        updatedShops.splice(index, 1)
        setShops(updatedShops)
    }
    
    if (redirectToSignin) {
        return <Redirect to='/signin'/>
    }

    return (
        <div>
            <Paper>
                <ListItemSecondaryAction>
                    <Link to={"/seller/shop/edit/" + shop._id}>
                        <IconButton aria-label="Edit" color="primary">
                            <Edit/>
                        </IconButton>
                    </Link>
                    <DeleteShop shop={shop} onRemove={removeShop}/>
                </ListItemSecondaryAction>
            </Paper>
        </div>)
}