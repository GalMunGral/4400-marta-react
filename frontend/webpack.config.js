const path = require("path");

module.exports = (env) => {
  return {
    mode: env,
    entry: path.resolve(__dirname, "src/index.jsx"),
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
              plugins: [
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-nullish-coalescing-operator",
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(svg|jpg)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".css", ".jsx"],
    },
    devServer: {
      contentBase: path.resolve(__dirname, "public"),
      historyApiFallback: true,
      proxy: {
        "/api": "http://localhost:8081",
      },
    },
    devtool: "source-map",
  };
};
