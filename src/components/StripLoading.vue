<script>

</script>

<template>
    <div class="strip-loading">
        <div v-for="v in 8" :key="v" class="strip"></div>
    </div>
</template>

<style scoped>
.strip-loading {
    position: absolute;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 40px;
    display: flex;
}

.strip {
    width: 6px;
    height: 10px;
    background: var(--loading-color);
    margin: 0 3px;
    border-radius: 10px;
    animation: loading 0.8s ease-in-out infinite;
}

@keyframes loading {
    0% {
        height: 10px;
    }

    50% {
        height: 40px;
    }

    100% {
        height: 10px;
    }
}

.strip:nth-child(2) {
    animation-delay: 0.1s;
}

.strip:nth-child(3) {
    animation-delay: 0.2s;
}

.strip:nth-child(4) {
    animation-delay: 0.3s;
}

.strip:nth-child(5) {
    animation-delay: 0.4s;
}

.strip:nth-child(6) {
    animation-delay: 0.5s;
}

.strip:nth-child(7) {
    animation-delay: 0.6s;
}

.strip:nth-child(8) {
    animation-delay: 0.7s;
}
</style>