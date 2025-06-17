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
              <button class="btn btn-primary" v-if="saveAsNew" @click="InitiateSave(false)">Save as New</button>
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
import { useCodeStore } from '@/stores/codeStore'
import { useRoute,useRouter } from 'vue-router'
import { Toast } from 'bootstrap'


const modalRef = ref(null)
let modalInstance = null

const title = ref('')
const description = ref('')
const saveAsNew = ref(false)

const persistant = ref(false)

const codeStore = useCodeStore()

const route = useRoute()
const router = useRouter()


onMounted(() => {
if(modalRef.value) {
    modalInstance = new Modal(modalRef.value)
  }
  else{
    console.log('not ready');
    
  }

  setTimeout(() => {
    const hasData = codeStore.details
    if(Object.keys(hasData).length > 0 )
    {

      if(hasData.title)
      {
        title.value = hasData.title
      }

      if(hasData.description)
      {
        description.value = hasData.description
      }
    

      saveAsNew.value = codeStore.getCodeStatus()

      persistant.value = true
      
    }
  }, 0);

  if(route.params.menu === 'edit' || route.params.menu === 'view')
  {
      if(codeStore.code === "")
      {
        showToast('Something went wrong with editor', 'error')
        setTimeout(() => {
          router.back()
        }, 2000);
      }
  }


})

const openModal = () => {
  modalInstance.show()
}

const closeModal = () => {
  if(!persistant.value)
  {
    title.value = ''
    description.value = ''
  }
  modalInstance.hide()
}

const InitiateSave = (old = true) => {

    
 
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
    filedata.update = route.params.menu === 'edit' ? true :false
    filedata.new = old ? false : true
    
    emit("saveXml",filedata)
    closeModal()
}

defineExpose({ openModal })

const emit = defineEmits(['saveXml']);


</script>

<style scoped>

</style>