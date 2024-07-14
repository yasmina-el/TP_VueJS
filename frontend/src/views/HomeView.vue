<template>
  <div class="home">
    <h1 class="h3">Accueil</h1>

    <button @click="increment()">{{ count }}</button>
    <pre>
      {{ doubleCount }}
    </pre>
  </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter'
import { mapActions, mapState } from 'pinia'

export default {
  computed: {
    // on peut importer directement tout le store:
    // counterStore(){
    //   return useCounterStore()
    // },
    // ...mapStores(useCounterStore),

    // ou utiliser les fonction de mapping de pinia: ici on importe les 2 propriétés du store state et getters:
    ...mapState(useCounterStore, ['count', 'doubleCount'])
  },
  methods: {
    // ici on importe les actions du store:
    ...mapActions(useCounterStore, ['increment'])
  }
}
</script>
