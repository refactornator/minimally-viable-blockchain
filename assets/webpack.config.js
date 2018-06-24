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
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        },
        {
          test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
          loader: require.resolve('url-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    plugins: [new CopyWebpackPlugin([{ from: './static/*', to: '../../' }])],
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    }
  };
};
