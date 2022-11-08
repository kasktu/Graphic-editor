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
import { GeomFigure } from './geom-figure';
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line(bbox, lineThickness, lineStyle, lineStroke, lineDash) {
        return _super.call(this, bbox, lineThickness, lineStyle, lineStroke, lineDash) || this;
    }
    Object.defineProperty(Line.prototype, "_lineWidth", {
        get: function () {
            return this.lineThickness;
        },
        set: function (newTickness) {
            this.lineThickness = newTickness;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "_lineStyle", {
        get: function () {
            return this._lineStyle;
        },
        set: function (newStyle) {
            this._lineStyle = newStyle;
        },
        enumerable: false,
        configurable: true
    });
    Line.prototype.doPaint = function (ctx) {
        ctx.strokeStyle = ColorHelper.colorAsString(this.lineStroke);
        ctx.lineWidth = this.lineThickness;
        ctx.beginPath();
        ctx.moveTo(this.bbox.x, this.bbox.y);
        ctx.lineTo(this.bbox.x + this.bbox.w, this.bbox.y + this.bbox.h);
        ctx.stroke();
    };
    return Line;
}(GeomFigure));
export { Line };
//# sourceMappingURL=line.js.map