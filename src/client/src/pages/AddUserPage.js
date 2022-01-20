import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Formik, Form } from 'formik';
import { AuthContext } from '../context';
import api from '../api';
import FormField from '../components/FormField';
import { useHistory } from 'react-router-dom';
import ViewPageTableContainer from '../components/ViewPageTableContainer';

const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding-top: 10px;
  max-width: 1000px !important;
  top: 100px;
`;

const LeftNameFieldContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  max-width: 500px !important;
  display: inline-block;
  width: 50%;
  padding-right: 1%;
`;

const RightNameFieldContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  max-width: 500px !important;
  display: inline-block;
  width: 50%;
`;

const CreateUserButton = styled.button`
  width: 15%;
  font-weight: 700;
  background-color: #b4579e !important;
  border-radius: 10px;
  margin-left: auto;
  display: block;
`;

const TabContainer = styled.div`
  padding-top: 30px;
  padding-bottom: 15px;
  font-weight: bold;
  font-size: 20px;
  width: 500px;
  a {
    color: #b4579e;
  }
  a:hover {
    color: #000000;
    text-decoration: underline;
  }
`;

const Tab = styled.div`
  width: 250px;
  display: inline-block;
`;

/**
 * Add user page. Found at("/addUser")
 * this page allows current members to add more members to the portal
 */
function AddUserPage() {
  const auth = useContext(AuthContext);
  const history = useHistory();

  async function handleSubmit(values, actions) {
    try {
      await api.post('/api/users/signup', values);
      //await auth.login(values.email, values.password);
      history.push(`/viewUsers`);
    } catch (error) {
      const { message, code } =
        error.response.status === 400
          ? error.response.data
          : { message: 'An unknown error occurred.', code: null };
      let fields;
      if (code === 'already-exists') {
        fields = ['email'];
      } else {
        fields = ['first_name', 'last_name', 'email', 'password'];
      }
      for (const field of fields) {
        actions.setFieldError(field, message);
      }
    }
  }

  return (
    <ViewPageTableContainer className="AddUserPage">
      <TabContainer>
        <Tab>
          <Link to="/viewUsers">View Existing Users</Link>
        </Tab>
        <Tab>
          <Link style={{ color: 'black' }} to="/addUser">
            Add User
          </Link>
        </Tab>
      </TabContainer>
      <FormContainer className="AddUserForm">
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, isSubmitting }) => (
            <Form>
              <LeftNameFieldContainer className="container">
                <FormField
                  name="first_name"
                  type="first_name"
                  placeholder="First Name"
                  placeholderTextColor="#969696"
                  errors={errors}
                />
              </LeftNameFieldContainer>
              <RightNameFieldContainer className="container">
                <FormField
                  name="last_name"
                  type="last_name"
                  placeholder="Last Name"
                  placeholderTextColor="#969696"
                  errors={errors}
                />
              </RightNameFieldContainer>
              <FormField
                name="email"
                type="email"
                placeholder="Email"
                placeholderTextColor="#969696"
                errors={errors}
              />
              <FormField
                name="password"
                type="password"
                placeholder="Password"
                placeholderTextColor="#969696"
                errors={errors}
              />

              <CreateUserButton
                type="create-uses"
                className="button is-link"
                disabled={isSubmitting}
              >
                Register
              </CreateUserButton>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </ViewPageTableContainer>
  );
}

export default AddUserPage;
