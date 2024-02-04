<script setup lang="ts">
import { computed, ref } from "vue";

import List from "../components/List.vue";
import DriverItem from "../components/DriverItem.vue";
import { useDriverStore } from "../stores/driver";

import { generateId } from "../utils";
import type { Driver } from "../types";

const store = useDriverStore();

const search = ref("");

const getFilteredDrivers = computed(() =>
  store.drivers.filter((driver) => driver.name.includes(search.value))
);

const driverToUpdate = computed(() =>
  store.drivers.find((driver) => driver.id === store.driverToUpdateId)
);

const AddDriver = ({ target }: SubmitEvent) => {
  const form = target as HTMLFormElement;
  const formData = new FormData(form);

  const name = formData.get("name")?.toString();
  const location = formData.get("location")?.toString();

  if (name && location) {
    if (driverToUpdate.value) {
      const updatedDriverData: Driver = {
        id: driverToUpdate.value.id,
        name,
        location,
      };
      store.updateDriver(updatedDriverData);
    } else {
      const driverData: Driver = { id: generateId(), name, location };
      store.addDriver(driverData);
      form.reset();
    }
  }
};

const cancelDriverUpdate = () => {
  store.cancelDriveToUpdate();
};
</script>

<template>
  <div class="driver">
    <div class="driver-list col border-section">
      <div class="driver-list-head pad">
        <h3>Drivers</h3>
        <input
          class="driver-list-input"
          v-model="search"
          placeholder="Search for a driver..."
        />
      </div>
      <div class="pad">
        <List :list="getFilteredDrivers">
          <template v-slot="{ item }">
            <DriverItem :item="item" />
          </template>
        </List>
      </div>
    </div>
    <form
      class="driver-create col pad border-section"
      @submit.prevent="AddDriver"
    >
      <input
        name="name"
        placeholder="Driver name"
        required
        autofocus
        :value="driverToUpdate?.name"
      />
      <input
        name="location"
        placeholder="Driver location"
        pattern="[a-zA-Z]*"
        required
        title="Location should not have numbers"
        :value="driverToUpdate?.location"
      />

      <div>
        <button class="btn primary-btn gap-r" type="submit">
          {{ !driverToUpdate ? "Create a Driver" : "Update a Driver" }}
        </button>
        <button
          v-if="driverToUpdate"
          class="btn seconday-btn"
          @click="cancelDriverUpdate"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.driver {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  gap: 16px;
}

.driver-list {
  flex: 3 1 auto;
}

.driver-list-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px var(--border-color);
}

.driver-list-input {
  margin: 0;
}

h3 {
  margin: 0;
}

.driver-create {
  flex: 1 1 auto;
}

@media (max-width: 760px) {
  .driver {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .driver-list {
    order: 1;
    width: 100%;
  }

  .driver-create {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
