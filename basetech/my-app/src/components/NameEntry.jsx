import React from 'react';

class NameEntry extends React.Component {

  render = () => {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.props.handleSubmit}>
          <label>User Name</label>
          <br />
          <input
            type="text"
            value={this.props.user_id}
            onChange={this.props.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    )
  };
}

export default NameEntry;