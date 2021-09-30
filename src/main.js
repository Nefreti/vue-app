import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

Vue.prototype.$axios = axios
Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbWg-JxEM-iPZ-Vhf3CahemZKGobUZX2s",
    authDomain: "starwars-app-ff91f.firebaseapp.com",
    projectId: "starwars-app-ff91f",
    storageBucket: "starwars-app-ff91f.appspot.com",
    messagingSenderId: "479981676169",
    appId: "1:479981676169:web:1ba6b36e65b12d3eb7c858"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

let app

firebase.auth().onAuthStateChanged(user => {
    console.log(user)
    if (!app) {
        app = new Vue({
            router,
            store,
            vuetify,
            render: h => h(App)
        }).$mount('#app')
    }
})

