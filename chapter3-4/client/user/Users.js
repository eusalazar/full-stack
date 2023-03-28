import {useState, useEffect } from "react"
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import {Link} from 'react-router-dom'
import {list} from './api-user'

export default function Users() { 
    const [users, setUsers] = useState([])

    useEffect(() => {
        const abortController = new AbortController() //nos permite cancelar llamadas DOM segun sea necesario
        const signal = abortController.signal
        
        list(signal).then((data) => {
        if (data && data.error) {
            console.log(data.error)
        } else {
            setUsers(data)
        }
    })
    return function cleanup(){
        abortController.abort()
    }
    }, [])

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                All Users
            </Typography>
            <List dense>
                {users.map((item, i) => {
                    return <Link to={"/user/" + item._id} key={i}>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar>
                                    <Person/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name}/>
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <ArrowForward/>
                                </IconButton>
                            </ListItemSecondaryAction>
                            </ListItem>
                            </Link>
                    })
                }
            </List>
        </Paper>
        )
}
