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
import NewCourse from './course/NewCourse';
import MyCourses  from './course/MyCourses';
import EditCourse from './course/EditCourse';
import Course from './course/Course';


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
                    <Route path="/course/:courseId" component={Course}/>


                    <PrivateRoute path="/teach/course/new" component={NewCourse}/>
                    <PrivateRoute path="/teach/course/edit/:courseId" component={EditCourse}/>
                    <PrivateRoute path="/teach/courses" component={MyCourses}/>

            </Switch>   
        </div>
    )
}


export default MainRouter;

//switch solo renderiza la primera ruta que coincide