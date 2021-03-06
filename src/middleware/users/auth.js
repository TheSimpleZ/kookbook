import { currentUser } from '../../stores/current_user'
import { Auth } from '../../config/firebase'

Auth.onAuthStateChanged((user) => {
  if (user) {
    const userInfo = {
      email: user.email,
      id: user.uid,
      phoneNumber: user.phoneNumber,
      photoUrl: user.photoUrl
    }

    currentUser.set(userInfo)
  } else {
    currentUser.remove()
  }
})
