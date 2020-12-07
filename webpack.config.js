const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          // outputPath もカスタマイズしたい場合は、publicPath と同じようにカスタマイズできる
          // outputPath: (url, resourcePath, context) => {
          //   console.log('url', url);
          //   console.log('resourcePath', resourcePath);
          //   console.log('context', context);
          //   // 相対パスも指定できる
          //   const relativePath = path.relative(context, resourcePath);
          //   console.log('relativePath', relativePath);

          //   if (/background\.jpg/.test(resourcePath)) {
          //     return `images/background/${url}`;
          //   }

          //   if (/icon\.png/.test(resourcePath)) {
          //     return `images/icon/${url}`;
          //   }

          //   if (/icon2\.png/.test(resourcePath)) {
          //     return `images/icon2/${url}`;
          //   }

          //   return `images${url}`;
          // },
          /**
           * @param {string} url ファイルの名前
           * @param {string} resourcePath ファイルのパス（絶対パス）
           * @param {string} context エントリポイントやローダを解決するためのベースディレクトリ（デフォルトでは webpack を実行したディレクトリ）
           */
          publicPath: (url, resourcePath, context) => {
            console.log('url', url);
            console.log('resourcePath', resourcePath);
            console.log('context', context);
            // 以下のように書けば相対パスを取得できる
            const relativePath = path.relative(context, resourcePath);
            console.log('relativePath', relativePath);

            if (/background\.jpg/.test(resourcePath)) {
              return `/images/background/${url}`;
            }

            if (/icon\.png/.test(resourcePath)) {
              return `/images/icon/${url}`;
            }

            if (/icon2\.png/.test(resourcePath)) {
              return `/images/icon2/${url}`;
            }

            return `/images${url}`;
          },
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      chunks: ['app'],
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
    }),
  ],
};
