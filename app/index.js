import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

function main() {
  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(<App height={window.innerHeight-6} width={window.innerWidth-6} />, app);
}

main();
