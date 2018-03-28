
import React, { Component } from 'react';
import StudentRow from './StudentRow';

class StudentTable extends Component {

  populateStudents() {
    let rows = [];

    this.props.students.forEach((student, index) => {
      rows.push((
        <StudentRow key={index}
            name={student.name}
            username={student.username}
            completedChallenges={student.completedChallenges}
            profileImage={student.profileImage}
            remove={student.remove}
        />
      ));
    });

    return rows;
  }

  showTable() {
    return (

      <table className="students table text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th></th>
              <th>Completed Challenges</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.populateStudents()}
          </tbody>
        </table>
      );
  }

  render() {
    return (
      <div className="StudentTable">
        {this.showTable()}
      </div>
    );
  }
}

export default StudentTable;