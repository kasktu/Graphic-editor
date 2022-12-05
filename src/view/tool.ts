import { ColorHelper } from '../util/color-helper';

import app from '../index';
import { Figure } from '../model/figure';

// NEW: resize figures

export abstract class Tool {
    abstract getName(): string;
    
    protected abstract processMouseUp(fig?:Figure): void;
    protected abstract showFeedback( 
        ctx: CanvasRenderingContext2D,
        ev: MouseEvent ,f?:Figure): void;

    protected evDown: MouseEvent;
    protected evUp:   MouseEvent;

    onMouseDown(
        ev: MouseEvent,f?:Figure): void {

        this.evDown = ev;
        this.startFeedback(
            ev,f
        );
    }

    // Template Method
    onMouseUp(
        ev: MouseEvent,f?:Figure ): void {

        if ( !this.evDown ) {
            console.warn(
                'Tool::onMouseUp() => OUT OF SEQUENCE'
            );
            return;
        }else{
            // 1. save event
            this.evUp = ev;
            // 2. do something w/ the events
            this.processMouseUp(f);
            
            // 3. NEW         
            this.evDown = null;
            this.endFeedback();
        }

        
    }
    paste(f?:Figure){
        this.processMouseUp(f);
    }

    // Template Method
    onMouseMove(
        ev: MouseEvent, f?:Figure ): void {

        // 1. check mouse pressed (dragging)
        if ( this.evDown ) {

            // 2. clear feedback layer
            app.clearFeedbackContext();

            // 3. show feedback
            this.showFeedback(
                app.getFeedbackContext(),
                ev
            );
        }else if(f){
            app.clearFeedbackContext();

            // 3. show feedback
            this.showFeedback(
                app.getFeedbackContext(),
                ev,f
            ); 
        }
        else {
            // 4. set cursor
            app.setCursor(
                this.getCursor(
                    ev
                )
            );
        }
    }

    // non-public members ------------------------------------ 

    protected equal(
        ev1: MouseEvent,
        ev2: MouseEvent ): boolean {

        return ev1.offsetX === ev2.offsetX 
            && ev1.offsetY === ev2.offsetY;
    }

    protected startFeedback( 
        ev: MouseEvent,f?:Figure ): void {

        const ctx: CanvasRenderingContext2D = app.getFeedbackContext();

        ctx.strokeStyle = ColorHelper.colorAsString({
            r: 28, g: 116, b: 232, a: 255
        });
        ctx.fillStyle=ColorHelper.colorAsString({
            r: 28, g: 116, b: 232, a: 100
        });
    }

    protected endFeedback(): void {
        app.clearFeedbackContext();
    }

    protected getCursor( 
        ev: MouseEvent ): string {

        return 'default';
    }

}