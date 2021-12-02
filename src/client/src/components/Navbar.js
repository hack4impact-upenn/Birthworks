import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Colors from '../common/Colors';
import { AuthContext } from '../context';
import DropdownComponent from './DropdownComponent';
import 'bulma/css/bulma.min.css';

const NavBarItems = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

function Navbar() {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const options = [
    { name: 'User Name' },
    { name: 'View Users' },
    { name: 'Logout' },
  ];

  async function handleChange(event) {
    if (event.target.value == 'User Name') {
      history.push(`/personalinfo`);
    } else if (event.target.value == 'View Users') {
      history.push(`/users`);
    } else if (event.target.value == 'Logout') {
      handleLogout();
      history.push(`/login`);
    }
  }

  async function handleLogout() {
    await auth.logout();
  }

  // change auth is authenticated to be correct!
  return (
    <nav
      className="navbar"
      style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
    >
      <div className="container">
        <div className="navbar-brand">
          <a href="/" className="navbar-item title is-4">
            <img src={process.env.PUBLIC_URL + '/birthworks.png'} />
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            {!auth.isAuthenticated ? (
              <div style={{ marginTop: '7%' }}>
                <DropdownComponent
                  options={options}
                  handleChange={handleChange}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
