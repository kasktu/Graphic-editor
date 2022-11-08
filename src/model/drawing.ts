import app from '../index';
import { 
    BoundBox, 
} from './bound-box';

import { 
    Figure, 
} from './figure';

import{
    Text,
}from './text';

import { 
    Line 
} from './line';
import { IsococelesTriangle } from './iscoceles-triangle';

export class Drawing {
    private figures: Figure[] = [
    ];

    private modified = false;
    private name: string | null = null;

    constructor() {
    }

    // polymorphism in action
    paint(
        ctx: CanvasRenderingContext2D ): void {

        this.figures.forEach( 
            (f: Figure) => f.paint( ctx ) 
        );
    }

    // TODO: delete this
    addTestFigures(): void {        
    
    }

    selectAll(): void {
        this.figures.forEach( 
            (f: Figure) => f.selected = true 
        );
    }

    // NEW
    select( 
        evDown: MouseEvent,
        evUp?: MouseEvent ): void {
        
        this.figures.forEach( 
            (f: Figure) => f.select( evDown, evUp ) 
        );

        // TODO: something selected?
        app.repaint();
    }
    addFigure(
        f: Figure ): void {
        f.selected=true;
        this.figures
            .push(
                f
            );

        app.repaint();
    }
}
