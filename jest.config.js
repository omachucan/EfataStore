import { createDefaultPreset } from "ts-jest";
// const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export const testEnvironment = "node";
export const transform = {
  ...tsJestTransformCfg,
  "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
};
export const setupFiles = ["<rootDir>/jest.setup.ts"];
// export const globals = {
//   "ts-jest": {
//     tsconfig: "tsconfig.json",
//   },
// };
