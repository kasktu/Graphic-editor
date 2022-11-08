import { Cardinal, ControlPoint } from './control-point';
import { ColorHelper } from '../util/color-helper';
import { GraphicsObject } from './graphics-object';

export interface Position {
    x: number;
    y: number;
}

export interface Dimension {
    w: number;
    h: number;
}

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

        this.addControlPoints();
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

        // draw control points
        this.ctrlPoints.forEach( 
            (cp: ControlPoint) => cp.paint( ctx ) 
        );
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

    // NEW
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

    // non-public members -----------------------------
    
    private ctrlPoints: ControlPoint[] = [
    ];

    private addControlPoints(): void {

        // target = ES2017+
        // Object.values(
        //     Cardinal
        // )
        // .map( (cardinal: Cardinal) =>
        //     this.ctrlPoints
        //         .push(
        //             new ControlPoint(
        //                 this,
        //                 cardinal
        //             )
        //         )
        // );

        // target = ES5
        Object.keys(
            Cardinal
        )
        .map( (key: string) => {
            const cardinal: number = Number( 
                key 
            );

            if ( !isNaN( cardinal ) ) {
                this.ctrlPoints
                    .push(
                        new ControlPoint(
                            this,
                            cardinal
                        )
                    );
                }
        });
    }

    private contains(
        ev: MouseEvent ): boolean {

        const left:   number = this.x;
        const right:  number = this.x + this.w;
        const top:    number = this.y;
        const bottom: number = this.y + this.h;
                
        return left < ev.clientX && ev.clientX < right
            && top < ev.clientY && ev.clientY < bottom;
    }

    // TODO
    private contained(
        evDown: MouseEvent,
        evUp: MouseEvent ): boolean {

        return false;
    }
}
