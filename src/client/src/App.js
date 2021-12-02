import { useMemo, useState } from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import auth from './api/auth';
import AppContainer from './components/AppContainer';
import PublicRoute from './components/routing/PublicRoute';
import PrivateRoute from './components/routing/PrivateRoute';
import { AuthContext } from './context';

// import pages
import LoginPage from './pages/authflow/LoginPage';
import RegisterPage from './pages/authflow/RegisterPage';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import AdminUserManagementPage from './pages/AdminUserManagementPage';
import ViewCustomersPage from './pages/ViewCustomersPage';
import CertificationCard from './components/CertificationCard';
import CertificationBox from './components/CertificationBox';
import PersonalInfoPage from './pages/PersonalInfoPage';
import MainTabPage from './pages/MainTabPage';
//import PersonalInfoBox from './components/PersonalInfoBox';

const queryCache = new QueryCache();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => auth.isAuthenticated
  );

  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      login: async (email, password) => {
        // This function call throws in the case of invalid credentials
        await auth.login(email, password);
        setIsAuthenticated(true);
        queryCache.clear();
      },
      logout: () => {
        auth.logout();
        setIsAuthenticated(false);
        queryCache.clear();
      },
    }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <AppContainer>
          <ReactQueryCacheProvider queryCache={queryCache}>
            {false && <ReactQueryDevtools />}
            <main>
              <Switch>
                <PublicRoute exact path="/" component={ViewCustomersPage} />
                <PublicRoute exact path="/login" component={LoginPage} />
                <PublicRoute exact path="/register" component={RegisterPage} />
                <PublicRoute exact path="/tab" component={MainTabPage} />
                <PublicRoute
                  exact
                  path="/users"
                  component={AdminUserManagementPage}
                />
                <PublicRoute
                  exact
                  path="/customers"
                  component={ViewCustomersPage}
                />
                <PublicRoute
                  exact
                  path="/personalinfo"
                  component={PersonalInfoPage}
                />
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={DashboardPage}
                />
                <Route exact={false} component={NotFoundPage} />
              </Switch>
            </main>
          </ReactQueryCacheProvider>
        </AppContainer>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
