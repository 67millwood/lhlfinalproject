import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class QuestionArea extends React.Component {
  constructor(props) {
    super(props)
    this.websocket = ActionCable.createConsumer(API_ROOT)
    this.state = {
      question: null,
      answer: null
    }
  }

    componentWillMount() {
    this.createSocket();
  }

  testme = () => {
    this.chats.sendData(this.state.question);
  }

  createSocket() {
    this.chats = this.websocket.subscriptions.create({
      channel: 'conversation'
    },
    {
      connected: () => {},
      received: (data) => {
        this.setState({question: data.data.qtext,
          answer: [data.data.ans1, data.data.ans2, data.data.ans3, data.data.ans4]})
      },
      sendData: function(somedata) {
        this.perform('send_data', {data: somedata })
      }
    });
  }




export default QuestionArea;