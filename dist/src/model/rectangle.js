import { BoundBox, } from './bound-box';
import { ColorHelper, } from '../util/color-helper';
import { ClosedFigure, } from './closed-figure';
import { ApiService } from '../api/api-service';
export class Rectangle extends ClosedFigure {
    constructor(bbox, lineThickness, lineStyle, lineStroke, fillColor, lineDash) {
        super(bbox, lineThickness, lineStyle, lineStroke, fillColor, lineDash);
    }
    get name() {
        return Rectangle.className;
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
        ctx.beginPath();
        ctx.setLineDash(this.lineDash);
        ctx.rect(this.bbox.x, this.bbox.y, this.bbox.w, this.bbox.h);
        ctx.stroke();
        if (this._fill) {
            ctx.fillStyle = ColorHelper.colorAsString(this.fillColor);
            ctx.fill();
        }
    }
}
Rectangle.className = 'Rectangle';
class RectangleFactory {
    create(json) {
        return new Rectangle(new BoundBox({
            x: json.bbox.x,
            y: json.bbox.y
        }, {
            w: json.bbox.w,
            h: json.bbox.h
        }), 1, json.LineStyle, json.LineStroke, json.color, []);
    }
}
ApiService.getInstance()
    .registerFactory(Rectangle.className, new RectangleFactory());
//# sourceMappingURL=rectangle.js.map