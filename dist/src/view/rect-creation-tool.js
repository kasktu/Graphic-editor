var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BoundBox } from '../model/bound-box';
import { CreationTool } from './creation-tool';
import { Rectangle } from '../model/rectangle';
var RecgtangleCreationTool = /** @class */ (function (_super) {
    __extends(RecgtangleCreationTool, _super);
    function RecgtangleCreationTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // non-public members ------------------------------------
    RecgtangleCreationTool.prototype.createFigure = function () {
        return new Rectangle(new BoundBox({ x: this.evDown.clientX,
            y: this.evDown.clientY }, { w: this.evUp.clientX - this.evDown.clientX,
            h: this.evUp.clientY - this.evDown.clientY }), 1, {
            r: 0, g: 0, b: 0, a: 255 // color ?
        }, {
            r: 0, g: 0, b: 0, a: 255 // color ?
        }, {
            r: 0, g: 0, b: 0, a: 255 // color ?
        }, []);
    };
    return RecgtangleCreationTool;
}(CreationTool));
export { RecgtangleCreationTool };
//# sourceMappingURL=rect-creation-tool.js.map