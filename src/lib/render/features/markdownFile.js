const {renderMarkdown, findHeadings} = require("../../components");

module.exports = function(ctx, input) {
  const plaintext = renderMarkdown(ctx, input.md, true);
  return {
    searchText: plaintext,
    html: renderMarkdown(ctx, input.md),
    headings: findHeadings(input.md),
    plaintext
  };
};