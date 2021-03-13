import React, { useState, useEffect } from 'react'
import './CreateExercise.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { TextField, Button, Typography, Paper, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {  
        padding: theme.spacing(2),
    },    
    typo: {
        margin: theme.spacing(2),
    },
    select: {
        width: '100%',
        margin: theme.spacing(1)
    },
    text: {
        width: '100%',
        margin: theme.spacing(1)
    },
    date:{
        margin: theme.spacing(2),
        height: '30px',
        textAlign: 'center'
    },
    button: {
        width: '45%',
        margin: theme.spacing(1),
    }
}))

function CreateExercise() {
    const [ username, setUsername ]  = useState('')
    const [ description, setDescription ]  = useState('')
    const [ duration, setDuration ]  = useState(0)
    const [ date, setDate ]  = useState(new Date())
    const [ users, setUsers] = useState([])
    const [ response, setResponse ] = useState('')
    const classes = useStyles()

    useEffect(() => {
        axios.get('https://exercise-tracker77.herokuapp.com/user/')
             .then( (res) => {
                 if(res.data.length > 0){
                     setUsers(res.data.map(user => user.username))
                     setUsername(res.data[0].username)
                 }
             })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }
        console.log(exercise)
        axios.post('https://exercise-tracker77.herokuapp.com/exercise/add',exercise)
             .then(res => setResponse(res.data))
    }
    return (
        <div className="createExercise">
            <Paper className="createExercise__paper">
                <form
                className="createExercise__form"
                noValidate 
                autoComplete="off"
                onSubmit={handleSubmit}
                >
                    <Typography 
                    className={classes.typo}
                    variant="h5">CreateExercise</Typography>
                    <Select 
                    className={classes.select}
                    variant="outlined"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}>
                    {users.map((user) => {
                        return <MenuItem key={user} value={user}>
                              {user}
                              </MenuItem>
                    })}
                    </Select>
                    <TextField
                    label="Description"
                    className={classes.text}
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                    ></TextField>
                    <TextField
                    label="Duration(min)"
                    className={classes.text}
                    variant="outlined"
                    onChange={(e) => setDuration(e.target.value)}
                    ></TextField>
                    <DatePicker 
                    className={classes.date}
                    selected={date} 
                    onChange={date => setDate(date)}/>
                    <Button
                    className={classes.button}
                    type="submit"
                    color="secondary"
                    size="medium"
                    variant="contained" 
                    >Submit</Button>
                    <p>{response}</p>
                </form>
            </Paper>
        </div>
    )
}

export default CreateExercise
