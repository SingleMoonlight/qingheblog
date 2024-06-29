<script setup>
const props = defineProps({
    url: String,
})
const emit = defineEmits('loadSuccess', 'loadFail')

function loadSuccess() {
    emit('loadSuccess');
}

function loadFail() {
    emit('loadFail');
}

</script>

<template>
    <iframe :src="props.url" frameborder="0" class="yuque-wrap" :onload="loadSuccess" :onerror="loadFail"></iframe>
</template>


<style scoped>
.yuque-wrap {       
    width: 100%;
    height: 100%;
}
</style>