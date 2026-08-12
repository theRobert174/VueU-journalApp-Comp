<template>
  <div class="daybook-layout d-flex flex-column">
    <Navbar/>

    <div v-if="isLoading" class="row g-0 flex-grow-1 justify-content-center align-content-center">
      <div class="col-auto text-center text-muted">
        <p class="mb-2">Espere por favor...</p>
        <i class="fa fa-spin fa-sync fa-2x text-primary"></i>
      </div>
    </div>

    <div v-else class="row g-0 flex-grow-1 daybook-body">
      <div class="col-12 col-md-4 col-lg-3 daybook-sidebar">
        <EntryList/>
      </div>
      <div class="col-12 col-md daybook-content">
        <router-view/>
      </div>
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

<style lang="scss" scoped>
.daybook-layout {
  // 100dvh evita el salto de altura en móviles cuando la barra de
  // direcciones aparece/desaparece; 100vh queda como fallback.
  height: 100vh;
  height: 100dvh;
}

// El navbar tiene su altura natural (no se le fuerza ninguna); el resto del
// layout se reparte con flex-grow-1, así que nunca hay más contenido que
// alto de viewport disponible y no aparece scroll doble.
.daybook-body {
  min-height: 0;
}

.daybook-sidebar {
  min-height: 0;

  @media (min-width: 768px) {
    height: 100%;
    border-right: 1px solid #dee2e6;
  }
}

.daybook-content {
  min-height: 0;
  overflow-y: auto;

  @media (min-width: 768px) {
    height: 100%;
  }
}
</style>
