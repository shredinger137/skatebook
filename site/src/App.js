import React from 'react';
import './App.css';
import Header from './components/Header';
import Calendar from './components/Calendar';
import LeagueList from './components/LeagueList'
import Signup from './components/Signup'
import Login from './components/Login'
import './css/common.css'
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <h2>Welcome to Skatebook.</h2>
        <p>This is an in development site intended to provide information on roller derby stuff. Updates are intermittent, but this might be something useful someday.</p>


        <div>
          <Switch>
            <>
              <Route path="/leagues" component={LeagueList}>
              </Route>
              <Route path="/events" component={Calendar} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route exact path="/" component={LeagueList} />
            </>
          </Switch>
        </div>
      </BrowserRouter>


    </div>
  );
}

export default App;
