import Login from './views/public/login/index.svelte'
import BooksIndex from './views/private/books/index.svelte'
import PrivateLayout from './views/private/layout/index.svelte'
import PublicLayout from './views/public/layout/index.svelte'

import { currentUser } from "./stores/current_user";

let userIsLoggedIn = false

currentUser.subscribe((value) => {
  console.log("currentuser ", !!value)

  userIsLoggedIn = !!value
})

const routes = [
  {
    name: '/',
    onlyIf: { guard: () => {
      return userIsLoggedIn
    }, redirect: 'login' },
    component: BooksIndex, 
    layout: PrivateLayout
  },
  { name: 'login', component: Login, layout: PublicLayout },
]

export { routes }
