import React from 'react';
import { Link } from 'react-router-dom'
import SongShow from '../Song_Show/song_show_container'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    debugger
    this.props.fetchUser(this.props.match.params.username)
    this.props.fetchSongsByArtist(this.props.match.params.username)
  }

  handlePlay(song){
    this.props.playSong(song);
  }

  render() {
    
    if (this.props.user === undefined) return null

   let artistSongs;

   if (this.props.songs === {}) {
     return(
       <>
       <li>This artist has no songs!</li>
       </>
     )
   } else {
     
    artistSongs = Object.values(this.props.songs).map(song => (
      <>
      <li key={song.id}>
        <button onClick={()=> this.handlePlay(song)}>Play {song.title}</button>
        <Link to={`/${this.props.user.username}/${song.title.split(' ').join('-')}`}>{song.title}</Link>
      </li>
      </>
    ))
   }

   debugger

    return(
    <>
    <img src={this.props.user.coverUrl} className='coverPic'/>
    <img src={this.props.user.profileUrl} className='proPic'/>
    <h1 className='usernameProf'>{this.props.user.username}</h1>
    <div className='profileOptions'>
      <section className='profileSections'>
        <button>All</button>
        <button>Popular tracks</button>
        <button>Tracks</button>
        <button>Albums</button>
        <button>Playlists</button>
        <button>Reposts</button>
      </section>
      <section>
        <button>Station</button>
        <button>Follow</button>
        <button>Share</button>
        <button>Mail</button>
        <button>...</button>
      </section>
    </div>
    <div> 
    {artistSongs}
    </div>
    </>
    )
  }
}

export default Dashboard;