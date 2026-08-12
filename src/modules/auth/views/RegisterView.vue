<template>
  <h2 class="h5 text-center text-muted mb-4">Crear cuenta</h2>

  <form @submit.prevent="onSubmit" novalidate>
    <div class="mb-3">
      <label for="name" class="form-label">Nombre</label>
      <div class="input-group">
        <span class="input-group-text"><i class="fa fa-user"></i></span>
        <input
          id="name"
          v-model="userForm.name"
          type="text"
          class="form-control"
          placeholder="Tu nombre"
          autocomplete="name"
          required
        >
      </div>
    </div>

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
          autocomplete="new-password"
          minlength="6"
          required
        >
      </div>
    </div>

    <button type="submit" class="btn btn-primary w-100 mb-3">
      <i class="fa fa-user-plus me-1"></i> Crear cuenta
    </button>

    <p class="text-center mb-0 small">
      ¿Ya tienes cuenta? <router-link :to="{name: 'login'}">Inicia sesión</router-link>
    </p>
  </form>
</template>

<script>
import { ref } from 'vue'
import useAuth from '../composables/useAuth'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterView',
  setup() {
    const router = useRouter()
    const { createUser } = useAuth()

    const userForm = ref({
      name: '',
      email: '',
      password: ''
    })

    return {
      userForm,

      onSubmit: async () => {
        const { ok, message } = await createUser(userForm.value)
        if (!ok) Swal.fire('Error', message, 'error')
        else router.push({ name: 'no-entry' })
      }
    }
  }
}
</script>
