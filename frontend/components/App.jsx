import React from "react";
import GreetingContainer from './splash/greeting_container';
import { Provider } from 'react-redux';
import Modal from './modal/modal';
import DiscoverContainer from './discover/discover_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';


const App = () => (
  <div>
      <Route exact path="/" component={GreetingContainer} />
      <ProtectedRoute exact path='/discover' component={DiscoverContainer} />
      <Modal />
  </div>
);

export default App;