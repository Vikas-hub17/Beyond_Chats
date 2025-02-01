import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FiArrowRight, FiLock, FiMail, FiUser } from 'react-icons/fi';
import VerificationModal from '../components/Auth/VerificationModal';
import { theme } from '../styles/theme';
import { FcGoogle } from 'react-icons/fc';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  max-width: 500px;
  margin: 4rem auto;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadow.lg};
  animation: ${fadeIn} 0.4s ease-out;
  border: 1px solid ${theme.colors.border};

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 2rem;
    padding: ${theme.spacing.lg};
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: ${theme.spacing.xxl};
  color: ${theme.colors.textPrimary};
  text-align: center;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xxl};
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.lg};
`;

const InputIcon = styled.span`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textSecondary};
  display: flex;
  align-items: center;
  opacity: 0.3;
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  padding-left: calc(${theme.spacing.xxl} + ${theme.spacing.sm});
  background: ${theme.colors.backgroundSecondary};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}15;
    outline: none;
  }

  &::placeholder {
    color: transparent;
  }
`;

const FloatingLabel = styled.label`
  position: absolute;
  left: calc(${theme.spacing.xxl} + ${theme.spacing.sm});
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textSecondary};
  transition: all 0.2s ease;
  pointer-events: none;
  background: ${theme.colors.background};
  padding: 0 4px;
  
  ${Input}:focus ~ &,
  ${Input}:not(:placeholder-shown) ~ & {
    top: -8px;
    left: ${theme.spacing.lg};
    font-size: 0.85rem;
    color: ${theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${theme.shadow.md};
  }

  &:disabled {
    background: ${theme.colors.backgroundSecondary};
    color: ${theme.colors.textSecondary};
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  color: ${theme.colors.textSecondary};
  margin: ${theme.spacing.xxl} 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${theme.colors.border};
  }
`;

const GoogleModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  padding: 2rem;
  z-index: 1000;
  text-align: center;
`;

const GoogleHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  
  img {
    width: 75px;
    height: 24px;
  }
`;

const GoogleInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 16px;
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1557b0;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;
`;

const GoogleLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  width: 100%;
  padding: ${theme.spacing.md};
  background: white;
  color: rgba(0,0,0,0.8);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.backgroundSecondary};
    transform: translateY(-1px);
  }
`;

const Registration = () => {
  const [state, setState] = useState({
    showVerification: false,
    loading: false,
    errors: {}
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    setTimeout(() => {
      setState({
        showVerification: true,
        loading: false,
        errors: {}
      });
    }, 1500);
  };

  const handleVerificationComplete = () => {
    navigate('/setup');
  };

  const handleGoogleLogin = () => {
    // Show Google-style modal
    setState(prev => ({ ...prev, showGoogleModal: true }));
  };

  const handleDummyGoogleAuth = () => {
    // Close modal and navigate after short delay
    setState(prev => ({ ...prev, showGoogleModal: false }));
    setTimeout(() => navigate('/setup'), 500);
  };


  return (
    <Container>
      <Title>Create Your Account</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <InputIcon><FiUser size={20} /></InputIcon>
          <Input 
            type="text" 
            id="name"
            placeholder=" "
            required 
            disabled={state.loading}
          />
          <FloatingLabel htmlFor="name">Full Name</FloatingLabel>
        </InputGroup>

        <InputGroup>
          <InputIcon><FiMail size={20} /></InputIcon>
          <Input 
            type="email" 
            id="email"
            placeholder=" "
            required 
            disabled={state.loading}
          />
          <FloatingLabel htmlFor="email">Email Address</FloatingLabel>
        </InputGroup>

        <InputGroup>
          <InputIcon><FiLock size={20} /></InputIcon>
          <Input 
            type="password" 
            id="password"
            placeholder=" "
            required 
            disabled={state.loading}
          />
          <FloatingLabel htmlFor="password">Password</FloatingLabel>
        </InputGroup>

        <SubmitButton type="submit" disabled={state.loading}>
          {state.loading ? (
            'Creating Account...'
          ) : (
            <>
              Continue <FiArrowRight />
            </>
          )}
        </SubmitButton>

        <Divider>OR</Divider>

        <GoogleLoginButton onClick={handleGoogleLogin}>
        <FcGoogle size={20} />
        Continue with Google
      </GoogleLoginButton>

      </Form>

      {state.showGoogleModal && (
        <>
          <Overlay />
          <GoogleModal>
            <GoogleHeader>
              <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" 
                   alt="Google" />
            </GoogleHeader>
            <h3>Sign in</h3>
            <p>Use your Google Account</p>
            
            <GoogleInput
              type="email"
              placeholder="Enter your email"
            />
            
            <GoogleButton onClick={handleDummyGoogleAuth}>
              Next
            </GoogleButton>
            
            <div style={{ marginTop: '1rem' }}>
              <button 
                onClick={() => setState(prev => ({ ...prev, showGoogleModal: false }))}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#1a73e8', 
                  cursor: 'pointer' 
                }}
              >
                Create account
              </button>
            </div>
          </GoogleModal>
        </>
      )}

      {state.showVerification && (
        <VerificationModal 
          onComplete={handleVerificationComplete}
          theme={theme}
        />
      )}
    </Container>
  );
};

export default Registration;