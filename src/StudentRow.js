import React, { Component } from 'react';

class StudentRow extends Component {

  handleClicker() {
    alert('thou has been clicked');
  }

  render() {
    return(
      <tr>
        <td>{this.props.name == '' ? <i>Name not available</i> : this.props.name}</td>
        <td>{this.props.username}</td>
        <td><img src={this.props.profileImage}></img></td>
        <td>{this.props.completedChallenges}</td>
        <td><button onClick={this.props.remove}>Remove</button></td>
      </tr>
    );
  }
}

export default StudentRow;


