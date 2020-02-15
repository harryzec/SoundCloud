import React from 'react'
import ReactDOM from "react-dom";

class SongShow extends React.Component {
  constructor(props) {
    super(props)
    this.volumeChange = this.volumeChange.bind(this);
  }

  componentDidMount(){
    this.props.fetchSong(2);
  } 

  componentDidUpdate(prevProps, prevState){
    debugger
    if(this.props.playingStatus === 'playing'){
      document.getElementById('PlayingSong').play()
    } else if ( this.props.song !== 'none' ) {
      document.getElementById('PlayingSong').pause()
    }
  }

  volumeChange(type) {
      if (type==='up'){
        document.getElementById('PlayingSong').volume += .1
      } else {
        document.getElementById('PlayingSong').volume -= .1
      }
  }
  
  render(){
    if (this.props.song === 'none') {
      return(
        null
      )
    }

    const music = (
      <audio
        id='PlayingSong'
        src={this.props.song.songUrl}
      ></audio>
    )
    const pauseButton = (
      <button onClick={() => dispatch(this.props.pauseSong(this.props.song))}>Pause Song</button>
    )

    const playButton = (
      <button onClick={() => dispatch(this.props.playSong(this.props.song))}>Play Song</button>
    )

    let currentButton;

    if (this.props.playingStatus === 'playing') {
      currentButton = pauseButton;
    } else {
      currentButton = playButton;
    }

    return(
      <>
      <div className='continuousPlay'>
      {music}
      {currentButton}
      {this.props.song.title}
      <p> Is Playing!!??</p>
      </div>
      </>
    )

    
  }
}

export default SongShow