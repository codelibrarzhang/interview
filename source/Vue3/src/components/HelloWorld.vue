<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
    <div @click="toCanvas">去截图</div>
  </p>

</template>

<script setup>
import { reactive, onMounted } from 'vue'
import{ useRoute, useRouter } from 'vue-router'

const router = useRouter()
let toCanvas = () => {
    console.log('router', useRoute)
    router.push('/html2canvas')
}

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
