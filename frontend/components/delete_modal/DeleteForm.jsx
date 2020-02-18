import React from 'react'
class DeleteForm extends React.Component {
  render(){
    return(
      <>
      <div>
        <h1>yo delete that</h1>
      </div>
      <div className='deleteParent'></div>
      <div>
        <h3>Permanently delete this track?</h3>
        <div>
          <div>
            <p>Removing this track is irreversible. You will lose all the plays, likes and comments for this track with no way to get them back.</p>
            <button>Cancel</button>
            <button>Delete</button>
          </div>
          <div>
            <p>Never have to delete a track again. Unlock limitless upload time and the ability to replace tracks with a Pro plan.</p>
            <button>Learn more</button>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default DeleteForm