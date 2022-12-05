import { BoundBox } from './bound-box';
import { Cardinal, ControlPoint } from './control-point';
export class Figure {
    constructor(bbox, LineStyle, LineStroke) {
        this.bbox = bbox;
        this.LineStyle = LineStyle;
        this.LineStroke = LineStroke;
        this.children = [];
        // non-public members -----------------------------
        this._selected = false;
        if (Figure.ctrlPoints.length === 0) {
            this.addControlPoints();
        }
    }
    getUnionBoundBox() {
        let fX, fY, fH, fW;
        if (this.bbox.w < 0) {
            fX = this.bbox.x + this.bbox.w;
            fW = Math.abs(this.bbox.w);
        }
        else {
            fX = this.bbox.x;
            fW = this.bbox.w;
        }
        if (this.bbox.h < 0) {
            fY = this.bbox.y + this.bbox.h;
            fH = Math.abs(this.bbox.h);
        }
        else {
            fY = this.bbox.y;
            fH = this.bbox.h;
        }
        let minX = fX;
        let minY = fY;
        let maxX = fX + fW, maxY = fY + fH;
        this.children.forEach((f) => {
            let X, Y, H, W;
            if (f.bbox.w < 0) {
                X = f.bbox.x + f.bbox.w;
                W = Math.abs(f.bbox.w);
            }
            else {
                X = f.bbox.x;
                W = f.bbox.w;
            }
            if (f.bbox.h < 0) {
                Y = f.bbox.y + f.bbox.h;
                H = Math.abs(f.bbox.h);
            }
            else {
                Y = f.bbox.y;
                H = f.bbox.h;
            }
            if (X < minX) {
                minX = X;
            }
            if (Y < minY) {
                minY = Y;
            }
            let right = X + W;
            let bottom = Y + H;
            if (right > maxX) {
                maxX = right;
            }
            if (bottom > maxY) {
                maxY = bottom;
            }
            f.selected = false;
        });
        this.gbbox = new BoundBox({ x: minX, y: minY }, { w: (maxX - minX), h: (maxY - minY) });
        Figure.ctrlPoints.forEach((cp) => Figure.ctrlPoints.shift());
        this.addControlPoints();
    }
    addChild(f) {
        this.children.push(f);
    }
    flushChildren(a) {
        this.children.forEach((f) => a.push(f));
        this.children = [];
    }
    // public interface -------------------------------
    get selected() {
        return this._selected;
    }
    set selected(s) {
        this._selected = s;
    }
    // Template Method
    paint(ctx) {
        // 1. paint figure
        this.doPaint(ctx);
        // 2. paint children (NEW)
        this.children
            .forEach((f) => f.paint(ctx) // recursive
        );
        // 3. paint bounding box
        if (this.selected) {
            if (this.gbbox) {
                this.gbbox
                    .paint(ctx);
                Figure.ctrlPoints
                    .forEach((cp) => cp.paint(ctx, this.gbbox));
            }
            else {
                this.bbox
                    .paint(ctx);
                Figure.ctrlPoints
                    .forEach((cp) => cp.paint(ctx, this.bbox));
            }
            // 4 . draw control points
        }
    }
    select(evDown, evUp) {
        this.selected = this.bbox
            .select(evDown, evUp);
    }
    contains(ev) {
        if (this.gbbox) {
            return this.gbbox.contains(ev);
        }
        else {
            return this.bbox
                .contains(ev);
        }
    }
    getControlPoint(ev) {
        for (let i = 0; i < Figure.ctrlPoints.length; i++) {
            const cp = Figure.ctrlPoints[i];
            if (cp.contains(ev, this.bbox)) {
                return cp;
            }
        }
    }
    move(dx, dy) {
        if (this.gbbox) {
            this.gbbox
                .move(dx, dy);
            this.bbox.move(dx, dy);
            this.children.forEach((f) => { f.bbox.move(dx, dy); });
        }
        else {
            this.bbox
                .move(dx, dy);
        }
    }
    resize(dx, dy, x, y) {
        if (this.gbbox) {
            this.gbbox
                .resize(dx, dy, x, y);
            this.bbox.resize(dx, dy, x, y);
            ;
            this.children.forEach((f) => {
                f.bbox.resize(dx, dy, x, y);
            });
        }
        else {
            this.bbox.
                resize(dx, dy, x, y);
        }
    }
    get x() {
        return this.bbox.x;
    }
    get y() {
        return this.bbox.y;
    }
    get w() {
        return this.bbox.w;
    }
    get h() {
        return this.bbox.h;
    }
    // NEW
    toJSON() {
        return {
            bbox: this.bbox,
            LineStyle: this.LineStyle,
            LineStroke: this.LineStroke
        };
    }
    addControlPoints() {
        //  target = ES2017+
        // Object.values(
        //     Cardinal
        // )
        // .map( (cardinal: Cardinal) =>
        //     this.ctrlPoints
        //         .push(
        //             new ControlPoint(
        //                 this,
        //                 cardinal
        //             )
        //         )
        // );
        // target = ES5
        Object.keys(Cardinal)
            .map((key) => {
            const cardinal = Number(key);
            if (!isNaN(cardinal)) {
                Figure.ctrlPoints
                    .push(new ControlPoint(cardinal));
            }
        });
    }
}
Figure.ctrlPoints = [];
//# sourceMappingURL=figure.js.map