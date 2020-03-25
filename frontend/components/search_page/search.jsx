import React from 'react'
import {  Link } from 'react-router-dom'

class SearchPage extends React.Component {
  componentDidMount() {
    this.props.fetchSearch(this.props.location.search.slice(3).split('%20').join(' '))
  }
  
  render() {
    let content;

    if (this.props.search.length > 0) {
      <h1>shit wild</h1>
    } else {
      content = (
        <>
          <p className='circlething'>&#9862;</p>
          <p className='sorrynothing'>Sorry we didn't find any results for "{this.props.location.search.slice(3).split('%20').join(' ')}".</p>
          <p className='sorrynothing'>Check the spelling, or try a different search.</p>
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
              <p className='searchopt'>&#12316; Tracks</p>
              <p className='searchopt'>&#9734; People</p>
              <p className='searchopt'>&#9886; Albums</p>
              <p className='searchopt'>&#9886; Playlists</p>
            </div>

            <div className='searchResu'>
              {content}
            </div>

          </div>
        </div>
        
      </>

    )
  }
}

export default SearchPage