<template>
    <Navbar/>

    <div v-if="isLoading" class="row justify-content-md-center">
        <div class="col-3 alert-info text-center mt-5">
            Espere por favor...
            <h3 class="mt-2">
                <i class="fa fa-spin fa-sync"></i>
            </h3>
        </div>
    </div>

    <div v-else class="d-flex">
        <div class="col-4">
            <EntryList/>
        </div>
        <div class="col">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    Navbar: defineAsyncComponent(() => import('../components/NavbarComponent.vue')),
    EntryList: defineAsyncComponent(() => import('../components/EntryList.vue'))
  },
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('journal/loadEntries')
    })

    const isLoading = computed(() => store.state.journal.isLoading)

    return { isLoading }
  }
}
</script>

<style>

</style>