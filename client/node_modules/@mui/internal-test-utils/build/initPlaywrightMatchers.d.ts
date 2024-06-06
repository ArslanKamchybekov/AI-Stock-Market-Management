import * as DomTestingLibrary from '@testing-library/dom';
declare global {
    namespace Chai {
        interface Assertion {
            /**
             * Checks if the element handle is actually focused i.e. the element handle is pointing to `document.activeElement`.
             */
            toHaveFocus(): Promise<void>;
            /**
             * Checks if the element handle has the given attribute.
             * @example expect($element).toHaveAttribute('aria-expanded') is like `[aria-expanded]` CSS selector
             * @example expect($element).toHaveAttribute('aria-expanded', 'true') is like `[aria-expanded="true"]` CSS selector
             */
            toHaveAttribute(attributeName: string, attributeValue?: string): Promise<void>;
        }
    }
    interface Window {
        DomTestingLibrary: typeof DomTestingLibrary;
        /**
         * @example $element.evaluate(element => window.pageElementToString(element))
         */
        elementToString(element: Node | null | undefined): string | false;
    }
}
//# sourceMappingURL=initPlaywrightMatchers.d.ts.map