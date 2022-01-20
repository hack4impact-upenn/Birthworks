import 'bulma/css/bulma.min.css';
import styled from 'styled-components';
import DropdownComponent from './DropdownComponent';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 50%;
`;

/**
 * A component that filters users by type.
 */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

function UserFilter({
  name1,
  options1,
  handleChange1,
  name2,
  options2,
  handleChange2,
  name3,
  options3,
  handleChange3,
}) {
  return (
    <div>
      <Wrapper>
        <Container>
          <DropdownComponent
            name={name1}
            options={options1}
            handleChange={handleChange1}
          />
          <DropdownComponent
            name={name2}
            options={options2}
            handleChange={handleChange2}
          />
          <DropdownComponent
            name={name3}
            options={options3}
            handleChange={handleChange3}
          />
        </Container>
      </Wrapper>
    </div>
  );
}
export default UserFilter;
