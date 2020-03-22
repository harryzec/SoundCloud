import React from 'react'
import DeleteModal from '../delete_modal/delete_modal'
import EditModal from '../edit_modal/edit_modal'
import { Link } from 'react-router-dom'


class SongShow extends React.Component {
  constructor(props){
    super(props)
    this.shuffleArray = this.shuffleArray.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
  }

  componentDidMount() {
    this.props.fetchSongShow(this.props.match.params.hyperlink, this.props.match.params.username.split('-').join(' '))
    this.props.fetchSongsByArtist(this.props.match.params.username)
    debugger
  }
  
  handlePlay(song){
    this.props.playSong(song);
  }

  _handleKeyDown(e) {
    debugger
    if (e.key === 'Enter') {
      this.props.createComment({body: e.target.value, user_id: this.props.currentuser.id, song_id: this.props.song.id})
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

    let comments = this.props.song.comments.map(comment => (
      <>
        {comment.body}
      </>
    ))

    return(
      <>
      <EditModal/>
      <DeleteModal song={this.props.song} userlink={this.props.match.params.username} />
      <div className='SongshowPage'>
        <div className='songplayer'>
  
            <div className='playSongPage'onClick={()=> this.handlePlay(this.props.song)}><p className='playconS'>&#9654;</p></div>
             
             
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
                  <button className='songBuS'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> Like</button>
                  <button className='songBuS'><img width='10' src='https://image.flaticon.com/icons/svg/1828/1828956.svg'/> Share</button>
                  <button className='songBuS' onClick={e => this.handleEdit(e, this.props.song)}>&#9998; Edit</button>
                  {dropdown}
                </div>
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
                
              </div>

              <img className='nocomments' height='300' width='400'src={window.nocomment}/>
              {comments}
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