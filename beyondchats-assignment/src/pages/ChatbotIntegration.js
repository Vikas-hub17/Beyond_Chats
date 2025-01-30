import React, { useState } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import IntegrationInstructions from '../components/ChatbotIntegration/IntegrationInstructions';

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

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin: 2rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
`;

const ChatbotIntegration = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [integrationStatus, setIntegrationStatus] = useState(null);

  const handleTestIntegration = () => {
    setTimeout(() => {
      setIntegrationStatus(Math.random() > 0.5 ? 'success' : 'error');
    }, 1500);
  };

  return (
    <Container>
      <h2>Chatbot Integration</h2>
      
      <ButtonGroup>
        <ActionButton onClick={() => setShowInstructions(true)}>
          Integrate on Website
        </ActionButton>
        
        <ActionButton onClick={handleTestIntegration}>
          Test Integration
        </ActionButton>
      </ButtonGroup>

      {showInstructions && (
        <IntegrationInstructions onClose={() => setShowInstructions(false)} />
      )}

      {integrationStatus === 'success' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Confetti recycle={false} numberOfPieces={200} />
          {/* Success UI components here */}
        </div>
      )}
    </Container>
  );
};

export default ChatbotIntegration;