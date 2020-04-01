import React from 'react'
import DeleteModal from '../delete_modal/delete_modal'
import EditModal from '../edit_modal/edit_modal'
import { Link } from 'react-router-dom'
import WaveSurfer from 'wavesurfer.js';


class SongShow extends React.Component {
  constructor(props){
    super(props)
    this.shuffleArray = this.shuffleArray.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this.createLike = this.createLike.bind(this)
    this.deleteLike = this.deleteLike.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.handleWave = this.handleWave.bind(this)
  }

  getPosition(el) {
    return el.getBoundingClientRect().left;
  }

  handleWave(e) {
    if (this.props.song.id !== this.props.player.song.id) {
      this.handlePlay(this.props.song)
    } else {
    e.preventDefault()
    let timeline = document.getElementById("waveform")
    let part1 = (e.clientX - this.getPosition(timeline))
    let part2 = (timeline.clientWidth);
    let wholething = (part1/part2)
    this.props.waveEvent({wholething: wholething, fake: true})
    }
  }
  

  handleDeleteComment(e, id, idx) {
    e.preventDefault()
    this.props.deleteComment(id)
    let newComments = this.state.comments.slice(0, idx).concat(this.state.comments.slice(idx+1))
    this.setState({comments: newComments})
  }

  componentDidMount() {
    this.props.fetchSongShow(this.props.match.params.hyperlink, this.props.match.params.username.split('-').join(' '))
    this.props.fetchSongsByArtist(this.props.match.params.username)
  }

  componentDidUpdate() {

    if (!this.wavesurfer&& this.props.song) {
      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#ccc',
        progressColor: '#f50',
        barGraph: 10,
        barHeight: .75,
        barWidth: 2,
        reflection: true,
        // maxCanvasWidth: 200,
        fillParent: true,
        scrollParent: false,
        cursorWidth: 0,
        // interact: false,
        // autoCenter: true,
        // closeAudioContext: true,
        hideScrollbar: true,
        // partialRender: true,
        // removeMediaElementOnDestroy: true,
        pixelRatio: 1
      });
     
      this.wavesurfer.load(this.props.song.songUrl);  

      this.wavesurfer.on('ready', ()=> {
        if (this.props.player.song.id === this.props.song.id) {
          let timeparts = this.props.time.split(':')
          let timesec = parseInt(timeparts[0]*60) + parseInt(timeparts[1])
          this.wavesurfer.seekTo(timesec/this.wavesurfer.getDuration())
          if (this.props.player.player !== 'paused') {
            this.wavesurfer.play()
            this.wavesurfer.setVolume(0)
          }
        } 

        let tim = this.wavesurfer.getDuration()
        let min = Math.floor(tim/60)
        let sec = tim - (min*60) 
        sec = sec.toString().split('.')[0]
        if (sec.length < 2 ) {
          sec = '0' + sec
        }
        let duration = min.toString() + ':' + sec
        this.setState({duration: duration})
      })

      
 
    } else if (this.wavesurfer && this.props.time === '0:00') {
      this.wavesurfer.seekTo(0)
    
  }
    
    
  }
  
  handlePlay(song){
    if (song.id === this.props.player.song.id) {
      this.wavesurfer.play()
      this.props.playSong(this.props.player.song);
      this.wavesurfer.setWaveColor('white')
      this.wavesurfer.setVolume(0)
    } else {

      this.props.playSong(song);
      this.wavesurfer.play()
      this.wavesurfer.setWaveColor('white')
      this.wavesurfer.setVolume(0)
    }
    
  }

  handlePause(song) {
    if (song.id === this.props.player.song.id) {
      this.props.pauseSong(this.props.player.song)
    this.wavesurfer.pause()
    this.wavesurfer.setWaveColor('#ccc')
    } else {
      this.props.pauseSong(song)
      this.wavesurfer.pause()
      this.wavesurfer.setWaveColor('#ccc')
    }
  }
  createLike(e) {
    e.preventDefault()
    this.props.createLike({    
      likeable_id: this.props.song.id,
      likeable_type: "Song",
      user_id: this.props.currentuser.id
  })
  this.props.fetchSongShow(this.props.match.params.hyperlink, this.props.match.params.username.split('-').join(' '))

  }

  deleteLike(e, id) {
    e.preventDefault()
    this.props.deleteLike(id)
    this.props.fetchSongShow(this.props.match.params.hyperlink, this.props.match.params.username.split('-').join(' '))
  }
  

  _handleKeyDown(e) {
    let oldComments;
    let newComment;
    let newList;
    if (e.key === 'Enter') {
      this.props.createComment({body: e.target.value, user_id: this.props.currentuser.id, song_id: this.props.song.id})
      oldComments = this.state.comments
      newComment = {body: e.target.value}
      newList = oldComments.push(newComment)
      this.setState({comments: newList})
    }
  }

  handleEdit (e, song) {
    e.preventDefault();
    this.props.openEditModal('edit', song)
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array
  }


  render(){
    
 
    if (!this.props.song) {
      return null
    }

    let time;

    
   

    let relatedSongs = this.shuffleArray(this.props.othersongs).slice(0, 3).map( song => (
      <>
      <div className='randomSong'>
        <img width='50' height='50' src={song.imgUrl} />
        <div className='OsongLinks'>
          <Link className='songuser' to={`/${song.user.split(' ').join('-')}`}>{song.user}</Link>
          <Link className='songtit' to={`/${song.user.split(' ').join('-')}/${song.hyperlink}`}>{song.title}</Link>
        </div>
      </div>
      </>
     ) ) 



    let dropdown;

    if (this.props.song.user === this.props.userId) {
      dropdown = (
        <>
          <button className='songBuS' onClick={()=>this.props.openDeleteModal('open')}>Delete track</button>
        </>
      )
    } else {
      dropdown = (
        <>
          <button className='songBuS'>...More</button>
        </>
      )
    }

    let comments;
    if (this.state === null) {
    
      this.setState({comments: this.props.song.comments, updateWave: this.props.updateWave})
    } else {
      if(this.state.comments.length > 0) {
      let commentBody = this.state.comments.map((comment, idx) => {
        let user='You'
        let garbage = null
        if (comment.username !== this.props.currentuser.username) {
          user = comment.username
        } else {
          garbage = (
            <>
              <div className='garbage' onClick={(e) => this.handleDeleteComment(e, comment.id, idx)}>
                <img width='16' className='trashcomment' src='https://image.flaticon.com/icons/svg/1345/1345823.svg'/>
                <div className='removecomment'>
                  <p>Do you really want to remove this comment?</p>
                </div>
              </div>
            </>
          )
        }
        return(
        <>
          <div className='commentcont'>
            <img className='commentpic'src ={this.props.song.userImg}/>
            <div className='commentinfo'>
              <div className='flex'>
                <p className='commenter'>{user}</p>
                <p className='commenter'>{comment.created} ago</p>
              </div>
              <div className='flex'>
                <p className='commentbod'>{comment.body}</p>
                {garbage}
              </div>
              
            </div>

            

          </div>
        </>
      )})
      comments = (
        <>
          <div>
            <div className='commentlist'>
              <h2 className='commenthead'><img className='compic'width='18' src='https://image.flaticon.com/icons/svg/1380/1380338.svg'/> {this.state.comments.length} Comments</h2>
            </div>
            {commentBody}
          </div>
        </>
      )
      } else {
        comments = (
          <>
          <img className='nocomments' height='300' width='400'src={window.nocomment}/>
          </>
        )
      }
    }

    let likedbutton = (
      <button onClick={this.createLike} className='songBuS'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> Like</button>
    )
    this.props.song.likes.forEach(like => {
      if (like.user_id === this.props.currentuser.id) {
        likedbutton = (
          <button onClick={(e) => this.deleteLike(e, like.id)} className='songBuSl'>&#9829; Liked</button>
        )
      }
    })

    let play;
    if (this.props.player.song.id === this.props.song.id) {
      time = (
        <>
          <div className='timersong'>{this.props.time}</div>
        </>
      )
    }


    if (this.props.player.song.id === this.props.song.id && this.props.player.player === 'playing') {
      
      play = (
        <div className='playSongPage'onClick={()=> this.handlePause(this.props.song)}><p className='playconS'>||</p></div>
      )

    } else {
      play = (
        <div className='playSongPage'onClick={()=> this.handlePlay(this.props.song)}><p className='playconS'>&#9654;</p></div>
        )
    }

  if (this.state) {
    if (this.state.updateWave === undefined) {
      this.setState({updateWave: this.props.waveUpdate})
    } else if (this.props.waveUpdate !== this.state.updateWave) {
      
      this.wavesurfer.seekTo(this.props.waveUpdate/this.wavesurfer.getDuration())
      this.setState({updateWave: this.props.updateWave})
    }
  }

  

  if (this.props.player.player === 'playing' && this.props.song.id === this.props.player.song.id && this.wavesurfer) {
    this.wavesurfer.setWaveColor('white')
    this.wavesurfer.play()
  } else if (this.wavesurfer) {
    this.wavesurfer.setWaveColor('#ccc')
    this.wavesurfer.pause()
  }
  
  let duration;

  
  if (this.state) {
    if (this.state.duration){
      duration = (
        <>
          <div className='durationsong'>{this.state.duration}</div>
        </>)
    }
  }


    

    return(
      <>
      <EditModal/>
      <DeleteModal song={this.props.song} userlink={this.props.match.params.username} />
      <div className='SongshowPage'>
        <div className='songplayer'>
            
            {play}        
            {time}     
            {duration}
         
              <div className='waveform-holder'>
                <div onClick={this.handleWave} id='waveform'></div>
              </div>
           
                
                <h3 className='songPT'>{this.props.song.title}</h3>
                <h3 className='userPT'>{this.props.username}</h3>

                <h3 className='songGS'>#{this.props.song.genre}</h3>
                <img className='songIT' src={this.props.song.imgUrl}/>
 
          </div>

        <div className='songConts'>
          <div className='commentsEtc'>

            <div className='topSec'>

              <div className='commentsInputBar'>
                <img className='commentPic' src={this.props.currentuser.profileUrl}/>
                <div className='commentWrap'>
                  <input className='commentInput' onKeyDown={this._handleKeyDown} placeholder='Write a comment'/>
                </div>
              </div>

              <div className='songFootS'>
                <div className='songBOS'>
                  {likedbutton}
                  <button className='songBuS'><img width='10' src='https://image.flaticon.com/icons/svg/1828/1828956.svg'/> Share</button>
                  <button className='songBuS' onClick={e => this.handleEdit(e, this.props.song)}>&#9998; Edit</button>
                  {dropdown}
                </div>
                <p className='likesnum'>&#9829; {this.props.song.likes.length}</p>
              </div>

              <div className='topB'></div>

            </div>

            <div className='commentsandP'>
              <div className='profInf'>
                <img className='profimgn' src={this.props.song.userImg}/>
                <Link className='profimgU' to={`/${this.props.song.user.split(' ').join('-')}`}>{this.props.song.user}</Link>
              </div>
              <div className='descriptionandCom'>
                <p className='songDesc'>{this.props.song.description}</p>
                {comments}
              </div>
            </div>

          </div>
          <div className='relatedContent'>
            <div>
              <p className='relatedSong'><img width='10' src='https://www.flaticon.com/premium-icon/icons/svg/2325/2325990.svg'/> Related Tracks</p>
            </div>
            {relatedSongs}
          </div>

        </div>

      </div>
      {/* {dropdown} */}
      </>
    )
  }
}

export default SongShow