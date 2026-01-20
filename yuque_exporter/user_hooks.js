
import { registerHook } from '@singlemoonlight/yuque-exporter/hook'

/**
 * 注册自定义文档处理接口
 * 可以在此处处理文档内容，比如替换图片链接等
 * 
 * @param {string} docContent 文档内容
 * @param {object} docDetail 文档详情
 * @param {string} docPath 文档路径
 * @param {string} bookSlug 知识库标识
 * @return {string} 处理后的文档内容
 */
async function customHook(docContent, docDetail, docPath, bookSlug) {
    // 生成文档元信息并把 front-matter 插入到文档顶部
    function safeStr(v) {
        if (v == null) return '';
        return String(v).replace(/\r?\n+/g, ' ').trim();
    }

    function slugify(s) {
        if (!s) return '';
        return String(s)
            .normalize('NFKD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fff]+/gu, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/-+/g, '-');
    }

    // 去掉以数字和点开头的序号（例如 "2. 标题" -> "标题"）
    const rawTitle = safeStr(docDetail && docDetail.title);
    const title = rawTitle.replace(/^\s*\d+\.\s*/, '');

    // format created_at as YYYY/MM/DD HH:mm:ss (convert UTC -> UTC+8)
    let createTime = '';
    if (docDetail && docDetail.created_at) {
        const d = new Date(docDetail.created_at);
        if (!Number.isNaN(d.getTime())) {
            d.setTime(d.getTime() + 8 * 3600 * 1000);
            const Y = d.getUTCFullYear();
            const M = String(d.getUTCMonth() + 1).padStart(2, '0');
            const D = String(d.getUTCDate()).padStart(2, '0');
            const h = String(d.getUTCHours()).padStart(2, '0');
            const m = String(d.getUTCMinutes()).padStart(2, '0');
            const s = String(d.getUTCSeconds()).padStart(2, '0');
            createTime = `${Y}/${M}/${D} ${h}:${m}:${s}`;
        }
    }

    // permalink logic based on docPath
    const slugBase = (docDetail && docDetail.slug) ? docDetail.slug : slugify(title || rawTitle);
    let slug = slugBase;
    let permalink = `/article/${slug}/`;
    let isNotes = false;
    if (docPath) {
        const path = String(docPath).replace(/\\+/g, '/');
        const parts = path.split('/');
        const idx = parts.findIndex(p => p === 'docs');
        if (idx >= 0 && parts.length > idx + 1) {
            const next = parts[idx + 1];
            if (next === '笔记' && parts.length > idx + 2) {
                isNotes = true;
                // 根据“笔记”下面的一级目录决定 permalink 的第一级，使用可维护的映射表
                const notesCategory = parts[idx + 2];
                const notesMap = {
                    'Java 编程': 'java',
                    'C 编程': 'c'
                };
                const first = notesMap[notesCategory] || '';
                if (first) {
                    permalink = `/${first}/${slug}/`;
                } else if (bookSlug) {
                    permalink = `/${bookSlug}/${slug}/`;
                }
            }
        }
    }

    const tags = Array.isArray(docDetail && docDetail.tag) ? docDetail.tag : (Array.isArray(docDetail && docDetail.tags) ? docDetail.tags : []);

    // 构造 front-matter
    let fm = '---\n';
    fm += `title: ${title}\n`;
    if (createTime) fm += `createTime: ${createTime}\n`;
    fm += `permalink: ${permalink}\n`;
    if (tags && tags.length) {
        fm += `tags:\n`;
        for (const t of tags) {
            fm += `  - ${t}\n`;
        }
    }
    fm += '---\n';

    return fm + docContent;
}

registerHook(customHook);
