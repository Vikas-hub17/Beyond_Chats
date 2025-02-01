import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { FiCheckCircle, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
`;

const CodeInput = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 1.2rem;
  margin: 0 4px;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

// Add success message animation
const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const SuccessMessage = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${theme.colors.success};
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  box-shadow: ${theme.shadow.lg};
  animation: ${slideIn} 0.3s ease-out;
  z-index: 1000;
`;

const VerificationModal = ({ onComplete }) => {
  const [verifying, setVerifying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    setVerifying(true);
    // Simulate verification delay
    setTimeout(() => {
      setVerifying(false);
      setShowSuccess(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 1500);
  };


  return (
    <ModalBackdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ModalContent
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <h3>Enter Verification Code</h3>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          {[...Array(6)].map((_, i) => (
            <CodeInput key={i} type="text" maxLength="1" />
          ))}
        </div>
        <button onClick={handleVerify} disabled={verifying}>
        {verifying ? <FiLoader className="spin" /> : 'Verify'}
      </button>

      {showSuccess && (
        <SuccessMessage>
          <FiCheckCircle size={24} />
          Successfully logged in!
        </SuccessMessage>
      )}
      </ModalContent>
    </ModalBackdrop>
  );
};

export default VerificationModal;