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
import playlistshow from './playlist_show/playlist_show_container'
import searchContainer from './search_page/search_container'


const App = () => (
  <>
  <Route path='/' component={NavBar}/>
  <div className='mainBody'>
    {/* <Route exact path="/" component={GreetingContainer} />
    <ProtectedRoute exact path='/upload' component={UploadContainer}/>
    <Route path='/discover' component={DiscoverContainer} />
    <Route path='/:username' component={DashboardContainer} />
    <Route path='/search' component={searchContainer}/>
    <Route path='/:username/sets' component={Playlist}/>
    <Route exact path='/:username/:hyperlink' component={SongShowCont}/>
    <Route exact path='/:username/sets/:permalink' component={playlistshow}/> */}

    <Switch>
      <Route exact path="/" component={GreetingContainer} />
      <ProtectedRoute path='/upload' component={UploadContainer}/>
      <Route path='/discover' component={DiscoverContainer} />
      <Route exact path='/:username/sets/:permalink' component={playlistshow}/>  */}
      
      <Route exact path='/:username/:hyperlink' component={SongShowCont}/> 
      <Route path='/:username' component={DashboardContainer}/>
      
      

      
      
        
     
      <Route path='/search' component={searchContainer}/>
      <Route path='/search/sounds'/>
      <Route evact path='/:username/:hyperlink' component={SongShowCont}/> 
    
      
    </Switch>

    <Switch>
      <Route path='/:username/sets' component={Playlist}/>
    </Switch>
    
    
    
  </div>
  {/* <Route path='/' component={Footer}/> */}
  <Route path='/' component={ContinuousPlayCont}/>
  </>
);

export default App;