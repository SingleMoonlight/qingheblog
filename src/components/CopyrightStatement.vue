<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
    showCopyright: Boolean,
    copyrightInfo: Object,
})
const year = ref(0)

onMounted(() => {
    year.value = new Date().getFullYear();
})

</script>

<template>
    <div class="copyright" v-show="props.showCopyright">
        © {{ year }}
        <a :underline="false" :href="props.copyrightInfo.ownerUrl" target="_blank">
            {{ props.copyrightInfo.ownerInfo }}
        </a>
        |
        {{ props.copyrightInfo.beianProvince }}公网安备
        <a :underline="false" :href="props.copyrightInfo.gonanBeianUrl" target="_blank">
            {{ props.copyrightInfo.gonanBeianNum }}
        </a>
        |
        {{ props.copyrightInfo.beianProvince }}ICP备
        <a :underline="false" :href="props.copyrightInfo.icpBeianUrl" target="_blank">
            {{ props.copyrightInfo.icpBeianNum }}
        </a>
    </div>
</template>


<style scpoed>
.copyright {
    font-size: 12px;
    font-weight: lighter;
    white-space: nowrap;
    text-align: center;
    display: inline-block;
    transition: .25s;
}

@media (max-width: 850px) {
    .copyright {
        opacity: 0;
    }
}

@media(max-height: 500px) {
    .copyright {
        opacity: 0;
    }
}
</style>