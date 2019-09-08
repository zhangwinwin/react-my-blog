import Layout from '@/component/layout/layout.jsx'
// import asyncComponent from '@/utils/asyncComponent'
import Home from './home/home.jsx'
import Article from './article/article.jsx'
// const Article = asyncComponent(() => import('./article/article.jsx'))

export default {
  path: '/',
  name: 'home',
  component: Layout,
  childRoutes: [
    { path: '', component: Home},
    { path: 'article/:id', component: Article }
  ]
}