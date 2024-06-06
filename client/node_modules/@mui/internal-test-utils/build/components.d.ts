import * as React from 'react';
import PropTypes from 'prop-types';
/**
 * A basic error boundary that can be used to assert thrown errors in render.
 * @example <ErrorBoundary ref={errorRef}><MyComponent /></ErrorBoundary>;
 *          expect(errorRef.current.errors).to.have.length(0);
 */
export declare class ErrorBoundary extends React.Component<{
    children: React.ReactNode;
}> {
    static propTypes: {
        children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
    };
    state: {
        error: null;
    };
    /**
     * @public
     */
    errors: unknown[];
    static getDerivedStateFromError(error: unknown): {
        error: unknown;
    };
    componentDidCatch(error: unknown): void;
    render(): React.ReactNode;
}
/**
 * Allows counting how many times the owner of `RenderCounter` rendered or
 * a component within the RenderCounter tree "commits" an update.
 * @example <RenderCounter ref={getRenderCountRef}>...</RenderCounter>
 *          getRenderCountRef.current() === 2
 */
export declare const RenderCounter: React.ForwardRefExoticComponent<{
    children: React.ReactNode;
} & React.RefAttributes<() => number>>;
//# sourceMappingURL=components.d.ts.map