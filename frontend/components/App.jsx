import React from "react";
import GreetingContainer from './splash/greeting_container';
import { Provider } from 'react-redux';
import Modal from './modal/modal';
import DiscoverContainer from './discover/discover_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SongShowContainer from './song/song_show_container'
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import NavBar from './nav_bar/nav_bar'


const App = () => (
  <div>
      <Route path='/test' component={SongShowContainer}/>
      <Route exact path="/" component={GreetingContainer} />
      <Route path='/' component={NavBar}/>
      <Route exact path='/discover' component={DiscoverContainer} />
      <Modal />
  </div>
);

export default App;