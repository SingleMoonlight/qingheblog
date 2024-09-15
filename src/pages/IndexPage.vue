<script setup>
import BlogItemIcon from '@/components/BlogItemIcon.vue'
import CopyrightStatement from '@/components/CopyrightStatement.vue'
import { blogList, copyrightInfo } from '@/utils/constant'

</script>

<template>
    <div class="index-page-container">
        <div class="blog-item-layer">
            <div class="blog-item-container">
                <div class="blog-item" v-for="(item, index) in blogList" :key="index">
                    <div class="blog-item-button">
                        <a class="blog-item-icon" :href="'book/' + item.path" :underline="false" target="_blank">
                            <BlogItemIcon :name="item.icon"></BlogItemIcon>
                        </a>
                    </div>
                    <div class="blog-item-name">{{ item.name }}</div>
                </div>
            </div>
        </div>
        <div class="copyright-container">
            <CopyrightStatement :show-copyright="true" :copyright-info="copyrightInfo" />
        </div>
    </div>
</template>

<style scoped>
.index-page-container {
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

.copyright-container {
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    color: var(--text-color);
}
</style>