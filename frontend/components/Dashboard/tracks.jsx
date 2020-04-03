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
  }

  addQueue(e, song) {
    debugger
    e.preventDefault()
    debugger
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
    debugger

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
          < Wave song={song} songtype={true}/>
          </>
        ) 
        

        let likebutton = (
          <>
            <button onClick={(e) => this.createLike(e, song.id)}className='songBu1'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {song.likes.length}</button>
          </>
        )

        song.likes.forEach(like => {
          debugger
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
              <button className='songBu3' onClick={() => this.props.openPlaylistModal('playlist', song)}>&#9998; Add to Playlist</button>
              <button className='songBu4' onClick={() => this.setState({[song.id]: 'moreshow'})}>Add to up next</button>
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
    debugger
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

      debugger

    return(
      <>
          <div className='profileOptions'>
            <section className='profileSections'>
              <Link to={`/${this.props.match.params.username}`}className='profileButtons'>All</Link>
              <Link to={`/${this.props.match.params.username}/popular-tracks`} className='profileButtons'>Popular tracks</Link>
              <Link to={`/${this.props.match.params.username}/tracks`} className='profileButtonsAll'>Tracks</Link>
              <Link to={`/${this.props.match.params.username}/sets`} className='profileButtons'>Playlists</Link>
            </section>
            <section className='profileExtra'>
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