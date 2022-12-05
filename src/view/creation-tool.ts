import { Figure } from '../model/figure';
import { Tool } from './tool';

import app from '../index';
export abstract class CreationTool
    extends Tool {

    protected abstract createFigure(fig?:Figure): Figure;
    
    // Template Method
    protected processMouseUp(fig?:Figure): void {

        // 0. no empty figures
        var name=this.getName();
        if (name!= 'TextCreationTool' && this.equal( this.evDown, this.evUp ) ) {
            return;
        }

        // 1. create figure
        const f: Figure = this.createFigure(fig);

        // 2. check figure
        if ( f ) {
            // 3. add figure to the drawing
            app.addFigure(
                f
            );
            
        }
        else {
            console.error(
                'FIGURE CREATION FAILED'
            );
        }
    }

}