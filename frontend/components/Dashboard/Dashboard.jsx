import React from 'react';
import { Link } from 'react-router-dom'
import EditModal from '../edit_modal/edit_modal'
import PlaylistModal from '../playlist_modal/playlist_modal'
import { openPlaylistModal } from '../../actions/modal_actions';
import Wave from '../waves/waves_container'
import Waves from '../waves/waves';
import PlaylistDashboard from './playlist'
import PopularTracks from './popular-tracks'
import Tracks from './tracks'
import DeleteModal from '../delete_modal/delete_modal'


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {}
    this.createFollow = this.createFollow.bind(this)
    this.deleteFollow = this.deleteFollow.bind(this)
    this.createLike = this.createLike.bind(this)
    this.deleteLike = this.deleteLike.bind(this)
    this.addQueue = this.addQueue.bind(this)
  }

  addQueue(e, song) {
    
    e.preventDefault()
    
    this.props.addQueue(song)
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
      likeable_type: "Song",
      user_id: this.props.currentuser.id
  })
    let username= this.props.match.params.username.split('-').join(' ')
    this.props.fetchSongsByArtist(username)

  }

  deleteLike(e, id) {
    e.preventDefault()
    this.props.deleteLike(id)
    let username= this.props.match.params.username.split('-').join(' ')
    this.props.fetchSongsByArtist(username)

  }

  // componentDidUpdate() {
    
  //   if (this.props.user) {
  //     if (this.props.match.params.username.split('-').join(' ') !== this.props.user.username) {
  //       let username= this.props.match.params.username.split('-').join(' ')
  //       this.props.fetchUser(username)
  //       this.props.fetchSongsByArtist(username)
  //       this.props.fetchPlaylistByArtist(username)
  //     }
  //   }
  // }

  componentDidUpdate() {
    debugger
    
    let username= this.props.match.params.username.split('-').join(' ')
    
    if (this.props.user === undefined) {
      this.props.fetchUser(username)
      this.props.fetchSongsByArtist(username)
      this.props.fetchPlaylistByArtist(username)
    } else if (this.props.user.username !== username) {
      this.props.fetchUser(username)
      this.props.fetchSongsByArtist(username)
      this.props.fetchPlaylistByArtist(username)
    }
  }
  
  componentDidMount(){
    
    let username= this.props.match.params.username.split('-').join(' ')
    this.props.fetchUser(username)
    this.props.fetchSongsByArtist(username)
    this.props.fetchPlaylistByArtist(username)
  }

  handlePlay(song){
    
    if (this.props.player.song.id !== song.id) {
      if (!song.plays) {
        song.plays = 1;
      } else {
        song.plays += 1;
      }
    }
    this.props.playSong(song);
  }

  handleEdit (e, song) {

    e.preventDefault();
    this.props.openEditModal('edit', song)
  }

  render() {

  

  if (this.props.user === undefined || this.state === null) return null

  
   let artistSongs;
   let titler = null;
  
    
   if (this.props.match.isExact) {
    
  
  if (this.props.match.path === '/:username') {
   
   
    if (this.state !== null) {
      if (Object.values(this.props.songs).length === 0) {
        artistSongs = (
          <>
          <div className='noplaylists'>
            <img className='noplaylistpic'src='https://image.flaticon.com/icons/svg/2311/2311991.svg'/>
            <p>Seems a little quiet over here</p>
          </div>
          
          </>
        )
      }  else {   

      artistSongs = Object.values(this.props.songs).map(song => {
        // let num = song.id
        // const { [num] } = this.state
        
        let wave = (
          <>
            <Wave song={song} songtype={true}/>
          </>
        ) 
        

        let likebutton = (
          <>
            <button onClick={(e) => this.createLike(e, song.id)}className='songBu1'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {song.likes.length}</button>
          </>
        )

        song.likes.forEach(like => {
          if (like.user_id === this.props.currentuser.id) {
            likebutton = (
              <>
                <button onClick={(e) => this.deleteLike(e, like.id)}className='songBuliked'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {song.likes.length}</button>
              </>
            )
          }
        })

        let buttons = (
          <>
          {likebutton}
            <button className='songBu3' onClick={e => this.handleEdit(e, song)}>&#9998; Edit</button>
            <button className='songBu4'>...More
              <div className='moreshow'>
                <div onClick={(e) => this.addQueue(e, song)}className='moreshowli'><img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up</div>
                <div className='moreshowli' onClick={() => this.props.openPlaylistModal('playlist', song)}><img width='12'src='https://www.flaticon.com/premium-icon/icons/svg/2618/2618314.svg'/>  Add to playlist</div>
                <div className='moreshowlil' onClick={()=>this.props.openDeleteModal('open', song)}><img width='12'src='https://image.flaticon.com/icons/svg/709/709519.svg'/>  Delete Track</div>
                </div>
            </button>
          </>
        )
        if (this.props.user.id !== this.props.currentuser.id) {
          buttons = (
            <>
              {likebutton}
              <button className='songBu4'>...More
               <div className='moreshow'>
                <div onClick={(e) => this.addQueue(e, song)}className='moreshowli'><img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up</div>
                <div className='moreshowli' onClick={() => this.props.openPlaylistModal('playlist', song)}><img width='12'src='https://www.flaticon.com/premium-icon/icons/svg/2618/2618314.svg'/>  Add to playlist</div>
                </div>
              </button>
            </>
          )
        }
       
        return (
        <>

   
        <div className='songContainer'>
       
       
        <img src={song.imgUrl} className='songImg1'/>
          <div className='songHelp'>
            <div className='topsongcont'>
              <div className='playSong'onClick={()=> this.handlePlay(song)}><p className='playcon'>&#9654;</p></div>
              
              <div className='songpIn'>
                <li className='sArtist'>{this.props.user.username}</li>
                <li className='sSong'><Link className='sSong' to={`/${this.props.user.username.split(' ').join('-')}/${song.hyperlink}`}>{song.title}</Link></li>
              </div>

              <p className='songG'>#{song.genre}</p>
            </div>
            <div className='sngwvc'>
              {wave}
            </div>

            <div className='songFoot'>
              <div className='songBO'>
                {buttons}
              </div>
            </div>
              

          </div>

          

          
          

          </div>

         
          

          
        
        </>
      )})}
    } 

  } else {
    artistSongs = null;
  }
  let profilebody;
  if (artistSongs!== null) {

    profilebody = (
    <>
    <h2 className='recentHead'>Spotlight</h2>
    {artistSongs}
    </>

    
  )
  } else {
    profilebody = null
  }

  if( profilebody ) {
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

    titler = (
      <>
     <div className='profileOptions'>
     <section className='profileSections'>
       <Link to={`/${this.props.match.params.username}`}className='profileButtonsAll'>All</Link>
       <Link to={`/${this.props.match.params.username}/popular-tracks`}className='profileButtons'>Popular tracks</Link>
       <Link to={`/${this.props.match.params.username}/tracks`}className='profileButtons'>Tracks</Link>
       <Link to={`/${this.props.match.params.username}/sets`}className='profileButtons'>Playlists</Link>
     </section>
     <section className='profileExtra'>
       {followbutton}
       {editbutton}
     </section>
   </div>

   <div className='profileBody'>
      <div className='musicsect2'>
        <div className='musicSectionR'>
            {profilebody}
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
  } else {
    titler = null
  }



  } 
  
  
  if (this.props.match.path === '/:username/sets') {
    titler= (
      <>
        <PlaylistDashboard fetchUser={this.props.fetchUser} createFollow={this.props.createFollow} deleteFollow={this.props.deleteFollow} user={this.props.user} fetchPlaylistByArtist={this.props.fetchPlaylistByArtist} createLike={this.props.createLike} deleteLike={this.props.deleteLike} songs={this.props.songs} player= {this.props.player} currentuser={this.props.currentuser} playlists ={this.props.playlists} openDeletePlaylistModal={this.props.openDeletePlaylistModal} openEditPlaylistModal={this.props.openEditPlaylistModal} pauseSong={this.props.pauseSong} addQueue={this.props.addQueue} playSong={this.props.playSong} queue={this.props.queue}/>
      </>
    )
  }

  if (this.props.match.path === '/:username/popular-tracks') {
    titler = (
      <>
        <PopularTracks fetchUser={this.props.fetchUser} createFollow={this.props.createFollow} deleteFollow={this.props.deleteFollow} openPlaylistModal={this.props.openPlaylistModal} addQueue={this.props.addQueue} openDeleteModal={this.props.openDeleteModal} openEditModal={this.props.openEditModal} user={this.props.user} currentuser={this.props.currentuser} songs={this.props.songs} fetchPopularSongs={this.props.fetchPopularSongs} createLike={this.props.createLike} deleteLike={this.props.deleteLike}/>
      </>
    )
  }

  if (this.props.match.path === '/:username/tracks') {
    titler = (
      <>
        <Tracks fetchUser={this.props.fetchUser} createFollow={this.props.createFollow} deleteFollow={this.props.deleteFollow} openPlaylistModal={this.props.openPlaylistModal} addQueue={this.props.addQueue} openDeleteModal={this.props.openDeleteModal} openEditModal={this.props.openEditModal} user={this.props.user} currentuser={this.props.currentuser} songs={this.props.songs} fetchPopularSongs={this.props.fetchPopularSongs} createLike={this.props.createLike} deleteLike={this.props.deleteLike}   fetchSongsByArtist={this.props.fetchSongsByArtist}/>
      </>
    )
  }

  


  
  


    return(
    <>
    <PlaylistModal />
    <EditModal/>
    <DeleteModal/>
    <div className='fullDash'> 
    <img src={this.props.user.coverUrl} className='coverPic'/>
    <img src={this.props.user.profileUrl} className='proPic'/>
    <h1 className='usernameProf'>{this.props.user.username}</h1>
    {titler}

  
    </div>
   

    </>
    )
  }
}

export default Dashboard;