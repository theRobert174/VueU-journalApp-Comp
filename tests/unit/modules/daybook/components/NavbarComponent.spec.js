import { shallowMount } from "@vue/test-utils"
import NavbarComponent from "@/modules/daybook/components/NavbarComponent.vue"
import createVuexStore from "../../../mock-data/mock-store"


describe('Pruebas en el Navbar Component', () => {

    const store = createVuexStore({
        user: {
            name: 'Robert Rand',
            email: 'tugrp@example.com',
        },
        status: 'authenticated',
        idToken: '123',
        refreshToken: '456'
    })

    beforeEach(() => jest.clearAllMocks())

    test('debe mostrar el componente correctamente', () => {
        const wrapper = shallowMount(NavbarComponent, {
            global: {
                plugins: [store]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('click en logout, debe de cerrar sesion y redireccionar', async() => {
        const wrapper = shallowMount(NavbarComponent, {
            global: {
                plugins: [store]
            }
        })

        await wrapper.find('button').trigger('click')

        expect(wrapper.router.push).toHaveBeenCalledWith({name: 'login'})
        expect(store.state.auth).toEqual({
            status: 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })
    })
})