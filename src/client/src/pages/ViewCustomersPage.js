import { max } from 'lodash';
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';

const maxPageNumber = 10;

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
  const [pageNumber, setPageNumber] = useState(1);

  const increasePage = () => {
    if (pageNumber < maxPageNumber) {
      const newPageNumber = pageNumber + 1;
      setPageNumber(newPageNumber);
      updatePage(newPageNumber);
    }
  };

  const decreasePage = () => {
    if (pageNumber > 1) {
      const newPageNumber = pageNumber - 1;
      setPageNumber(newPageNumber);
      updatePage(newPageNumber);
    }
  };

  const goToEnd = () => {
    const newPageNumber = maxPageNumber;
    setPageNumber(newPageNumber);
    updatePage(newPageNumber);
  };

  const goToStart = () => {
    const newPageNumber = 1;
    setPageNumber(newPageNumber);
    updatePage(newPageNumber);
  };

  const updatePage = (newPageNumber) => {
    alert(`fetching page number ... ${newPageNumber}`);
  };

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
      <div>
        <div onClick={goToStart}>{'<<'}</div>
        <div onClick={decreasePage}>{'<'}</div>
        <div onClick={decreasePage}>{pageNumber}</div>
        <div onClick={increasePage}>{'>'}</div>
        <div onClick={goToEnd}>{'>>'}</div>
      </div>
    </div>
  );
}

export default ViewCustomersPage;
