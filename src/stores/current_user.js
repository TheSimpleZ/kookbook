import { writable } from "svelte/store";

const init = JSON.parse(localStorage.getItem("currentUser")) || null
const userInfo = writable(init);
userInfo.subscribe(val => localStorage.setItem("currentUser", JSON.stringify(val)));

const setUser = user => {
  userInfo.set(user);
};

const removeUser = () => {
  userInfo.set(null);
};

const currentUser = {
  subscribe: userInfo.subscribe,
  set: setUser,
  remove: removeUser
};

export { currentUser };
