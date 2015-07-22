import React from 'react';

import greeting from './greeting';


export default class Greeter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: this.getGreeting()
    };
  }

  getGreeting(value) {
    return greeting(value);
  }

  handleDidChange(event) {
    var value = event.target.value;
    this.setState({
      greeting: this.getGreeting(value)
    });
  }

  render() {
    return (
      <div>
        <div>{this.state.greeting}</div>
        <input type="text" onChange={this.handleDidChange.bind(this)}></input>
      </div>
    );
  }
}
