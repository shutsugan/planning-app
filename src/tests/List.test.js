import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";

import List from "../components/List.vue";

describe("List.vue", () => {
  test("renders list items when the list is not empty", () => {
    const wrapper = mount(List, {
      props: {
        list: [
          { id: 1, name: "Driver 1" },
          { id: 2, name: "Driver 2" },
        ],
      },
    });

    expect(wrapper.find(".list").exists()).toBe(true);
    expect(wrapper.find(".list-empty").exists()).toBe(false);
    expect(wrapper.findAll("li").length).toBe(2);
  });

  test("renders empty message when the list is empty", () => {
    const wrapper = mount(List, {
      props: {
        list: [],
      },
    });

    expect(wrapper.find(".list").exists()).toBe(false);
    expect(wrapper.find(".list-empty").exists()).toBe(true);
    expect(wrapper.find(".list-empty").text()).toBe("No result...");
  });
});
