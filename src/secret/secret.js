import React, { Component } from 'react';
import axios from 'axios';

class Secret extends Component {
  constructor() {
    super()
  }

  // componentDidMount() {
  //   axios.post('/api/register', {
  //     email: 'abcd@example.com',
  //     password: 'Flintstone'
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  render() {
    
    return (
      <p>Reached to Secret component</p>
    );
  }
}

export default Secret;
