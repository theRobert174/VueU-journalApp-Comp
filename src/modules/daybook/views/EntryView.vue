<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{ day }}</span>
                <span class="mx-1 fs-3">{{month}}</span>
                <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
            </div>
    
            <div>
                <input type="file" name="" id="box" @change="onSelectedImage" ref="imageSelector" v-show="false" accept="image/png, image/jpeg, image/jpg">
                <button v-if="entry.id" class="btn btn-danger mx-2" @click="onDeleteEntry">Borrar <i class="fa fa-trash-alt"></i></button>
                <button class="btn btn-primary" @click="onSelectImage">Subir foto <i class="fa fa-upload"></i></button>
            </div>
        </div>
        <hr>
        <div class="d-flex flex-column px-3 h-75">
            <textarea placeholder="Que sucedió hoy?" v-model="entry.text"></textarea>
        </div>
        <img v-if="entry.picture && !localImage" :src="entry.picture" alt="entry-picture" class="img-thumbnail">
        <img v-if="localImage" :src="localImage" alt="entry-picture" class="img-thumbnail">
    </template>
    <Fab :icon="'fa-floppy-disk'" @on:click="saveEntry"/>
</template>

<script>
import { computed, defineAsyncComponent, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import Swal from 'sweetalert2'

import uploadImage from '../helpers/uploadImage'
import getDayMonthYear from '../helpers/getDayMonthYear'

export default {
    name: 'EntryView',
    components:{ Fab: defineAsyncComponent( () => import('@/modules/daybook/components/FabComponent.vue')) },
    props:{
        id: {
            type: String,
            required: true
        }
    },
    setup(props){
        const store = useStore()
        const router = useRouter()

        const entry = reactive({})
        const file = ref('')
        const localImage = ref('')
        const imageSelector = ref('')

        const getEntryById = (id) => store.getters['journal/getEntryById'](id)

        const day = computed(() => getDayMonthYear(entry.date).day)
        const month = computed(() => getDayMonthYear(entry.date).month)
        const yearDay = computed(() => getDayMonthYear(entry.date).yearDay)

        const loadEntry = () => {
            let entryData

            Object.keys(entry).forEach(key => {
                    delete entry[key]
            })

            if(props.id === 'new'){
                entryData = {
                    text: '',
                    date: new Date().getTime()
                }
                for(let prop in entryData){
                    entry[prop] = entryData[prop]
                }
            } else {
                entryData = getEntryById(props.id)
                console.log(entryData)
                if(!entryData) return router.push({name: 'no-entry'})

                for(let prop in entryData){
                    entry[prop] = entryData[prop]
                }
                console.log(entry)
            }
        }

        const saveEntry = async() => {
            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false
            })
            Swal.showLoading()

            const pictureData = await uploadImage(file.value)
            console.log('pictureData',pictureData)
            if(pictureData) entry.picture = pictureData
            console.log('entry id',entry.id)
            if(entry.id){
                console.log('Guardado ala entry', entry)
                store.dispatch('journal/updateEntry', entry)
            } else {
                const resp = await store.dispatch('journal/createEntry', entry)
                if(resp) router.push({name: 'entry', params: {id: resp}})
            }

            file.value = null
            Swal.fire('Guardado','Entrada Registrada','success')
        }

        const onDeleteEntry = async() => {
            const { isConfirmed } = await Swal.fire({
                title: 'Estas seguro?',
                text: 'Una vez borrado, no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })

            if(isConfirmed){

                new Swal({
                    title:'Espere por favor',
                    allowOutsideClick: false
                })
                Swal.showLoading()

                const resp = await store.dispatch('journal/deleteEntry', entry.id)

                if(resp) router.push({name: 'entry', params: {id: 'new'}})

                Swal.fire('Eliminado','','success')
            }
        }

        const onSelectedImage = (event) => {
            const fileL = event.target.files[0]
            if(!fileL){
                localImage.value = null
                file.value = null
                return
            }

            file.value = fileL
            const fr = new FileReader()
            fr.onload = () => { localImage.value = fr.result}
            fr.readAsDataURL(fileL)
        }

        const onSelectImage = () => {
            imageSelector.value.click()
        }

        //watchers
        watch(() => props.id, () => {
            loadEntry()
            console.log('el id cambio')
        })
        //Life cycle hooks
        onMounted(() => {
            loadEntry()
            console.log({day, month, yearDay, entry})
        })

        return{
            entry, localImage, 
            onSelectedImage, onSelectImage, imageSelector, onDeleteEntry, saveEntry, loadEntry,

            day, month, yearDay
        }
    }
}
</script>

<style lang="scss" scoped>
textarea{
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus{
        outline: none;
    }
}
img{
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>