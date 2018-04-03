
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


  displayStudentCount() {
    const studentCount = this.props.students.length;
    const msg = `Displaying ${studentCount} student${studentCount == 1 ? '' : 's'}`
    return(<h2>{msg}</h2>);

  }

  showTable() {
    return (

    <div>
      {this.displayStudentCount()}
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

        </div>
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