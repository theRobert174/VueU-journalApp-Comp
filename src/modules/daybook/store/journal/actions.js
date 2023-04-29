import journalApi from "@/api/journalApi"

// export const myAction = async({commit}) => {


// }

export const loadEntries = async({commit}) => {
    const {data} = await journalApi.get('/entries.json')

    if(!data){
        commit('setEntries', [])
        return
    }

    const entries = []
    for(let id of Object.keys(data)){
        entries.push({
            id,
            ...data[id]
        })
    }
    commit('setEntries', entries)
}
export const updateEntry = async({commit},entry) => {
    // console.log(entry, 'action')
    const {id, ...rest} = entry
    //console.log(rest)

    /*const resp = */await journalApi.put(`/entries/${id}.json`, rest)
    //console.log('resp',resp)
    commit('updateEntry', {...entry})
}
export const createEntry = async({commit}, entry) => {
    
    const {data} = await journalApi.post(`/entries.json`,entry)
    //console.log(data.name)
    const newEntry = {
        id: data.name,
        ...entry
    }
    commit('addEntry', newEntry)
    return data.name
}
export const deleteEntry = async({commit}, id) => {
    const {data} = await journalApi.delete(`/entries/${id}.json`)
    if(!data){
        commit('deleteEntry', id)
        return true
    }
}