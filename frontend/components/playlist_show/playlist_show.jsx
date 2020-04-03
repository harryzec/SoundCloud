import React from 'react'
import {  Link } from 'react-router-dom'
import EditPlaylistForm from '../edit_modal/edit_playlist_modal'
import DeletePlaylist  from '../delete_modal/delete_playlist_modal'
import WaveSurfer from 'wavesurfer.js';


class PlaylistShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {duration: '0:00'}
    this.handleWave = this.handleWave.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.updateWave = this.updateWave.bind(this)
    this.createLike = this.createLike.bind(this)
    this.deleteLike = this.deleteLike.bind(this)
  }

  createLike(e) {
    e.preventDefault()
    this.props.createLike({    
      likeable_id: this.props.playlist.id,
      likeable_type: "Playlist",
      user_id: this.props.currentuser.id
    })
    this.props.fetchPlaylist(this.props.match.params.username, this.props.match.params.permalink)
  }

  deleteLike(e, id) {
    e.preventDefault()
    this.props.deleteLike(id)
    this.props.fetchPlaylist(this.props.match.params.username, this.props.match.params.permalink)
  }

  updateWave(song) {
    this.wavesurfer.load(song.songUrl);  

    this.wavesurfer.on('ready', ()=> {
      debugger
      if (this.props.tracks.some(track => track.id === this.props.player.song.id)) {
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
      let newDuration = min.toString() + ':' + sec
      this.setState({duration: newDuration})
    })
  }

  componentDidMount(){
    
    this.props.fetchPlaylist(this.props.match.params.username, this.props.match.params.permalink)
  }

  getPosition(el) {
    return el.getBoundingClientRect().left;
  }

  handleWave(e) {
    e.preventDefault()
    let timeline = document.getElementById("playlistwaveform")
    let part1 = (e.clientX - this.getPosition(timeline))
    let part2 = (timeline.clientWidth);
    let wholething = (part1/part2)
    this.props.waveEvent({wholething: wholething, fake: true})
  }
  

  componentDidUpdate() {
    if (this.props.match.params.permalink !== this.props.playlist.permalink) {
      this.props.fetchPlaylist(this.props.match.params.username, this.props.match.params.permalink)
    }

    if (!this.wavesurfer && this.props.playlist.id === this.props.player.song.playlist) {
      this.wavesurfer = WaveSurfer.create({
        container: '#playlistwaveform',
        waveColor: '#ccc',
        progressColor: '#f50',
        barGraph: 10,
        barHeight: .75,
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
     
      this.wavesurfer.load(this.props.player.song.songUrl);  

      this.wavesurfer.on('ready', ()=> {
        debugger
        if (this.props.tracks.some(track => track.id === this.props.player.song.id)) {
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
        let newDuration = min.toString() + ':' + sec
        this.setState({duration: newDuration})
      })

      
 
    } else if (this.wavesurfer && this.props.time === '0:00') {
      this.wavesurfer.seekTo(0)
    
  }
    
    
  }


  handlePlay(track, playlisttracks) {

    if (this.props.player.song === track && this.props.player.player ==='playing' ) {
      this.props.pauseSong(track)
    } else if (this.props.player.song === track && this.props.player.player ==='paused' ) {
      this.props.playSong(track)
    } else {
      this.props.playSong(track)
      this.props.addQueue(playlisttracks)
      this.updateWave(track)
    }
  }

  render() {
    if (this.props.playlist.hyperlink !== this.props.match.params.hyperlink) {
      return null
    }

    let playimage = (
      <>
        <img src={this.props.playlist.imageUrl}className='songIT'/>
      </>
    )
    let lastbutton;

    if (this.props.playlist.user_id === this.props.currentuser.id) {
      lastbutton = (
        <>
        <button className='songBu4'>...More
            <div className='moreshow'>
              <div className='moreshowli'><img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up</div>
              <div onClick={() => this.props.openDeletePlaylistModal('open', playlist)} className='moreshowlil'><img width='12'src='https://image.flaticon.com/icons/svg/709/709519.svg'/>  Delete Playlist</div>
            </div>
        </button>
        </>
      )
    } else {
      lastbutton = (
        <>
        <button className='songBu4'>...More
            <img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up
        </button>
        </>
      )
    }

    if (!this.props.playlist.imageUrl) {
      playimage = (
        <>
          <img className='songIT' src={Object.values(this.props.playlist.tracks)[0].imgUrl}/>
        </>
      )
    }


    let singular = 'TRACKS'

    if (this.props.tracks.length === 1) {
      singular = 'TRACK'
    }
    let followbutton;

    if (this.props.currentuser.id !== this.props.playlist.user_id) {
      followbutton = (
        <>
          <h1>haha bitch!</h1>
        </>
      )
    }

    let likedbutton = (
      <button onClick={this.createLike} className='songBuS'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> Like</button>
    )

    this.props.playlist.likes.forEach(like => {
      if (like.user_id === this.props.currentuser.id) {
        likedbutton = (
          <button onClick={(e) => this.deleteLike(e, like.id)} className='songBuSl'>&#9829; Liked</button>
        )
      }
    })



    let num = 0;

    let allsongs = this.props.tracks.map((track, i) => {
      num+=1;
      return(
        <>
          <div onClick={()=> this.handlePlay(track, this.props.tracks.slice(i+1))} className='playlisttrackindividsearch2'>
            <div className='flexed2'>
              <img width='27' height='27'src={track.imgUrl}/>
              <div className='playindividser'>{num}</div>
              <Link className='playindividser3'to={`/${track.user.split(' ').join('-')}`}>{track.user} -</Link>
              <Link className='playindividser2' to={`/${track.user.split(' ').join('-')}/${track.hyperlink}`}>{track.title}</Link>
            </div>
              <div className='playlistplaycount'>&#9654; <div className='padding'>{track.plays}</div></div>
          </div>
        </>
      )
    })

    let playfacts = (
      <>
        <div className='playlistfacts'>
          <div className='margin'>{this.props.tracks.length}</div>
          <div className='factword'>{singular}</div>
        </div>
      </>
    )

    let waves;
    let time;
    let duration;
    
    if (this.props.playlist.id === this.props.player.song.playlist) {
      waves = (
        <>
            <div className='waveform-holder'>
              <div onClick={this.handleWave} id='playlistwaveform'></div>
            </div>
        </>
      )

      time = (
        <>
          <div className='timersong'>{this.props.time}</div>
        </>
      )
      duration = (
        <>
          <div className='durationsong'>{this.state.duration}</div>
        </>
      )

      playfacts = null;
    }


    if (this.state) {
      if (this.state.updateWave === undefined) {
        this.setState({updateWave: this.props.waveUpdate})
      } else if (this.props.waveUpdate !== this.state.updateWave) {
        
        this.wavesurfer.seekTo(this.props.waveUpdate/this.wavesurfer.getDuration())
        this.setState({updateWave: this.props.updateWave})
      }
    }

    let userlikes = (
      <>
        <h2 className='likethisfirst'>Be the first to like this Playlist!</h2>
      </>
    )

    let plural = 'Likes'

    if (this.props.playlist.likes.length === 1) {
      plural ='Like'
    }

    if (this.props.playlist.likes.length > 0) {
      

      userlikes = this.props.playlist.likes.map(like => {

        return(
          <>
            <Link to={`/${like.username}`}><img className='bradius' src={like.picture}/></Link>
          </>
        )
      })
    }
    
    let relatedPlaylists = (
      <>
        <h2 className='likethisfirst'>This user has no other playlists!</h2>
      </>
    )
    
    if (this.props.playlist.related) {
      if (this.props.playlist.related.length > 0) {
        relatedPlaylists = this.props.playlist.related.map(related => {
          let img= (
            <img width='52' height='52' src={related.imageUrl}/>
          )
          if (!related.imageUrl) {
            img = (<img width='52' height='52' src={related.optionalpic}/>)
          }

          return (
            <>
              <div className='recplays'>
                {img}
                <div className='recplaysinf'>
                  <Link className='likeuser' to={`/${related.username}`}>{related.username}</Link>
                  <Link className='liketitle' to={`/${related.username}/sets/${related.permalink}`}>{related.title}</Link>
                  <div className='likestats'>
                    <p className='followst1'><img width='10' src='https://www.flaticon.com/premium-icon/icons/svg/2725/2725161.svg'/> {related.likes}</p>
                    <p className='followst'><strong className='larger2'>&#9835;</strong> {related.tracks}</p>
                    </div>
                </div>

              </div>
            </>
          )
        })
      }
    }

    if (this.props.player.player === 'playing' && this.props.tracks.some((track) => track.id === this.props.player.song.id) && this.wavesurfer) {
      this.wavesurfer.setWaveColor('white')
      this.wavesurfer.play()
    } else if (this.wavesurfer) {
      this.wavesurfer.setWaveColor('#ccc')
      this.wavesurfer.pause()
    }
  
    return(
      <>
        <EditPlaylistForm/>
        <DeletePlaylist/>
        <div className='PlaylistshowPage'>
          <div className='songplayer'>
              {waves}
              {time}     
              {duration}
              <div className='playSongPage'><p className='playconS'>&#9654;</p></div>
                  
              
                  <h3 className='songPT2'>{this.props.playlist.title}</h3>
                  <Link to={`/${this.props.playlist.username.split(' ').join('-')}`}className='userPT2'>{this.props.playlist.username}</Link>

                  <h3 className='songGS'>#</h3>
                  {playimage}

                  {playfacts}
  
            </div>
            <div className='playshowpagereal'>
              <div className='playlistshowinfreal'>
                <div className='playshowbutton'>
                  <div className='songBO'>
                        {likedbutton}
                        <button onClick={() => this.props.openEditPlaylistModal('edit', this.props.playlist)}className='songBu3'>&#9998; Edit</button>
                        {lastbutton}
                  </div>

                </div>
                
                <div className='playlistshowcontent'>
                  <div className='playlistuserinf'>
                    <img className='playuserpics'src={this.props.playlist.userImg}/>
                    <Link className='followlink2' to={`/${this.props.playlist.username.split(' ').join('-')}`}>{this.props.playlist.username}</Link>
                    <div className='flexinfz'>
                      <p className='followst1'><strong className='larger1'>&#9745;</strong> {this.props.playlist.follows}</p>
                      <p className='followst'><strong className='larger2'>&#9835;</strong> {this.props.playlist.usertracks}</p>
                    </div>
                    {followbutton}

                  </div>

                  <div className='listofplaysongs'>
                    {allsongs}
                  </div>
                  
                  
                </div>

              </div>

              <div className='playlistshowother'>
                <h3 className='listenHis'><img width='12' src='https://www.flaticon.com/premium-icon/icons/svg/2725/2725161.svg'/>{this.props.playlist.likes.length} {plural}</h3>
                <div className='displayflex'>
                  {userlikes}
                </div>
                <h3 className='listenHis'>&#9776; Playlists from this user</h3>
                  {relatedPlaylists}
              </div>

              
            </div>
              
        </div>
      </>
    )
  }
}

export default PlaylistShow