import React from 'react';

import GlobalStyle from './styles/global';

import Signin from './pages/Signin';

import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      <Signin />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
