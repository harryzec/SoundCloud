import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchSearch } from '../../actions/search_actions'
import searchReducer from '../../reducers/search_reducer';
import { openModal } from '../../actions/modal_actions';
import Modal from '../modal/modal';
import { logout } from '../../actions/session_actions'

class NavBar extends React.Component {
  constructor(props){
    super(props)
    this.handleDrop = this.handleDrop.bind(this)
    this.update = this.update.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.state = { looked: this.props.location.search, path: this.props.location.pathname, NavDrop: 'navDropDown', userdrop: 'userdrop', search: '', showsearch: 'noshowsearch'};
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

  componentDidUpdate() {
    
    if (this.props.location.pathname !==  this.state.path) {

        let bar = document.getElementById('searchedbar')
        if (bar) {
          bar = ''
        }
        this.setState({path: this.props.location.pathname, showsearch: 'noshowsearch'})
      
    } else if (this.props.location.pathname === '/search') {
      if (this.props.location.search !== this.state.looked) {
        let bar = document.getElementById('searchedbar')
        if (bar) {
          bar.value = ''
        }
        this.setState({path: this.props.location.pathname, showsearch: 'noshowsearch', looked: this.props.location.search})
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
    debugger
    if (this.props.match.isExact) {return null}

    let searched;
    let results = null;
    if (this.props.search && this.props.search !== {}) {
      
      results = this.props.search.map(search => {
        if (search.catagory === 'song') {
          return (<>
            <Link to={`/${search.user.split(' ').join('-')}/${search.hyperlink}`} className='searchres'>
              &#9862; {search.title}
            </Link>
          </>)
        } else if (search.catagory === 'playlist') {
          return (<>
            <Link to={`/${search.user.username.split(' ').join('-')}/sets/${search.permalink}`} className='searchres'>
              &#9862; {search.title}
            </Link>
          </>)
        } else if (search.catagory === 'user') {
          return (<>
            <Link to={`/${search.username.split(' ').join('-')}`}className='searchres'>
              &#9862; {search.username}
            </Link>
          </>)
        }
        
      })
    }
    searched = (
      <>
      <Link to={`/search?q=${this.state.search}`}className='searching'>
        <div className='clicklink'>
        Search for "{this.state.search}"
        </div>
      </Link>
      {results}
      
      </>
    )

    if (this.props.user === null) {
      return(
        <>
        <Modal />
      <div className='navMarg'>
      <div className='navBar'>
        <div className='navButtons'>
        <Link to='/discover' className='HomeButton'>Home</Link>
        <div to='/stream' onClick={() => this.props.openModal('verifyUsername')} className='StreamButton'>Stream</div>
        <div to='/you/library' onClick={() => this.props.openModal('verifyUsername')} className='LibraryButton'>Library</div>
        </div>
        <div className='searchSound'>
        <input type='text' placeholder='Search' onChange={this.update('search')} defaultValue={this.state.search}className='searchMusicBar' id='searchedbar'/>
          <div className={this.state.showsearch}>{searched}</div>
        <div className='buttonBack'>
          <button className='searchNotes'></button>
        </div>
        </div>
        <div className='lastSearch'>
          <a href='https://github.com/harryzec' className='tryPro'>Github</a>
          <div onClick={() => this.props.openModal('verifyUsername')} className='UploadClick'>Upload</div>
        <div className='userdrop' onClick={() => this.props.openModal('verifyUsername')}>
          <div className='profHead'><p className='navLogin'> Sign In</p> </div>
        </div>
            <button className='bellButton'>
              <a className='findmylinkedin' href='https://www.linkedin.com/in/harry-zec-7157a4a8/'>Linkedin</a>
            </button>

            
        </div>
      </div>
      </div>
      </>)
    }
    



    

    if (this.props.user.username === undefined) {
      return null;
    }

    let lilpic;
    if (this.props.user.profileUrl) {
      lilpic = (
        <>
          <img className='navPic' src={`${this.props.user.profileUrl}`}/>
        </>
      )
    }

    return (
      <>
      <div className='navMarg'>
      <div className='navBar'>
        <div className='navButtons'>
        <Link to='/discover' className='HomeButton'>Home</Link>
        <Link to='/stream' className='StreamButton'>Stream</Link>
        <Link to='/you/library' className='LibraryButton'>Library</Link>
        </div>
        <div className='searchSound'>
        <input type='text' placeholder='Search' onChange={this.update('search')} defaultValue={this.state.search}className='searchMusicBar' id='searchedbar'/>
          <div className={this.state.showsearch}>{searched}</div>
        <div className='buttonBack'>
          <button className='searchNotes'></button>
        </div>
        </div>
        <div className='lastSearch'>
          <a href='https://github.com/harryzec' className='tryPro'>Github</a>
          <Link to='/upload' className='UploadClick'>Upload</Link>

        <div className={userdrop} onClick={this.handleDrop}>
          <div className='profHead'>{lilpic}<p className='navUsername'>{this.props.user.username} </p> </div>
          <p className='dA'>&#8964;</p>
            <div className={NavDrop}>
              <Link className='firstEle1' to={`/${this.props.user.username.split(' ').join('-')}`}> <li className='firstEle'>&#8962; Profile</li></Link>
              <Link to={`/you/likes`} className='listEle' >&#43; Likes</Link>
              <Link to={`/${this.props.user.username.split(' ').join('-')}/tracks`}className='TrackLI'>	&#9835; Tracks</Link>
              <li className='firstEle' onClick={() => {
                this.props.logout()
                this.props.history.push('/')
                }}>&#9740; Sign Out</li>
            </div>

          </div>
            <button className='bellButton'>
              <a className='findmylinkedin' href='https://www.linkedin.com/in/harry-zec-7157a4a8/'>Linkedin</a>
            </button>

            
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
    {fetchSearch: (search)=> dispatch(fetchSearch(search)),
    openModal: modal => dispatch(openModal(modal)),
    logout: () => dispatch(logout())
})
}



export default connect(mSTP, mDTP)(NavBar)