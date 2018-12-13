import React, { Component } from 'react';
import ActionCable from 'actioncable';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  conponentDidMount() {
    const websocket = ActionCable.createConsumer("ws://localhost:3000/websocket")
    window.socket = websocket.subscriptions.create({
      channel: 'WebNotificationsChannel'
    },
    {
      received: (data) => {
        alert(data.data)
      },
      sendData(data) {
        this.perform('send_data', {data: data })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;