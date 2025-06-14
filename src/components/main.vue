<template>
    <div class="nav-height">
        <ul class="nav justify-content-center ">
            <li class="nav-item ">
                <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">
                    <router-link to="editor" class="text-decoration-none">
                        <i class="bi bi-code-slash"></i>
                        Editor
                    </router-link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link "  href="#" tabindex="-1" aria-disabled="true">
                    <router-link to="/" class="text-decoration-none">
                        <i class="bi bi-house-door-fill"></i>
                        Home
                    </router-link>
                </a>
            </li>
             <li class="nav-item">
                <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">
                    <router-link to="list" class="text-decoration-none">
                        <i class="bi bi-list-ul"></i>
                        Stored
                    </router-link>
                </a>
            </li>
        </ul>
        <div class="row">
          <div class="col-md-6 col-12 p-0">
            <Editor />
          </div>
          <div class="col-md-6 col-12 p-0">
            <ListView />
          </div>
      </div>
    </div>
</template>

<script setup>
    import { RouterLink} from 'vue-router'
    import Editor from  '@/components/editor.vue'
    import ListView from '@/components/listView.vue'

</script>

<style scoped>
.nav-height{
    height: 6vh;
}
</style>