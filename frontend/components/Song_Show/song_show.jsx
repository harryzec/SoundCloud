import React from 'react'
import DeleteModal from '../delete_modal/delete_modal'


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
        <div>
            <div>
              <li> Add to playlist</li>
              <li>Stats</li>
              <li>Station</li>
              <button onClick={()=>this.props.openDeleteModal('open')}>Delete track</button>
            </div>

        </div>
        </>
      )
    } else {
      dropdown = (
        <>
          <div>
            <div>
              <li> Add to playlist</li>
              <li>Stats</li>
              <li>Station</li>
            </div>     

          </div>
        </>
      )
    }

    return(
      <>
      <DeleteModal song={this.props.song} userlink={this.props.match.params.username} />
      <div className='SongshowPage'>
        <div className='songplayer'>
          <div className='songPInf'></div>
            <div className='songPHead'>
              <div className='playSong'onClick={()=> this.handlePlay(song)}><p className='playcon'>&#9654;</p></div>
             
              <div className='SongTA'></div>
                <h3>{this.props.song.title}</h3>
              <div className='SongPlayT'>

              </div>
            </div>

            <div className='songWaveF'></div>
          <div className='songImgP'></div>
        
        </div>

      </div>
      {dropdown}
      </>
    )
  }
}

export default SongShow