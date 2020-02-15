import React from 'react';

class SongShow extends React.Component {
  componentDidMount(){
    debugger
    this.props.fetchSong(2);
  } 
  
  render(){
    if (!this.props.song) {
      return null;
    }
       
    return(
      <>
      <h1>{this.props.song.title}</h1>
      <audio
        ref={this.props.song}

      />
      </>
    )
  }
}

export default SongShow