import React from 'react';
import Dashboard_Container from './Dashboard_Container'
import { Link } from 'react-router-dom'
import { fetchSongsByArtist} from '../../actions/song_action'
import { fetchPlaylistByArtist } from '../../actions/playlist_actions'
import { fetchUser } from '../../actions/user_actions'
import { connect } from 'react-redux';

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

      let num = 0;

      if (this.props.playlists !== {}) {
        let playlistlist = this.props.playlists.reverse().map(playlist => {
          debugger
          let songtits = null;
          if (playlist.tracks.length > 0) {
            num +=1;
            songtits = playlist.tracks.map(track => (
              <>
                <div className='playlisttrackindivid'>
                  <div className='playlisttnum'>{num}</div>
                  <div className='playlisttname'>{track.title}</div>
                </div>
              </>
            ))
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
                  
                  <div className='playSongnew'><p className='playcon'>&#9654;</p></div>
                  <div className='playlistinf'>
                    <Link className ='playlistart'to={`/${this.props.match.params.username}`}>{this.props.match.params.username}</Link>
                    <Link className='playlisttit'>{playlist.title}</Link>
                  </div>
                </div>
                
                <div>
                  <h2>This is where waveforms go</h2>
                </div>
                
                <div className='playlisttracks'>
                  {songtits}
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
  fetchUser: (username) => dispatch(fetchUser(username))
})

export default connect(mSTP, mDTP)(Playlist)