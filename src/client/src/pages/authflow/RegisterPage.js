import { useContext } from 'react';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context';
import api from '../../api';
import FormField from '../../components/FormField';
import styled from 'styled-components';

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

function RegisterPage() {
  const auth = useContext(AuthContext);

  if (auth.isAuthenticated) {
    return <Redirect to="/customers" />;
  }

  async function handleSubmit(values, actions) {
    try {
      await api.post('/api/user/signup', values);
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
        fields = ['first_name', 'last_name', 'email', 'password'];
      }
      for (const field of fields) {
        actions.setFieldError(field, message);
      }
    }
  }

  return (
    <Container className="container">
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
            <Container2 className="container">
              <FormField
                name="first_name"
                type="first_name"
                placeholder="First Name"
                placeholderTextColor="#969696"
                errors={errors}
              />
            </Container2>
            <Container4 className="container">
              <FormField
                name="last_name"
                type="last_name"
                placeholder="Last Name"
                placeholderTextColor="#969696"
                errors={errors}
              />
            </Container4>
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
    </Container>
  );
}

export default RegisterPage;
