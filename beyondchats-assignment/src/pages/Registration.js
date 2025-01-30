import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GoogleLoginButton from '../components/Shared/GoogleButton';
import VerificationModal from '../components/Auth/VerificationModal';

const Container = styled.div`
  max-width: 480px;
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

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: 4px;
  font-weight: 500;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Registration = () => {
  const [showVerification, setShowVerification] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowVerification(true);
  };

  const handleVerificationComplete = () => {
    navigate('/setup');
  };

  return (
    <Container>
      <Title>Create Your Account</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Full Name" required />
        <Input type="email" placeholder="Email Address" required />
        <Input type="password" placeholder="Password" required />
        <SubmitButton type="submit">Continue</SubmitButton>
        <GoogleLoginButton />
      </Form>

      {showVerification && (
        <VerificationModal onComplete={handleVerificationComplete} />
      )}
    </Container>
  );
};

export default Registration;