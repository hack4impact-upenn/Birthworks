import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import PersonalInfoBox from '../components/PersonalInfoBox';
import 'bulma/css/bulma.min.css';
import { Box, Block, Columns, Column } from 'react-bulma-components';
import { data } from 'dom7';

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
  let date1 = new Date('2014-12-26');
  let date2 = new Date('2020-12-26');
  var dict = {
    name: 'Abaker, Mo',
    location: 'Costa Rica',
    phoneNumber: '4085555555',
    email: 'mobamba@email.com',
    memberSinceDate: date1,
    memberUntilDate: date2,
  };
  return (
    <div className="container">
      <WrapperBox>
        <PersonalInfoBox personal_info={dict}></PersonalInfoBox>
      </WrapperBox>
    </div>
  );
}

export default PersonalInfoPage;
