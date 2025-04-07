const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",    
    library: {
      name: 'shared-sidebar-menu-fvg',
      type: 'umd',
    },
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "react-icons": "react-icons"
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    fallback: {
      fs: false,
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      assert: require.resolve('assert/'),
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      process: require.resolve('process/browser'),
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "index.d.ts", to: "." }
      ]
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]
};
