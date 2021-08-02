/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting
import React from 'react'; // React Module
import { render } from 'react-dom'; // React Module
import './styles.scss'; // Style
import App from './App.jsx'; // React Component
import SessionLobby from './SessionLobby.jsx'; // React Component

/* ================================================================== */
/* ==================================================== INDEX SETUP = */
/* ================================================================== */
// create an element that React will render stuff into
const rootElement = document.createElement('div');

// put that element onto the page
document.body.appendChild(rootElement);

// have react render the JSX element into the root element.
// depending on url render either App or SessionLobby
/* ======================================================== RENDER = */
const windowUrl = window.location.href;
if (windowUrl.includes('session')) {
  render(<SessionLobby windowUrl={windowUrl} />, rootElement);
} else {
  render(<App />, rootElement);
}
