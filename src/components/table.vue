<template>
    <div>
        <div class="row">
            <!-- <div :class="route.name === 'list' ? 'col-12 col-md-6':'col-12'">
            </div> -->
            <div :class="route.name === 'list' ? 'col-12 col-md-6':'col-12'">
                <div v-if="Object.keys(data).length === 0 " class="spinner-border text-dark" role="status">
                </div>
                <div style="font-size: small;" v-else>
                        <div v-for="row in table" v-if="table.length > 0" class="vh10">
                            <div class="card m-1">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-4" v-if="isMobile">
                                        <span class="fs-6" :title="row.title">
                                            {{ row.title.length > 15 ? row.title.substring(0,15):row.title }}
                                        </span>
                                        <br>
                                        <span class="text-muted" :title="row.description" v-if="route.name === 'list'">
                                            {{ row.description.length > 25 ? decodeHtml(row.description.substring(0,25)):decodeHtml(row.description) }}
                                        </span>
                                    </div>
                                    <div class="col-4" v-else>
                                        <span class="fs-6" :title="row.title">
                                            {{ row.title.length > 20 ? row.title.substring(0,20):row.title }}
                                        </span>
                                        <br>
                                        <span class="text-muted" :title="row.description" v-if="route.name === 'list'">
                                            {{ row.description.length > 44 ? decodeHtml(row.description.substring(0,44)):decodeHtml(row.description) }}
                                        </span>
                                    </div>
                                    <div class="col-4 align-content-center text-muted d-none d-sm-block">
                                        <i class="bi bi-clock"></i>
                                        <span class="p-1">
                                            {{ formatTimestamp(row.created_at) }}
                                        </span>
                                    </div>
                                    <div class="col-8 col-md-4">
                                        <button class="btn btn-primary m-1" @click="viewCode(row)">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                        <button class="btn btn-primary m-1" @click="editCode(row)">
                                            <i class="bi bi-pencil-square"></i>
                                        </button>
                                        <button class="btn btn-primary m-1" @click="askDelete(row)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="card m-1">
                                <div class="bg-danger-subtle card-body">
                                    <p>oops ! Sounds like you have'nt stored any XML</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed,ref} from 'vue';
import {useRouter, useRoute} from 'vue-router'
import axios from 'axios'
import { showToast } from '@/components/utils/utils'
import Swal from 'sweetalert2'
import { useCodeStore } from '@/stores/codeStore'



const router = useRouter()
const route = useRoute()
const codeStore = useCodeStore()

const windowWidth = ref(window.innerWidth);

const decodeHtml = (str) => {
  return new DOMParser().parseFromString(str, 'text/html').documentElement.textContent
}

const askDelete = (row) =>{
Swal.fire({
              title: 'Delete',
              text: 'This can be undone, Continue ? ',
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Yes',
          }).then((result) => {
                if (result.isConfirmed) {
                  deleteXml(row);
                }
          })
}

const deleteXml = async(row) =>{
    
    const response = await axios.post('http://127.0.0.1:8000/api/removeXml',{
     id:row.id   
    }).then((response)=>{
        const data = response.data;
        if(data.status === 1)
        {
            showToast(data.message, 'success')
            emit("refresh",'http://127.0.0.1:8000/api/getXml?page='+props.data.current_page )
        }else{
            showToast(data.message, 'error')
        }
        
    }).catch((error)=>{
        showToast('Something went wrong while deleting', 'error')
    })
    
}


const props = defineProps({
    data:{
        type : Object
    },
    mode:{
        type:String,
        Default:"Normal"
    }
})

const table = computed(()=>{

    if(Object.keys(props.data).length > 0)
    {
        return props.data.data;
    }
    else{
        // return {}
    }
    
})

const isMobile = computed(() => {
  return windowWidth.value < 768; 
});


const  formatTimestamp = (isoString) => {
  const date = new Date(isoString);

  const pad = (num) => num.toString().padStart(2, '0');

  let hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // convert to 12-hour format

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // months are 0-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year} ${pad(hours)}:${minutes}:${seconds} ${ampm}`;
}


const viewCode = (row)=>{

    showToast('Moving code to editor. Please wait', 'info')
    const txt = document.createElement('textarea');
    txt.innerHTML = row.code;
    row.code = txt.value 
    
    codeStore.setCode(row.code)
    setTimeout(() => {
        router.push('/editor/view')
    }, 2000);    
}

const editCode = (row)=>{

    const txt = document.createElement('textarea');
    txt.innerHTML = row.code;
    row.code = txt.value 
    
    var data = {}

    data.title = row.title
    data.description = row.description
    data.id = row.id
    
    codeStore.setCode(row.code)
    codeStore.setDetails(data)
    router.push('/editor/edit')
   
}

const emit = defineEmits(["refresh"])

</script>

<style  scoped>

</style>