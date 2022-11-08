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
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(bbox, lineThickness, lineStyle, lineStroke, fillColor, lineDash) {
        return _super.call(this, bbox, lineThickness, lineStyle, lineStroke, fillColor, lineDash) || this;
    }
    Rectangle.prototype.doPaint = function (ctx) {
        ctx.strokeStyle = ColorHelper.colorAsString(this.lineStroke);
        ctx.lineWidth = this.lineThickness;
        ctx.beginPath();
        ctx.setLineDash(this.lineDash);
        ctx.rect(this.bbox.x, this.bbox.y, this.bbox.w, this.bbox.h);
        ctx.stroke();
        if (this._fill) {
            ctx.fillStyle = ColorHelper.colorAsString(this.fillColor);
            ctx.fill();
        }
    };
    return Rectangle;
}(ClosedFigure));
export { Rectangle };
//# sourceMappingURL=rectangle.js.map