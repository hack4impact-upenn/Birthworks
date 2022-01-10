import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import 'bulma/css/bulma.min.css';
import React from 'react';
import styled from 'styled-components/macro';
import CertificationCard from '../components/CertificationCard';
import NotesCard from '../components/NotesCard';
import TabSelector from '../components/TabSelector.js';
import WorkshopCard from '../components/WorkshopCard';
import PersonalInfoBox from '../components/PersonalInfoBox';
import ViewPageTableContainer from '../components/ViewPageTableContainer.js';
import api from '../api';

const InformationContainer = styled.div`
  margin-left: 1rem;
  margin-top: 2rem;
  padding-top: 3rem;
  padding-right: 2.5rem;
  padding-bottom: 3rem;
  padding-left: 2.5rem;
  border: 1px solid black;
  border-radius: 20px;
`;

const TabContainer = styled.div`
  margin-right: 1rem;
  margin-top: 2rem;
`;

const BackButton = styled.button`
  font-weight: 700;
  background-color: #b4579e !important;
  border-radius: 6px;
  margin-top: 20px;
  width: 100%;
`;

function CustomerPage() {
  const { customer_id } = useParams();

  const { isLoading, error, data } = useQuery('customer', () =>
    api
      .get(`/api/customer/${customer_id}`)
      .then((res) => {
        return res.data.result[0];
      })
      .catch((_) => {
        return null;
      })
  );

  const options = [
    'Personal Information',
    'Workshops',
    'Certifications',
    'Notes',
  ];
  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(0);

  // adding in some hooks below

  var pageShown = () => {
    if (data == null) {
      return 'INCORRECT CUSTOMER ID';
    }
    if (selectedOptionIndex === 0) {
      return <PersonalInfoBox customer={data} />;
    } else if (selectedOptionIndex === 1) {
      return <WorkshopCard workshops={data.work_obj} customer={data} />;
    } else if (selectedOptionIndex === 2) {
      return (
        <CertificationCard certifications={data.cert_obj} customer={data} />
      );
    } else if (selectedOptionIndex === 3) {
      return <NotesCard customer={data} />;
    }
  };

  const history = useHistory();
  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <ViewPageTableContainer>
      <div class="columns">
        <div class="column is-one-fifth">
          <TabContainer>
            <TabSelector
              options={options}
              selectedOptionIndex={selectedOptionIndex}
              setSelectedOptionIndex={setSelectedOptionIndex}
            />
            <BackButton
              type="button"
              className="button is-link"
              style={{ alignSelf: 'left' }}
              onClick={handleBackClick}
            >
              Back to Customers
            </BackButton>
          </TabContainer>
        </div>
        <div class="column is-four-fifths">
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <InformationContainer> {pageShown()}</InformationContainer>
          )}
        </div>
      </div>
    </ViewPageTableContainer>
  );
}

export default CustomerPage;
