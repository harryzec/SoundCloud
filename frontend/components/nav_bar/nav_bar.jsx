import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class NavBar extends React.Component {
  render(){
    if (this.props.match.isExact) {return null}

    if (this.props.user === null) {
      return(null)
    }

    return (
      <>
      <div className='navMarg'>
      <div className='navBar'>
        <div className='navButtons'>
        <Link to='./discover' className='HomeButton'>Home</Link>
        <button className='StreamButton'>Stream</button>
        <button className='LibraryButton'>Library</button>
        </div>
        <div className='searchSound'>
        <input type='text' placeholder='Search' className='searchMusicBar'/>
        <div className='buttonBack'>
          <button className='searchNotes'></button>
        </div>
        </div>
        <div className='lastSearch'>
          <button className='tryPro'>Try Pro</button>
          <Link to='/upload' className='UploadClick'>Upload</Link>
          <button className='userdrop'>{this.props.user}</button>
            <button className='bellButton'>
                <img src={window.Bell} alt="Bell" className='bellPic'/>
            </button>
        </div>
      </div>
      </div>
      </>)
  }
}

const mSTP = state => {
  let current;
  if (state.session.currentUser===null){
    current = 'log in'
  } else {
    current = state.session.currentUser.username;
  }
  return{
    user: current
  }
}

export default connect(mSTP, null)(NavBar)