import React from 'react';
import './App.css';
import NavBar from './NavBar';
import SideBar from './SideBar';
import ChatView from './ChatView';

const App: React.FC = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="main-layout">
        <SideBar />
        <ChatView />
      </div>
    </div>
  );
};

export default App;