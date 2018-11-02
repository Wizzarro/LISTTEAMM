import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table } from 'react-bootstrap';
import { Students } from '../../../api/students.js';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import Student from './Student.js';
import Navigation from '../../components/Navigation/Navigation';

 class Writing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    }
  };




  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.Name).value.trim();
    const surname = ReactDOM.findDOMNode(this.refs.Surname).value.trim();
    const grade = ReactDOM.findDOMNode(this.refs.Grade).value.trim();
    const team = ReactDOM.findDOMNode(this.refs.Team).value.trim();

    Meteor.call('students.insert', surname,name,grade,team);

    // Clear form
 ReactDOM.findDOMNode(this.refs.Surname).value = '';
 ReactDOM.findDOMNode(this.refs.Name).value = '';
 ReactDOM.findDOMNode(this.refs.Grade).value= '';
 ReactDOM.findDOMNode(this.refs.Team).value= '';

}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }


  renderStudents() {
    let filteredStudents = this.props.students;
    if (this.state.hideCompleted) {
      filteredStudents = filteredStudents.filter(student => !Student.checked);
    }
    return filteredStudents.map((student) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = student.owner === currentUserId;

      return (
        <Student
          key={student._id}
          student={student}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div>

      <Grid>
        <Row>
          <Col md={12} >
          { this.props.currentUser ?
          <div className="StudentAllForms">
          <center>
          <h1>Add Students</h1>

          <div className="StudentInfoForm">
          <h4>Information about student</h4>
            <form className="Surname" >
              <input className="input-Surname"
                type="text"
                ref="Surname"
                placeholder="Surname"
                align="right"
              />
            </form>

            <form className="Name">
              <input className="input-Name"
                type="text"
                ref="Name"
                placeholder= "Name"
                align="middle"
              />
            </form>

            <form className="Grade">
              <input className="input-Grade"
                type="text"
                ref="Grade"
                placeholder="Grade"
                align="left"
              />
            </form>

            <form className="Team">
              <input className="input-Team"
                type="text"
                ref="Team"
                placeholder="Team"
                align="left"
              />
            </form>
            <p></p>
          </div>
          <p></p>
          <Button className="textInput-submit-button" bsStyle="warning" name="Confirm" onClick={this.handleSubmit.bind(this)}>Confirm & Submit</Button>
          </center>
          <p></p>
        </div> : '' }

        <p></p>
        { this.props.currentUser ?
        <Table bordered condensed>
          <thead>
            <tr>
              <td><strong>Surname</strong></td>
              <td><strong>Name</strong></td>
              <td><strong>Grade</strong></td>
              <td><strong>Team</strong></td>
              <td><strong> 1-Round </strong></td>
              <td><strong> 2-Round </strong></td>
              <td><strong> 3-Round </strong></td>
              <td><strong> Quarter-Final </strong></td>
              <td><strong> Semi-Final </strong></td>
              <td><strong> Final </strong></td>
              <td><strong>Total-Score</strong></td>
              <td><strong> EDIT </strong></td>
            </tr>
          </thead>
          <tbody>
              {this.renderStudents()}
          </tbody>
        </Table>
          :
          <span>
          <center>
          <h2 className="authText">Authorize to view this page</h2>
          </center>
          </span>
        }
        </Col>
          </Row>
            </Grid>
            </div>

    );
  }

}

export default withTracker(() => {
  Meteor.subscribe('students');

  return {
    students: Students.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };

})(Writing);
