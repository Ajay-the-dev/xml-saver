<template>
    <div class="editor bg-light p-4">
      <div class="row">
        <div class="col-12">
          <h3>Recent Activity</h3>
          <br>
          <router-link to="/list">Show all</router-link>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
            <div class="card tile mb-2" v-for="entry in entries" :key = "entry.id" @click="codeView(entry)">
                <div class="body px-2 py-1 pt-2">
                  <div class="row">
                    <div class="col-6">
                      <p class="px-2 ">{{ entry.title}}</p>
                    </div>
                    <div class="col-6">
                      <p class="text-muted cardNew fst-italic">
                        {{ timeAgo(entry.created_at) }}
                      </p>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { onMounted,ref,watch,defineEmits } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'
import { showToast } from '@/components/utils/utils'
import { useCodeStore } from '@/stores/codeStore'


const props = defineProps({
  showRefresh:{
    type:Boolean
  }
})

const entries = ref([])
const codeStore = useCodeStore()
const router = useRouter()


const getTodayUpload = async() =>{
    const response = await axios.get('http://127.0.0.1:8000/api/getXmlByToday')
    .then((response)=>{
      const data = response.data.data
      entries.value = data
    }).catch((error)=>{
      showToast('Something went wrong while getting data','error')
    })
}

const timeAgo = (dateString)  => {
  const now = new Date();
  const then = new Date(dateString);
  const diffInSeconds = Math.floor((now - then) / 1000);

  if (diffInSeconds < 0) return 'in the future';

  if (diffInSeconds < 1) return 'now';
  if (diffInSeconds < 60) return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

  return then.toLocaleDateString(); // fallback to date like "6/17/2025"
}


const codeView = (data) =>{
  const txt = document.createElement('textarea');
  txt.innerHTML = data.code;
  data.code = txt.value   
  codeStore.setCode(data.code) 
  showToast('Redirecting to code editor','info')
  setTimeout(() => {
    router.push('/editor/view')
  }, 3000);
}



onMounted(()=>{
  getTodayUpload()
})

watch(()=> props.showRefresh,(updatedVal)=>{
  console.log('refresh');
  getTodayUpload();
})

</script>

<style scoped>
.editor{
  height: 94vh;
  overflow: hidden;
  overflow-y: scroll;
  border-left: 1px dashed lightgrey;
}
.cardNew{
  font-size: small;
}
.tile {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tile:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

}
</style>