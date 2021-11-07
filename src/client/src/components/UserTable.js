import React from 'react';
import styled from 'styled-components';
import Colors from '../common/Colors';

const Table = styled.table`
  border: 1px solid #000000;
  display: table;
  width: 100%;
  padding-bottom: 20px;
  border-collapse: separate;
  border-spacing: 0px 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  th {
    font-weight: 600;
    font-size: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #000000;
    align-items: center;
    text-align: center;
    color: #000000;
  }
  th#UserType {
    padding-left: 1%;
  }
  th#Name {
    width: 20%;
    padding-left: 30px;
  }
  th#Email {
    width: 60%;
    text-align: left;
    align-items: left;
    padding-left: 80px;
  }
  th#Delete {
    text-align: left;
    align-items: left;
    padding-right: 20px;
  }
  td {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #969696;
  }
  td#UserType {
    position: relative;
    top: 4px;
    padding-left: 4%;
  }
  td#Name {
    width: 20%;
    position: relative;
    top: 4px;
    padding-left: 7%;
  }
  td#Email {
    width: 60%;
    position: relative;
    top: 4px;
    text-align: left;
    padding-left: 80px;
  }
  td#Delete {
    position: relative;
    top: 4px;
    padding-right: 20px;
    color: #ff0505;
    font-weight: 600;
  }
`;

function getDeleteElement() {
  return <td id="Delete">Delete</td>;
}

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

function UserTable() {
  return (
    <Table>
      <thead>
        <tr>
          <th id="UserType">User Type</th>
          <th id="Name">Name</th>
          <th id="Email">Email</th>
          <th id="Delete">Delete</th>
        </tr>
      </thead>
      <tbody>
        {placeholderUsers.map((entry) => (
          <tr key={entry.Id}>
            <td id="UserType">{entry.UserType}</td>
            <td id="Name">{entry.Name}</td>
            <td id="Email">{entry.Email}</td>
            {getDeleteElement()}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UserTable;
