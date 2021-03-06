import { writable } from 'svelte/store'

const defaultValue = null

const initialValue = JSON.parse(localStorage.getItem('currentUser')) || defaultValue
export const currentUser = writable(initialValue)

currentUser.subscribe((val) => localStorage.setItem('currentUser', JSON.stringify(val)))
