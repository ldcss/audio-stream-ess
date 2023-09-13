import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Nunito',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
