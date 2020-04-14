import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { updateUser } from '../util/session_api_util'

import rootReducer from '../reducers/root_reducer';

const configureStore = () => {
  let middleware = [thunk, logger];
  if (process.env.NODE_ENV === 'production'){
    middleware = [thunk];
  }

  // let preloadedState = {}

  // // let preloadedState = {
  // //       session: {
  // //           currentuser: null
  // //       }
  // //   };
  

  const preloadedState = { session: {currentUser: null }}
  
  if (window.currentUser) {
    preloadedState.session= {
      currentUser: window.currentUser
    }
  }

  // if (window.currentUser) {
  //   let getuser = new FormData()
  //   getuser.append('user[id]', window.currentUser.id)
  //   let returnuser;
  //   debugger
  //   updateUser(getuser, window.currentUser.id).then((user) => {
  //     debugger
  //     returnuser = user})
  
  //   debugger
  //   preloadedState.session = {
  //           currentuser: returnuser
  //       };
  // }

  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );
};

export default configureStore;
