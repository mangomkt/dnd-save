import Vue from 'vue'
import App from './App.vue'
import rawDisplayer from "./components/rawDisplayer.vue";
import "font-awesome/css/font-awesome.css";
import "./css/main.css";

Vue.config.productionTip = false
Vue.component("rawDisplayer", rawDisplayer);
new Vue({
  render: h => h(App),
}).$mount('#app')
