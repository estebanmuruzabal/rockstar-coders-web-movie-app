import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({});

function configureStore(initialState) {
  let composeEnhancers = null;

  if (process.env.NODE_ENV === 'development') {
    composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  }

  return createStore(
    rootReducer,
    initialState,
    (!composeEnhancers ? 
      applyMiddleware(thunk)
      :
      composeEnhancers(applyMiddleware(thunk))
    )
  );
}
const store = configureStore();
export default store;