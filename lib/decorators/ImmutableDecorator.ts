export function Immutable(target: Function): void {
    Object.freeze(target);
    Object.freeze(target.prototype);
}