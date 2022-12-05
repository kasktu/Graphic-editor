import { BoundBox } from './bound-box';
import { ColorHelper } from '../util/color-helper';
import { Figure } from './figure';
import { ApiService } from '../api/api-service';
export class Text extends Figure {
    constructor(text, bbox, // NEW
    LineStyle, LineStroke) {
        super(bbox, LineStyle, LineStroke);
        this.bbox = bbox;
        this.LineStyle = LineStyle;
        this.LineStroke = LineStroke;
        this._font = "";
        this._text = this.text;
        this._selected = false;
        this._text = text;
    }
    get name() {
        return Text.className;
    }
    get font() {
        return this._font;
    }
    set font(newFont) {
        this._font = newFont;
    }
    get selected() {
        return this._selected;
    }
    set selected(s) {
        this._selected = s;
    }
    get text() {
        return this._text;
    }
    set text(newText) {
        this._text = newText;
    }
    doPaint(ctx) {
        ctx.font = this._font;
        ctx.fillStyle = ColorHelper.colorAsString(this.LineStyle);
        ctx.fillText(this._text, this.bbox.x, this.bbox.y);
        if (this.selected) {
            this.bbox.paint(ctx);
        }
        ctx.stroke();
    }
}
Text.className = 'Text';
class TextFactory {
    create(json) {
        return new Text(json._text, new BoundBox({
            x: json.bbox.x,
            y: json.bbox.y
        }, {
            w: json.bbox.w,
            h: json.bbox.h
        }), json.LineStyle, json.LineStroke);
    }
}
ApiService.getInstance()
    .registerFactory(Text.className, new TextFactory());
//# sourceMappingURL=text.js.map