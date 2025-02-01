// src/routes/ChatbotPreview.js
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';
import { theme } from '../styles/theme';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.md};
  background: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.md};
`;

const Message = styled.div`
  padding: ${theme.spacing.sm};
  margin: ${theme.spacing.sm} 0;
  background: ${props => props.$bot ? theme.colors.background : theme.colors.primary};
  color: ${props => props.$bot ? theme.colors.textPrimary : theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  max-width: 70%;
  align-self: ${props => props.$bot ? 'flex-start' : 'flex-end'};
`;

const InputWrapper = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const Input = styled.input`
  flex: 1;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
  }
`;

const SendButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  &:disabled {
    opacity: 0.7;
  }
`;

function ChatbotPreview() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, bot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: "Thank you for your message! This is a demo response.", bot: true }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <Container>
      <h1>Chatbot Preview</h1>
      <MessageContainer aria-live="polite">
        {messages.map((msg, i) => (
          <Message key={i} $bot={msg.bot}>
            {msg.text}
          </Message>
        ))}
        {loading && <Message $bot={true}>...</Message>}
      </MessageContainer>
      
      <InputWrapper>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          aria-label="Chat input"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <SendButton 
          onClick={handleSend} 
          disabled={loading}
          aria-label="Send message"
        >
          <FiSend />
        </SendButton>
      </InputWrapper>
    </Container>
  );
}

export default ChatbotPreview;