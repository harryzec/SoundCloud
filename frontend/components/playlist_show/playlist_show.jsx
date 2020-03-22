import React from 'react'
import {  Link } from 'react-router-dom'

class PlaylistShow extends React.Component {
  componentDidMount(){
    this.props.fetchPlaylist(this.props.match.params.username, this.props.match.params.permalink)
  }
  render() {
    return(
      <>
        <div className='SongshowPage'>
          <div className='songplayer'>
    
              <div className='playSongPage'><p className='playconS'>&#9654;</p></div>
              
              
                  <h3 className='songPT'></h3>
                  <h3 className='userPT'></h3>

                  <h3 className='songGS'>#</h3>
                  <img className='songIT'/>
  
            </div>
        </div>
      </>
    )
  }
}

export default PlaylistShow