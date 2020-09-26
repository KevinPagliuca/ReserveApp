import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Routes from './routes';

import store from './store';
import './global.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter >
        <Header />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
