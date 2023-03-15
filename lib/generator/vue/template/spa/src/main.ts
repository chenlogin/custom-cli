import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import pinia from './store/index'
import './style.scss'
<%_ if(mobile) { _%>
import 'vant/lib/index.css'
<%_ } else { _%>
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
<%_ } _%>
const app = createApp(App).use(router).use(pinia)
<%_ if(!mobile) { _%>
app.use(ElementPlus)
<%_ } _%>
app.mount('#app')
