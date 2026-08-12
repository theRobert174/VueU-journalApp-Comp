<template>
    <div class="mb-3 pointer p-2 entry-container" @click="$router.push({ name: 'entry', params:{ id: entry.id }})">
    <div class="entry-title d-flex">
        <span class="text-success fs-5 fw-bold">{{day}}</span>
        <span class="mx-1 fs-5">{{month}}</span>
        <span class="mx-2 fw-light">{{yearDay}}</span>
    </div>
    <div class="entry-description">
      {{ shortText }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

export default{
    props:{
        entry: {
            type: Object,
            required: true
        }
      },
      setup(props) {
          
          const shortText = computed(() => {return (props.entry.text.length > 130) ? props.entry.text.substring(0,130) + '...' : props.entry.text})
          const day = computed(() => {return new Date(props.entry.date).getDate()})
          const month = computed(() => {return months[new Date(props.entry.date).getMonth()]})
          const yearDay = computed(() => { const date = new Date(props.entry.date); return `${date.getFullYear()}, ${days[date.getDay()]}` })
          return{
              shortText, day, month, yearDay
          }
      }
}
</script>

<style lang="scss" scoped>
.entry-container{
  border-bottom: 1px solid #dee2e6;
  transition: background-color 0.2s ease-in;

  &:hover{
    background-color: rgba($color: #2c3e50, $alpha: 0.06);
  }

  .entry-description{
    font-size: 12px;
    color: #6c757d;
  }
}
</style>