import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AppPage, EnterPage } from './pages';
import { Provider } from 'react-redux';
import store from './store';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => 
            localStorage.access_token ? <Redirect to='/dashboard' /> : <EnterPage />
          } />
          <Route path="/dashboard" render={(props) => 
            !localStorage.access_token ? <Redirect to='/' /> : <AppPage />
          } />
        </Switch>
      </Router>
    </Provider>
    );
}

export default App;
