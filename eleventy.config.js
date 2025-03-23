module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("js/audio.js");
    eleventyConfig.addPassthroughCopy("css/style.css");
};