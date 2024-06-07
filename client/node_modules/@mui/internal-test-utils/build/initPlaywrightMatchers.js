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
const chai_1 = __importStar(require("chai"));
chai_1.default.use((chaiAPI, utils) => {
    chai_1.default.Assertion.addMethod('toHaveFocus', async function elementHandleIsFocused() {
        const $elementOrHandle = utils.flag(this, 'object');
        if ($elementOrHandle == null) {
            throw new chai_1.AssertionError(`Expected an element handle but got ${String($elementOrHandle)}.`);
        }
        const $element = typeof $elementOrHandle.then === 'function'
            ? await $elementOrHandle
            : $elementOrHandle;
        const { isFocused, stringifiedActiveElement, stringifiedElement } = await $element.evaluate((element) => {
            const activeElement = element.ownerDocument !== null ? element.ownerDocument.activeElement : null;
            return {
                isFocused: activeElement === element,
                stringifiedElement: window.elementToString(element),
                stringifiedActiveElement: window.elementToString(activeElement),
            };
        });
        this.assert(isFocused, `expected element to have focus`, `expected element to NOT have focus \n${stringifiedElement}`, stringifiedElement, stringifiedActiveElement);
    });
    chai_1.default.Assertion.addMethod('toHaveAttribute', async function elementHandleHasAttribute(attributeName, attributeValue) {
        const $elementOrHandle = utils.flag(this, 'object');
        if ($elementOrHandle == null) {
            throw new chai_1.AssertionError(`Expected an element handle but got ${String($elementOrHandle)}.`);
        }
        const $element = typeof $elementOrHandle.then === 'function'
            ? await $elementOrHandle
            : $elementOrHandle;
        const actualAttributeValue = await $element.getAttribute(attributeName);
        if (attributeValue === undefined) {
            this.assert(actualAttributeValue !== null, `expected element to have attribute \`${attributeName}\``, `expected element to NOT have attribute \`${attributeName}\``, null, null);
        }
        else {
            this.assert(actualAttributeValue === attributeValue, `expected element to have attribute \`${attributeName}="${attributeValue}"\``, `expected element to NOT have attribute \`${attributeName}="${attributeValue}"\``, attributeValue, actualAttributeValue);
        }
    });
});
//# sourceMappingURL=initPlaywrightMatchers.js.map