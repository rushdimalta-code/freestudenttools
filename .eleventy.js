/* Eleventy config — incremental migration of hand-authored pages.
 *
 * Rules (agreed 2026-08-28):
 *  - input = src/  ·  output = repo root  ·  Eleventy only globs src/**
 *  - it does NOT clean the output dir, so the ~280 not-yet-migrated .html
 *    files at the root are left completely untouched
 *  - every page keeps its flat  <name>.html  filename → ZERO URL changes
 *  - built .html is committed to git; a broken local build never blocks
 *    Netlify (publish = "." is unchanged, netlify.toml is frozen)
 *  - no client framework, no hydration — HTML in, HTML out
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);          // src/ is not gitignored anyway
  // Nothing from src/ needs passthrough — assets/css/js/data already live at root.
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "."
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "11ty.js"]
  };
};
