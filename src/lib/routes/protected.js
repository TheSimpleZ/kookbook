import BooksIndex from '../../views/private/books/index.svelte'
import PrivateLayout from '../../views/private/layout/index.svelte'
import { get } from 'svelte/store'

import { currentUser } from '../../stores/current_user'

function userIsLoggedIn() {
  return Boolean(get(currentUser))
}

const protectedRoutes = [
  {
    name: '/',
    onlyIf: { guard: userIsLoggedIn, redirect: 'login' },
    layout: PrivateLayout,
    component: BooksIndex,
  },
]

export { protectedRoutes }
