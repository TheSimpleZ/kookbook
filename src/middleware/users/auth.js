import { currentUser } from '../../stores/current_user'
import { Auth } from '../../config/firebase'
import { Employees } from '../database/employees'

Auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("user exists")

    const userInfo = {
      email: user.email,
      id: user.uid,
      phoneNumber: user.phoneNumber,
      photoUrl: user.photoUrl
    }

    currentUser.set(userInfo)
  } else {
    console.log("no user")

    currentUser.remove()
  }
})
