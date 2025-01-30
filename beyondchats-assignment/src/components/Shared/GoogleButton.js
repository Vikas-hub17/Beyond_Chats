import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

const GoogleLoginButton = () => (
  <Button>
    <FcGoogle size={20} />
    Continue with Google
  </Button>
);

export default GoogleLoginButton;