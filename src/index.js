import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import AppContainer from './AppContainer'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
import configureStore from './configureStore'
import { IntlProvider } from 'react-intl'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronUp,
  faChevronDown,
  faPlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faChevronUp,
  faChevronDown,
  faPlus,
  faMinus
)

const store = configureStore({})

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <AppContainer />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
