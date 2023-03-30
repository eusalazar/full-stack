import React from 'react';
import {Route, Switch, Link} from 'react-router-dom'
import Users from './user/Users';
import Home from './core/Menu'; 
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Profile from './user/Profile';
import PrivateRoute from './auth/PrivateRoute';
import EditProfile from './user/EditProfile';
import Menu from './core/Menu';


const MainRouter = () => {
    return (
        <div>
            <Menu/>   
            <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/signin" component={Signin}/>
                    <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
                    <Route path="/user/:userId" component={Profile}/>
            </Switch>   
        </div>
    )
}


export default MainRouter;

//switch solo renderiza la primera ruta que coincide