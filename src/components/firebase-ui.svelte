<script>
  import { Auth, firebase } from '../config/firebase'
  import * as firebaseui from 'firebaseui'
  import { onMount } from 'svelte'
  import { FirebaseApp, User, Doc, Collection } from 'sveltefire'

  // FirebaseUI config.
  var uiConfig = {
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
  }

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(Auth)

  onMount(() => {
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig)
  })
</script>

<div id="firebaseui-auth-container" />

<style lang="postcss" global>
  @import 'firebaseui/dist/firebaseui.css';
</style>
