<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
// const route = useRoute()

const gotoHome = () => {
    router.replace({ path: '/' })
}
</script>

<template>
    This is about page
    <button @click="gotoHome">Home</button>
    <img class="about__img" src="@/assets/images/logo-universal.png" />
    <div class="about__div-img"></div>
</template>

<style lang="css">
.about__img {
    width: 200px;
    height: 200px;
}

.about__div-img {
    width: 200px;
    height: 200px;
    background-image: url('@/assets/images/logo-universal.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
