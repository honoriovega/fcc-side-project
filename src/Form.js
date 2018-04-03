import React, { Component } from 'react';

class Form extends Component {


  constructor(props) {

    super(props);
    this.state = {searchTerm : '' };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


   handleSearchChange(event) {
    this.setState({searchTerm : event.target.value.trim()});
  }

  handleSubmit(event) {

    event.preventDefault(); // prevent page from reloading

    // call parne
    this.props.handleTheChange(this.state.searchTerm);

  }

  render() {

    return(
        <form onSubmit={this.handleSubmit}>
          <label>
          Enter username:
          <input type="text"  onChange={this.handleSearchChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
    );
  }
}

export default Form;


