import React from 'react'
import { Link } from 'react-router-dom'


class Library extends React.Component {


  render() {

    let box0;
    let box1;
    let box2;
    let box3;
    let box4;
    let box5;

    let recentplays = this.props.recentplays.slice(0, 6).map(play => {
      
      return(
        <>
          <div className='boxadjust'>
            <div className='box'>
              <img className='boxpic'src={play.imgUrl}/>
            </div>
            <Link className='boxtitle' to={`/${play.user.split(' ').join('-')}/${play.title}`}>{play.title}</Link>
            <Link className='boxuser' to={`/${play.user.split(' ').join('-')}`}>{play.user}</Link>
          </div>

        </>
      )
    })

    let likes = this.props.currentuser.likes.reverse().slice(0, 6).map(like=>{
      return(
        <>
          <div className='boxadjust'>
            <div className='box'>
              <img className='boxpic'src={like.imgUrl}/>
            </div>
            <Link className='boxtitle' to={`/${like.user.split(' ').join('-')}/${like.title}`}>{like.title}</Link>
            <Link className='boxuser' to={`/${like.user.split(' ').join('-')}`}>{like.user}</Link>
          </div>

        </>
      )
    })
    
    // if (this.props.recentplays.length > 6) {
    //   let num = 6 - this.props.recentplays.length
    //   for (i = 0; i < num; i ++) {
    //     (box + i) += (
    //       <>
    //         <div className='box'>

    //         </div>
    //       </>
    //     )
    //   }
    // }

    return(
      <>
        <div className='librarypage'>
          <div className='libraryheader'>
            <Link className='libraryheadclick'>Overview</Link>
            <Link className='libraryhead'>Likes</Link>
            <Link className='libraryhead'>Playlists</Link>
            <Link className='libraryhead'>Following</Link>
          </div>

          <h2 className='recentplayshead'>Recently played</h2>

          <div className='libraryrecentplays'>
            {recentplays}
            {box0}
            {box1}
            {box2}
            {box3}
            {box4}
            {box5}
          </div>

          <h2 className='recentplayshead'>Likes</h2>
          <div className='libraryrecentplays'>
            {likes}
          </div>

        </div>
      </>
    )
  }
}

export default Library