import { writable } from 'svelte/store'

const default_value = null

const initial_value = JSON.parse(localStorage.getItem('currentUser')) || default_value
export const current_user = writable(initial_value)

current_user.subscribe((val) => localStorage.setItem('currentUser', JSON.stringify(val)))
