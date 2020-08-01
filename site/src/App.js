import React from 'react';
import logo from './logo.svg';
import './App.css';
import LeagueList from './components/LeagueList'

function App() {
  return (
    <div className="App">
      <h2>Welcome to Skatebook.</h2>
      <p>This is an in development site intended to provide information on roller derby leagues and their events. Updates are intermittent, but this should be something useful soon.</p>
      <LeagueList />
    </div>
  );
}

export default App;
