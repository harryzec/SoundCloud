import React from 'react';
import Dashboard_Container from './Dashboard_Container'
import { Link } from 'react-router-dom'
import { fetchSongsByArtist} from '../../actions/song_action'
import { fetchPlaylistByArtist } from '../../actions/playlist_actions'
import { fetchUser } from '../../actions/user_actions'
import { connect } from 'react-redux';
import { openEditPlaylistModal, openDeletePlaylistModal } from '../../actions/modal_actions';
import EditPlaylistForm from '../edit_modal/edit_playlist_modal'
import DeletePlaylist  from '../delete_modal/delete_playlist_modal'
import { playSong, pauseSong } from '../../actions/song_player_actions'
import { addQueue } from '../../actions/queue_action'
import Waves from '../waves/waves_container'
import { withRouter } from "react-router";



class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.handlePlay = this.handlePlay.bind(this)
    this.createLike = this.createLike.bind(this)
    this.deleteLike = this.deleteLike.bind(this)
    this.createFollow = this.createFollow.bind(this)
    this.deleteFollow = this.deleteFollow.bind(this)
  }

  createFollow(e) {
    e.preventDefault()
    this.props.createFollow({
      user_id: this.props.user.id,
      follower_id: this.props.currentuser.id
    })
    let username= this.props.match.params.username.split('-').join(' ')
    this.props.fetchUser(username)
  }

  deleteFollow(e, id) {
    e.preventDefault()
    this.props.deleteFollow(id)
    let username= this.props.match.params.username.split('-').join(' ')
    this.props.fetchUser(username)
  }

  createLike(e, id) {
    e.preventDefault()
    this.props.createLike({    
      likeable_id: id,
      likeable_type: "Playlist",
      user_id: this.props.currentuser.id
    })

    this.props.fetchPlaylistByArtist(this.props.match.params.username.split('-').join(' '))
  }

  deleteLike(e, id) {
    e.preventDefault()
    this.props.deleteLike(id)
    this.props.fetchPlaylistByArtist(this.props.match.params.username.split('-').join(' '))
  }

  // componentDidMount(){
  //   this.props.fetchUser(this.props.match.params.username)
  //   this.props.fetchSongsByArtist(this.props.match.params.username)
  //   this.props.fetchPlaylistByArtist(this.props.match.params.username)
  // }

  handlePlay(track, playlisttracks) {

    if (this.props.player.song === track && this.props.player.player ==='playing' ) {
      this.props.pauseSong(track)
    } else if (this.props.player.song === track && this.props.player.player ==='paused' ) {
      this.props.playSong(track)
    } else {
      debugger

      this.props.playSong(track)
      if (this.props.queue.length === 0) {
        this.props.addQueue(playlisttracks)
      }
    }
  }

  render() {
    debugger
    if (this.props.songs === null) return null
    

    

      let content = (
        <>
          <div className='noplaylists'>
            <img className='noplaylistpic'src='https://image.flaticon.com/icons/svg/2311/2311991.svg'/>
            <p>You haven't created any playlists.</p>
          </div>
        </>
      )
      
      if (this.props.currentuser.id !== this.props.user.id) {
        let content = (
          <>
            <div className='noplaylists'>
              <img className='noplaylistpic'src='https://image.flaticon.com/icons/svg/2311/2311991.svg'/>
              <p>Seems a little quiet over here.</p>
            </div>
          </>
        )
      }

      

      if (this.props.playlists !== {} & this.props.playlists.length > 0) {
        let cursong = this.props.player.song; 
        let playlistlist = this.props.playlists.reverse().map(playlist => {
          let lastbutton = (
            <>
              <button onClick={() => this.props.openDeletePlaylistModal('open', playlist)} className='songBu4'><img width='12'src='https://image.flaticon.com/icons/svg/709/709519.svg'/>  Delete Playlist</button>

            </>
          )
          let nosongs = (
            <>
              <h2 className='nosongsfound'>This playlist has no tracks yet</h2>
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
           
            songtits = playlist.tracks.map((track, i) => {
              num++;
              return(
              <>
                <div onClick={()=> this.handlePlay(track, playlist.tracks.slice(i+1))} className='playlisttrackindivid'>
                  <div className='playlisttnum'>{num}</div>
                  <div className='playlisttname'>{track.title}</div>
                </div>
              </>)
            })

            let wave;
            if (playlist.tracks.includes(cursong)) {
              wave = (
              <>
                <Waves song={cursong}/>
              </>
              )
            } else {
     
              wave = (
                <>
                  <Waves song={playlist.tracks[0]}/>
                </>
              )
            }
            debugger

            nosongs = (
              <>
                <div className='songwvz'>

                  {wave}
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

            lastbutton = (
              <>
              <button className='songBu4'>...More
                  <div className='moreshow'>
                    <div className='moreshowli'><img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up</div>
                    <div onClick={() => this.props.openDeletePlaylistModal('open', playlist)} className='moreshowlil'><img width='12'src='https://image.flaticon.com/icons/svg/709/709519.svg'/>  Delete Playlist</div>
                  </div>
              </button>
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

          let likebutton = (
            <>
              <button onClick={(e)=> this.createLike(e, playlist.id)}className='songBu1'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {playlist.likes.length}</button>
            </>
          )

          playlist.likes.forEach(like =>
            {
              if (like.user_id === this.props.currentuser.id) {
                likebutton = (
                  <button onClick={(e)=> this.deleteLike(e, like.id)}className='songBuSl'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {playlist.likes.length}</button>
                )
              }
            })
          
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
                    <Link to={`/${this.props.match.params.username}/sets/${playlist.permalink}`}className='playlisttit'>{playlist.title}</Link>
                  </div>
                </div>
                
                {nosongs}
                

                <div className='songBO'>
                  {likebutton}
                  <button onClick={() => this.props.openEditPlaylistModal('edit', playlist)}className='songBu3'>&#9998; Edit</button>
                  {lastbutton}
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

      let likes = null;

    if (this.props.user.likes.length > 0) {

      let number;
      if (this.props.user.likes.length === 1) {
        number= '1 like'
      } else {
        number = `${this.props.user.likes.length} likes`
      }

      let actual = this.props.user.likes.slice(0,3).map(like => {
        
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
      likes = (
        <>
          <div className='howmanylikes'>&#9829; {number}</div>
          {actual}
        </>
      )
    }

    let follows = null;

    if (this.props.user.follows.length > 0) {
      let number;

      if (this.props.user.follows.length === 1) {
        number= '1 follow'
      } else {
        number = `${this.props.user.follows.length} follows`
      }

      let follow = this.props.user.follows.slice(0, 3).map(follow => {
        return(
          <>
            <div className='followshow'>
              <img className='followpic' src={follow.profileUrl}/>
              <div className='followInf'>
                <Link className='followlink' to={`/${follow.username.split(' ').join('-')}`}>{follow.username}</Link>
                <div className='followsts'>
                  <p className='followst1'><strong className='larger1'>&#9745;</strong> {follow.followers}</p>
                  <p className='followst'><strong className='larger2'>&#9835;</strong> {follow.songs}</p>
                </div>
              </div>
            </div>
          </>
        )
      })

     follows = (
       <>
        <div className='howmanylikes'>&#9745; {number}</div>
        {follow}
       </>
     )
    }

    let comments = null;

    if (this.props.user.comments.length > 0) {
      let number;

      if (this.props.user.comments.length === 1) {
        number= '1 Comment'
      } else {
        number = `${this.props.user.comments.length} Comments`
      }
      let comment = this.props.user.comments.slice(0, 3).map(comment => {
        return(
          <>
            <div className='commentcont2'>
              <div className='commenttop'>
                <p className='commenton'>on <Link className='commentlink'to={`/${comment.username.split(' ').join('-')}/${comment.hyperlink}`}>{comment.title}</Link></p>
                <p className='commenton2'>{comment.created} ago</p>
              </div>
              <p className='commenton'>"{comment.body}"</p>
            </div>
          </>
        )
      })

      comments = (
        <>
          <div className='howmanylikes'>&#9998; {number}</div>
          {comment}
        </>
      )

    }

    let followbutton = null
    let editbutton=null
    if (this.props.user.id === this.props.currentuser.id) {
      editbutton= (
        <>
          <Link className='extraButtons'><strong className='boldthis1'>&#9998;</strong>  Edit</Link>
        </>
      )
    }


    if (this.props.user.id !== this.props.currentuser.id) {
      followbutton = (
        <>
          <div className='extraBut2' onClick={this.createFollow}>+ Follow</div>
        </>
      )
      this.props.user.followers.forEach(follower => {
        if (follower.follower_id === this.props.currentuser.id) {
          followbutton = (
            <>
              <div className='extraBut2' onClick={(e) => this.deleteFollow(e, follower.id)}><strong className='bigFont'>&#9745;</strong> Following</div>
            </>
          )
        }
      })
    }


      return(
        <>
        <DeletePlaylist/>
        <EditPlaylistForm/>
        <div className='profileOptions'>
        <section className='profileSections'>
          <Link to={`/${this.props.match.params.username}`}className='profileButtons'>All</Link>
          <Link to={`/${this.props.match.params.username}/tracks`} className='profileButtons'>Tracks</Link>
          <Link to={`/${this.props.match.params.username}/sets`}className='profileButtonsAll'>Playlists</Link>
        </section>
        <section className='profileExtra'>
          {followbutton}
          {editbutton}
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
            <p className='statNum'>{this.props.user.followers.length}</p>

          </div>
          <div className='myFollowing'>
            <p className='headz'>Following</p>
            <p className='statNum'>{this.props.user.follows.length}</p>
          </div>
          <div className='myTracks'>
            <p className='headz'>Tracks</p>
            <p className='statNum'>{Object.keys(this.props.songs).length}</p>
          </div>
        </div>
          {likes}
          {follows}
          {comments}
        </div>
    
      </div>

        
        </>
      )
    
  }
}


export default withRouter(Playlist)