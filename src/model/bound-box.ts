import { ControlPoint } from './control-point';
import { ColorHelper } from '../util/color-helper';
import { Dimension, GraphicsObject, Position } from './graphics-object';


export class BoundBox 
    implements GraphicsObject {

    static readonly color: string = ColorHelper.colorAsString({
        r: 28,
        g: 116,
        b: 232,
        a: 255,
    });

    // public interface -------------------------------

    constructor(
        private position: Position,
        private size: Dimension ) {
    }

    paint( 
        ctx: CanvasRenderingContext2D ): void {

        // draw bound box
        ctx.strokeStyle = BoundBox.color;
        ctx.beginPath();
        ctx.rect( 
            this.position.x, this.position.y, 
            this.size.w,     this.size.h 
        );
        ctx.stroke();
    }

    get x(): number {
        return this.position.x;
    }

    get y(): number {
        return this.position.y;
    }

    get w(): number {
        return this.size.w;
    }

    get h(): number {
        return this.size.h;
    }

    select(
        evDown: MouseEvent,
        evUp?: MouseEvent ): boolean {
         
        if ( evUp ) {
            // bound box selection
            return this.contained(
                evDown, evUp
            );
        }

        // point selection
        return this.contains(
            evDown
        );
    }

    contains(
        ev: MouseEvent ): boolean {

        const left:   number = this.x - ControlPoint.HSIZE;
        const right:  number = this.x + this.w + ControlPoint.HSIZE;
        const top:    number = this.y - ControlPoint.HSIZE;
        const bottom: number = this.y + this.h + ControlPoint.HSIZE;
              
        return left <= ev.offsetX && ev.offsetX <= right
            && top <= ev.offsetY && ev.offsetY <= bottom;
    }
    
    move(
        dx: number, 
        dy: number ): void {
        
        this.position.x += dx;
        this.position.y += dy;
    }

    // NEW
    moveTo(
        x: number, 
        y: number ): void {

        this.position.x = x;
        this.position.y = y;
    }

    resize(
        dx: number, 
        dy: number,x:boolean,y:boolean ): void {
        if(x){
            this.size.w += dx;
        }else if(!x){
            this.position.x+=dx;
            this.size.w-=dx;
        }
        if(y){
            this.size.h += dy;
        }else if(!y){
            this.position.y+=dy;
            this.size.h-=dy;
        }
    }

    // non-public members -----------------------------
    
    // TODO
    private contained(
        evDown: MouseEvent,
        evUp: MouseEvent ): boolean {
            var minX,minY,maxX,maxY;
            if (evDown.clientX>evUp.clientX){
                minX=evUp.clientX
                maxX=evDown.clientX
            }else{
                minX=evDown.clientX
                maxX=evUp.clientX
            }
            if (evDown.clientY>evUp.clientY){
                minY=evUp.clientY
                maxY=evDown.clientY
            }else{
                minY=evDown.clientY
                maxY=evUp.clientY
            }
            if(minX<this.x && (this.x+this.w)<maxX){
                if(minY<this.y && (this.y+this.h)<maxY){
                    return true;
                }
            }
        return false;
    }
}
