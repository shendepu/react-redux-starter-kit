import React from 'react'
import ReactDOM from 'react-dom'
import ReactDomServer from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import CoreLayout from './layouts/CoreLayout'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================

let render

if (!window.__IS_SSR__) {
  const MOUNT_NODE = document.getElementById('root')

  render = () => {
    const routes = require('./routes/index').default(store).routes

    ReactDOM.render(
      <AppContainer store={store} routes={routes} />,
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
//       module.hot.accept('./routes/index', () =>
//         setImmediate(() => {
//           ReactDOM.unmountComponentAtNode(MOUNT_NODE)
//           render()
//         })
//       )
    }
  }
} else {
  const context = createServerRenderContext()
  render = () => {
    return ReactDomServer.renderToString(
      <ServerRouter location={window.__REQ_URL__} context={context}>
        {({ action, location, router }) =>
          <CoreLayout router={router} action={action} location={location} store={store} />}
      </ServerRouter>
    )
  }
}

// ========================================================
// Go!
// ========================================================
if (!window.__IS_SSR__) {
  render()
}
