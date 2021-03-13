import React, { useState, useEffect } from 'react'
import './ExerciseList.css'
import axios from 'axios'
import { Link }from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Table,TableContainer,TableCell,TableBody,TableHead,TableRow,Paper,Button } from '@material-ui/core';

const useStyles = makeStyles({
    table: {

    },
    heading: {

    },
    button: {
    }
  });


function ExerciseList() {
    const [ exercises, setExercises] = useState([])
    const classes = useStyles()

    useEffect(() => {
            axios.get('https://exercise-tracker77.herokuapp.com/exercise/')
             .then(res => {
                 setExercises(res.data)
             })
             .catch(error => console.log(error))
    }, [])

    return (
        <div >
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.heading}>
              <TableCell align="center">USERNAME</TableCell>
              <TableCell align="center">DESCRIPTION</TableCell>
              <TableCell align="center">DURATION (mins)</TableCell>
              <TableCell align="center">DATE</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exercises.map((ex) => (
              <TableRow key={ex._id}>
                <TableCell align="center">{ex.username}</TableCell>
                <TableCell align="center">{ex.description}</TableCell>
                <TableCell align="center">{ex.duration}</TableCell>
                <TableCell align="center">{ex.date.substring(0,10)}</TableCell>
                <TableCell align="center">
                <Link to={`/edit/${ex._id}`} style={{textDecoration: 'none'}}>
                    <Button variant="contained" color="secondary">Edit</Button>
                </Link>
                </TableCell>
              </TableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    )
}

export default ExerciseList
