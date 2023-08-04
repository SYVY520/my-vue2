import router from './router'
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import Header from '@/home/views/header';
import course from '@/home/views/course';
import headers from '@/home/views/headers';
import homework from "@/home/component/homework";
import homeworks from "@/home/component/homeworks";
import homeworks0 from "@/home/component/homeworks0";
import * as echarts from 'echarts'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
Vue.component('Header',Header)
Vue.component('course',course)
Vue.component('headers',headers)
Vue.component('homework',homework)
Vue.component('homeworks',homeworks)
Vue.component('homeworks0',homeworks0)
axios.defaults.baseURL='http://localhost:8080'
Vue.prototype.$http = axios
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')





