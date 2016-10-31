import CounterRoute from 'routes/Counter'

describe('(Route) Counter', () => {
  let _route

  beforeEach(() => {
    _route = CounterRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain pattern `counter`', () => {
    expect(_route.pattern).to.equal('counter')
  })
})
