import React from 'react';

class NavBar extends React.Component {
  render(){
    if (this.props.match.isExact) {return null}

    return (
      <div className='navBar'>
        <div className='navButtons'>
        <button className='HomeButton'>Home</button>
        <button className='StreamButton'>Stream</button>
        <button className='LibraryButton'>Library</button>
        </div>
        <div className='searchSound'>
        <input type='text' placeholder='Search' className='searchMusicBar'/>
        <button className='searchNotes'>🔍</button>
        </div>
        <div className='lastSearch'>
          <button>Try Pro</button>
          <button className='uploadSongs'>Upload</button>
          <button>Picture/Username</button>
          <button className='bellButton'><img src={window.Bell} alt="Bell" className="Bell"/></button>
        </div>
      </div>)
  }
}

export default NavBar