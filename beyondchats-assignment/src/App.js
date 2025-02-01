import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Registration from './pages/Registration';
import SetupOrganization from './pages/SetupOrganization';
import ChatbotIntegration from './pages/ChatbotIntegration';
import ChatbotPreview from './routes/ChatbotPreview';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
        <Route path="/chatbot-preview" element={<ChatbotPreview />} />
          <Route path="/" element={<Registration />} />
          <Route path="/setup" element={<SetupOrganization />} />
          <Route path="/integration" element={<ChatbotIntegration />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;