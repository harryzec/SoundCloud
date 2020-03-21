import React from 'react'
import { withRouter, Link } from 'react-router-dom'

class PlaylistForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { modalnumber: 'zero', title: ''}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const newPlaylist = new FormData();
    newPlaylist.append('playlist[title]', this.state.title)
    newPlaylist.append('playlist[user_id]', this.props.currentUser.id)
    
    this.props.createPlaylist(newPlaylist, this.props.song)

    this.setState({modalnumber: 'second'})
  }

  update(field) {
    return e => { this.setState({[field]: e.currentTarget.value})}
  }

  render() {
    debugger
    if (this.props.playlist.length !== 0) {
      const newPlaylistTrack = new FormData();
      newPlaylistTrack.append('PlaylistTrack[track_id]', this.props.song.id)
      newPlaylistTrack.append('PlaylistTrack[playlist_id]', this.props.playlist[0].id)
      this.props.createPlaylistTrack(newPlaylistTrack)
    }

    const {song} = this.props
    debugger

    let theForm;

    if (this.state.modalnumber === 'zero' && this.props.currentUser.playlists.length > 0) {

    let playlist = this.props.currentUser.playlists.reverse().slice(0, 4).map(playlist => {
      let button = (
        <div className=''>Add to playlist</div>
      )
      debugger
      
      // playlist.tracks.forEach(track => {
      //   if (track.id === this.props.song.id) {
      //     button = (
      //       <button>Added</button>
      //     )
      //   }
      // })

      return(
      <>
        <div className='addtoplay'>
          <div className='playpicinfo'>
            <div className='playpicz'></div>
            <div className='playtitandinfo'>
              <p className='playnameagain'>{playlist.title}</p>
              {/* {playlist.tracks.length} */}
            </div>

          </div>
          {button}
        </div>
      </>
    )})
      

    theForm = (
      <>
      <div className='addtoplaylist'>
        <div className='playlistheader'>
          <h2 className='createplay'><div className='partz'>Add to playlist</div></h2>
          <h2 onClick={() => this.setState({modalnumber: 'first'})} className='createplay2'><div className='partz'>Create a playlist</div></h2>
        </div>
        
        <input className='fiterplaylists' placeholder='Filter Playlists'/>

        {playlist}
      
       
      </div>
    </>
    )} else if (this.state.modalnumber === 'first' && this.props.currentUser.playlists.length > 0) {
      
      theForm = (
        <>
      <div className='playlistForm'>
        <div className='playlistheader'>
          <h2 onClick={() => this.setState({modalnumber: 'zero'})} className='createplay2'><div className='partz'>Add to playlist</div></h2>
          <h2 className='createplay'><div className='partz'>Create a playlist</div></h2>
        </div>

        <div className='playlistinfo'>
          <p className='whatsplaylist'>Playlist title <strong className='red'>*</strong></p>
          <input onChange={this.update('title')} className='playlisttitleinput'/>
        </div>

        <div className='playlistsave'>
          <button onClick={this.handleSubmit} className='playlistsavebutton'>Save</button>
        </div>

        
        <div className='playlistSongs'> 
          <div className='playlistdiv'>
            <div className='playsonginf'>
              <img width='20' src={song.imgUrl}/>
              <div className='playlistuser'>
                {song.user} 
              </div>
              <div className='playlistsongtit'>
                {song.title}
              </div>
            </div>
          </div>
          <div className='playlistdiv'>

          </div>
          <div className='playlistdiv'>

          </div>
          <div className='playlistdivlast'>
          </div>
        </div>

        

      </div>
      </>
      )
    }

    if (this.props.currentUser.playlists.length === 0) {
      theForm = (
        <>
        <div className='playlistForm'>
          <div className='playlistheader'>
            <h2 className='createplay'>Create a playlist</h2>
          </div>

          <div className='playlistinfo'>
            <p className='whatsplaylist'>Playlist title <strong className='red'>*</strong></p>
            <input onChange={this.update('title')} className='playlisttitleinput'/>
          </div>

          <div className='playlistsave'>
            <button onClick={this.handleSubmit} className='playlistsavebutton'>Save</button>
          </div>

          
          <div className='playlistSongs'> 
            <div className='playlistdiv'>
              <div className='playsonginf'>
                <img width='20' src={song.imgUrl}/>
                <div className='playlistuser'>
                  {song.user} 
                </div>
                <div className='playlistsongtit'>
                  {song.title}
                </div>
              </div>
            </div>
            <div className='playlistdiv'>

            </div>
            <div className='playlistdiv'>

            </div>
            <div className='playlistdivlast'>
            </div>
          </div>

          

        </div>
      </>
      )
    }

    if (this.state.modalnumber === 'second') {
      return(
        <>
          <div className='playlistComplete'>
            <div className='playlistheader2'>
              <h2 className='createplay'>Create a playlist</h2>
            </div>

            <div className='playlistcreated'>
              <div className='playlistimgandinfo'>
                <img width='50' src={this.props.song.imgUrl}/>
                <div className='pcreateor'>
                  <Link className='playcreatr'>{this.props.currentUser.username}</Link>
                  <Link className='playtitler'>{this.state.title}</Link>
                </div>
              </div>

              <Link className='gotoplaylist'>Go to playlist</Link>
              
            </div>
            <div className='playlistdiv2'>
              <div className='playsonginf2'>
                  <img width='20' src={song.imgUrl}/>
                  <div className='playlistuser'>
                    {song.user}
                  </div>
                  <div className='playlistsongtit'>
                    {song.title}
                  </div>
                </div>
              </div>
            
          </div>
          
        </>
      )
    } else {
      return (
        <>
        {theForm}
        </>
      )}

  }
}

export default withRouter(PlaylistForm)