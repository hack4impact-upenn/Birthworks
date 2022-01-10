import Table from '../components/Table';
import React, { useState, useEffect } from 'react';
import UserFilter from '../components/UserFilter';
import { useHistory } from 'react-router-dom';
import api from '../api';
import SearchBar from '../components/SearchBar';
import ViewPageTableContainer from '../components/ViewPageTableContainer';

const recertificationFilterOptions = [
  {
    name: 'Select',
    value: -1,
  },
  {
    name: 'Due in 6 months',
    value: 6,
  },
  {
    name: 'Due in 3 months',
    value: 3,
  },
  {
    name: 'Due in 1 month',
    value: 1,
  },
  {
    name: 'Expired',
    value: 0,
  },
];
const recertification = 'Recertification';

const membershipFilterOptions = [
  {
    name: 'Select',
    value: -1,
  },
  {
    name: 'Due in 2 months',
    value: 2,
  },
  {
    name: 'Due in 1 month',
    value: 1,
  },
  {
    name: 'Expired',
    value: 0,
  },
];
const membership = 'Membership Renewal';

const programFilterOptions = [
  {
    name: 'Select',
    value: 0,
  },
  {
    name: 'Childbirth Educator',
    value: 1,
  },
  {
    name: 'Birth Doula',
    value: 2,
  },
  {
    name: 'Postpartum Doula',
    value: 3,
  },
  {
    name: 'ACED',
    value: 4,
  },
  {
    name: 'Kangaroula',
    value: 5,
  },
];
const program = 'Program';

function ViewCustomersPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const [customers, setCustomers] = useState([]);

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});

  const getCustomers = async (page_num, query, filters) => {
    await api
      .post('/api/customer', {
        page_num,
        query,
        filters,
      })
      .then((res) => {
        setCustomers(
          res.data.result.map((customer) => ({
            id: customer._id,
            name: customer.first_name + ' ' + customer.last_name,
            email: customer.email,
            phone: customer.phone,
          }))
        );
        setMaxPages(res.data.maxPages);
        return res.data;
      });
  };
  useEffect(() => {
    getCustomers(1);
  }, []);

  const increasePage = () => {
    if (pageNumber < maxPages) {
      const newPageNumber = pageNumber + 1;
      getCustomers(newPageNumber, query, filters);
      setPageNumber(newPageNumber);
    }
  };

  const decreasePage = () => {
    if (pageNumber > 1) {
      const newPageNumber = pageNumber - 1;
      getCustomers(newPageNumber, query, filters);
      setPageNumber(newPageNumber);
    }
  };

  const goToEnd = () => {
    const newPageNumber = maxPages;
    getCustomers(newPageNumber, query, filters);
    setPageNumber(newPageNumber);
  };

  const goToStart = () => {
    const newPageNumber = 1;
    getCustomers(newPageNumber, query, filters);
    setPageNumber(newPageNumber);
  };

  const history = useHistory();
  const redirectToCustomerPage = (customer) => {
    history.push(`/customers/${customer.id}`);
  };

  const onSearch = (curr_query) => {
    getCustomers(pageNumber, curr_query, filters);
    setQuery(curr_query);
  };

  const recertificationFilterHandler = (option) => {
    let newFilters = {};
    if (option.target.value < 0) {
      if (filters.membership) {
        // no recertification, has membership
        newFilters = {
          membership: filters.membership,
        };
      }
      // else no recertifications or membership
    } else {
      if (filters.membership) {
        // has recertication and membership
        newFilters = {
          recertification: option.target.value,
          membership: filters.membership,
        };
      } else {
        // has recertification, no membership
        newFilters = {
          recertification: option.target.value,
        };
      }
    }
    getCustomers(pageNumber, query, newFilters);
    setFilters(newFilters);
  };

  const membershipFilterHandler = (option) => {
    console.log(`membership ${option.target.value}`);
    let newFilters = {};
    if (option.target.value < 0) {
      if (filters.recertification) {
        // no membership, has certification
        newFilters = {
          recertification: filters.recertification,
        };
      }
      // else no membership or recertification
    } else {
      if (filters.recertification) {
        // has membership and recertification
        newFilters = {
          recertification: filters.recertification,
          membership: option.target.value,
        };
      } else {
        // has membership, no recertification
        newFilters = {
          membership: option.target.value,
        };
      }
    }
    getCustomers(pageNumber, query, newFilters);
    setFilters(newFilters);
  };

  // TODO: implement program filtering in GET (POST) customers endpoint
  const programFilterHandler = (option) => {
    console.log(`program filter: ${option.target.value}`);
  };

  return (
    <ViewPageTableContainer className="ViewCustomers">
      <SearchBar
        placeholder={'Search by name, email, phone'}
        onSearch={onSearch}
      />
      <UserFilter
        name1={recertification}
        options1={recertificationFilterOptions}
        handleChange1={recertificationFilterHandler}
        name2={membership}
        options2={membershipFilterOptions}
        handleChange2={membershipFilterHandler}
        name3={program}
        options3={programFilterOptions}
        handleChange3={programFilterHandler}
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
    </ViewPageTableContainer>
  );
}

export default ViewCustomersPage;
