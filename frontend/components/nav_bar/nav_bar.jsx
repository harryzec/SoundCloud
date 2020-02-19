import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.handleDrop = this.handleDrop.bind(this)
    this.state = { NavDrop: 'navDropDown' };
  }

  handleDrop(e) {
    if (this.state.NavDrop === 'navDropDown'){
      // debugger
      this.setState({NavDrop: 'navDropDownShow'})
    } else {
      this.setState({NavDrop: 'navDropDown'})
    }
  }

  render(){
    // debugger
    const { NavDrop } = this.state

    if (this.props.match.isExact) {return null}

    if (this.props.user === null) {
      return(null)
    }

    return (
      <>
      <div className='navMarg'>
      <div className='navBar'>
        <div className='navButtons'>
        <Link to='/discover' className='HomeButton'>Home</Link>
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

        <div className='userdrop' onClick={this.handleDrop}>
          <div className='profHead'><img className='navPic' src={`${this.props.user.profileUrl}`}/><p className='navUsername'>{this.props.user.username}</p> </div>
            <div className={NavDrop}>
              <Link to={`/${this.props.user.username.split(' ').join('-')}`}> &#x1F464; Profile</Link>
              <li>Likes</li>
              <li>Stations</li>
              <li>Who to follow</li>
              <li>Try Pro</li>
              <li>Tracks</li>
              <li>Stats</li>
            </div>

          </div>
            <button className='bellButton'>
              &#10003;
                {/* <img src={window.betterBell} alt="Bell" className='bellPic'/> */}
            </button>

            <div className='email'>
              &#x2709;
            </div>

            <div className='dots'>
              {/* &#8230; */}
              <p>...</p>
            </div>

            
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
    current = state.session.currentUser;
  }
  return{
    user: current
  }
}



export default connect(mSTP, null)(NavBar)