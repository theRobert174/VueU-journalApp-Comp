<template>
    <nav class="navbar bg-primary">
        <router-link :to="{name: 'no-entry'}" class="navbar-brand text-white">
            <img src="@/assets/logo.png" alt="Journal" class="d-inline-block align-text-top mx-2" height="24">
            {{userName}}
        </router-link>
        <div class="d-flex">
            <button @click="onLogout" class="btn btn-outline-info mx-2">
                <i class="fa fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>

<script>
import useAuth from '@/modules/auth/composables/useAuth'
import { useRouter } from 'vue-router'
export default {
    setup(){
        const { userName, logout } = useAuth()
        const router = useRouter()

        return{
            userName,

            onLogout: () => {
                router.push({name: 'login'})
                logout()
            }
        }
    }
}
</script>

<style>

</style>