import Layout from '@/component/layout/layout.jsx'
// import asyncComponent from '@/utils/asyncComponent'
import Home from './home/home.jsx'

export default {
  path: '/',
  name: 'home',
  component: Layout,
  childRoutes: [
    { path: '', component: Home}
  ]
}