import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth-helper';

// nos permite declarar rutas protegidas p/la interfaz para restringir el acceso a la vista en fn de auth del usuario
const PrivateRoute = ({ component: Component, ...rest }) => (  
    <Route {...rest} render={props => (                        
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
