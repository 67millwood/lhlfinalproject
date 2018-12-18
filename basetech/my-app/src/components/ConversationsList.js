// src/components/ConversationsList.js

import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import RoleSelector from './RoleSelector';
import NameEntry from './NameEntry';
import Cable from './Cable';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class ConversationsList extends React.Component {

  state = {
    role: null,
    user_id: '',
    conversations: [],
    activeConversation: null
  };

  componentDidMount = () => {
    console.log("yes")
    fetch(`${API_ROOT}/conversations`)
      .then(res => res.json())
      .then(conversations => this.setState({ conversations }));
  };

  handleClick = id => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  teacherSwap = () => {
    this.setState({user_id: 'teacher'})
  };

  changeToTeacher = () => {
    this.setState({role: 'teacher'});
  }

  changeToStudent = () => {
    this.setState({role: 'student'});
  }

  mapConversations = (conversations, handleClick) => {
    return conversations.map(conversation => {
      if (this.state.role === 'teacher') {
        return (
          <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
            {conversation.title}
          </li>
        );
      }
      else if (conversation.user_id) {
        if (this.state.user_id === conversation.user_id) {
          return (
            <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
              {conversation.title}
            </li>
          );
        }
      }
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  };

// these two for dealing with name submission
  handleChange = e => {
    this.setState({ user_id: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    cookies.set('user', this.state.user_id, { path: '/'})
    this.setState({user_id: ''})
  };

  randomNumber = () => {
    return (Math.random().toString(36).substring(7))
  };

  render = () => {
    if (!this.state.role) {
      return (
        <RoleSelector
          changeToStudent={this.changeToStudent}
          changeToTeacher={this.changeToTeacher}
        />
      )
    }
    if (!cookies.get('user') && this.state.role === 'student') {
      return (
        <NameEntry
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          user_id={this.state.user_id}
          // role={this.state.role}
        />
      )
    } else if (!cookies.get('user') && this.state.role === 'teacher') {
      return ( <div>
        <h2> Please write {this.randomNumber()} on the board! </h2>
        <br/>
        <NameEntry
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          user_id={this.state.user_id}
          // role={this.state.role}
        />
        </div>
      )
    } else {
    const { conversations, activeConversation } = this.state;
    return (
      <div className="conversationsList">
        <ActionCable
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <h2>Conversations</h2>
        Hello, {cookies.get('user')} <br/>
        <button onClick={this.teacherSwap}> The teacher button! </button>
        <ul>{this.mapConversations(conversations, this.handleClick)}</ul>
        <NewConversationForm user_id={cookies.get('user')}/>
        {activeConversation ? (
          <MessagesArea
            conversation={findActiveConversation(
              conversations,
              activeConversation
            )}
          />
        ) : null}
      </div>
    );
  }
  };
}

export default ConversationsList;

/// helpers

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};
