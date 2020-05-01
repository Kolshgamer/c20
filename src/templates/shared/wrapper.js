const {html, alert, escapeHtml, REPO_URL, DISCORD_URL, ul, anchor, pageAnchor} = require("./bits");
const {renderMarkdown} = require("./markdown");
const footer = require("./footer");
const header = require("./header");
const breadcrumbs = require("./breadcrumbs");
const toc = require("./toc");

const TOC_MIN_HEADERS = 2;
const COLLAPSE_CHILD_PAGES = 8;
const PREVIEW_LENGTH_CHARS = 100;

const topLevelTopics = [
  ["/blam/tags", "Tags"],
  ["/games/h1", "Halo"]
];

const STUB_ALERT = alert("danger", html`
  <p>🚧 This article is a stub. You can help expand it by submitting content in
  pull requests or issues in this wiki's <a href="${REPO_URL}">source repo</a>.</p>
`);

const wrapper = (page, metaIndex, body) => {
  const imgAbsoluteUrl = page.img ?
    `${metaIndex.baseUrl}${page._path}/${page.img}` :
    `${metaIndex.baseUrl}/assets/librarian.png`;

  const showToc = page.toc !== undefined ? page.toc : page._headers.length > TOC_MIN_HEADERS;

  const plaintextPreview = `${renderMarkdown(page._md, metaIndex, true).substring(0, PREVIEW_LENGTH_CHARS)}...`;

  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta property="og:title" content="${page.title}"/>
        <meta property="og:site_name" content="The Reclaimers Library"/>
        <meta property="og:type" content="website"/>
        <meta property="og:locale" content="en_US"/>
        <meta property="og:url" content="${metaIndex.baseUrl}${page._path}"/>
        <meta property="og:description" content="${plaintextPreview}"/>
        <meta property="og:image" content="${imgAbsoluteUrl}"/>
        <title>${page.title} - c20</title>
        <link rel="icon" type="image/png" href="/assets/librarian.png">
        <link rel="stylesheet" href="/assets/style.css"/>
        <link rel="stylesheet" href="/assets/atom-one-dark.css"/>
      </head>
      <body>
        ${header()}
        <div class="content-layout">
          <aside class="content-sidebar">
            ${showToc && toc(page)}
            ${page._childPages.length > 0 && html`
              <h2>Child pages</h2>
              ${page._childPages.length >= COLLAPSE_CHILD_PAGES ? (html`
                <details>
                  <summary>See all (${page._childPages.length})</summary>
                  ${ul(page._childPages.map(pageAnchor))}
                </details>
              `) : (
                ul(page._childPages.map(pageAnchor))
              )}
            `}
            <h2>Main topics</h2>
            ${ul(topLevelTopics.map(topic => anchor(...topic)))}
          </aside>
          <main role="main" class="content-main">
            <nav class="breadcrumbs">
              ${breadcrumbs(page, metaIndex)}
            </nav>
            <article class="content-article">
              <h1 class="page-title">${escapeHtml(page.title)}</h1>
              ${page.stub && STUB_ALERT}
    ${body}
            </article>
          </main>
          ${footer(page, metaIndex)}
        </div>
      </body>
    </html>
  `;
};

module.exports = wrapper;