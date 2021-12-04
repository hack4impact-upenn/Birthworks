import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import WorkshopBox from './WorkshopBox';
import 'bulma/css/bulma.min.css';
import { Box, Block, Columns, Column } from 'react-bulma-components';

const NameHeading = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-top: 2 rem;
  margin-bottom: 0.5rem;
`;

// const WorkshopContainer = styled.div`
//   border: 1px solid black;
//   border-radius: 20px;
//   padding-top: 3rem;
//   padding-right: 2.5rem;
//   padding-bottom: 3rem;
//   padding-left: 2.5rem;
//   background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
//     #ffffff;
// `;

const ListContainer = styled.div`
  margin-top: 1 rem;
  margin-bottom: 10 rem;
`;

function WorkshopCard({ workshops }) {
  const workshopList = workshops.map((workshop) => (
    <div className="block">
      <WorkshopBox key={workshop.id} workshop={workshop} />
    </div>
  ));

  var bodyContent;
  if (workshops.length === 0) {
    bodyContent = <p>No workshops found</p>;
  } else {
    bodyContent = <ListContainer>{workshopList}</ListContainer>;
  }

  return (
    <div className="container">
      <div className="block">
        <NameHeading>Last Name, First Name</NameHeading>
      </div>
      {bodyContent}
    </div>
  );
}

export default WorkshopCard;
