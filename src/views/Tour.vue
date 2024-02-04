<script setup lang="ts">
import { computed, ref, watch } from "vue";

import List from "../components/List.vue";
import TourItem from "../components/TourItem.vue";
import { useTourStore } from "../stores/tour";
import { useDriverStore } from "../stores/driver";

import { generateId } from "../utils";
import type { Tour } from "../types";

const store = useTourStore();
const driverStore = useDriverStore();

const search = ref("");
const locationFromRef = ref();

const getFilteredTours = computed(() =>
  store.tours.filter((tour) => tour.customerName.includes(search.value))
);

const tourToUpdate = computed(() =>
  store.tours.find((tour) => tour.id === store.tourToUpdateId)
);

const getDriverByLocation = computed(() =>
  driverStore.drivers.filter(
    ({ location }) => location === locationFromRef.value
  )
);

watch(tourToUpdate, () => {
  locationFromRef.value = tourToUpdate.value?.fromLocation;
});

const AddTour = ({ target }: SubmitEvent) => {
  const form = target as HTMLFormElement;
  const formData = new FormData(form);

  const customerName = formData.get("customerName")?.toString();
  const fromLocation = formData.get("fromLocation")?.toString();
  const toLocation = formData.get("toLocation")?.toString();
  const shipmentDate = formData.get("shipmentDate")?.toString();
  const assignedDriver = +formData.get("assignedDriver")!;

  if (
    !customerName ||
    !fromLocation ||
    !toLocation ||
    !shipmentDate ||
    !assignedDriver
  ) {
    return;
  }

  if (tourToUpdate.value) {
    const updatedTourData: Tour = {
      id: tourToUpdate.value.id,
      customerName,
      fromLocation,
      toLocation,
      shipmentDate,
      assignedDriver,
    };
    store.updateTour(updatedTourData);
  } else {
    const tourData: Tour = {
      id: generateId(),
      customerName,
      fromLocation,
      toLocation,
      shipmentDate,
      assignedDriver,
    };

    store.addTour(tourData);
    form.reset();
    locationFromRef.value = "";
  }
};

const cancelTourUpdate = () => {
  store.cancelTourToUpdate();
};
</script>

<template>
  <div class="tour">
    <div class="tour-list col border-section">
      <div class="tour-list-head pad">
        <h3>Tours</h3>
        <input
          class="tour-list-input"
          v-model="search"
          placeholder="Search for a tour..."
        />
      </div>
      <div class="pad">
        <List :list="getFilteredTours">
          <template v-slot="{ item }">
            <TourItem :item="item" />
          </template>
        </List>
      </div>
    </div>
    <form class="tour-create col pad border-section" @submit.prevent="AddTour">
      <input
        name="fromLocation"
        placeholder="From location"
        pattern="[a-zA-Z]*"
        required
        title="Location should not have numbers"
        v-model="locationFromRef"
      />
      <input
        name="toLocation"
        placeholder="To location"
        pattern="[a-zA-Z]*"
        required
        title="Location should not have numbers"
        :value="tourToUpdate?.toLocation"
      />
      <input
        name="customerName"
        placeholder="Customer name"
        required
        autofocus
        :value="tourToUpdate?.customerName"
      />
      <input
        name="shipmentDate"
        type="date"
        placeholder="Shipment date"
        required
        :value="tourToUpdate?.shipmentDate"
      />
      <select
        name="assignedDriver"
        :selected="tourToUpdate?.assignedDriver"
        required
        :disabled="!locationFromRef"
      >
        <option
          v-for="driver in getDriverByLocation"
          :key="driver.id"
          :value="driver.id"
        >
          {{ driver.name }}
        </option>
      </select>

      <div>
        <button class="btn primary-btn gap-r" type="submit">
          {{ !tourToUpdate ? "Create a Tour" : "Update a Tour" }}
        </button>
        <button
          v-if="tourToUpdate"
          class="btn seconday-btn"
          @click="cancelTourUpdate"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.tour {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  gap: 16px;
}

.tour-list {
  flex: 3 1 auto;
}

.tour-list-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px var(--border-color);
}

.tour-list-input {
  margin: 0;
}

h3 {
  margin: 0;
}

.tour-create {
  flex: 1 1 auto;
}

@media (max-width: 760px) {
  .tour {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .tour-list {
    order: 1;
    width: 100%;
  }

  .tour-create {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
