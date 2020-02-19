import React from 'react';
import { withRouter } from "react-router";
class DeleteForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(e) {
    debugger
    e.preventDefault();
    this.props.deleteSong(this.props.song).then(() => this.props.closeModal()).then(() =>this.props.history.push(`/${this.props.userlink}`))
  }


  render(){
    const dropdown = (
      <>

      </>
    )

    if (this.props.song.user_id === this.props.currentuserId) {
      const dropdown = (
        <>
  
        </>
      )
    }
      
    return(
      <>
      <div>
        
      </div>
      <div className='deleteParent'></div>
      
        <h3 className='reallyDelete'>Permanently delete this track?</h3>
        <div className='deleteboxes'>
          <div className='deleteOne'>
            <p>Removing this track is irreversible. You will lose all the plays, likes and comments for this track with no way to get them back.</p>
            
            <div className='deBut'>
            <button className='cancelD'>Cancel</button>
            <button onClick={this.handleDelete}>Delete forever</button>
            </div>
          </div>
          <div className='deleteTwo'>
            <p>Never have to delete a track again. Unlock limitless upload time and the ability to replace tracks with a Pro plan.</p>
            <button className='learnButton'>Learn more</button>
          </div>
        
      </div>
      </>
    )
  }
}

export default withRouter(DeleteForm)