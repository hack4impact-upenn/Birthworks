import React from 'react';
import styled from 'styled-components';
import FormField from '../components/FormField';
import { Formik, Form } from 'formik';

const Container = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: left;
  width: 100%;
`;

const SearchField = styled.div`
  width: 400%;
`;

const SearchButton = styled.button`
  font-weight: 700;
  background-color: #b4579e !important;
  border-radius: 6px;
  margin: 8px 0 10px 30px;
`;

const SearchContainer = ({ children, icon }) => {
  if (!icon) return children;

  return (
    <SearchField>
      <div>
        {children}
        <span
          className="icon is-small is-left"
          style={{
            color: '#A6AAB5',
            marginLeft: '10px',
            display: 'block !important',
            position: 'absolute',
            marginTop: '-40px',
          }}
        >
          <i className={`fas ${icon}`}></i>
        </span>
      </div>
    </SearchField>
  );
};

const SearchBar = ({ onSearch, placeholder }) => {
  const onSubmit = (values) => {
    onSearch(values.query);
  };

  return (
    <Container>
      <Formik initialValues={{ query: '' }} onSubmit={onSubmit}>
        {({ errors, isSearching }) => (
          <Form
            style={{ display: 'flex', alignContent: 'center', width: '100%' }}
          >
            <SearchContainer icon="fa-search">
              <FormField
                name="query"
                errors={errors}
                placeholder={placeholder}
                style={{
                  paddingLeft: '35px',
                  backgroundColor: '#F2F2F2',
                  borderRadius: '20px',
                }}
              />
            </SearchContainer>
            <SearchButton
              type="submit"
              className="button is-link"
              disabled={isSearching}
              style={{ alignSelf: 'right' }}
            >
              Search
            </SearchButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SearchBar;
