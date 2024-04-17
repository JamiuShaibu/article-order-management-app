export default {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: ["**/*.{ts,tsx,js,jsx}"],
  extensionsToTreatAsEsm: [".jsx"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
