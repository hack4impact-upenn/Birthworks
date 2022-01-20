import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../context';

/**
 * Wrapper component that only allows access to the component, typically login,
 * if there is not already logged in and redirect thems to the main page if they are
 */
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
