import { createStore } from 'redux';
import toggleParentsFavorite from './Reducers/parentsFavoriteReducer'

export default createStore(toggleParentsFavorite)