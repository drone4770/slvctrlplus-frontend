<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>SlvCtrl+</h1>

    <nav>
      <RouterLink to="/mission-control">Mission Control</RouterLink>
      <RouterLink to="/devices">Devices</RouterLink>
    </nav>

    <div id="footer">0.1.0-alpha</div>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';

#app {
  margin: 0 auto;
  padding: 0;
  font-weight: normal;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}

main {
  padding: 2em;
}

main h2 {
  font-size: 2em;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  background: #222;
  position: relative;
}

header h1 {
  font-family: Impact, sans-serif;
  text-align: center;
  color: #eee;
  padding: 0.5em;
}

header #footer {
  position: absolute;
  bottom: 0;
  padding: 1em;
  width: 100%;
  text-align: center;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: rgba(0, 0, 0, 0.2);
    color: #eee;
  }
}

nav {
  width: 100%;
  font-size: 1.5em;
  padding-top: 0.5em;
  min-width: 225px;
}

nav a {
  display: block;
  padding: 0.5em 2.5em 0.5em 1.5em;
  color: #bbb;
  white-space: nowrap;
}

nav a.router-link-exact-active {
  background-color: hsla(160, 100%, 37%, 0.2);
  color: hsla(160, 100%, 37%, 1);
}
</style>
