import { currentUser } from '../../stores/current_user'
import { Auth } from '../../config/firebase'
Auth.onAuthStateChanged((user) =>
  user
    ? currentUser.set({
        email: user.email,
        id: user.uid,
        phoneNumber: user.phoneNumber,
        photoUrl: user.photoUrl,
      })
    : currentUser.set(null)
)
