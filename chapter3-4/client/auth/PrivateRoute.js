import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth-helper';

const PrivateRoute = ({ component: Component, ...rest }) => (  //nos permite declarar rutas protegidas p/la interfaz para restringir el acceso
    <Route {...rest} render={props => (                        //a la vista en fn de auth del usuario
        auth.isAuthenticated() ? (
        <Component {...props}/>
        ) : (
        <Redirect to={{
            pathname: '/signin',
            state: { from: props.location }
        }}/>
        )
    )}/>
)

export default PrivateRoute  //consultar a daniel 
