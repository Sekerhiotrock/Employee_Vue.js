<template>
  <div id="app" class="home">
    <nav class="app-bar">
      <ul class="nav-bar">
        <li :class="{ 'home-link': $route.path === '/' }"><router-link to="/" class="router-link">Home</router-link></li>
        <li :class="{ 'active-link': $route.path === '/employees' }"><router-link to="/employees" class="router-link">Employees</router-link></li>
        <li :class="{ 'active-link': $route.path === '/departments' }"><router-link to="/departments" class="router-link">Departments</router-link></li>
        <li :class="{ 'active-link': $route.path === '/projects' }"><router-link to="/projects" class="router-link">Projects</router-link></li>
        <li :class="{ 'active-link': $route.path === '/no' }"><router-link to="/no" class="router-link">About us</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App"
}
</script>

<style scoped>
.app-bar {
  background: #333; 
  padding: 10px 20px;
}

.nav-bar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-bar li {
  margin-left: 20px;
}

.active-link .router-link {
  color: #13f444; 
}

.router-link {
  color: white;
  text-decoration: none;
}

.router-link:hover {
  text-decoration: underline;
}
</style>
