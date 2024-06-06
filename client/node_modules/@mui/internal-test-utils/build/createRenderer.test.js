"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const React = __importStar(require("react"));
const ReactDOM = __importStar(require("react-dom"));
const createRenderer_1 = require("./createRenderer");
describe('createRenderer', () => {
    const { render } = (0, createRenderer_1.createRenderer)();
    it('allows querying descriptions', () => {
        function Component() {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { id: "target", "aria-describedby": "r:1 r:2 r:3" }, "I have a description."),
                ReactDOM.createPortal(React.createElement("div", { id: "r:1" }, "Description 1"), document.body),
                React.createElement("div", { id: "r:2" }, "Description 2"),
                React.createElement("div", { id: "r:3" }, "Description 3")));
        }
        const { getAllDescriptionsOf } = render(React.createElement(Component, null));
        const descriptions = getAllDescriptionsOf(document.getElementById('target'));
        (0, chai_1.expect)(descriptions).to.have.length(3);
        (0, chai_1.expect)(descriptions[0]).to.have.property('id', 'r:1');
        (0, chai_1.expect)(descriptions[1]).to.have.property('id', 'r:2');
        (0, chai_1.expect)(descriptions[2]).to.have.property('id', 'r:3');
    });
});
//# sourceMappingURL=createRenderer.test.js.map