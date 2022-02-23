const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "./dist"),
      watch: true
    },
    watchFiles: ["src/**/*"],

    open: true,
    compress: true,
    hot: true,
    port: 8080
  },
  entry: {
    main: path.resolve(__dirname, "./src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource"
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline"
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack Boilerplate",
      template: path.resolve(__dirname, "./src/index.html"), // шаблон
      filename: "index.html" // название выходного файла
    }),

    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: "style.min.css" })
  ]
};
