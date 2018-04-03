import React, { Component } from 'react';

class StudentRow extends Component {


  constructor(props) {
        super(props);
        this.removeStudent = this.removeStudent.bind(this);
  }

  removeStudent() {
    this.props.removeStudent(this.props.studentIndex);
  }

  render() {
    return(
      <tr>
        <td>{this.props.name == '' ? <i>Name not available</i> : this.props.name}</td>
        <td>{this.props.username}</td>
        <td><img src={this.props.profileImage}></img></td>
        <td>{this.props.completedChallenges}</td>
        <td><button onClick={this.removeStudent}>Remove</button></td>
      </tr>
    );
  }
}

export default StudentRow;


