import React from 'react'
import ReactDOM from 'react-dom'
import ReactDomServer from 'react-dom/server'
import createStore from './store/createStore'
// import AppContainer from './containers/AppContainer'
import { match, Router, RouterContext } from 'react-router'
import { Provider } from 'react-redux'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
let render

if (!window.__IS_SSR) {
  const MOUNT_NODE = document.getElementById('root')
  render = () => {
    const routes = require('./routes/index').default(store)
    const browserHistory = require('react-router').browserHistory
    ReactDOM.render(
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>,
      MOUNT_NODE
    )
  }

// ========================================================
// Developer Tools Setup
// ========================================================
  if (__DEV__) {
    if (window.devToolsExtension) {
      window.devToolsExtension.open()
    }
  }

// This code is excluded from production bundle
  if (__DEV__) {
    if (module.hot) {
      // Development render functions
      const renderApp = render
      const renderError = (error) => {
        const RedBox = require('redbox-react').default

        ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
      }

      // Wrap render in try/catch
      render = () => {
        try {
          renderApp()
        } catch (error) {
          renderError(error)
        }
      }

      // Setup hot module replacement
      module.hot.accept('./routes/index', () =>
        setImmediate(() => {
          ReactDOM.unmountComponentAtNode(MOUNT_NODE)
          render()
        })
      )
    }
  }
} else {
  render = () => {
    const routes = require('./routes/index').default(store)
    let html = ''
    match({ routes, location: '/' }, (error, redirectionLocation, renderProps) => {
      if (error) {

      } else if (redirectionLocation) {

      } else if (renderProps) {
        html = ReactDomServer.renderToString(
          <Provider store={store}>
            <div style={{ height: '100%' }}>
              <RouterContext {...renderProps} />
            </div>
          </Provider>
        )
        console.log()
      } else {
        // 404
      }
    })

    return html
  }
}
// ========================================================
// Go!
// ========================================================
if (!window.__IS_SSR) {
  render()
}

export {
  render
}
