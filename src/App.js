import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Home from './components/home';
import AdminHome from './components/admin';
import CompanyHome from './components/companyHome';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' component={SignIn} />
          <Route path='/signUp' component={SignUp} />
          <Route path='/home' component={Home} />
          <Route path='/admin' component={AdminHome} />
          <Route path='/companyHome' component={CompanyHome} />          
        </div>
      </Router>
    );
  }
}

export default App;
