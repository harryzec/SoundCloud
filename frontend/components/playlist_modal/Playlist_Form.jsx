import React from 'react'
import { withRouter, Link } from 'react-router-dom'

class PlaylistForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { modalnumber: 'first', title: ''}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
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

    if (this.state.modalnumber === 'first') {
    return (
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
                  {song.user} -
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
    )} else {
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
    }

  }
}

export default withRouter(PlaylistForm)