import './assets/main.scss'
// import de vue createApp
import { createApp } from 'vue'

//import de pinia
import { createPinia } from 'pinia'

// import du plugin axios
import axiosPlugin from '@/plugins/axios.js'

// import du composant de base
import App from './App.vue'

// import du router
import router from './router'

const app = createApp(App)
// on déclare le plugin axios avant pinia
app.use(axiosPlugin)
// on déclare une instance de pinia
const pinia = createPinia()
// on configure pinia pour avoir notre instance d'axios accessible dans les stores
pinia.use(({ store }) => {
  // ici on injecte l'instance de axios dans le store de pinia
  store.$http = app.config.globalProperties.$http
})
// puis on déclare pinia comme dépendance de notre app
app.use(pinia)
// enfin le router...
app.use(router)

// enregistrement de composants globaux
import AppDebug from '@/components/AppDebug.vue'
app.component(
  // nom à utiliser dans le template
  'AppDebug',
  // le composant à utiliser
  AppDebug
)

app.mount('#app')
