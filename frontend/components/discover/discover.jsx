import React from 'react';
import { Link } from 'react-router-dom'

class Discover extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // debugger
    this.props.fetchPlaylists()
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.logout().then(()=> this.props.history.push('/'))
  }

  handlePlay(song){
    this.props.playSong(song);
  }
  

  render() {
    // debugger
    if (this.props.recentplays === {}) {
      return null;
    }

    let values = Object.values(this.props.recentplays).reverse().slice(0,4)

    const recent = values.map(song => (
      <>
        <div className='recentSong'>
          <img className='recentPic'src={song.imgUrl} />
          <div className='recentInfo'>
            <p className='recentuser'>{song.user}</p>
            <p className='recenttitle'>{song.title}</p>
          </div>
        </div>
      </>
    ))
    debugger

    const firstp = this.props.playlists.slice(0, 4).map(playlist =>(
      <>
        <div className='playlistshow'>
          <img className='playpic'src={playlist.imageUrl}/>
          <p className='playtit'>{playlist.title}</p>
        </div>
      </>
    ))

    const secondp = this.props.playlists.slice(4, 8).map(playlist =>(
      <>
        <div className='playlistshow'>
          <img className='playpic'src={playlist.imageUrl}/>
          <p className='playtit'>{playlist.title}</p>
        </div>
      </>
    ))

    return(
      <>
      <div className='discoverMain'>
        <div className='musicSection'>
          <h3 className='newMusicNow'>New Music Now</h3>
          <p className='latestHits'>The latest hits, updated all the time</p>
          <div className='play1'>
          
          {firstp}
          </div>
          <h3 className='newMusicNow'>CloneCloud Charts</h3>
          <div className='play2'>
            {secondp}
          </div>
          
        </div>
        <div className='recentSection'>
          <h3 className='listenHis'>Listening History</h3>
          
          {recent}
          
        </div>
        
        
      </div>
      </>
    )
  }
}

export default Discover;