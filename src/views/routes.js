import Layout from '@/component/layout/layout.jsx'
// import asyncComponent from '@/utils/asyncComponent'
import Home from './home/home.jsx'
import Article from './article/article.jsx'
import Categories from './categories/categories.jsx'
import List from './list/list.jsx'
import About from './about/about.jsx'
import NotFound from './notFound/notFound.jsx'
import Archives from './archives/archives.jsx'
import Write from './markdown/markdown.jsx'
// const Article = asyncComponent(() => import('./article/article.jsx'))

export default {
  path: '/',
  name: 'home',
  component: Layout,
  childRoutes: [
    { path: '', component: Home},
    { path: 'article/:id', component: Article },
    { path: 'categories', component: Categories },
    { path: 'categories/:name', component: List },
    { path: 'tags/:name', component: List },
    { path: 'about', component: About },
    { path: 'archives', component: Archives },
    { path: 'write', component: Write },
    { path: '*', component: NotFound }
  ]
}