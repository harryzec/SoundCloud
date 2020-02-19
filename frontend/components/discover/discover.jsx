import React from 'react';
import { Link } from 'react-router-dom'

class Discover extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // debugger
    this.props.fetchSong(5);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.logout().then(()=> this.props.history.push('/'))
  }

  handlePlay(song){
    this.props.playSong(song);
  }
  

  render() {
    // debugger
    if (!this.props.song) {
      return null;
    }

    return(
      <>
      <div className='discoverMain'>
        <form onSubmit={this.handleSubmit} className='logoutButton'>
        <button className="header-button">Log Out</button>
        </form>

      <Link to='/klamarxoxo'>Kendrick Lamar</Link>
      <br></br>
      <Link to='/demouser'>Demo</Link>

      <button onClick={()=> this.handlePlay(this.props.song)}>Play {this.props.song.title}</button>
      </div>
      </>
    )
  }
}

export default Discover;