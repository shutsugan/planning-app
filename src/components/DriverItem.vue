<script setup lang="ts">
import { computed } from "vue";
import { useDriverStore } from "../stores/driver";
import type { Driver } from "../types";

type ListProps = {
  item: Driver;
};

const store = useDriverStore();

const { item } = defineProps<ListProps>();

const currentDriver = computed(() => store.driverToUpdateId === item.id);

const removeDriver = (driverId: number) => store.removeDriver(driverId);

const updateDriver = (driverId: number) => {
  !currentDriver.value
    ? store.setDriverToUpdate(driverId)
    : store.cancelDriveToUpdate();
};
</script>

<template>
  <div class="item">
    <div class="item-wrapper">
      <div class="item-avatar">{{ item.name.slice(0, 2) }}</div>
      <div class="item-info col">
        <span class="item-bold">{{ item.name }}</span>
        <span class="item-text">{{ item.location }}</span>
      </div>
    </div>

    <div class="item-buttons">
      <button class="btn secondary-btn gap-r" @click="updateDriver(item.id)">
        {{ !currentDriver ? "Update" : "Cancel" }}
      </button>
      <button class="btn primary-btn" @click="removeDriver(item.id)">
        Remove
      </button>
    </div>
  </div>
</template>
