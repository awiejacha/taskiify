import React from 'react';
import { RecoilRoot } from 'recoil';
import './App.css';
import AppContainer from './components/AppContainer';
import './services/l18n';

function App() {
  return (
    <RecoilRoot>
      <AppContainer />
    </RecoilRoot>
  );
}

export default App;
