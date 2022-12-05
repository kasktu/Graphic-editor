import { Figure, } from './figure';
export class GeomFigure extends Figure {
    constructor(bbox, lineThickness, lineStyle, lineStroke, lineDash) {
        super(bbox, lineStyle, lineStroke);
        this.bbox = bbox;
        this.lineThickness = lineThickness;
        this.lineStyle = lineStyle;
        this.lineStroke = lineStroke;
        this.lineDash = lineDash;
    }
}
//# sourceMappingURL=geom-figure.js.map