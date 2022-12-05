import { CreationTool } from './creation-tool';
import { Figure } from '../model/figure';
import { Text } from '../model/text';
import { BoundBox } from '../model/bound-box';

export class TextCreationTool
    extends CreationTool {

    getName(): string {
        return 'TextCreationTool';
    }
        
    // non-public members ------------------------------------

    protected showFeedback(
        ctx: CanvasRenderingContext2D,
        ev: MouseEvent ): void {

            ctx.fillText("Text", ev.offsetX,ev.offsetY);
    }
    
    protected createFigure(fig?:Text): Figure {
        if(fig){
            return new Text(fig.text,
                new BoundBox({
                        x: this.evUp.offsetX, 
                        y: this.evUp.offsetY 
                    },
                    { 
                        w: fig.w, 
                        h: fig.h
                    })
                ,{ 
                    r: 0, g: 0, b: 0, a: 255   // color ?
                },{ 
                    r: 0, g: 0, b: 0, a: 255   // color ?
                })
        }else{
            const text:string =prompt("Ingrese el texto");
        if (text!=null && text!=''){
        return new Text(text,
            new BoundBox({
                    x: this.evUp.offsetX, 
                    y: this.evUp.offsetY 
                },
                { 
                    w: this.evUp.clientX - this.evDown.clientX, 
                    h: this.evUp.clientY - this.evDown.clientY
                })
            ,{ 
                r: 0, g: 0, b: 0, a: 255   // color ?
            },{ 
                r: 0, g: 0, b: 0, a: 255   // color ?
            })
        }  
    }
        }
      
}