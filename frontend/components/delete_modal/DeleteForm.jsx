import React from 'react';
import { withRouter } from "react-router";
class DeleteForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(e) {
    
    e.preventDefault();
    this.props.deleteSong(this.props.song).then(() => this.props.closeModal()).then(() =>this.props.history.push(`/${this.props.userlink}`))
  }

  handlePlay(song){
    this.props.playsong(song);
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
      <div className='deltop'>
        <img className='delPic'src={this.props.song.imgUrl}/>
        <div className='playSongPageD'onClick={()=> this.handlePlay(this.props.song)}><p className='playconD'>&#9654;</p></div>  
        <div className='nameshit'>
          <p className='deleu'>{this.props.song.user}</p>
          <p className='delett'>{this.props.song.title}</p>
        </div>
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