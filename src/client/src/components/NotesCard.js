import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api';

/**
 * Component with an old and new notes field. new is editable, old is not.
 */

const OldNotesField = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    #ffffff;
  box-sizing: border-box;
  padding: 27px;

  h1 {
    font-weight: 700;
    font-size: 24px;
    color: #969696;
    padding-bottom: 10px;
  }
  span {
    white-space: pre-line;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    color: #969696;
  p {
  }
`;
const NewNotesField = styled.div`
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    #ffffff;
  padding: 27px;
  h1 {
    font-weight: 700;
    font-size: 24px;
    color: #969696;
    padding-bottom: 10px;
  }
  textarea {
    resize: none;
    width: 100%;
    border: 1px solid #969696;
    position: relative;
  }
  input {
    position: absolute;
    bottom: 0;
    left: 17px;
  }
  span {
    white-space: pre-line;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    color: #969696;
  }
  input[type='submit'] {
    padding: 5px 15px;
    background: #b4579e;
    border: 0 none;
    cursor: pointer;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    font-style: normal;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-align: center;
    color: #ffffff;
  }
`;
const Icon = styled.span`
  color: grey;
  position: absolute;
  right: 25px;
  bottom: 23px;
`;

const NameHeading = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

function NotesCard({ customer }) {
  const [editing, setEditing] = useState(false);
  const [newNotes, setNewNotes] = useState(customer.notes_write); // needs to be customer.notes_read?

  const UpdateText = () => {
    setEditing(false);
    api
      .patch(`/api/customer/${customer._id}`, { notes: newNotes })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (event) => {
    setNewNotes(event.target.value);
  };

  return (
    <div>
      <div class="block">
        <NameHeading>
          {customer.last_name}, {customer.first_name}
        </NameHeading>
      </div>
      <div class="block">
        <div class="box">
          <NewNotesField>
            <h1>New Notes</h1>
            {editing ? (
              <form onSubmit={UpdateText}>
                <textarea value={newNotes} onChange={handleChange} rows="10" />
                <input type="submit" value="Save" />{' '}
              </form>
            ) : (
              <div>
                <p>{newNotes}</p>{' '}
                <Icon onClick={() => setEditing(!editing)}>
                  {' '}
                  <i class="fas fa-pencil-alt"></i>
                </Icon>{' '}
              </div>
            )}
          </NewNotesField>
        </div>
      </div>
      <div class="block">
        <div class="box">
          <OldNotesField>
            <h1>Old Notes</h1>
            <p>{customer.notes_read}</p>
          </OldNotesField>
        </div>
      </div>
    </div>
  );
}

export default NotesCard;
