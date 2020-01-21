import { combineReducers } from 'redux';
import filmsReducer from './filmsReducer';
// import infoReducer from './infoReducer';
import searchParams from './searchParams';

const rootReducer = combineReducers({
  filmsReducer,
  // infoReducer,
  searchParams,
});
export default rootReducer;
