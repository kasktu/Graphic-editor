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
import { Figure, } from './figure';
var GeomFigure = /** @class */ (function (_super) {
    __extends(GeomFigure, _super);
    function GeomFigure(bbox, lineThickness, lineStyle, lineStroke, lineDash) {
        var _this = _super.call(this, bbox, lineStyle, lineStroke) || this;
        _this.bbox = bbox;
        _this.lineThickness = lineThickness;
        _this.lineStyle = lineStyle;
        _this.lineStroke = lineStroke;
        _this.lineDash = lineDash;
        return _this;
    }
    return GeomFigure;
}(Figure));
export { GeomFigure };
//# sourceMappingURL=geom-figure.js.map