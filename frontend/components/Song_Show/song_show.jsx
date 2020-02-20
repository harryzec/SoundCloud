import React from 'react'
import DeleteModal from '../delete_modal/delete_modal'
import EditModal from '../edit_modal/edit_modal'


class SongShow extends React.Component {

  componentDidMount() {
    debugger
    this.props.fetchSongShow(this.props.match.params.hyperlink, this.props.match.params.username.split('-').join(' '))
  }
  

  render(){
    
    debugger
    if (!this.props.song) {
      return null
    }

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

    return(
      <>
      <EditModal/>
      <DeleteModal song={this.props.song} userlink={this.props.match.params.username} />
      <div className='SongshowPage'>
        <div className='songplayer'>
  
            <div className='playSongPage'onClick={()=> this.handlePlay(song)}><p className='playconS'>&#9654;</p></div>
             
             
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
                  <input className='commentInput' placeholder='Write a comment'/>
                </div>
              </div>

              <div className='songFootS'>
                <div className='songBOS'>
                  <button className='songBuS'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> Like</button>
                  <button className='songBuS'><img width='10' src='https://image.flaticon.com/icons/svg/1828/1828956.svg'/> Share</button>
                  <button className='SongBuS' onClick={e => this.handleEdit(e, song)}>&#9998; Edit</button>
                  {dropdown}
                </div>
              </div>

              <div className='topB'></div>

            </div>

            <div className='commentsandP'>
              <div className='profInf'>
                <img className='profimgn' src={this.props.song.userImg}/>
              </div>
            </div>

          </div>
          <div className='relatedContent'>

          </div>

        </div>

      </div>
      {/* {dropdown} */}
      </>
    )
  }
}

export default SongShow