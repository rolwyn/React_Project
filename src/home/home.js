import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    }
  }

  componentDidMount() {
    axios.get('/api/home')
    .then(response => 
      this.setState({message: response.data})
    )
  }

  render() {
    return (
      <React.Fragment>
        <h1>Home</h1>
        <p>{this.state.message}</p>
      </React.Fragment>
    );
  }
}

export default Home;
