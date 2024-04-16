// jest.config.js
module.exports = {
    transform: {
      "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
    },
    moduleNameMapper: {
      ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
      ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
    },
    testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
    transformIgnorePatterns: [
      // Exclude modern ES syntax processing from node_modules except specific packages if necessary
      `node_modules/(?!(gatsby|gatsby-script|gatsby-link|@testing-library|@babel/runtime/helpers/esm)/)`
    ],
    globals: {
      __PATH_PREFIX__: ``,
    },
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
      url: `http://localhost`,
    },
    setupFiles: [`<rootDir>/loadershim.js`],
  }
  