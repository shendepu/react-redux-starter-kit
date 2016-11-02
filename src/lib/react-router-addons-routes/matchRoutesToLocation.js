import matchPattern from 'react-router/matchPattern'

const mergePatterns = (a, b) => {
  return a[a.length - 1] === '/' && b[0] === '/'
    ? `${a.slice(0, a.length - 1)}${b}` : `${a}${b}`
}

const matchRoutesToLocation = (routes, location, matchedRoutes = [], params = {}, parentPattern = '') => {
  routes.forEach((route) => {
    const nestedPattern = mergePatterns(parentPattern, route.pattern)
    const match = matchPattern(nestedPattern, location)

    if (match) {
      matchedRoutes.push(route)

      if (match.params) {
        Object.keys(match.params).forEach(key => { params[key] = match.params[key] })
      }

      if (route.routes) {
        matchRoutesToLocation(route.routes, location, matchedRoutes, params, nestedPattern)
      }
    }
  })

  return { matchedRoutes, params }
}

export default matchRoutesToLocation
