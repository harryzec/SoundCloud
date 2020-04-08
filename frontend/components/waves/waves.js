import React from 'react'
import WaveSurfer from 'wavesurfer.js';

class Waves extends React.Component {
  constructor(props){
    super(props)
    this.handleWave = this.handleWave.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.state = {song: this.props.song}
  }

  getPosition(el) {
    
    return el.getBoundingClientRect().left;
  }

  handleWave(e) {
    debugger
    if (this.props.song.id !== this.props.player.song.id) {
      this.handlePlay(this.props.song)
    } else if ( this.props.song.id === this.props.player.song.id && this.props.song.playlist !== this.props.player.song.playlist) { 
      debugger
      this.handlePlay(this.props.song)
      this.props.waveEvent({wholething: 0, fake: true})
      this.wavesurfer.seekTo(0)
      this.wavesurfer.play()
    } else {
    e.preventDefault()
    let timeline = document.getElementById(`waveformsong${this.props.song.id}${this.props.song.playlist || null}`)
    let part1 = (e.clientX - this.getPosition(timeline))
    let part2 = (timeline.clientWidth);
    let wholething = (part1/part2)
    this.props.waveEvent({wholething: wholething, fake: true})
    }
  }

  componentDidUpdate() {

    
    
    if (this.wavesurfer && this.props.song.id === this.props.player.song.id && this.props.song.playlist === this.props.player.song.playlist){
      let parts = this.props.time.split(':')
      let seconds = parseInt(parts[0])*60 + parseInt(parts[1])
      if (this.wavesurfer.getDuration() > 0 && seconds !== Math.floor(this.wavesurfer.getCurrentTime())) {
        this.wavesurfer.seekTo(seconds/this.wavesurfer.getDuration())
      }
    }
    
    // if (this.state.song.id !== this.props.song.id) {
    //   this.wavesurfer.load(this.props.song.songUrl);  
    //   this.setState({song: this.props.song})
    // }
  }

  componentDidMount() {


    if (!this.wavesurfer&& this.props.song) {
      if (this.props.song.catagory === 'song') {
      this.wavesurfer = WaveSurfer.create({
        container: `#waveformsong${this.props.song.id}${this.props.song.playlist || null}`,
        waveColor: '#ccc',
        progressColor: '#f50',
        barGraph: 10,
        barHeight: .65,
        barWidth: 2,
        reflection: true,
        // maxCanvasWidth: 200,
        fillParent: true,
        scrollParent: false,
        cursorWidth: 0,
        // interact: false,
        // autoCenter: true,
        // closeAudioContext: true,
        hideScrollbar: true,
        // partialRender: true,
        // removeMediaElementOnDestroy: true,
        pixelRatio: 1
      });
      
      this.wavesurfer.load(this.props.song.songUrl);  

      this.wavesurfer.on('ready', ()=> {
        if (this.props.player.song === this.props.song) {
          let timeparts = this.props.time.split(':')
          let timesec = parseInt(timeparts[0]*60) + parseInt(timeparts[1])
          this.wavesurfer.seekTo(timesec/this.wavesurfer.getDuration())
          if (this.props.player.player !== 'paused') {
            this.wavesurfer.play()
            this.wavesurfer.setVolume(0)
          }
        } 

        let tim = this.wavesurfer.getDuration()
        let min = Math.floor(tim/60)
        let sec = tim - (min*60) 
        sec = sec.toString().split('.')[0]
        if (sec.length < 2 ) {
          sec = '0' + sec
        }
        let duration = min.toString() + ':' + sec
        this.setState({duration: duration})
      })
    }
    }
}

handlePlay(song){
  if (song.id === this.props.player.song.id && song.playlist=== this.props.player.song.playlist) {
    this.wavesurfer.play()
    this.props.playSong(this.props.player.song);
    this.wavesurfer.setWaveColor('rgb(148, 148, 148)')
    this.wavesurfer.setVolume(0)
  } else {

    this.props.playSong(song);
    this.wavesurfer.play()
    this.wavesurfer.setWaveColor('rgb(148, 148, 148)')
    this.wavesurfer.setVolume(0)
  }
  
}

  render() {
    let time;

    if (this.props.player.song === this.props.song) {
      time = (
        <>
          <div className='timersong2'>{this.props.time}</div>
        </>
      )
      if (this.props.playlistdur) {
        time = (
          <>
            <div className='timersong3'>{this.props.time}</div>
          </>
        )
      }
    }
    let duration;

    if (this.state) { 
      if (this.state.duration){
        duration = (
          <>
            <div className='durationsong2'>{this.state.duration}</div>
          </>)
      }
    }
    if (this.props.changedur) {
      duration = (
        <>
          <div className='durationsong3'>{this.state.duration}</div>
        </>)
    }

    if (this.wavesurfer && this.props.song === this.props.player.song && this.props.player.player === 'playing') {
      this.wavesurfer.play();
      this.wavesurfer.setVolume(0)
    }

    if (this.props.player.player === 'playing' && this.props.song === this.props.player.song && this.wavesurfer) {
      this.wavesurfer.setWaveColor('rgb(148, 148, 148)')
      this.wavesurfer.play()
    } else if (this.wavesurfer) {
      this.wavesurfer.setWaveColor('#ccc')
      this.wavesurfer.pause()
    }

   if ((this.props.player.song.id !== this.props.song.id && this.wavesurfer) || (this.props.player.song.playlist !== this.props.song.playlist && this.props.player.song.id === this.props.song.id && this.wavesurfer)) {
    this.wavesurfer.seekTo(0)
   }
   

   let type = 'waveform-holders';

   if (this.props.songtype === true) {
     type = 'waveform-holderssong'
   } else if (this.props.songtype === 'search') {
     type = 'waveform-holderssearch'
   } else if (this.props.songtype ==='stream') {
     type ='waveform-holdersstream'
   }

   
   let second = null
   if (this.props.song.playlist) {
    second = this.props.song.playlist
   }
   


    return(
      <>
      {time}
      {duration}
      <div className={type}>
        <div onClick={this.handleWave} id={`waveformsong${this.props.song.id}${second}`}></div>
      </div>
      </>
    )
  }
}

export default Waves