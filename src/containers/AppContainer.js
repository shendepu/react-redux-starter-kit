import React, { Component, PropTypes } from 'react'
import { Match, BrowserRouter, ServerRouter } from 'react-router'
import { Provider } from 'react-redux'

const MatchWithSubRoutes = (route) => (
  <Match {...route} render={(props) => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes} />
  )} />
)

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    let router
    if (!window.__IS_SSR) {
      router = <BrowserRouter>
        {routes.map((route, i) => (
          <MatchWithSubRoutes key={i} {...route} />
        ))}
      </BrowserRouter>
    } else {
      router = <ServerRouter>
        {routes.map((route, i) => (
          <MatchWithSubRoutes key={i} {...route} />
        ))}
      </ServerRouter>
    }

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          {router}
        </div>
      </Provider>
    )
  }
}

export default AppContainer
