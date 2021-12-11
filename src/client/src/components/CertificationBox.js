import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
// import { ICert } from '../../../models/cert.model';
import 'bulma/css/bulma.min.css';
import { Box, Block, Columns, Column } from 'react-bulma-components';
import { format } from 'date-fns';

// type CertBoxProps = {
//   certification: ICert;
// };
const boxStyle = {
  boxRadius: '20px',
};

function CertificationBox({ certification }) {
  return (
    <div className="container">
      <Box>
        <div className="block">
          <div>
            <strong>{certification.name}</strong>
          </div>
        </div>
        <div className="block">
          <Columns>
            <div className="column">
              <div className="block">
                Entry Date:{' '}
                {format(new Date(certification.entry_date), 'MM/dd/yyyy')}
              </div>
              <div className="block">
                Completion Date:{' '}
                {format(new Date(certification.completion_date), 'MM/dd/yyyy')}
              </div>
              <div className="block">
                Certification:{' '}
                {format(new Date(certification.certificate), 'MM/dd/yyyy')}
              </div>
            </div>
            <div className="column">
              <div className="block">
                Recertification Date:{' '}
                {certification.recertification_dates.map((data) =>
                  format(new Date(data), 'MM/dd/yyyy')
                ) + ' '}
              </div>
              <div className="block">Trainer: {certification.trainer}</div>
            </div>
          </Columns>
        </div>
      </Box>
    </div>
  );
}

export default CertificationBox;
