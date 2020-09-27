import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Menu from './components/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';

import GlobalStyles from './styles/global';
import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <Menu />
    <Routes />
    <GlobalStyles />
  </Router>
);

export default App;
