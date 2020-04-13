import React from 'react';
import Modal from '../modal/modal';
import {Link} from 'react-router-dom'

class Greeting extends React.Component {
  constructor(props){
    super(props);
    this.state = {search: '', showsearch: 'noshowsearch'}
  }
  componentDidMount() {
    this.props.fetchPlaylists()
  }

  update(field) {
    debugger
    return e => {
     
      if (e.currentTarget.value.length > 0) {
       
        this.setState({[field]: e.currentTarget.value, showsearch: 'showsearch2'})
    
        this.props.fetchSearch(e.currentTarget.value)
        
      } else {
        
        this.setState({[field]: e.currentTarget.value, showsearch: 'noshowsearch'})
      }
    }
  }

  render() {
  let { currentUser, logout, openModal } = this.props;


  const firstp = this.props.playlists.slice(0, 5).map(playlist =>(
    <>
      <div key={playlist.id}className='playlistshow'>
        <img className='playpic'src={playlist.imageUrl}/>
        <Link to={`/${playlist.username.split(' ').join('-')}/sets/${playlist.permalink}`} className='playtit'>{playlist.title}</Link>
      </div>
    </>
  ))

  const secondp = this.props.playlists.slice(5, 10).map(playlist =>(
    <>
      <div key={playlist.id} className ='playlistshow'>
        <img className='playpic'src={playlist.imageUrl}/>
        <Link to={`/${playlist.username.split(' ').join('-')}/sets/${playlist.permalink}`} className='playtit'>{playlist.title}</Link>
      </div>
    </>
  ))

  let searched;
  let results = null;
  if (this.props.search && this.props.search !== {}) {
    
    results = this.props.search.map(search => {
      if (search.catagory === 'song') {
        return (<>
          <Link to={`/${search.user.split(' ').join('-')}/${search.hyperlink}`} className='searchres'>
            &#9862; {search.title}
          </Link>
        </>)
      } else if (search.catagory === 'playlist') {
        return (<>
          <Link to={`/${search.user.username.split(' ').join('-')}/sets/${search.permalink}`} className='searchres'>
            &#9862; {search.title}
          </Link>
        </>)
      } else if (search.catagory === 'user') {
        return (<>
          <Link to={`/${search.username.split(' ').join('-')}`}className='searchres'>
            &#9862; {search.username}
          </Link>
        </>)
      }
      
    })
  }
  searched = (
    <>
    <Link to={`/search?q=${this.state.search}`}className='searching'>
      <div className='clicklink'>
      Search for "{this.state.search}"
      </div>
    </Link>
    {results}
    
    </>
  )

  return (
    <> 
    <Modal />
    <div className='pianoCont'>
      <img src={window.pianoPlayer} alt="PianoPlayer" className="pianoImg"/>
      <div className="overImage">
        <h2 className="header">What's next in music is first on CloneCloud</h2>
        <p className='text'>Upload your first track and begin your journey. CloneCloud gives you space to create, find your fans, and connect with other artists.</p>
      </div>
    </div>
    <nav className="login-signup">
      <button onClick={() => openModal('verifyUsername')} className='loginButton'>Sign In</button>
      <button onClick={() => openModal('verifyUsername')} className='signupButton'>Create Account</button>
    </nav>

    <br></br>

    <div className='search-submit'>
    
      <div className='headerSearch'>
        <input type='text' onChange={this.update('search')} placeholder='Search for artist, bands, tracks and podcasts' className='searchBar'/>
        <div className={this.state.showsearch}>{searched}</div>
        <div className='buttonBackS'>
          <button className='searchButton'></button>
      </div>
      </div>
    <p className='or'>or</p>
    <button className='upload'>Upload your own</button>
    </div>
    
    
    
    <div>
      <h2 className='subHead'>Hear what’s trending for free in the CloneCloud community</h2>
    </div>

    <div className='splashplaylists'>
      {firstp}
    </div>

    <div className='splashplaylists'>
      {secondp}
    </div>

    

    <br></br>

    <button className='exploreTrending'>Explore trending playlist</button>
    <div className='neverStop'>

    <img src={window.iPhone} alt="iPhone" className="iPhone"/>
    <img src={window.iPad} alt="iPhone" className="iPad"/>
    <div className='dontStop'>
      <h2 className='neverHeader'>Never stop listening</h2>
      <div className='line'></div>
      <p className='neverNotes'>CloneCloud is available on Web, iOS, Android, Sonos, Chromecast, and Xbox One.</p>
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
          <p>Get on CloneCloud to connect with fans, share your sounds, and grow your audience. What are you waiting for?</p>
          <button className='findOut'>Find out more</button>
        </div>
    </div>

    <div className='bottomStuff'>
    <h2 className='thanksFor'>Thanks for listening. Now join in.</h2>
    <p className='thanksNotes'>Save tracks, follow artists and build playlists. All for free.</p>
    <button onClick={() => openModal('verifyUsername')} className='signupButtontwo'>Create Account</button>
    <div className='lastSignIn'>
      <p className='alreadyHave'>Already have an account?</p>
      <button onClick={() => openModal('verifyUsername')} className='loginButtonTwo'>Sign In</button>
    </div>
    
    </div>
    </>
  )
  }
};


export default Greeting;
