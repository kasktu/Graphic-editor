import { Tool } from './tool';

import app from '../index';

export class SelectionTool 
    extends Tool {

    protected processMouseUp(): void {
        if ( this.equal( this.evDown, this.evUp ) ) {
            // point selection
            app.select(
                this.evUp
            );
        }
        else {
            // bound box selection
            app.select(
                this.evDown,
                this.evUp
            );
        }
    }
}