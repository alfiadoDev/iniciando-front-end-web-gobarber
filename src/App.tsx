import React from 'react';

import GlobalStyle from './styles/global';

import Signin from './pages/Signin';

import { AuthProvider } from './context/AuthContext';
import ToastContainer from './components/ToastContainer';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <Signin />
    </AuthProvider>

    <ToastContainer />

    <GlobalStyle />
  </>
);

export default App;
