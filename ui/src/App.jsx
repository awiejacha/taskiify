import React from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import TasksTable from './components/TasksTable';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <TasksTable />
      </div>
    </RecoilRoot>
  );
}

export default App;
