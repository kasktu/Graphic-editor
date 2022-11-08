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
import { ColorHelper, } from '../util/color-helper';
import { ClosedFigure, } from './closed-figure';
var Ellipse = /** @class */ (function (_super) {
    __extends(Ellipse, _super);
    function Ellipse(bbox, lineThickness, lineStyle, lineStroke, fillColor, lineDash) {
        return _super.call(this, bbox, lineThickness, lineStyle, lineStroke, fillColor, lineDash) || this;
    }
    Ellipse.prototype.doPaint = function (ctx) {
        ctx.strokeStyle = ColorHelper.colorAsString(this.lineStroke);
        ctx.lineWidth = this.lineThickness;
        ctx.setLineDash(this.lineDash);
        ctx.beginPath();
        ctx.ellipse(this.bbox.x, this.bbox.y, this.bbox.h, this.bbox.w, 0, 0, 2 * Math.PI);
        ctx.stroke();
        if (this._fill) {
            ctx.fillStyle = ColorHelper.colorAsString(this.fillColor);
            ctx.fill();
        }
    };
    return Ellipse;
}(ClosedFigure));
export { Ellipse };
//# sourceMappingURL=ellipse.js.map