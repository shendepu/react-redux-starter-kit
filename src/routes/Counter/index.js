import asyncRoute from '../../components/asyncRoute'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
  pattern : '/counter',
  /*  Async getComponent is only invoked when route matches   */
  component: asyncRoute(() => {
    return Promise.all([
        System.import('./containers/CounterContainer'),
        System.import('./modules/counter')])
      .then(([Counter, reducer]) => {
        injectReducer(store, { key: 'counter', reducer: reducer.default })
        console.log('------- Counter ')
        console.log(Counter.default)
        return Counter
      })
    }
  )
})
