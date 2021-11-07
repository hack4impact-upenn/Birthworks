import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Colors from '../common/Colors';

const Container = styled.div`
  border: 1px solid #000000;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 51px;

  h1 {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    text-align: center;
    padding-bottom: 30px;
  }
`;
const OldNotesField = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    #ffffff;
  border: 1px solid #969696;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 27px;

  h1 {
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 24px;
    color: #969696;
    padding-bottom: 10px;
  }
  span {
    white-space: pre-line;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    color: #969696;
  }
`;
const NewNotesField = styled.div`
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    #ffffff;
  border: 1px solid #969696;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 27px;
  margin-bottom: 45px;
  h1 {
    font-family: 'Roboto';
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
    margin-bottom: 10px;
  }
  input {
    position: absolute;
    bottom: 0;
    left: 17px;
    margin: 10px;
  }
  span {
    white-space: pre-line;
    font-family: Roboto;
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
    font-family: Montserrat;
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

const dummyUser = {
  firstName: 'Ziya',
  lastName: 'Xu',
  oldNotes:
    'Some notes content here... \n ex. Renewed Membership \n (This section cannot be edited)',
  newNotes:
    'Some notes content here... \n ex. Renewed Membership \n (This section can be edited)',
};

function NotesCard() {
  const [editing, setEditing] = useState(false);
  const [newNotes, setNewNotes] = useState(dummyUser.newNotes);

  const UpdateText = () => {
    setEditing(false);
  };

  const handleChange = (event) => {
    setNewNotes(event.target.value);
  };

  return (
    <Container>
      <h1>
        {dummyUser.lastName}, {dummyUser.firstName}
      </h1>
      <NewNotesField>
        <h1>New Notes</h1>
        {editing ? (
          <form onSubmit={UpdateText}>
            <textarea value={newNotes} onChange={handleChange} rows="10" />
            <input type="submit" value="Save" />
          </form>
        ) : (
          <div>
            <span>{newNotes}</span>
            <Icon onClick={() => setEditing(!editing)}>
              <i class="fas fa-pencil-alt"></i>
            </Icon>
          </div>
        )}
      </NewNotesField>
      <OldNotesField>
        <h1>Old Notes</h1>
        <span>{dummyUser.oldNotes}</span>
      </OldNotesField>
    </Container>
  );
}

export default NotesCard;
