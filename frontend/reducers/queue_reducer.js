import {ADD_QUEUE, REPLACE_QUEUE, PLAY_FROM, NEXT_SONG} from '../actions/queue_action'

const QueueReducer = (state= [], action) => {

  Object.freeze(state);

  switch(action.type) {
    case ADD_QUEUE:
      return state.concat(action.songs) 
    case NEXT_SONG:
      return state.slice(1)
    case REPLACE_QUEUE:
      return action.queue
    default:
      return state;
  }
}

export default QueueReducer