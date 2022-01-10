import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context';
import DropdownComponent from './DropdownComponent';
import 'bulma/css/bulma.min.css';
import styled from 'styled-components';
import api from '../api';

const NavBar = styled.div`
  width: 100%;
`;

const Logo = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 45px;
  img {
    width: 100%;
    height: auto;
  }
`;

const HeaderMenuWrapper = styled.div`
  float: right;
  padding-right: 60px;
`;
const Username = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 5px;
`;
const Dropdown = styled.div`
  padding-top: 5px;
`;

function Navbar() {
  const options = [
    { name: 'View Customers' },
    { name: 'View Users' },
    { name: 'Logout' },
  ];

  const auth = useContext(AuthContext);
  const history = useHistory();

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
      const id_req = await api.get('/api/users/me');
      setUserName(
        id_req.data.data.first_name + ' ' + id_req.data.data.last_name
      );
    }
  }, [auth.isAuthenticated]);

  return (
    <nav
      className="navbar"
      style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
    >
      <NavBar>
        <div className="column is-four-fifths">
          <Logo>
            <a href="/" className="navbar-item">
              <img src={process.env.PUBLIC_URL + '/birthworks.png'} />
            </a>
          </Logo>
        </div>
        <div>
          <HeaderMenuWrapper>
            {auth.isAuthenticated ? (
              <div>
                <Username>{userName}</Username>
                <Dropdown>
                  <DropdownComponent
                    options={options}
                    handleChange={handleChange}
                  />
                </Dropdown>
              </div>
            ) : (
              <></>
            )}
          </HeaderMenuWrapper>
        </div>
      </NavBar>
    </nav>
  );
}

export default Navbar;
