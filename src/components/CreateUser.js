import React, { useState } from 'react'
import './CreateUser.css'
import axios from 'axios'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },    
    typo: {
        margin: theme.spacing(2),
    },
    text: {
        width: '100%',
        margin: theme.spacing(2)
    },
    button: {
        width: '50%',
        margin: theme.spacing(2),
    }
}))

function CreateUser() {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [response,setResponse] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            username: username
        }
        console.log(user)
        axios.post('https://exercise-tracker77.herokuapp.com/user/add',user)
             .then(res => setResponse(res.data))
             setUsername('')
    }
    return (
        <div className="createUser">
        
        <Paper className={classes.paper}>
            <form 
            className="createUser__form"
            noValidate 
            autoComplete="off"
            onSubmit={handleSubmit}
            >
                <Typography 
                className={classes.typo}
                variant="h5"
                > CreateUser</Typography>
                <TextField 
                className={classes.text}
                label="username"
                variant="outlined"
                multiline
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                ></TextField>
                <Button
                className={classes.button}
                type="submit"
                color="secondary"
                size="medium"
                variant="contained"
                >submit</Button>
                <p>{response}</p>
            </form>
        </Paper>
        </div>
    )
}

export default CreateUser
