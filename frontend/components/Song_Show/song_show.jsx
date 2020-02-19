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

      {dropdown}
      </>
    )
  }
}

export default SongShow