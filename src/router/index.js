import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // scrollBehavior(_, __, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return { left: 0, top: 0 };
  //   }
  // },
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: 'en'
    },
    {
      path: '/:lang(en|ar)',
      component: () => import('@/layouts/FullPage.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/HomePage.vue')
        },
        {
          path: 'sectors',
          name: 'sectors',
          component: () => import('@/views/NewSectorsPage.vue')
        },
        {
          path: 'modules',
          name: 'modules',
          component: () => import('@/views/ModulesPage.vue')
        },
        {
          path: 'clients',
          name: 'clients',
          component: () => import('@/views/ClientsPage.vue')
        },
        {
          path: 'updates',
          name: 'updates',
          component: () => import('@/views/UpdatesPage.vue')
        },
        {
          path: 'updates/:id',
          name: 'update-details',
          component: () => import('@/views/UpdateDetailsPage.vue')
        },
        {
          path: 'contact-us',
          name: 'contact-us',
          component: () => import('@/views/ContactUsPage.vue')
        },
        {
          path: '/error-404',
          name: 'error-404',
          component: () => import('@/views/NotFoundPage.vue'),
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error-404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Redirect to home page if the path matches only the language parameter
  if (to.path === `/${to.params.lang}`) {
    next(`/${to.params.lang}/home`);
  } else {
    next();
  }
})

export default router
