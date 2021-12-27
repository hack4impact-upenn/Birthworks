import React from 'react';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import RegisterPage from './authflow/RegisterPage';
import styled from 'styled-components';

const Container3 = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  min-width: 35 px !important;
  display: inline-block;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: left;
`;

const MenuButton1 = styled.button`
  width: 15%;
  font-weight: 700;
  text-align: left;
  font-size: 10px;
  background-color: #ffffff !important;
  color: #000000 !important;
  border: 10px #000000 !important;
  border-radius: 10px;
  margin-right: right;
  display: block;
`;

const placeholderUsers = [
  {
    Id: '1',
    UserType: 'Admin',
    Name: 'Cristin Tighe',
    Email: 'programdirector@birthworks.org',
  },
  {
    Id: '2',
    UserType: 'User',
    Name: 'Ziya Xu',
    Email: 'ziyaxu@hack4impact.org',
  },
  {
    Id: '3',
    UserType: 'User',
    Name: 'Mohamed Abaker',
    Email: 'mohamed.abaker@hack4impact.org',
  },
];

const ViewExistingUsers = () => {
  return (
    <div>
      <SearchBar></SearchBar>
      <Table
        headerColumns={['User Type', 'Name', 'Email', 'Delete']}
        dataColumns={['UserType', 'Name', 'Email', 'Delete']}
        data={placeholderUsers}
        hoverable={false}
      ></Table>
    </div>
  );
};

function AdminUserManagementPage() {
  return (
    <div className="container">
      <Container3>
        <MenuButton1 type="menu" className="button is-link">
          View Existing Users
        </MenuButton1>
        <MenuButton1 type="menu" className="button is-link">
          Add Users
        </MenuButton1>
      </Container3>
      <ViewExistingUsers />
      <RegisterPage />
    </div>
  );
}

export default AdminUserManagementPage;
