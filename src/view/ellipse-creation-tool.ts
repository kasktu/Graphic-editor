import { CreationTool } from './creation-tool';
import { Figure } from '../model/figure';
import { Ellipse } from '../model/ellipse';
import { BoundBox } from '../model/bound-box';

export class ElliCreationTool
    extends CreationTool {

    getName(): string {
        return 'EllipseCreationTool';
    }
    protected showFeedback(
        ctx: CanvasRenderingContext2D,
        ev: MouseEvent ): void {
            var x=ev.offsetX-this.evDown.clientX;
            var y=ev.offsetY-this.evDown.offsetY;
            ctx.beginPath();
            ctx.ellipse(this.evDown.offsetX+(x/2),this.evDown.offsetY+(y/2), Math.abs(x/2), Math.abs(y/2), 0,  0, 2 * Math.PI);
            ctx.stroke();
    
    }
    protected createFigure(fig?:Figure): Figure {
        if(fig){
            return new Ellipse( new BoundBox(
                { 
                    x: this.evUp.offsetX, 
                    y: this.evUp.offsetY            },
                { 
                    w: fig.w, 
                    h: fig.h
                }),
            1,{ 
                r: 0, g: 0, b: 0, a: 255   // color ?
            },{ 
                r: 0, g: 0, b: 0, a: 255   // color ?
            },{ 
                r: 0, g: 0, b: 0, a: 255   // color ?
            },[]
        );
        
        }else{
            var sizeY=this.evUp.offsetY-this.evDown.offsetY;
            var sizeX=this.evUp.offsetX-this.evDown.offsetX
            return new Ellipse( new BoundBox(
                    { 
                        x: this.evDown.offsetX, 
                        y: this.evDown.offsetY            },
                    { 
                        w: sizeX, 
                        h: sizeY
                    }),
                1,{ 
                    r: 0, g: 0, b: 0, a: 255   // color ?
                },{ 
                    r: 0, g: 0, b: 0, a: 255   // color ?
                },{ 
                    r: 0, g: 0, b: 0, a: 255   // color ?
                },[]
            );}
        
    }
}