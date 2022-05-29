import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { UserGroupsContextProvider } from './store/UserGroupsContext';

ReactDOM.render(
  <UserGroupsContextProvider>
    <App />
  </UserGroupsContextProvider>,
  document.getElementById('app')
);
