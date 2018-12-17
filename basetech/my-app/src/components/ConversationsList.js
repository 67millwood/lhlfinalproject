// src/components/ConversationsList.js

import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

class ConversationsList extends React.Component {

  state = {
    user_id: 'Bob',
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

  mapConversations = (conversations, handleClick) => {
    return conversations.map(conversation => {
      if (this.state.user_id == 'teacher') {
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

  render = () => {
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
        <button onClick={this.teacherSwap}> The teacher button! </button>
        <ul>{this.mapConversations(conversations, this.handleClick)}</ul>
        <NewConversationForm user_id={this.state.user_id}/>
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
  };
}

export default ConversationsList;

/// helpers

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};
