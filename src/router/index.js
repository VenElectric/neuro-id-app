import { createRouter, createWebHistory} from "vue-router";
import CustomerForm from "../components/CustomerForm.vue";
import AutoSuccessPage from "../components/AutoSuccessPage.vue";
import FailurePage from "../components/FailurePage.vue";
import PendingReviewPage from "../components/PendingReviewPage.vue";
import ErrorStatusPage from "../components/ErrorStatusPage.vue";

const routes = [
  {
    path: "/",
    name: "CustomerForm",
    component: CustomerForm,
  },
  {
    path: "/success",
    name: "SuccessPage",
    component: AutoSuccessPage,
  },
  {
    path: "/failure",
    name: "FailurePage",
    component: FailurePage,
  },
  {
    path: "/pending-review",
    name: "PendingReviewPage",
    component: PendingReviewPage,
  },
  {
    path: "/error-page",
    name: "ErrorPage",
    component: ErrorStatusPage,
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach((to, from) => {
  if(from.fullPath == "/" && from.name == undefined && to.name != "CustomerForm"){
   return {name: "CustomerForm"}
  }
 
});

export default router;
