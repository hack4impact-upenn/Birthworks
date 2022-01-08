import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context';
import DropdownComponent from './DropdownComponent';
import 'bulma/css/bulma.min.css';
import api from '../api';

const NavBarItems = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

function Navbar() {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const options = [
    { name: 'View Customers' },
    { name: 'View Users' },
    { name: 'Logout' },
  ];

  async function handleChange(event) {
    if (event.target.value == 'View Customers') {
      history.push(`/customers`);
    } else if (event.target.value == 'View Users') {
      history.push(`/viewUsers`);
    } else if (event.target.value == 'Logout') {
      handleLogout();
      history.push(`/login`);
    }
  }

  async function handleLogout() {
    await auth.logout();
  }

  const [userName, setUserName] = useState(null);
  useEffect(async () => {
    if (auth.isAuthenticated) {
      const request = await api.get('/api/users/me');
      setUserName(request.data.data.email);
    }
  }, [auth.isAuthenticated]);

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
            {auth.isAuthenticated ? (
              <div>
                <div className="navbar-username">{userName}</div>
                <div style={{ marginTop: '7%' }}>
                  <DropdownComponent
                    options={options}
                    handleChange={handleChange}
                  />
                </div>
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
