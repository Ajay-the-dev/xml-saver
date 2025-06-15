<template>
  <div>
    <button ref="fileSaver" style="display: none;" class="btn btn-primary" @click="openModal">Open modal</button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true" ref="modalRef">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Save</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Title</label>
                <input v-model="title" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea v-model="description" class="form-control"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
              <button class="btn btn-primary" @click="InitiateSave">Save</button>
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
  modalInstance.hide()
}

const InitiateSave = () => {
 
    const name = title.value.trim()
    const desc = description.value.trim()
    // const regexAlphanumericOnly = /^[a-zA-Z0-9]+$/;
    const regexAlphanumericAndSpaces = /^[a-zA-Z0-9 ]+$/;


    if(name === '')
    {
        showToast('Title cannot be empty', 'error')
        return;
    }

    if(desc === '')
    {
        showToast('Description cannot be empty', 'error')
        return;
    }

    if(!regexAlphanumericAndSpaces.test(name))
    {
        showToast('Invalid title name !', 'error')
        return;
    }

    const filedata = {}
    filedata.title = name
    filedata.desc = desc
    emit("saveXml",filedata)
    closeModal()
}

defineExpose({ openModal })

const emit = defineEmits(['saveXml']);


</script>

<style scoped>

</style>