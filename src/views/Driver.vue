<script setup lang="ts">
import { ref } from "vue";

import List from "../components/List.vue";
import DriverItem from "../components/DriverItem.vue";

const driversList = ref([{ id: 1, name: "Mohamed", location: "Karlshure" }]);
</script>

<template>
  <div class="driver">
    <div class="driver-list col border-section">
      <h3>Driver</h3>
      <List :list="driversList">
        <template v-slot="{ item }">
          <DriverItem :item="item" />
        </template>
      </List>
    </div>
    <div class="driver-create col border-section">
      <input name="name" placeholder="Driver name" required />
      <input
        name="location"
        placeholder="Driver location"
        pattern="[a-zA-Z]+"
      />
      <button class="btn primary-btn">Create a Driver</button>
    </div>
  </div>
</template>

<style scoped>
.driver {
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
}

.driver-list {
  flex: 3 1 auto;
}

.driver-create {
  flex: 1 1 auto;
}

h3 {
  margin-top: 0;
}

@media (max-width: 760px) {
  .driver {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .driver-list {
    order: 1;
  }
}
</style>
