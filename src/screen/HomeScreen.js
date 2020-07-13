import React from 'react';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.setState({
        time: new Date()
      }),1000
    );
  }

  render() {
    return (
      <div className="homeScreenStyle">
        <h1>Hello, _____ ! </h1>
        <h2 className="buttonContainer">{this.state.time.toLocaleTimeString()}</h2>
        <h3 className="buttomText">- let's plan & meet -</h3>
      </div>
    );
  }
}

export default HomeScreen;