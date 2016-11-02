import React from 'react'
import ReactDOM from 'react-dom'
import ReactDomServer from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'
import { matchRoutesToLocation } from 'lib/react-router-addons-routes'
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
    // routes should be here and in require form so that HMR works
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
      module.hot.accept('./routes/index', () =>
        setImmediate(() => {
          ReactDOM.unmountComponentAtNode(MOUNT_NODE)
          render()
        })
      )
    }
  }
} else {
  const context = createServerRenderContext()
  const requestUrl = window.__REQ_URL__ || '/'
  const location = { pathname: requestUrl }

  const routes = require('./routes/index').default(store).routes
  const { matchedRoutes, params } = matchRoutesToLocation(routes, location)
  window.println(requestUrl)
  window.println(matchedRoutes)
  window.println(params)
  let loadDataRoutes = matchedRoutes.filter(route => route.component.loadData)
  window.println(loadDataRoutes)

  let allPromises = Promise.resolve('a')
  let promises = loadDataRoutes.map(route => route.component.loadData(store, params))
  for (let p in promises) {
    allPromises = allPromises.then(() => p)
  }
//   let allPromises = [ Promise.resolve('a') ]
//   let promises = loadDataRoutes.map(route => route.component.loadData(store, params))
//   allPromises.push(...promises)
//   window.println(allPromises)

  render = () => {
//     return Promise.all(
//       loadDataRoutes.map(route => Promise.resolve('aa'))
//       [Promise.resolve('tt')]
//     )
    return allPromises.then(() => {
      return ReactDomServer.renderToString(
        <ServerRouter location={requestUrl} context={context}>
          {({ action, location, router }) =>
            <CoreLayout {...{ router, action, location, store, routes }} />}
        </ServerRouter>
      )
    })
  }
}

const getState = () => store.getState()

export {
  render,
  getState
}
// ========================================================
// Go!
// ========================================================

if (!window.__IS_SSR__) {
  render()
}
