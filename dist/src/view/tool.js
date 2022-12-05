import { ColorHelper } from '../util/color-helper';
import app from '../index';
// NEW: resize figures
export class Tool {
    onMouseDown(ev, f) {
        this.evDown = ev;
        this.startFeedback(ev, f);
    }
    // Template Method
    onMouseUp(ev, f) {
        if (!this.evDown) {
            console.warn('Tool::onMouseUp() => OUT OF SEQUENCE');
            return;
        }
        else {
            // 1. save event
            this.evUp = ev;
            // 2. do something w/ the events
            this.processMouseUp(f);
            // 3. NEW         
            this.evDown = null;
            this.endFeedback();
        }
    }
    paste(f) {
        this.processMouseUp(f);
    }
    // Template Method
    onMouseMove(ev, f) {
        // 1. check mouse pressed (dragging)
        if (this.evDown) {
            // 2. clear feedback layer
            app.clearFeedbackContext();
            // 3. show feedback
            this.showFeedback(app.getFeedbackContext(), ev);
        }
        else if (f) {
            app.clearFeedbackContext();
            // 3. show feedback
            this.showFeedback(app.getFeedbackContext(), ev, f);
        }
        else {
            // 4. set cursor
            app.setCursor(this.getCursor(ev));
        }
    }
    // non-public members ------------------------------------ 
    equal(ev1, ev2) {
        return ev1.offsetX === ev2.offsetX
            && ev1.offsetY === ev2.offsetY;
    }
    startFeedback(ev, f) {
        const ctx = app.getFeedbackContext();
        ctx.strokeStyle = ColorHelper.colorAsString({
            r: 28, g: 116, b: 232, a: 255
        });
        ctx.fillStyle = ColorHelper.colorAsString({
            r: 28, g: 116, b: 232, a: 100
        });
    }
    endFeedback() {
        app.clearFeedbackContext();
    }
    getCursor(ev) {
        return 'default';
    }
}
//# sourceMappingURL=tool.js.map