// src/context/AppContext.js
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// Add provider component
export const AppProvider = ({ children }) => {
  const [state, setState] = useState({});
  
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

// Export the context itself as default
export default AppContext;