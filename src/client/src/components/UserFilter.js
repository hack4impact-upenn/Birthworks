import 'bulma/css/bulma.min.css';
import styled from 'styled-components';
import DropdownComponent from './DropdownComponent';
import SearchBar from './SearchBar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 50%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

function UserFilter({ name1, options1, name2, options2, name3, options3 }) {
  return (
    <div>
      <Wrapper>
        <SearchBar />
        <Container>
          <DropdownComponent name={name1} options={options1} />
          <DropdownComponent name={name2} options={options2} />
          <DropdownComponent name={name3} options={options3} />
        </Container>
      </Wrapper>
    </div>
  );
}
export default UserFilter;
