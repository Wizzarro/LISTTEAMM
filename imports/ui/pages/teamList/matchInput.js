import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Table, DropdownButton } from 'react-bootstrap';
import { Button , Grid, Row, Col, Clearfix} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TeamInput from './teamInput.js'
import { Teams } from '../../../api/teams.js';
import Team from './Team.js';
import { Matchs } from '../../../api/matchs.js';
import Match from './Match.js';
import Navigation from '../../components/Navigation/Navigation';
import Select from 'react-select';

class MatchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      selectedOptionTeamOne: "Select team",
      selectedOptionTeamTwo: "Select team",
      selectedOptionRounds: "Select round",
    }
  };

  handleSelectFirst(eventKey, event) {
    const teams = this.props.teams.map ((team) => team.teamName)
    this.setState({ selectedOptionTeamOne: teams[eventKey] });
  }
  handleSelectSecond(eventKey, event) {
    const teams = this.props.teams.map ((team) => team.teamName)
    this.setState({ selectedOptionTeamTwo: teams[eventKey] });
  }


  OnehandleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const scoredOne = ReactDOM.findDOMNode(this.refs.ScoredOne).value.trim();
    const scoredTwo = ReactDOM.findDOMNode(this.refs.ScoredTwo).value.trim();

    const teamOne = this.state.selectedOptionTeamOne;
    const teamTwo = this.state.selectedOptionTeamTwo;

    Meteor.call('matchs.insert', scoredOne , scoredTwo, teamOne, teamTwo);

    // Clear form
 ReactDOM.findDOMNode(this.refs.ScoredOne).value = '';
 ReactDOM.findDOMNode(this.refs.ScoredTwo).value= '';
}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderMatchs() {
    let filteredMatchs = this.props.matchs;
    if (this.state.hideCompleted) {
      filteredMatchs = filteredMatchs.filter(match => !Match.checked);
    }
    return filteredMatchs.map((match) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = match.owner === currentUserId;

      return (
        <Match
          key={match._id}
          match={match}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  renderTeams() {
    let filteredTeams = this.props.teams;
    if (this.state.hideCompleted) {
      filteredTeams = filteredTeams.filter(team => !Team.checked);
    }
    return filteredTeams.map((team) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = team.owner === currentUserId;

      return (
        <Team
          key={team._id}
          team={team}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    // const teams = this.props.teams;
    const teams = this.props.teams.map ((team) => team.teamName)
    const {selectedOption} = this.state;

    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
              { this.props.currentUser ?
              <div className="TeamAllForms">
                <center>
                  <h1>Add Matches</h1>
                    <div className="dropdown-team1">
                      <h4>First Team</h4>
                        <DropdownButton className="dropdownbutton-team1"
                          title={this.state.selectedOptionTeamOne}
                          id="document-type"
                          onSelect={this.handleSelectFirst.bind(this)}
                        >
                          {teams.map((team, i) => (
                            <MenuItem key={i} eventKey={i}>
                              {team}
                            </MenuItem>
                          ))}
                        </DropdownButton>
                        <p></p>
                        <form>
                          <input className="input-TeamOne"
                            type="text"
                            ref="ScoredOne"
                            placeholder="First Teams Score"
                            align="left"
                          />
                        </form>
                    </div>

                    <div className="dropdown-team2">
                      <h4>Second Team</h4>
                        <DropdownButton className="dropdownbutton-team2"
                          title={this.state.selectedOptionTeamTwo}
                          id="document-type"
                          onSelect={this.handleSelectSecond.bind(this)}
                        >
                          {teams.map((team, i) => (
                            <MenuItem key={i} eventKey={i}>
                              {team}
                            </MenuItem>
                          ))}
                        </DropdownButton>
                        <p></p>
                        <form>
                          <input className="input-TeamTwo"
                            type="text"
                            ref="ScoredTwo"
                            placeholder= "Second Teams Score"
                            align="right"
                          />
                        </form>
                    </div>

                    <p></p>
                    <Button bsStyle="warning" className="dropdown-submit-button" onClick={this.OnehandleSubmit.bind(this)}>Confirm & Submit</Button>
                </center>
                <p></p>
              </div> : '' }

            <p></p>
            { this.props.currentUser ?
            <Table bordered condensed>
              <thead>
                <tr>
                  <td><strong>Round</strong></td>
                  <td><strong>team1/team2</strong></td>
                  <td><strong> EDIT </strong></td>
                </tr>
              </thead>
              <tbody>
                  {this.renderMatchs()}
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
        <div className="hiddenContent">
        <TeamInput />
        </div>
    </div>

    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('matchs');
  Meteor.subscribe('teams');

  return {
    matchs: Matchs.find({}, { sort: { createdAt: -1 } }).fetch(),
    teams: Teams.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Matchs.find({ checked: { $ne: false } }).count(),
    incompleteCount: Teams.find({ checked: { $ne: false } }).count(),
    currentUser: Meteor.user(),
  };

})(MatchInput);
