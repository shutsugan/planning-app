<script setup lang="ts">
import { computed } from "vue";

type ListProps = {
  list: any[];
};

const props = defineProps<ListProps>();

const listLength = computed(() => props.list.length);
</script>

<template>
  <ul v-if="listLength" class="list">
    <li v-for="item in list" :key="item.id"><slot :item="item" /></li>
  </ul>
  <div v-else class="list-empty">No result...</div>
</template>

<style>
.list {
  display: flex;
  flex-direction: column;
  border: solid 1px var(--border-color);
  border-radius: var(--border-radius);
  padding: 0;
}

.list-empty {
  display: flex;
  align-content: center;
  justify-content: center;
  color: var(--border-color);
}

li {
  border-bottom: solid 1px var(--border-color);
}

li:last-of-type {
  border-bottom: none;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
}

.item-wrapper,
.item-buttons {
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

.item-info {
  font-size: 14px;
}

.item-bold {
  font-size: 16px;
  font-weight: 500;
}

.item-text {
  color: var(--text-color);
}

.item-date {
  font-size: 12px;
  color: var(--text-color);
}

@media (max-width: 760px) {
  .item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
