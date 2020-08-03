import React from 'react';

import { ToastProvider } from './toast';
import { AuthProvider } from '../context/AuthContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
