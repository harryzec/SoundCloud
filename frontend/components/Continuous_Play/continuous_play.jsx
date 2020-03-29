import React from 'react'
import ReactDOM from "react-dom";

class SongShow extends React.Component {
  constructor(props) {
    super(props)
    this.volumeChange = this.volumeChange.bind(this);
    this.state = {duration: '0:00', currentTime: '0:00'}
    this.handleMetaData = this.handleMetaData.bind(this)
    this.handleCurrentTime = this.handleCurrentTime.bind(this);
    this.changePlace = this.changePlace.bind(this)
    this.seekBar = React.createRef();
    this.handleTimeline = this.handleTimeline.bind(this);
    this.getPosition = this.getPosition.bind(this)
  }

  componentDidMount() {
    setInterval(this.handleCurrentTime, 100);
  }

  handleCurrentTime(e) {
    if ( document.getElementById("PlayingSong") !== null) {
    const currentSong = document.getElementById("PlayingSong");
    const time = currentSong.currentTime;

    const currentTimeMin = Math.floor(time / 60);
    const currentTimeSec = (
        Math.floor(time % 60) < 10 ? 
        ("0" + Math.floor(time % 60)) : Math.floor(time % 60)
    );
    const currentTimeTotal = `${currentTimeMin + ":" + currentTimeSec}`;
    let playhead = document.getElementById('playhead');
    
 

    const playPercent = (((parseInt(currentTimeTotal.split(':')[0]) *60) + parseInt(currentTimeTotal.split(':')[1])) / (parseInt((this.state.duration.split(':')[0])*60) +parseInt(this.state.duration.split(':')[1])));
    let newwid = playPercent*500
    playhead.style.width = newwid + 'px';
    
    
    this.setState({ currentTime: currentTimeTotal });
    this.props.timer(currentTimeTotal)
  }
    // const filler = document.getElementById("cpb-timeline-progress-timepassed");
    // const handle = document.getElementById("cpb-timeline-progress-handle");
    
    // let mins = currentTimeTotal.split(":")[0] * 60);
    // let Secs = currentTimeTotal.split(":")[1];

    // let curr = parseInt(mins) + parseInt(Secs) 
    // // let numerator = parseInt(ctMins) + parseInt(ctSecs);
    
    // let dMins = (this.state.duration.split(":")[0] * 60);
    // let dSecs = this.state.duration.split(":")[1];
    // let total = parseInt(dMins) + parseInt(dSecs);
    
    // const howfar =  ((curr / total) * 100) + "%";
    
    // const bg = document.getElementById("cpb-timeline-progress");
        
    //     if (!this.state.drag) {
    //         handle.style.left = progress;
    //         filler.style.width = progress;
    //         document.getElementById("cpb-timeline-timepassed-show").innerHTML = currentTimeObj;
    //     }
    }


    
  componentDidUpdate(prevProps, prevState){
    if(this.props.playingStatus === 'playing'){
      document.getElementById('PlayingSong').play()  
      }
     else if ( this.props.song !== 'none' ) {
      document.getElementById('PlayingSong').pause()
    }
   
  }

  

  volumeChange(type) {
    debugger
      if (type==='up'){
        document.getElementById('PlayingSong').volume += .1
      } else {
        document.getElementById('PlayingSong').volume -= .1
      }
  }

  handleMetaData(e) {
    e.preventDefault();
    const modDurationMin = Math.floor(document.getElementById("PlayingSong").duration / 60);
    const modDurationSec = (
        Math.floor(document.getElementById("PlayingSong").duration % 60) < 10 ?
            ("0" + Math.floor(document.getElementById("PlayingSong").duration % 60)) : Math.floor(document.getElementById("PlayingSong").duration % 60)
    )
    const modDuration = `${modDurationMin + ":" + modDurationSec}`

    const modcurrentMin = Math.floor(document.getElementById("PlayingSong").currentTime / 60);
    const modcurrentSec = (
        Math.floor(document.getElementById("PlayingSong").currentTime % 60) < 10 ?
            ("0" + Math.floor(document.getElementById("PlayingSong").currentTime % 60)) : Math.floor(document.getElementById("PlayingSong").currentTime % 60)
    )
    const modCurrent = `${modcurrentMin + ":" + modcurrentSec}`


    const newState = Object.assign({}, this.state, {duration: modDuration, currentTime: modCurrent} );
    this.setState(newState);
}

changePlace(e) {
  debugger
  this.setState({ currentTime: e.target.value });
}

getPosition(el) {
  return el.getBoundingClientRect().left;
}

  handleTimeline(e) {
    e.preventDefault;
    debugger
    let timeline = document.getElementById("timeline")
    let part1 = (e.clientX - this.getPosition(timeline))
    let part2 = (timeline.clientWidth);

    
    debugger

    let wholething = (part1/part2)
    let songmin = this.state.duration.split(':')[0]*60
    let songsec = this.state.duration.split(':')[1]
    let dur = wholething * (songmin + parseInt(songsec))
    
    let player = document.getElementById('PlayingSong')
    player.currentTime = dur

    let mins = Math.floor(dur/60)
    let secs = dur % 60 
    let newer = mins + ':' + secs



    this.setState({currentTime: newer})

    let playhead = document.getElementById('playhead');

    let newwid = wholething*450
    playhead.style.width = newwid + 'px';
    this.setState({currentTime: newer})

  }
  
  

  render(){
    if (this.props.song === 'none') {
      return(
        null
      )
    }

    const music = (
      <audio
        preload="auto" 
        id='PlayingSong'
        src={this.props.song.songUrl}
        onLoadedMetadata={this.handleMetaData}
        
      ></audio>
    )
    const pauseButton = (
      <p className='currentbu' onClick={() => dispatch(this.props.pauseSong(this.props.song))}><img width='12' src='https://image.flaticon.com/icons/svg/1214/1214679.svg'/></p>
    )

    const playButton = (
      <p className='currentbu' onClick={() => dispatch(this.props.playSong(this.props.song))}><img width='12' src='https://image.flaticon.com/icons/svg/254/254434.svg'/></p>
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
      <p><img className='rewind' width='11'src='https://image.flaticon.com/icons/svg/860/860740.svg'/></p>
      {currentButton}
      <p><img className='fastforward'width='11'src='https://image.flaticon.com/icons/svg/660/660276.svg'/></p>
      <p><img className='shuffle' width='17' src='https://image.flaticon.com/icons/svg/724/724979.svg'/></p>
      <p><img className='repeat' width='18' src='https://www.flaticon.com/premium-icon/icons/svg/632/632966.svg'/></p>

      <p className='time1'>{this.state.currentTime}</p>

      <div className='timeConta'>
      <div id="timeline" onClick={this.handleTimeline}>
		    <div id="playhead"></div>
	    </div>
      </div>

      <p className='time2'>{this.state.duration}</p>

      <div className='volumeCont'>
        <img className='volumec1' width='15' src='https://image.flaticon.com/icons/svg/271/271239.svg' onClick={()=> this.volumeChange('up')}/>
        <img className='volumec2' width='15' src ='https://image.flaticon.com/icons/svg/566/566015.svg' onClick={()=> this.volumeChange('down')}/>
      </div>

      <img className='imgbar' src={this.props.song.imgUrl}/>

      <div className='barinfo'>
        <p className='baruse'>{this.props.song.user}</p>
        <p className='bartite'>{this.props.song.title}</p>
      </div>

      <img className='barHeart' width='20' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/>

      <img className='barOpt' width='20' src='https://image.flaticon.com/icons/svg/545/545705.svg'/>

      </div>
      </>
    )

    
  }
}

export default SongShow