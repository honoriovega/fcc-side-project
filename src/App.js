import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StudentRow from './StudentRow';
import StudentTable from './StudentTable';


class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
                 students: [],
                 errors : '',
                 searchTerm : '',
                };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

   handleSubmit(event) {

    let username = this.state.searchTerm.trim()
    fetch('https://fcc-profile-scraper.herokuapp.com/user/' + username)
      .then(response => {
        if (response.ok) {
          this.setState({errors : ''})
          return response.json();
        } else {
          this.setState({errors : `User "${username}" not found`})
          console.log(response);

        }
      })
      .then(data => {

        var temp = this.state.students;
      // build up the student object
        var newUser = {
          'username' : this.state.searchTerm.trim(),
          'name' : data['name'],
          'profileImage' : data['profileImage'],
          'completedChallenges' : data['completedChallenges'].length,

        };

        temp.push(newUser);

        newUser['remove'] =  ()=>{
                  var index = this.state.students.indexOf(newUser);
                  var temp = [...this.state.students];
                  temp.splice(index, 1);
                  this.setState({students : temp});

        }


         this.setState({students : temp});
      });

    event.preventDefault(); // prevent page from reloading
  }

   handleSearchChange(event) {
    this.setState({searchTerm : event.target.value});
  }

  displayStudentCount() {
    const studentCount = this.state.students.length;
    const msg = `Displaying ${studentCount} student${studentCount == 1 ? '' : 's'}`
    return(<h2>{msg}</h2>);

  }

  render() {
    return (
      <div className="App">
        <center><h1>FreeCodeCamp Student Search</h1></center>

        <form onSubmit={this.handleSubmit}>
          <label>
          Name:
          <input type="text" value={this.state.searchTerm}
                      onChange={this.handleSearchChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

      <p>{this.state.errors == '' ? '' : this.state.errors} </p>

      {this.displayStudentCount()}
      <StudentTable students={this.state.students}/>

   </div>
     );
  }

}

export default App;