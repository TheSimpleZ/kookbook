import { current_user } from '../stores/current_user'
import { Auth } from '../config/firebase'
Auth.on_auth_state_changed((user) =>
  user
    ? current_user.set({
        email: user.email,
        id: user.uid,
        phone_number: user.phone_number,
        photo_url: user.photo_url,
      })
    : current_user.set(null)
)
