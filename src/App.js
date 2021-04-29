import React from 'react'
import './App.css'
import Alert from './components/layout/Alert'
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './components/pages/About'
import UserDetails from './components/users/UserDetails'
import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'
import NotFound from './components/pages/NotFound'

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert alert={alert} />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/userDetails/:login' component={UserDetails} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}


export default App;
