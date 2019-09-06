import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import routes from './routes/index'
import { connect } from 'react-redux'
import { getTags, getCategories } from './store/article/article-actions'
import { getWindowWidth } from './store/common/common-actions'

function Root(props) {
  // 初始化数据 类似 componentDidMount
  useEffect(() => {
    props.getTags()
    props.getCategories()
    props.getWindowWidth()
  })

  function renderRoutes(routes, contextPath) {
    const children = []

    const renderRoute = (item, routeContextPath) => {
      let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath
      newContextPath = newContextPath.replace(/\/+/g, '/')

      // auth handler
      if ((item.protected || newContextPath.includes('admin')) && props.auth !== 1) {
        item = {
          ...item,
          component: () => <Redirect to="/login" />,
          children: []
        }
      }

      if (item.component && item.childRoutes) {
        const childRoutes = renderRoutes(item.childRoutes, newContextPath)
        children.push(
          <Route
            key={newContextPath}
            render={props => <item.component {...props}>{childRoutes}</item.component>}
            path={newContextPath}
          />
        )
      } else if (item.component) {
        children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />)
      } else if (item.childRoutes) {
        item.childRoutes.forEach(r => renderRoute(r, newContextPath))
      }
    }

    routes.forEach(item => renderRoute(item, contextPath))

    return <Switch>{children}</Switch>
  }

  const children = renderRoutes(routes, '/')
  return <BrowserRouter>{children}</BrowserRouter>
}
export default connect(
  null,
  { getTags, getCategories, getWindowWidth }
)(Root)
