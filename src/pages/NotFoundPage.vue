<script setup>
import { RouterLink } from 'vue-router'


</script>

<template>
    <div class="not-found-container">
        <div class="not-found-des">Not Found (°ー°〃)</div>
        <RouterLink class="not-found-button" to="/">首页</RouterLink>
    </div>
</template>

<style scoped>
.not-found-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--text-color);
}

.not-found-des {
    color: var(--text-color);
}

.not-found-button {
    padding: 10px 20px;
    border-radius: 10px;
    margin-top: 20px;
    align-self: baseline;
    text-align: center;
    text-decoration: none;
    color: var(--text-color);
    background-color: var(--button-background-color);
    box-shadow: var(--button-shadow);
    transition: .15s;
}

.not-found-button:hover {
    box-shadow: var(--button-hover-shadow);
}
</style>