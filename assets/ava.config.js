export default {
  files: ["tests/**/*"],
  compileEnhancements: false,
  extensions: ["ts", "tsx"],
  require: ["./tests/_setup.js", "ts-node/register"]
};
