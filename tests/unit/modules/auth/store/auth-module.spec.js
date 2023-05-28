import axios from "axios"
import createVuexStore from "../../../mock-data/mock-store"


describe('Vuex: Pruebas en el auth-modules', () => {

    test('estado inicial', () => {
        const store = createVuexStore({
            status: 'authenticating', //'authenticated','not-authenticated','authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('authenticating')
        expect(user).toBe(null)
        expect(idToken).toBe(null)
        expect(refreshToken).toBe(null)
    })

    // Mutations
    test('Mutation: loginUser', () => {
        const store = createVuexStore({
            status: 'authenticating', //'authenticated','not-authenticated','authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const payload = {
            user: { name: 'Rodrigo', email: 'rodrigo@renderToString.com'},
            idToken: '123-ABC',
            refreshToken: '456-ABC'
        }

        store.commit('auth/loginUser', payload )

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('authenticated')
        expect(user).toEqual({ name: 'Rodrigo', email: 'rodrigo@renderToString.com'})
        expect(idToken).toBe('123-ABC')
        expect(refreshToken).toBe('456-ABC')
    })

    test('Mutation: logout', () => {
        const store = createVuexStore({
            status: 'authenticated', //'authenticated','not-authenticated','authenticating'
            user: 'test',
            idToken: '123456789',
            refreshToken: '987654321'
        })

        localStorage.setItem('idToken','123456789')
        localStorage.setItem('refreshToken','987654321')

        store.commit('auth/logout')

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('not-authenticated')
        expect(user).toBeFalsy()
        expect(idToken).toBeFalsy()
        expect(refreshToken).toBeFalsy()

        expect(localStorage.getItem('idToken')).toBeFalsy()
        expect(localStorage.getItem('refreshToken')).toBeFalsy()
    })

    //Getters
    test('Getters: username currentState', () => {
        const store = createVuexStore({
            status: 'authenticated', //'authenticated','not-authenticated','authenticating'
            user: { name: 'Rodrigo', email: 'rodrigo@renderToString.com'},
            idToken: '123-ABC',
            refreshToken: '456-ABC'
        })

        expect(store.getters['auth/currentState']).toBe('authenticated')
        expect(store.getters['auth/userName']).toBe('Rodrigo')
    })

    //Actions
    test('Action: createUser - Error usuario ya existe', async() => {
        const store = createVuexStore({
            status: 'not-authenticated', //'authenticated','not-authenticated','authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = { name: 'Test User', email: 'test@test.com', password: '123456'}

        const resp = await store.dispatch('auth/createUser', newUser)

        expect(resp).toEqual({ok: false, message: 'EMAIL_EXISTS'})

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('not-authenticated')
        expect(user).toBeFalsy()
        expect(idToken).toBeFalsy()
        expect(refreshToken).toBeFalsy()
    })

    test('Action: createUser singInUser - Crea el usuario', async() => {
        const store = createVuexStore({
            status: 'not-authenticated', //'authenticated','not-authenticated','authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = { name: 'Test User', email: 'test2@test.com', password: '123456'}
        //signIn
        
        await store.dispatch('auth/signInUser', newUser)
        const { idToken } = store.state.auth

        //Borrar el usuario
        const deleteResp = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAFYM6Py_Yrhof6kTur71t6U6LVtQODIh8` , {
            idToken
        })
        newUser.password = '123456'

        //Crear Usuario
        const resp = await store.dispatch('auth/createUser', newUser)
        expect(resp).toEqual({ok: true})

        const { status, user, idToken: token, refreshToken } = store.state.auth

        expect(status).toBe('authenticated')
        expect(user).toMatchObject({ name: 'Test User', email: 'test2@test.com'})
        expect(typeof token).toBe('string')
        expect(typeof refreshToken).toBe('string')

    })

    test('Action: checkAuthentication - POSITIVA', async() => {
        const store = createVuexStore({
            status: 'not-authenticated', //'authenticated','not-authenticated','authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        //SignIn
        const signInResp = await store.dispatch('auth/signInUser', { email: 'test@test.com', password: '123456'})

        const { idToken } = store.state.auth
        store.commit('auth/logout')

        localStorage.setItem('idToken', idToken)

        const checkResp = await store.dispatch('auth/checkAuthentication')
        const { status, user, idToken: token, refreshToken } = store.state.auth

        expect(checkResp).toEqual({ok: true})

        expect(status).toBe('authenticated')
        expect(user).toEqual({ name: 'User Test', email: 'test@test.com'})
        expect(typeof token).toBe('string')
    })

    test('Action: checkAuthentication - NEGATIVA', async() => {
        const store = createVuexStore({
            status: 'not-authenticated', //'authenticated','not-authenticated','authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        localStorage.removeItem('idToken')

        const checkResp1 = await store.dispatch('auth/checkAuthentication')

        expect(checkResp1).toEqual({ok: false, message: 'No hay token'})
        expect(store.state.auth.status).toBe('not-authenticated')

        localStorage.setItem('idToken', '748159263')
        const checkResp2 = await store.dispatch('auth/checkAuthentication')
        expect(checkResp2).toEqual({ok: false, message: 'INVALID_ID_TOKEN'})
        expect(store.state.auth.status).toBe('not-authenticated')
    })
})