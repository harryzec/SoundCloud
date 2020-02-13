import React from 'react';

class NavBar extends React.Component {
  render(){
    if (this.props.match.isExact) {return null}

    return (
      <div className='navBar'>
        <button className='HomeButton'>Home</button>
        <button className='StreamButton'>Stream</button>
        <button className='LibraryButton'>Library</button>
      </div>)
  }
}

export default NavBar