import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import UserFilter from '../components/UserFilter';
import api from '../../api/index';

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
    name: 'No filter selected',
  },
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
    name: 'No filter selected',
  },
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
    name: 'No filter selected',
  },
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
  const [data, setData] = useState([]);
  const [filterCert, setCertFilter] = useState({});
  const [filterRenewal, setRenewalFilter] = useState({});
  const [filterProgram, setProgramFilter] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  const setCertFilter = (selectedFilter) => {
    setCertFilter(selectedFilter);
  };

  const setRenewalFilter = (selectedFilter) => {
    setRenewalFilter(selectedFilter);
  };

  const setProgramFilter = (selectedFilter) => {
    setProgramFilter(selectedFilter);
  };

  const setPage = (pageNumber) => {
    setPageNumber(pageNumber);
  };

  const fetchData = async () => {
    // function
    // make the api calls
    // set the current data with the api data
    // /api/customer -> pass in filters and query and page number
    // api paramerters
    // pageNumber -> int
    // query: {
    // first_name, last_name, email, phone_number
    //}
    // filters : {
    // recertification:number, membersp:nunber
    // }
    const result = await apicall();
    setData(result);
  };

  useEffect(async () => {
    fetchData();
  }, [filter]);
  // rerun whenver filters

  return (
    <div className="container">
      <UserFilter
        name1={name1}
        options1={options1}
        setCertFilter={setCertFilter}
        name2={name2}
        options2={options2}
        setRenewalFilter={setRenewalFilter}
        name3={name3}
        options3={options3}
        setProgamFilter={setProgramFilter}
      />
      <Table
        setPage={setPage}
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
