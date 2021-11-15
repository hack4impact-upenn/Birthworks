import { useContext } from 'react';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context';
import api from '../../api';
import FormField from '../../components/FormField';
import styled, { createGlobalStyle } from 'styled-components';

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 60px;
  max-width: 1000px !important;
  top: 100px;
`;

const Container2 = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  max-width: 500px !important;
  display: inline-block;
  width: 50%;
  padding-right: 1%;
`;

const Container3 = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  min-width: 35 px !important;
  display: inline-block;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: left;
`;

const Container4 = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  max-width: 500px !important;
  display: inline-block;
  width: 50%;
  padding-left: 1%;
`;

const CreateUserButton = styled.button`
  width: 15%;
  font-weight: 700;
  background-color: #b4579e !important;
  border-radius: 10px;
  margin-left: auto;
  display: block;
`;

const MenuButton1 = styled.button`
  width: 15%;
  font-weight: 700;
  text-align: left;
  font-size: 10px;
  background-color: #ffffff !important;
  color: #000000 !important;
  border: 10px #000000 !important;
  border-radius: 10px;
  margin-right: right;
  display: block;
`;

const MenuButton2 = styled.button`
  width: 10%;
  font-weight: 700;
  text-align: left;
  font-size: 10px;
  background-color: #ffffff !important;
  border: 10px #000000 !important;
  color: #000000 !important;
  border-radius: 1px;
  margin-right: left;
  display: block;
`;

const StyledField = styled.div`
  margin: 20px auto !important;
  width: 50%;
`;

const StyledHeader = styled.h4`
  text-align: left;
  margin: 10 !important;
  font-weight: 500;
`;

const inputStyles1 = {
  backgroundColor: 'white',
  color: 'rgba(220, 220, 220, 1)',
  borderRadius: '5px',
  padding: '10px 20px 8px 36px',
  border: 'none',
  width: '100%',
  fontFamily: 'Montserrat',
};

const GlobalStyle = createGlobalStyle`
  ::placeholder {
    color: rgba(150, 150, 150, 1) !important;
  }
  `;

function RegisterPage() {
  const auth = useContext(AuthContext);

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  async function handleSubmit(values, actions) {
    try {
      await api.post('/api/users/signup', values);
      await auth.login(values.email, values.password);
    } catch (error) {
      const { message, code } =
        error.response.status === 400
          ? error.response.data
          : { message: 'An unknown error occurred.', code: null };
      let fields;
      if (code === 'already-exists') {
        fields = ['email'];
      } else {
        fields = ['firstName', 'lastName', 'email', 'password'];
      }
      for (const field of fields) {
        actions.setFieldError(field, message);
      }
    }
  }

  return (
    <Container className="container">
      <GlobalStyle></GlobalStyle>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ errors, isSubmitting }) => (
          <Form>
            <Container3 className="container">
              <MenuButton1
                type="menu"
                className="button is-link"
                disabled={isSubmitting}
              >
                View Existing Users
              </MenuButton1>
              <MenuButton2
                type="menu"
                className="button is-link"
                disabled={isSubmitting}
              >
                Add Users
              </MenuButton2>
            </Container3>
            <Container3 className="container"></Container3>
            <Container2 className="container">
              <FormField
                name="firstName"
                type="firstName"
                placeholder="First Name"
                placeholderTextColor="#969696"
                errors={errors}
                style={inputStyles1}
              />
            </Container2>
            <Container4 className="container">
              <FormField
                name="lastName"
                type="lastName"
                placeholder="Last Name"
                placeholderTextColor="#969696"
                errors={errors}
                style={inputStyles1}
              />
            </Container4>
            <FormField
              name="name=email"
              type="email"
              placeholder="Email"
              placeholderTextColor="#969696"
              errors={errors}
              style={inputStyles1}
            />
            <FormField
              name="password"
              type="password"
              placeholder="Password"
              placeholderTextColor="#969696"
              errors={errors}
              style={inputStyles1}
            />

            <CreateUserButton
              type="create-uses"
              className="button is-link"
              disabled={isSubmitting}
            >
              Create User
            </CreateUserButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default RegisterPage;
