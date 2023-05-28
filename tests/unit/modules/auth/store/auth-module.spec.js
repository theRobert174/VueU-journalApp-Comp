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
})