import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FiCheckCircle, FiAlertCircle, FiLoader, FiClock } from 'react-icons/fi';
import ScrapedDataModal from '../components/SetupOrg/ScrapedDataModal';
import {theme} from '../styles/theme';

// Dummy data configuration
const DUMMY_PAGES = [
  {
    id: 1,
    url: 'https://example.com/about',
    status: 'completed',
    lastScraped: new Date().toISOString(),
    chunks: [
      { id: 1, content: 'About our innovative company...', tokens: 150 },
      { id: 2, content: 'Our mission: Transforming industries...', tokens: 95 }
    ]
  },
  {
    id: 2,
    url: 'https://example.com/products',
    status: 'in-progress',
    lastScraped: null,
    chunks: [
      { id: 1, content: 'Product loading...', tokens: 0 }
    ]
  },
  {
    id: 3,
    url: 'https://example.com/contact',
    status: 'pending',
    lastScraped: null,
    chunks: []
  }
];

// Animations
const progressPulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components

const SuccessBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.success};
  margin-top: ${theme.spacing.md};
`;

const ProgressFill = styled.div`
  width: ${props => props.$progress}%;
  height: 100%;
  background: ${theme.colors.primary};
  border-radius: 4px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${progressPulse} 1.5s infinite;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadow.md};
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 1rem;
    padding: ${theme.spacing.md};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.xl};
  transition: opacity 0.2s;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.sm};
  font-weight: 500;
  color: ${theme.colors.textPrimary};
`;

const WebsiteInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }
`;

const ScrapingProgressSection = styled.section`
  margin-top: ${theme.spacing.xl};
`;

const PageList = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  margin-top: ${theme.spacing.md};
`;

const PageItem = styled.div`
  padding: ${theme.spacing.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  background-color: ${props => 
    props.$isSelected ? theme.colors.backgroundHover : 'transparent'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.backgroundHover};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${theme.colors.border};
  }
`;

const PageInfo = styled.div`
  flex-grow: 1;
`;

const PageUrl = styled.div`
  font-weight: 500;
  color: ${theme.colors.textPrimary};
`;

const PageStatus = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary};
`;

const ProgressContainer = styled.div`
  margin-top: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ProgressWrapper = styled.div`
  flex-grow: 1;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
`;

const ProgressText = styled.div`
  margin-top: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textSecondary};
`;

const StatusIndicator = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => ({
    completed: theme.colors.success,
    'in-progress': theme.colors.primary,
    pending: theme.colors.gray[300],
    error: theme.colors.error
  }[props.$status])};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ActionButton = styled.button`
  ${theme.button.primary};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  transition: all 0.2s;
  
  &:disabled {
    ${theme.button.disabled};
    transform: none;
  }
`;

const InputGroup = styled.div`
  display: grid;
  gap: ${theme.spacing.sm};
  grid-template-columns: 1fr auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ErrorAlert = styled.div`
  ${theme.alert.error};
  animation: ${fadeIn} 0.3s;
`;

const SetupOrganization = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    selectedPage: null,
    website: '',
    pages: DUMMY_PAGES,
    trainingProgress: 0,
    isTraining: true,
    isLoading: false,
    error: null
  });

  const StatusIcon = ({ status }) => {
    const iconProps = {
      size: 18,
      style: {
        color: 'black',
        strokeWidth: 2.5
      }
    };
  
    switch(status) {
      case 'completed':
        return <FiCheckCircle {...iconProps} />;
      case 'in-progress':
        return <FiLoader/>;
      case 'pending':
        return <FiClock />;
      case 'error':
        return <FiAlertCircle />;
      default:
        return <FiClock />;
    }
  };

  // Simulate async training progress
  useEffect(() => {
    let interval;
    if (state.isTraining) {
      interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          trainingProgress: Math.min(prev.trainingProgress + 10, 100),
          isTraining: prev.trainingProgress < 100
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isTraining]);

  const handleContinue = () => {
    if (state.trainingProgress < 100) {
      if (window.confirm('Training incomplete. Proceed anyway?')) {
        navigate('/integration');
      }
    } else {
      navigate('/integration');
    }
  };

  const handleWebsiteSubmit = async (e) => {
    e.preventDefault();
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setState(prev => ({
        ...prev,
        pages: DUMMY_PAGES,
        trainingProgress: 0,
        isTraining: true,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({ ...prev, error, isLoading: false }));
    }
  };

  return (
    <Container>
      <h2>Organization Setup</h2>

      <form onSubmit={handleWebsiteSubmit}>
        <FormGroup>
          <Label>Company Name</Label>
          <WebsiteInput
            type="text"
            required
            placeholder="Enter company name"
            disabled={state.isLoading}
          />
        </FormGroup>

        <FormGroup>
          <Label>Website URL</Label>
          <InputGroup>
            <WebsiteInput
              type="url"
              value={state.website}
              onChange={(e) => setState(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://example.com"
              required
              disabled={state.isLoading}
            />
            <ActionButton type="submit" disabled={state.isLoading}>
              {state.isLoading ? <FiLoader className="spin" /> : 'Start Scraping'}
            </ActionButton>
          </InputGroup>
        </FormGroup>
      </form>

      {state.error && (
        <ErrorAlert>
          <FiAlertCircle />
          Failed to initialize scraping: {state.error.message}
        </ErrorAlert>
      )}

      {state.pages.length > 0 && (
        <ScrapingProgressSection>
          <h3>Scraping Progress</h3>
          <PageList>
            {state.pages.map(page => (
              <PageItem
                key={page.id}
                onClick={() => !state.isLoading && setState(prev => ({ ...prev, selectedPage: page }))}
                $isSelected={state.selectedPage?.id === page.id}
                $disabled={state.isLoading}
              >
                <StatusIndicator $status={page.status}>
                <StatusIcon status={page.status} />
                </StatusIndicator>
                <PageInfo>
                  <PageUrl>{page.url}</PageUrl>
                  <PageStatus>
                    {page.status === 'completed' && 
                      `Scraped: ${new Date(page.lastScraped).toLocaleDateString()}`}
                    {page.status === 'in-progress' && 'Scraping in progress...'}
                    {page.status === 'pending' && 'Waiting to start'}
                  </PageStatus>
                </PageInfo>
              </PageItem>
            ))}
          </PageList>
        </ScrapingProgressSection>
      )}

      <ProgressContainer>
        <ProgressWrapper>
          <ProgressBar>
            <ProgressFill $progress={state.trainingProgress} />
          </ProgressBar>
          <ProgressText>
            {state.isTraining ? (
              <>
                <FiLoader className="spin" />
                Training: {state.trainingProgress}%
              </>
            ) : (
              <SuccessBadge>
                <FiCheckCircle />
                Training Complete!
              </SuccessBadge>
            )}
          </ProgressText>
        </ProgressWrapper>

        <ActionButton
          onClick={handleContinue}
          disabled={state.isTraining && state.trainingProgress < 100}
        >
          {state.trainingProgress === 100 ? 'Next Step' : 'Continue Early'}
        </ActionButton>
      </ProgressContainer>

      <ScrapedDataModal
        isOpen={!!state.selectedPage}
        onClose={() => setState(prev => ({ ...prev, selectedPage: null }))}
        data={state.selectedPage?.chunks || []}
      />
    </Container>
  );
};

export default SetupOrganization;