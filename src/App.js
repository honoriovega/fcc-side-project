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
  }

  addStudent(searchTerm) {

    fetch('https://fcc-profile-scraper.herokuapp.com/user/' + searchTerm)
          .then(response => {
            if (response.ok) {
              this.setState({errors : ''})
              return response.json();
            } else {
              this.setState({errors : `User "${searchTerm}" not found`})
              console.log(response);

            }
          })
          .then(data => {

            var temp = this.state.students;
          // build up the student object
            var newUser = {
              'username' : searchTerm,
              'name' : data['name'],
              'profileImage' : data['profileImage'],
              'completedChallenges' : data['completedChallenges'].length,

            };

            temp.push(newUser);

            newUser['remove'] =  () =>{
                      var index = this.state.students.indexOf(newUser);
                      var temp = [...this.state.students];
                      temp.splice(index, 1);
                      this.setState({students : temp});

            }


             this.setState({students : temp});
          });
  }

  render() {
    return (
      <div className="App">
        <center><h1>FreeCodeCamp Student Search</h1></center>
        <Form handleTheChange={this.addStudent.bind(this)}/>
        <p>{this.state.errors == '' ? '' : this.state.errors} </p>
         <StudentTable students={this.state.students}/>

      </div>
     );
  }

}

export default App;