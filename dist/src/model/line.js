import { ApiService, } from '../api/api-service';
import { BoundBox, } from './bound-box';
import { ColorHelper, } from '../util/color-helper';
import { GeomFigure } from './geom-figure';
export class Line extends GeomFigure {
    constructor(bbox, lineThickness, lineStyle, lineStroke, lineDash) {
        super(bbox, lineThickness, lineStyle, lineStroke, lineDash);
    }
    get name() {
        return Line.className;
    }
    get _lineWidth() {
        return this.lineThickness;
    }
    set _lineWidth(newTickness) {
        this.lineThickness = newTickness;
    }
    get _lineStyle() {
        return this._lineStyle;
    }
    set _lineStyle(newStyle) {
        this._lineStyle = newStyle;
    }
    doPaint(ctx) {
        ctx.strokeStyle = ColorHelper.colorAsString(this.lineStroke);
        ctx.beginPath();
        ctx.moveTo(this.bbox.x, this.bbox.y);
        ctx.lineTo(this.bbox.x + this.bbox.w, this.bbox.y + this.bbox.h);
        ctx.stroke();
    }
}
Line.className = 'Line';
class LineFactory {
    create(json) {
        return new Line(new BoundBox({
            x: json.bbox.position.x,
            y: json.bbox.position.y
        }, {
            w: json.bbox.size.w,
            h: json.bbox.size.h
        }), 1, json.LineStyle, json.LineStroke, []);
    }
}
ApiService.getInstance()
    .registerFactory(Line.className, new LineFactory());
//# sourceMappingURL=line.js.map