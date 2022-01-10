import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 10px;
`;

const ViewPageTableContainer = ({ children }) => {
  return <PageContainer>{children}</PageContainer>;
};

export default ViewPageTableContainer;
