import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../api';
import { useQuery } from 'react-query';

const TabContainer = styled.div`
  padding-top: 75px;
  padding-right: 240px;
  padding-left: 240px;
`;

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
    <div className="AdminUserManagement">
      <div>
        <TabContainer>
          <Link to="/viewUsers">View Existing Users</Link>
          <div class="divider" />
          <Link style={{ color: 'black' }} to="/addUser">
            Add User
          </Link>
        </TabContainer>
        <SearchBar placeholder={'Search by name, email'} onSearch={onSearch} />
      </div>
      <div>
        <Table
          headerColumns={['User Type', 'Name', 'Email', 'Delete']}
          dataColumns={['type', 'name', 'email', 'Delete']}
          data={users}
          hoverable={false}
        />
      </div>
    </div>
  );
};

export default AdminUserManagementPage;
