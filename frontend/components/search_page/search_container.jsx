import SearchPage from './search'
import { connect } from 'react-redux';
import { fetchSearch } from '../../actions/search_actions'


const mSTP = state => {

  return{
    search: Object.values(state.entities.searched)
  }
}

const mDTP = dispatch => {
  return (
    {fetchSearch: (search)=> dispatch(fetchSearch(search))})
}

export default connect(mSTP, mDTP)(SearchPage)