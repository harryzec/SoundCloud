import React from 'react'
import DeleteModal from '../delete_modal/delete_modal'


class SongShow extends React.Component {
  componentDidMount() {
    debugger
    this.props.fetchSongShow(this.props.match.params.hyperlink, this.props.match.params.username)
  }

  render(){
    
    return(
      <>
      <DeleteModal song={this.props.song}/>

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
  }
}

export default SongShow