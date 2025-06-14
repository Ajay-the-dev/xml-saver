<script setup>

import {useRoute, useRouter} from 'vue-router'

const router = useRouter()
const route = useRoute()


const goBack = () => {
  router.push('/')
}

</script>

<template>
  <div class="editor bg-light p-5">
    <div class="row">
      <div class="col-12">
        <h3>Stored XML</h3>
      </div>
      <div class="col-12">
        <button class="btn btn-primary float-end" @click="goBack" v-if="route.name === 'list'">Go Back</button>
        <p class="text-muted">All uploaded xml files will be listed here</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor{
  height: 94vh;
  overflow: hidden;
  border-left: 1px dashed lightgrey;
}

</style>
