module.exports = {
  babel: {
    presets: [
      [
        "@babel/preset-react",
        { runtime: "automatic", importSource: "@emotion/react" },
      ],
    ],
    plugins: [
      [
        "@emotion/babel-plugin",
        {
          // sourceMap is on by default but source maps are dead code eliminated in production
          "sourceMap": true,
          "autoLabel": "dev-only",
          "labelFormat": "[local]",
          "cssPropOptimization": true
        }
      ]
    ],
  },
};