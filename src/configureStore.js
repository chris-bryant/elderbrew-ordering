import { applyMiddleware, compose, createStore } from 'redux'
import createReducer from './reducers'
import thunk from 'redux-thunk'

export default function(initialState, browserHistory) {
  // Middleware
  const enhancers = [
    applyMiddleware(thunk)
  ]

  if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension())
  }

  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(require('./reducers')))
    })
  }

  return store
}
