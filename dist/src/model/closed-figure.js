import { GeomFigure } from './geom-figure';
export class ClosedFigure extends GeomFigure {
    constructor(bbox, lineThickness, lineStyle, lineStroke, fillColor, lineDash) {
        super(bbox, lineThickness, lineStyle, lineStroke, lineDash);
        this.bbox = bbox;
        this.lineThickness = lineThickness;
        this.lineStyle = lineStyle;
        this.lineStroke = lineStroke;
        this.fillColor = fillColor;
        this.lineDash = lineDash;
        this._fill = false;
    }
    get fill() {
        return this._fill;
    }
    set fill(s) {
        this._fill = s;
    }
}
//# sourceMappingURL=closed-figure.js.map