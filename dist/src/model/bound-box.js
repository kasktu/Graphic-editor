import { ControlPoint } from './control-point';
import { ColorHelper } from '../util/color-helper';
export class BoundBox {
    // public interface -------------------------------
    constructor(position, size) {
        this.position = position;
        this.size = size;
    }
    paint(ctx) {
        // draw bound box
        ctx.strokeStyle = BoundBox.color;
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.size.w, this.size.h);
        ctx.stroke();
    }
    get x() {
        return this.position.x;
    }
    get y() {
        return this.position.y;
    }
    get w() {
        return this.size.w;
    }
    get h() {
        return this.size.h;
    }
    select(evDown, evUp) {
        if (evUp) {
            // bound box selection
            return this.contained(evDown, evUp);
        }
        // point selection
        return this.contains(evDown);
    }
    contains(ev) {
        const left = this.x - ControlPoint.HSIZE;
        const right = this.x + this.w + ControlPoint.HSIZE;
        const top = this.y - ControlPoint.HSIZE;
        const bottom = this.y + this.h + ControlPoint.HSIZE;
        return left <= ev.offsetX && ev.offsetX <= right
            && top <= ev.offsetY && ev.offsetY <= bottom;
    }
    move(dx, dy) {
        this.position.x += dx;
        this.position.y += dy;
    }
    // NEW
    moveTo(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
    resize(dx, dy, x, y) {
        if (x) {
            this.size.w += dx;
        }
        else if (!x) {
            this.position.x += dx;
            this.size.w -= dx;
        }
        if (y) {
            this.size.h += dy;
        }
        else if (!y) {
            this.position.y += dy;
            this.size.h -= dy;
        }
    }
    // non-public members -----------------------------
    // TODO
    contained(evDown, evUp) {
        var minX, minY, maxX, maxY;
        if (evDown.clientX > evUp.clientX) {
            minX = evUp.clientX;
            maxX = evDown.clientX;
        }
        else {
            minX = evDown.clientX;
            maxX = evUp.clientX;
        }
        if (evDown.clientY > evUp.clientY) {
            minY = evUp.clientY;
            maxY = evDown.clientY;
        }
        else {
            minY = evDown.clientY;
            maxY = evUp.clientY;
        }
        if (minX < this.x && (this.x + this.w) < maxX) {
            if (minY < this.y && (this.y + this.h) < maxY) {
                return true;
            }
        }
        return false;
    }
}
BoundBox.color = ColorHelper.colorAsString({
    r: 28,
    g: 116,
    b: 232,
    a: 255,
});
//# sourceMappingURL=bound-box.js.map