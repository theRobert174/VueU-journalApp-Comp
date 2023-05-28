import authApi from "@/api/authApi"
import { createStore } from "vuex"
import journal from "@/modules/daybook/store/journal"
import { journalState } from "../../../../mock-data/test-journal-state"

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState}
        }
    }
})

describe('Vuex - Pruebas en el Journal Module', () => {

    beforeAll( async() => {
        const {data} = await authApi.post(':signInWithPassword', {
            email: 'test@test.com',
            password: '123456',
            returnSecureToken: true
        })

        localStorage.setItem('idToken', data.idToken)

    })

    //Basicas =======================================================================
    test('este es el estado inicial, debe de tener un state', () => {
        const store = createVuexStore(journalState)
        const {isLoading, entries} = store.state.journal
 
        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
     })
 
     //Mutations =======================================================================
     test('mutation: setEntries', () => {
         const store = createVuexStore({isLoading: true, entries: []})
         store.commit('journal/setEntries', journalState.entries)
 
         expect(store.state.journal.entries.length).toBe(2)
         expect(store.state.journal.isLoading).toBeFalsy()
     })
 
     test('mutation: updateEntry', () => {
         const store = createVuexStore(journalState)
 
         const updatedEntry = {
             id: '-NLYuiHyXqf9eAQ9TynN',
             date: 1673492343801,
             text: "Cambio entrada en spec"
         }
 
         store.commit('journal/updateEntry', updatedEntry)
 
         const storeEntries = store.state.journal.entries
 
         expect(storeEntries.length).toBe(2)
         //expect(storeEntries).toEqual(expect.arrayContaining([expect.objectContaining(updatedEntry)]))
         expect(storeEntries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)
 
     })
 
     test('mutation: addEntry and deleteEntry', () => {
         const store = createVuexStore(journalState)
 
         store.commit('journal/addEntry', {id: 'ABC-123', text: "Hola Mundo"})
 
         expect(store.state.journal.entries.length).toBe(3)
         expect(store.state.journal.entries.find(e => e.id === 'ABC-123')).toBeTruthy()
 
         store.commit('journal/deleteEntry', 'ABC-123')
 
         expect(store.state.journal.entries.length).toBe(2)
         expect(store.state.journal.entries.find(e => e.id === 'ABC-123')).toBeFalsy()
     })
 
     //Getters =======================================================================
     test('getters: getEntriesByTerm and getEntryById', () => {
         const store = createVuexStore(journalState)
 
         const [entry1, entry2] = journalState.entries
 
         expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
         expect(store.getters['journal/getEntriesByTerm']('Vue').length).toBe(1)
 
         expect(store.getters['journal/getEntriesByTerm']('Vue')).toEqual([entry2])
 
         expect(store.getters['journal/getEntryById']('-NLYuiHyXqf9eAQ9TynN')).toEqual(entry1)
     })
 
     //Actions =======================================================================
     test('action: loadEntries', async() => {
         const store = createVuexStore({isLoading: true, entries: []})
 
         await store.dispatch('journal/loadEntries')
 
         expect(store.state.journal.entries.length).toBe(7)
     })
 
     test('action: updateEntry', async() => {
         const store = createVuexStore(journalState)
 
         const updatedEntry = {
             id: '-NLYuiHyXqf9eAQ9TynN',
             date: 1673492343801,
             text: "Nueva entrada en Mock-data",
             otroCampo: false,
             otroMas: {a:1}
         }
         //console.log(store.state.journal.entries)
         await store.dispatch('journal/updateEntry',updatedEntry)
 
         expect(store.state.journal.entries.length).toBe(2)
         expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)
         //console.log(updatedEntry)
         //console.log(store.state.journal.entries)
     })
 
     test('action: createEntry and deleteEntry', async() => {
         const store = createVuexStore(journalState)
 
         const newEntry = {
             date: 1627077227978,
             text: "Nueva entrada desde specs"
         }
 
         const newId = await store.dispatch('journal/createEntry',newEntry)
         //console.log('respueta de delete',newId)
 
         expect(typeof newId).toBe('string')
         expect(store.state.journal.entries.find(e => e.id === newId)).toBeTruthy()
 
         const isDeleted = await store.dispatch('journal/deleteEntry',newId)
         expect(isDeleted).toBeTruthy()
         expect(store.state.journal.entries.find(e => e.id === newId)).toBeFalsy()
     })
})