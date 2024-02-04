import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import { setActivePinia, createPinia } from "pinia";

import TourItem from "../components/TourItem.vue";

describe("TourItem.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mockTour = {
    id: 1,
    customerName: "Mohamed",
    shipmentDate: "2022-02-14",
    fromLocation: "City A",
    toLocation: "City B",
    assignedDriver: 1,
  };

  const mockDriver = {
    id: 1,
    name: "Driver 1",
  };

  const mockStore = {
    tourToUpdateId: null,
    setTourToUpdate: vi.fn(),
    cancelTourToUpdate: vi.fn(),
    removeTour: vi.fn(),
  };

  const mockDriverStore = {
    getDriverById: vi.fn().mockReturnValue(mockDriver),
  };

  test("renders tour details correctly", () => {
    const wrapper = mount(TourItem, {
      props: {
        item: mockTour,
      },
    });

    expect(wrapper.find(".item-avatar").text()).toBe("Mo");
    expect(wrapper.find(".item-bold").text()).toBe("Mohamed 14.02.2022");
    expect(wrapper.find(".item-text").text()).toBe("City A >>>> City B");
  });

  test("calls TourItem method when update button is clicked", async () => {
    const wrapper = mount(TourItem, {
      props: {
        item: mockTour,
      },
    });

    wrapper.vm.updateTour = vi.fn();
    await wrapper.find(".secondary-btn").trigger("click");

    expect(wrapper.vm.updateTour).toHaveBeenCalledWith(mockTour.id);
  });

  test("calls TourItem method when remove button is clicked", async () => {
    const wrapper = mount(TourItem, {
      props: {
        item: mockTour,
      },
    });

    wrapper.vm.removeTour = vi.fn();
    await wrapper.find(".primary-btn").trigger("click");

    expect(wrapper.vm.removeTour).toHaveBeenCalledWith(mockTour.id);
  });
});
