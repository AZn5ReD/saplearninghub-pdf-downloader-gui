const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

// const findLinkedModules = (nodeModulesPath) => {
//   const modules = [];

//   fs.readdirSync(nodeModulesPath).forEach((dirname) => {
//     const modulePath = path.resolve(nodeModulesPath, dirname);
//     const stat = fs.lstatSync(modulePath);

//     if (dirname.startsWith(".")) {
//       // not a module or scope, ignore
//     } else if (dirname.startsWith("@")) {
//       // scoped modules
//       modules.push(...findLinkedModules(modulePath));
//     } else if (stat.isSymbolicLink()) {
//       const realPath = fs.realpathSync(modulePath);
//       const realModulePath = path.resolve(realPath, "node_modules");

//       modules.push(realModulePath);
//     }
//   });

//   return modules;
// };

module.exports = {
  mode: process.NODE_ENV || "development",
  entry: "./src",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: { publicPath: "dist" },
          },
        ],
      },
      {
        test: /\.node$/,
        use: [
          {
            loader: "native-addon-loader",
            options: { name: "[name]-[hash].[ext]" },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    // symlinks: false,
    // modules: [
    //   path.resolve("./node_modules"),
    //   ...findLinkedModules(path.resolve("node_modules")),
    // ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: "node_modules/saplearninghub-pdf-downloader/dist/index.js",
    //     to: "saplearninghub-pdf-downloader",
    //   },
    // ]),
  ],
};
