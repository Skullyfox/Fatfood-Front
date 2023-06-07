import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import LoggedView from '@/views/LoggedView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AboutView from '@/views/AboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import RecipesView from '@/views/RecipesView.vue'
import RecipeView from '@/views/RecipeView.vue'
import CreationView from '@/views/CreationView.vue'
import ConditionsView from '@/views/ConditionsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/logged',
    name: 'logged',
    component: LoggedView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/recettes',
    name: 'recipes',
    component: RecipesView
  },
  {
    path: '/recettes/:id',
    name: 'recipe',
    component: RecipeView
  },
  {
    path: '/product',
    name: 'product',
    component: ProductView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/create',
    name: 'create',
    component: CreationView
  },
  {
    path: '/conditionsdevente',
    name: 'conditionsdevente',
    component: ConditionsView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
