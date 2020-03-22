import React from 'react';
import { withRouter } from "react-router";
class DeletePlaylistForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deletePlaylist(this.props.playlist.id)
    setTimeout(()=>this.props.fetchPlaylistByArtist(this.props.match.params.username), 1000)
    this.props.closeModal()
  }
  render(){
    return(
      <>
        <div className='deleteplaylistmod'>
          <div className='deleteplayhead'>
            <h2 className='deleteplay'>Delete playlist</h2>
          </div>

          <div className='deleteplaycontent'>
            <p>Are you sure you want to delete {this.props.playlist.title}? This action cannot be undone.</p>
          </div>

          <div className='playlistoptz'>
            <div onClick={() => this.props.closeModal()} className='cancdel'>Cancel</div>
            <div onClick={this.handleDelete} className='deleplay'>Delete</div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(DeletePlaylistForm)