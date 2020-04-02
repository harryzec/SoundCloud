import React from 'react'
import { Link } from 'react-router-dom'


class Library extends React.Component {
  render() {
    return(
      <>
        <div className='librarypage'>
          <div className='libraryheader'>
            <Link className='libraryheadclick'>Overview</Link>
            <Link className='libraryhead'>Likes</Link>
            <Link className='libraryhead'>Playlists</Link>
            <Link className='libraryhead'>Following</Link>
          </div>

        </div>
      </>
    )
  }
}

export default Library