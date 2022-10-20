import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Trivia from './pages/trivia';
import Settings from './pages/settings';
import Feedback from './pages/feedback';
import Ranking from './pages/ranking';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/trivia" component={ Trivia } />
          <Route path="/settings" component={ Settings } />
          <Route path="/feedbacks" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </header>
    </div>
  );
}
