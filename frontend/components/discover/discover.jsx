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
    this.props.fetchRandomUsers()
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
        <div key={song.id} className='recentSong'>
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
        <div key={playlist.id}className='playlistshow'>
          <img className='playpic'src={playlist.imageUrl}/>
          <p className='playtit'>{playlist.title}</p>
        </div>
      </>
    ))

    const secondp = this.props.playlists.slice(4, 8).map(playlist =>(
      <>
        <div key={playlist.id} className ='playlistshow'>
          <img className='playpic'src={playlist.imageUrl}/>
          <p className='playtit'>{playlist.title}</p>
        </div>
      </>
    ))

    let actual = this.props.currentuser.likes.slice(0,3).map(like => {
        
      return(
        <>
          <div className='likeshow'>
            <img src={like.imgUrl} width='50' height='50'/>
            <div className='likeInfo'>
              <Link className='likeuser' to={`/${like.username.split(' ').join('-')}`}>{like.username}</Link>
              <Link className='liketitle'to={`/${like.username.split(' ').join('-')}/${like.hyperlink}`}>{like.title}</Link>
              
              <div className='likestats'>
                <p className='likestat1'>&#9654; {like.plays}</p>
                <p className='likestat'>&#9829; {like.likes}</p>
                <p className='likestat3'>&#9998; {like.comments}</p>
              </div>
            </div>
          </div>
        </>
      )
    })

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
          <h3 className='listenHis'><img width='12' src='https://www.flaticon.com/premium-icon/icons/svg/2725/2725222.svg'/> Who to follow</h3>
          <h3 className='listenHis'><img width='12' src='https://www.flaticon.com/premium-icon/icons/svg/2725/2725161.svg'/> Likes</h3>
          {actual}
          <h3 className='listenHis'><img className='cale' width='12'src ='https://image.flaticon.com/icons/svg/747/747310.svg'/>  Listening History</h3>
          
          {recent}
          
        </div>        
      </div>
    
      
      </>
    )
  }
}

export default Discover;