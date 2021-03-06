import Login from '../../views/public/login/index.svelte'
import PublicLayout from '../../views/public/layout/index.svelte'
import NotFound from '../../views/404.svelte'

const publicRoutes = [
  { name: 'login', component: Login, layout: PublicLayout },
  { name: '404', component: NotFound, layout: PublicLayout },
]

export { publicRoutes }
