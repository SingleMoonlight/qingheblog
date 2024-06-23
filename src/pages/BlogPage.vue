<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<template>
    <div>
        {{ route.params.path }}
    </div>
</template>


<style scoped></style>