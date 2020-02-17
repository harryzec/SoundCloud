import React from "react";
import GreetingContainer from './splash/greeting_container';
import { Provider } from 'react-redux';
import DashboardContainer from './Dashboard/Dashboard_Container'
import Modal from './modal/modal';
import UploadContainer from './upload/upload_container'
import DiscoverContainer from './discover/discover_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SongShowContainer from './Continuous_Play/continuous_play_container'
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import NavBar from './nav_bar/nav_bar'


const App = () => (
  <>
  <Route path='/' component={NavBar}/>
  <div className='mainBody'>
      <Route exact path="/" component={GreetingContainer} />
      <Route exact path='/discover' component={DiscoverContainer} />
      <ProtectedRoute exact path='/upload' component={UploadContainer}/>
      <Route exact path='/:user' component={DashboardContainer} />
      <Modal />
  </div>
  <Route path='/' component={SongShowContainer}/>
  </>
);

export default App;