import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import PersonalInfoBox from '../components/PersonalInfoBox';
import 'bulma/css/bulma.min.css';
import { Box, Block, Columns, Column } from 'react-bulma-components';

// type PersonalInfoProps = {
//   personal_info: IPersInf[],
// };

const WrapperBox = styled.div`
  margin-left: auto;
  margin-top: 5%;
  justify-content: center;
  margin-left: 10%;
  margin-right: 10%;
`;

const NameHeading = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-top: 2 rem;
  margin-bottom: 0.5rem;
`;

const SmallerHeading = styled.h6`
  font-size: 16px;
  font-weight: 700;
  color: gray;
  margin-top: 2 rem;
  margin-bottom: 0.5rem;
`;

const PersonalInfoContainer = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  padding-top: 3rem;
  padding-right: 2.5rem;
  padding-bottom: 20rem;
  padding-left: 2.5rem;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    #ffffff;
`;

function PersonalInfoPage({ personal_info }) {
  return (
    <div className="container">
      <WrapperBox>
        <PersonalInfoContainer>
          <div className="block">
            <NameHeading>Last Name, First Name</NameHeading>
          </div>

          <div className="block">
            <SmallerHeading>City, State, Country</SmallerHeading>
          </div>

          <div className="block">
            <SmallerHeading>Phone Number: (xxx) xxx-xxxx</SmallerHeading>
          </div>

          <div className="block">
            <SmallerHeading>Email: username@birthworks.org</SmallerHeading>
          </div>

          <div className="block">
            <SmallerHeading>Member Since: MM/DD/YYYY</SmallerHeading>
          </div>

          <div className="block">
            <SmallerHeading>Member Until: MM/DD/YYYY</SmallerHeading>
          </div>
        </PersonalInfoContainer>
      </WrapperBox>
    </div>
  );
}

export default PersonalInfoPage;
