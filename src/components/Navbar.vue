<script setup lang="ts"></script>

<template>
  <nav class="navbar">
    <h3>Planning App</h3>
    <div class="navbar-buttons">
      <router-link class="btn" to="/">Driver</router-link>
      <router-link class="btn" to="/tour">Tour</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: 64px;
  border-bottom: solid 1px var(--border-color);
  padding: 0 24px;
}
</style>
