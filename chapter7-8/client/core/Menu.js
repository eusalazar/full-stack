import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'
import CartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import cart from './../cart/cart-helper'

const isActive = (history, path) => {
    if (history.location.pathname == path)
        return {color: '#bef67a'}
    else
        return {color: '#ffffff'}
}
const isPartActive = (history, path) => {
    if (history.location.pathname.includes(path))
        return {color: '#bef67a'}
    else
        return {color: '#ffffff'}
}

const Menu = withRouter (({history}) => {
    <AppBar>
        <Toolbar>
            {
                auth.isAuthenticated() && (<span>
                    {auth.isAuthenticated().user.seller && (<Link to="/seller/shops"><Button style={isPartActive(history, "/seller/")}>My Shops</Button></Link>)}
                </span>)
            }
        </Toolbar>
    </AppBar>
})