import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StudentRow from './StudentRow';
import StudentTable from './StudentTable';
import Form from './Form';


class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
                 students: [],
                 errors : '',
                };

    this.addStudent = this.addStudent.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
  }


  removeStudent(index) {
    this.setState({errors : ''})
    let temp = [...this.state.students];
    temp.splice(index, 1);
    this.setState({students : temp});

  }

  addStudent(searchTerm) {

    for(let i = 0; i < this.state.students.length; i++) {
      if(this.state.students[i].username === searchTerm) {
        this.setState({errors : searchTerm + ' already exists in table'})
        return;
      }
    }

    this.setState({errors : ''})

    fetch('https://fcc-profile-scraper.herokuapp.com/user/' + searchTerm)
          .then(response => {
            if (response.ok) {
              this.setState({errors : ''})
              return response.json();
            } else {
              this.setState({errors : `User "${searchTerm}" not found`})
            throw new Error('user not found');
            }
          })
          .then(data => {

          // build up the student object
            const newUser = {
              'username' : searchTerm,
              'name' : data['name'],
              'profileImage' : data['profileImage'],
              'completedChallenges' : data['completedChallenges'].length,

            };

             this.setState({students : [...this.state.students, newUser]});
          })
          .catch((error) => {
              console.log(error)
          });
  }

  render() {
    return (
      <div className="App">
        <center><h1>FreeCodeCamp Student Search</h1></center>
        <Form handleTheChange={this.addStudent.bind(this)}/>
        <p>{this.state.errors == '' ? '' : this.state.errors} </p>
         <StudentTable students={this.state.students}
                      remove={this.removeStudent.bind(this)}/>

      </div>
     );
  }

}

export default App;