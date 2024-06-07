"use strict";
/* eslint-env mocha */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (message, callback) => {
    const muiDescribe = (...args) => {
        describe(message, () => {
            callback(...args);
        });
    };
    muiDescribe.skip = (...args) => {
        describe.skip(message, () => {
            callback(...args);
        });
    };
    muiDescribe.only = (...args) => {
        describe.only(message, () => {
            callback(...args);
        });
    };
    return muiDescribe;
};
//# sourceMappingURL=createDescribe.js.map