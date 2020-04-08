import React from 'react'
import {  Link } from 'react-router-dom'
import Wave from '../waves/waves_container'
import PlaylistModal from '../playlist_modal/playlist_modal'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.createFollow = this.createFollow.bind(this)
    this.deleteFollow = this.deleteFollow.bind(this)
    this.createLike = this.createLike.bind(this)
    this.deleteLike = this.deleteLike.bind(this)
    this.addQueue = this.addQueue.bind(this)
    debugger
    this.state = {search: this.props.search, path: this.props.location.search}
  }

  componentDidUpdate() {
    if (this.props.location.search !== this.state.path) {
      this.setState({search: this.props.search, path: this.props.location.search})
    }
  }

  addQueue(e, song) {
    debugger
    e.preventDefault()
    this.props.addQueue(song)
  }

  createLike(e, id, type) {
    e.preventDefault()
    type = type[0].toUpperCase() + type.slice(1).toLowerCase()
    this.props.createLike({    
      likeable_id: id,
      likeable_type: type,
      user_id: this.props.currentuser.id
   })
    this.props.fetchSearch(this.props.location.search.slice(3))
  }

  deleteLike(e, id) {
    e.preventDefault()
    this.props.deleteLike(id)
    this.props.fetchSearch(this.props.location.search.slice(3))
  }

  createFollow(e, user_id) {
    e.preventDefault()
    this.props.createFollow({
      user_id: user_id,
      follower_id: this.props.currentuser.id
    })
    debugger
    // let username= this.props.match.params.username.split('-').join(' ')
    this.props.fetchSearch(this.props.location.search.slice(3))
  }

  deleteFollow(e, id) {
    e.preventDefault()
    this.props.deleteFollow(id)
    this.props.fetchSearch(this.props.location.search.slice(3))

    // let username= this.props.match.params.username.split('-').join(' ')
    // this.props.fetchUser(username)
  }

  // shuffle(a) {
  //   for (let i = a.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [a[i], a[j]] = [a[j], a[i]];
  //   }
  //   return a;
  // }
  
  render() {
    debugger
    let content;
    let links = (
      <>
        <Link to={`/search?q=${this.props.location.search.slice(3)}`} className='searchclicked'>&#9862; Everything</Link>
        <Link to={`/search/sounds?q=${this.props.location.search.slice(3)}`} className='searchopt'>&#12316; Tracks</Link>
        <Link to={`/search/people?q=${this.props.location.search.slice(3)}`} className='searchopt'>&#9734; People</Link>
        <Link to={`/search/sets?q=${this.props.location.search.slice(3)}`}className='searchopt'>&#9886; Playlists</Link>
      </>
    )

    if (this.state.search.length > 0) {
      let tracknum = 0;
      let usernum = 0;
      let playlistnum = 0;
      debugger
      if(this.props.match.path === '/search') {

      let results = (Object.values(this.state.search.flat()))
      results = results.map(search => {
        let searchpic;
        let title;
        let info;
        if (search.catagory === 'user') {
          if (this.props.currentuser) {
            if (search.id === this.props.currentuser.id) {
              return null;
            }
          }
            usernum += 1;
            title = (
              <>
              <Link className='searchtitle' to={`/${search.username.split(' ').join('-')}`}>{search.username}</Link>
              </>
            )
            searchpic = (
              <>
              <img className='searchpic' src={search.profileUrl}/>
              </>
            )  
            let followbutton = (
                <>
                  <div className='extraBut2' onClick={(e)=>this.createFollow(e, search.id)}>+ Follow</div>
                </>
              
            )
            Object.values(search.follows).forEach(follower => {
              debugger
              if (follower.follower === this.props.currentuser.id) {
                followbutton = (
                  <>
                    <div className='extraBut2' onClick={(e) => this.deleteFollow(e, follower.id)}><strong className='bigFont'>&#9745;</strong> Following</div>
                  </>
                )
              }
            })
            info = (
              <>
                <p className='searchfollow'><img width='13' className='searchfpic' src='https://image.flaticon.com/icons/svg/747/747376.svg'/> {Object.values(search.follows).length}</p>
                {followbutton}
              </>
            )   
        } else if (search.catagory === 'song'){
            // if (search.user_id === this.props.currentuser.id) {
            //   return null;
            // }
            tracknum += 1;
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
            if (this.props.currentuser) {
              search.likes.forEach(like => {
                if (like.user_id === this.props.currentuser.id) {
                  likebutton = (
                    <>
                      <button onClick={(e) => this.deleteLike(e, like.id)}className='songBuliked'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {search.likes.length}</button>
                    </>
                  )
                }
              })
            }


            info = (
              <>
                <div className='searchwv'>
                  <Wave song={search} songtype={'search'}/>

                  <div className='songFootsearch'>
                    <div className='songBOsearch'>
                      {likebutton}
                      <button className='songBu4'>...More
                        <div className='moreshow'>
                          <div onClick={(e)=> this.addQueue(e, [search])} className='moreshowli'><img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up</div>
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
          playlistnum +=1;
          debugger
          title = (
            <>
            <Link className='searchtitle' to={`/${search.user.username.split(' ').join('-')}/sets/${search.permalink}`}>{search.title}</Link>
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
                      <div onClick={(e)=> this.addQueue(e, search.tracks)} className='moreshowli'><img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up</div>
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
            <div className='searchedme'>
              {searchpic}
              <div className='searchinfos'>
                {title}
                {info}

                
              </div>
            </div>
          </>
        )
      })
      content = (
        <>
          <div className='searchresul'>
            <p className='searchstats'>Found {tracknum} tracks, {playlistnum} playlists, {usernum} people</p>
            {results}
          </div>
        </>
      )
      
    } if (this.props.match.path === '/search/sounds') {
      links = (
        <>
          <Link to={`/search?q=${this.props.location.search.slice(3)}`} className='searchopt'>&#9862; Everything</Link>
          <Link to={`/search/sounds?q=${this.props.location.search.slice(3)}`} className='searchclicked'>&#12316; Tracks</Link>
          <Link to={`/search/people?q=${this.props.location.search.slice(3)}`} className='searchopt'>&#9734; People</Link>
          <Link to={`/search/sets?q=${this.props.location.search.slice(3)}`}className='searchopt'>&#9886; Playlists</Link>
        </>
      )
      let results = (Object.values(this.state.search.flat()))
      results = results.map(search => {
        let searchpic;
        let title;
        let info;
        if (search.catagory !== 'song') {
          return null;
        } else {
          // if (search.user_id === this.props.currentuser.id) {
          //   return null;
          // }
          tracknum += 1;
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
          if (this.props.currentuser) {
  
          search.likes.forEach(like => {
            if (like.user_id === this.props.currentuser.id) {
              likebutton = (
                <>
                  <button onClick={(e) => this.deleteLike(e, like.id)}className='songBuliked'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {search.likes.length}</button>
                </>
              )
            }
          })
          }


          info = (
            <>
              <div className='searchwv'>
                <Wave song={search} songtype={'search'}/>

                <div className='songFootsearch'>
                  <div className='songBOsearch'>
                    {likebutton}
                    <button className='songBu4'>...More
                      <div className='moreshow'>
                        <div onClick={(e)=> this.addQueue(e, [search])} className='moreshowli'><img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up</div>
                        <div className='moreshowli' onClick={() => this.props.openPlaylistModal('playlist', search)}><img width='12'src='https://www.flaticon.com/premium-icon/icons/svg/2618/2618314.svg'/>  Add to playlist</div>
                      </div>
                    </button>
                  </div>
                </div>

              </div>
            </>
          ) 
          return (
            <>
              <div className='searchedme'>
                {searchpic}
                <div className='searchinfos'>
                  {title}
                  {info}
  
                  
                </div>
              </div>
            </>
          )
        }})
        
        if (tracknum === 0) {
          content = (
            <>
            <div className='searchResu'>
              <p className='circlething'>&#9862;</p>
              <p className='sorrynothing'>Sorry we didn't find any results for "{this.props.location.search.slice(3).split('%20').join(' ')}".</p>
              <p className='sorrynothing'>Check the spelling, or try a different search.</p>
            </div>
            </>
          )
        } else {
            let howmany = `Found ${tracknum} tracks`
                if (tracknum === 1) {
                  howmany = `Found ${tracknum} track`
                }
            content = (
              <>
                <div className='searchresul'>
                  <p className='searchstats'>{howmany}</p>
                  {results}
                </div>
              </>
            )
        }
        
      }
      if (this.props.match.path === '/search/people') {
        links = (
          <>
            <Link to={`/search?q=${this.props.location.search.slice(3)}`} className='searchopt'>&#9862; Everything</Link>
            <Link to={`/search/sounds?q=${this.props.location.search.slice(3)}`} className='searchopt'>&#12316; Tracks</Link>
            <Link to={`/search/people?q=${this.props.location.search.slice(3)}`} className='searchclicked'>&#9734; People</Link>
            <Link to={`/search/sets?q=${this.props.location.search.slice(3)}`}className='searchopt'>&#9886; Playlists</Link>
          </>
        )
        let results = (Object.values(this.state.search.flat()))
        results = results.map(search => {
          let searchpic;
          let title;
          let info;
          if (search.catagory !== 'user') {
            return null;
          } else {
            if (this.props.currentuser) {
              if (search.id === this.props.currentuser.id) {
                return null;
              }
            }
              usernum += 1;
              title = (
                <>
                <Link className='searchtitle' to={`/${search.username.split(' ').join('-')}`}>{search.username}</Link>
                </>
              )
              searchpic = (
                <>
                <img className='searchpic' src={search.profileUrl}/>
                </>
              )  
              let followbutton = (
                  <>
                    <div className='extraBut2' onClick={(e)=>this.createFollow(e, search.id)}>+ Follow</div>
                  </>
                
              )
              Object.values(search.follows).forEach(follower => {
                debugger
                if (follower.follower === this.props.currentuser.id) {
                  followbutton = (
                    <>
                      <div className='extraBut2' onClick={(e) => this.deleteFollow(e, follower.id)}><strong className='bigFont'>&#9745;</strong> Following</div>
                    </>
                  )
                }
              })
              info = (
                <>
                  <p className='searchfollow'><img width='13' className='searchfpic' src='https://image.flaticon.com/icons/svg/747/747376.svg'/> {Object.values(search.follows).length}</p>
                  {followbutton}
                </>
              )   
            return (
              <>
                <div className='searchedme'>
                  {searchpic}
                  <div className='searchinfos'>
                    {title}
                    {info}
    
                    
                  </div>
                </div>
              </>
            )
          }})
          
          if (usernum === 0) {
            content = (
              <>
              <div className='searchResu'>
                <p className='circlething'>&#9862;</p>
                <p className='sorrynothing'>Sorry we didn't find any results for "{this.props.location.search.slice(3).split('%20').join(' ')}".</p>
                <p className='sorrynothing'>Check the spelling, or try a different search.</p>
              </div>
              </>
            )
          } else {
              let howmany = `Found ${usernum} people`
                if (usernum === 1) {
                  howmany = `Found ${usernum} person`
                }
              content = (
                <>
                  <div className='searchresul'>
                    <p className='searchstats'>{howmany}</p>
                    {results}
                  </div>
                </>
              )
          }
          
        }



        if (this.props.match.path === '/search/sets') {
          links = (
            <>
              <Link to={`/search?q=${this.props.location.search.slice(3)}`} className='searchopt'>&#9862; Everything</Link>
              <Link to={`/search/sounds?q=${this.props.location.search.slice(3)}`} className='searchopt'>&#12316; Tracks</Link>
              <Link to={`/search/people?q=${this.props.location.search.slice(3)}`} className='searchopt'>&#9734; People</Link>
              <Link to={`/search/sets?q=${this.props.location.search.slice(3)}`}className='searchclicked'>&#9886; Playlists</Link>
            </>
          )
          let results = (Object.values(this.state.search.flat()))
          results = results.map(search => {
            let searchpic;
            let title;
            let info;
            if (search.catagory !== 'playlist') {
              return null;
            } else {
              if (search.user === null) {
                return null;
              }
              playlistnum +=1;
              debugger
              title = (
                <>
                <Link className='searchtitle' to={`/${search.user.username.split(' ').join('-')}/sets/${search.permalink}`}>{search.title}</Link>
                </>
              )
              searchpic = (
                <>
                <img className='searchpic2' src={search.imageUrl}/>
                </>
              )

              let likebutton = (
                <>
                  <button onClick={(e) => this.createLike(e, search.id, search.catagory)} className='songBu1'><img width='10' src='https://image.flaticon.com/icons/svg/1077/1077086.svg'/> {search.likes.length}</button>
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
                          <div onClick={(e)=> this.addQueue(e, search.tracks)} className='moreshowli'><img className='lilimg' width='12' src ='https://image.flaticon.com/icons/svg/565/565220.svg'/>  Add to Next up</div>
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

                debugger
    
                info = (
                  <div className='searchplaynone'>
                    <Wave song={search.tracks[0]} songtype={'search'}/>
    
                    <div className='playlisttrackssearch'>
                      {songtits}
                    </div>
                  </div>
                )}
              return (
                <>
                  <div className='searchedme'>
                    {searchpic}
                    <div className='searchinfos'>
                      {title}
                      {info}
      
                      
                    </div>
                  </div>
                </>
              )
            }})
            
            if (playlistnum === 0) {
              content = (
                <>
                <div className='searchResu'>
                  <p className='circlething'>&#9862;</p>
                  <p className='sorrynothing'>Sorry we didn't find any results for "{this.props.location.search.slice(3).split('%20').join(' ')}".</p>
                  <p className='sorrynothing'>Check the spelling, or try a different search.</p>
                </div>
                </>
              )
            } else {
                let howmany = `Found ${playlistnum} playlists`
                if (playlistnum === 1) {
                  howmany = `Found ${playlistnum} playlist`
                }
                content = (
                  <>
                    <div className='searchresul'>
                      <p className='searchstats'>{howmany}</p>
                      {results}
                    </div>
                  </>
                )
            }
            
          }




    
    } else {
      content = (
        <>
        <div className='searchResu'>
          <p className='circlething'>&#9862;</p>
          <p className='sorrynothing'>Sorry we didn't find any results for "{this.props.location.search.slice(3).split('%20').join(' ')}".</p>
          <p className='sorrynothing'>Check the spelling, or try a different search.</p>
        </div>
        </>
      )
    }
    
   
   debugger
    
    return(
      <>
      <PlaylistModal/>
        <div className='searchpage'>
          <div className='searchheader'>
            <h2 className='searchHead'>Search results for "{this.props.location.search.slice(3).split('%20').join(' ')}"</h2>
          </div>
          <div className='searchmaterials'>
            <div className='searchtype'>
              {links}
            </div>

            
            {content}
          

          </div>
        </div>
        
      </>

    )
  }
}

export default SearchPage