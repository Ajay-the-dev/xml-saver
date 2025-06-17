<script setup>
import { onMounted,ref,watch } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import axios from 'axios'

import xmlTable from '@/components/table.vue'

import searchModal from '@/components/modalSearch.vue'

import { showToast } from '@/components/utils/utils'


const router = useRouter()
const route = useRoute()

const xmlData = ref({})

const links = ref([])

const search = ref(null)

const params = ref({})

const searching = ref(false)

const newestFirst = ref(true)



const props = defineProps({
  showRefresh:{
    type:Boolean
  }
})

const goBack = () => {
  router.push('/')
}

const paginate  = (pageUrl) => {

 
  if(searching.value)
  {
    
    searchXmlByParams(params.value,pageUrl);
  }
  else{
    getXmlData(pageUrl);
  }
}

const getXmlData = async(url = 'http://127.0.0.1:8000/api/getXml?page=1') => {


  xmlData.value = {}

  const response = await axios.post(url,{
    sortBy:newestFirst.value ? 'DESC' : 'ASC'
  }).then((response)=>{
    
    const data = response.data.data;
    links.value =  data.links;
    xmlData.value = data;
  }).catch((error)=>{
  })
}

const startSearch = () =>{
    search?.value.openModal() 

}

const searchByParams = (searchParams) => {
  
  params.value = searchParams;
  searching.value = true;
}

const searchXmlByParams = async(params,url ='http://127.0.0.1:8000/api/findXml?page=1') => {
 
  

  const response = await axios.post(url,{
    title:  params.title,
    description:  params.description,
    code: params.code
  }).then((response)=>{
    
    const data = response.data.data;
    if(data.data.length === 0)
    { 
      showToast('No matching data found','info')
      params.value = {}
    }
    else{
      links.value =  data.links;
      xmlData.value = data;
    }

  }).catch((error)=>{
    
    showToast('Something went wrong while searching !','error')
  })


  
}

const clearSearch = () => {
  params.value = {}
  searching.value = false
}

const orderChange = () =>{
  newestFirst.value = !newestFirst.value;
}

onMounted(() => {
  getXmlData();
})

watch(()=> props.showRefresh,(updatedVal)=>{
  getXmlData();
})

watch(
  () => searching.value,
  (newVal) => {
    if(newVal)
    {
        searchXmlByParams(params.value, newVal.value)
    }
    else{
        getXmlData();
      }
  },
  { deep: true }
)

watch(()=>newestFirst.value,(updatedVal)=>{
    getXmlData();
})




</script>

<template>
  <div class="editor bg-light p-4">
    <div class="row">
      <div class="col-12">
        <h3>Stored XML</h3>    
        <button class="btn btn-primary float-end m-1" @click="goBack" v-if="route.name === 'list'">
          <i class="p-1 bi bi-arrow-90deg-left"></i>
          Go Back
        </button>
        <button class="btn btn-primary float-end m-1" @click="startSearch" v-if="route.name === 'list'">
          <i class="p-1 bi bi-search"></i>
          {{  Object.keys(params).length!=0 ? 'Search Again' : 'Search'}}
        </button>
        <button class="btn btn-primary float-end m-1" @click="clearSearch" v-if="route.name === 'list' && Object.keys(params).length!=0">
          <i class="p-1 bi bi-stop-circle"></i>
          Stop Search
        </button>
        <button class="btn btn-primary float-end m-1" @click="orderChange" v-if="route.name === 'list' && Object.keys(params).length == 0">
          <i v-if="newestFirst" class="p-1 bi bi-arrow-down"></i>
          <i v-else class="p-1 bi bi-arrow-up"></i>
          {{ newestFirst ? 'Oldest first' : 'Newest first' }}
        </button>
      </div>
      <div class="col-12">
        <p class="text-muted d-none d-sm-block">All uploaded xml files will be listed here</p>

        <!-- pagination -->
        <nav class="d-flex justify-content-center mt-4">
          <ul class="pagination pagination-sm">
            
            <li :class="page.active == true ? 'page-item active' : 'page-item'" v-for="(page,i) in links" >
              <a  :class="page.url === null ? 'page-link disabled': 'page-link'" href="#" v-html="page.label" :disabled = "page.url === ''" @click="paginate(page.url)"></a>
            </li>
            
          </ul>
        </nav>
                <!-- paginationend -->
      </div>
      <div class="col-12">
        <xmlTable :data="xmlData" @refresh="getXmlData"/>
      </div>
    </div>
    <searchModal ref="search" @InitiateSearch="searchByParams"/>
  </div>
</template>

<style scoped>
.editor{
  height: 94vh;
  overflow: hidden;
  border-left: 1px dashed lightgrey;
  overflow-y: scroll;
}

</style>
