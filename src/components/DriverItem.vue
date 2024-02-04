<script setup lang="ts">
import type { Driver } from "../types";

type ListProps = {
  item: Driver;
};

const { item } = defineProps<ListProps>();
</script>

<template>
  <div class="driver-item">
    <div class="driver-item-wrapper">
      <div class="item-avatar">{{ item.name.slice(0, 2) }}</div>
      <div class="item-name">
        <span class="item-bold">Name:</span> {{ item.name }}
      </div>
      <div class="divider" />
      <div class="item-location">
        <span class="item-bold">Location:</span> {{ item.location }}
      </div>
    </div>

    <div class="driver-item-buttons">
      <button class="btn secondary-btn gap-r">Update</button>
      <button class="btn primary-btn">Remove</button>
    </div>
  </div>
</template>

<style scoped>
.driver-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: solid 1px var(--border-color);
}

.driver-item-wrapper,
.driver-item-buttons {
  display: flex;
  align-items: center;
}

.item-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
  border-radius: 30px;
  background: var(--border-color);
  margin-right: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.driver-item:last-child {
  border-bottom: none;
}

.item-bold {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
}

@media (max-width: 760px) {
  .driver-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
