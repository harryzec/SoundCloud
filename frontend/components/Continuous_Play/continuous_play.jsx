import React from 'react'
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom'

class SongShow extends React.Component {
  constructor(props) {
    super(props)
    this.volumeChange = this.volumeChange.bind(this);
    this.state = {duration: '0:00', currentTime: '0:00', waveEvent: this.props.wave, queue: this.props.queue}
    this.handleMetaData = this.handleMetaData.bind(this)
    this.handleCurrentTime = this.handleCurrentTime.bind(this);
    this.changePlace = this.changePlace.bind(this)
    this.seekBar = React.createRef();
    this.handleTimeline = this.handleTimeline.bind(this);
    this.getPosition = this.getPosition.bind(this)
    this.createLike = this.createLike.bind(this)
    this.deleteLike = this.deleteLike.bind(this)
    this.removeQueue = this.removeQueue.bind(this)
    this.restart = this.restart.bind(this)
    this.nextSong = this.nextSong.bind(this)
  }

  nextSong() {
    this.props.playSong(this.props.queue[0])
    this.props.playedSong()
  }

  restart() {
    const currentSong = document.getElementById("PlayingSong");
    currentSong.currentTime = 0;
  }

  removeQueue(e, i) {
    debugger
    let newqueue = this.state.queue.slice(0, i).concat(this.state.queue.slice(i +1))
    this.props.replaceQueue(newqueue)
  }

  createLike(e) {
    e.preventDefault()
    this.props.createLike({    
      likeable_id: this.props.song.id,
      likeable_type: "Song",
      user_id: this.props.currentuser.id
  })

  }

  deleteLike(e, id) {
    e.preventDefault()
    this.props.deleteLike(id)
    let username= this.props.match.params.username.split('-').join(' ')
    this.props.fetchSongsByArtist(username)

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
    this.props.timer(currentTimeTotal);

    if (currentTimeTotal === this.state.duration && this.state.duration !== '0:00') {
      this.props.playSong(this.props.queue[0])
      this.props.playedSong()
    }
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

  

  volumeChange(e) {
    e.preventDefault();
    document.getElementById('PlayingSong').volume = (e.currentTarget.value / 100)
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
  
  this.setState({ currentTime: e.target.value });
}

getPosition(el) {
  return el.getBoundingClientRect().left;
}

  handleTimeline(e) {
    let wholething;

    if (!e.fake) {
      e.persist()
      e.preventDefault;
      let timeline = document.getElementById("timeline")
      let part1 = (e.clientX - this.getPosition(timeline))
      let part2 = (timeline.clientWidth);
      wholething = (part1/part2)
    } else {
      wholething = e.wholething
    }
    
   

    
    let songmin = this.state.duration.split(':')[0]*60
    let songsec = this.state.duration.split(':')[1]
    let dur = wholething * (songmin + parseInt(songsec))
    
    let player = document.getElementById('PlayingSong')
    player.currentTime = dur
    if (!e.fake) {
      this.props.updateWave(dur)
    }


    let mins = Math.floor(dur/60)
    let secs = Math.floor(dur % 60)
    let newer = mins + ':' + secs
    if (secs < 10) {
      newer = mins + ':' + '0' + secs
    }
    


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

    if (this.state.queue !== this.props.queue) {
      this.setState({queue: this.props.queue})
    }


    let queue = this.state.queue.map((song, i) => {
      return(
        <>
          <div className='queueflex'>
            <img height='50' width='50' src={song.imgUrl}/>
            <div className='queueinf'>
              <div className='queuetit'>{song.title}</div>
              <div className='queueuser'>
                <div>{song.user}</div>
                <div onClick={(e) => this.removeQueue(e, i)}className='lilx'>x</div>
              </div>
            </div>

          </div>
        </>
      )
    })

    if (this.state.queue.length === 0) {
      queue = (
        <>
          <p className='addsongstoqueue'>Add songs to Queue!</p>
        </>
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

    if (this.props.wave !== this.state.waveEvent) {
      this.handleTimeline(this.props.wave)
      this.setState({waveEvent: this.props.wave})
    }


    return(
      <>
      <div className='continuousPlay'>
      {music}
      <img className='rewind' onClick={this.restart} width='11'src='https://image.flaticon.com/icons/svg/860/860740.svg'/>
      {currentButton}
      <img onClick={this.nextSong} className='fastforward'width='11'src='https://image.flaticon.com/icons/svg/660/660276.svg'/>
      <img className='shuffle' width='17' src='https://image.flaticon.com/icons/svg/724/724979.svg'/>
      <img className='repeat' width='18' src='https://www.flaticon.com/premium-icon/icons/svg/632/632966.svg'/>

      <p className='time1'>{this.state.currentTime}</p>

      <div className='timeConta'>
        <div id="timeline" onClick={this.handleTimeline}>
          <div id="playhead"></div>
        </div>
      </div>

      <p className='time2'>{this.state.duration}</p>

      <div className='volumeCont'>
        <img className='volcontrol' width='17' src='https://image.flaticon.com/icons/svg/483/483365.svg'/>
        
        <div className='rangecontainer'>
          <input type='range' min='0' max='100' onChange={this.volumeChange} className='soundbar'/>
        </div>
        
        
        {/* <img className='volumec1' width='15' src='https://image.flaticon.com/icons/svg/271/271239.svg' onClick={()=> this.volumeChange('up')}/> */}
        {/* <img className='volumec2' width='15' src ='https://image.flaticon.com/icons/svg/566/566015.svg' onClick={()=> this.volumeChange('down')}/> */}
      </div>

      <img className='imgbar' src={this.props.song.imgUrl}/>

      <div className='barinfo'>
        <Link to={`/${this.props.song.user}`}className='baruse'>{this.props.song.user}</Link>
        <Link to={`/${this.props.song.user}/${this.props.song.hyperlink}`} className='bartite'>{this.props.song.title}</Link>
      </div>

      <img className='barHeart' onClick={this.createLike} width='20' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/>

      <div className='showqueue'>
        <img className='barOpt' width='20' src='https://image.flaticon.com/icons/svg/545/545705.svg'/>
        <div className='realqueue'>
          <h2 className='upnext'>Up Next</h2>
          {queue}
        </div>
      </div>

      </div>
      </>
    )

    
  }
}

export default SongShow