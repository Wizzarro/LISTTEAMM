import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';

import { Students } from '../../../api/students.js';
// Student component - represents a single todo item
export default class Student extends Component {

  deleteThisStudent() {
    Meteor.call('students.remove', this.props.student._id);
  }

  togglePrivate() {
    Meteor.call('students.setPrivate', this.props.student._id, ! this.props.student.private);
  }

  addPlus(){
    Meteor.call('students.addPlus', this.props.student._id)
  }

  addMinus(){
    Meteor.call('students.addMinus', this.props.student._id)
  }

  TotaladdTwo(){
    Meteor.call('students.addscoreSecond' , this.props.student._id)
  }
  TotalminusTwo(){
    Meteor.call('students.minusscoreSecond' , this.props.student._id)
  }

  TotaladdThird(){
    Meteor.call('students.addscoreThird' , this.props.student._id)
  }
  TotalminusThird(){
    Meteor.call('students.minusscoreThird' , this.props.student._id)
  }


  TotaladdFourth(){
    Meteor.call('students.addscoreFourth' , this.props.student._id)
  }
  TotalminusFourth(){
    Meteor.call('students.minusscoreFourth' , this.props.student._id)
  }


  TotaladdFifth(){
    Meteor.call('students.addscoreFifth' , this.props.student._id)
  }
  TotalminusFifth(){
    Meteor.call('students.minusscoreFifth' , this.props.student._id)
  }


  TotaladdSix(){
    Meteor.call('students.addscoreSix' , this.props.student._id)
  }
  TotalminusSix(){
    Meteor.call('students.minusscoreSix' , this.props.student._id)
  }







  render() {
    // Give students a different className when they are checked off,
    // so that we can style them nicely in CSS
    const studentClassName = classnames({
      checked: this.props.student.checked,
      private: this.props.student.private,
    });

    return (
            <tr>
              <td>{this.props.student.surname}</td>
              <td>{this.props.student.name}</td>
              <td>{this.props.student.grade}</td>
              <td>{this.props.student.team}</td>
              <td>{this.props.student.score}</td>
              <td>{this.props.student.scoreSecond}</td>
              <td>{this.props.student.scoreThird}</td>
              <td>{this.props.student.scoreFourth}</td>
              <td>{this.props.student.scoreFifth}</td>
              <td>{this.props.student.scoreSix}</td>
              <td>
               {this.props.student.score + this.props.student.scoreSecond + this.props.student.scoreThird + this.props.student.scoreFourth + this.props.student.scoreFifth + this.props.student.scoreSix}
              </td>
            </tr>
    );
  }
}
