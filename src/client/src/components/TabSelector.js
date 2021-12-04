import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import { Box, Block, Columns, Column } from 'react-bulma-components';

const selectedItemColor = '#B4579E';

const MenuContainer = styled.div`
  border: 1px solid black;
  // border-radius: 20px;
  padding: 1rem;
`;

/**
 * A selector that lets you select a list of options.
 * @param {*} options The list of options to display
 * @param {*} selectedOptionIndex The state variable saying which option is selected
 * @param {*} setSelectedOptionIndex The state setter function to call to modify the state variable
 * @returns The component in all its glory
 */
function TabSelector({ options, selectedOptionIndex, setSelectedOptionIndex }) {
  console.log(options);
  const optionsList = options.map((option, index) => (
    <li key={index.toString()} onClick={() => setSelectedOptionIndex(index)}>
      <a>
        {' '}
        <p
          style={{
            color: index == selectedOptionIndex ? selectedItemColor : 'black',
          }}
        >
          {' '}
          {option}{' '}
        </p>{' '}
      </a>
    </li>
  ));
  return (
    <div class="box">
      <aside class="menu">
        <ul class="menu-list">{optionsList}</ul>
      </aside>
    </div>
  );
}

export default TabSelector;
