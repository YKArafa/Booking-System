import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthContext } from './context/AuthContext';

const Root = () => {
  const [user, setUser] = React.useState("");
  
  return (
    <React.StrictMode>
      <AuthContext.Provider value={{ user, setUser }}>
        <App />
      </AuthContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />); 