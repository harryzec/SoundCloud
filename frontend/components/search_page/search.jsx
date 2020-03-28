import React from 'react'
import {  Link } from 'react-router-dom'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchSearch(this.props.location.search.slice(3).split('%20').join(' '))
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  render() {
    let content;

    if (this.props.search.length > 0) {
      let results = this.shuffle(Object.values(this.props.search.flat()))
      results = results.map(search => {
        let searchpic;
        let title;
        if (search.catagory === 'user') {
            title = (
              <>
              <Link className='searchtitle' to={`/${search.username.split(' ').join('-')}`}>{search.username}</Link>
              </>
            )
            searchpic = (
              <>
              <div className='searchpic'></div>
              </>
            )     
        } else if (search.catagory === 'song'){
            title = (
              <>
              <Link className='searchtitle' to={`/${search.user.username.split(' ').join('-')}/${search.hyperlink}`}>{search.title}</Link>
              </>
            )
            searchpic = (
              <>
              <div className='searchpic2'></div>
              </>
            )
        }

        return(
          <>
            <div className='searchedme'>
              {searchpic}
              <div className='searchinfos'>
                {title}

                
              </div>
            </div>
          </>
        )
      })
      content = (
        <>
          <div className='searchresul'>
            <p className='searchstats'>Found {this.props.search[0].length} tracks, {this.props.search[1].length} playlists, {this.props.search[2].length} people</p>
            {results}
          </div>
        </>
      )
      
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
   
    
    return(
      <>
        <div className='searchpage'>
          <div className='searchheader'>
            <h2 className='searchHead'>Search results for "{this.props.location.search.slice(3).split('%20').join(' ')}"</h2>
          </div>
          <div className='searchmaterials'>
            <div className='searchtype'>
              <p className='searchclicked'>&#9862; Everything</p>
              <Link to='/search/sounds'className='searchopt'>&#12316; Tracks</Link>
              <p className='searchopt'>&#9734; People</p>
              <p className='searchopt'>&#9886; Albums</p>
              <p className='searchopt'>&#9886; Playlists</p>
            </div>

            
            {content}
          

          </div>
        </div>
        
      </>

    )
  }
}

export default SearchPage