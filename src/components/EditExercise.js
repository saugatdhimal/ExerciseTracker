import React, { useState, useEffect } from 'react'
import './EditExercise.css'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom'
import { TextField, Button, Typography, Paper, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {  
        padding: theme.spacing(1),
    },    
    typo: {
        margin: theme.spacing(1),
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
        margin: theme.spacing(1),
        height: '30px',
        textAlign: 'center'
    },
    button: {
        width: '45%',
        margin: theme.spacing(1),
    }
}))


function EditExercise() {
    const { id } = useParams()
    const [ username, setUsername ]  = useState('')
    const [ description, setDescription ]  = useState('')
    const [ duration, setDuration ]  = useState('')
    const [ date, setDate ]  = useState(new Date())
    const [ users, setUsers] = useState([])
    const [ response, setResponse ] = useState('')
    const classes = useStyles()

    useEffect(() => {

        axios.get('https://exercise-tracker77.herokuapp.com/user/')
             .then( (res) => {
                 if(res.data.length > 0){
                     setUsers(res.data.map(user => user.username))
                     
                 }
             })

        axios.get(`https://exercise-tracker77.herokuapp.com/exercise/${id}`)
             .then( (res) => {
                     setUsername(res.data.username)
                     setDescription(res.data.description)
                     setDuration(res.data.duration)
                     setDate(new Date(res.data.date))
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
        axios.post(`https://exercise-tracker77.herokuapp.com/exercise/update/${id}`,exercise)
             .then(res => setResponse(res.data))
    }

    const deleteExercise = () => {
        axios.delete(`https://exercise-tracker77.herokuapp.com/exercise/${id}`)
             .then(res => console.log(res.data));
        window.location = '/'
    }
    return (
        <div className="editExercise">
            <Paper className="createExercise__paper">
                <form
                className="editExercise__form"
                noValidate 
                autoComplete="off"
                onSubmit={handleSubmit}
                >
                    <Typography 
                    className={classes.typo}
                    variant="h5">EditExercise</Typography>
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
                    className={classes.text}
                    value={description}
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                    ></TextField>
                    <TextField
                    className={classes.text}
                    value={duration}
                    variant="outlined"
                    onChange={(e) => setDuration(e.target.value)}
                    ></TextField>
                    <DatePicker 
                    className={classes.date}
                    value={date}
                    selected={date} 
                    onChange={date => setDate(date)}/>
                    <Button
                    className={classes.button}
                    type="submit"
                    color="secondary"
                    size="medium"
                    variant="contained" 
                    >Edit</Button>
                    <Button
                    className={classes.button}
                    color="primary"
                    size="medium"
                    variant="contained" 
                    onClick={deleteExercise}
                    >Delete</Button>
                    <p>{response}</p>
                </form>
            </Paper>
        </div>
    )
}

export default EditExercise
