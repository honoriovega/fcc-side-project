import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor(props) {

    super(props);
    this.state = {value: '',
                 students: [],
                 errors : ''
                };

    this.handleChange = this.handleChange.bind(this);
    this.fetchStudent = this.fetchStudent.bind(this);
    this.displayStudents = this.displayStudents.bind(this);
  }


  displayStudents() {
    return this.state.students.map(function(item,i){
    return <tr key={i}><td>{item.username}
           </td><td><img src={item.profileImage}></img></td>
           <td><p>{(item.name === '' ? <i>Name not available</i> : item.name)}</p></td>
           <td><p>{item.completedChallenges}</p></td><td><button onClick={
             () => {
                var index = this.state.students.indexOf(item);
                var temp = [...this.state.students];
                temp.splice(index, 1);
                this.setState({students : temp});
             }

           } >Remove</button></td></tr>;
    },this);
  }

  handleChange(event) {

    this.setState({value: event.target.value});

  }

  fetchStudent(event) {

    // console.log(this.state.value);


    let username = this.state.value.trim()
    fetch('https://fcc-profile-scraper.herokuapp.com/user/' + username)
      .then(response => {
        if (response.ok) {
          this.setState({errors : ''})
          return response.json();
        } else {

          // this.setState({errors : 'User ' + "'" + this.state.value.trim() + "'" + " not found"})
          this.setState({errors : `User "${username}" not found`})
          console.log(response);

        }
      })
      .then(data => {
        var temp = this.state.students;

        temp.push({
          'username' : this.state.value.trim(),
          'name' : data['name'],
          'profileImage' : data['profileImage'],
          'completedChallenges' : data['completedChallenges'].length,
        });


        this.setState({students : temp});

      });

  }

  render() {
    return (
      <div className="App">
        <center><h1>FreeCodeCamp User search</h1></center>

        <h2>Displaying {this.state.students.length} {( this.state.students.length == 1 ) ? 'student' : 'students'}</h2>
        <p>{this.state.errors}</p>
        <label>
          Username:
             <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
                     <button onClick={this.fetchStudent} >Search</button>
        <table>
          <th>Username</th>
          <th></th><th>Name</th>
          <th>Challenges Completed</th>
          {this.displayStudents()}
        </table>
   </div>
     );
  }

}

export default App;