<script>
  import SidebarMenu from './menu.svelte'
  let adminMenuItems = [
    { to: '/admin/', icon: 'dashboard', title: 'Dashboard' },
    { to: '/admin/teams', icon: 'group_work', title: 'Teams' },
    { to: '/admin/employees', icon: 'person_pin', title: 'Employees' },
  ]
</script>

<ul id="sidenav-left" class="sidenav sidenav-fixed">
  <li>
    <h5 class="center">Recipe books</h5>
  </li>
  <SidebarMenu items={adminMenuItems} />
</ul>

<style>
  .sidenav-fixed {
    margin-top: 64px;
  }
</style>
