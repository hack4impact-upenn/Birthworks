import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
// import { IPersInf} from '../../../models/cert.model';
import 'bulma/css/bulma.min.css';

import { Box, Block, Columns, Column } from 'react-bulma-components';
import { format } from 'date-fns';

const boxStyle = {
  boxRadius: '20px',
};

const NameHeading = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-top: 2 rem;
  margin-bottom: 0.5rem;
`;

function PersonalInfoBox({ customer }) {
  return (
    <div className="container">
      <div className="block">
        <NameHeading>
          {customer.last_name || 'Last Name'},{' '}
          {customer.first_name || 'First Name'}
        </NameHeading>
      </div>
      <div class="box">
        <div className="block">
          {customer.city || 'City'}, {customer.state || 'State'},{' '}
          {customer.country || 'Country'}
        </div>
        <div className="block">
          {' '}
          Phone Number: {customer.phone || '(xxx) xxx-xxxx'}
        </div>
        <div className="block">
          Email: {customer.email || 'username@birthworks.org'}
        </div>
        <div className="block">
          {' '}
          Member Since:{' '}
          {format(new Date(customer.membership_start), 'MM/dd/yy')}
        </div>
        <div className="block">
          Member Until: {format(new Date(customer.membership_end), 'MM/dd/yy')}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoBox;
