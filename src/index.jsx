import React from 'react';
import { render } from 'react-dom';
import './styles.scss';
// React Components
import App from './App.jsx';
import SessionLobby from './SessionLobby.jsx';

// create an element that React will render stuff into
const rootElement = document.createElement('div');

// put that element onto the page
document.body.appendChild(rootElement);

// have react render the JSX element into the root element.
// depending on url render either App or SessionLobby
const windowUrl = window.location.href;
if (windowUrl.includes('session')) {
  render(<SessionLobby windowUrl={windowUrl} />, rootElement);
} else {
  render(<App />, rootElement);
}
