import React from "react";
import GreetingContainer from './splash/greeting_container';
import { Provider } from 'react-redux';
import DashboardContainer from './Dashboard/Dashboard_Container'
import Modal from './modal/modal';
import UploadContainer from './upload/upload_container'
import DiscoverContainer from './discover/discover_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import ContinuousPlayCont from './Continuous_Play/continuous_play_container'
import SongShowCont from './Song_Show/song_show_container'
import Playlist from './Dashboard/playlist'
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import NavBar from './nav_bar/nav_bar'
import Footer from './footer/footer'


const App = () => (
  <>
  <Route path='/' component={NavBar}/>
  <div className='mainBody'>
    <Switch>
      <Route exact path="/" component={GreetingContainer} />
      <ProtectedRoute exact path='/upload' component={UploadContainer}/>
      <Route exact path='/discover' component={DiscoverContainer} />
      {/* <Route path='/:username/sets' component={Playlist}/> */}
      <Route path='/:username' component={DashboardContainer} />
      <Route exact path='/:username/:hyperlink' component={SongShowCont}/>
    </Switch>
  {/* <Route path='/:username' component={DashboardContainer} /> */}
    <Switch>
      <Route path='/:username/sets' component={Playlist}/>
    </Switch>
    
  </div>
  {/* <Route path='/' component={Footer}/> */}
  <Route path='/' component={ContinuousPlayCont}/>
  </>
);

export default App;