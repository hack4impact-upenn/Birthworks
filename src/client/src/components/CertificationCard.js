import styled from 'styled-components/macro';
import CertificationBox from './CertificationBox';
import 'bulma/css/bulma.min.css';

const NameHeading = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-top: 2 rem;
  margin-bottom: 0.5rem;
`;

const ListContainer = styled.div`
  margin-top: 1 rem;
  margin-bottom: 10 rem;
`;

/**
 * Wrapper component that generates a list of certification boxes
 * from all the certification the customer has
 * @param {*} certifications the certifications of the user
 * @param {*} customer The customer we are displaying
 */
function CertificationCard({ certifications, customer }) {
  const certificationList = certifications.map((certification) => (
    <div className="block">
      <CertificationBox key={certification.id} certification={certification} />
    </div>
  ));

  var bodyContent;
  if (certifications.length === 0) {
    bodyContent = <p>No certifications found</p>;
  } else {
    bodyContent = <ListContainer>{certificationList}</ListContainer>;
  }

  return (
    <div className="container">
      <div className="block">
        <NameHeading>
          {customer.last_name}, {customer.first_name}
        </NameHeading>
      </div>
      {bodyContent}
    </div>
  );
}

export default CertificationCard;
