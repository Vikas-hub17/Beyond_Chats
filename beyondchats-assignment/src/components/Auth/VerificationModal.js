import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const VerificationModal = ({ onComplete }) => {
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
        <button onClick={onComplete}>Verify</button>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default VerificationModal;