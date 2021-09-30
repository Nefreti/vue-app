import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Secret from '../views/Secret.vue'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/secret',
        name: 'Secret',
        component: Secret,
        meta: {requiresAuth: true}
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = firebase.auth().currentUser
    if (requiresAuth && !isAuthenticated) {
        next("/home")
    } else {
        next()
    }
})

export default router
