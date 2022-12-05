import { BoundBox } from '../model/bound-box';
import { CreationTool } from './creation-tool';
import { Line } from '../model/line';
export class LineCreationTool extends CreationTool {
    getName() {
        return 'LineCreationTool';
    }
    // non-public members ------------------------------------
    showFeedback(ctx, ev, f) {
        if (f) {
            ctx.beginPath();
            ctx.moveTo(ev.offsetX, ev.offsetY);
            ctx.lineTo(ev.offsetX + f.h, ev.offsetY + f.w);
            ctx.stroke();
        }
        else {
            ctx.beginPath();
            ctx.moveTo(this.evDown.offsetX, this.evDown.offsetY);
            ctx.lineTo(ev.offsetX, ev.offsetY);
            ctx.stroke();
        }
    }
    createFigure(fig) {
        if (fig) {
            return new Line(new BoundBox({
                x: this.evUp.offsetX,
                y: this.evUp.offsetY
            }, {
                w: fig.w,
                h: fig.h
            }), 1, {
                r: 0, g: 0, b: 0, a: 255 // color ?
            }, {
                r: 0, g: 0, b: 0, a: 255 // color ?
            }, []);
        }
        else {
            return new Line(new BoundBox({
                x: this.evDown.offsetX,
                y: this.evDown.offsetY
            }, {
                w: this.evUp.clientX - this.evDown.clientX,
                h: this.evUp.clientY - this.evDown.clientY
            }), 1, {
                r: 0, g: 0, b: 0, a: 255 // color ?
            }, {
                r: 0, g: 0, b: 0, a: 255 // color ?
            }, []);
        }
    }
}
//# sourceMappingURL=line-creation-tool.js.map