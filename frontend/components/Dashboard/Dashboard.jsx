import React from 'react';
import { Link } from 'react-router-dom'
import EditModal from '../edit_modal/edit_modal'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount(){
    debugger
    this.props.fetchUser(this.props.match.params.username)
    this.props.fetchSongsByArtist(this.props.match.params.username)
  }

  handlePlay(song){
    this.props.playSong(song);
  }

  handleEdit (e, song) {
    debugger
    e.preventDefault();
    this.props.openEditModal('edit', song)
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
   } 
    //  debugger
   debugger
    if (this.props.user.id === this.props.currentuser.id) {
      artistSongs = Object.values(this.props.songs).map(song => (
        <>
        <div className='songContainer'>
        <img src={song.imgUrl} className='songImg'/>
          <div className='songHelp'>
            <button onClick={()=> this.handlePlay(song)}>Play Button{song.title}</button>
            <p>      </p>
            <Link to={`/${this.props.user.username}/${song.hyperlink}`}>{song.title}</Link>
            <p>      </p>
            {this.props.user.username}
  
            <button onClick={e => this.handleEdit(e, song)}>Edit</button>
          </div>
          </div>
        </>
      ))
    } else {

     
    artistSongs = Object.values(this.props.songs).map(song => (
      <>
      <div className='songContainer'>
      <img src={song.imgUrl} className='songImg'/>
        <div className='songHelp'>
          <button onClick={()=> this.handlePlay(song)}>Play Button{song.title}</button>
          <p>      </p>
          <Link to={`/${this.props.user.username}/${song.hyperlink}`}>{song.title}</Link>
          <p>      </p>
          {this.props.user.username}
        </div>
        </div>
      </>
    ))
   }
  


    return(
    <>
    <EditModal/>
    <img src={this.props.user.coverUrl} className='coverPic'/>
    <img src={this.props.user.profileUrl} className='proPic'/>
    <h1 className='usernameProf'>{this.props.user.username}</h1>
    <div className='profileOptions'>
      <section className='profileSections'>
        <button className='profileButtons'>All</button>
        <button className='profileButtons'>Popular tracks</button>
        <button className='profileButtons'>Tracks</button>
        <button className='profileButtons'>Albums</button>
        <button className='profileButtons'>Playlists</button>
        <button className='profileButtons'>Reposts</button>
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