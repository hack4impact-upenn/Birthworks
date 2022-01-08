import Table from '../components/Table';
import React, { useState } from 'react';
import UserFilter from '../components/UserFilter';
import { useHistory } from 'react-router-dom';
import api from '../api';
import SearchBar from '../components/SearchBar';
import { useQuery } from 'react-query';

const recertificationFilterOptions = [
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
const recertification = 'Recertification';

const membershipFilterOptions = [
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
const membership = 'Membership Renewal';

const programFilterOptions = [
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
const program = 'Program';

function ViewCustomersPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const maxPageNumber = 3;

  const [customers, setCustomers] = useState([]);

  const getCustomers = () => {
    api
      .get('/api/customer', {
        page_num: pageNumber,
      })
      .then((res) => {
        setCustomers(
          res.data.result.map((customer) => ({
            id: customer._id,
            name: customer.first_name + ' ' + customer.last_name,
            email: customer.email,
            phone_number: customer.phone,
          }))
        );
        return res.data;
      });
  };
  getCustomers();

  const increasePage = () => {
    if (pageNumber < maxPageNumber) {
      const newPageNumber = pageNumber + 1;
      getCustomers();
      setPageNumber(newPageNumber);
    }
  };

  const decreasePage = () => {
    if (pageNumber > 1) {
      const newPageNumber = pageNumber - 1;
      getCustomers();
      setPageNumber(newPageNumber);
    }
  };

  const goToEnd = () => {
    const newPageNumber = maxPageNumber;
    getCustomers();
    setPageNumber(newPageNumber);
  };

  const goToStart = () => {
    const newPageNumber = 1;
    getCustomers();
    setPageNumber(newPageNumber);
  };

  const history = useHistory();

  const redirectToCustomerPage = (customer) => {
    history.push(`/customers/${customer.id}`);
  };

  const onSearch = (query) => {
    console.log('querying');
    api
      .get('/api/customer', {
        page_num: pageNumber,
        query,
      })
      .then((res) => {
        setCustomers(
          res.data.result.map((customer) => ({
            id: customer._id,
            name: customer.first_name + ' ' + customer.last_name,
            email: customer.email,
            phone_number: customer.phone,
          }))
        );
        return res.data;
      });
  };

  return (
    <div className="ViewCustomers">
      <SearchBar
        placeholder={'Search by name, email, phone'}
        onSearch={onSearch}
      />
      <UserFilter
        name1={recertification}
        options1={recertificationFilterOptions}
        name2={membership}
        options2={membershipFilterOptions}
        name3={program}
        options3={programFilterOptions}
      />
      <Table
        headerColumns={['Name', 'Email', 'Phone Number']}
        dataColumns={['name', 'email', 'phone']}
        data={customers}
        hoverable={true}
        rowLink={(customer) => redirectToCustomerPage(customer)}
      ></Table>
      <div>
        <div class="columns is-mobile is-centered padding-top: 20px">
          <div
            onClick={goToStart}
            style={{ cursor: 'pointer' }}
            class="column is-narrow"
          >
            {'<<'}
          </div>
          <div
            onClick={decreasePage}
            style={{ cursor: 'pointer' }}
            class="column is-narrow"
          >
            {'<'}
          </div>
          <div class="column is-narrow">{pageNumber}</div>
          <div
            onClick={increasePage}
            style={{ cursor: 'pointer' }}
            class="column is-narrow"
          >
            {'>'}
          </div>
          <div
            onClick={goToEnd}
            style={{ cursor: 'pointer' }}
            class="column is-narrow"
          >
            {'>>'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCustomersPage;
