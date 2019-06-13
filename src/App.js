import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './home/home';
import Secret from './secret/secret';
// import axios from 'axios';
import './App.css';

class App extends Component {
  
  
  render() {
    // axios.get('/api/hi')
    // .then(res => {
    //     console.log(res);
    // });
    
    return (
      <div>
        <BrowserRouter>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/secret">Secret</Link></li>
          </ul>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/secret" component={Secret} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
