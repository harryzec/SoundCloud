import React from 'react';
import Dashboard_Container from './Dashboard_Container'
import { Link } from 'react-router-dom'
import { fetchSongsByArtist} from '../../actions/song_action'
import { fetchPlaylistByArtist } from '../../actions/playlist_actions'
import { connect } from 'react-redux';

class Playlist extends React.Component {

  componentDidMount(){
    this.props.fetchSongsByArtist(this.props.match.params.username)
    this.props.fetchPlaylistByArtist(this.props.match.params.username)
  }

  render() {
    if (this.props.songs === null) return null

    let content;
    content = (
      <>
        <div className='noplaylists'>
          <img className='noplaylistpic'src='https://image.flaticon.com/icons/svg/2311/2311991.svg'/>
          <p>You haven't created any playlists.</p>
        </div>
      </>
    )
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
      <div className='musicSectionR'>
      {content}
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

const mSTP = (state) => {
  return {
    songs: state.entities.songs
  }
}

const mDTP = dispatch => ({
  fetchSongsByArtist: (userId) => dispatch(fetchSongsByArtist(userId)),
  fetchPlaylistByArtist: (userId) => dispatch(fetchPlaylistByArtist(userId))
})

export default connect(mSTP, mDTP)(Playlist)