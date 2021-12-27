import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../context';

const PublicRoute = (props) => {
  const auth = useContext(AuthContext);

  // fix this
  return auth.isAuthenticated ? (
    <Redirect to="/customers" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};

export default PublicRoute;
