"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = require("sinon");
describe('custom matchers', () => {
    const consoleSandbox = (0, sinon_1.createSandbox)();
    beforeEach(() => {
        // otherwise our global setup throws on unexpected calls in afterEach
        consoleSandbox.stub(console, 'warn');
        consoleSandbox.stub(console, 'error');
    });
    afterEach(() => {
        consoleSandbox.restore();
    });
    describe('toErrorDev()', () => {
        it('passes if the message is exactly the same', () => {
            (0, chai_1.expect)(() => console.error('expected message')).toErrorDev('expected message');
        });
        it('passes if the message is a subset', () => {
            (0, chai_1.expect)(() => console.error('expected message')).toErrorDev('pected messa');
        });
        it('passes if multiple messages are expected', () => {
            (0, chai_1.expect)(() => {
                console.error('expected message');
                console.error('another message');
            }).toErrorDev(['expected message', 'another message']);
        });
        it("fails if an expected console.error call wasn't recorded with a useful stacktrace", () => {
            let caughtError;
            try {
                console.error('expected message');
                (0, chai_1.expect)(() => { }).toErrorDev('expected message');
            }
            catch (error) {
                caughtError = error;
            }
            (0, chai_1.expect)(caughtError).to.have.property('stack');
            (0, chai_1.expect)(caughtError.stack).to.include('Could not match the following console.error calls. ' +
                "Make sure previous actions didn't call console.error by wrapping them in expect(() => {}).not.toErrorDev(): \n\n" +
                '  - "expected message"\n' +
                '    at Context.');
            // check that the top stackframe points to this test
            // if this test is moved to another file the next assertion fails
            (0, chai_1.expect)(caughtError.stack).to.match(/- "expected message"\s+at Context\.(<anonymous>|it) \(.+\/initMatchers\.test\.js:\d+:\d+\)/);
        });
        it('is case sensitive', () => {
            let caughtError;
            try {
                (0, chai_1.expect)(() => console.error('expected Message')).toErrorDev('expected message');
            }
            catch (error) {
                caughtError = error;
            }
            (0, chai_1.expect)(caughtError).to.have.property('stack');
            (0, chai_1.expect)(caughtError.stack).to.include('Recorded unexpected console.error calls: \n\n' +
                '  - Expected #1 "expected message" to be included in \n' +
                '"expected Message"\n' +
                '    at callback');
            // check that the top stackframe points to this test
            // if this test is moved to another file the next assertion fails
            (0, chai_1.expect)(caughtError.stack).to.match(/"expected Message"\s+at callback \(.+\/initMatchers\.test\.js:\d+:\d+\)/);
        });
        it('fails if the order of calls does not match', () => {
            (0, chai_1.expect)(() => {
                (0, chai_1.expect)(() => {
                    console.error('another message');
                    console.error('expected message');
                }).toErrorDev(['expected message', 'another message']);
            }).to.throw('Recorded unexpected console.error calls');
        });
        it('fails if there are fewer messages than expected', () => {
            (0, chai_1.expect)(() => {
                (0, chai_1.expect)(() => {
                    console.error('expected message');
                }).toErrorDev(['expected message', 'another message']);
            }).to.throw('Could not match the following console.error calls');
        });
        it('passes if no messages were recorded if expected', () => {
            (0, chai_1.expect)(() => { }).not.toErrorDev();
            (0, chai_1.expect)(() => { }).not.toErrorDev([]);
        });
        it('fails if no arguments are used as a way of negating', () => {
            (0, chai_1.expect)(() => {
                (0, chai_1.expect)(() => { }).toErrorDev();
            }).to.throw("Expected to call console.error but didn't provide messages. " +
                "If you don't expect any messages prefer `expect().not.toErrorDev();");
        });
        it('fails if arguments are passed when negated', () => {
            (0, chai_1.expect)(() => {
                (0, chai_1.expect)(() => { }).not.toErrorDev('not unexpected?');
            }).to.throw('Expected no call to console.error but provided messages. ' +
                "If you want to make sure a certain message isn't logged prefer the positive. " +
                'By expecting certain messages you automatically expect that no other messages are logged');
        });
        it('ignores `false` messages', () => {
            const isReact16 = false;
            (0, chai_1.expect)(() => {
                (0, chai_1.expect)(() => { }).toErrorDev([isReact16 && 'some legacy error message']);
            }).not.to.throw();
        });
    });
});
//# sourceMappingURL=initMatchers.test.js.map