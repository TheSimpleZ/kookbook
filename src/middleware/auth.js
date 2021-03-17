import { current_user } from '../stores/current_user'
import { Auth } from '../libs/firebase'
Auth.onAuthStateChanged((user) =>
  user
    ? current_user.set({
        email: user.email,
        id: user.uid,
        phoneNumber: user.phoneNumber,
        photoUrl: user.photoUrl,
      })
    : current_user.set(null)
)
