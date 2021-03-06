import Login from '../../views/public/login/index.svelte'
import PublicIndex from '../../views/public/home/index.svelte'
import PublicLayout from '../../views/public/layout/index.svelte'
import NotFound from '../../views/404.svelte'

const publicRoutes = [
  {
    name: '/',
    component: PublicIndex,
    layout: PublicLayout
  },
  { name: 'login', component: Login, layout: PublicLayout },
  { name: '404', component: NotFound, layout: PublicLayout },
]

export { publicRoutes }
