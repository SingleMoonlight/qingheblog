const { matterMarkdownAdapter } = require('@elog/cli')

const docNotes = [
  { dir: 'C 编程', path: '/c/' },
  { dir: 'Java 编程', path: '/java/' },
]

/**
 * 自定义文档插件
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * @param {ImageClient} imageClient 图床下载器，可用于图片上传
 * @return {Promise<DocDetail>} 返回处理后的文档对象
 */
const format = async (doc, imageClient) => {
  let date = doc.properties.date;
  let directories = doc.docPath.split('\\');
  let docNotePermalink = '/article/';

  if (directories[1] === '笔记') {
    docNotes.forEach(item => {
      if (item.dir === directories[2]) {
        docNotePermalink = item.path;
      }
    });
  }

  doc.properties.date = date.replace(/-/g, '/');
  doc.body = 
    '---\n' + 
    'title: ' + doc.properties.title.replace(/^\d+\./, '') + '\n' +
    'createTime: ' + doc.properties.date + '\n' +
    'permalink: ' + docNotePermalink + doc.properties.urlname + '\/'  + '\n' +
    'outline: [2, 6]' + '\n' +
    '---\n' + 
    doc.body;

  return doc;
};

module.exports = {
  format,
};