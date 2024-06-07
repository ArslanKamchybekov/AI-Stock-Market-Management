declare namespace _exports {
    export { Browser };
}
declare const _exports: {
    'reporter:profiler': (string | typeof KarmaReporterReactProfiler)[];
};
export = _exports;
type Browser = {
    /**
     * -  Seem random
     */
    id: string;
    /**
     * - Includes name, version and OS
     */
    name: string;
};
/**
 * @typedef {object} Browser
 * @property {string} id -  Seem random
 * @property {string} name - Includes name, version and OS
 */
/**
 * Records results from the Profiler injected
 * @param {*} karmaConfig
 */
declare function KarmaReporterReactProfiler(karmaConfig: any): void;
declare class KarmaReporterReactProfiler {
    /**
     * @typedef {object} Browser
     * @property {string} id -  Seem random
     * @property {string} name - Includes name, version and OS
     */
    /**
     * Records results from the Profiler injected
     * @param {*} karmaConfig
     */
    constructor(karmaConfig: any);
    /**
     * @param {Browser} browser
     */
    onBrowserStart: (browser: Browser) => void;
    /**
     * @param {Browser} browser
     */
    onBrowserComplete: (browser: Browser) => void;
}
declare namespace KarmaReporterReactProfiler {
    let $inject: string[];
}
//# sourceMappingURL=KarmaReporterReactProfiler.d.ts.map