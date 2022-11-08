var Figure = /** @class */ (function () {
    function Figure(bbox, // NEW
    LineStyle, LineStroke) {
        this.bbox = bbox;
        this.LineStyle = LineStyle;
        this.LineStroke = LineStroke;
        // non-public members -----------------------------
        this._selected = false;
    }
    Object.defineProperty(Figure.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (s) {
            this._selected = s;
        },
        enumerable: false,
        configurable: true
    });
    // Template Method
    Figure.prototype.paint = function (ctx) {
        // 1. paint figure
        this.doPaint(ctx);
        // 2. selected (?)
        if (this.selected) {
            this.bbox.paint(//3.paint bounding box
            ctx);
        }
    };
    // NEW
    Figure.prototype.select = function (evDown, evUp) {
        this.selected = this.bbox
            .select(evDown, evUp);
    };
    return Figure;
}());
export { Figure };
//# sourceMappingURL=figure.js.map