import { useQuery } from 'react-query';
import api from '../api';
import CertificationPage from './CertificationPage';
import NotesCard from '../components/NotesCard';
import WorkshopCard from '../components/WorkshopCard';

function IndexPage() {
  // Example API request with caching, fetch list of users.
  // See https://react-query.tanstack.com/ for documentation on react-query.
  const { isLoading, error, data } = useQuery('users', () =>
    api.get('/api/users').then((res) => {
      console.log(res);
      return res.data;
    })
  );

  const certifications = [
    {
      entryDate: Date.now(),
      completionDate: Date.now(),
      recertificationDate: Date.now(),
      certificationDate: Date.now(),
      trainer: 'some trainer',
      name: 'some name',
    },
    {
      entryDate: Date.now(),
      completionDate: Date.now(),
      recertificationDate: Date.now(),
      certificationDate: Date.now(),
      trainer: 'cert trainer',
      name: 'another name',
    },
  ];

  const workshops = [
    {
      startDate: Date.now(),
      endDate: Date.now(),
      location: 'virtual',
      mentor: 'some trainer',
      name: 'some name',
    },
    {
      startDate: Date.now(),
      endDate: Date.now(),
      location: 'virtual',
      mentor: 'some trainer',
      name: 'some name',
    },
  ];

  return (
    <div className="container center">
      <header className="hero">
        <div className="hero-body">
          <h1 className="title">Hello world: Index</h1>
          <h2 className="subtitle">
            A list of users retrieved from <code>/api/users</code>.
          </h2>
        </div>
      </header>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        <p style={{ color: 'red' }}>An error occurred! {error}</p>
      ) : (
        <div className="is-flex is-flex-wrap-wrap">
          {data.result.map((user) => (
            <article key={user.id} className="box m-2">
              <p className="has-text-weight-bold">
                {user.firstName} {user.lastName}
              </p>
              <p>{user.email}</p>
            </article>
          ))}
          <CertificationPage certifications={certifications} />
        </div>
      )}
      <NotesCard />
      <WorkshopCard workshops={workshops} />
      <footer className="section">
        To be filled in with the actual app, soon! :)
      </footer>
    </div>
  );
}

export default IndexPage;
