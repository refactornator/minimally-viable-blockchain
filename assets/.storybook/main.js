module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  webpackFinal: async (config) => {
    config.module.rules.forEach((rule) => {
      if (rule.test.test('.svelte')) {
        rule.options = {
          preprocess: require('svelte-preprocess')({}),
        };
      }
    });

    return config;
  },
};
