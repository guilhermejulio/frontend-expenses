const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "loginDefault",
        component: () => import("pages/Login.vue")
      },
      {
        path: "login",
        name: "login",
        component: () => import("pages/Login.vue")
      },
      {
        path: "register",
        name: "register",
        component: () => import("pages/Register.vue")
      }
    ]
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("pages/IndexPage.vue")
      },
      {
        path: "form-expense/:id?",
        name: "form-expense",
        component: () => import("src/pages/FormExpense.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue")
  }
];

export default routes;
