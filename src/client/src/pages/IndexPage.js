import { AuthContext } from '../context';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';

function IndexPage() {
  const auth = useContext(AuthContext);
  if (auth.isAuthenticated) {
    return <Redirect to="/customers" />;
  } else {
    return <Redirect to="/login" />;
  }
}

export default IndexPage;
