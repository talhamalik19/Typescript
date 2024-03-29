const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.ts', // Replace './src/index.js' with the path to your entry TypeScript file
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
