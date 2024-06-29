<script setup>
import YuqueWrap from '@/components/YuqueWrap.vue'
import StripLoading from '@/components/StripLoading.vue'
import { yuqueBaseUrl } from '@/utils/constant'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const yuqueLoadDone = ref(false)

function handleLoadSuccess() {
    yuqueLoadDone.value = true;
}

function handleLoadFail() {
    //
}

</script>

<template>
    <div class="loading-container" v-show="!yuqueLoadDone">
        <StripLoading></StripLoading>
    </div>
    <YuqueWrap :url="yuqueBaseUrl + route.params.path" @load-success="handleLoadSuccess" @load-fail="handleLoadFail" />
</template>


<style scoped>
.loading-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--loading-background-color);
}
</style>