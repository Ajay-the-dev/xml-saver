<template>
    <div>
        <div class="row">
            <div :class="route.name === 'list' ? 'col-12 col-md-6':'col-12'">
                <div v-if="Object.keys(data).length === 0 " class="spinner-border text-dark" role="status">
                </div>
                <div style="font-size: small;" v-else>
                        <div v-for="row in table" class="vh10">
                            <div class="card m-1">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-6" v-if="isMobile">
                                        <span class="fs-6" :title="row.title">
                                            {{ row.title.length > 15 ? row.title.substring(0,15)+'...':row.title }}
                                        </span>
                                        <br>
                                        <span class="text-muted" :title="row.description">
                                            {{ row.description.length > 25 ? row.description.substring(0,25)+'...':row.description }}
                                        </span>
                                    </div>
                                    <div class="col-6" v-else>
                                        <span class="fs-6" :title="row.title">
                                            {{ row.title.length > 20 ? row.title.substring(0,20)+'...':row.title }}
                                        </span>
                                        <br>
                                        <span class="text-muted" :title="row.description">
                                            {{ row.description.length > 44 ? row.description.substring(0,44)+'...':row.description }}
                                        </span>
                                    </div>
                                </div>
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

const router = useRouter()
const route = useRoute()

const windowWidth = ref(window.innerWidth);


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
    // console.log('computing',Object.keys(props.data).length > 0)

    if(Object.keys(props.data).length > 0)
    {
        return props.data.data;
    }
    else{
        // return {}
    }
    // if
    
    // return Object.keys(props.data).length > 0 ? data.data[0] :{}
})

const isMobile = computed(() => {
  return windowWidth.value < 768; 
});

</script>

<style  scoped>

</style>