import React from 'react';
import Dashboard_Container from './Dashboard_Container'
import { Link } from 'react-router-dom'
import { fetchSongsByArtist} from '../../actions/song_action'
import { fetchPlaylistByArtist } from '../../actions/playlist_actions'
import { fetchUser } from '../../actions/user_actions'
import { connect } from 'react-redux';
import { openEditPlaylistModal } from '../../actions/modal_actions';
import EditPlaylistForm from '../edit_modal/edit_playlist_modal'

class Playlist extends React.Component {

  componentDidMount(){
    this.props.fetchUser(this.props.match.params.username)
    this.props.fetchSongsByArtist(this.props.match.params.username)
    this.props.fetchPlaylistByArtist(this.props.match.params.username)
  }

  render() {
    if (this.props.songs === null) return null
    debugger

    if (this.props.user.id === this.props.currentuser.id){

      let content = (
        <>
          <div className='noplaylists'>
            <img className='noplaylistpic'src='https://image.flaticon.com/icons/svg/2311/2311991.svg'/>
            <p>You haven't created any playlists.</p>
          </div>
        </>
      )

      

      if (this.props.playlists !== {}) {
        let playlistlist = this.props.playlists.reverse().map(playlist => {
          debugger
          let nosongs = (
            <>
              <h2>This playlist has no tracks yet</h2>
            </>
          )
          let songtits = null;
          let playicon = (
            <>
            <div className='playSongnewgone'><p className='playcon'>&#9654;</p></div>
            </>
          )
          let num = 0;
          if (playlist.tracks.length > 0) {
           
            songtits = playlist.tracks.map(track => {
              num++;
              return(
              <>
                <div className='playlisttrackindivid'>
                  <div className='playlisttnum'>{num}</div>
                  <div className='playlisttname'>{track.title}</div>
                </div>
              </>)
            })

            nosongs = (
              <>
                <div>
                  <h2>This is where waveforms go</h2>
                </div>
                  
                <div className='playlisttracks'>
                  {songtits}
                </div>
              </>
            )
            playicon = (
              <>
              <div className='playSongnew'><p className='playcon'>&#9654;</p></div>
              </>
            )
          }
          let pic = (
            <>
              <div className='emptyplaylistpic'></div>
            </>
          )

          if (playlist.imageUrl) {
            pic = (
              <>
                <img className='playlistpicer' src = {playlist.imageUrl}/>
              </>
            )
          }
          
          return (
          <>
            <div className='playlistslice'>
              <div>
                {pic}
              </div>
              <div className='playlistcontent'>
                <div className='topplaylistbox'>
                  
                  {playicon}
                  <div className='playlistinf'>
                    <Link className ='playlistart'to={`/${this.props.match.params.username}`}>{this.props.match.params.username}</Link>
                    <Link className='playlisttit'>{playlist.title}</Link>
                  </div>
                </div>
                
                {nosongs}
                

                <div className='songBO'>
                  <button className='songBu1'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/></button>
                  <button className='songBu2'><img width='10' src='https://image.flaticon.com/icons/svg/1828/1828956.svg'/> Share</button>
                  <button onClick={() => this.props.openEditPlaylistModal('edit', playlist)}className='songBu3'>&#9998; Edit</button>
                  <button className='songBu4'>...More</button>
                  </div>
                </div>
              

           
            </div>
          </>
          )}
        )
        content = (
          <>
            {playlistlist}
          </>
        )
      } 
      return(
        <>
        <EditPlaylistForm/>
        <div className='profileOptions'>
        <section className='profileSections'>
          <Link to={`/${this.props.match.params.username}`}className='profileButtons'>All</Link>
          <Link className='profileButtons'>Popular tracks</Link>
          <Link className='profileButtons'>Tracks</Link>
          <Link className='profileButtons'>Albums</Link>
          <Link to={`/${this.props.match.params.username}/sets`}className='profileButtonsAll'>Playlists</Link>
          <Link className='profileButtons'>Reposts</Link>
        </section>
        <section className='profileExtra'>
          <Link className='extraButtons'><strong className='boldthis'><img width='10'  src='https://image.flaticon.com/icons/svg/1765/1765672.svg'></img></strong> Station</Link>
          <Link className='extraButtons'><strong className='boldthis'>&#62;</strong>  Share</Link>
          <Link className='extraButtons'><strong className='boldthis'>&#9998;</strong>  Edit</Link>
        </section>
      </div>
      <div className='profileBody'>
        <div className='musicsect2'>
          <div className='musicSectionR'>
          {content}
          </div>
        </div>
        <div className='statsSection'>
        <div className='myStats'>
          <div className='myFollowers'>
            <p className='headz'>Followers</p>
            <p className='statNum'>0</p>

          </div>
          <div className='myFollowing'>
            <p className='headz'>Following</p>
            <p className='statNum'>0</p>
          </div>
          <div className='myTracks'>
            <p className='headz'>Tracks</p>
            <p className='statNum'>{Object.keys(this.props.songs).length}</p>
          </div>
        </div>
        </div>
    
      </div>

        
        </>
      )
    }
  }
}

const mSTP = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.match.params.username],
    songs: state.entities.songs,
    currentuser: state.session.currentUser,
    playlists: Object.values(state.entities.PlaylistReducer)
  }
}

const mDTP = dispatch => ({
  fetchSongsByArtist: (userId) => dispatch(fetchSongsByArtist(userId)),
  fetchPlaylistByArtist: (userId) => dispatch(fetchPlaylistByArtist(userId)),
  fetchUser: (username) => dispatch(fetchUser(username)),
  openEditPlaylistModal: (modal, playlist) => dispatch(openEditPlaylistModal(modal, playlist))
})

export default connect(mSTP, mDTP)(Playlist)