import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import store from './store/index';

ReactDOM.render(
  <Auth0Provider
    domain='dev-vvp3uo1u.us.auth0.com'
    clientId='ARs0Uv6UHlC61HeojUuZiTxz2fTnYMgm'
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </Auth0Provider>,

  document.getElementById('root')
);
