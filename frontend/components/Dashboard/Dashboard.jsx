import React from 'react';
import { Link } from 'react-router-dom'
import EditModal from '../edit_modal/edit_modal'
import PlaylistModal from '../playlist_modal/playlist_modal'
import { openPlaylistModal } from '../../actions/modal_actions';
import Wave from '../waves/waves_container'
import Waves from '../waves/waves';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {}
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

  

  
  componentDidMount(){
    let username= this.props.match.params.username.split('-').join(' ')
    this.props.fetchUser(username)
    this.props.fetchSongsByArtist(username)
  }

  handlePlay(song){
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

  
    

   if (this.props.songs === {}) {
     return(
       <>
       <li>This artist has no songs!</li>
       </>
     )
   }  

   
   

   const sample = Object.keys(this.props.songs)[0]

   if (this.state === null)  {   
    let arr = Object.values(this.props.songs).map(song => song.id);
    let obj = {};
    arr.forEach(id => {obj[id.toString()] = this.props.dropdown});
    this.setState(obj)
    
   } else if ((sample && this.state[sample] === undefined)) {   
    
    let arr = Object.values(this.props.songs).map(song => song.id);
    let obj = {};
    if (this.props.match.url === `/${this.props.match.params.username}`){
      obj['all'] = 'profileButtonsAll'
      obj['sets']= 'profileButtons'
    } else if (this.props.match.url === `/${this.props.match.params.username}/sets`){
      obj['sets'] = 'profileButtonsAll'
      obj['all']= 'profileButtons'
    } 
    arr.forEach(id => {obj[id.toString()] = this.props.dropdown});
    this.setState(obj)
   }
   
   
   
    if ((this.props.user.id === this.props.currentuser.id)&&this.state !== null) {
      artistSongs = Object.values(this.props.songs).map(song => {
        // let num = song.id
        // const { [num] } = this.state
        debugger
        
        let wave = (
          <>
          < Wave song={song} songtype={true}/>
          </>
        ) 
        debugger
       
        return (
        <>

   
        <div className='songContainer'>
       
       
        <img src={song.imgUrl} className='songImg1'/>
          <div className='songHelp'>
            <div className='topsongcont'>
              <div className='playSong'onClick={()=> this.handlePlay(song)}><p className='playcon'>&#9654;</p></div>
              
              <div className='songpIn'>
                <li className='sArtist'>{this.props.user.username}</li>
                <li className='sSong'><Link className='sSong' to={`/${this.props.user.username}/${song.hyperlink}`}>{song.title}</Link></li>
              </div>

              <p className='songG'>#{song.genre}</p>
            </div>
            <div className='sngwvc'>
              {wave}
            </div>

            <div className='songFoot'>
              <div className='songBO'>
                <button className='songBu1'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/></button>
                <button className='songBu2'><img width='10' src='https://image.flaticon.com/icons/svg/1828/1828956.svg'/> Share</button>
                <button className='songBu3' onClick={e => this.handleEdit(e, song)}>&#9998; Edit</button>
                <button className='songBu4' onClick={() => this.setState({[song.id]: 'moreshow'})}>...More
                  <div className={`${this.state[song.id]}`}>
                    <div className='moreshowli'><img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up</div>
                    <div className='moreshowli' onClick={() => this.props.openPlaylistModal('playlist', song)}><img width='12'src='https://www.flaticon.com/premium-icon/icons/svg/2618/2618314.svg'/>  Add to playlist</div>
                    <div className='moreshowli'><img width='12' src='https://www.flaticon.com/premium-icon/icons/svg/641/641360.svg'/>  Stats</div>
                    <div className='moreshowli'><img width='12'  src='https://image.flaticon.com/icons/svg/1765/1765672.svg'/>  Station</div>
                    <div className='moreshowlil'><img width='12'src='https://image.flaticon.com/icons/svg/709/709519.svg'/>  Delete Track</div>
                  </div>
                </button>
              </div>
            </div>
              

          </div>

          

          
          

          </div>

         
          

          
        
        </>
      )})
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

  } else {
    artistSongs = null;
  }
  let profilebody;
  if (artistSongs!== null) {

    profilebody = (
    <>
    <h2 className='recentHead'>Recent</h2>
    {artistSongs}
    </>

    
  )
  } else {
    profilebody = null
  }

  if( profilebody ) {
    let followbutton = null
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
        debugger
        
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

    titler = (
      <>
     <div className='profileOptions'>
     <section className='profileSections'>
       <Link to={`/${this.props.match.params.username}`}className={this.state.all}>All</Link>
       <Link className='profileButtons'>Popular tracks</Link>
       <Link className='profileButtons'>Tracks</Link>
       <Link className='profileButtons'>Albums</Link>
       <Link to={`/${this.props.match.params.username}/sets`}className={this.state.sets}>Playlists</Link>
       <Link className='profileButtons'>Reposts</Link>
     </section>
     <section className='profileExtra'>
       <Link className='extraButtons'><strong className='boldthis1'><img width='10'  src='https://image.flaticon.com/icons/svg/1765/1765672.svg'></img></strong> Station</Link>
       {followbutton}
       <Link className='extraButtons'><strong className='boldthis1'>&#62;</strong>  Share</Link>
       <Link className='extraButtons'><strong className='boldthis1'>&#9998;</strong>  Edit</Link>
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
      </div>
   
    </div>
   </>
    )
  } else {
    titler = null
  }
  
 
  
  


    return(
    <>
    <PlaylistModal />
    <EditModal/>
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