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

function PersonalInfoBox({ personal_info }) {
  return (
    <div className="container">
      <Box>
        <div className="block">
          <strong>{personal_info.name || 'Last Name, First Name'}</strong>.
        </div>
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
      </Box>
    </div>
  );
}

export default PersonalInfoBox;
