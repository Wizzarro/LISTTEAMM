import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem, Badge } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
// import { Managers } from '../../../api/managers.js';

// const man = (userId) => {
//   console.log(userId)
//   return Managers.findOne({userId:userId});
// }

const AuthenticatedNavigation = ({ name, history, userId }) => (
  <div>
    <Nav>
      <LinkContainer to="/notes">
        <NavItem eventKey={2} href="/document">Notes</NavItem>
      </LinkContainer>

      <NavDropdown eventKey={1} title="Teams" id="basic-nav-dropdown">
        <LinkContainer to="/teams">
          <MenuItem eventKey={1.1} href="/teams">Teams List</MenuItem>
        </LinkContainer>
        <LinkContainer to="/matches">
          <MenuItem eventKey={1.2} href="/matches">Matches List</MenuItem>
        </LinkContainer>
        <LinkContainer to="/students">
          <MenuItem eventKey={1.3} href="/students">Students List</MenuItem>
        </LinkContainer>
      </NavDropdown>
      {Roles.userIsInRole(userId, 'admin') ?
      <NavDropdown eventKey={4} title="Teams-admin" id="basic-nav-dropdown">
        <LinkContainer to="/teams-admin">
          <MenuItem eventKey={4.1} href="/teams-admin">Teams List</MenuItem>
        </LinkContainer>
        <LinkContainer to="/matches-admin">
          <MenuItem eventKey={4.2} href="/matches-admin">Matches List</MenuItem>
        </LinkContainer>
        <LinkContainer to="/students-admin">
          <MenuItem eventKey={4.3} href="/students-admin">Students List</MenuItem>
        </LinkContainer>
      </NavDropdown> : ''}
      {Roles.userIsInRole(userId, 'admin') ?
      <NavDropdown eventKey={3} title="Admin" id="admin-nav-dropdown">
        <LinkContainer exact to="/admin/users">
          <NavItem eventKey={3.1} href="/admin/users">Users</NavItem>
        </LinkContainer>
        <LinkContainer exact to="/admin/users/settings">
          <NavItem eventKey={3.2} href="/admin/users/settings">User Settings</NavItem>
        </LinkContainer>
      </NavDropdown> : ''}
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={3} title={name} id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavItem eventKey={3.1} href="/profile">Profile</NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={3.2} onClick={() => history.push('/logout')}>Logout</MenuItem>
      </NavDropdown>
    </Nav>
    {/* <p>
      <Badge>{man(userId)}</Badge>
    </p> */}
  </div>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

// default withTracker(() => {
//   Meteor.subscribe('managers');
//                                    не юзается
//   return {
//     managers: Managers.find({}, { sort: { createdAt: -1 } }).fetch(),
//     currentUser: Meteor.user(),
//   };
// });
export default withRouter(AuthenticatedNavigation);
