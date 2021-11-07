import { Form } from 'formik';
import React from 'react';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';

function AdminUserManagementPage() {
  return (
    <div className="container">
      <SearchBar></SearchBar>
      <UserTable></UserTable>
    </div>
  );
}

export default AdminUserManagementPage;
