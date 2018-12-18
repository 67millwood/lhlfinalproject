import React from 'react';

class RoleSelector extends React.Component {


  render = () => {
    return (
      <div className="newConversationForm">
        <button onClick={this.props.changeToTeacher}> Teacher </button>
          <br/>
        <button onClick={this.props.changeToStudent}> Student </button>
      </div>
    );
  };
}

export default RoleSelector;