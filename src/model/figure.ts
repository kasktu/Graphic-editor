import { BoundBox } from './bound-box';
import { Color } from '../util/color-helper';
import { GraphicsObject } from './graphics-object';

export abstract class Figure 
    implements GraphicsObject {

    // public interface -------------------------------
    
    protected abstract doPaint( 
        ctx: CanvasRenderingContext2D ): void;

    constructor(
        protected bbox: BoundBox,       // NEW
        protected LineStyle: Color,
        protected LineStroke: Color  ) {
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected( s: boolean ) {
        this._selected = s;
    }

    // Template Method
    paint(ctx: CanvasRenderingContext2D ): void {

        // 1. paint figure
        this.doPaint(
            ctx
        );

        // 2. selected (?)
        if ( this.selected ) {
            this.bbox.paint(         //3.paint bounding box
                        ctx
                    );
        }
    }


    // NEW
    select( 
        evDown: MouseEvent,
        evUp?: MouseEvent ): void {
        
        this.selected = this.bbox
            .select( 
                evDown, 
                evUp 
            );
    }

    // non-public members -----------------------------

    protected _selected: boolean = false;
}
