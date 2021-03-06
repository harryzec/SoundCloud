import React from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import Wave from '../waves/waves_container';



class PopularTracks extends React.Component {
  constructor(props) {
    super(props)
    this.createLike = this.createLike.bind(this)
    this.deleteLike = this.deleteLike.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.addQueue = this.addQueue.bind(this)
    this.createFollow = this.createFollow.bind(this)
    this.deleteFollow = this.deleteFollow.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
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

  componentDidMount() {
    let username= this.props.match.params.username.split('-').join(' ')
    this.props.fetchSongsByArtist(username)
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

  addQueue(e, song) {
    
    e.preventDefault()
    
    this.props.addQueue(song)
  }

  handleEdit (e, song) {

    e.preventDefault();
    this.props.openEditModal('edit', song)
  }

  createLike(e, id) {
    e.preventDefault()
    this.props.createLike({    
      likeable_id: id,
      likeable_type: "Song",
      user_id: this.props.currentuser.id
  })
    this.props.fetchSongsByArtist(this.props.match.params.username.split('-').join('-'))
  }

  deleteLike(e, id) {
    e.preventDefault()
    this.props.deleteLike(id)
    this.props.fetchSongsByArtist(this.props.match.params.username.split('-').join('-'))
  }

  render() {
    let content = null;
    

    if (Object.values(this.props.songs).length === 0) {
      content = (
        <>
          <div className='noplaylists'>
            <img className='noplaylistpic'src='https://image.flaticon.com/icons/svg/2311/2311991.svg'/>
            <p>Seems a little quiet over here.</p>
          </div>
        </>
      )
    } else {
      content = Object.values(this.props.songs).map(song => {
        // let num = song.id
        // const { [num] } = this.state
        
        let wave = (
          <>
          < Wave song={song} songtype={true} changedur={true}/>
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
        } else {
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
                <li className='sSong'><Link className='sSong' to={`/${this.props.user.username}/${song.hyperlink}`}>{song.title}</Link></li>
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
      )})
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
      )}

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

      

    return(
      <>
          <div className='profileOptions'>
            <section className='profileSections'>
              <Link to={`/${this.props.match.params.username}`}className='profileButtons'>All</Link>
              <Link to={`/${this.props.match.params.username}/tracks`} className='profileButtonsAll'>Tracks</Link>
              <Link to={`/${this.props.match.params.username}/sets`} className='profileButtons'>Playlists</Link>
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
                <p className='statNum'>{this.props.user.songs}</p>
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

export default withRouter(PopularTracks)