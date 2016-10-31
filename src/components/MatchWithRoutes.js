import React from 'react'
import { Match } from 'react-router'

const mergePatterns = (a, b) => {
  return a[a.length-1] === '/' && b[0] === '/' ?
    `${a.slice(0, a.length-1)}${b}` :
    `${a}${b}`
}

const MatchWithRoutes = ({ parentPattern = '/', pattern, routes, component:Component, ...rest }) => {
  const nestedPattern = mergePatterns(parentPattern, pattern)
  return (
    <Match {...rest} pattern={nestedPattern} render={(matchProps) => (
        <Component {...matchProps} parentPattern={pattern} routes={routes}/>
      )} />
  )
}

export default MatchWithRoutes
