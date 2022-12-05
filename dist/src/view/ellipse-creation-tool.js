import { CreationTool } from './creation-tool';
import { Ellipse } from '../model/ellipse';
import { BoundBox } from '../model/bound-box';
export class ElliCreationTool extends CreationTool {
    getName() {
        return 'EllipseCreationTool';
    }
    showFeedback(ctx, ev) {
        var x = ev.offsetX - this.evDown.clientX;
        var y = ev.offsetY - this.evDown.offsetY;
        ctx.beginPath();
        ctx.ellipse(this.evDown.offsetX + (x / 2), this.evDown.offsetY + (y / 2), Math.abs(x / 2), Math.abs(y / 2), 0, 0, 2 * Math.PI);
        ctx.stroke();
    }
    createFigure(fig) {
        if (fig) {
            return new Ellipse(new BoundBox({
                x: this.evUp.offsetX,
                y: this.evUp.offsetY
            }, {
                w: fig.w,
                h: fig.h
            }), 1, {
                r: 0, g: 0, b: 0, a: 255 // color ?
            }, {
                r: 0, g: 0, b: 0, a: 255 // color ?
            }, {
                r: 0, g: 0, b: 0, a: 255 // color ?
            }, []);
        }
        else {
            var sizeY = this.evUp.offsetY - this.evDown.offsetY;
            var sizeX = this.evUp.offsetX - this.evDown.offsetX;
            return new Ellipse(new BoundBox({
                x: this.evDown.offsetX,
                y: this.evDown.offsetY
            }, {
                w: sizeX,
                h: sizeY
            }), 1, {
                r: 0, g: 0, b: 0, a: 255 // color ?
            }, {
                r: 0, g: 0, b: 0, a: 255 // color ?
            }, {
                r: 0, g: 0, b: 0, a: 255 // color ?
            }, []);
        }
    }
}
//# sourceMappingURL=ellipse-creation-tool.js.map