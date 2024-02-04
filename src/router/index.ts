import { createWebHistory, createRouter } from "vue-router";
import Driver from "../views/Driver.vue";
import Tour from "../views/Tour.vue";

const routes = [
  {
    path: "/",
    name: "Driver",
    component: Driver,
  },
  {
    path: "/tour",
    name: "Tour",
    component: Tour,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
