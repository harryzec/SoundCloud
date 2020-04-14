import React from 'react'
import { Link } from 'react-router-dom'
import Wave from '../waves/waves_container'
import PlaylistModal from '../playlist_modal/playlist_modal'



class Stream extends React.Component {
  constructor(props) {
    super(props)
    this.createLike = this.createLike.bind(this)
    this.deleteLike = this.deleteLike.bind(this)
    this.createFollow = this.createFollow.bind(this)
    this.deleteFollow = this.deleteFollow.bind(this)
  }

  createFollow(e, user_id, i) {
    e.preventDefault()
    this.props.createFollow({
      user_id: user_id,
      follower_id: this.props.currentuser.id
    })

    this.setState({[i]: true})
  }

  deleteFollow(e, id, i) {
    e.preventDefault()
    this.props.deleteFollow(id)
    this.setState({[i]: false})

  }

  createLike(e, id, type) {
    
    e.preventDefault()
    type = type[0].toUpperCase() + type.slice(1).toLowerCase()
    this.props.createLike({    
      likeable_id: id,
      likeable_type: type,
      user_id: this.props.currentuser.id
  })
  this.props.fetchFollowerContent(this.props.currentuser.id)
}

  deleteLike(e, id) {
    e.preventDefault()
    this.props.deleteLike(id)
    this.props.fetchFollowerContent(this.props.currentuser.id)
  }

  componentDidMount() {
    
    this.props.fetchFollowerContent(this.props.currentuser.id)
  }

  render() {

  if (this.props.recentplays === {}) {
    return null;
  }
  let content;

  if (this.props.content.length === 0){

    content = (
      <>
      <div className='nofollowing'>
        Oh no! It looks like you don't follow anyone

        <img className='nofollowimg' src='https://image.flaticon.com/icons/svg/748/748004.svg'/>
        <h2 className='searchtofindfriends'>Use the search bar to find new artists!</h2>
      </div>
      </>
    )
  } else {
      let results = this.props.content.map(search => {
        let searchpic;
        let title;
        let info;
        if (search.catagory === 'song'){
          // if (search.user_id === this.props.currentuser.id) {
          //   return null;
          // }
          title = (
            <>
            <Link className='searchtitle' to={`/${search.user.split(' ').join('-')}/${search.hyperlink}`}>{search.title}</Link>
            </>
          )
          searchpic = (
            <>
            <img className='searchpic2' src={search.imgUrl}/>
            </>
          )

          let likebutton = (
            <>
              <button onClick={(e) => this.createLike(e, search.id, search.catagory)}className='songBu1'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {search.likes.length}</button>
            </>
          )

          search.likes.forEach(like => {
            if (like.user_id === this.props.currentuser.id) {
              likebutton = (
                <>
                  <button onClick={(e) => this.deleteLike(e, like.id)}className='songBuliked'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {search.likes.length}</button>
                </>
              )
            }
          })


          info = (
            <>
              <div className='searchwv'>
                <Wave song={search} songtype='stream'/>

                <div className='songFootsearch'>
                  <div className='songBOsearch'>
                    {likebutton}
                    <button className='songBu4'>...More
                      <div className='moreshow'>
                        <div onClick={() => this.props.addQueue(search)}className='moreshowli'><img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up</div>
                        <div className='moreshowli' onClick={() => this.props.openPlaylistModal('playlist', search)}><img width='12'src='https://www.flaticon.com/premium-icon/icons/svg/2618/2618314.svg'/>  Add to playlist</div>
                      </div>
                    </button>
                  </div>
                </div>

              </div>
            </>
          )
          
      } else if (search.catagory ==='playlist') {
        if (search.user === null) {
          return null;
        }


        title = (
          <>
          <Link className='searchtitle' to={`/${search.user.split(' ').join('-')}/sets/${search.permalink}`}>{search.title}</Link>
          </>
        )
        searchpic = (
          <>
          <img className='searchpic2' src={search.imageUrl}/>
          </>
        )

        let likebutton = (
          <>
            <button onClick={(e) => this.createLike(e, search.id, search.catagory)}className='songBu1'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {search.likes.length}</button>
          </>
        )

        search.likes.forEach(like => {
          if (like.user_id === this.props.currentuser.id) {
            likebutton = (
              <>
                <button onClick={(e) => this.deleteLike(e, like.id)}className='songBuliked'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {search.likes.length}</button>
              </>
            )
          }
        })
      

        if (search.tracks.length === 0) {
          info = (
            <>
              <div className='searchplaynone'>
                <h2 className='nosongsfound2'>This playlist has no tracks yet</h2>
                <div className='songBOsearch'>
                {likebutton}
                <button className='songBu4'>...More
                  <div className='moreshow'>
                    <div onClick={() => this.props.addQueue(search)} className='moreshowli'><img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up</div>
                  </div>
                </button>
                </div>
              </div>
            </>
          )
        } else {
          let num = 0;

          let songtits = search.tracks.map((track, i) => {
            num++;
            return(
            <>
              <div onClick={()=> this.handlePlay(track, playlist.tracks.slice(i+1))} className='playlisttrackindividsearch'>
                <div className='flexed'>
                  <img width='20' height='20'src={track.imgUrl}/>
                  <div className='playlisttnum'>{num}</div>
                  <div className='playlisttname'>{track.title}</div>
                </div>
                <div>&#9654; {track.plays}</div>
              </div>
            </>)
          })

          info = (
            <div className='searchplaynone'>
              <Wave song={search.tracks[0]} songtype={'search'}/>

              <div className='playlisttrackssearch'>
                {songtits}
              </div>
            </div>
          )
        }

      }
  
    

      return(
        <>
          <div className='searchedfollow'>
            <div className='meow'><img className='searchedimgfol' src={search.userpic}/><Link className='nodecoration' to={`/${search.user.split(' ').join('-')}`}>{search.user}</Link> <strong className='greyfont'>post a {search.catagory} {search.created} ago</strong></div>
            <div className='searchedme2'>
              {searchpic}
              <div className='searchinfos'>
                {title}
                {info}

                
              </div>
            </div>
          </div>
        </>
      )
    })
    content = (
      <>
        <div className='searchresul'>
          {results}
        </div>
      </>
    )
  

    }
  


  let values = Object.values(this.props.recentplays).reverse().slice(0,4)

  const recent = values.map(song => (
    <>
      <div key={song.id} className='recentSong'>
        <img className='recentPic'src={song.imgUrl} />
        <div className='recentInfo'>
          <p className='recentuser'>{song.user}</p>
          <p className='recenttitle'>{song.title}</p>
        </div>
      </div>
    </>
  ))

  let actual = this.props.currentuser.likes.slice(0,3).map(like => {
      
    return(
      <>
        <div className='likeshow'>
          <img src={like.imgUrl} width='50' height='50'/>
          <div className='likeInfo'>
            <Link className='likeuser' to={`/${like.username.split(' ').join('-')}`}>{like.username}</Link>
            <Link className='liketitle'to={`/${like.username.split(' ').join('-')}/${like.hyperlink}`}>{like.title}</Link>
            
            <div className='likestats'>
              <p className='likestat1'>&#9654; {like.plays}</p>
              <p className='likestat'>&#9829; {like.likes}</p>
              <p className='likestat3'>&#9998; {like.comments}</p>
            </div>
          </div>
        </div>
      </>
    )
  })

  let randomusers = this.props.mightlike.map((user, i) => {
    let button = (
      <>
       <div className='extraBut2' onClick={(e)=> this.createFollow(e, user.id, i)}>+ Follow</div>
      </>
    )
    if (this.state !== null) {
      if(this.state[[i]]) {
        let follow;
        this.props.follows.forEach(follower => {
          if (follower.user_id === user.id) {
            follow = follower.id
          }
        })
        button = (
          <>
           <div className='extraBut2' onClick={(e) => this.deleteFollow(e, follow, i)}><strong className='bigFont'>&#9745;</strong> Following</div>
          </>
        )
      }
    }
    return(
      <>
      <div className='mightlike'>
        <img className='userlikepic'src={user.profileUrl}/>
        <div className='mightlikeinfo'>
          <Link className='mightlikename' to={`/${user.username.split(' ').join('-')}`}>{user.username}</Link>
          <div className='mightlikestats'>
            <div className='mightlikeStat'>
              <p className='followst1'><strong className='larger1'>&#9745;</strong> {user.followers.length}</p>
              <p className='followst'><strong className='larger2'>&#9835;</strong> {user.songs}</p>
            </div>
              {button}
          </div>
        </div>

      </div>
      </>
    )
  })

  return(
    <>
    <PlaylistModal />
    <div className='discoverMain'>
      <div className='musicSection'>
        <h2 className='followsheader'>Hear the latest posts from the people you’re following:</h2>
        {content}
        
      </div>
      <div className='recentSection'>
        <h3 className='listenHis'><img width='12' src='https://www.flaticon.com/premium-icon/icons/svg/2725/2725222.svg'/> Who to follow</h3>
        {randomusers}
        <h3 className='listenHis'><img width='12' src='https://www.flaticon.com/premium-icon/icons/svg/2725/2725161.svg'/> Likes</h3>
        {actual}
        <h3 className='listenHis'><img className='cale' width='12'src ='https://image.flaticon.com/icons/svg/747/747310.svg'/>  Listening History</h3>
        
        {recent}
        
      </div>        
    </div>
  
    
    </>
  )
}
}

export default Stream