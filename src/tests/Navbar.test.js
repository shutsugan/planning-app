import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";

import Navbar from "../components/Navbar.vue";

const wrapper = mount(Navbar);

describe("Navbar.vue", () => {
  test("renders navigation links correctly", async () => {
    const wrapper = mount(Navbar);

    expect(wrapper.find("h3").text()).toBe("Planning App");

    const links = wrapper.findAll(".btn");
    expect(links).toHaveLength(2);
    expect(links[0].text()).toBe("Drivers");
    expect(links[1].text()).toBe("Tours");
  });
});
