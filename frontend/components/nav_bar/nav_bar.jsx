import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.handleDrop = this.handleDrop.bind(this)
    this.state = { NavDrop: 'navDropDown', userdrop: 'userdrop' };
  }

  handleDrop(e) {
    if (this.state.NavDrop === 'navDropDown'){
      // debugger
      this.setState({NavDrop: 'navDropDownShow', userdrop: 'userdropclick'})
    } else {
      this.setState({NavDrop: 'navDropDown', userdrop: 'userdrop'})
    }
  }

  render(){
    // debugger
    const { NavDrop, userdrop } = this.state

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

        <div className={userdrop} onClick={this.handleDrop}>
          <div className='profHead'><img className='navPic' src={`${this.props.user.profileUrl}`}/><p className='navUsername'>{this.props.user.username} </p> </div>
          <p className='dA'>&#8964;</p>
            <div className={NavDrop}>
              <Link className='firstEle1' to={`/${this.props.user.username.split(' ').join('-')}`}> <li className='firstEle'>&#8962; Profile</li></Link>
              <li className='listEle' >&#43; Likes</li>
              <li className='listEle'>&#12316; Stations</li>
              <li className='listEle'>&#9738; Who to follow</li>
              <li className='listEle'>&#9734; Try Pro</li>
              <li className='TrackLI'>	&#9835; Tracks</li>
              <li className='listEle'>&#8599; Stats</li>
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
  debugger
  let current;
  if (state.session.currentUser===null){
    current = null
  } else {
    current = state.session.currentUser;
  }
  return{
    user: current
  }
}



export default connect(mSTP, null)(NavBar)