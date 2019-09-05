import wapRoutes from '@/views/routes'

let childRoutes = [
  wapRoutes
]

const routes = [
  ...childRoutes.filter(f => f.component || (f.childRoutes && f.childRoutes.length > 0))
]

function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) return
  const indexRoute = route.childRoutes.find(child => child.isIndex)
  if (indexRoute) {
    const first = { ...indexRoute }
    first.path = ''
    first.exact = true
    first.autoIndexRoute = true
    route.childRoutes.unshift(first)
  }
  route.childRoutes.forEach(handleIndexRoute)
}

routes.forEach(handleIndexRoute)

export default routes