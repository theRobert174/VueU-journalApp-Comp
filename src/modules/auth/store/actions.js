import authApi from "@/api/authApi"

/**
 * Extrae un mensaje de error legible de una respuesta fallida de axios.
 * Evita romper la app cuando el error no trae `response` (por ejemplo,
 * un fallo de red o de CORS), en cuyo caso `error.response` es undefined.
 */
const getErrorMessage = (error) => {
    return error?.response?.data?.error?.message
        || 'Ocurrió un error inesperado, intenta de nuevo'
}

export const createUser = async({commit}, user) => {
    const {name, email, password} = user

    try{
        const { data } = await authApi.post(':signUp', {email, password, returnSecureToken: true})
        const { idToken, refreshToken } = data

        await authApi.post(':update', { displayName: name, idToken })

        delete user.password
        commit('loginUser', {user, idToken, refreshToken})
        return { ok: true }

    } catch (error) {
        return { ok: false, message: getErrorMessage(error) }
    }
}

export const signInUser = async({commit}, user) => {
    const { email, password } = user

    try{
        const { data } = await authApi.post(':signInWithPassword', {email, password, returnSecureToken: true})
        const { displayName, idToken, refreshToken } = data

        delete user.password
        user.name = displayName

        commit('loginUser', {user, idToken, refreshToken})

        return { ok: true }

    } catch (error) {
        return { ok: false, message: getErrorMessage(error) }
    }
}

export const checkAuthentication = async({commit}) => {

    const idToken = localStorage.getItem('idToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if(!idToken){
        commit('logout')
        return { ok: false, message: `No hay token`}
    }

    try{
        const { data } = await authApi.post(':lookup', {idToken})
        const { displayName, email } = data.users[0]

        const user = {
            name: displayName,
            email
        }

        commit('loginUser', { user, idToken, refreshToken })

        return{ ok: true }
    } catch(error){
        commit('logout')
        return { ok: false, message: getErrorMessage(error) }
    }
}