import 'bulma/css/bulma.min.css';
import { Box, Block, Columns, Column } from 'react-bulma-components';
import { format } from 'date-fns';

const boxStyle = {
  boxRadius: '20px',
};

function WorkshopBox({ workshop }) {
  return (
    <div className="container">
      <Box>
        <div className="block">
          <strong>{workshop.name}</strong>.
        </div>
        <div className="block"> Location: {workshop.location} </div>
        <div className="block">
          <Columns>
            <div className="column">
              <div className="block">
                Start Date: {format(workshop.startDate, 'MM/dd/yyyy')}
              </div>
              <div className="block">
                End Date: {format(workshop.endDate, 'MM/dd/yyyy')}
              </div>
            </div>
            <div className="column">
              <div className="block">Mentor: {workshop.mentor}</div>
            </div>
          </Columns>
        </div>
      </Box>
    </div>
  );
}

export default WorkshopBox;
