const fs = require("node:fs");
const path = require("node:path");
const sass = require("sass");

module.exports = function(eleventyConfig) {

  // Watch external folder for changes
  eleventyConfig.addWatchTarget("src/css");

  // Compile src/css/style.scss manually after Eleventy builds
  eleventyConfig.on("afterBuild", () => {
    const outDir = "dist/assets/css";
    fs.mkdirSync(outDir, { recursive: true });

    const result = sass.compile("src/css/style.scss", {
      loadPaths: ["src/css"],
      style: "compressed"
    });

    fs.writeFileSync(path.join(outDir, "style.css"), result.css);
    console.log("✓ Sass compiled: src/css/style.scss → dist/assets/css/style.css");
  });

  // Order items if they have the 'order' front matter key
  eleventyConfig.addFilter("ordered", (items, key = "order", desc = false) => {
      if (!Array.isArray(items)) return [];
      const getOrderValue = (item) => {
          const orderValue = item?.data?.[key];
          return orderValue === undefined ? Number.POSITIVE_INFINITY : orderValue;
      };
      return [...items].sort((a, b) => {
          const aOrder = getOrderValue(a);
          const bOrder = getOrderValue(b);
            if (aOrder === bOrder) {
              const aTitle = a?.data?.title || a.fileSlug || "";
              const bTitle = b?.data?.title || b.fileSlug || "";
              return aTitle.localeCompare(bTitle);
          }
          return desc ? bOrder - aOrder : aOrder - bOrder;
      });
  });

  // Passthroughs
  eleventyConfig.addPassthroughCopy({ "src/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "assets/fonts" });

  eleventyConfig.setServerOptions({ port: 3000 });

  return {
    dir: {
      input: "src/site",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
