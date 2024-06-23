<script setup>
import BlogItemIcon from '@/components/BlogItemIcon.vue'
import { splineSceneUrl, blogList } from '@/utils/constant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const showBlogItem = ref(false)
const router = useRouter()

function handleSpaceKeyDown() {
    if (showBlogItem.value) {
        showBlogItem.value = false;
    } else {
        showBlogItem.value = true;
    }
}

function keyHandler(e) {
    if (e.code === 'Space') {
        handleSpaceKeyDown();
    }
}

function openBlogItemPage() {
    showBlogItem.value = true;
}

function closeBlogItemPage() {
    showBlogItem.value = false;
}

function openBlog(blogPath) {
    router.push({
        name: 'show',
        params: {
            path: blogPath,
        }
    });
}

onMounted(() => {
    window.addEventListener('keydown', keyHandler);
})
</script>

<template>
    <div class="index-page-container">
        <div class="spline-layer" @click="openBlogItemPage" @touchstart="openBlogItemPage">
            <div class="spline-container">
                <Vue3Spline :scene="{ url: splineSceneUrl }" />
            </div>
        </div>
        <Transition name="fade" mode="out-in">
            <div class="blog-item-layer" v-show="showBlogItem" @click="closeBlogItemPage"
                @touchstart="closeBlogItemPage">
                <div class="blog-item-container">
                    <div class="blog-item" v-for="(item, index) in blogList" :key="index">
                        <div class="blog-item-button">
                            <div class="blog-item-icon" @click="openBlog(item.path)">
                                <BlogItemIcon :name="item.icon"></BlogItemIcon>
                            </div>
                        </div>
                        <div class="blog-item-name">{{ item.name }}</div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.index-page-container {
    position: absolute;
    width: 100%;
    height: 100%;
}

.spline-layer {
    position: absolute;
    width: 100%;
    height: 100%;
}

.spline-container {
    position: absolute;
    width: 100%;
    height: 100%;
}

.blog-item-layer {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color);
    overflow: auto;
}

.blog-item-container {
    height: auto;
    width: 100%;
    max-width: 580px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-template-rows: repeat(auto-fill, 140px);
    grid-gap: 60px;
    justify-content: center;
}

.blog-item {
    width: 100px;
    height: 140px;
}

.blog-item-button {
    cursor: pointer;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    color: var(--text-color);
    background-color: var(--button-background-color);
    box-shadow: var(--button-shadow);
    transition: .15s;
}

.blog-item-button:hover {
    box-shadow: var(--button-hover-shadow);
}

.blog-item-icon {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.blog-item-name {
    margin-top: 20px;
    text-align: center;
    font-weight: bold;
    color: var(--text-color);
}
</style>