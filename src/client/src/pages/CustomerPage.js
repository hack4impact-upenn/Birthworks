import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import TabSelector from '../components/TabSelector.js';
import WorkshopCard from '../components/WorkshopCard';
import PersonalInfoBox from '../components/PersonalInfoBox';
import 'bulma/css/bulma.min.css';
import React from 'react';
import CertificationCard from '../components/CertificationCard';
import NotesCard from '../components/NotesCard';
import api from '../api';

const InformationContainer = styled.div`
  margin: 2rem;
  padding-top: 3rem;
  padding-right: 2.5rem;
  padding-bottom: 3rem;
  padding-left: 2.5rem;
  border: 1px solid black;
  border-radius: 20px;
`;

const TabContainer = styled.div`
  margin: 2rem;
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

  return (
    <div>
      <div class="columns">
        <div class="column is-one-fifth">
          <TabContainer>
            <TabSelector
              options={options}
              selectedOptionIndex={selectedOptionIndex}
              setSelectedOptionIndex={setSelectedOptionIndex}
            />
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
    </div>
  );
}

export default CustomerPage;
