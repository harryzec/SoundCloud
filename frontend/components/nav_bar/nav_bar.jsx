import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchSearch } from '../../actions/search_actions'
import searchReducer from '../../reducers/search_reducer';

class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.handleDrop = this.handleDrop.bind(this)
    this.update = this.update.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.state = { NavDrop: 'navDropDown', userdrop: 'userdrop', search: '', showsearch: 'noshowsearch'};
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  update(field) {
    return e => {
     
      if (e.currentTarget.value.length > 0) {
       
        this.setState({[field]: e.currentTarget.value, showsearch: 'showsearch'})
    
        this.props.fetchSearch(e.currentTarget.value)
        
      } else {
        
        this.setState({[field]: e.currentTarget.value, showsearch: 'noshowsearch'})
      }
    }
  }

  handleDrop(e) {
    if (this.state.NavDrop === 'navDropDown'){
   
      this.setState({NavDrop: 'navDropDownShow', userdrop: 'userdropclick'})
    } else {
      this.setState({NavDrop: 'navDropDown', userdrop: 'userdrop'})
    }
  }

  render(){
  
    const { NavDrop, userdrop } = this.state

    if (this.props.match.isExact) {return null}

    if (this.props.user === null) {
      return(null)
    }

    let searched;
    let results = null;
    if (this.props.search && this.props.search !== {}) {
      
      results = this.props.search.map(search => {
        let title;
        if (search.title) {
          title = search.title 
        } else {
          title = search.username
        }
        return(
          <>
            <div>
              {title}
            </div>
          </>
        )
      })
    }
    searched = (
      <>
      <div>
        Search for "{this.state.search}"
      </div>
      {results}
      
      </>
    )

    return (
      <>
      <div className='navMarg'>
      <div className='navBar'>
        <div className='navButtons'>
        <Link to='/discover' className='HomeButton'>Home</Link>
        <button className='StreamButton'>Stream</button>
        <button className='LibraryButton'>Library</button>
        </div>
        <div className='searchSound'>
        <input type='text' placeholder='Search' onChange={this.update('search')} defaultValue={this.state.search}className='searchMusicBar'/>
          <div className={this.state.showsearch}>{searched}</div>
        <div className='buttonBack'>
          <button className='searchNotes'></button>
        </div>
        </div>
        <div className='lastSearch'>
          <button className='tryPro'>Try Pro</button>
          <Link to='/upload' className='UploadClick'>Upload</Link>

        <div className={userdrop} onClick={this.handleDrop}>
          <div className='profHead'><img className='navPic' src={`${this.props.user.profileUrl}`}/><p className='navUsername'>{this.props.user.username} </p> </div>
          <p className='dA'>&#8964;</p>
            <div className={NavDrop}>
              <Link className='firstEle1' to={`/${this.props.user.username.split(' ').join('-')}`}> <li className='firstEle'>&#8962; Profile</li></Link>
              <li className='listEle' >&#43; Likes</li>
              <li className='listEle'>&#12316; Stations</li>
              <li className='listEle'>&#9738; Who to follow</li>
              <li className='listEle'>&#9734; Try Pro</li>
              <li className='TrackLI'>	&#9835; Tracks</li>
              <li className='listEle'>&#8599; Stats</li>
            </div>

          </div>
            <button className='bellButton'>
              &#10003;
                {/* <img src={window.betterBell} alt="Bell" className='bellPic'/> */}
            </button>

            <div className='email'>
              &#x2709;
            </div>

            <div className='dots'>
              {/* &#8230; */}
              <p>...</p>
            </div>

            
        </div>
      </div>
      </div>
      </>)
  }
}

const mSTP = state => {

  let current;
  if (state.session.currentUser===null){
    current = null
  } else {
    current = state.session.currentUser;
  }
  return{
    user: current,
    search: Object.values(state.entities.searched)
  }
}

const mDTP = dispatch => {
  return (
    {fetchSearch: (search)=> dispatch(fetchSearch(search))})
}



export default connect(mSTP, mDTP)(NavBar)