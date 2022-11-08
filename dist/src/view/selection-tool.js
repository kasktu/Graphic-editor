var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Tool } from './tool';
import app from '../index';
var SelectionTool = /** @class */ (function (_super) {
    __extends(SelectionTool, _super);
    function SelectionTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionTool.prototype.processMouseUp = function () {
        if (this.equal(this.evDown, this.evUp)) {
            // point selection
            app.select(this.evUp);
        }
        else {
            // bound box selection
            app.select(this.evDown, this.evUp);
        }
    };
    return SelectionTool;
}(Tool));
export { SelectionTool };
//# sourceMappingURL=selection-tool.js.map