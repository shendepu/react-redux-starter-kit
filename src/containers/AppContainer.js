import React, { Component, PropTypes } from 'react'
import BrowserRouter from 'react-router/BrowserRouter'

import Layout from '../layouts/CoreLayout'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.array.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { store, routes } = this.props

    return (
      <BrowserRouter>
        {
          ({ action, location, router }) => <Layout {...{ router, action, location, store, routes }} />
        }
      </BrowserRouter>
    )
  }
}

export default AppContainer
