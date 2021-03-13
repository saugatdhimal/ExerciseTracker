
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import CreateExercise from './components/CreateExercise'
import ExerciseList from './components/ExerciseList'
import EditExercise from './components/EditExercise'
import CreateUser from './components/CreateUser'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/user">
          <CreateUser />
        </Route>
        <Route path="/edit/:id">
          <EditExercise />
        </Route>
        <Route path="/create">
          <CreateExercise />
        </Route>
        <Route path="/">
          <ExerciseList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
