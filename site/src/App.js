import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Calendar from './components/Calendar';
import LeagueList from './components/LeagueList'
import './css/common.css'
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <h2>Welcome to Skatebook.</h2>
      <p>This is an in development site intended to provide information on roller derby stuff. Updates are intermittent, but this might be something useful someday.</p>

      <BrowserRouter>
        <div>
          <Switch>
              <>
                <Route path="/leagues" component={LeagueList}>
                </Route>
                <Route path="/events" component={Calendar} />
                <Route exact path="/" component={LeagueList} />
              </>
          </Switch>
        </div>
      </BrowserRouter>


    </div>
  );
}

export default App;
