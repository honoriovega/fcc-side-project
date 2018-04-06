import React, { Component } from 'react';

class StudentRow extends Component {



  render() {
    return(

      // `User "${searchTerm}" not found`
      <tr>
        <td>{this.props.name == '' ? <i>Name not available</i> : this.props.name}</td>
        <td><a href={`https://www.freecodecamp.org/${this.props.username}`} target="_blank">{this.props.username}</a></td>
        <td><img src={this.props.profileImage}></img></td>
        <td>{this.props.completedChallenges}</td>
        <td><button onClick={ () => {this.props.removeStudent(this.props.studentIndex)} }>Remove</button></td>
      </tr>
    );
  }
}

export default StudentRow;


