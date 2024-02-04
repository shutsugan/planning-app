<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
</script>

<template>
  <div class="dashboard">
    <Navbar />
    <div class="dashboard-wrapper">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  margin: 24px;
}
</style>
