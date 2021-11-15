import React from 'react';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';

const placeholderCustomers = [
  {
    Id: '1',
    Name: 'Cristin Tighe',
    Email: 'programdirector@birthworks.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '2',
    Name: 'Mohamed Abaker',
    Email: 'mohamed.abakergggggggggggggggggggggggggggggggg@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '3',
    Name: 'Ziya Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
];

function ViewCustomersPage() {
  return (
    <div className="container">
      <SearchBar></SearchBar>
      <Table
        headerColumns={['Name', 'Email', 'Phone Number']}
        dataColumns={['Name', 'Email', 'PhoneNumber']}
        data={placeholderCustomers}
        hoverable={true}
        rowLink={() => console.log('clicked')}
      ></Table>
    </div>
  );
}

export default ViewCustomersPage;
