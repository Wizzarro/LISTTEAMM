import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Button, Table } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';


import { Teams } from '../../../api/teams.js';
// Team component - represents a single todo item
export default class Team extends Component {

  deleteThisTeam() {
    Meteor.call('teams.remove', this.props.team._id);
  }
  togglePrivate() {
    Meteor.call('teams.setPrivate', this.props.team._id, ! this.props.team.private);
  }
  addPlus(){
    Meteor.call('teams.addPlus', this.props.team._id)
  }
  addMinus(){
    Meteor.call('teams.addMinus', this.props.team._id)
  }

  render() {
    // Give teams a different className when they are checked off,
    // so that we can style them nicely in CSS
    const teamClassName = classnames({
      checked: this.props.team.checked,
      private: this.props.team.private,
    });

    return (
            <tr>
              <td>{this.props.team.teamName}</td>
              <td>{this.props.team.teamLeader}</td>
              <td>
              <button onClick={this.addMinus.bind(this)}>
              <span className="glyphicon glyphicon-minus"></span>
              </button>
              <span> </span>
              <span> </span>
              <button onClick={this.addPlus.bind(this)}>
              <span className="glyphicon glyphicon-plus"></span>
              </button>
              </td>
              <td>
                <Button bsStyle="warning" className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                  { this.props.team.private ? 'Private' : 'Public' }
                </Button>
               <Button bsStyle="danger" className="delete" onClick={this.deleteThisTeam.bind(this)}>
                  &times;
                </Button>
              </td>
            </tr>
    );
  }
}
