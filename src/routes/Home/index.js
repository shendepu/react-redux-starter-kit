// import HomeView from './components/HomeView'
import asyncRoute from '../../components/asyncRoute'

// Sync route definition
export default {
  pattern: '/home',
  component : asyncRoute(() => System.import('./components/HomeView'))
}
