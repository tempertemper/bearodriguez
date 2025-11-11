const fs = require("node:fs");
const path = require("node:path");
const sass = require("sass");
const esbuild = require("esbuild");

module.exports = function(eleventyConfig) {

  // Watch external folder for changes
  eleventyConfig.addWatchTarget("src/css");
  eleventyConfig.addWatchTarget("src/js");

  // Compile src/css/style.scss manually after Eleventy builds
  eleventyConfig.on("afterBuild", async () => {
    // CSS
    const outDir = "dist/assets/css";
    fs.mkdirSync(outDir, { recursive: true });
    const result = sass.compile("src/css/style.scss", {
      loadPaths: ["src/css"],
      style: "compressed"
    });
    fs.writeFileSync(path.join(outDir, "style.css"), result.css);
    console.log("✓ Sass compiled: src/css/style.scss → dist/assets/css/style.css");

    // JavaScript
    const jsOutDir = "dist/assets/js";
    fs.mkdirSync(jsOutDir, { recursive: true });
    await esbuild.build({
      entryPoints: ["src/js/index.js"],
      bundle: true,
      minify: true,
      sourcemap: true,
      outfile: path.join(jsOutDir, "scripts.js"),
      logLevel: "silent"
    });
    console.log("✓ JS bundled: src/js/*.js → dist/assets/js/scripts.js");
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

  // Set colour for SVGs
  eleventyConfig.addFilter("colourFor", function (order) {
    const colours = ["#db592b", "#dbad21", "#5c7a77"];
    const n = (order || 1) - 1;
    const row = Math.floor(n / 3);
    const col = n % 3;
    return colours[(col + (row % 3)) % 3];
  });

  // Passthroughs
  eleventyConfig.addPassthroughCopy({ "src/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/site/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "src/site/site.webmanifest": "site.webmanifest" });

  eleventyConfig.setServerOptions({
    port: 3000,
    files: [
      "dist/assets/css/style.css",
      "dist/assets/js/scripts.js"
    ]
  });

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
