type MUIDescribe<P extends any[]> = {
    (...args: P): void;
    skip: (...args: P) => void;
    only: (...args: P) => void;
};
declare const _default: <P extends any[]>(message: string, callback: (...args: P) => void) => MUIDescribe<P>;
export default _default;
//# sourceMappingURL=createDescribe.d.ts.map