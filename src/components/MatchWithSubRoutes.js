import React from 'react'
import { Match } from 'react-router'

const MatchWithSubRoutes = (route) => {
  console.log(route)
  return (
    <Match {...route} render={(props) => {
      let component = route.getComponent ? route.getComponent() : route.component
      console.log('---MatchWithSubRoutes')

      console.log(component)
      return (
        <route.component {...props} routes={route.routes}/>
      )
    }}/>
  )
}

export default MatchWithSubRoutes
