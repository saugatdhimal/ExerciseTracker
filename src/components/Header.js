import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <div className="header">
            <nav>
            <ul>
                <li>
                    <Link to="/" style={{textDecoration:'none',color: 'white'}}>ExerciseList</Link>
                </li>
                {/* <li>
                    <Link to="/edit/:id" style={{textDecoration:'none',color: 'white'}}>EditExercise</Link>
                </li> */}
                <li>
                    <Link to="/create" style={{textDecoration:'none',color: 'white'}}>CreateExercise</Link>
                </li>
                <li>
                    <Link to="/user" style={{textDecoration:'none',color: 'white'}}>CreateUser</Link>
                </li>
                
            </ul>
            </nav>
        </div>
    )
}

export default Header
