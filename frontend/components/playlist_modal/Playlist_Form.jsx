import React from 'react'
import { withRouter, Link } from 'react-router-dom'

class PlaylistForm extends React.Component {
  constructor(props) {
    super(props)
    this.filterplaylists = this.filterplaylists.bind(this)
    this.state = { modalnumber: 'zero', title: '', playlists: this.props.currentUser.playlists}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handledelete = this.handledelete.bind(this)
    this.updateplaylists = this.updateplaylists.bind(this)
  }

  updateplaylists(e) {
    debugger
    e.preventDefault()
    let newplaylists = []
    let value = document.getElementById('playfilt')
    
    let length = value.length
    this.props.currentUser.playlists.forEach(playlist => {
      let title = playlist.title.toLowerCase().split(' ')
      if (playlist.title.toLowerCase().slice(0, length) === value.toLowerCase()) {
        newplaylists.push(playlist)
      }
      title.forEach(part => {
        if (!newplaylists.includes(playlist) && part.slice(0, length) === value.toLowerCase()) {
          newplaylists.push(playlist)
        }
      })
    })

    this.setState({playlists: newplaylists})
  }

  filterplaylists(e) {
    e.preventDefault()
    let newplaylists = []
    
    let length = e.currentTarget.value.length
    this.props.currentUser.playlists.forEach(playlist => {
      let title = playlist.title.toLowerCase().split(' ')
      if (playlist.title.toLowerCase().slice(0, length) === e.currentTarget.value.toLowerCase()) {
        newplaylists.push(playlist)
      }
      title.forEach(part => {
        if (!newplaylists.includes(playlist) && part.slice(0, length) === e.currentTarget.value.toLowerCase()) {
          newplaylists.push(playlist)
        }
      })
    })

    this.setState({playlists: newplaylists})
  }

  handleadd(e, songId, playlistId) {
    e.preventDefault()
    const newPlaylistTrack = new FormData();
    newPlaylistTrack.append('PlaylistTrack[track_id]', songId)
    newPlaylistTrack.append('PlaylistTrack[playlist_id]', playlistId)
    this.props.createPlaylistTrack(newPlaylistTrack)
    const getUser = new FormData();
    getUser.append('user[id]', this.props.currentUser.id)
    this.props.updateUser(getUser, this.props.currentUser.id)
  }

  handledelete(e, songId, playlistId) {
    e.preventDefault()
    const newPlaylistTrack = new FormData();
    newPlaylistTrack.append('PlaylistTrack[track_id]', songId)
    newPlaylistTrack.append('PlaylistTrack[playlist_id]', playlistId)
    this.props.deletePlaylistTrack(newPlaylistTrack)
    const getUser = new FormData();
    getUser.append('user[id]', this.props.currentUser.id)
    this.props.updateUser(getUser, this.props.currentUser.id)
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const newPlaylist = new FormData();
    newPlaylist.append('playlist[title]', this.state.title)
    newPlaylist.append('playlist[user_id]', this.props.currentUser.id)
    newPlaylist.append('playlist[permalink]', this.state.title)
    
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

    let theForm;
    
    if (this.state.modalnumber === 'zero' && this.props.currentUser.playlists.length > 0) {
    debugger
    let playlist = this.state.playlists.slice(0, 4).map(playlist => {

      if (!this.props.currentUser.playlists.some((match) => match === playlist)) {
        // this.setState({playlists: this.props.currentUser.playlists})

      
    let newplaylists = []
    
    let value = document.getElementById('playfilt').value
    
    let length = value.length
    this.props.currentUser.playlists.forEach(playlist => {
      let title = playlist.title.toLowerCase().split(' ')
      if (playlist.title.toLowerCase().slice(0, length) === value.toLowerCase()) {
        newplaylists.push(playlist)
      }
      title.forEach(part => {
        if (!newplaylists.includes(playlist) && part.slice(0, length) === value.toLowerCase()) {
          newplaylists.push(playlist)
        }
      })
    })

    this.setState({playlists: newplaylists})
        
      }

      let button
      if (playlist.tracks.some((track) => track.id === this.props.song.id)) {
        button = (
          <div onClick={(e)=>this.handledelete(e, this.props.song.id, playlist.id) } className='addtoplaysecond'>Added</div>
        )
      } else {
        
        button = (
          <div onClick={(e)=>this.handleadd(e, this.props.song.id, playlist.id) } className='addtoplaysecond'>Add to playlist</div>
        )
      }
      

      // playlist.tracks.forEach(track => {
      //   if (track.id === this.props.song.id) {
      //     button = (
      //       <div onClick={(e)=>this.handleadd(e, this.props.song.id, playlist.id) } className='addtoplaysecond'>Added</div>
      //     )
      //   }
      // })
    

      return(
      <>
        <div className='addtoplay'>
          <div className='playpicinfo'>
            <img src={playlist.imageUrl} className='playpicz'/>
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
        
        <input onChange={this.filterplaylists} className='fiterplaylists' id='playfilt' placeholder='Filter Playlists'/>

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
              <h2 className='createplay3'>Create a playlist</h2>
            </div>

            <div className='playlistcreated'>
              <div className='playlistimgandinfo'>
                <img width='50' src={this.props.song.imgUrl}/>
                <div className='pcreateor'>
                  <Link className='playcreatr'>{this.props.currentUser.username}</Link>
                  <Link className='playtitler'>{this.state.title}</Link>
                </div>
              </div>

              <Link onClick={()=>this.props.closePlaylistModal()} to={`/${this.props.currentUser.username.split(' ').join('-')}/sets/${this.state.title}`} className='gotoplaylist'>Go to playlist</Link>
              
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