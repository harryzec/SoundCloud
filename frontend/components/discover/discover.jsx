import React from 'react';
import { Link } from 'react-router-dom'

class Discover extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createFollow = this.createFollow.bind(this)
    this.deleteFollow = this.deleteFollow.bind(this)
  }

  createFollow(e, user_id, i) {
    e.preventDefault()
    this.props.createFollow({
      user_id: user_id,
      follower_id: this.props.currentuser.id
    })

    this.setState({[i]: true})
  }

  deleteFollow(e, id, i) {
    e.preventDefault()
    this.props.deleteFollow(id)
    this.setState({[i]: false})

  }

  componentDidMount() {
    this.props.fetchPlaylists()
    this.props.suggestedFollows()
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.logout().then(()=> this.props.history.push('/'))
  }

  handlePlay(song){
    this.props.playSong(song);
  }
  

  render() {
    if (this.props.recentplays === {}) {
      return null;
    }

    let values = Object.values(this.props.recentplays).reverse().slice(0,4)

    const recent = values.map(song => (
      <>
        <div key={song.id} className='recentSong'>
          <img className='recentPic'src={song.imgUrl} />
          <div className='recentInfo'>
            <p className='recentuser'>{song.user}</p>
            <p className='recenttitle'>{song.title}</p>
          </div>
        </div>
      </>
    ))
    

    const firstp = this.props.playlists.slice(0, 4).map(playlist =>(
      <>
        <div key={playlist.id}className='playlistshow'>
          <img className='playpic'src={playlist.imageUrl}/>
          <Link to={`/${playlist.username.split(' ').join('-')}/sets/${playlist.permalink}`} className='playtit'>{playlist.title}</Link>
        </div>
      </>
    ))

    const secondp = this.props.playlists.slice(4, 8).map(playlist =>(
      <>
        <div key={playlist.id} className ='playlistshow'>
          <img className='playpic'src={playlist.imageUrl}/>
          <Link to={`/${playlist.username.split(' ').join('-')}/sets/${playlist.permalink}`} className='playtit'>{playlist.title}</Link>
        </div>
      </>
    ))

    const thirdp = this.props.playlists.slice(8, 12).map(playlist =>(
      <>
        <div key={playlist.id} className ='playlistshow'>
          <img className='playpic'src={playlist.imageUrl}/>
          <Link to={`/${playlist.username.split(' ').join('-')}/sets/${playlist.permalink}`} className='playtit'>{playlist.title}</Link>
        </div>
      </>
    ))
   
      
    let actual;
    let likesheader;
    if (this.props.currentuser) {
    likesheader = (
      <>
        <h3 className='listenHis'><img width='12' src='https://www.flaticon.com/premium-icon/icons/svg/2725/2725161.svg'/> Likes</h3>
      </>
    )
    actual = this.props.currentuser.likes.slice(0,3).map(like => {
        
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
    }

    let randomusers = this.props.mightlike.map((user, i) => {
      let followbutton;
      
      if (this.props.currentuser) {
        followbutton = (
          <>
          <div className='extraBut2' onClick={(e)=> this.createFollow(e, user.id, i)}>+ Follow</div>
          </>
        )
      }
      if (this.state !== null) {
        if(this.state[[i]]) {
          let follow;
          this.props.follows.forEach(follower => {
            if (follower.user_id === user.id) {
              follow = follower.id
            }
          })
          followbutton = (
            <>
             <div className='extraBut2' onClick={(e) => this.deleteFollow(e, follow, i)}><strong className='bigFont'>&#9745;</strong> Following</div>
            </>
          )
        }
      }
      return(
        <>
        <div className='mightlike'>
          <img className='userlikepic'src={user.profileUrl}/>
          <div className='mightlikeinfo'>
            <Link className='mightlikename' to={`/${user.username.split(' ').join('-')}`}>{user.username}</Link>
            <div className='mightlikestats'>
              <div className='mightlikeStat'>
                <p className='followst1'><strong className='larger1'>&#9745;</strong> {user.followers.length}</p>
                <p className='followst'><strong className='larger2'>&#9835;</strong> {user.songs}</p>
              </div>
                {followbutton}
            </div>
          </div>

        </div>
        </>
      )
    })


    return(
      <>
      <div className='discoverMain'>
        <div className='musicSection'>
          <h3 className='newMusicNow'>New Music Now</h3>
          <p className='latestHits'>The latest hits, updated all the time</p>
          <div className='play1'>
          
          {firstp}
          </div>
          <h3 className='newMusicNow'>CloneCloud Charts</h3>
          <p className='latestHits'>Discover tomorrow's music today</p>
          <div className='play2'>
            {secondp}
          </div>

          <h3 className='newMusicNow'>Top Playlists</h3>
          <p className='latestHits'>The biggest hits on CloneCloud</p>
          <div className='play1'>
          
          {thirdp}
          </div>
          
        </div>
        <div className='recentSection'>
          <h3 className='listenHis'><img width='12' src='https://www.flaticon.com/premium-icon/icons/svg/2725/2725222.svg'/> Who to follow</h3>
          {randomusers}
          {likesheader}
          {actual}
          <h3 className='listenHis'><img className='cale' width='12'src ='https://image.flaticon.com/icons/svg/747/747310.svg'/>  Listening History</h3>
          
          {recent}
          
        </div>        
      </div>
    
      
      </>
    )
  }
}

export default Discover;