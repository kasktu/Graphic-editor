import { Tool } from './tool';
import app from '../index';
export class SelectionTool extends Tool {
    getName() {
        return 'SelectionTool';
    }
    // NEW
    // override
    // override
    getCursor(ev) {
        this.fCtrlPoint = app.getControlPoint(ev);
        this.fSelected = app.getSelectedFigure(ev);
        if (this.fCtrlPoint) {
            return this.fCtrlPoint
                .getCursor();
        }
        return this.fSelected
            ? 'move'
            : super.getCursor(ev);
    }
    showFeedback(ctx, ev) {
        if (this.fCtrlPoint) {
            this.moveControlPoint(ev);
        }
        else {
            if (this.fSelected) {
                this.moveSelected(ev);
            }
            else {
                this.drawFeedback(ctx, ev);
            }
        }
    }
    drawFeedback(ctx, ev) {
        ctx.beginPath();
        ctx.rect(this.evDown.offsetX, this.evDown.offsetY, ev.offsetX - this.evDown.offsetX, ev.offsetY - this.evDown.offsetY);
        ctx.fill();
        ctx.stroke();
    }
    processMouseUp() {
        if (this.fSelected || this.fCtrlPoint) {
            // moving or resizing
        }
        else {
            if (this.equal(this.evDown, this.evUp)) {
                // point selection
                app.select(this.evUp);
            }
            else {
                // bound box selection
                app.select(this.evDown, this.evUp);
            }
        }
        this.cleanUp();
    }
    cleanUp() {
        this.fSelected = null;
        this.fCtrlPoint = null;
    }
    moveSelected(ev) {
        this.fSelected
            .move(ev.offsetX - this.evDown.offsetX, ev.offsetY - this.evDown.offsetY);
        this.evDown = ev;
        app.move();
    }
    moveControlPoint(ev) {
        this.fCtrlPoint
            .move(ev.offsetX - this.evDown.offsetX, ev.offsetY - this.evDown.offsetY, this.fSelected);
        this.evDown = ev;
        app.move();
    }
}
//# sourceMappingURL=selection-tool.js.map