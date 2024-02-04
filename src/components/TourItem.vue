<script setup lang="ts">
import { computed } from "vue";
import { useDriverStore } from "../stores/driver";
import { useTourStore } from "../stores/tour";
import type { Tour } from "../types";

type ListProps = {
  item: Tour;
};

const store = useTourStore();
const driverStore = useDriverStore();

const { item } = defineProps<ListProps>();

const currentTour = computed(() => store.tourToUpdateId === item.id);

const formtedDate = computed(() =>
  item.shipmentDate.split("-").reverse().join(".")
);

const removeTour = (tourId: number) => store.removeTour(tourId);

const updateTour = (tourId: number) => {
  !currentTour.value
    ? store.setTourToUpdate(tourId)
    : store.cancelTourToUpdate();
};
</script>

<template>
  <div class="item">
    <div class="item-wrapper">
      <div class="item-avatar">{{ item.customerName.slice(0, 2) }}</div>
      <div class="item-info col">
        <span class="item-bold"
          >{{ item.customerName }}
          <span class="item-date">{{ formtedDate }}</span></span
        >
        <span class="item-text"
          >{{ item.fromLocation }} >>>> {{ item.toLocation }}</span
        >
        <span class="item-text">{{
          driverStore.getDriverById(item.assignedDriver)?.name
        }}</span>
      </div>
    </div>

    <div class="item-buttons">
      <button class="btn secondary-btn gap-r" @click="updateTour(item.id)">
        {{ !currentTour ? "Update" : "Cancel" }}
      </button>
      <button class="btn primary-btn" @click="removeTour(item.id)">
        Remove
      </button>
    </div>
  </div>
</template>
