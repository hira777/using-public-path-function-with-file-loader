# file-loader で、出力されるファイルに指定される画像パスを、画像に応じてカスタマイズしているサンプル

公式ドキュメントに記載されている、以下の書き方を利用しています。

https://v4.webpack.js.org/loaders/file-loader/#function-2

## 指定される画像パスに関して

このサンプルで利用する画像は以下に格納されています。

```
src
└── images
    ├── background.jpg
    ├── icon.png
    └── icon2.png
```

そして、`file-loader`のオプションである`publicPath`を以下のように書くと、画像名やパスに応じて、出力されるファイルに指定される画像パスをカスタマイズしています。

```js
{
  test: /\.(jpe?g|gif|png|svg)$/,
  loader: 'file-loader',
  options: {
    name: '[name].[ext]',
    outputPath: 'images/',
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
```

そのため、今回出力されるファイルに指定される画像パスは以下のようになります。

`./public/index.html`

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>App</h1>
    <img src="/images/icon/icon.png" />
    <img src="/images/icon2/icon2.png" />
  </body>
</html>
```

`./public/css/main.css`

```css
body {
  background: url(/images/background/background.jpg) no-repeat;
  background-size: cover;
  color: #ffffff;
  user-select: none;
  margin: 10px 20px 10px 20px;
}
```

### outputPath も同じようにカスタマイズできる

今回のサンプルでは`publicPath`をカスタマイズしましたが、`outputPath`も同じようにカスタマイズできます。

## 動作環境

- Node.js: v12.18.1
- npm: v6.14.5

## セットアップ

このディレクトリ上で以下のコマンドを実行してください。

```shell
npm ci
```

## 使い方

以下のコマンドを実行すれば、webpack が実行されてバンドルされたファイルが出力されます。

```shell
npm run build
```
