// import HomeView from './components/HomeView'
import asyncComponent from '../../components/asyncComponent'

// Sync route definition
export default {
  pattern: '/',
  exactly: true,
  component : asyncComponent(() => System.import('./components/HomeView'))
}
