import { ref } from "vue";
import { defineStore } from "pinia";

import type { Tour } from "../types";

export const useTourStore = defineStore("tour", () => {
  const tours = ref<Tour[]>([]);
  const tourToUpdateId = ref<number | null>(null);

  const setTourToUpdate = (id: number) => {
    tourToUpdateId.value = id;
  };

  const cancelTourToUpdate = () => {
    tourToUpdateId.value = null;
  };

  const addTour = (tour: Tour) => {
    tours.value = [...tours.value, tour];
  };

  const updateTour = (tour: Tour) => {
    tours.value = tours.value.map((currentTour) => {
      if (currentTour.id !== tour.id) return currentTour;
      else return tour;
    });

    cancelTourToUpdate();
  };

  const removeTour = (tourId: number) => {
    tours.value = tours.value.filter(({ id }) => tourId !== id);
  };

  return {
    tours,
    tourToUpdateId,
    addTour,
    updateTour,
    removeTour,
    setTourToUpdate,
    cancelTourToUpdate,
  };
});
