/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import rank from './modules/Rank/RankReducer';
import vote from './modules/Vote/FaceReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  rank,
  vote
});