<script setup>
import { onMounted,ref,watch } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import axios from 'axios'

import xmlTable from '@/components/table.vue'

const router = useRouter()
const route = useRoute()

const xmlData = ref({})

const links = ref([])


const props = defineProps({
  showRefresh:{
    type:Boolean
  }
})

const goBack = () => {
  router.push('/')
}

const getXmlData = async(url = 'http://127.0.0.1:8000/api/getXml?page=1') => {
  xmlData.value = {}
  const response = await axios.get(url,{},{}).then((response)=>{
    console.log(response.data.data.links);
    const data = response.data.data;
    links.value =  data.links;
    xmlData.value = data;
  }).catch((error)=>{
    console.log(error);
  })
}

onMounted(() => {
  getXmlData();
})

watch(()=> props.showRefresh,(updatedVal)=>{
  getXmlData();
  
})

</script>

<template>
  <div class="editor bg-light p-4">
    <div class="row">
      <div class="col-12">
        <h3>Stored XML</h3>
      </div>
      <div class="col-12">
        <button class="btn btn-primary float-end" @click="goBack" v-if="route.name === 'list'">Go Back</button>
        <p class="text-muted">All uploaded xml files will be listed here</p>

        <!-- pagination -->
        <nav class="d-flex justify-content-center">
          <ul class="pagination pagination-sm">
            
            <li :class="page.active == true ? 'page-item active' : 'page-item'" v-for="(page,i) in links" >
              <a :class="page.url === null ? 'page-link disabled': 'page-link'" href="#" v-html="page.label" :disabled = "page.url === ''" @click="getXmlData(page.url)"></a>
            </li>
            
          </ul>
        </nav>

                <!-- paginationend -->


      </div>
      <div class="col-12">
        <xmlTable :data="xmlData" />
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
