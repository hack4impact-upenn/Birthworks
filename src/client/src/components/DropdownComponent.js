import 'bulma/css/bulma.min.css';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  border-spacing: 0px 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  text-align: start;
  padding-bottom: 16px;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    display: center;
    padding-bottom: 4px;
    color: #b4579e;
    white-space: nowrap;
  }
`;

function DropdownComponent({ name, options, setSelectedFilter }) {
  const optionList = options.map((option) => <option>{option.name}</option>);

  var bodyContent;
  if (options.length === 0) {
    bodyContent = <p>no options found</p>;
  } else {
    bodyContent = optionList;
  }

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <Container>
      <h1>{name}</h1>
      <div class="select">
        <select onChange={handleChange}>
          <select>{bodyContent}</select>
        </select>
      </div>
    </Container>
  );
}

export default DropdownComponent;
