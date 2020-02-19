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
        <img src={song.imgUrl} className='songImg1'/>
          <div className='songHelp'>
            <div className='playSong'onClick={()=> this.handlePlay(song)}><p className='playcon'>&#9654;</p></div>
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
      <img src={song.imgUrl} className='songImg1'/>
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
        <Link className='profileButtonsAll'>All</Link>
        <Link className='profileButtons'>Popular tracks</Link>
        <Link className='profileButtons'>Tracks</Link>
        <Link className='profileButtons'>Albums</Link>
        <Link className='profileButtons'>Playlists</Link>
        <Link className='profileButtons'>Reposts</Link>
      </section>
      <section className='profileExtra'>
        <Link className='extraButtons'><strong className='boldthis'><img width='10'  src='https://image.flaticon.com/icons/svg/1765/1765672.svg'></img></strong> Station</Link>
        <Link className='extraButtons'><strong className='boldthis'>&#62;</strong>  Share</Link>
        <Link className='extraButtons'><strong className='boldthis'>&#9998;</strong>  Edit</Link>
      </section>
    </div>

    <div className='profileBody'>
      <div className='musicSection'>
       <h2 className='recentHead'>Recent</h2>
        {artistSongs}
      </div>
      <div className='statsSection'>

      </div>
   
    </div>


    </>
    )
  }
}

export default Dashboard;