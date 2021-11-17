import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import PersonalInfoPage from './PersonalInfoPage';
import TabSelector from '../components/TabSelector.js';
import WorkshopCard from '../components/WorkshopCard';
import 'bulma/css/bulma.min.css';
import { Box, Block, Columns, Column } from 'react-bulma-components';
import React, { useState, useEffect } from 'react';
import CertificationCard from '../components/CertificationCard';
import NotesCard from '../components/NotesCard';

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

function MainTabPage() {
  const options = [
    'Personal Information',
    'Workshops',
    'Certifications',
    'Notes',
  ];
  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(0);

  var pageShown = () => {
    if (selectedOptionIndex === 0) {
      return <PersonalInfoPage />;
    } else if (selectedOptionIndex === 1) {
      return <WorkshopCard workshops={workshops} />;
    } else if (selectedOptionIndex === 2) {
      return <CertificationCard certifications={certifications} />;
    } else if (selectedOptionIndex === 3) {
      return <NotesCard />;
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
          <InformationContainer> {pageShown()}</InformationContainer>
        </div>
      </div>
    </div>
  );
}

export default MainTabPage;
