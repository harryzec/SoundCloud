import React from 'react';
import Modal from '../modal/modal';

class Greeting extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
  let { currentUser, logout, openModal } = this.props;
  return (
    <> 
    <div className='pianoCont'>
      <img src={window.pianoPlayer} alt="PianoPlayer" className="pianoImg"/>
      <div className="overImage">
        <h2 className="header">What's next in music is first on SoundCloud</h2>
        <p className='text'>Upload your first track and begin your journey. SoundCloud gives you space to create, find your fans, and connect with other artists.</p>
      </div>
    </div>
    <nav className="login-signup">
      <button onClick={() => openModal('verifyUsername')} className='loginButton'>Login</button>
      <button onClick={() => openModal('verifyUsername')} className='signupButton'>Signup</button>
    </nav>

    <br></br>

    <div className='search-submit'>
      <form className='headerSearch'>
      <input className='searchBar'type='text' placeholder='Search for artist, bands, tracks and podcasts'></input>
      <button className='searchButton'>🔍</button>
      </form>
    <p className='or'>or</p>
    <button className='upload'>Upload your own</button>
    </div>

    <div>
      <h2 className='subHead'>Hear what’s trending for free in the SoundCloud community</h2>
    </div>

    <br></br>

    <button className='exploreTrending'>Explore trending playlist</button>
    <div className='neverStop'>

    <img src={window.iPhone} alt="iPhone" className="iPhone"/>
    <img src={window.iPad} alt="iPhone" className="iPad"/>
    <div className='dontStop'>
      <h2 className='neverHeader'>Never stop listening</h2>
      <div className='line'></div>
      <p className='neverNotes'>SoundCloud is available on Web, iOS, Android, Sonos, Chromecast, and Xbox One.</p>
      <div className='download'>
        <button className='Apple'>Download on the App Store</button>
        <button className='Google'>GET IT ON Google play</button>
      </div>
      
    </div>
    </div>


    <div className='friends'>
      <img src={window.happyFriend} alt="happyFriend" className="friendImg"/>
        <div className='onPic'>
          <h2>Calling all creators</h2>
          <p>Get on SoundCloud to connect with fans, share your sounds, and grow your audience. What are you waiting for?</p>
          <button className='findOut'>Find out more</button>
        </div>

      <img src={window.yachty} alt="YachtyPlayer" className="yachtyImg"/>   
    </div>
    
    
    </>
  )
  }
};


export default Greeting;
