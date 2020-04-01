const {html} = require("common-tags");
const {wrapper, ul, pageAnchor, renderMarkdown} = require("./shared");

module.exports = (page, metaIndex) => wrapper({
  page,
  metaIndex,
  body: html`
    <h1 class="page-title">${page.title}</h1>
    ${renderMarkdown(page._md, metaIndex.mdFooter)}
    ${ul(metaIndex.pages.map((page) => pageAnchor(page)))}
  `
});
