module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("js/script.js");
    eleventyConfig.addPassthroughCopy("css/style.css");
};