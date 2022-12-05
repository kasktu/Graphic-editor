import { ApiService, } from '../api/api-service';
import { BoundBox, } from './bound-box';
import { ColorHelper, } from '../util/color-helper';
import { ClosedFigure, } from './closed-figure';
export class Ellipse extends ClosedFigure {
    constructor(bbox, lineThickness, lineStyle, lineStroke, fillColor, lineDash) {
        super(bbox, lineThickness, lineStyle, lineStroke, fillColor, lineDash);
    }
    get name() {
        return Ellipse.className;
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
        ctx.lineWidth = this.lineThickness;
        ctx.setLineDash(this.lineDash);
        ctx.beginPath();
        ctx.ellipse(this.bbox.x + (this.bbox.w / 2), this.bbox.y + (this.bbox.h / 2), Math.abs(this.bbox.w / 2), Math.abs(this.bbox.h / 2), 0, 0, 2 * Math.PI);
        ctx.stroke();
        if (this._fill) {
            ctx.fillStyle = ColorHelper.colorAsString(this.fillColor);
            ctx.fill();
        }
    }
}
Ellipse.className = 'Ellipse';
class EllipseFactory {
    create(json) {
        return new Ellipse(new BoundBox({
            x: json.bbox.x,
            y: json.bbox.y
        }, {
            w: json.bbox.w,
            h: json.bbox.h
        }), 1, json.LineStyle, json.LineStroke, json.color, []);
    }
}
ApiService.getInstance()
    .registerFactory(Ellipse.className, new EllipseFactory());
//# sourceMappingURL=ellipse.js.map