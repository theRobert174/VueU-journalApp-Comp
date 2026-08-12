<template>
  <div class="auth-wrapper d-flex align-items-center justify-content-center min-vh-100 p-3">
    <div class="auth-card card border-0 shadow-lg">
      <div class="card-body p-4 p-md-5">
        <div class="text-center mb-4">
          <img src="@/assets/logo.png" alt="Journal" class="auth-logo mb-2">
          <h1 class="h4 fw-bold text-primary mb-0">Journal</h1>
          <p class="text-muted small mb-0">Tu bitácora personal</p>
        </div>

        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>

<style lang="scss" scoped>
.auth-wrapper {
  background: linear-gradient(135deg, #2c3e50 0%, #1d6042 100%);
}

.auth-card {
  width: 100%;
  max-width: 420px;
  border-radius: 1rem;
}

.auth-logo {
  height: 56px;
  width: 56px;
  object-fit: contain;
}
</style>
