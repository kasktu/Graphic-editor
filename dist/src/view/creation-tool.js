import { Tool } from './tool';
import app from '../index';
export class CreationTool extends Tool {
    // Template Method
    processMouseUp(fig) {
        // 0. no empty figures
        var name = this.getName();
        if (name != 'TextCreationTool' && this.equal(this.evDown, this.evUp)) {
            return;
        }
        // 1. create figure
        const f = this.createFigure(fig);
        // 2. check figure
        if (f) {
            // 3. add figure to the drawing
            app.addFigure(f);
        }
        else {
            console.error('FIGURE CREATION FAILED');
        }
    }
}
//# sourceMappingURL=creation-tool.js.map