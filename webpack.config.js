const path = require("path");

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  target: "web",

  module: {
    rules: [
      {
        test: /\.(wasm)|(bin)|(obj)$/i,
        include: [
          path.resolve(__dirname, 'node_modules/deepar/'),
        ],
        type: 'asset/resource',
      },
      {
        include: [
          path.resolve(__dirname, 'effects/'),
        ],
        type: 'asset/resource',
      },
    ],
  },

  resolve: {
    alias: {
      '@effects': path.resolve(__dirname, 'effects/'),
    },
  },

  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 10000000,
  },

  devServer: {
    host: '0.0.0.0', // Принимаем запросы со всех адресов
    port: 8888,
    historyApiFallback: true, // Поддержка React Router
    static: [
      {
        directory: path.join(__dirname, "public"),
      },
      {
        directory: path.join(__dirname, "node_modules/deepar"),
        publicPath: "/deepar-resources",
      },
    ],
    compress: true,
    allowedHosts: 'all', // Разрешаем все хосты
  },
};