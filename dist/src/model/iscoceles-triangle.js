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
import { ClosedFigure } from './closed-figure';
var IsococelesTriangle = /** @class */ (function (_super) {
    __extends(IsococelesTriangle, _super);
    function IsococelesTriangle(bbox, lineThickness, lineStyle, lineStroke, fillColor, lineDash) {
        return _super.call(this, bbox, lineThickness, lineStyle, lineStroke, fillColor, lineDash) || this;
    }
    Object.defineProperty(IsococelesTriangle.prototype, "_lineWidth", {
        get: function () {
            return this.lineThickness;
        },
        set: function (newTickness) {
            this.lineThickness = newTickness;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsococelesTriangle.prototype, "_lineStyle", {
        get: function () {
            return this._lineStyle;
        },
        set: function (newStyle) {
            this._lineStyle = newStyle;
        },
        enumerable: false,
        configurable: true
    });
    IsococelesTriangle.prototype.doPaint = function (ctx) {
        ctx.strokeStyle = ColorHelper.colorAsString(this.lineStroke);
        ctx.lineWidth = this.lineThickness;
        ctx.beginPath();
        ctx.moveTo(this.bbox.x + (this.bbox.w / 2), this.bbox.y);
        ctx.lineTo(this.bbox.x, this.bbox.h + this.bbox.y);
        ctx.lineTo(this.bbox.x + this.bbox.w, this.bbox.y + this.bbox.h);
        ctx.lineTo(this.bbox.x + (this.bbox.w / 2), this.bbox.y);
        if (this._fill) {
            ctx.fillStyle = ColorHelper.colorAsString(this.fillColor);
            ctx.fill();
        }
        ctx.stroke();
    };
    return IsococelesTriangle;
}(ClosedFigure));
export { IsococelesTriangle };
//# sourceMappingURL=iscoceles-triangle.js.map