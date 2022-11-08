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
import { GeomFigure } from './geom-figure';
var ClosedFigure = /** @class */ (function (_super) {
    __extends(ClosedFigure, _super);
    function ClosedFigure(bbox, lineThickness, lineStyle, lineStroke, fillColor, lineDash) {
        var _this = _super.call(this, bbox, lineThickness, lineStyle, lineStroke, lineDash) || this;
        _this.bbox = bbox;
        _this.lineThickness = lineThickness;
        _this.lineStyle = lineStyle;
        _this.lineStroke = lineStroke;
        _this.fillColor = fillColor;
        _this.lineDash = lineDash;
        _this._fill = false;
        return _this;
    }
    Object.defineProperty(ClosedFigure.prototype, "fill", {
        get: function () {
            return this._fill;
        },
        set: function (s) {
            this._fill = s;
        },
        enumerable: false,
        configurable: true
    });
    return ClosedFigure;
}(GeomFigure));
export { ClosedFigure };
//# sourceMappingURL=closed-figure.js.map