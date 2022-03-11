/* eslint-disable 360learning/module-exports */
module.exports = function () {
    return {
        files: [
            "**/*.ts",
            "!**/*-test.ts",
            "!**/.nyc_output/**",
            "!**/.test-results/**",
            "!**/files/**",
            "!**/node_modules/**"
        ],

        tests: [
            "**/*-test.ts",
            "!**/node_modules/**"
        ],

        setup: () => {
            const chai = require("chai");
            chai.use(require("sinon-chai"));
            global.expect = require("chai").expect;
        },

        testFramework: "mocha",

        env: {
            type: "node",
            runner: "node",
            params: {
                runner: "--trace-warnings"
            }
        },

        workers: { recycle: false }

        // trace: true,
        //runMode: "onsave"
    };
};
