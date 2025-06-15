<script setup>
import { ref,onMounted,watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/xml/xml.js'


import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/addon/search/jump-to-line.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'

import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/matchesonscrollbar.css'


import Swal from 'sweetalert2'
import { showToast } from '@/components/utils/utils'



import Modal from '@/components/modal.vue'

  const route = useRoute()
  const router = useRouter()

  const showEditor = ref(true)
  const xmlContent = ref('')
  const editorInstance = ref(null);
  





  const fileInput = ref(null)
  const fileSaver = ref(null)




 const toaster = (desc, title, buttonTitle) => {
  return {
    error: () => {
      Swal.fire({
        title: title,
        text: desc,
        icon: 'error',
        confirmButtonText: buttonTitle
      });
    },
    success: () => {
      Swal.fire({
        title: title,
        text: desc,
        icon: 'success',
        confirmButtonText: buttonTitle
      });
    }
  };
};

  const uploadFile = ()=>{
        fileInput.value?.click();
  }

  const handleFileUpload = (event)=>{
    const file = event.target.files[0];

    if(!file)
    {
      return
    }
    else{

      let isValid = checkForValidExtension(file.name);
  
      if(isValid)
      {
        let cleanedName = fileNameCleanser(file.name);
        if(cleanedName === '')
        {
          toaster('Invalid file name', 'Invalid File Name', 'Try Again').error();
        }
        else{
          const reader = new FileReader()
          reader.onload = () => {            
           
              xmlContent.value = reader.result;
            }
            reader.readAsText(file)
        }
  
      }
      else
      {
        toaster('Your have uploaded invalid file use (.xml) files', 'Invalid File', 'Try Again').error();
      }
    }
  
    }
    
    const fileNameCleanser = (fileName) =>{
            
      const cleaned = fileName.replace(/[^a-zA-Z0-9._-]/g, '')

      return cleaned;
    }
    
    const checkForValidExtension = (fileName) =>{
      
      const isValid = /\.xml$/i.test(fileName);
      return isValid;
  }


  const setupEditor = () =>{    
    editorInstance.value = CodeMirror.fromTextArea(document.getElementById('xml-editor'), {
      mode: 'application/xml',
      lineNumbers: true,
      theme: 'dracula',
      tabSize: 2,
      indentUnit: 2,
      matchBrackets: true,
      autoCloseBrackets: true,
      lineWrapping: true,
      extraKeys: {
        'Ctrl-F': 'find',
        'Shift-Ctrl-F': 'replace',
        'Shift-Ctrl-R': 'replaceAll',
        'Ctrl-G': 'jumpToLine'
        }
    });
    editorInstance.value.on('change', (cm) => {
      xmlContent.value = cm.getValue()
    })

    editorInstance.value.setValue(xmlContent.value)

  }

  // 

  onMounted(() => {
    setupEditor()
  });

  watch(xmlContent, (newVal) => {
  
     if (editorInstance.value && editorInstance.value.getValue() !== newVal) {
            editorInstance.value.setValue(newVal);
        }
  });

  const saveXml = () =>{  
    fileSaver?.value.openModal() 
  }

  const clearXml = (force = false) => {

    if(force)
    {
      if (editorInstance.value) {
              editorInstance.value.setValue('')
              xmlContent.value = ''
            }
    }
    else{

        if(xmlContent.value.trim() !== '')
        {
            Swal.fire({
              title: 'Confirm',
              text: 'Are you sure ? ',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes',
          }).then((result) => {
                if (result.isConfirmed) {
                  if (editorInstance.value) {
                    editorInstance.value.setValue('')
                    xmlContent.value = ''
                  }
                }
          })
        }
        else{
            if (editorInstance.value) {
              editorInstance.value.setValue('')
              xmlContent.value = ''
            }
        }
    }
    

  }

  const goToHome = () =>{

    if(xmlContent.value.trim() !== '')
    {
      Swal.fire({
          title: 'Confirm',
          text: 'Editor is not empty\n Do you want to continue ? ',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Yes',
      }).then((result) => {
            if(result.isConfirmed)
            {
              router.push('/')
            }
      })
    }
    else{
      router.push('/')
    }
  }


  const saveData = async(data) =>{
    
      const response = await axios.post('http://127.0.0.1:8000/api/saveXml',{
        title: data.title,
        description: data.desc,
        code : xmlContent.value
      },{
        Accept:'application/json'
      }).then((response)=>{
        console.log(response);
        const data = response.data
        if(data.status === 1)
        {
          clearXml(true)
          showToast(data.message, 'success')
          emit('showRefresh',true)
        }
        else{
          showToast(data.message, 'error')
        }
      }).catch((error)=>{
          showToast(error, 'error')
      })
  }

  const emit = defineEmits(['showRefresh'])

</script>

<template>
  <div class="editor bg-light p-4" id="">
    <div class="row">
      <div class="col-12">
        <h3>The XML Editor</h3>
      </div>
      <div class="col-12">
        <p class="text-muted">This is a simple XML editor. You can edit XML content here OR <span class="link-info pointer" @click="uploadFile">Upload here</span></p>

        <!-- uploader -->
        <input class="btn btn-primary" type="file"  ref="fileInput" accept=".xml" style="display: none;" @change="handleFileUpload" />

      </div>
      <div class="col-12" >
        <textarea id="xml-editor" class="form-control" rows="10"></textarea>
        <div class="mt-2">
          <button class="btn btn-primary m-1" @click="saveXml" :disabled="xmlContent.trim() === ''">Save</button>
          <button class="btn btn-primary m-1" @click="clearXml" :disabled="xmlContent.trim() === ''">Clear</button>
          <button class="btn btn-primary m-1" @click="goToHome" v-if="route.name ==='editor'">Go Back</button>
        </div>
      </div>
    </div>
      <Modal ref="fileSaver" @save-xml="saveData"/>
  </div>
</template>

<style scoped>

.pointer{
  cursor: pointer;
}

.editor{
  height: 94vh;
  overflow: hidden;
}
</style>
