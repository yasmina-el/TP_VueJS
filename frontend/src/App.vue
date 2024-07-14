<template>
  <div class="container py-4">
    <AppHeader />
    <main class="border p-4 rounded-bottom shadow bg-white">
      <!-- nouveau markup recommandé par vue pour faire des transitions sur le changement de route -->
      <RouterView v-slot="{ Component, route }">
        <transition name="slide-fade">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import { RouterView } from 'vue-router'
export default {
  components: {
    RouterView,
    AppHeader
  }
}
</script>
