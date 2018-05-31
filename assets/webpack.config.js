const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(env) {
  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, '../priv/static/js'),
      filename: 'app.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [new CopyWebpackPlugin([{ from: './static/*', to: '../../' }])],
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    }
  };
};
