<template>
  <div class="about">
    <h1 class="h3">This is an about page</h1>
    <pre>
      compteur: {{ count }}
    </pre>
  </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter'
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useCounterStore, ['count'])
  }
}
</script>
