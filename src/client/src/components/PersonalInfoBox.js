import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
// import { IPersInf} from '../../../models/cert.model';
import 'bulma/css/bulma.min.css';

import { Box, Block, Columns, Column } from 'react-bulma-components';
import { format } from 'date-fns';

// type PersInfoBoxProps = {

//   personal_info: PersInf;
// };

const boxStyle = {
  boxRadius: '20px',
};

const NameHeading = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-top: 2 rem;
  margin-bottom: 0.5rem;
`;

function PersonalInfoBox({ personal_info }) {
  return (
    <div className="container">
      <div className="block">
        <NameHeading>
          {personal_info.name || 'Last Name, First Name'}
        </NameHeading>
      </div>
      <div class="box">
        <div className="block">
          {personal_info.location || 'City, State, Country'}
        </div>
        <div className="block">
          {' '}
          Phone Number: {personal_info.phoneNumber || '(xxx) xxx-xxxx'}
        </div>
        <div className="block">
          Email: {personal_info.email || 'username@birthworks.org'}
        </div>
        <div className="block">
          {' '}
          Member Since:{' '}
          {personal_info.memberSinceDate
            ? format(personal_info.memberSinceDate, 'MM/dd/yy')
            : 'MM/DD/YY'}
        </div>
        <div className="block">
          Member Until:{' '}
          {personal_info.memberUntilDate
            ? format(personal_info.memberUntilDate, 'MM/dd/yy')
            : 'MM/DD/YY'}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoBox;
