import { createApp } from 'vue'
import App from './App.vue'
import './style.scss'
<%_ if(mobile) { _%>
import 'vant/lib/index.css'
<%_ } else { _%>
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
<%_ } _%>
const app = createApp(App)
<%_ if(!mobile) { _%>
app.use(ElementPlus)
<%_ } _%>

app.mount('#app')
