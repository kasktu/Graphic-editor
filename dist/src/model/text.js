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
import { ColorHelper } from '../util/color-helper';
import { Figure } from './figure';
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text(text, bbox, // NEW
    LineStyle, LineStroke) {
        var _this = _super.call(this, bbox, LineStyle, LineStroke) || this;
        _this._font = "";
        _this._text = _this.text;
        _this._selected = false;
        _this._text = text;
        return _this;
    }
    Object.defineProperty(Text.prototype, "font", {
        get: function () {
            return this._font;
        },
        set: function (newFont) {
            this._font = newFont;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Text.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (s) {
            this._selected = s;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Text.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (newText) {
            this._text = newText;
        },
        enumerable: false,
        configurable: true
    });
    Text.prototype.doPaint = function (ctx) {
        ctx.font = this._font;
        ctx.fillStyle = ColorHelper.colorAsString(this.LineStyle);
        ctx.fillText(this._text, this.bbox.x, this.bbox.y);
        if (this.selected) {
            this.bbox.paint(ctx);
        }
        ctx.stroke();
    };
    return Text;
}(Figure));
export { Text };
//# sourceMappingURL=text.js.map