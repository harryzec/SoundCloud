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
import EditPlaylistForm from '../edit_modal/edit_playlist_modal'
import DeletePlaylist  from '../delete_modal/delete_playlist_modal'
import EditUser from '../edit_user/edit_user_modal'


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
    this.changeCover = this.changeCover.bind(this)
    this.handlePlayButton = this.handlePlayButton.bind(this)
  }

  handlePlayButton(e, playlist) {
    e.preventDefault()
    if (playlist.id === this.props.player.song.playlist) {
      if (this.props.player.player === 'playing') {
        this.props.pauseSong(this.props.player.song)
        this.wavesurfer.pause()
        this.wavesurfer.setWaveColor('#ccc')
      } else {
        this.props.playSong(this.props.player.song);
        this.wavesurfer.play()
        this.wavesurfer.setWaveColor('white')
      }
    } else {
        this.props.playSong(playlist.tracks[0])
      }
  }

  changeCover(e) {
    e.preventDefault


      const file = e.currentTarget.files[0];
        let update = new FormData()
        update.append('user[cover_photo]', file)
        this.props.updateUser(update ,this.props.currentuser.id)
        let username= this.props.match.params.username.split('-').join(' ')
        this.props.fetchUser(username)
    
  }
  

  addQueue(e, song) {
    debugger
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
    this.props.fetchUser(username)
    this.props.fetchSongsByArtist(username)
    this.props.fetchPlaylistByArtist(username)
    this.props.fetchRecent(username)

  }

  deleteLike(e, id) {
    e.preventDefault()
    this.props.deleteLike(id)
    let username= this.props.match.params.username.split('-').join(' ')
    this.props.fetchUser(username)
    this.props.fetchSongsByArtist(username)
    this.props.fetchPlaylistByArtist(username)
    this.props.fetchRecent(username)

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
    
    
    let username= this.props.match.params.username.split('-').join(' ')

    if (this.state.username !== this.props.match.params.username) {
      this.props.fetchUser(username)
      this.props.fetchSongsByArtist(username)
      this.props.fetchPlaylistByArtist(username)
      this.props.fetchRecent(username)
      this.setState({username: this.props.match.params.username})
    }
    
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
    this.props.fetchRecent(username)
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
      if (Object.values(this.props.content).length === 0) {
        artistSongs = (
          <>
          <div className='noplaylists'>
            <img className='noplaylistpic'src='https://image.flaticon.com/icons/svg/2311/2311991.svg'/>
            <p>Seems a little quiet over here</p>
          </div>
          
          </>
        )
      }  else {   

      artistSongs = Object.values(this.props.content).map(song => {
        // let num = song.id
        // const { [num] } = this.state
        if (song.catagory === 'song') {
          let wave = (
            <>
              <Wave song={song} songtype={true} changedur={true}/>
            </>
          ) 
          

          let likebutton;
          
          if (this.props.currentuser) {
            likebutton = (
            <>
              <button onClick={(e) => this.createLike(e, song.id)}className='songBu1'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {song.likes.length}</button>
            </>
          )
          }

          if (this.props.currentuser) {
          song.likes.forEach(like => {
            if (like.user_id === this.props.currentuser.id) {
              likebutton = (
                <>
                  <button onClick={(e) => this.deleteLike(e, like.id)}className='songBuliked'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {song.likes.length}</button>
                </>
              )
            }
          })
          }

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
          if (this.props.currentuser) {
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
          } else if (!this.props.currentuser) {
            buttons = (
              <>
                <button onClick={(e) => this.addQueue(e, song)} className='songBu4'>Add to Next up</button>
              </>
            )
          }

          let playbutton = (
            <>
              <div className='playSong'onClick={()=> this.handlePlay(song)}><p className='playcon'>&#9654;</p></div>
            </>
          )
          if (this.props.player.song.id === song.id && this.props.player.player === 'playing') {
            playbutton = (
              <>
                <div className='playSong'onClick={()=> this.props.pauseSong(song)}><p className='pausecon'>||</p></div>
              </>
            )
          }
        
          return (
          <>

    
          <div className='songContainer'>
        
        
          <img src={song.imgUrl} className='songImg1'/>
            <div className='songHelp'>
              <div className='topsongcont'>
                {playbutton}
                
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

                <p className='playtat'>&#9654; {song.plays}</p> 
              </div>
                

            </div>

            

            
            

            </div>

          
            

            
          
          </>
        )} else if (song.catagory === 'playlist') {
          debugger
          let lastbutton = (
            <>
            <button className='songBu4'>...More
                <div className='moreshow'>
                  <div onClick={(e) => this.addQueue(e, song.tracks)}className='moreshowli'><img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up</div>
                  <div onClick={() => this.props.openDeletePlaylistModal('open', song)} className='moreshowlil'><img width='12'src='https://image.flaticon.com/icons/svg/709/709519.svg'/>  Delete Playlist</div>
                </div>
            </button>
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
          if (song.tracks.length > 0) {
           
            songtits = song.tracks.map((track, i) => {
              num++;
              return(
              <>
                <div onClick={()=> this.handlePlay(track, song.tracks.slice(i+1))} className='playlisttrackindivid'>
                  <div className='playlisttnum'>{num}</div>
                  <div className='playlisttname'>{track.title}</div>
                </div>
              </>)
            })

            let wave;
            
            if (this.props.player.song.playlist === song.id) {
              
              wave = (
              <>
                <Wave song={this.props.player.song} playlistdur={true}/>
              </>
              )
            } else {
     
              wave = (
                <>
                  <Wave song={song.tracks[0]}/>
                </>
              )
            }
            

            nosongs = (
              <>
                <div className='sngwvz'>
                  {wave}
                </div>
                  
                <div className='playlisttracks'>
                  {songtits}
                </div>
              </>
            )
            if (this.props.player.song.playlist === song.id) {
              if (this.props.player.player === 'paused') {
                playicon = (
                  <>
                    <div className='playSongnew' onClick={(e) => this.handlePlayButton(e, song)}><p className='playcon'>&#9654;</p></div>
                  </>
                )
              } else {
                playicon = (
                  <>
                    <div className='playSong' onClick={(e) => this.handlePlayButton(e, song)}><p className='pausecon'>||</p></div>
                  </>
                )
              }
            } else {
              playicon = (
                <>
                  <div className='playSongnew' onClick={(e) => this.handlePlayButton(e, song)}><p className='playcon'>&#9654;</p></div>
                </>
              )
            }
          }
          let pic = (
            <>
              <div className='emptyplaylistpic'></div>
            </>
          )

          if (song.imageUrl) {
            pic = (
              <>
                <img className='playlistpicer' src = {song.imageUrl}/>
              </>
            )
          }

          let likebutton;
          let edit;

          if (this.props.currentuser) {

          likebutton = (
            <>
              <button onClick={(e)=> this.createLike(e, song.id)}className='songBu1'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {song.likes.length}</button>
            </>
          )

          song.likes.forEach(like =>
            {
              if (like.user_id === this.props.currentuser.id) {
                likebutton = (
                  <button onClick={(e)=> this.deleteLike(e, like.id)}className='songBuSl'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {song.likes.length}</button>
                )
              }
            })

            
              edit = (
                <>
                  <button onClick={() => this.props.openEditPlaylistModal('edit', song)}className='songBu3'>&#9998; Edit</button>
                </>
            )
              }
            
            if (this.props.currentuser) {
            if (this.props.currentuser.id !== this.props.user.id) {
              edit = null
              lastbutton = (
                <>
                  <button className='songBu4'>...More
                    <div className='moreshow'>
                      <div onClick={(e) => this.addQueue(e, song.tracks)}className='moreshowli'><img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up</div>
                    </div>
                  </button>
                </>
                )
            }
          }
            let buttons = (
              <>
                {likebutton}
                {edit}
                {lastbutton}
              </>
            )
            

            if (!this.props.currentuser) {
                buttons = (
                  <>
                    <button onClick={(e) => this.addQueue(e, song.tracks)} className='songBu4'>Add to Next up</button>
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
                    <Link to={`/${this.props.match.params.username}/sets/${song.permalink}`}className='playlisttit'>{song.title}</Link>
                  </div>
                </div>
                
                {nosongs}
                

                <div className='songBO'>
                  {buttons}
                  </div>
                </div>
              

           
            </div>
          </>
          )
        }
      })}
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
    if (this.props.currentuser) {
      if (this.props.user.id === this.props.currentuser.id) {
        editbutton= (
          <>
            <div onClick={()=> this.props.openUserModal('edit_user')} className='extraButtons'><strong className='boldthis1'>&#9998;</strong>  Edit</div>
          </>
        )
      }
    }

    if (this.props.currentuser) {
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
        <PlaylistDashboard openUserModal={this.props.openUserModal} fetchUser={this.props.fetchUser} createFollow={this.props.createFollow} deleteFollow={this.props.deleteFollow} user={this.props.user} fetchPlaylistByArtist={this.props.fetchPlaylistByArtist} createLike={this.props.createLike} deleteLike={this.props.deleteLike} songs={this.props.songs} player= {this.props.player} currentuser={this.props.currentuser} playlists ={this.props.playlists} openDeletePlaylistModal={this.props.openDeletePlaylistModal} openEditPlaylistModal={this.props.openEditPlaylistModal} pauseSong={this.props.pauseSong} addQueue={this.props.addQueue} playSong={this.props.playSong} queue={this.props.queue}/>
      </>
    )
  }

  if (this.props.match.path === '/:username/popular-tracks') {
    titler = (
      <>
        <PopularTracks player={this.props.player} fetchUser={this.props.fetchUser} createFollow={this.props.createFollow} deleteFollow={this.props.deleteFollow} openPlaylistModal={this.props.openPlaylistModal} addQueue={this.props.addQueue} openDeleteModal={this.props.openDeleteModal} openEditModal={this.props.openEditModal} user={this.props.user} currentuser={this.props.currentuser} songs={this.props.songs} fetchPopularSongs={this.props.fetchPopularSongs} createLike={this.props.createLike} deleteLike={this.props.deleteLike} playSong={this.props.playSong} pauseSong={this.props.pauseSong}/>
      </>
    )
  }

  if (this.props.match.path === '/:username/tracks') {
    titler = (
      <>
        <Tracks openUserModal={this.props.openUserModal} player={this.props.player} fetchUser={this.props.fetchUser} createFollow={this.props.createFollow} deleteFollow={this.props.deleteFollow} openPlaylistModal={this.props.openPlaylistModal} addQueue={this.props.addQueue} openDeleteModal={this.props.openDeleteModal} openEditModal={this.props.openEditModal} user={this.props.user} currentuser={this.props.currentuser} songs={this.props.songs} fetchPopularSongs={this.props.fetchPopularSongs} createLike={this.props.createLike} deleteLike={this.props.deleteLike}   fetchSongsByArtist={this.props.fetchSongsByArtist} playSong={this.props.playSong} pauseSong={this.props.pauseSong}/>
      </>
    )
  }

  

  let changeCover = null;
  
  if (this.props.currentuser) {
    if (this.props.currentuser.id === this.props.user.id) {
      changeCover = (
        <>
          <input type='file' id='uploadCoverPicture' onChange={this.changeCover}/>
          <button className='selectImgB3'onClick={()=>document.getElementById('uploadCoverPicture').click() }>&#128247; Select Cover Image</button>
        </>
      )
    }
  }

  let proPic = (
    <>
      <img src={this.props.user.profileUrl} className='proPic'/>
    </>
  )
  
  if (!this.props.user.profileUrl) {
    proPic = (
      <>
        <div className='proPic2'>
        </div>
      </>
    )
  }

  let coverpic = (
    <>
      <img src={this.props.user.coverUrl} className='coverPic'/>
    </>
  )

  if (!this.props.user.coverUrl) {
    coverpic = (
      <>
        <div src={this.props.user.coverUrl} className='coverPic2'/>
      </>
    )
  }
  let modals;
  if (this.props.currentuser) {
    modals = (
      <>
        <PlaylistModal />
        <EditModal/>
        <DeleteModal/>
        <DeletePlaylist/>
        <EditPlaylistForm/>
        <EditUser/>
      </>
    )
  }

    return(
    <>
    {modals}
    <div className='fullDash'> 
    {coverpic}
    {proPic}
    {changeCover}
    <h1 className='usernameProf'>{this.props.user.username}</h1>
    {titler}

  
    </div>
   

    </>
    )
  }
}

export default Dashboard;