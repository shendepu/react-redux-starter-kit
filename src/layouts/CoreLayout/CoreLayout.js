import React from 'react'
import { Provider } from 'react-redux'
import { Match } from 'react-router'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'


const mergePatterns = (a, b) => {
  return a[a.length - 1] === '/' && b[0] === '/'
    ? `${a.slice(0, a.length - 1)}${b}`
    : `${a}${b}`
}

const MatchWithRoutes = ({ parentPattern = '/', pattern, routes, component:Component, ...rest }) => {
  const nestedPattern = mergePatterns(parentPattern, pattern)
  return (
    <Match {...rest} pattern={nestedPattern} render={(matchProps) => (
      <Component {...matchProps} parentPattern={pattern} routes={routes} />
    )} />
  )
}

export const CoreLayout = ({ children, routes, store }) => (
  <Provider store={store}>
    <div className='container text-center'>
      <Header />
      <div className='core-layout__viewport'>
        {routes.map((route, i) => (
          <MatchWithRoutes key={i} {...route} />
        ))}
      </div>
    </div>
  </Provider>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element
}

export default CoreLayout
