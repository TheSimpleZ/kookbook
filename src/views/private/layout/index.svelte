<script>
  import { onDestroy } from 'svelte'
  import { Route, navigateTo } from 'svelte-router-spa'

  import Header from './header.svelte'
  import Sidebar from './sidebar/index.svelte'
  import { currentUser } from '../../../stores/current_user'
  import Notification from '../../components/notification.svelte'
  import Loading from '../../components/loading.svelte'
  import { notificationMessage } from '../../../stores/notification_message.js'
  export let currentRoute
  let visible = false
  let notification = ''
  const unsubscribe = notificationMessage.subscribe(currentNotification => {
    if (currentNotification.message && currentNotification.message.length > 0) {
      notification = currentNotification
      visible = true
    } else {
      visible = false
    }
  })

  onDestroy(() => {
    unsubscribe()
  })
</script>


<div>
  <Notification {notification} {visible} />
  <Header />
  <main>
    <div class="row">
      <div class="col s3 hide-on-med-and-down">
        <Sidebar currentUser={$currentUser} />
      </div>

      <div class="col s12 l9">
        <Route {currentRoute} />
      </div>
    </div>
  </main>
</div>
