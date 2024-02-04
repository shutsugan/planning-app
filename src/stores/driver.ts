import { ref } from "vue";
import { defineStore } from "pinia";

import type { Driver } from "../types";

export const useDriverStore = defineStore("driver", () => {
  const drivers = ref<Driver[]>([]);
  const driverToUpdateId = ref<number | null>(null);

  const getDriverById = (driverId: number) => {
    return drivers.value.find(({ id }) => id === driverId);
  };

  const setDriverToUpdate = (id: number) => {
    driverToUpdateId.value = id;
  };

  const cancelDriveToUpdate = () => {
    driverToUpdateId.value = null;
  };

  const addDriver = (driver: Driver) => {
    drivers.value = [...drivers.value, driver];
  };

  const updateDriver = (driver: Driver) => {
    drivers.value = drivers.value.map((currentDriver) => {
      if (currentDriver.id !== driver.id) return currentDriver;
      else return driver;
    });

    cancelDriveToUpdate();
  };

  const removeDriver = (driverId: number) => {
    drivers.value = drivers.value.filter(({ id }) => driverId !== id);
  };

  return {
    drivers,
    driverToUpdateId,
    addDriver,
    updateDriver,
    removeDriver,
    getDriverById,
    setDriverToUpdate,
    cancelDriveToUpdate,
  };
});
