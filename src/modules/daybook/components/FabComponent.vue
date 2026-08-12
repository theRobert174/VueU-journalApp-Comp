<template>
    <button class="btn btn-primary" @click="$emit('on:click')">
        <i class="fa fa-2x" :class="icon"></i>
    </button>
</template>

<script>
export default {
    props:{
        icon:{
            type: String,
            default: 'fa-plus'
        }
    }
}
</script>

<style lang="scss" scoped>
button{
    align-items: center;
    border-radius: 100%;
    bottom: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    height: 80px;
    justify-content: center;
    position: fixed;
    right: 20px;
    width: 80px;
    z-index: 5;
}
</style>