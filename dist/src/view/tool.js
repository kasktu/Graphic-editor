var Tool = /** @class */ (function () {
    function Tool() {
    }
    Tool.prototype.onMouseDown = function (ev) {
        this.evDown = ev;
    };
    // Template Method
    Tool.prototype.onMouseUp = function (ev) {
        // 1. save event
        this.evUp = ev;
        // 2. do something w/ the events
        this.processMouseUp();
    };
    // non-public members ------------------------------------
    Tool.prototype.equal = function (ev1, ev2) {
        return ev1.clientX === ev2.clientX
            && ev1.clientY === ev2.clientY;
    };
    return Tool;
}());
export { Tool };
//# sourceMappingURL=tool.js.map