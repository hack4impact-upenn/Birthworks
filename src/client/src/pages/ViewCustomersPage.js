import { max } from 'lodash';
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import styled from 'styled-components';

const maxPageNumber = 3;

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
  {
    Id: '4',
    Name: 'Ziya Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '5',
    Name: 'Ziya Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '6',
    Name: 'Ziya Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '7',
    Name: 'Ziya Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '8',
    Name: 'Ziya Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '9',
    Name: 'Ziya Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '10',
    Name: 'Ziya Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '11',
    Name: 'Ziya "Page 2" Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '12',
    Name: 'Ziya "Page 2" Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '13',
    Name: 'Ziya "Page 2" Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '14',
    Name: 'Ziya "Page 2" Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '15',
    Name: 'Ziya "Page 2" Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '16',
    Name: 'Ziya "Page 2" Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '17',
    Name: 'Ziya "Page 2" Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '18',
    Name: 'Ziya "Page 2" Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '19',
    Name: 'Ziya "Page 2" Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '20',
    Name: 'Ziya "Page 3" Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
  {
    Id: '21',
    Name: 'Ziya "Page 3" Xu',
    Email: 'ziyaxu@hack4impact.org',
    PhoneNumber: 'XXX-XXX-XXXX',
  },
];

function ViewCustomersPage() {
  const [pageNumber, setPageNumber] = useState(1);

  const increasePage = () => {
    if (pageNumber < maxPageNumber) {
      const newPageNumber = pageNumber + 1;
      setPageNumber(newPageNumber);
    }
  };

  const decreasePage = () => {
    if (pageNumber > 1) {
      const newPageNumber = pageNumber - 1;
      setPageNumber(newPageNumber);
    }
  };

  const goToEnd = () => {
    const newPageNumber = maxPageNumber;
    setPageNumber(newPageNumber);
  };

  const goToStart = () => {
    const newPageNumber = 1;
    setPageNumber(newPageNumber);
  };

  const leftButton = styled.div`
    width: 60px;
    border-width: 30px;
    border-color: red blue green yellow;
    border-style: solid;
  `;

  const getEntriesOnPage = (entry) => {
    return Math.ceil(parseInt(entry.Id) / 10) == pageNumber;
  };

  return (
    <div className="container">
      <SearchBar></SearchBar>
      <Table
        headerColumns={['Name', 'Email', 'Phone Number']}
        dataColumns={['Name', 'Email', 'PhoneNumber']}
        data={placeholderCustomers.filter(getEntriesOnPage)}
        hoverable={true}
        rowLink={() => console.log('clicked')}
      ></Table>
      <div>
        <div class="columns is-mobile is-centered">
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
