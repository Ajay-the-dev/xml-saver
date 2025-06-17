<template>
  <div>
    <button ref="search" style="display: none;" class="btn btn-primary" @click="openModal">Search</button>

    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-hidden="true" ref="modalRef">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Search</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="text-center">
                  <select v-model="searchBy" class="form-select">
                    <option value="title"> Search by title</option>
                    <option value="desc"> Search by description</option>
                    <option value="code"> Search by XML code</option>
                  </select>
            </div>
            <form>
              <div class="mb-3 m-4" v-if="searchBy === 'title'">
                <label class="form-label">Search By Title</label>
                <input v-model="title" type="text" class="form-control" />
              </div>
              <div class="mb-3 m-4" v-if="searchBy === 'desc'">
                <label class="form-label">Search by Description</label>
                <input v-model="description" type="text" class="form-control" />
              </div>
               <div class="mb-3 m-4" v-if="searchBy === 'code'">
                <label class="form-label">Search By XML Code</label>
                <input v-model="code" type="text" class="form-control" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
              <button class="btn btn-primary" @click="InitiateSearch">Search</button>
            <button class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import { showToast } from '@/components/utils/utils'


const modalRef = ref(null)
let modalInstance = null

const title = ref('')
const description = ref('')
const code = ref('')


const searchBy = ref('title')

onMounted(() => {
if(modalRef.value) {
    modalInstance = new Modal(modalRef.value)
  }
  else{
    console.log('not ready');
    
  }
})

const openModal = () => {
  modalInstance.show()
}

const closeModal = () => {
  title.value = ''
  description.value = ''
  searchBy.value = 'title'
  modalInstance.hide()
}

const InitiateSearch = () => {
 
    if(title.value.trim() === '' && description.value.trim() === '' && code .value.trim() === '')
    {
      showToast('Please enter value to search','error')
      return;
    }

    const searchParams = {}
    searchParams.title = title.value.trim()
    searchParams.description = description.value.trim()
    searchParams.code = code.value.trim()
    emit("InitiateSearch",searchParams)
    closeModal()
}

defineExpose({ openModal })

const emit = defineEmits(['InitiateSearch']);


</script>

<style scoped>

</style>