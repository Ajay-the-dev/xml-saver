<template>
    <div class="nav-height">
        <ul class="nav justify-content-center ">
            <li class="nav-item ">
                <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">
                    <router-link to="editor" class="text-decoration-none">
                        <div class="card tile">
                            <div class="card-body p-2">
                                <i class="bi bi-code-slash fs-5"></i>
                                Editor
                            </div>
                        </div>
                    </router-link></a>
            </li>
            <li class="nav-item d-none d-sm-block">
                <a class="nav-link "  href="#" tabindex="-1" aria-disabled="true">
                    <router-link to="/" class="text-decoration-none">
                        <div class="card tile">
                            <div class="card-body p-2">
                                <i class="bi bi-house-door-fill fs-5"></i>
                                Home
                            </div>
                        </div>
                    </router-link>
                </a>
            </li>
             <li class="nav-item">
                <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">
                    <router-link to="list" class="text-decoration-none">
                        <div class="card tile">
                            <div class="card-body p-2">
                                <i class="bi bi-list-ul fs-5"></i>
                                Stored
                            </div>
                        </div>
                    </router-link>
                </a>
            </li>
        </ul>
        <div class="row">
          <div class="col-md-9 col-12 p-0">
            <Editor @showRefresh="refreshPage"/>
          </div>
          <div class="col-md-3 col-12 p-0">
            <ListView :showRefresh="refresh"/>
          </div>
      </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { RouterLink} from 'vue-router'
    import Editor from  '@/components/editor.vue'
    import ListView from '@/components/today.vue'


    const refresh = ref(false)

    const refreshPage = () => {
        refresh.value = !refresh.value
    }


</script>

<style scoped>
.nav-height{
    height: 6vh;
}

.tile{
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tile:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(36, 49, 223, 0.842);
}
</style>