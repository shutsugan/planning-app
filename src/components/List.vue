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
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  border: solid 1px var(--border-color);
  border-radius: var(--border-radius);
  padding: 0;
}
</style>
