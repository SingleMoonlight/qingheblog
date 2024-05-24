<script setup>
import { RouterLink } from 'vue-router'


</script>

<template>
    <div class="not-found-container">
        <div>Not Found (°ー°〃)</div>
        <RouterLink class="not-found-button" to="/">首页</RouterLink>
    </div>
</template>

<style scoped>
.not-found-container {
    position: absolute;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #d0d0d0;
}

.not-found-button {
    position: absolute;
    text-decoration:none;
    padding: 10px 20px;
    border-radius: 10px;
    text-align: center;
    margin-top: 20px;
    color: #d0d0d0;
    box-shadow: 4px 4px 8px #d0d0d0, -4px -4px 8px #ffffff,
        inset 0 0 0 #d0d0d0, inset 0 0 0 #ffffff;
    transition: box-shadow .15s;
}

.not-found-button:hover {
    box-shadow: 0 0 0 #d0d0d0, 0 0 0 #ffffff,
        inset 2px 2px 4px #d0d0d0, inset -2px -2px 4px #ffffff;
}
</style>