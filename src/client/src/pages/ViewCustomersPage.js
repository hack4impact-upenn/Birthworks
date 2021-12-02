import React from 'react';
import Table from '../components/Table';
import UserFilter from '../components/UserFilter';

const certifications = [
  {
    entryDate: Date.now(),
    completionDate: Date.now(),
    recertificationDate: Date.now(),
    certificationDate: Date.now(),
    trainer: 'some trainer',
    name: 'some name',
  },
  {
    entryDate: Date.now(),
    completionDate: Date.now(),
    recertificationDate: Date.now(),
    certificationDate: Date.now(),
    trainer: 'cert trainer',
    name: 'another name',
  },
];

const workshops = [
  {
    startDate: Date.now(),
    endDate: Date.now(),
    location: 'virtual',
    mentor: 'some trainer',
    name: 'some name',
  },
  {
    startDate: Date.now(),
    endDate: Date.now(),
    location: 'virtual',
    mentor: 'some trainer',
    name: 'some name',
  },
];

const options1 = [
  {
    name: 'Due in 6 months',
  },
  {
    name: 'Due in 3 months',
  },
  {
    name: 'Due in 1 month',
  },
  {
    name: 'Expired',
  },
];

const name1 = 'Recertification';

const options2 = [
  {
    name: 'Due in 2 months',
  },
  {
    name: 'Due in 1 month',
  },
  {
    name: 'Expired',
  },
];
const name2 = 'Membership Renewal';

const options3 = [
  {
    name: 'Childbirth Educator',
  },
  {
    name: 'Birth Doula',
  },
  {
    name: 'Postpartum Doula',
  },
  {
    name: 'ACED',
  },
  {
    name: 'Kangaroula',
  },
];

const name3 = 'Program';

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
      <UserFilter
        name1={name1}
        options1={options1}
        name2={name2}
        options2={options2}
        name3={name3}
        options3={options3}
      />
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
