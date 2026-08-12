<template>
  <h2 class="h5 text-center text-muted mb-4">Ingresar</h2>

  <form @submit.prevent="onSubmit" novalidate>
    <div class="mb-3">
      <label for="email" class="form-label">Correo</label>
      <div class="input-group">
        <span class="input-group-text"><i class="fa fa-envelope"></i></span>
        <input
          id="email"
          v-model="userForm.email"
          type="email"
          class="form-control"
          placeholder="tu@correo.com"
          autocomplete="email"
          required
        >
      </div>
    </div>

    <div class="mb-4">
      <label for="password" class="form-label">Contraseña</label>
      <div class="input-group">
        <span class="input-group-text"><i class="fa fa-lock"></i></span>
        <input
          id="password"
          v-model="userForm.password"
          type="password"
          class="form-control"
          placeholder="••••••••"
          autocomplete="current-password"
          required
        >
      </div>
    </div>

    <button type="submit" class="btn btn-primary w-100 mb-3">
      <i class="fa fa-sign-in-alt me-1"></i> Login
    </button>

    <p class="text-center mb-0 small">
      ¿No tienes cuenta? <router-link :to="{name: 'register'}">Regístrate</router-link>
    </p>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'
import Swal from 'sweetalert2'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const { loginUser } = useAuth()

    const userForm = ref({
      email: '',
      password: ''
    })

    return {
      userForm,

      onSubmit: async () => {
        const { ok, message } = await loginUser(userForm.value)
        if (!ok) Swal.fire('Error', message, 'error')
        else router.push({ name: 'no-entry' })
      }
    }
  }
}
</script>
