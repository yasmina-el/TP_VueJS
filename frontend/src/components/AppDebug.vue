<template>
  <p class="mt-5">
    <input class="form-check-input" type="checkbox" role="switch" v-model="debug" /> {{ name }}
  </p>
  <pre v-if="debug">
    {{ datas }}
  </pre>
</template>

<script>
export default {
  props: {
    datas: {
      type: [Number, String, Array, Object, null],
      required: true
    },
    name: {
      type: String,
      default: 'Debug'
    }
  },
  data() {
    return {
      debug: false
    }
  }
}
</script>
