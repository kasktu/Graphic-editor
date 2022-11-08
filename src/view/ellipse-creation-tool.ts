import { BoundBox } from '../model/bound-box';
import { CreationTool } from './creation-tool';
import { Figure } from '../model/figure';
import { Ellipse } from '../model/ellipse';

export class EllipseCreationTool
    extends CreationTool {
    
    // non-public members ------------------------------------
    
    protected createFigure(): Figure {
        return new Ellipse(
            new BoundBox(
                {x: this.evDown.clientX, 
                    y: this.evDown.clientY},
                {w: this.evUp.clientX - this.evDown.clientX, 
                    h: this.evUp.clientY - this.evDown.clientY }),1,{ 
                r: 0, g: 0, b: 0, a: 255   // color ?
            },{ 
                r: 0, g: 0, b: 0, a: 255   // color ?
            },{ 
                r: 0, g: 0, b: 0, a: 255   // color ?
            },[]
        )
    }   
}    
