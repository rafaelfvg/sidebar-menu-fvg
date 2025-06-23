const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

const baseModuleRules = [
  {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    loader: "babel-loader"
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
  }
];

const externals = {
  react: "react",
  "react-dom": "react-dom",
  "react-icons": "react-icons"
};

const resolveFallback = {
  fs: false,
  stream: require.resolve('stream-browserify'),
  zlib: require.resolve('browserify-zlib'),
  assert: require.resolve('assert/'),
  buffer: require.resolve('buffer/'),
  util: require.resolve('util/'),
  process: require.resolve('process/browser'),
};

module.exports = [
  {
    mode: "production",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "index.js",
      libraryTarget: 'commonjs2',
      globalObject: "this",
    },
    module: {
      rules: baseModuleRules,
    },
    externals: externals,
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      fallback: resolveFallback,
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
  },
  {
    mode: "production",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "index.esm.js",
      library: {
        type: 'module',
      },
      clean: true,
    },
    experiments: {
      outputModule: true,
    },
    module: {
      rules: baseModuleRules,
    },
    externals: externals,
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      fallback: resolveFallback,
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ]
  }
];