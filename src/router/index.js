import Vue from 'vue'
import VueRouter from 'vue-router'

//Components

//Layout
import MainLayout from '@/components/layouts/Main'

//Views
import HomePage from '@/components/views/home/Home'

const childRoutes = [
	{
		path: '/',
		name: 'home',
		component: HomePage,
	},
]

const routes = [
	{
		path: '/',
		component: MainLayout,
		children: childRoutes
	},
]

Vue.use(VueRouter)

const router = new VueRouter({
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'exact-active',
	mode: 'history'
})

export default router
