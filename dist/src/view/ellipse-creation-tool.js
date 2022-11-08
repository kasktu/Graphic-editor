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
import { BoundBox } from '../model/bound-box';
import { CreationTool } from './creation-tool';
import { Ellipse } from '../model/ellipse';
var EllipseCreationTool = /** @class */ (function (_super) {
    __extends(EllipseCreationTool, _super);
    function EllipseCreationTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // non-public members ------------------------------------
    EllipseCreationTool.prototype.createFigure = function () {
        return new Ellipse(new BoundBox({ x: this.evDown.clientX,
            y: this.evDown.clientY }, { w: this.evUp.clientX - this.evDown.clientX,
            h: this.evUp.clientY - this.evDown.clientY }), 1, {
            r: 0, g: 0, b: 0, a: 255 // color ?
        }, {
            r: 0, g: 0, b: 0, a: 255 // color ?
        }, {
            r: 0, g: 0, b: 0, a: 255 // color ?
        }, []);
    };
    return EllipseCreationTool;
}(CreationTool));
export { EllipseCreationTool };
//# sourceMappingURL=ellipse-creation-tool.js.map