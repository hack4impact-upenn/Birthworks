import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../api';
import { useQuery } from 'react-query';
import ViewPageTableContainer from '../components/ViewPageTableContainer';

const TabContainer = styled.div`
  padding-top: 30px;
  padding-bottom: 15px;
  font-weight: bold;
  font-size: 20px;
  width: 500px;
  a {
    color: #b4579e;
  }
  a:hover {
    color: #000000;
    text-decoration: underline;
  }
`;

const Tab = styled.div`
  width: 250px;
  display: inline-block;
`;

/**
 * Admin User Management page. Can be found at "/viewUsers"
 * This page allows you to view/delete the current members and
 * has built navigation to the addUsers page
 */

const AdminUserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const { isLoading, error, data } = useQuery('users', () =>
    api.post('/api/users').then((res) => {
      setUsers(
        res.data.result.map((user) => ({
          id: user._id,
          type: user.type,
          name: user.first_name + ' ' + user.last_name,
          email: user.email,
        }))
      );
      return res.data;
    })
  );

  const onSearch = (query) => {
    console.log(`admin user query ${query}`);
    api
      .post('/api/users', {
        query,
      })
      .then((res) => {
        setUsers(
          res.data.result.map((user) => ({
            id: user._id,
            type: user.type,
            name: user.first_name + ' ' + user.last_name,
            email: user.email,
          }))
        );
        return res.data;
      });
  };

  return (
    <ViewPageTableContainer className="AdminUserManagement">
      <div>
        <TabContainer>
          <Tab>
            <Link style={{ color: 'black' }} to="/viewUsers">
              View Existing Users
            </Link>
          </Tab>
          <Tab>
            <Link to="/addUser">Add User</Link>
          </Tab>
        </TabContainer>
        <SearchBar placeholder={'Search by name, email'} onSearch={onSearch} />
      </div>
      <div>
        <Table
          headerColumns={['Name', 'Email', 'Delete']}
          dataColumns={['name', 'email', 'Delete']}
          data={users}
          hoverable={false}
        />
      </div>
    </ViewPageTableContainer>
  );
};

export default AdminUserManagementPage;
