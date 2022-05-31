module.exports = {
  process() {
    return { code: 'return "svg"' };
  },
  getCacheKey() {
    // The output is always the same.
    return "svgTransform";
  },
};
