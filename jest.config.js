module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  // setupFilesAfterEnv: [
  //   // NOT setupFiles
  //   "./src/test-utils/default-timeout.js",
  // ],
  // testUrl: "",
  roots: ["__tests__"],
  // globalSetup: "./jest-config/global-setup.js"
};
