import BooksIndex from './views/private/books/index.svelte'
import PrivateLayout from './views/private/layout/index.svelte'

import { currentUser } from "./stores/current_user";

let userIsLoggedIn = false

currentUser.subscribe((value) => {
  userIsLoggedIn = Boolean(value)
})


const protectedRoutes = [
  {
    name: '/',
    onlyIf: { guard: () => userIsLoggedIn, redirect: 'login' },
    layout: PrivateLayout,
    component: BooksIndex
  },
]

export { protectedRoutes }
