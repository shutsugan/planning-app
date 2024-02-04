import { mount } from "@vue/test-utils";
import vitest, { expect, test } from "vitest";
import { setActivePinia, createPinia } from "pinia";

import Driver from "../views/Driver.vue"; // Assuming the component is used in a view

class FormDataMock {
  get = vi.fn();
}

// @ts-ignore
global.FormData = FormDataMock;

describe("Driver.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("renders drivers list and form correctly", async () => {
    const wrapper = mount(Driver);

    expect(wrapper.find(".driver-list-head h3").text()).toBe("Drivers");
    expect(wrapper.find(".driver-list-input").exists()).toBe(true);

    expect(wrapper.find('.driver-create input[name="name"]').exists()).toBe(
      true
    );
    expect(wrapper.find('.driver-create input[name="location"]').exists()).toBe(
      true
    );
    expect(wrapper.find('.driver-create button[type="submit"]').text()).toBe(
      "Create a Driver"
    );
  });
});
