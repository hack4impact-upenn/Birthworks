import { Form } from 'formik';
import React from 'react';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import UserTable from '../components/UserTable';

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

function AdminUserManagementPage() {
  return (
    <div className="container">
      <SearchBar></SearchBar>
      <Table
        headerColumns={['User Type', 'Name', 'Email', 'Delete']}
        dataColumns={['UserType', 'Name', 'Email', 'Delete']}
        data={placeholderUsers}
        hoverable={false}
      ></Table>
    </div>
  );
}

export default AdminUserManagementPage;
