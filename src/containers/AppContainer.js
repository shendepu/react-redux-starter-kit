import React, { Component, PropTypes } from 'react'
import { Router, RouterContext } from 'react-router'
import { Provider } from 'react-redux'

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
      let browserHistory = require('react-router').browserHistory
      router = <Router history={browserHistory} children={routes} />
    } else {
      router = <RouterContext children={routes} />
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
