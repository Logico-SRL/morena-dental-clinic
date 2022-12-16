module.exports = {
  presets: [
    [
      "next/babel",
      {
        "class-properties": {
          "loose": true
        }
      }
    ]
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          "@uc": "./src/userControls",
          "@icons": "./src/userControls/icons",
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-proposal-private-methods",
      {
        "loose": true
      }
    ],
    [
      "@babel/plugin-proposal-private-property-in-object",
      {
        "loose": true
      }
    ]
  ]
}
