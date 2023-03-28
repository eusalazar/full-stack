import React from 'react';
import {Route, Switch, Link} from 'react-router-dom'
import Users from './user/Users';
import Home from './core/Home'; 
import Signup from './user/Signup';
import Signin from './auth/Signin';


const MainRouter = () => {
    return (
        <div>   
            <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/users" component={Users}/>
                    <Link to="/users">Users</Link>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/signin" component={Signin}/>
            </Switch>   
        </div>
    )
}


export default MainRouter;

//switch solo renderiza la primera ruta que coincide