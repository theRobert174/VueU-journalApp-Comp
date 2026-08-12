<template>
    <div class="entry-list-container d-flex flex-column">
        <div class="px-2 pt-2">
            <input type="text" name="" id="" class="form-control" placeholder="Buscar Entrada" v-model="term">
        </div>
        <div class="mt-2 d-flex flex-column">
            <button class="btn btn-primary mx-3" @click="$router.push({ name: 'entry', params: { id: 'new'}})">
                <i class="fa fa-plus-circle"></i> Nueva entrada
            </button>
        </div>
        <div class="entry-scrollarea flex-grow-1">
            <Entry v-for="entry of entriesByTerm" :key="entry.id" :entry="entry"/>
            <p v-if="entriesByTerm.length === 0" class="text-muted text-center small mt-4 px-3">
                No hay entradas que coincidan con la búsqueda
            </p>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    Entry: defineAsyncComponent(() => import('@/modules/daybook/components/EntryComponent.vue'))
  },
  setup() {
    const store = useStore()

    const term = ref('')

    const entriesByTerm = computed(() => {
      return store.getters['journal/getEntriesByTerm'](term.value)
    })

    return { term, entriesByTerm }
  }
}
</script>

<style lang="scss" scoped>
.entry-list-container {
  height: 100%;
}

.entry-scrollarea {
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

// Debajo de md el sidebar no recibe una altura del 100% desde el layout
// (se apila arriba del contenido), así que se le pone un tope propio para
// que la lista no empuje el resto de la página fuera de la pantalla.
@media (max-width: 767.98px) {
  .entry-scrollarea {
    max-height: 45vh;
  }
}
</style>
