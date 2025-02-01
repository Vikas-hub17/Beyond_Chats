import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { FiCopy, FiMail, FiShare2, FiCheckCircle, FiAlertTriangle, FiX, FiLoader } from 'react-icons/fi';
import { theme } from '../styles/theme';

// Animations
const modalInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const buttonHover = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`;

const successEntrance = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadow.lg};
  ${css`animation: ${modalInAnimation} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
    margin: 1rem;
    border-radius: ${theme.borderRadius.lg};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.backgroundHover};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  width: 90%;
  max-width: 800px;
  ${css`animation: ${modalInAnimation} 0.3s ease`};
`;

const ActionCard = styled.div`
  position: relative;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.backgroundSecondary};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadow.xl};
    border-color: ${theme.colors.primary};
    ${css`animation: ${buttonHover} 0.3s ease`};
  }
`;

const SuccessScreen = styled.div`
  position: relative;
  padding: ${theme.spacing.xl};
  background: linear-gradient(135deg, ${theme.colors.successLight} 0%, ${theme.colors.background} 100%);
  border-radius: ${theme.borderRadius.xl};
  margin-top: ${theme.spacing.xl};
  text-align: center;
  ${css`animation: ${successEntrance} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`};
`;

const FailureState = styled.div`
  padding: ${theme.spacing.xl};
  background: linear-gradient(135deg, ${theme.colors.errorLight} 0%, ${theme.colors.background} 100%);
  border-radius: ${theme.borderRadius.xl};
  margin-top: ${theme.spacing.xl};
  ${css`animation: ${modalInAnimation} 0.3s ease`};
`;

const AnimatedButton = styled.button`
  &:hover {
    animation: ${buttonHover} 0.3s ease;
  }
`;

const StatusIndicator = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ status }) => 
    status === 'success' ? theme.colors.success : theme.colors.error};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${successEntrance} 0.3s ease;
`;

const CodeBlock = styled.pre`
  position: relative;
  padding: ${theme.spacing.md};
  background: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.md};
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  overflow-x: auto;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadow.md};
  }
`;

const CopyButton = styled.button`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.primary}15;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.primary}30;
    transform: translateY(-1px);
  }

  svg {
    transition: transform 0.2s;
  }

  &:active svg {
    transform: scale(0.9);
  }
`;

const ActionGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.md};
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin: ${theme.spacing.xl} 0;
`;

const SocialButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 100px;
  background: ${({ network }) => 
    network === 'twitter' ? '#1DA1F2' : 
    network === 'linkedin' ? '#0A66C2' : '#1877F2'};
  color: white;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.shadow.md};
  }

  svg {
    transition: transform 0.2s;
  }

  &:hover svg {
    transform: rotate(-15deg);
  }
`;

function ChatbotIntegration() {
  const [state, setState] = useState({
    showPreview: false,
    showIntegration: false,
    integrationStatus: null,
    copied: false,
    emailSending: false,
    emailSent: false
  });
  const [integrationCode, setIntegrationCode] = useState('');
  const [integrationStatus, setIntegrationStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const { width, height } = useWindowSize();
  
  const sampleCode = `<!-- Beyond Chats Widget -->
  <script>
    window.beyondChatsConfig = {
      apiKey: "${integrationCode || 'YOUR_API_KEY'}",
      botId: "YOUR_BOT_ID",
      theme: "light"
    };
  </script>
  <script 
    async 
    src="https://cdn.beyondchats.com/widget.js">
  </script>`;

  const getStatusMessage = (status) => {
    const messages = {
      success: 'Integration successful!',
      error: 'Integration failed. Please try again.',
      pending: 'Integration in progress...'
    };
    return messages[status] || 'Unknown status';
  };

  // Add integration code handler
const handleIntegrationUpdate = (code) => {
  setIntegrationCode(code);
  setState(prev => ({
    ...prev,
    showIntegration: true
  }));
};

    // Add integration handler
    const handleIntegrationCode = async (integrationCode) => {
      try {
        setLoading(true);
        setIntegrationStatus('pending');
        
        // API call simulation
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setCode(integrationCode);
        setIntegrationStatus('success');
      } catch (error) {
        setIntegrationStatus('error');
      } finally {
        setLoading(false);
      }
    };

  // Integration test handler
  const handleIntegrationTest = () => {
    setState(prev => ({ ...prev, testing: true }));
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        integrationStatus: Math.random() > 0.2 ? 'success' : 'failed',
        testing: false
      }));
    }, 2000);
  };

  const copyCode = async () => {
    try {
      if (!sampleCode) {
        throw new Error('No code to copy');
      }
      
      await navigator.clipboard.writeText(sampleCode);
      setState(prev => ({ ...prev, copied: true }));
      
      // Reset copy status after 2 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, copied: false }));
      }, 2000);
      
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to copy code',
        copied: false 
      }));
    }
  };

  return (
    <Container>
<div>
  <StatusIndicator status={integrationStatus} />
  {integrationStatus && (
    <span>{getStatusMessage(integrationStatus)}</span>
  )}
</div>

<AnimatedButton 
      onClick={() => handleIntegrationCode(code)}
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Apply Integration'}
    </AnimatedButton>

      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: theme.spacing.xl,
        background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Chatbot Integration
      </h1>

      <ActionGrid>
        <ActionCard onClick={() => setState(prev => ({ ...prev, showPreview: true }))}>
          <h3>🛠️ Test Chatbot</h3>
          <p>Experience the chatbot interface in a live demo environment</p>
        </ActionCard>

        <ActionCard onClick={() => handleIntegrationUpdate(code)}>
          <h3>⚡ Integrate Now</h3>
          <p>Get implementation code or share instructions with your team</p>
        </ActionCard>

        <ActionCard 
          onClick={handleIntegrationTest} 
          disabled={state.testing}
          style={{ position: 'relative' }}
        >
          {state.testing && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FiLoader className="spin" />
            </div>
          )}
          <h3>🔍 Verify Integration</h3>
          <p>Confirm successful installation on your website</p>
        </ActionCard>
      </ActionGrid>

      {/* Preview Section */}
      {state.showPreview && (
        <div style={{ 
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: theme.colors.background
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing.md,
            borderBottom: `1px solid ${theme.colors.border}`
          }}>
            <button 
              onClick={() => setState(prev => ({ ...prev, showPreview: false }))}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.xs,
                padding: theme.spacing.sm,
                borderRadius: theme.borderRadius.sm,
                transition: 'all 0.2s'
              }}
            >
              <FiX /> Close Preview
            </button>
            <a
              href="#feedback"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.xs,
                color: theme.colors.primary
              }}
            >
              <FiAlertTriangle size={24}/> Chatbot not working as intended? Share feedback
            </a>
          </div>
          <iframe
            src="/chatbot-preview"
            style={{
              width: '100%',
              height: 'calc(100vh - 60px)',
              border: 'none'
            }}
            title="Chatbot Preview"
          />
        </div>
      )}

      {/* Integration Modal */}
      {state.showIntegration && (
      <ModalOverlay>
      <ModalContent>
      <CloseButton 
        onClick={() => setState(prev => ({ ...prev, showIntegration: false }))}
      >
        <FiX size={24} />
      </CloseButton>
            <div style={{ display: 'flex', gap: theme.spacing.xl }}>
              
              {/* Manual Integration */}
              <div style={{ flex: 1 }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                  <FiCopy /> Manual Setup
                </h2>
                <CodeBlock>
                {sampleCode}
                  <CopyButton onClick={copyCode}>
                    {state.copied ? (
                      <>
                        <FiCheckCircle style={{ color: theme.colors.success }} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FiCopy />
                        Copy
                      </>
                    )}
                  </CopyButton>
                </CodeBlock>
                <p style={{ color: theme.colors.textSecondary, fontSize: '0.9em' }}>
                  Add this code snippet to your website's &lt;head&gt; section
                </p>
              </div>

              {/* Email Integration */}
              <div style={{ flex: 1 }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                  <FiMail /> Share Instructions
                </h2>
                <input
                  type="email"
                  placeholder="developer@company.com"
                  style={{
                    width: '100%',
                    padding: theme.spacing.sm,
                    margin: `${theme.spacing.md} 0`,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: theme.borderRadius.md
                  }}
                />
                <button
                  onClick={async () => {
                    try {
                      setState(prev => ({ ...prev, emailSending: true }));
                      // Add your email sending logic here
                      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
                      setState(prev => ({ ...prev, emailSending: false, emailSent: true }));
                    } catch (error) {
                      setState(prev => ({ ...prev, emailSending: false, error: error.message }));
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: theme.spacing.md,
                    background: state.emailSent ? theme.colors.success : theme.colors.primary,
                    color: theme.colors.white,
                    border: 'none',
                    borderRadius: theme.borderRadius.md,
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                >
                  {state.emailSending ? (
                    <FiLoader className="spin" />
                  ) : state.emailSent ? (
                    '✅ Instructions Sent!'
                  ) : (
                    'Send Installation Guide'
                  )}
                </button>
              </div>
            </div>
        </ModalContent>
        </ModalOverlay>
      )}

      {/* Success State */}
      {state.integrationStatus === 'success' && (
        <SuccessScreen>
          <Confetti width={width} height={height} recycle={false} />
          <FiCheckCircle 
            size={80} 
            color={theme.colors.success} 
            style={{ marginBottom: theme.spacing.md }}
          />
          <h2 style={{ marginBottom: theme.spacing.sm }}>Integration Successful! 🚀</h2>
          <p style={{ color: theme.colors.textSecondary }}>
            Your chatbot is now ready to engage with visitors
          </p>

          <div style={{ 
            display: 'flex', 
            gap: theme.spacing.md,
            justifyContent: 'center',
            margin: `${theme.spacing.xl} 0`
          }}>
            <button
              style={{
                padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                background: theme.colors.primary,
                color: theme.colors.white,
                border: 'none',
                borderRadius: theme.borderRadius.md,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Explore Admin Panel
            </button>
            <button
              style={{
                padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                background: theme.colors.backgroundSecondary,
                color: theme.colors.textPrimary,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.md,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
             Start talking to your chatbot
            </button>
          </div>

          <div style={{ marginTop: theme.spacing.xl }}>
            <p style={{ color: theme.colors.textSecondary }}>
              Share your success with others
            </p>
            <div style={{ 
              display: 'flex',
              gap: theme.spacing.md,
              justifyContent: 'center',
              marginTop: theme.spacing.md
            }}>
              <SocialButton network="twitter">
                <FiShare2 /> Twitter
              </SocialButton>
              <SocialButton network="linkedin">
                <FiShare2 /> LinkedIn
              </SocialButton>
            </div>
          </div>
        </SuccessScreen>
      )}

      {/* Failure State */}
      {state.integrationStatus === 'failed' && (
        <FailureState>
        <div style={{
          padding: theme.spacing.xl,
          background: `linear-gradient(135deg, ${theme.colors.errorLight} 0%, ${theme.colors.background} 100%)`,
          borderRadius: theme.borderRadius.xl,
          marginTop: theme.spacing.xl,
          animation: `${modalInAnimation} 0.3s ease`
        }}>
          <FiAlertTriangle 
            size={48} 
            color={theme.colors.error} 
            style={{ marginBottom: theme.spacing.md }}
          />
          <h2 style={{ color: theme.colors.error }}>Integration Required</h2>
          <div style={{ 
            textAlign: 'left', 
            margin: `${theme.spacing.md} 0`,
            padding: theme.spacing.md,
            background: theme.colors.background,
            borderRadius: theme.borderRadius.md
          }}>
            <p style={{ marginBottom: theme.spacing.sm }}>
              Let's get you back on track:
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: theme.spacing.sm }}>
                ✅ Verify code installation
              </li>
              <li style={{ marginBottom: theme.spacing.sm }}>
                ✅ Check website accessibility
              </li>
              <li style={{ marginBottom: theme.spacing.sm }}>
                ✅ Allow DNS propagation time
              </li>
            </ul>
          </div>
          <div style={{ 
            display: 'flex',
            gap: theme.spacing.md,
            marginTop: theme.spacing.md
          }}>
            <button
              onClick={handleIntegrationTest}
              style={{
                padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                background: theme.colors.primary,
                color: theme.colors.white,
                border: 'none',
                borderRadius: theme.borderRadius.md,
                cursor: 'pointer'
              }}
            >
              Retry Verification
            </button>
            <button
              style={{
                padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                background: 'transparent',
                color: theme.colors.textPrimary,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.md,
                cursor: 'pointer'
              }}
            >
              Contact Support
            </button>
          </div>
        </div>
        </FailureState>
      )}
    </Container>
  );
}

export default ChatbotIntegration;