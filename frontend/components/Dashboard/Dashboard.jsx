import React from 'react';
import { Link } from 'react-router-dom'
import EditModal from '../edit_modal/edit_modal'
import PlaylistModal from '../playlist_modal/playlist_modal'
import { openPlaylistModal } from '../../actions/modal_actions';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {}
    debugger
  }

  

  
  componentDidMount(){
    this.props.fetchUser(this.props.match.params.username)
    this.props.fetchSongsByArtist(this.props.match.params.username)
  }

  handlePlay(song){
    this.props.playSong(song);
  }

  handleEdit (e, song) {

    e.preventDefault();
    this.props.openEditModal('edit', song)
  }

  render() {
  debugger

  

  if (this.props.user === undefined && this.state === null) return null

  
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
        

       
        return (
        <>
        {/* {title} */}
        <div className='realCont'>
        <div className='songContainer'>
       
       <div className='rich2Div'>
        <div className='richDiv'>
        <img src={song.imgUrl} className='songImg1'/>
          <div className='songHelp'>
            <div className='playSong'onClick={()=> this.handlePlay(song)}><p className='playcon'>&#9654;</p></div>
            
            <div className='songpIn'>
            <li className='sArtist'>{this.props.user.username}</li>
            <li className='sSong'><Link className='sSong' to={`/${this.props.user.username}/${song.hyperlink}`}>{song.title}</Link></li>
            </div>

            

            </div>
          </div>
          </div>

          {/* <div className='genreS'>
            <p className='songG'>#{song.genre}</p>
          </div> */}
          <p className='songG'>#{song.genre}</p>

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
       <Link className='extraButtons'><strong className='boldthis'><img width='10'  src='https://image.flaticon.com/icons/svg/1765/1765672.svg'></img></strong> Station</Link>
       <Link className='extraButtons'><strong className='boldthis'>&#62;</strong>  Share</Link>
       <Link className='extraButtons'><strong className='boldthis'>&#9998;</strong>  Edit</Link>
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