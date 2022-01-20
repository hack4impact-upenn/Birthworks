import React from 'react';
import styled from 'styled-components';
import api from '../api';

/**
 * This is a generic table to be displayed. it takes in headers for the columns
 * and the actual data
 */

const StyledTable = styled.table`
  border: 1px solid #000000;
  display: table;
  table-layout: auto;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  th {
    font-weight: 600;
    font-size: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #000000;
    align-items: center;
    text-align: center;
    color: #000000;
    padding-right: 1%;
    max-width: 400px;
  }
  th:first-child {
    padding-left: 1%;
  }
  td:first-child {
    padding-left: 1%;
  }
  tr#hoverableRow:hover {
    text-decoration: underline;
  }
  tr#hoverableRow {
    text-decoration: none;
  }
  td {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #969696;
    margin-right: 1%;
    max-width: 400px;
    word-break: break-all;
  }
  .deleteData {
    color: #ff0505;
    font-weight: 600;
  }
`;

function getDeleteElement(i, j, data) {
  const onClickHandler = (user) => {
    console.log();
    try {
      api.delete(`/api/users/${user.id}`);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <td
      key={`row${i}col${j}`}
      id={`dataCol${j}`}
      class={'deleteData'}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        onClickHandler(data[i]);
      }}
    >
      Delete
    </td>
  );
}

function Table(props) {
  return (
    <StyledTable>
      <thead>
        <tr>
          {props.headerColumns.map(function (col, i) {
            return (
              <th key={`col${i}`} id={`col${i}`}>
                {col}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {props.data.map(function (entry, i) {
          if (props.hoverable) {
            return (
              <tr
                key={i}
                id={'hoverableRow'}
                onClick={() => props.rowLink(entry)}
              >
                {props.dataColumns.map(function (col, j) {
                  if (col == 'Delete') {
                    return getDeleteElement(i, j, props.data);
                  }
                  return (
                    <td key={`row${i}col${j}`} id={`dataCol${j}`}>
                      {entry[col]}
                    </td>
                  );
                })}
              </tr>
            );
          } else {
            return (
              <tr key={i}>
                {props.dataColumns.map(function (col, j) {
                  if (col == 'Delete') {
                    return getDeleteElement(i, j, props.data);
                  }
                  return (
                    <td key={`row${i}col${j}`} id={`dataCol${j}`}>
                      {entry[col]}
                    </td>
                  );
                })}
              </tr>
            );
          }
        })}
      </tbody>
    </StyledTable>
  );
}

export default Table;
