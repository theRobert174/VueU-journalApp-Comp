<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input type="text" name="" id="" class="form-control" placeholder="Buscar Entrada" v-model="term">
        </div>
        <div class="mt-2 d-flex flex-column">
            <button class="btn btn-primary mx-3" @click="$router.push({ name: 'entry', params: { id: 'new'}})">
                <i class="fa fa-plus-circle"></i> Nueva entrada
            </button>
        </div>
        <div class="entry-scrollarea">
            <Entry v-for="entry of entriesByTerm" :key="entry.id" :entry="entry"/>
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

<style lang="scss">
.entry-list-container{
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px);
}
.entry-scrollarea{
    height: calc(100vh - 100px);
    overflow: scroll;
    overflow-x: hidden;
}
</style>