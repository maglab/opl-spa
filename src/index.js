import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import { createTheme , ThemeProvider} from '@mui/material';
import { blue, blueGrey } from '@mui/material/colors';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/index'
const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: blueGrey[900],
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
        <App />

        </ThemeProvider>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
