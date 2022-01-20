import 'bulma/css/bulma.min.css';
import styled from 'styled-components';
import React from 'react';

const Container = styled.div`
  width: 100%;
  border-spacing: 0px 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  text-align: start;
  padding-bottom: 20px;

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

/**
 * Generic dropdown component that allows you to create a dropdown
 * @param {*} name The title of the dropdown button
 * @param {*} options List of options to select from
 * @param {*} handleChange function to get called when an option is selected
 */

function DropdownComponent({ name, options, handleChange }) {
  const optionList = options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.name}
    </option>
  ));
  var bodyContent;
  if (options.length === 0) {
    bodyContent = <p>no options found</p>;
  } else {
    bodyContent = optionList;
  }

  return (
    <Container>
      {name == null ? (
        <div className="select">
          {handleChange == null ? (
            <select>{bodyContent}</select>
          ) : (
            <select onChange={(event) => handleChange(event)}>
              {bodyContent}
            </select>
          )}
        </div>
      ) : (
        <div>
          <h1>{name}</h1>
          <div className="select">
            {handleChange == null ? (
              <select>{bodyContent}</select>
            ) : (
              <select onChange={(event) => handleChange(event)}>
                {bodyContent}
              </select>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}

export default DropdownComponent;
