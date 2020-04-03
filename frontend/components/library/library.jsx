import React from 'react'
import { Link } from 'react-router-dom'


class Library extends React.Component {
  constructor(props) {
    super(props)
    this.state = {likes: this.props.currentuser.likes}
    this.updateFilter = this.updateFilter.bind(this)
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

  componentDidMount() {
    this.props.updateUser({id: this.props.currentuser.id})
  }

  updateFilter(e) {
    e.preventDefault()
    let newlikes = []
    debugger
    let length = e.currentTarget.value.length
    this.props.currentuser.likes.forEach(like => {
      let title = like.title.toLowerCase().split(' ')
      if (like.title.toLowerCase().slice(0, length) === e.currentTarget.value.toLowerCase()) {
        newlikes.push(like)
      }
      title.forEach(part => {
        if (!newlikes.includes(like) && part.slice(0, length) === e.currentTarget.value.toLowerCase()) {
          newlikes.push(like)
        }
      })
    })

    this.setState({likes: newlikes})
  }


  render() {

    let recentplays = this.props.recentplays.slice(0, 6).map(play => {
      
      return(
        <>
          <div className='boxadjust'>
            <div className='box'>
              <img className='boxpic'src={play.imgUrl}/>
            </div>
            <Link className='boxtitle' to={`/${play.user.split(' ').join('-')}/${play.hyperlink}`}>{play.title}</Link>
            <Link className='boxuser' to={`/${play.user.split(' ').join('-')}`}>{play.user}</Link>
          </div>

        </>
      )
    })

    if (this.props.recentplays.length < 6){
      for (let i=0; i < (6-this.props.recentplays.length); i++) {
        recentplays.push(
          <>
            <div className='box'>

            </div>
          </>
        )
      } 
    }
    let likes

    likes = this.props.currentuser.likes.slice(0, 6).map(like=>{
      return(
        <>
          <div className='boxadjust'>
            <div className='box'>
              <img className='boxpic'src={like.imgUrl}/>
            </div>
            <Link className='boxtitle' to={`/${like.username.split(' ').join('-')}/${like.hyperlink}`}>{like.title}</Link>
            <Link className='boxuser' to={`/${like.username.split(' ').join('-')}`}>{like.username}</Link>
          </div>

        </>
      )
    })

    if (this.props.currentuser.likes.length < 6){
      for (let i=0; i < (6-this.props.currentuser.likes.length); i++) {
        likes.push(
          <>
            <div className='box'>

            </div>
          </>
        )
      } 
    }

    if (this.props.match.path === '/you/likes') {
      likes = this.state.likes.slice(0, 6).map(like=>{
        return(
          <>
            <div className='boxadjust'>
              <div className='box'>
                <img className='boxpic'src={like.imgUrl}/>
              </div>
              <Link className='boxtitle' to={`/${like.username.split(' ').join('-')}/${like.hyperlink}`}>{like.title}</Link>
              <Link className='boxuser' to={`/${like.username.split(' ').join('-')}`}>{like.username}</Link>
            </div>
  
          </>
        )
      })
    }
    
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

    if (this.props.match.path === '/you/library') {

      return(
        <>
          <div className='librarypage'>
            <div className='libraryheader'>
              <Link to={`/you/library`}className='libraryheadclick'>Overview</Link>
              <Link to={`/you/likes`} className='libraryhead'>Likes</Link>
            </div>

            <h2 className='recentplayshead'>Recently played</h2>

            <div className='libraryrecentplays'>
              {recentplays}
            </div>

            <h2 className='recentplayshead'>Likes</h2>
            <div className='libraryrecentplays'>
              {likes}
            </div>

          </div>
        </>
      )
    } else if (this.props.match.path === '/you/likes') {
      return(
        <>
        <div className='librarypage'>
            <div className='libraryheader'>
              <Link to={`/you/library`}className='libraryhead'>Overview</Link>
              <Link to={`/you/likes`} className='libraryheadclick'>Likes</Link>
            </div>

            <div className='trackslikes'>
              <h2 className='recentplayshead2'>Hear what you've liked:</h2>
              <input onChange={this.updateFilter} className='filterlikes' placeholder='Filter'/>
            </div>
            <div className='libraryrecentplays'>
              {likes}
            </div>

          </div>
        </>
      )
    }
  }  
}

export default Library