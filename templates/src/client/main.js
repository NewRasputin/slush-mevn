import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)

new Vue({
	el: '#app',
	components: {App},
	render: h => h(App)
})
