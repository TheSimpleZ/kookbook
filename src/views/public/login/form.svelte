<script>
  import { Auth, firebase } from "../../../config/firebase";
  import * as firebaseui from 'firebaseui'
  import 'firebaseui/dist/firebaseui.css'
  import { onMount } from 'svelte';

  // FirebaseUI config.
  var uiConfig = { 
      callbacks: {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        signInSuccessWithAuthResult: () => true,
        uiShown: () => {},
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: '/admin',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
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