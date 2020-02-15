import React from 'react';

class Discover extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSong(2);
  }

  handleSubmit(e){
    debugger
    e.preventDefault();
    this.props.logout().then(()=> this.props.history.push('/'))
  }

  handlePlay(song){
    this.props.playSong(song);
  }
  

  render() {
    if (!this.props.song) {
      return null;
    }

    return(
      <>
        <br></br>
        <br></br>
        <br></br>
        <form onSubmit={this.handleSubmit}>
        <button className="header-button">Log Out</button>
        </form>

      <button onClick={()=> this.handlePlay(this.props.song)}>Play {this.props.song.title}</button>
      
      </>
    )
  }
}

export default Discover;