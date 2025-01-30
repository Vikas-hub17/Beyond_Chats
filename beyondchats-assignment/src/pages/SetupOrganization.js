import React, { useState } from 'react';
import styled from 'styled-components';
import ScrapedPagesList from '../components/SetupOrg/ScrapedPagesList';
import ScrapedDataModal from '../components/SetupOrg/ScrapedDataModal';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 1rem;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
`;

const WebsiteInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SetupOrganization = () => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [website, setWebsite] = useState('');

  const handleFetchDescription = async () => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("Sample company description extracted from website");
      }, 1000);
    });
  };

  return (
    <Container>
      <h2>Setup Your Organization</h2>
      
      <FormGroup>
        <Label>Company Name</Label>
        <WebsiteInput type="text" required />
      </FormGroup>

      <FormGroup>
        <Label>Website URL</Label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <WebsiteInput
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            onBlur={handleFetchDescription}
            required
          />
        </div>
      </FormGroup>

      <FormGroup>
        <Label>Detected Pages</Label>
        <ScrapedPagesList onPageClick={setSelectedPage} />
      </FormGroup>

      {selectedPage && (
        <ScrapedDataModal
          data={selectedPage}
          onClose={() => setSelectedPage(null)}
        />
      )}
    </Container>
  );
};

export default SetupOrganization;