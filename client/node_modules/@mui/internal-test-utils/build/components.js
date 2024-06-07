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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderCounter = exports.ErrorBoundary = void 0;
const React = __importStar(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
/**
 * A basic error boundary that can be used to assert thrown errors in render.
 * @example <ErrorBoundary ref={errorRef}><MyComponent /></ErrorBoundary>;
 *          expect(errorRef.current.errors).to.have.length(0);
 */
class ErrorBoundary extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            error: null,
        };
        /**
         * @public
         */
        this.errors = [];
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    componentDidCatch(error) {
        this.errors.push(error);
    }
    render() {
        if (this.state.error) {
            return null;
        }
        return this.props.children;
    }
}
exports.ErrorBoundary = ErrorBoundary;
ErrorBoundary.propTypes = {
    children: prop_types_1.default.node.isRequired,
};
/**
 * Allows counting how many times the owner of `RenderCounter` rendered or
 * a component within the RenderCounter tree "commits" an update.
 * @example <RenderCounter ref={getRenderCountRef}>...</RenderCounter>
 *          getRenderCountRef.current() === 2
 */
exports.RenderCounter = React.forwardRef(function RenderCounter({ children }, ref) {
    const getRenderCountRef = React.useRef(0);
    React.useImperativeHandle(ref, () => () => getRenderCountRef.current);
    return (React.createElement(React.Profiler, { id: "render-counter", onRender: () => {
            getRenderCountRef.current += 1;
        } }, children));
});
//# sourceMappingURL=components.js.map