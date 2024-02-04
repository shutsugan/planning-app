import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import { setActivePinia, createPinia } from "pinia";

import DirverItem from "../components/DriverItem.vue";

describe("DirverItem.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mockDriver = {
    id: 1,
    name: "Mohamed",
    location: "karlsruhe",
  };

  test("renders item details correctly", () => {
    const wrapper = mount(DirverItem, {
      props: {
        item: mockDriver,
      },
    });

    expect(wrapper.find(".item-avatar").text()).toBe("Mo");
    expect(wrapper.find(".item-bold").text()).toBe("Mohamed");
    expect(wrapper.find(".item-text").text()).toBe("karlsruhe");
  });

  test("calls updateDriver method when update button is clicked", async () => {
    const wrapper = mount(DirverItem, {
      props: {
        item: mockDriver,
      },
    });

    wrapper.vm.updateDriver = vi.fn();
    await wrapper.find(".secondary-btn").trigger("click");

    expect(wrapper.vm.updateDriver).toHaveBeenCalledWith(mockDriver.id);
  });

  test("calls removeDriver method when remove button is clicked", async () => {
    const wrapper = mount(DirverItem, {
      props: {
        item: mockDriver,
      },
    });

    wrapper.vm.removeDriver = vi.fn();
    await wrapper.find(".primary-btn").trigger("click");

    expect(wrapper.vm.removeDriver).toHaveBeenCalledWith(mockDriver.id);
  });
});
