import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Products from '../ProductsList'
import './App.css'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Products} />
    </Switch>
  </Router>
)

export default App
